/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for WRAPPER_GroupAdmin
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@IsTest
public class WRAPPER_GroupAdmin_Test {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'  \"administration\": ['+
		'    {'+
		'      \"grupoUsuarios\": ['+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 1,'+
		'            \"idauth\": 109091,'+
		'            \"nomgruus\": \"GR TESTPORTAL\",'+
		'            \"accion\": \"M\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 2,'+
		'            \"idauth\": 109868,'+
		'            \"nomgruus\": \"GR TEST AUTORIZACION\",'+
		'            \"accion\": \"M\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 63,'+
		'            \"idauth\": 79614,'+
		'            \"nomgruus\": \"GR pruebasM\",'+
		'            \"accion\": \"M\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 101,'+
		'            \"idauth\": 9131,'+
		'            \"nomgruus\": \"grupo nuevo\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 103,'+
		'            \"idauth\": 70686,'+
		'            \"nomgruus\": \"GR1JOA\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 109,'+
		'            \"idauth\": 42304,'+
		'            \"nomgruus\": \"LaPrueba1b\",'+
		'            \"accion\": \"M\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 113,'+
		'            \"idauth\": 20095,'+
		'            \"nomgruus\": \"ruben1\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 115,'+
		'            \"idauth\": 9173,'+
		'            \"nomgruus\": \"SN3 1\",'+
		'            \"accion\": \"B\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 117,'+
		'            \"idauth\": 93266,'+
		'            \"nomgruus\": \"SN3 2\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 135,'+
		'            \"idauth\": 12761,'+
		'            \"nomgruus\": \"grupo pili NNNN\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 162,'+
		'            \"idauth\": 17261,'+
		'            \"nomgruus\": \"JoaGrupo1Copiar\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 163,'+
		'            \"idauth\": 17289,'+
		'            \"nomgruus\": \"JoaGrupo2Nuevo\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 177,'+
		'            \"idauth\": 19433,'+
		'            \"nomgruus\": \"Grupo BO109\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 180,'+
		'            \"idauth\": 20214,'+
		'            \"nomgruus\": \"GRUPO PILI\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 210,'+
		'            \"idauth\": 25759,'+
		'            \"nomgruus\": \"GRUPO1\",'+
		'            \"accion\": \"B\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 230,'+
		'            \"idauth\": 93567,'+
		'            \"nomgruus\": \"PagosGGGGGGG\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 270,'+
		'            \"idauth\": 70702,'+
		'            \"nomgruus\": \"MiGrupo\",'+
		'            \"accion\": \"B\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 278,'+
		'            \"idauth\": 109371,'+
		'            \"nomgruus\": \"grupoAdriTest\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 292,'+
		'            \"idauth\": 110083,'+
		'            \"nomgruus\": \"TestportAgruXML\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 407,'+
		'            \"idauth\": 93072,'+
		'            \"nomgruus\": \"test grupo nuevo\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 417,'+
		'            \"idauth\": 93198,'+
		'            \"nomgruus\": \"test\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 439,'+
		'            \"idauth\": 109029,'+
		'            \"nomgruus\": \"GrupoVN\",'+
		'            \"accion\": \"N\"'+
		'         }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 451,'+
		'            \"idauth\": 93594,'+
		'            \"nomgruus\": \"PRUEBAJCPRUEBA\",'+
		'            \"accion\": \"B\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 460,'+
		'            \"idauth\": 93659,'+
		'            \"nomgruus\": \"PruebaAltaGrupo\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 472,'+
		'            \"idauth\": 93783,'+
		'            \"nomgruus\": \"Pruebas VN\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 596,'+
		'            \"idauth\": 109030,'+
		'            \"nomgruus\": \"GrupoGTS\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 611,'+
		'            \"idauth\": 109469,'+
		'            \"nomgruus\": \"GRTPSERGIO\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"datosGrupos\": {'+
		'            \"codgrupr\": 624,'+
		'            \"idauth\": 110004,'+
		'            \"nomgruus\": \"GRUPOFER\",'+
		'            \"accion\": \"N\"'+
		'          }'+
		'        }'+
		'      ],'+
		'      \"reposicionamiento\": {'+
		'        \"indPaginacion\": \"N\",'+
		'        \"memento\": \"rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3Rv ckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAABdAAKc3FsX0NERU1HUnQA ATd4 \"'+
		'      }'+
		'    }'+
		'  ]'+
		'}';
		WRAPPER_GroupAdmin r = WRAPPER_GroupAdmin.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_GroupAdmin.Administration objAdministration = new WRAPPER_GroupAdmin.Administration(System.JSON.createParser(json));
		System.assert(objAdministration != null);
		System.assert(objAdministration.grupoUsuarios == null);
		System.assert(objAdministration.reposicionamiento == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_GroupAdmin.GrupoUsuarios objGrupoUsuarios = new WRAPPER_GroupAdmin.GrupoUsuarios(System.JSON.createParser(json));
		System.assert(objGrupoUsuarios != null);
		System.assert(objGrupoUsuarios.datosGrupos == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_GroupAdmin.Reposicionamiento objReposicionamiento = new WRAPPER_GroupAdmin.Reposicionamiento(System.JSON.createParser(json));
		System.assert(objReposicionamiento != null);
		System.assert(objReposicionamiento.indPaginacion == null);
		System.assert(objReposicionamiento.memento == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_GroupAdmin objWRAPPER_GroupAdmin = new WRAPPER_GroupAdmin(System.JSON.createParser(json));
		System.assert(objWRAPPER_GroupAdmin != null);
		System.assert(objWRAPPER_GroupAdmin.administration == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_GroupAdmin.DatosGrupos objDatosGrupos = new WRAPPER_GroupAdmin.DatosGrupos(System.JSON.createParser(json));
		System.assert(objDatosGrupos != null);
		System.assert(objDatosGrupos.codgrupr == null);
		System.assert(objDatosGrupos.idauth == null);
		System.assert(objDatosGrupos.nomgruus == null);
		System.assert(objDatosGrupos.accion == null);
	}
}