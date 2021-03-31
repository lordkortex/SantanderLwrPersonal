@isTest
public with sharing class TRS_ControllerVAM_Test {

    @testSetup
    static void setup () {
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }

    @isTest
    static void retrieveVirtualAccountsList_Test () {        
        try {
            Test.setMock(HttpCalloutMock.class, new ControllerVAM_MockHttp());
            Test.startTest();
            CNT_VAMParent.getVirtualAccounts();
            Test.stopTest();
        } catch (Exception e) {
            System.debug('TRS_ControllerVAM_Test.retrieveVirtualAccountsList_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest
    static void retrieveVirtualAccountDetail_Test () {        
        try {
            Test.setMock(HttpCalloutMock.class, new ControllerVAM_MockHttp());
            Test.startTest();
            CNT_VAMDetail.getVAMDetail('vamAccount');
            Test.stopTest();
        } catch (Exception e) {
            System.debug('TRS_ControllerVAM_Test.retrieveVirtualAccountDetail_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest
    static void getPriorityPicklist_Test(){
        CNT_VAMDetail.getPriorityPicklist();
    }
    
    @isTest
    static void getUserData_Test(){
        CNT_VAMDetail.getUserData();
    }

    @isTest
    static void CaseMethods_Test(){
        String CaseId = CNT_VAMDetail.createCase('100', 'EUR', 'low', 'subject', 'description', 'VAMAccount' , 'beneficiaryId', 'beneficiaryName', 'beneficiaryBic');
        CNT_VAMDetail.updateCase(CaseId, '100', 'EUR', 'low', 'subject2', 'description2');
        CNT_VAMDetail.getCaseData(CaseId);
    }
}