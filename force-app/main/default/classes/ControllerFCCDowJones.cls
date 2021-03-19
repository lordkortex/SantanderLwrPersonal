public class ControllerFCCDowJones {
  public static final String PRODUCT_ID_001 = System.Label.CNF_payment_productId_001; // book_to_book
  public static final String PRODUCT_ID_002 = System.Label.CNF_payment_productId_002; // international_instant_payment
  public static final String PRODUCT_ID_003 = System.Label.CNF_payment_productId_003; // Do_and_follow

  /*
    Author:         Candido
    Company:        Deloitte
    Description:    Check Dow Jones API description, update status and create compliance case
    History:
    <Date>          <Author>        <Description>
    08/11/2020      Candido         Initial version
    01/02/2021      Candido         Refactor with WRAPPER_PAY_PaymentDraft
    */
  public static ReturnValue checkFCCDowJonesAndUpdateStatus(
    WRAPPER_PAY_PaymentDraft paymentDraft
  ) {
    ReturnValue response = null;
    try {
      Boolean passValidation = null;
      Map<String, Object> value = new Map<String, Object>();
      if (paymentDraft.productId == PRODUCT_ID_001) {
        String resultUpdate = null;
        if (String.isNotBlank(paymentDraft.description)) {
          passValidation = ServiceFCCDowJones.validateDescription(
            paymentDraft.paymentId,
            paymentDraft.description
          );
        } else {
          passValidation = true;
        }
        if (passValidation == null) {
          throw new CustomException('Error validating the server response.');
        } else {
          if (passValidation == false) {
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(
              paymentDraft.paymentId
            );
            resultUpdate = wsObject.updateStatus('999', '004');
            HANDLER_Case.createComplianceCase(
              paymentDraft.paymentId,
              paymentDraft.description,
              paymentDraft.sourceAccount,
              paymentDraft.destinationAccount
            );
          }
        }
        value.put('passValidation', passValidation);
        value.put('resultUpdate', resultUpdate);
      } else {
        value.put('passValidation', true);
      }
      response = new ReturnValue(true, value);
    } catch (Exception e) {
      System.debug(
        'ControllerFCCDowJones.checkFCCDowJonesAndUpdateStatus: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
    }
    return response;
  }
}
