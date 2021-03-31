/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the groups data
Test Class:     WRAPPER_GroupAdmin_Test
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
global with sharing class WRAPPER_GroupAdmin {

	global class Administration {
		@AuraEnabled global List<GrupoUsuarios> grupoUsuarios {get;set;} 
		@AuraEnabled global Reposicionamiento reposicionamiento {get;set;} 

		global Administration(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'grupoUsuarios') {
							grupoUsuarios = arrayOfGrupoUsuarios(parser);
						} else if (text == 'reposicionamiento') {
							reposicionamiento = new Reposicionamiento(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Administration consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global Administration(){
            System.debug('WRAPPER_GroupAdmin.Administration');
        }
	}
	
	global class GrupoUsuarios {
		@AuraEnabled global DatosGrupos datosGrupos {get;set;} 

		global GrupoUsuarios(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'datosGrupos') {
							datosGrupos = new DatosGrupos(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'GrupoUsuarios consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global GrupoUsuarios(){
            System.debug('WRAPPER_GroupAdmin.GrupoUsuarios');
        }
	}
	
	global class Reposicionamiento {
		@AuraEnabled global String indPaginacion {get;set;} 
		@AuraEnabled global String memento {get;set;} 

		global Reposicionamiento(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'indPaginacion') {
							indPaginacion = parser.getText();
						} else if (text == 'memento') {
							memento = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Reposicionamiento consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global Reposicionamiento(){
            System.debug('WRAPPER_GroupAdmin.Reposicionamiento');
        }
	}
	
	@AuraEnabled global List<Administration> administration {get;set;} 

	global WRAPPER_GroupAdmin(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'administration') {
						administration = arrayOfAdministration(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_GroupAdmin consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
    
    global WRAPPER_GroupAdmin(){
        System.debug('WRAPPER_GroupAdmin');
    }
	
	global class DatosGrupos {
		@AuraEnabled global Integer codgrupr {get;set;} 
		@AuraEnabled global Integer idauth {get;set;} 
		@AuraEnabled global String nomgruus {get;set;} 
		@AuraEnabled global String accion {get;set;} 

		global DatosGrupos(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codgrupr') {
							codgrupr = parser.getIntegerValue();
						} else if (text == 'idauth') {
							idauth = parser.getIntegerValue();
						} else if (text == 'nomgruus') {
							nomgruus = parser.getText();
						} else if (text == 'accion') {
							accion = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'DatosGrupos consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global DatosGrupos(){
            System.debug('WRAPPER_GroupAdmin.DatosGrupos');
        }
	}
	
	
	global static WRAPPER_GroupAdmin parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_GroupAdmin(parser);
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
	

    private static List<Administration> arrayOfAdministration(System.JSONParser p) {
        List<Administration> res = new List<Administration>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Administration(p));
        }
        return res;
    }





    private static List<GrupoUsuarios> arrayOfGrupoUsuarios(System.JSONParser p) {
        List<GrupoUsuarios> res = new List<GrupoUsuarios>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new GrupoUsuarios(p));
        }
        return res;
    }





}