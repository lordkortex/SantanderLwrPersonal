@isTest
public class ServiceCustomerTransactionalLimits_Test {

    final static Double BASE_AMOUNT = 12;
    final static String BASE_CURRENCY = 'baseCurrency';

    @testSetup
    static void setup () {
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createClaims();
    }

    @isTest
    static void testControllerCustomerTransacLimits () {
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsParent_MockHttp.OperationsList());
        Test.startTest();
        WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);
        WrapperUserData userData = (WrapperUserData) JSON.deserialize( MockResponse.wrapperUserData('OneTrade'), WrapperUserData.class);
        WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.bookToBookDraft(null);

        ServiceCustomerTransactionalLimits.callTransactionalLimits(paymentData);
        ServiceCustomerTransactionalLimits.callTransactionalLimits(null);

        ServiceCustomerTransactionalLimits.callTransactionalLimits(userData, paymentDraft, BASE_AMOUNT, BASE_CURRENCY);

        ServiceCustomerTransactionalLimits.callTransactionalLimitsUpdate(paymentDraft);
        ServiceCustomerTransactionalLimits.callTransactionalLimitsUpdate(null);

        ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(paymentData);
        ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(null);

        ServiceCustomerTransactionalLimits.transactionalLimitsReverse(paymentData);
        ServiceCustomerTransactionalLimits.transactionalLimitsReverse((WRAPPER_PaymentDetail.OperationDetail) null);

        ServiceCustomerTransactionalLimits.transactionalLimitsReverse(paymentDraft);
        ServiceCustomerTransactionalLimits.transactionalLimitsReverse((WRAPPER_PAY_PaymentDraft) null);

        ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(paymentDraft, BASE_AMOUNT, BASE_CURRENCY);

        ServiceCustomerTransactionalLimits.updateLimits(paymentData);
        ServiceCustomerTransactionalLimits.updateLimits(null);

        WS_TransactionalLimitsUpdate.OUTPUT outputUpdate = new WS_TransactionalLimitsUpdate.OUTPUT();
        WS_TransactionalLimitsUpdate.OUTPUT wsObjectLimitUpdate = new WS_TransactionalLimitsUpdate.OUTPUT('operationId', 'ok', 'codeLimitsResult');
        WS_TransactionalLimitsUpdate.OUTPUT wsObjectLimitUpdateKO = new WS_TransactionalLimitsUpdate.OUTPUT('operationId', 'KO', 'codeLimitsResult');
        outputUpdate = wsObjectLimitUpdate;
        ServiceCustomerTransactionalLimits.getTransactionalLimitsUpdateOutput(outputUpdate);
        outputUpdate = wsObjectLimitUpdateKO;
        ServiceCustomerTransactionalLimits.getTransactionalLimitsUpdateOutput(outputUpdate);

        WS_TransactionalLimitsValidation.OUTPUT outputValidation = new WS_TransactionalLimitsValidation.OUTPUT();
        WS_TransactionalLimitsValidation.OUTPUT wsObjectLimitValidation = new WS_TransactionalLimitsValidation.OUTPUT('ok', 'codeLimitsResult');
        WS_TransactionalLimitsValidation.OUTPUT wsObjectLimitValidationKO = new WS_TransactionalLimitsValidation.OUTPUT('KO', 'codeLimitsResult');

        outputValidation = wsObjectLimitValidation;
        ServiceCustomerTransactionalLimits.getTransactionalLimitsValidationOutput(outputValidation);
        outputValidation = wsObjectLimitValidationKO;
        ServiceCustomerTransactionalLimits.getTransactionalLimitsValidationOutput(outputValidation);
        Test.stopTest();
    }
}