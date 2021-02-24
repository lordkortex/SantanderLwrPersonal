@isTest
public class CNT_B2B_SelectDestination_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void getPaymentId_Test(){
        //String res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        String res = MockResponse.sourceAccount_Fraud();
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
    
    @isTest
    static void registerNewBeneficiary_Test(){
        
        WRAPPER_AccountList.AccountDetails data = new WRAPPER_AccountList.AccountDetails();
        data.displayNumber = 'ES23 4545 4545 4545 4545';
        data.subsidiaryName = 'subsidiaryName_Test';
        data.country = 'Spain';
        ReturnValue result =  CNT_B2B_SelectDestination.registerNewBeneficiary(data);
       // System.assertNotEquals(null, result);
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
    static void updatePayment_Test(){
        try {
            String res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
            WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
            res = MockResponse.AccountList_AccountDetails('ES', 'GBR');
            WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
            res = MockResponse.sourceAccount_Fraud();
            WRAPPER_AccountList.AccountDetails sourceFeeAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
            
            Test.startTest();
            CNT_B2B_SelectDestination.updatePayment('paymentId', sourceAccountData, recipientAccountData, sourceFeeAccountData);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.updatePayment_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    @isTest
    static void getProductServiceIds_Test(){
        try{
            String res = MockResponse.AccountList_AccountDetails('ES', 'EUR');
            WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
            res = MockResponse.AccountList_AccountDetails('ES', 'GBR');
            WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class);
            res = MockResponse.wrapperUserData('OneTrade');
            WrapperUserData userData = (WrapperUserData) JSON.deserialize(res, WrapperUserData.class); 
            res = MockResponse.B2BData_AccountData();
            WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(res, WRAPPER_B2B_Data.AccountData.class); 
            res = MockResponse.sourceAccount_Fraud();
            WRAPPER_AccountList.AccountDetails expensesAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(res, WRAPPER_AccountList.AccountDetails.class); 
            String transferType_it = 'instant_transfer';
            String transferType_its = 'international_transfer_single';
            String transferType_other = 'other';
            
            Test.startTest();
            
            CNT_B2B_SelectDestination.getProductServiceIds(sourceAccountData, recipientAccountData, userData, accountData, 'paymentId', expensesAccount, transferType_it);
            CNT_B2B_SelectDestination.getProductServiceIds(sourceAccountData, recipientAccountData, userData, accountData, 'paymentId', expensesAccount, transferType_its);
            CNT_B2B_SelectDestination.getProductServiceIds(sourceAccountData, recipientAccountData, userData, accountData, 'paymentId', expensesAccount, transferType_other);
            
            
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectionDestination_Test.getProductServiceIds_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

}