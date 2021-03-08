public class ControllerTransferFees {
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Retrieves special prices (in case there are) and standard prices. Local entity is responsible of applying the fixing when the payment currency is different to the base currency.
History
<Date>          <Author>            <Description>
30/11/2020      Shahad Naji          Initial version    
----------------------------------------------------------------------------------*/    
    public static ReturnValue transferFeesExecute(String paymentId, String productId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_B2B_Data.AccountData accountData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData){
        ReturnValue returnValue = null; 
        Map<String, Object> originalOutput = new Map<String, Object>();
        Map<String, Object> output = new Map<String, Object>();
        try {
            originalOutput = ServiceTransferFees.transferFeesExecute(paymentId, productId, paymentData, sourceAccountData, recipientAccountData);
            if(originalOutput != null){
                Double originalTransactionFee = Double.valueOf(originalOutput.get('transactionFee'));
                String originalTransactionFeeCurrency = String.valueOf(originalOutput.get('transactionFeeCurrency'));                
                output.put('originalTransactionFee', originalOutput.get('transactionFee'));                
                output.put('originalTransactionFeeCurrency', originalOutput.get('transactionFeeCurrency'));                
                output.put('transactionFeeServiceResponse', originalOutput.get('output'));                
                String transactionFeeCurrencyString = String.valueOf(output.get('originalTransactionFeeCurrency'));        
                if (String.isNotBlank(transactionFeeCurrencyString) && String.isNotBlank(sourceAccountData.currencyCodeAvailableBalance)) {
                    if (transactionFeeCurrencyString != sourceAccountData.currencyCodeAvailableBalance) {
                        
                        //Obtain the customerIds
                        String sourceCustomerId = sourceAccountData.codigoCorporate;
                        if(sourceAccountData.companyIdsList != null &&  String.isNotBlank(sourceAccountData.companyIdsList.get('LOCAL'))){
                            sourceCustomerId = sourceAccountData.companyIdsList.get('LOCAL');
                        }
                        
                        WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentId, 'b2b', 'I', 'ONI', accountData, 25000, 'Fee_request');
                        Map<String, Object> convertedOutput = exchangeRate.execute(originalTransactionFee, null, sourceAccountData.currencyCodeAvailableBalance, originalTransactionFeeCurrency, sourceAccountData.alias, sourceAccountData.aliasEntidad, sourceCustomerId, sourceAccountData.country, sourceAccountData.codigoBic);
                        output.put('convertedTransactionFee', convertedOutput.get('convertedAmount'));
                        output.put('convertedTransactionFeeCurrency', sourceAccountData.currencyCodeAvailableBalance);
                        output.put('exchangeRateServiceResponse', convertedOutput.get('output'));
                    } else {
                        output.put('convertedTransactionFee', null);
                        output.put('convertedTransactionFeeCurrency', null);
                        output.put('exchangeRateServiceResponse', null);
                    } 
                } else {
                    String errorMessage = 'Either the exchanged currency or the original source currency does not have a value.';
                    System.debug('ControllerTransferFees.getTransferFees: ' + errorMessage);
                    returnValue = new ReturnValue(false, null, errorMessage);
                   return returnValue; 
                }
            }else{
                returnValue = new ReturnValue(false);
                return returnValue; 
            }
            returnValue = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('ControllerTransferFees.transferFeesExecute: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            returnValue = null;
        } 
        return returnValue;  
    }
    
}