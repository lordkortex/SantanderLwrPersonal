/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the login service data
Test Class:     WRAPPER_Login_Test
History
<Date>			<Author>		    <Description>
19/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public class WRAPPER_Login {

	public class ListaCuentas {
		public CuentasArbol cuentasArbol {get;set;} 

		public ListaCuentas(JSONParser parser) {
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
	}
	
	public class ListaMonedasArbol {
		public MonedaArbol monedaArbol {get;set;} 

		public ListaMonedasArbol(JSONParser parser) {
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
	}
	
	public class User {
		public String apellidosUsuario {get;set;} 
		public String backoffice {get;set;} 
		public String checkMovil {get;set;} 
		public Integer codigoCliente {get;set;} 
		public String codigoErc {get;set;} 
		public String codigoFormatoCantidad {get;set;} 
		public String codigoFormatoFecha {get;set;} 
		public String codigoFormatoZona {get;set;} 
		public String dataCript {get;set;} 
		public String direccionUsuario {get;set;} 
		public String estado {get;set;} 
		public String fechaModificacion {get;set;} 
		public String idLogin {get;set;} 
		public String idToken {get;set;} 
		public Idioma idioma {get;set;} 
		public String indAprob {get;set;} 
		public String indCriptoVirtual {get;set;} 
		public List<Listacorporates> listacorporates {get;set;} 
		public String mailUsuario {get;set;} 
		public String nombreCliente {get;set;} 
		public String nombreFormatoCantidad {get;set;} 
		public String nombreFormatoFecha {get;set;} 
		public String nombreFormatoZona {get;set;} 
		public String nombreUsuario {get;set;} 
		public String telefonoUsuario {get;set;} 
		public String tieneVasco {get;set;} 
		public String tipoUsuario {get;set;} 
		public String token {get;set;} 
		public String UIDModificacion {get;set;} 
		public String ultimoLoginKo {get;set;} 
		public String ultimoLoginOk {get;set;} 
		public String usuarioDumy {get;set;} 
		public String vascoId {get;set;} 

		public User(JSONParser parser) {
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
	}
	
	public class CodigoBic {
		public String branch {get;set;} 
		public String entidadbic {get;set;} 
		public String locatorbic {get;set;} 
		public String paisbic {get;set;} 

		public CodigoBic(JSONParser parser) {
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
	}
	
	public class Producto {
		public Integer codigoProducto {get;set;} 
		public Integer codigoSubProducto {get;set;} 
		public Integer ordenProducto {get;set;} 
		public Integer ordenSubproducto {get;set;} 

		public Producto(JSONParser parser) {
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
	}
	
	public class MonedaArbol {
		public String divisaCuenta {get;set;} 
		public List<Listacuentasarbol> listacuentasarbol {get;set;} 
		public Integer sumBookBalance {get;set;} 
		public Integer sumValueBalance {get;set;} 

		public MonedaArbol(JSONParser parser) {
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
	}
	
	public class TipoDeCambio {
		public String claError {get;set;} 
		public String divisa {get;set;} 
		public String fecha {get;set;} 
		public Integer importe {get;set;} 
		public String importeDecimal {get;set;} 
		public String nombreDivisa {get;set;} 
		public String tipError {get;set;} 

		public TipoDeCambio(JSONParser parser) {
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
	}
	
	public class BalancesArbol {
		public PaisArbol paisArbol {get;set;} 

		public BalancesArbol(JSONParser parser) {
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
	}
	
	public class PermisosSubprod {
		public String codPermiso {get;set;} 
		public Integer codigoSubProducto {get;set;} 
		public List<ListaMetodosPago> listaMetodosPago {get;set;} 
		public String necesTipo {get;set;} 
		public String necesitaCuenta {get;set;} 

		public PermisosSubprod(JSONParser parser) {
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
	}

	public class PermisosSubprod_Z {
		public PermisosSubprod permisosSubprod {get;set;} 

		public PermisosSubprod_Z(JSONParser parser) {
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
	}
	
	public class Corporates {
		public Integer codigoCorporate {get;set;} 
		public String nombreCorporate {get;set;} 
		public String numDocumento {get;set;} 

		public Corporates(JSONParser parser) {
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
	}
	
	public class CuentasArbol {
		public String codPais {get;set;} 
		public Integer codigoCuenta {get;set;} 
		public String codigoDivisa {get;set;} 
		public String cuentaExtracto {get;set;} 
		public String nombreCorporate {get;set;} 
		public List<PermisosSubprod_Z> permisosSubprod {get;set;}  

		public CuentasArbol(JSONParser parser) {
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
	}
	
	public class Inicio {
		public User user {get;set;} 
		public Profiled profiled {get;set;} 
		public List<ListaProductosPerfil> listaProductosPerfil {get;set;} 
		public List<ListaPermisos> listaPermisos {get;set;} 

		public Inicio(JSONParser parser) {
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
	}
	
	public class MetodosPago {
		public String codMedioPago {get;set;} 
		public String codTipoPago {get;set;} 

		public MetodosPago(JSONParser parser) {
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
	}
	
	public class PermisoPerfil {
		public String codPermiso {get;set;} 
		public Integer codSubProd {get;set;} 
		public String necesitaCta {get;set;} 

		public PermisoPerfil(JSONParser parser) {
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
	}
	
	public class ListaPais {

		public Pais pais {get;set;} 

		public ListaPais(JSONParser parser) {
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
	}
	
	public class Listacuentasarbol {
		public CuentaArbol cuentaArbol {get;set;} 

		public Listacuentasarbol(JSONParser parser) {
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
	}
	
	public class PaisArbol {
		public String codPais {get;set;} 
		public String divisaUsuario {get;set;} 
		public List<ListaMonedasArbol> listaMonedasArbol {get;set;} 
		public Double sumBookBalanceDivUsu {get;set;} 
		public Double sumValueBalanceDivUsu {get;set;} 

		public PaisArbol(JSONParser parser) {
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
	}
	
	public class Pais {
		public String codPais {get;set;} 
		public List<ListaCuentas> listaCuentas {get;set;} 

		public Pais(JSONParser parser) {
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
	}
	
	public class Listacorporates {
		public Corporates corporates {get;set;} 

		public Listacorporates(JSONParser parser) {
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
	}
	
	public class ListaProductosPerfil {
		public Integer codProducto {get;set;} 
		public String descProducto {get;set;} 
		public Integer ordenProducto {get;set;} 
		public List<SubProductos> subProductos {get;set;} 

		public ListaProductosPerfil(JSONParser parser) {
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
	}
	
	public class SubProductoPerfil {
		public Integer codSubProd {get;set;} 
		public String descSubProd {get;set;} 
		public Integer ordenSubProd {get;set;} 
		public String url {get;set;} 

		public SubProductoPerfil(JSONParser parser) {
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
	}
	
	public class ListaPermisos {
		public PermisoPerfil permisoPerfil {get;set;} 

		public ListaPermisos(JSONParser parser) {
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
	}
	
	public class ListadoServicios {
		public Servicio servicio {get;set;} 

		public ListadoServicios(JSONParser parser) {
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
	}
	
	public class Profiled {
		public String apellidosUsuario {get;set;} 
		public String clienteIfi {get;set;} 
		public Integer codigoCliente {get;set;} 
		public Integer codigoGrupo {get;set;} 
		public Integer codigoRol {get;set;} 
		public String estado {get;set;} 
		public String fechaMdf {get;set;} 
		public String idLogin {get;set;} 
		public List<ListaProductos> listaProductos {get;set;} 
		public List<ListadoServicios> listadoServicios {get;set;} 
		public String nombreCliente {get;set;} 
		public String nombreGrupo {get;set;} 
		public String nombreRol {get;set;} 
		public String nombreUsuario {get;set;} 
		public String tipoUsuario {get;set;} 
		public String usuarioMdf {get;set;} 

		public Profiled(JSONParser parser) {
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
	}
	
	public class ListaProductos {
		public Producto producto {get;set;} 

		public ListaProductos(JSONParser parser) {
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
	}
	
	public class CuentaArbol {
		public String aliasCuentaPerfilado {get;set;} 
		public String aliasEntidad {get;set;} 
		public Integer bookBalance {get;set;} 
		public String bookDate {get;set;} 
		public CodigoBic codigoBic {get;set;} 
		public Integer codigoCorporate {get;set;} 
		public Integer codigoCuenta {get;set;} 
		public String cuentaExtracto {get;set;} 
		public String divisa {get;set;} 
		public String nombreCorporate {get;set;} 
		public String nombreEmisora {get;set;} 
		public Integer valueBalance {get;set;} 
		public String valueDate {get;set;} 

		public CuentaArbol(JSONParser parser) {
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
	}
	
	public class Balances {
		public List<BalancesArbol> balancesArbol {get;set;} 
		public List<ListaPais> listaDivisa {get;set;} 
		public String descripcionConversion {get;set;} 
		public List<ListaTipCambio> listaTipCambio {get;set;} 

		public Balances(JSONParser parser) {
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
	}
	
	public class Pantalla {
		public Balances balances {get;set;} 

		public Pantalla(JSONParser parser) {
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
	}
	
	public class ListaPermisosSinMetodos {
		public Pemisos pemisos {get;set;} 

		public ListaPermisosSinMetodos(JSONParser parser) {
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
	}
	
	public class SubProductos {
		public SubProductoPerfil subProductoPerfil {get;set;} 

		public SubProductos(JSONParser parser) {
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
	}
	
	public class Idioma {
		public String IDIOMA_ISO {get;set;} 
		public String DIALECTO_ISO {get;set;} 

		public Idioma(JSONParser parser) {
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
	}
	
	public class ListaTipCambio {
		public TipoDeCambio tipoDeCambio {get;set;} 

		public ListaTipCambio(JSONParser parser) {
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
	}
	
	public class ListaMetodosPago {
		public MetodosPago metodosPago {get;set;} 

		public ListaMetodosPago(JSONParser parser) {
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
	}
	
	public Inicio inicio {get;set;} 
	public Pantalla pantalla {get;set;} 

	public WRAPPER_Login(JSONParser parser) {
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
	
	public class Servicio {
		public String codServicio {get;set;} 
		public List<ListaPais> listaPais {get;set;} 
		public String listaPaisesAr {get;set;} 
		public List<ListaPermisosSinMetodos> listaPermisosSinMetodos {get;set;} 
		public String necesCuenta {get;set;} 
		public String necesTip {get;set;} 

		public Servicio(JSONParser parser) {
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
	}
	
	public class Pemisos {
		public String codPermiso {get;set;} 
		public Integer codigoSubproducto {get;set;} 

		public Pemisos(JSONParser parser) {
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
	}

	public static WRAPPER_Login parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_Login(parser);
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