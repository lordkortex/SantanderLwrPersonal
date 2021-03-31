/*------------------------------------------------------------
Author:         Alberto Borraz
Company:        Deloitte
Description:	cmpOTVSubsidiariesSelection
Test Class:		CNT_OTV_SubsidiariesSelection_Test
History 
<Date>          <Author>           <Change Description>
12/03/2021	    Alberto Borraz     Initial version
------------------------------------------------------------*/ 
public without sharing class CNT_OTV_SubsidiariesSelection {    	
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to obtain a list of accounts from a mulesoft endpoint 
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static List<WRAPPER_OTV_Info.AccountUrlService> getLstAccounts(){
        Id userId = UserInfo.getUserId();
        List<Account> accountList = new List<Account>();
        List<WRAPPER_OTV_Info.AccountUrlService> lstAccountService;
        try{
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_CompanyHierarchy_GET');
        	String finalEndPoint = configWs.CNT_Endpoint__c;
        	User currentUser = [SELECT Id, 
                                   	   ContactId,
                                   	   Contact.Account.ACC_TXT_CompanyId__c
                              	FROM User 
                             	WHERE Id = :userId
                             	LIMIT 1];
        	if(currentUser.Contact.Account.ACC_TXT_CompanyId__c != null){
            	finalEndPoint = finalEndpoint.replace('{companyGlobalId}', '2'); //accountList[0].ACC_TXT_CompanyId__c);
        	}
            String response = Global_IntegrationWrapper.launchHttp('', finalEndPoint , configWs.CNT_HTTPMethod__c);
            System.debug('getLstAccounts response>>>>>>>' + response);
            List<WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary> lstSub = WRAPPER_CompanySubsidiary_OTV.parse(response);
            lstAccountService = getAccountUrl(lstSub);
        }catch(Exception e){
            
        }
		return lstAccountService;
    }
    
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to get the static resource for each value in the list of accounts 
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static List<WRAPPER_OTV_Info.AccountUrlService> getAccountUrl(List<WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary> lstSub){
        List<WRAPPER_OTV_Info.AccountUrlService> lstAcctUrl = new List<WRAPPER_OTV_Info.AccountUrlService>();
        try{
            if(lstSub.size()>0){
                StaticResource static_resource = [SELECT Id, 
                                                         SystemModStamp
                                                    FROM StaticResource 
                                                   WHERE Name = 'Flags'
                                                   LIMIT 1];
                for(WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary sub : lstSub){
                    String url = '/resource/'
                                + String.valueOf(((DateTime)static_resource.get('SystemModStamp')).getTime())
                                + '/Flags/' 	
                                + (sub.country == null ? 'Default' : sub.country) + '.svg';  
                    
                    WRAPPER_OTV_Info.AccountUrlService a = new WRAPPER_OTV_Info.AccountUrlService();
                    a.companyName 	  = sub.companyName;
                    a.country     	  = sub.countryIncorporation;
                    a.companyGlobalId = sub.companyGlobalId;
                    //Pendiente verificar valor de la lista a incluir (varios valores)
                    a.documentType 	  = sub.companyIdentifications[0].documentType[0];
                    a.documentNumber  = sub.companyIdentifications[0].documentNumber[0];
                    a.imgCountry 	  = url;
                    lstAcctUrl.add(a);
                }
       		} 
		}catch(Exception e){
            throw new CustomException('ERROR RETRIEVING getAccountUrl');
        }
        return lstAcctUrl;
    }
	/*----------------------------------------------------------------------------------
	Author:         Alberto Borraz
	Company:        
	Description:    Update Service Activation status and picklist from Salesforce for Matrix company
	History
	<Date>          <Author>        	<Description>
	11/02/2021      Alberto Borraz     	Initial version
	----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void updateSubsidiaryStatus(String updateStr) {
        Id userId = UserInfo.getUserId();
        try{
            String[] lstSubsidiaries = (String[]) System.JSON.deserialize(updateStr, String[].class);
			List<Account> lstAccts = [SELECT Id, 
                                             ACC_CHK_OTView_Enrollment__c,
                                             ACC_TXT_CompanyId__c,
                                      		 ACC_serviceActivationId__c,
                                      		 Parent.ACC_TXT_CompanyId__c
                                        FROM Account
                                       WHERE Id IN :lstSubsidiaries];
            if(lstAccts.size()>0){
                List<Account> lstAccToUpdate = new List<Account>();
                //for(Account acc: lstSubsidiaries){ REVISAR, estaba puesto este
                for(Account acc: lstAccts){
                    if(acc != null){
                        
                        WRAPPER_OTV_ServiceActivation.ServiceActivationData sad = new WRAPPER_OTV_ServiceActivation.ServiceActivationData();
                        sad.companyId = acc.ACC_TXT_CompanyId__c;
                        sad.serviceActivationType = 'OTV_LOCAL_ACT';
                                                            
                        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_ServiceActivationSub_POST');
                        String finalEndPoint = configWs.CNT_Endpoint__c;
                        finalEndPoint = finalEndpoint.replace('{company_id_matrix}', acc.Parent.ACC_TXT_CompanyId__c);
                        
                        String response = Global_IntegrationWrapper.launchHttp(JSON.Serialize(sad), finalEndPoint, configWs.CNT_HTTPMethod__c);
                        System.debug('startProcessAccountCallout >>>>>>>' + response);    
                        
                        WRAPPER_OTV_ServiceActivation.ServiceActivationResponse res = (WRAPPER_OTV_ServiceActivation.ServiceActivationResponse) System.JSON.deserialize(response, WRAPPER_OTV_ServiceActivation.ServiceActivationResponse.class);
                        acc.ACC_serviceActivationId__c = res.serviceActivationResponse.ServiceActivationId;
                        
                        acc.ACC_PCK_OTView_Enrollment__c = 'In Progress';
                        lstAccToUpdate.add(acc);
                	}  
                }
                update lstAccToUpdate;
        	}            
        }catch(Exception e){
           throw new CustomException('ERROR Updating Subsidiary Status'); 
        }
	}
    
    
	/*----------------------------------------------------------------------------------
	Author:         Alberto Borraz
	Company:        
	Description:    Activation POST of subsidiaries selected
	History
	<Date>          <Author>        	<Description>
	11/02/2021      Alberto Borraz     	Initial version
	----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void updateMatrixStatus() {
        Id userId = UserInfo.getUserId();
        try{
            User currentUser = [SELECT Id,
                                       ContactId, 
                                       Contact.AccountId,
                                       Contact.Account.ACC_serviceActivationId__c,
                                       Contact.Account.Parent.ACC_TXT_CompanyId__c  
                                  FROM User 
                                 WHERE Id = :userId
                                 LIMIT 1];
            
            WRAPPER_OTV_ServiceActivation.serviceActivationDataPath dataPath = new WRAPPER_OTV_ServiceActivation.serviceActivationDataPath();
            datapath.status ='ACTIVE';
            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_ServiceActivation_PATCH');
            String  finalEndPoint = configWs.CNT_Endpoint__c;
            
            if(currentUser.Contact.Account.ACC_serviceActivationId__c != null){
                finalEndPoint = finalEndPoint + '?serviceActivationId=' + currentUser.Contact.Account.ACC_serviceActivationId__c;
            }else{
                finalEndPoint = finalEndPoint + '?companyId=' + '123456789' /*currentUser.Contact.Account.Parent.ACC_TXT_CompanyId__c*/ + '&serviceActivacionType=OTV_GLOBAL_ACT';
            }
            
            String response = Global_IntegrationWrapper.launchHttp(JSON.Serialize(dataPath), finalEndPoint, configWs.CNT_HTTPMethod__c);
            System.debug('updateProcessFinal >>>>>>>' + response);
            
            currentUser.Contact.Account.ACC_PCK_OTView_Enrollment__c = 'Enrolled';
			update currentUser.Contact.Account;         
            
        }catch(Exception e){
           throw new CustomException('ERROR Updating Matrix Status'); 
        }
	}
}