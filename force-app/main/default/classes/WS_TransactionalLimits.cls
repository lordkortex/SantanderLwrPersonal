global with sharing class WS_TransactionalLimits {

    private String method;
    private String endPoint;
    private String tokenPlatform;
    private String tokenUser;

    private String integrationType;
    private String paymentId;

    WRAPPER_B2B_Data.PaymentAmount paymentData;
    //26/10/2020 - Shahad Naji - WrapperUserData 
    //private WRAPPER_B2B_Data.UserData userData;
    private WrapperUserData userData;
    private WRAPPER_B2B_Data.AccountData accountData;
    
    private Map<String, Object> result;

    public Map<String, Object> getResult () {
        return this.result;
    }

    //26/10/2020 - Shahad Naji - WrapperUserData
    public WS_TransactionalLimits (String integrationType, String paymentId,WrapperUserData /*WRAPPER_B2B_Data.UserData*/ userData, WRAPPER_B2B_Data.AccountData accountData) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_TransactionalLimits');
        this.endpoint = configWs.CNT_Endpoint__c;
        this.method = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
        this.integrationType = integrationType;
        this.paymentId = paymentId;
        this.userData = userData;
        this.accountData = accountData;
    }

    public Map<String, Object> execute(WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, Decimal baseAmount, String baseCurrency) {
        this.result = new Map<String, Object>(); 
        WS_TransactionalLimits.INPUT input;
        String userType = '';
        String inputJson = '';  

        try {
            if (this.integrationType == 'b2b') { 
                //26/10/2020 - Shahad Naji - WrapperUserData
                if ((this.userData.cashNexus == true) || (this.userData.multiOneTrade == true)) {
                    userType = 'nexus';
                } else {
                    userType = 'nonexus';
                }
                WS_TransactionalLimits.AmountCurrency transactionAmount = new WS_TransactionalLimits.AmountCurrency(paymentData.amountSend, sourceAccountData.currencyCodeAvailableBalance);
                WS_TransactionalLimits.AmountCurrency transactionAmountBaseCurrency = new WS_TransactionalLimits.AmountCurrency(paymentData.amountSend, baseCurrency);
                WS_TransactionalLimits.TransactionContract transactionContract = new WS_TransactionalLimits.TransactionContract (sourceAccountData.idType, sourceAccountData.displayNumber);
                WS_TransactionalLimits.NominalAmountCurrency operationNominal = new WS_TransactionalLimits.NominalAmountCurrency(paymentData.amountSend, sourceAccountData.currencyCodeAvailableBalance);
                WS_TransactionalLimits.NominalAmountCurrency operationBaseCurrencyNominal = new WS_TransactionalLimits.NominalAmountCurrency(paymentData.amountSend, baseCurrency);
                // WS_TransactionalLimits.DocumentID documentId = new WS_TransactionalLimits.DocumentID(accountData.documentType, accountData.documentNumber);
                WS_TransactionalLimits.DataRequestOperationLimit dataRequestOperationLimit = new WS_TransactionalLimits.DataRequestOperationLimit('Web', null, sourceAccountData.codigoCorporate, operationBaseCurrencyNominal, operationNominal, getDate(), this.integrationType, transactionContract, transactionAmount, transactionAmountBaseCurrency);
               //26/10/2020 - Shahad Naji - WrapperUserData
                input = new WS_TransactionalLimits.INPUT((this.userData.cashNexus || this.userData.multiOneTrade), dataRequestOperationLimit, this.paymentId);
            }

            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('userType', userType);
            extraHeaderParameters.put('X-Company-san', sourceAccountData.subsidiaryName);
            extraHeaderParameters.put('X-Santander-Client-Id', this.userData.userId);
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId);

            inputJson = JSON.serialize(input, true);

            TokenInformation tokenInformation = new TokenInformation(null, this.tokenPlatform, this.tokenUser);
            String serviceResponse = Global_IntegrationWrapper.launchHTTP(inputJson, this.endPoint, this.method, extraHeaderParameters, null, null, 25000, tokenInformation);

            if (String.isNotBlank(serviceResponse)) {
                WS_TransactionalLimits.OUTPUT output = (WS_TransactionalLimits.OUTPUT) JSON.deserialize(serviceResponse, WS_TransactionalLimits.OUTPUT.class);
                this.result = getMapData(output);
            } else {
                throw new CustomException('Error when consulting the transaction limits.');
            }
        } catch (Exception e) {
            System.debug('execute.WS_TransactionalLimits: ' + e.getMessage() + ', ' + ' in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }

        return this.result;
    }

    private Map<String, Object> getMapData (WS_TransactionalLimits.OUTPUT output) {
        Map<String, Object> result = new Map<String, Object>();

        String limitsResult = '';
        String errorMessage = '';

        if (output != null) {
            if (output.limitsResult.contains('OK')) {
                limitsResult = output.limitsResult;
                errorMessage = null;
            } else {
                limitsResult = output.limitsResult;
                errorMessage = output.codeLimitsResult;
            }
        }
       
        result.put('limitsResult', limitsResult);
        result.put('errorMessage', errorMessage);
        result.put('output', output);

        return result;
    }

    global with sharing class INPUT {

        global Boolean usuarioNexus                                                     {get;set;}
        global DataRequestOperationLimit dataRequestOperationLimit                      {get;set;}
        global String operationReference                                                {get;set;}

        global INPUT () {
            System.debug('WS_TransactionalLimits.INPUT');
        }

        global INPUT (Boolean usuarioNexus, DataRequestOperationLimit dataRequestOperationLimit, String operationReference) {
            this.usuarioNexus = usuarioNexus;
            this.dataRequestOperationLimit = dataRequestOperationLimit;
            this.operationReference = operationReference;
        }
    }

    global with sharing class DataRequestOperationLimit {

        global String accessChannel                               {get;set;}
        global String channelAccessAgreementId                    {get;set;}
        global String customerId                                  {get;set;}
        global NominalAmountCurrency operationBaseCurrencyNominal {get;set;}
        global NominalAmountCurrency operationNominal             {get;set;}
        global String operationalDateRequested                    {get;set;}
        global String serviceId                                   {get;set;}
        global TransactionContract transactionContract            {get;set;}
        global AmountCurrency transactionAmount                   {get;set;}
        global AmountCurrency transactionAmountBaseCurrency       {get;set;}

        global DataRequestOperationLimit () {
            System.debug('WS_TransactionalLimits.DataRequestOperationLimit');
        }

        global DataRequestOperationLimit (String accessChannel, String channelAccessAgreementId, String customerId, NominalAmountCurrency operationBaseCurrencyNominal, NominalAmountCurrency operationNominal, String operationalDateRequested, String serviceId, TransactionContract transactionContract, AmountCurrency transactionAmount, AmountCurrency transactionAmountBaseCurrency) {
            this.accessChannel = accessChannel;
            this.channelAccessAgreementId = channelAccessAgreementId;
            this.customerId = customerId;
            this.operationBaseCurrencyNominal = operationBaseCurrencyNominal;
            this.operationNominal = operationNominal;
            this.operationalDateRequested = operationalDateRequested;
            this.serviceId = serviceId;
            this.transactionContract = transactionContract;
            this.transactionAmount = transactionAmount;
            this.transactionAmountBaseCurrency = transactionAmountBaseCurrency;
        }
    }

    global with sharing class NominalAmountCurrency {

        global String nominalAmount                                                     {get;set;} 
        global String nominalCurrency                                                   {get;set;}

        global NominalAmountCurrency () {
            System.debug('WS_TransactionalLimits.NominalAmountCurrency');
        }

        global NominalAmountCurrency (Decimal nominalAmount, String nominalCurrency) {
            this.nominalAmount = String.valueOf(nominalAmount);
            this.nominalCurrency = nominalCurrency;
        }
    }

    global with sharing class AmountCurrency {

        global String amount                                                            {get;set;} 
        global String tcurrency                                                         {get;set;}

        global AmountCurrency () {
            System.debug('WS_TransactionalLimits.AmountCurrency');
        }

        global AmountCurrency (Decimal amount, String tcurrency) {
            this.amount = String.valueOf(amount);
            this.tcurrency = tcurrency;
        }
    }

    global with sharing class TransactionContract {

        global String contractType                                                      {get;set;} 
        global String contractId                                                        {get;set;}

        global TransactionContract () {
            System.debug('WS_TransactionalLimits.TransactionContract');
        }

        global TransactionContract (String contractType, String contractId) {
            this.contractType = contractType;
            this.contractId = contractId;
        }
    }

    global with sharing class OUTPUT { 

        @AuraEnabled
        global String limitsResult                                                      {get;set;}
        @AuraEnabled
        global String codeLimitsResult                                                  {get;set;}
    }

    public String getDate() {
        Date today = Date.today();
        return String.valueOf(today);
    }
}