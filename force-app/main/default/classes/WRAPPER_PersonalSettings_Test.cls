/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:    Personal Settings  wrapper
Test Class:     WRAPPER_PersonalSettings_Test
History
<Date>			<Author>		<Description>
06/04/2020		R. Cervino     Initial version
----------------------------------------------------------------------------------*/
@IsTest
public class WRAPPER_PersonalSettings_Test {
        
    static testMethod void testParse() {
        String json = '{'+
            '  \"personalsettings\": {'+
            '    \"apellidosUsuario\": \"Pruebas Desarrollo                                                              \",'+
            '    \"backoffice\": \"S\",'+
            '    \"checkMovil\": \"N\",'+
            '    \"codigoCliente\": 2119,'+
            '    \"codigoErc\": null,'+
            '    \"codigoFormatoCantidad\": \"01\",'+
            '    \"codigoFormatoFecha\": \"01\",'+
            '    \"codigoFormatoZona\": \"14\",'+
            '    \"dataCript\": null,'+
            '    \"direccionUsuario\": \"Calle de las pruebas GTS 123\",'+
            '    \"estado\": \"H\",'+
            '    \"fechaModificacion\": \"2020-03-25T09:16:34.000Z\",'+
            '    \"idLogin\": \"gtsfun1        \",'+
            '    \"idToken\": \"               \",'+
            '    \"idioma\": {'+
            '      \"IDIOMA_ISO\": \" es\",'+
            '      \"DIALECTO_ISO\": \"ES\"'+
            '    },'+
            '    \"indAprob\": null,'+
            '    \"indCriptoVirtual\": null,'+
            '    \"listacorporates\": ['+
            '      {'+
            '        \"corporates\": {'+
            '          \"codigoCorporate\": 2938,'+
            '          \"nombreCorporate\": \"CORPORATE GTS 1 ES\",'+
            '          \"numDocumento\": \"111111111\"'+
            '        }'+
            '      },'+
            '      {'+
            '        \"corporates\": {'+
            '          \"codigoCorporate\": 2960,'+
            '          \"nombreCorporate\": \"CORPORATE GTS 2 CL\",'+
            '          \"numDocumento\": \"222222222\"'+
            '        }'+
            '      },'+
            '      {'+
            '        \"corporates\": {'+
            '          \"codigoCorporate\": 2961,'+
            '          \"nombreCorporate\": \"CORPORATE GTS 3 AR\",'+
            '          \"numDocumento\": \"333333333\"'+
            '        }'+
            '      }'+
            '    ],'+
            '    \"mailUsuario\": \"joseda.gonzalez@servexternos.gruposantander.com\",'+
            '    \"nombreCliente\": \"TESTGTS                                                                                                                                                                                                 \",'+
            '    \"nombreFormatoCantidad\": \"###.###.###,##                                    \",'+
            '    \"nombreFormatoFecha\": \"dd/MM/yy                                          \",'+
            '    \"nombreFormatoZona\": \"GMT+1                                             \",'+
            '    \"nombreUsuario\": \"Funcional GTS\",'+
            '    \"telefonoUsuario\": \"                    \",'+
            '    \"tieneVasco\": \"N\",'+
            '    \"tipoUsuario\": \"F\",'+
            '    \"token\": \"N\",'+
            '    \"UIDModificacion\": \"SGPgtsfun211931               \",'+
            '    \"ultimoLoginKO\": \"2020-03-25T09:16:34.000Z\",'+
            '    \"ultimoLoginOK\": \"2020-04-06T15:30:16.000Z\",'+
            '    \"usuarioDumy\": \"N\",'+
            '    \"vascoID\": null'+
            '  }'+
            '}';
        WRAPPER_PersonalSettings obj = WRAPPER_PersonalSettings.parse(json);
        System.assert(obj != null);
    }
    
}