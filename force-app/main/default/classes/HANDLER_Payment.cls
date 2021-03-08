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

    
    public static ReturnValue upsertPayment(WRAPPER_PAY_PaymentDraft paymentDraft){
        ReturnValue response;
        try{  
            if(paymentDraft != null && String.isNotBlank(paymentDraft.paymentId)){   
       		    Payment__c payment = new Payment__c ();
           	    payment.PAY_TXT_PaymentId__c = paymentDraft.paymentId;
                payment.PAY_TXT_ClientReference__c = String.isNotBlank(paymentDraft.reference) ? paymentDraft.reference : '';       
        	    database.upsert(payment, Payment__c.Fields.PAY_TXT_PaymentId__c);
                response = new ReturnValue (true);
            }
            else{
                response = new ReturnValue (false, 'Payment Id cannot be null');
            }
    	}catch (Exception e) {
            response = new ReturnValue (false,  e.getMessage());
            System.debug('HANDLER_Payment.upsertPayment: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return response;
    }
}