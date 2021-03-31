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
        String str = MockResponse.AccountListAccountDetails_GB();
        WRAPPER_AccountList.AccountDetails sourceAccountDataGB = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        str = MockResponse.AccountListAccountDetails_ES();
        WRAPPER_AccountList.AccountDetails sourceAccountDataES = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        
        WS_BeneficiaryAccounts beneficiaryAccountsGB = new WS_BeneficiaryAccounts(userData,sourceAccountDataGB);
        WS_BeneficiaryAccounts beneficiaryAccountsES = new WS_BeneficiaryAccounts(userData,sourceAccountDataES);
        
        Test.startTest();
        beneficiaryAccountsGB.execute();
        beneficiaryAccountsES.execute();
        Test.stopTest();
    }
     @isTest
    static void wrapperResponseTest(){
        WS_BeneficiaryAccounts_MockHttp mock = new WS_BeneficiaryAccounts_MockHttp();
        mock.setResponse();
        WS_BeneficiaryAccounts.OUTPUT res = (WS_BeneficiaryAccounts.OUTPUT) JSON.deserialize(mock.response, WS_BeneficiaryAccounts.OUTPUT.class);
        
        String userDataStr = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(userDataStr, WrapperUserData.class);
        String str = MockResponse.AccountListAccountDetails_GB();
        WRAPPER_AccountList.AccountDetails sourceAccountDataGB = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
       
        WS_BeneficiaryAccounts beneficiaryAccountsGB = new WS_BeneficiaryAccounts(userData,sourceAccountDataGB);
        
        Test.startTest();
        beneficiaryAccountsGB.getList(res);
        Test.stopTest();
    }

}