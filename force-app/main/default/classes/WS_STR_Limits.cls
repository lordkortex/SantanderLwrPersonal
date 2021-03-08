global class WS_STR_Limits {
    global static String baseEndpoint;
    global static String baseMethod;
    global static String tokenPlatform;
    global static String tokenUser;

    global static String queryParams;
    global static String finalEndpoint;

    global static WS_STR_Limits.OUTPUT getLimits (WS_STR_Limits.INPUT input) {
        OUTPUT res = null; 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_STR_Limits');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = 'GET';
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
        try {
            queryParams = '';
            finalEndpoint = '';
            getParameters('customerId', input.customerId);
            getParameters('businessGroup', input.businessGroup);
            getParameters('currency', input.tcurrency);
            getParameters('serviceId', input.serviceId);
            getParameters('status', input.status);
            if (String.isNotBlank(queryParams)) {
                finalEndpoint = baseEndpoint + '?' + queryParams;
            }
            Map<String,String> extraHeaders = new Map<String,String>();
            String response = Global_IntegrationWrapper.launchHTTP(null, finalEndPoint, baseMethod, extraHeaders);
            res = getOutput(response);
        } catch (Exception e) {
            System.debug('WS_STR_Limits.getLimits: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return res;
    }

	global static Boolean updateLimit (String body, String method) {
		Boolean res = null; 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_STR_Limits');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = method;
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
        try {
            Map<String,String> extraHeaders = new Map<String,String>();
            String response = Global_IntegrationWrapper.launchHTTP(body, baseEndpoint, baseMethod, extraHeaders);
            if(response.contains('errors')){
                res = false;
            }
            else {
                res = true;
            }
        } catch (Exception e) {
            System.debug('WS_STR_Limits.updateLimit: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return res;
    }
    
    private static void getParameters (String fieldName, String field) {
        if (String.isNotBlank(fieldName) && String.isNotBlank(field)) {
            if (String.isNotBlank(queryParams) && queryParams.substring(queryParams.length() - 1, queryParams.length()) != '&') {
                queryParams = queryParams + '&';
            }
            queryParams = queryParams + fieldName + '=' + field;
        }
    }

    global static WS_STR_Limits.OUTPUT getOutput (String response) {
        OUTPUT res = null;
        try {
           res = (WS_STR_Limits.OUTPUT) JSON.deserialize(response, WS_STR_Limits.OUTPUT.class);
        } catch (Exception e) {
            System.debug('WS_STR_Limits.getOutput: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return res;
    }
    
	global with sharing class INPUT {
		global String customerId {get;set;}
		global String businessGroup {get;set;}
		global String tcurrency {get;set;} 
		global String serviceId {get;set;}
		global Double amountFrom {get;set;}
        global Double amountTo {get;set;}
        global String status {get;set;}

        global INPUT () {
        }
    }

    global with sharing class OUTPUT {
		global List<OperationLimit> operationLimitList {get;set;}
        
        global OUTPUT () {
        }
    }
    
    global with sharing class OperationLimit {
        global String customerId {get;set;}
		global String serviceId {get;set;}
		global String businessGroup {get;set;}
        global String status {get;set;}
        global LimitAmount limitAmount {get;set;}    

        global OperationLimit () {
        }
    }
    
    global with sharing class LimitData {
        global String customerId {get;set;}
		global String serviceId {get;set;}
		global String businessGroup {get;set;}
        global String status {get;set;}
        global LimitAmount limitAmount {get;set;}
        
        global LimitData () {
        }
    }
    
    global with sharing class LimitAmount {
		global String tcurrency {get;set;}
        global Double amount {get;set;}  
        
        global LimitAmount () {
        }
    }
    
    global with sharing class BODY {
        global LimitData limitData {get;set;}
        
        global BODY () {          
        }
    }
}