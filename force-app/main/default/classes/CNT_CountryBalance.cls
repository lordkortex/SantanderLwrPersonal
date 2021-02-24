/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    CMP_CountryBalance controller
Test Class:     CNT_CountryBalanceTest
History
<Date>          <Author>        <Description>
28/10/2019      Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_CountryBalance {
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Receives a country ISO Code and returns its country name.
History 
<Date>          <Author>            <Change Description>
14/11/2019      Shahad Naji         Intial Version
26/11/2019      Shahad Naji         Ask Global_Utilities for Country Name
------------------------------------------------------------*/   
    @AuraEnabled(cacheable=true)
    public static String getCountryName(String ISOCode){
        String str = '';
        try{           
            str = Global_Utilities.getCountryName(ISOCode);
        }catch(Exception e){ 
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return str;
    }
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Calculates the sum of Book Balance values and the sum Available Balance values taking into consideration current selected currency.
History 
<Date>          <Author>            <Change Description>
28/10/2019     Shahad Naji          Intial Version
------------------------------------------------------------*/
    @AuraEnabled(cacheable=true)
    public static Map<String, Decimal> getSumBalance(String currentCurrency,  List<WRAPPER_AccountList.AccountDetails> accountList){
        
        Map<String, Decimal> balanceValues = new Map<String, Decimal>();
        try{            
            Decimal globalBookBalance = 0;
            Decimal globalAvailableBalance = 0;
            for(WRAPPER_AccountList.AccountDetails item : accountList){
                if(item.currencyCodeAvailableBalance != currentCurrency){
                    if( item.amountMainBalance != null){
                        Decimal globalBookBalance_aux = Global_Utilities.convertCurrency(item.currencyCodeAvailableBalance, currentCurrency, item.amountMainBalance);
                        if(globalBookBalance_aux != null){
                            globalBookBalance += globalBookBalance_aux;    
                        }    
                    }
                    
                    if(item.amountAvailableBalance != null){
                        Decimal globalAvailableBalance_aux = Global_Utilities.convertCurrency(item.currencyCodeAvailableBalance, currentCurrency, item.amountAvailableBalance);                    
                        if (globalAvailableBalance_aux  != null){  
                            globalAvailableBalance += globalAvailableBalance_aux;  
                        }  
                    }
                    
                }else{
                    globalBookBalance += item.amountMainBalance;
                    globalAvailableBalance += item.amountAvailableBalance;                        
                }
                
            }   
            if(!balanceValues.containsKey('countryBookBalance')){                
                balanceValues.put('countryBookBalance',globalBookBalance.setScale(2));
            }
            if(!balanceValues.containsKey('countryAvailableBalance')){                
                balanceValues.put('countryAvailableBalance', globalAvailableBalance.setScale(2));
            }
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }        
        return balanceValues;
    } 
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Calculates the sum of Book Balance values and the sum Available Balance values.
History 
<Date>          <Author>            <Change Description>
28/04/2020     Shahad Naji          Intial Version
------------------------------------------------------------*/
    @AuraEnabled(cacheable=true)
    public static Map<String, Decimal> getSumBalanceCurrency(List<WRAPPER_AccountList.AccountDetails> accountList){
        
        Map<String, Decimal> balanceValues = new Map<String, Decimal>();
        try{            
            Decimal globalBookBalance = 0.0;
            Decimal globalAvailableBalance = 0.0;
            for(WRAPPER_AccountList.AccountDetails item : accountList){
                
                if(item.amountMainBalance != null){
                    globalBookBalance += item.amountMainBalance;  
                }
                if(item.amountAvailableBalance != null){
                    globalAvailableBalance += item.amountAvailableBalance;   
                }
                
            }   
            if(!balanceValues.containsKey('countryBookBalance')){
                
                balanceValues.put('countryBookBalance',globalBookBalance.setScale(2));
            }
            if(!balanceValues.containsKey('countryAvailableBalance')){
                
                balanceValues.put('countryAvailableBalance', globalAvailableBalance.setScale(2));
            }
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }        
        return balanceValues;
    } 
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Calculates the sum of Book Balance values and the sum Available Balance values according to Experto.
History 
<Date>          <Author>            <Change Description>
30/04/2020     Shahad Naji          Intial Version
------------------------------------------------------------*/
    @AuraEnabled(cacheable=true)
    public static Map<String, Decimal> getSumBalanceExperto(String currentCurrency,  List<WRAPPER_AccountList.AccountDetails> accountList, List<WRAPPER_AccountList.TipoDeCambio> currencies){
        
        Map<String, Decimal> balanceValues = new Map<String, Decimal>();
        
        Decimal globalBookBalance = 0.0;
        Decimal globalAvailableBalance = 0.0;
        for(WRAPPER_AccountList.AccountDetails item : accountList){
            if(item.currencyCodeAvailableBalance != null && item.currencyCodeAvailableBalance != ''){
                if(item.currencyCodeAvailableBalance != currentCurrency){
                    if(item.amountMainBalance != 0 && item.amountMainBalance!= null){
                        Decimal globalBookBalance_aux = CNT_CountryBalance.getExchange(item.currencyCodeAvailableBalance, currentCurrency, currencies, item.amountMainBalance);
                        globalBookBalance += globalBookBalance_aux;
                    }else{
                        globalBookBalance += 0.0; 
                    }
                    
                    if(item.amountAvailableBalance != 0 && item.amountAvailableBalance != null){
                        Decimal globalAvailableBalance_aux =  CNT_CountryBalance.getExchange(item.currencyCodeAvailableBalance, currentCurrency, currencies, item.amountAvailableBalance);
                        globalAvailableBalance += globalAvailableBalance_aux;   
                    }else{
                        globalAvailableBalance += 0.0;
                    }
                    
                }else{
                    if( item.amountMainBalance != null){
                        globalBookBalance += item.amountMainBalance; 
                    }else{
                        globalBookBalance += 0.0;
                    }
                    
                    if( item.amountAvailableBalance != null){
                        globalAvailableBalance += item.amountAvailableBalance;   
                    }else{
                        globalAvailableBalance += 0.0;
                    }
                    
                }
            }
            
            
        }   
        if(!balanceValues.containsKey('countryBookBalance')){                
            balanceValues.put('countryBookBalance',globalBookBalance.setScale(2));
        }
        if(!balanceValues.containsKey('countryAvailableBalance')){                
            balanceValues.put('countryAvailableBalance', globalAvailableBalance.setScale(2));
        }
        
        return balanceValues;
    } 
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Converts a value from a currency to another
History
<Date>          <Author>        <Description>
30/10/2019      Shahad Naji     Initial version
----------------------------------------------------------------------------------*/   
    @AuraEnabled(cacheable=true)
    public static Decimal getExchange(String fromIsoCode, String toIsoCode, List<WRAPPER_AccountList.TipoDeCambio> currencies, Decimal value){
        Decimal convertedValue = value;
        Boolean conversionRequired = (fromIsoCode != toIsoCode && value != null);
        if(conversionRequired){
            WRAPPER_AccountList.TipoDeCambio fromCurrency = new  WRAPPER_AccountList.TipoDeCambio();
            Integer i = 0;
            Boolean found = false;
            while(i < currencies.size() && !found){
                if(currencies.get(i).divisa == fromIsoCode){
                    fromCurrency = currencies.get(i);
                    found = true;
                }
                i++;
            }
            WRAPPER_AccountList.TipoDeCambio toCurrency = new  WRAPPER_AccountList.TipoDeCambio();
            i = 0;
            found = false;
            while(i < currencies.size() && !found){
                if(currencies.get(i).divisa == toIsoCode){
                    toCurrency = currencies.get(i);
                    found = true;
                }
                i++;
            }
            Boolean fromIsoCodeValid = (fromCurrency != null);
            Boolean toIsoCodeValid = (toCurrency != null);
            if(fromIsoCodeValid && toIsoCodeValid && fromCurrency.importeDecimal != null && toCurrency.importeDecimal != null){
                if(value != null && value != 0){
                    convertedValue = value / fromCurrency.importeDecimal;
                    convertedValue = convertedValue * toCurrency.importeDecimal; 
                }else{
                    convertedValue = 0.0;
                }
                
            }
            
        }
        
        
        return convertedValue;
    }
}