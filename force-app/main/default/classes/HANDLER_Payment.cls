public class HANDLER_Payment {

    @future
    public static void createPayment(String JSONpayment){
        try{
            WRAPPER_PaymentSF paymentSF = (WRAPPER_PaymentSF) JSON.deserialize(JSONpayment, WRAPPER_PaymentSF.class);        
       		Payment__c payment = new Payment__c (
           		PAY_TXT_PaymentId__c = paymentSF.paymentId);
        
        	insert payment;
    	}catch (Exception e) {
            System.debug('HANDLER_Payment.createPayment: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
    }
    
    @future
    public static void updatePayment(String JSONpayment){
        try{
            WRAPPER_PaymentSF paymentSF = (WRAPPER_PaymentSF) JSON.deserialize(JSONpayment, WRAPPER_PaymentSF.class);
      		Payment__c payment = new Payment__c (
            	PAY_TXT_PaymentId__c = paymentSF.PaymentId,
        		PAY_TXT_ClientReference__c = paymentSF.clientReference);
        
        	upsert payment PAY_TXT_PaymentId__c;
    	}catch (Exception e) {
            System.debug('HANDLER_Payment.createPayment: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
    }
}