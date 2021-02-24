global class WS_STR_SignatureRules {
    global static String baseEndpoint;
    global static String baseMethod;
    global static String tokenPlatform;
    global static String tokenUser;

    global static String queryParams;
    global static String finalEndpoint;

    global static ReturnValue getRules (WS_STR_SignatureRules.INPUT input) {
       	ReturnValue response;
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_STR_SignatureRules');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = 'GET';
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
        try {
            queryParams = '';
            finalEndpoint = '';
            getParameters('ruleId', input.ruleId);
            getParameters('companyId', input.companyId);
            getParameters('currency', input.tcurrency);
            getParameters('serviceId', input.serviceId);
            getParameters('amountFrom', input.amountFrom);
            getParameters('amountTo', input.amountTo);
            if (String.isNotBlank(queryParams)) {
                finalEndpoint = baseEndpoint + '?' + queryParams;
            }
            Map<String,String> extraHeaders = new Map<String,String>();
            Global_IntegrationWrapper.statusCode = '';
            String res = Global_IntegrationWrapper.launchHTTP(null, finalEndPoint, baseMethod, extraHeaders);
            Map<String, Object> value = new Map<String, Object>();
            value.put('statusCode', Global_IntegrationWrapper.statusCode);
            if (Global_IntegrationWrapper.statusCode == '200'){
                value.put('OUTPUT', getOutput(res));
            }
            else{
                value.put('OUTPUT', res);
            }         
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.getRules: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return response;
    }
    
    global static ReturnValue postRules (String body){
        ReturnValue response; 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_STR_SignatureRules');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = 'POST';
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
        try {            
            finalEndpoint = baseEndpoint;           
            Map<String,String> extraHeaders = new Map<String,String>();
            Global_IntegrationWrapper.statusCode = '';
            String res = Global_IntegrationWrapper.launchHTTP(body, finalEndPoint, baseMethod, extraHeaders);
            Map<String, Object> value = new Map<String, Object>();
            value.put('statusCode', Global_IntegrationWrapper.statusCode);
            value.put('OUTPUT', res);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.postRule: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return response;        
    }
    
	global static ReturnValue patchRule (WS_STR_SignatureRules.INPUT input, String body) {
		ReturnValue response; 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_STR_SignatureRules');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = 'PATCH';
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
        try {
            queryParams = '';
            finalEndpoint = baseEndpoint;
            getParameters('ruleId', input.ruleId);
            getParameters('amountFrom', input.amountFrom);
            getParameters('amountTo', input.amountTo);
            if (String.isNotBlank(queryParams)) {
                finalEndpoint = baseEndpoint + '?' + queryParams;
            }
            Map<String,String> extraHeaders = new Map<String,String>();
            Global_IntegrationWrapper.statusCode = '';
            String res = Global_IntegrationWrapper.launchHTTP(body, finalEndPoint, baseMethod, extraHeaders);
            Map<String, Object> value = new Map<String, Object>();
            value.put('statusCode', Global_IntegrationWrapper.statusCode);
            value.put('OUTPUT', res);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.patchRule: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return response;
    }

    global static ReturnValue deleteRule (WS_STR_SignatureRules.INPUT input) {
		ReturnValue response; 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_STR_SignatureRules');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = 'DELETE';
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
        try {
            queryParams = '';
            finalEndpoint = baseEndpoint;
            getParameters('ruleId', input.ruleId);
            if (String.isNotBlank(queryParams)) {
                finalEndpoint = baseEndpoint + '?' + queryParams;
            }
            Map<String,String> extraHeaders = new Map<String,String>();
            Global_IntegrationWrapper.statusCode = '';
            String res = Global_IntegrationWrapper.launchHTTP(null, finalEndPoint, baseMethod, extraHeaders);
            Map<String, Object> value = new Map<String, Object>();
            value.put('statusCode', Global_IntegrationWrapper.statusCode);
            value.put('OUTPUT', res);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.deleteRule: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return response;
    }
    
    private static void getParameters (String fieldName, String field) {
        if (String.isNotBlank(fieldName) && String.isNotBlank(field)) {
            if (String.isNotBlank(queryParams) && queryParams.substring(queryParams.length() - 1, queryParams.length()) != '&') {
                queryParams = queryParams + '&';
            }
            queryParams = queryParams + fieldName + '=' + field;
        }
    }

    global static WS_STR_SignatureRules.OUTPUT getOutput (String response) {
        OUTPUT res = null;
        try {
           res = (WS_STR_SignatureRules.OUTPUT) JSON.deserialize(response, WS_STR_SignatureRules.OUTPUT.class);
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.getOutput: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return res;
    }
    
	global with sharing class INPUT {
		global String ruleId {get;set;}
		global String companyId {get;set;}
		global String tcurrency {get;set;}
		global String serviceId {get;set;}
		global String amountFrom {get;set;}
		global String amountTo {get;set;}

        global INPUT () {
        }
    }

    global with sharing class OUTPUT {
		global List<ResponseStructure> responseStructure {get;set;}
        
        global OUTPUT () {
        }
    }
    
    global with sharing class ResponseStructure {
		global String ruleId {get;set;}
        global String companyId {get;set;}
        global String tcurrency {get;set;}
		global String serviceId {get;set;}
        global Double amountFrom {get;set;}
        global Double amountTo {get;set;}
		global String businessGroup {get;set;}
        global String channel {get;set;}
        global String contract {get;set;}
        global String cmc {get;set;}
        global List<SignerGroup> LevelSignersList {get;set;}
        
        global ResponseStructure () {
        }
    }
    
    global with sharing class SignerGroup {
		global String groupId {get;set;}
        global String level {get;set;}
        global Integer signsRequired {get;set;}
        global Integer signersRequired {get;set;}
              
        global SignerGroup () {
        }
    }
    
    global with sharing class postBODY {
		global String businessGroup {get;set;}
        global String customerId {get;set;}       
		global String serviceId {get;set;}
        global String tcurrency {get;set;}		
        global String channel {get;set;}
        global String contract {get;set;}
        global String cmc {get;set;}
        global List<RuleList> ruleList {get;set;}
        
        global postBODY () {          
        }
    }
    
    global with sharing class RuleList {    
        global Double amountFrom {get;set;}
        global Double amountTo {get;set;}
        global List<SignerGroup> levelList {get;set;}
        
    	global RuleList () {          
        }
    }
    
    global with sharing class patchBODY {
        global List<SignerGroup> LevelSignersList {get;set;}
        
        global patchBODY () {          
        }
    }
}