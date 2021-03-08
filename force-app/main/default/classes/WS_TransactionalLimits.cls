global with sharing class WS_TransactionalLimits {

    private String method;
    private String endPoint;
    private String tokenPlatform;
    private String tokenUser;

    private String integrationType;
    private String paymentId;

    WRAPPER_B2B_Data.PaymentAmount paymentData;
    //26/10/2020 - Shahad Naji - Next line is commented to declare userData as WrapperUserData instead of WRAPPER_B2B_Data.UserData
    //private WRAPPER_B2B_Data.UserData userData;
    private WrapperUserData userData;
    private WRAPPER_B2B_Data.AccountData accountData;
    
    private Map<String, Object> result;

    public Map<String, Object> getResult () {
        return this.result;
    }

    // 26/10/2020 - Shahad Naji - userData is an  WrapperUserData instead of WRAPPER_B2B_Data.UserData
    public WS_TransactionalLimits (String integrationType, String paymentId, WrapperUserData userData) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_TransactionalLimits');
        this.endpoint = configWs.CNT_Endpoint__c;
        this.method = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
        this.integrationType = integrationType;
        this.paymentId = paymentId;
        this.userData = userData;
    }

    //26/10/2020 - Shahad Naji - userData is an  WrapperUserData instead of WRAPPER_B2B_Data.UserData
    public WS_TransactionalLimits (String integrationType, String paymentId, WrapperUserData userData, WRAPPER_B2B_Data.AccountData accountData) {
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

    /*
    Author:         Candido
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits.
    History:
    <Date>          <Author>                <Description>
    01/02/2021      Candido                 Initial version
    */
    public Map<String, Object> execute (WRAPPER_PAY_PaymentDraft paymentDraft, Decimal baseAmount, String baseCurrency) {
        this.result = new Map<String, Object>();
        WS_TransactionalLimits.INPUT input;
        String userType = '';
        String inputJson = '';
        try {
            String sourceCustomerId = paymentDraft.sourceAccount.codigoCorporate;
            if ((this.userData.cashNexus == true) || (this.userData.multiOneTrade == true)) {
                userType = 'nexus';
                if (paymentDraft.sourceAccount.companyIdsList != null &&  String.isNotBlank(paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_GTSIdentifier))) {
                    sourceCustomerId = paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_GTSIdentifier);
                }
            } else {
                userType = 'nonexus';
                if (paymentDraft.sourceAccount.companyIdsList != null &&  String.isNotBlank(paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier))) {
                    sourceCustomerId = paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier);
                }
            }
            WS_TransactionalLimits.AmountCurrency transactionAmount = new WS_TransactionalLimits.AmountCurrency(paymentDraft.amountSend, paymentDraft.sourceAccount.currencyCodeAvailableBalance);
            WS_TransactionalLimits.AmountCurrency transactionAmountBaseCurrency = new WS_TransactionalLimits.AmountCurrency(baseAmount, baseCurrency);
            WS_TransactionalLimits.TransactionContract transactionContract = new WS_TransactionalLimits.TransactionContract (paymentDraft.sourceAccount.idType, paymentDraft.sourceAccount.displayNumber);
            WS_TransactionalLimits.NominalAmountCurrency operationNominal = new WS_TransactionalLimits.NominalAmountCurrency(paymentDraft.amountSend, paymentDraft.sourceAccount.currencyCodeAvailableBalance);
            WS_TransactionalLimits.NominalAmountCurrency operationBaseCurrencyNominal = new WS_TransactionalLimits.NominalAmountCurrency(baseAmount, baseCurrency);
            WS_TransactionalLimits.DataRequestOperationLimit dataRequestOperationLimit = new WS_TransactionalLimits.DataRequestOperationLimit('Web', null, sourceCustomerId, operationBaseCurrencyNominal, operationNominal, getDate(), this.integrationType, transactionContract, transactionAmount, transactionAmountBaseCurrency);
            input = new WS_TransactionalLimits.INPUT((this.userData.cashNexus || this.userData.multiOneTrade), dataRequestOperationLimit, this.paymentId);
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('userType', userType != null ? userType : '');
            extraHeaderParameters.put('X-Company-san', paymentDraft.sourceAccount.subsidiaryName != null ? paymentDraft.sourceAccount.subsidiaryName : '');
            extraHeaderParameters.put('X-Santander-Client-Id', this.userData.userId != null ? this.userData.userId : '');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId != null ? this.paymentId : '');
            inputJson = JSON.serialize(input, true);
            TokenInformation tokenInformation = new TokenInformation(null, this.tokenPlatform, this.tokenUser);
            String serviceResponse = Global_IntegrationWrapper.launchHTTP(inputJson, this.endPoint, this.method, extraHeaderParameters, null, null, 25000, tokenInformation);
            if (String.isNotBlank(serviceResponse)) {
                WS_TransactionalLimits.OUTPUT output = (WS_TransactionalLimits.OUTPUT) JSON.deserialize(serviceResponse, WS_TransactionalLimits.OUTPUT.class);
                this.result = getMapData(output, baseAmount, baseCurrency);
            } else {
                throw new CustomException('Error when consulting the transaction limits.');
            }
        } catch (Exception e) {
            System.debug('execute.WS_TransactionalLimits: ' + e.getMessage() + ', ' + ' in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }


    public Map<String, Object> execute(WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, Decimal baseAmount, String baseCurrency) {
        this.result = new Map<String, Object>(); 
        WS_TransactionalLimits.INPUT input;
        String userType = '';
        String inputJson = '';  

        try {
            if (this.integrationType == 'b2b') { 
                
                String sourceCustomerId = sourceAccountData.codigoCorporate;
                

                //26/10/2020 - Shahad Naji - WrapperUserData
                if ((this.userData.cashNexus == true) || (this.userData.multiOneTrade == true)) {
                    userType = 'nexus';
                    if(sourceAccountData.companyIdsList != null &&  String.isNotBlank(sourceAccountData.companyIdsList.get('LOCAL'))){
                        sourceCustomerId = sourceAccountData.companyIdsList.get('GLOBAL');
                    }
                } else {
                    userType = 'nonexus';
                    if(sourceAccountData.companyIdsList != null &&  String.isNotBlank(sourceAccountData.companyIdsList.get('LOCAL'))){
                        sourceCustomerId = sourceAccountData.companyIdsList.get('LOCAL');
                    }
                }
                WS_TransactionalLimits.AmountCurrency transactionAmount = new WS_TransactionalLimits.AmountCurrency(paymentData.amountSend, sourceAccountData.currencyCodeAvailableBalance);
                //03/12/2020 - Shahad Naji - Next line is commented to initiate the transactionAmountBaseCurrency with baseAmount  
                //WS_TransactionalLimits.AmountCurrency transactionAmountBaseCurrency = new WS_TransactionalLimits.AmountCurrency(paymentData.amountSend, baseCurrency);
                WS_TransactionalLimits.AmountCurrency transactionAmountBaseCurrency = new WS_TransactionalLimits.AmountCurrency(baseAmount, baseCurrency);
                WS_TransactionalLimits.TransactionContract transactionContract = new WS_TransactionalLimits.TransactionContract (sourceAccountData.idType, sourceAccountData.displayNumber);
                WS_TransactionalLimits.NominalAmountCurrency operationNominal = new WS_TransactionalLimits.NominalAmountCurrency(paymentData.amountSend, sourceAccountData.currencyCodeAvailableBalance);
                //03/12/2020 - SNJ - Next line is commented to initiate operationBaseCurrencyNominal variable with baseAmount  
               // WS_TransactionalLimits.NominalAmountCurrency operationBaseCurrencyNominal = new WS_TransactionalLimits.NominalAmountCurrency(paymentData.amountSend, baseCurrency);
                WS_TransactionalLimits.NominalAmountCurrency operationBaseCurrencyNominal = new WS_TransactionalLimits.NominalAmountCurrency(baseAmount, baseCurrency);
                // WS_TransactionalLimits.DocumentID documentId = new WS_TransactionalLimits.DocumentID(accountData.documentType, accountData.documentNumber);
                               
                WS_TransactionalLimits.DataRequestOperationLimit dataRequestOperationLimit = new WS_TransactionalLimits.DataRequestOperationLimit('Web', null, sourceCustomerId, operationBaseCurrencyNominal, operationNominal, getDate(), this.integrationType, transactionContract, transactionAmount, transactionAmountBaseCurrency);
               //26/10/2020 - Shahad Naji - WrapperUserData
                input = new WS_TransactionalLimits.INPUT((this.userData.cashNexus || this.userData.multiOneTrade), dataRequestOperationLimit, this.paymentId);
            }

            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('userType', userType != null ? userType : '');
            extraHeaderParameters.put('X-Company-san', sourceAccountData.subsidiaryName != null ? sourceAccountData.subsidiaryName : '');
            extraHeaderParameters.put('X-Santander-Client-Id', this.userData.userId != null ? this.userData.userId : '');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId != null ? this.paymentId : '');

            inputJson = JSON.serialize(input, true);

            TokenInformation tokenInformation = new TokenInformation(null, this.tokenPlatform, this.tokenUser);
            system.debug('>>> HERE userType: ' + userType);        
            system.debug('>>> HERE sourceAccountData.subsidiaryName: ' + sourceAccountData.subsidiaryName);
            system.debug('>>> HERE this.userData.userId: ' + this.userData.userId);
            system.debug('>>> HERE this.paymentId: ' + this.paymentId);
            system.debug('>>> HERE inputJson: ' + inputJson);
            system.debug('>>> HERE this.endPoint: ' + this.endPoint);
            system.debug('>>> HERE this.method: ' + this.method);
            system.debug('>>> HERE extraHeaderParameters: ' + extraHeaderParameters);
            system.debug('>>> HERE tokenInformation: ' + tokenInformation);
            String serviceResponse = Global_IntegrationWrapper.launchHTTP(inputJson, this.endPoint, this.method, extraHeaderParameters, null, null, 25000, tokenInformation);

            if (String.isNotBlank(serviceResponse)) {
                WS_TransactionalLimits.OUTPUT output = (WS_TransactionalLimits.OUTPUT) JSON.deserialize(serviceResponse, WS_TransactionalLimits.OUTPUT.class);
                this.result = getMapData(output, baseAmount, baseCurrency);
            } else {
                throw new CustomException('Error when consulting the transaction limits.');
            }
        } catch (Exception e) {
            System.debug('execute.WS_TransactionalLimits: ' + e.getMessage() + ', ' + ' in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }

        return this.result;
    }

   @TestVisible  private Map<String, Object> getMapData (WS_TransactionalLimits.OUTPUT output) {
        /*Map<String, Object> result = new Map<String, Object>();

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

        return result;*/
       return getMapData (output, null, null);
    }
    
     @TestVisible  private Map<String, Object> getMapData (WS_TransactionalLimits.OUTPUT output, Decimal baseAmount, String baseCurrency) {
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
         if(baseAmount != null){
             result.put('baseAmount', baseAmount);  
         }
         if(String.isNotBlank(baseCurrency)){
             result.put('baseCurrency', baseCurrency);
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