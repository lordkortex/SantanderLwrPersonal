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
        Map<String, String> navigatorInfo = new Map<String, String>();
 
        Test.startTest();
        CNT_B2B_PaymentInformation.getSignatureStructure('paymentId', 'service_id','channel', amount, sourceAccount, sourceAccount, 'subject',navigatorInfo);
        Test.stopTest();
    }
    
    
    @isTest
    public static void updatePaymentInformation_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentInformation_MockHttp.BasicResponse());
        
        Test.startTest();
        CNT_B2B_PaymentInformation.updatePaymentInformation('paymentId', 'clientReference', 'purpose', 'description', 'chargeBearer', 'paymentMethod', 'commercialCode', 12,'baseCurrency');
        Test.stopTest();
    }
    
 	@isTest
    public static void checkFCCDowJones_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentInformation_MockHttp.BasicResponse());
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountList_AccountDetails('ES', 'EUR'), WRAPPER_AccountList.AccountDetails.class);
        WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountList_AccountDetails('ES', 'EUR'), WRAPPER_AccountList.AccountDetails.class);


        Test.startTest();
        CNT_B2B_PaymentInformation.checkFCCDowJones('paymentId', 'description', sourceAccountData, recipientAccountData);
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
    public static void getLimits_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentInformation_MockHttp.BasicResponse());
        //create sourceAccount 
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
        //create destinationAccount 
        WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.destinationAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
        //Create amountData
        WRAPPER_B2B_Data.PaymentAmount paymentData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(MockResponse.amountData_Fraud(), WRAPPER_B2B_Data.PaymentAmount.class);
        //Create UserData Other
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('other'), WrapperUserData.class);
        String productID_b2b = 'Book_to_Book';
        String productID_iip = 'International_Instant_Payment';
        
        Test.startTest();
        CNT_B2B_PaymentInformation.getLimits(productID_b2b, 'serviceId', 'paymentId', paymentData, userData, sourceAccountData, recipientAccountData);
        CNT_B2B_PaymentInformation.getLimits(productID_iip, 'serviceId', 'paymentId', paymentData, userData, sourceAccountData, recipientAccountData);

        Test.stopTest();
    }
    
    @isTest
    public static void postFraud_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentInformation_MockHttp.BasicResponse());
        //create sourceAccount 
        WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
        //create destinationAccount 
        WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.destinationAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
        //Create amountData
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(MockResponse.amountData_Fraud(), WRAPPER_B2B_Data.PaymentAmount.class);
        //Create UserData Other
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('other'), WrapperUserData.class);
        
        Map<String, String> navigatorInfo = new Map<String, String>();
        
		Map<String, String> stepData = new Map<String, String>();
        stepData.put('description', 'description');
        stepData.put('reference', 'reference');

        String amountEnteredFrom = 'source';
        String productID_b2b = 'Book_to_Book';
        Test.startTest();
		CNT_B2B_PaymentInformation.postFraud(userData, stepData, navigatorInfo, 'paymentId', productID_b2b, 'serviceId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);
        Test.stopTest();
    }
}