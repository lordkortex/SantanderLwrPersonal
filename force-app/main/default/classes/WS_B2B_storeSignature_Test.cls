@isTest
public class WS_B2B_storeSignature_Test {

    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void storeSignature_Test(){
        
        Test.setMock(HttpCalloutMock.class, new WS_B2B_storeSignature_MockHttp.BaseResponse());
        
        Test.startTest();
        WS_B2B_storeSignature store = new WS_B2B_storeSignature();
        WS_B2B_storeSignature.storeSignature('operationGlobalId', 'scaId');
        Test.stopTest();
        
    }
    
}