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

    @IsTest
    static void getAuthorizationsTest(){
        
      	CNT_DownloadBalanceMovementsController.CNT_DownloadBalanceMovementsWrapper listaWrapper = CNT_DownloadBalanceMovementsController.getBalanceMovementsData();
    }
    
    @IsTest
    static void generateMockDataTest(){
        
        CNT_DownloadBalanceMovementsController.CNT_DownloadBalanceMovementsWrapper listaWrapper = CNT_DownloadBalanceMovementsController.generateMockData();
    }
}