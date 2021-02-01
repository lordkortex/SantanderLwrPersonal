/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:    Test class of Wrapper_Currency
History
<Date>			<Author>		<Description>
31/03/2020		R. Cervino    	Initial version
----------------------------------------------------------------------------------*/
@isTest
public class Wrapper_MuleSoft_Classes_Test {
    
    @isTest
    static void testUtil (){
        
        Wrapper_MuleSoft_Classes.Wrapper_Account acc= new  Wrapper_MuleSoft_Classes.Wrapper_Account();
        
        acc.accountId='test'; 
        acc.country='test'; 
        acc.alias='test'; 
        acc.subsidiaryName='test'; 
        acc.lastUpdateAvailableBalance='test'; 
        acc.bankName='test'; 
        acc.displayNumber='test'; 
        acc.amountMainBalance='test'; 
        acc.amountAvailableBalance='test'; 
        acc.currencyCodeAvailableBalance='test';
        acc.agent='test';
        
        List<Wrapper_MuleSoft_Classes.Wrapper_Account> accList = new List<Wrapper_MuleSoft_Classes.Wrapper_Account>();
        
        accList.add(acc);
        
        Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance globalWrapper= new Wrapper_MuleSoft_Classes.Wrapper_GlobalBalance();
        globalWrapper.globalId='test';
        globalWrapper.accounts=accList;
        
        
    }
    
}