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
        //System.debug('LURESPONSE >>> '+response);
        //  String response = '{"accountsDataList":[{"account":{"accountId":"2601107298555588881589","idType":"BBA"},"accountIdList":[{"accountId":32180000118359700,"idType":"BBA"}],"alias":"GESTORIA","availableBalance":{"amount":1234.56,"currencyCode":"MXN","lastUpdate":"2020-03-30T16:01:54.23Z"},"balanceAllowed":true,"bankDescription":"Banco Santander Rio","bankId":"ABBYGB20 ","country":"ES","customerId":"000223141","customerName":"Agua de Misiones","description":"Cuenta 123 joven","displayNumber":"00*****384","flags":{"additionalProp1":true,"additionalProp2":true,"additionalProp3":true},"hasSwiftPayment":"YES","hasSwiftPayments":"string","internationalPaymentsAllowed":true,"lastTransactionDate":"string","lastUpdateSwiftPayment":"string","mainBalance":{"amount":1234.56,"currencyCode":"MXN","lastUpdate":"20190314T014319491-0600"},"overdraftLimit":{"amount":1234.56,"currencyCode":"MXN","lastUpdate":"20190314T014319491-0600"},"overdraftUsed":{"amount":1234.56,"currencyCode":"MXN","lastUpdate":"20190314T014319491-0600"},"pain002Active":true,"parentCustomerName":"string","pendingBalance":{"amount":1234.56,"currencyCode":"MXN","lastUpdate":"20190314T014319491-0600"},"status":"Open","transactionsAllowed":true,"type":"Current Account","withholdingBalance":{"amount":1234.56,"currencyCode":"MXN","lastUpdate":"20190314T014319491-0600"}}]}';
       
         if(Test.isRunningTest()){
                response='';
            }
        
        if (String.isNotBlank(response)) 
        {
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
             
            if(Test.isRunningTest()){
                response='';
            }
            
            
            if (String.isNotBlank(response)) 
            {
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
            if(Test.isRunningTest()){
                response='';
            }
            system.debug('respose: ' + response);
            if (String.isNotBlank(response)) 
            {
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
            if(Test.isRunningTest()){
                res.setBody('OK');
                res.setStatusCode(200);
            }
            isAliasUpdated = String.valueOf(res.getStatusCode()).startsWith('2');
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred in updateOneTradeAlias(): ' + e.getMessage());
        }
        return new Map<String,Boolean>{ newAlias => isAliasUpdated };
        //return new Map<String,Boolean>{ 'testAlias' => true };
    }
}