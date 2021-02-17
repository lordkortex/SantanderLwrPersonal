global with sharing class ServiceCustomerTransactionalLimits {
    
    global static final String PRODUCT_ID_001 = 'book_to_book';
    global static final String PRODUCT_ID_002 = 'international_transfer';

 
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Makes a call to an external WS to cancel a previously validated transaction, 
				which removes it from transactional counters for accumulated limits
History
<Date>			<Author>		            <Description>
16/09/2020		Shahad Naji		            Initial version
19/01/2021		Shahad Naji					Creates another reverseLimits to be called when it is required by the action of a payment process 
----------------------------------------------------------------------------------*/
    
    global static Map<String, Object> transactionalLimitsReverse (WRAPPER_PaymentDetail.OperationDetail paymentData){        
        Map<String, Object> value = new Map<String, Object>();
        try {         
            WS_TransactionalLimitsReverse transactionalLimitsReverse = new WS_TransactionalLimitsReverse();
            WS_TransactionalLimitsReverse.OUTPUT output = transactionalLimitsReverse.execute(paymentData);
            if(output != null){
                value = getTransactionalLimitsReverse(output);              
            }else{
                return null;
            }  
        } catch (Exception e) {
            System.debug('ServiceCustomerTransactionalLimits.transactionalLimitsReverse: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
           return value;
        }
        return value;
    }
    
    global static Map<String, Object> transactionalLimitsReverse (String productId, String serviceId, String paymentId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccount){        
        Map<String, Object> value = new Map<String, Object>();
        try {         
            WS_TransactionalLimitsReverse transactionalLimitsReverse = new WS_TransactionalLimitsReverse();
            String transactionDate = String.valueOf(Date.today());
            WS_TransactionalLimitsReverse.TransactionContract transactionContract = null;
            WS_TransactionalLimitsReverse.TransactionAmount transactionAmount = null;
            WS_TransactionalLimitsReverse.TransactionAmount transactionAmountBaseCurrency = null;
            if(sourceAccount != null){
                if(String.isNotBlank(sourceAccount.idType) && String.isNotBlank(sourceAccount.displayNumber)){
                    transactionContract = new WS_TransactionalLimitsReverse.TransactionContract(sourceAccount.idType, sourceAccount.displayNumber);
                }else{
                    return null;
                }
            }else{
                return null; 
            }
            if(paymentData != null){
                if(paymentData.amountSend != null && String.isNotBlank(sourceAccount.currencyCodeAvailableBalance)){
                    transactionAmount = new WS_TransactionalLimitsReverse.TransactionAmount(String.valueOf(paymentData.amountSend), sourceAccount.currencyCodeAvailableBalance);
                }else{
                    return null;
                }
                if(paymentData.baseAmount != null && String.isNotBlank(paymentData.baseCurrency)){
                    transactionAmountBaseCurrency = new WS_TransactionalLimitsReverse.TransactionAmount(String.valueOf(paymentData.baseAmount), paymentData.baseCurrency);
                }else{
                    return null;
                }
            }else{
                return null;
            }
            WS_TransactionalLimitsReverse.OUTPUT output = transactionalLimitsReverse.execute(paymentId, serviceId, transactionDate, transactionContract, transactionAmount,transactionAmountBaseCurrency, null, null,null);
            value = getTransactionalLimitsReverse(output);
            if(output != null){
                value = getTransactionalLimitsReverse(output);               
            }else{
                return null;
            }            
        } catch (Exception e) {
            System.debug('ServiceCustomerTransactionalLimits.transactionalLimitsReverse: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return null;
        }
        return value;
    }


    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits and,
				if the transaction is validated successfully, updates the accumulated limit.
History
<Date>			<Author>		            <Description>
29/11/2020		Shahad Naji		            Initial version
----------------------------------------------------------------------------------*/
    
    global static ReturnValue updateLimits (WRAPPER_PaymentDetail.OperationDetail paymentData){
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try{
            WS_TransactionalLimitsUpdate transactionalLimitsUpdate = new WS_TransactionalLimitsUpdate();
            WS_TransactionalLimitsUpdate.OUTPUT output = transactionalLimitsUpdate.execute(paymentData);
            System.debug('bh_debug updateLimits OUTPUT: '+ output);
            if(output != null){
                if(output.limitsResponseUpdate != null){
                    if(output.limitsResponseUpdate.limitsResult == 'ok'){
                        response = new ReturnValue(true);  
                    }else{
                        response = new ReturnValue(false);  
                    }                    
                }else{
                    response = new ReturnValue(false);  
                }                
            }else{
                response = new ReturnValue(false); 
            }
        }catch (Exception e) {
            System.debug('ServiceCustomerTransactionalLimits.updateLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    global static Map<String, Object> callTransactionalLimitsUpdate(String operationId, String serviceId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData, Double baseAmount, String baseCurrency){
        Map<String, Object> value = new Map<String, Object>();
        try{
            WS_TransactionalLimitsUpdate transactionalLimits = new WS_TransactionalLimitsUpdate();
          	WS_TransactionalLimitsUpdate.OUTPUT output = transactionalLimits.execute(operationId, serviceId, paymentData, sourceAccountData, baseAmount, baseCurrency);
            System.debug('bh_debug callTransactionalLimitsUpdate OUTPUT: '+ output);
            value = ServiceCustomerTransactionalLimits.getTransactionalLimitsUpdateOutput(output);
        }catch (Exception e) {
            System.debug('ServiceCustomerTransactionalLimits.callTransactionalLimitsUpdate: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            value = null;
        }
        return value;
    }

    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits.
History
<Date>			<Author>		            <Description>
29/11/2020		Shahad Naji		            Initial version
----------------------------------------------------------------------------------*/     
    global static Map<String, Object> callTransactionalLimits (String paymentId, WrapperUserData userData, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData,  WRAPPER_AccountList.AccountDetails recipientAccountData, Double baseAmount, String baseCurrency){
        Map<String, Object> value = new Map<String, Object>();
        try{           
          WS_TransactionalLimits transactionalLimits = new WS_TransactionalLimits('b2b', paymentId, userData, null); 
          value = transactionalLimits.execute(paymentData, sourceAccountData, recipientAccountData, baseAmount, baseCurrency);            
        }catch (Exception e) {
            System.debug('ServiceCustomerTransactionalLimits.callTransactionalLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            value = null;
        }
        return value;
    }
    
    global static Map<String, Object> callTransactionalLimits (WRAPPER_PaymentDetail.OperationDetail paymentData){
        Map<String, Object> value = new Map<String, Object>();
        try{
            //TBD
            System.debug('INFO: Currenly this function is not required');
        }catch (Exception e) {
            System.debug('ServiceCustomerTransactionalLimits.callTransactionalLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            value = null;
        }
        return value;
    }
    
    global static Map<String, Object> callTransactionalLimitsValidation (String paymentId, String serviceId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData,  WRAPPER_AccountList.AccountDetails recipientAccountData, Double baseAmount, String baseCurrency){
        Map<String, Object> value = new Map<String, Object>();
        try{
            WS_TransactionalLimitsValidation transactionalLimits = new WS_TransactionalLimitsValidation();
            WS_TransactionalLimitsValidation.OUTPUT output = transactionalLimits.execute(paymentId, serviceId, paymentData, sourceAccountData, recipientAccountData, baseAmount, baseCurrency);
            if(output != null){
                value = ServiceCustomerTransactionalLimits.getTransactionalLimitsValidationOutput(output);
            }else{
                value = null;
            }
        }catch (Exception e) {
            System.debug('ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            value = null;
        }
        return value;
    }
    global static Map<String, Object> callTransactionalLimitsValidation (WRAPPER_PaymentDetail.OperationDetail paymentData){
        Map<String, Object> value = new Map<String, Object>();
        try{
            WS_TransactionalLimitsValidation transactionalLimits = new WS_TransactionalLimitsValidation();
            WS_TransactionalLimitsValidation.OUTPUT output = transactionalLimits.execute(paymentData);
            if(output != null){
                value = ServiceCustomerTransactionalLimits.getTransactionalLimitsValidationOutput(output);
            }else{
                value = null;
            }
        }catch (Exception e) {
            System.debug('ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            value = null;
        }
        return value;
    }
    
    
    @TestVisible  
    private static Map<String, Object> getTransactionalLimitsValidationOutput (WS_TransactionalLimitsValidation.OUTPUT output) {
        Map<String, Object> result = new Map<String, Object>();        
        String limitsResult = '';
        String errorMessage = '';        
        if (output != null) {
            if(output.limitsResponse != null){
                if(String.isNotBlank(output.limitsResponse.limitsResult)){
                    if(output.limitsResponse.limitsResult == 'ok'){
                        limitsResult = output.limitsResponse.limitsResult ;
                        errorMessage = null;
                    }else{
                        limitsResult = output.limitsResponse.limitsResult ;
                        errorMessage = output.limitsResponse.codeLimitsResult;
                    }
                } 
            }            
        }        
        result.put('limitsResult', limitsResult);
        result.put('errorMessage', errorMessage);
        result.put('output', output);        
        return result;
    }
    
    @TestVisible  
    private static Map<String, Object> getTransactionalLimitsUpdateOutput (WS_TransactionalLimitsUpdate.OUTPUT output) {
        Map<String, Object> result = new Map<String, Object>();
        String limitsResult = '';
        String errorMessage = '';
        System.debug('BH_debug: ' + output);
        if (output != null) {
            if(output.limitsResponseUpdate != null){
                if(String.isNotBlank(output.limitsResponseUpdate.limitsResult)){
                    if(output.limitsResponseUpdate.limitsResult == 'ok'){
                        limitsResult = output.limitsResponseUpdate.limitsResult ;
                        errorMessage = null;
                    }else{
                        limitsResult = output.limitsResponseUpdate.limitsResult ;
                        errorMessage = output.limitsResponseUpdate.codeLimitsResult;
                    }
                } 
            }            
        }
        result.put('limitsResult', limitsResult);
        result.put('errorMessage', errorMessage);
        result.put('output', output);
        return result;
    }
    
    @TestVisible  
    private static Map<String, Object> getTransactionalLimitsReverse (WS_TransactionalLimitsReverse.OUTPUT output) {
        Map<String, Object> result = new Map<String, Object>();
        String limitsResult = '';
        String errorMessage = '';
        if (output != null) {
            if(output.limitsResult != null){
                if(output.limitsResult.endsWithIgnoreCase('ok')){
                    limitsResult = output.limitsResult;
                    errorMessage = null;
                }else{
                    limitsResult = output.limitsResult;
                    errorMessage = output.codeLimitsResult;
                }
            }            
        }
        result.put('limitsResult', limitsResult);
        result.put('errorMessage', errorMessage);
        result.put('output', output);
        return result;
    }
}