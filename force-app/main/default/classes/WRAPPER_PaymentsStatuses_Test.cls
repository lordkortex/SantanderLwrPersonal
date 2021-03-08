/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
24/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/

@isTest
public class WRAPPER_PaymentsStatuses_Test {
    
    @testSetup  
    static void setup(){
        Test.startTest();
		main();
        Test.stopTest();
    }
   
    @isTest
    static void main(){
        WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus WRAPPER_PaymentsStatus = new WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus();
	}
}