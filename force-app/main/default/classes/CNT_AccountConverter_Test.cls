/*----------------------------------------------------------------------------------
Author:         Adrian Muñio
Company:        Deloitte
History
<Date>			<Author>		<Description>
29/06/2020		Adrian Muñio    Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_AccountConverter_Test {

    Map<String,CNT_ApiConfiguration__c> customSettings = DataFactory.createWsConfigurationSetting(true);
    
    @isTest
    static void createAccountTranslationTest(){
        Test.startTest();
        DataFactory.createWsConfigurationSetting(true);
        Object result = (Object) CNT_AccountConverter.callAccountServices('create','testCashNexusId','testBIC','testLocalId','testCurrency');
        Test.stopTest();
        System.assertEquals('CREATEOK', (String) result, 'createAccountTranslationTest --> Assertion Error');
    }

    @isTest
    static void updateAccountTranslationTest(){
        Test.startTest();
        DataFactory.createWsConfigurationSetting(true);
        Object result =  (Object) CNT_AccountConverter.callAccountServices('update','testCashNexusId','testBIC','testLocalId','testCurrency');
        Test.stopTest();
        System.assertEquals('UPDATEOK', (String) result, 'createAccountTranslationTest --> Assertion Error');
    }

    @isTest
    static void deleteAccountTranslationTest(){
        Test.startTest();
        DataFactory.createWsConfigurationSetting(true);
        Object result = (Object) CNT_AccountConverter.callAccountServices('delete','testCashNexusId','testBIC','testLocalId','testCurrency');
        Test.stopTest();
        System.assertEquals('DELETEOK', (String) result, 'createAccountTranslationTest --> Assertion Error');
    }
 
    @isTest
    static void getAccountTranslationTest(){
        Test.startTest();
        DataFactory.createWsConfigurationSetting(true);
        WRAPPER_AccountTranslation result = (WRAPPER_AccountTranslation) CNT_AccountConverter.callAccountServices('search','testCashNexusId','testBIC','testLocalId','testCurrency');
        Test.stopTest();
        System.assertEquals('TESTTEST', result.accounts[0].bankId, 'createAccountTranslationTest --> Assertion Error');
    }

    @isTest
    static void getCurrenciesTest(){
        Test.startTest();
        List<String> currencies = CNT_AccountConverter.getCurrencies();
        Test.stopTest();
        System.assert(!currencies.isEmpty(), 'createAccountTranslationTest --> Assertion Error');
    }
}