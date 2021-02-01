global class WRAPPER_PaymentSF {
    
	global WRAPPER_PaymentSF(){
        System.debug('WRAPPER_PaymentSF');
    }
    @AuraEnabled
    global String paymentId {get;set;}
    @AuraEnabled
    global String clientReference {get;set;}
}