@isTest 
global class HANDLER_CustomNotification_Test {

    @testSetup
    static void setup(){
        DataFactory.createPayment();
        DataFactory.createSignatureStructure();
        DataFactory.createCustomTexts();
    }
    
    @isTest
    global static void sendNotification(){
        HANDLER_CustomNotification.sendNotification('Payment', 'paymentId', 'Pending');
        HANDLER_CustomNotification.sendNotification('Payment', 'paymentId', 'Reject');
        HANDLER_CustomNotification.sendNotification('Payment', 'paymentId', 'Review');
        HANDLER_CustomNotification.sendNotification('Payment', 'paymentId', 'Completed');  
    }
}