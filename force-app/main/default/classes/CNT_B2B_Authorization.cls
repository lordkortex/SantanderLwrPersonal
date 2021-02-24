public with sharing class CNT_B2B_Authorization {

    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Gets the detail of a payment
    History:
    <Date>          <Author>            <Description>
    07/08/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String decryptData (String str) {
        return Global_Utilities.decryptData(str);
    }

    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Gets the detail of a payment
    History:
    <Date>          <Author>            <Description>
    07/08/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getPaymentDetail (String paymentId) {
        return CNT_PaymentsPaymentDetail.getPaymentDetail(paymentId);
    }

    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Gets the detail of a payment
    History
    <Date>          <Author>            <Description>
    07/08/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getAccountData () {
        return CNT_B2B_Process.getAccountData();
    }

    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Gets the detail of a payment
    History
    <Date>          <Author>            <Description>
    07/08/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getUserData () {
        return CNT_B2B_Process.getUserData();
    }

    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:    Release Payment
    History
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue executePayment (String paymentId, String FXTimer, WRAPPER_PaymentDetail.operationDetail paymentDetail , WS_ExchangeRate.OUTPUT FXData, WS_ExchangeRate.OUTPUT feesData) {
        ReturnValue response = null;
        try {
            WS_B2B_Orchestation orchestration = new WS_B2B_Orchestation();
            orchestration.setPaymentId(paymentId);
            orchestration.executePayment(paymentDetail, paymentId, FXTimer, FXData, feesData);
            Map<String, Object> value = new Map<String, Object>();
            value.put('OrchestationOutput', WS_B2B_Orchestation.OrchestationOutput);
			response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_Authorization.executePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
			response = new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
    }

    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:    Get sign status
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static Map<String,String> getSignLevel (String paymentId) {
        return CNT_B2B_SignatureUtilities.getSignatoryStatus(paymentId);
    }

    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:    Authorize Payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue authorizePayment (String paymentId,Boolean finalAuthorizer, String scaUid) {
        ReturnValue response = null;
        try {
            CNT_B2B_SignatureUtilities.storeUserSign(paymentId, '', finalAuthorizer, scaUid); 
			response = new ReturnValue(true,'ok');
        } catch (Exception e) {
            System.debug('CNT_B2B_Authorization.authorizePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
			response =  new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
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
    public static ReturnValue getOTP (String paymentID, String sourceCountry, String sourceBIC) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
			WS_B2B_OTP.getOTP(sourceCountry, sourceBIC);
            value.put('initiateOTP', WS_B2B_OTP.initiateOTP);
            response = new ReturnValue(true,value);
            if (WS_B2B_OTP.initiateOTP.scaUid != '') {
                WS_B2B_OTP.storeOTPId(WS_B2B_OTP.initiateOTP.scaUid, paymentID);
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_Authorization.getOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
			response =  new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
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


    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:    validate OTP
    History:
    <Date>          <Author>            <Description>
    05/08/2020      R. Cervino          Initial Version
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
            System.debug('CNT_B2B_Authorization.validateOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
			response =  new ReturnValue(false, null, e.getMessage());
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
    
    /*----------------------------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Makes the callout to the operation tracking service to update the  
                    payment status to "Pending"
    History:
    <Date>          <Author>            <Description>
    11/11/2020      Antonio Matachana            Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String updateStatus (String paymentId, String status, String reason, WrapperUserData userData) {
        WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
        //String output = wsObject.updateStatus(status, reason);
        String output;
        if(userData!=null){
            output = wsObject.updateStatus(status, reason, userData);
        }else{
            output = wsObject.updateStatus(status, reason);
        }
        return output;
    }

    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Get exchange rate
    History:
    <Date>          <Author>            <Description>
    17/08/2020      R. Cervino          Initial version - adapted from CNT_PaymentsParent
    09/11/2020      Bea Hill            Do the conversion in the direction originally specified by the user in step 3 of the process
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getExchangeRate (Boolean feesBoolean, String paymentId , WRAPPER_PaymentList.WRAPPER_Payment payment, WRAPPER_B2B_Data.AccountData accountData) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            WRAPPER_AccountList.AccountDetails sourceAccountData =  new WRAPPER_AccountList.AccountDetails();
            sourceAccountData.currencyCodeAvailableBalance = payment.sourceCurrency;
            sourceAccountData.alias = payment.sourceAccountHolder;
            sourceAccountData.aliasEntidad = payment.sourceBank;
            sourceAccountData.codigoCorporate = '';
            sourceAccountData.country = payment.sourceCountry;
            sourceAccountData.codigoBic = payment.sourceSwiftCode;
            WRAPPER_AccountList.AccountDetails recipientAccountData =  new WRAPPER_AccountList.AccountDetails();
        	recipientAccountData.currencyCodeAvailableBalance = payment.beneficiaryCurrency;
            Decimal sendAmount = null;
            Decimal receiveAmount = null;
            if (payment.operationAmount != null && payment.operationAmount.amount != null) {
                receiveAmount = payment.operationAmount.amount;
            } else if (payment.counterValueOperationAmount != null && payment.counterValueOperationAmount.amount != null){
                sendAmount = payment.counterValueOperationAmount.amount;
            }
            String callType = 'ONL';
            String requestType = 'T';

            if(feesBoolean == true && payment.fees != null){
                sendAmount =  Decimal.valueOf(payment.fees);
                receiveAmount = null;
                callType =  'ONI';
                requestType = 'I';
            }
            
            WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentId, 'b2b', requestType,  callType, accountData, 120000);
            Map<String, Object> output = exchangeRate.execute(sendAmount, receiveAmount, sourceAccountData.currencyCodeAvailableBalance, recipientAccountData.currencyCodeAvailableBalance, sourceAccountData.alias, sourceAccountData.aliasEntidad, sourceAccountData.codigoCorporate, sourceAccountData.country, sourceAccountData.codigoBic);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_Authorization.getExchangeRate: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
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
            System.debug('CNT_B2B_Authorization.removeSignature: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
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

    @AuraEnabled
    public static String getSessionId () {
      return UserInfo.getSessionId();
    }

    /*----------------------------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:   	Send notification
    History:
    <Date>          <Author>                <Description>
    06/10/2020      Antonio Duarte          Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void sendNotification (String paymentID, String clientReference, String paymentCreator) {
        try {
            // Get the user that will receive the notification
            User notificationReceiver = [
                SELECT Id, Name
                FROM User
                WHERE USER_TXT_GlobalId__c = :paymentCreator
                LIMIT 1
            ];
            if (notificationReceiver == null) {
                throw new CustomException();
            }
            // Set the title and body messages
            String title = System.label.Payments;
            String body = System.label.Notification_Body_Payment_Authorized.replace('[client_ref]', clientReference);
            // Get the redirection record
            String urlParams = 'c__paymentID='+paymentID;
            String pageName = 'landing-payment-details';
            Notification_Redirect__c nr = CustomNotifications_Handler.getRedirectRecord(urlParams, pageName);
            // Send the custom notification
            CustomNotifications_Handler.sendCustomNotification(title, body, nr.Id, new List<String>{notificationReceiver.Id});
        } catch (Exception e) {
            System.debug('Error sending the notification');
        }
    }
}