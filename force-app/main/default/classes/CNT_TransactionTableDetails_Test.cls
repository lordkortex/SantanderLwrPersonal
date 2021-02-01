/*----------------------------------------------------------------------------------
Author:         Diego Asis 
Company:        Deloitte
Description:    Test class of CNT_TransactionTableDetailsController
History
<Date>			<Author>		  <Description>
21/01/2020		Diego Asis        Initial version
----------------------------------------------------------------------------------*/

@isTest
public class CNT_TransactionTableDetails_Test {
	
    @IsTest
    static void getDataTest(){
        
        List<CNT_TransactionTableDetailsController.CNT_TransactionTableDetailsControllerDataWrapper> listaWrapper = CNT_TransactionTableDetailsController.getDataTransactions();   
    }
    
    @IsTest
    static void generateFalseDataTest(){
        
        List<CNT_TransactionTableDetailsController.CNT_TransactionTableDetailsControllerDataWrapper> listaWrapper = CNT_TransactionTableDetailsController.generateData();
    }
}