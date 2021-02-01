global class WRAPPER_OperationsByStatus {

	global List<StatusList> statusList {get;set;} 

	global WRAPPER_OperationsByStatus(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'statusList') {
						statusList = arrayOfStatusList(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_OperationsByStatus consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	global class StatusList {
		global String status {get;set;} 
		global Boolean pendingAuthorization {get;set;} 
		global Integer countOperation {get;set;} 
        
        global StatusList(){
            System.debug('WRAPPER_OperationByStatus.StatusList');
        }

		global StatusList(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'status') {
							status = parser.getText();
						} else if (text == 'pendingAuthorization') {
							pendingAuthorization = parser.getBooleanValue();
						} else if (text == 'countOperation') {
							countOperation = parser.getIntegerValue();
						} else {
							System.debug(LoggingLevel.WARN, 'StatusList consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	
	global static WRAPPER_OperationsByStatus parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_OperationsByStatus(parser);
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
	

    private static List<StatusList> arrayOfStatusList(System.JSONParser p) {
        List<StatusList> res = new List<StatusList>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new StatusList(p));
        }
        return res;
    }








}