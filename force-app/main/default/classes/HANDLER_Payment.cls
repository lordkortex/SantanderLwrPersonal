public class HANDLER_Payment {

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