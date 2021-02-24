/*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Test class of CNT_AccountDetails
Te
History 
<Date>          <Author>            <Change Description>
22/04/2020      Shahad Naji  	Intial Version
------------------------------------------------------------*/
@isTest
public class CNT_AccountDetails_Test {
    
    @testSetUp
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    public static void getPersonalSettingsTest(){
        
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            //DataFactory.createWsConfigurationSetting(true);
            WRAPPER_PersonalSettings data = CNT_AccountDetails.getPersonalSettings();
            Test.stopTest();
        }
        
    }
    
    @isTest
    public static void updateAliasBankTest(){
        
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            //DataFactory.createWsConfigurationSetting(true);
            Boolean data = CNT_AccountDetails.updateAliasBank('test');
            Test.stopTest();
        }
        
    }
    @isTest
    public static void updateAliasAccountTest(){
        
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            //DataFactory.createWsConfigurationSetting(true);
            Boolean data = CNT_AccountDetails.updateAliasAccount('test');
            Test.stopTest();
        }
        
    }
    
}