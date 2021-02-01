@isTest
public class CNT_B2B_Process_Test {

    @testSetUp
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createB2BOrderingFilters();
    }
        
    @isTest
    static void getAccountData_Test(){
        Test.startTest();
        CNT_B2B_Process.getAccountData();
        Test.stopTest();
    }

    @isTest
    static void getUserData_Test(){
        Test.startTest();
        CNT_B2B_Process.getUserData();
        Test.stopTest();
    }
    
    @isTest
    static void formatDates_Test(){
        List<WRAPPER_AccountList.AccountDetails> accountDetailsList = new List<WRAPPER_AccountList.AccountDetails>();
        String str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        accountDetailsList.add(accountDetails);
        
        Test.startTest();
        CNT_B2B_Process.formatDates(accountDetailsList);
        Test.stopTest();
    }
    
    @isTest
    static void decryptData_Test(){
        Test.startTest();
        CNT_B2B_Process.decryptData(Global_Utilities.encryptData('Test'));
        Test.stopTest();
    }
    
    /*
    @isTest
    static void filterOriginAccounts_Test(){
        List<WRAPPER_AccountList.AccountDetails> accountDetailsList = new List<WRAPPER_AccountList.AccountDetails>();
        String str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountDetails = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        accountDetailsList.add(accountDetails);
        str = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData1 = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);
        str = MockResponse.wrapperUserData('Nexus');
        WrapperUserData userData2 = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class); 
        str = MockResponse.wrapperUserData('');
        WrapperUserData userData3 = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);  
        
        test.startTest();
        CNT_B2B_Process.filterOriginAccounts(userData1, accountDetailsList);
        CNT_B2B_Process.filterOriginAccounts(userData2, accountDetailsList);
        CNT_B2B_Process.filterOriginAccounts(userData3, accountDetailsList);
        test.stopTest();
    }
*/

    
}