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
        
    	WRAPPER_Authorizations listaWrapper = CNT_AuthorizationsController.getAuthorizations('Testing');
    }
    
    @IsTest
    static void sendAuthorizationApproval_Test(){
        
        CNT_AuthorizationsController.sendAuthorizationApproval('Testing');
    }
    
        @IsTest
    static void sendDelete_Test(){
        
        CNT_AuthorizationsController.sendDelete('Testing');
    }
}