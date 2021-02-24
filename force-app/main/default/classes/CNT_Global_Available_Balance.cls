/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    CNT_Global_Available_Balance controller
Test Class:     CNT_Global_Available_Balance_Test
History
<Date>			<Author>		<Description>
18/12/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_Global_Available_Balance {
    
    /*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Calculates the sum of Book Balance values and the sum Available Balance values taking into consideration current selected currency.
History 
<Date>          <Author>            <Change Description>
18/12/2019     Shahad Naji  		Intial Version
------------------------------------------------------------*/
    @AuraEnabled
    public static Map<String, Decimal> getSumBalance(String currentCurrency, List<WRAPPER_AccountList.AccountDetails> accountList){        
        Map<String, Decimal> balanceValues =  new Map<String, Decimal>();
        Decimal globalBookBalance = 0.0;
        Decimal globalAvailableBalance = 0.0;        
        for(WRAPPER_AccountList.AccountDetails item : accountList){
            if(item.currencyCodeAvailableBalance != currentCurrency){
                Decimal globalBookBalance_aux = Global_Utilities.convertCurrency(item.currencyCodeAvailableBalance, currentCurrency, item.amountMainBalance);
                globalBookBalance += globalBookBalance_aux;
                Decimal globalAvailableBalance_aux = Global_Utilities.convertCurrency(item.currencyCodeAvailableBalance, currentCurrency, item.amountAvailableBalance);
                globalAvailableBalance += globalAvailableBalance_aux;
            }else{
                globalBookBalance += item.amountMainBalance;
                globalAvailableBalance += item.amountAvailableBalance;                    
            }
        }        
       if(!balanceValues.containsKey('globalBookBalance')){
            balanceValues.put('globalBookBalance',globalBookBalance.setScale(2));
        }
        if(!balanceValues.containsKey('globalAvailableBalance')){
            balanceValues.put('globalAvailableBalance', globalAvailableBalance.setScale(2));
        }       
        return balanceValues;
    }
}