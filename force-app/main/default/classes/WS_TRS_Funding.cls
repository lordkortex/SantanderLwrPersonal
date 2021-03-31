global class WS_TRS_Funding {

    global static String baseEndpoint;
    global static String baseMethod;
    global static String tokenPlatform;
    global static String tokenUser;

    global static String queryParams;
    global static String finalEndpoint;
    
    global static ReturnValue SendFunding (String body){
        ReturnValue response; 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_TRS_Funding');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = configWs.CNT_HTTPMethod__c;
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
        try {
            Map<String,String> extraHeaders = new Map<String,String>();
            Global_IntegrationWrapper.statusCode = '';
            String res = Global_IntegrationWrapper.launchHTTP(body, baseEndpoint, baseMethod, extraHeaders);
            Map<String, Object> value = new Map<String, Object>();
            value.put('statusCode', Global_IntegrationWrapper.statusCode);
            value.put('OUTPUT', res);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('WS_STR_Funding.sendFunding: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return response;
    }

    global static ReturnValue authorize (String body){
        ReturnValue response; 
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_TRS_FundingValidate');
        baseEndpoint = configWs.CNT_Endpoint__c;
        baseMethod = configWs.CNT_HTTPMethod__c;
        tokenPlatform = configWs.tokenPlatform__c;
        tokenUser = configWs.tokenUser__c;
        try {
            Map<String,String> extraHeaders = new Map<String,String>();
            Global_IntegrationWrapper.statusCode = '';
            String res = Global_IntegrationWrapper.launchHTTP(body, baseEndpoint, baseMethod, extraHeaders);
            Map<String, Object> value = new Map<String, Object>();
            value.put('statusCode', Global_IntegrationWrapper.statusCode);
            value.put('OUTPUT', res);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('WS_STR_Funding.authorize: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return response;
    }
    
    global with sharing class BODY {
        global FundDetails fundDetails {get;set;}
        
        global BODY () {          
        }
    }
    
    global with sharing class FundDetails {
        global String fundsDirectionIndicator {get;set;}	 
		global String countryOrigingFunds {get;set;}
        global String idempotentReference {get;set;}
        global String senderReference {get;set;}
        global DateTime requestedExecutionDate {get;set;}
        global FundAmount fundAmount {get;set;}
        global DebtorDetails debtorDetails {get;set;}          
        global CreditorDetails creditorDetails {get;set;}
        global String subject {get;set;}
        
        global FundDetails () {          
        }
    }
    
    global with sharing class FundAmount {
        global Double amount {get;set;}	 
		global String tcurrency {get;set;}
        
        global FundAmount () {          
        }
    }
    
    global with sharing class DebtorDetails { 
		global String debtorName {get;set;}
        global AccountData debtorAccount {get;set;}
        global AgentData debtorAgent {get;set;}
        
        global DebtorDetails () {          
        }
    }
        
    global with sharing class CreditorDetails { 
		global String creditorName {get;set;}
        global AccountData creditorAccount {get;set;}
        global AgentData creditorAgent {get;set;}        
        global CreditorDetails () {          
        }
    }
    global with sharing class AccountData { 
		global String accountIdType {get;set;}
        global String accountId {get;set;}
        
        global AccountData () {          
        }
    }    
    
    global with sharing class AgentData { 
		global String agent {get;set;}
        global String agentName {get;set;}
        global String addressAgent {get;set;}
        
        global AgentData () {          
        }
    }        
    
    global with sharing class authorizeBODY {
        global String operationGlobalId {get;set;}
        global String globalUserId {get;set;}
        global String scaId {get;set;}
        global String approvalType {get;set;}
        
        global authorizeBODY () {          
        }
    }
}