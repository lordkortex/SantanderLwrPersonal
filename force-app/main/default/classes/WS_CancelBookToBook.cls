/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Execute Cancel Order Leaving the customer original accounting movements and by creation new cancel movements with the original movements in opposite sign and, If necessary, adjusting exchange currency differences
Test Class:     TBD
History
<Date>			<Author>		<Description>
12/08/2020		Shahad Naji     Initial version (based on WS_CreatePaymentOperation)
----------------------------------------------------------------------------------*/
global with sharing class WS_CancelBookToBook {
    
    private String result;
    private String baseEndpoint;
    private String baseMethod;
    private String integrationType;
    private String book_to_book_id; //Payment request ID for which you have requested status info
    
    global WS_CancelBookToBook(String book_to_book_id) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_CancelBookToBook');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.book_to_book_id = book_to_book_id;
    }
    
    global String getResult () {
        return this.result;
    }
    
    
    global String execute (String flowIndicator, String orderedBy){
        this.result = '';
        WS_CancelBookToBook.INPUT input;
        String inputJson = '';
        try {
            input = new  WS_CancelBookToBook.INPUT(flowIndicator, orderedBy);
            
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            inputJson = JSON.serialize(input, true);            
            
            // Generate the endpoint based on the book_to_book_id(paymentId)
            String finalEndpoint = this.baseEndpoint.replace('{book_to_book_id}', this.book_to_book_id);
            // Make the callout to the POST web service            
            String response = null;
            response = Global_IntegrationWrapper.launchHTTP(inputJson, finalEndpoint, this.baseMethod, extraHeaderParameters, 120000);
            System.debug('Result: ' + response);
            
            
            if (String.isNotBlank(response)) {
                WS_CancelBookToBook.OUTPUT output = (WS_CancelBookToBook.OUTPUT)JSON.deserialize(response, WS_CancelBookToBook.OUTPUT.class);  
                if(output.bookToBookId != null){
                   this.result = 'OK'; 
                }
                //this.result = output;
            } else {
                this.result = 'KO'; 
            }
            
        }catch (Exception e) {
            System.debug('WS_CancelBookToBook.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        
        return this.result;
    }
    
    global with sharing class INPUT {
        @AuraEnabled
        global String flowIndicator {get;set;}
        @AuraEnabled
        global String orderedBy {get;set;} 
        @AuraEnabled
        global FxValueDetailsNominalNoMargin fxValueDetailsNominalNoMargin {get;set;} 
        @AuraEnabled
        global FxValueDetailsNominalNoMargin fxValueDetailsFeeNoMargin {get;set;} 
        @AuraEnabled
        global FundMovementPricesDataList fundMovementPricesDataList {get;set;} 
        
        global INPUT(){}
        global INPUT (String flowIndicator, String orderedBy){
            this.flowIndicator = flowIndicator;
            this.orderedBy = orderedBy;
        }
        global INPUT (String flowIndicator, String orderedBy, FxValueDetailsNominalNoMargin fxValueDetailsNominalNoMargin, FxValueDetailsNominalNoMargin fxValueDetailsFeeNoMargin, FundMovementPricesDataList fundMovementPricesDataList) {
            this.flowIndicator = flowIndicator;
            this.orderedBy = orderedBy;
            this.fxValueDetailsNominalNoMargin = fxValueDetailsNominalNoMargin;
            this.fxValueDetailsFeeNoMargin = fxValueDetailsFeeNoMargin;
            this.fundMovementPricesDataList = fundMovementPricesDataList;
        }      
    }
    
    global with sharing class ConceptsList {
        @AuraEnabled
        global String conceptId {get;set;}
        @AuraEnabled
        global String conceptName {get;set;}
        @AuraEnabled
        global SpecialPrice specialPrice {get;set;}
        @AuraEnabled
        global StandardPrice standardPrice {get;set;}
        @AuraEnabled
        global ConceptAmount conceptAmount {get;set;}
        
        global ConceptsList(){}
        global ConceptsList(String conceptId, String conceptName, SpecialPrice specialPrice, StandardPrice standardPrice, ConceptAmount conceptAmount){
            this.conceptId=conceptId;
            this.conceptName=conceptName;
            this.specialPrice=specialPrice;
            this.standardPrice=standardPrice;
            this.conceptAmount=conceptAmount;
        }
    }
    
    
    global with sharing class ConceptAmount {
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String fixing {get;set;}
        global ConceptAmount(){}
        global ConceptAmount(Double amount, String tcurrency, String fixing){
            this.amount=amount;
            this.tcurrency=tcurrency;
            this.fixing=fixing;
        }
    }    
    
    global with sharing class FxValueDetailsNominalNoMargin {
        @AuraEnabled
        global String fxContravalueId {get;set;} 
        @AuraEnabled
        global FxCounterpaymentAmount fxCounterpaymentAmount {get;set;} 
        @AuraEnabled
        global String fxExecutionDate {get;set;} 
        @AuraEnabled
        global String fxValueDate {get;set;} 
        @AuraEnabled
        global Double fxExchangeRate {get;set;} 
        
        global FxValueDetailsNominalNoMargin(){}
        global FxValueDetailsNominalNoMargin(String fxContravalueId,FxCounterpaymentAmount fxCounterpaymentAmount, String fxExecutionDate, String fxValueDate, Double fxExchangeRate){
            this.fxContravalueId=fxContravalueId;
            this.fxCounterpaymentAmount=fxCounterpaymentAmount;
            this.fxExecutionDate=fxExecutionDate;
            this.fxValueDate=fxValueDate;
            this.fxExchangeRate=fxExchangeRate;
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
		global List<SpecialTiersList> standardTiersList {get;set;} 
        global StandardPrice(){}
        global StandardPrice(List<SpecialTiersList> standardTiersList){
            this.standardTiersList=standardTiersList;
        }
	}
    
    global with sharing class SpecialTiersList {
        @AuraEnabled
		global Double amountTier {get;set;}
        @AuraEnabled
		global String amountTierType {get;set;}
        @AuraEnabled
		global FixedRatePrice fixedRatePrice {get;set;}
        @AuraEnabled
		global FxCounterPaymentAmount fixedAmountPrice {get;set;}
        global SpecialTiersList(){}
        global SpecialTiersList(Double amountTier, String amountTierType, FixedRatePrice fixedRatePrice, FxCounterPaymentAmount fixedAmountPrice){
            this.amountTier=amountTier;
            this.amountTierType=amountTierType;
            this.fixedRatePrice=fixedRatePrice;
            this.fixedAmountPrice=fixedAmountPrice;
        }
	}
    
    global with sharing  class FixedRatePrice {
        @AuraEnabled
        global Double rate {get;set;} 
        @AuraEnabled
        global Double minimumAmount {get;set;} 
        @AuraEnabled
        global Double maximumAmount {get;set;} 
        @AuraEnabled
        global String tcurrency {get;set;} 
        
        global FixedRatePrice(){}
        
        global FixedRatePrice(Double rate, Double minimumAmount, Double maximumAmount, String tcurrency){
            this.rate=rate;
            this.minimumAmount=minimumAmount;
            this.maximumAmount=maximumAmount;
            this.tcurrency=tcurrency;
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
    
    global with sharing  class FxCounterpaymentAmount {
        @AuraEnabled
        global String tcurrency {get;set;} 
        @AuraEnabled
        global Double amount {get;set;}
        
        global FxCounterpaymentAmount(){}
        global FxCounterpaymentAmount(String tcurrency, Double amount){
            this.tcurrency=tcurrency;
            this.amount=amount;
        }           
    }
    
    global  with sharing class CurrencyDetails {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String currencyName {get;set;}
        @AuraEnabled
        global List<ConceptsList> conceptsList {get;set;}
        
        global CurrencyDetails(){}
        global CurrencyDetails(String tcurrency, String currencyName, List<ConceptsList> conceptsList){
            this.tcurrency=tcurrency;
            this.currencyName=currencyName;
            this.conceptsList=conceptsList;
        }
        
    }
    
    global with sharing class OUTPUT {
        @AuraEnabled
        global RequestOriginalData requestOriginalData {get;set;}
        @AuraEnabled
        global String bookToBookId {get;set;}
        @AuraEnabled
        global String bookToBookStatus {get;set;}
        @AuraEnabled
        global String valueDate {get;set;}
        @AuraEnabled
        global FxCounterPaymentAmount sourceTotalAmount {get;set;}
        
        global OUTPUT(){}
        global OUTPUT(RequestOriginalData requestOriginalData, String bookToBookId, String bookToBookStatus, String valueDate, FxCounterPaymentAmount sourceTotalAmount){
            this.requestOriginalData=requestOriginalData;
            this.bookToBookId=bookToBookId;
            this.bookToBookStatus=bookToBookStatus;
            this.valueDate=valueDate;
            this.sourceTotalAmount=sourceTotalAmount;
        }
    }
    
    global with sharing class RequestOriginalData {
        @AuraEnabled
        global String flowIndicator {get;set;}
        @AuraEnabled
        global String orderedBy {get;set;}
        @AuraEnabled
        global FxValueDetailsNominalNoMargin fxValueDetailsNominalNoMargin {get;set;}
        @AuraEnabled
        global FxValueDetailsNominalNoMargin fxValueDetailsFeeNoMargin {get;set;}
        @AuraEnabled
        global FundMovementPricesDataList fundMovementPricesDataList {get;set;}
        
        global RequestOriginalData(){}
        global RequestOriginalData(String flowIndicator, String orderedBy, FxValueDetailsNominalNoMargin fxValueDetailsNominalNoMargin, FxValueDetailsNominalNoMargin fxValueDetailsFeeNoMargin, FundMovementPricesDataList fundMovementPricesDataList){
            this.flowIndicator=flowIndicator;
            this.orderedBy=orderedBy;
            this.fxValueDetailsNominalNoMargin=fxValueDetailsNominalNoMargin;
            this.fxValueDetailsFeeNoMargin=fxValueDetailsFeeNoMargin;
            this.fundMovementPricesDataList=fundMovementPricesDataList;
        }
    }
    
    global with sharing class SourceTotalAmount {
        @AuraEnabled
		global String tcurrency {get;set;}
        @AuraEnabled
		global Double amount {get;set;}
        
        global SourceTotalAmount(){}
        global SourceTotalAmount(String tcurrency, Double amount){
            this.tcurrency=tcurrency;
            this.amount=amount;
        }
	}
    
   
    

    
}