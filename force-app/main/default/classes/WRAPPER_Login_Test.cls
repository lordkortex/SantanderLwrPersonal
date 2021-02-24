/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for WRAPPER_Login
History
<Date>			<Author>		    <Description>
19/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@IsTest
public class WRAPPER_Login_Test {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'  \"inicio\": {'+
		'    \"user\": {'+
		'      \"apellidosUsuario\": \"DOS                                                                             \",'+
		'      \"backoffice\": \"S\",'+
		'      \"checkMovil\": \"N\",'+
		'      \"codigoCliente\": 7,'+
		'      \"codigoErc\": null,'+
		'      \"codigoFormatoCantidad\": \"01\",'+
		'      \"codigoFormatoFecha\": \"01\",'+
		'      \"codigoFormatoZona\": \"14\",'+
		'      \"dataCript\": null,'+
		'      \"direccionUsuario\": \"Calle Pruebas GTS Core 2\",'+
		'      \"estado\": \"H\",'+
		'      \"fechaModificacion\": \"2019-12-17T14:29:53.000Z\",'+
		'      \"idLogin\": \"fungts2        \",'+
		'      \"idToken\": \"               \",'+
		'      \"idioma\": {'+
		'        \"IDIOMA_ISO\": \" es\",'+
		'        \"DIALECTO_ISO\": \"ES\"'+
		'      },'+
		'      \"indAprob\": null,'+
		'      \"indCriptoVirtual\": null,'+
		'      \"listacorporates\": ['+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1,'+
		'            \"nombreCorporate\": \"TESTPORTARG\",'+
		'            \"numDocumento\": \"13456789001111111111\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2,'+
		'            \"nombreCorporate\": \"TESTPORTBR\",'+
		'            \"numDocumento\": \"12345678903456111111\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 3,'+
		'            \"nombreCorporate\": \"TESTPORTMEX                                                                                                                                                                                             \",'+
		'            \"numDocumento\": \"RFC56678909878      \"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 4,'+
		'            \"nombreCorporate\": \"TESTPORTCHI\",'+
		'            \"numDocumento\": \"23456789012F\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 5,'+
		'            \"nombreCorporate\": \"TESTPORTESP\",'+
		'            \"numDocumento\": \"A78676776689\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 6,'+
		'            \"nombreCorporate\": \"TESTPORTPRT                                                                                                                                                                                             \",'+
		'            \"numDocumento\": \"690008890980        \"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 8,'+
		'            \"nombreCorporate\": \"ISBAN-SPAIN\",'+
		'            \"numDocumento\": \"A79194148111\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1188,'+
		'            \"nombreCorporate\": \"pruebas mas de mil\",'+
		'            \"numDocumento\": \"11111111H\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1194,'+
		'            \"nombreCorporate\": \"TEST RECUPERAR CUENTA                                                                                                                                                                                   \",'+
		'            \"numDocumento\": \"Q1234556            \"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1218,'+
		'            \"nombreCorporate\": \"TESTPORT NUEVA                                                                                                                                                                                          \",'+
		'            \"numDocumento\": \"434234234123        \"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1314,'+
		'            \"nombreCorporate\": \"Corporate 1                                                                                                                                                                                             \",'+
		'            \"numDocumento\": \"234242423           \"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1315,'+
		'            \"nombreCorporate\": \"Corporate 2                                                                                                                                                                                             \",'+
		'            \"numDocumento\": \"234234234           \"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1319,'+
		'            \"nombreCorporate\": \"pruebacertcorp\",'+
		'            \"numDocumento\": \"asdfasdf\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1477,'+
		'            \"nombreCorporate\": \"TESTPORTUYU                                                                                                                                                                                             \",'+
		'            \"numDocumento\": \"192827              \"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1481,'+
		'            \"nombreCorporate\": \"corporatePaisNumerico                                                                                                                                                                                   \",'+
		'            \"numDocumento\": \"12345678901234567890\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1489,'+
		'            \"nombreCorporate\": \"RFC56678909877                                                                                                                                                                                          \",'+
		'            \"numDocumento\": \"RFC56678909877      \"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 1500,'+
		'            \"nombreCorporate\": \"MICORP3                                                                                                                                                                                                 \",'+
		'            \"numDocumento\": \"321321213           \"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2015,'+
		'            \"nombreCorporate\": \"BAU-BO028\",'+
		'            \"numDocumento\": \"123456789\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2773,'+
		'            \"nombreCorporate\": \"TESTPORTIT\",'+
		'            \"numDocumento\": \"TESTPORTIT\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2777,'+
		'            \"nombreCorporate\": \"TESTPORTALR1801\",'+
		'            \"numDocumento\": \"122122\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2797,'+
		'            \"nombreCorporate\": \"TESTPORTUSA\",'+
		'            \"numDocumento\": \"TESTPORTUSA\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2798,'+
		'            \"nombreCorporate\": \"TESTPORTUS\",'+
		'            \"numDocumento\": \"TESTPORTUS\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2806,'+
		'            \"nombreCorporate\": \"TESTPORTUK\",'+
		'            \"numDocumento\": \"TESTPORTUK\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2839,'+
		'            \"nombreCorporate\": \"Corportate Nueva TESTPORT\",'+
		'            \"numDocumento\": \"1232132323\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2840,'+
		'            \"nombreCorporate\": \"TestCorpPrueba1\",'+
		'            \"numDocumento\": \"TestCorpPrueba1\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"corporates\": {'+
		'            \"codigoCorporate\": 2847,'+
		'            \"nombreCorporate\": \"TESTCORPCO\",'+
		'            \"numDocumento\": \"TESTCORPCO\"'+
		'          }'+
		'        }'+
		'      ],'+
		'      \"mailUsuario\": \"fungts2@nexus.com   \",'+
		'      \"nombreCliente\": \"TESTPORTAL                                                                                                                                                                                              \",'+
		'      \"nombreFormatoCantidad\": \"###.###.###,##                                    \",'+
		'      \"nombreFormatoFecha\": \"dd/MM/yy                                          \",'+
		'      \"nombreFormatoZona\": \"GMT+1                                             \",'+
		'      \"nombreUsuario\": \"FUNCIONAL GTS\",'+
		'      \"telefonoUsuario\": \"                    \",'+
		'      \"tieneVasco\": \"N\",'+
		'      \"tipoUsuario\": \"F\",'+
		'      \"token\": \"N\",'+
		'      \"UIDModificacion\": \"xIS02342                      \",'+
		'      \"ultimoLoginKo\": null,'+
		'      \"ultimoLoginOk\": null,'+
		'      \"usuarioDumy\": \"N\",'+
		'      \"vascoId\": null'+
		'    },'+
		'    \"profiled\": {'+
		'      \"apellidosUsuario\": \"funjmrol1                                                                       \",'+
		'      \"clienteIfi\": null,'+
		'      \"codigoCliente\": 7,'+
		'      \"codigoGrupo\": 292,'+
		'      \"codigoRol\": 1,'+
		'      \"estado\": \"H\",'+
		'      \"fechaMdf\": \"2019-12-27T08:55:09.000Z\",'+
		'      \"idLogin\": \"funjmrol1      \",'+
		'      \"listaProductos\": ['+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 2,'+
		'            \"codigoSubProducto\": 9,'+
		'            \"ordenProducto\": 2,'+
		'            \"ordenSubproducto\": 4'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 2,'+
		'            \"codigoSubProducto\": 10,'+
		'            \"ordenProducto\": 2,'+
		'            \"ordenSubproducto\": 5'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 8,'+
		'            \"codigoSubProducto\": 83,'+
		'            \"ordenProducto\": 6,'+
		'            \"ordenSubproducto\": 3'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 8,'+
		'            \"codigoSubProducto\": 81,'+
		'            \"ordenProducto\": 6,'+
		'            \"ordenSubproducto\": 1'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 8,'+
		'            \"codigoSubProducto\": 82,'+
		'            \"ordenProducto\": 6,'+
		'            \"ordenSubproducto\": 2'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 2,'+
		'            \"codigoSubProducto\": 7,'+
		'            \"ordenProducto\": 2,'+
		'            \"ordenSubproducto\": 1'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 2,'+
		'            \"codigoSubProducto\": 8,'+
		'            \"ordenProducto\": 2,'+
		'            \"ordenSubproducto\": 2'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 2,'+
		'            \"codigoSubProducto\": 12,'+
		'            \"ordenProducto\": 2,'+
		'            \"ordenSubproducto\": 3'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 2,'+
		'            \"codigoSubProducto\": 11,'+
		'            \"ordenProducto\": 2,'+
		'            \"ordenSubproducto\": 6'+
		'          }'+
		'        },'+
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
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 1,'+
		'            \"codigoSubProducto\": 30,'+
		'            \"ordenProducto\": 1,'+
		'            \"ordenSubproducto\": 4'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 4,'+
		'            \"codigoSubProducto\": 4,'+
		'            \"ordenProducto\": 4,'+
		'            \"ordenSubproducto\": 2'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 4,'+
		'            \"codigoSubProducto\": 3,'+
		'            \"ordenProducto\": 4,'+
		'            \"ordenSubproducto\": 1'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 4,'+
		'            \"codigoSubProducto\": 91,'+
		'            \"ordenProducto\": 4,'+
		'            \"ordenSubproducto\": 4'+
		'          }'+
		'        },'+
		'        {'+
		'          \"producto\": {'+
		'            \"codigoProducto\": 4,'+
		'            \"codigoSubProducto\": 90,'+
		'            \"ordenProducto\": 4,'+
		'            \"ordenSubproducto\": 3'+
		'          }'+
		'        }'+
		'      ],'+
		'      \"listadoServicios\": ['+
		'        {'+
		'          \"servicio\": {'+
		'            \"codServicio\": \"BE\",'+
		'            \"listaPais\": [],'+
		'            \"listaPaisesAr\": null,'+
		'            \"listaPermisosSinMetodos\": ['+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"crm\",'+
		'                  \"codigoSubproducto\": 9'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"eli\",'+
		'                  \"codigoSubproducto\": 9'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"ver\",'+
		'                  \"codigoSubproducto\": 9'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"apr\",'+
		'                  \"codigoSubproducto\": 10'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"ver\",'+
		'                  \"codigoSubproducto\": 10'+
		'                }'+
		'              }'+
		'            ],'+
		'            \"necesCuenta\": \"N\",'+
		'            \"necesTip\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"servicio\": {'+
		'            \"codServicio\": \"UP\",'+
		'            \"listaPais\": [],'+
		'            \"listaPaisesAr\": null,'+
		'            \"listaPermisosSinMetodos\": ['+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"ver\",'+
		'                  \"codigoSubproducto\": 83'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"ope\",'+
		'                  \"codigoSubproducto\": 81'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"ope\",'+
		'                  \"codigoSubproducto\": 82'+
		'                }'+
		'              }'+
		'            ],'+
		'            \"necesCuenta\": \"N\",'+
		'            \"necesTip\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"servicio\": {'+
		'            \"codServicio\": \"PA\",'+
		'            \"listaPais\": ['+
		'              {'+
		'                \"pais\": {'+
		'                  \"codPais\": \"AR\",'+
		'                  \"listaCuentas\": ['+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"AR\",'+
		'                        \"codigoCuenta\": 1312,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"0000000000288044                                  \",'+
		'                        \"nombreCorporate\": \"TESTPORTESP\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"pam\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"SA\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"SG\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"MT\",'+
		'                                    \"codTipoPago\": \"XX\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"apr\",'+
		'                              \"codigoSubProducto\": 8,'+
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
		'                        \"codigoCuenta\": 2700,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"AAA34234234                                       \",'+
		'                        \"nombreCorporate\": \"TESTPORTARG\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"crm\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"SA\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"eli\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"SA\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"pam\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"SA\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"SA\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"apr\",'+
		'                              \"codigoSubProducto\": 8,'+
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
		'                        \"codigoCuenta\": 2701,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"342333                                            \",'+
		'                        \"nombreCorporate\": \"TESTPORTARG\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"crm\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"eli\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"pam\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"apr\",'+
		'                              \"codigoSubProducto\": 8,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 8,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"stp\",'+
		'                              \"codigoSubProducto\": 12,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 12,'+
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
		'                        \"codigoCuenta\": 2703,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"PRUEBA ARGENTINA                                  \",'+
		'                        \"nombreCorporate\": \"TESTPORTARG\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"crm\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"eli\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"pam\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"apr\",'+
		'                              \"codigoSubProducto\": 8,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 8,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"stp\",'+
		'                              \"codigoSubProducto\": 12,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 12,'+
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
		'                        \"codigoCuenta\": 2704,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"PILI PRUEBA 1                                     \",'+
		'                        \"nombreCorporate\": \"TESTPORTARG\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"crm\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"eli\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"pam\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"apr\",'+
		'                              \"codigoSubProducto\": 8,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 8,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"stp\",'+
		'                              \"codigoSubProducto\": 12,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 12,'+
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
		'                        \"codigoCuenta\": 6536,'+
		'                        \"codigoDivisa\": \"ARS\",'+
		'                        \"cuentaExtracto\": \"0726666666666666666015                            \",'+
		'                        \"nombreCorporate\": \"ISBAN-SPAIN\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"crm\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"SA\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"SG\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"MT\",'+
		'                                    \"codTipoPago\": \"XX\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"eli\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"SA\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"SG\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"MT\",'+
		'                                    \"codTipoPago\": \"XX\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"pam\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"SA\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"SG\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"MT\",'+
		'                                    \"codTipoPago\": \"XX\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 7,'+
		'                              \"listaMetodosPago\": ['+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PR\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"PT\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"TR\",'+
		'                                    \"codTipoPago\": \"SA\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"CH\",'+
		'                                    \"codTipoPago\": \"SG\"'+
		'                                  }'+
		'                                },'+
		'                                {'+
		'                                  \"metodosPago\": {'+
		'                                    \"codMedioPago\": \"MT\",'+
		'                                    \"codTipoPago\": \"XX\"'+
		'                                  }'+
		'                                }'+
		'                              ],'+
		'                              \"necesTipo\": \"S\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"apr\",'+
		'                              \"codigoSubProducto\": 8,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 8,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"stp\",'+
		'                              \"codigoSubProducto\": 12,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ver\",'+
		'                              \"codigoSubProducto\": 12,'+
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
		'            \"listaPermisosSinMetodos\": ['+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"ver\",'+
		'                  \"codigoSubproducto\": 11'+
		'                }'+
		'              }'+
		'            ],'+
		'            \"necesCuenta\": \"S\",'+
		'            \"necesTip\": \"S\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"servicio\": {'+
		'            \"codServicio\": \"RE\",'+
		'            \"listaPais\": ['+
		'              {'+
		'                \"pais\": {'+
		'                  \"codPais\": \"BE\",'+
		'                  \"listaCuentas\": ['+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"BE\",'+
		'                        \"codigoCuenta\": 2722,'+
		'                        \"codigoDivisa\": \"EUR\",'+
		'                        \"cuentaExtracto\": \"999123                                            \",'+
		'                        \"nombreCorporate\": \"ISBAN-SPAIN\",'+
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
		'                          }'+
		'                        ]'+
		'                      }'+
		'                    }'+
		'                  ]'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pais\": {'+
		'                  \"codPais\": \"US\",'+
		'                  \"listaCuentas\": ['+
		'                    {'+
		'                      \"cuentasArbol\": {'+
		'                        \"codPais\": \"US\",'+
		'                        \"codigoCuenta\": 6511,'+
		'                        \"codigoDivisa\": \"USD\",'+
		'                        \"cuentaExtracto\": \"CUENTA INTRADIA ALM modif                         \",'+
		'                        \"nombreCorporate\": \"TESTPORTUS\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X06\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X07\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X08\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 30,'+
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
		'                        \"codPais\": \"US\",'+
		'                        \"codigoCuenta\": 6513,'+
		'                        \"codigoDivisa\": \"USD\",'+
		'                        \"cuentaExtracto\": \"PRUEBA CAPITALIZACION INTRADIA                    \",'+
		'                        \"nombreCorporate\": \"TESTPORTUS\",'+
		'                        \"permisosSubprod\": ['+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X06\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X07\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"X08\",'+
		'                              \"codigoSubProducto\": 27,'+
		'                              \"listaMetodosPago\": [],'+
		'                              \"necesTipo\": \"N\",'+
		'                              \"necesitaCuenta\": \"S\"'+
		'                            }'+
		'                          },'+
		'                          {'+
		'                            \"permisosSubprod\": {'+
		'                              \"codPermiso\": \"ope\",'+
		'                              \"codigoSubProducto\": 30,'+
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
		'            \"listaPermisosSinMetodos\": ['+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"X99\",'+
		'                  \"codigoSubproducto\": 27'+
		'                }'+
		'              }'+
		'            ],'+
		'            \"necesCuenta\": \"S\",'+
		'            \"necesTip\": \"N\"'+
		'          }'+
		'        },'+
		'        {'+
		'          \"servicio\": {'+
		'            \"codServicio\": \"SG\",'+
		'            \"listaPais\": [],'+
		'            \"listaPaisesAr\": null,'+
		'            \"listaPermisosSinMetodos\": ['+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"ver\",'+
		'                  \"codigoSubproducto\": 4'+
		'                }'+
		'              },'+
		'              {'+
		'                \"pemisos\": {'+
		'                  \"codPermiso\": \"ope\",'+
		'                  \"codigoSubproducto\": 3'+
		'                }'+
		'              }'+
		'            ],'+
		'            \"necesCuenta\": \"N\",'+
		'            \"necesTip\": \"N\"'+
		'          }'+
		'        }'+
		'      ],'+
		'      \"nombreCliente\": \"TESTPORTAL                                                                                                                                                                                              \",'+
		'      \"nombreGrupo\": \"TestportAgruXML\",'+
		'      \"nombreRol\": \"rol1\",'+
		'      \"nombreUsuario\": \"funjmrol1\",'+
		'      \"tipoUsuario\": \"F\",'+
		'      \"usuarioMdf\": \"xIS02342                      \"'+
		'    },'+
		'    \"listaProductosPerfil\": ['+
		'      {'+
		'        \"codProducto\": 2,'+
		'        \"descProducto\": \"Pagos\",'+
		'        \"ordenProducto\": 2,'+
		'        \"subProductos\": ['+
		'          {'+
		'            \"subProductoPerfil\": {'+
		'              \"codSubProd\": 7,'+
		'              \"descSubProd\": \"Pagos-iniciación\",'+
		'              \"ordenSubProd\": 1,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Pagos-iniciación\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"subProductoPerfil\": {'+
		'              \"codSubProd\": 8,'+
		'              \"descSubProd\": \"Autorizar-pagos\",'+
		'              \"ordenSubProd\": 2,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Autorizar-pagos\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"subProductoPerfil\": {'+
		'              \"codSubProd\": 12,'+
		'              \"descSubProd\": \"Warehousing\",'+
		'              \"ordenSubProd\": 3,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Warehousing\"'+
		'            }'+
		'          }'+
		'        ]'+
		'      },'+
		'      {'+
		'        \"codProducto\": 1,'+
		'        \"descProducto\": \"Balances & Transacciones\",'+
		'        \"ordenProducto\": 1,'+
		'        \"subProductos\": ['+
		'          {'+
		'            \"subProductoPerfil\": {'+
		'              \"codSubProd\": 6,'+
		'              \"descSubProd\": \"Transactions\",'+
		'              \"ordenSubProd\": 2,'+
		'              \"url\": \"BtoChannelDriver.ssobto?&dse_operationName=Transactions\"'+
		'            }'+
		'          }'+
		'        ]'+
		'      },'+
		'      {'+
		'        \"codProducto\": 8,'+
		'        \"descProducto\": \"Uploads\",'+
		'        \"ordenProducto\": 6,'+
		'        \"subProductos\": []'+
		'      },'+
		'      {'+
		'        \"codProducto\": 4,'+
		'        \"descProducto\": \"HUB\",'+
		'        \"ordenProducto\": 4,'+
		'        \"subProductos\": []'+
		'      }'+
		'    ],'+
		'    \"listaPermisos\": ['+
		'      {'+
		'        \"permisoPerfil\": {'+
		'          \"codPermiso\": \"X99\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"N\"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"permisoPerfil\": {'+
		'          \"codPermiso\": \"X05\",'+
		'          \"codSubProd\": 27,'+
		'          \"necesitaCta\": \"S\"'+
		'        }'+
		'      }'+
		'    ]'+
		'  },'+
		'  \"pantalla\": {'+
		'    \"balances\": {'+
		'      \"balancesArbol\": ['+
		'        {'+
		'          \"paisArbol\": {'+
		'            \"codPais\": \"AR\",'+
		'            \"divisaUsuario\": \"EUR\",'+
		'            \"listaMonedasArbol\": ['+
		'              {'+
		'                \"monedaArbol\": {'+
		'                  \"divisaCuenta\": \"ARS\",'+
		'                  \"listacuentasarbol\": ['+
		'                    {'+
		'                      \"cuentaArbol\": {'+
		'                        \"aliasCuentaPerfilado\": null,'+
		'                        \"aliasEntidad\": null,'+
		'                        \"bookBalance\": 4000,'+
		'                        \"bookDate\": \"2015-11-04T23:00:00.000Z\",'+
		'                        \"codigoBic\": {'+
		'                          \"branch\": null,'+
		'                          \"entidadbic\": null,'+
		'                          \"locatorbic\": null,'+
		'                          \"paisbic\": null'+
		'                        },'+
		'                        \"codigoCorporate\": 4,'+
		'                        \"codigoCuenta\": 1260,'+
		'                        \"cuentaExtracto\": \"0000000000288914                                  \",'+
		'                        \"divisa\": \"ARS\",'+
		'                        \"nombreCorporate\": \"TESTPORTCHI\",'+
		'                        \"nombreEmisora\": \"BANCO SANTANDER RIO\",'+
		'                        \"valueBalance\": 4000,'+
		'                        \"valueDate\": \"0001-12-31T23:00:00.000Z\"'+
		'                      }'+
		'                    }'+
		'                  ],'+
		'                  \"sumBookBalance\": 4000,'+
		'                  \"sumValueBalance\": 4000'+
		'                }'+
		'              }'+
		'            ],'+
		'            \"sumBookBalanceDivUsu\": 68457326.40518,'+
		'            \"sumValueBalanceDivUsu\": 680810.54774'+
		'          }'+
		'        }'+
		'      ],'+
		'      \"listaDivisa\": [],'+
		'      \"descripcionConversion\": \"USD=1,07659 31-12-2017; GBP=1,07659 31-12-2017; ARS=10,267 05-01-2015; MXN=17,857 05-01-2015; CLP=737,8 05-01-2015; PYG=0,00017 ; BRL=3,2571 05-01-2015\",'+
		'      \"listaTipCambio\": ['+
		'        {'+
		'          \"tipoDeCambio\": {'+
		'            \"claError\": null,'+
		'            \"divisa\": \"EUR\",'+
		'            \"fecha\": null,'+
		'            \"importe\": 1,'+
		'            \"importeDecimal\": \"+1,00000000\",'+
		'            \"nombreDivisa\": null,'+
		'            \"tipError\": null'+
		'          }'+
		'        }'+
		'      ]'+
		'    }'+
		'  }'+
		'}';
		WRAPPER_Login r = WRAPPER_Login.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.ListaCuentas objListaCuentas = new WRAPPER_Login.ListaCuentas(System.JSON.createParser(json));
		System.assert(objListaCuentas != null);
		System.assert(objListaCuentas.cuentasArbol == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.ListaMonedasArbol objListaMonedasArbol = new WRAPPER_Login.ListaMonedasArbol(System.JSON.createParser(json));
		System.assert(objListaMonedasArbol != null);
		System.assert(objListaMonedasArbol.monedaArbol == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.User objUser = new WRAPPER_Login.User(System.JSON.createParser(json));
		System.assert(objUser != null);
		System.assert(objUser.apellidosUsuario == null);
		System.assert(objUser.backoffice == null);
		System.assert(objUser.checkMovil == null);
		System.assert(objUser.codigoCliente == null);
		System.assert(objUser.codigoErc == null);
		System.assert(objUser.codigoFormatoCantidad == null);
		System.assert(objUser.codigoFormatoFecha == null);
		System.assert(objUser.codigoFormatoZona == null);
		System.assert(objUser.dataCript == null);
		System.assert(objUser.direccionUsuario == null);
		System.assert(objUser.estado == null);
		System.assert(objUser.fechaModificacion == null);
		System.assert(objUser.idLogin == null);
		System.assert(objUser.idToken == null);
		System.assert(objUser.idioma == null);
		System.assert(objUser.indAprob == null);
		System.assert(objUser.indCriptoVirtual == null);
		System.assert(objUser.listacorporates == null);
		System.assert(objUser.mailUsuario == null);
		System.assert(objUser.nombreCliente == null);
		System.assert(objUser.nombreFormatoCantidad == null);
		System.assert(objUser.nombreFormatoFecha == null);
		System.assert(objUser.nombreFormatoZona == null);
		System.assert(objUser.nombreUsuario == null);
		System.assert(objUser.telefonoUsuario == null);
		System.assert(objUser.tieneVasco == null);
		System.assert(objUser.tipoUsuario == null);
		System.assert(objUser.token == null);
		System.assert(objUser.UIDModificacion == null);
		System.assert(objUser.ultimoLoginKo == null);
		System.assert(objUser.ultimoLoginOk == null);
		System.assert(objUser.usuarioDumy == null);
		System.assert(objUser.vascoId == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.CodigoBic objCodigoBic = new WRAPPER_Login.CodigoBic(System.JSON.createParser(json));
		System.assert(objCodigoBic != null);
		System.assert(objCodigoBic.branch == null);
		System.assert(objCodigoBic.entidadbic == null);
		System.assert(objCodigoBic.locatorbic == null);
		System.assert(objCodigoBic.paisbic == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Producto objProducto = new WRAPPER_Login.Producto(System.JSON.createParser(json));
		System.assert(objProducto != null);
		System.assert(objProducto.codigoProducto == null);
		System.assert(objProducto.codigoSubProducto == null);
		System.assert(objProducto.ordenProducto == null);
		System.assert(objProducto.ordenSubproducto == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.MonedaArbol objMonedaArbol = new WRAPPER_Login.MonedaArbol(System.JSON.createParser(json));
		System.assert(objMonedaArbol != null);
		System.assert(objMonedaArbol.divisaCuenta == null);
		System.assert(objMonedaArbol.listacuentasarbol == null);
		System.assert(objMonedaArbol.sumBookBalance == null);
		System.assert(objMonedaArbol.sumValueBalance == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.TipoDeCambio objTipoDeCambio = new WRAPPER_Login.TipoDeCambio(System.JSON.createParser(json));
		System.assert(objTipoDeCambio != null);
		System.assert(objTipoDeCambio.claError == null);
		System.assert(objTipoDeCambio.divisa == null);
		System.assert(objTipoDeCambio.fecha == null);
		System.assert(objTipoDeCambio.importe == null);
		System.assert(objTipoDeCambio.importeDecimal == null);
		System.assert(objTipoDeCambio.nombreDivisa == null);
		System.assert(objTipoDeCambio.tipError == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.BalancesArbol objBalancesArbol = new WRAPPER_Login.BalancesArbol(System.JSON.createParser(json));
		System.assert(objBalancesArbol != null);
		System.assert(objBalancesArbol.paisArbol == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.PermisosSubprod objPermisosSubprod = new WRAPPER_Login.PermisosSubprod(System.JSON.createParser(json));
		System.assert(objPermisosSubprod != null);
		System.assert(objPermisosSubprod.codPermiso == null);
		System.assert(objPermisosSubprod.codigoSubProducto == null);
		System.assert(objPermisosSubprod.listaMetodosPago == null);
		System.assert(objPermisosSubprod.necesTipo == null);
		System.assert(objPermisosSubprod.necesitaCuenta == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Corporates objCorporates = new WRAPPER_Login.Corporates(System.JSON.createParser(json));
		System.assert(objCorporates != null);
		System.assert(objCorporates.codigoCorporate == null);
		System.assert(objCorporates.nombreCorporate == null);
		System.assert(objCorporates.numDocumento == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.CuentasArbol objCuentasArbol = new WRAPPER_Login.CuentasArbol(System.JSON.createParser(json));
		System.assert(objCuentasArbol != null);
		System.assert(objCuentasArbol.codPais == null);
		System.assert(objCuentasArbol.codigoCuenta == null);
		System.assert(objCuentasArbol.codigoDivisa == null);
		System.assert(objCuentasArbol.cuentaExtracto == null);
		System.assert(objCuentasArbol.nombreCorporate == null);
		System.assert(objCuentasArbol.permisosSubprod == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Inicio objInicio = new WRAPPER_Login.Inicio(System.JSON.createParser(json));
		System.assert(objInicio != null);
		System.assert(objInicio.user == null);
		System.assert(objInicio.profiled == null);
		System.assert(objInicio.listaProductosPerfil == null);
		System.assert(objInicio.listaPermisos == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.MetodosPago objMetodosPago = new WRAPPER_Login.MetodosPago(System.JSON.createParser(json));
		System.assert(objMetodosPago != null);
		System.assert(objMetodosPago.codMedioPago == null);
		System.assert(objMetodosPago.codTipoPago == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.PermisoPerfil objPermisoPerfil = new WRAPPER_Login.PermisoPerfil(System.JSON.createParser(json));
		System.assert(objPermisoPerfil != null);
		System.assert(objPermisoPerfil.codPermiso == null);
		System.assert(objPermisoPerfil.codSubProd == null);
		System.assert(objPermisoPerfil.necesitaCta == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.ListaPais objListaPais = new WRAPPER_Login.ListaPais(System.JSON.createParser(json));
		System.assert(objListaPais != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Listacuentasarbol objListacuentasarbol = new WRAPPER_Login.Listacuentasarbol(System.JSON.createParser(json));
		System.assert(objListacuentasarbol != null);
		System.assert(objListacuentasarbol.cuentaArbol == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.PaisArbol objPaisArbol = new WRAPPER_Login.PaisArbol(System.JSON.createParser(json));
		System.assert(objPaisArbol != null);
		System.assert(objPaisArbol.codPais == null);
		System.assert(objPaisArbol.divisaUsuario == null);
		System.assert(objPaisArbol.listaMonedasArbol == null);
		System.assert(objPaisArbol.sumBookBalanceDivUsu == null);
		System.assert(objPaisArbol.sumValueBalanceDivUsu == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Pais objPais = new WRAPPER_Login.Pais(System.JSON.createParser(json));
		System.assert(objPais != null);
		System.assert(objPais.codPais == null);
		System.assert(objPais.listaCuentas == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Listacorporates objListacorporates = new WRAPPER_Login.Listacorporates(System.JSON.createParser(json));
		System.assert(objListacorporates != null);
		System.assert(objListacorporates.corporates == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.ListaProductosPerfil objListaProductosPerfil = new WRAPPER_Login.ListaProductosPerfil(System.JSON.createParser(json));
		System.assert(objListaProductosPerfil != null);
		System.assert(objListaProductosPerfil.codProducto == null);
		System.assert(objListaProductosPerfil.descProducto == null);
		System.assert(objListaProductosPerfil.ordenProducto == null);
		System.assert(objListaProductosPerfil.subProductos == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.SubProductoPerfil objSubProductoPerfil = new WRAPPER_Login.SubProductoPerfil(System.JSON.createParser(json));
		System.assert(objSubProductoPerfil != null);
		System.assert(objSubProductoPerfil.codSubProd == null);
		System.assert(objSubProductoPerfil.descSubProd == null);
		System.assert(objSubProductoPerfil.ordenSubProd == null);
		System.assert(objSubProductoPerfil.url == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.ListaPermisos objListaPermisos = new WRAPPER_Login.ListaPermisos(System.JSON.createParser(json));
		System.assert(objListaPermisos != null);
		System.assert(objListaPermisos.permisoPerfil == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.ListadoServicios objListadoServicios = new WRAPPER_Login.ListadoServicios(System.JSON.createParser(json));
		System.assert(objListadoServicios != null);
		System.assert(objListadoServicios.servicio == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Profiled objProfiled = new WRAPPER_Login.Profiled(System.JSON.createParser(json));
		System.assert(objProfiled != null);
		System.assert(objProfiled.apellidosUsuario == null);
		System.assert(objProfiled.clienteIfi == null);
		System.assert(objProfiled.codigoCliente == null);
		System.assert(objProfiled.codigoGrupo == null);
		System.assert(objProfiled.codigoRol == null);
		System.assert(objProfiled.estado == null);
		System.assert(objProfiled.fechaMdf == null);
		System.assert(objProfiled.idLogin == null);
		System.assert(objProfiled.listaProductos == null);
		System.assert(objProfiled.listadoServicios == null);
		System.assert(objProfiled.nombreCliente == null);
		System.assert(objProfiled.nombreGrupo == null);
		System.assert(objProfiled.nombreRol == null);
		System.assert(objProfiled.nombreUsuario == null);
		System.assert(objProfiled.tipoUsuario == null);
		System.assert(objProfiled.usuarioMdf == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.ListaProductos objListaProductos = new WRAPPER_Login.ListaProductos(System.JSON.createParser(json));
		System.assert(objListaProductos != null);
		System.assert(objListaProductos.producto == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.CuentaArbol objCuentaArbol = new WRAPPER_Login.CuentaArbol(System.JSON.createParser(json));
		System.assert(objCuentaArbol != null);
		System.assert(objCuentaArbol.aliasCuentaPerfilado == null);
		System.assert(objCuentaArbol.aliasEntidad == null);
		System.assert(objCuentaArbol.bookBalance == null);
		System.assert(objCuentaArbol.bookDate == null);
		System.assert(objCuentaArbol.codigoBic == null);
		System.assert(objCuentaArbol.codigoCorporate == null);
		System.assert(objCuentaArbol.codigoCuenta == null);
		System.assert(objCuentaArbol.cuentaExtracto == null);
		System.assert(objCuentaArbol.divisa == null);
		System.assert(objCuentaArbol.nombreCorporate == null);
		System.assert(objCuentaArbol.nombreEmisora == null);
		System.assert(objCuentaArbol.valueBalance == null);
		System.assert(objCuentaArbol.valueDate == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Balances objBalances = new WRAPPER_Login.Balances(System.JSON.createParser(json));
		System.assert(objBalances != null);
		System.assert(objBalances.balancesArbol == null);
		System.assert(objBalances.listaDivisa == null);
		System.assert(objBalances.descripcionConversion == null);
		System.assert(objBalances.listaTipCambio == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Pantalla objPantalla = new WRAPPER_Login.Pantalla(System.JSON.createParser(json));
		System.assert(objPantalla != null);
		System.assert(objPantalla.balances == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.ListaPermisosSinMetodos objListaPermisosSinMetodos = new WRAPPER_Login.ListaPermisosSinMetodos(System.JSON.createParser(json));
		System.assert(objListaPermisosSinMetodos != null);
		System.assert(objListaPermisosSinMetodos.pemisos == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.SubProductos objSubProductos = new WRAPPER_Login.SubProductos(System.JSON.createParser(json));
		System.assert(objSubProductos != null);
		System.assert(objSubProductos.subProductoPerfil == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Idioma objIdioma = new WRAPPER_Login.Idioma(System.JSON.createParser(json));
		System.assert(objIdioma != null);
		System.assert(objIdioma.IDIOMA_ISO == null);
		System.assert(objIdioma.DIALECTO_ISO == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.ListaTipCambio objListaTipCambio = new WRAPPER_Login.ListaTipCambio(System.JSON.createParser(json));
		System.assert(objListaTipCambio != null);
		System.assert(objListaTipCambio.tipoDeCambio == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.ListaMetodosPago objListaMetodosPago = new WRAPPER_Login.ListaMetodosPago(System.JSON.createParser(json));
		System.assert(objListaMetodosPago != null);
		System.assert(objListaMetodosPago.metodosPago == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login objWRAPPER_Login = new WRAPPER_Login(System.JSON.createParser(json));
		System.assert(objWRAPPER_Login != null);
		System.assert(objWRAPPER_Login.inicio == null);
		System.assert(objWRAPPER_Login.pantalla == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Servicio objServicio = new WRAPPER_Login.Servicio(System.JSON.createParser(json));
		System.assert(objServicio != null);
		System.assert(objServicio.codServicio == null);
		System.assert(objServicio.listaPais == null);
		System.assert(objServicio.listaPaisesAr == null);
		System.assert(objServicio.listaPermisosSinMetodos == null);
		System.assert(objServicio.necesCuenta == null);
		System.assert(objServicio.necesTip == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.PermisosSubprod_Z objPermisosSubprod_Z = new WRAPPER_Login.PermisosSubprod_Z(System.JSON.createParser(json));
		System.assert(objPermisosSubprod_Z != null);
		System.assert(objPermisosSubprod_Z.permisosSubprod == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Login.Pemisos objPemisos = new WRAPPER_Login.Pemisos(System.JSON.createParser(json));
		System.assert(objPemisos != null);
		System.assert(objPemisos.codPermiso == null);
		System.assert(objPemisos.codigoSubproducto == null);
	}
}