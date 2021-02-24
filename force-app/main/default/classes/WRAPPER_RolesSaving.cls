/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Wrapper class to handle when roles are getting saved
Test Class:     WRAPPER_RolesSaving_Test
History
<Date>			<Author>		<Description>
28/04/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/

public class WRAPPER_RolesSaving {

    public WRAPPER_RolesSaving(){}

	public class Alias_rol {
		@AuraEnabled public String cod_rol {get;set;} 
		@AuraEnabled public String alias {get;set;} 

        public Alias_rol(String code, String alias){
            this.cod_rol = code;
            this.alias = alias;
        }

		public Alias_rol(JSONParser parser) {
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
	}
	
	@AuraEnabled public String cdemgr {get;set;} 
	@AuraEnabled public List<Alias_rol_list> alias_rol_list {get;set;} 

	public WRAPPER_RolesSaving(JSONParser parser) {
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
	
	public class Alias_rol_list {
		@AuraEnabled public Alias_rol alias_rol {get;set;} 

        public alias_rol_list(String code, String alias)
        {
            this.alias_rol = new WRAPPER_RolesSaving.Alias_rol(code, alias);
        }

		public Alias_rol_list(JSONParser parser) {
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
	}
	
	
	public static WRAPPER_RolesSaving parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_RolesSaving(parser);
	}
	
	public static void consumeObject(System.JSONParser parser) {
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