@isTest
public class CNT_B2B_PaymentInformation_Test {
  @testSetup
  static void setup() {
    DataFactory.getCustomSettingCryptoKey(true);
    DataFactory.createWsConfigurationSetting(true);
  }

  @isTest
  public static void encryptData_Test() {
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_B2B_PaymentInformation_MockHttp.BasicResponse()
    );

    Test.startTest();
    CNT_B2B_PaymentInformation.encryptData('Test');
    Test.stopTest();
  }

  @isTest
  public static void updateStatus_Test() {
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_B2B_PaymentInformation_MockHttp.BasicResponse()
    );

    Test.startTest();
    CNT_B2B_PaymentInformation.updateStatus('paymentId', 'status', 'reason');
    Test.stopTest();
  }
}
