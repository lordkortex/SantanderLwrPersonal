@isTest
public class ServiceCustomerTransactionalLimits_Test {
    
    final static String productId = 'd24a269950664fd489c9b0b5f49035a7';
    final static String operationId = '12345';
    final static String serviceId = '67890';
    final static String paymentId = 'ID0987654321';
    final static Double baseAmount = 12;
    final static String baseCurrency = 'baseCurrency';
    
    @testSetup
    static void setup () {
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }

    @isTest
    static void testControllerCustomerTransacLimits() {
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsParent_MockHttp.OperationsList());
        
        Test.startTest();
        
        //create PaymentData 
        WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class); 
        // WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentDetail(), WRAPPER_PaymentDetail.OperationDetail.class); 
        
        //create sourceAccountData 
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountList_AccountDetails('ES', 'EUR'), WRAPPER_AccountList.AccountDetails.class);
        //create recipientAccountData 
        WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountList_AccountDetails('ES', 'GRB'), WRAPPER_AccountList.AccountDetails.class);
        //Create paymentAmount
        WRAPPER_B2B_Data.PaymentAmount paymentAmount = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(MockResponse.B2BData_PaymentAmount(), WRAPPER_B2B_Data.PaymentAmount.class);
        //Create userData
        WrapperUserData userData = (WrapperUserData) JSON.deserialize( MockResponse.wrapperUserData('OneTrade'), WrapperUserData.class);
        
        
        
        ServiceCustomerTransactionalLimits.callTransactionalLimits(paymentData);
        ServiceCustomerTransactionalLimits.callTransactionalLimits(null);
        
        ServiceCustomerTransactionalLimits.callTransactionalLimits(paymentId, userData, paymentAmount, sourceAccountData, recipientAccountData, baseAmount, baseCurrency);
        ServiceCustomerTransactionalLimits.callTransactionalLimits(paymentId, null, null, null, null, baseAmount, baseCurrency);
        
        ServiceCustomerTransactionalLimits.callTransactionalLimitsUpdate(operationId, serviceId, paymentAmount, sourceAccountData, baseAmount, baseCurrency);
        ServiceCustomerTransactionalLimits.callTransactionalLimitsUpdate(operationId, serviceId, null, null, baseAmount, baseCurrency);
        
        ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(paymentData);
        ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(null);
        
        ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(paymentId, serviceId, paymentAmount, sourceAccountData, recipientAccountData, baseAmount, baseCurrency);
        ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(paymentId, serviceId, paymentAmount, null, null, baseAmount, baseCurrency);
        
        ServiceCustomerTransactionalLimits.transactionalLimitsReverse(paymentData);
        ServiceCustomerTransactionalLimits.transactionalLimitsReverse(null);
        
        ServiceCustomerTransactionalLimits.updateLimits(paymentData);  
        ServiceCustomerTransactionalLimits.updateLimits(null);  
        
        
        WS_TransactionalLimitsUpdate.OUTPUT outputUpdate = new WS_TransactionalLimitsUpdate.OUTPUT();  
        WS_TransactionalLimitsUpdate.LimitsResponseUpdate wsObjectLimitUpdate = new WS_TransactionalLimitsUpdate.LimitsResponseUpdate('operationId', 'ok', 'codeLimitsResult');
        WS_TransactionalLimitsUpdate.LimitsResponseUpdate wsObjectLimitUpdateKO = new WS_TransactionalLimitsUpdate.LimitsResponseUpdate('operationId', 'KO', 'codeLimitsResult');
        outputUpdate.limitsResponseUpdate = wsObjectLimitUpdate;
        ServiceCustomerTransactionalLimits.getTransactionalLimitsUpdateOutput(outputUpdate);
        outputUpdate.limitsResponseUpdate = wsObjectLimitUpdateKO;
        ServiceCustomerTransactionalLimits.getTransactionalLimitsUpdateOutput(outputUpdate);
        
        WS_TransactionalLimitsValidation.OUTPUT outputValidation = new WS_TransactionalLimitsValidation.OUTPUT();
        WS_TransactionalLimitsValidation.LimitsResponse wsObjectLimitValidation = new WS_TransactionalLimitsValidation.LimitsResponse('ok', 'codeLimitsResult');
        WS_TransactionalLimitsValidation.LimitsResponse wsObjectLimitValidationKO = new WS_TransactionalLimitsValidation.LimitsResponse('KO', 'codeLimitsResult');
        
        outputValidation.limitsResponse = wsObjectLimitValidation;
        ServiceCustomerTransactionalLimits.getTransactionalLimitsValidationOutput(outputValidation);
        outputValidation.limitsResponse = wsObjectLimitValidationKO;
        ServiceCustomerTransactionalLimits.getTransactionalLimitsValidationOutput(outputValidation);

        Test.stopTest();
        
    }
  
}