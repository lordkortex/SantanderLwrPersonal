@isTest
public class CNT_B2B_Process_Test {
  @testSetUp
  static void setup() {
    DataFactory.getCustomSettingCryptoKey(true);
    DataFactory.createWsConfigurationSetting(true);
    DataFactory.createB2BOrderingFilters();
  }

  @isTest
  static void getUserData_Test() {
    Test.startTest();
    CNT_B2B_Process.getUserData();
    Test.stopTest();
  }

  @isTest
  static void formatDates_Test() {
    List<WRAPPER_AccountList.AccountDetails> accountDetailsList = new List<WRAPPER_AccountList.AccountDetails>();
    String str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
    WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(
      str,
      WRAPPER_AccountList.AccountDetails.class
    );
    accountDetailsList.add(accountDetails);

    Test.startTest();
    CNT_B2B_Process.formatDates(accountDetailsList);
    Test.stopTest();
  }

  @isTest
  static void decryptData_Test() {
    Test.startTest();
    CNT_B2B_Process.decryptData(Global_Utilities.encryptData('Test'));
    Test.stopTest();
  }

  @isTest
  static void reverseLimits_Test() {
    WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(
      null
    );
    Test.startTest();
    CNT_B2B_Process.reverseLimits(paymentDraft);
    CNT_B2B_Process.reverseLimits(null);
    Test.stopTest();
  }

  @isTest
  public static void getLimits_Test() {
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_B2B_PaymentInformation_MockHttp.BasicResponse()
    );
    //create sourceAccount
    WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(
      null
    );

    //Create UserData Other
    WrapperUserData userData = (WrapperUserData) JSON.deserialize(
      MockResponse.wrapperUserData('other'),
      WrapperUserData.class
    );
    String productID_b2b = 'book_to_book';
    String productID_iip = 'international_instant_payment';

    Test.startTest();
    CNT_B2B_Process.getLimits(userData, paymentDraft);
    paymentDraft.productId = System.Label.CNF_payment_productId_001;
    CNT_B2B_Process.getLimits(userData, paymentDraft);
    CNT_B2B_Process.getLimits(null, paymentDraft);
    CNT_B2B_Process.getLimits(null, null);
    Test.stopTest();
  }

  @isTest
  public static void postFraud_Test() {
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_B2B_PaymentInformation_MockHttp.BasicResponse()
    );
    //create sourceAccount
    WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(
      null
    );
    //Create UserData Other
    WrapperUserData userData = (WrapperUserData) JSON.deserialize(
      MockResponse.wrapperUserData('other'),
      WrapperUserData.class
    );

    Map<String, String> navigatorInfo = new Map<String, String>();

    Map<String, String> stepData = new Map<String, String>();
    stepData.put('description', 'description');
    stepData.put('reference', 'reference');

    String amountEnteredFrom = 'source';
    String productID_b2b = 'book_to_book';
    Test.startTest();
    CNT_B2B_Process.postFraud(userData, navigatorInfo, paymentDraft);
    CNT_B2B_Process.postFraud(userData, null, paymentDraft);
    CNT_B2B_Process.postFraud(null, null, null);

    Test.stopTest();
  }
  @isTest
  public static void getSignatureStructure_Test() {
    Test.setMock(
      HttpCalloutMock.class,
      new CNT_B2B_PaymentInformation_MockHttp.Structure()
    );
    String str = MockResponse.B2BData_PaymentAmount();
    WRAPPER_B2B_Data.PaymentAmount amount = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(
      str,
      WRAPPER_B2B_Data.PaymentAmount.class
    );
    str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
    WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(
      str,
      WRAPPER_AccountList.AccountDetails.class
    );
    WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(
      null
    );
    Map<String, String> navigatorInfo = new Map<String, String>();

    Test.startTest();
    CNT_B2B_Process.getSignatureStructure(
      'paymentId',
      navigatorInfo,
      paymentDraft
    );
    CNT_B2B_Process.getSignatureStructure('paymentId', null, paymentDraft);

    Test.stopTest();
  }

  @isTest
  public static void checkFCCDowJones_Test() {
    WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
    WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(
      null
    );

    Test.startTest();
    CNT_B2B_Process.checkFCCDowJones(paymentDraft);
    CNT_B2B_Process.checkFCCDowJones(null);

    Test.stopTest();
  }
}
