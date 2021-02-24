/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    CMP_Country_Balance controller
Test Class:     CNT_Country_Balance_Test
History
<Date>			<Author>		<Description>
28/10/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/

public class CNT_Country_Balance {
/*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Retrieves the information of the accounts and related them with their respective currencies.
History 
<Date>          <Author>            <Change Description>
28/10/2019     Shahad Naji  		Intial Version
------------------------------------------------------------*/    
    @AuraEnabled 
    public static Map<String, List<WRAPPER_AccountList.AccountDetails>> generateInformation(List<WRAPPER_AccountList.AccountDetails> accountList, List<String> currencyList){

        Map<String, List<WRAPPER_AccountList.AccountDetails>> currencyAccountMap = new Map<String, List<WRAPPER_AccountList.AccountDetails>>();
        for(String currencyItem : currencyList){
            List<WRAPPER_AccountList.AccountDetails> accountList_aux = new  List<WRAPPER_AccountList.AccountDetails>();
            for(WRAPPER_AccountList.AccountDetails accountItem : accountList){
                if(currencyItem.equalsIgnoreCase(accountItem.currencyCodeAvailableBalance)){      
                    accountList_aux.add(accountItem );
                }
            }
            currencyAccountMap.put(currencyItem, accountList_aux); 
        }
        return currencyAccountMap;
    }
    
/*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Calculates the sum of Book Balance values and the sum Available Balance values taking into consideration current selected currency.
History 
<Date>          <Author>            <Change Description>
28/10/2019     Shahad Naji  		Intial Version
------------------------------------------------------------*/
    @AuraEnabled
    public static Map<String, Decimal> getSumBalance(String currentCurrency,  List<WRAPPER_AccountList.AccountDetails> accountList){

        Map<String, Decimal> balanceValues = new Map<String, Decimal>();
        Decimal globalBookBalance = 0;
        Decimal globalAvailableBalance = 0;
        system.debug('>>> size: ' + accountList.size());
        for(WRAPPER_AccountList.AccountDetails item : accountList){
            if(item.currencyCodeAvailableBalance != currentCurrency){
                Decimal globalBookBalance_aux = Global_Utilities.convertCurrency(item.currencyCodeAvailableBalance, currentCurrency, item.amountMainBalance);
                                system.debug('>>> country sum balance: '+item.amountMainBalance+' '+ item.currencyCodeAvailableBalance+' ' +globalBookBalance_aux);
                globalBookBalance += globalBookBalance_aux;
                Decimal globalAvailableBalance_aux = Global_Utilities.convertCurrency(item.currencyCodeAvailableBalance, currentCurrency, item.amountAvailableBalance);
 				system.debug('>>> country sum balance: ' + item.amountAvailableBalance+' ' +item.currencyCodeAvailableBalance+' ' +globalAvailableBalance_aux);
                globalAvailableBalance += globalAvailableBalance_aux; 
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
        return balanceValues;
    } 
    
 /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Receives a country ISO Code and returns its country name.
History 
<Date>			<Author>			<Change Description>
14/11/2019		Shahad Naji			Intial Version
26/11/2019		Shahad Naji     	Ask Global_Utilities for Country Name
------------------------------------------------------------*/   
    @AuraEnabled
    public static String getCountryName(String ISOCode){
        String str = '';
		str = Global_Utilities.getCountryName(ISOCode);
        return str;
    }
}