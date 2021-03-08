@isTest
public class ServiceOrchestration_Test {
    
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
        String str = MockResponse.B2BData_PaymentAmount(); 
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        
        Test.startTest();
        ServiceOrchestration.executePayment (amountData, destinationAccount, destinationAccount, 'paymentId', 'FXTimer', 'description', 'clientReference','productID','chargeBearer','urgency');
        Test.stopTest();
    }
    

}