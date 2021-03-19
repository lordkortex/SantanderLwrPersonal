@isTest
public class CNT_B2B_Authorization_Test {
  @testSetUp
  static void setup() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());

    DataFactory.getCustomSettingCryptoKey(true);
    DataFactory.createWsConfigurationSetting(true);
    CNT_B2B_Authorization.getSessionId();
    CNT_B2B_Authorization.getUserData();
    String encrypted = CNT_B2B_Authorization.encryptData('test');
    CNT_B2B_Authorization.decryptData(encrypted);
  }

  @isTest
  static void getPaymentDetail_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());

    Test.startTest();
    CNT_B2B_Authorization.getPaymentDetail('12345');
    Test.stopTest();
  }

  @isTest
  static void executePayment_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
    Test.setMock(
      HttpCalloutMock.class,
      new WS_B2B_Orchestation_MockHttp.B2B_Orchestation()
    );
    Test.setMock(HttpCalloutMock.class, new CNT_PAY_PaymentOptions_MockHttp());

    String paymentId = '12345';
    String FXTimer = 'FXTimer';
    String str = MockResponse.WRAPPER_PaymentDetail();
    WRAPPER_PaymentDetail payment = WRAPPER_PaymentDetail.parse(str);
    str = MockResponse.WS_ExchangeRate();
    WS_ExchangeRate.OUTPUT exchRate = (WS_ExchangeRate.OUTPUT) JSON.deserialize(
      str,
      WS_ExchangeRate.OUTPUT.class
    );

    Test.startTest();
    CNT_B2B_Authorization.executePayment(
      paymentId,
      FXTimer,
      payment.operationResponse.operationDetail,
      exchRate,
      exchRate
    );
  }

  @isTest
  static void getSignLevel_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());

    Test.startTest();
    CNT_B2B_Authorization.getSignLevel('12345');
    Test.stopTest();
  }

  @isTest
  static void authorizePayment_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());

    Test.startTest();
    CNT_B2B_Authorization.authorizePayment('12345', false, '123');
    Test.stopTest();
  }

  @isTest
  static void getOTP_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());

    Test.startTest();
    CNT_B2B_Authorization.getOTP('12345', 'ES', '123');
    Test.stopTest();
  }

  @isTest
  static void getOTP_Strategic_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
    WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(
      MockResponse.PaymentOptionsResult(),
      WRAPPER_PaymentDetail.OperationDetail.class
    );
    Test.startTest();
    CNT_B2B_Authorization.getOTP_Strategic(
      'beneficiaryName',
      'beneficiaryAccount',
      'paymentId',
      'debitAmount',
      'fees',
      'exchangeRate',
      'paymentAmount',
      payment,
      'service_id',
      new Map<String, String>()
    );
    Test.stopTest();
  }

  @isTest
  static void ValidateOTP_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());

    Test.startTest();
    CNT_B2B_Authorization.validateOTP('12345', 'TEST', 'ES', '1234');
    Test.stopTest();
  }

  @isTest
  static void updateStatus_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());

    Test.startTest();
    CNT_B2B_Authorization.updateStatus('12345', '001', 'test', null);
    CNT_B2B_Authorization.updateStatus('12345', '001', 'test');
    Test.stopTest();
  }

  @isTest
  static void getExchangeRate_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
    WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(
      MockResponse.PaymentOptionsResult(),
      WRAPPER_PaymentDetail.OperationDetail.class
    );
    String res = MockResponse.B2BData_AccountData();
    WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(
      res,
      WRAPPER_B2B_Data.AccountData.class
    );

    Test.startTest();
    CNT_B2B_Authorization.getExchangeRate(true, '12345', payment, accountData);
    Test.stopTest();
  }

  @isTest
  static void removeSignature_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());

    Test.startTest();
    CNT_B2B_Authorization.removeSignature('12345');
    Test.stopTest();
  }

  @isTest
  static void sendNotification_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_Authorization_MockHttp());
    User u = DataFactory.getRunningUser(true);

    Test.startTest();
    CNT_B2B_Authorization.sendNotification('12345');
    CNT_B2B_Authorization.sendNotification('12345');
    Test.stopTest();
  }
}
