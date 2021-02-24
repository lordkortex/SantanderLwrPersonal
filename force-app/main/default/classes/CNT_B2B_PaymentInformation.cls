public with sharing class CNT_B2B_PaymentInformation {

    /*----------------------------------------------------------------------------------
    Author:         Cerviño
    Company:        Deloitte
    Description:    Gets the signature structure of the payment
    History:
    <Date>          <Author>            <Description>
    07/2020         Cerviño             Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getSignatureStructure (Boolean isNexus, String paymentID, String service_id, String tcurrency, String customerId, String channel, String amount) {
        ReturnValue response = null;
        try {
            System.debug('SENDING 1:' + isNexus + ', ' + paymentID + ', ' + service_id + ', ' + tcurrency + ', ' + customerId + ', ' + channel + ', ' + amount);
            CNT_B2B_SignatureUtilities.getSignatureStructureNexus(isNexus, paymentID, service_id, tcurrency, customerId, channel,  amount);
            response = new ReturnValue(true, 'ok');
            System.debug('RESPONSE: '+response);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.getSignatureStructure: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

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
    ------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue updatePaymentInformation (String paymentId, String clientReference, String purpose, String description, String chargeBearer, String paymentMethod, String commercialCode) {
        ReturnValue response = null;
        try {
        	WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
        	wsObject.updateInformation(clientReference, purpose, description, chargeBearer, paymentMethod, commercialCode);
            response = new ReturnValue(true);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.updatePaymentInformation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
      	return response;
    }

    @AuraEnabled
    public static ReturnValue checkFCCDowJones (String paymentId, String description) {
        return ControllerFCCDowJones.checkFCCDowJonesAndUpdateStatus(paymentId, description);
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
    Description:    Makes the callout to validate the operation limit 
					(based on getLimit function of CMP_B2B_Selectamount)
    History:
    <Date>          <Author>            <Description>
    10/12/2020      Shahad Naji         Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getLimits (String paymentId, WRAPPER_B2B_Data.PaymentAmount paymentData, WrapperUserData userData, WRAPPER_B2B_Data.AccountData accountData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
        ReturnValue response = null;
        try {
            Decimal baseAmount = null;
            String baseCurrency = Global_Utilities.getCountryCurrency(sourceAccountData.country);
            if (sourceAccountData.currencyCodeAvailableBalance == baseCurrency || String.isBlank(baseCurrency)) {
                baseCurrency = sourceAccountData.currencyCodeAvailableBalance;
                baseAmount = paymentData.amountSend;
            } else {         
                baseAmount = UtilitiesCurrency.convertCurrency(sourceAccountData.currencyCodeAvailableBalance, baseCurrency, paymentData.amountSend);
            }
            WS_TransactionalLimits transactionalLimits = new WS_TransactionalLimits('b2b', paymentId, userData, accountData);
            Map<String, Object> output = transactionalLimits.execute(paymentData, sourceAccountData, recipientAccountData, baseAmount, baseCurrency);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.getLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}