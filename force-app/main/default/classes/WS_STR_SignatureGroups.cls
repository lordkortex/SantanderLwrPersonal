global class WS_STR_SignatureGroups {
    global static String baseEndpoint;
    global static String baseMethod;
    global static String tokenPlatform;
    global static String tokenUser;

    global static String queryParams;
    global static String finalEndpoint;

    global static ReturnValue getGroups (WS_STR_SignatureGroups.INPUT input) {
        ReturnValue response; 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_STR_SignatureGroups');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = 'GET';
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
        try {
            queryParams = '';
            finalEndpoint = baseEndpoint;
            getParameters('customerId', input.customerId);
            getParameters('groupId', input.groupId);
            getParameters('groupStatus', input.groupStatus);
            getParameters('groupName', input.groupName);
            if (String.isNotBlank(queryParams)) {
                finalEndpoint += '?' + queryParams;
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
            System.debug('WS_STR_SignatureGroups.getGroups: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return response;
    }

    global static ReturnValue postGroup (String body){
        ReturnValue response; 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_STR_SignatureGroups');
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
            System.debug('WS_STR_SignatureGroups.postGroup: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return response;        
    }
    
	global static ReturnValue patchGroup (WS_STR_SignatureGroups.INPUT input, String body) {
		ReturnValue response; 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_STR_SignatureGroups');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = 'PATCH';
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
        try {
            queryParams = '';
            finalEndpoint = baseEndpoint;
            getParameters('groupId', input.groupId);
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
            System.debug('WS_STR_SignatureGroups.patchGroup: ' + e.getMessage() + ' in line ' + e.getLineNumber());
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

    global static WS_STR_SignatureGroups.OUTPUT getOutput (String response) {
        OUTPUT res = null;
        try {
            if(String.isNotBlank(response)){
            	res = (WS_STR_SignatureGroups.OUTPUT) JSON.deserialize(response, WS_STR_SignatureGroups.OUTPUT.class);
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups.getOutput: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return res;
    }
    
	global with sharing class INPUT {
		global String groupId {get;set;}
        global String groupName {get;set;}
		global String groupStatus {get;set;}
		global String customerId {get;set;}

        global INPUT () {
        }
    }

    global with sharing class OUTPUT {
		global List<tGroup> groupList {get;set;}
        
        global OUTPUT () {
        }
    }
    
    global with sharing class tGroup {
		global String groupId {get;set;}
        global String groupName {get;set;}
        global String customerId {get;set;}
        global String groupStatus {get;set;}
        global List<Signers> SignersList {get;set;}
        
        global tGroup () {
        }
    }
    
    global with sharing class Signers {
		global String userId {get;set;}
        global String emailAddress {get;set;}
        global String status {get;set;}
        
        global Signers () {
        }
    }
    
    global with sharing class BODY{ 
        global String groupName {get;set;}
        global String groupStatus {get;set;}
        global String customerId {get;set;}
        global List<Signers> userList {get;set;}
        global List<Signers> signersList {get;set;}
        
        global BODY () {
        }
    }
        
        
}