/*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Controller of CMP_Account_Transactions_AccountDetails
Test Class: 	CNT_AccountDetails_Test
History 
<Date>          <Author>            <Change Description>
15/04/2020      Shahad Naji  	Intial Version
------------------------------------------------------------*/    
public class CNT_AccountDetails {
    
    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:   	Returns a personal settings information
    History
    <Date>			<Author>		<Description>
    06/04/2020		R. Cervino     Initial version
    ----------------------------------------------------------------------------------*/  
    @AuraEnabled (cacheable=true)
    public static WRAPPER_PersonalSettings getPersonalSettings(){
        
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();     
        
        configWs = CNT_ApiConfiguration__c.getValues('PersonalSettings');
        String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);       
        if (String.isNotBlank(response)) {
            WRAPPER_PersonalSettings aux = WRAPPER_PersonalSettings.parse(response);
           // System.debug(JSON.serialize(aux));
            return aux;
        }
        return null;
    }

    
    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Updates Alias bank
    History 
    <Date>          <Author>            <Change Description>
    15/04/2020      Shahad Naji  		Intial Version
    ------------------------------------------------------------*/  
    @AuraEnabled
    public static boolean updateAliasBank(String actionParameters){
        boolean ok = true;
        try{            
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();     
            
            configWs = CNT_ApiConfiguration__c.getValues('CNT_AccountDetails_ChangeAliasBank');
            String response = Global_IntegrationWrapper.launchHTTP(actionParameters, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
             
			if (String.isNotBlank(response)) {
               ok=true;
               // system.debug('SNJ :' + response);
               // system.debug('SNJ 15/04/2020 updateAliasBank');
            }else{
                ok = false;
            }
        }catch(Exception e ){
            ok = false;
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
		//system.debug('SNJ updateAliasBank');        
        return ok;
    }
    
    /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Updates Alias account 
    History 
    <Date>          <Author>            <Change Description>
    15/04/2020      Shahad Naji  		Intial Version
    ------------------------------------------------------------*/  
    @AuraEnabled
    public static boolean updateAliasAccount(String actionParameters){
        boolean ok = true;
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();     
            
            configWs = CNT_ApiConfiguration__c.getValues('CNT_AccountDetails_ChangeAliasAccount');
            String response = Global_IntegrationWrapper.launchHTTP(actionParameters, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);

            system.debug('respose: ' + response);
            if (String.isNotBlank(response)) {
                ok=true;
               // system.debug('SNJ 15/04/2020 updateAliasAccount');
            } else{
                ok = false;
            }
            //system.debug('SNJ :' + response);
            //system.debug('SNJ 15/04/2020 updateAliasBank');
        }catch(Exception e){
            ok = false;
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
       //  system.debug('SNJ updateAliasAccount');
        return ok;
    }

    /*------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Updates alias account GTS for One Trade
    History 
    <Date>          <Author>                <Change Description>
    24/08/2020      Guillermo Giral 		Intial Version
    ------------------------------------------------------------*/  
    @AuraEnabled
    public static Map<String,Boolean> updateOneTradeAlias(String actionParameters, String newAlias){
        Boolean isAliasUpdated = false;
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();     
            // TO-DO: Update account details endpoint
            configWs = CNT_ApiConfiguration__c.getValues('CNT_OneT_AccountDetails');
            HttpResponse res = Global_IntegrationWrapper.launchHTTPWithResponse(actionParameters, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, 
                                                                                    new Map<String,String>{'Access-Channel' => 'Web'}, UserInfo.getUserId(), 
                                                                                    false, null);
            isAliasUpdated = String.valueOf(res.getStatusCode()).startsWith('2');
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred in updateOneTradeAlias(): ' + e.getMessage());
        }
        return new Map<String,Boolean>{ newAlias => isAliasUpdated };
        //return new Map<String,Boolean>{ 'testAlias' => true };
    }
}