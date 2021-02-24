public with sharing class CNT_B2B_PaymentInformation {

    /*
    Author:         Cerviño
    Company:        Deloitte
    Description:    Gets the signature structure of the payment
    History:
    <Date>          <Author>            <Description>
    01/07/2020      Cerviño             Initial version
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
   /* @AuraEnabled
    public static ReturnValue getSignatureStructure (String channel, Map<String, String> navigatorInfo, WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        try {
            CNT_B2B_SignatureUtilities.getSignatureStructure(channel, navigatorInfo, paymentDraft);
            response = new ReturnValue(true, 'ok');
            System.debug('RESPONSE: '+response);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.getSignatureStructure: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }*/

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Makes the call to the operation tracking service update the payment details
    History:
    <Date>          <Author>                <Description>
    28/07/2020      Guillermo Giral         Initial version for CNT_B2B_REDOModal
    07/08/2020      Bea Hill                Adapted for Step 4 of B2B process
    12/08/2020      Bea Hill                Removed the status and reason parameters
    07/09/2020      Bea Hill                Add chargeBearer = "OUR"
    15/01/2021      Shahad Naji             Add baseAmount and baseCurrency
    */
    /*@AuraEnabled
    public static ReturnValue updatePaymentInformation (String paymentId, String clientReference, String purpose, String description, String chargeBearer, String paymentMethod, String commercialCode, Double baseAmount, String baseCurrency) {
        ReturnValue response = null;
        try {
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
            wsObject.updateInformation(clientReference, purpose, description, chargeBearer, paymentMethod, commercialCode, null, baseAmount, baseCurrency);
            response = new ReturnValue(true);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.updatePaymentInformation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }*/

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to simulate or validate Fraud in a transaction
    History:
    <Date>          <Author>            <Description>
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    /*@AuraEnabled
    public static ReturnValue checkFCCDowJones (WRAPPER_PAY_PaymentDraft paymentDraft) {
        return ControllerFCCDowJones.checkFCCDowJonesAndUpdateStatus(paymentDraft);
    }*/

    /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:   	Data encryption
    History:
    <Date>          <Author>            <Description>
    28/09/2020      R. Cervino          Initial version
    */
    @AuraEnabled
    public static String encryptData (String str) {
        return Global_Utilities.encryptData(str);
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Makes the callout to the operation tracking service to update the payment status to "Pending"
    History:
    <Date>          <Author>            <Description>
    28/07/2020      Bea Hill            Initial version
    */
    @AuraEnabled
    public static String updateStatus (String paymentId, String status, String reason) {
        WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
        String output = wsObject.updateStatus(status, reason);
        return output;
    }

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate and/or update if a transaction can be processed on behalf of a customer according to their transactional limits.
    History:
    <Date>          <Author>            <Description>
    10/12/2020      Shahad Naji         Initial version
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    /*@AuraEnabled
    public static ReturnValue getLimits (WrapperUserData userData, WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        try {
            String bookToBook_label = System.Label.CNF_payment_productId_001;
            String internationalInstantPayment = System.Label.CNF_payment_productId_002;
            String productId = paymentDraft.productId;
            if (productId.equalsIgnoreCase(bookToBook_label)) {
                response = ControllerCustomerTransactionalLimits.validateLimits(userData, paymentDraft);
            } else if (productId.equalsIgnoreCase(internationalInstantPayment)) {
                response = ControllerCustomerTransactionalLimits.updateLimits(paymentDraft);
            } else {
                throw new CustomException('ERROR: Invalid data');
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.getLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }*/

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to simulate or validate Fraud in a transaction
    History:
    <Date>          <Author>            <Description>
    30/12/2020      Shahad Naji         Initial version
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
     /*@AuraEnabled
    public static ReturnValue postFraud (WrapperUserData userData, Map<String, String> navigatorInfo, WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        try {
            response = ControllerFraud.postFraud(userData, navigatorInfo, paymentDraft);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.postFraud: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }*/

    /*
    Author:         Miguel Ángel Hernández
    Company:        Deloitte
    Description:    Bring the structure from the payment information
    History:
    <Date>          <Author>            <Description>
    11/02/2021       Miguel Ángel       Refactor with WRAPPER_PAY_PaymentDraft
    */
    /*private static ReturnValue getStepFields (String productId, WRAPPER_AccountList.AccountDetails recipientAccountData){
        ReturnValue response = null;
        try {
            response = Controller_Payment_Stepfields.getStepFields(productId, recipientAccountData);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.getStepFields: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }*/

    /*@AuraEnabled
    public static ReturnValue showHideComponents(String productId, WRAPPER_AccountList.AccountDetails recipientAccountData){
        ReturnValue response = null;
        try {
            response = Controller_Payment_Stepfields.getStepFields(productId, recipientAccountData);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.showHideComponents: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }*/
}