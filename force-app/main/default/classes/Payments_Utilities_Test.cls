/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
18/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class Payments_Utilities_Test {
	@testSetup  
    static void setup(){
        Test.startTest();
        system.debug(getPaymentStatusRowByStatusTest());
        system.debug(getPaymentStatusRowByStatusTestError());
        system.debug(getPaymentStatusRowByReasonTest());
		system.debug(getPaymentStatusRowByReasonTestError());
        Test.stopTest();
    }
    
    @isTest
    static Payment_Status__mdt getPaymentStatusRowByStatusTest(){
        return Payments_Utilities.getPaymentStatusRowByStatus('Completed');
    }
        @isTest
    static Payment_Status__mdt getPaymentStatusRowByStatusTestError(){
        return Payments_Utilities.getPaymentStatusRowByStatus('Test');
    }
        @isTest
    static List<Payment_Status__mdt> getPaymentStatusRowByReasonTest(){
        return Payments_Utilities.getPaymentStatusRowByReason('Completed last 7 days');
    }
	@isTest
    static List<Payment_Status__mdt> getPaymentStatusRowByReasonTestError(){
        return Payments_Utilities.getPaymentStatusRowByReason('Test');
    }

}