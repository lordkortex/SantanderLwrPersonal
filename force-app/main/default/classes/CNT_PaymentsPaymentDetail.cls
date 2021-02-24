/*----------------------------------------------------------------------------------
Author:         Bea Hill
Company:        Deloitte
Description:    CNT_PaymentsPaymentDetail controller
Test Class:     
History:
<Date>          <Author>            <Description>
19/06/2020      Bea Hill            Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_PaymentsPaymentDetail {

    @AuraEnabled
    public static String decryptData (String str) {
        return Global_Utilities.decryptData(str);
    }

    /*----------------------------------------------------------------------------------
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    Method to generate a new Payment id.
    History:
    <Date>          <Author>            <Description>
    31/08/2020      Adrian Munio        Initial version
    ----------------------------------------------------------------------------------*/
    public static Map<String, WRAPPER_AccountList.AccountDetails> mapPaymentAccounts (WRAPPER_PaymentDetail.OperationDetail payment) {
        return null;
    }

    /*----------------------------------------------------------------------------------
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    Method to generate a new Payment id.
    History:
    <Date>          <Author>            <Description>
    31/08/2020      Adrian Munio        Initial version
    27/10/2020      Bea Hill            WrapperUserData for userData
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue createPayment (WRAPPER_PaymentDetail.OperationDetail payment, /*WRAPPER_B2B_Data.UserData*/ WrapperUserData userData, WRAPPER_B2B_Data.AccountData accountData) {
        System.debug('CNT_PaymentsPaymentDetail.createPayment >>>>> START');
        Map<String, WRAPPER_AccountList.AccountDetails> mapAccounts = mapPaymentAccounts(payment);
        ReturnValue response = null;
        if (!mapAccounts.isEmpty()) {
            try {
                WS_CreatePaymentOperation paymentOperation = new WS_CreatePaymentOperation('B2B', userData, accountData);
                String paymentId = paymentOperation.execute(mapAccounts.get('sourceAccountData'), mapAccounts.get('recipientAccountData'));
                Map<String, Object> value = new Map<String, Object>();           
                value.put('paymentId', paymentId);
                response = new ReturnValue(true, value);
            } catch (Exception e) {
                response = new ReturnValue(false, null, e.getMessage());
            }
        } else {
            response = new ReturnValue(false, null, 'There aren\'t accounts related with this payment.');
        }
        System.debug('CNT_PaymentsPaymentDetail.createPayment >>>>> Response: ' + response);
        System.debug('CNT_PaymentsPaymentDetail.createPayment >>>>> END');
        return response;
    }

    /*----------------------------------------------------------------------------------
    Author:         Adrian Munio
    Company:        Deloitte
    Description:   	Release payment
    History:
    <Date>          <Author>            <Description>
    15/09/2020      Adrian Munio        Initial version
    ----------------------------------------------------------------------------------*/
    /*@AuraEnabled
    public static String sendToService(String paymentId, String status, String reason){    
        WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
        String output = wsObject.updateStatus(status, reason);
        return output;
    }*/
    @AuraEnabled
    public static ReturnValue sendToService (String paymentId, String status, String reason) {  
        ReturnValue response = null;
        try{
            
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
            String output = wsObject.updateStatus(status, reason);
            if(String.isNotBlank(output)){
                if(output == 'OK'){
                    response = new ReturnValue(true);
                }else{
                    response = new ReturnValue(false); 
                }
            }else{
                response = new ReturnValue(false); 
            }
            
        }catch (Exception e) {
            System.debug('CNT_PaymentsPaymentDetail.sendToService: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
    @AuraEnabled
    public static ReturnValue updatePaymentStatusReason (String paymentId, String status, String reason) {  
        ReturnValue response = null;
        try{
            
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
            String output = wsObject.updateStatus(status, reason);
            if(String.isNotBlank(output)){
                if(output == 'OK'){
                    response = new ReturnValue(true);
                }else{
                    response = new ReturnValue(false); 
                }
            }else{
                response = new ReturnValue(false); 
            }
            
        }catch (Exception e) {
            System.debug('CNT_PaymentsPaymentDetail.updatePaymentStatusReason: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*----------------------------------------------------------------------------------
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    Makes the callout to ancel a previously validated transaction, 
                    which removes it from transactional counters for accumulated limits
    History:
    <Date>          <Author>            <Description>
    16/09/2020      Adrian Munio        Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue reverseLimits (String operationId, String serviceId, WRAPPER_PaymentDetail.OperationDetail paymentData){
        ReturnValue response = CNT_B2B_REDOModal.reverseLimits(operationId, serviceId, paymentData);
        return response;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Gets the detail of a payment
    History:
    <Date>          <Author>                <Description>
    23/07/2020      Guillermo Giral         Initial version
    08/09/2020      Bea Hill                Call to shared controller CNT_PAYPaymentOptions
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getPaymentDetail (String paymentId) {
        ReturnValue response = CNT_PAY_PaymentOptions.getPaymentDetail(paymentId);
        return response;
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
    public static ReturnValue getExchangeRate (Boolean feesBoolean, String paymentId, WRAPPER_PaymentDetail.OperationDetail payment, WRAPPER_B2B_Data.AccountData accountData) {
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
            
            if (feesBoolean == true && payment.fees != null) {
                sendAmount =  Decimal.valueOf(payment.fees);
                receiveAmount = null;
                callType =  'ONI';
                requestType = 'I';
            }
            
            WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentId, 'b2b', requestType, callType, accountData, 120000);
            Map<String, Object> output = exchangeRate.execute(sendAmount, receiveAmount, sourceAccountData.currencyCodeAvailableBalance, recipientAccountData.currencyCodeAvailableBalance, sourceAccountData.alias, sourceAccountData.aliasEntidad, sourceAccountData.codigoCorporate,sourceAccountData.country, sourceAccountData.codigoBic);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_PaymentsPaymentDetail.getExchangeRate: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:   	Data encryption
    History:
    <Date>          <Author>                <Description>
    10/01/2020      Shahad Naji             Initial version
    23/06/2020      Bea Hill                Adapted from CNT_AccountBalance
    24/06/2020      Bea Hill                Adapted from CNT_PaymentsLandingTable
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String encryptData (String str) {
        return Global_Utilities.encryptData(str);
    }
    
    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:   	Get sign status
    History:
    <Date>          <Author>                <Description>
    30/07/2020      R. Cervino              Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static Map<String, String> getSignLevel (String paymentId) {
        return CNT_B2B_SignatureUtilities.getSignatoryStatus(paymentId);
    }

    /*----------------------------------------------------------------------------------
    Author:         Adrian Munio
    Company:        Deloitte
    Description:   	Release payment
    History:
    <Date>          <Author>                <Description>
    15/09/2020      Adrian Munio            Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String sendToService (String paymentId, String status, String tcurrency, Double amount) {
        WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
        String output = wsObject.execute(status, null, tcurrency, amount, null);
        return output;
    }

    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Gets the detail of a payment
    History:
    <Date>          <Author>                <Description>
    07/08/2020      R. Cervino              Initial version
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
    Description:   	validate Account
    History:
    <Date>          <Author>            <Description>
    12/08/2020      R. Cervino          Initial version
    01/11/2020      Candido             Refactor and add accountIdType to check
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue validateAccount (WRAPPER_PaymentDetail.OperationDetail payment, Decimal amount) {
        return ServiceValidateAccount.validateAccount(payment, amount);
    }
}