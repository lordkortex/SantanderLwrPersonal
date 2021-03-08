/*----------------------------------------------------------------------------------
Author:         Bea Hill
Company:        Deloitte
Description:    Retrieve preset filters by payment status and their numbers for the
filter header of CMP_PaymentsLandingParent
Test Class:     TBD
History
<Date>			<Author>		<Description>
27/07/2020		Bea Hill        Initial version (based on WS_CreatePaymentOperation)
----------------------------------------------------------------------------------*/

global with sharing class WS_OperationsByStatus {
    
 

    private WRAPPER_OperationsByStatus result;
    
    private String baseEndpoint;
    private String baseMethod;
    
    private String integrationType;
    
    // private WRAPPER_B2B_Data.UserData userData;

    
    global WRAPPER_OperationsByStatus getResult () {
        return this.result;
    }

    global WS_OperationsByStatus() {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_OperationsByStatus');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
    }

    global  WRAPPER_OperationsByStatus execute(List<AccountList> accountList, List<StatusList> statusList, String globalUserId) {
        String inputJson = ''; 
        WS_OperationsByStatus.INPUT input;
        try {


            WS_OperationsByStatus.SearchData searchData =  new WS_OperationsByStatus.SearchData(accountList, statusList, globalUserId);
            input = new WS_OperationsByStatus.INPUT(searchData);
            
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            // extraHeaderParameters.put('Accept', 'application/json');
            inputJson = JSON.serialize(input, true);
            system.debug('WS_OperationsByStatus - inputJson: ' + inputJson);
            String response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters);
            if (String.isNotBlank(response)) {
                WRAPPER_OperationsByStatus output = WRAPPER_OperationsByStatus.parse(response);  
                this.result = output;
            } else {
                this.result = null;
               // throw new CustomException('Error when consulting the payment landing header server');
            }
            
        } catch (Exception e) {
            this.result = null;
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }
    
    
    
    global with sharing class INPUT {
        @AuraEnabled
        global SearchData searchData   {get;set;}
        
        global INPUT (SearchData searchData ) {
            this.searchData = searchData;
        }       
    }

    global with sharing class SearchData {
        @AuraEnabled
		global List<AccountList> accountList {get;set;} 
        @AuraEnabled
		global List<StatusList> statusList {get;set;} 
        @AuraEnabled
        global String globalUserId {get;set;} 
        
        global SearchData(){}
        global SearchData(List<AccountList> accountList, List<StatusList> statusList, String globalUserId){
            this.accountList = accountList;
            this.statusList = statusList;
            this.globalUserId = globalUserId;
        }
    }

    global with sharing class Account {
        @AuraEnabled
		global String idType {get;set;} 
        @AuraEnabled
        global String accountId {get;set;} 
        global Account(){}
        global Account(String idType, String accountId){
            this.idType = idType;
            this.accountId = accountId;            
        }
    }

    global with sharing class AccountList {
        @AuraEnabled
		global String originatorAgent {get;set;} 
        @AuraEnabled
        global Account account {get;set;} 
        
        global AccountList(){}
        global AccountList(Account account){
            this.account = account;
        }
        global AccountList(String originatorAgent, Account account){
            this.originatorAgent = originatorAgent;
            this.account = account;

        }
    }

    global with sharing class StatusList {
        @AuraEnabled
		global String status {get;set;} 
        @AuraEnabled
		global String valueDateFrom {get;set;} 
        @AuraEnabled
        global String valueDateTo {get;set;}
        @AuraEnabled
        global String reason {get;set;}
        
        global StatusList(){}
        
        global StatusList(String status, String reason, String valueDateFrom, String valueDateTo){
            this.status = status;
            this.reason = reason;
            this.valueDateFrom = valueDateFrom;
            this.valueDateTo = valueDateTo;
        }
    }


    // global with sharing class HeaderFilters {
    //     global List<StatusFilter> statusFilterList      {get;set;}

    //     global HeaderFilters(List<StatusFilter> statusFilterList){
    //         this.statusFilterList = statusFilterList;
    //     }

    // }

    // global with sharing class StatusFilter {
    //     global String status                        {get;set;}
    //     global Boolean pendingAuthorization         {get;set;}
    //     global String countOperation                {get;set;}
           
    //     global StatusFilter(String status, Boolean pendingAuthorization,String countOperation) {
    //         this.status = status;
    //         this.pendingAuthorization = pendingAuthorization;
    //         this.countOperation = countOperation;
    //     }
    // }

}