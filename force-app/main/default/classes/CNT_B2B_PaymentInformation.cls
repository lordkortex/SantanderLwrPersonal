public with sharing class CNT_B2B_PaymentInformation {

    /*----------------------------------------------------------------------------------
    Author:         Cerviño
    Company:        Deloitte
    Description:    Gets the signature structure of the payment
    History:
    <Date>          <Author>            <Description>
    07/2020         Cerviño             Initial version
    ----------------------------------------------------------------------------------*/
    /*@AuraEnabled
    public static ReturnValue getSignatureStructure ( String paymentID, String service_id, String channel, WRAPPER_B2B_Data.PaymentAmount amount, WRAPPER_AccountList.AccountDetails sourceAccount, WRAPPER_AccountList.AccountDetails destinationAccount, String subject, Map<String, String> navigatorInfo) {
        ReturnValue response = null;
        try {
            CNT_B2B_SignatureUtilities.getSignatureStructure(paymentID, service_id, channel, amount,  sourceAccount, destinationAccount, subject, navigatorInfo);
            response = new ReturnValue(true, 'ok');
            System.debug('RESPONSE: '+response);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.getSignatureStructure: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }*/

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


    /*-------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Makes the call to the operation tracking service update the
                    payment details
    History:
    <Date>          <Author>                <Description>
    28/07/2020      Guillermo Giral         Initial version for CNT_B2B_REDOModal
    07/08/2020      Bea Hill                Adapted for Step 4 of B2B process
    12/08/2020      Bea Hill                Removed the status and reason parameters
    07/09/2020      Bea Hill                Add chargeBearer = "OUR"
	15/01/2021		Shahad Naji				Add baseAmount and baseCurrency
    ------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue updatePaymentInformation (String paymentId, String clientReference, String purpose, String description, String chargeBearer, String paymentMethod, String commercialCode, Double baseAmount, String baseCurrency) {
        ReturnValue response = null;
        try {
        	WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
        	wsObject.updateInformation(clientReference, purpose, description, chargeBearer, paymentMethod, commercialCode, null,baseAmount, baseCurrency);
            response = new ReturnValue(true);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.updatePaymentInformation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
      	return response;
    }

    @AuraEnabled
    public static ReturnValue checkFCCDowJones (String paymentId, String description, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
        return ControllerFCCDowJones.checkFCCDowJonesAndUpdateStatus(paymentId, description, sourceAccountData, recipientAccountData);
    }

    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:   	Data encryption
    History:
    <Date>          <Author>            <Description>
    28/09/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String encryptData (String str) {
        return Global_Utilities.encryptData(str);
    }

    /*----------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Makes the callout to the operation tracking service to update the  
                    payment status to "Pending"
    History:
    <Date>          <Author>            <Description>
    28/07/2020      Bea Hill            Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String updateStatus (String paymentId, String status, String reason) {
        WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
        String output = wsObject.updateStatus(status, reason);
        return output;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate and/or update if a transaction can be processed on behalf of a customer according to their transactional limits.
    History:
    <Date>          <Author>            <Description>
    10/12/2020      Shahad Naji         Initial version
----------------------------------------------------------------------------------*/    
    @AuraEnabled
    public static ReturnValue getLimits(String productId, String serviceId, String paymentId, WRAPPER_B2B_Data.PaymentAmount paymentData, WrapperUserData userData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
        
        ReturnValue response = null;
        try {
            //FLOWERPOWER_PARCHE_SNJ: delete next line code when a IIP can be created
            // productId = 'book_to_book';
            String bookToBook_label = System.Label.CNF_payment_productId_001;
            String internationalInstantPayment = System.Label.CNF_payment_productId_002;
            if(productId.equalsIgnoreCase(bookToBook_label)){
                response = ControllerCustomerTransactionalLimits.validateLimits(productId, serviceId, paymentId, userData, paymentData, sourceAccountData, recipientAccountData);
            }else if(productId.equalsIgnoreCase(internationalInstantPayment)){
                response = ControllerCustomerTransactionalLimits.updateLimits(productId, paymentId, serviceId, paymentData, sourceAccountData);
            }else{
                throw new CustomException('ERROR: Invalid data');
            }
            
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.getLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
   
      /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to simulate or validate Fraud in a transaction
    History:
    <Date>          <Author>            <Description>
    30/12/2020      Shahad Naji         Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue postFraud(WrapperUserData userData, Map<String, String> stepData, Map<String, String> navigatorInfo, String paymentId, String productId, String serviceId, WRAPPER_AccountList.AccountDetails sourceAccount, WRAPPER_AccountList.AccountDetails destinationAccount,  WRAPPER_B2B_Data.PaymentAmount amountData, String amountEnteredFrom){
        ReturnValue response = null;
        try {            
            response = ControllerFraud.postFraud(userData, stepData, navigatorInfo, paymentId, productId, serviceId, sourceAccount, destinationAccount, amountData, amountEnteredFrom);         
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.postFraud: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}