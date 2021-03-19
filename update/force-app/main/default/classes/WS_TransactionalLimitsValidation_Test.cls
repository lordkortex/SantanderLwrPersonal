@isTest
public class WS_TransactionalLimitsValidation_Test {
  @testSetup
  static void setup() {
    DataFactory.createWsConfigurationSetting(true);
  }

  @isTest
  static void executePaymentDraft_Test() {
    try {
      Test.setMock(
        HttpCalloutMock.class,
        new WS_TransactionalLimitsValid_MockHttp()
      );

      WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
      WRAPPER_PAY_PaymentDraft paymentDraft = mock.paymentDraftOrchestration();
      Decimal baseAmount = 10;
      String baseCurrency = 'EUR';

      WS_TransactionalLimitsValidation wsObject = new WS_TransactionalLimitsValidation();

      Test.startTest();
      wsObject.execute(paymentDraft, baseAmount, baseCurrency);
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'WS_TransactionalLimitsValidation_Test.executePaymentDraft_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void executePaymentDetail_Test() {
    try {
      Test.setMock(
        HttpCalloutMock.class,
        new WS_TransactionalLimitsValid_MockHttp()
      );

      String str = MockResponse.WRAPPER_PaymentDetail();
      WRAPPER_PaymentDetail payment = WRAPPER_PaymentDetail.parse(str);

      WRAPPER_PaymentDetail.OperationDetail paymentData = new WRAPPER_PaymentDetail.OperationDetail();
      paymentData = payment.operationResponse.operationDetail;

      Decimal baseAmount = 10;
      String baseCurrency = 'EUR';

      WS_TransactionalLimitsValidation wsObject = new WS_TransactionalLimitsValidation();

      Test.startTest();
      wsObject.execute(paymentData);
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'WS_TransactionalLimitsValidation_Test.executePaymentDetail_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
  @isTest
  static void output_Test() {
    try {
      Test.startTest();
      WS_TransactionalLimitsValidation.OUTPUT wsObject = new WS_TransactionalLimitsValidation.OUTPUT(
        'limitsResult',
        'codeLimitsResult'
      );
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'WS_TransactionalLimitsValidation_Test.output_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
}
