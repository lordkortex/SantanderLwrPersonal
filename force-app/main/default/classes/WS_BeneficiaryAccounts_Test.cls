@isTest
public class WS_BeneficiaryAccounts_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    } 
    

    @isTest
    static void execute_Test(){
        
        Test.setMock(HttpCalloutMock.class, new WS_BeneficiaryAccounts_MockHttp.BeneficiaryAccounts());

        String userDataStr = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(userDataStr, WrapperUserData.class);
        
        WS_BeneficiaryAccounts beneficiaryAccounts = new WS_BeneficiaryAccounts(userData);
        Test.startTest();
        beneficiaryAccounts.execute();
        Test.stopTest();
    }

}