public class ControllerFCCDowJones {

    public static ReturnValue checkFCCDowJonesAndUpdateStatus (String paymentId, String description, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData) {
        ReturnValue response = null;
        try {
            Boolean passValidation = null;
            if (String.isNotBlank(description)) {
                passValidation = ServiceFCCDowJones.validateDescription(paymentId, description);
            } else {
                passValidation = true;
            }
            String resultUpdate = null;
            if (passValidation == null) {
                throw new CustomException('Error validating the server response.');
            } else {
                if (passValidation == false) {
                    WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
                    resultUpdate = wsObject.updateStatus('999', '004');
                    HANDLER_Case.createComplianceCase(PaymentId, description, sourceAccountData, recipientAccountData);
                }
            }
            Map<String, Object> value = new Map<String, Object>();
            value.put('passValidation', passValidation);
            value.put('resultUpdate', resultUpdate);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('ControllerFCCDowJones.checkFCCDowJonesAndUpdateStatus: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}