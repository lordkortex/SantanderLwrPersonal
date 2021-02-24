/*----------------------------------------------------------------------------------
Author:         Shahad
Company:        Deloitte
Description:    Test class of CNT_CurrencyExchange
History
<Date>			<Author>		<Description>
14/01/2020		Shahad Naji    	Initial version
----------------------------------------------------------------------------------*/
@isTest
private class CNT_CurrencyExchange_Test {
    
    @TestSetup
    static void setup() {
        DataFactory.getCustomSettingCryptoKey(true);
    }
    
    
    @isTest
    static void getUserCurrencyTest(){
        
       // test.startTest();
        User u = DataFactory.getRunningUser(true);
        
        System.runAs(u){
            Wrapper_Currency data = new Wrapper_Currency();
        	data = CNT_CurrencyExchange.getUserCurrency();
        }
       // test.stopTest();
    }
    
    @isTest
    static void getCurrenciesListTest(){
        
        User u = DataFactory.getRunningUser(true);
        List<String> listaNueva = new List<String>();
        System.runAs(u){
            List<Wrapper_Currency> data = CNT_CurrencyExchange.getCurrenciesList(' ', listaNueva);
        }
    }
    
    @isTest
    static void formatDateTest(){
        
        User u = DataFactory.getRunningUser(true);
        Datetime myDate = Datetime.newInstance(2008, 12, 1, 12, 30, 2);
        System.runAs(u){
            String data = CNT_CurrencyExchange.formatDate(myDate);
        }
    }
    
    @isTest
    static void getCurrencyInformationTest(){
        
        User u = DataFactory.getRunningUser(true);
        System.runAs(u){
       		Wrapper_Currency data = CNT_CurrencyExchange.getCurrencyInformation(' ');
        }
    }
    
    @isTest
    static void exchangeCurrencyTest(){
        
        User u = DataFactory.getRunningUser(true);
        List<String> listaNueva = new List<String>();
        listaNueva.add('EUR');
        listaNueva.add('USD');
        listaNueva.add('GBP');
        System.runAs(u){
            Map<String, Decimal> data = CNT_CurrencyExchange.exchangeCurrency(listaNueva, 'EUR');
        }
    }
}