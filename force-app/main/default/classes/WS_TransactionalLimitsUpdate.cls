/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Validates if a transaction can be executed on behalf of a customer/user according to the transactional limits that person has. If assessment is successful, it automatically is posted against accumulated limits.
				It also supports the updating of the values (contract and transaction amount) of a previous transaction, provided that the original and new transaction data are specified in the entry. 
				This update also re-evaluates the transaction based on the new information and if it's correct the accumulated limits are decreased limits with the original amount and date and are increased with the data of the modified transaction.

Test Class:     TBD
History
<Date>			<Author>		<Description>
08/09/2020		Shahad Naji     Initial version (based on WS_CreatePaymentOperation)
21/01/2021		Shahad Naji		Send Global-Payment-Id in the header of the request to help MS sending the info to Stratio
28/01/2021		Shahad Naji		Delete LimitsDataEntryUpdate structure
----------------------------------------------------------------------------------*/
global class WS_TransactionalLimitsUpdate {
    
    private OUTPUT result;
    private String baseEndpoint;
    private String baseMethod;
    private String tokenPlatform;
    private String tokenUser;
    
    public OUTPUT getResult () {
        return this.result;
    }

  
    public WS_TransactionalLimitsUpdate() {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_TransactionalLimitsUpdate');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
    }
    
               /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to be called from CNT_B2B_PaymentSummary.updateLimits           
    History
    <Date>			<Author>		     <Description>
    29/11/2020		Shahad Naji             Initial version
    ----------------------------------------------------------------------------------*/
    public OUTPUT execute(WRAPPER_PaymentDetail.OperationDetail paymentData){
        this.result = null;
        try{
            String operationId = '';
            String serviceId = '';
            String transactionDate = '';
            TransactionContract transactionContract = null;
            TransactionAmount transactionAmount = null;
            TransactionAmount transactionAmountBaseCurrency = null;
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
                    transactionContract = new WS_TransactionalLimitsUpdate.TransactionContract(accountType, accountId);
                }
               	
                if(paymentData.operationAmountBaseCurrency != null){
                    baseAmount = paymentData.operationAmountBaseCurrency.amount != null ? String.valueOf(paymentData.operationAmountBaseCurrency.amount) : null;
                    baseCurrency = String.isNotBlank(paymentData.operationAmountBaseCurrency.tcurrency) ? paymentData.operationAmountBaseCurrency.tcurrency : null;
                }
                
               transactionAmount = new WS_TransactionalLimitsUpdate.TransactionAmount(amount, tcurrency);
               transactionAmountBaseCurrency = new WS_TransactionalLimitsUpdate.TransactionAmount(baseAmount, baseCurrency);
                
              this.result = this.execute(operationId, serviceId, transactionDate, transactionContract, transactionAmount, transactionAmountBaseCurrency,null, null, null);  
            }else{
                this.result = null;
            }
            
            
        }catch (Exception e) {
            System.debug('WS_TransactionalLimitsUpdate.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

     /*
    Author:         Candido Parejo
    Company:        Deloitte
    Description:    API method to update limits
    History:
    <Date>          <Author>                <Description>
    14/09/2020      Shahad Naji             Initial version
    01/02/2021      Candido Parejo          Change the way to receive data to transfer
    */
    public OUTPUT execute (WRAPPER_PAY_PaymentDraft paymentDraft) {
        this.result = null;
        String inputJson = '';
        String auxIdType = '';
        String auxDisplayNumber = '';
        String auxAmountSend = null;
        String auxCurrencyCodeAvailableBalance = '';
        String country = null;
        String codigoBic = null;
        try {
            if (paymentDraft != null) {
                if (paymentDraft.amountSend != null) {
                    auxAmountSend = paymentDraft.amountSend != null ? String.valueOf(paymentDraft.amountSend) : null;
                }
                if (paymentDraft.sourceAccount != null) {
                    auxIdType = String.isNotBlank(paymentDraft.sourceAccount.idType) ? paymentDraft.sourceAccount.idType : 'BBA';
                    auxDisplayNumber = String.isNotBlank(paymentDraft.sourceAccount.displayNumber) ? paymentDraft.sourceAccount.displayNumber : '';
                    auxCurrencyCodeAvailableBalance = String.isNotBlank(paymentDraft.sourceAccount.currencyCodeAvailableBalance) ? paymentDraft.sourceAccount.currencyCodeAvailableBalance : '';
                    country = String.isNotBlank(paymentDraft.sourceAccount.country) ?  paymentDraft.sourceAccount.country : '';
                    codigoBic = String.isNotBlank(paymentDraft.sourceAccount.codigoBic) ?  paymentDraft.sourceAccount.codigoBic : '';
                }
            }
            String transactionDate = String.valueOf(Date.today());
            WS_TransactionalLimitsUpdate.TransactionContract transactionContract = new WS_TransactionalLimitsUpdate.TransactionContract (auxIdType, auxDisplayNumber);
            WS_TransactionalLimitsUpdate.TransactionAmount transactionAmount = new WS_TransactionalLimitsUpdate.TransactionAmount(auxAmountSend, auxCurrencyCodeAvailableBalance);
            String baseAmountAux = paymentDraft.baseAmount != null ? String.valueOf(paymentDraft.baseAmount) : null;
            WS_TransactionalLimitsUpdate.TransactionAmount transactionAmountBaseCurrency = new WS_TransactionalLimitsUpdate.TransactionAmount(baseAmountAux, paymentDraft.baseCurrency);
            this.result = this.execute(country, codigoBic, paymentDraft.paymentId, paymentDraft.serviceId, transactionDate, transactionContract, transactionAmount, transactionAmountBaseCurrency, null, null, null);
        } catch (Exception e) {
            System.debug('WS_TransactionalLimitsUpdate.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    public OUTPUT execute (String country, String codigoBic, String operationId, String serviceId, String transactionDate, TransactionContract transactionContract, TransactionAmount transactionAmount, TransactionAmount transactionAmountBaseCurrency, String originaltransactionDate, TransactionAmount originalTransactionAmount, TransactionAmount originTransactionAmountBaseCurrency) {
        this.result = null;
        WS_TransactionalLimitsUpdate.INPUT input;
        String inputJson = '';
        try {
            input = new WS_TransactionalLimitsUpdate.INPUT(operationId, serviceId, transactionDate, transactionContract, transactionAmount, transactionAmountBaseCurrency, originaltransactionDate, originalTransactionAmount, originTransactionAmountBaseCurrency);
            inputJson = JSON.serialize(input, true);
            Map<String, String> extraHeaderParameters = new Map<String, String>();
            extraHeaderParameters.put('Global-Payment-Id', operationId);
            TokenInformation tokenInformation = new TokenInformation(country, this.tokenPlatform, this.tokenUser, null, codigoBic);
            String response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters);
            if (String.isNotBlank(response)) {
                WS_TransactionalLimitsUpdate.LimitsResponseUpdate limitsResponseUpdate = (WS_TransactionalLimitsUpdate.LimitsResponseUpdate) JSON.deserialize(response, WS_TransactionalLimitsUpdate.LimitsResponseUpdate.class);
                WS_TransactionalLimitsUpdate.OUTPUT output = new WS_TransactionalLimitsUpdate.OUTPUT(limitsResponseUpdate);                    
                this.result = output;
            } else {
                this.result = null;
            }
        } catch (Exception e) {
            System.debug('WS_TransactionalLimitsUpdate.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    
            /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to be called from CNT_B2B_PaymentSummary.updateLimits           
    History
    <Date>			<Author>		     <Description>
    14/09/2020		Shahad Naji             Initial version
    ----------------------------------------------------------------------------------*/
    public OUTPUT execute(String operationId, String serviceId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData, Double baseAmount, String baseCurrency){
        
        this.result = null;      
        String inputJson = '';
        String auxIdType = '';
        String auxDisplayNumber = '';
        String auxAmountSend = null;
        String auxCurrencyCodeAvailableBalance = '';
       //LimitsDataEntryUpdate limitsDataEntryUpdate = null;
     
        try {
            if(paymentData != null){
                auxAmountSend = paymentData.amountSend != null ? String.valueOf(paymentData.amountSend) : null;                
            }            
            if(sourceAccountData != null){
                auxIdType = String.isNotBlank(sourceAccountData.idType) ? sourceAccountData.idType : 'BBA';
                auxDisplayNumber = String.isNotBlank(sourceAccountData.displayNumber) ? sourceAccountData.displayNumber : '';
                auxCurrencyCodeAvailableBalance = String.isNotBlank(sourceAccountData.currencyCodeAvailableBalance) ? sourceAccountData.currencyCodeAvailableBalance : '';  
            }
            
            String transactionDate = String.valueOf(Date.today());
            WS_TransactionalLimitsUpdate.TransactionContract transactionContract = new WS_TransactionalLimitsUpdate.TransactionContract (auxIdType, auxDisplayNumber);    
            WS_TransactionalLimitsUpdate.TransactionAmount transactionAmount = new WS_TransactionalLimitsUpdate.TransactionAmount(auxAmountSend, auxCurrencyCodeAvailableBalance);
            String baseAmount_aux = baseAmount != null ? String.valueOf(baseAmount) : null;
            WS_TransactionalLimitsUpdate.TransactionAmount transactionAmountBaseCurrency = new WS_TransactionalLimitsUpdate.TransactionAmount(baseAmount_aux, baseCurrency);
            this.result = this.execute(operationId, serviceId, transactionDate, transactionContract, transactionAmount, transactionAmountBaseCurrency, null, null, null);            
        } catch (Exception e) {
            System.debug('WS_TransactionalLimitsUpdate.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        
        return this.result;
    }
    
    public OUTPUT execute(String operationId, String serviceId, String transactionDate, TransactionContract transactionContract, TransactionAmount transactionAmount,  
                          TransactionAmount transactionAmountBaseCurrency, String originaltransactionDate, TransactionAmount originalTransactionAmount, TransactionAmount originTransactionAmountBaseCurrency){
                              this.result = null;
                              WS_TransactionalLimitsUpdate.INPUT input;
                              String inputJson = '';
                              //LimitsDataEntryUpdate limitsDataEntryUpdate = null;
                              try {
                                 // limitsDataEntryUpdate = new LimitsDataEntryUpdate(operationId, serviceId, transactionDate, transactionContract, transactionAmount, transactionAmountBaseCurrency, originaltransactionDate, originalTransactionAmount, originTransactionAmountBaseCurrency);
                                 // input = new  WS_TransactionalLimitsUpdate.INPUT(limitsDataEntryUpdate);
                                  input = new WS_TransactionalLimitsUpdate.INPUT(operationId, serviceId, transactionDate, transactionContract, transactionAmount, transactionAmountBaseCurrency, originaltransactionDate, originalTransactionAmount, originTransactionAmountBaseCurrency);
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
                                      //WS_TransactionalLimitsUpdate.OUTPUT output = (WS_TransactionalLimitsUpdate.OUTPUT)JSON.deserialize(response, WS_TransactionalLimitsUpdate.OUTPUT.class);   
                                      WS_TransactionalLimitsUpdate.LimitsResponseUpdate limitsResponseUpdate = (WS_TransactionalLimitsUpdate.LimitsResponseUpdate)JSON.deserialize(response, WS_TransactionalLimitsUpdate.LimitsResponseUpdate.class);
                                      WS_TransactionalLimitsUpdate.OUTPUT output = new WS_TransactionalLimitsUpdate.OUTPUT(limitsResponseUpdate);
                                      this.result = output;
                                  } else {
                                      this.result = null;
                                  }
            
                              } catch (Exception e) {
                                  System.debug('WS_TransactionalLimitsUpdate.execute: ' + e.getMessage());
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
        global INPUT(String operationId, String serviceId, String transactionDate, TransactionContract transactionContract, TransactionAmount transactionAmount, TransactionAmount transactionAmountBaseCurrency){
            this.operationId = operationId;
            this.serviceId = serviceId;
            this.transactionDate = transactionDate;
            this.transactionContract = transactionContract;
            this.transactionAmount = transactionAmount;
            this.transactionAmountBaseCurrency = transactionAmountBaseCurrency;
        }
        global INPUT(String operationId, String serviceId, String transactionDate, TransactionContract transactionContract, TransactionAmount transactionAmount, 
                                     TransactionAmount transactionAmountBaseCurrency, String originaltransactionDate, TransactionAmount originalTransactionAmount, TransactionAmount originTransactionAmountBaseCurrency){
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
        global LimitsResponseUpdate limitsResponseUpdate {get;set;}       
        global OUTPUT(){}
        global OUTPUT(LimitsResponseUpdate limitsResponseUpdate){
			this.limitsResponseUpdate=limitsResponseUpdate;          
        }
    }
    global class LimitsResponseUpdate {
        @AuraEnabled
        global String operationId {get;set;}
        @AuraEnabled
        global String limitsResult {get;set;}
        @AuraEnabled
        global String codeLimitsResult {get;set;} 
        global LimitsResponseUpdate(){}
        global LimitsResponseUpdate(String operationId, String limitsResult, String codeLimitsResult){
            this.operationId = operationId;
            this.limitsResult = limitsResult;
            this.codeLimitsResult = codeLimitsResult;
        }
    }
    

}