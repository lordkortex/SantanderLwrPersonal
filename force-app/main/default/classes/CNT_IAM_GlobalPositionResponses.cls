public class CNT_IAM_GlobalPositionResponses {
    
        public static String getIAMErrorResponse()
    {
        return '{ "errors": [ {             "code": "11400007",             "message": "Error controlled 403",             "level": "ERROR",             "description": "Error controlled 403"         } ] }';
        
    }
    
    public static String getIAMOkResponse()
    {
        return '{'+'  \"accountsList\": {'+'    \"_links\": null,'+'    \"accountsDataList\": ['+'      {'+'        \"_links\": null,'+'        \"account\": null,'+
                '        \"accountIdList\": ['+'          {'+'            \"accountId\": \"ES4800490000000000000000\",'+ '            \"idType\": \"IBA\"'+'          }'+
                '        ],'+'        \"alias\": \"Alias Cuenta EBURY\",'+ '        \"availableBalance\": {'+'          \"amount\": 1000003.0,'+'          \"currencyCode\": \"EUR\",'+
                '          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+'        },'+'        \"balanceAllowed\": true,'+'        \"bankDescription\": \"0001\",'+'        \"bankId\": \"BSCHESM0XXX\",'+
                '        \"country\": \"ES\",'+'        \"customerId\": null,'+'        \"customerName\": null,'+'        \"description\": null,'+'        \"displayNumber\": \"ES******00\",'+'        \"flags\": {'+'          \"pain002Active\": true,'+'          \"hasSwiftPayments\": true'+'        },'+
                '        \"hasSwiftPayment\": \"YES\",'+'        \"hasSwiftPayments\": null,'+'        \"internationalPaymentsAllowed\": true,'+'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+'        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+'        \"mainBalance\": {'+
                '          \"amount\": 1000000.0,'+'          \"currencyCode\": \"EUR\",'+'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+'        },'+'        \"overdraftLimit\": null,'+
                '        \"overdraftUsed\": null,'+'        \"pain002Active\": true,'+'        \"parentCustomerName\": \"Santander\",'+'        \"pendingBalance\": null,'+
                '        \"status\": null,'+
                '        \"transactionsAllowed\": true,'+
                '        \"type\": \"IBA\",'+
                '		 \"dataProvider\": \"EBURY\",'+'        \"associatedAccountList\": ['+'           {'+'               \"associatedAccountDetails\": {'+
                '                   \"accountAddress\": \"Calle ebury 1 bla bla bla\",'+'                   \"accountName\": \"Associated Account Name Ebury 1\",'+
                '                   \"bankIdType\": \"Bank Id Type IBAN\",'+'                   \"bankId\": \"Bank Id 3030030303\",'+'                   \"account\": {'+'                       \"accountIdType\": \"Account Id Type IBAN\",'+'                       \"accountId\": \"Account Id EB02020202\"'+'                   }'+'               },'+'               \"associatedAccountDetails\": {'+'                   \"accountAddress\": \"Calle ebury 2 bla bla bla\",'+'                   \"accountName\": \"Associated Account Name Ebury 2\",'+'                   \"bankIdType\": \"Bank Id Type BBA\",'+'                   \"bankId\": \"Bank Id 8989898998\",'+'                   \"account\": {'+'                       \"accountIdType\": \"Account Id Type BBA\",'+'                       \"accountId\": \"Account Id EB989898989\"'+'                   }'+'               }'+'           }'+'        ],'+'        \"withholdingBalance\": null'+'      },'+'      {'+'        \"_links\": null,'+'        \"account\": null,'+'        \"accountIdList\": ['+'          {'+'            \"accountId\": \"ES9000490000000000000011\",'+'            \"idType\": \"IBA\"'+'          }'+'        ],'+'        \"alias\": \"Alias Cuenta EBURY\",'+'        \"availableBalance\": {'+'          \"amount\": 1000003.0,'+'          \"currencyCode\": \"EUR\",'+'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+'        },'+'        \"balanceAllowed\": true,'+'        \"bankDescription\": \"0001\",'+'        \"bankId\": \"BSCHESM0XXX\",'+'        \"country\": \"ES\",'+'        \"customerId\": null,'+'        \"customerName\": null,'+'        \"description\": null,'+'        \"displayNumber\": \"ES******11\",'+'        \"flags\": {'+'          \"pain002Active\": true,'+'          \"hasSwiftPayments\": true'+'        },'+'        \"hasSwiftPayment\": \"YES\",'+'        \"hasSwiftPayments\": null,'+'        \"internationalPaymentsAllowed\": true,'+'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+'        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+'        \"mainBalance\": {'+'          \"amount\": 1000000.0,'+'          \"currencyCode\": \"EUR\",'+'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+'        },'+'        \"overdraftLimit\": null,'+'        \"overdraftUsed\": null,'+'        \"pain002Active\": true,'+'        \"parentCustomerName\": \"Santander\",'+'        \"pendingBalance\": null,'+'        \"status\": null,'+'        \"transactionsAllowed\": true,'+'        \"type\": \"IBA\",'+'		 \"dataProvider\": \"EBURY\",'+'        \"withholdingBalance\": null'+'      },'+'      {'+'        \"_links\": null,'+'        \"account\": null,'+'        \"accountIdList\": ['+'          {'+'            \"accountId\": \"ES8100490075473000562155\",'+'            \"idType\": \"IBA\"'+'          }'+'        ],'+'        \"alias\": \"Alias Cuenta EBURY\",'+'        \"availableBalance\": {'+'          \"amount\": 1000003.0,'+'          \"currencyCode\": \"EUR\",'+'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+'        },'+'        \"balanceAllowed\": true,'+'        \"bankDescription\": \"0001\",'+'        \"bankId\": \"BSCHESM0XXX\",'+'        \"country\": \"ES\",'+'        \"customerId\": null,'+'        \"customerName\": null,'+'        \"description\": null,'+'        \"displayNumber\": \"ES******55\",'+'        \"flags\": {'+'          \"pain002Active\": true,'+'          \"hasSwiftPayments\": true'+'        },'+'        \"hasSwiftPayment\": \"YES\",'+'        \"hasSwiftPayments\": null,'+'        \"internationalPaymentsAllowed\": true,'+'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+'        \"lastUpdateSwiftPayment\": \"2019-10-04T11:38:00Z\",'+'        \"mainBalance\": {'+'          \"amount\": 1000000.0,'+'          \"currencyCode\": \"EUR\",'+'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+'        },'+'        \"overdraftLimit\": null,'+'        \"overdraftUsed\": null,'+'        \"pain002Active\": true,'+'        \"parentCustomerName\": \"Santander\",'+'        \"pendingBalance\": null,'+'        \"status\": null,'+'        \"transactionsAllowed\": true,'+'        \"type\": \"IBA\",'+'		 \"dataProvider\": \"EBURY\",'+'        \"withholdingBalance\": null'+'      },'+'      {'+'        \"_links\": null,'+'        \"account\": null,'+'        \"accountIdList\": ['+'          {'+'            \"accountId\": \"ES1000490072012110458432\",'+'            \"idType\": \"IBA\"'+'          }'+'        ],'+'        \"alias\": \"Alias Cuenta STRATIO\",'+'        \"availableBalance\": {'+'          \"amount\": 1000003.0,'+'          \"currencyCode\": \"EUR\",'+'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+'        },'+'        \"balanceAllowed\": true,'+'        \"bankDescription\": \"0001\",'+'        \"bankId\": \"BSCHESM0XXX\",'+'        \"country\": \"ES\",'+'        \"customerId\": null,'+'        \"customerName\": null,'+'        \"description\": null,'+'        \"displayNumber\": \"ES******32\",'+'        \"flags\": {'+'          \"pain002Active\": true,'+'          \"hasSwiftPayments\": true'+'        },'+'        \"hasSwiftPayment\": \"YES\",'+'        \"hasSwiftPayments\": null,'+'        \"internationalPaymentsAllowed\": true,'+'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+'        \"lastUpdateSwiftPayment\": \"2020-04-01T10:57:00Z\",'+'        \"mainBalance\": {'+'          \"amount\": 1000000.0,'+'          \"currencyCode\": \"EUR\",'+'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+'        },'+'        \"overdraftLimit\": null,'+'        \"overdraftUsed\": null,'+'        \"pain002Active\": true,'+'        \"parentCustomerName\": \"Santander\",'+'        \"pendingBalance\": null,'+'        \"status\": null,'+'        \"transactionsAllowed\": true,'+'        \"type\": \"IBA\",'+'		 \"dataProvider\": \"Stratio\",'+'        \"withholdingBalance\": null'+'      }'+
                '    ]'+'  }'+'}';
        
    }
    
    

}