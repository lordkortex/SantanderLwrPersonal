@isTest
public with sharing class WRAPPER_TrackingPaymentOperation_Test {
    static testMethod void testParse() {
		String json = '{'+
		'  \"inputData\": {'+
		'    \"operationDetail\": {'+
		'      \"operationType\": \"b2b\",'+
		'      \"serviceId\": \"add_international_payment_internal\",'+
		'      \"userGlobalId\": \"ab34521\",'+
		'      \"operationStatus\": {'+
		'        \"status\": \"Authorized\",'+
		'        \"reason\": \"Payment is partially authorized\",'+
		'        \"statusDate\": \"2020-04-22T17:15:35.552Z\"'+
		'      },'+
		'      \"sourceData\": {'+
		'        \"name\": \"Banco Santander\",'+
		'        \"sourceAccount\": {'+
		'          \"accountType\": \"IBA\",'+
		'          \"accountId\": \"GB54ABBY6578956387330\",'+
		'          \"tcurrency\": \"GBP\"'+
		'        },'+
		'        \"sourceAgent\": {'+
		'          \"agentId\": \"ABBYGB2LXXX\",'+
		'          \"name\": \"SANTANDER UK PLC\",'+
		'          \"address\": \"Bridle Road\"'+
		'        },'+
		'        \"country\": \"ES\"'+
		'      },'+
		'      \"destinationData\": {'+
		'        \"name\": \"string\",'+
		'        \"destinationAccount\": {'+
		'          \"accountType\": \"IBA\",'+
		'          \"accountId\": \"ES54004956387330056782\",'+
		'          \"tcurrency\": \"EUR\"'+
		'        },'+
		'        \"destinationAgent\": {'+
		'          \"agentId\": \"BSCHESMMXXX\",'+
		'          \"name\": \"Banco Santander España\",'+
		'          \"address\": \"Avda Cantabria s/n Boadilla del Monte\"'+
		'        },'+
		'        \"country\": \"ES\"'+
		'      },'+
		'      \"operationStep1Data\": {'+
		'        \"opStep1Id\": \"string\",'+
		'        \"status\": \"string\",'+
		'        \"valueDate\": \"2020-06-17\",'+
		'        \"flowIndicator\": \"S\",'+
		'        \"intermediateAgentAccount\": {'+
		'          \"accountType\": \"string\",'+
		'          \"accountId\": \"string\"'+
		'        }'+
		'      },'+
		'      \"operationStep2Data\": {'+
		'        \"opStep2Id\": \"string\",'+
		'        \"status\": \"string\",'+
		'        \"valueDate\": \"2020-06-17\",'+
		'        \"flowIndicator\": \"D\",'+
		'        \"intermediateAgentAccount\": {'+
		'          \"accountType\": \"string\",'+
		'          \"accountId\": \"string\"'+
		'        }'+
		'      },'+
		'      \"issueDate\": \"2020-07-07T13:05:30.346Z\",'+
		'      \"chargeBearer\": \"string\",'+
		'      \"operationAmount\": {'+
		'        \"tcurrency\": \"PLN\",'+
		'        \"amount\": 1000'+
		'      },'+
		'      \"counterValueOperationAmount\": {'+
		'        \"tcurrency\": \"USD\",'+
		'        \"amount\": 0,'+
		'        \"tradeCurrency\": \"EUR\"'+
		'      },'+
		'      \"sourceTotalAmount\": {'+
		'        \"tcurrency\": \"USD\",'+
		'        \"amount\": 0'+
		'      },'+
		'      \"clientReference\": \"string\",'+
		'      \"purpose\": \"string\",'+
		'      \"operationDescription\": \"string\",'+
		'      \"subject\": \"Customer Order 0123213213\",'+
		'      \"operationFraudDetails\": {'+
		'        \"fraudValidationResult\": \"OK\",'+
		'        \"fraudReference\": \"9a0a67d3675b4627b28034517737437f\"'+
		'      },'+
		'      \"operationNominalFxDetails\": {'+
		'        \"fxCountervalueId\": \"A12345678901234567890123456789012345B\",'+
		'        \"priceType\": \"ONL\",'+
		'        \"discount\": 25,'+
		'        \"ccyCountervalue\": {'+
		'          \"ccyCountervalueAmount\": 1200.85,'+
		'          \"ccyCountervalueCurrency\": \"EUR\"'+
		'        },'+
		'        \"valueDateEfx\": \"2020-07-15\",'+
		'        \"customerExchangeRate\": 1.10000002,'+
		'        \"fxComercialMargin\": {'+
		'          \"fxComercialMarginCurrency\": \"EUR\",'+
		'          \"fxComercialMarginAmount\": 27.05'+
		'        },'+
		'        \"nominalAmountNoMarkUp\": {'+
		'          \"amount\": 345.89,'+
		'          \"tcurrency\": \"EUR\"'+
		'        }'+
		'      },'+
		'      \"operationFeesFxDetails\": {'+
		'        \"fxCountervalueId\": \"A12345678901234567890123456789012345B\",'+
		'        \"priceType\": \"ONL\",'+
		'        \"discount\": 25,'+
		'        \"ccyCountervalue\": {'+
		'          \"ccyCountervalueAmount\": 1200.85,'+
		'          \"ccyCountervalueCurrency\": \"EUR\"'+
		'        },'+
		'        \"valueDateEfx\": \"2020-07-15\",'+
		'        \"customerExchangeRate\": 1.10000002'+
		'      },'+
		'      \"pricingDetails\": {'+
		'        \"productName\": \"string\",'+
		'        \"totalPrice\": 38.9,'+
		'        \"tcurrency\": \"EUR\",'+
		'        \"currencyList\": ['+
		'          {'+
		'            \"tcurrency\": \"USD\",'+
		'            \"currencyName\": \"U.S. dollar\",'+
		'            \"conceptsList\": ['+
		'              {'+
		'                \"conceptId\": 293,'+
		'                \"conceptName\": \"share fee\",'+
		'                \"specialPrice\": {'+
		'                  \"specialPriceLevel\": \"product agreement\",'+
		'                  \"specialTiersList\": ['+
		'                    {'+
		'                      \"specialAmountTier\": 50000.12345,'+
		'                      \"specialAmountTierType\": \"I\",'+
		'                      \"specialFixedRatePrice\": {'+
		'                        \"specialRate\": 1.250126,'+
		'                        \"specialMinimumAmount\": 10,'+
		'                        \"specialMaximumAmount\": 500,'+
		'                        \"tcurrency\": \"EUR\"'+
		'                      },'+
		'                      \"specialFixedAmountPrice\": {'+
		'                        \"specialFixedAmount\": 3,'+
		'                        \"tcurrency\": \"EUR\"'+
		'                      }'+
		'                    }'+
		'                  ]'+
		'                },'+
		'                \"standardPrice\": {'+
		'                  \"standardTiersList\": ['+
		'                    {'+
		'                      \"standardAmountTier\": 5000.12345,'+
		'                      \"standardAmountTierType\": \"S\",'+
		'                      \"standardFixedRatePrice\": {'+
		'                        \"standardRate\": 1.25,'+
		'                        \"standardMinimumAmount\": 10,'+
		'                        \"standardMaximumAmount\": 500,'+
		'                        \"tcurrency\": \"EUR\"'+
		'                      },'+
		'                      \"standardFixedAmountPrice\": {'+
		'                        \"standardFixedAmount\": 3,'+
		'                        \"tcurrency\": \"EUR\"'+
		'                      }'+
		'                    }'+
		'                  ]'+
		'                },'+
		'                \"conceptAmount\": {'+
		'                  \"amount\": 250,'+
		'                  \"tcurrency\": \"EUR\",'+
		'                  \"fixing\": 1.25'+
		'                }'+
		'              }'+
		'            ]'+
		'          }'+
		'        ]'+
		'      }'+
		'    },'+
		'    \"refundDetails\": {'+
		'      \"globalUserId\": \"x124903\",'+
		'      \"authUserId\": \"x569085\",'+
		'      \"authDate\": \"2020-06-17T10:20:33.256Z\",'+
		'      \"authComments\": \"The funds can be returned to the customer. Validation OK\",'+
		'      \"creationDate\": \"2020-06-17T10:20:33.256Z\",'+
		'      \"refundType\": \"bank_error\",'+
		'      \"refundAmount\": {'+
		'        \"amount\": 1234566.98,'+
		'        \"tcurrency\": \"EUR\"'+
		'      },'+
		'      \"status\": \"string\",'+
		'      \"reason\": \"Duplicated payment confirmed due to a bank error. Funds have to be returned to the originator of the original payment\",'+
		'      \"comments\": \"Refund needed due to a possible duplicated detected\",'+
		'      \"refundDate\": \"2020-06-17\"'+
		'    },'+
		'    \"operationTracking\": ['+
		'      {'+
		'        \"trackingOperationType\": \"postrequestcountervalue\",'+
		'        \"headers\": \"string\",'+
		'        \"resquestBody\": \"string\",'+
		'        \"responseBody\": \"string\",'+
		'        \"responseDate\": \"2020-07-25T10:10:10.123Z\",'+
		'        \"responseCode\": 200,'+
		'        \"responseDescription\": \"string\"'+
		'      }'+
		'    ]'+
		'  }'+
		'}';
		WRAPPER_TrackingPaymentOperation obj = WRAPPER_TrackingPaymentOperation.parse(json);
		System.assert(obj != null);
	}
}