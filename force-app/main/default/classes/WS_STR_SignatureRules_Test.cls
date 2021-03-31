/*----------------------------------------------------------------------------------
Author:         Andrea Martín
Company:        Deloitte
History
<Date>			<Author>		<Description>
22/02/2021		Andrea Martín     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WS_STR_SignatureRules_Test {
    
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
            WS_STR_SignatureRules.INPUT input = new WS_STR_SignatureRules.INPUT();
            input.ruleId= '47f56a77-8555-4eb8-ab77-33c81aa9d309';
            input.companyId = 'COMP1';
            input.tcurrency = 'GBP';
            input.serviceId = '00000001';
            input.amountFrom = '5000.01';
            input.amountTo = '10000.00';
            Test.startTest();
            WS_STR_SignatureRules.getRules(input);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups_Test.getRules_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
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

            String body = '';
            Test.startTest();
            WS_STR_SignatureRules.postRules(body);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups_Test.postRules_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
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
			WS_STR_SignatureRules.INPUT input = new WS_STR_SignatureRules.INPUT();
            input.ruleId= '47f56a77-8555-4eb8-ab77-33c81aa9d309';
            input.companyId = 'COMP1';
            input.tcurrency = 'GBP';
            input.serviceId = '00000001';
            input.amountFrom = '5000.01';
            input.amountTo = '10000.00';
            String body = '';
            Test.startTest();
            WS_STR_SignatureRules.patchRule(input, body);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups_Test.patchRule_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
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
			WS_STR_SignatureRules.INPUT input = new WS_STR_SignatureRules.INPUT();
            input.ruleId= '47f56a77-8555-4eb8-ab77-33c81aa9d309';
            input.companyId = 'COMP1';
            input.tcurrency = 'GBP';
            input.serviceId = '00000001';
            input.amountFrom = '5000.01';
            input.amountTo = '10000.00';
            Test.startTest();
            WS_STR_SignatureRules.deleteRule(input);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups_Test.deleteRule_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    @isTest 
    static  void output_test(){
        try{
            

            Test.startTest();
            List<WS_STR_SignatureRules.SignerGroup> LevelSignersList = new List<WS_STR_SignatureRules.SignerGroup>();
            WS_STR_SignatureRules.SignerGroup signerGroup = new WS_STR_SignatureRules.SignerGroup();
            signerGroup.groupId = 'GR1';
            signerGroup.level = '1';
            signerGroup.signsRequired= 1; 
            signerGroup.signersRequired= 1;
            LevelSignersList.add(signerGroup);
            
            List<WS_STR_SignatureRules.ResponseStructure> responseStructureList = new List<WS_STR_SignatureRules.ResponseStructure>();
            WS_STR_SignatureRules.ResponseStructure responseStructure = new WS_STR_SignatureRules.ResponseStructure();
            responseStructure.ruleId = '47f56a77-8555-4eb8-ab77-33c81aa9d309';
            responseStructure.companyId = 'COMP1';
            responseStructure.tcurrency = 'GBP';
            responseStructure.serviceId = '00000001';
            responseStructure.amountFrom = 5000.01;
            responseStructure.amountTo = 10000.00;
            responseStructure.businessGroup = 'Coca Cola Inernational Inc.';
            responseStructure.channel = 'web';
            responseStructure.contract = '00498976780300237000';
            responseStructure.cmc = '*';
            responseStructure.LevelSignersList = LevelSignersList;
            responseStructureList.add(responseStructure);
            
            WS_STR_SignatureRules.OUTPUT output= new WS_STR_SignatureRules.OUTPUT();
            output.responseStructure = responseStructureList;
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups_Test.output_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}