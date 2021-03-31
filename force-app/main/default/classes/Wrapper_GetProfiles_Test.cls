/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
19/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class Wrapper_GetProfiles_Test {
	
    @testSetup  
    static void setObjects(){
        Test.startTest();
        parseTest();
        Test.stopTest();
        setup();
    }
   
    @isTest
    static Wrapper_GetProfiles parseTest(){
         Account acct = new Account(Name = 'Test');
        String s=JSON.serialize(acct);
        return Wrapper_GetProfiles.parse(s);   
    }
    
    @isTest
		 static void setup(){
        	 Wrapper_GetProfiles.Pais pais = new Wrapper_GetProfiles.Pais();
             Wrapper_GetProfiles.Grupo_detail grupoDetail = new Wrapper_GetProfiles.Grupo_detail();
             Wrapper_GetProfiles.ListaServiciosGrupoEmpresarial grupoEmpresarial = new Wrapper_GetProfiles.ListaServiciosGrupoEmpresarial();
             Wrapper_GetProfiles.Servicio servicio = new Wrapper_GetProfiles.Servicio();
             Wrapper_GetProfiles.ListaPais listaPais = new Wrapper_GetProfiles.ListaPais();
             Wrapper_GetProfiles.PermisosSubprod_Z permisos = new Wrapper_GetProfiles.PermisosSubprod_Z();
             Wrapper_GetProfiles.Servicio_Z servicio_Z = new Wrapper_GetProfiles.Servicio_Z();
             Wrapper_GetProfiles.CuentasArbol cuentaArbol = new Wrapper_GetProfiles.CuentasArbol();
             Wrapper_GetProfiles.ListaMetodosPago metodosPago = new Wrapper_GetProfiles.ListaMetodosPago();
             Wrapper_GetProfiles.PermisosSubprod permisosProd = new Wrapper_GetProfiles.PermisosSubprod();
             Wrapper_GetProfiles.ListaCuentas listaCuentas = new Wrapper_GetProfiles.ListaCuentas();
             Wrapper_GetProfiles.ListaServicios listaServicios = new Wrapper_GetProfiles.ListaServicios();
             Wrapper_GetProfiles wrapper = new Wrapper_GetProfiles();
    	}
	

}