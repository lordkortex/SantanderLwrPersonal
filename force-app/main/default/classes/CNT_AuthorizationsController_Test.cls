/*----------------------------------------------------------------------------------
Author:         Diego Asis 
Company:        Deloitte
Description:    Test class of CNT_AuthorizationsController
History
<Date>			<Author>		  <Description>
21/01/2020		Diego Asis        Initial version
----------------------------------------------------------------------------------*/

@isTest
public class CNT_AuthorizationsController_Test {

    @IsTest
    static void getAuthorizationsTest(){
        
    	CNT_AuthorizationsController.CNT_AuthorizationsDataWrapper listaWrapper = CNT_AuthorizationsController.getAuthorizations();
    }
    
    @IsTest
    static void generateMockDataTest(){
        
        CNT_AuthorizationsController.CNT_AuthorizationsDataWrapper listaWrapper = CNT_AuthorizationsController.generateMockData();
    }
}