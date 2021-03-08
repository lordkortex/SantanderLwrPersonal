@RestResource(urlMapping='/OTPValidationService/*')
global with sharing class WS_OTPValidationService {
    

    @HttpPost
    global static string validateOTP(String jti, String iat, String status, String scaUid, String configurationUid) {
        system.debug('Entra');
        try{
		 	string returnMessage;
            //Publish the platform event  
            system.debug('configUid');
            system.debug(configurationUid);
            if(configurationUid == '4a5be88c-7123-466a-a99d-99da232f27a6'){
                //configUid para proceso de activación One Trade View
                OTPValidationOTV__e validationEvent = new OTPValidationOTV__e(status__c = status, scaUid__c = scaUid);
            	System.debug(validationEvent);
            	// Call method to publish events
            	Database.SaveResult sr = EventBus.publish(validationEvent);
                // Inspect publishing result for each event
                if (sr.isSuccess()) {
                    System.debug('Successfully published event. OTV CERT');
                    returnMessage='Successfully published event. OTV CERT';
                } else {
                    for(Database.Error err : sr.getErrors()) {
                        System.debug('Error returned: ' +
                                     err.getStatusCode() +
                                     ' - ' +
                                     err.getMessage());
                        returnMessage='The following exception has occurred: ' + err.getMessage();
                    }
                }
            }else{
                //configUid para pagos
                OTPValidation__e validationEvent = new OTPValidation__e(status__c = status, scaUid__c = scaUid);
            	System.debug(validationEvent);
            	// Call method to publish events
            	Database.SaveResult sr = EventBus.publish(validationEvent);
                // Inspect publishing result for each event
                if (sr.isSuccess()) {
                    System.debug('Successfully published event.');
                    returnMessage='Successfully published event.';
                } else {
                    for(Database.Error err : sr.getErrors()) {
                        System.debug('Error returned: ' +
                                     err.getStatusCode() +
                                     ' - ' +
                                     err.getMessage());
                        returnMessage='The following exception has occurred: ' + err.getMessage();
                    }
                }
            }
            return returnMessage;
        } catch (Exception e) {
            System.debug('OTPValidationService: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CalloutException('The following exception has occurred: ' + e.getMessage()+', in line: ' + e.getLineNumber()); 
        }
    }
}