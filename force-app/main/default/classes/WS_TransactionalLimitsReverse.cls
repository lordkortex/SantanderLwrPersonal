/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Cancels a previously validated transaction, which removes it from transactional counters for accumulated limits. It's necessary specify data of transaction to cancel.
				It also supports undo a modified transaction. It's necessary specify data transaction before change and data transaction after change. Since this is a cancellation, 
				the effect on the accumulated limits in this case is the increase with the data of the original transaction and the decrease of the limits with the data of the modified transaction.
Test Class:     TBD
History
<Date>			<Author>		<Description>
08/09/2020		Shahad Naji     Initial version (based on WS_CreatePaymentOperation)
18/01/2021		Shahad Naji		Get baseAmount and baseCurrency information from OperationAmountBaseCurrency structure
21/01/2021		Shahad Naji		Send Global-Payment-Id in the header of the request to help MS sending the info to Stratio
28/01/2021		Shahad Naji		Delete LimitsDataEntryUpdate structure
----------------------------------------------------------------------------------*/
global class WS_TransactionalLimitsReverse {
    private OUTPUT result;
    private String baseEndpoint;
    private String baseMethod;
    
    public OUTPUT getResult () {
        return this.result; 
    }    
    
    public WS_TransactionalLimitsReverse() {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_TransactionalLimitsReverse');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
    }
    
    public OUTPUT execute( WRAPPER_PaymentDetail.OperationDetail paymentData){
        this.result = new WS_TransactionalLimitsReverse.OUTPUT();
        try{			
            String operationId = '';
            String serviceId = '';
            String transactionDate = '';
            WS_TransactionalLimitsReverse.TransactionContract transactionContract = null;
            WS_TransactionalLimitsReverse.TransactionAmount transactionAmount = null;
            WS_TransactionalLimitsReverse.TransactionAmount transactionAmountBaseCurrency = null;
            String originaltransactionDate = '';
            WS_TransactionalLimitsReverse.TransactionAmount originalTransactionAmount = null;
            WS_TransactionalLimitsReverse.TransactionAmount originTransactionAmountBaseCurrency = null;
            
            if(paymentData != null){
                operationId = paymentData.productId != null ? paymentData.productId : '';
                serviceId = paymentData.serviceId != null ? paymentData.serviceId : '';
                transactionDate = String.valueOf(Date.today());
                
                String accountType = '';
                String accountId = '';
                String tcurrency = '';
                String amount = null;
                String baseAmount = null;
                String baseCurrency = '';
                
                amount = paymentData.amount != null ? String.valueOf(paymentData.amount) : null;
                if(paymentData.sourceData != null){
                    if(paymentData.sourceData.sourceAccount != null){                   
                        accountType = paymentData.sourceData.sourceAccount.accountType != null ? paymentData.sourceData.sourceAccount.accountType : 'BBA';
                        accountId = paymentData.sourceData.sourceAccount.accountId != null ? paymentData.sourceData.sourceAccount.accountId : '';
                        tcurrency = paymentData.sourceData.sourceAccount.tcurrency != null ?  paymentData.sourceData.sourceAccount.tcurrency : '';    
                    }
                }
                
                if(String.isNotBlank(accountType) && String.isNotBlank(accountId)){
                    transactionContract = new WS_TransactionalLimitsReverse.TransactionContract(accountType, accountId);
                }else{
                    return null;
                }
                
                
                if(amount != null && String.isNotBlank(tcurrency)){
                    transactionAmount = new WS_TransactionalLimitsReverse.TransactionAmount(amount, tcurrency); 
                }else{
                    return null;
                }
                
                if(paymentData.operationAmountBaseCurrency != null){
                    baseAmount = paymentData.operationAmountBaseCurrency.amount != null ? String.valueOf(paymentData.operationAmountBaseCurrency.amount) : null;
                    baseCurrency = String.isNotBlank(paymentData.operationAmountBaseCurrency.tcurrency) ? paymentData.operationAmountBaseCurrency.tcurrency : null;
                    if(baseAmount != null && String.isNotBlank(baseCurrency)){
                        transactionAmountBaseCurrency = new WS_TransactionalLimitsReverse.TransactionAmount(baseAmount, baseCurrency);
                    }else{
                        return null;
                    }
                }else{
                    return null;
                }
                
                this.result = this.execute(operationId,  serviceId,  transactionDate,  transactionContract,  transactionAmount, transactionAmountBaseCurrency, originaltransactionDate, originalTransactionAmount,  originTransactionAmountBaseCurrency);
            }else{
                this.result = null;
            }
        }catch (Exception e) {
            System.debug('WS_TransactionalLimitsReverse.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
		        
    }
    public OUTPUT execute(String operationId, String serviceId, WRAPPER_PaymentDetail.OperationDetail paymentData){
        this.result = null;
        WS_TransactionalLimitsReverse.INPUT input; 
        //LimitsDataEntryUpdate limitsDataEntryUpdate = null;
        String inputJson = '';
        String auxIdType = '';
        String auxDisplayNumber = '';
        String auxAmountSend = null;
        String auxCurrencyCodeAvailableBalance = '';
        String baseAmount = null;
        String baseCurrency = '';
        WS_TransactionalLimitsReverse.TransactionAmount transactionAmountBaseCurrency = null;
        try {
            if(paymentData != null){
                if(paymentData.amount != null){
                    auxAmountSend = String.valueOf(paymentData.amount);
                }
                if(paymentData.sourceData != null){
                    if(paymentData.sourceData.sourceAccount != null){
                        if(paymentData.sourceData.sourceAccount.accountType != null){
                            auxIdType = paymentData.sourceData.sourceAccount.accountType;
                        }else{
                            auxIdType = 'BBA';
                        }
                        if(paymentData.sourceData.sourceAccount.accountId != null){
                            auxDisplayNumber = paymentData.sourceData.sourceAccount.accountId;
                        }
                        if(paymentData.sourceData.sourceAccount.tcurrency != null){
                            auxCurrencyCodeAvailableBalance = paymentData.sourceData.sourceAccount.tcurrency;                           
                        }
                    }
                }
                if(paymentData.operationAmountBaseCurrency != null){
                    baseAmount = paymentData.operationAmountBaseCurrency.amount != null ? String.valueOf(paymentData.operationAmountBaseCurrency.amount) : null;
                    baseCurrency = String.isNotBlank(paymentData.operationAmountBaseCurrency.tcurrency) ? paymentData.operationAmountBaseCurrency.tcurrency : null;
                    if(baseAmount != null && String.isNotBlank(baseCurrency)){
                        transactionAmountBaseCurrency = new WS_TransactionalLimitsReverse.TransactionAmount(baseAmount, baseCurrency);
                    }else{
                        return null;
                    }
                }else{
                    return null;
                }
                
            }
        
            String transactionDate = String.valueOf(Date.today());
            WS_TransactionalLimitsReverse.TransactionContract transactionContract = new WS_TransactionalLimitsReverse.TransactionContract(auxIdType, auxDisplayNumber);
            WS_TransactionalLimitsReverse.TransactionAmount transactionAmount = new WS_TransactionalLimitsReverse.TransactionAmount(auxAmountSend, auxCurrencyCodeAvailableBalance);
           // WS_TransactionalLimitsReverse.TransactionAmount transactionAmountBaseCurrency = new WS_TransactionalLimitsReverse.TransactionAmount(baseAmount, baseCurrency);
            input = new  WS_TransactionalLimitsReverse.INPUT(operationId, serviceId, transactionDate, transactionContract, transactionAmount, transactionAmountBaseCurrency, null, null, null);
            //limitsDataEntryUpdate = new LimitsDataEntryUpdate(operationId, serviceId, transactionDate, transactionContract, transactionAmount, transactionAmountBaseCurrency, null, null, null);
            //input = new  WS_TransactionalLimitsReverse.INPUT(limitsDataEntryUpdate);            
            System.debug('INPUT: ' + input);
            inputJson = JSON.serialize(input, true);
            System.debug('Input JSON: ' + inputJson);
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Global-Payment-Id', operationId);
            // Make the callout to the POST web service            
            String response = null;
            response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters);
            System.debug('Result: ' + response);
            
            if (String.isNotBlank(response)) {
                WS_TransactionalLimitsReverse.OUTPUT output = (WS_TransactionalLimitsReverse.OUTPUT)JSON.deserialize(response, WS_TransactionalLimitsReverse.OUTPUT.class);
                this.result = output;
            } else {
                this.result = null;
            }
             
        } catch (Exception e) {
            System.debug('WS_TransactionalLimitsReverse.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }
    public OUTPUT execute(String operationId, String serviceId, String transactionDate, TransactionContract transactionContract, TransactionAmount transactionAmount,  
                          TransactionAmount transactionAmountBaseCurrency, String originaltransactionDate, TransactionAmount originalTransactionAmount, TransactionAmount originTransactionAmountBaseCurrency){
                              this.result = null;
                              WS_TransactionalLimitsReverse.INPUT input;
                              //LimitsDataEntryUpdate limitsDataEntryUpdate = null;
                              String inputJson = '';
                              try {
                                  input = new  WS_TransactionalLimitsReverse.INPUT(operationId, serviceId, transactionDate, transactionContract, transactionAmount, transactionAmountBaseCurrency, originaltransactionDate, originalTransactionAmount, originTransactionAmountBaseCurrency);
                                  //limitsDataEntryUpdate = new LimitsDataEntryUpdate(operationId, serviceId, transactionDate, transactionContract, transactionAmount, transactionAmountBaseCurrency, originaltransactionDate, originalTransactionAmount, originTransactionAmountBaseCurrency);
                                  //input = new  WS_TransactionalLimitsReverse.INPUT(limitsDataEntryUpdate);
                                  System.debug('INPUT: ' + input);
                                  inputJson = JSON.serialize(input, true);
                                  System.debug('Input JSON: ' + inputJson);
                                  Map<String,String> extraHeaderParameters = new Map<String,String> ();
                                  extraHeaderParameters.put('Global-Payment-Id', operationId);
                                  // Make the callout to the POST web service            
                                  String response = null;
                                  response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters);
                                  System.debug('Result: ' + response);
                                  
                                  if (String.isNotBlank(response)) {
                                      WS_TransactionalLimitsReverse.OUTPUT output = (WS_TransactionalLimitsReverse.OUTPUT)JSON.deserialize(response, WS_TransactionalLimitsReverse.OUTPUT.class);
                                      this.result = output;
                                  } else {
                                      this.result = null;
                                  }
                                  
                              } catch (Exception e) {
                                  System.debug('WS_TransactionalLimitsReverse.execute: ' + e.getMessage());
                                  throw new CustomException(e.getMessage());
                              }
                              
                              return this.result;
                              }
   /* global with sharing class INPUT {
        
        @AuraEnabled
        global LimitsDataEntryUpdate limitsDataEntryUpdate {get;set;} 
        
        
        global INPUT(){}
            global INPUT(LimitsDataEntryUpdate limitsDataEntryUpdate){
                this.limitsDataEntryUpdate = limitsDataEntryUpdate;
            }
    }*/
    
    global class INPUT {
        @AuraEnabled
        global String operationId {get;set;} 
        @AuraEnabled
        global String serviceId {get;set;} 
        @AuraEnabled
        global String transactionDate {get;set;} 
        @AuraEnabled
        global TransactionContract transactionContract {get;set;} 
        @AuraEnabled
        global TransactionAmount transactionAmount {get;set;} 
        @AuraEnabled
        global TransactionAmount transactionAmountBaseCurrency {get;set;} 
        @AuraEnabled
        global String originaltransactionDate {get;set;} 
        @AuraEnabled
        global TransactionAmount originalTransactionAmount {get;set;} 
        @AuraEnabled
        global TransactionAmount originTransactionAmountBaseCurrency {get;set;} 
        
        global INPUT(){} 
        global INPUT(String operationId, String serviceId, String transactionDate, TransactionContract transactionContract, TransactionAmount transactionAmount, TransactionAmount transactionAmountBaseCurrency, String originaltransactionDate, TransactionAmount originalTransactionAmount, TransactionAmount originTransactionAmountBaseCurrency ){
            this.operationId = operationId;
            this.serviceId = serviceId;
            this.transactionDate = transactionDate;
            this.transactionContract = transactionContract;
            this.transactionAmount = transactionAmount;
            this.transactionAmountBaseCurrency = transactionAmountBaseCurrency;
            this.originaltransactionDate = originaltransactionDate;
            this.originalTransactionAmount = originalTransactionAmount;
            this.originTransactionAmountBaseCurrency = originTransactionAmountBaseCurrency;           
        } 
	}
    
    global class TransactionAmount {
        @AuraEnabled
		global String amount {get;set;} 
        @AuraEnabled
		global String tcurrency {get;set;} 
        global TransactionAmount(){}
        global TransactionAmount(String amount, String tcurrency){
            this.amount = amount;
            this.tcurrency = tcurrency;
        }
    }
    
    global class TransactionContract {
        @AuraEnabled
        global String contractType {get;set;} 
        @AuraEnabled
        global String contractId {get;set;} 
        global TransactionContract(){}
        global TransactionContract(String contractType, String contractId){
            this.contractType = contractType;
            this.contractId = contractId;
        }
    }
    
    global with sharing class OUTPUT {
        @AuraEnabled
        global String operationId {get;set;}
        @AuraEnabled
        global String limitsResult {get;set;}
        @AuraEnabled
        global String codeLimitsResult {get;set;} 
        global OUTPUT(){}
        global OUTPUT(String operationId, String limitsResult, String codeLimitsResult){
            this.operationId = operationId;
            this.limitsResult = limitsResult;
            this.codeLimitsResult = codeLimitsResult;
        }
    }
}