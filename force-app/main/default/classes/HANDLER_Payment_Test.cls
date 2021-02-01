@isTest
public class HANDLER_Payment_Test {

    @isTest
    public static void methods_Test(){
        String res = MockResponse.WRAPPER_PaymentSF();
        HANDLER_Payment.createPayment(res);
        HANDLER_Payment.updatePayment(res);
    }
}