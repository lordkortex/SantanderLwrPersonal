/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the users data table
Test Class:     WRAPPER_Users_Test
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
global with sharing class WRAPPER_Users {
    @AuraEnabled global String groupName {get;set;} 
	@AuraEnabled global String role {get;set;} 
	@AuraEnabled global String state {get;set;} 
	@AuraEnabled global String type_Z {get;set;}
	@AuraEnabled global String userId {get;set;} 
	@AuraEnabled global String userName {get;set;} 
	@AuraEnabled global String userSurname {get;set;} 

	global WRAPPER_Users(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'groupName') {
						groupName = parser.getText();
					} else if (text == 'role') {
						role = parser.getText();
					} else if (text == 'state') {
						state = parser.getText();
					} else if (text == 'userType') {
						type_Z = parser.getText();
					} else if (text == 'userId') {
						userId = parser.getText();
					} else if (text == 'userName') {
						userName = parser.getText();
					} else if (text == 'userSurname') {
						userSurname = parser.getText();
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_Users consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
    
    global WRAPPER_Users(){
        System.debug('WRAPPER_Users');
    }
	
	
	global static List<WRAPPER_Users> parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return arrayOfJSON2Apex(parser);
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
	


    private static List<WRAPPER_Users> arrayOfJSON2Apex(System.JSONParser p) {
        List<WRAPPER_Users> res = new List<WRAPPER_Users>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new WRAPPER_Users(p));
        }
        return res;
    }
}