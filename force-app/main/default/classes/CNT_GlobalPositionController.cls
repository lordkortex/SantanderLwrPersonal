public with sharing class CNT_GlobalPositionController {
    
    @AuraEnabled
    public Map<String, Double> bookBalanceMapped;
    
    @AuraEnabled
    public Map<String, Double> avaibleBookBalanceMapped;
    
    @AuraEnabled
    public Double totalBookBalance = 0.0;
    
    @AuraEnabled
    public Double avaibleBookBalance = 0.0;
    
    @AuraEnabled
    public List<String> currenciesList;
    
    //TOTAL BALANCE
    @AuraEnabled
    public List<WRAPPER_Balance.ListaTipCambio> cambioDivisas;
    
    @AuraEnabled
    public WRAPPER_Balance response;
    
    @AuraEnabled
    public List<WRAPPER_Balance.CountryGrouped> accountsByCountry = new List<WRAPPER_Balance.CountryGrouped>();
    
    @AuraEnabled
    public List<WRAPPER_Balance.CorporateGrouped> accountsByCorporate = new List<WRAPPER_Balance.CorporateGrouped>();
    
    @AuraEnabled
    public List<Wrapper_Currency> startingExchange;
    
    @AuraEnabled
    public String divisaPrincipal;
    
    @AuraEnabled
    public Map<String, List<WRAPPER_Balance.TiposDeCambio>> tiposDeCambio = new Map<String, List<WRAPPER_Balance.TiposDeCambio>>();
    
    @AuraEnabled
    public String eRatesLastModifiedDate;
    
    @AuraEnabled
    public String eRatesLastModifiedDateMain;    
    @AuraEnabled
    public String headerLastModifiedDate;
    @AuraEnabled
    public String headerLastModifiedDateMain;
    
    public Map<String,Decimal> exchangeRates;
    
    
    
    
    @AuraEnabled
    public Map<String, List<WRAPPER_Balance_LU.TipoDeCambio>> tiposDeCambio_LU = new Map<String, List<WRAPPER_Balance_LU.TipoDeCambio>>();
    @AuraEnabled
    public List<WRAPPER_Balance_LU.TipoDeCambio> cambioDivisas_LU = new List<WRAPPER_Balance_LU.TipoDeCambio>();
    @AuraEnabled
    public List<WRAPPER_Balance.TipoDeCambio> cambioDivisas_EOD = new List<WRAPPER_Balance.TipoDeCambio>();
    @AuraEnabled
    public String divisaPrincipalUsuario;
    
    @AuraEnabled
    public static Set<String> currenciesLst {get; set;}
    
    @AuraEnabled
    public static Map<String, String> mapUserFormats {get; set;}
    
    public CNT_GlobalPositionController(){
        is403Error = false;
        //AB - 3/12/2020 - Error204
        is204Error = false;
        //AB - 10/12/2020 - Error401
        is401Error = false;
    }

    @AuraEnabled
    public CNT_AccountsParent responseAcc {get; set;}

    @AuraEnabled
    public static WRAPPER_Balance responseForAccEOD {get;set;}

    @AuraEnabled
    public static WRAPPER_Balance_LU responseForAccLU {get;set;}

    @AuraEnabled
    public static Boolean isComingFromAcc {get; set;}

    @AuraEnabled
    public String userFirstName {get; set;}

    @AuraEnabled
    public Boolean isOneTrade {get; set;}

    @AuraEnabled
    public Boolean canUserSeeGP {get; set;}

    @AuraEnabled
    public Boolean canUserSeePaymentsTracker {get; set;}
    
 	//AB - 03/12/2020 - Error204
    @AuraEnabled
    public Boolean is204Error  {get;set;}

 	//AB - 10/12/2020 - Error401
    @AuraEnabled
    public Boolean is401Error  {get;set;}
    
    @AuraEnabled
    public Boolean is403Error  {get;set;}
    
    @AuraEnabled
    public static string getUserInfo(){
        return UserInfo.getFirstName();
    }

    @AuraEnabled //(cacheable=true)
    public static CNT_GlobalPositionController retrieveData(Boolean isEndOfDay, String globalId)
    {
        CNT_GlobalPositionController thisClass = new CNT_GlobalPositionController();
        thisClass.isOneTrade = false;
        
        CNT_ApiConfiguration__c configWs;
        currenciesLst = new Set<String>();
        currenciesLst.add('EUR');
        currenciesLst.add('USD');
        currenciesLst.add('GBP');
            thisClass.divisaPrincipalUsuario = UserInfo.getDefaultCurrency();
        thisClass.userFirstName = UserInfo.getFirstName();
        
        // Set the number and date format for the user
        mapUserFormats = new Map<String, String>();
        mapUserFormats.put('dateFormat', Global_Utilities.getUserDateFormat(globalId));
        mapUserFormats.put('numberFormat', Global_Utilities.getUserNumberFormat(globalId));
        
        if(isEndOfDay) {
            WRAPPER_Balance balanceList;

            if(isComingFromAcc != null && isComingFromAcc){
                balanceList = CNT_AccountsParent.responseForGPEOD;

                setCurrenciesList(balanceList, thisClass);
                groupAccounts(balanceList, thisClass);
                setAvaibleBalance(balanceList, thisClass);
                exchangeCurrencies(thisClass);
                getAccountByCurrency(thisClass,thisClass.cambioDivisas);

                if( thisClass.headerLastModifiedDate != null &&  thisClass.headerLastModifiedDate != ''){
                    thisClass.headerLastModifiedDateMain = thisClass.headerLastModifiedDate;
                    thisClass.headerLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.headerLastModifiedDate, 0));
                }
                if(thisClass.eRatesLastModifiedDate != null && thisClass.eRatesLastModifiedDate != ''){
                    thisClass.eRatesLastModifiedDateMain = thisClass.eRatesLastModifiedDate;
                    thisClass.eRatesLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.eRatesLastModifiedDate, 0));
                }
            }else{
                configWs = CNT_ApiConfiguration__c.getValues('CNT_BalanceEOD');
                String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
                //String response = doesntWorkEOD();
                if(Test.isRunningTest()){           
                    response = '{'+
                    '  \"balancesArbol\": ['+
                    '    {'+
                    '      \"paisArbol\": {'+
                    '        \"codPais\": \"AR\",'+
                    '        \"divisaUsuario\": \"EUR\",'+
                    '        \"listaMonedasArbol\": ['+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"ARS\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 4000,'+
                    '                  \"bookDate\": \"2015-11-04T23:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 4,'+
                    '                  \"codigoCuenta\": 1260,'+
                    '                  \"cuentaExtracto\": \"0000000000288914                                  \",'+
                    '                  \"divisa\": \"ARS\",'+
                    '                  \"nombreCorporate\": \"TESTPORTCHI\",'+
                    '                  \"nombreEmisora\": \"BANCO SANTANDER RIO\",'+
                    '                  \"valueBalance\": 4000,'+
                    '                  \"valueDate\": \"0001-12-31T23:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 4000,'+
                    '              \"sumValueBalance\": 4000'+
                    '            }'+
                    '          },'+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"EUR\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 680420,'+
                    '                  \"bookDate\": \"2019-08-07T22:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 2777,'+
                    '                  \"codigoCuenta\": 1264,'+
                    '                  \"cuentaExtracto\": \"EX00720194005000096557                            \",'+
                    '                  \"divisa\": \"EUR\",'+
                    '                  \"nombreCorporate\": \"TESTPORTALR1801\",'+
                    '                  \"nombreEmisora\": \"BANCO SANTANDER RIO\",'+
                    '                  \"valueBalance\": 680420,'+
                    '                  \"valueDate\": \"2019-08-07T22:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 680420,'+
                    '              \"sumValueBalance\": 680420'+
                    '            }'+
                    '          },'+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"USD\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 72967833,'+
                    '                  \"bookDate\": \"2019-08-07T22:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 3,'+
                    '                  \"codigoCuenta\": 1365,'+
                    '                  \"cuentaExtracto\": \"0000000000288006                                  \",'+
                    '                  \"divisa\": \"USD\",'+
                    '                  \"nombreCorporate\": \"TESTPORTMEX\",'+
                    '                  \"nombreEmisora\": \"BANCO SANTANDER RIO\",'+
                    '                  \"valueBalance\": 0,'+
                    '                  \"valueDate\": \"0001-12-31T23:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 72967833,'+
                    '              \"sumValueBalance\": 0'+
                    '            }'+
                    '          }'+
                    '        ],'+
                    '        \"sumBookBalanceDivUsu\": 68457326.40518,'+
                    '        \"sumValueBalanceDivUsu\": 680810.54774'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"paisArbol\": {'+
                    '        \"codPais\": \"MX\",'+
                    '        \"divisaUsuario\": \"EUR\",'+
                    '        \"listaMonedasArbol\": ['+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"MXN\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 8000,'+
                    '                  \"bookDate\": \"2015-11-04T23:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 8,'+
                    '                  \"codigoCuenta\": 1263,'+
                    '                  \"cuentaExtracto\": \"00140009092000298531                              \",'+
                    '                  \"divisa\": \"MXN\",'+
                    '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                    '                  \"nombreEmisora\": \"BANCO SANTANDER SERFIN\",'+
                    '                  \"valueBalance\": 4000,'+
                    '                  \"valueDate\": \"0001-12-31T23:00:00.000Z\"'+
                    '                },'+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 638349,'+
                    '                  \"bookDate\": \"2016-08-15T22:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 3,'+
                    '                  \"codigoCuenta\": 1949,'+
                    '                  \"cuentaExtracto\": \"5884027703420                                     \",'+
                    '                  \"divisa\": \"MXN\",'+
                    '                  \"nombreCorporate\": \"TESTPORTMEX\",'+
                    '                  \"nombreEmisora\": \"HSBC MEXICO S.A. INSTITUCION DE BA\",'+
                    '                  \"valueBalance\": 638349,'+
                    '                  \"valueDate\": \"2016-08-15T22:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 646349,'+
                    '              \"sumValueBalance\": 642349'+
                    '            }'+
                    '          },'+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"EUR\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 2000,'+
                    '                  \"bookDate\": \"2017-10-27T22:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 2,'+
                    '                  \"codigoCuenta\": 2087,'+
                    '                  \"cuentaExtracto\": \"51500583988                                       \",'+
                    '                  \"divisa\": \"EUR\",'+
                    '                  \"nombreCorporate\": \"TESTPORTBR\",'+
                    '                  \"nombreEmisora\": \"BANCO SANTANDER SERFIN\",'+
                    '                  \"valueBalance\": 4000,'+
                    '                  \"valueDate\": \"2017-10-27T22:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 2000,'+
                    '              \"sumValueBalance\": 4000'+
                    '            }'+
                    '          }'+
                    '        ],'+
                    '        \"sumBookBalanceDivUsu\": 38195.86884,'+
                    '        \"sumValueBalanceDivUsu\": 39971.86705'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"paisArbol\": {'+
                    '        \"codPais\": \"CL\",'+
                    '        \"divisaUsuario\": \"EUR\",'+
                    '        \"listaMonedasArbol\": ['+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"EUR\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 297378822,'+
                    '                  \"bookDate\": \"2019-08-07T22:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 8,'+
                    '                  \"codigoCuenta\": 1265,'+
                    '                  \"cuentaExtracto\": \"00350401000001712683                              \",'+
                    '                  \"divisa\": \"EUR\",'+
                    '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                    '                  \"nombreEmisora\": \"BANCO DE CHILE SAN\",'+
                    '                  \"valueBalance\": 297378822,'+
                    '                  \"valueDate\": \"2019-08-07T22:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 297378822,'+
                    '              \"sumValueBalance\": 297378822'+
                    '            }'+
                    '          },'+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"CLP\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 206599,'+
                    '                  \"bookDate\": \"2019-08-07T22:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 8,'+
                    '                  \"codigoCuenta\": 1266,'+
                    '                  \"cuentaExtracto\": \"00350401005100018138                              \",'+
                    '                  \"divisa\": \"CLP\",'+
                    '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                    '                  \"nombreEmisora\": \"BANCO DE CHILE SAN\",'+
                    '                  \"valueBalance\": 206599,'+
                    '                  \"valueDate\": \"2019-08-07T22:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 206599,'+
                    '              \"sumValueBalance\": 206599'+
                    '            }'+
                    '          }'+
                    '        ],'+
                    '        \"sumBookBalanceDivUsu\": 297379102.02057,'+
                    '        \"sumValueBalanceDivUsu\": 297379102.02057'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"paisArbol\": {'+
                    '        \"codPais\": \"BR\",'+
                    '        \"divisaUsuario\": \"EUR\",'+
                    '        \"listaMonedasArbol\": ['+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"PYG\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 8000,'+
                    '                  \"bookDate\": \"2015-11-04T23:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 8,'+
                    '                  \"codigoCuenta\": 1267,'+
                    '                  \"cuentaExtracto\": \"0643130010497                                     \",'+
                    '                  \"divisa\": \"PYG\",'+
                    '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                    '                  \"nombreEmisora\": \"BRASILITO\",'+
                    '                  \"valueBalance\": 4000,'+
                    '                  \"valueDate\": \"0001-12-31T23:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 8000,'+
                    '              \"sumValueBalance\": 4000'+
                    '            }'+
                    '          },'+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"BRL\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 0,'+
                    '                  \"bookDate\": \"2014-05-12T22:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 8,'+
                    '                  \"codigoCuenta\": 1268,'+
                    '                  \"cuentaExtracto\": \"0643130011340                                     \",'+
                    '                  \"divisa\": \"BRL\",'+
                    '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                    '                  \"nombreEmisora\": \"BANCO SANTANDER BRASIL\",'+
                    '                  \"valueBalance\": 0,'+
                    '                  \"valueDate\": \"2014-05-12T22:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 0,'+
                    '              \"sumValueBalance\": 0'+
                    '            }'+
                    '          }'+
                    '        ],'+
                    '        \"sumBookBalanceDivUsu\": 47398980.92191,'+
                    '        \"sumValueBalanceDivUsu\": 23699490.46096'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"paisArbol\": {'+
                    '        \"codPais\": \"ES\",'+
                    '        \"divisaUsuario\": \"EUR\",'+
                    '        \"listaMonedasArbol\": ['+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"EUR\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": null,'+
                    '                  \"bookBalance\": 9,'+
                    '                  \"bookDate\": \"2017-04-02T22:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 8,'+
                    '                  \"codigoCuenta\": 2662,'+
                    '                  \"cuentaExtracto\": \"ES4090000001200018004907                          \",'+
                    '                  \"divisa\": \"EUR\",'+
                    '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                    '                  \"nombreEmisora\": \"SOCIETE GENERALE, SUCURSAL EN ESPANA\",'+
                    '                  \"valueBalance\": 9,'+
                    '                  \"valueDate\": \"2000-12-31T23:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 9,'+
                    '              \"sumValueBalance\": 9'+
                    '            }'+
                    '          },'+
                    '          {'+
                    '            \"monedaArbol\": {'+
                    '              \"divisaCuenta\": \"BRL\",'+
                    '              \"cuentaArbol\": ['+
                    '                {'+
                    '                  \"aliasCuentaPerfilado\": null,'+
                    '                  \"aliasEntidad\": \"SAN ESP 4      \",'+
                    '                  \"bookBalance\": 10080,'+
                    '                  \"bookDate\": \"2019-12-12T23:00:00.000Z\",'+
                    '                  \"codigoBic\": {'+
                    '                    \"branch\": null,'+
                    '                    \"entidadbic\": null,'+
                    '                    \"locatorbic\": null,'+
                    '                    \"paisbic\": null'+
                    '                  },'+
                    '                  \"codigoCorporate\": 8,'+
                    '                  \"codigoCuenta\": 2666,'+
                    '                  \"cuentaExtracto\": \"2167130010391                                     \",'+
                    '                  \"divisa\": \"BRL\",'+
                    '                  \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                    '                  \"nombreEmisora\": \"BANCO SANTANDER ESPANA\",'+
                    '                  \"valueBalance\": 1002993,'+
                    '                  \"valueDate\": \"2019-12-12T23:00:00.000Z\"'+
                    '                }'+
                    '              ],'+
                    '              \"sumBookBalance\": 10080,'+
                    '              \"sumValueBalance\": 1002993'+
                    '            }'+
                    '          }'+
                    '        ],'+
                    '        \"sumBookBalanceDivUsu\": 3103.90958,'+
                    '        \"sumValueBalanceDivUsu\": 307949.68343'+
                    '      }'+
                    '    }'+
                    '  ],'+
                    '  \"listaDivisa\": [],'+
                    '  \"descripcionConversion\": \"USD=1,07659 31-12-2017; GBP=1,07659 31-12-2017; ARS=10,267 05-01-2015; MXN=17,857 05-01-2015; CLP=737,8 05-01-2015; PYG=0,00017 ; BRL=3,2571 05-01-2015\",'+
                    '  \"listaTipCambio\": ['+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"EUR\",'+
                    '        \"fecha\": null,'+
                    '        \"importe\": 1,'+
                    '        \"importeDecimal\": 1.00000000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": null'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"USD\",'+
                    '        \"fecha\": \"2017-12-30T23:00:00.000Z\",'+
                    '        \"importe\": 1,'+
                    '        \"importeDecimal\": 1.07659464,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"GBP\",'+
                    '        \"fecha\": \"2017-12-30T23:00:00.000Z\",'+
                    '        \"importe\": 1,'+
                    '        \"importeDecimal\": 1.07659464,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"ARS\",'+
                    '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                    '        \"importe\": 10,'+
                    '        \"importeDecimal\": 10.26700000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"MXN\",'+
                    '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                    '        \"importe\": 17,'+
                    '        \"importeDecimal\": 17.85700000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"CLP\",'+
                    '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                    '        \"importe\": 737,'+
                    '        \"importeDecimal\": 737.80000000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"PYG\",'+
                    '        \"fecha\": null,'+
                    '        \"importe\": 5924,'+
                    '        \"importeDecimal\": 0.00016878,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"0\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": \"AUD\",'+
                    '        \"divisa\": \"BRL\",'+
                    '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                    '        \"importe\": 3,'+
                    '        \"importeDecimal\": 3.25710000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": \"test\",'+
                    '        \"divisa\": \"AUD\",'+
                    '        \"fecha\": \"2018-09-12T22:00:00.000Z\",'+
                    '        \"importe\": 0,'+
                    '        \"importeDecimal\": 0.77820000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    }'+
                    '  ]'+
                    '}';
                }
            	
                if (String.isNotBlank(response)){
                    //AB - 10/12/2020 - Error401
                    if(response == '401'){
                        thisClass.is401Error = true;   
                        return thisClass;
                    //AB - 3/12/2020 - Error204                 
                    }else if(response == '204'){
                        thisClass.is204Error = true;   
                        return thisClass;
                    }else{
                        balanceList = WRAPPER_Balance.parse(response);
                        setCurrenciesList(balanceList, thisClass);
                        groupAccounts(balanceList, thisClass);
                        setAvaibleBalance(balanceList, thisClass);
                        exchangeCurrencies(thisClass);
                        getAccountByCurrency(thisClass,thisClass.cambioDivisas);
    
                        if( thisClass.headerLastModifiedDate != null &&  thisClass.headerLastModifiedDate != ''){
                            thisClass.headerLastModifiedDateMain = thisClass.headerLastModifiedDate;
                            thisClass.headerLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.headerLastModifiedDate, 0));
                        }
                        if(thisClass.eRatesLastModifiedDate != null && thisClass.eRatesLastModifiedDate != ''){
                            thisClass.eRatesLastModifiedDateMain = thisClass.eRatesLastModifiedDate;
                            thisClass.eRatesLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.eRatesLastModifiedDate, 0));
                        }
    
                        responseForAccEOD = WRAPPER_Balance.parse(response);
                        CNT_AccountsParent.isComingFromGP = true;
                        thisClass.responseAcc = CNT_AccountsParent.getBalanceData('endOfDay', globalId);
                   }     
                }else{
                    return null;
                }
            }
        }else{
            WRAPPER_Balance_LU responseSet;

            if(isComingFromAcc != null && isComingFromAcc){
                responseSet = CNT_AccountsParent.responseForGPLU;

                handleExchangeRatesLU(responseSet, thisClass);
                groupAccountsLU(responseSet, thisClass);
                exchangeCurrenciesLU(thisClass);
                getAccountByCurrencyLU(responseSet,thisClass,thisClass.cambioDivisas);
                System.debug('headerLastModifiedDate');
                System.debug(thisClass.headerLastModifiedDate);
                if( thisClass.headerLastModifiedDate != null &&  thisClass.headerLastModifiedDate != ''){
                    thisClass.headerLastModifiedDateMain = thisClass.headerLastModifiedDate;
                    thisClass.headerLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.headerLastModifiedDate, 2));
                }
                
                if(thisClass.eRatesLastModifiedDate != null && thisClass.eRatesLastModifiedDate != ''){
                    thisClass.eRatesLastModifiedDateMain = thisClass.eRatesLastModifiedDate;
                    thisClass.eRatesLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.eRatesLastModifiedDate, 0));
                }
            }else{
                configWs = CNT_ApiConfiguration__c.getValues('CNT_BalanceLastUpdate');
                String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
                if(Test.isRunningTest()){
                    response = '{'+
                    '  \"accountsList\": {'+
                    '    \"_links\": null,'+
                    '    \"accountsDataList\": ['+
                    '      {'+
                    '        \"_links\": null,'+
                    '        \"account\": null,'+
                    '        \"accountIdList\": ['+
                    '          {'+
                    '            \"accountId\": \"ES4800490000000000000000\",'+
                    '            \"idType\": \"IBA\"'+
                    '          }'+
                    '        ],'+
                    '        \"alias\": null,'+
                    '        \"availableBalance\": {'+
                    '          \"amount\": 1000003.0,'+
                    '          \"currencyCode\": \"EUR\",'+
                    '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                    '        },'+
                    '        \"balanceAllowed\": null,'+
                    '        \"bankDescription\": \"0001\",'+
                    '        \"bankId\": \"BSCHESM0XXX\",'+
                    '        \"country\": \"ES\",'+
                    '        \"customerId\": null,'+
                    '        \"customerName\": null,'+
                    '        \"description\": null,'+
                    '        \"displayNumber\": \"ES******00\",'+
                    '        \"flags\": {'+
                    '          \"pain002Active\": true,'+
                    '          \"hasSwiftPayments\": true'+
                    '        },'+
                    '        \"hasSwiftPayment\": \"YES\",'+
                    '        \"hasSwiftPayments\": null,'+
                    '        \"internationalPaymentsAllowed\": null,'+
                    '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                    '        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+
                    '        \"mainBalance\": {'+
                    '          \"amount\": 1000000.0,'+
                    '          \"currencyCode\": \"EUR\",'+
                    '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                    '        },'+
                    '        \"overdraftLimit\": null,'+
                    '        \"overdraftUsed\": null,'+
                    '        \"pain002Active\": true,'+
                    '        \"parentCustomerName\": null,'+
                    '        \"pendingBalance\": null,'+
                    '        \"status\": null,'+
                    '        \"transactionsAllowed\": null,'+
                    '        \"type\": \"IBA\",'+
                    '        \"withholdingBalance\": null'+
                    '      },'+
                    '      {'+
                    '        \"_links\": null,'+
                    '        \"account\": null,'+
                    '        \"accountIdList\": ['+
                    '          {'+
                    '            \"accountId\": \"ES9000490000000000000011\",'+
                    '            \"idType\": \"IBA\"'+
                    '          }'+
                    '        ],'+
                    '        \"alias\": null,'+
                    '        \"availableBalance\": {'+
                    '          \"amount\": 1000003.0,'+
                    '          \"currencyCode\": \"EUR\",'+
                    '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                    '        },'+
                    '        \"balanceAllowed\": null,'+
                    '        \"bankDescription\": \"0001\",'+
                    '        \"bankId\": \"BSCHESM0XXX\",'+
                    '        \"country\": \"ES\",'+
                    '        \"customerId\": null,'+
                    '        \"customerName\": null,'+
                    '        \"description\": null,'+
                    '        \"displayNumber\": \"ES******11\",'+
                    '        \"flags\": {'+
                    '          \"pain002Active\": true,'+
                    '          \"hasSwiftPayments\": true'+
                    '        },'+
                    '        \"hasSwiftPayment\": \"YES\",'+
                    '        \"hasSwiftPayments\": null,'+
                    '        \"internationalPaymentsAllowed\": null,'+
                    '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                    '        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+
                    '        \"mainBalance\": {'+
                    '          \"amount\": 1000000.0,'+
                    '          \"currencyCode\": \"EUR\",'+
                    '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                    '        },'+
                    '        \"overdraftLimit\": null,'+
                    '        \"overdraftUsed\": null,'+
                    '        \"pain002Active\": true,'+
                    '        \"parentCustomerName\": null,'+
                    '        \"pendingBalance\": null,'+
                    '        \"status\": null,'+
                    '        \"transactionsAllowed\": null,'+
                    '        \"type\": \"IBA\",'+
                    '        \"withholdingBalance\": null'+
                    '      },'+
                    '      {'+
                    '        \"_links\": null,'+
                    '        \"account\": null,'+
                    '        \"accountIdList\": ['+
                    '          {'+
                    '            \"accountId\": \"ES8100490075473000562155\",'+
                    '            \"idType\": \"IBA\"'+
                    '          }'+
                    '        ],'+
                    '        \"alias\": null,'+
                    '        \"availableBalance\": {'+
                    '          \"amount\": 1000003.0,'+
                    '          \"currencyCode\": \"EUR\",'+
                    '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                    '        },'+
                    '        \"balanceAllowed\": null,'+
                    '        \"bankDescription\": \"0001\",'+
                    '        \"bankId\": \"BSCHESM0XXX\",'+
                    '        \"country\": \"ES\",'+
                    '        \"customerId\": null,'+
                    '        \"customerName\": null,'+
                    '        \"description\": null,'+
                    '        \"displayNumber\": \"ES******55\",'+
                    '        \"flags\": {'+
                    '          \"pain002Active\": true,'+
                    '          \"hasSwiftPayments\": true'+
                    '        },'+
                    '        \"hasSwiftPayment\": \"YES\",'+
                    '        \"hasSwiftPayments\": null,'+
                    '        \"internationalPaymentsAllowed\": null,'+
                    '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                    '        \"lastUpdateSwiftPayment\": \"2019-10-04T11:38:00Z\",'+
                    '        \"mainBalance\": {'+
                    '          \"amount\": 1000000.0,'+
                    '          \"currencyCode\": \"EUR\",'+
                    '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                    '        },'+
                    '        \"overdraftLimit\": null,'+
                    '        \"overdraftUsed\": null,'+
                    '        \"pain002Active\": true,'+
                    '        \"parentCustomerName\": null,'+
                    '        \"pendingBalance\": null,'+
                    '        \"status\": null,'+
                    '        \"transactionsAllowed\": null,'+
                    '        \"type\": \"IBA\",'+
                    '        \"withholdingBalance\": null'+
                    '      },'+
                    '      {'+
                    '        \"_links\": null,'+
                    '        \"account\": null,'+
                    '        \"accountIdList\": ['+
                    '          {'+
                    '            \"accountId\": \"ES1000490072012110458432\",'+
                    '            \"idType\": \"IBA\"'+
                    '          }'+
                    '        ],'+
                    '        \"alias\": null,'+
                    '        \"availableBalance\": {'+
                    '          \"amount\": 1000003.0,'+
                    '          \"currencyCode\": \"EUR\",'+
                    '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                    '        },'+
                    '        \"balanceAllowed\": null,'+
                    '        \"bankDescription\": \"0001\",'+
                    '        \"bankId\": \"BSCHESM0XXX\",'+
                    '        \"country\": \"ES\",'+
                    '        \"customerId\": null,'+
                    '        \"customerName\": null,'+
                    '        \"description\": null,'+
                    '        \"displayNumber\": \"ES******32\",'+
                    '        \"flags\": {'+
                    '          \"pain002Active\": true,'+
                    '          \"hasSwiftPayments\": true'+
                    '        },'+
                    '        \"hasSwiftPayment\": \"YES\",'+
                    '        \"hasSwiftPayments\": null,'+
                    '        \"internationalPaymentsAllowed\": null,'+
                    '        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
                    '        \"lastUpdateSwiftPayment\": \"2020-04-01T10:57:00Z\",'+
                    '        \"mainBalance\": {'+
                    '          \"amount\": 1000000.0,'+
                    '          \"currencyCode\": \"EUR\",'+
                    '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
                    '        },'+
                    '        \"overdraftLimit\": null,'+
                    '        \"overdraftUsed\": null,'+
                    '        \"pain002Active\": true,'+
                    '        \"parentCustomerName\": null,'+
                    '        \"pendingBalance\": null,'+
                    '        \"status\": null,'+
                    '        \"transactionsAllowed\": null,'+
                    '        \"type\": \"IBA\",'+
                    '        \"withholdingBalance\": null'+
                    '      }'+
                    '    ]'+
                    '  },'+
                        +
                    '  \"listaDivisa\": [],'+
                    '  \"descripcionConversion\": \"USD=1,07659 31-12-2017; GBP=1,07659 31-12-2017; ARS=10,267 05-01-2015; MXN=17,857 05-01-2015; CLP=737,8 05-01-2015; PYG=0,00017 ; BRL=3,2571 05-01-2015\",'+
                    '  \"listaTipCambio\": ['+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"EUR\",'+
                    '        \"fecha\": null,'+
                    '        \"importe\": 1,'+
                    '        \"importeDecimal\": 1.00000000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": null'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"USD\",'+
                    '        \"fecha\": \"2017-12-30T23:00:00.000Z\",'+
                    '        \"importe\": 1,'+
                    '        \"importeDecimal\": 1.07659464,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"GBP\",'+
                    '        \"fecha\": \"2017-12-30T23:00:00.000Z\",'+
                    '        \"importe\": 1,'+
                    '        \"importeDecimal\": 1.07659464,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"ARS\",'+
                    '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                    '        \"importe\": 10,'+
                    '        \"importeDecimal\": 10.26700000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"MXN\",'+
                    '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                    '        \"importe\": 17,'+
                    '        \"importeDecimal\": 17.85700000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"CLP\",'+
                    '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                    '        \"importe\": 737,'+
                    '        \"importeDecimal\": 737.80000000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": null,'+
                    '        \"divisa\": \"PYG\",'+
                    '        \"fecha\": null,'+
                    '        \"importe\": 5924,'+
                    '        \"importeDecimal\": 0.00016878,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"0\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": \"AUD\",'+
                    '        \"divisa\": \"BRL\",'+
                    '        \"fecha\": \"2015-01-04T23:00:00.000Z\",'+
                    '        \"importe\": 3,'+
                    '        \"importeDecimal\": 3.25710000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    },'+
                    '    {'+
                    '      \"tipoDeCambio\": {'+
                    '        \"claError\": \"test\",'+
                    '        \"divisa\": \"AUD\",'+
                    '        \"fecha\": \"2018-09-12T22:00:00.000Z\",'+
                    '        \"importe\": 0,'+
                    '        \"importeDecimal\": 0.77820000,'+
                    '        \"nombreDivisa\": null,'+
                    '        \"tipError\": \"2\"'+
                    '      }'+
                    '    }'+
                    '  ]'+
                    '}';
                }
                //String response = doesntWorkLU();
                if(String.isNotBlank(response)){
                    //AB - 10/12/2020 - Error401
                    if(response == '401'){
                        thisClass.is401Error = true;   
                        return thisClass;
                    //AB - 3/12/2020 - Error204                 
                    }else if(response == '204'){
                        thisClass.is204Error = true;   
                        return thisClass;
                    }else{
                        responseSet = WRAPPER_Balance_LU.parse(response);
                        handleExchangeRatesLU(responseSet, thisClass);
                        groupAccountsLU(responseSet, thisClass);
                        exchangeCurrenciesLU(thisClass);
                        getAccountByCurrencyLU(responseSet,thisClass,thisClass.cambioDivisas);
                        System.debug('headerLastModifiedDate');
                        System.debug(thisClass.headerLastModifiedDate);
                        if( thisClass.headerLastModifiedDate != null &&  thisClass.headerLastModifiedDate != ''){
                            thisClass.headerLastModifiedDateMain = thisClass.headerLastModifiedDate;
                            thisClass.headerLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.headerLastModifiedDate, 2));
                        }
                        
                        if(thisClass.eRatesLastModifiedDate != null && thisClass.eRatesLastModifiedDate != ''){
                            thisClass.eRatesLastModifiedDateMain = thisClass.eRatesLastModifiedDate;
                            thisClass.eRatesLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.eRatesLastModifiedDate, 0));
                        }
    
                        responseForAccLU = WRAPPER_Balance_LU.parse(response);
                        CNT_AccountsParent.isComingFromGP = true;
                        thisClass.responseAcc = CNT_AccountsParent.getBalanceData('lastUpdate', globalId);
                    }
                }else{
                    return null;
                }
            }
            
        }
        
        
        System.debug(thisClass);
        return thisClass;
        
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Gets the accounts balance data from the API Accounts service
    History
    <Date>			<Author>		        <Description>
    03/08/2020		Guillermo Giral         Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static CNT_GlobalPositionController retrieveIAMData(String globalId)
    {
        
        CNT_GlobalPositionController thisClass = new CNT_GlobalPositionController();
        // Set One Trade flag
        thisClass.isOneTrade = true;

        CNT_ApiConfiguration__c configWs;
        currenciesLst = new Set<String>();
        currenciesLst.add('EUR');
        currenciesLst.add('USD');
        currenciesLst.add('GBP');
        thisClass.divisaPrincipalUsuario = UserInfo.getDefaultCurrency();
        thisClass.userFirstName = UserInfo.getFirstName();
        
        // Set the number and date format for the user
        mapUserFormats = new Map<String, String>();
        mapUserFormats.put('dateFormat', Global_Utilities.getUserDateFormat(globalId));
        mapUserFormats.put('numberFormat', Global_Utilities.getUserNumberFormat(globalId));
        
        
        WRAPPER_Balance_LU responseSet;

        if(isComingFromAcc != null && isComingFromAcc){
            responseSet = CNT_AccountsParent.responseForGPLU;

            thisClass.canUserSeeGP = canUserSeeGlobalPosition(responseSet);
            thisClass.canUserSeePaymentsTracker = canUserSeePaymentsTracker(responseSet);
            handleExchangeRatesLU(responseSet, thisClass);
            groupAccountsLU(responseSet, thisClass);
            setCurrencyExchanges(thisClass);
            getAccountByCurrencyIAM(responseSet, thisClass, thisClass.cambioDivisas);
            if( thisClass.headerLastModifiedDate != null &&  thisClass.headerLastModifiedDate != ''){
                thisClass.headerLastModifiedDateMain = thisClass.headerLastModifiedDate;
                thisClass.headerLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.headerLastModifiedDate, 2));
            }
            
            if(thisClass.eRatesLastModifiedDate != null && thisClass.eRatesLastModifiedDate != ''){
                thisClass.eRatesLastModifiedDateMain = thisClass.eRatesLastModifiedDate;
                thisClass.eRatesLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.eRatesLastModifiedDate, 0));
            }
        }else{

            //configWs = CNT_ApiConfiguration__c.getValues('AccountService');
            configWs = CNT_ApiConfiguration__c.getValues('CNT_OneT_Accounts');
            Map<String, String> extraHeaders = new Map<String, String>{'onetrade' => 'true'};
            String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, extraHeaders);

            if(Test.isRunningTest()){
                /*String*/ response = '{'+
		'  \"accountsList\": {'+
		'    \"accountsDataList\": ['+
		'      {'+
		'        \"displayNumber\": \"33366958598\",'+
		'        \"accountIdList\": ['+
		'          {'+
		'            \"idType\": \"BBA\",'+
		'            \"accountId\": \"33366958598\"'+
		'          }'+
		'        ],'+
		'        \"alias\": \"SUPER PAGAMENTOS E ADMINISTRACAO DE MEIO\",'+
		'        \"aliasGTS\": null,'+
		'        \"type\": \"Current Account\",'+
		'        \"description\": \"01-VAN GOGH\",'+
		'        \"status\": \"Open\",'+
		'        \"customerId\": \"66958598\",'+
		'        \"country\": \"LU\",'+
		'        \"bankId\": \"BSCHLULLXXX\",'+
		'        \"bankDescription\": \"BANCO SANTANDER (BRASIL) SA, LUXEMBOURG BRANCH\",'+
		'        \"parentCustomerName\": null,'+
		'        \"customerName\": null,'+
		'        \"lastTransactionDate\": null,'+
		'        \"mainBalance\": {'+
		'          \"amount\": 0.0,'+
		'          \"currencyCode\": \"USD\",'+
		'          \"lastUpdate\": \"2020-10-15T09:52:19.388+0000\"'+
		'        },'+
		'        \"availableBalance\": {'+
		'          \"amount\": 0.0,'+
		'          \"currencyCode\": \"USD\",'+
		'          \"lastUpdate\": \"2020-10-15T09:52:19.388+0000\"'+
		'        },'+
		'        \"pendingBalance\": {'+
		'          \"amount\": null,'+
		'          \"currencyCode\": null,'+
		'          \"lastUpdate\": null'+
		'        },'+
		'        \"withholdingBalance\": {'+
		'          \"amount\": null,'+
		'          \"currencyCode\": null,'+
		'          \"lastUpdate\": null'+
		'        },'+
		'        \"overdraftLimit\": {'+
		'          \"amount\": null,'+
		'          \"currencyCode\": null,'+
		'          \"lastUpdate\": null'+
		'        },'+
		'        \"overdraftUsed\": {'+
		'          \"amount\": null,'+
		'          \"currencyCode\": null,'+
		'          \"lastUpdate\": null'+
		'        },'+
		'        \"closedBalance\": {'+
		'          \"amount\": null,'+
		'          \"currencyCode\": null,'+
		'          \"lastUpdate\": null'+
		'        },'+
		'        \"closedAvailableBalance\": {'+
		'          \"amount\": null,'+
		'          \"currencyCode\": null,'+
		'          \"lastUpdate\": null'+
		'        },'+
		'        \"hasSwiftPayments\": \"true\",'+
		'        \"lastUpdateSwiftPayment\": \"2020-04-28T20:26:57.000+0000\",'+
		'        \"pain002Active\": false,'+
		'        \"balanceAllowed\": true,'+
		'        \"transactionsAllowed\": true,'+
		'        \"internationalPaymentsAllowed\": true,'+
		'        \"_links\": null'+
		'      },'+
		'      {'+
		'        \"displayNumber\": \"000130049856\",'+
		'        \"accountIdList\": ['+
		'          {'+
		'            \"idType\": \"BBA\",'+
		'            \"accountId\": \"3410000130049856\"'+
		'          }'+
		'        ],'+
		'        \"alias\": null,'+
		'        \"aliasGTS\": null,'+
		'        \"type\": \"Current Account\",'+
		'        \"description\": \"CONTA CORRENTE\",'+
		'        \"status\": \"Open\",'+
		'        \"customerId\": \"66958598\",'+
		'        \"country\": \"BR\",'+
		'        \"bankId\": \"BSCHBRSPXXX\",'+
		'        \"bankDescription\": \"BANCO SANTANDER (BRASIL) S.A.\",'+
		'        \"parentCustomerName\": null,'+
		'        \"customerName\": null,'+
		'        \"lastTransactionDate\": null,'+
		'        \"mainBalance\": {'+
		'          \"amount\": 26167.17,'+
		'          \"currencyCode\": \"BRL\",'+
		'          \"lastUpdate\": \"2020-10-15T09:52:21.375+0000\"'+
		'        },'+
		'        \"availableBalance\": {'+
		'          \"amount\": 26167.17,'+
		'          \"currencyCode\": \"BRL\",'+
		'          \"lastUpdate\": \"2020-10-15T09:52:21.375+0000\"'+
		'        },'+
		'        \"pendingBalance\": {'+
		'          \"amount\": 0.0,'+
		'          \"currencyCode\": \"BRL\",'+
		'          \"lastUpdate\": \"2020-10-15T03:00:00.000+0000\"'+
		'        },'+
		'        \"withholdingBalance\": {'+
		'          \"amount\": 0.0,'+
		'          \"currencyCode\": \"BRL\",'+
		'          \"lastUpdate\": \"2020-10-15T03:00:00.000+0000\"'+
		'        },'+
		'        \"overdraftLimit\": {'+
		'          \"amount\": 0.0,'+
		'          \"currencyCode\": \"BRL\",'+
		'          \"lastUpdate\": \"2020-10-15T03:00:00.000+0000\"'+
		'        },'+
		'        \"overdraftUsed\": {'+
		'          \"amount\": null,'+
		'          \"currencyCode\": null,'+
		'          \"lastUpdate\": null'+
		'        },'+
		'        \"closedBalance\": {'+
		'          \"amount\": null,'+
		'          \"currencyCode\": null,'+
		'          \"lastUpdate\": null'+
		'        },'+
		'        \"closedAvailableBalance\": {'+
		'          \"amount\": null,'+
		'          \"currencyCode\": null,'+
		'          \"lastUpdate\": null'+
		'        },'+
		'        \"hasSwiftPayments\": \"false\",'+
		'        \"lastUpdateSwiftPayment\": null,'+
		'        \"pain002Active\": false,'+
		'        \"balanceAllowed\": false,'+
		'        \"transactionsAllowed\": false,'+
		'        \"internationalPaymentsAllowed\": true,'+
		'        \"_links\": null'+
		'      }'+
		'    ]'+
		'  }'+
		'}';
            }

            if(String.isNotBlank(response)){
                responseSet = WRAPPER_Balance_LU.parse(response);
                System.debug('Response SET: ' + responseSet);

                /*Mock
                responseSet.accountsList = null;
                responseSet.descripcionConversion = null;
                responseSet.listaTipCambio = null; 
                response = response + '403';*/
                if(responseSet != null && responseSet.accountsList == null && responseSet.descripcionConversion == null && responseSet.listaTipCambio == null && String.isNotBlank(response) && response.contains('403'))
                {
                    thisClass.is403Error = true;
                    return thisClass;
                }else{
                    
                    thisClass.canUserSeeGP = canUserSeeGlobalPosition(responseSet);
                    thisClass.canUserSeePaymentsTracker = canUserSeePaymentsTracker(responseSet);
                    handleExchangeRatesLU(responseSet, thisClass);
                    groupAccountsLU(responseSet, thisClass);
                    setCurrencyExchanges(thisClass);
                    getAccountByCurrencyIAM(responseSet, thisClass, thisClass.cambioDivisas);
                    if( thisClass.headerLastModifiedDate != null &&  thisClass.headerLastModifiedDate != ''){
                        thisClass.headerLastModifiedDateMain = thisClass.headerLastModifiedDate;
                        thisClass.headerLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.headerLastModifiedDate, 2));
                    }
                    
                    if(thisClass.eRatesLastModifiedDate != null && thisClass.eRatesLastModifiedDate != ''){
                        thisClass.eRatesLastModifiedDateMain = thisClass.eRatesLastModifiedDate;
                        thisClass.eRatesLastModifiedDate = String.valueOfGMT(DateTime_Utilities.stringToDateTimeStep(thisClass.eRatesLastModifiedDate, 0));
                    }
                    
                    // Save Accounts response for use in the cache
                    responseForAccLU = WRAPPER_Balance_LU.parse(response);
                    CNT_AccountsParent.isComingFromGP = true;
                    thisClass.responseAcc = CNT_AccountsParent.getBalanceData('oneTrade', globalId);
                }
            }else {
                return null;
            }
        }        
        System.debug(thisClass);
        return thisClass;        
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Gets all the exchange rates for the user's currencies and creates a
                    wrapper that matches Cash Nexus format
    History
    <Date>			<Author>		        <Description>
    03/08/2020		Guillermo Giral         Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void setCurrencyExchanges (CNT_GlobalPositionController thisClass)
    {
        // Creates the ListaTipCambio wrapper with the values retrieved from the currency exchanges from SF
        List<WRAPPER_Balance.ListaTipCambio> cambios = new List<WRAPPER_Balance.ListaTipCambio>();
        System.debug('thisClass.exchangeRates: ' + thisClass.exchangeRates);
        for (String key : thisClass.exchangeRates.keySet())
        {        
            WRAPPER_Balance.ListaTipCambio tipoCambio= new WRAPPER_Balance.ListaTipCambio();
            tipoCambio.tipoDeCambio = new WRAPPER_Balance.TipoDeCambio();
            tipoCambio.tipoDeCambio.divisa = key;
            tipoCambio.tipoDeCambio.importeDecimal = thisClass.exchangeRates.get(key).setScale(8);
            tipoCambio.tipoDeCambio.importe = thisClass.exchangeRates.get(key).setScale(2);
            tipoCambio.tipoDeCambio.totalBalanceEquivalente = thisClass.bookBalanceMapped.get(key);
            
            cambios.add(tipoCambio);
        }
        thisClass.cambioDivisas = cambios;
        System.debug('Cambio divisas: ' + thisClass.cambioDivisas);
        System.debug('Tipos de cambio: ' + thisClass.tiposDeCambio);

        // Create the list of exchange rates to send it to the component               
        List<WRAPPER_Balance.TiposDeCambio> listTipConversion;
        System.debug('CUrrencies list: ' + thisClass.currenciesList);
        for(String s : thisClass.currenciesList)
        {
            listTipConversion = new List<WRAPPER_Balance.TiposDeCambio>();           
            //Map<String, Decimal> cambiosEquiv = Global_Utilities.getExchangeRates(s , thisClass.currenciesList,  1); 
            Map<String, Decimal> cambiosEquiv = getExchangeRates(s , 1, true, thisClass);    
            System.debug('Cambios SF: ' + cambiosEquiv)     ;
            for (String key : cambiosEquiv.keySet())
            {                
                WRAPPER_Balance.TiposDeCambio tiposCambioInd = new WRAPPER_Balance.TiposDeCambio();
                tiposCambioInd.divisa = key;
                tiposCambioInd.value = cambiosEquiv.get(key);
                // Sets the scale for the currency exchange values
                tiposCambioInd.value = tiposCambioInd.value.setScale(8);
                listTipConversion.add(tiposCambioInd);
                //thisClass.exchangeRates.put(tiposCambioInd.divisa, tiposCambioInd.value);
            }             
            thisClass.tiposDeCambio.put(s,listTipConversion);   
            //System.debug('thisClass.exchangeRates: ' + thisClass.exchangeRates) ;
            System.debug('thisClass.tiposDeCambio: ' + thisClass.tiposDeCambio);
        } 
    }

    /*----------------------------------------------------------------------------------    
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Calculates de main and available balance for each of the accounts
    History
    <Date>			<Author>		        <Description>
    03/08/2020		Guillermo Giral         Initial version
    ----------------------------------------------------------------------------------*/
    public static void getAccountByCurrencyIAM (WRAPPER_Balance_LU response, CNT_GlobalPositionController thisClass,List<WRAPPER_Balance.ListaTipCambio> lista){
        
        Double avaibleBookBalance = 0;
        Double totalBookBalance = 0;
        
        Map<String,Decimal> exchangeRates = getExchangeRates(thisClass.divisaPrincipal,  1, true, thisClass);
        //Map<String, Decimal> exchangeRates = Global_Utilities.getExchangeRates(thisClass.divisaPrincipal , thisClass.currenciesList,  1);  
        System.debug('Get Account By Currency: ' + exchangeRates);
        for(WRAPPER_Balance.ListaTipCambio tipo : lista){
            Integer count=0;
            Double availableBalanceCurrency = 0.0;
            Double bookBalanceCurrency = 0.0;
            for(WRAPPER_Balance_LU.AccountsDataList account : response.accountsList.accountsDataList)
            {
              	//AM - 01/10/2020 - Fix Saldo por moneda sin permisos GP 
            	if(account.balanceAllowed){
                    if(account.availableBalance != null || account.mainBalance != null){
                        // if(account.availableBalance.currencyCode==tipo.tipoDeCambio.divisa){
                        if(account.mainBalance.currencyCode==tipo.tipoDeCambio.divisa){
                            count+=1;
                            tipo.tipoDeCambio.accountNumber=count;
                            if(account.availableBalance != null && account.availableBalance.amount != null && account.availableBalance.amount != 0){
                                availableBalanceCurrency += account.availableBalance.amount;
                            }else{
                                availableBalanceCurrency += 0.0; 
                            }
                            
                            if(account.mainBalance != null && account.mainBalance.amount != 0 && account.mainBalance.amount != null){
                                bookBalanceCurrency += account.mainBalance.amount;
                            }else{
                                bookBalanceCurrency += 0.0;
                            }
                            
                        }
                        
                        tipo.tipoDeCambio.totalBalanceEquivalente = bookBalanceCurrency;
                        if(tipo.tipoDeCambio.divisa != thisClass.divisaPrincipal){
                            if(bookBalanceCurrency != null && bookBalanceCurrency != 0){
                                totalBookBalance += (bookBalanceCurrency/ exchangeRates.get(tipo.tipoDeCambio.divisa));
                            }else{
                                totalBookBalance += 0.0;
                            }
                            
                            if(availableBalanceCurrency != 0 && availableBalanceCurrency != null) {
                                avaibleBookBalance += (availableBalanceCurrency / exchangeRates.get(tipo.tipoDeCambio.divisa));   
                            }else{
                                avaibleBookBalance += 0.0;
                            }   
                            System.debug('Exchange rates - Tipo de cambio - Divisa: ' + exchangeRates.get(tipo.tipoDeCambio.divisa));
                            System.debug('Exchange rates - Tipo de cambio - Divisa Principal: ' + thisClass.divisaPrincipal);
                        }
                        else{
                            if(bookBalanceCurrency != null){
                                totalBookBalance += bookBalanceCurrency;
                            }
                            if(availableBalanceCurrency != null){
                                avaibleBookBalance += availableBalanceCurrency;  
                            }    
                        } 
                    }
            	}
            }
        }        
        thisClass.cambioDivisas=lista;       
    }


    //SNJ - 22/04/2020 -- Do not show the currency information of hidden accounts
    //SNJ - 28/04/2020 -- Get the exchange rates from service response and add them into 'thisClass.cambioDivisas_EOD'
    //SNJ - 04/05/2020 -- Defualt currencies are 'EUR', 'USD', and 'GBP' and set defualt user currency
    @AuraEnabled
    public static void setCurrenciesList(WRAPPER_Balance response, CNT_GlobalPositionController thisClass) 
    {
        
        thisClass.currenciesList = new List<String>();
        List<WRAPPER_Balance.ListaTipCambio> lista = new List<WRAPPER_Balance.ListaTipCambio>();
        thisClass.currenciesList = new List<String>();
        List<Datetime> currencyExchangeTimeStampList = new List<Datetime>();
        
        
        
        if(response.listaTipCambio != null && response.listaTipCambio.size() > 0){
            for(WRAPPER_Balance.ListaTipCambio tipo : response.listaTipCambio) 
            {
                lista.add(tipo);
                
            }
            List<WRAPPER_Balance.CuentaArbol> listaCuentasPais;
            for(WRAPPER_Balance.BalancesArbol item : response.balancesArbol) {
                listaCuentasPais = new List<WRAPPER_Balance.CuentaArbol>();
                //Iterate accounts
                for(WRAPPER_Balance.ListaMonedasArbol listMonedasArbol : item.paisArbol.listaMonedasArbol){
                    for(WRAPPER_Balance.CuentaArbol thisAccount : listMonedasArbol.monedaArbol.cuentaArbol){ 
                        if(thisClass.currenciesList != null){
                            if(!thisClass.currenciesList.contains(thisAccount.divisa)){
                                thisClass.currenciesList.add(thisAccount.divisa);
                                //currenciesLst.add(thisAccount.divisa);
                            }
                        }
                    }
                }
            }
            
            //thisClass.divisaPrincipal = response.listaTipCambio[0].tipoDeCambio.divisa;
            if(response.listaTipCambio.size() > 0){
                if(response.listaTipCambio[0] != null){
                    if(response.listaTipCambio[0].tipoDeCambio != null){
                        thisClass.divisaPrincipal = response.listaTipCambio[0].tipoDeCambio.divisa;
                        //currenciesLst.add(response.listaTipCambio[0].tipoDeCambio.divisa);
                    }
                }
            }
            
            if(!thisClass.currenciesList.contains(thisClass.divisaPrincipal)){
                thisClass.currenciesList.add(thisClass.divisaPrincipal);
                // currenciesLst.add(thisClass.divisaPrincipal);
                
            }
            
            if(!thisClass.currenciesList.contains('EUR')){
                thisClass.currenciesList.add('EUR');
                // currenciesLst.add('EUR');
            }
            if(!thisClass.currenciesList.contains('GBP')){
                thisClass.currenciesList.add('GBP');
                //currenciesLst.add('GBP');
            }
            if(!thisClass.currenciesList.contains('USD')){
                thisClass.currenciesList.add('USD');
                //currenciesLst.add('USD');
            }
            
            for(WRAPPER_Balance.ListaTipCambio tipoDeCambio : response.listaTipCambio){
                if(tipoDeCambio.tipoDeCambio != null){
                    if(tipoDeCambio.tipoDeCambio.fecha != null && tipoDeCambio.tipoDeCambio.fecha != ''){
                        String fecha = tipoDeCambio.tipoDeCambio.fecha;
                        String lastDateAcc = fecha.replaceAll('T', ' ');
                        lastDateAcc = lastDateAcc.replace('+0000', 'Z');
                        DateTime dt = Datetime.valueOf(lastDateAcc);
                        currencyExchangeTimeStampList.add(dt);
                    }
                    
                    if(thisClass.currenciesList.contains(tipoDeCambio.tipoDeCambio.divisa)){
                        thisClass.cambioDivisas_EOD.add(tipoDeCambio.tipoDeCambio);
                    }         
                    
                }
                
            }
            if(currencyExchangeTimeStampList.size() > 0){
                currencyExchangeTimeStampList.sort();
                thisClass.eRatesLastModifiedDate = String.valueOf(currencyExchangeTimeStampList.get(currencyExchangeTimeStampList.size() - 1));
            }
            if( thisClass.currenciesList != null){
                thisClass.currenciesList.sort();
            }
            thisClass.cambioDivisas = lista;
        }
        
    }
    
    //SNJ - 24/04/2020 -- Sum the total of accounts grouped by currency
    //SNJ - 28/04/2020 -- Get the exchange rates from service response and calcualte it using this class method 'getExchangeRates'
    //SNJ - 11/05/2020	-- Data validation before calculating
    public static void getAccountByCurrency( CNT_GlobalPositionController thisClass,List<WRAPPER_Balance.ListaTipCambio> lista){
        
        Double avaibleBookBalance = 0;
        Double totalBookBalance = 0;
        
        Map<String,Decimal> exchangeRates = getExchangeRates(thisClass.divisaPrincipal,  1, false,  thisClass);
        DateTime lastValueDate;
        
        for(WRAPPER_Balance.ListaTipCambio tipo : lista){
            Integer count=0;
            Double availableBalanceCurrency = 0.0;
            Double bookBalanceCurrency = 0.0;
            
            for(WRAPPER_Balance.CountryGrouped account : thisClass.accountsByCountry) {
                
                for(WRAPPER_Balance.CuentaArbol grouping : account.listaCuentas) {
                    grouping.bookDate = grouping.bookDate.replaceAll('T',' ');
                    if(lastValueDate == null)
                    {
                        lastValueDate = DateTime.valueOf(grouping.bookDate);
                    } else{
                        
                        if(DateTime.valueOf(grouping.bookDate) > lastValueDate)
                        {
                            lastValueDate = DateTime.valueOf(grouping.bookDate);
                        }
                    }
                    
                    if(grouping.divisa==tipo.tipoDeCambio.divisa){
                        count+=1;
                        tipo.tipoDeCambio.accountNumber=count;
                        if(grouping.valueBalance != null){
                            availableBalanceCurrency += Double.valueOf(grouping.valueBalance); 
                        }else{
                            availableBalanceCurrency += 0.0;
                        }
                        if(grouping.bookBalance != null){
                            bookBalanceCurrency +=  Double.valueOf(grouping.bookBalance);  
                        }else{
                            bookBalanceCurrency += 0.0;  
                        }
                        
                    }
                }
            }
            tipo.tipoDeCambio.totalBalanceEquivalente = bookBalanceCurrency;
            if(tipo.tipoDeCambio.divisa != thisClass.divisaPrincipal){ 
                if(bookBalanceCurrency != 0 && bookBalanceCurrency != null){
                    totalBookBalance += (bookBalanceCurrency/ exchangeRates.get(tipo.tipoDeCambio.divisa)); 
                }else{
                    totalBookBalance += 0.0;
                }
                
                if(availableBalanceCurrency != 0 && availableBalanceCurrency != null){
                    avaibleBookBalance += (availableBalanceCurrency / exchangeRates.get(tipo.tipoDeCambio.divisa));
                }else{
                    avaibleBookBalance += 0.0;
                }
                
            }
            else{
                if(bookBalanceCurrency != null){
                    totalBookBalance += bookBalanceCurrency;
                }else{
                    totalBookBalance +=0.0;
                }
                if(availableBalanceCurrency != null){
                    avaibleBookBalance += availableBalanceCurrency;  
                }else{
                    avaibleBookBalance += 0.0;
                }
                
                
            }            
            
        }
        
        
        thisClass.headerLastModifiedDate = String.valueOf(lastValueDate);    
        thisClass.cambioDivisas=lista;
        
        
    }
    
    //SNJ - 24/04/2020 -- Sum the total of accounts grouped by currency
    //SNJ - 28/04/2020 -- Calcualte the currency exchange using this class method 'getExchangeRates' instead of 'getExchangeRates' of 'Global_Utilities' Class
    //SNJ - 11/05/2020	-- Data validation before calculating
    public static void getAccountByCurrencyLU(WRAPPER_Balance_LU response, CNT_GlobalPositionController thisClass,List<WRAPPER_Balance.ListaTipCambio> lista){
        
        Double avaibleBookBalance = 0;
        Double totalBookBalance = 0;
        
        Map<String,Decimal> exchangeRates = getExchangeRates(thisClass.divisaPrincipal,  1, true, thisClass);
        for(WRAPPER_Balance.ListaTipCambio tipo : lista){
            Integer count=0;
            Double availableBalanceCurrency = 0.0;
            Double bookBalanceCurrency = 0.0;
            for(WRAPPER_Balance_LU.AccountsDataList account : response.accountsList.accountsDataList)
            {        
                if(account.availableBalance != null){
                    // if(account.availableBalance.currencyCode==tipo.tipoDeCambio.divisa){
                    if(account.mainBalance.currencyCode==tipo.tipoDeCambio.divisa){
                        count+=1;
                        tipo.tipoDeCambio.accountNumber=count;
                        if(account.availableBalance.amount != null && account.availableBalance.amount != 0){
                            availableBalanceCurrency += account.availableBalance.amount;
                        }else{
                            availableBalanceCurrency += 0.0; 
                        }
                        
                        if(account.mainBalance.amount != 0 && account.mainBalance.amount != null){
                            bookBalanceCurrency += account.mainBalance.amount;
                        }else{
                            bookBalanceCurrency += 0.0;
                        }
                        
                    }
                    
                    tipo.tipoDeCambio.totalBalanceEquivalente = bookBalanceCurrency;
                    if(tipo.tipoDeCambio.divisa != thisClass.divisaPrincipal){
                        if(bookBalanceCurrency != null && bookBalanceCurrency != 0){
                            totalBookBalance += (bookBalanceCurrency/ exchangeRates.get(tipo.tipoDeCambio.divisa));
                        }else{
                            totalBookBalance += 0.0;
                        }
                        
                        if(availableBalanceCurrency != 0 && availableBalanceCurrency != null) {
                            avaibleBookBalance += (availableBalanceCurrency / exchangeRates.get(tipo.tipoDeCambio.divisa));   
                        }else{
                            avaibleBookBalance += 0.0;
                        }
                        
                        
                    }
                    else{
                        if(bookBalanceCurrency != null){
                            totalBookBalance += bookBalanceCurrency;
                        }
                        if(availableBalanceCurrency != null){
                            avaibleBookBalance += availableBalanceCurrency;  
                        }
                        
                        
                    } 
                }
            }
        }
        
        thisClass.cambioDivisas=lista;
        
    }
    //SNJ - 28/04/2020 -- Calcualte the currency exchange using this class method 'getExchangeRates' instead of 'getExchangeRates' of 'Global_Utilities' Class
    //SNJ - 11/05/2020	-- Data validation before calculating
    @AuraEnabled
    public static void setAvaibleBalance(WRAPPER_Balance response, CNT_GlobalPositionController thisClass)
    {
        Double avaibleBookBalance = 0;
        Double totalBookBalance = 0;
        
        for(WRAPPER_Balance.BalancesArbol arbolBalance : response.balancesArbol)
        {
            if(arbolBalance.paisArbol.sumValueBalanceDivUsu != null){
                avaibleBookBalance += arbolBalance.paisArbol.sumValueBalanceDivUsu;
            }
            if(arbolBalance.paisArbol.sumBookBalanceDivUsu != null){
                totalBookBalance += arbolBalance.paisArbol.sumBookBalanceDivUsu;
            }
            
            
            
        }   
        
        List<WRAPPER_Balance.ListaTipCambio> lista = new List<WRAPPER_Balance.ListaTipCambio>();
        List<WRAPPER_Balance.TiposDeCambio> exchangeByCurrency;
        
        for(WRAPPER_Balance.ListaTipCambio tipo : thisClass.cambioDivisas) 
        {
            exchangeByCurrency = new List<WRAPPER_Balance.TiposDeCambio>();
            WRAPPER_Balance.TiposDeCambio tipoDeCambio = new WRAPPER_Balance.TiposDeCambio();
            
            /////////////////////////////SIN ENTENDER
            //   tipo.tipoDeCambio.totalBalanceEquivalente = Global_Utilities.convertCurrency(thisClass.divisaPrincipal, tipo.tipoDeCambio.divisa, totalBookBalance);
            
            if(thisClass.currenciesList.contains(tipo.tipoDeCambio.divisa))
            {
                
                Map<String,Decimal> temporal  = getExchangeRates(tipo.tipoDeCambio.divisa, 1, false,  thisClass);
                for (String key : temporal.keySet()) 
                {
                    exchangeByCurrency.add(new WRAPPER_Balance.TiposDeCambio(key, temporal.get(key).setScale(8)));
                }
                
                lista.add(tipo);
            }
            
            thisClass.tiposDeCambio.put(tipo.tipoDeCambio.divisa, exchangeByCurrency);
            
            
        }
        
        
        thisClass.cambioDivisas = lista;//componente drch
        thisClass.totalBookBalance = totalBookBalance; //Total de los totales
        thisClass.avaibleBookBalance = avaibleBookBalance;//Total de los totales
        
        
    }
    //SNJ - 28/04/2020 -- Calcualte the currency exchange using this class method 'getExchangeRates' instead of 'getExchangeRates' of 'Global_Utilities' Class
    //SNJ - 11/05/2020	-- Data validation before calculating
    @AuraEnabled
    public static void groupAccounts(WRAPPER_Balance response, CNT_GlobalPositionController thisClass)
    {
        //  Map<String,Decimal> exchangeRates = Global_Utilities.getExchangeRates(thisClass.divisaPrincipal, thisClass.currenciesList, 1);
        Map<String,Decimal> exchangeRates = getExchangeRates(thisClass.divisaPrincipal,  1, false, thisClass);
        Map<String,List<WRAPPER_Balance.CuentaArbol>> mapaByCorporate = new Map<String,List<WRAPPER_Balance.CuentaArbol>>();
        List<WRAPPER_Balance.CuentaArbol> listaCuentasPais;
        WRAPPER_Balance.CountryGrouped pais;
        
        for(WRAPPER_Balance.BalancesArbol item : response.balancesArbol)
        {
            //Reset variables
            listaCuentasPais = new List<WRAPPER_Balance.CuentaArbol>();
            pais = new WRAPPER_Balance.CountryGrouped();
            
            //Fill variables
            pais.countryCode = item.paisArbol.codPais;
            pais.countryFullName = Global_Utilities.getCountryName(item.paisArbol.codPais);
            pais.availableBalance = 0.0;
            pais.totalBalance = 0.0;
            
            //Iterate accounts
            for(WRAPPER_Balance.ListaMonedasArbol listMonedasArbol : item.paisArbol.listaMonedasArbol)
            {                       
                String divisa = listMonedasArbol.monedaArbol.divisaCuenta;
                for(WRAPPER_Balance.CuentaArbol thisAccount : listMonedasArbol.monedaArbol.cuentaArbol)
                {                 
                    if(divisa != thisClass.divisaPrincipal && thisClass.currenciesList.contains(divisa)) {
                        if(thisAccount.valueBalance != null && thisAccount.valueBalance != 0){
                            pais.availableBalance += (thisAccount.valueBalance / exchangeRates.get(divisa));
                        }else{
                            pais.availableBalance += 0.0;
                        }
                        if(thisAccount.bookBalance != 0 && thisAccount.bookBalance != null){
                            pais.totalBalance += (thisAccount.bookBalance / exchangeRates.get(divisa));  
                        }else{
                            pais.totalBalance += 0.0;
                        }
                        
                    } else{
                        if(thisAccount.valueBalance != null){
                            pais.availableBalance += thisAccount.valueBalance;
                        }else{
                            pais.availableBalance += 0.0;
                        }
                        if(thisAccount.bookBalance != null){
                            pais.totalBalance += thisAccount.bookBalance;
                        }else{
                            pais.totalBalance += 0.0;
                        }
                        
                    }
                    
                    //Fill account list
                    listaCuentasPais.add(thisAccount);
                    
                    //Grouping by corporate
                    if(mapaByCorporate.get(thisAccount.nombreCorporate) == null) 
                    {
                        mapaByCorporate.put(thisAccount.nombreCorporate, new List<WRAPPER_Balance.CuentaArbol> {thisAccount});
                    }
                    else 
                    {
                        List<WRAPPER_Balance.CuentaArbol> listaValores = mapaByCorporate.get(thisAccount.nombreCorporate);
                        listaValores.add(thisAccount);
                        mapaByCorporate.put(thisAccount.nombreCorporate, listaValores);
                    }
                    
                    
                }
            }
            item.paisArbol.sumBookBalanceDivUsu = pais.totalBalance;
            item.paisArbol.sumValueBalanceDivUsu = pais.availableBalance;
            
            //Fill last variables account
            pais.listaCuentas = listaCuentasPais;
            pais.accountCount = pais.listaCuentas.size();
            thisClass.accountsByCountry.add(pais);
        }
        
        WRAPPER_Balance.CorporateGrouped valueByCorp = null;
        Double avaibleBookBalanceCorp;
        Double totalBookBalanceCorp;
        
        for (String key : mapaByCorporate.keySet()) 
        {
            avaibleBookBalanceCorp = 0.0;
            totalBookBalanceCorp = 0.0;
            
            valueByCorp = new WRAPPER_Balance.CorporateGrouped();
            List<WRAPPER_Balance.CuentaArbol> listaCuentas = mapaByCorporate.get(key);
            
            
            //SNJ - 23/04/2020 -- Calculates the exchange value if its required
            for(WRAPPER_Balance.CuentaArbol cuenta: listaCuentas) {                
                
                if(thisClass.currenciesList.contains(cuenta.divisa)){                    
                    
                    if(cuenta.divisa != thisClass.divisaPrincipal){
                        Double avaibleBookBalanceCorp_aux = 0;
                        Double totalBookBalanceCorp_aux = 0;
                        if(cuenta.valueBalance != 0 && cuenta.valueBalance != null){
                            avaibleBookBalanceCorp += (cuenta.valueBalance / exchangeRates.get(cuenta.divisa));
                        }else{
                            avaibleBookBalanceCorp += 0.0;
                        }                    
                        if(cuenta.bookBalance != 0 && cuenta.bookBalance != null){
                            totalBookBalanceCorp += (cuenta.bookBalance / exchangeRates.get(cuenta.divisa)); 
                        }else{
                            totalBookBalanceCorp += 0.0;
                        }
                        
                        
                    }else{
                        
                        if(cuenta.valueBalance != null){
                            avaibleBookBalanceCorp += Double.valueOf(cuenta.valueBalance); 
                        }else{
                            avaibleBookBalanceCorp += 0.0;
                        }
                        
                        if(cuenta.bookBalance != null){
                            totalBookBalanceCorp += Double.valueOf(cuenta.bookBalance); 
                        }else{
                            totalBookBalanceCorp += 0.0;
                        }
                        
                    }
                }
            }
            
            
            
            valueByCorp.corporateName = key;
            valueByCorp.listaCuentas = listaCuentas;
            valueByCorp.accountCount = listaCuentas.size();
            valueByCorp.availableBalance = avaibleBookBalanceCorp;
            valueByCorp.totalBalance = totalBookBalanceCorp;            
            thisClass.accountsByCorporate.add(valueByCorp);
            
        }
        
        
    }
    
    //SNJ - 11/05/2020	-- Data validation before calculating
    public static void exchangeCurrencies(CNT_GlobalPositionController thisClass)
    {
        //thisClass.bookBalanceMapped = Global_Utilities.getExchangeRates(thisClass.divisaPrincipal, thisClass.currenciesList, thisClass.totalBookBalance);
        thisClass.bookBalanceMapped  = getExchangeRates(thisClass.divisaPrincipal,  thisClass.totalBookBalance, false, thisClass);
        //thisClass.avaibleBookBalanceMapped =  Global_Utilities.getExchangeRates(thisClass.divisaPrincipal, thisClass.currenciesList, thisClass.avaibleBookBalance);
        thisClass.avaibleBookBalanceMapped  = getExchangeRates(thisClass.divisaPrincipal,  thisClass.avaibleBookBalance, false, thisClass);
        Decimal avaibleBookBalance = 0.0;
        if(thisClass.avaibleBookBalance != null){
            avaibleBookBalance = Decimal.valueOf(thisClass.avaibleBookBalance);
        }
        
        
        
        for(WRAPPER_Balance.CountryGrouped grouping : thisClass.accountsByCountry) 
        {
            //grouping.avaibleBalanceMapped =  Global_Utilities.getExchangeRates(thisClass.divisaPrincipal, thisClass.currenciesList, grouping.availableBalance);
            grouping.avaibleBalanceMapped = getExchangeRates(thisClass.divisaPrincipal,  grouping.availableBalance, false, thisClass);
            //grouping.bookBalanceMapped = Global_Utilities.getExchangeRates(thisClass.divisaPrincipal, thisClass.currenciesList, grouping.totalBalance);
            grouping.bookBalanceMapped = getExchangeRates(thisClass.divisaPrincipal,  grouping.totalBalance, false, thisClass);
        }
        
        for(WRAPPER_Balance.CorporateGrouped grouping : thisClass.accountsByCorporate)
        {
            //grouping.avaibleBalanceMapped =  Global_Utilities.getExchangeRates(thisClass.divisaPrincipal, thisClass.currenciesList, grouping.availableBalance);
            grouping.avaibleBalanceMapped = getExchangeRates(thisClass.divisaPrincipal,  grouping.availableBalance, false, thisClass);
            //grouping.bookBalanceMapped = Global_Utilities.getExchangeRates(thisClass.divisaPrincipal, thisClass.currenciesList, grouping.totalBalance);
            grouping.bookBalanceMapped = getExchangeRates(thisClass.divisaPrincipal,  grouping.totalBalance, false, thisClass);
        }
        
    }
    
    /*----------------------------------------------------------------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Gets all the currencies from the account list response and calculates
                    the exchange rates
    History
    <Date>			<Author>		        <Description>
    29/04/2020      Shahad Naji             Do not show the currency information of hidden accounts
    28/04/2020      Shahad Naji             Get the exchange rates from service response and add them into 'thisClass.cambioDivisas_EOD'
    04/05/2020      Shahad Naji             Defualt currencies are 'EUR', 'USD', and 'GBP'
    11/05/2020      Shahad Naji             Data validation before calculating
    03/08/2020		Guillermo Giral         Added logic for OneTrade => fetch the exchanges rates from Salesforce
    -----------------------------------------------------------------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void handleExchangeRatesLU(WRAPPER_Balance_LU response, CNT_GlobalPositionController thisClass)
    {
        
        //Loading currencies
        List<String> currenciesList = new List<String>();
        // Get the last modified date of the Currencies data
        List<Datetime> currencyExchangeTimeStampList = new List<Datetime>();
        thisClass.exchangeRates = new Map<String,Decimal>();
        List<WRAPPER_Balance_LU.TipoDeCambio> tipoCambioAux = new List<WRAPPER_Balance_LU.TipoDeCambio>();
        List<WRAPPER_Balance.TipoDeCambio> tipoCambioCurrency = new List<WRAPPER_Balance.TipoDeCambio>();
        
        for(WRAPPER_Balance_LU.AccountsDataList cuenta : response.accountsList.accountsDataList)
        {
            if(cuenta.mainBalance != null){
                if(cuenta.mainBalance.currencyCode != ''){
                    if(cuenta.mainBalance.currencyCode != null){
                        if(!currenciesList.contains(cuenta.mainBalance.currencyCode)){
                            currenciesList.add(cuenta.mainBalance.currencyCode);
                            currenciesLst.add(cuenta.mainBalance.currencyCode);
                        }                        
                    }                    
                }else if(cuenta.mainBalance.currencyCode == ''){
                    if(cuenta.availableBalance != null){
                        if(cuenta.availableBalance.currencyCode != null ){
                            if(cuenta.availableBalance.currencyCode != ''){
                                if(!currenciesList.contains(cuenta.availableBalance.currencyCode)){
                                    currenciesList.add(cuenta.availableBalance.currencyCode);
                                    currenciesLst.add(cuenta.availableBalance.currencyCode);
                                } 
                            }
                            //myAccount.currencyCodeAvailableBalance = cuenta.mainBalance.currencyCode;
                            
                        }
                    }
                }
            }else if(cuenta.mainBalance == null){
                if(cuenta.availableBalance != null){
                    if(cuenta.availableBalance.currencyCode != null ){
                        if(cuenta.availableBalance.currencyCode != ''){
                            if(!currenciesList.contains(cuenta.availableBalance.currencyCode)){
                                currenciesList.add(cuenta.availableBalance.currencyCode);
                                currenciesLst.add(cuenta.availableBalance.currencyCode);
                            }
                        }
                        //myAccount.currencyCodeAvailableBalance = cuenta.mainBalance.currencyCode; 
                    }
                }
            }                     
        }
        
        thisClass.currenciesList = currenciesList;
        if(!thisClass.currenciesList.contains('USD')) {
            thisClass.currenciesList.add('USD');
            currenciesLst.add('USD');
        }
        if(!thisClass.currenciesList.contains('GBP')) {
            thisClass.currenciesList.add('GBP');
            currenciesLst.add('GBP');
        }
        //SNJ - 22/04/2020
        if(!thisClass.currenciesList.contains('EUR')) {
            thisClass.currenciesList.add('EUR');
            currenciesLst.add('EUR');
        }
        
        
        
        
        if(response.listaTipCambio != null){   
            if(response.listaTipCambio.size() > 0){
                if(response.listaTipCambio[0].tipoDeCambio != null){
                    if(response.listaTipCambio[0].tipoDeCambio.divisa != null && response.listaTipCambio[0].tipoDeCambio.divisa != ''){
                        
                        thisClass.divisaPrincipal = response.listaTipCambio[0].tipoDeCambio.divisa;
                        
                    }
                    
                }
                
                for(WRAPPER_Balance_LU.ListaTipCambio tipoDeCambio : response.listaTipCambio){
                    
                    if(tipoDeCambio.tipoDeCambio != null){
                        
                        if(tipoDeCambio.tipoDeCambio.divisa != null && tipoDeCambio.tipoDeCambio.importeDecimal != null && thisClass.currenciesList.contains(tipoDeCambio.tipoDeCambio.divisa)){
                            // currenciesList.add(tipoDeCambio.tipoDeCambio.divisa);
                            
                            thisClass.exchangeRates.put(tipoDeCambio.tipoDeCambio.divisa, Decimal.valueOf(tipoDeCambio.tipoDeCambio.importeDecimal).setScale(8));  
                            tipoCambioAux.add(tipoDeCambio.tipoDeCambio);
                            WRAPPER_Balance.TipoDeCambio aux = new WRAPPER_Balance.TipoDeCambio();
                            aux.divisa = tipoDeCambio.tipoDeCambio.divisa;
                            if(tipoDeCambio.tipoDeCambio.importe != null){
                                aux.importe = tipoDeCambio.tipoDeCambio.importe; 
                            }else{
                                aux.importe = 0;
                            }
                            
                            aux.fecha = tipoDeCambio.tipoDeCambio.fecha;
                            aux.importeDecimal = tipoDeCambio.tipoDeCambio.importeDecimal;
                            aux.nombreDivisa = tipoDeCambio.tipoDeCambio.nombreDivisa;
                            tipoCambioCurrency.add(aux);
                            
                            
                        }
                        if(tipoDeCambio.tipoDeCambio.divisa != null && tipoDeCambio.tipoDeCambio.importeDecimal != null){
                            if(tipoDeCambio.tipoDeCambio.fecha != null && tipoDeCambio.tipoDeCambio.fecha != '' && thisClass.currenciesList.contains(tipoDeCambio.tipoDeCambio.divisa)){
                                String fecha = tipoDeCambio.tipoDeCambio.fecha;
                                String lastDateAcc = fecha.replaceAll('T', ' ');
                                lastDateAcc = lastDateAcc.replace('+0000', 'Z');
                                DateTime dt = Datetime.valueOf(lastDateAcc);
                                currencyExchangeTimeStampList.add(dt);
                            }
                        }
                        
                        if(thisClass.currenciesList.contains(tipoDeCambio.tipoDeCambio.divisa)){
                            thisClass.cambioDivisas_LU.add(tipoDeCambio.tipoDeCambio);
                        }
                    } 
                }
                thisClass.tiposDeCambio_LU.put(thisClass.divisaPrincipal, tipoCambioAux);  
            }         
        
        // If response.listaTipCambio is null, it means we are in OneTrade and need to take the currency
        // exchanges values from SF
        } else {
            // [GG - 04/08/2020] Added logic for OneTrade
                
            // Get the default currency from the User
            System.debug('Currency List: ' + thisClass.currenciesList);
            thisClass.divisaPrincipal = UserInfo.getDefaultCurrency();
            Map<String, Map<Decimal, CurrencyType>> mainCurrencyExchangeRates = Global_Utilities.getExchangeRatesWithExtraInfo(thisClass.divisaPrincipal, thisClass.currenciesList, 1);

            // Loop through all the currency list and add the exchange rates to the exchangeRates object
            for(String c : thisClass.currenciesList){
                WRAPPER_Balance.TipoDeCambio tipoCambio = new WRAPPER_Balance.TipoDeCambio();
                //WRAPPER_Balance_LU.TipoDeCambio tipoCambio = new WRAPPER_Balance_LU.TipoDeCambio();
                Decimal exchangeRate = new List<Decimal>(mainCurrencyExchangeRates.get(c).keySet())[0];
                tipoCambio.divisa = c;
                tipoCambio.importe = exchangeRate.setScale(2);
                tipoCambio.importeDecimal = exchangeRate.setScale(8);
                tipoCambio.fecha = String.valueOf(mainCurrencyExchangeRates.get(c).get(exchangeRate).LastModifiedDate);
                //tipoCambio.nombreDivisa = tipoDeCambio.tipoDeCambio.nombreDivisa;
                tipoCambio.nombreDivisa = c;
                tipoCambioCurrency.add(tipoCambio);
                thisClass.exchangeRates.put(c, tipoCambio.importeDecimal);

                // Get the timestamp of the latest fetched exchange rate and set cambioDivisas_LU
                String lastDateAcc = tipoCambio.fecha.replaceAll('T', ' ');
                lastDateAcc = lastDateAcc.replace('+0000', 'Z');
                DateTime dt = Datetime.valueOf(lastDateAcc);
                currencyExchangeTimeStampList.add(dt);

                WRAPPER_Balance_LU.TipoDeCambio tipoCambioLU = new WRAPPER_Balance_LU.TipoDeCambio();
                System.debug('Current currency: ' + c);
                tipoCambioLU.divisa = c;
                tipoCambioLU.importe = exchangeRate.setScale(2);
                tipoCambioLU.importeDecimal = exchangeRate.setScale(8);
                tipoCambioLU.fecha = String.valueOf(mainCurrencyExchangeRates.get(c).get(exchangeRate).LastModifiedDate);
                //tipoCambioLU.nombreDivisa = tipoDeCambio.tipoDeCambio.nombreDivisa;
                tipoCambioLU.nombreDivisa = c;

                tipoCambioAux.add(tipoCambioLU);
                thisClass.tiposDeCambio_LU.put(thisClass.divisaPrincipal, tipoCambioAux);
                if(thisClass.currenciesList.contains(c)){
                    thisClass.cambioDivisas_LU.add(tipoCambioLU);
                }
            }
        }


        if(thisClass.divisaPrincipal != null && thisClass.divisaPrincipal != ''){
            if(!thisClass.currenciesList.contains(thisClass.divisaPrincipal)) {
                thisClass.currenciesList.add(thisClass.divisaPrincipal);
                currenciesLst.add(thisClass.divisaPrincipal);
            }
        }

        if(!currencyExchangeTimeStampList.isEmpty()){
            currencyExchangeTimeStampList.sort();
            thisClass.eRatesLastModifiedDate = String.valueOf(currencyExchangeTimeStampList.get(currencyExchangeTimeStampList.size() - 1));
        }  
        if( thisClass.currenciesList != null){
            thisClass.currenciesList.sort();
        }   
        
    }
    
    //SNJ - 28/04/2020 -- Calcualte the currency exchange using this class method 'getExchangeRates' instead of 'getExchangeRates' of 'Global_Utilities' Class
    //SNJ - 11/05/2020	-- Data validation before calculating
    @AuraEnabled
    public static void groupAccountsLU(WRAPPER_Balance_LU response, CNT_GlobalPositionController thisClass) 
    {
        Map<String, List<WRAPPER_Balance.CuentaArbol>> accountByCountryMap = new Map<String, List<WRAPPER_Balance.CuentaArbol>>();
        List<WRAPPER_Balance.CountryGrouped> accountsByCountry = new List<WRAPPER_Balance.CountryGrouped>();
        
        Map<String, List<WRAPPER_Balance.CuentaArbol>> accountByCorporateMap = new Map<String, List<WRAPPER_Balance.CuentaArbol>>();
        List<WRAPPER_Balance.CorporateGrouped> accountsByCorporate = new List<WRAPPER_Balance.CorporateGrouped>();
        
        
        Map<String,Decimal> exchangeRates = getExchangeRates(thisClass.divisaPrincipal,  1, true, thisClass);
        DateTime lastDate;
        
        for(WRAPPER_Balance_LU.AccountsDataList cuenta : response.accountsList.accountsDataList)
        {
            //Getting the last date.
            String lastDateAcc = '';
            if(cuenta.mainBalance != null)
            {
                if(cuenta.mainBalance.lastUpdate != null)
                {
                    lastDateAcc = cuenta.mainBalance.lastUpdate.replaceAll('T', ' ');
                    lastDateAcc = lastDateAcc.replace('+0000', 'Z');
                }
            }
            
            
            
            if(lastDateAcc != '')
            {
                if(lastDate == null )
                {
                    lastDate = Datetime.valueOf(lastDateAcc);
                }
                
                if(DateTime.valueOf(lastDateAcc) > lastDate)
                {
                    lastDate = Datetime.valueOf(lastDateAcc);
                }
            }
            
            
            //Convert to generic wrapper
            WRAPPER_Balance.CuentaArbol cuentaActual = new WRAPPER_Balance.CuentaArbol();
            
			//AM - 28/09/2020 - Ebury Accounts
            if(thisClass.isOneTrade && cuenta.dataProvider != null && (cuenta.dataProvider == Label.EburyCaps || cuenta.dataProvider == Label.Ebury)){
                cuenta.dataProvider         = Label.Ebury;
                cuentaActual.dataProvider   = Label.Ebury;

                //Ebury accounts won't have availableBalance, we will use mainBalance to show both.
                cuenta.availableBalance     = cuenta.mainBalance;

                //List of associated account details to show at Details Account Page.
                if(cuenta.associatedAccountList != null && !cuenta.associatedAccountList.isEmpty()){
                    cuentaActual.associatedAccountList = cuenta.associatedAccountList;
                }
            }
            
            if(cuenta.availableBalance != null){
                if(cuenta.mainBalance != null){
                    if(cuenta.mainBalance.currencyCode != '' && cuenta.mainBalance.currencyCode != null){
                        cuentaActual.divisa = cuenta.mainBalance.currencyCode; 
                    }
                }else if(cuenta.mainBalance == null){
                    if(cuenta.availableBalance.currencyCode != '' && cuenta.availableBalance.currencyCode != null){
                        cuentaActual.divisa = cuenta.availableBalance.currencyCode; 
                    }
                }
                
                cuentaActual.availableBalanceDouble = cuenta.availableBalance.amount;
            }else{
                cuentaActual.availableBalanceDouble = 0.0;
                cuentaActual.divisa = thisClass.divisaPrincipal;
            }
            
            cuentaActual.bookBalanceDouble = (cuenta.mainBalance != null && cuenta.mainBalance.amount != null) ? cuenta.mainBalance.amount : 0.0;
            
            //AM - 28/09/2020 - Ebury Accounts
            if(cuenta.dataProvider == Label.Ebury){
                if(accountByCountryMap.get(cuenta.dataProvider) == null){
                    accountByCountryMap.put(Label.Ebury, new List<WRAPPER_Balance.CuentaArbol>{cuentaActual});
                }else{
                    List<WRAPPER_Balance.CuentaArbol> listaCuentasPais = accountByCountryMap.get(cuenta.dataProvider);
                    listaCuentasPais.add(cuentaActual);
                    accountByCountryMap.put(cuenta.dataProvider, listaCuentasPais);  
                }
            }else{
                //MAPPING AGAINST COUNTRY
                if(accountByCountryMap.get(cuenta.country) == null){
                    accountByCountryMap.put(cuenta.country, new List<WRAPPER_Balance.CuentaArbol>{cuentaActual});
                }else{
                    List<WRAPPER_Balance.CuentaArbol> listaCuentasPais = accountByCountryMap.get(cuenta.country);
                    listaCuentasPais.add(cuentaActual);
                    accountByCountryMap.put(cuenta.country, listaCuentasPais);
                }
            }
            //MAPPING AGAINST CORPORATE
            if(thisClass.isOneTrade == true){
                cuentaActual.nombreCorporate = cuenta.parentCustomerName;
                cuentaActual.balanceAllowed = cuenta.balanceAllowed;
                cuentaActual.transactionsAllowed = cuenta.transactionsAllowed;
                cuentaActual.internationalPaymentsAllowed = cuenta.internationalPaymentsAllowed;
                if(cuenta.parentCustomerName != null){
                    if(accountByCorporateMap.get(cuenta.parentCustomerName) == null){
                        //cuentaActual.nombreCorporate = cuenta.parentCustomerName;
                        accountByCorporateMap.put(cuenta.parentCustomerName, new List<WRAPPER_Balance.CuentaArbol>{cuentaActual});
                    } else {
                        List<WRAPPER_Balance.CuentaArbol> listaCuentasCorporate = accountByCorporateMap.get(cuenta.parentCustomerName);
                        //cuentaActual.nombreCorporate = cuenta.parentCustomerName;
                        listaCuentasCorporate.add(cuentaActual);
                        accountByCorporateMap.put(cuenta.parentCustomerName, listaCuentasCorporate);
                    }
                }
            } else {
                if(accountByCorporateMap.get(cuenta.customerName) == null) 
                {
                    accountByCorporateMap.put(cuenta.customerName, new List<WRAPPER_Balance.CuentaArbol>{cuentaActual});               
                } else 
                {
                    List<WRAPPER_Balance.CuentaArbol> listaCuentasCorporate = accountByCorporateMap.get(cuenta.customerName);
                    listaCuentasCorporate.add(cuentaActual);
                    accountByCorporateMap.put(cuenta.customerName, listaCuentasCorporate);
                }
            }          
        }
        thisClass.headerLastModifiedDate = String.valueOf(lastDate);
        
        // Group the accounts and make the balance sum based on the countries
        for (String key : accountByCountryMap.keySet()) 
        {
            Double avaibleBookBalanceCount = 0.0;
            Double totalBookBalanceCount = 0.0;
            WRAPPER_Balance.CountryGrouped valueByCountry = new WRAPPER_Balance.CountryGrouped();
            List<WRAPPER_Balance.CuentaArbol> listaCuentas = accountByCountryMap.get(key);
            for(WRAPPER_Balance.CuentaArbol cuenta: listaCuentas)
            {
                // If the community is One Trade and the user hasn't got permission to see the account balance, 
                // DO NOT add its available / book balance to the total sum
                if(!thisClass.isOneTrade || (thisClass.isOneTrade && cuenta.balanceAllowed == true)){
                    if (thisClass.exchangeRates.get(cuenta.divisa) != null){
                        if(cuenta.availableBalanceDouble != null && cuenta.availableBalanceDouble != 0){
                            avaibleBookBalanceCount += (cuenta.availableBalanceDouble / thisClass.exchangeRates.get(cuenta.divisa));                          
                        }else{
                            avaibleBookBalanceCount += 0;
                        }
                        
                        if(cuenta.bookBalanceDouble != 0 && cuenta.bookBalanceDouble != null){
                            totalBookBalanceCount += (cuenta.bookBalanceDouble / thisClass.exchangeRates.get(cuenta.divisa)); 
                        }else{
                            totalBookBalanceCount += 0; 
					 
					
					  
					
																																									  
																				 
                        }
                        
					 
					
																					
																		  
                    }else{
                        
                        if( avaibleBookBalanceCount != null &&  avaibleBookBalanceCount != 0 && cuenta.availableBalanceDouble!=null && cuenta.availableBalanceDouble!=0 ){
                            avaibleBookBalanceCount += cuenta.availableBalanceDouble;
                        }else{
                            avaibleBookBalanceCount += 0;
                        }
                        
                        if(totalBookBalanceCount != null && totalBookBalanceCount != 0){
                            totalBookBalanceCount += cuenta.bookBalanceDouble;
                        }else{
                            totalBookBalanceCount += 0;
                        }                       
                    }
					
                }
            }
            
            //valueByCountry.corporateName = key;
            valueByCountry.countryCode = key;
            
            //AM - 28-09-2020 - Ebury Accounts
            if(key == Label.Ebury){
                valueByCountry.countryFullName = Label.Ebury;
            }else{
                valueByCountry.countryFullName = Global_Utilities.getCountryName(key);
            }
            
            valueByCountry.listaCuentas = listaCuentas;
            valueByCountry.accountCount = listaCuentas.size();
            valueByCountry.availableBalance = avaibleBookBalanceCount;
            
            valueByCountry.totalBalance = totalBookBalanceCount;
            thisClass.accountsByCountry.add(valueByCountry);
            //ADDING TOTAL BALANCE
            thisClass.totalBookBalance += totalBookBalanceCount;
            thisClass.avaibleBookBalance += avaibleBookBalanceCount;
            
            //TOTAL BOOK BALANCE EXCHANGE CURRENCIES        
            valueByCountry.bookBalanceMapped = getExchangeRates(thisClass.divisaPrincipal, totalBookBalanceCount, true, thisClass);
            if(totalBookBalanceCount != null && totalBookBalanceCount != 0){
                valueByCountry.bookBalanceMapped.put(thisClass.divisaPrincipal, Decimal.valueOf(totalBookBalanceCount));
            }else{
                valueByCountry.bookBalanceMapped.put(thisClass.divisaPrincipal, 0.0);  
            }
            
            
            //AVAILABLE BOOK BALANCE EXCHANGE CURRENCIES          
            valueByCountry.avaibleBalanceMapped = getExchangeRates(thisClass.divisaPrincipal, avaibleBookBalanceCount, true, thisClass);
            if(avaibleBookBalanceCount != 0 && avaibleBookBalanceCount != null){
                valueByCountry.avaibleBalanceMapped.put(thisClass.divisaPrincipal, Decimal.valueOf(avaibleBookBalanceCount));  
            }else{
                valueByCountry.avaibleBalanceMapped.put(thisClass.divisaPrincipal,0.0);   
            }
            
            
        }
        

        // Group the accounts and make the balance sum based on the corporates
        for (String key : accountByCorporateMap.keySet()) 
        {
            Double avaibleBookBalanceCount = 0.0;
            Double totalBookBalanceCount = 0.0;
            WRAPPER_Balance.CorporateGrouped valueByCorporate = new WRAPPER_Balance.CorporateGrouped();
            List<WRAPPER_Balance.CuentaArbol> listaCuentas = accountByCorporateMap.get(key);
            for(WRAPPER_Balance.CuentaArbol cuenta: listaCuentas)
            {
                // If the community is One Trade and the user hasn't got permission to see the account balance, 
                // DO NOT add its available / book balance to the total sum
                if(!thisClass.isOneTrade || (thisClass.isOneTrade && cuenta.balanceAllowed == true)){
                    if (thisClass.exchangeRates.get(cuenta.divisa) != null){
                        if(cuenta.availableBalanceDouble != 0 && cuenta.availableBalanceDouble != null){
                            avaibleBookBalanceCount += (cuenta.availableBalanceDouble / thisClass.exchangeRates.get(cuenta.divisa));     
                        }else{
                            avaibleBookBalanceCount += 0; 
                        }
                        
                        if(cuenta.bookBalanceDouble != 0 && cuenta.bookBalanceDouble != null){
                            totalBookBalanceCount += (cuenta.bookBalanceDouble / thisClass.exchangeRates.get(cuenta.divisa)); 
                        }else{
                            totalBookBalanceCount += 0;
					 
					
					  
					
																									
																				  
                        }
                        
					 
																						  
																		   
                    }else{
                        
                        if(cuenta.availableBalanceDouble != 0 && cuenta.availableBalanceDouble != null){
                            avaibleBookBalanceCount += cuenta.availableBalanceDouble; 
                        }else{
                            avaibleBookBalanceCount += 0;
                        }
                        if(cuenta.bookBalanceDouble != 0 && cuenta.bookBalanceDouble != null){
                            totalBookBalanceCount += cuenta.bookBalanceDouble; 
                        }else{
                            totalBookBalanceCount += 0; 
                        }                        
                    }
					
                }
            }
            valueByCorporate.corporateName = key;
            valueByCorporate.listaCuentas = listaCuentas;
            valueByCorporate.accountCount = listaCuentas.size();
            valueByCorporate.availableBalance = avaibleBookBalanceCount;
            valueByCorporate.totalBalance = totalBookBalanceCount;
            
            
            //TOTAL BOOK BALANCE EXCHANGE CURRENCIES
            valueByCorporate.bookBalanceMapped = getExchangeRates(thisClass.divisaPrincipal, totalBookBalanceCount, true, thisClass);
            if(totalBookBalanceCount != null){
                valueByCorporate.bookBalanceMapped.put(thisClass.divisaPrincipal, Decimal.valueOf(totalBookBalanceCount));
            }else{
                valueByCorporate.bookBalanceMapped.put(thisClass.divisaPrincipal, 0.0);
            }
            
            
            //AVAILABLE BOOK BALANCE EXCHANGE CURRENCIES
            valueByCorporate.avaibleBalanceMapped = getExchangeRates(thisClass.divisaPrincipal, avaibleBookBalanceCount, true, thisClass); 
            if(avaibleBookBalanceCount != null){
                valueByCorporate.avaibleBalanceMapped.put(thisClass.divisaPrincipal, Decimal.valueOf(avaibleBookBalanceCount)); 
            }else{
                valueByCorporate.avaibleBalanceMapped.put(thisClass.divisaPrincipal, 0.0); 
            }
            
            
            thisClass.accountsByCorporate.add(valueByCorporate);
        }
        //EXCHANGE CURRENCIES OF TOTALS.
        thisClass.avaibleBookBalanceMapped = getExchangeRates(thisClass.divisaPrincipal, thisClass.avaibleBookBalance, true, thisClass);
        thisClass.bookBalanceMapped = getExchangeRates(thisClass.divisaPrincipal, thisClass.totalBookBalance, true, thisClass); 
    }
        
    //SNJ - 28/04/2020 -- Calcualte the currency exchange using this class method 'getExchangeRates' instead of 'getExchangeRates' of 'Global_Utilities' Class
    @AuraEnabled
    public static void exchangeCurrenciesLU(CNT_GlobalPositionController thisClass)
    {
        //EXCHANGES OF TOTAL BOOK BALANCE AND AVAILABLE BALANCE
        
        List<WRAPPER_Balance.ListaTipCambio> cambios = new List<WRAPPER_Balance.ListaTipCambio>();
        
        for (String key : thisClass.exchangeRates.keySet())
        {
            
            WRAPPER_Balance.ListaTipCambio tipoCambio= new WRAPPER_Balance.ListaTipCambio();
            tipoCambio.tipoDeCambio = new WRAPPER_Balance.TipoDeCambio();
            tipoCambio.tipoDeCambio.divisa = key;
            tipoCambio.tipoDeCambio.totalBalanceEquivalente = thisClass.bookBalanceMapped.get(key);
            
            cambios.add(tipoCambio);
        }
        thisClass.cambioDivisas = cambios;
        
        
        List<WRAPPER_Balance.TiposDeCambio> listTipConversion;
        for(String s : thisClass.currenciesList)
        {
            listTipConversion = new List<WRAPPER_Balance.TiposDeCambio>();
            
            Map<String, Decimal> cambiosEquiv = getExchangeRates(s,  1, true, thisClass);
            
            
            for (String key : cambiosEquiv.keySet())
            {
                
                WRAPPER_Balance.TiposDeCambio tiposCambioInd = new WRAPPER_Balance.TiposDeCambio();
                tiposCambioInd.divisa = key;
                tiposCambioInd.value = cambiosEquiv.get(key);
                // Sets the scale for the currency exchange values
                tiposCambioInd.value = tiposCambioInd.value.setScale(8);
                listTipConversion.add(tiposCambioInd);
            }            
            thisClass.tiposDeCambio.put(s,listTipConversion);          
        }       
    }
    
    /*------------------------------------------------------------
    Author:         Diego Asis
    Company:        Deloitte
    Description:    Get Welcome Pack checkbox value from user
    History 
    <Date>          <Author>                <Change Description>
    05/03/2019      Diego Asis              Intial Version
    ------------------------------------------------------------*/
    
    @AuraEnabled 
    public static Map<String, boolean> getIsCashNexus(){
        Map<String, boolean> userData = new Map <String, boolean>();
        
        try{
            Id userId = UserInfo.getUserId();
            User isCashNexus = [SELECT Id, USER_CHK_CashNexus__c, USER_CHK_TermsConditions__c, USER_TXT_BIC__c FROM User WHERE Id =: userId LIMIT 1];
            
            if(!userData.containsKey('isCashNexusUser')){ 
                if(isCashNexus.USER_CHK_CashNexus__c){
                    userData.put('isCashNexusUser', true); 
                }
                else{
                    userData.put('isCashNexusUser', false);
                    
                    if(!userData.containsKey('BIC')){ 
                        if(isCashNexus.USER_TXT_BIC__c != '') {
                            String bicCountry = isCashNexus.USER_TXT_BIC__c.substring(4, 6);
                            List<String> countries = new List<String>();
                            countries.add('GB');
                            countries.add('ES');
                            countries.add('BR');
                            countries.add('KY');
                            countries.add('LU');
                            countries.add('PL');
                            
                            if(countries.contains(bicCountry)) {
                                userData.put('BIC', true);
                                if(bicCountry == 'GB'){ 
                                    userData.put('GB', true);
                                }
                                else if(bicCountry == 'ES'){
                                    userData.put('ES', true);
                                }
                                else if(bicCountry == 'PL'){
                                    userData.put('PL', true);
                                }
                                else if(bicCountry == 'BR' || bicCountry == 'KY' || bicCountry == 'LU'){
                                    userData.put('Other', true);
                                }
                            } else {
                                userData.put('BIC', false);
                            }
                        } else {
                            userData.put('BIC', false);
                        }              
                    }
                }                
            }
            
            if(!userData.containsKey('agreedTerms')){ 
                if(isCashNexus.USER_CHK_TermsConditions__c){
                    userData.put('agreedTerms', true); 
                }
                else{
                    userData.put('agreedTerms', false);   
                }                
            }
        }
        catch(Exception e ){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
        
        return userData;
    }
    
    
    
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji 
    Company:        Deloitte
    Description:    Gets the exchanges rates from a each of the currencies to the rest 
    History
    <Date>			<Author>		     <Description>
    28/04/2020		Shahad Naji        Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled (cacheable=true)
    public static Map<String,Decimal> getExchangeRates(String actualIsoCode,  Decimal value, Boolean isLastUpdate, CNT_GlobalPositionController thisClass)
    {
        Map<String,Decimal> mapReturn = new Map<String,Decimal>();
        
        if(isLastUpdate){
            
            List<WRAPPER_Balance_LU.TipoDeCambio> cambioDivisas =  thisClass.cambioDivisas_LU;
            WRAPPER_Balance_LU.TipoDeCambio fromCode;
            Integer i = 0;
            Boolean ok = false;
            while(i < cambioDivisas.size() && !ok){
                if(cambioDivisas.get(i).divisa == actualIsoCode){
                    ok = true;
                    fromCode = cambioDivisas.get(i);
                }
                i++;
            }
            
            Decimal valueTemp;
            for(WRAPPER_Balance_LU.TipoDeCambio actualCurrency : cambioDivisas){
                valueTemp = 0.0;
                if(actualCurrency != null && fromCode != null && actualCurrency.divisa != fromCode.divisa){
                    if(value != null && value != 0){
                        valueTemp = value / fromCode.importeDecimal;
                        valueTemp = valueTemp * actualCurrency.importeDecimal; 
                    }
                }
                else
                {
                    valueTemp = value;
                }            
                mapReturn.put(actualCurrency.divisa, valueTemp);
                
            }
            
            
            
        }else{
            
            List<WRAPPER_Balance.TipoDeCambio> cambioDivisas = thisClass.cambioDivisas_EOD;
            
            WRAPPER_Balance.TipoDeCambio fromCode;
            Integer i = 0;
            Boolean ok = false;
            while(i < cambioDivisas.size() && !ok){
                if(cambioDivisas.get(i).divisa == actualIsoCode){
                    ok = true;
                    fromCode = cambioDivisas.get(i);
                }
                i++;
            }
            
            Decimal valueTemp;
            for(WRAPPER_Balance.TipoDeCambio actualCurrency : cambioDivisas){
                valueTemp = 0.0;
                if(actualCurrency.divisa != fromCode.divisa) 
                {
                    if(value != null && value != 0){
                        valueTemp = value / fromCode.importeDecimal;
                        valueTemp = valueTemp * actualCurrency.importeDecimal;
                    }
                    
                }
                else
                {
                    valueTemp = value;
                }            
                mapReturn.put(actualCurrency.divisa, valueTemp);
                
                
            }}
        return mapReturn;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji 
    Company:        Deloitte
    Description:    Sets user currency 
    of them
    History
    <Date>			<Author>		     <Description>
    04/05/2020		Shahad Naji        Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled 
    public static Boolean setUserCurrency(String currencyStr){
        Boolean isTrue = true;
        try{
            if(currencyStr != '' && currencyStr != null){
                Id iUserId = UserInfo.getUserId();
                system.debug('>>> SNJ user Id : ' + iUserId);
                User iUser = [SELECT Id, CurrencyIsoCode, DefaultCurrencyIsoCode FROM User WHERE Id =: iUserId LIMIT 1];
                
                iUser.CurrencyIsoCode = currencyStr;
                iUser.DefaultCurrencyIsoCode = currencyStr;
                system.debug('>>> SNJ new currency: ' + currencyStr);
                update iUser; 
                
                
            }
            
            
        }catch(Exception e ){ 
            isTrue = false;
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return isTrue;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Data encrypting
    History
    <Date>			<Author>		<Description>
    21/05/2020		 R. Cervino    Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }
    
    /*----------------------------------------------------------------------------------
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Data decrypting
    History
    <Date>			<Author>		<Description>
    21/05/2020		 R. Cervino    Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
    }

    /*----------------------------------------------------------------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Check whether any of the accounts can be displayed in the window
    History
    <Date>			<Author>		        <Description>
    14/09/2020      Guillermo Giral             Initial Version
    -----------------------------------------------------------------------------------------------------------------------------------------*/
    private static Boolean canUserSeeGlobalPosition (WRAPPER_Balance_LU response){
        Boolean canSeeGlobalPosition = false;
        // Loop through every of the accounts to check if the user has permission to see any of the balances
        for(WRAPPER_Balance_LU.AccountsDataList cuenta : response.accountsList.accountsDataList)
        {
            System.debug('CUENTA: ' + cuenta);
            if(cuenta.balanceAllowed != null && cuenta.balanceAllowed == true){
                canSeeGlobalPosition = true;
                break;
            }
        }
        
        return canSeeGlobalPosition;
    }

    /*----------------------------------------------------------------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Check whether any of the accounts can be displayed payments tracker
    History
    <Date>			<Author>		        <Description>
    14/09/2020      Guillermo Giral             Initial Version
    -----------------------------------------------------------------------------------------------------------------------------------------*/
    private static Boolean canUserSeePaymentsTracker (WRAPPER_Balance_LU response){
        Boolean canSeePaymentsTracker = false;
        // Loop through every of the accounts to check if the user has permission to see any of the balances
        for(WRAPPER_Balance_LU.AccountsDataList cuenta : response.accountsList.accountsDataList)
        {
            if(cuenta.internationalPaymentsAllowed != null && cuenta.internationalPaymentsAllowed == true){
                canSeePaymentsTracker = true;
                break;
            }
        }
        
        return canSeePaymentsTracker;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to check whether the user is a One Trade user
    History
    <Date>			<Author>		            <Description>
    11/09/2020		Guillermo Giral             Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled(cacheable=true)
    public static Boolean isOneTrade (String userId){
        try{
            List<User> currentUser = [SELECT Id, USER_TXT_BIC__c, USER_country__c, USER_CHK_CashNexus__c 
                                FROM User
                               	WHERE Id =: userId];
            if(currentUser[0] != null){
                List<String> bics = Label.oneTradeBics.split(',');
                List<String> countries = Label.oneTradeCountries.split(',');
                if(bics.contains(currentUser[0].USER_TXT_BIC__c) && countries.contains(currentUser[0].USER_country__c) && !currentUser[0].USER_CHK_CashNexus__c){
                    return true;
                }
            }
        }catch(Exception e){
            System.debug('CNT_GlobalPositionController.isOneTrade: ' + e.getMessage());
        }
        
        return false;
    }
}