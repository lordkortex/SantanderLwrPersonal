global class Wrapper_GetProfiles {
    global Wrapper_GetProfiles(){
        System.debug('Wrapper_GetProfiles');
    }

	global class ListaCuentas {
		@AuraEnabled global CuentasArbol cuentasArbol;
        
        global ListaCuentas(){
        	System.debug('Wrapper_GetProfiles.ListaCuentas');
    	}
	}

	@AuraEnabled global Grupo_detail grupo_detail;

	global class PermisosSubprod {
		@AuraEnabled global String codPermiso;
		@AuraEnabled global Integer codigoSubProducto;
		@AuraEnabled global List<ListaMetodosPago> listaMetodosPago;
		@AuraEnabled global String necesTipo;
		@AuraEnabled global String necesitaCuenta;
        
        global PermisosSubprod(){
        	System.debug('Wrapper_GetProfiles.PermisosSubprod');
    	}
	}

	global class ListaServicios {
		@AuraEnabled global Servicio servicio;
        
        global ListaServicios(){
        	System.debug('Wrapper_GetProfiles.ListaServicios');
    	}
	}

	global class ListaMetodosPago {
        global ListaMetodosPago(){
        	System.debug('Wrapper_GetProfiles.ListaMetodosPago');
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
        	System.debug('Wrapper_GetProfiles.CuentasArbol');
    	}
	}

	global class Servicio_Z {
		@AuraEnabled global String codServicio;
		@AuraEnabled global String necesCuenta;
		@AuraEnabled global String necesTip;
        
        global Servicio_Z(){
        	System.debug('Wrapper_GetProfiles.Servicio_Z');
    	}
	}

	global class PermisosSubprod_Z {
		@AuraEnabled global PermisosSubprod permisosSubprod;
        
        global PermisosSubprod_Z(){
        	System.debug('Wrapper_GetProfiles.PermisosSubprod_Z');
    	}
	}

	global class ListaPais {
		@AuraEnabled global Pais pais;
        
        global ListaPais(){
        	System.debug('Wrapper_GetProfiles.ListaPais');
    	}
	}

	global class Servicio {
		@AuraEnabled global String codServicio;
		@AuraEnabled global List<ListaPais> listaPais;
		@AuraEnabled global List<ListaMetodosPago> listaPaisesAR;
		@AuraEnabled global List<ListaMetodosPago> listaPermisosSinMetodos;
		@AuraEnabled global String necesCuenta;
		@AuraEnabled global String necesTip;
        
        global Servicio(){
        	System.debug('Wrapper_GetProfiles.Servicio');
    	}
	}

	global class ListaServiciosGrupoEmpresarial {
		@AuraEnabled global Servicio_Z servicio;
        
        global ListaServiciosGrupoEmpresarial(){
        	System.debug('Wrapper_GetProfiles.ListaServiciosGrupoEmpresarial');
    	}
	}

	global class Grupo_detail {
		@AuraEnabled global String estado;
		@AuraEnabled global String fechaMdf;
		@AuraEnabled global Integer indInterno;
		@AuraEnabled global List<ListaServicios> listaServicios;
		@AuraEnabled global List<ListaServiciosGrupoEmpresarial> listaServiciosGrupoEmpresarial;
		@AuraEnabled global String nombreCliente;
		@AuraEnabled global String nombreGrupo;
		@AuraEnabled global String usuarioMdf;
        
        global Grupo_detail(){
        	System.debug('Wrapper_GetProfiles.Grupo_detail');
    	}
	}

	global class Pais {
		@AuraEnabled global String codPais;
		@AuraEnabled global List<ListaCuentas> listaCuentas;
        
        global Pais(){
        	System.debug('Wrapper_GetProfiles.Pais');
    	}
	}

	
	global static Wrapper_GetProfiles parse(String json) {
		return (Wrapper_GetProfiles) System.JSON.deserialize(json, Wrapper_GetProfiles.class);
	}
}