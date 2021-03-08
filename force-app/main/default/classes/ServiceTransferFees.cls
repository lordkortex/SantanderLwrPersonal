global with sharing class ServiceTransferFees {
    
    public static final String PRODUCT_ID_001 = System.Label.CNF_payment_productId_001; //book_to_book
    public static final String PRODUCT_ID_002 = System.Label.CNF_payment_productId_002;//international_instant_payment
    
    global static final String API_CONFIGURATION_001 = 'WS_TransferFees';
    global static final String API_CONFIGURATION_002 = 'WS_PaymentsSpecialPrices';
    
    
    global static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; //'MULTI_ONE_TRADE';
    global static final String NEXUS = System.Label.PAY_ServiceAPILine_002;//'NEXUS';
    global static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003;//'LOCAL_BANKING';
    
        /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Retrieves special prices (in case there are) and standard prices. Local entity is responsible of applying the fixing when the payment currency is different to the base currency.
    History
    <Date>          <Author>            <Description>
    30/11/2020      Shahad Naji          Initial version    
    ----------------------------------------------------------------------------------*/
    global static Map<String, Object> transferFeesExecute(String paymentId, String productId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData){
        Map<String, Object> response =  new Map<String, Object>();
        try{
            String paymentId_aux = String.isNotBlank(paymentId) ? paymentId : '';
            String sourceId = '';
            String sourceCodigoCorporate = '';
            String recipientCodigoCorporate = '';
            String sourceCodigoBic = '';
            String recipientCodigoBic = '';            
            String sourceBranch = '';
            String sourceCountry = '';
            String recipientCountry = '';
            String recipientCurrency = '';
            String amountReceive = '';
            String apiConfiguration = '';
            Map<String, String> queryParameters = new Map<String, String>();
            if(sourceAccountData != null){
                sourceId = String.isNotBlank(sourceAccountData.displayNumber) ? sourceAccountData.displayNumber : '';
                
                sourceCodigoCorporate = sourceAccountData.codigoCorporate;
                if(sourceAccountData.companyIdsList != null &&  String.isNotBlank(sourceAccountData.companyIdsList.get('LOCAL'))){
                    sourceCodigoCorporate = sourceAccountData.companyIdsList.get('LOCAL');
                }
                        
                sourceCodigoBic = String.isNotBlank(sourceAccountData.codigoBic) ? sourceAccountData.codigoBic : '';
                sourceBranch = String.isNotBlank(sourceAccountData.branch) ? sourceAccountData.branch : '';
                sourceCountry = String.isNotBlank(sourceAccountData.country) ? sourceAccountData.country : '';        
                
            }
            if(recipientAccountData != null){
                recipientCurrency = String.isNotBlank(recipientAccountData.currencyCodeAvailableBalance) ? recipientAccountData.currencyCodeAvailableBalance.trim() : '';
                recipientCountry = String.isNotBlank(recipientAccountData.country) ? recipientAccountData.country : '';
                recipientCodigoBic = String.isNotBlank(recipientAccountData.codigoBic) ? recipientAccountData.codigoBic : '';
                recipientCodigoCorporate = String.isNotBlank(recipientAccountData.codigoCorporate) ? recipientAccountData.codigoCorporate : '';
                if(recipientAccountData.companyIdsList != null &&  String.isNotBlank(recipientAccountData.companyIdsList.get('LOCAL'))){
                    recipientCodigoCorporate = recipientAccountData.companyIdsList.get('LOCAL');
                }
            }
            
            if(paymentData != null){
                //If the currency of the source account and the currency of receipt account is the same, amountReceive must be equal to amountSend
                amountReceive = paymentData.amountReceive != null ? String.valueOf(paymentData.amountReceive) : String.valueOf(paymentData.amountSend);
            }else{
                amountReceive = null;
            }
            if(String.isNotBlank(productId)){
                String serviceAPILine = ServiceAPILine.getAPILine();
                if(productId == PRODUCT_ID_001 && (serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) || serviceAPILine.equalsIgnoreCase(NEXUS))){         
                    apiConfiguration = API_CONFIGURATION_001;
                    queryParameters = ServiceTransferFees.setBookToBookParameters(paymentId_aux, sourceId, sourceCodigoCorporate, recipientCodigoCorporate, sourceCodigoBic, recipientCodigoBic, sourceBranch, recipientCurrency, amountReceive, sourceCountry, recipientCountry);
                }else if(productId == PRODUCT_ID_002 && serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)){
                    apiConfiguration = API_CONFIGURATION_002;
                    queryParameters = ServiceTransferFees.setInternationalInstantPaymentParameters(paymentId_aux, sourceId, sourceCodigoCorporate, recipientCodigoCorporate, sourceCodigoBic, recipientCodigoBic, sourceBranch, recipientCurrency, amountReceive, sourceCountry, recipientCountry);  
                }
            }            
            WS_TransferFees transferFees = new WS_TransferFees(apiConfiguration);
            response = transferFees.execute(queryParameters);
          
        } catch (Exception e) {
            System.debug('ServiceTransferFees.transferFeesExecute: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = null;
        } 
        return response;
    }
                 /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Retrieves the query parameters to make a call to WS_TransferFees (/prices/)
    History
    <Date>          <Author>            <Description>
    30/11/2020      Shahad Naji          Initial version    
    ----------------------------------------------------------------------------------*/
    global static Map<String, String> setBookToBookParameters(String paymentId, String sourceId, String sourceCodigoCorporate, String recipientCodigoCorporate, String sourceCodigoBic, String recipientCodigoBic,String sourceBranch, String recipientCurrency, String amountReceive, String sourceCountry, String recipientCountry){
        Map<String, String> bookToBookParemeters = new Map<String, String>();
        bookToBookParemeters.put('product_id', PRODUCT_ID_001); 
        bookToBookParemeters.put('operation_id', paymentId); 
        bookToBookParemeters.put('agreement_type', 'Product');
        bookToBookParemeters.put('agreement_id', sourceId);
        bookToBookParemeters.put('customer_id', sourceCodigoCorporate);
        bookToBookParemeters.put('bank_id', sourceCodigoBic);
        bookToBookParemeters.put('branch_id', sourceBranch);
        bookToBookParemeters.put('currency', recipientCurrency);
        if(amountReceive != null){
            bookToBookParemeters.put('payment_amount', amountReceive);
        }
        bookToBookParemeters.put('urgency_indicator', 'Standard');
        if(sourceCountry == recipientCountry){
            bookToBookParemeters.put('country_indicator', 'equal');
        }else{
            bookToBookParemeters.put('country_indicator', 'different');
        }
        if(sourceCodigoBic == recipientCodigoBic){
            bookToBookParemeters.put('entity_indicator', 'equal');
        }else{
            bookToBookParemeters.put('entity_indicator', 'different');
        }
        if (sourceCodigoCorporate == recipientCodigoCorporate) { 
            bookToBookParemeters.put('customer_indicator', 'equal');
        } else {
            bookToBookParemeters.put('customer_indicator', 'different');
        }
        bookToBookParemeters.put('purpose_code', 'OTHR');   
        return bookToBookParemeters; 
    }
            /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Retrieves the query parameters to make a call to WS_PaymentsSpecialPrices (/payments_special_prices/)
    History
    <Date>          <Author>            <Description>
    30/11/2020      Shahad Naji          Initial version    
    ----------------------------------------------------------------------------------*/
    global static Map<String, String> setInternationalInstantPaymentParameters(String paymentId, String sourceId, String sourceCodigoCorporate, String recipientCodigoCorporate, String sourceCodigoBic, String recipientCodigoBic,String sourceBranch, String recipientCurrency, String amountReceive, String sourceCountry, String recipientCountry){
        Map<String, String> iipParemeters = new Map<String, String>();
        iipParemeters.put('product_id', PRODUCT_ID_002); 
        iipParemeters.put('operation_id', paymentId); 
        iipParemeters.put('agreement_type', 'Product'); 
        iipParemeters.put('agreement_id', sourceId);
        iipParemeters.put('customer_id', sourceCodigoCorporate);
        iipParemeters.put('bank_id', sourceCodigoBic);
        iipParemeters.put('branch_id', sourceBranch);
        iipParemeters.put('currency', recipientCurrency);
        if(amountReceive != null){
            iipParemeters.put('payment_amount', amountReceive);
        }
        iipParemeters.put('urgency_indicator', 'Standard');
        if(sourceCountry == recipientCountry){
            iipParemeters.put('country_indicator', 'equal');
        }else{
            iipParemeters.put('country_indicator', 'different');
        }
        if(sourceCodigoBic == recipientCodigoBic){
            iipParemeters.put('entity_indicator', 'equal'); 
        }else{
            iipParemeters.put('entity_indicator', 'different');
        }
        if (sourceCodigoCorporate == recipientCodigoCorporate) { 
            iipParemeters.put('customer_indicator', 'equal');
        } else {
            iipParemeters.put('customer_indicator', 'different');
        }
        iipParemeters.put('purpose_code', 'OTHR');
        return iipParemeters;
    }
}