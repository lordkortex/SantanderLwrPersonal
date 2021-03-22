public class ControllerPaymentLine {
    
    
    public static ReturnValue getPaymentLine (WRAPPER_PAY_PaymentDraft paymentDraft, String transferType) {
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try {
            value = ServicePaymentLine.getPaymentLine(transferType, paymentDraft);
            response = new ReturnValue(true, value); 
        } catch (Exception e) {
            System.debug('ControllerPaymentLine.getPaymentLine: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}