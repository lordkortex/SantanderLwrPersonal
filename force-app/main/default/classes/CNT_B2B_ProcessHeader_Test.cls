@isTest
public class CNT_B2B_ProcessHeader_Test {

    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void ecryptData_Test(){
        CNT_B2B_ProcessHeader.encryptData('Test');
    }
    
    @isTest
    static void updateStatus_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_ProcessHeader_MockHttp());
        Test.startTest();
        CNT_B2B_ProcessHeader.updateStatus('12345', 'status', 'reason');
        Test.stopTest();
    }
}