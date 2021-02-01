global with sharing class WS_ExchangeRate {

    private String method;
    private String endPoint;
    private String tokenPlatform;
    private String tokenUser;
    private String payment_id;
    private String integrationType;
    private String requestType;
    private String priceType;
    private Integer timer;

    private Map<String, Object> result;

    private WS_ExchangeRate.INPUT inputWrapper;
    private WS_ExchangeRate.OUTPUT outputWrapper;
    private WRAPPER_B2B_Data.AccountData accountData;


    global void setIntegrationType (String integrationType) {
        this.integrationType = integrationType;
    }

    global WS_ExchangeRate (String payment_id, String integrationType, String requestType, String priceType, WRAPPER_B2B_Data.AccountData accountData) {
        setParameters(payment_id, integrationType, requestType, priceType, accountData, 25000);
    }

    global  WS_ExchangeRate (String payment_id, String integrationType, String requestType, String priceType, WRAPPER_B2B_Data.AccountData accountData, Integer timer) {
        setParameters(payment_id, integrationType, requestType, priceType, accountData, timer);
    }

    public void setParameters (String payment_id, String integrationType, String requestType, String priceType, WRAPPER_B2B_Data.AccountData accountData, Integer timer) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_ExchangeRate');
        this.endPoint = configWs.CNT_Endpoint__c;
        this.method = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
        this.payment_id = payment_id;
        this.accountData = accountData;
        this.integrationType = integrationType;
        this.requestType = requestType;
        this.priceType = priceType;
        this.timer = timer;
    }

    global Map<String, Object> execute (Decimal amountSend, Decimal amountReceive, String currencySend, String currencyReceiver, String sourceAlias, String sourceAliasEntidad, String customerId, String country, String codigoBIC) {
        this.result = new Map<String, Object>(); 
        String inputJson = '';  
        try {
            WS_ExchangeRate.INPUT input;
            Decimal amountToConvert;
            if (this.integrationType == 'b2b') {
                String originAmount;
                if (amountSend == null) {
                    originAmount = null;
                } else {
                    originAmount = String.valueOf(amountSend);
                    amountToConvert = amountSend;
                }
                String destinationAmount;
                if (amountReceive == null) {
                    destinationAmount = null;
                } else {
                    destinationAmount = String.valueOf(amountReceive);
                    amountToConvert = amountReceive;
                }

                if (String.isBlank(currencySend) || String.isBlank(currencyReceiver)) {
                    throw new CustomException('Error when consulting the exchange rate service.');
                }
                WS_ExchangeRate.SellNominal sellData = new WS_ExchangeRate.SellNominal(destinationAmount, currencyReceiver);
                WS_ExchangeRate.BuyNominal buyData = new WS_ExchangeRate.BuyNominal(originAmount, currencySend);
                WS_ExchangeRate.DocumentId documentID = null;
                String documentType = null;
                String documentNumber = null;
                String discount = null;
                if (String.isBlank(customerId)) {
                    customerId = null;
                    if (String.isNotBlank(this.accountData.documentType)) {
                        documentType = this.accountData.documentType;
                    }
                    if (String.isNotBlank(this.accountData.documentNumber)) {
                        documentNumber = this.accountData.documentNumber;
                    }
                    if (String.isNotBlank(documentType) || String.isNotBlank(documentNumber) ) {
                        documentID = new WS_ExchangeRate.DocumentId(documentType, documentNumber);
                    }
                }
                if (String.isBlank(sourceAliasEntidad)) {
                    sourceAliasEntidad = null;
                }
                if (String.isBlank(sourceAlias)) {
                    sourceAlias = null;
                }
                if (String.isBlank(country)) {
                    country = null;
                }
                if (String.isBlank(codigoBIC)) {
                    codigoBIC = null;
                }
                //String valueDateRequested = String.valueOf(Date.today());
                /*WS_ExchangeRate.SmeBusinessCustomerId smeBusinessCustomerId = null;
                if (sourceAliasEntidad != null || sourceAlias != null || documentID != null) {*/
                     WS_ExchangeRate.SmeBusinessCustomerId smeBusinessCustomerId = new WS_ExchangeRate.SmeBusinessCustomerId(sourceAliasEntidad, sourceAlias, documentID);
                //}
                WS_ExchangeRate.DataCountervalueFx dataCounterValue = new WS_ExchangeRate.DataCountervalueFx(this.requestType, discount, priceType, sellData, buyData, customerId, smeBusinessCustomerId); 
                input = new WS_ExchangeRate.INPUT('Web', this.payment_id, dataCounterValue);
            }
            this.inputWrapper = input;
            inputJson = JSON.serialize(input, true);

            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Global-Payment-Id', this.payment_id);

            String timeStamp = '';
            TokenInformation tokenInformation = new TokenInformation(country, this.tokenPlatform, this.tokenUser, null, codigoBic);
            String response = Global_IntegrationWrapper.launchHTTP(inputJson, this.endPoint, this.method, extraHeaderParameters, null, null, this.timer, tokenInformation);
            if (String.isNotBlank(response)) {
                DateTime now = DateTime.now();
                String minute = String.valueOf(now.minute());
                if (now.minute() < 10) {
                    minute = '0' + minute;
                }
                timeStamp = now.hour() + ':' + minute;
                WS_ExchangeRate.OUTPUT output = (WS_ExchangeRate.OUTPUT) JSON.deserialize(response, WS_ExchangeRate.OUTPUT.class);
                if (output.errors != null) {
                	throw new CustomException('Error when consulting the exchange rate service.');
                } else if (output.fxExchangeResponse == null) {
                	throw new CustomException('Error when consulting the exchange rate service.');
                } else {
                    output.amountReceive = String.valueOf(amountReceive);
                    output.amountSend = String.valueOf(amountSend);
                    output.priceType = String.valueOf(priceType);
                    output.timeStamp = timeStamp;
                    this.result = getMapData(output);   
                }
            } else {
                throw new CustomException('Error when consulting the exchange rate service.');
            }
            // FLOWERPOWER_PARCHE_MINIGO
            /*result.put('exchangeRate', 1.15);
            Decimal convertedAmount = 1.15 * amountToConvert;
            result.put('convertedAmount', convertedAmount);
            DateTime now = DateTime.now();
			String minute = String.valueOf(now.minute());
            if(now.minute() < 10) {
                minute = '0' + minute;
            }
            timeStamp = now.hour() + ':' + minute;
            result.put('timestamp', timestamp);
            result.put('output', null);*/
        } catch (Exception e) {
            System.debug('execute.WS_ExchangeRate: ' + e.getMessage() +'line ' + e.getLineNumber());
			throw new CustomException(e.getMessage());
        }
        return this.result;
    }

    global Map<String, Object> getMapData (WS_ExchangeRate.OUTPUT output) {
        Map<String, Object> result = new Map<String, Object>();
        Decimal exchangeRate = 0;
        Decimal convertedAmount = 0;
        String timeStamp = '';
        if (output != null) {
            exchangeRate = output.fxExchangeResponse.customerExchangeRate;
            String roundAmount = roundAmount(output.fxExchangeResponse.ccyCountervalue.ccyCountervalueAmount);
            convertedAmount = Decimal.valueOf(roundAmount);
            DateTime now = DateTime.now();
			String minute = String.valueOf(now.minute());
            if(now.minute() <10){
                minute = '0'+minute;
                
            }
            timeStamp = now.hour() + ':' + minute;
        }
        result.put('exchangeRate', exchangeRate);
        result.put('convertedAmount', convertedAmount);
        result.put('timestamp', timestamp);
        result.put('output', output);
        return result;
    }

    private String roundAmount (String value) {
        String res = value;
        try {
            Integer numDecimal = Integer.valueOf(Label.NUM_DECIMALES);
            if (numDecimal != null && String.isNotBlank(value)) {
                Integer pointDecimal = value.lastIndexOf('.');
                if (pointDecimal != -1) {
                    pointDecimal++;
                    String decimalPart = value.substring(pointDecimal, value.length());
                    if (decimalPart.length() > numDecimal) {
                        res = value.substring(0, (pointDecimal + numDecimal));
                    }
                }
            }
        } catch (Exception e) {
            System.debug('WS_ExchangeRate.roundAmount: ' + e.getMessage());
        }
        return res;
    }

    private String getTime () {
        String currentTime = '';
        Datetime present = datetime.now();
        currentTime = present.hour() + ':' + present.minute();
        return currentTime; 
    }

    global with sharing class INPUT {

        global String accessChannel                  {get;set;}
        global String operationReference             {get;set;}
        global DataCountervalueFx dataCountervalueFx {get;set;}

        global INPUT () {
            System.debug('WS_ExchangeRate.INPUT');
        }

        global INPUT (String accessChannel, String operationReference, DataCountervalueFx dataCountervalueFx) {
            this.accessChannel = accessChannel;
            this.operationReference = operationReference;
            this.dataCountervalueFx = dataCountervalueFx;
        }
    }

    global with sharing class OUTPUT {
		@AuraEnabled
        global String amountReceive {get;set;}
        @AuraEnabled
        global String amountSend {get;set;}
        @AuraEnabled
        global String timestamp {get;set;}
        @AuraEnabled
        global String priceType {get;set;}
        @AuraEnabled
        global FxExchangeResponse fxExchangeResponse {get;set;}
        @AuraEnabled
        global List<FxErrors> errors {get;set;}
    }

    global with sharing class DataCountervalueFx {
		global String requestType                          {get;set;}
		global String discount                             {get;set;}
		global String priceType                            {get;set;}
		global SellNominal sellNominal                     {get;set;}
		global BuyNominal buyNominal                       {get;set;}
		// global String valueDateRequested                   {get;set;}
		global String customerId                           {get;set;}
        global SmeBusinessCustomerId smeBusinessCustomerId {get;set;}

        global DataCountervalueFx () {
            System.debug('WS_ExchangeRate.DataCountervalueFx');
        }

        global DataCountervalueFx (String requestType, String discount, String priceType, SellNominal sellNominal, BuyNominal buyNominal, String customerId, SmeBusinessCustomerId smeBusinessCustomerId) {
            this.requestType = requestType;
            this.discount = discount;
            this.priceType = priceType;
            this.sellNominal = sellNominal;
            this.buyNominal = buyNominal;
            //this.valueDateRequested = valueDateRequested;
            this.customerId = customerId;
            this.smeBusinessCustomerId = smeBusinessCustomerId;
        }
    }
    
    global with sharing class SellNominal {
		global String sellNominalAmount   {get;set;}
        global String sellNominalCurrency {get;set;}

        global SellNominal () {
            System.debug('WS_ExchangeRate.SellNominal');
        }
        
        global SellNominal (String sellNominalAmount, String sellNominalCurrency) {
            this.sellNominalAmount = sellNominalAmount;
            this.sellNominalCurrency = sellNominalCurrency;
        }
    }

    global with sharing class BuyNominal {
		global String buyNominalCurrency {get;set;}
        global String buyNominalAmount   {get;set;}
        
        global BuyNominal () {
            System.debug('WS_ExchangeRate.BuyNominal');
        }

        global BuyNominal (String buyNominalAmount, String buyNominalCurrency) {
            this.buyNominalAmount = buyNominalAmount;
            this.buyNominalCurrency = buyNominalCurrency;
        }
	}

	global with sharing class SmeBusinessCustomerId {
		global String companyName    {get;set;}
		global String tradeName      {get;set;}
        global DocumentId documentId {get;set;}

        global SmeBusinessCustomerId () {
            System.debug('WS_ExchangeRate.SmeBusinessCustomerId');
        }
        
        global SmeBusinessCustomerId (String companyName, String tradeName, DocumentId documentId) {
            this.companyName = companyName;
            this.tradeName = tradeName;
            this.documentId = documentId;
        }
	}

	global with sharing class DocumentId {
		global String documentType   {get;set;}
        global String documentNumber {get;set;}

        global DocumentId () {
            System.debug('WS_ExchangeRate.DocumentId');
        }
        
        global DocumentId (String documentType, String documentNumber) {
            this.documentType = documentType;
            this.documentNumber = documentNumber;
        }
    }

    global with sharing class FxExchangeResponse {
        @AuraEnabled
        global String fxCountervalueId             {get;set;}
        @AuraEnabled
        global CcyCountervalue ccyCountervalue     {get;set;}
        @AuraEnabled
        global String valueDateEfx                 {get;set;}
        @AuraEnabled
        global Double customerExchangeRate         {get;set;}
        @AuraEnabled
        global FxComercialMargin fxComercialMargin {get;set;}
        
        global FxExchangeResponse () {
            System.debug('WS_ExchangeRate.FxExchangeResponse');
        }
    }

    global with sharing class FxErrors {
        @AuraEnabled
        global String code {get;set;}
        @AuraEnabled
        global String message {get;set;}
        @AuraEnabled
        global String level {get;set;}
        @AuraEnabled
        global String description {get;set;}

        global FxErrors () {
            System.debug('WS_ExchangeRate.FxErrors');
        }
    }
    
    global with sharing class CcyCountervalue {
        @AuraEnabled
        global String ccyCountervalueAmount   {get;set;}
        @AuraEnabled
        global String ccyCountervalueCurrency {get;set;}
        
        global CcyCountervalue () {
            System.debug('WS_ExchangeRate.CcyCountervalue');
        }
	}

	global with sharing class FxComercialMargin {
        @AuraEnabled
        global Double fxComercialMarginAmount   {get;set;}
        @AuraEnabled
        global String fxComercialMarginCurrency {get;set;}
        
        global FxComercialMargin () {
            System.debug('WS_ExchangeRate.FxComercialMargin');
        }
	}
}