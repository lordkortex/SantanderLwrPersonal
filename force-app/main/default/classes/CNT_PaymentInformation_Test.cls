@isTest
public class CNT_PaymentInformation_Test {

    @testsetup
    static void setup(){
        DataFactory.createCase();
    }
    
    @isTest
    static void createCase(){    
    	String res = MockResponse.PaymentList();
        WRAPPER_PaymentList paymentList = (WRAPPER_PaymentList) JSON.deserialize(res, WRAPPER_PaymentList.class);
        WRAPPER_PaymentList.WRAPPER_Payment payment = paymentList.paymentsList[0];  
        WRAPPER_PaymentList.WRAPPER_Payment payment2 = paymentList.paymentsList[1];   
        String json1 = JSON.serialize(payment);
        String json2 = JSON.serialize(payment2);
        
        Test.startTest();
        CNT_PaymentInformation.createCase(json1);
        CNT_PaymentInformation.createCase(json2);
        Test.stopTest();
	}
}