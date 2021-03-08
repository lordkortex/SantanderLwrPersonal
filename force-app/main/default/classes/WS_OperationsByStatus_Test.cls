/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
24/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WS_OperationsByStatus_Test {
	
    @TestSetup  
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
		main();
    }
   
    @isTest
    static void main(){
       Test.setMock(HttpCalloutMock.class, new WS_OperationByStatus_Test_MockHttp());
       Test.startTest();
       CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(Name = 'WS_TrackingPaymentOperation',
                                                                      CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/operationTracking/statusheader',
                                                                      CNT_HTTPMethod__c = 'POST',
                                                                      CNT_Service__c = 'Mulesoft' );
       insert configWs; 
       WS_OperationsByStatus.StatusList StatusList = new WS_OperationsByStatus.StatusList();
       StatusList.status = 'OK';
       StatusList.reason = 'OK';
       StatusList.valueDateFrom = '10/10/2020';
       StatusList.valueDateTo = '10/10/2020';
        
       WS_OperationsByStatus.StatusList StatusList_sub = new WS_OperationsByStatus.StatusList('OK','OK','10/10/2020','10/10/2020');
        
       WS_OperationsByStatus.Account Account = new WS_OperationsByStatus.Account();
       Account.idType = 'Test';
       Account.accountId = 'Test';
        
       WS_OperationsByStatus.Account Account_sub = new WS_OperationsByStatus.Account('Test','Test');        
        
       WS_OperationsByStatus.AccountList AccountList = new WS_OperationsByStatus.AccountList();
       AccountList.originatorAgent = 'Test';
       AccountList.account = Account;
        
       WS_OperationsByStatus.AccountList AccountList_sub = new WS_OperationsByStatus.AccountList(Account);
       WS_OperationsByStatus.AccountList AccountList_sub2 = new WS_OperationsByStatus.AccountList('Test',Account);
        
       WS_OperationsByStatus.SearchData SearchData = new WS_OperationsByStatus.SearchData();
       SearchData.accountList = null;
       SearchData.statusList = null;
       SearchData.globalUserId = 'Test';
       
       WS_OperationsByStatus.SearchData SearchData_sub = new WS_OperationsByStatus.SearchData();       
       WS_OperationsByStatus.SearchData SearchData_sub2 = new WS_OperationsByStatus.SearchData(null,null,'Test');       
        
       WS_OperationsByStatus.INPUT input = new WS_OperationsByStatus.INPUT(SearchData);
       input.searchData = SearchData;               
        
       WS_OperationsByStatus ws_operation = new WS_OperationsByStatus();
        
        ws_operation.getResult();
        try{
        	ws_operation.execute(null, null, 'Test');
        }catch(Exception e){
            system.debug(e);
        }
        
       Test.stopTest();

	}
}