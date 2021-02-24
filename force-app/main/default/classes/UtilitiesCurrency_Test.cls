/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
18/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class UtilitiesCurrency_Test {
	
    @testSetup  
    static void setObjects(){
        Test.startTest();
        system.debug(exchangeRatesTest());
        Test.stopTest();
    }
	
    @isTest
    static Map<String, Decimal> exchangeRatesTest(){
        Map<String, Decimal> otherCurrencyType = new Map<String, Decimal>();
        otherCurrencyType.put('EUR', 0.9);
        otherCurrencyType.put('USD', 0.9);
       return UtilitiesCurrency.exchangeRates('EUR', 0.9,  otherCurrencyType);
    }
   
}