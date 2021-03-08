public with sharing class CNT_B2B_SelectOrigin {

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
     /*
    Author:         Julian Hoyos
    Company:        Deloitte
    Description:    Create payment
    History:
    <Date>          <Author>                <Description>
    29/11/2020      Bea Hill                Include transferType
    29/01/2021      Julian Hoyos            Include code from CNT:B2B_SelectDestination
    01/02/2021      Candido                 Refactor with WRAPPER_PAY_PaymentDraft
    */
    @AuraEnabled
    public static ReturnValue getPaymentId (WRAPPER_AccountList.AccountDetails sourceAccount, WrapperUserData userData, String paymentId, WRAPPER_AccountList.AccountDetails expensesAccount) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            if (String.isBlank(paymentId)) {
                // FLOWERPOWER_PARCHE_CPC
                if (String.isBlank(sourceAccount.bankName) && sourceAccount.country.equalsIgnoreCase('PL')) {
                    sourceAccount.bankName = 'SANTANDER POLZKA';
                }
                WS_CreatePaymentOperation paymentOperation = new WS_CreatePaymentOperation(userData);
            	paymentId = paymentOperation.execute(sourceAccount, null, expensesAccount);
            }
            value.put('paymentId', paymentId);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectOrigin.getPaymentId: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         Héctor Estivalis
    Company:        Deloitte
    Description:    Create payment object in Salesforce
    History:
    <Date>          <Author>                <Description>
    11/02/2021      Héctor Estivalis        Create the payment record in Salesforce with payment Id
    */
    @AuraEnabled
    public static ReturnValue upsertPayment (WRAPPER_PAY_PaymentDraft paymentDraft){
        ReturnValue response;
        try {
            response = HANDLER_Payment.upsertPayment (paymentDraft);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectOrigin.upsertPayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}