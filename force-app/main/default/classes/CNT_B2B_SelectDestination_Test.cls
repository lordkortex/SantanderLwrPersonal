@isTest
public class CNT_B2B_SelectDestination_Test {
  @TestSetup
  static void setup() {
    DataFactory.createWsConfigurationSetting(true);
  }

  @isTest
  static void accountValidation_Test() {
    String res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
    WRAPPER_AccountList.AccountDetails accountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(
      res,
      WRAPPER_AccountList.AccountDetails.class
    );

    CNT_B2B_SelectDestination.accountValidation(accountData);
    CNT_B2B_SelectDestination.accountValidation(null);
  }

  @isTest
  static void registerNewBeneficiary_Test() {
    WRAPPER_AccountList.AccountDetails data = new WRAPPER_AccountList.AccountDetails();
    data.displayNumber = 'ES23 4545 4545 4545 4545';
    data.subsidiaryName = 'subsidiaryName_Test';
    data.country = 'Spain';
    ReturnValue result = CNT_B2B_SelectDestination.registerNewBeneficiary(
      data,
      data
    );
    ReturnValue result_1 = CNT_B2B_SelectDestination.registerNewBeneficiary(
      null,
      data
    );
    ReturnValue result_2 = CNT_B2B_SelectDestination.registerNewBeneficiary(
      data,
      null
    );

    // System.assertNotEquals(null, result);
  }
  @isTest
  static void getCountryList_Test() {
    try {
      Test.startTest();
      CNT_B2B_SelectDestination.getCountryList();
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.getCountryList_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
  @isTest
  static void updatePayment_Test() {
    try {
      WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
      WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(
        null
      );
      Test.startTest();
      CNT_B2B_SelectDestination.updatePayment(paymentDraft);
      CNT_B2B_SelectDestination.updatePayment(null);
      paymentDraft.sourceAccount = null;
      CNT_B2B_SelectDestination.updatePayment(paymentDraft);
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.updatePayment_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
  @isTest
  static void getIipBeneficicaryCountries_Test() {
    try {
      String country = 'ES';
      Test.startTest();
      CNT_B2B_SelectDestination.getIipBeneficicaryCountries(country);
      CNT_B2B_SelectDestination.getIipBeneficicaryCountries(null);

      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.getIipBeneficicaryCountries_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void getCurrencyListByCountry_Test() {
    try {
      String country = 'ES';
      Test.startTest();
      CNT_B2B_SelectDestination.getCurrencyListByCountry();
      CNT_B2B_SelectDestination.getBeneficiariesByCountry(country);
      CNT_B2B_SelectDestination.getBeneficiariesByCountry(null);

      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.getCurrencyListByCountry_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void getDominantCurrency_Test() {
    try {
      String currencyOrigin = 'EUR';
      String currencyDestination = 'GBP';
      WrapperUserData userData = (WrapperUserData) JSON.deserialize(
        MockResponse.wrapperUserData('other'),
        WrapperUserData.class
      );

      Test.startTest();
      CNT_B2B_SelectDestination.getDominantCurrency(
        userData,
        currencyOrigin,
        currencyDestination
      );
      CNT_B2B_SelectDestination.getDominantCurrency(
        null,
        currencyOrigin,
        currencyDestination
      );
      CNT_B2B_SelectDestination.getDominantCurrency(
        userData,
        null,
        currencyDestination
      );
      CNT_B2B_SelectDestination.getDominantCurrency(
        userData,
        currencyOrigin,
        null
      );

      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.getDominantCurrency_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
  @isTest
  static void getExchangeRate_Test() {
    try {
      String currencyOrigin = 'EUR';
      String currencyDestination = 'GBP';
      WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
      WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.internationalInstantPaymentDraft(
        null
      );
      Test.startTest();
      CNT_B2B_SelectDestination.getExchangeRate(
        currencyOrigin,
        currencyDestination,
        paymentDraft
      );
      CNT_B2B_SelectDestination.getExchangeRate(
        null,
        currencyDestination,
        paymentDraft
      );
      CNT_B2B_SelectDestination.getExchangeRate(
        currencyOrigin,
        null,
        paymentDraft
      );
      CNT_B2B_SelectDestination.getExchangeRate(
        currencyOrigin,
        currencyDestination,
        null
      );
      paymentDraft.sourceAccount = null;
      CNT_B2B_SelectDestination.getExchangeRate(
        currencyOrigin,
        currencyDestination,
        paymentDraft
      );
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.getExchangeRate_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
  @isTest
  static void newBeneficiarySettings_test() {
    try {
      Test.setMock(
        HttpCalloutMock.class,
        new WS_TransfersBeneficiaries_MockHttp.OperationsResponse()
      );

      List<WRAPPER_PaymentList.WRAPPER_Country> countryList = new List<WRAPPER_PaymentList.WRAPPER_Country>();
      WRAPPER_PaymentList.WRAPPER_Country country = new WRAPPER_PaymentList.WRAPPER_Country();
      country.countryName = 'ES';
      country.parsedCountryName = 'ES';
      countryList.add(country);
      Test.startTest();
      CNT_B2B_SelectDestination.newBeneficiarySettings(countryList);
      CNT_B2B_SelectDestination.newBeneficiarySettings(null);

      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.newBeneficiarySettings_test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void getAvailableCurrencies_Test() {
    try {
      Local_Banking_Filters__c country = new Local_Banking_Filters__c(
        Name = 'ordFilter3',
        LB_CHK_Active__c = true,
        LB_TXT_Country_ISO_Code__c = 'ES',
        LB_TXT_Country_Name__c = 'Spain',
        LB_TXT_Currencies__c = 'EUR'
      );
      Test.startTest();
      CNT_B2B_SelectDestination.getAvailableCurrencies(country);
      CNT_B2B_SelectDestination.getAvailableCurrencies(null);

      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.getAvailableCurrencies_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void getIbanLength_Test() {
    try {
      String countryCode = 'ES';
      Test.startTest();
      CNT_B2B_SelectDestination.getIbanLength(countryCode);
      countryCode = 'BR';
      CNT_B2B_SelectDestination.getIbanLength(countryCode);
      countryCode = 'PL';
      CNT_B2B_SelectDestination.getIbanLength(countryCode);
      countryCode = 'GB';
      CNT_B2B_SelectDestination.getIbanLength(countryCode);
      CNT_B2B_SelectDestination.getIbanLength(null);

      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.getIbanLength_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void getFormType_Test() {
    try {
      String countryCode = 'ES';
      Test.startTest();
      CNT_B2B_SelectDestination.getFormType(countryCode);
      countryCode = 'BR';
      CNT_B2B_SelectDestination.getFormType(countryCode);
      CNT_B2B_SelectDestination.getFormType(null);

      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.getFormType_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void getAccountTypes_Test() {
    try {
      String countryCode = 'ES';
      Test.startTest();
      CNT_B2B_SelectDestination.getAccountTypes(countryCode);
      countryCode = 'BR';
      CNT_B2B_SelectDestination.getAccountTypes(countryCode);
      CNT_B2B_SelectDestination.getAccountTypes(null);

      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.getAccountTypes_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }

  @isTest
  static void getBanks_Test() {
    try {
      String countryCode = 'ES';
      Test.startTest();
      CNT_B2B_SelectDestination.getBanks(countryCode);
      countryCode = 'BR';
      CNT_B2B_SelectDestination.getBanks(countryCode);
      CNT_B2B_SelectDestination.getBanks(null);

      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SelectionDestination_Test.getBanks_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
}
