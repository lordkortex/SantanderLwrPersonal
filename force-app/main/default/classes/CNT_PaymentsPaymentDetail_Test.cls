@isTest
public class CNT_PaymentsPaymentDetail_Test {
  @testSetUp
  static void setup() {
    DataFactory.getCustomSettingCryptoKey(true);
    DataFactory.createWsConfigurationSetting(true);
    DataFactory.createClaims();
  }

  @isTest
  static void methods_Test() {
    //HttpCalloutMock
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_PaymentsPaymentDetail_MockHttp.BasicResponse()
    );

    //createPayment params: payment
    WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(
      MockResponse.PaymentOptionsResult(),
      WRAPPER_PaymentDetail.OperationDetail.class
    );

    //createPayment params: accountData
    String res = MockResponse.B2BData_AccountData();
    WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(
      res,
      WRAPPER_B2B_Data.AccountData.class
    );

    String paymentId = '12345';
    Decimal amountDcml = 123.45;

    CNT_PaymentsPaymentDetail.getPaymentDetail(paymentId);
    CNT_PaymentsPaymentDetail.getExchangeRate(
      true,
      paymentId,
      payment,
      accountData
    );
    CNT_PaymentsPaymentDetail.getSignLevel(paymentId);
    CNT_PaymentsPaymentDetail.getAccountData();
    CNT_PaymentsPaymentDetail.getUserData();
    //CNT_PaymentsPaymentDetail.validateAccount(payment, amountDcml);

    //reverseLimits params
    res = MockResponse.PaymentDetail();
    WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(
      res,
      WRAPPER_PaymentDetail.OperationDetail.class
    );
    String operationId = '12345';
    String serviceId = '12345';

    CNT_PaymentsPaymentDetail.reverseLimits(
      operationId,
      serviceId,
      paymentData
    );
    CNT_PaymentsPaymentDetail.reverseLimits(null, serviceId, paymentData);
  }

  @isTest
  static void decryptData_Test() {
    //HttpCalloutMock
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_PaymentsPaymentDetail_MockHttp.BasicResponse()
    );

    //methods
    String encryptData = CNT_PaymentsPaymentDetail.encryptData('Test');
    CNT_PaymentsPaymentDetail.decryptData(encryptData);
  }

  @isTest
  static void createPayment_Test() {
    //HttpCalloutMock
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_PaymentsPaymentDetail_MockHttp.BasicResponse()
    );

    //createPayment params: payment
    //
    //PaymentOptionsResult
    WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(
      MockResponse.OperationDetail(),
      WRAPPER_PaymentDetail.OperationDetail.class
    );
    // WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(json, WRAPPER_PaymentDetail.OperationDetail.class);

    //createPayment params: userData
    String mockUserData = MockResponse.wrapperUserData('OneTrade');
    WrapperUserData userData = (WrapperUserData) JSON.deserialize(
      mockUserData,
      WrapperUserData.class
    );
    //createPayment params: accountData
    String res = MockResponse.B2BData_AccountData();
    WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(
      res,
      WRAPPER_B2B_Data.AccountData.class
    );
    //MWB: Aun no puede testearse--> mapPaymentAccounts devuelve siempre null
    Test.startTest();
    CNT_PaymentsPaymentDetail.mapPaymentAccounts(payment);
    CNT_PaymentsPaymentDetail.mapPaymentAccounts(null);

    //CNT_PaymentsPaymentDetail.createPayment(payment, userData, accountData);
    Test.stopTest();
  }

  @isTest
  static void validateAccount_Test() {
    //HttpCalloutMock
    Test.setMock(
      HttpCalloutMock.class,
      new ServiceValidateAccount_MockHttp.BasicResponse()
    );

    // Test.setMock(HttpCalloutMock.class, new CNT_PaymentsPaymentDetail_MockHttp.BasicResponse());
    Double amount = 123.45;
    //MockResponse.WRAPPER_PaymentDetail();
    WRAPPER_PaymentDetail payment = (WRAPPER_PaymentDetail) JSON.deserialize(
      MockResponse.WRAPPER_PaymentDetail(),
      WRAPPER_PaymentDetail.class
    );
    payment.operationResponse.operationDetail.sourceAccount = '0720590942290418123456';
    payment.operationResponse.operationDetail.sourceAccountIdType = 'IBA';
    payment.operationResponse.operationDetail.sourceCountry = 'SPAIN';
    payment.operationResponse.operationDetail.sourceSwiftCode = 'BSCH';
    payment.operationResponse.operationDetail.sourceData.customerId = '123456789';

    Test.startTest();
    //CNT_PaymentsPaymentDetail.validateAccount(payment.operationResponse.operationDetail, amount);
    Test.stopTest();
  }

  @isTest
  static void sendToService_Test() {
    //HttpCalloutMock
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_PaymentsPaymentDetail_MockHttp.BasicResponse()
    );

    //sendToService params
    String paymentId = '12345';
    String status = '001';
    String reason = 'test';
    Double amount = 123.45;
    String tcurrency = 'testCurrency';

    Test.startTest();
    CNT_PaymentsPaymentDetail.sendToService(paymentId, status, reason);
    CNT_PaymentsPaymentDetail.sendToService(
      paymentId,
      status,
      tcurrency,
      amount
    );

    Test.stopTest();
  }

  @isTest
  static void updatePaymentStatusReason_Test() {
    //HttpCalloutMock
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_PaymentsPaymentDetail_MockHttp.BasicResponse()
    );

    //updatePaymentStatusReason params
    String paymentId = '12345';
    String status = '001';
    String reason = '000';

    Test.startTest();
    CNT_PaymentsPaymentDetail.updatePaymentStatusReason(
      paymentId,
      status,
      reason
    );
    CNT_PaymentsPaymentDetail.updatePaymentStatusReason(null, status, reason);

    Test.stopTest();
  }
}
