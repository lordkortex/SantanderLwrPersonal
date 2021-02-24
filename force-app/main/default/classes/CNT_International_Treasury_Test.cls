/*----------------------------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Test class of CNT_International_Treasury_Management
History
<Date>			<Author>		<Description>
19/11/2019		Joaquin Vera    Initial version
13/01/2020		Shahad Naji		Revising and adding new test methods
05/03/2020		Diego Asis		Adding new test method
----------------------------------------------------------------------------------*/
@isTest
public class CNT_International_Treasury_Test {
    
    
    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.getCustomSettingCryptoKey(true);
        
    }
    
          @isTest
    public static void downloadFileTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        User u = DataFactory.getRunningUser(true);
        System.runAs(u){            
			Test.startTest();
            CNT_International_Treasury_Management.downloadFileDoc(false,'test', 'test', 'EUR', 'test', 'test');
            Test.stopTest();
        }
                
    }
    
    /* @IsTest
static void generateInformationTest(){
//TODO
Test.startTest();
Map<String, List<WRAPPER_AccountList.AccountDetails>> resultados;

resultados = CNT_International_Treasury_Management.generateInformation();

Test.stopTest();
System.assertNotEquals(resultados.size(),0);

}*/
    @isTest
    static void initClassEndOfDayTest(){
        User u = DataFactory.getRunningUser(true);
        CNT_International_Treasury_Management obj;
        System.runAs(u){
            String iWhen = Label.EndOfDay;
            obj = CNT_International_Treasury_Management.initClass(iWhen);
            
        }       
        // System.assertNotEquals(obj,null);
    }
    /*
@isTest
static void initClassLastUpdateTest(){
User u = DataFactory.getRunningUser(true);
CNT_International_Treasury_Management obj;
System.runAs(u){
String 	iWhen = Label.LastUpdate;
obj = CNT_International_Treasury_Management.initClass(iWhen);

} 

//System.assertNotEquals(obj,null);
}*/
    
    @IsTest
    static void generateAccountsTest(){
        CNT_International_Treasury_Management.countryList = new List<String> {'ES'};
            //TODO
            Test.startTest();
        List<WRAPPER_AccountList.AccountDetails> lista;
        
        lista = CNT_International_Treasury_Management.generateAccounts();
        
        Test.stopTest();
        System.assertNotEquals(lista.size(),0);
    }
    
    @IsTest
    static void getUserInfoTest(){
        User u = DataFactory.getRunningUser(true);
        Test.startTest();
        Map<String, String> mapaUserInfoTest;
        System.runAs(u){
            mapaUserInfoTest = CNT_International_Treasury_Management.getUserInfo();
        }
        
        
        Test.stopTest();
        System.assertNotEquals(mapaUserInfoTest.size(), 0, 'Assert para comprobar que te devuelve los 2 valores en el mapa.');
        
        
    }
    
    
    
    @IsTest
    static void orderTest(){
        User u = DataFactory.getRunningUser(true);
        Test.startTest();
        Map<String, String> mapaUserInfoTest;
        System.runAs(u){
            
            WRAPPER_AccountList.LastestTransaction wcTest = new WRAPPER_AccountList.LastestTransaction();
            wcTest.transactionId = '987655433';
            wcTest.creationDate = 'test';
            wcTest.processedDate = 'test';
            wcTest.accountingDate = 'test';
            wcTest.transactionType = 'test';
            wcTest.transactionCategory = 'test';
            wcTest.amount = 10.0;
            wcTest.description='test';
            wcTest.currencyCode = 'EUR';
            List<WRAPPER_AccountList.LastestTransaction> auc = new List<WRAPPER_AccountList.LastestTransaction>();
            auc.add(wcTest);
            
            WRAPPER_AccountList.AccountDetails wcTestACCList = new WRAPPER_AccountList.AccountDetails();
            
            wcTestACCList.accountId='test';
            wcTestACCList.displayNumber='test';
            wcTestACCList.alias='test';
            wcTestACCList.type='test';
            wcTestACCList.description='test';
            wcTestACCList.status='test';
            wcTestACCList.status='test';
            wcTestACCList.lastTransaction='test';
            wcTestACCList.amountMainBalance=10.0;
            wcTestACCList.currencyCodeMainBalance='test';
            wcTestACCList.lastupdateMainBalance='test';
            wcTestACCList.amountAvailableBalance=10.0;
            wcTestACCList.currencyCodeAvailableBalance='test';
            wcTestACCList.lastUpdateAvailableBalance='test';
            wcTestACCList.amountWithholdingBalance=10.0;
            wcTestACCList.currencyCodeWithholdingBalance='test';
            wcTestACCList.lastudpateWithholdingBalance='test';
            wcTestACCList.amountOverdraftLimit=10.0;
            
            wcTestACCList.currencycodeOverdraftLimit='test';
            wcTestACCList.lastUpdateOverdraftLimit='test';
            wcTestACCList.bic='test';
            wcTestACCList.bankName='test';
            wcTestACCList.valueDate='test';
            wcTestACCList.aliasEntidad='test';
            wcTestACCList.subsidiaryName='test';
            wcTestACCList.countryName='test';
            wcTestACCList.branch='test';
            wcTestACCList.locatorbic='test';
            wcTestACCList.paisbic='test';
            wcTestACCList.codigoCorporate='test';
            wcTestACCList.codigoCuenta='test';
            wcTestACCList.transactionList=auc;
            wcTestACCList.internationalPaymentsAllowed=true;
            
            List<WRAPPER_AccountList.AccountDetails> finalAccList = new List<WRAPPER_AccountList.AccountDetails>();
            
            finalAccList.add(wcTestACCList);
            
            List<String> countries = new List<String>();
            countries.add('test');
            
            List<String> currencies = new List<String>();
            currencies.add('EUR');
            
            List<String> subsidiaries = new List<String>();
            subsidiaries.add('test');
            
            CNT_International_Treasury_Management.orderByCountry(countries,finalAccList);
            CNT_International_Treasury_Management.orderByCurrency(currencies,finalAccList);
            CNT_International_Treasury_Management.orderBySubsidiary(subsidiaries,finalAccList);
            CNT_International_Treasury_Management.getSumBalance('EUR',finalAccList);         
            
        }
        
        Test.stopTest();       
        
    }
    /*
@IsTest
static void getSumBalanceTest(){
CNT_International_Treasury_Management.countryList = new List<String> {'ES', 'GB'};

Test.startTest();
Map<String, Decimal> valores;

List<WRAPPER_AccountList.AccountDetails> listaCuentas = CNT_International_Treasury_Management.generateAccounts();
valores = CNT_International_Treasury_Management.getSumBalance('EUR',listaCuentas);


Test.stopTest();
System.assertNotEquals(valores.size(),0);

}*/
    
    @IsTest
    static void getCheckboxTest(){
        
        Test.startTest();
        Boolean lista;
        
        lista = CNT_International_Treasury_Management.getCheckboxWelcomePack();
        
        Test.stopTest();
    }
    
    @isTest
    public static void getIsCashNexusTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            CNT_International_Treasury_Management.getIsCashNexus();
        }
    }
    
    @isTest
    public static void callMulesoftTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            
            CNT_International_Treasury_Management.callMulesoft('test', u.Id);
        }
    }
    
    @isTest
    public static void getChangeCurrenciesTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            CNT_International_Treasury_Management.getChangeCurrencies('EUR',30);
        }
    }
    
    @isTest
    public static void getCountryNameTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            CNT_International_Treasury_Management.getCountryName('ES');
        }
    }
    
    @isTest
    public static void pruebaLeTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            CNT_International_Treasury_Management.pruebaList();
        }
    } 
    
}