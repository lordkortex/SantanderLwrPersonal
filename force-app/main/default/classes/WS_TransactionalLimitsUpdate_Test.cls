@isTest
public class WS_TransactionalLimitsUpdate_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void execute_Test(){

        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new WS_TransactionalLimitsUpdate_MockHttp());
        WS_TransactionalLimitsUpdate wsObject = new WS_TransactionalLimitsUpdate();
        
        WS_TransactionalLimitsUpdate.LimitsResponseUpdate wsObjectLimit = new WS_TransactionalLimitsUpdate.LimitsResponseUpdate('operationId', 'limitsResult', 'codeLimitsResult');

        //createPayment params: payment
        WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);    
        
        String str = MockResponse.B2BData_PaymentAmount();
        WRAPPER_B2B_Data.PaymentAmount paymentAmount = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
       
        
        wsObject.execute(payment);
        wsObject.execute('operationId', 'serviceId', paymentAmount, sourceAccountData, 124,'baseAmount');
                              
        Test.stopTest();
    }
    

}