/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the login service data
Test Class:     WRAPPER_Inicio_Test
History
<Date>			<Author>		    <Description>
02/06/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
global class WRAPPER_Inicio {
    
    global WRAPPER_Inicio(){
        System.debug('WRAPPER_Inicio');
    }
    
    global class ListaCuentas {
		@AuraEnabled global CuentasArbol cuentasArbol;
        global ListaCuentas(){
            System.debug('WRAPPER_Inicio.ListaCuentas');
        }
	}

	@AuraEnabled global Inicio inicio;

	global class Sub_producto_perfil {
		@AuraEnabled global Integer codSubProd;
		@AuraEnabled global String descSubProd;
		@AuraEnabled global Integer ordenSubProd;
		@AuraEnabled global String url;
        
        global Sub_producto_perfil(){
            System.debug('WRAPPER_Inicio.Sub_producto_perfil');
        }
        
	}

	global class Lista_productos_perfil {
		@AuraEnabled global Integer cod_producto;
		@AuraEnabled global String desc_producto;
		@AuraEnabled global Integer orden_producto;
		@AuraEnabled global List<Sub_productos> sub_productos;
        
        global Lista_productos_perfil(){
            System.debug('WRAPPER_Inicio.Lista_productos_perfil');
        }
	}

	global class User {
		@AuraEnabled global String apellidosUsuario;
		@AuraEnabled global String backoffice;
		@AuraEnabled global String checkMovil;
		@AuraEnabled global Integer codigoCliente;
		@AuraEnabled global Object codigoErc;
		@AuraEnabled global String codigoFormatoCantidad;
		@AuraEnabled global String codigoFormatoFecha;
		@AuraEnabled global String codigoFormatoZona;
		@AuraEnabled global Object dataCript;
		@AuraEnabled global String direccionUsuario;
		@AuraEnabled global String estado;
		@AuraEnabled global String fechaModificacion;
		@AuraEnabled global String idLogin;
		@AuraEnabled global String idToken;
		@AuraEnabled global Idioma idioma;
		@AuraEnabled global Object indAprob;
		@AuraEnabled global Object indCriptoVirtual;
		@AuraEnabled global List<Listacorporates> listacorporates;
		@AuraEnabled global String mailUsuario;
		@AuraEnabled global String nombreCliente;
		@AuraEnabled global String nombreFormatoCantidad;
		@AuraEnabled global String nombreFormatoFecha;
		@AuraEnabled global String nombreFormatoZona;
		@AuraEnabled global String nombreUsuario;
		@AuraEnabled global String telefonoUsuario;
		@AuraEnabled global String tieneVasco;
		@AuraEnabled global String tipoUsuario;
		@AuraEnabled global String token;
		@AuraEnabled global String UIDModificacion;
		@AuraEnabled global String ultimoLoginKO;
		@AuraEnabled global String ultimoLoginOK;
		@AuraEnabled global String usuarioDumy;
		@AuraEnabled global Object vascoID;
        
        global User(){
            System.debug('WRAPPER_Inicio.User');
        }
	}

	global class Producto {
		@AuraEnabled global Integer codigoProducto;
		@AuraEnabled global Integer codigoSubProducto;
		@AuraEnabled global Integer ordenProducto;
		@AuraEnabled global Integer ordenSubproducto;
        
        global Producto(){
            System.debug('WRAPPER_Inicio.Producto');
        }
	}

	global class ListadoServicios {
		@AuraEnabled global Servicio servicio;
        
        global ListadoServicios(){
            System.debug('WRAPPER_Inicio.ListadoServicios');
        }
	}

	global class Profiled {
		@AuraEnabled global String apellidosUsuario;
		@AuraEnabled global String clienteIFI;
		@AuraEnabled global Integer codigoCliente;
		@AuraEnabled global Integer codigoGrupo;
		@AuraEnabled global Integer codigoRol;
		@AuraEnabled global String estado;
		@AuraEnabled global String fechaMdf;
		@AuraEnabled global String idLogin;
		@AuraEnabled global List<ListaProductos> listaProductos;
		@AuraEnabled global List<ListadoServicios> listadoServicios;
		@AuraEnabled global String nombreCliente;
		@AuraEnabled global String nombreGrupo;
		@AuraEnabled global String nombreRol;
		@AuraEnabled global String nombreUsuario;
		@AuraEnabled global String tipoUsuario;
		@AuraEnabled global String usuarioMdf;
		@AuraEnabled global String flagURL;
        
        global Profiled(){
            System.debug('WRAPPER_Inicio.Profiled');
        }
	}

	global class ListaProductos {
		@AuraEnabled global Producto producto;
        
        global ListaProductos(){
            System.debug('WRAPPER_Inicio.ListaProductos');
        }
	}

	global class PermisosSubprod {
		@AuraEnabled global String codPermiso;
		@AuraEnabled global Integer codigoSubProducto;
		@AuraEnabled global List<ListaMetodosPago> listaMetodosPago;
		@AuraEnabled global String necesTipo;
		@AuraEnabled global String necesitaCuenta;
        
        global PermisosSubprod(){
            System.debug('WRAPPER_Inicio.PermisosSubprod');
        }
	}

	global class Corporates {
		@AuraEnabled global Integer codigoCorporate;
		@AuraEnabled global String nombreCorporate;
		@AuraEnabled global String numDocumento;
        
        global Corporates(){
            System.debug('WRAPPER_Inicio.Corporates');
        }
	}

	global class Idioma {
		@AuraEnabled global String IDIOMA_ISO;
		@AuraEnabled global String DIALECTO_ISO;
        
        global Idioma(){
            System.debug('WRAPPER_Inicio.Idioma');
        }
	}

	global class ListaMetodosPago {
        global ListaMetodosPago(){
            System.debug('WRAPPER_Inicio.ListaMetodosPago');
        }
	}

	global class CuentasArbol {
		@AuraEnabled global String codPais;
		@AuraEnabled global Integer codigoCuenta;
		@AuraEnabled global String codigoDivisa;
		@AuraEnabled global String cuentaExtracto;
		@AuraEnabled global String nombreCorporate;
		@AuraEnabled global List<PermisosSubprod_Z> permisosSubprod;
        global CuentasArbol(){
            System.debug('WRAPPER_Inicio.CuentasArbol');
        }
	}

	global class Sub_productos {
		@AuraEnabled global Sub_producto_perfil sub_producto_perfil;
        
        global Sub_productos(){
            System.debug('WRAPPER_Inicio.Sub_productos');
        }
	}

	global class Inicio {
		@AuraEnabled global User user;
		@AuraEnabled global Profiled profiled;
		@AuraEnabled global List<Lista_productos_perfil> lista_productos_perfil;
		@AuraEnabled global List<Lista_permisos> lista_permisos;
        
        global Inicio(){
            System.debug('WRAPPER_Inicio.Inicio');
        }
	}

	global class Lista_permisos {
		@AuraEnabled global Permiso_perfil permiso_perfil;
        
        global Lista_permisos(){
            System.debug('WRAPPER_Inicio.Lista_permisos');
        }
	}

	global class PermisosSubprod_Z {
		@AuraEnabled global PermisosSubprod permisosSubprod;
        
        global PermisosSubprod_Z(){
            System.debug('WRAPPER_Inicio.PermisosSubprod_Z');
        }
	}

	global class ListaPais {
		@AuraEnabled global Pais pais;
        
        global ListaPais(){
            System.debug('WRAPPER_Inicio.ListaPais');
        }
	}

	global class Servicio {
		@AuraEnabled global String codServicio;
		@AuraEnabled global List<ListaPais> listaPais;
		@AuraEnabled global Object listaPaisesAr;
		@AuraEnabled global List<ListaMetodosPago> listaPermisosSinMetodos;
		@AuraEnabled global String necesCuenta;
		@AuraEnabled global String necesTip;
        
        global Servicio(){
            System.debug('WRAPPER_Inicio.Servicio');
        }
	}

	global class Permiso_perfil {
		@AuraEnabled global String codPermiso;
		@AuraEnabled global Integer codSubProd;
		@AuraEnabled global String necesitaCta;
        
        global Permiso_perfil(){
            System.debug('WRAPPER_Inicio.Permiso_perfil');
        }
	}

	global class Pais {
		@AuraEnabled global String codPais;
		@AuraEnabled global List<ListaCuentas> listaCuentas;
        
        global Pais(){
            System.debug('WRAPPER_Inicio.Pais');
        }
	}

	global class Listacorporates {
		@AuraEnabled global Corporates corporates;
        
        global Listacorporates(){
            System.debug('WRAPPER_Inicio.Listacorporates');
        }
	}

	
	global static WRAPPER_Inicio parse(String json) {
		return (WRAPPER_Inicio) System.JSON.deserialize(json, WRAPPER_Inicio.class);
	}
}