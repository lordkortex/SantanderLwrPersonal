public with sharing  class CNT_B2B_PaymentSummary {

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Release Payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    26/11/2020      Bea Hill            Adapted to pass through ServiceOrchestration
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    @AuraEnabled
    public static ReturnValue executePayment (WRAPPER_PAY_PaymentDraft paymentDraft, String urgencyIndicator) {
        ReturnValue response = null;
        try {
            response = ServiceOrchestration.executePayment(paymentDraft, urgencyIndicator);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentSummary.executePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
    }

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Get sign status
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    */
    @AuraEnabled
    public static Map<String, String> getSignLevel (String paymentId) {
        return CNT_B2B_SignatureUtilities.getSignatoryStatus(paymentId);
    }

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Authorize Payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    */
    @AuraEnabled
    public static ReturnValue authorizePayment (String paymentId, Boolean finalAuthorizer, String scaUid) {
        ReturnValue response = null;
        try {
            CNT_B2B_SignatureUtilities.storeUserSign(paymentId, '', finalAuthorizer, scaUid);
            response = new ReturnValue(true, 'ok');
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentSummary.authorizePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response =  new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
    }

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Obtain OTP
    History:
    <Date>          <Author>            <Description>
    05/08/2020      R. Cervino          Initial version
    07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
    */
    @AuraEnabled
    public static ReturnValue getOTP (String paymentID, String sourceCountry, String sourceBIC) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            WS_B2B_OTP.getOTP(sourceCountry, sourceBIC);
            value.put('initiateOTP', WS_B2B_OTP.initiateOTP);
            response = new ReturnValue(true, value);
            if (WS_B2B_OTP.initiateOTP.scaUid != '') {
                WS_B2B_OTP.storeOTPId(WS_B2B_OTP.initiateOTP.scaUid, paymentID);
            }
            System.debug(response);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentSummary.getOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
    }

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    validate OTP
    History:
    <Date>          <Author>            <Description>
    05/08/2020      R. Cervino          Initial version
    07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
    */
    @AuraEnabled
    public static ReturnValue validateOTP (String paymentId, String metaData, String sourceCountry, String sourceBIC) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            WS_B2B_OTP.validateOTP(paymentId, metaData, sourceCountry, sourceBIC);
            value.put('validateOTP', WS_B2B_OTP.validateOTP);
            response = new ReturnValue(true,value);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentSummary.validateOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Makes the callout to the operation tracking service to update the
                    payment status to "Pending"
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
    Author:
    Company:        Deloitte
    Description:    Request countervalue in operating or consulting mode.
    History:
    <Date>          <Author>            <Description>
    14/01/2021      Shahad Naji         Add requestPurpose that indicates if the callout is related to the nominal amount of a payment or to the fee applied to the payment
    04/02/2021      Candido             Update the result of exchange rate to Operation Tracking
    */
    @AuraEnabled
    public static ReturnValue getExchangeRate (Boolean feesBoolean, WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            Decimal sendAmount = null;
            Decimal receiveAmount = null;
            String callType = '';
            String requestType = '';
            String customerId = paymentDraft.sourceAccount.codigoCorporate;
            String requestPurpose = '';
            if (feesBoolean == false) {
                if (paymentDraft.fromOrigin != null) {
                    if (paymentDraft.fromOrigin == true) {
                        sendAmount = paymentDraft.amountSend;
                        if (paymentDraft.sourceAccount.companyIdsList != null && String.isNotBlank(paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier))) {
                            customerId = paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier);
                        }
                    } else {
                        receiveAmount = paymentDraft.amountReceive;
                        if (paymentDraft.destinationAccount.companyIdsList != null && String.isNotBlank(paymentDraft.destinationAccount.companyIdsList.get(System.Label.CNF_APIIdentifier))) {
                            customerId = paymentDraft.destinationAccount.companyIdsList.get(System.Label.CNF_APIIdentifier);
                        }
                    }
                }
                callType = 'ONL';
                requestType = 'T';
                requestPurpose = 'Nominal_request';
            } else if (feesBoolean == true && paymentDraft.transactionFee != null) {
                sendAmount =  paymentDraft.transactionFee;
                callType =  'ONI';
                requestType = 'I';
                requestPurpose = 'Fee_request';
            }
            WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentDraft.paymentId, 'b2b', requestType,  callType, null, 120000, requestPurpose);
            Map<String, Object> output = exchangeRate.execute(sendAmount, receiveAmount, paymentDraft.sourceAccount.currencyCodeAvailableBalance, paymentDraft.destinationAccount.currencyCodeAvailableBalance, paymentDraft.sourceAccount.alias, paymentDraft.sourceAccount.aliasEntidad, customerId, paymentDraft.sourceAccount.country, paymentDraft.sourceAccount.codigoBic);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentSummary.getExchangeRate: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Data encryption
    History:
    <Date>          <Author>            <Description>
    28/09/2020      R. Cervino          Initial version
    */
    @AuraEnabled
    public static String encryptData (String str) {
        return Global_Utilities.encryptData(str);
    }

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes the callout to validate if a transaction can be executed on
                    behalf of a customer/user according to the transactional limits that
                    person has. If assessment is successful, it automatically is posted
                    against accumulated limits.
    History:
    <Date>          <Author>            <Description>
    14/09/2020      Shahad Naji         Initial version
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    @AuraEnabled
    public static ReturnValue updateLimits (WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        try {
            // PARCHE_FLOWERPOWER_SNJ
            /* WS_TransactionalLimitsUpdate transactionalLimitsUpdate = new WS_TransactionalLimitsUpdate();
            WS_TransactionalLimitsUpdate.OUTPUT output = transactionalLimitsUpdate.execute(operationId, serviceId, paymentData, sourceAccountData);
            Map<String, Object> value = new Map<String, Object>();
            if (output == null) {
                response = new ReturnValue(false, value);
            } else {
                if (output.limitsResult != null) {
                    if (output.limitsResult == 'ok') {
                        value.put('result', output);
                        response = new ReturnValue(true, value);
                    } else {
                        response = new ReturnValue(false, value);
                    }
                } else {
                    response = new ReturnValue(false, value);
                }
            } */
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentSummary.updateLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Delete signature
    History:
    <Date>          <Author>            <Description>
    15/09/2020      R. Cervino          Initial version
    */
    @AuraEnabled
    public static ReturnValue removeSignature (String paymentId) {
        ReturnValue response = null;
        try {
            CNT_B2B_SignatureUtilities.deleteSignatureRecord(paymentId);
            response = new ReturnValue(true, 'ok');
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentSummary.RemoveSignature: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:    Send notification
    History:
    <Date>          <Author>                <Description>
    07/10/2020      Antonio Duarte          Initial version
    09/12/2020      Héctor Estivalis        REDO
    */
    @AuraEnabled
    public static void sendNotification (String paymentId, String notificationType) {
        HANDLER_CustomNotification.sendNotification('Payment', PaymentId, notificationType);
    }

    @AuraEnabled
    public static String getSessionId () {
      return UserInfo.getSessionId();
    }

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Obtain OTP
    History:
    <Date>          <Author>            <Description>
    05/08/2020      R. Cervino          Initial version
    07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    @AuraEnabled
    public static ReturnValue getOTP_Strategic (String debitAmount, String fees, String exchangeRate, String paymentAmount, WRAPPER_PAY_PaymentDraft paymentDraft, Map<String, String> navigatorInfo) {
        return CNT_B2B_SignatureUtilities.getOTP_Strategic(debitAmount, fees, exchangeRate, paymentAmount, paymentDraft, navigatorInfo);
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
    public static ReturnValue upsertPayment (WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response;
        try {
            response = HANDLER_Payment.upsertPayment (paymentDraft);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectOrigin.upsertSalesforcePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}