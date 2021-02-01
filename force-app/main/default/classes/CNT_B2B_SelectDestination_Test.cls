@isTest
public class CNT_B2B_SelectDestination_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void getPaymentId_Test(){
        String res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
        res = MockResponse.AccountList_AccountDetails('ES', 'GBR');
        WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
		res = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(res, WrapperUserData.class); 
        res = MockResponse.B2BData_AccountData();
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class); 

        CNT_B2B_SelectDestination.getPaymentId(sourceAccountData, recipientAccountData, userData, accountData, null, sourceAccountData);
    }
    
    @isTest
    static void accountValidation_Test(){
        String res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
        
        CNT_B2B_SelectDestination.accountValidation(accountData);
    }
}