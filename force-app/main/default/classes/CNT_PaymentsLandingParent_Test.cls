@isTest
public class CNT_PaymentsLandingParent_Test {

    
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }
    
    
    @isTest
    static void methods_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLandingParent_MockHttp.BasicResponse());
        test.startTest();
        CNT_PaymentsLandingParent.getUserData();
        CNT_PaymentsLandingParent.getAccountData();
        test.stopTest();
    }
    
    @isTest
    static void getPaymentsStatuses_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLandingParent_MockHttp.PaymentsStatus());
        String str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        List<WRAPPER_AccountList.AccountDetails> accountDetailsList = new List<WRAPPER_AccountList.AccountDetails>();
        accountDetailsList.add(accountDetails);
        test.startTest();
        CNT_PaymentsLandingParent.getPaymentsStatuses(accountDetailsList, 'GlobalId');
        test.stopTest();
    }
 
    
    @isTest
    static void downloadPaymentsTest() {
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLandingParent_MockHttp.BasicResponse());
        String str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        List<WRAPPER_AccountList.AccountDetails> accountDetailsList = new List<WRAPPER_AccountList.AccountDetails>();
        accountDetailsList.add(accountDetails);
        test.startTest();
        CNT_PaymentsLandingParent.downloadPayments(accountDetailsList, '.txt');
        test.stopTest();
    
	}
    
    @isTest
    static void getPaymentsInformationWithoutAccountsTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLandingParent_MockHttp.OperationsList());
        String str = MockResponse.TestResponse();
        WRAPPER_PaymentList response = new WRAPPER_PaymentList();
        test.startTest();
        CNT_PaymentsLandingParent.getPaymentsInformationWithoutAccounts();
        test.stopTest();
    }
   
    @isTest
    static void removeFileTest() {
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLandingParent_MockHttp.BasicResponse());
        String id = MockResponse.TestResponse();
        test.startTest();
        CNT_PaymentsLandingParent.removeFile(id);
        test.stopTest();
    }
   
    @isTest
    static void decryptDataTest() {
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLandingParent_MockHttp.BasicResponse());
        String str = MockResponse.TestResponse();
        test.startTest();
        CNT_PaymentsLandingParent.decryptData(Global_Utilities.encryptData(str));
        test.stopTest();
    }
        @IsTest
    static void searchPaymentsInformation_Test(){
        
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLandingParent_MockHttp.OperationsList());
        
        String str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        Boolean pendingAuthorization = true;
        Boolean lastOperationsFlag = true;
        Decimal amountFrom = 200.00;
        Decimal amountTo =300.00;
        
        String res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
        List<WS_OperationsList.SourceAccountList> sourceAccountList = new List<WS_OperationsList.SourceAccountList>();        

        List<WS_OperationsList.CurrencyList> currencyList = new List<WS_OperationsList.CurrencyList>();
        List<WS_OperationsList.StatusList> statusList = new List<WS_OperationsList.StatusList>();
        
        str = MockResponse.AccountList_AccountDetails('ES', 'GBP');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        List<WRAPPER_AccountList.AccountDetails> accountDetailsList = new List<WRAPPER_AccountList.AccountDetails>();
        accountDetailsList.add(accountDetails);
        
        test.startTest();
        CNT_PaymentsLandingParent.searchPaymentsInformation('GlobalID', pendingAuthorization, sourceAccountList, 'ES', amountFrom, amountTo, currencyList,
                                                            'productId', 'clientReference', 'valueDateFrom', 'valueDateTo', lastOperationsFlag, statusList, accountDetailsList);
        test.stopTest();
    }
    
    @IsTest
    static void getPaymentsInformation_Test(){
        
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLandingParent_MockHttp.OperationsList());
        
        String str = MockResponse.AccountList_AccountDetails('ES', 'GBP');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        List<WRAPPER_AccountList.AccountDetails> accountDetailsList = new List<WRAPPER_AccountList.AccountDetails>();
        accountDetailsList.add(accountDetails);

        test.startTest();
        CNT_PaymentsLandingParent.getPaymentsInformation(accountDetailsList);
        test.stopTest();
    }
   
    @isTest
    static void getTestPaymentsStatusesInformationTest() {
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLandingParent_MockHttp.PaymentsStatus());
        String userId = '1';
        WRAPPER_PaymentsStatuses paymentStatuses = new WRAPPER_PaymentsStatuses();
        String customLabelValue = '';
        test.startTest();
        CNT_PaymentsLandingParent.getTestPaymentsStatuses(true, userId);
        test.stopTest();
    }
}