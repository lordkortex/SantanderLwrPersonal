/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the login service data
Test Class:     WRAPPER_Login_Test
History
<Date>			<Author>		    <Description>
19/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
global class WRAPPER_Login {

    global WRAPPER_Login(){
        System.debug('WRAPPER_Login');
    }

	global class ListaCuentas {
		global CuentasArbol cuentasArbol {get;set;} 

		global ListaCuentas(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'cuentasArbol') {
							cuentasArbol = new CuentasArbol(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaCuentas consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global ListaCuentas(){
            System.debug('WRAPPER_Login.ListaCuentas');
        }
	}
	
	global class ListaMonedasArbol {
		global MonedaArbol monedaArbol {get;set;} 

		global ListaMonedasArbol(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'monedaArbol') {
							monedaArbol = new MonedaArbol(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaMonedasArbol consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global ListaMonedasArbol(){
            System.debug('WRAPPER_Login.ListaMonedasArbol');
        }
	}
	
	global class User {
		global String apellidosUsuario {get;set;} 
		global String backoffice {get;set;} 
		global String checkMovil {get;set;} 
		global Integer codigoCliente {get;set;} 
		global String codigoErc {get;set;} 
		global String codigoFormatoCantidad {get;set;} 
		global String codigoFormatoFecha {get;set;} 
		global String codigoFormatoZona {get;set;} 
		global String dataCript {get;set;} 
		global String direccionUsuario {get;set;} 
		global String estado {get;set;} 
		global String fechaModificacion {get;set;} 
		global String idLogin {get;set;} 
		global String idToken {get;set;} 
		global Idioma idioma {get;set;} 
		global String indAprob {get;set;} 
		global String indCriptoVirtual {get;set;} 
		global List<Listacorporates> listacorporates {get;set;} 
		global String mailUsuario {get;set;} 
		global String nombreCliente {get;set;} 
		global String nombreFormatoCantidad {get;set;} 
		global String nombreFormatoFecha {get;set;} 
		global String nombreFormatoZona {get;set;} 
		global String nombreUsuario {get;set;} 
		global String telefonoUsuario {get;set;} 
		global String tieneVasco {get;set;} 
		global String tipoUsuario {get;set;} 
		global String token {get;set;} 
		global String UIDModificacion {get;set;} 
		global String ultimoLoginKo {get;set;} 
		global String ultimoLoginOk {get;set;} 
		global String usuarioDumy {get;set;} 
		global String vascoId {get;set;} 

		global User(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'apellidosUsuario') {
							apellidosUsuario = parser.getText();
						} else if (text == 'backoffice') {
							backoffice = parser.getText();
						} else if (text == 'checkMovil') {
							checkMovil = parser.getText();
						} else if (text == 'codigoCliente') {
							codigoCliente = parser.getIntegerValue();
						} else if (text == 'codigoErc') {
							codigoErc = parser.getText();
						} else if (text == 'codigoFormatoCantidad') {
							codigoFormatoCantidad = parser.getText();
						} else if (text == 'codigoFormatoFecha') {
							codigoFormatoFecha = parser.getText();
						} else if (text == 'codigoFormatoZona') {
							codigoFormatoZona = parser.getText();
						} else if (text == 'dataCript') {
							dataCript = parser.getText();
						} else if (text == 'direccionUsuario') {
							direccionUsuario = parser.getText();
						} else if (text == 'estado') {
							estado = parser.getText();
						} else if (text == 'fechaModificacion') {
							fechaModificacion = parser.getText();
						} else if (text == 'idLogin') {
							idLogin = parser.getText();
						} else if (text == 'idToken') {
							idToken = parser.getText();
						} else if (text == 'idioma') {
							idioma = new Idioma(parser);
						} else if (text == 'indAprob') {
							indAprob = parser.getText();
						} else if (text == 'indCriptoVirtual') {
							indCriptoVirtual = parser.getText();
						} else if (text == 'listacorporates') {
							listacorporates = arrayOfListacorporates(parser);
						} else if (text == 'mailUsuario') {
							mailUsuario = parser.getText();
						} else if (text == 'nombreCliente') {
							nombreCliente = parser.getText();
						} else if (text == 'nombreFormatoCantidad') {
							nombreFormatoCantidad = parser.getText();
						} else if (text == 'nombreFormatoFecha') {
							nombreFormatoFecha = parser.getText();
						} else if (text == 'nombreFormatoZona') {
							nombreFormatoZona = parser.getText();
						} else if (text == 'nombreUsuario') {
							nombreUsuario = parser.getText();
						} else if (text == 'telefonoUsuario') {
							telefonoUsuario = parser.getText();
						} else if (text == 'tieneVasco') {
							tieneVasco = parser.getText();
						} else if (text == 'tipoUsuario') {
							tipoUsuario = parser.getText();
						} else if (text == 'token') {
							token = parser.getText();
						} else if (text == 'UIDModificacion') {
							UIDModificacion = parser.getText();
						} else if (text == 'ultimoLoginKo') {
							ultimoLoginKo = parser.getText();
						} else if (text == 'ultimoLoginOk') {
							ultimoLoginOk = parser.getText();
						} else if (text == 'usuarioDumy') {
							usuarioDumy = parser.getText();
						} else if (text == 'vascoId') {
							vascoId = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'User consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global User(){
            System.debug('WRAPPER_Login.User');
        }
	}
	
	global class CodigoBic {
		global String branch {get;set;} 
		global String entidadbic {get;set;} 
		global String locatorbic {get;set;} 
		global String paisbic {get;set;} 

		global CodigoBic(JSONParser parser) {
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
						} else {
							System.debug(LoggingLevel.WARN, 'CodigoBic consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global CodigoBic(){
            System.debug('WRAPPER_Login.CodigoBic');
        }
	}
	
	global class Producto {
		global Integer codigoProducto {get;set;} 
		global Integer codigoSubProducto {get;set;} 
		global Integer ordenProducto {get;set;} 
		global Integer ordenSubproducto {get;set;} 

		global Producto(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codigoProducto') {
							codigoProducto = parser.getIntegerValue();
						} else if (text == 'codigoSubProducto') {
							codigoSubProducto = parser.getIntegerValue();
						} else if (text == 'ordenProducto') {
							ordenProducto = parser.getIntegerValue();
						} else if (text == 'ordenSubproducto') {
							ordenSubproducto = parser.getIntegerValue();
						} else {
							System.debug(LoggingLevel.WARN, 'Producto consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Producto(){
            System.debug('WRAPPER_Login.Producto');
        }
	}
	
	global class MonedaArbol {
		global String divisaCuenta {get;set;} 
		global List<Listacuentasarbol> listacuentasarbol {get;set;} 
		global Integer sumBookBalance {get;set;} 
		global Integer sumValueBalance {get;set;} 

		global MonedaArbol(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'divisaCuenta') {
							divisaCuenta = parser.getText();
						} else if (text == 'listacuentasarbol') {
							listacuentasarbol = arrayOfListacuentasarbol(parser);
						} else if (text == 'sumBookBalance') {
							sumBookBalance = parser.getIntegerValue();
						} else if (text == 'sumValueBalance') {
							sumValueBalance = parser.getIntegerValue();
						} else {
							System.debug(LoggingLevel.WARN, 'MonedaArbol consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global MonedaArbol(){
            System.debug('WRAPPER_Login.MonedaArbol');
        }
	}
	
	global class TipoDeCambio {
		global String claError {get;set;} 
		global String divisa {get;set;} 
		global String fecha {get;set;} 
		global Integer importe {get;set;} 
		global String importeDecimal {get;set;} 
		global String nombreDivisa {get;set;} 
		global String tipError {get;set;} 

		global TipoDeCambio(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'claError') {
							claError = parser.getText();
						} else if (text == 'divisa') {
							divisa = parser.getText();
						} else if (text == 'fecha') {
							fecha = parser.getText();
						} else if (text == 'importe') {
							importe = parser.getIntegerValue();
						} else if (text == 'importeDecimal') {
							importeDecimal = parser.getText();
						} else if (text == 'nombreDivisa') {
							nombreDivisa = parser.getText();
						} else if (text == 'tipError') {
							tipError = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'TipoDeCambio consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global TipoDeCambio(){
            System.debug('WRAPPER_Login.TipoDeCambio');
        }
	}
	
	global class BalancesArbol {
		global PaisArbol paisArbol {get;set;} 

		global BalancesArbol(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'paisArbol') {
							paisArbol = new PaisArbol(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'BalancesArbol consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global BalancesArbol(){
            System.debug('WRAPPER_Login.BalancesArbol');
        }
	}
	
	global class PermisosSubprod {
		global String codPermiso {get;set;} 
		global Integer codigoSubProducto {get;set;} 
		global List<ListaMetodosPago> listaMetodosPago {get;set;} 
		global String necesTipo {get;set;} 
		global String necesitaCuenta {get;set;} 

		global PermisosSubprod(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codPermiso') {
							codPermiso = parser.getText();
						} else if (text == 'codigoSubProducto') {
							codigoSubProducto = parser.getIntegerValue();
						} else if (text == 'listaMetodosPago') {
							listaMetodosPago = arrayOfListaMetodosPago(parser);
						} else if (text == 'necesTipo') {
							necesTipo = parser.getText();
						} else if (text == 'necesitaCuenta') {
							necesitaCuenta = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'PermisosSubprod consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global PermisosSubprod(){
            System.debug('WRAPPER_Login.PermisosSubprod');
        }
	}

	global class PermisosSubprod_Z {
		global PermisosSubprod permisosSubprod {get;set;} 

		global PermisosSubprod_Z(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'permisosSubprod') {
							permisosSubprod = new PermisosSubprod(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'PermisosSubprod_Z consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global PermisosSubprod_Z(){
            System.debug('WRAPPER_Login.PermisosSubprod_Z');
        }
	}
	
	global class Corporates {
		global Integer codigoCorporate {get;set;} 
		global String nombreCorporate {get;set;} 
		global String numDocumento {get;set;} 

		global Corporates(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codigoCorporate') {
							codigoCorporate = parser.getIntegerValue();
						} else if (text == 'nombreCorporate') {
							nombreCorporate = parser.getText();
						} else if (text == 'numDocumento') {
							numDocumento = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Corporates consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Corporates(){
            System.debug('WRAPPER_Login.Corporates');
        }
	}
	
	global class CuentasArbol {
		global String codPais {get;set;} 
		global Integer codigoCuenta {get;set;} 
		global String codigoDivisa {get;set;} 
		global String cuentaExtracto {get;set;} 
		global String nombreCorporate {get;set;} 
		global List<PermisosSubprod_Z> permisosSubprod {get;set;}  

		global CuentasArbol(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codPais') {
							codPais = parser.getText();
						} else if (text == 'codigoCuenta') {
							codigoCuenta = parser.getIntegerValue();
						} else if (text == 'codigoDivisa') {
							codigoDivisa = parser.getText();
						} else if (text == 'cuentaExtracto') {
							cuentaExtracto = parser.getText();
						} else if (text == 'nombreCorporate') {
							nombreCorporate = parser.getText();
						} else if (text == 'permisosSubprod') {
							permisosSubprod = arrayOfPermisosSubprod_Z(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'CuentasArbol consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global CuentasArbol(){
            System.debug('WRAPPER_Login.CuentasArbol');
        }
	}
	
	global class Inicio {
		global User user {get;set;} 
		global Profiled profiled {get;set;} 
		global List<ListaProductosPerfil> listaProductosPerfil {get;set;} 
		global List<ListaPermisos> listaPermisos {get;set;} 

		global Inicio(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'user') {
							user = new User(parser);
						} else if (text == 'profiled') {
							profiled = new Profiled(parser);
						} else if (text == 'listaProductosPerfil') {
							listaProductosPerfil = arrayOfListaProductosPerfil(parser);
						} else if (text == 'listaPermisos') {
							listaPermisos = arrayOfListaPermisos(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Inicio consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Inicio(){
            System.debug('WRAPPER_Login.Inicio');
        }
	}
	
	global class MetodosPago {
		global String codMedioPago {get;set;} 
		global String codTipoPago {get;set;} 

		global MetodosPago(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codMedioPago') {
							codMedioPago = parser.getText();
						} else if (text == 'codTipoPago') {
							codTipoPago = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'MetodosPago consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global MetodosPago(){
            System.debug('WRAPPER_Login.MetodosPago');
        }
	}
	
	global class PermisoPerfil {
		global String codPermiso {get;set;} 
		global Integer codSubProd {get;set;} 
		global String necesitaCta {get;set;} 

		global PermisoPerfil(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codPermiso') {
							codPermiso = parser.getText();
						} else if (text == 'codSubProd') {
							codSubProd = parser.getIntegerValue();
						} else if (text == 'necesitaCta') {
							necesitaCta = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'PermisoPerfil consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global PermisoPerfil(){
            System.debug('WRAPPER_Login.PermisoPerfil');
        }
	}
	
	global class ListaPais {

		global Pais pais {get;set;} 

		global ListaPais(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'pais') {
							pais = new Pais(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaPais consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global ListaPais(){
            System.debug('WRAPPER_Login.ListaPais');
        }
	}
	
	global class Listacuentasarbol {
		global CuentaArbol cuentaArbol {get;set;} 

		global Listacuentasarbol(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'cuentaArbol') {
							cuentaArbol = new CuentaArbol(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Listacuentasarbol consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Listacuentasarbol(){
            System.debug('WRAPPER_Login.Listacuentasarbol');
        }
	}
	
	global class PaisArbol {
		global String codPais {get;set;} 
		global String divisaUsuario {get;set;} 
		global List<ListaMonedasArbol> listaMonedasArbol {get;set;} 
		global Double sumBookBalanceDivUsu {get;set;} 
		global Double sumValueBalanceDivUsu {get;set;} 

		global PaisArbol(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codPais') {
							codPais = parser.getText();
						} else if (text == 'divisaUsuario') {
							divisaUsuario = parser.getText();
						} else if (text == 'listaMonedasArbol') {
							listaMonedasArbol = arrayOfListaMonedasArbol(parser);
						} else if (text == 'sumBookBalanceDivUsu') {
							sumBookBalanceDivUsu = parser.getDoubleValue();
						} else if (text == 'sumValueBalanceDivUsu') {
							sumValueBalanceDivUsu = parser.getDoubleValue();
						} else {
							System.debug(LoggingLevel.WARN, 'PaisArbol consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global PaisArbol(){
            System.debug('WRAPPER_Login.PaisArbol');
        }
	}
	
	global class Pais {
		global String codPais {get;set;} 
		global List<ListaCuentas> listaCuentas {get;set;} 

		global Pais(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codPais') {
							codPais = parser.getText();
						} else if (text == 'listaCuentas') {
							listaCuentas = arrayOfListaCuentas(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Pais consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Pais(){
            System.debug('WRAPPER_Login.Pais');
        }
	}
	
	global class Listacorporates {
		global Corporates corporates {get;set;} 

		global Listacorporates(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'corporates') {
							corporates = new Corporates(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Listacorporates consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Listacorporates(){
            System.debug('WRAPPER_Login.Listacorporates');
        }
	}
	
	global class ListaProductosPerfil {
		global Integer codProducto {get;set;} 
		global String descProducto {get;set;} 
		global Integer ordenProducto {get;set;} 
		global List<SubProductos> subProductos {get;set;} 

		global ListaProductosPerfil(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codProducto') {
							codProducto = parser.getIntegerValue();
						} else if (text == 'descProducto') {
							descProducto = parser.getText();
						} else if (text == 'ordenProducto') {
							ordenProducto = parser.getIntegerValue();
						} else if (text == 'subProductos') {
							subProductos = arrayOfSubProductos(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaProductosPerfil consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global ListaProductosPerfil(){
            System.debug('WRAPPER_Login.ListaProductosPerfil');
        }
	}
	
	global class SubProductoPerfil {
		global Integer codSubProd {get;set;} 
		global String descSubProd {get;set;} 
		global Integer ordenSubProd {get;set;} 
		global String url {get;set;} 

		global SubProductoPerfil(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codSubProd') {
							codSubProd = parser.getIntegerValue();
						} else if (text == 'descSubProd') {
							descSubProd = parser.getText();
						} else if (text == 'ordenSubProd') {
							ordenSubProd = parser.getIntegerValue();
						} else if (text == 'url') {
							url = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'SubProductoPerfil consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global SubProductoPerfil(){
            System.debug('WRAPPER_Login.SubProductoPerfil');
        }
	}
	
	global class ListaPermisos {
		global PermisoPerfil permisoPerfil {get;set;} 

		global ListaPermisos(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'permisoPerfil') {
							permisoPerfil = new PermisoPerfil(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaPermisos consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global ListaPermisos(){
            System.debug('WRAPPER_Login.ListaPermisos');
        }
	}
	
	global class ListadoServicios {
		global Servicio servicio {get;set;} 

		global ListadoServicios(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'servicio') {
							servicio = new Servicio(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListadoServicios consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global ListadoServicios(){
            System.debug('WRAPPER_Login.ListadoServicios');
        }
	}
	
	global class Profiled {
		global String apellidosUsuario {get;set;} 
		global String clienteIfi {get;set;} 
		global Integer codigoCliente {get;set;} 
		global Integer codigoGrupo {get;set;} 
		global Integer codigoRol {get;set;} 
		global String estado {get;set;} 
		global String fechaMdf {get;set;} 
		global String idLogin {get;set;} 
		global List<ListaProductos> listaProductos {get;set;} 
		global List<ListadoServicios> listadoServicios {get;set;} 
		global String nombreCliente {get;set;} 
		global String nombreGrupo {get;set;} 
		global String nombreRol {get;set;} 
		global String nombreUsuario {get;set;} 
		global String tipoUsuario {get;set;} 
		global String usuarioMdf {get;set;} 

		global Profiled(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'apellidosUsuario') {
							apellidosUsuario = parser.getText();
						} else if (text == 'clienteIfi') {
							clienteIfi = parser.getText();
						} else if (text == 'codigoCliente') {
							codigoCliente = parser.getIntegerValue();
						} else if (text == 'codigoGrupo') {
							codigoGrupo = parser.getIntegerValue();
						} else if (text == 'codigoRol') {
							codigoRol = parser.getIntegerValue();
						} else if (text == 'estado') {
							estado = parser.getText();
						} else if (text == 'fechaMdf') {
							fechaMdf = parser.getText();
						} else if (text == 'idLogin') {
							idLogin = parser.getText();
						} else if (text == 'listaProductos') {
							listaProductos = arrayOfListaProductos(parser);
						} else if (text == 'listadoServicios') {
							listadoServicios = arrayOfListadoServicios(parser);
						} else if (text == 'nombreCliente') {
							nombreCliente = parser.getText();
						} else if (text == 'nombreGrupo') {
							nombreGrupo = parser.getText();
						} else if (text == 'nombreRol') {
							nombreRol = parser.getText();
						} else if (text == 'nombreUsuario') {
							nombreUsuario = parser.getText();
						} else if (text == 'tipoUsuario') {
							tipoUsuario = parser.getText();
						} else if (text == 'usuarioMdf') {
							usuarioMdf = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Profiled consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Profiled(){
            System.debug('WRAPPER_Login.Profiled');
        }
	}
	
	global class ListaProductos {
		global Producto producto {get;set;} 

		global ListaProductos(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'producto') {
							producto = new Producto(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaProductos consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global ListaProductos(){
            System.debug('WRAPPER_Login.ListaProductos');
        }
	}
	
	global class CuentaArbol {
		global String aliasCuentaPerfilado {get;set;} 
		global String aliasEntidad {get;set;} 
		global Integer bookBalance {get;set;} 
		global String bookDate {get;set;} 
		global CodigoBic codigoBic {get;set;} 
		global Integer codigoCorporate {get;set;} 
		global Integer codigoCuenta {get;set;} 
		global String cuentaExtracto {get;set;} 
		global String divisa {get;set;} 
		global String nombreCorporate {get;set;} 
		global String nombreEmisora {get;set;} 
		global Integer valueBalance {get;set;} 
		global String valueDate {get;set;} 

		global CuentaArbol(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'aliasCuentaPerfilado') {
							aliasCuentaPerfilado = parser.getText();
						} else if (text == 'aliasEntidad') {
							aliasEntidad = parser.getText();
						} else if (text == 'bookBalance') {
							bookBalance = parser.getIntegerValue();
						} else if (text == 'bookDate') {
							bookDate = parser.getText();
						} else if (text == 'codigoBic') {
							codigoBic = new CodigoBic(parser);
						} else if (text == 'codigoCorporate') {
							codigoCorporate = parser.getIntegerValue();
						} else if (text == 'codigoCuenta') {
							codigoCuenta = parser.getIntegerValue();
						} else if (text == 'cuentaExtracto') {
							cuentaExtracto = parser.getText();
						} else if (text == 'divisa') {
							divisa = parser.getText();
						} else if (text == 'nombreCorporate') {
							nombreCorporate = parser.getText();
						} else if (text == 'nombreEmisora') {
							nombreEmisora = parser.getText();
						} else if (text == 'valueBalance') {
							valueBalance = parser.getIntegerValue();
						} else if (text == 'valueDate') {
							valueDate = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'CuentaArbol consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global CuentaArbol(){
            System.debug('WRAPPER_Login.CuentaArbol');
        }
	}
	
	global class Balances {
		global List<BalancesArbol> balancesArbol {get;set;} 
		global List<ListaPais> listaDivisa {get;set;} 
		global String descripcionConversion {get;set;} 
		global List<ListaTipCambio> listaTipCambio {get;set;} 

		global Balances(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'balancesArbol') {
							balancesArbol = arrayOfBalancesArbol(parser);
						} else if (text == 'listaDivisa') {
							listaDivisa = arrayOfListaPais(parser);
						} else if (text == 'descripcionConversion') {
							descripcionConversion = parser.getText();
						} else if (text == 'listaTipCambio') {
							listaTipCambio = arrayOfListaTipCambio(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Balances consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Balances(){
            System.debug('WRAPPER_Login.Balances');
        }
	}
	
	global class Pantalla {
		global Balances balances {get;set;} 

		global Pantalla(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'balances') {
							balances = new Balances(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Pantalla consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Pantalla(){
            System.debug('WRAPPER_Login.Pantalla');
        }
	}
	
	global class ListaPermisosSinMetodos {
		global Pemisos pemisos {get;set;} 

		global ListaPermisosSinMetodos(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'pemisos') {
							pemisos = new Pemisos(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaPermisosSinMetodos consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global ListaPermisosSinMetodos(){
            System.debug('WRAPPER_Login.ListaPermisosSinMetodos');
        }
	}
	
	global class SubProductos {
		global SubProductoPerfil subProductoPerfil {get;set;} 

		global SubProductos(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'subProductoPerfil') {
							subProductoPerfil = new SubProductoPerfil(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'SubProductos consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global SubProductos(){
            System.debug('WRAPPER_Login.SubProductos');
        }
	}
	
	global class Idioma {
		global String IDIOMA_ISO {get;set;} 
		global String DIALECTO_ISO {get;set;} 

		global Idioma(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'IDIOMA_ISO') {
							IDIOMA_ISO = parser.getText();
						} else if (text == 'DIALECTO_ISO') {
							DIALECTO_ISO = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Idioma consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Idioma(){
            System.debug('WRAPPER_Login.Idioma');
        }
	}
	
	global class ListaTipCambio {
		global TipoDeCambio tipoDeCambio {get;set;} 

		global ListaTipCambio(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'tipoDeCambio') {
							tipoDeCambio = new TipoDeCambio(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaTipCambio consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global ListaTipCambio(){
            System.debug('WRAPPER_Login.ListaTipCambio');
        }
	}
	
	global class ListaMetodosPago {
		global MetodosPago metodosPago {get;set;} 

		global ListaMetodosPago(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'metodosPago') {
							metodosPago = new MetodosPago(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'ListaMetodosPago consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global ListaMetodosPago(){
            System.debug('WRAPPER_Login.ListaMetodosPago');
        }
	}
	
	global Inicio inicio {get;set;} 
	global Pantalla pantalla {get;set;} 

	global WRAPPER_Login(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'inicio') {
						inicio = new Inicio(parser);
					} else if (text == 'pantalla') {
						pantalla = new Pantalla(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_Login consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	global class Servicio {
		global String codServicio {get;set;} 
		global List<ListaPais> listaPais {get;set;} 
		global String listaPaisesAr {get;set;} 
		global List<ListaPermisosSinMetodos> listaPermisosSinMetodos {get;set;} 
		global String necesCuenta {get;set;} 
		global String necesTip {get;set;} 

		global Servicio(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codServicio') {
							codServicio = parser.getText();
						} else if (text == 'listaPais') {
							listaPais = arrayOfListaPais(parser);
						} else if (text == 'listaPaisesAr') {
							listaPaisesAr = parser.getText();
						} else if (text == 'listaPermisosSinMetodos') {
							listaPermisosSinMetodos = arrayOfListaPermisosSinMetodos(parser);
						} else if (text == 'necesCuenta') {
							necesCuenta = parser.getText();
						} else if (text == 'necesTip') {
							necesTip = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Servicio consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Servicio(){
            System.debug('WRAPPER_Login.Servicio');
        }
	}
	
	global class Pemisos {
		global String codPermiso {get;set;} 
		global Integer codigoSubproducto {get;set;} 

		global Pemisos(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codPermiso') {
							codPermiso = parser.getText();
						} else if (text == 'codigoSubproducto') {
							codigoSubproducto = parser.getIntegerValue();
						} else {
							System.debug(LoggingLevel.WARN, 'Pemisos consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

        global Pemisos(){
            System.debug('WRAPPER_Login.Pemisos');
        }
	}

	global static WRAPPER_Login parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_Login(parser);
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

    private static List<BalancesArbol> arrayOfBalancesArbol(System.JSONParser p) {
        List<BalancesArbol> res = new List<BalancesArbol>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new BalancesArbol(p));
        }
        return res;
    }

    private static List<ListaProductosPerfil> arrayOfListaProductosPerfil(System.JSONParser p) {
        List<ListaProductosPerfil> res = new List<ListaProductosPerfil>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaProductosPerfil(p));
        }
        return res;
    }

    private static List<SubProductos> arrayOfSubProductos(System.JSONParser p) {
        List<SubProductos> res = new List<SubProductos>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new SubProductos(p));
        }
        return res;
    }

    private static List<ListaCuentas> arrayOfListaCuentas(System.JSONParser p) {
        List<ListaCuentas> res = new List<ListaCuentas>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaCuentas(p));
        }
        return res;
    }

    private static List<ListaProductos> arrayOfListaProductos(System.JSONParser p) {
        List<ListaProductos> res = new List<ListaProductos>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaProductos(p));
        }
        return res;
	}
	
    private static List<ListaPermisos> arrayOfListaPermisos(System.JSONParser p) {
        List<ListaPermisos> res = new List<ListaPermisos>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaPermisos(p));
        }
        return res;
    }

    private static List<ListaTipCambio> arrayOfListaTipCambio(System.JSONParser p) {
        List<ListaTipCambio> res = new List<ListaTipCambio>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaTipCambio(p));
        }
        return res;
    }

    private static List<ListaPais> arrayOfListaPais(System.JSONParser p) {
        List<ListaPais> res = new List<ListaPais>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaPais(p));
        }
        return res;
    }

    private static List<Listacorporates> arrayOfListacorporates(System.JSONParser p) {
        List<Listacorporates> res = new List<Listacorporates>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Listacorporates(p));
        }
        return res;
    }

    private static List<ListadoServicios> arrayOfListadoServicios(System.JSONParser p) {
        List<ListadoServicios> res = new List<ListadoServicios>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListadoServicios(p));
        }
        return res;
    }

    private static List<Listacuentasarbol> arrayOfListacuentasarbol(System.JSONParser p) {
        List<Listacuentasarbol> res = new List<Listacuentasarbol>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Listacuentasarbol(p));
        }
        return res;
	}
	
    private static List<ListaMetodosPago> arrayOfListaMetodosPago(System.JSONParser p) {
        List<ListaMetodosPago> res = new List<ListaMetodosPago>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaMetodosPago(p));
        }
        return res;
    }

    private static List<ListaPermisosSinMetodos> arrayOfListaPermisosSinMetodos(System.JSONParser p) {
        List<ListaPermisosSinMetodos> res = new List<ListaPermisosSinMetodos>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaPermisosSinMetodos(p));
        }
        return res;
    }

    private static List<ListaMonedasArbol> arrayOfListaMonedasArbol(System.JSONParser p) {
        List<ListaMonedasArbol> res = new List<ListaMonedasArbol>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaMonedasArbol(p));
        }
        return res;
	}
	
	private static List<PermisosSubprod> arrayOfPermisosSubprod(System.JSONParser p) {
        List<PermisosSubprod> res = new List<PermisosSubprod>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new PermisosSubprod(p));
        }
        return res;
	}
	
	private static List<PermisosSubprod_Z> arrayOfPermisosSubprod_Z(System.JSONParser p) {
        List<PermisosSubprod_Z> res = new List<PermisosSubprod_Z>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new PermisosSubprod_Z(p));
        }
        return res;
    }
}