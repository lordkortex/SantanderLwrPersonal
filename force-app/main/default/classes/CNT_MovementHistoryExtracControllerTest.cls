/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Controller of CNT_MovementHistoryExtracControllerTest 
History
<Date>			<Author>		<Description>
10/01/2020		Pablo Tejedor     Initial version
----------------------------------------------------------------------------------*/

@isTest
public class CNT_MovementHistoryExtracControllerTest {

    @TestSetup
    static void makeData(){ 
    DataFactory.getCustomSettingCryptoKey(true);        
    }

    
    /*------------------------------------------------------------
    Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Generates dummy data with the number of data to return
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020		Pablo Tejedor        Initial version
    ------------------------------------------------------------*/ 
    @IsTest
    static void getDataExtractTest(){
    
        list<CNT_MovementHistoryExtracController.CNT_MovementHistoryExtractDataWrapper> data = new  list<CNT_MovementHistoryExtracController.CNT_MovementHistoryExtractDataWrapper>();
        Test.startTest();
       
        data = CNT_MovementHistoryExtracController.getDataExtract();

        Test.stopTest();
        System.assertNotEquals(data, null,'Devuelve datos');   
    
    }

    /*------------------------------------------------------------
    Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Generates dummy data with the number of data to return
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020		Pablo Tejedor       Initial version
    ------------------------------------------------------------*/ 
    @IsTest
    static void decryptDataTest(){
        String data = 'test data';
        String dat2 = '';
        String dat3='';
        dat2 = Global_Utilities.encryptData(data);
        Test.startTest();
        dat3 = CNT_MovementHistoryExtracController.decryptData(dat2);
        Test.stopTest();
        System.assertNotEquals(dat3, '');
        
    }
    
    
    /*------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Generates dummy data with the number of data to return
    History 
    <Date>          <Author>            <Change Description>
    30/05/2020		R. Cervino       Initial version
    ------------------------------------------------------------*/ 
    @IsTest
    static void getExtractIntegrationDataTest(){

        Test.setMock(HttpCalloutMock.class, new CNT_MovementHistoryExtrac_MockHttp());
        DataFactory.createWsConfigurationSetting(true);
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
        	CNT_MovementHistoryExtracController.getExtractIntegrationData('test','2019/05/05');
            Test.stopTest();
        }
     
    }

}