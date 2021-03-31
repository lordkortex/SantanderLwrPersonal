@RestResource(urlMapping='/OTPValidationServiceOTV/*')
global with sharing class WS_OTPValidationServiceOTV {
  @HttpPost
  global static string validateOTP(
    String jti,
    String iat,
    String status,
    String statusDetail,
    String scaUid,
    String configUid
  ) {
    try {
      string returnMessage;
      //Publish the platform event
      OTPValidationOTV__e validationEvent = new OTPValidationOTV__e(
        status__c = status,
        scaUid__c = scaUid,
        statusDetail__c = statusDetail
      );
      System.debug(validationEvent);
      // Call method to publish events
      Database.SaveResult sr = EventBus.publish(validationEvent);

      // Inspect publishing result for each event
      if (sr.isSuccess()) {
        System.debug('Successfully published event.');
        returnMessage = 'Successfully published event.';
      } else {
        for (Database.Error err : sr.getErrors()) {
          System.debug(
            'Error returned: ' +
            err.getStatusCode() +
            ' - ' +
            err.getMessage()
          );
          returnMessage =
            'The following exception has occurred: ' + err.getMessage();
        }
      }
      return returnMessage;
    } catch (Exception e) {
      System.debug(
        'OTPValidationService: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      throw new CalloutException(
        'The following exception has occurred: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
}
