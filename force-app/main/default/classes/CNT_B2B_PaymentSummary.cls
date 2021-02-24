public with sharing  class CNT_B2B_PaymentSummary {

    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:   	Release Payment
    History:
    <Date>          <Author>                <Description>
    30/07/2020      R. Cervino              Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue executePayment (WRAPPER_B2B_Data.PaymentAmount amountData, WRAPPER_AccountList.AccountDetails sourceAccount, WRAPPER_AccountList.AccountDetails destinationAccount, String paymentId, String FXTimer, String description, String clientReference) {
        ReturnValue response = null; 
        try {
            WS_B2B_Orchestation orchestration = new WS_B2B_Orchestation();
            orchestration.setPaymentId(paymentId);
            orchestration.executePayment(amountData, amountData.exchangeRateServiceResponse, amountData.convertedTransactionFeeServiceResponse, amountData.transactionFeeServiceResponse, sourceAccount, destinationAccount, FXTimer, description, clientReference);
            Map<String, Object> value = new Map<String, Object>();
            value.put('OrchestationOutput', WS_B2B_Orchestation.OrchestationOutput);
			response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentSummary.executePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
			response = new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
    }

    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:   	Get sign status
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static Map<String, String> getSignLevel (String paymentId) {
        return CNT_B2B_SignatureUtilities.getSignatoryStatus(paymentId);
    }

    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:   	Authorize Payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
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

    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:   	Obtain OTP
    History:
    <Date>          <Author>            <Description>
    05/08/2020      R. Cervino          Initial version
	07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
    ----------------------------------------------------------------------------------*/
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

    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:   	validate OTP
    History
    <Date>          <Author>            <Description>
    05/08/2020      R. Cervino          Initial version
    07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
    ----------------------------------------------------------------------------------*/
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

    @AuraEnabled
    public static ReturnValue getExchangeRate (Boolean feesBoolean, String paymentId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_B2B_Data.AccountData accountData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            System.debug(paymentData);
            Decimal sendAmount = paymentData.amountSend;
            String callType = 'ONL';
            String requestType = 'T';
            if (feesBoolean == true && paymentData.transactionFee != null) {
                sendAmount =  paymentData.transactionFee;
                callType =  'ONI'; 
                requestType = 'I';
            }
            WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentId, 'b2b', requestType,  callType, accountData, 120000);
            Map<String, Object> output = exchangeRate.execute(sendAmount, null, sourceAccountData.currencyCodeAvailableBalance, recipientAccountData.currencyCodeAvailableBalance, sourceAccountData.alias, sourceAccountData.aliasEntidad, sourceAccountData.codigoCorporate, sourceAccountData.country, sourceAccountData.codigoBic);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentSummary.getExchangeRate: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
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
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes the callout to validate if a transaction can be executed on
                    behalf of a customer/user according to the transactional limits that
                    person has. If assessment is successful, it automatically is posted
                    against accumulated limits.              
    History:
    <Date>          <Author>            <Description>
    14/09/2020      Shahad Naji         Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue updateLimits (String operationId, String serviceId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData){
        ReturnValue response = null;
        try {   
            //PARCHE_FLOWERPOWER_SNJ
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
            }*/
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentSummary.updateLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:   	Delete signature
    History:
    <Date>          <Author>            <Description>
    15/09/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
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
    
    /*----------------------------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:   	Send notification
    History:
    <Date>          <Author>                <Description>
	07/10/2020      Antonio Duarte          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void sendNotification (String paymentID, String clientReference) {
        try {
            // Get the users that will receive the notification
    		List<SNG_Group_User__c> signers = [
                SELECT SGN_ELCK_RelatedUser__r.SGN_ELCK_RelatedUser__r.Id
                FROM SNG_Group_User__c
                WHERE SGN_ELCK_RelatedGroup__r.SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c = :paymentID
            ];
            if (signers == null) {
                throw new CustomException();
            }
            List<String> notificationReceiversIds = new List<String>();
            for (SNG_Group_User__c u : signers) {
                if (u.SGN_ELCK_RelatedUser__c != null && u.SGN_ELCK_RelatedUser__r.SGN_ELCK_RelatedUser__c != null && u.SGN_ELCK_RelatedUser__r.SGN_ELCK_RelatedUser__r.Id != null) {
                	notificationReceiversIds.add(u.SGN_ELCK_RelatedUser__r.SGN_ELCK_RelatedUser__r.Id);
                }
            }
            // Set the title and body messages
            String title = System.label.Payments;
            String body = System.label.Notification_Body_Payment_Pending.replace('[client_ref]', clientReference);
            // Get the redirection record
            String urlParams = 'c__paymentID=' + paymentID;
            String pageName = 'landing-payment-details';
            Notification_Redirect__c nr = CustomNotifications_Handler.getRedirectRecord(urlParams, pageName);
            // Send the custom notification
            CustomNotifications_Handler.sendCustomNotification(title, body, nr.Id, notificationReceiversIds);
        } catch (Exception e) {
            System.debug('Error sending the notification');
        }
    }
    
    
    @AuraEnabled
    public static String getSessionId () {
      return UserInfo.getSessionId();
    }
    
        /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:    Obtain OTP
    History:
    <Date>          <Author>            <Description>
    05/08/2020      R. Cervino          Initial version
	07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getOTP_Strategic (String beneficiaryName, String beneficiaryAccount, String paymentId, String debitAmount, String fees, String exchangeRate, String paymentAmount) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
			WS_B2B_OTP_Strategic.getOTP(beneficiaryName, beneficiaryAccount, paymentId, debitAmount, fees, exchangeRate, paymentAmount);
            value.put('initiateOTP', WS_B2B_OTP_Strategic.initiateOTP);
            response = new ReturnValue(true,value);
            if (WS_B2B_OTP_Strategic.initiateOTP.scaUid != '') {
                WS_B2B_OTP_Strategic.storeOTPId(WS_B2B_OTP_Strategic.initiateOTP.scaUid, paymentId);
            }
            
        } catch (Exception e) {
            System.debug('CNT_B2B_Authorization.getOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
			response =  new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
    }

}