@isTest 
global class HANDLER_CustomNotification_Test {

    @testSetup
    static void setup(){
        DataFactory.createPayment();
        DataFactory.createSignatureStructure();
    }
    
    @isTest
    global static void sendPaymentNotification_Test(){
        HANDLER_CustomNotification.sendPaymentNotification('paymentId', 'Pending');
        HANDLER_CustomNotification.sendPaymentNotification('paymentId', 'Reject');
        HANDLER_CustomNotification.sendPaymentNotification('paymentId', 'Review');
        HANDLER_CustomNotification.sendPaymentNotification('paymentId', 'Completed');  
    }
}