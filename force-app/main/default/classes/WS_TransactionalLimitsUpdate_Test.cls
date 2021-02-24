@isTest
public class WS_TransactionalLimitsUpdate_Test {

    @testSetup
    static void setup () {
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createClaims();
    }

    @isTest
    static void execute_Test () {
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new WS_TransactionalLimitsUpdate_MockHttp());
        WS_TransactionalLimitsUpdate wsObject = new WS_TransactionalLimitsUpdate();
        WS_TransactionalLimitsUpdate.LimitsResponseUpdate wsObjectLimit = new WS_TransactionalLimitsUpdate.LimitsResponseUpdate('operationId', 'limitsResult', 'codeLimitsResult');
        WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);
        WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(null);
        wsObject.execute(payment);
        wsObject.execute(paymentDraft);
        Test.stopTest();
    }
}