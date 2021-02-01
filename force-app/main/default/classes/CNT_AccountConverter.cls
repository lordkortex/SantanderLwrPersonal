/*----------------------------------------------------------------------------------
Author:         A. Duarte Rausell
Company:        Deloitte
Description:    Controller of CMP_BackFrontAccountConverter
Test Class:     CNT_AccountConverter_Test
History
<Date>          <Author>        		<Description>
22/06/2020      A. Duarte Rausell     	Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_AccountConverter {
    
    @AuraEnabled
    public static List<String> getCurrencies(){
        try{
            return Global_Utilities.getISO3Values();
        } catch(Exception e ){ 
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static Object callAccountServices(String operation, String cashNexusId, String bic, String localId, String accountCurrency){
        System.debug('Inside CNT_AccountConverter.callAccountServices');
        System.debug('Params - operation: '+operation);
        System.debug('Params - bic: '+bic);
        System.debug('Params - cashNexusId: '+cashNexusId);
        System.debug('Params - localId: '+localId);
        System.debug('Params - accountCurrency: '+accountCurrency);

        String requestBody;
        Object response;
        
        //SEARCH
        if('search'.equals(operation)){
            requestBody = '{"accountsList":[{"accountId":"'+cashNexusId+'","bankId":"'+bic+'","currency":"'+accountCurrency+'"}]}'; 
            response = getAccountTranslation(requestBody);

        //CREATE
        }else if('create'.equals(operation)){
            requestBody = '{"accountId":"'+cashNexusId+'","accountLocalId":"'+localId+'","bankId":"'+bic+'","currency":"'+accountCurrency+'"}';
            response = createAccountTranslation(requestBody);
            
        //UPDATE
        }else if('update'.equals(operation)){
            response = updateAccountTranslation(bic, cashNexusId, localId, accountCurrency);

        //DELETE
        }else if('delete'.equals(operation)){
            response = deleteAccountTranslation(bic, cashNexusId);
        }
        
        return response;
    }

    @AuraEnabled
    public static WRAPPER_AccountTranslation getAccountTranslation(String requestBody){
        try {
            System.debug('Inside CNT_AccountConverter.getAccountTranslation');
            system.debug('Params - requestBody: '+requestBody);

            String response;
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontAccountConverterSearch');
            
            if(Test.isRunningTest()){
            	response = '{"accounts":[{"bankId":"TESTTEST","accountId":"9999999999999GTS","currency":"EUR","listIds":[{"idType":"BBA","accountId":"9999999999999999"}]}]}';
            }else{
                //Call the service
                response = Global_IntegrationWrapper.launchHttp(requestBody,configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
            	//response = '{"accounts":[{"bankId":"Test","accountId":"Test","currency":"BRL","listIds":[{"idType":"BBA","accountId":"Test"}]}]}';
            }
            
            if (String.isNotBlank(response)){
                WRAPPER_AccountTranslation translation = WRAPPER_AccountTranslation.parse(response);
                return translation;
            } else {
                throw new customException(Label.getDataError);
            }
        }
        catch (Exception e) {
            System.debug('CNT_AccountConverter.getAccountTranslation: ' + e.getMessage());
        }
        return null;
    }
    
	@AuraEnabled
    public static String createAccountTranslation(String requestBody){
        try {
            System.debug('Inside CNT_AccountConverter.createAccountTranslation');
            system.debug('Params - requestBody: '+requestBody);
            
            String response;
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontAccountConverterCreate');
            system.debug('configWs: '+configWs);
            
            if(Test.isRunningTest()){
            	response = '{"accounts":[{"bankId":"TESTTEST","accountId":"9999999999999GTS","currency":"EUR","listIds":[{"idType":"BBA","accountId":"9999999999999999"}]}]}';
            }else{
                //Call the service
                response = Global_IntegrationWrapper.launchHttp(requestBody,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
            	//response = '{"accounts":[{"bankId":"Test","accountId":"Test","currency":"BRL","listIds":[{"idType":"BBA","accountId":"Test"}]}]}';
            }
            
            if (String.isNotBlank(response)){
                return 'CREATEOK';
            } else {
                throw new customException(Label.getDataError);
            }
        }
        catch (Exception e) {
            System.debug('CNT_AccountConverter.createAccountTranslation: ' + e.getMessage());
        }
        return 'CREATEKO';
    }
	
	@AuraEnabled
    public static String updateAccountTranslation(String bankId, String accountId, String localAccountId, String accountCurrency){
        try {
            System.debug('Inside CNT_AccountConverter.updateAccountTranslation');
			System.debug('Params - bankId: '+bankId);
			System.debug('Params - accountId: '+accountId);
            System.debug('Params - localAccountId: '+localAccountId);
            System.debug('Params - accountCurrency: '+accountCurrency);
            
            String response;
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontAccountConverterModify');
            
            //Prepare the endpoint with the parameter values
            configWs.CNT_Endpoint__c = configWs.CNT_Endpoint__c.replace('{bankId}',bankId).replace('{accountId}', accountId);
            if(localAccountId != null && !''.equals(localAccountId)){
                configWs.CNT_Endpoint__c = configWs.CNT_Endpoint__c + '?accountLocalId='+localAccountId;
            }
            if(accountCurrency != null && !''.equals(accountCurrency)){
                configWs.CNT_Endpoint__c = configWs.CNT_Endpoint__c + '&currency='+accountCurrency;
            }
            System.debug('configWs: '+configWs);
            
            if(Test.isRunningTest()){
                response = '{"accounts":[{"bankId":"TESTTEST","accountId":"9999999999999GTS","currency":"EUR","listIds":[{"idType":"BBA","accountId":"9999999999999999"}]}]}';
            }else{
                //Call the service
                response = Global_IntegrationWrapper.launchHttp('',configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
                //response = '{"accounts":[{"bankId":"Test","accountId":"Test","currency":"BRL","listIds":[{"idType":"BBA","accountId":"Test"}]}]}';
            }
            
            if (String.isNotBlank(response)){
                return 'UPDATEOK';
            } else {
                throw new customException(Label.getDataError);
            }
        }
        catch (Exception e) {
            System.debug('CNT_AccountConverter.updateAccountTranslation: ' + e.getMessage());
        }
        return 'UPDATEKO';
    }
	
	@AuraEnabled
    public static String deleteAccountTranslation(String bankId, String accountId){
        try {
            System.debug('Inside CNT_AccountConverter.deleteAccountTranslation');
            System.debug('Params - bankId: '+bankId);
            System.debug('Params - accountId: '+accountId);
            
            String status;
            String response;
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontAccountConverterDelete');
            
            //Modify the endpoint with the parameter values
            configWs.CNT_Endpoint__c = configWs.CNT_Endpoint__c.replace('{bankId}',bankId).replace('{accountId}', accountId);
            System.debug('configWs: '+configWs);
                
            if(Test.isRunningTest()){
                status = 'DELETEOK';
            }else{
                //Call the service
                response = Global_IntegrationWrapper.launchHttp('',configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
                status = Global_IntegrationWrapper.statusCode;
                //response = '200';
            }
            if (String.isNotBlank(status)){
                return 'DELETEOK';
            } else {
                throw new customException(Label.getDataError);
            }
        }
        catch (Exception e) {
            System.debug('CNT_AccountConverter.deleteAccountTranslation: ' + e.getMessage());
        }
        return 'DELETEKO';
    }
}