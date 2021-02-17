public with sharing class ControllerCustomerTransactionalLimits {
    
    public static final String PRODUCT_ID_001 = System.Label.CNF_payment_productId_001; //book_to_book
    public static final String PRODUCT_ID_002 = System.Label.CNF_payment_productId_002;//international_instant_payment
    
    public static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; //'MULTI_ONE_TRADE';
    public static final String NEXUS = System.Label.PAY_ServiceAPILine_002;//'NEXUS';
    public static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003;//'LOCAL_BANKING';
    
           
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
    @AuraEnabled
    public static ReturnValue reverseLimits (WRAPPER_PaymentDetail.OperationDetail paymentData){
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
      
        try {
            
            if(paymentData != null){
                String serviceAPILine = ServiceAPILine.getAPILine();                    
                if(String.isNotBlank(serviceAPILine) && String.isNotBlank(paymentData.productId)){
                    if((serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) || serviceAPILine.equalsIgnoreCase(NEXUS)) && paymentData.productId.equalsIgnoreCase(PRODUCT_ID_001)){
                        return new ReturnValue(true);                    
                    }else if(serviceAPILine.equalsIgnoreCase(LOCAL_BANKING) && paymentData.productId.equalsIgnoreCase(PRODUCT_ID_002)){

                    }else{
                        return new ReturnValue(true);                    
                    }
                }else{
                    throw new CustomException('ERROR: Invalid data');
                }
            }else{
                throw new CustomException('ERROR: Invalid data');
            }
            
            if(value != null){
                response = new ReturnValue(true, value);
            }else{
                response = new ReturnValue(false);
            }
            
        } catch (Exception e) {
            System.debug('ControllerCustomerTransactionalLimits.reverseLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
    @AuraEnabled
    public static ReturnValue reverseLimits (String productId, String serviceId, String paymentId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccount){
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        
        try {
            String serviceAPILine = ServiceAPILine.getAPILine();                    
            if(String.isNotBlank(serviceAPILine) && String.isNotBlank(productId)){
                if((serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) || serviceAPILine.equalsIgnoreCase(NEXUS)) && productId.equalsIgnoreCase(PRODUCT_ID_001)){
                    return new ReturnValue(true);                    
                }else if(serviceAPILine.equalsIgnoreCase(LOCAL_BANKING) && productId.equalsIgnoreCase(PRODUCT_ID_002)){
                    value = ServiceCustomerTransactionalLimits.transactionalLimitsReverse(productId, serviceId, paymentId, paymentData, sourceAccount);
                }else{
                    return new ReturnValue(true);                    
                }
            }
            
            if(value != null){
                response = new ReturnValue(true, value);
            }else{
               response = new ReturnValue(false); 
            }           
            
        } catch (Exception e) {
            System.debug('ControllerCustomerTransactionalLimits.reverseLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
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
    @AuraEnabled
    public static ReturnValue updateLimits (WRAPPER_PaymentDetail.OperationDetail paymentData){
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try{
      		String serviceAPILine = ServiceAPILine.getAPILine();
            List<String> updateLimitsProductIds = ControllerCustomerTransactionalLimits.getProductIds();
            
            if(paymentData != null){
                if(serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)){
                    if(String.isNotBlank(paymentData.productId)){
                        String productId = paymentData.productId;
                        if(updateLimitsProductIds != null && !updateLimitsProductIds.isEmpty()){
                            if(updateLimitsProductIds.contains(productId)){
                                response = ServiceCustomerTransactionalLimits.updateLimits(paymentData);
                            }else{
                                response = new ReturnValue(true);
                            }  
                        }else{
                            response = new ReturnValue(true); 
                        } 
                    }else{
                        throw new CustomException('ERROR: Invalid data');
                    }
                }else{
                    response = new ReturnValue(true);
                }             
            }else{
                throw new CustomException('ERROR: Invalid data');
            }       
        }catch (Exception e) {
            System.debug('ControllerCustomerTransactionalLimits.updateLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
    @AuraEnabled
    public static ReturnValue updateLimits(String productId, String operationId, String serviceId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData){
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        Decimal baseAmount = null;
        String baseCurrency = '';
        try{
            if(sourceAccountData != null && paymentData != null){
                if(String.isNotBlank(sourceAccountData.country) && String.isNotBlank(sourceAccountData.currencyCodeAvailableBalance)){
                    baseCurrency = Global_Utilities.getCountryCurrency(sourceAccountData.country);
                    if (sourceAccountData.currencyCodeAvailableBalance == baseCurrency || String.isBlank(baseCurrency)) {
                        baseCurrency = sourceAccountData.currencyCodeAvailableBalance;
                        baseAmount = paymentData.amountSend;
                    } else {
                        baseAmount = UtilitiesCurrency.convertCurrency(sourceAccountData.currencyCodeAvailableBalance, baseCurrency, paymentData.amountSend);
                    }                    
                }
            }else{
                return new ReturnValue(false);
            }
            String serviceAPILine = ServiceAPILine.getAPILine();
            if(productId.equalsIgnoreCase(PRODUCT_ID_001) && (serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) || serviceAPILine.equalsIgnoreCase(NEXUS))){
                throw new CustomException('ERROR: Invalid data');
            }else if(productId == PRODUCT_ID_002 && serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)){
                value = ServiceCustomerTransactionalLimits.callTransactionalLimitsUpdate(operationId, serviceId, paymentData, sourceAccountData, Double.valueOf(baseAmount),baseCurrency);  
            }
            
            if(value != null){
                response = new ReturnValue(true, value);
            }else{
                response = new ReturnValue(false);
            }
        }catch (Exception e) {
            System.debug('ControllerCustomerTransactionalLimits.updateLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits.
History
<Date>			<Author>		            <Description>
29/11/2020		Shahad Naji		            Initial version
----------------------------------------------------------------------------------*/   
    @AuraEnabled
    public static ReturnValue validateLimits (WRAPPER_PaymentDetail.OperationDetail paymentData){ 
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try{
            if(paymentData != null){
                if(String.isNotBlank(paymentData.productId)){
                    String serviceAPILine = ServiceAPILine.getAPILine();
                    if(paymentData.productId == PRODUCT_ID_001  && (serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) || serviceAPILine.equalsIgnoreCase(NEXUS))){ //b2b
                        value = ServiceCustomerTransactionalLimits.callTransactionalLimits (paymentData);
                    }else if(paymentData.productId == PRODUCT_ID_002 && serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)){//iip
                        value = ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(paymentData);
                    }

                    if(value != null){
                        response = new ReturnValue(true, value); 
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
            System.debug('ControllerCustomerTransactionalLimits.validateLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
    @AuraEnabled
    public static ReturnValue validateLimits (String productId, String serviceId, String paymentId, WrapperUserData userData, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData,  WRAPPER_AccountList.AccountDetails recipientAccountData){
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        Decimal baseAmount = null;
        String baseCurrency = '';
        try{
            
            if(sourceAccountData != null && paymentData != null){
                if(String.isNotBlank(sourceAccountData.country) && String.isNotBlank(sourceAccountData.currencyCodeAvailableBalance)){
                    baseCurrency = Global_Utilities.getCountryCurrency(sourceAccountData.country);
                    if (sourceAccountData.currencyCodeAvailableBalance == baseCurrency || String.isBlank(baseCurrency)) {
                        baseCurrency = sourceAccountData.currencyCodeAvailableBalance;
                        baseAmount = paymentData.amountSend;
                    } else {
                        baseAmount = UtilitiesCurrency.convertCurrency(sourceAccountData.currencyCodeAvailableBalance, baseCurrency, paymentData.amountSend);
                    }
                    
                }
            }else{
                return new ReturnValue(false);
            }
            String serviceAPILine = ServiceAPILine.getAPILine();
            if(String.isNotBlank(productId)){
                if(productId == PRODUCT_ID_001 && (serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) || serviceAPILine.equalsIgnoreCase(NEXUS))){
                    value = ServiceCustomerTransactionalLimits.callTransactionalLimits(paymentId, userData, paymentData,  sourceAccountData,   recipientAccountData, Double.valueOf(baseAmount), baseCurrency);
                }else if(productId == PRODUCT_ID_002 && serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)){
                    value = ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(paymentId, serviceId, paymentData, sourceAccountData, recipientAccountData, Double.valueOf(baseAmount), baseCurrency);
                }
                if(value != null){
                    response = new ReturnValue(true, value);
                }else{
                    response = new ReturnValue(false);   
                }
            }else{
                response = new ReturnValue(false);  
            } 
        }catch (Exception e) {
            System.debug('ControllerCustomerTransactionalLimits.validateLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
    
 
    


    
      /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Method to return the product ids of the payments which limits have to be updated and/or reverted.
History
<Date>			<Author>		            <Description>
27/11/2020		Shahad Naji		            Initial version
----------------------------------------------------------------------------------*/
    @TestVisible 
    private static List<String> getProductIds(){
        List<String> productIds =  new List<String>();
        productIds.add(System.Label.CNF_payment_productId_002);
        return productIds;
    }
    
   
    
   
    
}