/*
Author:         Shahad Naji
Company:        Deloitte
Description:    Retrieves special prices (in case there are) and standard prices. Local entity is responsible of applying the fixing when the payment currency is different to the base currency.
History:
<Date>          <Author>            <Description>
30/11/2020      Shahad Naji         Initial version
01/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
*/
public class ControllerTransferFees {

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Retrieves special prices (in case there are) and standard prices. Local entity is responsible of applying the fixing when the payment currency is different to the base currency.
    History:
    <Date>          <Author>            <Description>
    30/11/2020      Shahad Naji         Initial version
    01/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    public static ReturnValue transferFeesExecute (WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue returnValue = null;
        Map<String, Object> originalOutput = new Map<String, Object>();
        Map<String, Object> output = new Map<String, Object>();
        try {
            originalOutput = ServiceTransferFees.transferFeesExecute(paymentDraft);
            if (originalOutput != null) {
                Double originalTransactionFee = Double.valueOf(originalOutput.get('transactionFee'));
                String originalTransactionFeeCurrency = String.valueOf(originalOutput.get('transactionFeeCurrency'));
                output.put('originalTransactionFee', originalOutput.get('transactionFee'));
                output.put('originalTransactionFeeCurrency', originalOutput.get('transactionFeeCurrency'));
                output.put('transactionFeeServiceResponse', originalOutput.get('output'));
                String transactionFeeCurrencyString = String.valueOf(output.get('originalTransactionFeeCurrency'));
                if (String.isNotBlank(transactionFeeCurrencyString) && String.isNotBlank(paymentDraft.sourceAccount.currencyCodeAvailableBalance)) {
                    if (transactionFeeCurrencyString != paymentDraft.sourceAccount.currencyCodeAvailableBalance  && originalTransactionFee != 0) {
                        String sourceCustomerId = paymentDraft.sourceAccount.codigoCorporate;
                        if (paymentDraft.sourceAccount.companyIdsList != null &&  String.isNotBlank(paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier))) {
                            sourceCustomerId = paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier);
                        }
                        WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentDraft.paymentId, 'b2b', 'I', 'ONI', null, 25000, 'Fee_request');
                        Map<String, Object> convertedOutput = exchangeRate.execute(originalTransactionFee, null, paymentDraft.sourceAccount.currencyCodeAvailableBalance, originalTransactionFeeCurrency, paymentDraft.sourceAccount.alias, paymentDraft.sourceAccount.aliasEntidad, sourceCustomerId, paymentDraft.sourceAccount.country, paymentDraft.sourceAccount.codigoBic);
                        output.put('convertedTransactionFee', convertedOutput.get('convertedAmount'));
                        output.put('convertedTransactionFeeCurrency', paymentDraft.sourceAccount.currencyCodeAvailableBalance);
                        output.put('exchangeRateServiceResponse', convertedOutput.get('output'));
                    } else {
                        output.put('convertedTransactionFee', null);
                        output.put('convertedTransactionFeeCurrency', null);
                        output.put('exchangeRateServiceResponse', null);
                    }
                } else {
                    returnValue = new ReturnValue(false, null, 'Either the exchanged currency or the original source currency does not have a value.');
                    return returnValue;
                }
            } else {
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