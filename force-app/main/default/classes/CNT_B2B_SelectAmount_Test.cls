@isTest
public class CNT_B2B_SelectAmount_Test {

    @testSetUp
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createB2BOrderingFilters();
    }
    
    @isTest
    static void getExchangeRate_Test(){
        
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());

        String res = MockResponse.B2BData_PaymentAmount();

        WRAPPER_B2B_Data.PaymentAmount paymentData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(res,  WRAPPER_B2B_Data.PaymentAmount.class);             
        res = MockResponse.B2BData_AccountData();
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class);
        res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
        test.startTest();	
        CNT_B2B_SelectAmount.getExchangeRate('paymentId', 'requestType', paymentData, accountData, sourceAccountData, sourceAccountData);
		test.stopTest();
    }
    
    
    @isTest
    static void getLimits_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
       
        String res = MockResponse.B2BData_PaymentAmount();
        WRAPPER_B2B_Data.PaymentAmount paymentData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(res,  WRAPPER_B2B_Data.PaymentAmount.class);             
		res = MockResponse.B2BData_AccountData();
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class);
        res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
        res = MockResponse.AccountList_AccountDetails('ES', 'GBR');
        WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
        res = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(res, WrapperUserData.class);
		
        test.startTest();
        CNT_B2B_SelectAmount.getLimits ('paymentId',  'requestType', paymentData, userData, accountData,  sourceAccountData,  recipientAccountData);
        CNT_B2B_SelectAmount.getLimits ('paymentId',  'requestType', paymentData, userData, accountData,  recipientAccountData,  sourceAccountData);
        test.stopTest();
    }
    
    @isTest
    static void getTransferFees_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
        String res = MockResponse.B2BData_PaymentAmount();
        WRAPPER_B2B_Data.PaymentAmount paymentData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(res,  WRAPPER_B2B_Data.PaymentAmount.class);             
		res = MockResponse.B2BData_AccountData();
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class);
        res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
        res = MockResponse.AccountList_AccountDetails('ES', 'GBR');
        WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
		
        test.startTest();
        CNT_B2B_SelectAmount.getTransferFees ('paymentId', paymentData, accountData, sourceAccountData, recipientAccountData);
        test.stopTest();
    }
    
    @isTest
    static void accountValidation_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
        String res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
       	test.startTest();
        CNT_B2B_SelectAmount.accountValidation (sourceAccount, 1000);
        test.stopTest();

    }
    
    @isTest
    static void updateSelectAmount_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
        String res = MockResponse.B2BData_AccountData();
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class);
		res = MockResponse.B2BData_PaymentAmount();
        WRAPPER_B2B_Data.PaymentAmount paymentData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(res,  WRAPPER_B2B_Data.PaymentAmount.class);    
		res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
        
        test.startTest();
        CNT_B2B_SelectAmount.updateSelectAmount('paymentId', accountData, paymentData, sourceAccountData);
		test.stopTest();
    }
    @isTest
    static void getCurrencyByCountry_TestNexus() {
        
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
        String res = MockResponse.wrapperUserData('Nexus');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(res, WrapperUserData.class);
        
        test.startTest();
        //CNT_B2B_SelectAmount.getCurrencyByCountry(userData, 'ES');
        test.stopTest();
        
    }
     @isTest
    static void getCurrencyByCountry_TestOneTrade() {
        
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
        String res = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(res, WrapperUserData.class);
        
        test.startTest();
        //CNT_B2B_SelectAmount.getCurrencyByCountry(userData, 'ES');
        test.stopTest();
    }

     @isTest
    static void getCurrencyByCountry_TestCountrySupport() {
        
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
        String res = MockResponse.wrapperUserData('Country Support');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(res, WrapperUserData.class);
        
        test.startTest();
        //CNT_B2B_SelectAmount.getCurrencyByCountry(userData, 'ES');
        test.stopTest();
    }

}