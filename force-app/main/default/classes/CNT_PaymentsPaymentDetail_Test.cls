@isTest
public class CNT_PaymentsPaymentDetail_Test { 
    
    @testSetUp
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createClaims();
    }
    
    @isTest
    static void methods_Test(){
        
        //HttpCalloutMock
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsPaymentDetail_MockHttp.BasicResponse());
        
        //createPayment params: payment
        WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);  

        
        //createPayment params: accountData
        String res = MockResponse.B2BData_AccountData();
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class);
        
        String paymentId = '12345';
        Decimal amountDcml = 123.45;
        
        CNT_PaymentsPaymentDetail.getPaymentDetail(paymentId);
        CNT_PaymentsPaymentDetail.getExchangeRate(false, paymentId, payment, accountData);
		CNT_PaymentsPaymentDetail.getSignLevel(paymentId);
        CNT_PaymentsPaymentDetail.getAccountData();
        CNT_PaymentsPaymentDetail.getUserData();
        CNT_PaymentsPaymentDetail.validateAccount(payment, amountDcml);
        
        //reverseLimits params
        res = MockResponse.PaymentDetail();
		WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(res, WRAPPER_PaymentDetail.OperationDetail.class);
        String operationId = '12345';
        String serviceId = '12345';
        
        CNT_PaymentsPaymentDetail.reverseLimits(operationId, serviceId, paymentData);

    }
    
    @isTest
    static void decryptData_Test(){
        
        //HttpCalloutMock
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsPaymentDetail_MockHttp.BasicResponse());
        
        //methods
        String encryptData = CNT_PaymentsPaymentDetail.encryptData('Test');
        CNT_PaymentsPaymentDetail.decryptData(encryptData);

    }
    
    @isTest
    static void createPayment_Test(){
        
        //HttpCalloutMock
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsPaymentDetail_MockHttp.BasicResponse());
        
        //createPayment params: payment
        WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);  
        //createPayment params: userData
        String mockUserData = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(mockUserData, WrapperUserData.class);
        //createPayment params: accountData
        String res = MockResponse.B2BData_AccountData();
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class);
        //MWB: Aun no puede testearse--> mapPaymentAccounts devuelve siempre null
        Test.startTest();
        //CNT_PaymentsPaymentDetail.createPayment(payment, userData, accountData);
        Test.stopTest();
    }
    
    @isTest
    static void sendToService_Test(){
        
        //HttpCalloutMock
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsPaymentDetail_MockHttp.BasicResponse());
        
        //sendToService params
        String paymentId = '12345';
        String status = '001';
        String reason = 'test';
        Double amount = 123.45;
        String tcurrency = 'testCurrency';
        
        Test.startTest();
        CNT_PaymentsPaymentDetail.sendToService(paymentId, status, reason);
        CNT_PaymentsPaymentDetail.sendToService(paymentId, status, tcurrency, amount);
        Test.stopTest();
        
    }
    
}