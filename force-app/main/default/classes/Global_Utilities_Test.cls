/*----------------------------------------------------------------------------------
Author:         Teresa Santos
Company:        Deloitte
Description:    Holds auxiliar functions
History
<Date>			<Author>		<Description>
19/11/2019		Teresa Santos     Initial version
----------------------------------------------------------------------------------*/
@isTest
public with sharing class Global_Utilities_Test {
    
    @TestSetup
    static void makeData(){ 
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.getRunningUser(true);
    }
    
    @isTest
    static void exchangeRates_Test (){
        
        List <CurrencyType> ct = new List <CurrencyType>();
        ct = [SELECT Id, IsoCode FROM CurrencyType WHERE IsoCode = 'EUR' LIMIT 1];
        
        Test.startTest();
        Map <String, Decimal> valor= Global_Utilities.exchangeRates('EUR', 1.5);
        
        Test.stopTest();
        system.assertNotEquals(valor,null);
        
    }
    
    @isTest
    static void convertCurrency_Test (){

        List <CurrencyType> ct = new List <CurrencyType>();
        ct = [SELECT Id, IsoCode FROM CurrencyType WHERE IsoCode = 'EUR' LIMIT 1];
        
        Test.startTest();
        Decimal vuelta = Global_Utilities.convertCurrency('EUR', 'USD', 1.5);
        
        Test.stopTest();
        system.assertNotEquals(vuelta,null);
    }
    
    @isTest   
    static void getCurrentUserDateTime_Test (){
        Test.startTest();
        string cud = Global_Utilities.getCurrentUserDateTime();
        
        Test.stopTest();
        system.assertNotEquals(cud ,null, 'rellena un string');

    }

    @isTest
    static void formatDate_Test (){
        Datetime fh = Datetime.newInstance(1992,08,08);
        Test.startTest();
        string fd = Global_Utilities.formatDate(fh);
        
        Test.stopTest();
        system.assertNotEquals( fd,null, 'rellena un string');

    }

    @isTest
    static void removeWhiteSpace_Test (){
        Test.startTest();
        string rws = Global_Utilities.removeWhiteSpace('test');
        
        Test.stopTest();
        system.assertNotEquals(rws,null, 'rellena un string');

     }   

     @isTest
     static void encryptData_Test (){
        test.startTest();
          String encryptedData = Global_Utilities.encryptData('Test');
        test.stopTest();

        System.assertNotEquals(encryptedData, null, 'Assert para comprobar que lo que devuelve el método no es vacío');
     }

     @isTest
     static void decryptData_Test (){
        test.startTest();
          String decryptedData = Global_Utilities.decryptData( Global_Utilities.encryptData('Test'));
        test.stopTest();
		system.assert(decryptedData != '', 'Assert para comprobar que lo que devuelve el método no es vacío');
        //System.assertNotEquals(decryptedData, 'Test', 'Assert para comprobar que lo que devuelve el método no es vacío');
     }
    /*----------------------------------------------------------------------------------
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:   	Test method to test formatToServerDate method
    History
    <Date>			<Author>		<Description>
    13/12/2019		Joaquin Vera     Initial version
    ----------------------------------------------------------------------------------*/   
     @IsTest
     static void formatToServerDate_Test()
     {
         Test.startTest();
         String returnedInput = Global_Utilities.formatToServerDate(DateTime.now());
         Test.stopTest();
         System.assertNotEquals(returnedInput,null, ' Assert para comprobar que devuelve una fechac correcta');   
     }

   /*----------------------------------------------------------------------------------
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:   	Test method to test generateRandomNumber method
    History
    <Date>			<Author>		<Description>
    13/12/2019		Joaquin Vera     Initial version
    ----------------------------------------------------------------------------------*/   
    @IsTest
     static void generateRandomNumber_Test()
     {
         Integer size = 7;
         Test.startTest();
         String returnedInput = Global_Utilities.generateRandomNumber(size);
         Test.stopTest();
         System.assertEquals(returnedInput.length(), size, ' Assert para comprobar que el método devuelve un valor correcto. ');   
     }

    
    /*----------------------------------------------------------------------------------
    Author:        Shahad Naji
    Company:        Deloitte
    Description:   	Test method of getUserCurrency method
    History
    <Date>			<Author>		<Description>
    12/01/2020		Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/   
    @isTest
    static void getUserCurrency_Test(){
        Test.startTest();
        Wrapper_Currency wc = new Wrapper_Currency();
        List<User> usrLst = [SELECT Id FROM User WHERE Email='test@test.es'];
        if(!usrLst.isEmpty()){
            system.runAs(usrLst.get(0)){
                wc = Global_Utilities.getUserCurrency();
            }            
        }  
        system.assert(wc.iIsoCode == 'EUR', 'Assert para comporobar que ha devuelto los datos de la moneda EUR');    
        Test.stopTest();      	
    }
    
        /*----------------------------------------------------------------------------------
    Author:        Shahad Naji
    Company:        Deloitte
    Description:   	Test method of getCurrencies method
    History
    <Date>			<Author>		<Description>
    12/01/2020		Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/  
    @isTest
    static void getCurrencies_Test(){
        Test.startTest();
        List<Wrapper_Currency> wcLst = new List<Wrapper_Currency>();
        String userCurrency = 'EUR';
        List<String> currencyList = new List<String>{'GBP', 'USD'};
        wcLst = Global_Utilities.getCurrencies(userCurrency, currencyList);
        system.assert(wcLst.size() != 0, 'The method has not retrieved sufficient information');
        Test.stopTest(); 
    }
    
        /*----------------------------------------------------------------------------------
    Author:        Shahad Naji
    Company:        Deloitte
    Description:   	Test method of getCurrency method
    History
    <Date>			<Author>		<Description>
    13/03/2020		Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/  
    @isTest
    static void getCurrency_Test(){
        Test.startTest();
        Wrapper_Currency wc = new Wrapper_Currency();
        wc = Global_Utilities.getCurrency('USD');
        system.assert(wc.iId != '', 'The method has not retrieved the ID of USD currency');
        Test.stopTest(); 
    }
    
    /*----------------------------------------------------------------------------------
Author:        Shahad Naji
Company:        Deloitte
Description:   	Test method of getCurrencyLabel method
History
<Date>			<Author>		<Description>
13/03/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/  
    @isTest
    static void getCurrencyLabel_Test(){
        Wrapper_Currency wc = new Wrapper_Currency();
        Test.startTest();        
        wc = Global_Utilities.getCurrencyLabel('USD');      
        Test.stopTest(); 
          system.assert(wc.iCurrencyName != '', 'The method has not retrieved the name of USD currency');
    }
    
    /*----------------------------------------------------------------------------------
Author:        Shahad Naji
Company:        Deloitte
Description:   	Test method of getISO2Values method
History
<Date>			<Author>		<Description>
13/03/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/  
    @isTest
    static void getISO2Values_Test(){
        List<String> lst = new List<String>();
        Test.startTest();
        lst = Global_Utilities.getISO2Values();
        Test.stopTest();
        system.assert(lst.size() > 0, 'The method has not retrieved sufficient information ');
    }
      
    /*----------------------------------------------------------------------------------
Author:        Shahad Naji
Company:        Deloitte
Description:   	Test method of getStatuses method
History
<Date>			<Author>		<Description>
13/03/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/  
    @isTest
    static void getStatuses_Test(){
        List<String> lst =  new List<String>();
        Test.startTest();
        lst = Global_Utilities.getStatuses();
        Test.stopTest();
        system.assert(lst.size() > 0, 'The method has not retrieved sufficient information ');
        
    }
 
        /*----------------------------------------------------------------------------------
Author:        Shahad Naji
Company:        Deloitte
Description:   	Test method of getUserNumberFormat method
History
<Date>			<Author>		<Description>
13/03/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/  
    @isTest
    static void getUserNumberFormat_Test(){
        String str = '';
        Test.startTest();
        List<User> usrLst = [SELECT Id FROM User WHERE Email='test@test.es'];
        if(!usrLst.isEmpty()){
            system.runAs(usrLst.get(0)){
                str = Global_Utilities.getUserNumberFormat(usrLst.get(0).id);
            }            
        }  
        Test.stopTest();
        system.assert(str != '', 'The method has not retrieved the format of the number for a specific user');
    }

     @IsTest
     static void formatAmount_Test()
     {
         Test.startTest();
         String returnedInput = Global_Utilities.formatAmount(4000.789,3, ',', '.');
         Test.stopTest();
     }
    
         @IsTest
     static void getCurrentUserTimezoneOffSetInMiliseconds_Test()
     {
         Test.startTest();
         List<String> dates = new List<String>();
         dates.add('2020-05-20T00:00:00:000');
         dates.add('2020-05-24T00:00:00:000');

         Global_Utilities.getCurrentUserTimezoneOffSetInMiliseconds(dates);
         Test.stopTest();
     }
    
         @IsTest
     static void getCountryName_Test()
     {
         Test.startTest();
         Global_Utilities.getCountryName('EUR');
         Test.stopTest();
     }

    @isTest
    static void getUserDateFormat_Test(){
        String str = '';
        Test.startTest();
        List<User> usrLst = [SELECT Id FROM User WHERE Email='test@test.es'];
        if(!usrLst.isEmpty()){
            system.runAs(usrLst.get(0)){
                str = Global_Utilities.getUserDateFormat(usrLst.get(0).id);
            }            
        }  
        Test.stopTest();
        system.assert(str != '', 'The method has not retrieved the format of the number for a specific user');
    }
    
        @isTest
    static void getISO3Values_Test(){
        String str = '';
        Test.startTest();
        List<User> usrLst = [SELECT Id FROM User WHERE Email='test@test.es'];
        if(!usrLst.isEmpty()){
            system.runAs(usrLst.get(0)){
                Global_Utilities.getISO3Values();
            }            
        }  
        Test.stopTest();
    }
    
         @isTest
    static void getExchangeRates_Test(){
        String str = '';
        Test.startTest();
        List<User> usrLst = [SELECT Id FROM User WHERE Email='test@test.es'];
        if(!usrLst.isEmpty()){
            system.runAs(usrLst.get(0)){
                List<String> currencies = new List<String>();
                currencies.add('EUR');
                currencies.add('CHF');
                currencies.add('BRL');

                Global_Utilities.getExchangeRates('EUR',currencies,40);
            }            
        }  
        Test.stopTest();
    }
    
    @isTest
    static void sendEmail_Test(){
        Id UserId = UserInfo.getUserId();
        List<Id> userList = new List<Id>();
        userList.add(UserId);
        Map<String, String> replacements = new Map<String, String>();
        replacements.put('[CaseNumber]', '12345678');      
        Global_Utilities.sendEmailWithoutTemplate('Test [CaseNumber]', 'Test [CaseNumber]', null, userList, null, null, replacements, replacements);
        
    }
    
}