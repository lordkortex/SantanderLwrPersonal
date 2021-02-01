/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Test class for CNT_MRTrackerSearch component controller
History
<Date>			<Author>		<Description>
12/02/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_MRTrackerSearch_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
    
  
    /*------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Tests the method getFilteredData from the class.
    History 
    <Date>          <Author>            <Change Description>
	12/02/2020		R. Alexander Cervino     Initial version
    ------------------------------------------------------------*/ 
    @IsTest  public static void getAccounts_test(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
        CNT_MRTrackerSearch.getAccounts();
        Test.stopTest();       
    }
    
   

    /*------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Tests the method getFilteredData from the class.
    History 
    <Date>          <Author>            <Change Description>
	12/02/2020		R. Alexander Cervino     Initial version
    ------------------------------------------------------------*/ 
  @IsTest public static void getISO2Values_test()
    {
        Test.startTest();
        CNT_MRTrackerSearch.getISO2Values();
        Test.stopTest();       
    }
    
        /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Test of getStatus method
    History 
	<Date>          <Author>        <Change Description>
	16/03/2020		Shahad Naji     Initial version
    ------------------------------------------------------------*/ 
    @isTest
    public static void getStatus_test(){
        Test.startTest();
        List<String> lst = new List<String>();
        lst = CNT_MRTrackerSearch.getStatus();
        
       // system.assert(lst.size() > 0, 'ERROR >>> CNT_MRTrackerSearch_Test - getStatus: The method does not return any value');
        Test.stopTest();        
    }
    
        /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Test of getStatus method
    History 
	<Date>          <Author>        <Change Description>
	16/03/2020		Shahad Naji     Initial version
    ------------------------------------------------------------*/ 
    @isTest
    public static void getIsCashNexusTest(){
        Test.startTest();
		user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            CNT_MRTrackerSearch.getIsCashNexus();
        }
        Test.stopTest();        
    }
    
         /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Test of getStatus method
    History 
	<Date>          <Author>        <Change Description>
	16/03/2020		Shahad Naji     Initial version
    ------------------------------------------------------------*/ 
    @isTest
    public static void getCheckboxWelcomePackTest(){
        Test.startTest();
        CNT_MRTrackerSearch.getCheckboxWelcomePack();
        Test.stopTest();        
    }
    
         /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Test of getStatus method
    History 
	<Date>          <Author>        <Change Description>
	16/03/2020		Shahad Naji     Initial version
    ------------------------------------------------------------*/ 
    @isTest
    public static void downloadAllTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        User u = DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            CNT_MRTrackerSearch.downloadAll('');
            Test.stopTest();
        }
                
    }
    
        /*------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Test of getStatus method
    History 
	<Date>          <Author>        <Change Description>
	16/03/2020		Shahad Naji     Initial version
    ------------------------------------------------------------*/ 
    @isTest
    public static void removeFileTest(){
        Test.startTest();
        User u = DataFactory.getRunningUser(true);
        System.runAs(u){
            List<ContentDocument> docs=DataFactory.createDoc();
            CNT_MRTrackerSearch.removeFile(docs[0].Id);
        }
        Test.stopTest();        
    }
    
     @isTest
    public static void decryptTest(){
        Test.startTest();
        User u = DataFactory.getRunningUser(true);
        System.runAs(u){
            DataFactory.getCustomSettingCryptoKey(true);
            CNT_MRTrackerSearch.decryptData(Global_Utilities.encryptData('test'));
        }
        Test.stopTest();        
    }

    @isTest
    public static void getCurrenciesTest(){
        Test.startTest();
        User u = DataFactory.getRunningUser(true);
        System.runAs(u){
            CNT_MRTrackerSearch.getCurrencies();
        }
        Test.stopTest();        
    }

}