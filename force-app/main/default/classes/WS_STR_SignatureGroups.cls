global class WS_STR_SignatureGroups {
    global static String baseEndpoint;
    global static String baseMethod;
    global static String tokenPlatform;
    global static String tokenUser;

    global static String queryParams;
    global static String finalEndpoint;

    global static WS_STR_SignatureGroups.OUTPUT getGroups (WS_STR_SignatureGroups.INPUT input) {
        OUTPUT response = null; 
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
            String res = Global_IntegrationWrapper.launchHTTP(null, finalEndPoint, baseMethod, extraHeaders);
            response = getOutput(res);
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups.getGroups: ' + e.getMessage() + ' in line ' + e.getLineNumber());
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
		global GroupsResponse getGroupsResponse {get;set;}
        
        global OUTPUT () {
        }
    }

    global with sharing class GroupsResponse {
		global List<tGroup> groupList {get;set;}
        
        global GroupsResponse () {
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
        global Double status {get;set;}
        
        global Signers () {
        }
    }
}