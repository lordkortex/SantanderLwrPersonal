global with sharing class ServiceExchangeRate {
    
    global static Map<String, Object> execute(WRAPPER_PAY_PaymentDraft paymentDraft){
        Map<String, Object> result = new Map<String, Object>(); 
        try {
           if((paymentDraft == null) || (paymentDraft.sourceCurrencyDominant == null) 
               || (paymentDraft.sourceAccount == null) || String.isBlank(paymentDraft.sourceAccount.currencyCodeAvailableBalance)
               || String.isBlank(paymentDraft.paymentCurrency) || (paymentDraft.exchangeRate == null)) {
                 throw new CustomException('ServiceExchangeRate.execute: error input parameters');
            }
            Decimal sourceAmount = null;
            Decimal destinationAmount = null;
            Decimal convertedAmount = null;
            WS_ExchangeRate.OUTPUT output = new WS_ExchangeRate.OUTPUT();
            WS_ExchangeRate.FxExchangeResponse fxExchangeResponse =  new WS_ExchangeRate.FxExchangeResponse();
            WS_ExchangeRate.CcyCountervalue ccyCountervalue = new WS_ExchangeRate.CcyCountervalue();
            WS_ExchangeRate.FxComercialMargin fxComercialMargin = new WS_ExchangeRate.FxComercialMargin();
            
            String dominantCurrency = paymentDraft.sourceCurrencyDominant ? paymentDraft.sourceAccount.currencyCodeAvailableBalance : paymentDraft.paymentCurrency;
            if (paymentDraft.amountEnteredFrom == 'source') {
                sourceAmount = paymentDraft.amountSend;
                convertedAmount = UtilitiesCurrency.getExchangeAmount(paymentDraft.sourceAccount.currencyCodeAvailableBalance,  paymentDraft.paymentCurrency, dominantCurrency, paymentDraft.amountSend, null, paymentDraft.exchangeRate);
                system.debug('>>> SNJ  convertedAmount 1 ' + convertedAmount);
                fxComercialMargin.fxComercialMarginCurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance;
            } else if (paymentDraft.amountEnteredFrom == 'recipient') {
                destinationAmount = paymentDraft.amountReceive;
                convertedAmount = UtilitiesCurrency.getExchangeAmount(paymentDraft.sourceAccount.currencyCodeAvailableBalance,  paymentDraft.paymentCurrency, dominantCurrency, null, paymentDraft.amountReceive, paymentDraft.exchangeRate);
                system.debug('>>> SNJ  convertedAmount 2 ' + convertedAmount);
                fxComercialMargin.fxComercialMarginCurrency = paymentDraft.paymentCurrency;
            }

            ccyCountervalue.ccyCountervalueAmount = String.valueOf(convertedAmount);
            ccyCountervalue.ccyCountervalueCurrency = paymentDraft.paymentCurrency;
            
            fxExchangeResponse.valueDateEfx = Datetime.now().format('yyyy-MM-dd');
            fxExchangeResponse.customerExchangeRate = Double.valueOf(paymentDraft.exchangeRate);

            fxExchangeResponse.ccyCountervalue = ccyCountervalue;
            fxExchangeResponse.fxComercialMargin = fxComercialMargin;
           	output.fxExchangeResponse = fxExchangeResponse; 
            if(paymentDraft.amountReceive != null){
                output.amountReceive = String.valueOf(paymentDraft.amountReceive);
            }
            if(paymentDraft.amountSend != null){
                output.amountSend = String.valueOf(paymentDraft.amountSend);
            }
            
            output.timeStamp = ServiceExchangeRate.getTimeStamp();
            
			result = ServiceExchangeRate.getMapData(output);    
            
        } catch (Exception e) {
            System.debug('ServiceExchangeRate.execute: ' + e.getMessage() +'line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return result;
    }
    
    private static String getTimeStamp(){
        String timeStamp = '';
        try{
            DateTime now = DateTime.now();
            String minute = String.valueOf(now.minute());
            if (now.minute() < 10) {
                minute = '0' + minute;
            }
            timeStamp = now.hour() + ':' + minute;
        } catch (Exception e) {
            System.debug('ServiceExchangeRate.getTimeStamp: ' + e.getMessage() +'line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return timeStamp;
    }
    
    
     private static Map<String, Object> getMapData (WS_ExchangeRate.OUTPUT output) {
        Map<String, Object> result = new Map<String, Object>();
        Decimal exchangeRate = 0;
        Decimal convertedAmount = 0;
        String timeStamp = '';
        String fxTimer = '';
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
            
            DateTime myDt = datetime.now();
            fxTimer = myDT.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss');
        }
        result.put('exchangeRate', exchangeRate);
        result.put('convertedAmount', convertedAmount);
        if(output.amountSend == null){
        	result.put('amountObtained', 'send');
        }else{
        	result.put('amountObtained', 'received');
        }
        result.put('fxTimer', fxTimer);
        result.put('timestamp', timestamp);
        result.put('output', output);
        return result;
    }
    
    private static String roundAmount (String value) {
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
}