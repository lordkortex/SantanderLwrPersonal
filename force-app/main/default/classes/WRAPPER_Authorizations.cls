/*----------------------------------------------------------------------------------
Author:         Amaia Laconcepción
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the Authorizations data table
Test Class:     WRAPPER_Authorizations_Test
History
<Date>			<Author>		    <Description>
01/06/2020		Amaia Laconcepción     Initial version
----------------------------------------------------------------------------------*/
global with sharing class WRAPPER_Authorizations {

	@auraEnabled global Pending_authorizations pending_authorizations {get;set;} 
	@auraEnabled global Pending_authorizations requested_authorizations {get;set;} 

	global WRAPPER_Authorizations(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'pending_authorizations') {
						pending_authorizations = new Pending_authorizations(parser);
					} else if (text == 'requested_authorizations') {
						requested_authorizations = new Pending_authorizations(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_Authorizations consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
    
    global WRAPPER_Authorizations(){
        System.debug('WRAPPER_Authorizations');
    }
	
	global class ListaAutorizaciones {
		@AuraEnabled global Autorizacion autorizacion {get;set;} 
        
        global ListaAutorizaciones(){
            System.debug('WRAPPER_Authorizations.ListaAutorizaciones');
        }

		global ListaAutorizaciones(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'autorizacion') {
							autorizacion = new Autorizacion(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaAutorizaciones consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	global class Autorizacion {
		@AuraEnabled global Integer idauth {get;set;} 
		@AuraEnabled global String fecPett {get;set;} 
		@AuraEnabled global String usuLogi {get;set;} 
		@AuraEnabled global String uidAlta {get;set;} 
		@AuraEnabled global String uidMod {get;set;} 
		@AuraEnabled global String ctipob {get;set;} 
		@AuraEnabled global String moddec1 {get;set;} 
		@AuraEnabled global String accio {get;set;} 
		@AuraEnabled global String estapeti {get;set;} 
		@AuraEnabled global String fapro {get;set;} 
		@AuraEnabled global String comenta5 {get;set;} 
		@AuraEnabled global String apellids {get;set;} 
		@AuraEnabled global String nombusua {get;set;} 
		@AuraEnabled global String nomelemt {get;set;} 
		@AuraEnabled global Object indDuplicado {get;set;}
        
        global Autorizacion(){
            System.debug('WRAPPER_Authorizations.Autorizacion');
        }

		global Autorizacion(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'idauth') {
							idauth = parser.getIntegerValue();
						} else if (text == 'fecPett') {
							fecPett = parser.getText();
						} else if (text == 'usuLogi') {
							usuLogi = parser.getText();
						} else if (text == 'uidAlta') {
							uidAlta = parser.getText();
						} else if (text == 'uidMod') {
							uidMod = parser.getText();
						} else if (text == 'ctipob') {
							ctipob = parser.getText();
						} else if (text == 'moddec1') {
							moddec1 = parser.getText();
						} else if (text == 'accio') {
							accio = parser.getText();
						} else if (text == 'estapeti') {
							estapeti = parser.getText();
						} else if (text == 'fapro') {
							fapro = parser.getText();
						} else if (text == 'comenta5') {
							comenta5 = parser.getText();
						} else if (text == 'apellids') {
							apellids = parser.getText();
						} else if (text == 'nombusua') {
							nombusua = parser.getText();
						} else if (text == 'nomelemt') {
							nomelemt = parser.getText();
						} else if (text == 'indDuplicado') {
							indDuplicado = parser.readValueAs(Object.class);
						} else {
							System.debug(LoggingLevel.WARN, 'Autorizacion consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	global class Pending_authorizations {
		@AuraEnabled global List<ListaAutorizaciones> listaAutorizaciones {get;set;} 
		@AuraEnabled global String HAY_MAS_DATOS {get;set;} 
		@AuraEnabled global Integer NUM_PAGINA {get;set;} 
		@AuraEnabled global Integer totalRegistros {get;set;} 
		@AuraEnabled global Integer totalPaginas {get;set;} 
        
        global Pending_authorizations(){
            System.debug('WRAPPER_Authorizations.Pending_authorizations');
        }

		global Pending_authorizations(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'listaAutorizaciones') {
							listaAutorizaciones = arrayOfListaAutorizaciones(parser);
						} else if (text == 'HAY_MAS_DATOS') {
							HAY_MAS_DATOS = parser.getText();
						} else if (text == 'NUM_PAGINA') {
							NUM_PAGINA = parser.getIntegerValue();
						} else if (text == 'totalRegistros') {
							totalRegistros = parser.getIntegerValue();
						} else if (text == 'totalPaginas') {
							totalPaginas = parser.getIntegerValue();
						} else {
							System.debug(LoggingLevel.WARN, 'Pending_authorizations consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	
	global static WRAPPER_Authorizations parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_Authorizations(parser);
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
	

    private static List<ListaAutorizaciones> arrayOfListaAutorizaciones(System.JSONParser p) {
        List<ListaAutorizaciones> res = new List<ListaAutorizaciones>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaAutorizaciones(p));
        }
        return res;
    }








}