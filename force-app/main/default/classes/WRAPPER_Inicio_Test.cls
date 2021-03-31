/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for WRAPPER_Login
History
<Date>			<Author>		    <Description>
19/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@isTest
public with sharing class WRAPPER_Inicio_Test { 
    static testMethod void testParse() {
		String json = '{'+
		'  \"inicio\": {'+
		'    \"user\": {'+
		'      \"apellidosUsuario\": \"DOS                                                                             \",'+
		'      \"backoffice\": \"S\",'+
		'      \"checkMovil\": \"N\",'+
		'      \"codigoCliente\": 2119,'+
		'      \"codigoErc\": null,'+
		'      \"codigoFormatoCantidad\": \"01\",'+
		'      \"codigoFormatoFecha\": \"01\",'+
		'      \"codigoFormatoZona\": \"14\",'+
		'      \"dataCript\": null,'+
		'      \"direccionUsuario\": \"Calle de las Pruebas GTS 123\",'+
		'      \"estado\": \"H\",'+
		'      \"fechaModificacion\": \"2020-05-25T15:06:12.000Z\",'+
		'      \"idLogin\": \"gtsfun2        \",'+
		'      \"idToken\": \"               \",'+
		'      \"idioma\": {'+
		'        \"IDIOMA_ISO\": \" en\",'+
		'        \"DIALECTO_ISO\": \"GB\"'+
		'      },'+
		'      \"indAprob\": null,'+
		'      \"indCriptoVirtual\": null,'+
		'      \"listacorporates\": ['+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2938,'+
		'            \"nombreCorporate\": \"CORPORATE GTS 1 ES\",'+
		'            \"numDocumento\": \"111111111\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2960,'+
		'            \"nombreCorporate\": \"CORPORATE GTS 2 CL\",'+
		'            \"numDocumento\": \"222222222\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2961,'+
		'            \"nombreCorporate\": \"CORPORATE GTS 3 AR\",'+
		'            \"numDocumento\": \"333333333\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2990,'+
		'            \"nombreCorporate\": \"CORPORATE GTS 4 BR\",'+
		'            \"numDocumento\": \"444444444\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2995,'+
		'            \"nombreCorporate\": \"SUBS GTS 001-003\",'+
		'            \"numDocumento\": \"77754777833\"'+
		'          }'+
		'        }'+
		'      ],'+
		'      \"mailUsuario\": \"joseda.gonzalez@servexternos.gruposantander.com\",'+
		'      \"nombreCliente\": \"TESTGTS                                                                                                                                                                                                 \",'+
		'      \"nombreFormatoCantidad\": \"###.###.###,##                                    \",'+
		'      \"nombreFormatoFecha\": \"dd/MM/yy                                          \",'+
		'      \"nombreFormatoZona\": \"GMT+1                                             \",'+
		'      \"nombreUsuario\": \"FUNCIONAL GTS\",'+
		'      \"telefonoUsuario\": \"                    \",'+
		'      \"tieneVasco\": \"N\",'+
		'      \"tipoUsuario\": \"F\",'+
		'      \"token\": \"N\",'+
		'      \"UIDModificacion\": \"xIS02342                      \",'+
		'      \"ultimoLoginKO\": \"2020-04-01T10:12:49.000Z\",'+
		'      \"ultimoLoginOK\": \"2020-06-02T09:19:55.000Z\",'+
		'      \"usuarioDumy\": \"N\",'+
		'      \"vascoID\": null'+
		'    },'+
		'    \"profiled\": {'+
		'      \"apellidosUsuario\": \"DOS                                                                             \",'+
		'      \"clienteIFI\": \"N\",'+
		'      \"codigoCliente\": 2119,'+
		'      \"codigoGrupo\": 524,'+
		'      \"codigoRol\": 1,'+
		'      \"estado\": \"H\",'+
		'      \"fechaMdf\": \"2020-05-25T14:58:20.000Z\",'+
		'      \"idLogin\": \"gtsfun2        \",'+
		'      \"listaProductos\": ['+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 1,'+
		'            \"codigoSubProducto\": 6,'+
		'            \"ordenProducto\": 1,'+
		'            \"ordenSubproducto\": 2'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 1,'+
		'            \"codigoSubProducto\": 26,'+
		'            \"ordenProducto\": 1,'+
		'            \"ordenSubproducto\": 1'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 1,'+
		'            \"codigoSubProducto\": 27,'+
		'            \"ordenProducto\": 1,'+
		'            \"ordenSubproducto\": 6'+
		'          }'+
		'        }'+
		'      ],'+
		'      \"listadoServicios\": ['+
		'        {'+
		'          \"servicio\": {'+
		'            \"codServicio\": \"RE\",'+
		'            \"listaPais\": ['+
		'              {'+
		'                \"pais\": {'+
		'                  \"codPais\": \"ES\",'+
		'                  \"listaCuentas\": ['+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6804,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"ES6000491500051234567891                          \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 1 ES\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6899,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"ES1000490072012110458432                          \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 1 ES\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6900,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"ES8100490075473000562155                          \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 1 ES\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6901,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"ES9000490000000000000011                          \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 1 ES\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6902,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"ES4800490000000000000000                          \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 1 ES\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6945,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"ES9900490000000000000099                          \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 1 ES\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6991,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"00490007292015507000                              \",'+
		'                        \"nombreCorporate\": \"SUBS GTS 001-003\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6992,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"00490010812415819000                              \",'+
		'                        \"nombreCorporate\": \"SUBS GTS 001-003\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6993,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"00490072042710472000                              \",'+
		'                        \"nombreCorporate\": \"SUBS GTS 001-003\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6994,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"00490072032810475000                              \",'+
		'                        \"nombreCorporate\": \"SUBS GTS 001-003\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"ES\",'+
		'                        \"codigoCuenta\": 6995,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"00490072012110475000                              \",'+
		'                        \"nombreCorporate\": \"SUBS GTS 001-003\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    }'+
		'                  ]'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pais\": {'+
		'                  \"codPais\": \"BR\",'+
		'                  \"listaCuentas\": ['+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"BR\",'+
		'                        \"codigoCuenta\": 6860,'+
		'                        \"codigoDivisa\": \"BRL\",'+
		'                        \"cuentaExtracto\": \"2167130010391GTS                                  \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 1 ES\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"BR\",'+
		'                        \"codigoCuenta\": 6980,'+
		'                        \"codigoDivisa\": \"BRL\",'+
		'                        \"cuentaExtracto\": \"0001000010016399                                  \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 4 BR\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"BR\",'+
		'                        \"codigoCuenta\": 6981,'+
		'                        \"codigoDivisa\": \"BRL\",'+
		'                        \"cuentaExtracto\": \"0001000130018532                                  \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 4 BR\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    }'+
		'                  ]'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pais\": {'+
		'                  \"codPais\": \"CL\",'+
		'                  \"listaCuentas\": ['+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"CL\",'+
		'                        \"codigoCuenta\": 6861,'+
		'                        \"codigoDivisa\": \"CLP\",'+
		'                        \"cuentaExtracto\": \"00350401005100018138GTS                           \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 2 CL\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"CL\",'+
		'                        \"codigoCuenta\": 6862,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"00350401000001712683GTS                           \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 2 CL\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    }'+
		'                  ]'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pais\": {'+
		'                  \"codPais\": \"AR\",'+
		'                  \"listaCuentas\": ['+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"AR\",'+
		'                        \"codigoCuenta\": 6863,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"EX00720194005000096557GTS                         \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 3 AR\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    },'+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"AR\",'+
		'                        \"codigoCuenta\": 6864,'+
		'                        \"codigoDivisa\": \"USD\",'+
		'                        \"cuentaExtracto\": \"0000000000288006GTS                               \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 3 AR\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    }'+
		'                  ]'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pais\": {'+
		'                  \"codPais\": \"KY\",'+
		'                  \"listaCuentas\": ['+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"KY\",'+
		'                        \"codigoCuenta\": 6961,'+
		'                        \"codigoDivisa\": \"USD\",'+
		'                        \"cuentaExtracto\": \"80000221376                                       \",'+
		'                        \"nombreCorporate\": \"CORPORATE GTS 4 BR\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 6,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 26,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X01\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X02\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X03\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X04\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X05\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X95\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X96\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X97\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X98\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    }'+
		'                  ]'+
		'                }'+
		'              }'+
		'            ],'+
		'            \"listaPaisesAr\": null,'+
		'            \"listaPermisosSinMetodos\": [],'+
		'            \"necesCuenta\": \"S\",'+
		'            \"necesTip\": \"N\"'+
		'          }'+
		'        }'+
		'      ],'+
		'      \"nombreCliente\":\"TESTGTS\",'+
		'      \"nombreGrupo\": \"ReportesGTS\",'+
		'      \"nombreRol\": \"rol1\",'+
		'      \"nombreUsuario\": \"FUNCIONAL GTS\",'+
		'      \"tipoUsuario\": \"F\",'+
		'      \"usuarioMdf\": \"xIS02342                      \",'+
		'      \"flagURL\": \"BtoChannelDriver.ssobto?&dse_operationName=Balances\"'+
		'    },'+
		'    \"lista_productos_perfil\": ['+
		'      {'+
		'        \"cod_producto\": 1,'+
		'        \"desc_producto\": \"Información y reportes\",'+
		'        \"orden_producto\": 1,'+
		'        \"sub_productos\": ['+
		'          {'+
		'            \"sub_producto_perfil\": {'+
		'              \"codSubProd\": 26,'+
		'              \"descSubProd\": \"Balances\",'+
		'              \"ordenSubProd\": 1,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Balances\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"sub_producto_perfil\": {'+
		'              \"codSubProd\": 6,'+
		'              \"descSubProd\": \"Transactions\",'+
		'              \"ordenSubProd\": 2,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Transactions\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"sub_producto_perfil\": {'+
		'              \"codSubProd\": 25,'+
		'              \"descSubProd\": \"Búsqueda de Transacciones\",'+
		'              \"ordenSubProd\": 3,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Búsqueda de Transacciones\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"sub_producto_perfil\": {'+
		'              \"codSubProd\": 27,'+
		'              \"descSubProd\": \"Downloads\",'+
		'              \"ordenSubProd\": 5,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Downloads\"'+
		'            }'+
		'          }'+
		'        ]'+
		'      },'+
		'      {'+
		'        \"cod_producto\": 6,'+
		'        \"desc_producto\": \"Configuración Personal\",'+
		'        \"orden_producto\": 7,'+
		'        \"sub_productos\": ['+
		'          {'+
		'            \"sub_producto_perfil\": {'+
		'              \"codSubProd\": 1,'+
		'              \"descSubProd\": \"Settings\",'+
		'              \"ordenSubProd\": 1,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Settings\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"sub_producto_perfil\": {'+
		'              \"codSubProd\": 2,'+
		'              \"descSubProd\": \"Change password\",'+
		'              \"ordenSubProd\": 2,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Change password\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"sub_producto_perfil\": {'+
		'              \"codSubProd\": 28,'+
		'              \"descSubProd\": \"Personalize Account alias\",'+
		'              \"ordenSubProd\": 3,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Personalize Account alias\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"sub_producto_perfil\": {'+
		'              \"codSubProd\": 29,'+
		'              \"descSubProd\": \"Personalize Bank names\",'+
		'              \"ordenSubProd\": 4,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Personalize Bank names\"'+
		'            }'+
		'          }'+
		'        ]'+
		'      },'+
		'      {'+
		'        \"cod_producto\": 7,'+
		'        \"desc_producto\": \"Ayuda & Contáctenos\",'+
		'        \"orden_producto\": 8,'+
		'        \"sub_productos\": ['+
		'          {'+
		'            \"sub_producto_perfil\": {'+
		'              \"codSubProd\": 13,'+
		'              \"descSubProd\": \"Training\",'+
		'              \"ordenSubProd\": 1,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Training\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"sub_producto_perfil\": {'+
		'              \"codSubProd\": 5,'+
		'              \"descSubProd\": \"Contact Us\",'+
		'              \"ordenSubProd\": 2,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Contact Us\"'+
		'            }'+
		'          }'+
		'        ]'+
		'      }'+
		'    ],'+
		'    \"lista_permisos\": ['+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"ope\",'+
		'          \"codSubProd\": 26,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"X05\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"X95\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"ope\",'+
		'          \"codSubProd\": 6,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"X01\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"X96\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"X02\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"X97\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"X03\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"X98\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"X04\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permiso_perfil\": {'+
		'          \"codPermiso\": \"ope\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      }'+
		'    ]'+
		'  }'+
		'}';
		WRAPPER_Inicio obj = WRAPPER_Inicio.parse(json);
		System.assert(obj != null);
	}
}