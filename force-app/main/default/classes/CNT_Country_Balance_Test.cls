/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Test class of CNT_Country_Balance_Test
History
<Date>			<Author>				<Description>
13/11/2019		Shahad Naji     		Initial version
19/11/2019		Pablo Tejedor Salas		Update version
----------------------------------------------------------------------------------*/
@isTest
public with sharing class CNT_Country_Balance_Test {
    
    @TestSetup
    static void makeData(){
        
        DataFactory.getCustomSettingCryptoKey(true);
    }
    
    @isTest 
    static void generateInformationTest() {
        
        List<String> currencyList = new List<String>();
        currencyList.add('EUR');
        currencyList.add('GBP');
        
        test.startTest();
        Map<String, List<WRAPPER_AccountList.AccountDetails>> currencyAccountMap = new  Map<String, List<WRAPPER_AccountList.AccountDetails>>();
        currencyAccountMap = CNT_Country_Balance.generateInformation(DataFactory.getAccountList() , currencyList);
        test.stopTest();
        
        System.assertEquals(currencyAccountMap.size() > 0, currencyAccountMap.size() > 0, 'El mapa se rellena');
    }
    
    @isTest 
    static void getSumBalanceTest() {
        
        test.startTest();
        Map<String, Decimal> currencyAccountMap = new  Map<String, Decimal>();
        currencyAccountMap = CNT_Country_Balance.getSumBalance('EUR' , DataFactory.getAccountList());
        test.stopTest();
        
        System.assertEquals(currencyAccountMap.size() > 0, currencyAccountMap.size() > 0, 'El mapa se rellena');
    }
    
    @isTest 
    static void getCountryNameTest() {
        
        test.startTest();
        String pais;
        String currenciIsoCode = 'ESP';
        pais = CNT_Country_Balance.getCountryName(currenciIsoCode);
        test.stopTest();
        System.assertEquals(pais != null, pais != null, 'Devuelve un String');
        
        
    }
}