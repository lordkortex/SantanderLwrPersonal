@isTest
public class CNT_PaymentsLandingUtilityBar_Test {

    @TestSetup
    static void setup(){
    	DataFactory.getCustomSettingCryptoKey(true);
		DataFactory.createWsConfigurationSetting(true);    
        DataFactory.createClaims();
    }
    
    @isTest
    static void getPaymentDetail_Test(){
        CNT_PaymentsLandingUtilityBar.getPaymentDetail('paymentId');
    }
    
    @isTest
    static void methods_Test(){
        CNT_PaymentsLandingUtilityBar.encryptData('Test');
        CNT_PaymentsLandingUtilityBar.getAccountData();
        CNT_PaymentsLandingUtilityBar.getUserData();
        CNT_PaymentsLandingUtilityBar.sendToService('paymentId', 'status', 'reason');
    } 

    @isTest
    static void validateAccount_Test(){
        WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);  
        CNT_PaymentsLandingUtilityBar.validateAccount(payment, 1000);
    }
    
    @isTest
    static void getExchangeRate_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLandingUtilityBar_MockHttp());

        WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);  
        String res = MockResponse.B2BData_AccountData();
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class);
        
        Test.startTest();
        CNT_PaymentsLandingUtilityBar.getExchangeRate(true, 'paymentId', payment, accountData);
        Test.stopTest();
    }
    
    @isTest
    static void reverseLimits_Test(){ 
        String res = MockResponse.PaymentDetail();
        WRAPPER_PaymentDetail payment = (WRAPPER_PaymentDetail) JSON.deserialize(res, WRAPPER_PaymentDetail.class);
        CNT_PaymentsLandingUtilityBar.reverseLimits('operationId', 'serviceId', payment.operationResponse.operationDetail);
    }

}