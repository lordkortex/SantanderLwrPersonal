@isTest
public class CNT_PaymentsLoadUserAccounts_Test {

    @TestSetup
    static void setup () {
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.getCustomSettingCryptoKey(true);
    }

    @isTest
    static void callToAccountsWithAttributions_Test () {
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLoadUserAccounts_MockHttp.GlobalPosition());
        String str = MockResponse.wrapperUserData('Nexus');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);
        String str2 = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData2 = (WrapperUserData) JSON.deserialize(str2, WrapperUserData.class);
        str = MockResponse.wrapperUserData('Country Support');
        WrapperUserData userData3 = (WrapperUserData) JSON.deserialize(str2, WrapperUserData.class);
        str = MockResponse.wrapperUserData('Other');
        WrapperUserData userData4 = (WrapperUserData) JSON.deserialize(str2, WrapperUserData.class);
        String transferType_it = System.Label.PTT_instant_transfer;
        String transferType_its = System.Label.PTT_international_transfer_single;

        Test.startTest();
        CNT_PaymentsLoadUserAccounts.callToAccountsWithAttributions(userData, transferType_it);
        CNT_PaymentsLoadUserAccounts.callToAccountsWithAttributions(userData2, transferType_it);
        CNT_PaymentsLoadUserAccounts.callToAccountsWithAttributions(userData3, transferType_it);
        CNT_PaymentsLoadUserAccounts.callToAccountsWithAttributions(userData4, transferType_it);
        
        CNT_PaymentsLoadUserAccounts.callToAccountsWithAttributions(userData, transferType_its);  
        CNT_PaymentsLoadUserAccounts.callToAccountsWithAttributions(userData, null);
        CNT_PaymentsLoadUserAccounts.callToAccountsWithAttributions(null, transferType_its);



        Test.stopTest();
    }

    @isTest
    static void callToAccountsWithoutAttributions_Test () {
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLoadUserAccounts_MockHttp.GlobalPosition());
        String str = MockResponse.wrapperUserData('Nexus');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);
        String str2 = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData2 = (WrapperUserData) JSON.deserialize(str2, WrapperUserData.class);
        Test.startTest();
        CNT_PaymentsLoadUserAccounts.callToAccountsWithoutAttributions(userData);
        CNT_PaymentsLoadUserAccounts.callToAccountsWithoutAttributions(userData2);
        CNT_PaymentsLoadUserAccounts.callToAccountsWithoutAttributions(null);

        Test.stopTest();
    }


    @isTest
    static void callToBeneficiaryAccounts_Test () {
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLoadUserAccounts_MockHttp.BeneficiaryAccounts());
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsLoadUserAccounts_MockHttp.GlobalPosition());
        String str = MockResponse.wrapperUserData('Nexus');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);
        String str2 = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData2 = (WrapperUserData) JSON.deserialize(str2, WrapperUserData.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        String PTT_instant_transfer = System.Label.PTT_instant_transfer;
        String PTT_international_transfer_single = System.Label.PTT_international_transfer_single;

		List<WRAPPER_AccountList.AccountDetails> origins = (List<WRAPPER_AccountList.AccountDetails>) JSON.deserialize('['+MockResponse.AccountListAccountDetails_ES()+']', List<WRAPPER_AccountList.AccountDetails>.class);
        
        Test.startTest();
        CNT_PaymentsLoadUserAccounts.callToBeneficiaryAccounts(userData, PTT_instant_transfer,sourceAccountData, origins );
        CNT_PaymentsLoadUserAccounts.callToBeneficiaryAccounts(userData2, PTT_international_transfer_single,sourceAccountData, origins);
        Test.stopTest();
    }

    @isTest
    static void encryptAccountsData_Test () {
        Test.startTest();
        ReturnValue retValue = CNT_PaymentsLoadUserAccounts.encryptAccountsData('Test');
        String str = retValue.value.get('result').toString();
        CNT_PaymentsLoadUserAccounts.decryptAccountsData(str);
        Test.stopTest();
    }

    @isTest
    static void discardAccountsByCountry_Test () {
        String str = MockResponse.wrapperUserData('Nexus');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);
        String str3 = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str3, WRAPPER_AccountList.AccountDetails.class);
        List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
        accountList.add(accountDetails);
        Test.startTest();
        CNT_PaymentsLoadUserAccounts.discardAccountsByCountry(userData, accountList);
        Test.stopTest();
    }

    @isTest
    static void filterAccountsByCountryAndCurrency_Test () {
        String str = MockResponse.wrapperUserData('Nexus');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);
        String str3 = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str3, WRAPPER_AccountList.AccountDetails.class);
        List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
        accountList.add(accountDetails);
        Test.startTest();
        CNT_PaymentsLoadUserAccounts.filterAccountsByCountryAndCurrency(userData, accountList);
        Test.stopTest();
    }

    /* @isTest
    static void formatDates_Test(){

        String str3 = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str3, WRAPPER_AccountList.AccountDetails.class);
        List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
        accountList.add(accountDetails);

        Test.startTest();
        CNT_PaymentsLoadUserAccounts.formatDates(accountList);
        Test.stopTest();
    } */
}