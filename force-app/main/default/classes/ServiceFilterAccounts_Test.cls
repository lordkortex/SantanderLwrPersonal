@isTest
public with sharing class ServiceFilterAccounts_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }

     @isTest
    static void discardAccountsByCountry_Test (){
        String str = MockResponse.wrapperUserData('Nexus');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);          
        String str3 = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str3, WRAPPER_AccountList.AccountDetails.class);
        List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
        accountList.add(accountDetails);
         List<String> countries = new List<String>();
        countries.add('ES');

        Test.startTest();
        ServiceFilterAccounts.discardAccountsByCountry(accountList, countries);
        Test.stopTest();
     }   
    
    @isTest
    static void filterAccountsByCountryAndCurrency_Nexus_Test(){
            
        String str = MockResponse.wrapperUserData('Nexus');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);          
        String str3 = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str3, WRAPPER_AccountList.AccountDetails.class);
		List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
        accountList.add(accountDetails);

        DataFactory.createB2BOrderingFilters();
        
        Test.startTest();
        ServiceFilterAccounts.filterAccountsByCountryAndCurrency(userData, accountList);
        Test.stopTest();
    }

    @isTest
    static void filterAccountsByCountryAndCurrency_MOT_Test(){
            
        String str = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);          
        String str3 = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str3, WRAPPER_AccountList.AccountDetails.class);
		List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
        accountList.add(accountDetails);

        DataFactory.createB2BOrderingFilters();
        
        Test.startTest();
        ServiceFilterAccounts.filterAccountsByCountryAndCurrency(userData, accountList);
        Test.stopTest();
    }

    @isTest
    static void filterAccountsByCountryAndCurrency_LB_Test(){
            
        String str = MockResponse.wrapperUserData('LOCAL_BANKING');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);          
        String str3 = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str3, WRAPPER_AccountList.AccountDetails.class);
		List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
        accountList.add(accountDetails);

        DataFactory.createB2BOrderingFilters();
        
        Test.startTest();
        ServiceFilterAccounts.filterAccountsByCountryAndCurrency(userData, accountList);
        Test.stopTest();
    }
    /* NOT YET IMPLEMENTED ON INT AND PRE
    @isTest
    static void filterAccountsByChannelServices_Test(){
        
        Test.setMock(HttpCalloutMock.class, new ServiceFilterAccounts_MockHttp());
        
        List<WRAPPER_AccountList.AccountDetails> accountList = DataFactory.getAccountList();
        
        List<String> services = new List<String>{'add_international_payment_internal', 'add_international_payment_external', 'list_international_payments'};
        
        Test.startTest();
        ServiceFilterAccounts.filterAccountsByChannelServices(accountList, services);
        Test.stopTest();
        
    }*/

    /* NOT YET IMPLEMENTED ON INT AND PRE
    @isTest
    static void filterAccountsByAttributions_Test(){
        
        Test.setMock(HttpCalloutMock.class, new WS_Attributions_MockHttp());
        
        List<WRAPPER_AccountList.AccountDetails> accountList = DataFactory.getAccountList();
        
        List<String> services = new List<String>{'add_international_payment_internal', 'add_international_payment_external', 'list_international_payments'};
        
        Test.startTest();
        ServiceFilterAccounts.filterAccountsByAttributions(accountList, services);
        Test.stopTest();
        
    }*/
    
}