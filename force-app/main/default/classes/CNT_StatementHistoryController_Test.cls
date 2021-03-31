@isTest
public class CNT_StatementHistoryController_Test {

    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void retrieveInitialData_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_StatementHistoryController_MockHttp.GlobalPosition());
        User u = DataFactory.getRunningUser(true);
        Test.startTest();
        
        CNT_StatementHistoryController.retrieveInitialData(u.Id);
        
        Test.stopTest();
    }
    
    @isTest
    static void searchExtracts_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_StatementHistoryController_MockHttp.StatementList());

        Test.startTest();
        
        CNT_StatementHistoryController.searchExtracts('accountCode', 'dateFrom', 'dateTo');
        
        Test.stopTest();
    }
    
    @isTest
    static void searchMovements_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_StatementHistoryController_MockHttp.AccountTransactionSearch());

        Test.startTest();
        
        CNT_StatementHistoryController.searchMovements('accountCode', 'dateToSearch');
        
        Test.stopTest();
    }
    
    @isTest
    static void getPaginatedMovements_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_StatementHistoryController_MockHttp.AccountTransactionSearch());

        Test.startTest();
        
        CNT_StatementHistoryController.getPaginatedMovements('bodyParams');
        
        Test.stopTest();
    }
    
	@isTest
    static void getCurrentUserTimezoneOffSetInMiliseconds_Test(){
        List<String> dateInput = new List<String>{'',''};
        CNT_StatementHistoryController.getCurrentUserTimezoneOffSetInMiliseconds(dateInput);
    }          
}