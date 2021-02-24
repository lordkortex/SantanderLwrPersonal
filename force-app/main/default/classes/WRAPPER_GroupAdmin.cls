/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the groups data
Test Class:     WRAPPER_GroupAdmin_Test
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public with sharing class WRAPPER_GroupAdmin {

	public class Administration {
		@AuraEnabled public List<GrupoUsuarios> grupoUsuarios {get;set;} 
		@AuraEnabled public Reposicionamiento reposicionamiento {get;set;} 

		public Administration(JSONParser parser) {
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
	}
	
	public class GrupoUsuarios {
		@AuraEnabled public DatosGrupos datosGrupos {get;set;} 

		public GrupoUsuarios(JSONParser parser) {
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
	}
	
	public class Reposicionamiento {
		@AuraEnabled public String indPaginacion {get;set;} 
		@AuraEnabled public String memento {get;set;} 

		public Reposicionamiento(JSONParser parser) {
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
	}
	
	@AuraEnabled public List<Administration> administration {get;set;} 

	public WRAPPER_GroupAdmin(JSONParser parser) {
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
	
	public class DatosGrupos {
		@AuraEnabled public Integer codgrupr {get;set;} 
		@AuraEnabled public Integer idauth {get;set;} 
		@AuraEnabled public String nomgruus {get;set;} 
		@AuraEnabled public String accion {get;set;} 

		public DatosGrupos(JSONParser parser) {
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
	}
	
	
	public static WRAPPER_GroupAdmin parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_GroupAdmin(parser);
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