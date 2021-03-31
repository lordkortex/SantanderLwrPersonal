global class WRAPPER_AuthorizationApproval {

	@auraEnabled global Object modifAuthorization {get;set;} 
	@auraEnabled global Object nomObject {get;set;} 

	global WRAPPER_AuthorizationApproval(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'modifAuthorization') {
						modifAuthorization = parser.readValueAs(Object.class);
					} else if (text == 'nomObject') {
						nomObject = parser.readValueAs(Object.class);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_AuthorizationApproval consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
    
    global WRAPPER_AuthorizationApproval(){
        System.debug('WRAPPER_AuthorizationApproval');
    }
	
	
	global static WRAPPER_AuthorizationApproval parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_AuthorizationApproval(parser);
	}
	
	global static void consumeObject(System.JSONParser parser) {
		Integer depth = 0;
		do {
			System.JSONToken curr = parser.getCurrentToken();
			if (curr == System.JSONToken.START_OBJECT || 
				curr == System.JSONToken.START_ARRAY) {
				depth++;
			} else if (curr == System.JSONToken.END_OBJECT ||
				curr == System.JSONToken.END_ARRAY) {
				depth--;
			}
		} while (depth > 0 && parser.nextToken() != null);
	}
	


}