@isTest
public class CNT_B2B_Authorization_Test {

    @testSetUp
    static void setup(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());

        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
        CNT_B2B_Authorization.getSessionId();
        CNT_B2B_Authorization.getAccountData();
        CNT_B2B_Authorization.getUserData();
        String encrypted = CNT_B2B_Authorization.encryptData('test');   
        CNT_B2B_Authorization.decryptData(encrypted);
    }
    
    @isTest 
    static void getPaymentDetail_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        
        Test.startTest();
        CNT_B2B_Authorization.getPaymentDetail('12345');
        Test.stopTest();
    }
        
    @isTest 
    static void executePayment_Test(){ 
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        String res = MockResponse.PaymentDetail();
        WRAPPER_PaymentDetail payment = WRAPPER_PaymentDetail.parse(res);       
        res = MockResponse.WS_ExchangeRate();
        WS_ExchangeRate.OUTPUT ExchRate = (WS_ExchangeRate.OUTPUT) JSON.deserialize(res, WS_ExchangeRate.OUTPUT.class);

        Test.startTest();
        CNT_B2B_Authorization.executePayment('12345', '3000', payment.operationResponse.operationDetail, ExchRate, ExchRate);      
        Test.stopTest();
    }
    
    @isTest 
    static void getSignLevel_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        
        Test.startTest();
    	CNT_B2B_Authorization.getSignLevel('12345'); 
        Test.stopTest();
    }
    
    @isTest 
    static void authorizePayment_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        
        Test.startTest();
    	CNT_B2B_Authorization.authorizePayment('12345', false, '123');
        Test.stopTest();
    }
    
    @isTest 
    static void getOTP_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        
        Test.startTest();
    	CNT_B2B_Authorization.getOTP('12345', 'ES', '123');    
        Test.stopTest();
    }
    
    @isTest 
    static void getOTP_Strategic_Test(){
        Test.startTest();
    	//CNT_B2B_Authorization.getOTP_Strategic('beneficiaryName', 'beneficiaryAccount', 'paymentId', 'debitAmount', 'fees', 'exchangeRate', 'paymentAmount', null, 'service_id');
        Test.stopTest();
    }
    
    @isTest
    static void ValidateOTP_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        
        Test.startTest();
    	CNT_B2B_Authorization.validateOTP('12345', 'TEST', 'ES', '1234');
        Test.stopTest();
    }
    
    @isTest
    static void updateStatus_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        
        Test.startTest();
    	CNT_B2B_Authorization.updateStatus('12345', '001', 'test', null);
        Test.stopTest();
    }
    
    @isTest
    static void getExchangeRate_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        String res = MockResponse.PaymentList();
        WRAPPER_PaymentList paymentList = (WRAPPER_PaymentList) JSON.deserialize(res, WRAPPER_PaymentList.class);
        WRAPPER_PaymentList.WRAPPER_Payment payment = paymentList.paymentsList[0];       
        res = MockResponse.B2BData_AccountData();
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class);
    	
        Test.startTest();
        CNT_B2B_Authorization.getExchangeRate(true, '12345', payment, accountData);
        Test.stopTest();
    }
    
    @isTest
    static void removeSignature_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        
        Test.startTest();
    	CNT_B2B_Authorization.removeSignature('12345');
        Test.stopTest();
    }
    
    @isTest
    static void sendNotification_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
        User u = DataFactory.getRunningUser(true); 
        
        Test.startTest();
    	CNT_B2B_Authorization.sendNotification('12345', '123', u.USER_TXT_GlobalId__c);
        CNT_B2B_Authorization.sendNotification('12345', '123', 'globalId');
        Test.stopTest();
    }
}