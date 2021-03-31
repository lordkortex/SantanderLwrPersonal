/*----------------------------------------------------------------------------------
Author:         Diego Asis 
Company:        Deloitte
Description:    Test class of CNT_DownloadBalanceMovementsController
History
<Date>			<Author>		  <Description>
21/01/2020		Diego Asis        Initial version
----------------------------------------------------------------------------------*/

@isTest
public class CNT_DownloadBalanceMovements_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void retrieveInitialDataTest(){      
        CNT_DownloadBalanceMovementsController.retrieveInitialData('');
    }
    
    @isTest
    static void getTransactionsTest(){
        
        List<String> accountCodeList = new List<String>{'6890'};
        CNT_DownloadBalanceMovementsController.getTransactions('betweenDates', accountCodeList, '2020-01-06T00:00:00.000Z', '2020-06-07T23:59:59.999Z');
        CNT_DownloadBalanceMovementsController.getTransactions('lastStatement', accountCodeList, '2020-01-06T00:00:00.000Z', '2020-06-07T23:59:59.999Z');
    }
    
    @isTest
    static void getExtractsTest(){
        
        List<String> accountCodeList = new List<String>{'6890'};
        CNT_DownloadBalanceMovementsController.getExtracts('betweenDates', accountCodeList, '2020-01-06T00:00:00.000Z', '2020-06-07T23:59:59.999Z', 'N');
        CNT_DownloadBalanceMovementsController.getExtracts('lastStatement', accountCodeList, '2020-01-06T00:00:00.000Z', '2020-06-07T23:59:59.999Z', 'N');
    }
    
    @isTest
    static void getBalancesTest(){
        
        List<String> accountCodeList = new List<String>{'6890'};
        CNT_DownloadBalanceMovementsController.getBalances('betweenDates', accountCodeList, '2020-01-06T00:00:00.000Z', '2020-06-07T23:59:59.999Z', 'PDF');
        CNT_DownloadBalanceMovementsController.getBalances('lastStatement', accountCodeList, '2020-01-06T00:00:00.000Z', '2020-06-07T23:59:59.999Z', 'PDF');
    }
    
    @isTest
    static void removeFileTest(){
        
        CNT_DownloadBalanceMovementsController.removeFile('');
    }
    
    @isTest
    static void  downloadFich_Test(){       
        CNT_DownloadBalanceMovementsController.downloadFich('fileDate', null, 'dateFrom', 'dateTo', 'extractType');
    }
}