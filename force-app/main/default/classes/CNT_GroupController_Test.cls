/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Controller of Groups components
History
<Date>			<Author>		<Description>
10/01/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
@IsTest
public with sharing class CNT_GroupController_Test {

    @TestSetup
    static void setup(){ 
        DataFactory.getCustomSettingCryptoKey(true); 
        DataFactory.createWsConfigurationSetting(true);
    }


    /*------------------------------------------------------------
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Generates dummy data with the number of data to return
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020		Joaquin Vera        Initial version
    ------------------------------------------------------------*/ 
    @IsTest
    static void getDataTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());        
        User u = DataFactory.getRunningUser(true);
        Test.startTest();
        CNT_GroupController.getData(u.Id);
        Test.stopTest();        
    }
    /*------------------------------------------------------------
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Generates dummy data with the number of data to return
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020		Joaquin Vera        Initial version
    ------------------------------------------------------------*/ 
    @IsTest
    static void generateDummyDataTest(){
        Test.startTest();
        CNT_GroupController.generateDummyData(10);
        Test.stopTest();
        //List<CNT_GroupController.CNT_GroupWrapper> lista = JSON.deserialize(data, List<CNT_GroupController.CNT_GroupWrapper>.class);
        //system.assertEquals(lista.size(), 10);
    }
    /*----------------------------------------c  --------------------
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Generates dummy data with the number of data to return
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020		Joaquin Vera        Initial version
    ------------------------------------------------------------*/ 
    @IsTest
    static void encryptDataTest(){
        String data = 'test data';
        String dat2 = '';
        Test.startTest();
        dat2 = CNT_GroupController.encryptData(data);
        Test.stopTest();
        System.assertNotEquals(dat2, '');
        
    }
}