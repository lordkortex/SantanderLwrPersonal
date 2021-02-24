/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
23/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WS_OperationsList_Test {
	
    @TestSetup  
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
   
    @isTest
    static void main(){
        Test.setMock(HttpCalloutMock.class, new WS_OperationsList_MockHttp());
        
        Test.startTest();
        
		WS_OperationsList.INPUT input = new WS_OperationsList.INPUT(null);
		input.searchData = null;
        
		WS_OperationsList.INPUT input_sub = new WS_OperationsList.INPUT(null);
        
        WS_OperationsList.SearchData searchData = new WS_OperationsList.SearchData();
        searchData.operationGlobalId = 'Test';
        searchData.globalUserId = 'Test';
        searchData.pendingAuthorization = false;
        searchData.latestOperationsFlag = false;
        searchData.sourceAccountList = null;
        searchData.destinationData = null;
        searchData.destinationCountry = 'ES';
        searchData.statusList = null;
        searchData.valueDateFrom = '10/10/2020';
        searchData.valueDateTo = '10/10/2020';
        searchData.amountFrom = 100.00;
        searchData.amountTo = 100.00;
        searchData.currencyList = null;
        searchData.paymentMethod = 'Test';
        searchData.productId = 'Test';
        searchData.operationType = 'Test';
        searchData.clientReference = 'Test';
        searchData.offset = 2;
        searchData.t_limit = 2;
        searchData.sourceData = null;
        
        WS_OperationsList.SearchData searchData_sub = new WS_OperationsList.SearchData(false);
        WS_OperationsList.SearchData searchData_sub2 = new WS_OperationsList.SearchData(false, null);
        WS_OperationsList.SearchData searchData_sub3 = new WS_OperationsList.SearchData(false, null, null);
        WS_OperationsList.SearchData searchData_sub4 = new WS_OperationsList.SearchData('Test',false, false, null, 'ES', null, 100.00, 100.00,
                           null,  'Test', 'Test', '10/10/2020', '10/10/2020');

        
        WS_OperationsList.SourceData sourceData = new WS_OperationsList.SourceData();
        sourceData.name = 'Test';
        
		WS_OperationsList.SourceData sourceData_sub = new WS_OperationsList.SourceData('Test');
        
        WS_OperationsList.SourceAccountList sourceAccountList = new WS_OperationsList.SourceAccountList();
        sourceAccountList.bankId = 'Test';
        sourceAccountList.agentName = 'Test';
        sourceAccountList.alias = 'Test';
        sourceAccountList.sourceAccount = null;
        
		WS_OperationsList.SourceAccountList sourceAccountList_sub = new WS_OperationsList.SourceAccountList('Test','Test','Test',null);

        WS_OperationsList.SourceAccount sourceAccount = new WS_OperationsList.SourceAccount();
        sourceAccount.accountType = 'Test';
        sourceAccount.accountId = 'Test';
        
		WS_OperationsList.SourceAccount sourceAccount_sub = new WS_OperationsList.SourceAccount('Test','Test');
        
        WS_OperationsList.DestinationData destinationData = new WS_OperationsList.DestinationData();
        destinationData.name = 'Test';
        destinationData.agentName = 'Test';
        destinationData.destinationAccount = null;
        
		WS_OperationsList.DestinationData destinationData_sub = new WS_OperationsList.DestinationData('Test', 'Test', null);
        
        WS_OperationsList.StatusList statusList = new WS_OperationsList.StatusList();
        statusList.status = 'Test';
        statusList.reason = 'Test';
        
		WS_OperationsList.StatusList statusList_sub = new WS_OperationsList.StatusList('Test', 'Test');       
        
        WS_OperationsList.OperationStatus operationStatus = new WS_OperationsList.OperationStatus();
        operationStatus.status = 'Test';
        operationStatus.reason = 'Test';
        
		WS_OperationsList.OperationStatus operationStatus_sub = new WS_OperationsList.OperationStatus('Test', 'Test');  
        
        WS_OperationsList.CurrencyList currencyList = new WS_OperationsList.CurrencyList();
        currencyList.tcurrency = 'EUR';
        
		WS_OperationsList.CurrencyList currencyList_sub = new WS_OperationsList.CurrencyList('EUR');  
		List<WS_OperationsList.SourceAccountList> sourceList = new List<WS_OperationsList.SourceAccountList>();
        
        
        WS_OperationsList operationsList = new WS_OperationsList();
        List<WS_OperationsList.SourceAccountList> sourceAccountLst = new List<WS_OperationsList.SourceAccountList>();
        
        sourceAccountLst.add(sourceAccountList);
        List<WS_OperationsList.StatusList> statusLst = new List<WS_OperationsList.StatusList>();
        
        operationsList.getResult();
        
        
        try{
            operationsList.execute(false);
        }catch(Exception e){
            system.debug(e);
        }
        try{
            operationsList.execute(false, sourceAccountLst);
        }catch(Exception e){
            system.debug(e);
        }
        try{
            operationsList.execute(false, sourceAccountLst, statusLst);
        }catch(Exception e){
            system.debug(e);
        }
        
         try{
            operationsList.downloadPaymentsList(false, sourceList, 'CSV');
        }catch(Exception e){
            system.debug(e);
        }
        
        Test.stopTest();
        
    }
    
    

}