/*----------------------------------------------------------------------------------
Author:         Bea Hill
Company:        Deloitte
Description:    For the API to retrieve list of payments for CMP_PaymentsLandingParent
Test Class:     TBD
History
<Date>			<Author>		<Description>
22/07/2020		Bea Hill        Initial version (based on WS_CreatePaymentOperation)
23/07/2020		Shahad Naji		Creates SearchData class
----------------------------------------------------------------------------------*/

global with sharing class WS_OperationsList {
    
    
    private WRAPPER_OperationsList result;
    
    private String baseEndpoint;
    private String baseMethod;
    
    private String integrationType;
    
    //private WRAPPER_B2B_Data.UserData userData;

    
    public WRAPPER_OperationsList getResult () {
        return this.result;
    }
    
    public WS_OperationsList() {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_OperationsList');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
    }
    
    //NO BORRAR
    public WRAPPER_OperationsList execute(Boolean latestOperationsFlag) {
        return this.execute(null, null, latestOperationsFlag, null,  null, null, null, null, null, null, null, null, null, null, null, null, null);
       /* String inputJson = ''; 
        WS_OperationsList.INPUT input;
        try {
            WS_OperationsList.SearchData searchData =  new WS_OperationsList.SearchData( latestOperationsFlag);
            input = new WS_OperationsList.INPUT(searchData);
            
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Accept', 'application/json');
            inputJson = JSON.serialize(input, true);
            String response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters);
            if (String.isNotBlank(response)) {
                WRAPPER_OperationsList output = WRAPPER_OperationsList.parse(response);
                this.result = output;
            } else {
                throw new CustomException('Error when consulting the payment landing server');
            }
            
        } catch (Exception e) {
            
            throw new CustomException(e.getMessage());
        }
        return this.result;*/
    }
    //SNJ - 05/08/2020 - Calling initial service including account list
    public WRAPPER_OperationsList execute(Boolean latestOperationsFlag, List<WS_OperationsList.SourceAccountList> sourceAccountList) {
        return this.execute(null, null, latestOperationsFlag, sourceAccountList,  null, null, null, null, null, null, null, null, null, null, null, null, null);
       /* String inputJson = ''; 
        WS_OperationsList.INPUT input;
        try {
           // WS_OperationsList.SearchData searchData =  new WS_OperationsList.SearchData( latestOperationsFlag);
            WS_OperationsList.SearchData searchData =  new WS_OperationsList.SearchData(latestOperationsFlag,sourceAccountList);
            input = new WS_OperationsList.INPUT(searchData);
            
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Accept', 'application/json');
            inputJson = JSON.serialize(input, true);
            String response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters);
            if (String.isNotBlank(response)) {
                WRAPPER_OperationsList output = WRAPPER_OperationsList.parse(response);
                this.result = output;
            } else {
                //throw new CustomException('Error when consulting the payment landing server');
                this.result  = null;
            }
            
        } catch (Exception e) {
            
            throw new CustomException(e.getMessage());
        }
        return this.result;*/
    }
    
    //Antonio Matachana - 11/11/2020 - Calling initial service including account list
    public WRAPPER_OperationsList execute(Boolean latestOperationsFlag, List<WS_OperationsList.SourceAccountList> sourceAccountList, List<WS_OperationsList.StatusList> statusList) {
        return this.execute(null, null, latestOperationsFlag, sourceAccountList,  null, statusList, null, null, null, null, null, null, null, null, null, null, null);
        /*String inputJson = ''; 
        WS_OperationsList.INPUT input;
        try {
           // WS_OperationsList.SearchData searchData =  new WS_OperationsList.SearchData( latestOperationsFlag);
            //WS_OperationsList.SearchData searchData =  new WS_OperationsList.SearchData(latestOperationsFlag,sourceAccountList);
            WS_OperationsList.SearchData searchData =  new WS_OperationsList.SearchData(latestOperationsFlag,sourceAccountList, statusList);
            input = new WS_OperationsList.INPUT(searchData);
            
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Accept', 'application/json');
            inputJson = JSON.serialize(input, true);
            String response = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod, extraHeaderParameters);
            if (String.isNotBlank(response)) {
                WRAPPER_OperationsList output = WRAPPER_OperationsList.parse(response);
                this.result = output;
            } else {
                //throw new CustomException('Error when consulting the payment landing server');
                this.result  = null;
            }
            
        } catch (Exception e) {
            
            throw new CustomException(e.getMessage());
        }
        return this.result;*/
    }
    
    //NO BORRAR
    public WRAPPER_OperationsList execute(String globalUserId, Boolean pendingAuthorization, Boolean latestOperationsFlag, List<WS_OperationsList.SourceAccountList> sourceAccountList, String destinationCountry, List<WS_OperationsList.StatusList> statusList, Decimal amountFrom, Decimal amountTo, List<WS_OperationsList.CurrencyList> currencyList, String paymentMethod, String clientReference, String valueDateFrom, String valueDateTo, WS_OperationsList.SourceData sourceData, String operationGlobalId, WS_OperationsList.DestinationData destinationData, String productId) {
        String inputJson = ''; 
        WS_OperationsList.INPUT input;
        try {            
           	// String operationType = '';
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
        global SearchData searchData   {get;set;}
        
        global INPUT (SearchData searchData ) {
            this.searchData = searchData;
        }       
    }
   
    global with sharing class SearchData {
        @AuraEnabled
        global String operationGlobalId 					{get;set;} 
        @AuraEnabled
        global String globalUserId 							{get;set;} 
        @AuraEnabled
        global Boolean pendingAuthorization 				{get;set;}
        @AuraEnabled
        global Boolean latestOperationsFlag 				{get;set;} 
        @AuraEnabled
        global List<SourceAccountList> sourceAccountList 	{get;set;} 
        @AuraEnabled
        global DestinationData destinationData 				{get;set;} 
        @AuraEnabled
        global String destinationCountry 					{get;set;} 
        @AuraEnabled
        global List<StatusList> statusList 					{get;set;}
        @AuraEnabled
        global String valueDateFrom 						{get;set;} 
        @AuraEnabled
        global String valueDateTo 							{get;set;} 
        @AuraEnabled
        global Decimal amountFrom 							{get;set;}
        @AuraEnabled
        global Decimal amountTo 							{get;set;} 
        @AuraEnabled
        global List<CurrencyList> currencyList 				{get;set;} 
        @AuraEnabled
        global String paymentMethod 						{get;set;}
        @AuraEnabled
        global String productId 						    {get;set;} 
        @AuraEnabled
        global String operationType 						{get;set;}
        @AuraEnabled
        global String clientReference 						{get;set;} 
        @AuraEnabled
        global Integer offset {get;set;} // in json: _offset
        @AuraEnabled
        global Integer t_limit {get;set;} // in json: _limit
        @AuraEnabled
        global SourceData sourceData 						{get;set;}  //Bea Hill 24/08/2020
       
        
        global SearchData (){}
        
        global SearchData (Boolean latestOperationsFlag){
            this.latestOperationsFlag = latestOperationsFlag;            
        } 
        //SNJ - 05/08/2020 - Constructor to include account list for initial service call
        global SearchData (Boolean latestOperationsFlag,  List<SourceAccountList> sourceAccountList){
            this.latestOperationsFlag = latestOperationsFlag; 
            this.sourceAccountList = sourceAccountList; 
        } 
        //Antonio Matachana - 11/11/2020 - Constructor to include account list for initial service call
        global SearchData (Boolean latestOperationsFlag,  List<SourceAccountList> sourceAccountList,List<StatusList> statusList){
            this.latestOperationsFlag = latestOperationsFlag; 
            this.sourceAccountList = sourceAccountList; 
            this.statusList = statusList;
        } 
        global SearchData (String globalUserId, Boolean pendingAuthorization, Boolean latestOperationsFlag, List<SourceAccountList> sourceAccountList, String destinationCountry, List<StatusList> statusList, Decimal amountFrom, Decimal amountTo,
                           List<CurrencyList> currencyList,  String paymentMethod, String clientReference, String valueDateFrom, String valueDateTo){
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
        global SearchData (String globalUserId, Boolean pendingAuthorization, Boolean latestOperationsFlag, List<SourceAccountList> sourceAccountList, String destinationCountry, List<StatusList> statusList, Decimal amountFrom, Decimal amountTo,
                           List<CurrencyList> currencyList,  String paymentMethod, String clientReference, String valueDateFrom, String valueDateTo,
                           WS_OperationsList.SourceData sourceData, String operationGlobalId, WS_OperationsList.DestinationData destinationData, String productId){
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
        global String name 						{get;set;} 
        
        global SourceData (){}
        global SourceData (String name){
            this.name = name; 
        }
    }
    
    global with sharing class SourceAccountList {
        @AuraEnabled
        global String bankId 				{get;set;}
        @AuraEnabled
        global String agentName 			{get;set;}
        @AuraEnabled
        global String alias 				{get;set;} 
        @AuraEnabled
        global SourceAccount sourceAccount 	{get;set;} 
        
        global SourceAccountList(){}
        // global SourceAccountList(String bankId , String alias, SourceAccount sourceAccount){
        //     this.bankId = bankId;
        //     this.alias = alias;
        //     this.SourceAccount = SourceAccount;            
        // }
        global SourceAccountList(String bankId , String agentName, String alias, SourceAccount sourceAccount){
            this.bankId = bankId;
            this.agentName = agentName;
            this.alias = alias;
            this.SourceAccount = SourceAccount;            
        }
    }
    
    global with sharing class SourceAccount {
        @AuraEnabled
        global String accountType 	{get;set;} 
        @AuraEnabled
        global String accountId 	{get;set;} 
        
        global SourceAccount (){}
        global SourceAccount (String accountType, String accountId){
            this.accountType = accountType;
            this.accountId = accountId;            
        }
    }    
    
    global with sharing class DestinationData {
        @AuraEnabled
        global String name 						{get;set;} 
        @AuraEnabled
        global String agentName 	            {get;set;}
        @AuraEnabled
        global SourceAccount destinationAccount {get;set;}
        // @AuraEnabled
        // global String destinationCountry 	{get;set;} //Bea Hill 24/08/2020

        global DestinationData (){}
        // global DestinationData (String name , SourceAccount destinationAccount ){
        //     this.name = name;
        //     this.destinationAccount  = destinationAccount;   
        // }

        // Bea Hill 24/08/2020
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
      //  public OperationStatus operationStatus {get;set;}
        global StatusList(){}
        global StatusList(String status, String reason){
            this.status = status;
            this.reason = reason;
        }
       /* public StatusList(OperationStatus operationStatus){
            this.operationStatus = operationStatus;
        }*/
    }
    
    global with sharing class OperationStatus {
        @AuraEnabled
        global String status {get;set;} 
        @AuraEnabled
        global String reason {get;set;}
        
        global OperationStatus(){}
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
    public with sharing class OUTPUT {        
        public OperationsListFile operationsListFile {get;set;} 
        public List<OperationsList> operationsList {get;set;}
    }
    public with sharing class OperationsList {
        public OperationDetail operationDetail {get;set;} 
        public Links x_links {get;set;} // in json: _links
    }
    public with sharing class OperationDetail {
        public String operationGlobalId {get;set;} 
        public OperationStatus operationStatus {get;set;} 
        public String globalUserId {get;set;} 
        public String statusDate {get;set;} 
        public String issueDate {get;set;} 
        public String valueDate {get;set;} 
        public String clientReference {get;set;} 
        public String purpose {get;set;} 
        public String transferDescription {get;set;} 
        public OperationAmount operationAmount {get;set;} 
        public CounterValueOperationAmount counterValueOperationAmount {get;set;} 
        public OperationAmount sourceTotalAmount {get;set;} 
        public SourceData sourceData {get;set;} 
        public DestinationData destinationData {get;set;} 
    }
    public with sharing class Links {
        public String x_first {get;set;} // in json: _first
        public String x_next {get;set;} // in json: _next
        public String x_prev {get;set;} // in json: _prev
    }
    public with sharing class OperationAmount {
        public String t_currency {get;set;} 
        public Integer amount {get;set;} 
    }
    
    public with sharing class CounterValueOperationAmount {
        public String t_currency {get;set;} 
        public Integer amount {get;set;} 
        public String tradeCurrency {get;set;} 
    }
    
    public with sharing class SourceData {
        public String name {get;set;} 
        public SourceAccount sourceAccount {get;set;} 
        public SourceAgent sourceAgent {get;set;} 
        public String sourceCountry {get;set;} 
    }
    
    public with sharing class SourceAgent {
        public String agent {get;set;} 
        public String name {get;set;} 
        public String addressAgent {get;set;} 
    }
    public with sharing class OUTPUT_DestinationData {
        public String destinationName {get;set;} 
        public SourceAccount destinationAccount {get;set;} 
        public SourceAgent destinationAgent {get;set;} 
        public String countryDestinationFunds {get;set;} 
    }
    public with sharing class OperationsListFile {}*/
    
    /*----------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Download list of payments
    History
    <Date>			<Author>		<Description>
    04/09/2020		Bea Hill        Initial version
    ----------------------------------------------------------------------------------*/
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

                //TESTING
                //if (fileFormat == 'CSV') {
                //	String testFile = 'Q2xpZW50IHJlZmVyZW5jZSxTdGF0dXMsUmVhc29uLFNvdXJjZSBuYW1lLFNvdXJjZSBhY2NvdW50IHR5cGUsU291cmNlIGFjY291bnQsRGVzdGluYXRpb24gbmFtZSxEZXN0aW5hdGlvbiBhY2NvdW50IHR5cGUsRGVzdGluYXRpb24gYWNjb3VudCxDdXJyZW5jeSxBbW91bnQsVmFsdWUgZGF0ZQosRHJhZnQsUGF5bWVudCBiZWluZyBwcm9jZXNzZWQgYnkgYmFuaywsQkJBLDAwNDkwMDcyMDQyNzEwNDcyODg1LCxCQkEsMDkwMjIyMTAyMDU2NjAsRVVSLDAuMCwyMDIwLTA5LTExVDAwOjAwOjAwKzAwMDAKMjAyMDA5MDgxOTU3LDAwMiwwMDEsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDA0OTAwNzIwNDI3MTA0NzI4ODUsbnVsbCxCQkEsMDkwMjIyMTAyMDU2NjAsbnVsbCxudWxsLDIwMjAtMDktMTFUMDA6MDA6MDArMDAwMAoyMDIwMDkxMTExMDIsMDAyLDAwMSxTVUJTIEdUUyAwMDEtMDAzLEJCQSwwMDQ5MDA3MjA0MjcxMDQ3Mjg4NSxTVUJTIEdUUyAwMDEtMDAzLEJCQSwwOTAyMjIxMDIwNTY2MCxudWxsLG51bGwsMjAyMC0wOS0xMVQwMDowMDowMCswMDAwCjIwMjA5MTExMDMyLDAwMiwwMDEsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDA0OTAwNzIwNDI3MTA0NzI4ODUsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDkwMjIyMTAyMDU2NjAsbnVsbCxudWxsLDIwMjAtMDktMTFUMDA6MDA6MDArMDAwMApEZXYxMzA0LDAwMiwwMDEsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDkwMjIyMTAyMDU2NjAsbnVsbCxCQkEsMDA0OTAwNzIwNDI3MTA0NzI4ODUsbnVsbCxudWxsLDIwMjAtMDktMTBUMDA6MDA6MDArMDAwMAoyMDIwMDkxMDEyNTAsOTk3LDAwMSxTVUJTIEdUUyAwMDEtMDAzLEJCQSwwMDQ5MDA3MjA0MjcxMDQ3Mjg4NSxTVUJTIEdUUyAwMDEtMDAzLEJCQSwwOTAyMjIxMDIwNTY2MCxudWxsLG51bGwsMjAyMC0wOS0xMFQwMDowMDowMCswMDAwCmFsZXhBbGV4LDAwMiwwMDEsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDA0OTAwNzIwNDI3MTA0NzI4ODUsbnVsbCxCQkEsMDkwMjIyMTAyMDU2NjAsbnVsbCxudWxsLDIwMjAtMDktMTBUMDA6MDA6MDArMDAwMAphc2RmMTIzNCwwMDIsMDAxLFNVQlMgR1RTIDAwMS0wMDMsQkJBLDAwNDkwMDcyMDQyNzEwNDcyODg1LG51bGwsQkJBLDA5MDIyMjEwMjA1NjYwLG51bGwsbnVsbCwyMDIwLTA5LTEwVDAwOjAwOjAwKzAwMDAKbnVsbCwwMDMsUGF5bWVudCBpbiBkcmFmdCBtb2RlLEJhbmNvIFNhbnRhbmRlcixJQkEsR0I1NEFCQlk2NTc4OTU2Mzg3MzMwLHN0cmluZyxJQkEsRVM1NDAwNDk1NjM4NzMzMDA1Njc4MixudWxsLG51bGwsMjAyMC0wOS0xMFQwMDowMDowMCswMDAwCmFsZXhwcnVlYmExLDAwMiwwMDEsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDA0OTAwNzIwNDI3MTA0NzI4ODUsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDkwMjIyMTAyMDU2NjAsbnVsbCxudWxsLDIwMjAtMDktMTBUMDA6MDA6MDArMDAwMAoyMDIwMDkxMDEzMjUsMDAyLDAwMixTVUJTIEdUUyAwMDEtMDAzLEJCQSwwMDQ5MDA3MjA0MjcxMDQ3Mjg4NSxTVUJTIEdUUyAwMDEtMDAzLEJCQSwwOTAyMjIxMDIwNTY2MCxudWxsLG51bGwsMjAyMC0wOS0xMFQwMDowMDowMCswMDAwCjIwMjAwOTEwMDkxMywwMDIsMDAxLFNVQlMgR1RTIDAwMS0wMDMsQkJBLDAwNDkwMDcyMDQyNzEwNDcyODg1LFNVQlMgR1RTIDAwMS0wMDMsQkJBLDA5MDIyMjEwMjA1NjYwLG51bGwsbnVsbCwyMDIwLTA5LTEwVDAwOjAwOjAwKzAwMDAKYWVzciwwMDIsMDAxLFNVQlMgR1RTIDAwMS0wMDMsQkJBLDAwNDkwMDcyMDQyNzEwNDcyODg1LFNVQlMgR1RTIDAwMS0wMDMsQkJBLDA5MDIyMjEwMjA1Njk5LG51bGwsbnVsbCwyMDIwLTA5LTEwVDAwOjAwOjAwKzAwMDAKMjAyMDA5MTAwOTEzLDAwMiwwMDEsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDA0OTAwNzIwNDI3MTA0NzI4ODUsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDkwMjIyMTAyMDU2NjAsbnVsbCxudWxsLDIwMjAtMDktMTBUMDA6MDA6MDArMDAwMApzZGZnLDAwMiwwMDEsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDA0OTAwNzIwNDI3MTA0NzI4ODUsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDkwMjIyMTAyMDU2OTksbnVsbCxudWxsLDIwMjAtMDktMTBUMDA6MDA6MDArMDAwMApjbGllbnRlMDIwLDAwMiwwMDEsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDA0OTAwNzIwNDI3MTA0NzI4ODUsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDkwMjIyMTAyMDU2NjAsbnVsbCxudWxsLDIwMjAtMDktMTBUMDA6MDA6MDArMDAwMAoyMDIwMDkxMDEwMTYsMDAyLDAwMSxTVUJTIEdUUyAwMDEtMDAzLEJCQSwwMDQ5MDA3MjA0MjcxMDQ3Mjg4NSxTVUJTIEdUUyAwMDEtMDAzLEJCQSwwOTAyMjIxMDIwNTY2MCxudWxsLG51bGwsMjAyMC0wOS0xMFQwMDowMDowMCswMDAwCjIwMjAwOTEwMTIwNSwwMDIsMDAxLFNVQlMgR1RTIDAwMS0wMDMsQkJBLDAwNDkwMDcyMDQyNzEwNDcyODg1LFNVQlMgR1RTIDAwMS0wMDMsQkJBLDA5MDIyMjEwMjA1NjYwLG51bGwsbnVsbCwyMDIwLTA5LTEwVDAwOjAwOjAwKzAwMDAKdGVzdEFsZXgyLDAwMiwwMDEsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDA0OTAwNzIwNDI3MTA0NzI4ODUsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDkwMjIyMTAyMDU2NjAsbnVsbCxudWxsLDIwMjAtMDktMTBUMDA6MDA6MDArMDAwMApjbGllbnRlMDIzLDAwMiwwMDEsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDA0OTAwNzIwNDI3MTA0NzI4ODUsU1VCUyBHVFMgMDAxLTAwMyxCQkEsMDkwMjIyMTAyMDU2NjAsbnVsbCxudWxsLDIwMjAtMDktMTBUMDA6MDA6MDArMDAwMAo=';
                //	operationsListFile = testFile;   
                //}
                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
                //TESTING
                //if (fileFormat == 'XLS') {
                //	String testFile = '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';
                //	operationsListFile = testFile;   
                //}
                
                output.put('operationsListFile', operationsListFile);

                if (operationsListFile != '') {
                    //Generate the document
                    ContentVersion cont = new ContentVersion();
                    cont.Title = fileName;
                    cont.PathOnClient = fileName;
                    cont.VersionData = EncodingUtil.base64Decode(operationsListFile);
                    System.debug('cont.Title: ' + cont.Title);
                    System.debug('cont.PathOnClient: ' + cont.PathOnClient);
                    System.debug('cont.VersionData: ' + cont.VersionData);
                    if(Schema.sObjectType.ContentVersion.isCreateable()){
                        insert cont;
                    }
                    output.put('fileName', fileName);
                    String sQuery = 'SELECT id from ContentDocument where title = :fileName ORDER BY CreatedDate DESC LIMIT 1';
                    List <sObject> doc = Database.query(sQuery);

                    System.debug('doc[0]: ' + doc[0]);
                    if(!doc.isEmpty()){
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