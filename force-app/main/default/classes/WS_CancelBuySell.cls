/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Cancellation of a confirmed FX
Test Class:     TBD
History
<Date>			<Author>		<Description>
14/08/2020		Shahad Naji     Initial version (based on WS_CreatePaymentOperation)
----------------------------------------------------------------------------------*/
global class WS_CancelBuySell {

    private String result;
    private String baseEndpoint;
    private String baseMethod;
    private String tokenPlatform;
    private String tokenUser;
    private String integrationType;   
    private Integer timer;
    
    global WS_CancelBuySell (){
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_CancelBuySell');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
        this.timer = 25000;
    }
    
  
    
  
    
    global String getResult () {
        return this.result;
    }

    global String execute ( WRAPPER_PaymentDetail.OperationDetail paymentData){
        this.result = '';
        WS_CancelBuySell.INPUT input;
        String inputJson = '';
        String priceType = '';
        String sourceCurrency = '';
        String sourceAmount = null;
        String destinationCurrency = '';
        String operationReference = '';
        String country = '';
        String codigoBIC = '';
        String fx_countervalue_id = ''; //System Reference ID  FX  Format ISO 20022. A Countervalue reference has to be informed.
        try {
            if (paymentData != null) {
                if (paymentData.operationNominalFxDetails != null) {
                    if (paymentData.operationNominalFxDetails.priceType != null) {
                        priceType = 'ONI';//paymentData.operationNominalFxDetails.priceType;
                    }
                    if(paymentData.operationNominalFxDetails.fxCountervalueId != null){
                        fx_countervalue_id =paymentData.operationNominalFxDetails.fxCountervalueId;
                    }
                }
                if (paymentData.sourceCurrency != null) {
                    sourceCurrency = paymentData.sourceCurrency;
                }
                if(paymentData.amount != null){
                    sourceAmount = String.valueOf(paymentData.amount);
                }
                if (paymentData.beneficiaryCurrency != null) {
                    destinationCurrency = paymentData.beneficiaryCurrency;
                }
                if (paymentData.paymentId != null) {
                    operationReference = paymentData.paymentId;
                }
                if (paymentData.sourceData != null) {
                    if (paymentData.sourceData.country != null) {
                       country = paymentData.sourceData.country;
                    }
                    if (paymentData.sourceData.sourceAgent != null) {
                        if (paymentData.sourceData.sourceAgent.agentId != null) {
                            codigoBIC = paymentData.sourceData.sourceAgent.agentId;
                        }
                    }
                }
            }
            WS_CancelBuySell.BuyNominal buyNominal = new WS_CancelBuySell.BuyNominal(destinationCurrency);
            WS_CancelBuySell.SellNominal sellNominal = new WS_CancelBuySell.SellNominal(sourceAmount, sourceCurrency);
            WS_CancelBuySell.DataCancelConfirmFx dataCancelConfirmFx = new WS_CancelBuySell.DataCancelConfirmFx(priceType, buyNominal, sellNominal);
            input = new  WS_CancelBuySell.INPUT(dataCancelConfirmFx, operationReference);
            inputJson = JSON.serialize(input, true);
            String aux = this.baseEndpoint;
            String finalEndpoint = aux.replace('{counterValueId}', fx_countervalue_id);
            TokenInformation tokenInformation = new TokenInformation(country, this.tokenPlatform, this.tokenUser, null, codigoBIC);
            // Make the callout to the POST web service            
            String response = Global_IntegrationWrapper.launchHTTP(inputJson, finalEndpoint,  this.baseMethod, null, null, null, this.timer, tokenInformation);
            if (String.isNotBlank(response)) {
                this.result = 'OK'; 
            } else {
                this.result = 'KO'; 
            } 
        } catch (Exception e) {
            System.debug('WS_CancelBuySell.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        } 
        return this.result;
    }

    global with sharing class INPUT {        
        @AuraEnabled
        global DataCancelConfirmFx dataCancelConfirmFx {get;set;} 
        @AuraEnabled
        global String operationReference {get;set;}
        
        global INPUT () {
        }

        global INPUT (String operationReference) {
            this.operationReference = operationReference;
        }

        global INPUT (DataCancelConfirmFx dataCancelConfirmFx, String operationReference) {
            this.dataCancelConfirmFx = dataCancelConfirmFx;
            this.operationReference = operationReference;
        }
    }
    
    global class BuyNominal {
        @AuraEnabled
        global Double buyNominalAmount {get;set;} 
        @AuraEnabled
        global String buyNominalCurrency {get;set;} 
        
        global BuyNominal () {
        }

        global BuyNominal (String buyNominalCurrency) {
            this.buyNominalCurrency = buyNominalCurrency;
        }

        global BuyNominal (Double buyNominalAmount, String buyNominalCurrency) {
            this.buyNominalAmount = buyNominalAmount;
            this.buyNominalCurrency = buyNominalCurrency;
        }  
    }
    
    global class SellNominal {
        @AuraEnabled
        global String sellNominalAmount {get;set;} 
        @AuraEnabled
        global String sellNominalCurrency {get;set;} 
        
        global SellNominal () {
        }

        global SellNominal (String sellNominalCurrency) {
            this.sellNominalCurrency = sellNominalCurrency;
        }

        global SellNominal (String sellNominalAmount, String sellNominalCurrency) {
            this.sellNominalAmount = sellNominalAmount;
            this.sellNominalCurrency = sellNominalCurrency;
        }
    }
    
    global class DataCancelConfirmFx {
        @AuraEnabled
        global BuyNominal buyNominal {get;set;}
        @AuraEnabled
        global String priceType {get;set;}
        @AuraEnabled
        global SellNominal sellNominal {get;set;} 
        @AuraEnabled
        global String valueDateRequested {get;set;} 
        
        global DataCancelConfirmFx () {
        }

        global DataCancelConfirmFx (String priceType, BuyNominal buyNominal, SellNominal sellNominal) {
            this.priceType = priceType;
            this.buyNominal = buyNominal;
            this.sellNominal = sellNominal;
        }

        global DataCancelConfirmFx (BuyNominal buyNominal, String priceType, SellNominal sellNominal, String valueDateRequested) {
            this.buyNominal = buyNominal;
            this.priceType = priceType;
            this.sellNominal = sellNominal;
            this.valueDateRequested = valueDateRequested;
        }
    }
    
    global with sharing class OUTPUT {        
        global List<Errors> errors {get;set;}        
        global OUTPUT(){}      
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