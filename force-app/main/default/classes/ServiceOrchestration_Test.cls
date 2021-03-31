@isTest
public class ServiceOrchestration_Test {
    
    /*   @testSetUp
    static void setup(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());

        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
        CNT_B2B_Authorization.getSessionId();
       // CNT_B2B_Authorization.getAccountData();
        CNT_B2B_Authorization.getUserData();
        String encrypted = CNT_B2B_Authorization.encryptData('test');   
        CNT_B2B_Authorization.decryptData(encrypted);
    }
    
   @isTest 
    static void executePayment_Test(){ 
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);    
        String res = MockResponse.WS_ExchangeRate();
        WS_ExchangeRate.OUTPUT exRate = (WS_ExchangeRate.OUTPUT) JSON.deserialize(res, WS_ExchangeRate.OUTPUT.class);
        Test.startTest();
        ServiceOrchestration.executePayment('12345', '3000', payment, exRate, exRate);      
        Test.stopTest();
    }
    
    @isTest 
    static void executePayment_Test2(){ 
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        //String str = MockResponse.B2BData_PaymentAmount(); 
        //WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        //str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        //WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
        System.debug('AML '+ paymentDraft);
        
                   String str = MockResponse.B2BData_PaymentAmount(); 
            WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
            str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
            WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
            str = MockResponse.WS_ExchangeRate();
            WS_ExchangeRate.OUTPUT exchRate = (WS_ExchangeRate.OUTPUT) JSON.deserialize(str, WS_ExchangeRate.OUTPUT.class);
            str = MockResponse.WS_TransferFees();
            WS_TransferFees.OUTPUT pricesData = (WS_TransferFees.OUTPUT) JSON.deserialize(str, WS_TransferFees.OUTPUT.class);
            str = MockResponse.WRAPPER_PaymentDetail();
            
            WRAPPER_PaymentDetail paymentDetail = WRAPPER_PaymentDetail.parse(str);
       		WRAPPER_PaymentDetail.OperationDetail operationDetail = new WRAPPER_PaymentDetail.OperationDetail();
        	operationDetail = paymentDetail.operationResponse.operationDetail;
            String res = MockResponse.WS_ExchangeRate();
       	 	WS_ExchangeRate.OUTPUT exRate = (WS_ExchangeRate.OUTPUT) JSON.deserialize(res, WS_ExchangeRate.OUTPUT.class); 

            String FXTimer = 'test'; 
            //String paymentId = 'f548286b75ca42e7ad5c5602589338c7';
            String paymentId = '12345';
        Test.startTest();
         ServiceOrchestration.executePayment (paymentId, FXTimer, operationDetail , exRate, exRate);
        //ServiceOrchestration.executePayment (amountData, destinationAccount, destinationAccount, 'paymentId', 'FXTimer', 'description', 'clientReference','productID','chargeBearer','urgency');
        //ServiceOrchestration.executePayment (paymentDraft ,'urgency');

        Test.stopTest();
    }*/
    
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true); 
    }
    
    @isTest 
    static void executePayment_Test(){ 
        try{
            Test.setMock(HttpCalloutMock.class, new WS_B2B_Orchestation_MockHttp.B2B_Orchestation());
            Test.setMock(HttpCalloutMock.class, new CNT_PAY_PaymentOptions_MockHttp());
            
            String paymentId = '12345';
            String FXTimer = 'FXTimer';
            String str = MockResponse.WRAPPER_PaymentDetail();
            WRAPPER_PaymentDetail payment = WRAPPER_PaymentDetail.parse(str);
            str = MockResponse.WS_ExchangeRate();
            WS_ExchangeRate.OUTPUT exchRate = (WS_ExchangeRate.OUTPUT) JSON.deserialize(str, WS_ExchangeRate.OUTPUT.class);

            Test.startTest();
            ServiceOrchestration.executePayment(paymentId, FXTimer, payment.operationResponse.operationDetail, exchRate, exchRate);
            ServiceOrchestration.executePayment(null, FXTimer, payment.operationResponse.operationDetail, exchRate, exchRate);

            Test.stopTest();


          } catch (Exception e) {
            System.debug('ServiceOrchestration_Test.executePayment_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    @isTest 
    static void executePaymentDraft_Test(){
        try {
            Test.setMock(HttpCalloutMock.class, new WS_B2B_Orchestation_MockHttp.B2B_Orchestation());
            Test.setMock(HttpCalloutMock.class, new CNT_PAY_PaymentOptions_MockHttp());
            
            WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
            WRAPPER_PAY_PaymentDraft paymentDraft = mock.paymentDraftOrchestration();

            String urgencyIndicator = 'test'; 
            Test.startTest();
            ServiceOrchestration.executePayment(paymentDraft, urgencyIndicator);
            ServiceOrchestration.executePayment(null, urgencyIndicator);

            Test.stopTest();

          } catch (Exception e) {
            System.debug('ServiceOrchestration_Test.executePaymentDraft_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    @isTest 
    static void reviewOutput_Test(){
        try {
            WS_B2B_Orchestation.OrcErrors error = new WS_B2B_Orchestation.OrcErrors();
            List<WS_B2B_Orchestation.OrcErrors> Lerror = new List<WS_B2B_Orchestation.OrcErrors>();
            error.code = 'test';
            error.message = 'test';
            error.level = 'test';
            error.description = 'test';
            Lerror.add(error);

            WS_B2B_Orchestation.OrchestationOutput output = new WS_B2B_Orchestation.OrchestationOutput();
            output.code = '500';
            output.description = 'test';
            output.level = 'test';
            output.message = 'test';
            output.errors = Lerror; 
            
            String paymentId = '12345';
            String urgencyIndicator = 'test'; 
            Test.startTest();
            ServiceOrchestration.reviewOutput(output,urgencyIndicator);
            output.message = '';
            ServiceOrchestration.reviewOutput(output,urgencyIndicator);

            Test.stopTest();

          } catch (Exception e) {
            System.debug('ServiceOrchestration_Test.executePaymentDraft_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}