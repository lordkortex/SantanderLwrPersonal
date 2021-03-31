global class Wrapper_Downloads {

	global String content {get;set;} 
	global String filename {get;set;} 

	global Wrapper_Downloads(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'content') {
						content = parser.getText();
					} else if (text == 'filename') {
						filename = parser.getText();
					} else {
						System.debug(LoggingLevel.WARN, 'Wrapper_Downloads consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
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
	
	global static Wrapper_Downloads parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new Wrapper_Downloads(parser);
	}
}