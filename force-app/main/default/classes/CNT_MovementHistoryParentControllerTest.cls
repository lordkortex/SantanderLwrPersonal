/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Controller of CNT_MovementHistoryParentControllerTest 
History
<Date>			<Author>		<Description>
10/01/2020		Pablo Tejedor     Initial version
----------------------------------------------------------------------------------*/

@isTest
public class CNT_MovementHistoryParentControllerTest {
    
    @TestSetup
    static void makeData(){ 
        DataFactory.getCustomSettingCryptoKey(true);        
    }
    
    /*------------------------------------------------------------
Author:         Diego Asis
Company:        Deloitte
Description:    Generates dummy data with the number of data to return
History 
<Date>          <Author>            <Change Description>
31/03/2020		Diego Asis	        Initial version
------------------------------------------------------------*/ 
    @IsTest
    static void getDataMovementHistoryTest(){
        
        List<CNT_MovementHistoryParentController.CNT_MovementHistoryDataWrapper> data = CNT_MovementHistoryParentController.getDataMovementHistory();
        
    }
    
    @IsTest
    static void encryptDataTest(){
        
        String data = CNT_MovementHistoryParentController.encryptData('');
    }
    
    @IsTest
    static void decryptDataTest(){
        
        String data = CNT_MovementHistoryParentController.decryptData(Global_Utilities.encryptData('test'));
    }
    
    @IsTest
    static void getDatesFromToTest(){
        
        List<date> data = CNT_MovementHistoryParentController.getDatesFromTo();
    }
    
    @IsTest
    static void getAccountsAvaibleDataTest(){
        
        CNT_International_Treasury_Management data = CNT_MovementHistoryParentController.getAccountsAvaibleData();
    }
    
    @IsTest
    static void getMovementHistoryDataTest(){
        
        Test.setMock(HttpCalloutMock.class, new CNT_MovementHistoryParent_MockHttp());
        DataFactory.createWsConfigurationSetting(true);
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            List<CNT_MovementHistoryParentController.CNT_MovementHistoryDataWrapper> data = CNT_MovementHistoryParentController.getMovementHistoryData('', '', '');
            Test.stopTest();
        }
    }
    
    /*------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Generates dummy data with the number of data to return
History 
<Date>          <Author>            <Change Description>
10/01/2020		Pablo Tejedor        Initial version
------------------------------------------------------------ 
@IsTest
static void encryptDataTest(){
String data = 'test data';
String dat2 = '';
Test.startTest();
dat2 = CNT_MovementHistoryParentController.encryptData(data);
Test.stopTest();
System.assertNotEquals(dat2, '');

}

/*------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Generates dummy data with the number of data to return
History 
<Date>          <Author>            <Change Description>
10/01/2020		Pablo Tejedor       Initial version
------------------------------------------------------------ 
@IsTest
static void decryptDataTest(){
String data = 'test data';
String dat2 = '';
String dat3='';
dat2 = CNT_MovementHistoryParentController.encryptData(data);
Test.startTest();
dat3 = CNT_MovementHistoryParentController.decryptData(dat2);
Test.stopTest();
System.assertNotEquals(dat3, '');

}*/
    
    
}