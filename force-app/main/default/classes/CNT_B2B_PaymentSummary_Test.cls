@isTest
public class CNT_B2B_PaymentSummary_Test {
  @testSetup
  static void setup() {
    DataFactory.getCustomSettingCryptoKey(true);
    DataFactory.createWsConfigurationSetting(true);
  }

  @isTest
  static void executePayment_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
    Test.startTest();
    CNT_B2B_PaymentSummary.executePayment(paymentDraft, 'urgencyIndicator');
    //CNT_B2B_PaymentSummary.executePayment (amountData, destinationAccount, destinationAccount, 'paymentId', 'FXTimer', 'description', 'clientReference','productID','chargeBearer','urgency');
    Test.stopTest();
  }

  @isTest
  static void getSignLevel_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    Test.startTest();
    CNT_B2B_PaymentSummary.getSignLevel('12345');
    Test.stopTest();
  }

  @isTest
  static void authorizePayment_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    Test.startTest();
    CNT_B2B_PaymentSummary.authorizePayment('12345', true, 'scaUid');
    Test.stopTest();
  }

  @isTest
  static void getOTP_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    Test.startTest();
    CNT_B2B_PaymentSummary.getOTP('12345', 'ES', 'sourceBIC');
    Test.stopTest();
  }

  @isTest
  static void validateOTP_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    Test.startTest();
    CNT_B2B_PaymentSummary.validateOTP('12345', 'metaData', 'ES', 'sourceBIC');
    Test.stopTest();
  }

  @isTest
  static void updateStatus_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    Test.startTest();
    CNT_B2B_PaymentSummary.updateStatus('12345', 'status', 'reason');
    Test.stopTest();
  }

  @isTest
  static void getExchangeRate_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);

    Boolean feesBoolean = true;
    Test.startTest();
    CNT_B2B_PaymentSummary.getExchangeRate(feesBoolean, paymentDraft);
    feesBoolean = false;
    CNT_B2B_PaymentSummary.getExchangeRate(feesBoolean, paymentDraft);
    Test.stopTest();
  }

  @isTest
  static void encryptData_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    Test.startTest();
    CNT_B2B_PaymentSummary.encryptData('Test');
    Test.stopTest();
  }

  @isTest
  static void updateLimits_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
    Test.startTest();
    CNT_B2B_PaymentSummary.updateLimits(paymentDraft);
    Test.stopTest();
  }

  @isTest
  static void removeSignature_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    Test.startTest();
    CNT_B2B_PaymentSummary.removeSignature('12345');
    Test.stopTest();
  }

  @isTest
  static void sendNotification_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    Test.startTest();
    CNT_B2B_PaymentSummary.sendNotification('12345', 'clientReference');
    Test.stopTest();
  }

  @isTest
  static void getSessionId_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    Test.startTest();
    CNT_B2B_PaymentSummary.getSessionId();
    Test.stopTest();
  }

  @isTest
  static void getOTP_Strategic_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());

    WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
    Map<String, String> navigatorInfo = new Map<String, String>();
    Test.startTest();
    CNT_B2B_PaymentSummary.getOTP_Strategic(
      'debitAmount',
      'fees',
      'exchangeRate',
      'paymentAmount',
      paymentDraft,
      navigatorInfo
    );
    Test.stopTest();
  }
  @isTest
  static void upsertPayment_Test() {
    try {
      Test.setMock(
        HttpCalloutMock.class,
        new CNT_B2B_PaymentSummary_MockHttp()
      );

      WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
      WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
      Test.startTest();
      CNT_B2B_PaymentSummary.upsertPayment(paymentDraft);
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_PaymentSummary_Test.upsertPayment_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
}
