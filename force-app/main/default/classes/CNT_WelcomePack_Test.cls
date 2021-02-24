/*----------------------------------------------------------------------------------
Author:         Diego Asis
Company:        Deloitte
Description:    Test class of CNT_WelcomePack_Controller
History
<Date>			<Author>		<Description>
05/03/2020		Diego Asis    	Initial version
----------------------------------------------------------------------------------*/
@IsTest
public class CNT_WelcomePack_Test {
    
	@IsTest
    static void updateCheckboxWelcomePackTest(){
        
        Test.startTest();
        
        CNT_WelcomePack_Controller.updateCheckboxWelcomePack(true);
        
        Test.stopTest();
    }
}