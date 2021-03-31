/*----------------------------------------------------------------------------------
Author:         Andrea Martín
Company:        Deloitte
History
<Date>			<Author>		<Description>
01/03/2021		Andrea Martín     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class STR_ServiceStructurals_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true); 

    }
     @isTest 
    static  void getRules_test(){
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
                Name = 'WS_STR_SignatureRules',
                CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/gts_signature/rule',
                CNT_HTTPMethod__c = 'GET',
                tokenPlatform__c = 'GTS',
                tokenUser__c = 'local',
                CNT_Service__c = 'mulesoft'
            );
            insert configWs;
            
            Test.setMock(HttpCalloutMock.class, new WS_STR_SignatureRules_MockHttp.getRulesResponse());
            String companyId = '123';

            Test.startTest();
            STR_ServiceStructurals.getRules(companyId);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('STR_ServiceStructurals_Test.getRules_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
       @isTest 
    static  void postRules_test(){
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
                Name = 'WS_STR_SignatureRules',
                CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/gts_signature/rule',
                CNT_HTTPMethod__c = 'POST',
                tokenPlatform__c = 'GTS',
                tokenUser__c = 'local',
                CNT_Service__c = 'mulesoft'
            );
            insert configWs;
            Test.setMock(HttpCalloutMock.class, new WS_STR_SignatureRules_MockHttp.getRulesResponse());
             String companyId = '123';
            List<STR_SignatureRule__c> ruleList = new List<STR_SignatureRule__c>();

            String body = '';
            Test.startTest();
            STR_ServiceStructurals.postRules(companyId, ruleList);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('STR_ServiceStructurals_Test.postRules_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest 
    static  void patchRule_test(){
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
                Name = 'WS_STR_SignatureRules',
                CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/gts_signature/rule',
                CNT_HTTPMethod__c = 'PATCH',
                tokenPlatform__c = 'GTS',
                tokenUser__c = 'local',
                CNT_Service__c = 'mulesoft'
            );
            insert configWs;
            
            Test.setMock(HttpCalloutMock.class, new WS_STR_SignatureRules_MockHttp.getRulesResponse());
			STR_SignatureRule__c rule = new STR_SignatureRule__c();
            Test.startTest();
            STR_ServiceStructurals.patchRule(rule);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('STR_ServiceStructurals_Test.patchRule_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
        @isTest 
    static  void deleteRule_test(){
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
                Name = 'WS_STR_SignatureRules',
                CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/gts_signature/rule',
                CNT_HTTPMethod__c = 'PATCH',
                tokenPlatform__c = 'GTS',
                tokenUser__c = 'local',
                CNT_Service__c = 'mulesoft'
            );
            insert configWs;
            
            Test.setMock(HttpCalloutMock.class, new WS_STR_SignatureRules_MockHttp.getRulesResponse());
			STR_SignatureRule__c rule = new STR_SignatureRule__c();
            Test.startTest();
            STR_ServiceStructurals.deleteRule(rule);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('STR_ServiceStructurals_Test.deleteRule_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
}