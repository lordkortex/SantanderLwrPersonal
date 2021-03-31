/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Wrapper class to handle when roles are getting saved
Test Class:     WRAPPER_RolesSaving_Test
History
<Date>			<Author>		<Description>
28/04/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/

global class WRAPPER_RolesSaving {

    global WRAPPER_RolesSaving(){
        System.debug('WRAPPER_RolesSaving');
    }

	global class Alias_rol {
		@AuraEnabled global String cod_rol {get;set;} 
		@AuraEnabled global String alias {get;set;} 

        global Alias_rol(String code, String alias){
            this.cod_rol = code;
            this.alias = alias;
        }

		global Alias_rol(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'cod_rol') {
							cod_rol = parser.getText();
						} else if (text == 'alias') {
							alias = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Alias_rol consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global Alias_rol(){
            System.debug('WRAPPER_RolesSaving.Alias_rol');
        }
	}
	
	@AuraEnabled global String cdemgr {get;set;} 
	@AuraEnabled global List<Alias_rol_list> alias_rol_list {get;set;} 

	global WRAPPER_RolesSaving(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'cdemgr') {
						cdemgr = parser.getText();
					} else if (text == 'alias_rol_list') {
						alias_rol_list = arrayOfAlias_rol_list(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_RolesSaving consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	global class Alias_rol_list {
		@AuraEnabled global Alias_rol alias_rol {get;set;} 

        global alias_rol_list(String code, String alias)
        {
            this.alias_rol = new WRAPPER_RolesSaving.Alias_rol(code, alias);
        }

		global Alias_rol_list(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'alias_rol') {
							alias_rol = new Alias_rol(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Alias_rol_list consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global Alias_rol_list(){
            System.debug('WRAPPER_RolesSaving.Alias_rol_list');
        }
	}
	
	
	global static WRAPPER_RolesSaving parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_RolesSaving(parser);
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
	



    private static List<Alias_rol_list> arrayOfAlias_rol_list(System.JSONParser p) {
        List<Alias_rol_list> res = new List<Alias_rol_list>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Alias_rol_list(p));
        }
        return res;
    }



}