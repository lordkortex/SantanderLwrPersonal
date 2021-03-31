public with sharing class CNT_B2B_SelectOrigin {

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    validate Account
    History:
    <Date>          <Author>                <Description>
    12/08/2020      R. Cervino              Initial version
    01/11/2020      Candido                 Refactor and add accountIdType to check
    */
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
    public static ReturnValue getPaymentId (WRAPPER_AccountList.AccountDetails sourceAccount, WrapperUserData userData, String paymentId, WRAPPER_AccountList.AccountDetails expensesAccount, String transferType) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            if (String.isBlank(paymentId)) {
                String serviceId = null;
                String productId = null;
                if (String.isNotBlank(transferType)) {
                    serviceId = ControllerPaymentLine.getServiceId(transferType);
                }
                // FLOWERPOWER_PARCHE_CPC
                if (String.isBlank(sourceAccount.bankName) && sourceAccount.country.equalsIgnoreCase('PL')) {
                    sourceAccount.bankName = 'SANTANDER POLZKA';
                }
                WS_CreatePaymentOperation paymentOperation = new WS_CreatePaymentOperation(userData);
            	paymentId = paymentOperation.execute(sourceAccount, null, expensesAccount, productId, serviceId);
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

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Update payment details
    History:
    <Date>          <Author>                <Description>
    16/03/2021      Bea Hill                Update source accounts with PATCH
    */
    @AuraEnabled
    public static ReturnValue updatePayment (WRAPPER_PAY_PaymentDraft paymentDraft) {
        System.debug('paymentDraft: ' + JSON.serialize(paymentDraft));
        ReturnValue response = null;
        try {
            if (paymentDraft == null) {
                throw new CustomException('Must inform paymentDraft');
            }
            if (String.isBlank(paymentDraft.paymentId)) {
                throw new CustomException('Must inform paymentDraft.paymentId');
            }
            if (paymentDraft.sourceAccount == null) {
                throw new CustomException('Must inform paymentDraft.sourceAccount');
            }
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentDraft.paymentId);
            String output = wsObject.updateSourceAccount(paymentDraft.sourceAccount, paymentDraft.expensesAccount);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectOrigin.updatePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}