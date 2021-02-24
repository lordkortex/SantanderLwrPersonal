@isTest
public class STR_ControllerStructurals_Test {

    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createAccount();
    }
    
    @isTest
    static void retrieveRules_Test(){
    	Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Account acc = [SELECT Id FROM Account LIMIT 1];
        acc.ACC_TXT_CompanyId__c = 'globalId';
        update acc;
        
        Test.startTest();
        STR_ControllerStructurals.retrieveRules(acc.Id);
        Test.stopTest();
    }    
}