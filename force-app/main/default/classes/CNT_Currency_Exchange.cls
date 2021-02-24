/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Controller of CMP_Currency_Exchange
Test Class:     CNT_Currency_Exchange_Test
History
<Date>			<Author>		<Description>
14/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public without sharing class CNT_Currency_Exchange {

/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Returns user's currency
History
<Date>			<Author>		<Description>
14/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static CurrencyType getUserCurrency(){
        CurrencyType aux = new CurrencyType();
        try{
            String userCurrency = UserInfo.getDefaultCurrency();
            aux = [SELECT Id, LastModifiedDate, IsoCode, ConversionRate, IsCorporate FROM CurrencyType WHERE IsoCode =: userCurrency LIMIT 1]; 
        }catch(Exception e){ 
            System.debug('The following exception has occurred: ' + e.getMessage());
        }
        return aux;
    }

/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Returns the information of a specific currency
History
<Date>			<Author>		<Description>
15/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
 	@AuraEnabled    
    public static CurrencyType getCurrencyInformation(String str){
        CurrencyType aux = new CurrencyType();
        try{
            aux = [SELECT Id, LastModifiedDate, IsoCode, ConversionRate, IsCorporate FROM CurrencyType WHERE IsoCode =: str LIMIT 1]; 
        }catch(Exception e){
            System.debug('The following exception has occurred: ' + e.getMessage());
        }
        return aux;
    }
    
    
/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Returns the active currencies of the corporate regardless the selected one.
History
<Date>			<Author>		<Description>
14/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static List<CurrencyType> getCompanyCurrencies(String selectedCurrency){
        List<CurrencyType> lst = new List<CurrencyType>();
        try{
            lst = [SELECT Id, LastModifiedDate, IsoCode, ConversionRate, IsCorporate FROM CurrencyType WHERE IsoCode !=: selectedCurrency ORDER BY LastModifiedDate DESC];
        	
        }catch(Exception e){
            System.debug('The following exception has occurred: ' + e.getMessage());
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
        return Global_Utilities.formatDate(dateToStr);
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
    public static Map<String, Decimal> exchangeCurrency(List<CurrencyType> currencyList, String selectedCurrency){
        Map<String, Decimal> currencyMap = new Map<String, Decimal>();
        CurrencyType corporateCurrency = new CurrencyType();
        for(CurrencyType ct : currencyList){
        	Decimal aux = Global_Utilities.convertCurrency(selectedCurrency,ct.IsoCode, 1);
            currencyMap.put(ct.IsoCode, aux);
        }
        return currencyMap;
    }
    
}