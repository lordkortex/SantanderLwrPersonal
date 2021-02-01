/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Test class for CNT_BackFrontPain002Table component controller
History
<Date>			<Author>		<Description>
12/02/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_BackFrontPain002Table_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
    
    //Map<String,CNT_ApiConfiguration__c> customSettings = DataFactory.createWsConfigurationSetting(true);
    
    @IsTest
    /*------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Tests the method getFilteredData from the class.
    History 
    <Date>          <Author>            <Change Description>
	12/02/2020		R. Alexander Cervino     Initial version
    ------------------------------------------------------------*/ 
    public static void getFilteredData_Test()
    {
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
        //DataFactory.createWsConfigurationSetting(true);
        CNT_BackFrontPain002Table.getFilteredData(true,'prueba');
        CNT_BackFrontPain002Table.getFilteredData(false,'');
        Test.stopTest();       
    }
    
    @IsTest

    public static void getDeactivatedPain002_Test()
    {
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
        //DataFactory.createWsConfigurationSetting(true);
        CNT_BackFrontPain002Table.getDeactivatedPain002('');
        Test.stopTest();       
    }
    
    @IsTest

    public static void deletePain002Account_Test()
    {
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
        //DataFactory.createWsConfigurationSetting(true);

        CNT_BackFrontPain002Table.deletePain002Account('test','prueba');
        Test.stopTest();       
    }
    
    @IsTest

    public static void activePain002_Test()
    {
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
        //DataFactory.createWsConfigurationSetting(true);
        CNT_BackFrontPain002Table.activePain002('prueba');
        Test.stopTest();       
    }

}