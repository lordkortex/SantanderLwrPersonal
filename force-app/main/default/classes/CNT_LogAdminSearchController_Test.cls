/*----------------------------------------------------------------------------------
Author:         Diego Asis 
Company:        Deloitte
Description:    Test class of CNT_LogAdminSearchController
History
<Date>			<Author>		  <Description>
21/01/2020		Diego Asis        Initial version
----------------------------------------------------------------------------------*/

@isTest
public class CNT_LogAdminSearchController_Test {
   
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @IsTest
    static void generateMockDataTest(){         
        List<CNT_LogAdminSearchController.CNT_LogAdminSearchDataWrapper> listaWrapper = CNT_LogAdminSearchController.generateMockData();
    }
    
    @IsTest
    static void getLogsMockTest(){       
        List<CNT_LogAdminSearchController.CNT_LogAdminSearchDataWrapper> listaWrapper = CNT_LogAdminSearchController.getLogsMock();
    }
    
    @IsTest
    static void getLogsTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_LogAdminSearchController_MockHttp());
        user u =DataFactory.getRunningUser(true);
        
        Map<String, String> filters = new Map<String, String>();
        System.runAs(u){
            Test.startTest();
      		List<WRAPPER_LogAdminSearch> listaWrapper = CNT_LogAdminSearchController.getLogs(filters);
            Test.stopTest();
        }
    }
}