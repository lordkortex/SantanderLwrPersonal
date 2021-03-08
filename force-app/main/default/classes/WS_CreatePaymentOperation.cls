global with sharing class WS_CreatePaymentOperation {

    private String result;

    private String baseEndpoint;
    private String baseMethod;
    private String tokenPlatform;
    private String tokenUser;

    private String integrationType;

    //26/10/2020 - Shahad Naji - WrapperUserData
    private WrapperUserData userData;
    //private WRAPPER_B2B_Data.UserData userData;
    private WRAPPER_B2B_Data.AccountData accountData;

    public String getResult () {
        return this.result;
    }
    
//26/10/2020 - Shahad Naji - WrapperUserData
    global WS_CreatePaymentOperation (String integrationType, /*WRAPPER_B2B_Data.UserData*/ WrapperUserData userData, WRAPPER_B2B_Data.AccountData accountData) {
        if (String.isBlank(integrationType)) {
            throw new CustomException('You must need to inform the integration type.');
        }
        if (userData == null) {
            throw new CustomException('You must need to inform the user data.');
        }
        if (accountData == null) {
            throw new CustomException('You must need to inform the account related data.');
        }
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_CreatePaymentOperation');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
        this.integrationType = integrationType;
        this.userData = userData;
        this.accountData = accountData;
    }

    global WS_CreatePaymentOperation (WrapperUserData userData) {
        if (userData == null) {
            throw new CustomException('You must need to inform the user data.');
        }
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_CreatePaymentOperation');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
        this.userData = userData;
    }

    global String execute(WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
        return execute(sourceAccountData, recipientAccountData, null);
    }

    global String execute(WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, WRAPPER_AccountList.AccountDetails sourceFeeAccountData) {
        String productId = null;
        String serviceId = null;
        return execute(sourceAccountData, recipientAccountData, sourceFeeAccountData, productId, serviceId);
    }

    global String execute(WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, WRAPPER_AccountList.AccountDetails sourceFeeAccountData, String productId, String serviceId) {
        this.result = ''; 
        String inputJson = '';  
        WS_CreatePaymentOperation.INPUT input;
        try {
            if (sourceAccountData == null) {
                throw new CustomException('You must inform the source account.');
            }
            if (recipientAccountData == null) {
                throw new CustomException('You must inform the recipient account.');
            }
            if (this.integrationType == 'B2B') {
                DateTime myDt = datetime.now();
                String today = myDT.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');               
                WS_CreatePaymentOperation.OperationGlobalStatus operationGlobalStatus = new WS_CreatePaymentOperation.OperationGlobalStatus('001', '000', today);
                WS_CreatePaymentOperation.Account sourceAccount = new WS_CreatePaymentOperation.Account(sourceAccountData.idType, sourceAccountData.displayNumber, sourceAccountData.currencyCodeAvailableBalance);
                WS_CreatePaymentOperation.Agent sourceAgent = new WS_CreatePaymentOperation.Agent(sourceAccountData.codigoBic, sourceAccountData.bankName, sourceAccountData.country);
                WS_CreatePaymentOperation.Address sourceAddress = null;
                if (sourceAccountData.address != null) {
                    sourceAddress = new WS_CreatePaymentOperation.Address(sourceAccountData.address.streetName, sourceAccountData.address.townName, sourceAccountData.address.country);
                } else {
                    // TO-DO
                }
                WS_CreatePaymentOperation.SourceData sourceData = new WS_CreatePaymentOperation.SourceData(sourceAccountData.subsidiaryName, sourceAccount, sourceAgent, sourceAddress, sourceAccountData.country, sourceAccountData.customerId);
                WS_CreatePaymentOperation.Account destinationAccount = new WS_CreatePaymentOperation.Account(recipientAccountData.idType, recipientAccountData.displayNumber, recipientAccountData.currencyCodeAvailableBalance);
                WS_CreatePaymentOperation.Agent destinationAgent = new WS_CreatePaymentOperation.Agent(recipientAccountData.codigoBic, recipientAccountData.bankName, recipientAccountData.country);
                WS_CreatePaymentOperation.Address destinationAddress = null;
                if (recipientAccountData.address != null) {
                    destinationAddress = new WS_CreatePaymentOperation.Address(recipientAccountData.address.streetName, recipientAccountData.address.townName, recipientAccountData.address.country);
                } else {
                    // TO-DO
                }
                WS_CreatePaymentOperation.DestinationData destinationData = new WS_CreatePaymentOperation.DestinationData(recipientAccountData.subsidiaryName, destinationAccount, destinationAgent, destinationAddress, recipientAccountData.country, recipientAccountData.customerId); 
                WS_CreatePaymentOperation.SourceData sourceFeeData = null; // FLOWERPOWER_PARCHE_CPC = new WS_CreatePaymentOperation.SourceData()
                if (sourceFeeAccountData != null) {   
                    WS_CreatePaymentOperation.Account sourceFeeAccount = new WS_CreatePaymentOperation.Account(sourceFeeAccountData.idType, sourceFeeAccountData.displayNumber, sourceFeeAccountData.currencyCodeAvailableBalance);
                    WS_CreatePaymentOperation.Agent sourceFeeAgent = new WS_CreatePaymentOperation.Agent(sourceFeeAccountData.codigoBic, sourceFeeAccountData.bankName, sourceFeeAccountData.countryName);
                    WS_CreatePaymentOperation.Address sourceFeeAddress = null;
                    if (sourceFeeAccountData.address != null) {
                        sourceFeeAddress = new WS_CreatePaymentOperation.Address(sourceFeeAccountData.address.streetName, sourceFeeAccountData.address.townName, sourceFeeAccountData.address.country);
                    } else {
                        // TO-DO
                    }
                    sourceFeeData = new WS_CreatePaymentOperation.SourceData(sourceFeeAccountData.subsidiaryName, sourceFeeAccount, sourceFeeAgent, sourceFeeAddress,  sourceFeeAccountData.country, sourceFeeAccountData.customerId);    
                }
                // String productId = '';
                // String serviceId ='';
                // if (String.isNotBlank(transferType)) {
                //     if (transferType == 'instant_transfer') { // FLOWERPOWER_PARCHE_BH
                //         productId = 'book_to_book';
                //         serviceId = 'add_international_payment_internal';
                //     } else {
                //         //TO-DO
                //     }
                // }
                WS_CreatePaymentOperation.CreateData createData = new WS_CreatePaymentOperation.CreateData(userData.globalId, sourceAccountData.codigoCorporate, 'gts', 'Order', productId, serviceId, operationGlobalStatus, sourceData, destinationData, sourceFeeData);

                input = new WS_CreatePaymentOperation.INPUT(createData);
            }
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            inputJson = JSON.serialize(input, true);
            String result = Global_IntegrationWrapper.launchHTTP(inputJson, this.baseEndpoint, this.baseMethod);
            if (String.isNotBlank(result)) {
                WS_CreatePaymentOperation.OUTPUT output = (WS_CreatePaymentOperation.OUTPUT) JSON.deserialize(result, WS_CreatePaymentOperation.OUTPUT.class);
                this.result = output.operationId;               
                WRAPPER_PaymentSF paymentSF = new WRAPPER_PaymentSF();
                paymentSF.paymentId = output.operationId;
                String JSONpaymentSF = JSON.serialize(paymentSF);
                HANDLER_Payment.createPayment(JSONpaymentSF);
            } else {
                throw new CustomException('Error when creating the payment identifier.');
            }
        } catch (Exception e) {
            System.debug('execute.WS_CreatePaymentOperation: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        

        return this.result;
    }

    global with sharing class INPUT {
        @AuraEnabled
        global CreateData createData {get;set;}

        global INPUT () {
            System.debug('WS_CreatePaymentOperation.INPUT');
        }

        global INPUT (CreateData createData) {
            this.createData = createData;
        }       
    }

    global with sharing class CreateData {
        @AuraEnabled
        global String globalUserId                         {get;set;}
        @AuraEnabled
        global String localCustomerId                      {get;set;}
        @AuraEnabled
        // global String documentType                         {get;set;}
        // @AuraEnabled
        // global String documentNumber                       {get;set;}
        // @AuraEnabled
        global String originPlatform                       {get;set;}
        @AuraEnabled
        global String operationType                        {get;set;}
        @AuraEnabled
        global String productId                             {get;set;}
        @AuraEnabled
        global String serviceId                            {get;set;}
        @AuraEnabled
        global OperationGlobalStatus operationGlobalStatus {get;set;}
        @AuraEnabled
        global SourceData sourceData                       {get;set;}
        @AuraEnabled
        global DestinationData destinationData             {get;set;}
        @AuraEnabled
        global SourceData sourceFeeData             {get;set;}
        //@AuraEnabled
        //global String customerIndicator             {get;set;}

        global CreateData () {
            System.debug('WS_CreatePaymentOperation.CreateData');
        }

        // global CreateData (String globalUserId, String localCustomerId, String documentType, String documentNumber, String originPlatform, String operationType, String serviceId, OperationGlobalStatus operationGlobalStatus, SourceData sourceData, DestinationData destinationData) {
        global CreateData (String globalUserId, String localCustomerId, String originPlatform, String operationType, String productId, String serviceId, OperationGlobalStatus operationGlobalStatus, SourceData sourceData, DestinationData destinationData, SourceData sourceFeeData) {
            this.globalUserId = globalUserId;
            this.localCustomerId = localCustomerId;
            // this.documentType = documentType;
            // this.documentNumber = documentNumber;
            this.originPlatform = originPlatform;
            this.operationType = operationType;
            this.productId = productId;
            this.serviceId = serviceId;
            this.operationGlobalStatus = operationGlobalStatus;
            this.sourceData = sourceData;
            this.destinationData = destinationData;
            this.sourceFeeData = sourceFeeData;
        }
    }

    global with sharing class OperationGlobalStatus {
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String reason {get;set;}
        @AuraEnabled
        global String statusDate {get;set;}

        global OperationGlobalStatus () {
            System.debug('WS_CreatePaymentOperation.OperationGlobalStatus');
        }

        global OperationGlobalStatus (String status, String reason, String statusDate) {
            this.status = status;
            this.reason = reason;
            this.statusDate = statusDate;
        }
    }

    global with sharing class SourceData {
        @AuraEnabled
        global String name           {get;set;}
        @AuraEnabled
        global String customerId           {get;set;}
        @AuraEnabled
        global Address sourceAddress {get;set;}
        @AuraEnabled
        global Account sourceAccount {get;set;}
        @AuraEnabled
        global Agent sourceAgent     {get;set;}
        @AuraEnabled
        global String country        {get;set;}

        global SourceData () {
            System.debug('WS_CreatePaymentOperation.SourceData');
        }

        global SourceData (String name, Account sourceAccount, Agent sourceAgent, Address sourceAddress, String country, String customerId) {
            this.name = name;
            this.sourceAccount = sourceAccount;
            this.sourceAgent = sourceAgent;
            this.sourceAddress = sourceAddress;
            this.country = country;
            this.customerId = customerId;
        }
    }

    global with sharing class Account {
        @AuraEnabled
        global String accountType {get;set;}
        @AuraEnabled
        global String accountId   {get;set;}
        @AuraEnabled
        global String tcurrency   {get;set;}
        
        global Account () {
            System.debug('WS_CreatePaymentOperation.Account');
        }

        global Account (String accountType, String accountId, String tcurrency) {
            this.accountType = accountType;
            this.accountId = accountId;
            this.tcurrency = tcurrency;
        }
    }

    global with sharing class Agent {
        @AuraEnabled
        global String agentId {get;set;}
        @AuraEnabled
        global String name    {get;set;}
        @AuraEnabled
        global String address {get;set;}
        
        global Agent () {
            System.debug('WS_CreatePaymentOperation.Agent');
        }

        global Agent (String agentId, String name, String address) {
            this.agentId = agentId;
            this.name = name;
            this.address = address;
        }
    }
    
    global class Address {
        @AuraEnabled
		global String streetName {get;set;}
        @AuraEnabled
		global String townName {get;set;}
		@AuraEnabled
		global String country {get;set;}
		global Address () {}  
        
		global Address (String streetName, String townName, String country) {
            this.streetName = streetName;
            this.townName = townName;
            this.country = country;       
        }  
	}
    

    global with sharing class DestinationData {
        @AuraEnabled
        global String name                {get;set;}
        @AuraEnabled
        global String customerId                {get;set;}
        @AuraEnabled
        global Address destinationAddress {get;set;}
        @AuraEnabled
        global Account destinationAccount {get;set;}
        @AuraEnabled
        global Agent destinationAgent     {get;set;}
        @AuraEnabled
        global String country             {get;set;}

        global DestinationData () {
            System.debug('WS_CreatePaymentOperation.DestinationData');
        }

        global DestinationData (String name, Account destinationAccount, Agent destinationAgent, Address destinationAddress, String country, String customerId) {
            this.name = name;
            this.destinationAccount = destinationAccount;
            this.destinationAgent = destinationAgent;
            this.destinationAddress = destinationAddress;
            this.country = country;
            this.customerId = customerId;
        }
    } 

    global with sharing class OUTPUT { 
        @AuraEnabled 
        global String operationId {get;set;}

        global OUTPUT () {
            System.debug('WS_CreatePaymentOperation.OUTPUT');
        }
    }
}