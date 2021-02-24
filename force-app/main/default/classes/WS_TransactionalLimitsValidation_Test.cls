@isTest
public class WS_TransactionalLimitsValidation_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void execute_Test(){
        
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new WS_TransactionalLimitsValid_MockHttp());            
        WS_TransactionalLimitsValidation wsObject = new WS_TransactionalLimitsValidation();
        
        WS_TransactionalLimitsValidation.LimitsResponse wsObjectLimit = new WS_TransactionalLimitsValidation.LimitsResponse('limitsResult', 'codeLimitsResult');
        WS_TransactionalLimitsValidation.OriginalTransactionAmount wsObjectOTA = new WS_TransactionalLimitsValidation.OriginalTransactionAmount('12', 'tcurrency');

        
        //createPayment params: payment
        WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class); 
        
        wsObject.execute(payment);

        //createB2BData paymentAmount
        WRAPPER_B2B_Data.PaymentAmount paymentAmount = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(MockResponse.B2BData_PaymentAmount(), WRAPPER_B2B_Data.PaymentAmount.class);
        //createAccountList sourceAccountData
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountList_AccountDetails('ES', 'EUR'), WRAPPER_AccountList.AccountDetails.class);

        wsObject.execute('paymentId','serviceId', paymentAmount, sourceAccountData, sourceAccountData, 13, 'baseCurrency');
        
        Test.stopTest();
    }
    

}