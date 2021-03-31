@IsTest
public class WRAPPER_Authorizations_Test {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'  \"pending_authorizations\": {'+
		'    \"listaAutorizaciones\": ['+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111318,'+
		'          \"fecPett\": \"2020-05-26T07:32:55.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"accio\": \"B\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T07:32:55.000Z\",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111354,'+
		'          \"fecPett\": \"2020-05-26T17:04:18.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"jdnexusadmin2  , TESTPORTAL                                                                         \",'+
		'          \"accio\": \"M\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T17:04:18.000Z\",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu700508\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111360,'+
		'          \"fecPett\": \"2020-05-27T14:35:40.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"accio\": \"B\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-27T14:35:40.000Z\",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111032,'+
		'          \"fecPett\": \"2020-05-13T15:32:56.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"jdnexusadmin9  , TESTPORTAL                                                                         \",'+
		'          \"accio\": \"A\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-13T15:32:56.000Z\",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu776320\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111368,'+
		'          \"fecPett\": \"2020-05-27T16:03:53.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"accio\": \"B\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-27T16:03:53.000Z\",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111330,'+
		'          \"fecPett\": \"2020-05-26T08:49:38.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"accio\": \"B\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T08:49:38.000Z\",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111382,'+
		'          \"fecPett\": \"2020-05-28T09:51:00.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"accio\": \"B\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-28T09:51:00.000Z\",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111383,'+
		'          \"fecPett\": \"2020-05-28T09:51:35.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"jdnexusadmin2  , TESTPORTAL                                                                         \",'+
		'          \"accio\": \"M\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-28T09:51:35.000Z\",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu700508\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111336,'+
		'          \"fecPett\": \"2020-05-26T09:11:06.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"accio\": \"B\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T09:11:06.000Z\",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111353,'+
		'          \"fecPett\": \"2020-05-26T17:01:09.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"accio\": \"B\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T17:01:09.000Z\",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111339,'+
		'          \"fecPett\": \"2020-05-26T10:00:51.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"accio\": \"B\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T10:00:51.000Z\",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111340,'+
		'          \"fecPett\": \"2020-05-26T10:02:12.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"jdnexusadmin2  , TESTPORTAL                                                                         \",'+
		'          \"accio\": \"M\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T10:02:12.000Z\",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu700508\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111334,'+
		'          \"fecPett\": \"2020-05-26T08:58:05.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"jdnexusadmin2  , TESTPORTAL                                                                         \",'+
		'          \"accio\": \"M\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T08:58:05.000Z\",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu700508\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 110640,'+
		'          \"fecPett\": \"2020-05-05T08:55:15.000Z\",'+
		'          \"usuLogi\": \"jdgtsadmin     \",'+
		'          \"uidAlta\": \"SGPjdgtsa211913               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"ctipob\": \"gr\",'+
		'          \"moddec1\": \"NUEVO GRUPO GTS1                                                                                    \",'+
		'          \"accio\": \"A\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-05T08:51:00.000Z\",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"apellids\": \"Glez UNO                                                                        \",'+
		'          \"nombusua\": \"JD Administrador\",'+
		'          \"nomelemt\": \"697\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"idauth\": 111378,'+
		'          \"fecPett\": \"2020-05-28T08:58:06.000Z\",'+
		'          \"usuLogi\": \"gtsfun1        \",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"ctipob\": \"us\",'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"accio\": \"B\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-28T08:58:06.000Z\",'+
		'          \"comenta5\": \"Para eliminar directamente                                                                          \",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"indDuplicado\": null'+
		'        }'+
		'      }'+
		'    ],'+
		'    \"HAY_MAS_DATOS\": \"N\",'+
		'    \"NUM_PAGINA\": 2,'+
		'    \"totalRegistros\": 15,'+
		'    \"totalPaginas\": 1'+
		'  },'+
		'  \"requested_authorizations\": {'+
		'    \"HAY_MAS_DATOS\": \"N\",'+
		'    \"listaAutorizaciones\": ['+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"B\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T07:32:55.000Z\",'+
		'          \"fecPett\": \"2020-05-26T07:32:55.000Z\",'+
		'          \"idauth\": 111318,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"M\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T17:04:18.000Z\",'+
		'          \"fecPett\": \"2020-05-26T17:04:18.000Z\",'+
		'          \"idauth\": 111354,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"jdnexusadmin2  , TESTPORTAL                                                                         \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu700508\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"B\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-27T14:35:40.000Z\",'+
		'          \"fecPett\": \"2020-05-27T14:35:40.000Z\",'+
		'          \"idauth\": 111360,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"A\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-13T15:32:56.000Z\",'+
		'          \"fecPett\": \"2020-05-13T15:32:56.000Z\",'+
		'          \"idauth\": 111032,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"jdnexusadmin9  , TESTPORTAL                                                                         \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu776320\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"B\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-27T16:03:53.000Z\",'+
		'          \"fecPett\": \"2020-05-27T16:03:53.000Z\",'+
		'          \"idauth\": 111368,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"B\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T08:49:38.000Z\",'+
		'          \"fecPett\": \"2020-05-26T08:49:38.000Z\",'+
		'          \"idauth\": 111330,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"B\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-28T09:51:00.000Z\",'+
		'          \"fecPett\": \"2020-05-28T09:51:00.000Z\",'+
		'          \"idauth\": 111382,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"M\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-28T09:51:35.000Z\",'+
		'          \"fecPett\": \"2020-05-28T09:51:35.000Z\",'+
		'          \"idauth\": 111383,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"jdnexusadmin2  , TESTPORTAL                                                                         \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu700508\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"B\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T09:11:06.000Z\",'+
		'          \"fecPett\": \"2020-05-26T09:11:06.000Z\",'+
		'          \"idauth\": 111336,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"B\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T17:01:09.000Z\",'+
		'          \"fecPett\": \"2020-05-26T17:01:09.000Z\",'+
		'          \"idauth\": 111353,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"B\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"Para Eliminar directamente                                                                          \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T10:00:51.000Z\",'+
		'          \"fecPett\": \"2020-05-26T10:00:51.000Z\",'+
		'          \"idauth\": 111339,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"M\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T10:02:12.000Z\",'+
		'          \"fecPett\": \"2020-05-26T10:02:12.000Z\",'+
		'          \"idauth\": 111340,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"jdnexusadmin2  , TESTPORTAL                                                                         \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu700508\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"M\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-26T08:58:05.000Z\",'+
		'          \"fecPett\": \"2020-05-26T08:58:05.000Z\",'+
		'          \"idauth\": 111334,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"jdnexusadmin2  , TESTPORTAL                                                                         \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu700508\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"A\",'+
		'          \"apellids\": \"Glez UNO                                                                        \",'+
		'          \"comenta5\": \"                                                                                                    \",'+
		'          \"ctipob\": \"gr\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-05T08:51:00.000Z\",'+
		'          \"fecPett\": \"2020-05-05T08:55:15.000Z\",'+
		'          \"idauth\": 110640,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"NUEVO GRUPO GTS1                                                                                    \",'+
		'          \"nombusua\": \"JD Administrador\",'+
		'          \"nomelemt\": \"697\",'+
		'          \"uidAlta\": \"SGPjdgtsa211913               \",'+
		'          \"uidMod\": \"                              \",'+
		'          \"usuLogi\": \"jdgtsadmin     \"'+
		'        }'+
		'      },'+
		'      {'+
		'        \"autorizacion\": {'+
		'          \"accio\": \"B\",'+
		'          \"apellids\": \"Pruebas Desarrollo                                                              \",'+
		'          \"comenta5\": \"Para eliminar directamente                                                                          \",'+
		'          \"ctipob\": \"us\",'+
		'          \"estapeti\": \"P\",'+
		'          \"fapro\": \"2020-05-28T08:58:06.000Z\",'+
		'          \"fecPett\": \"2020-05-28T08:58:06.000Z\",'+
		'          \"idauth\": 111378,'+
		'          \"indDuplicado\": null,'+
		'          \"moddec1\": \"pruebajd1 Pruebajd1 Pruebajd1                                                                       \",'+
		'          \"nombusua\": \"Funcional GTS\",'+
		'          \"nomelemt\": \"SGPjdnexu789108\",'+
		'          \"uidAlta\": \"SGPgtsfun211931               \",'+
		'          \"uidMod\": \"SGPgtsfun211931               \",'+
		'          \"usuLogi\": \"gtsfun1        \"'+
		'        }'+
		'      }'+
		'    ],'+
		'    \"NUM_PAGINA\": 2,'+
		'    \"totalPaginas\": 1,'+
		'    \"totalRegistros\": 15'+
		'  }'+
		'}';
		WRAPPER_Authorizations r = WRAPPER_Authorizations.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Authorizations objWRAPPER_Authorizations = new WRAPPER_Authorizations(System.JSON.createParser(json));
		System.assert(objWRAPPER_Authorizations != null);
		System.assert(objWRAPPER_Authorizations.pending_authorizations == null);
		System.assert(objWRAPPER_Authorizations.requested_authorizations == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Authorizations.ListaAutorizaciones objListaAutorizaciones = new WRAPPER_Authorizations.ListaAutorizaciones(System.JSON.createParser(json));
		System.assert(objListaAutorizaciones != null);
		System.assert(objListaAutorizaciones.autorizacion == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Authorizations.Autorizacion objAutorizacion = new WRAPPER_Authorizations.Autorizacion(System.JSON.createParser(json));
		System.assert(objAutorizacion != null);
		System.assert(objAutorizacion.idauth == null);
		System.assert(objAutorizacion.fecPett == null);
		System.assert(objAutorizacion.usuLogi == null);
		System.assert(objAutorizacion.uidAlta == null);
		System.assert(objAutorizacion.uidMod == null);
		System.assert(objAutorizacion.ctipob == null);
		System.assert(objAutorizacion.moddec1 == null);
		System.assert(objAutorizacion.accio == null);
		System.assert(objAutorizacion.estapeti == null);
		System.assert(objAutorizacion.fapro == null);
		System.assert(objAutorizacion.comenta5 == null);
		System.assert(objAutorizacion.apellids == null);
		System.assert(objAutorizacion.nombusua == null);
		System.assert(objAutorizacion.nomelemt == null);
		System.assert(objAutorizacion.indDuplicado == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Authorizations.Pending_authorizations objPending_authorizations = new WRAPPER_Authorizations.Pending_authorizations(System.JSON.createParser(json));
		System.assert(objPending_authorizations != null);
		System.assert(objPending_authorizations.listaAutorizaciones == null);
		System.assert(objPending_authorizations.HAY_MAS_DATOS == null);
		System.assert(objPending_authorizations.NUM_PAGINA == null);
		System.assert(objPending_authorizations.totalRegistros == null);
		System.assert(objPending_authorizations.totalPaginas == null);
	}
}