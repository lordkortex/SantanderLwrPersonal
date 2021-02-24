/*----------------------------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Test class for class CMP_Currency_Exchange
History
<Date>			<Author>		<Description>
19/11/2019		Joaquin Vera     Initial version
----------------------------------------------------------------------------------*/
@isTest
public with sharing class CNT_Currency_Exchange_Test {

    @TestSetup
    static void makeData(){
        DataFactory.getCustomSettingCryptoKey(true);
    }

    @IsTest
    static void getUserCurrencyTest()
    {
       //User u = DataFactory.getRunningUser(false);
        Test.startTest();
        
        User user = DataFactory.getRunningUser(true);
        
        CurrencyType cType;
        
         
        System.runAs(user)
        {
           cType = CNT_Currency_Exchange.getUserCurrency();
        }

        Test.stopTest();

        System.assertEquals('EUR', cType.IsoCode, 'Comprobación de que el valor que devuelve la clase es el mismo que el del usuario.');
    }

    @IsTest
    static void getCurrencyInformationTest(){

        Test.startTest();
        CurrencyType vuelta = CNT_Currency_Exchange.getCurrencyInformation('EUR');
        Test.stopTest();
        System.assertNotEquals(vuelta,null);

    }

    @IsTest
    static void getCompanyCurrenciesTest(){
        
        Test.startTest();
        List<CurrencyType> lista = CNT_Currency_Exchange.getCompanyCurrencies('EUR');
        Test.stopTest();
        //System.assertNotEquals(lista.size(),0);
        
    }

    @IsTest
    static void formatDateTest(){
        Datetime myDateTime = Datetime.newInstance(2019, 11, 19);
        Test.startTest();
        String parsed = CNT_Currency_Exchange.formatDate(myDateTime);
        Test.stopTest();
        //System.assertNotEquals(parsed,'');
        
    }

    @IsTest
    static void exchangeCurrencyTest(){
        List<CurrencyType> lista = CNT_Currency_Exchange.getCompanyCurrencies('EUR');
        Test.startTest();
        Map<String,Decimal> vuelta = CNT_Currency_Exchange.exchangeCurrency(lista,'EUR');
        Test.stopTest();
        //System.assertNotEquals(vuelta.size(),0);
        
    }


}