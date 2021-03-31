/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Test class for Users component controller
History
<Date>			<Author>		<Description>
15/01/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
@isTest
public with sharing class CNT_UsersController_Test {

    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.getCustomSettingCryptoKey(true);
    }
    
	@IsTest
    public static void getUsersInfo_Test()
    {
        Test.setMock(HttpCalloutMock.class, new CNT_UsersController_MockHttp());
        
        
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
        	CNT_UsersController.getUsersInfo();
            Test.stopTest();
        }
        //List<CNT_UsersController.CNT_UsersWrapper> dataDeserialized = (List<CNT_UsersController.CNT_UsersWrapper>) JSON.deserialize(data, List<CNT_UsersController.CNT_UsersWrapper>.class);        
        //system.assertEquals(dataDeserialized.size(), 800, 'tests if the number of values returned are 800');
        
    }
    
    @isTest
    public static void regeneratePasswordTest()
    {
        Test.setMock(HttpCalloutMock.class, new CNT_UsersController_MockHttp());
        Test.startTest();
        CNT_UsersController.regeneratePassword('');
        Test.stopTest();        
    }
    
    @isTest
    public static void getUserInfoTest()
    {
        Test.setMock(HttpCalloutMock.class, new CNT_UsersController_MockHttp());       
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
        	CNT_UsersController.getUserInfo(u.Id);
            Test.stopTest();
        }
                
    }
    
     @isTest
    public static void decryptDataTest()
    {
        Test.setMock(HttpCalloutMock.class, new CNT_UsersController_MockHttp());
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
        	CNT_UsersController.decryptData(Global_Utilities.encryptData('test'));
            Test.stopTest();
        }
                
    }

}