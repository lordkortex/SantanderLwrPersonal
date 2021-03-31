/*
Author:         Bea Hill
Company:        Deloitte
Description:    For the API to retrieve list of payments for CMP_PaymentsLandingParent
Test Class:     TBD
History:
<Date>          <Author>        <Description>
22/07/2020      Bea Hill        Initial version (based on WS_CreatePaymentOperation)
23/07/2020      Shahad Naji     Creates SearchData class
*/
global with sharing class WS_OperationsList {
    private WRAPPER_OperationsList result;

    private String baseEndpoint;
    private String baseMethod;

    public WRAPPER_OperationsList getResult () {
        return this.result;
    }
    
    public WS_OperationsList () {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_OperationsList');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
    }

    //NO BORRAR
    public WRAPPER_OperationsList execute (Boolean latestOperationsFlag) {
        return this.execute(null, null, latestOperationsFlag, null,  null, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    //SNJ - 05/08/2020 - Calling initial service including account list
    public WRAPPER_OperationsList execute (Boolean latestOperationsFlag, List<WS_OperationsList.SourceAccountList> sourceAccountList) {
        return this.execute(null, null, latestOperationsFlag, sourceAccountList,  null, null, null, null, null, null, null, null, null, null, null, null, null);
    }
    
    //Antonio Matachana - 11/11/2020 - Calling initial service including account list
    public WRAPPER_OperationsList execute (Boolean latestOperationsFlag, List<WS_OperationsList.SourceAccountList> sourceAccountList, List<WS_OperationsList.StatusList> statusList) {
        return this.execute(null, null, latestOperationsFlag, sourceAccountList,  null, statusList, null, null, null, null, null, null, null, null, null, null, null);
    }
    
    //NO BORRAR
    public WRAPPER_OperationsList execute (String globalUserId, Boolean pendingAuthorization, Boolean latestOperationsFlag, List<WS_OperationsList.SourceAccountList> sourceAccountList, String destinationCountry, List<WS_OperationsList.StatusList> statusList, Decimal amountFrom, Decimal amountTo, List<WS_OperationsList.CurrencyList> currencyList, String paymentMethod, String clientReference, String valueDateFrom, String valueDateTo, WS_OperationsList.SourceData sourceData, String operationGlobalId, WS_OperationsList.DestinationData destinationData, String productId) {
        String inputJson = ''; 
        WS_OperationsList.INPUT input;
        try {
            WS_OperationsList.SearchData searchData =  new WS_OperationsList.SearchData(globalUserId, pendingAuthorization, latestOperationsFlag, sourceAccountList, destinationCountry, statusList, amountFrom, amountTo, currencyList, paymentMethod, clientReference, valueDateFrom, valueDateTo, sourceData, operationGlobalId, destinationData, productId);
            input = new WS_OperationsList.INPUT(searchData);
            Map<String, String> extraHeaderParameters = new Map<String, String>();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Accept', 'application/json');
            inputJson = JSON.serialize(input, true);
            String response = null;
            WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId()); 
            String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
            String localBankUserProfile = System.Label.Profile_BackOffice_002;
            if (userData != null) {
                if (String.isNotBlank(userData.profileName)) {
                    if (userData.profileName != gtsOperationsUserProfile && userData.profileName != localBankUserProfile) {
                        response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters, 40000);  
                    } else {
                        String tokenPlatform = 'BBOO';
                        String tokenUser = '';
                        if (userData.profileName == gtsOperationsUserProfile) {
                         	tokenUser = 'GTS_GLOBAL';
                        } else if (userData.profileName == localBankUserProfile) {
                            tokenUser = 'GTS_LOB';
                        }
                        TokenInformation tokenInformation = new TokenInformation(userData.country, tokenPlatform, tokenUser, null, userData.bic);
                        response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint,  this.baseMethod, extraHeaderParameters, null, null, 40000, tokenInformation);      
                    }
                } else {
                   response = null;
                }
            } else {
               response = null;
            }
            if (String.isNotBlank(response)) {
                WRAPPER_OperationsList output = WRAPPER_OperationsList.parse(response);  
                this.result = output;
            } else {
                throw new CustomException('Error when consulting the payment landing SEARCH server');
            }
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
        return this.result; 
    }

    global with sharing class INPUT {
        @AuraEnabled
        global SearchData searchData {get;set;}
        
        global INPUT (SearchData searchData) {
            this.searchData = searchData;
        }
    }
   
    global with sharing class SearchData {
        @AuraEnabled
        global String operationGlobalId {get;set;} 
        @AuraEnabled
        global String globalUserId {get;set;} 
        @AuraEnabled
        global Boolean pendingAuthorization {get;set;}
        @AuraEnabled
        global Boolean latestOperationsFlag {get;set;} 
        @AuraEnabled
        global List<SourceAccountList> sourceAccountList {get;set;} 
        @AuraEnabled
        global DestinationData destinationData {get;set;} 
        @AuraEnabled
        global String destinationCountry {get;set;} 
        @AuraEnabled
        global List<StatusList> statusList {get;set;}
        @AuraEnabled
        global String valueDateFrom {get;set;} 
        @AuraEnabled
        global String valueDateTo {get;set;} 
        @AuraEnabled
        global Decimal amountFrom {get;set;}
        @AuraEnabled
        global Decimal amountTo {get;set;} 
        @AuraEnabled
        global List<CurrencyList> currencyList {get;set;} 
        @AuraEnabled
        global String paymentMethod {get;set;}
        @AuraEnabled
        global String productId {get;set;} 
        @AuraEnabled
        global String operationType {get;set;}
        @AuraEnabled
        global String clientReference {get;set;} 
        @AuraEnabled
        global Integer offset {get;set;} // in json: _offset
        @AuraEnabled
        global Integer t_limit {get;set;} // in json: _limit
        @AuraEnabled
        global SourceData sourceData {get;set;}

        global SearchData () {}

        global SearchData (Boolean latestOperationsFlag) {
            this.latestOperationsFlag = latestOperationsFlag;
        }

        //SNJ - 05/08/2020 - Constructor to include account list for initial service call
        global SearchData (Boolean latestOperationsFlag, List<SourceAccountList> sourceAccountList) {
            this.latestOperationsFlag = latestOperationsFlag;
            this.sourceAccountList = sourceAccountList;
        }

        //Antonio Matachana - 11/11/2020 - Constructor to include account list for initial service call
        global SearchData (Boolean latestOperationsFlag, List<SourceAccountList> sourceAccountList, List<StatusList> statusList) {
            this.latestOperationsFlag = latestOperationsFlag;
            this.sourceAccountList = sourceAccountList; 
            this.statusList = statusList;
        }

        global SearchData (String globalUserId, Boolean pendingAuthorization, Boolean latestOperationsFlag, List<SourceAccountList> sourceAccountList, String destinationCountry, List<StatusList> statusList, Decimal amountFrom, Decimal amountTo, List<CurrencyList> currencyList, String paymentMethod, String clientReference, String valueDateFrom, String valueDateTo) {
            this.globalUserId = globalUserId;
            this.pendingAuthorization = pendingAuthorization;
            this.latestOperationsFlag = latestOperationsFlag;
            this.sourceAccountList = sourceAccountList;
            this.destinationCountry = destinationCountry;
            this.statusList = statusList;
            this.valueDateFrom = valueDateFrom;
            this.valueDateTo = valueDateTo;
            this.amountFrom = amountFrom;
            this.amountTo = amountTo;
            this.currencyList = currencyList;
            this.paymentMethod = paymentMethod;
            this.clientReference = clientReference;
        }

        //BH 28082020 con parametros adicionales
        global SearchData (String globalUserId, Boolean pendingAuthorization, Boolean latestOperationsFlag, List<SourceAccountList> sourceAccountList, String destinationCountry, List<StatusList> statusList, Decimal amountFrom, Decimal amountTo, List<CurrencyList> currencyList,  String paymentMethod, String clientReference, String valueDateFrom, String valueDateTo, WS_OperationsList.SourceData sourceData, String operationGlobalId, WS_OperationsList.DestinationData destinationData, String productId){
            this.globalUserId = globalUserId;
            this.pendingAuthorization = pendingAuthorization;
            this.latestOperationsFlag = latestOperationsFlag;
            this.sourceAccountList = sourceAccountList;
            this.destinationCountry = destinationCountry;
            this.statusList = statusList;
            this.valueDateFrom = valueDateFrom;
            this.valueDateTo = valueDateTo;
            this.amountFrom = amountFrom;
            this.amountTo = amountTo;
            this.currencyList = currencyList;
            this.paymentMethod = paymentMethod;
            this.clientReference = clientReference;
            this.sourceData = sourceData;
            this.operationGlobalId = operationGlobalId;
            this.destinationData = destinationData;
            this.productId = productId;
        }
    }

    global with sharing class SourceData {
        @AuraEnabled
        global String name {get;set;} 

        global SourceData () {}

        global SourceData (String name) {
            this.name = name; 
        }
    }

    global with sharing class SourceAccountList {
        @AuraEnabled
        global String bankId {get;set;}
        @AuraEnabled
        global String agentName {get;set;}
        @AuraEnabled
        global String alias {get;set;} 
        @AuraEnabled
        global SourceAccount sourceAccount {get;set;} 

        global SourceAccountList () {}

        global SourceAccountList (String bankId , String agentName, String alias, SourceAccount sourceAccount) {
            this.bankId = bankId;
            this.agentName = agentName;
            this.alias = alias;
            this.sourceAccount = sourceAccount;
        }
    }

    global with sharing class SourceAccount {
        @AuraEnabled
        global String accountType {get;set;} 
        @AuraEnabled
        global String accountId {get;set;} 

        global SourceAccount () {}
        global SourceAccount (String accountType, String accountId){
            this.accountType = accountType;
            this.accountId = accountId;
        }
    }

    global with sharing class DestinationData {
        @AuraEnabled
        global String name {get;set;} 
        @AuraEnabled
        global String agentName {get;set;}
        @AuraEnabled
        global SourceAccount destinationAccount {get;set;}

        global DestinationData () {}

        global DestinationData (String name , String agentName, SourceAccount destinationAccount){
            this.name = name;
            this.agentName = agentName;
            this.destinationAccount  = destinationAccount; 
        }
    }
    
    global with sharing class StatusList {
        @AuraEnabled
        global String status {get;set;} 
        @AuraEnabled
        global String reason {get;set;} 

        global StatusList () {}

        global StatusList(String status, String reason){
            this.status = status;
            this.reason = reason;
        }
    }
    
    global with sharing class OperationStatus {
        @AuraEnabled
        global String status {get;set;} 
        @AuraEnabled
        global String reason {get;set;}
        
        global OperationStatus () {}

        global OperationStatus(String status, String reason){
            this.status = status;
            this.reason = reason;
        }
    }
    
    global with sharing class CurrencyList {
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global CurrencyList(){}
        global CurrencyList(String tcurrency){
            this.tcurrency = tcurrency;
        }
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Download list of payments
    History
    <Date>          <Author>        <Description>
    04/09/2020      Bea Hill        Initial version
    */
    public Map<String,String> downloadPaymentsList(Boolean latestOperationsFlag, List<WS_OperationsList.SourceAccountList> sourceAccountList, String fileFormat) {
        String inputJson = ''; 
        WS_OperationsList.INPUT input;
        Map<String,String> output = new Map<String,String>();
        try {
            WS_OperationsList.SearchData searchData =  new WS_OperationsList.SearchData(latestOperationsFlag,sourceAccountList);
            input = new WS_OperationsList.INPUT(searchData);
            String suffix = fileFormat.toLowerCase();
            String fileName = 'Payments_list_' + Datetime.now().getTime() + '.' + suffix;
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            if (fileFormat == 'CSV') {
                extraHeaderParameters.put('Accept', 'application/csv');
            } else if (fileFormat == 'XLS') {
                extraHeaderParameters.put('Accept', 'application/xls');
            }
            inputJson = JSON.serialize(input, true);
            String operationsListFile = '';
            System.debug('extraHeaderParameters: ' + extraHeaderParameters);
            String response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters);
            if (String.isNotBlank(response)) {
                System.JSONParser parser = System.JSON.createParser(response);
                while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                    if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                        String text = parser.getText();
                        if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                            if (text == 'operationsListFile') {
                                operationsListFile = parser.getText();
                            } else {
                                System.debug(LoggingLevel.WARN, 'OperationsListFile consuming unrecognized property: '+text);
                            }
                        }
                    }
                }
                output.put('operationsListFile', operationsListFile);
                if (operationsListFile != '') {
                    // Generate the document
                    ContentVersion cont = new ContentVersion();
                    cont.Title = fileName;
                    cont.PathOnClient = fileName;
                    cont.VersionData = EncodingUtil.base64Decode(operationsListFile);
                    System.debug('cont.Title: ' + cont.Title);
                    System.debug('cont.PathOnClient: ' + cont.PathOnClient);
                    System.debug('cont.VersionData: ' + cont.VersionData);
                    if (Schema.sObjectType.ContentVersion.isCreateable()) {
                        insert cont;
                    }
                    output.put('fileName', fileName);
                    String sQuery = 'SELECT id from ContentDocument where title = :fileName ORDER BY CreatedDate DESC LIMIT 1';
                    List <sObject> doc = Database.query(sQuery);
                    System.debug('doc[0]: ' + doc[0]);
                    if (!doc.isEmpty()) {
                        output.put('documentId', doc[0].Id);
                    } else {
                        output.put('documentId', null);
                    }
                }
            } else {
                throw new CustomException('Error when consulting the payment downloads server');
            }
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
        return output;
    }
}