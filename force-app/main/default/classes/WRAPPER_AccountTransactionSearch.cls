global with sharing class WRAPPER_AccountTransactionSearch {
    global class Transactions {
		@AuraEnabled global Decimal openingBalance {get;set;}
		@AuraEnabled global Decimal closeringBalance {get;set;}
		@AuraEnabled global Integer numberDebits {get;set;}
		@AuraEnabled global Integer numberCredits {get;set;}
		@AuraEnabled global Decimal totalDebits {get;set;}
		@AuraEnabled global Decimal totalCredits {get;set;}
		@AuraEnabled global Integer totalRegistros {get;set;}

		
		@AuraEnabled global String openingBalance_Formatted {get;set;}
		@AuraEnabled global String openingBalanceDecimals_Formatted {get;set;}

		@AuraEnabled global String closeringBalance_Formatted {get;set;}
		@AuraEnabled global String closeringBalanceDecimals_Formatted {get;set;}

		@AuraEnabled global String totalDebits_Formatted {get;set;}
		@AuraEnabled global String totalCredits_Formatted {get;set;}

		@AuraEnabled global List<List<ListaObtTransacciones>> listaObtTransacciones {get;set;} 

		global Transactions(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'listaObtTransacciones') {
							listaObtTransacciones = arrayOfListListaObtTransacciones(parser);
						}else if (text == 'openingBalance') {
							openingBalance = parser.getDecimalValue();
						} else if (text == 'closeringBalance') {
							closeringBalance = parser.getDecimalValue();
						} else if (text == 'numberDebits') {
							numberDebits = parser.getIntegerValue();
						} else if (text == 'numberCredits') {
							numberCredits = parser.getIntegerValue();
						} else if (text == 'totalDebits') {
							totalDebits =parser.getDecimalValue();
						} else if (text == 'totalCredits') {
							totalCredits = parser.getDecimalValue();
						} else if (text == 'totalRegistros') {
							totalRegistros = parser.getIntegerValue();
						} else {
							System.debug(LoggingLevel.WARN, 'Transactions consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global Transactions(){
            System.debug('WRAPPER_AccountTransactionSearch.Transactions');
        }
	}
	
	@AuraEnabled global Balances balances {get;set;} 

	global WRAPPER_AccountTransactionSearch(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'balances') {
						balances = new Balances(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_AccountTransactionSearch consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
    
    global WRAPPER_AccountTransactionSearch(){
        System.debug('WRAPPER_AccountTransactionSearch');
    }
	
	global class CodigoBIC {
		@AuraEnabled global String branch {get;set;} 
		@AuraEnabled global String entidadbic {get;set;} 
		@AuraEnabled global String locatorbic {get;set;} 
		@AuraEnabled global String paisbic {get;set;} 
		@AuraEnabled global String BRANCH_BIC {get;set;} 
		@AuraEnabled global String ENTIDAD_BIC {get;set;} 
		@AuraEnabled global String LOCATOR_BIC {get;set;} 
		@AuraEnabled global String PAIS_BIC {get;set;} 

		global CodigoBIC(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'branch') {
							branch = parser.getText();
						} else if (text == 'entidadbic') {
							entidadbic = parser.getText();
						} else if (text == 'locatorbic') {
							locatorbic = parser.getText();
						} else if (text == 'paisbic') {
							paisbic = parser.getText();
						} else if (text == 'BRANCH') {
							BRANCH_BIC = parser.getText();
						} else if (text == 'ENTIDAD_BIC') {
							ENTIDAD_BIC = parser.getText();
						} else if (text == 'LOCATOR_BIC') {
							LOCATOR_BIC = parser.getText();
						} else if (text == 'PAIS_BIC') {
							PAIS_BIC = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'CodigoBIC consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global CodigoBIC(){
            System.debug('WRAPPER_AccountTransactionSearch.CodigoBIC');
        }
	}
	
	global class Balances {
		@AuraEnabled global Transactions transactions {get;set;} 

		global Balances(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'transactions') {
							transactions = new Transactions(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Balances consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global Balances(){
            System.debug('WRAPPER_AccountTransactionSearch.Balances');
        }
	}
	
	global class ObtTransacBusqueda {
		@AuraEnabled global String aliasCuentaPerfilado {get;set;} 
		@AuraEnabled global String aliasEntidad {get;set;} 
		@AuraEnabled global String bookDate {get;set;} 
        @AuraEnabled global String formattedBookDate {get;set;}
		@AuraEnabled global Integer codCuenta {get;set;} 
		@AuraEnabled global CodigoBIC codigoBIC {get;set;} 
		@AuraEnabled global String cuentaExtracto {get;set;} 
		@AuraEnabled global String descripcion {get;set;} 
		@AuraEnabled global Double importe {get;set;} 
		@AuraEnabled global String importeString {get;set;}
		@AuraEnabled global String importeEntero {get;set;}
		@AuraEnabled global String importeDecimal {get;set;} 
		@AuraEnabled global String moneda {get;set;} 
		@AuraEnabled global String nombreEntidad {get;set;} 
		@AuraEnabled global String refBanco {get;set;} 
		@AuraEnabled global String refCliente {get;set;} 
		@AuraEnabled global String tipoTransaccion {get;set;} 
		@AuraEnabled global String valueDate {get;set;} 
		@AuraEnabled global String formattedValueDate {get;set;}
		@AuraEnabled global String ltcCode {get;set;}
		@AuraEnabled global String ltcDescription {get;set;}
		@AuraEnabled global String transactionBatchReference {get;set;}

		//AM - 11/11/2020 - US6421: Campos Nuevos Nexus
		@AuraEnabled global String aditionalInformation;
		@AuraEnabled global String customerAditionalInformation;
		
		//AM - 11/11/2020 - US7687: Campos MT940
		/*
		@AuraEnabled global String customerTCode; //Local Code
		@AuraEnabled global String customerTDescription;
		@AuraEnabled global String transactionConsolidated;
		*/
        
		//Importe formatted
		@AuraEnabled global CNT_FormattedNumber importeFormatted;

		global ObtTransacBusqueda(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'aliasCuentaPerfilado') {
							aliasCuentaPerfilado = parser.getText();
						} else if (text == 'aliasEntidad') {
							aliasEntidad = parser.getText();
						} else if (text == 'bookDate') {
							bookDate = parser.getText();
						} else if (text == 'codCuenta') {
							codCuenta = parser.getIntegerValue();
						} else if (text == 'codigoBIC') {
							codigoBIC = new CodigoBIC(parser);
						} else if (text == 'cuentaExtracto') {
							cuentaExtracto = parser.getText();
						} else if (text == 'descripcion') {
							descripcion = parser.getText();
						} else if (text == 'importe') {
							importe = parser.getDoubleValue();
						} else if (text == 'moneda') {
							moneda = parser.getText();
						} else if (text == 'nombreEntidad') {
							nombreEntidad = parser.getText();
						} else if (text == 'refBanco') {
							refBanco = parser.getText();
						} else if (text == 'refCliente') {
							refCliente = parser.getText();
						} else if (text == 'tipoTransaccion') {
							tipoTransaccion = parser.getText();
						} else if (text == 'valueDate') {
							valueDate = parser.getText();
						} else if (text == 'ltcCode') {
							ltcCode = parser.getText();
						} else if (text == 'ltcDescription') {
							ltcDescription = parser.getText();
						} else if (text == 'transactionBatchReference') {
							transactionBatchReference = parser.getText();

						//AM - 11/11/2020 - US6421: Campos Nuevos Nexus
						} else if (text == 'aditionalInformation') {
							aditionalInformation = parser.getText();
						} else if (text == 'customerAditionalInformation') {
							customerAditionalInformation = parser.getText();
						
						//AM - 11/11/2020 - US7687: Campos MT940	
						/*
						} else if (text == 'customerTCode') {
							customerTCode = parser.getText();
						} else if (text == 'customerTDescription') {
							customerTDescription = parser.getText();
						} else if (text == 'transactionConsolidated') {
							transactionConsolidated = parser.getText();
						*/
						} else {
							System.debug(LoggingLevel.WARN, 'ObtTransacBusqueda consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global ObtTransacBusqueda(){
            System.debug('WRAPPER_AccountTransactionSearch.ObtTransacBusqueda');
        }
	}
	
	global class ListaObtTransacciones {
		@AuraEnabled global ObtTransacBusqueda obtTransacBusqueda {get;set;} 

		global ListaObtTransacciones(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'obtTransacBusqueda') {
							obtTransacBusqueda = new ObtTransacBusqueda(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaObtTransacciones consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        
        global ListaObtTransacciones(){
            System.debug('WRAPPER_AccountTransactionSearch.ListaObtTransacciones');
        }
	}
	
	global static WRAPPER_AccountTransactionSearch parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_AccountTransactionSearch(parser);
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

    private static List<ListaObtTransacciones> arrayOfListaObtTransacciones(System.JSONParser p) {
        List<ListaObtTransacciones> res = new List<ListaObtTransacciones>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaObtTransacciones(p));
        }
        return res;
    }

    private static List<List<ListaObtTransacciones>> arrayOfListListaObtTransacciones(System.JSONParser p) {
        List<List<ListaObtTransacciones>> res = new List<List<ListaObtTransacciones>>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(arrayOfListaObtTransacciones(p));
        }
        return res;
    }
}