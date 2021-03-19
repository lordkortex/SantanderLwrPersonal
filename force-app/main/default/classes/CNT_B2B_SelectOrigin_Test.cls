@isTest
public class CNT_B2B_SelectOrigin_Test {
  @TestSetup
  static void setup() {
    DataFactory.createWsConfigurationSetting(true);
    DataFactory.createB2BOrderingFilters();
    DataFactory.createClaims();
  }

  @isTest
  static void accountValidation_Test() {
    try {
      Test.setMock(
        HttpCalloutMock.class,
        new WS_B2B_ValidateAccount_MockHttp()
      );
      String res = MockResponse.AccountListAccountDetails_ES();
      WRAPPER_AccountList.AccountDetails accountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(
        res,
        WRAPPER_AccountList.AccountDetails.class
      );
      CNT_B2B_SelectOrigin.accountValidation(accountData);
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectOrigin_Test.getPaymentId_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void getPaymentId_Test() {
    try {
      String res = MockResponse.sourceAccount_Fraud();
      WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(
        res,
        WRAPPER_AccountList.AccountDetails.class
      );
      res = MockResponse.AccountList_AccountDetails('ES', 'GBR');
      WRAPPER_AccountList.AccountDetails expensesAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(
        res,
        WRAPPER_AccountList.AccountDetails.class
      );
      res = MockResponse.wrapperUserData('OneTrade');
      WrapperUserData userData = (WrapperUserData) JSON.deserialize(
        res,
        WrapperUserData.class
      );
      String paymentId = '12345';
      Test.startTest();
      CNT_B2B_SelectOrigin.getPaymentId(
        sourceAccount,
        userData,
        paymentId,
        expensesAccount
      );
      CNT_B2B_SelectOrigin.getPaymentId(
        sourceAccount,
        userData,
        '',
        expensesAccount
      );
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectOrigin_Test.getPaymentId_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void upsertPayment_Test_OK() {
    try {
      WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
      WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
      Test.startTest();
      CNT_B2B_SelectOrigin.upsertPayment(paymentDraft);
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectOrigin_Test.upsertPayment_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void upsertPayment_Test_KO() {
    try {
      Test.startTest();
      CNT_B2B_SelectOrigin.upsertPayment(null);
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectOrigin_Test.upsertPayment_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
}
