/*
    Author:         Andrea Martin
    Company:        Deloitte
    Description:    Makes a call to get the dominant currency 

    History:
    <Date>          <Author>            <Description>
    08/02/2021      Andrea Martin         Initial version
    */
global class WS_DominantCurrency {

    private String baseEndpoint;
    private String baseMethod;
    private String userId;
    private String currencyOrigin;
    private String currencyDestination;

    public WS_DominantCurrency(String userId,  String currencyOrigin, String currencyDestination) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_DominantCurrency'); //TODO: Revise endpoint value
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.userId = userId;
        this.currencyOrigin = currencyOrigin;
        this.currencyDestination = currencyDestination;
    }
    

    public OUTPUT execute(){
        WS_DominantCurrency.OUTPUT output;
        String inputJson = '';
        WS_DominantCurrency.INPUT input = new  WS_DominantCurrency.INPUT();
        WS_DominantCurrency.CurrencyPair currencyPair = null;
        List<WS_DominantCurrency.CurrencyPair> currencyPairList = new List<WS_DominantCurrency.CurrencyPair>();
         try { 
            if (String.isNotBlank(currencyOrigin) || String.isNotBlank(currencyDestination)) {
                currencyPair = new WS_DominantCurrency.CurrencyPair(currencyOrigin,currencyDestination);
                currencyPairList.add(currencyPair);
                input.currencyPairList = currencyPairList;
                System.debug('input: ' + input);
                inputJson = JSON.serialize(input, true);
            } else {
                throw new CustomException('Empty currencyOrigin or currencyDestination');
            }
    
            if (String.isNotBlank(userId)) {
                Map<String,String> extraHeaderParameters = new Map<String,String> ();
                extraHeaderParameters.put('X-Santander-Client-Id', this.userId);
            } else {
                throw new CustomException('Empty user Id');
            }
            
            String serviceResponse = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod);
            if (String.isNotBlank(serviceResponse)) {
                output = (WS_DominantCurrency.OUTPUT) JSON.deserialize(serviceResponse, WS_DominantCurrency.OUTPUT.class);
            } else {
                throw new CustomException('Error when consulting the dominant Currency.');
            }
            return output;
        }  catch (Exception e) {
            System.debug('WS_DominantCurrency.execute: ' + e.getMessage() + ', ' + ' in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
    }
    global with sharing class INPUT {
        @AuraEnabled
        global  List<CurrencyPair> currencyPairList {get;set;} 
        global INPUT(){}
    }

    global class CurrencyPair{
        @AuraEnabled
        global String currency1 {get;set;} 
        @AuraEnabled
        global String currency2 {get;set;} 
        global currencyPair(){}
        global currencyPair(String currencyOrigin,String currencyDestination){
            this.currency1 = currencyOrigin;
            this.currency2 = currencyDestination;
        }
    }
    /*
    global with sharing class OUTPUT {
        @AuraEnabled
        global  List<CurrencyPairListOutput> currencyPairListResponse {get;set;} 
        @AuraEnabled
        global List<Errors> errors {get;set;}   
        global OUTPUT(){}
    }
    global class CurrencyPairListOutput{
        @AuraEnabled
        global CurrencyPairOutput currencyPairResponse {get;set;} 
        global CurrencyPairListOutput(){}
        global CurrencyPairListOutput(CurrencyPairOutput currencyPairResponse){
            this.currencyPairResponse = currencyPairResponse;            
        }
    }
*/

    global with sharing class OUTPUT {
        @AuraEnabled
        global  List<CurrencyPairOutput> currencyPairListResponse {get;set;} 
        @AuraEnabled
        global List<Errors> errors {get;set;}   
        global OUTPUT(){}
    }
    
    global class CurrencyPairOutput{
        @AuraEnabled
        global String currency1 {get;set;}
        @AuraEnabled
        global String currency2 {get;set;} 
        @AuraEnabled        
        global String dominantCurrency {get;set;}
        global CurrencyPairOutput(){}
        global CurrencyPairOutput(String currencyOrigin,String currencyDestination, String dominantCurrency ){
            this.currency1 = currencyOrigin;
            this.currency2 = currencyDestination;
            this.dominantCurrency = dominantCurrency;
        }
    }

    global with sharing class Errors {
        @AuraEnabled
        global String code {get;set;}
        @AuraEnabled
        global String message {get;set;}
        @AuraEnabled
        global String level {get;set;}
        @AuraEnabled
        global String description {get;set;}
        global Errors(){}        
    }
}