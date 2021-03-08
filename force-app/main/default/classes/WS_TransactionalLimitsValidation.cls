/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Validates if a transaction can be processed on behalf of a customer according to their transactional limits.
Test Class:     TBD
History
<Date>			<Author>		<Description>
08/09/2020		Shahad Naji     Initial version (based on WS_CreatePaymentOperation)
21/01/2021		Shahad Naji		Send Global-Payment-Id in the header of the request to help MS sending the info to Stratio
28/01/2021		Shahad Naji		Delete LimitsDataEntryUpdate structure
----------------------------------------------------------------------------------*/
global with sharing class WS_TransactionalLimitsValidation {
        
    private OUTPUT result;
    private String baseEndpoint;
    private String baseMethod;
    private String tokenPlatform;
    private String tokenUser;
    
    global OUTPUT getResult () {
        return this.result;
    }

  
    global WS_TransactionalLimitsValidation() {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_TransactionalLimitsValidation');
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
    global OUTPUT execute(String paymentId, String serviceId, WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, Double baseAmount, String baseCurrency){
        this.result = null;
        try{
            String operationId = String.isNotBlank(paymentId) ? paymentId : null;
            String serviceId_aux = String.isNotBlank(serviceId) ? serviceId : '';
            String transactionDate = String.valueOf(Date.today());
            TransactionContract transactionContract = null;
            TransactionAmount transactionAmount = null;
            TransactionAmount transactionAmountBaseCurrency = null;
            WS_TransactionalLimitsValidation.INPUT input = new WS_TransactionalLimitsValidation.INPUT();
            
            String accountType = '';
            String accountId = '';
            String amountSend = null;
            String currency_aux = '';
            if(sourceAccountData != null){
                accountType = String.isNotBlank(sourceAccountData.idType) ? sourceAccountData.idType : 'BBA';
                accountId = String.isNotBlank( sourceAccountData.displayNumber) ?  sourceAccountData.displayNumber : '';
                currency_aux = String.isNotBlank( sourceAccountData.currencyCodeAvailableBalance) ?  sourceAccountData.currencyCodeAvailableBalance : '';
            }else{
                return null;
            }
            if(paymentData != null){
                amountSend = paymentData.amountSend != null ? String.valueOf(paymentData.amountSend) : null;
            }else{
                return null;
            }
            
            transactionContract =  new WS_TransactionalLimitsValidation.TransactionContract(accountType, accountId);
            transactionAmount = new WS_TransactionalLimitsValidation.TransactionAmount(amountSend, currency_aux);
            String baseAmount_aux = baseAmount != null ? String.valueOf(baseAmount) : null;
            transactionAmountBaseCurrency = new WS_TransactionalLimitsValidation.TransactionAmount(baseAmount_aux, baseCurrency);
            
            input = new WS_TransactionalLimitsValidation.INPUT(serviceId, transactionDate, transactionContract, transactionAmount,  transactionAmountBaseCurrency, null, null, null);
            this.result = this.execute(operationId, input);
            
        }catch (Exception e) {
            System.debug('WS_TransactionalLimitsValidation.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

     /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to be called from CNT_B2B_PaymentSummary.updateLimits
    History:
    <Date>          <Author>                <Description>
    29/11/2020      Shahad Naji             Initial version
    01/02/2021      Candido                 Refactor with WRAPPER_PAY_PaymentDraft
    */
    global OUTPUT execute (WRAPPER_PAY_PaymentDraft paymentDraft, Decimal baseAmount, String baseCurrency) {
        this.result = null;
        try {
            String operationId = String.isNotBlank(paymentDraft.paymentId) ? paymentDraft.paymentId : null;
            String serviceId = String.isNotBlank(paymentDraft.serviceId) ? paymentDraft.serviceId : '';
            String transactionDate = String.valueOf(Date.today());
            TransactionContract transactionContract = null;
            TransactionAmount transactionAmount = null;
            TransactionAmount transactionAmountBaseCurrency = null;
            WS_TransactionalLimitsValidation.INPUT input = new WS_TransactionalLimitsValidation.INPUT();
            String accountType = '';
            String accountId = '';
            String amountSend = null;
            String currencyAux = '';
            String country = '';
            String codigoBic = '';
            if (paymentDraft.sourceAccount != null) {
                accountType = String.isNotBlank(paymentDraft.sourceAccount.idType) ? paymentDraft.sourceAccount.idType : 'BBA';
                accountId = String.isNotBlank(paymentDraft.sourceAccount.displayNumber) ? paymentDraft.sourceAccount.displayNumber : '';
                currencyAux = String.isNotBlank(paymentDraft.sourceAccount.currencyCodeAvailableBalance) ? paymentDraft.sourceAccount.currencyCodeAvailableBalance : '';
                country = String.isNotBlank(paymentDraft.sourceAccount.country) ?  paymentDraft.sourceAccount.country : '';
                codigoBic = String.isNotBlank(paymentDraft.sourceAccount.codigoBic) ?  paymentDraft.sourceAccount.codigoBic : '';
            } else {
                return null;
            }
            if (paymentDraft.amountSend != null) {
                amountSend = paymentDraft.amountSend != null ? String.valueOf(paymentDraft.amountSend) : null;
            } else {
                return null;
            }
            transactionContract = new WS_TransactionalLimitsValidation.TransactionContract(accountType, accountId);
            transactionAmount = new WS_TransactionalLimitsValidation.TransactionAmount(amountSend, currencyAux);
            String baseAmountAux = baseAmount != null ? String.valueOf(baseAmount) : null;
            transactionAmountBaseCurrency = new WS_TransactionalLimitsValidation.TransactionAmount(baseAmountAux, baseCurrency);
            input = new WS_TransactionalLimitsValidation.INPUT(serviceId, transactionDate, transactionContract, transactionAmount,  transactionAmountBaseCurrency, null, null, null);
            this.result = this.execute(operationId, country, codigoBic, input);
        } catch (Exception e) {
            System.debug('WS_TransactionalLimitsValidation.execute: ' + e.getMessage());
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
    29/11/2020		Shahad Naji             Initial version
    ----------------------------------------------------------------------------------*/
    global OUTPUT execute(WRAPPER_PaymentDetail.OperationDetail paymentData){
        this.result = null;
        try{
            String operationId = '';
            String serviceId = '';
            String transactionDate = '';
            TransactionContract transactionContract = null;
            TransactionAmount transactionAmount = null;
            TransactionAmount transactionAmountBaseCurrency = null;
            //LimitsDataEntry limitsDataEntry = null;
            WS_TransactionalLimitsValidation.INPUT input = new WS_TransactionalLimitsValidation.INPUT();
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
                    transactionContract = new WS_TransactionalLimitsValidation.TransactionContract(accountType, accountId);
                }
                if(paymentData.operationAmountBaseCurrency != null){
                    baseAmount = paymentData.operationAmountBaseCurrency.amount != null ? String.valueOf(paymentData.operationAmountBaseCurrency.amount) : null;
                    baseCurrency = String.isNotBlank(paymentData.operationAmountBaseCurrency.tcurrency) ? paymentData.operationAmountBaseCurrency.tcurrency : null;
                }
               	
               transactionAmount = new WS_TransactionalLimitsValidation.TransactionAmount(amount, tcurrency);
               transactionAmountBaseCurrency = new WS_TransactionalLimitsValidation.TransactionAmount(baseAmount, baseCurrency);
               //limitsDataEntry = new LimitsDataEntry(serviceId, transactionDate, transactionContract, transactionAmount,  transactionAmountBaseCurrency, null, null, null);
               input = new WS_TransactionalLimitsValidation.INPUT(serviceId, transactionDate, transactionContract, transactionAmount,  transactionAmountBaseCurrency, null, null, null);
              //this.result = this.execute(operationId, limitsDataEntry);  
              this.result = this.execute(operationId, input);  
            }else{
                this.result = null;
            }
            
            
        }catch (Exception e) {
            System.debug('WS_TransactionalLimitsValidation.execute: ' + e.getMessage());
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
29/11/2020		Shahad Naji             Initial version
----------------------------------------------------------------------------------*/
    global OUTPUT execute(String paymentId, WS_TransactionalLimitsValidation.INPUT input){
		this.result = null;
        //WS_TransactionalLimitsValidation.INPUT input;
        String inputJson = '';
        try{     
           // input = new WS_TransactionalLimitsValidation.INPUT(limitsDataEntry);
            inputJson = JSON.serialize(input, true);
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Global-Payment-Id', paymentId);
            String response = null;
            response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters);
            if (String.isNotBlank(response)) {
                WS_TransactionalLimitsValidation.OUTPUT output = (WS_TransactionalLimitsValidation.OUTPUT)JSON.deserialize(response, WS_TransactionalLimitsValidation.OUTPUT.class);   
                this.result = output;
            } else {
                this.result = null;
            }   
        }catch (Exception e) {
            System.debug('WS_TransactionalLimitsValidation.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

   /* global with sharing class INPUT {
        @AuraEnabled
        global LimitsDataEntry limitsDataEntry {get;set;} 
        global INPUT(){}
        global INPUT(LimitsDataEntry limitsDataEntry){
            this.limitsDataEntry = limitsDataEntry;
        }
    }*/

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to be called from CNT_B2B_PaymentSummary.updateLimits
    History
    <Date>          <Author>                <Description>
    29/11/2020      Shahad Naji             Initial version
    */
    global OUTPUT execute (String paymentId, String country, String codigoBic, WS_TransactionalLimitsValidation.INPUT input) {
        this.result = null;
        String inputJson = '';
        try {
            inputJson = JSON.serialize(input, true);
            Map<String, String> extraHeaderParameters = new Map<String, String>();
            extraHeaderParameters.put('Global-Payment-Id', paymentId);
            String response = null;
            TokenInformation tokenInformation = new TokenInformation(country, this.tokenPlatform, this.tokenUser, null, codigoBic);
            response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters, null, null, 25000, tokenInformation);
            if (String.isNotBlank(response)) {
                WS_TransactionalLimitsValidation.OUTPUT output = (WS_TransactionalLimitsValidation.OUTPUT)JSON.deserialize(response, WS_TransactionalLimitsValidation.OUTPUT.class);
                this.result = output;
            } else {
                this.result = null;
            }
        } catch (Exception e) {
            System.debug('WS_TransactionalLimitsValidation.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }


    global with sharing class INPUT {
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
        global OriginalTransactionAmount originalTransactionAmount {get;set;} 
        @AuraEnabled
        global OriginalTransactionAmount originTransactionAmountBaseCurrency {get;set;} 
        global INPUT(){}
        global INPUT(String serviceId, String transactionDate, TransactionContract transactionContract, TransactionAmount transactionAmount, TransactionAmount transactionAmountBaseCurrency, String originaltransactionDate, OriginalTransactionAmount originalTransactionAmount, OriginalTransactionAmount originTransactionAmountBaseCurrency){
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
    global with sharing class TransactionContract {
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
    global with sharing class TransactionAmount {
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
    global with sharing class OriginalTransactionAmount {
        @AuraEnabled
        global String amount {get;set;} 
        @AuraEnabled
        global String tcurrency {get;set;} 
        global OriginalTransactionAmount(){}
        global OriginalTransactionAmount(String amount, String tcurrency){
            this.amount = amount;
            this.tcurrency = tcurrency;
        }
    }
    global with sharing class OUTPUT {
        @AuraEnabled
        global LimitsResponse limitsResponse {get;set;} 
        global OUTPUT(){}
        global OUTPUT(LimitsResponse limitsResponse){
            this.limitsResponse = limitsResponse;
        } 
    }
    global with sharing class LimitsResponse {
        @AuraEnabled
        global String limitsResult;
        @AuraEnabled
        global String codeLimitsResult;
        global LimitsResponse(){}
        global LimitsResponse(String limitsResult, String codeLimitsResult){
            this.limitsResult = limitsResult;
            this.codeLimitsResult = codeLimitsResult;
        }
    }
}