/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Controller of CMP_Currency_Exchange
Test Class:     CNT_CurrencyExchange_Test
History
<Date>			<Author>		<Description>
14/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/

public class CNT_CurrencyExchange {
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Returns user's currency
History
<Date>			<Author>		<Description>
14/11/2019		Shahad Naji     Initial version
02/01/2020		Shahad Naji		Returns a Wrapper_Currency instance instead of returnning a record of a custom object
----------------------------------------------------------------------------------*/    
    @AuraEnabled
    public static Wrapper_Currency getUserCurrency(){
        Wrapper_Currency iCurrency= new Wrapper_Currency();
        try{
           iCurrency = Global_Utilities.getUserCurrency();
            System.debug('<' + iCurrency + '>');
        }catch(Exception e){ 
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return iCurrency;
    }
  
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Returns the active currencies of the corporate regardless the selected one.
History
<Date>			<Author>		<Description>
14/11/2019		Shahad Naji     Initial version
02/01/2020		Shahad Naji		Returns a list of Wrapper_Currency instance instead of returnning a list of a custom object records
----------------------------------------------------------------------------------*/
     @AuraEnabled
    public static List<Wrapper_Currency> getCurrenciesList(String userCurrency, List<String> currencyList){
        List<Wrapper_Currency> lst = new List<Wrapper_Currency>();
        try{
          lst = Global_Utilities.getCurrencies(userCurrency, currencyList);
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return lst;
    }
    
    
/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Formats dateTime
History
<Date>			<Author>		<Description>
14/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String formatDate(Datetime dateToStr){
        return DateTime_Utilities.formatDate(dateToStr);
    }
    
/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Returns the information of a specific currency
History
<Date>			<Author>		<Description>
15/11/2019		Shahad Naji     Initial version
02/01/2020		Shahad Naji		Returns a Wrapper_Currency instance instead of returnning a custom object record
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static Wrapper_Currency getCurrencyInformation(String iCurrency){
        Wrapper_Currency aux = new Wrapper_Currency();
        try{
            aux = Global_Utilities.getCurrency(iCurrency);
        }catch(Exception e){
            System.debug('The following exception has occurred: ' + e.getMessage());
        }
        return aux;
    }
    
    
/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Converts currencies to the selected one.
History
<Date>			<Author>		<Description>
18/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/ 
    @AuraEnabled
    public static Map<String, Decimal> exchangeCurrency(List<String> currencyList, String selectedCurrency){
        Map<String, Decimal> currencyMap = new Map<String, Decimal>();
       // Currency__c corporateCurrency = new Currency__c();
        for(String ct : currencyList){
        	Decimal aux = Global_Utilities.convertCurrency(selectedCurrency,ct, 1);
            currencyMap.put(ct, aux);
        }
        return currencyMap;
    }
}