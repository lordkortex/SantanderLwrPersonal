@isTest
public with sharing class WRAPPER_PAY_PaymentDraft_Test {

    @isTest
    static void WRAPPER_PAY_PaymentDraft_Test () {
        WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
        System.debug(paymentDraft);
    }
}