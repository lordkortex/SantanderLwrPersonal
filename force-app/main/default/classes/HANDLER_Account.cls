public class HANDLER_Account {

    public class ServiceActivationData {
		public String companyId;
		public String serviceActivationType;
    }

    public class ServiceActivationResponse {
		public ServiceActivationId serviceActivationResponse;
    }
    
    public class ServiceActivationId {
        public String serviceActivationId;
    }
   
    public class ServiceActivationPath {
        public String  service_activation_id;
        public String companyId;
        public String serviceActivacionType;
        public serviceActivationDataPath serviceActivationDataPath ;
    }
    public class ServiceActivationDataPath {
        public string status;
    }
    
    public class Omnicontract{
        public String contractId; 
        public String contractType;
    }
    
    public class OmnichannelServiceUserData{
        public String companyId;
        public String serviceId;
        public String userId;
        public String productType;
        public String status;
    }

    public class OmnichannelServiceData{
        public String companyId;
        public String serviceId;
        public String productType;
        public DateTime startDate; 
        public DateTime endDate;
    }

    public static void updateAccount(Map<Id, Account> oldAccountMap, List<Account> newAccountList){
        System.debug('HANDLER_Account.updateAccount >>>>> START');

        if(!newAccountList.isEmpty()){
            
            Set<Id> setAccountIdsOld = new Set<Id>();
            Set<Id> setAccountIdsNew = new Set<Id>();
            List<Account> listParentsOld = new List<Account>();
            List<Account> listParentsNew = new List<Account>();

            //Old Relation
            for(Account acc : oldAccountMap.values()){
                setAccountIdsOld.add(acc.ParentId);
            }
            if(!setAccountIdsOld.isEmpty()){
                listParentsOld = [SELECT Id, ACC_TXT_CompanyId__c FROM Account WHERE Id IN :setAccountIdsOld];
            }

            //New Relation
            for(Account acc : newAccountList){
                setAccountIdsNew.add(acc.ParentId);
            }
            if(!setAccountIdsNew.isEmpty()){
                listParentsNew = [SELECT Id, ACC_TXT_CompanyId__c FROM Account WHERE Id IN :setAccountIdsNew];
            }

               
            for(Account accList : newAccountList){
                String companyId;
                String parentCompanyId;
                String actionType;

                //INSERT - Null to not Null
                if(oldAccountMap.containsKey(accList.Id) && oldAccountMap.get(accList.Id).ParentId == null && accList.ParentId != null){
                    actionType = 'I';
                //UPDATE - value to another value (always not null)
                } else if(oldAccountMap.get(accList.Id).ParentId != null && accList.ParentId != null && accList.ParentId != oldAccountMap.get(accList.Id).ParentId){
                    actionType = 'U';
                //DELETE - not Null to Null
                } else if(oldAccountMap.get(accList.Id).ParentId != null && accList.ParentId == null){
                    actionType = 'D';
                }
                
                companyId = accList.ACC_TXT_CompanyId__c;
            
                //If it's delete we take the old relation before it becomes null.
                if(actionType == 'D'){
                    if(!listParentsOld.isEmpty()){
                        for(Account oldAcc : oldAccountMap.values()){
                            for(Account oldParent : listParentsOld){
                                system.debug(oldAcc);
                                system.debug(oldParent);
                                if(oldAcc.ParentId == oldParent.Id){
                                    parentCompanyId = oldParent.ACC_TXT_CompanyId__c;
                                    break;
                                }
                            }
                        }
                    }   
                    
                }else{
                    if(!listParentsNew.isEmpty()){
                        for(Account parentList : listParentsNew){
                            if(accList.ParentId == parentList.Id){
                                parentCompanyId = parentList.ACC_TXT_CompanyId__c;
                                break;
                            }  
                        }
                    }
                }

                System.debug('HANDLER_Account.updateAccount - Action Type >>>>>: '      + actionType);
                System.debug('HANDLER_Account.updateAccount - Account >>>>>: '          + accList);
                System.debug('HANDLER_Account.updateAccount - Company Id >>>>>: '   	+ companyId);
                System.debug('HANDLER_Account.updateAccount - Parent  Id >>>>>: '   	+ parentCompanyId);
                
                //CALLOUT METHOD
                if(companyId != null && actionType != null){
                    String bodyParams = '{"companyGlobalId":"'+companyId+'"}';
                    calloutCompanyHierarchy(companyId, parentCompanyId, bodyParams, actionType);
                }
            }
        } 
    }

    @future (callout=true)
    public static void calloutCompanyHierarchy(String companyId, String parentCompanyId, String bodyParams, String actionType) {
        System.debug('HANDLER_Account.calloutCompanyHierarchy >>>>> START');
        if(!Test.isRunningTest()){
            if(actionType != null && actionType != 'D'){
               	CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('TRG_CompanyHierarchy'); 
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{company_global_id}', parentCompanyId);
                Global_IntegrationWrapper.launchHttp(bodyParams,finalEndPoint,configWs.CNT_HTTPMethod__c);
            }else{
            	CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('TRG_CompanyHierarchy_Delete');
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{company_global_id}', parentCompanyId).replace('{child_company_global_id}', companyId);
                Global_IntegrationWrapper.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);
            }   
        }
        System.debug('HANDLER_Account.calloutCompanyHierarchy >>>>> END');
    }
    /*
    Author:         David Rioja
    Company:        Deloitte
    Description:    One Trade view multi start Procces and persist the matrix administrator
    History:
    <Date>          <Author>            <Description>
    11/02/2021      David Rioja          Initial version
    */    
    public static void startOneTradeProcess(Map<Id, Account> oldAccountMap, List<Account> newAccountList){
        System.debug('HANDLER_Account.startOneTradeProcess >>>>> START');
        
        // recorremos las cuentas que hayan cambiado para determinar cuales de ellas hay que enviar a persistir y cuales no.
        String service;
        for(Account acc : newAccountList){
            system.debug('acc.ACC_PCK_OTView_Enrollment__c ' +acc.ACC_PCK_OTView_Enrollment__c);
            system.debug('oldAccountMap.get(acc.Id).ACC_PCK_OTView_Enrollment__c ' +oldAccountMap.get(acc.Id).ACC_PCK_OTView_Enrollment__c);
            service = acc.ParentId == null ? 'OTV_GLOBAL_ACT' : 'OTV_LOCAL_ACT';
            String idAccount = acc.Id;
            if (acc.ACC_PCK_OTView_Enrollment__c == 'In Progress' && oldAccountMap.get(acc.Id).ACC_PCK_OTView_Enrollment__c == null 
                && acc.ParentId == null){

                ServiceActivationData sad = new ServiceActivationData();
                sad.companyId = acc.ACC_TXT_CompanyId__c;
                sad.serviceActivationType = service;
                
                calloutStarProcess(JSON.Serialize(sad),'activation', idAccount);
                
            }

            // llamada callout persistir el administrador de la cuenta. OmnichannelServiceUser (POST /omnichanel_service_user)
            // Crear Endpoint TRG_PersistAdminAccount
            // comprobar que cambia el admin y que el status es inprogress o Enrolled ()
            if((acc.ACC_PCK_OTView_Enrollment__c == 'Enrolled' || acc.ACC_PCK_OTView_Enrollment__c == 'In Progress')  &&   oldAccountMap.get(acc.Id).ACC_CHK_OTView_Admin__c != acc.ACC_CHK_OTView_Admin__c){
                List<User> adminAccUser = new List<User>();
                adminAccUser = [SELECT Id, USER_TXT_GlobalId__c FROM User WHERE ContactId =: acc.ACC_CHK_OTView_Admin__c LIMIT 1];
                
                OmnichannelServiceUserData osu = new OmnichannelServiceUserData();

                osu.userId = adminAccUser[0].USER_TXT_GlobalId__c;
                osu.companyId = acc.ACC_TXT_CompanyId__c;
                osu.serviceId = 'one_trade_view_multi';
                osu.productType = 'SERVICE';
                osu.status = 'ACTIVE';
                system.debug('lo que enviamos al servicio ' +JSON.Serialize(osu));
                
                                
                calloutPersistAdminAccount(JSON.Serialize(osu), adminAccUser[0].USER_TXT_GlobalId__c, acc.ACC_TXT_CompanyId__c);
                             
            }         
        }
    }
    
    //AMR 29/01/2021
    /*
    Author:         David Rioja
    Company:        Deloitte
    Description:    callout to persist the matrix administrator
    History:
    <Date>          <Author>            <Description>
    11/02/2021      David Rioja          Initial version
    */    
    @future (callout=true)
    public static void calloutPersistAdminAccount(String persistAdmin, String userId, String companyId) {
    	System.debug('HANDLER_Account.calloutPersistAdminAccount >>>>> START');
        if(!Test.isRunningTest()){
            // llamada callout persistencia usuario Admin de la cuenta
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('TRG_PostOmnichannelService');

            String tokenPlatform = 'BBOO';
            String tokenUser = 'GTS_GLOBAL';
            TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
            
            String response = Global_IntegrationWrapper.launchHttp(persistAdmin, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
            System.debug('>>>>>>>' + response);
            
        }      
    }

    /*
    Author:         David Rioja
    Company:        Deloitte
    Description:    callout to start the process
    History:
    <Date>          <Author>            <Description>
    11/02/2021      David Rioja          Initial version
    */    
    @future (callout=true)
    public static void calloutStarProcess(String serviceactivation, String proceso, String idAccount) {
        System.debug('HANDLER_Account.calloutStarProcess >>>>> START');
        
        if(!Test.isRunningTest()){
            if (proceso == 'activation'){
                // llamada callout inicio proceso.
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('TRG_StartProcess');
                String tokenPlatform = 'BBOO';
                String tokenUser = 'GTS_GLOBAL';
                TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
                String response = Global_IntegrationWrapper.launchHTTP(serviceactivation, configWs.CNT_Endpoint__c,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
                //String response = Global_IntegrationWrapper.launchHttp(serviceactivation, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
                System.debug('>>>>>>>' + response);
                
                ServiceActivationId res = (ServiceActivationId) System.JSON.deserialize(response, ServiceActivationId.class);
                System.debug('respuesta servicio activación ' +res);
                System.debug('DESERIALIZADO :' + res.serviceActivationId);

                Account acc = [SELECT Id, ACC_serviceActivationId__c from Account where Id =: idAccount];
                acc.ACC_serviceActivationId__c = res.serviceActivationId;

                // Este update está metido dentro de un for, al ser un método futuro no podemos devolver el valor en una lista y actualizar después, por ahora no es un
                // problema, pero si se rellenase el administrador y el enrollment en el onboarding en algún momento podría serlo.
                update acc;
                
            }
            if (proceso == 'cambio estado'){
                // llamada callout cambio de estado
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('TGR_ChangeStatusOTV');
                String response = Global_IntegrationWrapper.launchHttp(serviceactivation, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
                System.debug('>>>>>>>' + response);
            }   
        }
        System.debug('HANDLER_Account.calloutStarProcess >>>>> END');

    }    
   
}