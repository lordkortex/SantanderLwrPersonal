public with sharing class CNT_B2B_SelectAmount {

    @AuraEnabled
    public static ReturnValue updatePaymentInformation (String paymentId, String clientReference, String purpose, String description, String chargeBearer, String paymentMethod, String commercialCode, Double baseAmount, String baseCurrency,String productId,String serviceId) {
        ReturnValue response = null;
        try {
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
            wsObject.updateInformation(clientReference, purpose, description, chargeBearer, paymentMethod, commercialCode, null, baseAmount, baseCurrency,productId,serviceId);
            response = new ReturnValue(true);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.updatePaymentInformation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue showHideComponents(String productId, WRAPPER_AccountList.AccountDetails recipientAccountData){
        ReturnValue response = null;
        try {
            response = Controller_Payment_Stepfields.getStepFields(productId, recipientAccountData);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.showHideComponents: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
     /*
    Author:        	Miguel Angel
    Company:        Deloitte
    Description:   Function to determine the productId and serviceId of a payment
    History:
    <Date>          <Author>            <Description>
    19/02/2021      Miguel Angel        Initial version
    */
    @AuraEnabled
    public static ReturnValue getPaymentLine (WRAPPER_PAY_PaymentDraft paymentDraft, String transferType) {
        ReturnValue response = null;        
        try {
            response = ControllerPaymentLine.getPaymentLine (paymentDraft, transferType);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.getPaymentLine: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
   /* public static ReturnValue getStepFields(String productId, WRAPPER_AccountList.AccountDetails recipientAccountData){// cambiar a WRAPPER_PAY_PaymentDraft paymentDraft
        ReturnValue response = null;
        try{
            response = Controller_Payment_Step3fields.getStepFields(productId,recipientAccountData);
            
        }catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.getStepFields: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }*/
    
    
    /*
    Author:         Maria Inigo
    Company:        Deloitte
    Description:    Call to exchange rate
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Shahad Naji         Declared the userData as an WrapperUserData instead of WRAPPER_B2B_Data.UserData
    02/12/2020      Shahad Naji         Added productId parameter
    07/12/2020      Shahad Naji         Invokes a ControllerCustomerTransactionalLimits method or another according to serviceApiLine (Cash Nexus, Aquanima, or Local Bank) and  product id
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    /* @AuraEnabled
    public static ReturnValue getExchangeRate (WRAPPER_PAY_PaymentDraft paymentDraft, String requestType) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            Map<String, Object> output = new Map<String, Object>();
            WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentDraft.paymentId, 'b2b', requestType, 'ONL', null, 25000, 'Nominal_request');
            // Obtain the customerIds
            String sourceCustomerId = paymentDraft.sourceAccount.codigoCorporate;
            if (paymentDraft.sourceAccount.companyIdsList != null &&  String.isNotBlank(paymentDraft.sourceAccount.companyIdsList.get('LOCAL'))) {
                sourceCustomerId = paymentDraft.sourceAccount.companyIdsList.get('LOCAL');
            }
            String recipientCustomerId = paymentDraft.destinationAccount.codigoCorporate;
            if (paymentDraft.destinationAccount.companyIdsList != null &&  String.isNotBlank(paymentDraft.destinationAccount.companyIdsList.get('LOCAL'))) {
                recipientCustomerId = paymentDraft.destinationAccount.companyIdsList.get('LOCAL');
            }
            if (paymentDraft != null && paymentDraft.sourceAccount != null && paymentDraft.destinationAccount != null) {
                if (paymentDraft.fromOrigin) {
                    output = exchangeRate.execute(paymentDraft.amountSend, paymentDraft.amountReceive, paymentDraft.sourceAccount.currencyCodeAvailableBalance, paymentDraft.destinationAccount.currencyCodeAvailableBalance, paymentDraft.sourceAccount.alias, paymentDraft.sourceAccount.aliasEntidad,sourceCustomerId, paymentDraft.sourceAccount.country, paymentDraft.sourceAccount.codigoBic);
                } else {
                    output = exchangeRate.execute(paymentDraft.amountSend, paymentDraft.amountReceive, paymentDraft.destinationAccount.currencyCodeAvailableBalance, paymentDraft.sourceAccount.currencyCodeAvailableBalance, paymentDraft.destinationAccount.alias, paymentDraft.destinationAccount.aliasEntidad, recipientCustomerId, paymentDraft.destinationAccount.country, paymentDraft.destinationAccount.codigoBic);
                }
            } else if (paymentDraft.sourceAccount == null && paymentDraft.destinationAccount == null) {
                String errorMessage = 'Either the sourceAccountData or the recipientAccountData does not have a value.';
                System.debug('CNT_B2B_SelectAmount.getExchangeRateAccountsData: ' + errorMessage);
                response = new ReturnValue(false, null, errorMessage);
            }
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.getExchangeRate: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    } */

    // FLOWERPOWER_TOERASE
    // CPC_DEPRECATED
    @AuraEnabled
    public static ReturnValue getExchangeRate (String paymentId, String requestType, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_B2B_Data.AccountData accountData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData,  String userInputField) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            Map<String, Object> output = new Map<String, Object>();
            WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentId, 'b2b', requestType, 'ONL', accountData, 25000, 'Nominal_request');
            // Obtain the customerIds
            String sourceCustomerId = sourceAccountData.codigoCorporate;
            if (sourceAccountData.companyIdsList != null &&  String.isNotBlank(sourceAccountData.companyIdsList.get('LOCAL'))) {
                sourceCustomerId = sourceAccountData.companyIdsList.get('LOCAL');
            }
            String recipientCustomerId = recipientAccountData.codigoCorporate;
            if (recipientAccountData.companyIdsList != null &&  String.isNotBlank(recipientAccountData.companyIdsList.get('LOCAL'))) {
                recipientCustomerId = recipientAccountData.companyIdsList.get('LOCAL');
            }
            if (paymentData != null && sourceAccountData !=null && recipientAccountData != null) {
                if (paymentData.fromOrigin) {
                    output = exchangeRate.execute(paymentData.amountSend, paymentData.amountReceive, sourceAccountData.currencyCodeAvailableBalance, recipientAccountData.currencyCodeAvailableBalance, sourceAccountData.alias, sourceAccountData.aliasEntidad,sourceCustomerId, sourceAccountData.country, sourceAccountData.codigoBic);
                } else {
                    output = exchangeRate.execute(paymentData.amountSend, paymentData.amountReceive, recipientAccountData.currencyCodeAvailableBalance, sourceAccountData.currencyCodeAvailableBalance, recipientAccountData.alias, recipientAccountData.aliasEntidad, recipientCustomerId, recipientAccountData.country, recipientAccountData.codigoBic);
                }
                
              
                Decimal sourceAmount = null;
                Decimal destinationAmount = null;
                if (userInputField == 'source') {
                    sourceAmount = paymentData.amountSend;
                } else if (userInputField == 'recipient') {                    
                    destinationAmount = paymentData.amountReceive;
                }
                ReturnValue responseUpdatePayment = CNT_B2B_SelectAmount.updatePaymentAmountInformation(paymentId, (Decimal)output.get('convertedAmount'), userInputField, sourceAccountData.currencyCodeAvailableBalance, sourceAmount, recipientAccountData.currencyCodeAvailableBalance, destinationAmount);
                String ERROR_UPDATING_DATA = System.label.B2B_Error_Updating_Data;
                if (responseUpdatePayment == null || (responseUpdatePayment != null && responseUpdatePayment.success == false)) {
                    throw new CustomException(ERROR_UPDATING_DATA);
                }
                
            } else if (sourceAccountData == null && recipientAccountData == null) {
                String errorMessage = 'Either the sourceAccountData or the recipientAccountData does not have a value.';
                System.debug('CNT_B2B_SelectAmount.getExchangeRateAccountsData: ' + errorMessage);
                response = new ReturnValue(false, null, errorMessage);
            }
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.getExchangeRate: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         N/A
    Company:        Deloitte
    Description:    Method to calculate baseAmount (if it is necessary) and then validate transaction limits
                    *baseAmount is the amount of the payment and it has to be calculated
                    if the currency of the source account is not equal to the currency of the country which the source account belongs to
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Shahad Naji         Declared the userData as an WrapperUserData instead of WRAPPER_B2B_Data.UserData
    02/12/2020      Shahad Naji         Added productId parameter
    07/12/2020      Shahad Naji         Invokes a ControllerCustomerTransactionalLimits method or another according to serviceApiLine (Cash Nexus, Aquanima, or Local Bank) and  product id
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    @AuraEnabled
    public static ReturnValue getLimits (WrapperUserData userData, WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        try {
            response = ControllerCustomerTransactionalLimits.validateLimits(userData, paymentDraft);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.getLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    // FLOWERPOWER_TOERASE
    // CPC_DEPRECATED
    // @AuraEnabled
    // public static ReturnValue getLimits (String productId, String serviceId, String paymentId, WRAPPER_B2B_Data.PaymentAmount paymentData, WrapperUserData userData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
    //     ReturnValue response = null;
    //     try {
    //         response = ControllerCustomerTransactionalLimits.validateLimits(productId, serviceId, paymentId, userData, paymentData, sourceAccountData, recipientAccountData);
    //     } catch (Exception e) {
    //         System.debug('CNT_B2B_SelectAmount.getLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
    //         response = new ReturnValue(false, null, e.getMessage());
    //     }
    //     return response;
    // }

   
  
   /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Process current payment data by invoking TrasferFees API and save payment information by invoking Operation Traking API
    				TransferFees API: Retrieves special prices (in case there are) and standard prices
    				Operation Tracking API: Saves current payment information
    History:
    <Date>          <Author>                <Description>
    02/12/2020      Shahad Naji             Added productId parameter
    14/12/2020      Shahad Naji             Invokes a ControllerTransferFees method or another according to serviceApiLine (Cash Nexus, Aquanima, or Local Bank) and  product id  
    04/02/2021      Shahad Naji             Initial version of a processPaymentTransferFees function that replaces getTransferFees which was only invoke TrasferFees API 
*/
    //ToDo: 02/02/2021      Candido                 Refactor with WRAPPER_PAY_PaymentDraft
    // @AuraEnabled
    // public static ReturnValue processPaymentTransferFees(String paymentId, String productId, WRAPPER_B2B_Data.PaymentAmount paymentData,  WRAPPER_B2B_Data.AccountData accountData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData){
    //     ReturnValue response = null;
    //     Map<String, Object> output = new Map<String, Object>();
    //     ReturnValue responseTransferFees = null;
    //     ReturnValue responseUpdatePayment = null;
    //     WRAPPER_B2B_Data.PaymentAmount paymentDataAux = new WRAPPER_B2B_Data.PaymentAmount();
    //     try {
    //         paymentDataAux = paymentData;
    //         String ERROR_PROBLEM_LOADING = System.Label.B2B_Error_Problem_Loading;
    //         String ERROR_CONTINUE_BUTTON = System.Label.B2B_Error_Continue_Button;
    //         String ERROR_UPDATING_DATA = System.label.B2B_Error_Updating_Data;
    //         responseTransferFees = ControllerTransferFees.transferFeesExecute(paymentId, productId, paymentData, accountData, sourceAccountData, recipientAccountData);
    //         if (responseTransferFees == null || (responseTransferFees != null && responseTransferFees.success == false)) {
    //        		throw new CustomException(ERROR_CONTINUE_BUTTON);
    //         }
    //         if (responseTransferFees.value != null) {
    //             Map<String, Object> transferFeesValue = responseTransferFees.value;
    //             paymentDataAux.transactionFee = (Decimal) transferFeesValue.get('originalTransactionFee');                        
    //             paymentDataAux.transactionFeeCurrency = (String)transferFeesValue.get('originalTransactionFeeCurrency');
    //             paymentDataAux.transactionFeeServiceResponse = new WS_TransferFees.OUTPUT();
    //             paymentDataAux.transactionFeeServiceResponse = (WS_TransferFees.OUTPUT)transferFeesValue.get('transactionFeeServiceResponse') != null ? (WS_TransferFees.OUTPUT)transferFeesValue.get('transactionFeeServiceResponse') : null;
    //             paymentDataAux.convertedTransactionFee = (Decimal)transferFeesValue.get('convertedTransactionFee'); 
    //             paymentDataAux.convertedTransactionFeeCurrency = (String)transferFeesValue.get('convertedTransactionFeeCurrency');
    //             paymentDataAux.convertedTransactionFeeServiceResponse = new WS_ExchangeRate.OUTPUT();
    //             paymentDataAux.convertedTransactionFeeServiceResponse = (WS_ExchangeRate.OUTPUT)transferFeesValue.get('exchangeRateServiceResponse');
    //         }
    //         responseUpdatePayment = CNT_B2B_SelectAmount.updatePaymentFeesInformation(paymentId, paymentDataAux.transactionFeeServiceResponse, paymentDataAux.transactionFee, paymentDataAux.transactionFeeCurrency);
    //         if (responseUpdatePayment == null || (responseUpdatePayment != null && responseUpdatePayment.success == false)) {
    //        		throw new CustomException(ERROR_UPDATING_DATA);
    //         }
    //         output.put('output', paymentDataAux);
    //         response =  new ReturnValue(true, output); 
    //     } catch (Exception e) {
    //         System.debug('CNT_B2B_SelectAmount.processPaymentTransferFees: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
    //         response = new ReturnValue(false, null, e.getMessage());
    //     }
    //     return response;
    // }
    @AuraEnabled
    public static ReturnValue processPaymentTransferFees (WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        Map<String, Object> output = new Map<String, Object>();
        ReturnValue responseTransferFees = null;
        ReturnValue responseUpdatePayment = null;
        WRAPPER_B2B_Data.PaymentAmount paymentDataAux = new WRAPPER_B2B_Data.PaymentAmount();
        try {
            String ERROR_PROBLEM_LOADING = System.Label.B2B_Error_Problem_Loading;
            String ERROR_CONTINUE_BUTTON = System.Label.B2B_Error_Continue_Button;
            String ERROR_UPDATING_DATA = System.Label.B2B_Error_Updating_Data;
            responseTransferFees = ControllerTransferFees.transferFeesExecute(paymentDraft);
            if (responseTransferFees == null || (responseTransferFees != null && responseTransferFees.success == false)) {
                throw new CustomException(ERROR_CONTINUE_BUTTON);
            }
            if (responseTransferFees.value != null) {
                Map<String, Object> transferFeesValue = responseTransferFees.value;
                paymentDraft.transactionFee = (Decimal) transferFeesValue.get('originalTransactionFee');
                paymentDraft.transactionFeeCurrency = (String) transferFeesValue.get('originalTransactionFeeCurrency');
                paymentDraft.transactionFeeServiceResponse = new WS_TransferFees.OUTPUT();
                paymentDraft.transactionFeeServiceResponse = (WS_TransferFees.OUTPUT)transferFeesValue.get('transactionFeeServiceResponse') != null ? (WS_TransferFees.OUTPUT)transferFeesValue.get('transactionFeeServiceResponse') : null;
                paymentDraft.convertedTransactionFee = (Decimal) transferFeesValue.get('convertedTransactionFee');
                paymentDraft.convertedTransactionFeeCurrency = (String) transferFeesValue.get('convertedTransactionFeeCurrency');
                paymentDraft.convertedTransactionFeeServiceResponse = new WS_ExchangeRate.OUTPUT();
                paymentDraft.convertedTransactionFeeServiceResponse = (WS_ExchangeRate.OUTPUT) transferFeesValue.get('exchangeRateServiceResponse');
            }
            responseUpdatePayment = CNT_B2B_SelectAmount.updatePaymentFeesInformation(paymentDraft.paymentId, paymentDraft.transactionFeeServiceResponse, paymentDraft.transactionFee, paymentDraft.transactionFeeCurrency);
            if (responseUpdatePayment == null || (responseUpdatePayment != null && responseUpdatePayment.success == false)) {
                throw new CustomException(ERROR_UPDATING_DATA);
            }
            output.put('output', paymentDraft);
            response =  new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.processPaymentTransferFees: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
      /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes the call to the operation tracking service update the payment details in the SelectAmount step after invoking TransferFees API
    History:
    <Date>          <Author>                <Description>
    28/07/2020      Guillermo Giral         Initial version for CNT_B2B_REDOModal
    07/08/2020      Bea Hill                Adapted for Step 4 of B2B process
    13/08/2020      Bea Hill                Adapted for Step 3 of B2B process
    09/11/2020      Bea Hill                Include userInputField 'source' or 'recipient' to identify whether the user has defined the amount in the source or recipient currency
    04/02/2021		Shahad Naji				Initial version of updatePaymentFeesInformation which replaces updateSelectAmount (deleted function) 
    */
    //ToDo: 02/02/2021      Candido                 Refactor with WRAPPER_PAY_PaymentDraft
    @TestVisible
    private static ReturnValue updatePaymentFeesInformation(String paymentId, WS_TransferFees.OUTPUT transactionFeeServiceResponse, Decimal transactionFee, String transactionFeeCurrency){
        ReturnValue response = null;
        try{
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
            String output = wsObject.updateFeesInformation (transactionFeeServiceResponse, transactionFee, transactionFeeCurrency);
            if(String.isNotBlank(output)){
                if(output.equalsignorecase('ok')){
                    response = new ReturnValue(true, output);
                }else{
                    response = new ReturnValue(false); 
                }
            }else{
                response = new ReturnValue(false); 
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.updatePaymentFeesInformation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
      /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes the call to the operation tracking service update the payment details in the SelectAmount step after invoking Exchange RateAPI
    History:
    <Date>          <Author>                <Description>
    28/07/2020      Guillermo Giral         Initial version for CNT_B2B_REDOModal
    07/08/2020      Bea Hill                Adapted for Step 4 of B2B process
    13/08/2020      Bea Hill                Adapted for Step 3 of B2B process
    09/11/2020      Bea Hill                Include userInputField 'source' or 'recipient' to identify whether the user has defined the amount in the source or recipient currency
    04/02/2021		Shahad Naji				Initial version of updatePaymentFeesInformation which replaces updateSelectAmount (deleted function) 
    */
    //ToDo: 02/02/2021      Candido                 Refactor with WRAPPER_PAY_PaymentDraft
    @TestVisible
    private static ReturnValue updatePaymentAmountInformation(String paymentId, Decimal convertedAmount, String originAmount, String sourceCurrency, Decimal sourceAmount, String destinationCurrency, Decimal destinationAmount){
        ReturnValue response = null;
        try{
           WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
            String output = wsObject.updateAmountInformation (originAmount, convertedAmount,  sourceCurrency,  sourceAmount,  destinationCurrency,  destinationAmount);
            if(String.isNotBlank(output)){
                if(output.equalsignorecase('ok')){
                    response = new ReturnValue(true, output);
                }else{
                    response = new ReturnValue(false); 
                }
            }else{
                response = new ReturnValue(false); 
            } 
        }catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.updatePaymentAmountInformation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
   

 


}