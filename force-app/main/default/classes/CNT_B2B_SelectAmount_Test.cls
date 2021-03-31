@isTest
public class CNT_B2B_SelectAmount_Test {

    @testSetUp
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createB2BOrderingFilters();
        DataFactory.createClaims();
    }
    
    @isTest
    static void getExchangeRate_Test(){
        
        //Test.setMock(HttpCalloutMock.class, new WS_ExchangeRate_MockHttp());
        Test.setMock(HttpCalloutMock.class, new WS_TrackingPaymentOperation_MockHttp());
        String res = MockResponse.B2BData_PaymentAmount();
        
        WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        //WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(null);
        WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.bookToBookDraft(true);
        
        String str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);

        test.startTest();	
        CNT_B2B_SelectAmount.getExchangeRate(paymentDraft);
        CNT_B2B_SelectAmount.getPaymentLine(paymentDraft,'');
        CNT_B2B_SelectAmount.getPaymentDetail(paymentDraft);
        CNT_B2B_SelectAmount.showHideComponents('productId',sourceAccount);

		test.stopTest();
    } 
    
    
    @isTest
    static void getLimits_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
       
        String res = MockResponse.B2BData_PaymentAmount();
       	WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(null);
        res = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(res, WrapperUserData.class);
		
        test.startTest();

        CNT_B2B_SelectAmount.getLimits (userData, paymentDraft);        
        test.stopTest();
    }
    

    
    @isTest
    static void processPaymentTransferFees_test(){
       Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
       

        String res = MockResponse.B2BData_PaymentAmount();
        WRAPPER_B2B_Data.PaymentAmount paymentData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(res,  WRAPPER_B2B_Data.PaymentAmount.class);             
        res = MockResponse.B2BData_AccountData();
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class);
        res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
        res = MockResponse.AccountList_AccountDetails('ES', 'GBR');
        WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);      
        String productId_001 = System.Label.CNF_payment_productId_001;
        String productId_002 = System.Label.CNF_payment_productId_002;
        
        WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(null);

        test.startTest();
        CNT_B2B_SelectAmount.processPaymentTransferFees(paymentDraft);
        //CNT_B2B_SelectAmount.processPaymentTransferFees('paymentId',productId_002, paymentData, accountData,  sourceAccountData, recipientAccountData);

        test.stopTest();
    }
    
    @isTest
    static void updatePaymentFeesInformation_test(){
        try{
           // Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
            Test.setMock(HttpCalloutMock.class, new WS_TrackingPaymentOperation_MockHttp());

            String res = MockResponse.WS_TransferFees();
             WS_TransferFees.OUTPUT transactionFeeServiceResponse = (WS_TransferFees.OUTPUT) JSON.deserialize(res, WS_TransferFees.OUTPUT.class);
            test.startTest();
            CNT_B2B_SelectAmount.updatePaymentFeesInformation('productId', transactionFeeServiceResponse,  1.0, 'EUR');
            test.stopTest();
        }catch(Exception e){
            System.debug('CNT_B2B_SelectAmount_Test.updatePaymentFeesInformation_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    @isTest
    static void updatePaymentAmountInformation_test(){
        try{
            //Test.setMock(HttpCalloutMock.class, new CNT_B2B_SelectAmount_MockHttp());
            Test.setMock(HttpCalloutMock.class, new WS_TrackingPaymentOperation_MockHttp());

            test.startTest();
            
            String originAmount = 'source';
            Decimal convertedAmount = 9.2;
            String sourceCurrency = 'EUR';
            Decimal sourceAmount = 5.1;
            String destinationCurrency = 'GBP';
            Decimal destinationAmount = 15.1;
			CNT_B2B_SelectAmount.updatePaymentAmountInformation('productId', convertedAmount ,originAmount,sourceCurrency, sourceAmount, destinationCurrency, destinationAmount,sourceCurrency,sourceAmount);   
            test.stopTest();
        }catch(Exception e){
            System.debug('CNT_B2B_SelectAmount_Test.updatePaymentAmountInformation_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
     @isTest
    static void sendToCatch_test(){
        try{
            //Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
           Test.setMock(HttpCalloutMock.class, new WS_TransferFees_Test_MockHttp());   

            String originAmount = 'source';
            Decimal convertedAmount = 9.2;
            String sourceCurrency = 'EUR';
            Decimal sourceAmount = 5.1;
            String destinationCurrency = 'GBP';
            Decimal destinationAmount = 15.1;
            String productId_001 = System.Label.CNF_payment_productId_001;
        	String productId_002 = System.Label.CNF_payment_productId_002;
            
            String res = MockResponse.WS_TransferFees();
            WS_TransferFees.OUTPUT transactionFeeServiceResponse = (WS_TransferFees.OUTPUT) JSON.deserialize(res, WS_TransferFees.OUTPUT.class);
            
             WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        	WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(null);
            
             test.startTest();
            CNT_B2B_SelectAmount.updatePaymentFeesInformation('productId', transactionFeeServiceResponse,  1.0, 'EUR');
            //String paymentId, Decimal convertedAmount, String originAmount, String sourceCurrency, Decimal sourceAmount, String destinationCurrency, Decimal destinationAmount, String dominantCurrency, Decimal dominantAmoun
			CNT_B2B_SelectAmount.updatePaymentAmountInformation('productId', convertedAmount ,originAmount,sourceCurrency, sourceAmount, destinationCurrency, destinationAmount,sourceCurrency,sourceAmount); 
        	CNT_B2B_SelectAmount.getExchangeRate(paymentDraft);



            test.stopTest();
        }catch(Exception e){
            System.debug('CNT_B2B_SelectAmount_Test.updatePaymentAmountInformation_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
 

}