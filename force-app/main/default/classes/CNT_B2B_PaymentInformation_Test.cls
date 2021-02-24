@isTest
public class CNT_B2B_PaymentInformation_Test {
    
    @testSetup
    static void setup(){
    	DataFactory.getCustomSettingCryptoKey(true);
   	 	DataFactory.createWsConfigurationSetting(true);
    }  
    
    
 	@isTest
    public static void getSignatureStructure_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentInformation_MockHttp.Structure());
        String str = MockResponse.B2BData_PaymentAmount(); 
        WRAPPER_B2B_Data.PaymentAmount amount = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);

        Test.startTest();
        CNT_B2B_PaymentInformation.getSignatureStructure(false,'paymentId', 'service_id', 'tcurrency', 'customerId', 'channel', 'amount');
        Test.stopTest();
    }
    
    
    @isTest
    public static void updatePaymentInformation_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentInformation_MockHttp.BasicResponse());
        
        Test.startTest();
        CNT_B2B_PaymentInformation.updatePaymentInformation('paymentId', 'clientReference', 'purpose', 'description', 'chargeBearer', 'paymentMethod', 'commercialCode');
        Test.stopTest();
    }
    
 	@isTest
    public static void checkFCCDowJones_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentInformation_MockHttp.BasicResponse());
        
        Test.startTest();
        CNT_B2B_PaymentInformation.checkFCCDowJones ('paymentId', 'description');
        Test.stopTest();
    }
    
	@isTest
    public static void encryptData_Test() {
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentInformation_MockHttp.BasicResponse());
        
        Test.startTest();
		CNT_B2B_PaymentInformation.encryptData('Test');
        Test.stopTest();
    }
        
	@isTest
    public static void updateStatus_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentInformation_MockHttp.BasicResponse());
        
        Test.startTest();
		CNT_B2B_PaymentInformation.updateStatus('paymentId', 'status', 'reason');
        Test.stopTest();
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
        CNT_B2B_PaymentInformation.getLimits ('paymentId',  paymentData, userData,   accountData,  sourceAccountData,  recipientAccountData);
        CNT_B2B_PaymentInformation.getLimits ('paymentId',  paymentData, userData,  accountData,  recipientAccountData,  sourceAccountData);
        test.stopTest();
    }
}