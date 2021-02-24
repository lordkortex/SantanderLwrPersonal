@isTest
public class HANDLER_Payment_Test {

    @isTest
    public static void upsertPayment_Test(){      
        WRAPPER_PAY_PaymentDraft_Mock paymentWrapper = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft payment = paymentWrapper.bookToBookDraft (false);
        HANDLER_Payment.upsertPayment(payment);        
    }
}