/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
18/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_PaymentInformationButton_Test {
	
    @testSetup  
    static void setObjects(){
        Test.startTest();
        system.debug(getCaseDataTest());
        system.debug(getCaseDataTestError());
        system.debug(getPaymentDetailTest());

        Test.stopTest();
    }
   
    @isTest
    static ReturnValue getCaseDataTest(){
        Case c = new Case(suppliedName = 'Test',
                          CASE_affected_functionality__c = 'Others'); 
        insert c;
        return CNT_PaymentInformationButton.getCaseData(c.Id);
    }
    
    @isTest
    static ReturnValue getCaseDataTestError(){
        return CNT_PaymentInformationButton.getCaseData('Test2');
	}
    
    @isTest
    public static ReturnValue getPaymentDetailTest(){
        Payment__c payment = new Payment__c(Name = 'Test'); 
        insert payment;
 		return CNT_PaymentInformationButton.getPaymentDetail(payment.ID);
    }
}