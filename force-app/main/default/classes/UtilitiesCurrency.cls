/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Holds auxiliar functions to exchange currency
Test Class:     UtilitiesCurrency_Test
History
<Date>			<Author>		<Description>
25/10/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
global without sharing class UtilitiesCurrency {
    
            
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Converts a value from provided currency to corporate currency
History
<Date>			<Author>		<Description>
25/10/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/    
    public static Map<String, Decimal> exchangeRates(String currentCurrency, Decimal value, Map<String, Decimal> otherCurrencyType){
        Map<String, Decimal>  convertedValues = New Map<String, Decimal>();
        try{
            // List<CurrencyType> otherCurrencyType = New List<CurrencyType>([SELECT Id, IsoCode FROM CurrencyType WHERE IsoCode !=: currentCurrency]);
            for(String key : otherCurrencyType.keySet()){
                Decimal convertedCurrency = UtilitiesCurrency.convertCurrency(currentCurrency, key, value);
                convertedValues.put(key, convertedCurrency);
            }
            
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());   
        }
        
        return convertedValues;
    }
    
    
    public static Decimal convertCurrency(String fromIsoCode, String toIsoCode, Decimal value) {
        Decimal convertedValue = value;
        try{
            List<String> codeList = new List<String>{fromIsoCode, toIsoCode};
            Map<string, CurrencyType> currencyTypesByIsoCode = new Map<string, CurrencyType>();
            List<CurrencyType> currencyTypes = new List<CurrencyType>([SELECT Id, IsoCode, ConversionRate, IsCorporate FROM CurrencyType  WHERE IsoCode IN :codeList OR IsCorporate =: true]);            
            for (CurrencyType currencyType : currencyTypes) {
                currencyTypesByIsoCode.put(currencyType.IsoCode, currencyType);
            }
            Boolean conversionRequired = (fromIsoCode != toIsoCode && value != null);
            Boolean fromIsoCodeValid = currencyTypesByIsoCode.containsKey(fromIsoCode);
            Boolean toIsoCodeValid = currencyTypesByIsoCode.containsKey(toIsoCode);            
            if (conversionRequired && fromIsoCodeValid && toIsoCodeValid) {
                CurrencyType fromCurrencyType = currencyTypesByIsoCode.get(fromIsoCode);
                convertedValue = value / fromCurrencyType.ConversionRate;
                CurrencyType toCurrencyType = currencyTypesByIsoCode.get(toIsoCode);
                convertedValue = convertedValue * toCurrencyType.ConversionRate;
            }              
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString()); 
        }        
        return convertedValue;
    }
    
    public static Decimal getExchangeAmount(String currencySend, String currencyReceive, String dominantCurrency, Decimal valueSend, Decimal valueReceive, Decimal valueDominant){
        Decimal convertedValue = null;
        try{
            if(String.isBlank(currencySend) || String.isBlank(currencyReceive) || String.isBlank(dominantCurrency) || valueDominant == null){
                 System.debug('UtilitiesCurrency.getExchangeAmount');
                throw new customException('ERROR: UtilitiesCurrency.getExchangeAmount');
            }
            if((dominantCurrency.equalsIgnoreCase(currencySend) && valueSend != null && valueReceive == null) || (!dominantCurrency.equalsIgnoreCase(currencySend) && valueSend == null && valueReceive != null)){
                convertedValue = valueSend * valueDominant;
            }else if((dominantCurrency.equalsIgnoreCase(currencySend) && valueSend == null && valueReceive != null) || (!dominantCurrency.equalsIgnoreCase(currencySend) && valueSend != null && valueReceive == null)){
                if(valueDominant >  0){
                    convertedValue = valueReceive / valueDominant;
                }else{
                    System.debug('UtilitiesCurrency.getExchangeAmount');
                    throw new customException('ERROR: UtilitiesCurrency.getExchangeAmount');
                }
                
            } 
        }catch(Exception e){
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());    
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString()); 
        } 
        return convertedValue;
    }
    
}