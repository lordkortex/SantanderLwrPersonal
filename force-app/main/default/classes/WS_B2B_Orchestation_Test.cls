@isTest
public class WS_B2B_Orchestation_Test {
  @TestSetup
  static void setup() {
    DataFactory.getCustomSettingCryptoKey(true);
    DataFactory.createWsConfigurationSetting(true);
  }

  @isTest
  static void executePayment_test() {
    try {
      Test.setMock(
        HttpCalloutMock.class,
        new WS_B2B_Orchestation_MockHttp.B2B_Orchestation()
      );
      Test.setMock(
        HttpCalloutMock.class,
        new CNT_PAY_PaymentOptions_MockHttp()
      );

      //params
      String str = MockResponse.WS_ExchangeRate();
      WS_ExchangeRate.OUTPUT exchRate = (WS_ExchangeRate.OUTPUT) JSON.deserialize(
        str,
        WS_ExchangeRate.OUTPUT.class
      );
      str = MockResponse.WS_TransferFees();
      WS_TransferFees.OUTPUT pricesData = (WS_TransferFees.OUTPUT) JSON.deserialize(
        str,
        WS_TransferFees.OUTPUT.class
      );
      str = MockResponse.WRAPPER_PaymentDetail();
      WRAPPER_PaymentDetail payment = WRAPPER_PaymentDetail.parse(str);
      String paymentId = '12345';

      WS_B2B_Orchestation orchestration = new WS_B2B_Orchestation();
      WS_B2B_Orchestation.OrchestationBody orchestrationBody = new WS_B2B_Orchestation.OrchestationBody(
        payment.operationResponse.operationDetail,
        paymentId,
        'FXTimer',
        exchRate,
        exchRate
      );

      Test.startTest();
      orchestration.setPaymentId(paymentId);
      orchestration.executePayment(
        payment.operationResponse.operationDetail,
        'paymentId',
        'FXTimer',
        exchRate,
        exchRate
      );
      payment.operationResponse.operationDetail.operationAmount.tcurrency = null;
      payment.operationResponse.operationDetail.operationAmount.amount = null;
      payment.operationResponse.operationDetail.operationAmount = null;
      WS_B2B_Orchestation.OrchestationBody orchestrationBody_1 = new WS_B2B_Orchestation.OrchestationBody(
        payment.operationResponse.operationDetail,
        paymentId,
        'FXTimer',
        exchRate,
        exchRate
      );
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'WS_B2B_Orchestation_Test.executePayment_test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void executePayment_withPaymentDraft_test() {
    try {
      Test.setMock(
        HttpCalloutMock.class,
        new WS_B2B_Orchestation_MockHttp.B2B_Orchestation()
      );
      Test.setMock(
        HttpCalloutMock.class,
        new CNT_PAY_PaymentOptions_MockHttp()
      );

      WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
      WRAPPER_PAY_PaymentDraft paymentDraft = mock.paymentDraftOrchestration();

      String urgencyIndicator = 'test';
      String paymentId = '12345';

      WS_B2B_Orchestation orchestration = new WS_B2B_Orchestation();

      Test.startTest();
      WS_B2B_Orchestation.OrchestationBody orchestrationBody = new WS_B2B_Orchestation.OrchestationBody(
        paymentDraft,
        urgencyIndicator
      );
      orchestration.setPaymentId(paymentId);
      orchestration.executePayment(paymentDraft, urgencyIndicator);
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'WS_B2B_Orchestation_Test.executePayment_withPaymentDraft_test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
}
