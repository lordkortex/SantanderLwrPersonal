public with sharing class CNT_B2B_SelectAmount {

    @AuraEnabled
    public static ReturnValue getExchangeRate (String paymentId, String requestType, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_B2B_Data.AccountData accountData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentId, 'b2b', requestType, 'ONL', accountData);
            Map<String, Object> output = exchangeRate.execute(paymentData.amountSend, paymentData.amountReceive, sourceAccountData.currencyCodeAvailableBalance, recipientAccountData.currencyCodeAvailableBalance, sourceAccountData.alias, sourceAccountData.aliasEntidad, sourceAccountData.codigoCorporate, sourceAccountData.country, sourceAccountData.codigoBic);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.getExchangeRate: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue getLimits (String paymentId, String requestType, WRAPPER_B2B_Data.PaymentAmount paymentData, /*WRAPPER_B2B_Data.UserData*/WrapperUserData userData, WRAPPER_B2B_Data.AccountData accountData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
       //26/10/2020 - Shahad Naji - WrapperUserData 
        ReturnValue response = null;
        try {
            Decimal baseAmount = null;
            String baseCurrency = Global_Utilities.getCountryCurrency(sourceAccountData.country);
            if (sourceAccountData.currencyCodeAvailableBalance == baseCurrency || String.isBlank(baseCurrency)) {
                baseCurrency = sourceAccountData.currencyCodeAvailableBalance;
                baseAmount = paymentData.amountSend;
            } else {
               /* WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentId, 'b2b', requestType, 'ONL', accountData);
                Map<String, Object> output = exchangeRate.execute(paymentData.amountSend, null, sourceAccountData.currencyCodeAvailableBalance, baseCurrency, sourceAccountData.alias, sourceAccountData.aliasEntidad, sourceAccountData.codigoCorporate, sourceAccountData.country, sourceAccountData.codigoBic);
                baseAmount = (Decimal) output.get('convertedAmount');*/
                 baseAmount = UtilitiesCurrency.convertCurrency(sourceAccountData.currencyCodeAvailableBalance, baseCurrency, paymentData.amountSend);
            }
            WS_TransactionalLimits transactionalLimits = new WS_TransactionalLimits('b2b', paymentId, userData, accountData);
            Map<String, Object> output = transactionalLimits.execute(paymentData, sourceAccountData, recipientAccountData, baseAmount, baseCurrency);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.getLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue getTransferFees (String paymentId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_B2B_Data.AccountData accountData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
        ReturnValue response = null; 
        try {
            WS_TransferFees transferFees = new WS_TransferFees(paymentId, 'b2b', accountData);
            Map<String, Object> output = new Map<String,Object>();
            Map<String, Object> originalOutput = transferFees.execute(paymentData, sourceAccountData, recipientAccountData);
            System.debug('originalOutput: ' + originalOutput);
            System.debug('sourceAccountData: ' + sourceAccountData);
            Double originalTransactionFee = Double.valueOf(originalOutput.get('transactionFee'));
            String originalTransactionFeeCurrency = String.valueOf(originalOutput.get('transactionFeeCurrency'));
            output.put('originalTransactionFee', originalOutput.get('transactionFee'));
            output.put('originalTransactionFeeCurrency', originalOutput.get('transactionFeeCurrency'));
            output.put('transactionFeeServiceResponse', originalOutput.get('output'));
            String transactionFeeCurrencyString = String.valueOf(output.get('originalTransactionFeeCurrency'));
            System.debug('transactionFeeCurrencyString: ' + transactionFeeCurrencyString);
            System.debug('sourceAccountData.currencyCodeAvailableBalance: ' + sourceAccountData.currencyCodeAvailableBalance);
            if (!String.isBlank(transactionFeeCurrencyString) && !String.isBlank(sourceAccountData.currencyCodeAvailableBalance)) {
                if (transactionFeeCurrencyString != sourceAccountData.currencyCodeAvailableBalance) {
                   	System.debug('Need to convert fees: ' + transactionFeeCurrencyString + ' ' + sourceAccountData.currencyCodeAvailableBalance);
                    WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentId, 'b2b', 'I', 'ONI', accountData);
                    Map<String, Object> convertedOutput = exchangeRate.execute(originalTransactionFee, null, sourceAccountData.currencyCodeAvailableBalance, originalTransactionFeeCurrency, sourceAccountData.alias, sourceAccountData.aliasEntidad, sourceAccountData.codigoCorporate, sourceAccountData.country, sourceAccountData.codigoBic);
                    output.put('convertedTransactionFee', convertedOutput.get('convertedAmount'));
                    output.put('convertedTransactionFeeCurrency', sourceAccountData.currencyCodeAvailableBalance);
                    output.put('exchangeRateServiceResponse', convertedOutput.get('output'));
                } else {
                    System.debug('No need to convert fees, set to null.');
                    output.put('convertedTransactionFee', null);
                    output.put('convertedTransactionFeeCurrency', null);
                    output.put('exchangeRateServiceResponse', null);
                } 
            } else {
                String errorMessage = 'Either the exchanged currency or the original source currency does not have a value.';
                System.debug('CNT_B2B_SelectAmount.getTransferFees: ' + errorMessage);
                response = new ReturnValue(false, null, errorMessage);
            }
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.getTransferFees: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;      
    }

    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:    validate Account
    History:
    <Date>          <Author>            <Description>
    12/08/2020      R. Cervino          Initial version
    01/11/2020      Candido             Refactor and add accountIdType to check
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue accountValidation (WRAPPER_AccountList.AccountDetails sourceAccount, Decimal amount) {
        return ServiceValidateAccount.validateAccount(sourceAccount, null, amount);
    }

    /*-------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Makes the call to the operation tracking service update the
                    payment details in the SelectAmount step
    History:
    <Date>			<Author>		      <Description>
    28/07/2020		Guillermo Giral     Initial version for CNT_B2B_REDOModal
    07/08/2020      Bea Hill            Adapted for Step 4 of B2B process
    13/08/2020      Bea Hill            Adapted for Step 3 of B2B process
    09/11/2020      Bea Hill            Include userInputField 'source' or 'recipient' to identify whether the user has defined the amount in the source or recipient currency.   
    ------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue updateSelectAmount(String paymentId, WRAPPER_B2B_Data.AccountData accountData, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData) {
        String userInputField = null;
        WRAPPER_AccountList.AccountDetails recipientAccountData = null;
        return updateSelectAmount(paymentId, accountData, paymentData, sourceAccountData, recipientAccountData, userInputField);
    }

    @AuraEnabled
    public static ReturnValue updateSelectAmount(String paymentId, WRAPPER_B2B_Data.AccountData accountData, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, String userInputField) {
        ReturnValue response = null;
        try {
        	WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
            System.debug('paymentData: ' + paymentData);
            System.debug('sourceAccountData: ' + sourceAccountData);
        	String output = wsObject.updateAmountInformation(paymentData, sourceAccountData, recipientAccountData, userInputField);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAmount.updateSelectAmount: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}