@isTest
public class WS_B2B_ValidateAccount_Test {

    @isTest
    static void catchExceptions_Test01 () {
        WS_B2B_ValidateAccount.ValidateAccountBody validAccBody = new WS_B2B_ValidateAccount.ValidateAccountBody();
        WS_B2B_ValidateAccount.Errors err = new WS_B2B_ValidateAccount.Errors();
        err.code = 'codeTest';
        err.message = 'messageTest';
        err.level = 'levelTest';
        err.description = 'descriptionTest';
        try {
            WS_B2B_ValidateAccount.validateAccount('accountId', 'accountIdType', 'country', 'codigoBic', 'customerId', null);
        } catch (CustomException expectedException) {
            System.AssertEquals('You need to inform the validateAccount conditions.', expectedException.getMessage());
        }
    }
    
    @isTest
    static void catchExceptions_Test02 () {
        try {
            WS_B2B_ValidateAccount.validateAccount(null, 'accountIdType', 'country', 'codigoBic', 'customerId', null);
        } catch (CustomException expectedException) {
            System.AssertEquals('You need to inform the accountId.', expectedException.getMessage());
        }
    }
    
    @isTest
    static void catchExceptions_Test03(){
        try {
            WS_B2B_ValidateAccount.validateAccount('accountId', null, 'country', 'codigoBic', 'customerId', null);
        } catch (CustomException expectedException) {
            System.AssertEquals('You need to inform the accountIdType.', expectedException.getMessage());
        }
    }
    
    @isTest
    static void catchExceptions_Test04 () {
        try {
            WS_B2B_ValidateAccount.validateAccount('accountId', 'accountIdType', null, 'codigoBic', 'customerId', null);
        } catch (CustomException expectedException) {
            System.AssertEquals('You need to inform the country.', expectedException.getMessage());
        }
    }
    
    @isTest
    static void catchExceptions_Test05 () {
        try {
            WS_B2B_ValidateAccount.validateAccount('accountId', 'accountIdType', 'country', null, 'customerId', null);
        } catch (CustomException expectedException) {
            System.AssertEquals('You need to inform the codigoBic.', expectedException.getMessage());
        }
    }
}