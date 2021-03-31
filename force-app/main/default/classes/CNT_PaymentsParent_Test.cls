@isTest
public class CNT_PaymentsParent_Test {
    
    @testSetUp
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void methods_Test(){
        
        //getPaymentDetail param
        String paymentId = '12345';
        
        CNT_PaymentsParent.getCurrentUserInfo();
        CNT_PaymentsParent.getAccountTypes();
        CNT_PaymentsParent.getCurrencyList();
        CNT_PaymentsParent.getStatusList();
        CNT_PaymentsParent.getPaymentMethodList();
        CNT_PaymentsParent.getCountryList();
        CNT_PaymentsParent.getPaymentStatusReasonList();
        CNT_PaymentsParent.getPaymentDetail(paymentId);
        
    }
    
    @isTest
    static void searchPaymentsInformation_Test_01(){
        
        //searchPaymentsInformation params
        String globalUserId = 'SGPgtsfun211911'; //Hardcoded
        Boolean pendingAuthorization = false;
        List<WS_OperationsList.SourceAccountList> sourceAccountList = new List<WS_OperationsList.SourceAccountList>();
        String destinationCountry = '';
        Decimal amountFrom = 123.45; 
        Decimal amountTo = 123.45; 
        List<WS_OperationsList.CurrencyList> currencyList = new List<WS_OperationsList.CurrencyList>();
        String paymentMethod = 'Book_to_Book';
        String clientReference = 'clientReference'; 
        String valueDateFrom = 'valueDateFrom'; 
        String valueDateTo = 'valueDateTo';
        Boolean latestOperationsFlag = false;
        List<WS_OperationsList.StatusList> statusList = new List<WS_OperationsList.StatusList>();
        WS_OperationsList.SourceData sourceData = null;
        String operationGlobalId = 'operationGlobalId';
        WS_OperationsList.DestinationData destinationData = null;
        
        //searchPaymentsInformation extra param
        String productId = 'productId';
        
        CNT_PaymentsParent.searchPaymentsInformation(globalUserId, pendingAuthorization, sourceAccountList, destinationCountry, amountFrom, amountTo, currencyList, paymentMethod, clientReference, valueDateFrom, valueDateTo, latestOperationsFlag, statusList, sourceData, operationGlobalId, destinationData);
        //CNT_PaymentsParent.searchPaymentsInformation(globalUserId, pendingAuthorization, sourceAccountList, destinationCountry, amountFrom, amountTo, currencyList, paymentMethod, clientReference, valueDateFrom, valueDateTo, latestOperationsFlag, statusList, sourceData, operationGlobalId, destinationData, productId);
        
    }
    
    @isTest
    static void searchPaymentsInformation_Test_02(){
        
        //HttpCalloutMock
        Test.setMock(HttpCalloutMock.class, new CNT_PaymentsParent_MockHttp.OperationsList());
        
        //searchPaymentsInformation params
        String globalUserId = 'SGPgtsfun211911'; //Hardcoded
        Boolean pendingAuthorization = false;
        
        WS_OperationsList.SourceAccount srcAcc = new WS_OperationsList.SourceAccount();
        srcAcc.accountType = 'accountType';
        srcAcc.accountId = 'accountId';
        
        List<WS_OperationsList.SourceAccountList> sourceAccountList = new List<WS_OperationsList.SourceAccountList>();
        WS_OperationsList.SourceAccountList sourceAccount = new WS_OperationsList.SourceAccountList();
        sourceAccount.bankId = 'bankId';
        sourceAccount.agentName = 'agentName';
        sourceAccount.alias = 'alias';
        sourceAccount.sourceAccount = srcAcc;
        sourceAccountList.add(sourceAccount);
        
        String destinationCountry = 'destinationCountry';
        Decimal amountFrom = 123.45; 
        Decimal amountTo = 123.45; 
        
        List<WS_OperationsList.CurrencyList> currencyList = new List<WS_OperationsList.CurrencyList>();
        WS_OperationsList.CurrencyList currencyLst = new WS_OperationsList.CurrencyList();
        currencyLst.tcurrency = 'tcurrency';
        currencyList.add(currencyLst);
        
        String paymentMethod = 'Book_to_Book';
        String clientReference = 'clientReference'; 
        String valueDateFrom = 'valueDateFrom'; 
        String valueDateTo = 'valueDateTo';
        Boolean latestOperationsFlag = false;
        
        List<WS_OperationsList.StatusList> statusList = new List<WS_OperationsList.StatusList>();
        WS_OperationsList.StatusList sttusList = new WS_OperationsList.StatusList();
        sttusList.reason = 'reason';
        sttusList.status = 'status';
        statusList.add(sttusList);
        
        WS_OperationsList.SourceData sourceData = new WS_OperationsList.SourceData();
        sourceData.name = 'BancoSantander';
        
        String operationGlobalId = 'operationGlobalId';
        
        WS_OperationsList.DestinationData destinationData = new WS_OperationsList.DestinationData();
        destinationData.agentName = 'agentName';
        destinationData.name = 'name';
        destinationData.destinationAccount = srcAcc;
        
        //searchPaymentsInformation extra param
        String productId = 'productId';
        
        Test.startTest();
        //CNT_PaymentsParent.searchPaymentsInformation(globalUserId, pendingAuthorization, sourceAccountList, destinationCountry, amountFrom, amountTo, currencyList, paymentMethod, clientReference, valueDateFrom, valueDateTo, latestOperationsFlag, statusList, sourceData, operationGlobalId, destinationData);
        CNT_PaymentsParent.searchPaymentsInformation(globalUserId, pendingAuthorization, sourceAccountList, destinationCountry, amountFrom, amountTo, currencyList, paymentMethod, clientReference, valueDateFrom, valueDateTo, latestOperationsFlag, statusList, sourceData, operationGlobalId, destinationData, productId);
        Test.stopTest();
        
    }
    
}