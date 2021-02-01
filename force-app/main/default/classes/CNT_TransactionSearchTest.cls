@isTest
public class CNT_TransactionSearchTest {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
		DataFactory.getCustomSettingCryptoKey(true);
    }
    
    @IsTest
    static void getTransactionsTest(){
        
        try{
            WRAPPER_TransactionSearch data = CNT_TransactionSearchController.getTransactions('Test');
        }catch(Exception e){
            system.debug(e);
        }
    }
    
    @IsTest
    static void getTransactionCategoriesTest(){
		CNT_TransactionSearchController.getTransactionCategories(); 
    }
    
    @IsTest
    static void getFiltersDataTest(){       
        CNT_AccountsParent data = CNT_TransactionSearchController.getFiltersData('', '');
    }
    
    @isTest
    public static void encryotDataTest(){
        Test.startTest();        
        CNT_TransactionSearchController.encryptData('hola');
        Test.stopTest();
    }
    
    @isTest
    static void decryptDataTest(){
        Test.startTest();
        CNT_TransactionSearchController.decryptData( Global_Utilities.encryptData('Test'));
        Test.stopTest();
    }
    
    @isTest
    static void getUserPreferredFormatTest(){
        
        Test.startTest();
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            CNT_TransactionSearchController.getUserPreferredFormat( u.Id);
        }
        Test.stopTest();
    }
    
    @isTest
    static void formatNumberTest(){
        
        Test.startTest();
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            CNT_TransactionSearchController.formatNumber((Double)80.7,'###.###.###,##');
            CNT_TransactionSearchController.formatNumber((Double)80.7,'###,###,###.##');
            CNT_TransactionSearchController.formatNumber((Double)8056788678.7,'###.###.###,##');
            CNT_TransactionSearchController.formatNumber((Double)805675.7,'###,###,###.##');
            
        }
        Test.stopTest();
    }
        

    @isTest
    public static void removeFileTest(){
        Test.startTest();
        User u = DataFactory.getRunningUser(true);
        System.runAs(u){
            List<ContentDocument> docs=DataFactory.createDoc();
            CNT_TransactionSearchController.removeFile(docs[0].Id);
        }
        Test.stopTest();        
    }
    
        @isTest
    public static void downloadFileTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        
        User u = DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            try{
                CNT_TransactionSearchController.downloadFileDoc('Test');
            }catch(Exception e){
                system.debug(e);
            }
            
            Test.stopTest();
        }
                
    }
    
        @IsTest
    static void formatTransactionsOutputSingleAccTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());        
        Test.startTest();
        WRAPPER_AccountTransactionSearch.ObtTransacBusqueda ObtTransacBusqueda = new WRAPPER_AccountTransactionSearch.ObtTransacBusqueda();
        ObtTransacBusqueda.descripcion = 'X';
        ObtTransacBusqueda.importe = 10.00;
        ObtTransacBusqueda.importeString = '10,00';
        ObtTransacBusqueda.valueDate = '10/10/2020';
        ObtTransacBusqueda.bookDate = '10/10/2020';
        
        WRAPPER_AccountTransactionSearch.ListaObtTransacciones ListaObtTransacciones = new WRAPPER_AccountTransactionSearch.ListaObtTransacciones();
        ListaObtTransacciones.obtTransacBusqueda = ObtTransacBusqueda;    
        List<WRAPPER_AccountTransactionSearch.ListaObtTransacciones> lstObt = new List<WRAPPER_AccountTransactionSearch.ListaObtTransacciones>();
        List<List<WRAPPER_AccountTransactionSearch.ListaObtTransacciones>> lstObt2 = new List<List<WRAPPER_AccountTransactionSearch.ListaObtTransacciones>>();
        lstObt.add(ListaObtTransacciones);
        lstObt2.add(lstObt);
        
        WRAPPER_AccountTransactionSearch.Transactions Transactions = new WRAPPER_AccountTransactionSearch.Transactions();
        Transactions.listaObtTransacciones = lstObt2;    
        Transactions.totalRegistros = 1;
        
        WRAPPER_AccountTransactionSearch.Balances Balances = new WRAPPER_AccountTransactionSearch.Balances();
        Balances.transactions = Transactions;  
        
        WRAPPER_AccountTransactionSearch data = new WRAPPER_AccountTransactionSearch();
        data.balances = Balances; 
        try{
            CNT_TransactionSearchController.formatTransactionsOutputSingleAcc(data, false);
        }catch(Exception e){
            system.debug(e);
        }
        Test.stopTest();
    }
     
        @IsTest
    static void formatTransactionsOutputSingleAccTest2(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());        
        Test.startTest();
        WRAPPER_OneTrade_AccTransactions.ObtTransacBusqueda ObtTransacBusqueda = new WRAPPER_OneTrade_AccTransactions.ObtTransacBusqueda();
        ObtTransacBusqueda.descripcion = 'X';
        ObtTransacBusqueda.importe = 10.00;
        ObtTransacBusqueda.importeString = '10,00';
        
        WRAPPER_OneTrade_AccTransactions.ListaObtTransacciones ListaObtTransacciones = new WRAPPER_OneTrade_AccTransactions.ListaObtTransacciones();
        ListaObtTransacciones.obtTransacBusqueda = ObtTransacBusqueda;    
        List<WRAPPER_OneTrade_AccTransactions.ListaObtTransacciones> lstObt = new List<WRAPPER_OneTrade_AccTransactions.ListaObtTransacciones>();
        
        lstObt.add(ListaObtTransacciones);
        
        WRAPPER_OneTrade_AccTransactions.Transactions Transactions = new WRAPPER_OneTrade_AccTransactions.Transactions();
        Transactions.listaObtTransacciones = lstObt;    
        Transactions.totalRegistros = 1;
        
        WRAPPER_OneTrade_AccTransactions.Balances Balances = new WRAPPER_OneTrade_AccTransactions.Balances();
        Balances.transactions = Transactions;  
        
        WRAPPER_OneTrade_AccTransactions data = new WRAPPER_OneTrade_AccTransactions();
        data.balances = Balances;  
                
        try{
            CNT_TransactionSearchController.formatTransactionsOutputSingleAcc(data, false);
        }catch(Exception e){
            system.debug(e);
        }
        Test.stopTest();
    }
     
    @IsTest
    static void formatTransactionsOutputTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());        
        Test.startTest();
        WRAPPER_TransactionSearch.ObtTransacBusqueda ObtTransacBusqueda = new WRAPPER_TransactionSearch.ObtTransacBusqueda();
        ObtTransacBusqueda.descripcion = 'X';
        ObtTransacBusqueda.importe = 10.00;
        ObtTransacBusqueda.importeString = '10,00';
        
        WRAPPER_TransactionSearch.ObtTransacBusqueda_Z ListaObtTransacciones = new WRAPPER_TransactionSearch.ObtTransacBusqueda_Z();
        ListaObtTransacciones.obtTransacBusqueda = ObtTransacBusqueda;    
        
        List<WRAPPER_TransactionSearch.ObtTransacBusqueda_Z> lstObt = new List<WRAPPER_TransactionSearch.ObtTransacBusqueda_Z>();
        
        lstObt.add(ListaObtTransacciones);
        
        WRAPPER_TransactionSearch.Transactions Transactions = new WRAPPER_TransactionSearch.Transactions();
        Transactions.obtTransacBusqueda = lstObt;    
        Transactions.totalRegistros = 1;
        
        WRAPPER_TransactionSearch.Balances Balances = new WRAPPER_TransactionSearch.Balances();
        Balances.transactions = Transactions;  
        
        WRAPPER_TransactionSearch data = new WRAPPER_TransactionSearch();
        data.balances = Balances;  
        try{
            CNT_TransactionSearchController.formatTransactionsOutput(data, false);
        }catch(Exception e){
            system.debug(e);
        }
        Test.stopTest();
    }
    
    @IsTest
    static void getTransactionsByAccountTest(){
        
        CNT_TransactionSearchController.getTransactionsByAccount(true, 'test', '2020-05-20');
    }
    
    @IsTest
    static void getPaginatedMovementsTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());        
        Test.startTest();
        try{
            CNT_TransactionSearchController.getPaginatedMovements('Test');
        }catch(Exception e){
            system.debug(e);
        }
        Test.stopTest();
    }    
    
    @IsTest
    static void formatDateFromISOStringTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());        
        Test.startTest();
        try{
            CNT_TransactionSearchController.formatDateFromISOString('10/10/2020T','mm/dd/yyyy',false);
        }catch(Exception e){
            system.debug(e);
        }
        Test.stopTest();
    }        
        
    @IsTest
    static void getCurrentUserTimezoneOffSetInMilisecondsTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());        
        Test.startTest();
        List<String> lstData = new List<String>();
        lstData.add('10/10/2020T');
        try{
            CNT_TransactionSearchController.getCurrentUserTimezoneOffSetInMiliseconds(lstData);
        }catch(Exception e){
            system.debug(e);
        }
        Test.stopTest();
    }
    
    @IsTest
    static void downloadTransactionsOneTradeTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());        
        Test.startTest();
        try{
            CNT_TransactionSearchController.downloadTransactionsOneTrade('Test');
        }catch(Exception e){
            system.debug(e);
        }
        Test.stopTest();
    }  
  }