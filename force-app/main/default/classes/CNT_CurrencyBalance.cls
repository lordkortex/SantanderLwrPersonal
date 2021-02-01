/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    CMP_CurrencyBalance controller
Test Class:     CNT_CurrencyBalance_Test
History
<Date>			<Author>		<Description>
23/12/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_CurrencyBalance {
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Receives a country ISO Code and returns its country name.
History 
<Date>			<Author>			<Change Description>
23/12/2019		Shahad Naji			Intial Version
------------------------------------------------------------*/   
    @AuraEnabled
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
Description:   	Calculates the sum of Book Balance values taking into consideration current selected currency.
History 
<Date>          <Author>            <Change Description>
28/10/2019     Shahad Naji  		Intial Version
------------------------------------------------------------*/
    @AuraEnabled
    public static Decimal getSumBalance(String currentCurrency,  List<WRAPPER_AccountList.AccountDetails> accountList){
        Decimal iReturn = 0;
        try{
            Decimal bookBalance = 0;
            for(WRAPPER_AccountList.AccountDetails item : accountList){
                if(item.currencyCodeAvailableBalance != currentCurrency){
                    Decimal aux = Global_Utilities.convertCurrency(item.currencyCodeAvailableBalance, currentCurrency, item.amountMainBalance);                    
                    bookBalance += aux;
                }else{
                    bookBalance += item.amountMainBalance;
                }
            }
            iReturn = bookBalance.setScale(2);
        }catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return iReturn;
    }
    
}