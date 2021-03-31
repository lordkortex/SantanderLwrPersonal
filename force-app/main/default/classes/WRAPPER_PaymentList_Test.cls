@isTest
public class WRAPPER_PaymentList_Test {
    
    //This test method covers the attributes that are not used or tested yet 
    @isTest
    static void attributesLeftToTest(){
        
        String res = MockResponse.PaymentList();
        WRAPPER_PaymentList paymentList = (WRAPPER_PaymentList) JSON.deserialize(res, WRAPPER_PaymentList.class);
        WRAPPER_PaymentList.WRAPPER_Payment payment = paymentList.paymentsList[0];
        
        //WRAPPER_Payment not used attributes
        String parsedPaymentReason = payment.parsedPaymentReason;
        
    }
    
    @isTest
    static void json_Test2(){
        
        //probando JSON, cuando esté terminado meter en el MockResponse y llamar desde ahí
        String res = '{' +
            '	"paymentsList": [{' +
            '			"paymentId": "paymentId",' +
            '			"clientReference": "1111",' +
            '			"paymentStatus": "Pending",' +
            '			"parsedPaymentStatus": "parsedPaymentStatusTest",' +
            '			"paymentReason": "paymentReasonTest",' +
            '			"parsedPaymentReason": "parsedPaymentReasonTest",' +
            '			"sourceAccount": "1234",' +
            '			"sourceAlias": "sourceAliasTest",' +
            '			"sourceAccountIdType": "1234",' +
            '			"beneficiaryAccount": "beneficiaryAccountTest",' +
            '			"beneficiaryAccountIdType": "beneficiaryAccountIdTypeTest",' +
            '			"beneficiaryAlias": "beneficiaryAliasTest",' +
            '			"amount": 123.45,' +
            '			"paymentCurrency": "paymentCurrencyTest",' +
            '			"valueDate": \"2020-12-31\",' +
            '			"parsedValueDate": \"2020-12-31\",' +
            '			"paymentMethod": "paymentMethodTest",' +
            '			"parsedPaymentMethod": "parsedPaymentMethodTest",' +
            '			"destinationCountry": "destinationCountryTest",' +
            '			"parsedDestinationCountry": "parsedDestinationCountryTest",' +
            '			"destinationBic": "destinationBicTest",' +
            '			"sourceBank": "sourceBankTest",' +
            '			"statusUpdateDate": "statusUpdateDateTest",' +
            '			"fees": "10",' +
            '			"charges": "chargesTest",' +
            '			"sourceAccountHolder": "sourceAccountHolderTest",' +
            '			"sourceCountry": "ES",' +
            '			"parsedSourceCountry": "parsedSourceCountryTest",' +
            '			"sourceBic": "sourceBicTest",' +
            '			"beneficiaryAccountHolder": "beneficiaryAccountHolderTest",' +
            '			"beneficiaryBank": "beneficiaryBankTest",' +
            '			"beneficiarySwiftCode": "beneficiarySwiftCodeTest",' +
            '			"sourceSwiftCode": "1234",' +
            '			"paymentReference": "paymentReferenceTest",' +
            '			"fxFlag": false,' +
            '			"purpose": "purposeTest",' +
            '			"parsedPurpose": "parsedPurposeTest",' +
            '			"userGlobalId": "userGlobalIdTest",' +
            '			"sourceCurrency": "sourceCurrencyTest",' +
            '			"beneficiaryCurrency": "beneficiaryCurrencyTest",' +
            '			"tradeAmount": 123.45,' +
            '			"feesCurrency": "feesCurrencyTest",' +
            '			"convertedAmount": "convertedAmountTest",' +
            '			"convertedCurrency": "convertedCurrencyTest",' +
            '			"totalAmount": "totalAmountTest",' +
            '			"operationType": "operationTypeTest",' +
            '			"serviceId": "serviceIdTest",' +
            '			"operationStatus": {' +
            '				"status": "Authorized",' +
            '				"reason": "Payment is partially authorized",' +
            '				"statusDate": "2020-04-22T17:15:35.552Z"' +
            '			},' +
            '				"sourceData": {' +
            '					"name": "Banco Santander",' +
            '					"country": "ES",' +
            '					"sourceAccount": {' +
            '						"accountType": "IBA",' +
            '						"accountId": "GB54ABBY6578956387330",' +
            '						"tcurrency": "GBP"' +
            '					},' +
            '					"sourceAgent": {' +
            '						"agentId": "ABBYGB2LXXX",' +
            '						"name": "SANTANDER UK PLC",' +
            '						"address": "Bridle Road"' +
            '					}' +
            '				},' +
            '				"destinationData": {' +
            '					"name": "nameTest",' +
            '					"destinationAccount": {' +
            '						"accountType": "IBA",' +
            '						"accountId": "ES54004956387330056782",' +
            '						"tcurrency": "EUR"' +
            '					},' +
            '					"destinationAgent": {' +
            '						"agentId": "BSCHESMMXXX",' +
            '						"name": "Banco Santander España",' +
            '						"address": "Avda Cantabria s/n Boadilla del Monte"' +
            '					},' +
            '					"country": "ES"' +
            '				},' +
            '				"operationStep1Data": {' +
            '					"opStep1Id": "string",' +
            '					"status": "string",' +
            '					"valueDate": "2020-06-17",' +
            '					"flowIndicator": "S",' +
            '					"intermediateAgentAccount": {' +
            '						"accountType": "string",' +
            '						"accountId": "string"' +
            '					}' +
            '				},' +
            '				"operationStep2Data": {' +
            '					"opStep2Id": "string",' +
            '					"status": "string",' +
            '					"valueDate": "2020-06-17",' +
            '					"flowIndicator": "D",' +
            '					"intermediateAgentAccount": {' +
            '						"accountType": "string",' +
            '						"accountId": "string"' +
            '					}' +
            '				},' +
            '				"issueDate": "2020-07-07T13:05:30.346Z",' +
            '				"chargeBearer": "chargeBearerTest",' +
            '				"operationAmount": {' +
            '					"tcurrency": "EUR",' +
            '					"amount": 10' +
            '				},' +
            '				"counterValueOperationAmount": {' +
            '					"tcurrency": "USD",' +
            '					"amount": 0,' +
            '					"tradeCurrency": "EUR"' +
            '				},' +
            '				"sourceTotalAmount": {' +
            '					"tcurrency": "USD",' +
            '					"amount": 0' +
            '				},' +
            '				"operationDescription": "operationDescriptionTest",' +
            '				"subject": "subjectTest",' +
            '				"operationFraudDetails": {' +
            '					"fraudValidationResult": "OK",' +
            '					"fraudReference": "9a0a67d3675b4627b28034517737437f"' +
            '				},' +
            '				"operationNominalFxDetails": {' +
            '					"fxCountervalueId": "A12345678901234567890123456789012345B",' +
            '					"priceType": "ONL",' +
            '					"discount": 25,' +
            '					"ccyCountervalue": {' +
            '						"ccyCountervalueAmount": 1200.85,' +
            '						"ccyCountervalueCurrency": "EUR"' +
            '					},' +
            '					"valueDateEfx": "2020-07-15",' +
            '					"customerExchangeRate": 1.10000002,' +
            '					"fxComercialMargin": {' +
            '						"fxComercialMarginCurrency": "EUR",' +
            '						"fxComercialMarginAmount": 27.05' +
            '					},' +
            '					"nominalAmountNoMarkUp": {' +
            '						"amount": 345.89,' +
            '						"tcurrency": "EUR"' +
            '					}' +
            '				},' +
            '				"operationFeesFxDetails": {' +
            '					"fxCountervalueId": "A12345678901234567890123456789012345B",' +
            '					"priceType": "ONL",' +
            '					"discount": 25,' +
            '					"ccyCountervalue": {' +
            '						"ccyCountervalueAmount": 1200.85,' +
            '						"ccyCountervalueCurrency": "EUR"' +
            '					},' +
            '					"valueDateEfx": "2020-07-15",' +
            '					"customerExchangeRate": 1.10000002' +
            '				},' +
            '				"pricingDetails": {' +
            '					"productName": "string",' +
            '					"totalPrice": 38.9,' +
            '					"tcurrency": "EUR",' +
            '					"currencyList": [{' +
            '							"tcurrency": "USD",' +
            '							"currencyName": "U.S. dollar",' +
            '							"conceptsList": [{' +
            '									"conceptId": 293,' +
            '									"conceptName": "share fee",' +
            '									"specialPrice": {' +
            '										"specialPriceLevel": "product agreement",' +
            '										"specialTiersList": [{' +
            '												"specialAmountTier": 50000.12345,' +
            '												"specialAmountTierType": "I",' +
            '												"specialFixedRatePrice": {' +
            '													"specialRate": 1.250126,' +
            '													"specialMinimumAmount": 10,' +
            '													"specialMaximumAmount": 500,' +
            '													"tcurrency": "EUR"' +
            '												},' +
            '												"specialFixedAmountPrice": {' +
            '													"specialFixedAmount": 3,' +
            '													"tcurrency": "EUR"' +
            '												}' +
            '											}' +
            '										]' +
            '									},' +
            '									"standardPrice": {' +
            '										"standardTiersList": [{' +
            '												"standardAmountTier": 5000.12345,' +
            '												"standardAmountTierType": "S",' +
            '												"standardFixedRatePrice": {' +
            '													"standardRate": 1.25,' +
            '													"standardMinimumAmount": 10,' +
            '													"standardMaximumAmount": 500,' +
            '													"tcurrency": "EUR"' +
            '												},' +
            '												"standardFixedAmountPrice": {' +
            '													"standardFixedAmount": 3,' +
            '													"tcurrency": "EUR"' +
            '												}' +
            '											}' +
            '										]' +
            '									},' +
            '									"conceptAmount": {' +
            '										"amount": 250,' +
            '										"tcurrency": "EUR",' +
            '										"fixing": 1.25' +
            '									}' +
            '								}' +
            '							]' +
            '						}' +
            '					]' +
            '				}' +
            '			}, {' +
            '				"paymentId": "paymentId2",' +
            '				"sourceCountry": "ES",' +
            '				"clientReference": "1111",' +
            '				"paymentStatus": "Pending",' +
            '				"sourceAccount": "1234",' +
            '				"sourceAccountIdType": "1234",' +
            '				"sourceSwiftCode": "1234",' +
            '				"beneficiaryAccount": "beneficiaryAccountTest",' +
            '				"beneficiaryAccountIdType": "beneficiaryAccountIdTypeTest",' +
            '				"destinationCountry": "destinationCountryTest",' +
            '				"beneficiarySwiftCode": "beneficiarySwiftCodeTest"' +
            '			}' +
            '			],' +
            '	"statusList": [{' +
            '		"statusName":"statusNameTest",' +
            '		"parsedStatusName":"parsedStatusNameTest"' +
            '	}' +
            '	],' +
            '	"countryList": [{' +
            '		"countryName":"countryNameTest",' +
            '		"parsedCountryName":"parsedCountryNameTest"' +
            '	}' +
            '	],' +
            '	"paymentMethodList": [{' +
            '		"paymentMethodName":"paymentMethodNameTest",' +
            '		"parsedPaymentMethodName":"parsedPaymentMethodNameTest"' +
            '	}' +
            '	],' +
            '	"paymentTypeList": [{' +
            '		"paymentTypeName":"paymentTypeNameTest",' +
            '		"parsedPaymentTypeName":"parsedPaymentTypeNameTest"' +
            '	}' +
            '	]' +
            '}';
        WRAPPER_PaymentList paymentList = (WRAPPER_PaymentList) JSON.deserialize(res, WRAPPER_PaymentList.class);
        System.debug('MWB:1 ' + paymentList);
        WRAPPER_PaymentList.WRAPPER_Payment payment = paymentList.paymentsList[0];
        System.debug('MWB:2 ' + payment);
        
        String sourceCurrency = payment.sourceCurrency;
        
    }
    
}