@isTest
public class CNT_B2B_SelectOrigin_Test {

    @isTest
    static void accountValidation_Test(){
        String res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails accountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
        
        CNT_B2B_SelectOrigin.accountValidation(accountData);
    }
}