public with sharing class CNT_B2B_SelectDestination {

    @AuraEnabled
    public static ReturnValue getPaymentId (WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, /*WRAPPER_B2B_Data.UserData*/WrapperUserData userData, WRAPPER_B2B_Data.AccountData accountData, String paymentId, WRAPPER_AccountList.AccountDetails expensesAccount) {
        //26/10/2020 -  Shahad Naji - WrapperUserData
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            if (String.isBlank(paymentId)) {
                WS_CreatePaymentOperation paymentOperation = new WS_CreatePaymentOperation('B2B', userData, accountData);
            	paymentId = paymentOperation.execute(sourceAccountData, recipientAccountData, expensesAccount);
            }            
            value.put('paymentId', paymentId);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getPaymentId: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:    validate Account
    History
    <Date>          <Author>                <Description>
    12/08/2020      R. Cervino              Initial version
    01/11/2020      Candido                 Refactor and add accountIdType to check
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue accountValidation (WRAPPER_AccountList.AccountDetails data) {
        return ServiceValidateAccount.validateAccount(data, 'open', null);
    }
}