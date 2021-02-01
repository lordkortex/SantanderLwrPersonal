/*----------------------------------------------------------------------------------
Author:         Diego Asis 
Company:        Deloitte
Description:    Test class of CNT_AdministracionRolesController
History
<Date>			<Author>		  <Description>
21/01/2020		Diego Asis        Initial version
----------------------------------------------------------------------------------*/

@isTest
public class CNT_AdministracionRolesController_Test {
    
    @testSetUp
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @IsTest
    static void getDataTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_AdminRolesController_MockHttp());
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            CNT_AdministracionRolesController.getRoles();  
            Test.stopTest();
        }
    }
    
    @IsTest
    static void generateFalseDataTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_AdminRolesController_MockHttp());
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            List<CNT_AdministracionRolesController.CNT_AdministracionRolesWrapper> listaWrapper = CNT_AdministracionRolesController.generateFalseData();
            Test.stopTest();
        }
    }
}