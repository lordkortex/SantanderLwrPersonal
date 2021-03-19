@isTest
global class CNT_B2B_SignatureUtilitiesLocal_Test {
  @testSetup
  static void setup() {
    DataFactory.createWsConfigurationSetting(true);
  }

  @isTest
  static void getSignatureStructure() {
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_B2B_SignatureUtilities_MockHttp.Signature()
    );
    user u = DataFactory.getRunningUser(true);

    WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);

    Test.startTest();

    Map<String, String> navInfo = new Map<String, String>();

    System.runAs(u) {
      CNT_B2B_SignatureUtilitiesLocal.getSignatureStructure(
        'channel',
        navInfo,
        paymentDraft
      );
    }
    Test.stopTest();
  }

  @isTest
  static void getOTP_Strategic_Test() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    String str = MockResponse.B2BData_PaymentAmount();

    WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);

    Test.startTest();
    Map<String, String> navInfo = new Map<String, String>();

    CNT_B2B_SignatureUtilitiesLocal.getOTP_Strategic(navInfo, paymentDraft);
    Test.stopTest();
  }

  @isTest
  static void getOTP_Strategic_Test2() {
    Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
    WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(
      MockResponse.PaymentOptionsResult(),
      WRAPPER_PaymentDetail.OperationDetail.class
    );
    Test.startTest();
    Map<String, String> navInfo = new Map<String, String>();

    CNT_B2B_SignatureUtilitiesLocal.getOTP_Strategic(
      'TEST',
      payment,
      'service_id',
      navInfo
    );
    Test.stopTest();
  }
  /*
    @isTest
    static void storeSignatureData_Test(){       
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp.BasicResponse());
        User u = DataFactory.getRunningUser(true);
        String str = MockResponse.SignatureStructure();
        WRAPPER_B2B_SignatureStructure structure = (WRAPPER_B2B_SignatureStructure) JSON.deserialize (str, WRAPPER_B2B_SignatureStructure.class);
        test.startTest();
        CNT_B2B_SignatureUtilities.storeSignatureData(structure);
        test.stopTest();
    }*/
}
