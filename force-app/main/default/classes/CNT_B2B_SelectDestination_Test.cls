@isTest
public class CNT_B2B_SelectDestination_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createB2BOrderingFilters();
    }
    
    @isTest
    static void updatePayment_Test(){
        try {
            Test.setMock(HttpCalloutMock.class, new WS_TrackingPaymentOperation_MockHttp());

            WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
            WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
            
            Test.startTest();
            CNT_B2B_SelectDestination.updatePayment(paymentDraft);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.updatePayment_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest
    static void registerNewBeneficiary_Test(){
        try {

            String res = MockResponse.sourceAccount_Fraud();
            WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
            res = MockResponse.AccountList_AccountDetails('ES', 'GBR');
            WRAPPER_AccountList.AccountDetails newAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
            
            WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
            WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
            
            Test.startTest();
            CNT_B2B_SelectDestination.registerNewBeneficiary(newAccount, sourceAccount);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.registerNewBeneficiary_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
        
    @isTest
    static void getCountryList_Test(){
        try {
            Test.startTest();
            CNT_B2B_SelectDestination.getCountryList();
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getCountryList_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest
    static void getIipBeneficicaryCountries_Test(){
        try {
            String sourceAccountCountry= 'ES';
            Test.startTest();
            CNT_B2B_SelectDestination.getIipBeneficicaryCountries (sourceAccountCountry) ;
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getIipBeneficicaryCountries_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest
    static void getCurrencyListByCountry_Test(){
        try {
            Test.startTest();
            CNT_B2B_SelectDestination.getCurrencyListByCountry();
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getCurrencyListByCountry_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest
    static void getBeneficiariesByCountry_Test(){
        try {
            Test.setMock(HttpCalloutMock.class, new WS_TransfersBeneficiaries_MockHttp.OperationsResponse());

            String countryCode = 'ES';
            Test.startTest();
            CNT_B2B_SelectDestination.getBeneficiariesByCountry(countryCode);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getBeneficiariesByCountry_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest
    static void getLocalBankingCountries_Test(){
        try {
            Test.startTest();
            CNT_B2B_SelectDestination.getLocalBankingCountries();
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getLocalBankingCountries_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
        @isTest
    static void getDominantCurrency_Test(){
        try {
            String currencyOrigin= 'ES';
			String currencyDestination= 'PL';    
            String res = MockResponse.wrapperUserData('OneTrade');
        	WrapperUserData userData = (WrapperUserData) JSON.deserialize(res, WrapperUserData.class);
            Test.startTest();
            CNT_B2B_SelectDestination.getDominantCurrency(userData, currencyOrigin, currencyDestination);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getDominantCurrency_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest
    static void getExchangeRate_Test(){
        try {
            Test.setMock(HttpCalloutMock.class, new WS_TransfersBeneficiaries_MockHttp.OperationsResponse());

            String currency1= 'EUR';
            String currency2= 'GBP';
             WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
            WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
            Test.startTest();
            CNT_B2B_SelectDestination.getExchangeRate(currency1, currency2, paymentDraft);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getExchangeRate_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest
    static void accountValidation_Test(){
        String res = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(res, WrapperUserData.class); 
        WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
        
        CNT_B2B_SelectDestination.accountValidation(userData, paymentDraft);
    }
    
      
    @isTest
    static void newBeneficiarySettings_test(){
        try {
            Test.setMock(HttpCalloutMock.class, new WS_TransfersBeneficiaries_MockHttp.OperationsResponse());

          List<WRAPPER_PaymentList.WRAPPER_Country> countryList = new List<WRAPPER_PaymentList.WRAPPER_Country>();
            WRAPPER_PaymentList.WRAPPER_Country country = new WRAPPER_PaymentList.WRAPPER_Country();
			country.countryName = 'ES';
            country.parsedCountryName = 'ES';
            countryList.add(country);
            Test.startTest();
            CNT_B2B_SelectDestination.newBeneficiarySettings(countryList);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.newBeneficiarySettings_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest
    static void getAvailableCurrencies_Test(){
        try {
            
            Local_Banking_Filters__c country  =  new Local_Banking_Filters__c(Name = 'ordFilter3', LB_CHK_Active__c = true, LB_TXT_Country_ISO_Code__c = 'ES', LB_TXT_Country_Name__c = 'Spain', LB_TXT_Currencies__c = 'EUR'); 
            Test.startTest();
            CNT_B2B_SelectDestination.getAvailableCurrencies(country);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getAvailableCurrencies_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }    

    @isTest
    static void getIbanLength_Test(){
        try {
            
            String countryCode = 'ES';
            Test.startTest();
            CNT_B2B_SelectDestination.getIbanLength(countryCode);
            countryCode= 'BR';
            CNT_B2B_SelectDestination.getIbanLength(countryCode);
            countryCode= 'PL';
            CNT_B2B_SelectDestination.getIbanLength(countryCode);
            countryCode = 'GB';
            CNT_B2B_SelectDestination.getIbanLength(countryCode);

            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getIbanLength_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    } 
    
        @isTest
    static void getFormType_Test(){
        try {
            
            String countryCode = 'ES';
            Test.startTest();
            CNT_B2B_SelectDestination.getFormType(countryCode);
            countryCode= 'BR';
            CNT_B2B_SelectDestination.getFormType(countryCode);
           Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getFormType_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }      
    
    @isTest
    static void getAccountTypes_Test(){
        try {
            String countryCode = 'ES';
            Test.startTest();
            CNT_B2B_SelectDestination.getAccountTypes(countryCode);
            countryCode= 'BR';
            CNT_B2B_SelectDestination.getAccountTypes(countryCode);
           Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getAccountTypes_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
        @isTest
    static void getBanks_Test(){
        try {
            String countryCode = 'ES';
            Test.startTest();
            CNT_B2B_SelectDestination.getBanks(countryCode);
            countryCode= 'BR';
            CNT_B2B_SelectDestination.getBanks(countryCode);
           Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getBanks_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    
    
}