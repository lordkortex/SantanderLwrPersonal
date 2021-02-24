global with sharing class WS_TransferFees {

    private String baseEndpoint;
    private String baseMethod;
    private String tokenPlatform;
    private String tokenUser;

    private WRAPPER_B2B_Data.AccountData accountData;
    private String payment_id;
    private String integrationType;
    private Map<String, Object> result;

    private String endPoint;
    private String endPointParameters;

    public void setPaymentId (String payment_id) {
        this.payment_id = payment_id;
    }

    public void setIntegrationType (String integrationType) {
        this.integrationType = integrationType;
    }

    public Map<String, Object> getResult () {
        return this.result;
    }

    public WS_TransferFees (String payment_id, String integrationType, WRAPPER_B2B_Data.AccountData accountData) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_TransferFees');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
        this.accountData = accountData;
        this.payment_id = payment_id;
        this.integrationType = integrationType;
    }

    public Map<String, Object> execute (WRAPPER_B2B_Data.PaymentAmount paymentData, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
        this.result = new Map<String, Object>(); 
        try {
            this.endPointParameters = '';
            if (integrationType == 'b2b') {
                getParameters('product_id', 'book_to_book');
                // getParameters('operation_type', 'Order'); // FLOWERPOWER_PARCHE_CPC
                getParameters('operation_id', this.payment_id); 
                getParameters('agreement_type', 'Product');
                getParameters('agreement_id', sourceAccountData.displayNumber);
                getParameters('customer_id', sourceAccountData.codigoCorporate);
                getParameters('bank_id', sourceAccountData.codigoBic);
                getParameters('branch_id', sourceAccountData.branch);
                getParameters('currency', recipientAccountData.currencyCodeAvailableBalance.trim());
                getParameters('payment_amount', String.valueOf(paymentData.amountReceive));
                getParameters('urgency_indicator', 'Standard');
                if (sourceAccountData.country == recipientAccountData.country) {
                    getParameters('country_indicator', 'equal');
                } else {
                    getParameters('country_indicator', 'different');
                }
                if (sourceAccountData.codigoBic == recipientAccountData.codigoBic) { 
                    getParameters('entity_indicator', 'equal');
                } else {
                    getParameters('entity_indicator', 'different');
                }
                if (sourceAccountData.codigoCorporate == recipientAccountData.codigoCorporate) { 
                    getParameters('customer_indicator', 'equal');
                } else {
                    getParameters('customer_indicator', 'different');
                }
                getParameters('purpose_code', 'OTHR');
            }
            if (String.isNotBlank(this.endPointParameters)) {
                this.endPoint = this.baseEndpoint + '?' + this.endPointParameters;
            } else {
                this.endPoint = this.baseEndpoint;
            }
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Global-Payment-Id', this.payment_id);
            String result = Global_IntegrationWrapper.launchHTTP('', this.endpoint, this.baseMethod);
            if (String.isNotBlank(result)) {
                WS_TransferFees.OUTPUT output = (WS_TransferFees.OUTPUT) JSON.deserialize(result, WS_TransferFees.OUTPUT.class);
                this.result = getMapData(output, paymentData.amountReceive, sourceAccountData.currencyCodeAvailableBalance.trim());
            } else {
                throw new CustomException('Error when consulting the transaction fees server');
            }
            // PAYMENTS_PARCHE_FLOWERPOWER_BH
            /* Double transactionFee = 2;
            String transactionFeeCurrency = 'EUR';
            WS_TransferFees.OUTPUT output = new WS_TransferFees.OUTPUT();
            output.transactionFee = String.valueOf(transactionFee);
            output.transactionFeeCurrency = String.valueOf(transactionFeeCurrency);
            result.put('transactionFee', transactionFee);
            result.put('transactionFeeCurrency', transactionFeeCurrency);
            result.put('output', output);
            this.result = result; */
            //FIN DE PARCHE
        } catch (Exception e) {
            System.debug('execute.WS_TransferFees: ' + e.getMessage()+' line '+e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    private String getParameters (String fieldName, String field) {
        if (String.isNotBlank(fieldName) && String.isNotBlank(field)) {
            if (String.isNotBlank(this.endPointParameters) && this.endPointParameters.substring(this.endPointParameters.length()-1, this.endPointParameters.length()) != '&') {
                this.endPointParameters = this.endPointParameters + '&';
            }
            this.endPointParameters = this.endPointParameters + fieldName + '=' + field;
        }
        return this.endPointParameters;
    }

    private Map<String, Object> getMapData (WS_TransferFees.OUTPUT output, Decimal paymentAmount, String originCurrency) {
        Map<String, Object> result = new Map<String, Object>();
        Double transactionFee = 0;
        String transactionFeeCurrency = null;
        if (output != null) {
            if (String.isBlank(output.status)) {
                if (output.currencyList != null && !output.currencyList.isEmpty()) {
                    for (WS_TransferFees.CurrencyList currencyElement : output.currencyList) {
                        if (currencyElement.conceptsList != null && !currencyElement.conceptsList.isEmpty()) {
                            for (WS_TransferFees.Concepts concept : currencyElement.conceptsList) {
                                if (concept.conceptAmount != null) {
                                    transactionFee += concept.conceptAmount.amount; 
                                    transactionFeeCurrency = concept.conceptAmount.tcurrency.trim();
                                } else {
                                    throw new CustomException('conceptAmount element about fees is not informed.');
                                }
                            }
                        } else {
                            throw new CustomException('conceptsList element about fees is not informed.');
                        }
                    }
                } else {
                    throw new CustomException('currencyList element about fees is not informed.');
                }
            } else {
                throw new CustomException(output.status);
            }
        } else {
            throw new CustomException('output is not informed.');
        }
        output.transactionFee = String.valueOf(transactionFee);
        output.transactionFeeCurrency = String.valueOf(transactionFeeCurrency);
        result.put('transactionFee', transactionFee);
        result.put('transactionFeeCurrency', transactionFeeCurrency);
        result.put('output', output);
        return result;
    }

    global with sharing class OUTPUT { 
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String transactionFee {get;set;}
        @AuraEnabled
        global String transactionFeeCurrency {get;set;}
        @AuraEnabled
        global String productName {get;set;}
        @AuraEnabled
        global List<CurrencyList> currencyList {get;set;}
        @AuraEnabled
        global Boolean OperacionGastosCompartidos {get;set;}
        @AuraEnabled
        global List<PageData> pageDataList {get;set;}
        
        global OUTPUT () {
        }
    }

    global with sharing class PageData {
        @AuraEnabled
        global String rel {get;set;}
        @AuraEnabled
        global String href {get;set;}

        global PageData () {
        }
    }

    global with sharing class CurrencyList {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String currencyName {get;set;}
        @AuraEnabled
        global List<Concepts> conceptsList {get;set;}
        
        global CurrencyList () {
        }
    }

    global with sharing class Concepts {
        @AuraEnabled
        global String conceptId {get;set;}
        @AuraEnabled
        global String conceptName {get;set;}
        @AuraEnabled
        global SpecialPrice specialPrice {get;set;}
        @AuraEnabled
        global StandardPrice standardPrice {get;set;}
        @AuraEnabled
        global ConceptAmount conceptAmount {get;set;}
        
        global Concepts () {
        }
    }

    global with sharing class ConceptAmount {
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double fixing {get;set;}
        
        global ConceptAmount () {
        }
    }

    global with sharing class SpecialPrice {
        @AuraEnabled
        global String specialPriceLevel {get;set;}
        @AuraEnabled
        global List<SpecialTiers> specialTiersList {get;set;}
        
        global SpecialPrice () {
        }
    }
    
    global with sharing class SpecialTiers {
        @AuraEnabled
        global Double specialAmountTier {get;set;}
        @AuraEnabled
        global String specialAmountTierType {get;set;}
        @AuraEnabled
        global SpecialFixedAmountPrice specialFixedAmountPrice {get;set;}
        @AuraEnabled
        global SpecialFixedRatePrice specialFixedRatePrice {get;set;}
        
        global SpecialTiers () {
        }
    }
    
    global with sharing class SpecialFixedAmountPrice {
        @AuraEnabled
        global Double specialFixedAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global SpecialFixedAmountPrice () {
        }
    }
    
    global with sharing class SpecialFixedRatePrice {
        @AuraEnabled
        global Double specialRate {get;set;}
        @AuraEnabled
        global Double specialMinimumAmount {get;set;}
        @AuraEnabled
        global Double specialMaximumAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global SpecialFixedRatePrice () {
        }
    }

    global with sharing class StandardPrice {
        @AuraEnabled
        global List<StandardTiers> standardTiersList {get;set;}
        
        global StandardPrice () {
        }
    }

    global with sharing class StandardTiers {
        @AuraEnabled
        global Double standardAmountTier {get;set;}
        @AuraEnabled
        global String standardAmountTierType {get;set;}
        @AuraEnabled
        global StandardFixedRatePrice standardFixedRatePrice {get;set;}
        @AuraEnabled
        global StandardFixedAmountPrice standardFixedAmountPrice {get;set;}
        
        global StandardTiers () {
        }
    }

    global with sharing class StandardFixedAmountPrice {
        @AuraEnabled
        global Double standardFixedAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global StandardFixedAmountPrice () {
        }
    }

    global with sharing class StandardFixedRatePrice {
        @AuraEnabled
        global Double standardRate {get;set;}
        @AuraEnabled
        global Double standardMinimumAmount {get;set;}
        @AuraEnabled
        global Double standardMaximumAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global StandardFixedRatePrice () {
        }
    }
}