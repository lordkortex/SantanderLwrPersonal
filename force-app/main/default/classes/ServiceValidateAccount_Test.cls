@isTest
public class ServiceValidateAccount_Test {
  @testSetup
  static void setup() {
    DataFactory.getCustomSettingCryptoKey(true);
    DataFactory.createWsConfigurationSetting(true);
    DataFactory.createClaims();
  }

  @isTest
  static void validateAccount_Test() {
    Test.setMock(
      HttpCalloutMock.class,
      new ServiceValidateAccount_MockHttp.BasicResponse()
    );
    String str = MockResponse.AccountListAccountDetails_ES();
    WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(
      str,
      WRAPPER_AccountList.AccountDetails.class
    );
    WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(
      MockResponse.PaymentOptionsResult(),
      WRAPPER_PaymentDetail.OperationDetail.class
    );
    test.startTest();
    try {
      ServiceValidateAccount.validateAccount(sourceAccount, 'status', 200.5);
    } catch (Exception e) {
      System.debug('validateAccount_Test');
    }
    try {
      ServiceValidateAccount.validateAccount(paymentData, 200.5);
    } catch (Exception e) {
      System.debug('validateAccount_Test');
    }
    test.stopTest();
  }
}
