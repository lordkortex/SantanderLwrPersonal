/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Fraud checking: API provides a positive/negative/pending answer for a transaction. It indicates whether it could be suspicious or fraud or it is genuine. Platform invoking API Fraud will stop the transaction or allow it, respectively, according to this answer. 

Test Class:     TBD
History
<Date>			<Author>		<Description>
14/12/2020		Shahad Naji     Initial version (based on WS_CreatePaymentOperation)
----------------------------------------------------------------------------------*/
global class WS_Fraud {
    
    private String baseEndpoint;
    private String baseMethod;
    private String tokenPlatform;
    private String tokenUser;
    
    public WS_Fraud() {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_Fraud'); //TODO: Revise endpoint value
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
    }

    public OUTPUT execute (String fraudId, String referenceId, String customerId, String operationType, String operationSubtype, String callType, WRAPPER_PaymentMetaData metaData, Map<String, String> navigatorInfo, String country, String codigoBic) {
        WS_Fraud.OUTPUT output;
        String inputJson = '';
        WS_Fraud.INPUT input;
        WS_Fraud.FraudValidateRequest fraudValidateRequest = null;
        try {
            if (String.isNotBlank(operationType) && String.isNotBlank(operationSubtype) && metaData != null) {
                fraudValidateRequest = new WS_Fraud.FraudValidateRequest(fraudId, referenceId, customerId, operationType, operationSubtype, callType, metaData);
                input = new  WS_Fraud.INPUT(fraudValidateRequest);
                inputJson = JSON.serialize(input, true);
                Map<String, String> extraHeaderParameters = new Map<String, String>();
                extraHeaderParameters.put('Access-Channel', 'web');
                extraHeaderParameters.put('Global-Payment-Id', String.isNotBlank(referenceId) ? referenceId : '');
                extraHeaderParameters.put('Device-Info-Token', ServiceDeviceInfo.getDeviceInfo(navigatorInfo, this.baseMethod));
                String response = null;
                TokenInformation tokenInformation = new TokenInformation(country, this.tokenPlatform, this.tokenUser, null, codigoBic);
                response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters, null, null, 25000, tokenInformation);
                if (String.isNotBlank(response)) {
                    output = (WS_Fraud.OUTPUT)JSON.deserialize(response, WS_Fraud.OUTPUT.class);
                    if (output.fraudValidateResponse == null) {
                        output = null;
                    }
                    if (output.errors != null) {
                        output = null;
                    }
                } else {
                   output = null;
                }
            } else {
                output = null;
            }
        } catch (Exception e) {
            System.debug('WS_Fraud.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return output;
    }

    
    public OUTPUT execute(String fraudId, String referenceId, String customerId, String operationType, String operationSubtype, String callType, WRAPPER_PaymentMetaData metaData, Map<String, String> navigatorInfo){
        WS_Fraud.OUTPUT output;
        String inputJson = '';
        WS_Fraud.INPUT input;
        WS_Fraud.FraudValidateRequest fraudValidateRequest = null;
        try{
            if(String.isNotBlank(operationType) && String.isNotBlank(operationSubtype) && metaData != null){
                fraudValidateRequest = new WS_Fraud.FraudValidateRequest(fraudId, referenceId, customerId, operationType, operationSubtype, callType, metaData);
                input = new  WS_Fraud.INPUT(fraudValidateRequest);
                inputJson = JSON.serialize(input, true);
                
                Map<String, String> extraHeaderParameters = new Map<String, String>();
                extraHeaderParameters.put('Access-Channel', 'web');
                extraHeaderParameters.put('Global-Payment-Id', String.isNotBlank(referenceId) ? referenceId : '');
                extraHeaderParameters.put('Device-Info-Token', ServiceDeviceInfo.getDeviceInfo(navigatorInfo, this.baseMethod));

                String response = null;
                response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod,extraHeaderParameters);
                if(String.isNotBlank(response)){
                    output = (WS_Fraud.OUTPUT)JSON.deserialize(response, WS_Fraud.OUTPUT.class);
                    if(output.fraudValidateResponse == null){
                        output = null;
                    }
                    if(output.errors != null){
                        output = null;
                    }
                }else{
                   output = null; 
                }
            }else{
                output = null;
            }           
        } catch (Exception e) {
            System.debug('WS_Fraud.execute: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return output;
    }
    
    global with sharing class INPUT {
        @AuraEnabled
        global FraudValidateRequest fraudValidateRequest {get;set;} 
        global INPUT(){}
        global INPUT(FraudValidateRequest fraudValidateRequest){
            this.fraudValidateRequest = fraudValidateRequest;            
        }
    }
    global class FraudValidateRequest{
        @AuraEnabled
        global String fraudId {get;set;} 
        @AuraEnabled
        global String referenceId {get;set;} 
        @AuraEnabled
        global String customerId {get;set;} 
        @AuraEnabled
        global String operationType {get;set;} 
        @AuraEnabled
        global String operationSubtype {get;set;} 
        @AuraEnabled
        global String callType {get;set;} 
        @AuraEnabled
        global WRAPPER_PaymentMetaData metaData {get;set;} 
        global FraudValidateRequest(){}
        global FraudValidateRequest(String fraudId, String referenceId, String customerId, String operationType, String operationSubtype, String callType, WRAPPER_PaymentMetaData metaData){
            this.fraudId = fraudId;
            this.referenceId = referenceId;
            this.customerId = customerId;
            this.operationType = operationType;
            this.operationSubtype = operationSubtype;
            this.callType = callType;
            this.metaData = metaData;
        }
    }
    global with sharing class OUTPUT {
        //header 
        @AuraEnabled
        global FraudValidateResponse fraudValidateResponse {get;set;} 
        @AuraEnabled
        global List<Errors> errors {get;set;}   
        global OUTPUT(){}
    }
    
    global class FraudValidateResponse{
        @AuraEnabled
        global String fraudId {get;set;} 
        @AuraEnabled
        global String referenceId {get;set;} 
        @AuraEnabled
        global String customerId {get;set;} 
        @AuraEnabled
        global String operationType {get;set;} 
        @AuraEnabled
        global String operationSubtype {get;set;} 
        @AuraEnabled
        global String callType {get;set;} 
        @AuraEnabled
        global  WRAPPER_PaymentMetaData metaData {get;set;} 
        @AuraEnabled
        global String status {get;set;} 
        @AuraEnabled
        global Double score {get;set;} 
        global FraudValidateResponse(){}
        global FraudValidateResponse(String fraudId, String referenceId, String customerId, String operationType, String operationSubtype, String callType, WRAPPER_PaymentMetaData metaData, String status, Double score){
            this.fraudId = fraudId;
            this.referenceId = referenceId;
            this.customerId = customerId;
            this.operationType = operationType;
            this.operationSubtype = operationSubtype;
            this.callType = callType;
            this.metaData = metaData;
            this.status = status;
            this.score = score;
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