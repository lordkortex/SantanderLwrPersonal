/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Performs the cancellation of an order given its operation_id.
Test Class:     TBD
History
<Date>			<Author>		<Description>
13/08/2020		Shahad Naji     Initial version (based on WS_CreatePaymentOperation)
----------------------------------------------------------------------------------*/
global class WS_CancelPaymentOrchestrator {
    
    private String result;
    private String baseEndpoint;
    private String baseMethod;
    private String integrationType;
    private String operation_id;
    
    global WS_CancelPaymentOrchestrator (String operation_id){
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_CancelPaymentOrchestrator');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.operation_id = operation_id; //Payment request ID for which you have requested status info.
    }
    global String getResult () {
        return this.result;
    }
    
     
    global String execute (String flowIndicator, String orderedBy){
        this.result = '';
        WS_CancelPaymentOrchestrator.INPUT input;
        String inputJson = '';
        try {
            input = new  WS_CancelPaymentOrchestrator.INPUT(flowIndicator, orderedBy);
            System.debug('INPUT: ' + input);
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            inputJson = JSON.serialize(input, true);
            System.debug('Input JSON: ' + inputJson);
            
            // Generate the endpoint based on the book_to_book_id(paymentId)
            String finalEndpoint = this.baseEndpoint.replace('{operation_id}', this.operation_id);
            // Make the callout to the POST web service            
            String response = null;
            response = Global_IntegrationWrapper.launchHTTP(inputJson, finalEndpoint, this.baseMethod, extraHeaderParameters);
            System.debug('Result: ' + response);
            
            
            if (String.isNotBlank(response)) {
                WS_CancelPaymentOrchestrator.OUTPUT output = (WS_CancelPaymentOrchestrator.OUTPUT)JSON.deserialize(response, WS_CancelPaymentOrchestrator.OUTPUT.class);  
                if(output.bookToBookId != null){
                   this.result = 'OK'; 
                }
                //this.result = output;
            } else {
                this.result = 'KO'; 
            }
            
        }catch (Exception e) {
            System.debug('WS_CancelPaymentOrchestrator.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        
        return this.result;
    }
    
    
    
    
    global with sharing class INPUT {
        
        @AuraEnabled
        global String flowIndicator {get;set;}
        @AuraEnabled
        global FundMovementPricesDataList fundMovementPricesDataList {get;set;}
        @AuraEnabled
        global FxValueDetailsFeeNoMargin fxValueDetailsFeeNoMargin {get;set;}
        @AuraEnabled
        global FxValueDetailsNominalNoMargin fxValueDetailsNominalNoMargin {get;set;}
        @AuraEnabled
        global String orderedBy {get;set;}
        
        global INPUT(){}
        global INPUT(String flowIndicator, String orderedBy){
            this.flowIndicator=flowIndicator;
            this.orderedBy=orderedBy;
        }
        global INPUT(String flowIndicator, FundMovementPricesDataList fundMovementPricesDataList, FxValueDetailsFeeNoMargin fxValueDetailsFeeNoMargin, FxValueDetailsNominalNoMargin fxValueDetailsNominalNoMargin, String orderedBy){
            this.flowIndicator=flowIndicator;
            this.fundMovementPricesDataList=fundMovementPricesDataList;
            this.fxValueDetailsFeeNoMargin=fxValueDetailsFeeNoMargin;
            this.fxValueDetailsNominalNoMargin=fxValueDetailsNominalNoMargin;
            this.orderedBy=orderedBy;
        }
    }
    
    
    global with sharing class OUTPUT {
        
        global String bookToBookId {get;set;}
        global String bookToBookStatus {get;set;}
        global RequestOriginalData requestOriginalData {get;set;}
        global SourceTotalAmount sourceTotalAmount {get;set;}
        global String valueDate {get;set;}
        
        global OUTPUT(){}
        global OUTPUT(String bookToBookId, String bookToBookStatus, RequestOriginalData requestOriginalData, SourceTotalAmount sourceTotalAmount, String valueDate){
            this.bookToBookId=bookToBookId;
            this.bookToBookStatus=bookToBookStatus;
            this.requestOriginalData=requestOriginalData;
            this.sourceTotalAmount=sourceTotalAmount;
            this.valueDate=valueDate;  
        } 
    }
    global with sharing class Tiers {
        @AuraEnabled
        global Double amountTier {get;set;}
        @AuraEnabled
        global String amountTierType {get;set;}
        @AuraEnabled
        global FixedAmountPrice fixedAmountPrice {get;set;}
        @AuraEnabled
        global FixedRatePrice fixedRatePrice {get;set;}
        
        global Tiers(){}
        global Tiers(Double amountTier, String amountTierType, FixedAmountPrice fixedAmountPrice, FixedRatePrice fixedRatePrice){
            this.amountTier=amountTier;
            this.amountTierType=amountTierType;
            this.fixedAmountPrice=fixedAmountPrice;
            this.fixedRatePrice=fixedRatePrice;
        }
    } 
    
    global with sharing class ConceptsList {
        @AuraEnabled
        global Concepts concepts {get;set;}
        
        global ConceptsList(){}
        global ConceptsList(Concepts concepts){
            this.concepts=concepts;
        }
    }
    
    global with sharing class SpecialPrice {
        @AuraEnabled
        global String specialPriceLevel {get;set;}
        @AuraEnabled
        global List<SpecialTiersList> specialTiersList {get;set;}
        
        global SpecialPrice(){}
        global SpecialPrice(String specialPriceLevel, List<SpecialTiersList> specialTiersList){
            this.specialPriceLevel=specialPriceLevel;
            this.specialTiersList=specialTiersList;
        } 
    }
    
    global with sharing class StandardPrice {
        @AuraEnabled
        global SpecialTiersList standardTiersList {get;set;}
        
        global StandardPrice(){}
        global StandardPrice(SpecialTiersList standardTiersList){
            this.standardTiersList=standardTiersList;
        }
    }
    
    global with sharing class SpecialTiersList {
        @AuraEnabled
        global Tiers tiers {get;set;}
        
        global SpecialTiersList(){}
        global SpecialTiersList(Tiers tiers){
            this.tiers=tiers;
        } 
    }
    
    global with sharing class FixedAmountPrice {
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global FixedAmountPrice(){}
        global FixedAmountPrice(Double amount, String tcurrency){
            this.amount=amount;
            this.tcurrency=tcurrency;
        } 
    }
    
    global with sharing class FixedRatePrice {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double maximumAmount {get;set;}
        @AuraEnabled
        global Double minimumAmount {get;set;}
        @AuraEnabled
        global Double rate {get;set;}
        
        global FixedRatePrice(){}
        global FixedRatePrice(String tcurrency, Double maximumAmount, Double minimumAmount, Double rate){
            this.tcurrency=tcurrency;
            this.maximumAmount=maximumAmount;
            this.minimumAmount=minimumAmount;
            this.rate=rate;
        }
    }
    
    global with sharing class FundMovementPricesDataList {
        @AuraEnabled
        global CurrencyDetails currencyDetails {get;set;}
        
        global FundMovementPricesDataList(){}
        global FundMovementPricesDataList(CurrencyDetails currencyDetails){
            this.currencyDetails=currencyDetails;
        }
    }
    
    global with sharing class CurrencyDetails {
        @AuraEnabled
        global List<ConceptsList> conceptsList {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String currencyName {get;set;}
        
        global CurrencyDetails(){}
        global CurrencyDetails(List<ConceptsList> conceptsList, String tcurrency, String currencyName){
            this.conceptsList=conceptsList;
            this.tcurrency=tcurrency;
            this.currencyName=currencyName;
        }
    }
    
    global with sharing class Concepts {
        @AuraEnabled
        global ConceptAmount conceptAmount {get;set;}
        @AuraEnabled
        global String conceptId {get;set;}
        @AuraEnabled
        global String conceptName {get;set;}
        @AuraEnabled
        global SpecialPrice specialPrice {get;set;}
        @AuraEnabled
        global List<StandardPrice> standardPrice {get;set;}
        
        global Concepts(){}
        global Concepts(ConceptAmount conceptAmount, String conceptId, String conceptName, SpecialPrice specialPrice, List<StandardPrice> standardPrice){
            this.conceptAmount=conceptAmount;
            this.conceptId=conceptId;
            this.conceptName=conceptName;
            this.specialPrice=specialPrice;
            this.standardPrice=standardPrice;
        }        
    }
    
    global with sharing class ConceptAmount {
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double fixing {get;set;}
        
        global ConceptAmount(){}
        global ConceptAmount(Double amount, String tcurrency, Double fixing){
            this.amount=amount;
            this.tcurrency=tcurrency;
            this.fixing=fixing;
        }
    }
    
    global with sharing class FxValueDetailsNominalNoMargin {
        @AuraEnabled
        global Double fxContravalueId {get;set;}
        @AuraEnabled
        global FixedAmountPrice fxCounterpaymentAmount {get;set;}
        @AuraEnabled
        global Double fxExchangeRate {get;set;}
        @AuraEnabled
        global String fxExecutionDate {get;set;}
        @AuraEnabled
        global String fxValueDate {get;set;}
        
        global FxValueDetailsNominalNoMargin(){}
        global FxValueDetailsNominalNoMargin(Double fxContravalueId, FixedAmountPrice fxCounterpaymentAmount, Double fxExchangeRate, String fxExecutionDate, String fxValueDate){
            this.fxContravalueId=fxContravalueId;
            this.fxCounterpaymentAmount=fxCounterpaymentAmount;
            this.fxExchangeRate=fxExchangeRate;
			this.fxExecutionDate=fxExecutionDate;
            this.fxValueDate=fxValueDate;
        }
    }
    
    global with sharing class FxValueDetailsFeeNoMargin {
        @AuraEnabled
        global Double fxContravalueId {get;set;}
        @AuraEnabled
        global FixedAmountPrice fxCounterpaymentAmount {get;set;}
        @AuraEnabled
        global Double fxExchangeRate {get;set;}
        @AuraEnabled
        global String fxExecutionDate {get;set;}
        @AuraEnabled
        global String fxValueDate {get;set;}
        
        global FxValueDetailsFeeNoMargin(){}
        global FxValueDetailsFeeNoMargin(Double fxContravalueId, FixedAmountPrice fxCounterpaymentAmount, Double fxExchangeRate, String fxExecutionDate, String fxValueDate){
            this.fxContravalueId=fxContravalueId;
            this.fxCounterpaymentAmount=fxCounterpaymentAmount;
            this.fxExchangeRate=fxExchangeRate;
            this.fxExecutionDate=fxExecutionDate;
            this.fxValueDate=fxValueDate;
        }
    }
    
    global with sharing class RequestOriginalData {
        @AuraEnabled
        global String flowIndicator {get;set;}
        @AuraEnabled
        global FundMovementPricesDataList fundMovementPricesDataList {get;set;}
        @AuraEnabled
        global FxValueDetailsFeeNoMargin fxValueDetailsFeeNoMargin {get;set;}
        @AuraEnabled
        global FxValueDetailsNominalNoMargin fxValueDetailsNominalNoMargin {get;set;}
        @AuraEnabled
        global String orderedBy {get;set;}
        
        global RequestOriginalData(){}
        global RequestOriginalData(String flowIndicator, FundMovementPricesDataList fundMovementPricesDataList, FxValueDetailsFeeNoMargin fxValueDetailsFeeNoMargin, FxValueDetailsNominalNoMargin fxValueDetailsNominalNoMargin, String orderedBy){
            this.flowIndicator=flowIndicator;
            this.fundMovementPricesDataList=fundMovementPricesDataList;
            this.fxValueDetailsFeeNoMargin=fxValueDetailsFeeNoMargin;
            this.fxValueDetailsNominalNoMargin=fxValueDetailsNominalNoMargin;
            this.orderedBy=orderedBy;
        }
    }
    
    global with sharing class SourceTotalAmount {
        @AuraEnabled
		global Double amount {get;set;}
        @AuraEnabled
		global String tcurrency {get;set;}
        
        global SourceTotalAmount(){}
        global SourceTotalAmount(Double amount, String tcurrency){
            this.amount=amount;
            this.tcurrency=tcurrency;
        }
	}
}