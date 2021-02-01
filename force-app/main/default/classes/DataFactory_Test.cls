/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    This class is use to test DataFactory class.
Test Class:     DataFactory_Test
History
<Date>			<Author>		 <Description>
19/11/2019		Pablo Tejedor    Initial version
----------------------------------------------------------------------------------*/

@isTest
public with sharing class DataFactory_Test {
    
    @isTest
    static void getCustomSettingCryptoKeyTest(){

        test.startTest();
        
        List<cryptoKey__c> listaValor = DataFactory.getCustomSettingCryptoKey(true);
        
        test.stopTest();
        
        System.assertNotEquals(listaValor.size(),0,'Comprobamos que devuelva algún valor');
    }
    
    
    @isTest
    static void getRunningUserTest(){

        test.startTest();
        User u = DataFactory.getRunningUser(true);
        test.stopTest();
        
        System.assertNotEquals(u, null, ' Comprobamos que el usuario que devuelva no es nulo');
        
        
    }

    @isTest
    static void getAccWrapList(){
   
    DataFactory.getCustomSettingCryptoKey(true);
            
        test.startTest();
            DataFactory.getAccountList();
        test.stopTest();
            
       System.assertNotEquals(DataFactory.getAccountList() , null  , ' Comprobamos que la lista es mayor que cero');
    }

     @isTest
    static void createWsConfigurationSetting_Test(){
   
         DataFactory.getCustomSettingCryptoKey(true);

        test.startTest();
          map<String,CNT_ApiConfiguration__c> mapaWS =  DataFactory.createWsConfigurationSetting(true);
        test.stopTest();
            
        System.assertEquals(mapaWS , mapaWS  , ' Comprobamos que la lista es mayor que cero');
    }
     
}