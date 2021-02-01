public class MockResponse {


    @TestVisible
    public static String TestResponse(){  
        String res = '{"Test":"Test", "status":"OK"}';
        return res; 
    }

    @TestVisible
    public static String WS_Attributions(){  
        String res = '{"serviceListResponse":{"serviceDataList":[{"serviceId":"test1","status":"active", "relationList":[{"status":"active","contractType":"test", "operabilityIndicator":"Consultive"}, {"status":"active","contractType":"test", "operabilityIndicator":"Operative"}]},{"serviceId":"test2","status":"active"}]}}';     
        return res;
    }

    @TestVisible
    public static String WS_ChannelServices(){  
        String res = '{"servicesListResponse":{"servicesDataList":[{"serviceId":"test1","status":"active", "relationList":[{"status":"active","contractType":"test", "operabilityIndicator":"Consultive"}, {"status":"active","contractType":"test", "operabilityIndicator":"Operative"}]},{"serviceId":"test2","status":"active"}]}}';     
        return res;
    }

    @TestVisible
    public static String PaymentOptionsResult () {
        String res = '{"userGlobalId":"d2f1b326-0133-41ec-a94f-03cf83a02835","userDefinedAmount":"source","tradeAmount":7.99,"trackingStep":"Authorization","totalAmount":"3.04","subject":"ref RTE202012101255","statusUpdateUser":"aa75542a-dff9-4e85-8540-0da3c4ef4010","statusUpdateDate":"2020-12-10T13:18:47.776+0000","sourceTotalAmount":{},"sourceSwiftCode":"BSCHESMMXXX","sourceFeeData":{"sourceAgent":{"name":"","agentId":"","address":""},"sourceAccount":{"tcurrency":"","accountType":"","accountId":""},"parsedCountry":"","name":"","country":""},"sourceData":{"sourceAgent":{"name":"BANCO SANTANDER S.A.","agentId":"BSCHESMMXXX","address":"Spain"},"sourceAddress":{"townName":"Boadilla del Monte, Madrid","streetName":"Avda. de Cantabria s/n","country":"ES"},"sourceAccount":{"tcurrency":"EUR","accountType":"IBA","accountId":"ES7700490454193000541739"},"name":"M.G.M. ACCIAIERIA ITALIA","customerId":"J101484427","country":"ES"},"sourceCurrency":"EUR","sourceCountry":"ES","sourceBank":"BANCO SANTANDER S.A.","sourceAlias":"M.G.M. ACCIAIERIA ITALIA","sourceAccountIdType":"IBA","sourceAccountHolder":"M.G.M. ACCIAIERIA ITALIA","sourceAccount":"ES7700490454193000541739","serviceId":"add_international_payment_internal","purpose":"Payment for identifiable goods","productId":"book_to_book","pricingDetails":{"totalPrice":1.8,"tcurrency":"EUR","productName":"book_to_book","currencyList":[{"tcurrency":"GBP","conceptsList":[{"standardPrice":{"standardTiersList":[{"standardFixedRatePrice":{},"standardFixedAmountPrice":{"tcurrency":"EUR","standardFixedAmount":1.8},"standardAmountTier":9.999999999E9}]},"specialPrice":{"specialTiersList":[{"specialFixedRatePrice":{},"specialFixedAmountPrice":{}}]},"conceptName":"OUR Expenses Commission","conceptId":"291","conceptAmount":{"tcurrency":"EUR","amount":1.8}}]}]},"paymentStatus":"999","paymentReason":"003","paymentMethod":"book_to_book","paymentId":"f548286b75ca42e7ad5c5602589338c7","paymentCurrency":"GBP","parsedSourceCountry":"Spain","parsedPurpose":"Payment for identifiable goods","parsedPaymentStatus":"Rejected","parsedPaymentReason":"003","parsedPaymentMethod":"Book to book","parsedDestinationCountry":"United Kingdom","operationType":"Order","operationStep2Data":{"intermediateAgentAccount":{}},"operationStep1Data":{"intermediateAgentAccount":{}},"operationStatusesHistorical":[{"userName":"aquanima2","statusDate":"2020-12-10T12:55:21.087+0000","status":"001","reason":"002","globalUserId":"d2f1b326-0133-41ec-a94f-03cf83a02835"},{"userName":"Carmen Iniesta","statusDate":"2020-12-10T12:57:11.682+0000","status":"101","reason":"001","globalUserId":"aa75542a-dff9-4e85-8540-0da3c4ef4010"},{"userName":"Carmen Iniesta","statusDate":"2020-12-10T13:07:55.891+0000","status":"101","reason":"001","globalUserId":"aa75542a-dff9-4e85-8540-0da3c4ef4010"},{"userName":"aquanima2","statusDate":"2020-12-10T12:54:34.232+0000","status":"001","reason":"000","globalUserId":"d2f1b326-0133-41ec-a94f-03cf83a02835"},{"userName":"Carmen Iniesta","statusDate":"2020-12-10T13:08:08.054+0000","status":"999","reason":"003","globalUserId":"aa75542a-dff9-4e85-8540-0da3c4ef4010"},{"userName":"Carmen Iniesta","statusDate":"2020-12-10T13:07:13.181+0000","status":"101","reason":"001","globalUserId":"aa75542a-dff9-4e85-8540-0da3c4ef4010"},{"userName":"aquanima2","statusDate":"2020-12-10T12:55:40.784+0000","status":"002","reason":"002","globalUserId":"d2f1b326-0133-41ec-a94f-03cf83a02835"},{"userName":"Carmen Iniesta","statusDate":"2020-12-10T13:17:35.079+0000","status":"101","reason":"001","globalUserId":"aa75542a-dff9-4e85-8540-0da3c4ef4010"},{"userName":"Carmen Iniesta","statusDate":"2020-12-10T13:03:13.654+0000","status":"999","reason":"003","globalUserId":"aa75542a-dff9-4e85-8540-0da3c4ef4010"},{"userName":"Carmen Iniesta","statusDate":"2020-12-10T12:57:14.581+0000","status":"999","reason":"003","globalUserId":"aa75542a-dff9-4e85-8540-0da3c4ef4010"},{"userName":"Carmen Iniesta","statusDate":"2020-12-10T13:07:15.139+0000","status":"999","reason":"003","globalUserId":"aa75542a-dff9-4e85-8540-0da3c4ef4010"},{"userName":"aquanima2","statusDate":"2020-12-10T12:55:38.151+0000","status":"002","reason":"001","globalUserId":"d2f1b326-0133-41ec-a94f-03cf83a02835"},{"userName":"Carmen Iniesta","statusDate":"2020-12-10T13:18:47.776+0000","status":"999","reason":"003","globalUserId":"aa75542a-dff9-4e85-8540-0da3c4ef4010"},{"userName":"Carmen Iniesta","statusDate":"2020-12-10T13:03:06.482+0000","status":"101","reason":"001","globalUserId":"aa75542a-dff9-4e85-8540-0da3c4ef4010"}],"operationNominalFxRollbackDetails":{"ccyCountervalue":{}},"operationNominalFxDetails":{"valueDateEfx":"2020-12-10","priceType":"ONI","nominalAmountNoMarkUp":{"tcurrency":"GBP","amount":7.75},"fxCountervalueId":"GTS0000000000000110988","fxComercialMargin":{"fxComercialMarginCurrency":"EUR","fxComercialMarginAmount":0.0},"discount":0,"customerExchangeRate":0.872176,"ccyCountervalue":{"ccyCountervalueCurrency":"GBP","ccyCountervalueAmount":1.24}},"operationFraudDetails":{},"operationFeesFxDetails":{"ccyCountervalue":{}},"operationDescription":"","operationAmount":{},"feesCurrency":"EUR","fees":"1.8","destinationData":{"destinationAgent":{"name":"SANTANDER UK PLC","agentId":"ABBYGB20XXX","address":"United Kingdom"},"destinationAddress":{"townName":"Madrid","streetName":"Calle Factor","country":"ES"},"destinationAccount":{"tcurrency":"GBP","accountType":"IBA","accountId":"GB37ABBY09072445283289"},"customerId":"J000726877","country":"GB"},"destinationCountry":"GB","counterValueOperationAmount":{"tradeCurrency":"GBP","tcurrency":"EUR","amount":7.99},"convertedCurrency":"GBP","convertedAmount":"1.24","clientReference":"RTE202012101255","chargeBearer":"OUR","beneficiarySwiftCode":"ABBYGB20XXX","beneficiaryCurrency":"GBP","beneficiaryBank":"SANTANDER UK PLC","beneficiaryAlias":"EASYJET LEASING LIMITED","beneficiaryAccountIdType":"IBA","beneficiaryAccountHolder":"EASYJET LEASING LIMITED","beneficiaryAccount":"GB37ABBY09072445283289","amountSend":"7.99","amountReceive":"1.24","amount":1.24,"addFees":false}';
        return res;
	}

    @TestVisible
    public static String PaymentDetail(){
        String res = '{		"operationResponse":{		"operationDetail":{		"operationType":"b2b",		"serviceId":"add_international_payment_internal",		"userGlobalId":"ab34521",		"operationStatus":{		"status":"Authorized",		"reason":"Paymentispartiallyauthorized",		"statusDate":"2020-04-22T17:15:35.552Z"		},		"sourceData":{		"name":"BancoSantander",		"sourceAccount":{		"accountType":"IBA",		"accountId":"GB54ABBY6578956387330",		"tcurrency":"GBP"		},		"sourceAgent":{		"agentId":"ABBYGB2LXXX",		"name":"SANTANDERUKPLC",		"address":"BridleRoad"		},		"country":"ES"		},		"destinationData":{		"name":"string",		"destinationAccount":{		"accountType":"IBA",		"accountId":"ES54004956387330056782",		"tcurrency":"EUR"		},		"destinationAgent":{		"agentId":"BSCHESMMXXX",		"name":"BancoSantanderEspaña",		"address":"AvdaCantabrias/nBoadilladelMonte"		},		"country":"ES"		},		"operationStep1Data":{		"opStep1Id":"string",		"status":"string",		"valueDate":"2020-06-17",		"flowIndicator":"S",		"intermediateAgentAccount":{		"accountType":"string",		"accountId":"string"		}		},		"operationStep2Data":{		"opStep2Id":"string",		"status":"string",		"valueDate":"2020-06-17",		"flowIndicator":"D",		"intermediateAgentAccount":{		"accountType":"string",		"accountId":"string"		}		},		"issueDate":"2020-07-07T13:05:30.346Z",		"chargeBearer":"string",		"operationAmount":{		"tcurrency":"PLN",		"amount":1000		},		"counterValueOperationAmount":{		"tcurrency":"USD",		"amount":0,		"tradeCurrency":"EUR"		},		"sourceTotalAmount":{		"tcurrency":"USD",		"amount":0		},		"clientReference":"string",		"purpose":"string",		"operationDescription":"string",		"subject":"CustomerOrder0123213213",		"operationFraudDetails":{		"fraudValidationResult":"OK",		"fraudReference":"9a0a67d3675b4627b28034517737437f"		},		"operationNominalFxDetails":{		"fxCountervalueId":"A12345678901234567890123456789012345B",		"priceType":"ONL",		"discount":25,		"ccyCountervalue":{		"ccyCountervalueAmount":1200.85,		"ccyCountervalueCurrency":"EUR"		},		"valueDateEfx":"2020-07-15",		"customerExchangeRate":1.10000002,		"fxComercialMargin":{		"fxComercialMarginCurrency":"EUR",		"fxComercialMarginAmount":27.05		},		"nominalAmountNoMarkUp":{		"amount":345.89,		"tcurrency":"EUR"		}		},		"operationFeesFxDetails":{		"fxCountervalueId":"A12345678901234567890123456789012345B",		"priceType":"ONL",		"discount":25,		"ccyCountervalue":{		"ccyCountervalueAmount":1200.85,		"ccyCountervalueCurrency":"EUR"		},		"valueDateEfx":"2020-07-15",		"customerExchangeRate":1.10000002		},		"pricingDetails":{		"productName":"string",		"totalPrice":38.9,		"tcurrency":"EUR",		"currencyList":[		{		"tcurrency":"USD",		"currencyName":"U.S.dollar",		"conceptsList":[		{		"conceptId":293,		"conceptName":"sharefee",		"specialPrice":{		"specialPriceLevel":"productagreement",		"specialTiersList":[		{		"specialAmountTier":50000.12345,		"specialAmountTierType":"I",		"specialFixedRatePrice":{		"specialRate":1.250126,		"specialMinimumAmount":10,		"specialMaximumAmount":500,		"tcurrency":"EUR"		},		"specialFixedAmountPrice":{		"specialFixedAmount":3,		"tcurrency":"EUR"		}		}		]		},		"standardPrice":{		"standardTiersList":[		{		"standardAmountTier":5000.12345,		"standardAmountTierType":"S",		"standardFixedRatePrice":{		"standardRate":1.25,		"standardMinimumAmount":10,		"standardMaximumAmount":500,		"tcurrency":"EUR"		},		"standardFixedAmountPrice":{		"standardFixedAmount":3,		"tcurrency":"EUR"		}		}		]		},		"conceptAmount":{		"amount":250,		"tcurrency":"EUR",		"fixing":1.25		}		}		]		}		]		}		},		"refundDetails":{		"globalUserId":"x124903",		"authUserId":"x569085",		"authDate":"2020-06-17T10:20:33.256Z",		"authComments":"Thefundscanbereturnedtothecustomer.ValidationOK",		"creationDate":"2020-06-17T10:20:33.256Z",		"refundType":"bank_error",		"refundAmount":{		"amount":1234566.98,		"tcurrency":"EUR"		},		"status":"string",		"reason":"Duplicatedpaymentconfirmedduetoabankerror.Fundshavetobereturnedtotheoriginatoroftheoriginalpayment",		"comments":"Refundneededduetoapossibleduplicateddetected",		"refundDate":"2020-06-17"		}		}		}';
    	return res;
	}
        
    @TestVisible
    public static String CNT_MovementHistoryDataWrapper(){
        String res ='[{"bookDate":"01/08/2019","bookBalance":"10000","currencyTable":"EUR","availableDate":"01/08/2019","availableBalance":"1888342.39"}]';
    	return res;
	}
    
    @TestVisible
    public static String WS_ExchangeRate(){
    	String res = '{ "amountReceive": "test", "amountSend": "test", "timestamp": "test", "priceType": "test", "fxExchangeResponse": { "fxCountervalueId": "test", "valueDateEfx": "test", "customerExchangeRate": "100", "ccyCountervalue": { "ccyCountervalueAmount": "ccyCountervalueAmountTest", "ccyCountervalueCurrency": "ccyCountervalueCurrencyTest" }, "fxComercialMargin": { "fxComercialMarginAmount": 123.34, "fxComercialMarginCurrency": "fxComercialMarginCurrencyTest" } }, "errors": [] }';
        return res;
    }
    
    @TestVisible
    public static String PaymentList(){
        String res = '{"paymentsList":[{"paymentId":"paymentId","sourceCountry":"ES", "clientReference":"1111", "fees":"10", "paymentStatus":"Pending", "sourceAccount":"1234", "sourceAccountIdType":"1234", "sourceSwiftCode":"1234", "beneficiaryAccount":"beneficiaryAccountTest", "beneficiaryAccountIdType":"beneficiaryAccountIdTypeTest", "destinationCountry":"ES", "beneficiarySwiftCode":"beneficiarySwiftCodeTest"},{"paymentId":"paymentId2","sourceCountry":"ES", "clientReference":"1111", "paymentStatus":"Pending", "sourceAccount":"1234", "sourceAccountIdType":"1234", "sourceSwiftCode":"1234", "beneficiaryAccount":"beneficiaryAccountTest", "beneficiaryAccountIdType":"beneficiaryAccountIdTypeTest", "destinationCountry":"ES", "beneficiarySwiftCode":"beneficiarySwiftCodeTest"}]}';
        return res;
    }
	
	@TestVisible
    public static String B2BData_AccountData(){
        String res = '{ "cib":true, "documentType":"CIF", "documentNumber":"123", "companyId":"123" }';
        return res;
    }
    
    @TestVisible
    public static String B2BData_PaymentAmount(){
        String res = '{"fromOrigin":true, "amountSend":"1000", "amountReceive":"990", "exchangeRate":"1", "timestamp":"test", "transactionFee":"10", "transactionFeeCurrency":"test", "convertedTransactionFee":"10", "convertedTransactionFeeCurrency":"test"}';
        return res;
    }
    
    @TestVisible
    public static String AccountList_AccountDetails(String country, String tcurrency){
        String res = '{ "accountId": "1234", "displayNumber": "1234", "codigoBic": "123", "IdType": "BBA", "status": "Active", "country": "' + country + '", "currencyCodeAvailableBalance": "' + tcurrency + '", "valueDate": "10-10-2020", "lastUpdateAvailableBalance": "10-10-2020", "customerId": "customerIdTest", "subsidiaryName": "subsidiaryNameTest", "bankName": "bankNameTest", "address": { "streetName": "streetNameTest", "townName": "townNameTest", "country": "countryTest" } }';
        return res;
    }
    
    @TestVisible
    public static String wrapperUserData(String str){
        String res = '';
        if(str == 'OneTrade')
        	res = '{"UserId":"1234", "GlobalId":"1234", "lastName":"test","multiOneTrade":true, "companyId":"1234"}';
        else if (str == 'Nexus')
        	res = '{"UserId":"1234", "GlobalId":"1234", "lastName":"test","cashNexus":true, "companyId":"1234"}';
        else if (str == 'Country Support')
            res = '{"UserId":"1234", "GlobalId":"1234", "lastName":"test", "companyId":"1234", "profileName":"'+System.Label.Profile_BackOffice_002+'"}';
        else
            res = '{"UserId":"1234", "GlobalId":"1234", "lastName":"test", "companyId":"1234"}';
        return res;
    }    
    
    @TestVisible
    public static String SignatureStructure(){
        
        String res = '{'+
        '  "PaymentId":"paymentId",'+
		'  "structureListResponse": {'+
		'    "groupDataDetails": ['+
		'      {'+
        '        "signsRequired":"2",'+
		'        "groupDescription": "Executivos de nivel 5",'+
		'        "groupId": "Executive",'+
		'        "groupLevel": "A",'+
		'        "singsRequired": 1,'+
		'        "userList": ['+
		'          {'+
		'            "userId": 43244234'+
		'          }'+
		'        ]'+
		'      },'+
		'      {'+
        '        "signsRequired":"2",'+
		'        "groupDescription": "Executivos de nivel 4",'+
		'        "groupId": "Executive",'+
		'        "groupLevel": "B",'+
		'        "singsRequired": 2,'+
		'        "userList": ['+
		'          {'+
		'            "userId": 43244234'+
		'          },'+
		'          {'+
		'            "userId": 43244235'+
		'          },'+
		'          {'+
		'            "userId": 43244236'+
		'          }'+
		'        ]'+
		'      },'+
		'      {'+
        '        "signsRequired":"2",'+
        '        "groupDescription": "Executivos de nivel 3",'+
		'        "groupId": "Executive",'+
		'        "groupLevel": "C",'+
		'        "singsRequired": 3,'+
		'        "userList": ['+
		'          {'+
		'            "userId": 43244234'+
		'          },'+
		'          {'+
		'            "userId": 43244237'+
		'          },'+
		'          {'+
		'            "userId": 43244238'+
		'          },'+
		'          {'+
		'            "userId": 43244235'+
		'          }'+
		'        ]'+
		'      }'+
		'    ]'+
		'  }'+
		'}';
        
        return res;
    }
    
    @TestVisible
    public static String WS_B2B_OTP_StrategicLocal(){
        String res = '{}';  
        return res;
    }
    
    @TestVisible
    public static String WS_CancelBookToBook(){
        String res = '{"bookToBookId":"bookToBookId"}';  
        return res;
    }
    
    @TestVisible
    public static String WS_TransactionalLimitsUpdate(){
        String res = '{"Test":"Test"}';  
        return res;
    }
    
    @TestVisible
    public static String WS_CancelBuySell(){
        String res = '{"Test":"Test"}';  
        return res;
    } 
    
    @TestVisible
    public static String WS_BeneficiaryAccounts(){
        String res = '{ "accountsListResponse": { "accountsDataList": [{ "status": "Active", "customerId": "customerId", "country": "ES", "displayNumber": "displayNumber", "accountHolderAddress": { "streetName": "streetNameTest", "townName": "townNameTest", "country": "countryTest" }, "bankId": "ES1802000044445555", "mainBalance": { "amount": 123.23, "currencyCode": "currencyCodeTest", "lastUpdate": "lastUpdateTest" }, "availableBalance": { "amount": 123.23, "currencyCode": "currencyCodeTest", "lastUpdate": "lastUpdateTest" }, "pendingBalance": { "amount": 123.23, "currencyCode": "currencyCodeTest", "lastUpdate": "lastUpdateTest" }, "withholdingBalance": { "amount": 123.23, "currencyCode": "currencyCodeTest", "lastUpdate": "lastUpdateTest" }, "overdraftLimit": { "amount": 123.23, "currencyCode": "currencyCodeTest", "lastUpdate": "lastUpdateTest" }, "accountIdList": [{ "IdType": "type", "accountId": "1234" } ] } ] } }';  
        return res;
    } 
    
    @TestVisible
    public static String WRAPPER_ExtractsData(){
            String res = 
                    '{'+
                    '  \"accountNumber\": \"0720590942290418123456 \",'+
                    '  \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
                    '  \"initialBalance\": \"18935258.51\",'+
                    '  \"finalBookBalance\": \"-5342000.39\",'+
                    '  \"currencyAux\": \"ARS\",'+
                    '  \"debtAmount\": \"-1829,82\",'+
                    '  \"creditAmount\": \"78,21\",'+
                    '  \"debtNumber\": \"7\",'+
                    '  \"creditNumber\": \"2\",'+
                    '  \"movements\": ['+
                    '                    {'+
                    '                      \"accountNumber\": \"0720590942290418123456\",'+
                    '                      \"amount\": \"-44.44\",'+
                    '                      \"bookBalance\": \"-6125.96\",'+
                    '                      \"bookDate\": \"20/11/2019\",'+
                    '                      \"category\": \"MSC\",'+
                    '                      \"currencyExtract\": \"ARS\",'+
                    '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"valueDate\": \"20/12/2019\",'+
                    '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
                    '                    },'+
                    '                    {'+
                    '                      \"accountNumber\": \"0720590942290418123456\",'+
                    '                      \"amount\": \"-22.34\",'+
                    '                      \"bookBalance\": \"-1230.94\",'+
                    '                      \"bookDate\": \"20/11/2019\",'+
                    '                      \"category\": \"RFG\",'+
                    '                      \"currencyExtract\": \"ARS\",'+
                    '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"valueDate\": \"20/12/2019\",'+
                    '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
                    '                    },'+
                    '                    {'+
                    '                      \"accountNumber\": \"0720590942290418123456\",'+
                    '                      \"amount\": \"22.99\",'+
                    '                      \"bookBalance\": \"-125.00\",'+
                    '                      \"bookDate\": \"20/11/2019\",'+
                    '                      \"category\": \"SMS\",'+
                    '                      \"currencyExtract\": \"ARS\",'+
                    '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"valueDate\": \"20/12/2019\",'+
                    '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
                    '                    },'+
                    '                    {'+
                    '                      \"accountNumber\": \"0720590942290418123456\",'+
                    '                      \"amount\": \"-631.51\",'+
                    '                      \"bookBalance\": \"-50\",'+
                    '                      \"bookDate\": \"20/11/2019\",'+
                    '                      \"category\": \"OPC\",'+
                    '                      \"currencyExtract\": \"ARS\",'+
                    '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"valueDate\": \"20/12/2019\",'+
                    '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
                    '                    },'+
                    '                    {'+
                    '                      \"accountNumber\": \"0720590942290418123456\",'+
                    '                      \"amount\": \"-521.50\",'+
                    '                      \"bookBalance\": \"-1000.64\",'+
                    '                      \"bookDate\": \"20/11/2019\",'+
                    '                      \"category\": \"MSM\",'+
                    '                      \"currencyExtract\": \"ARS\",'+
                    '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"valueDate\": \"20/12/2019\",'+
                    '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
                    '                    },'+
                    '                    {'+
                    '                      \"accountNumber\": \"0720590942290418123456\",'+
                    '                      \"amount\": \"-321.66\",'+
                    '                      \"bookBalance\": \"-5124.12 \",'+
                    '                      \"bookDate\": \"20/11/2019\",'+
                    '                      \"category\": \"BBC\",'+
                    '                      \"currencyExtract\": \"ARS\",'+
                    '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"valueDate\": \"20/12/2019\",'+
                    '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
                    '                    },'+
                    '                    {'+
                    '                      \"accountNumber\": \"0720590942290418123456\",'+
                    '                      \"amount\": \"-125.31\",'+
                    '                      \"bookBalance\": \"-3902.11 \",'+
                    '                      \"bookDate\": \"20/11/2019\",'+
                    '                      \"category\": \"SGT\",'+
                    '                      \"currencyExtract\": \"ARS\",'+
                    '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"valueDate\": \"20/12/2019\",'+
                    '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
                    '                    },'+
                    '                    {'+
                    '                      \"accountNumber\": \"0720590942290418123456\",'+
                    '                      \"amount\": \"-163.06 \",'+
                    '                      \"bookBalance\": \"-2042.74 \",'+
                    '                      \"bookDate\": \"20/11/2019\",'+
                    '                      \"category\": \"ATT\",'+
                    '                      \"currencyExtract\": \"ARS\",'+
                    '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"valueDate\": \"20/12/2019\",'+
                    '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
                    '                    },'+
                    '                    {'+
                    '                      \"accountNumber\": \"0720590942290418123456\",'+
                    '                      \"amount\": \"-163.06 \",'+
                    '                      \"bookBalance\": \"-2042.74 \",'+
                    '                      \"bookDate\": \"20/11/2019\",'+
                    '                      \"category\": \"ATT\",'+
                    '                      \"currencyExtract\": \"ARS\",'+
                    '                      \"refCliente\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"refBank\": \"234987947239ssf9837249827sdf284793\",'+
                    '                      \"valueDate\": \"20/12/2019\",'+
                    '                      \"description\": \"/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355\"'+
                    '                    }'+
                    '                    '+
                    '                ]'+
                    '}';
        return res;
    }    
    
    
    
    @TestVisible
    public static String WRAPPER_StatementList(){
        String res = '{'+
		'\"listaSaldos\": ['+
		'          {'+
		'            \"saldo\": {'+
		'              \"bookBalance\": 4000000.69,'+
		'              \"bookDate\": \"2020-02-20T23:00:00.000Z\",'+
		'              \"closingBalance\": 0.0,'+
		'              \"codigoCuenta\": \"\",'+
		'              \"openingBalance\": 0.0,'+
		'              \"valueBalance\": 4000000.1,'+
		'              \"valueDate\": \"2020-02-20T23:00:00.000Z\"'+
		'            }'+
		'          },'+
		'          {'+
		'            \"saldo\": {'+
		'              \"bookBalance\": 3000000.1,'+
		'              \"bookDate\": \"2020-02-13T23:00:00.000Z\",'+
		'              \"closingBalance\": 0.0,'+
		'              \"codigoCuenta\": \"\",'+
		'              \"openingBalance\": 0.0,'+
		'              \"valueBalance\": 3000000.1,'+
		'              \"valueDate\": \"2020-02-13T23:00:00.000Z\"'+
		'            }'+
		'          }'+
		'        ]'+
		'}';  
        return res;
    }    
    
    @TestVisible
    public static String CNT_GlobalPositionController(){
        String res =  '{'+
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
        return res;
    }
    
    @TestVisible
    public static String WRAPPER_AccountTransactionSearch(){
        String res = '{'+
            '  \"balances\": {'+
            '    \"transactions\": {'+
            '      \"listaObtTransacciones\": ['+
            '        ['+
            '          {'+
            '            \"obtTransacBusqueda\": {'+
            '              \"aliasCuentaPerfilado\": \"Rocio test     \",'+
            '              \"aliasEntidad\": \"testro         \",'+
            '              \"bookDate\": \"2020-03-26T23:00:00.000Z\",'+
            '              \"codCuenta\": 1367,'+
            '              \"codigoBIC\": {'+
            '                \"branch\": \"XXX\",'+
            '                \"entidadbic\": \"BSCH\",'+
            '                \"locatorbic\": \"SP\",'+
            '                \"paisbic\": \"BR\"'+
            '              },'+
            '              \"cuentaExtracto\": \"2167130018899                                     \",'+
            '              \"descripcion\": \"3625-APLICACAO AUT CONTAMAX EMPRESARIAL                                                                                                                                                                                                                                                                                                                                                                                                     \",'+
            '              \"importe\": -519910.76,'+
            '              \"moneda\": \"BRL\",'+
            '              \"nombreEntidad\": \"BANCO SANTANDER BRASIL\",'+
            '              \"refBanco\": \"                \",'+
            '              \"refCliente\": \"NONREF          \",'+
            '              \"tipoTransaccion\": \"MSC\",'+
            '              \"valueDate\": \"2020-03-26T23:00:00.000Z\"'+
            '            }'+
            '          },'+
            '          {'+
            '            \"obtTransacBusqueda\": {'+
            '              \"aliasCuentaPerfilado\": \"Rocio test     \",'+
            '              \"aliasEntidad\": \"testro         \",'+
            '              \"bookDate\": \"2020-03-26T23:00:00.000Z\",'+
            '              \"codCuenta\": 1367,'+
            '              \"codigoBIC\": {'+
            '                \"branch\": \"XXX\",'+
            '                \"entidadbic\": \"BSCH\",'+
            '                \"locatorbic\": \"SP\",'+
            '                \"paisbic\": \"BR\"'+
            '              },'+
            '              \"cuentaExtracto\": \"2167130018899                                     \",'+
            '              \"descripcion\": \"0466-PAGAMENTO A FORNECEDORES6481732677   - D - 000001                                                                                                                                                                                                                                                                                                                                                                                      \",'+
            '              \"importe\": -360000.0,'+
            '              \"moneda\": \"BRL\",'+
            '              \"nombreEntidad\": \"BANCO SANTANDER BRASIL\",'+
            '              \"refBanco\": \"010327          \",'+
            '              \"refCliente\": \"6481732677      \",'+
            '              \"tipoTransaccion\": \"TRF\",'+
            '              \"valueDate\": \"2020-03-26T23:00:00.000Z\"'+
            '            }'+
            '          }'+
            '        ]'+
            '      ]'+
            '    }'+
            '  }'+
            '}';
        return res;
    }
    
    
    @TestVisible
    public static String WRAPPER_PaymentDetail(){
		String res = '{' +
	'  \"operationResponse\": {' +
	'    \"operationDetail\": {' +
	'      \"operationType\": \"b2b\",' +
	'      \"serviceId\": \"add_international_payment_internal\",' +
	'      \"userGlobalId\": \"ab34521\",' +
	'      \"operationStatus\": {' +
	'        \"status\": \"Authorized\",' +
	'        \"reason\": \"Payment is partially authorized\",' +
	'        \"statusDate\": \"2020-04-22T17:15:35.552Z\"' +
	'      },' +
	'      \"sourceData\": {' +
	'        \"name\": \"Banco Santander\",' +
	'        \"sourceAccount\": {' +
	'          \"accountType\": \"IBA\",' +
	'          \"accountId\": \"GB54ABBY6578956387330\",' +
	'          \"tcurrency\": \"GBP\"' +
	'        },' +
	'        \"sourceAgent\": {' +
	'          \"agentId\": \"ABBYGB2LXXX\",' +
	'          \"name\": \"SANTANDER UK PLC\",' +
	'          \"address\": \"Bridle Road\"' +
	'        },' +
	'        \"country\": \"ES\",' +
	'		 \"sourceAddress\": {			' +
	'					\"streetName\": \"streetNameTest\",	' +
	'					\"townName\": \"townNameTest\",			'+
	'					\"country\": \"countryTest\"		'+
	'				}								'+
	'      },' +
	'      \"destinationData\": {' +
	'        \"name\": \"string\",' +
	'        \"destinationAccount\": {' +
	'          \"accountType\": \"IBA\",' +
	'          \"accountId\": \"ES54004956387330056782\",' +
	'          \"tcurrency\": \"EUR\"' +
	'        },' +
	'        \"destinationAgent\": {' +
	'          \"agentId\": \"BSCHESMMXXX\",' +
	'          \"name\": \"Banco Santander España\",' +
	'          \"address\": \"Avda Cantabria s/n Boadilla del Monte\"' +
	'        },' +
	'        \"country\": \"ES\",' +
	'		 \"destinationAddress\": {			' +
	'					\"streetName\": \"streetNameTest\",	' +
	'					\"townName\": \"townNameTest\",			'+
	'					\"country\": \"countryTest\"		'+
	'				}								'+
	'      },' +
	'      \"operationStep1Data\": {' +
	'        \"opStep1Id\": \"string\",' +
	'        \"status\": \"string\",' +
	'        \"valueDate\": \"2020-06-17\",' +
	'        \"flowIndicator\": \"S\",' +
	'        \"intermediateAgentAccount\": {' +
	'          \"accountType\": \"string\",' +
	'          \"accountId\": \"string\"' +
	'        }' +
	'      },' +
	'      \"operationStep2Data\": {' +
	'        \"opStep2Id\": \"string\",' +
	'        \"status\": \"string\",' +
	'        \"valueDate\": \"2020-06-17\",' +
	'        \"flowIndicator\": \"D\",' +
	'        \"intermediateAgentAccount\": {' +
	'          \"accountType\": \"string\",' +
	'          \"accountId\": \"string\"' +
	'        }' +
	'      },' +
	'      \"issueDate\": \"2020-07-07T13:05:30.346Z\",' +
	'      \"chargeBearer\": \"string\",' +
	'      \"operationAmount\": {' +
	'        \"tcurrency\": \"PLN\",' +
	'        \"amount\": 1000' +
	'      },' +
	'      \"counterValueOperationAmount\": {' +
	'        \"tcurrency\": \"USD\",' +
	'        \"amount\": 0,' +
	'        \"tradeCurrency\": \"EUR\"' +
	'      },' +
	'      \"sourceTotalAmount\": {' +
	'        \"tcurrency\": \"USD\",' +
	'        \"amount\": 0' +
	'      },' +
	'      \"clientReference\": \"string\",' +
	'      \"purpose\": \"string\",' +
	'      \"operationDescription\": \"string\",' +
	'      \"subject\": \"Customer Order 0123213213\",' +
	'      \"operationFraudDetails\": {' +
	'        \"fraudValidationResult\": \"OK\",' +
	'        \"fraudReference\": \"9a0a67d3675b4627b28034517737437f\"' +
	'      },' +
	'      \"operationNominalFxDetails\": {' +
	'        \"fxCountervalueId\": \"A12345678901234567890123456789012345B\",' +
	'        \"priceType\": \"ONL\",' +
	'        \"discount\": 25,' +
	'        \"ccyCountervalue\": {' +
	'          \"ccyCountervalueAmount\": 1200.85,' +
	'          \"ccyCountervalueCurrency\": \"EUR\"' +
	'        },' +
	'        \"valueDateEfx\": \"2020-07-15\",' +
	'        \"customerExchangeRate\": 1.10000002,' +
	'        \"fxComercialMargin\": {' +
	'          \"fxComercialMarginCurrency\": \"EUR\",' +
	'          \"fxComercialMarginAmount\": 27.05' +
	'        },' +
	'        \"nominalAmountNoMarkUp\": {' +
	'          \"amount\": 345.89,' +
	'          \"tcurrency\": \"EUR\"' +
	'        }' +
	'      },' +
	'      \"operationFeesFxDetails\": {' +
	'        \"fxCountervalueId\": \"A12345678901234567890123456789012345B\",' +
	'        \"priceType\": \"ONL\",' +
	'        \"discount\": 25,' +
	'        \"ccyCountervalue\": {' +
	'          \"ccyCountervalueAmount\": 1200.85,' +
	'          \"ccyCountervalueCurrency\": \"EUR\"' +
	'        },' +
	'        \"valueDateEfx\": \"2020-07-15\",' +
	'        \"customerExchangeRate\": 1.10000002' +
	'      },' +
	'      \"pricingDetails\": {' +
	'        \"productName\": \"string\",' +
	'        \"totalPrice\": 38.9,' +
	'        \"tcurrency\": \"EUR\",' +
	'        \"currencyList\": [' +
	'          {' +
	'            \"tcurrency\": \"USD\",' +
	'            \"currencyName\": \"U.S. dollar\",' +
	'            \"conceptsList\": [' +
	'              {' +
	'                \"conceptId\": 293,' +
	'                \"conceptName\": \"share fee\",' +
	'                \"specialPrice\": {' +
	'                  \"specialPriceLevel\": \"product agreement\",' +
	'                  \"specialTiersList\": [' +
	'                    {' +
	'                      \"specialAmountTier\": 50000.12345,' +
	'                      \"specialAmountTierType\": \"I\",' +
	'                      \"specialFixedRatePrice\": {' +
	'                        \"specialRate\": 1.250126,' +
	'                        \"specialMinimumAmount\": 10,' +
	'                        \"specialMaximumAmount\": 500,' +
	'                        \"tcurrency\": \"EUR\"' +
	'                      },' +
	'                      \"specialFixedAmountPrice\": {' +
	'                        \"specialFixedAmount\": 3,' +
	'                        \"tcurrency\": \"EUR\"' +
	'                      }' +
	'                    }' +
	'                  ]' +
	'                },' +
	'                \"standardPrice\": {' +
	'                  \"standardTiersList\": [' +
	'                    {' +
	'                      \"standardAmountTier\": 5000.12345,' +
	'                      \"standardAmountTierType\": \"S\",' +
	'                      \"standardFixedRatePrice\": {' +
	'                        \"standardRate\": 1.25,' +
	'                        \"standardMinimumAmount\": 10,' +
	'                        \"standardMaximumAmount\": 500,' +
	'                        \"tcurrency\": \"EUR\"' +
	'                      },' +
	'                      \"standardFixedAmountPrice\": {' +
	'                        \"standardFixedAmount\": 3,' +
	'                        \"tcurrency\": \"EUR\"' +
	'                      }' +
	'                    }' +
	'                  ]' +
	'                },' +
	'                \"conceptAmount\": {' +
	'                  \"amount\": 250,' +
	'                  \"tcurrency\": \"EUR\",' +
	'                  \"fixing\": 1.25' +
	'                }' +
	'              }' +
	'            ]' +
	'          }' +
	'        ]' +
	'      }' +
	'    },' +
	'    \"refundDetails\": {' +
	'      \"globalUserId\": \"x124903\",' +
	'      \"authUserId\": \"x569085\",' +
	'      \"authDate\": \"2020-06-17T10:20:33.256Z\",' +
	'      \"authComments\": \"The funds can be returned to the customer. Validation OK\",' +
	'      \"creationDate\": \"2020-06-17T10:20:33.256Z\",' +
	'      \"refundType\": \"bank_error\",' +
	'      \"refundAmount\": {' +
	'        \"amount\": 1234566.98,' +
	'        \"tcurrency\": \"EUR\"' +
	'      },' +
	'      \"status\": \"string\",' +
	'      \"reason\": \"Duplicated payment confirmed due to a bank error. Funds have to be returned to the originator of the original payment\",' +
	'      \"comments\": \"Refund needed due to a possible duplicated detected\",' +
	'      \"refundDate\": \"2020-06-17\"' +
	'    }' +
	'  }' +
	'}';

    
		return res;
	}

    @TestVisible
    public static String WRAPPER_OperationsList(){
        
        String res = '' +
       '     {"operationsList":[                                              ' +
	   '       {         		                                              ' + 
        '		"operationDetail":{                                           ' + 
        '			"operationGlobalId":"GlobalId",                           ' +  
        '			"operationStatus":{                                       ' +
        '				"status":"OK",                                        ' +
        '				"reason":"reason"                                     ' +
        '			},                                                        ' +
        '			"globalUserId":"GlobalUserId",                             ' +
        '			"statusDate":"test",                                      ' +
        '			"issueDate":"test",                                       ' +
        '			"valueDate":"2020-11-11",                                       ' +
        '			"clientReference":"test",                                 ' +
        '			"purpose":"test",                                         ' +
        '			"transferDescription":"test",                             ' +
        '			"productId":"test",	                                      ' +
        '			"operationAmount":{                                       ' +
        '				"tcurrency":"EUR",                                    ' +
        '				"amount":10                                           ' +
        '			},                                                        ' +
        '			"sourceTotalAmount":{                                     ' +
        '				"tcurrency":"EUR",                                    ' +
        '				"amount":10                                           ' +
        '			},                                                        ' +
        '			"sourceData":{                                            ' +
        '				"name":"Test",                                        ' +
        '				"sourceAccount":{                                     ' +
        '					"accountIdType":"test",                           ' +
        '					"accountId":"test",                               ' +
        '					"tcurrency":"EUR"                                 ' +
        '				},                                                    ' +
        '				"sourceAgent":{                                       ' +
        '					"agent":"test",                                   ' +
        '					"name":"test",                                    ' +
        '					"addressAgent":"test"                             ' +
        '				},				                                      ' +
        '				"sourceCountry":"ES"                                  ' +
        '			},                                                        ' +
        '			"destinationData":{                                       ' +
        '				"destinationName":"Test",                             ' +
        '				"destinationAccount":{                                ' +
        '					"accountIdType":"test",                           ' +
        '					"accountId":"test",                                ' +
        '					"tcurrency":"EUR"                                  ' +
        '				},				                                      ' +
        '				"destinationAgent":{                                  ' +
        '					"agent":"test",                                   ' +
        '					"name":"test",                                    ' +
        '					"addressAgent":"test"                             ' +
        '				}                                                     ' +
        '			}				                                          ' +
        '		}                                                             ' +
        '	},                                                                 ' +
		'   {         		                                                  ' + 
        '		"operationDetail":{                                           ' + 
        '			"operationGlobalId":"GlobalId",                           ' +  
        '			"operationStatus":{                                       ' +
        '				"status":"OK",                                        ' +
        '				"reason":"reason"                                     ' +
        '			},                                                        ' +
        '			"globalUserId":"GlobalUserId",                             ' +
        '			"statusDate":"test",                                      ' +
        '			"issueDate":"test",                                       ' +
        '			"clientReference":"test",                                 ' +
        '			"purpose":"test",                                         ' +
        '			"transferDescription":"test",                             ' +
        '			"productId":"test",	                                      ' +
        '			"sourceTotalAmount":{                                     ' +
        '				"tcurrency":"EUR",                                    ' +
        '				"amount":10                                           ' +
        '			},                                                        ' +
        '			"sourceData":{                                            ' +
        '				"name":"Test",                                        ' +
        '				"sourceAccount":{                                     ' +
        '					"accountIdType":"test",                           ' +
        '					"accountId":"test",                               ' +
        '					"tcurrency":"EUR"                                 ' +
        '				},                                                    ' +
        '				"sourceAgent":{                                       ' +
        '					"agent":"test",                                   ' +
        '					"name":"test",                                    ' +
        '					"addressAgent":"test"                             ' +
        '				},				                                      ' +
        '				"sourceCountry":"ES"                                  ' +
        '			},                                                        ' +
        '			"destinationData":{                                       ' +
        '				"destinationName":"Test",                             ' +
        '				"destinationAccount":{                                ' +
        '					"accountIdType":"test",                           ' +
        '					"accountId":"test",                                ' +
        '					"tcurrency":"EUR"                                  ' +
        '				},				                                      ' +
        '				"destinationAgent":{                                  ' +
        '					"agent":"test",                                   ' +
        '					"name":"test",                                    ' +
        '					"addressAgent":"test"                             ' +
        '				}                                                     ' +
        '			},				                                          ' +
		'            "operationNominalFxDetails":{                            ' +
		'                   "fxCountervalueId":"test",                        ' +
		'                   "priceType":"test",                               ' +
		'                   "discount":10,                                    ' +
		'                    "ccyCountervalue":{                              ' +
		'                         "ccyCountervalueAmount":100,                ' +
		'                          "ccyCountervalueCurrency":"EUR"            ' +
		'                    },                                               ' +
		'                    "fxComercialMargin":{                            ' +
		'                         "fxComercialMarginAmount":100,              ' +
		'                          "fxComercialMarginCurrency":"EUR"          ' +
		'                    },                                               ' +
		'                    "nominalAmountNoMarkUp":{                        ' +
		'                         "amount":100,                               ' +
		'                          "tcurrency":"EUR"                          ' +
		'                    }                                               ' +
		'             }										                  ' +
        '		}                                                             ' +
        '	}                                                                 ' +
		'  ]}';
        
        return res;
    }
   
    @TestVisible
    public static String WS_TransferFees(){
        String res = ''+
'     {"transactionFee":"test",               ' +
'     "transactionFeeCurrency":"test",        ' +
'     "productName":"test",                   ' +
'     "priceLocator":"test",                  ' +
'     "currencyList":[{                        ' +
'     	"tcurrency":"EUR",                    ' +
'     	"currencyName":"EUR",                    ' +
'     	"conceptsList":[{                       ' +
'     		"conceptId":"test",               ' +
'           "conceptName":"test",             ' +
'			"conceptAmount":{             '+
'				"amount":10,								'+
'				"tcurrency":"EUR"          '+
'			},                             '+
'			"specialPrice":{             '+
'				"specialPriceLevel":"specialPriceLevelTest", '+
'				"specialTiersList":[{         '+
'     	            "specialAmountTier":123.45,       ' +
'     	            "specialAmountTierType":"testType",       ' +
'			        "specialFixedAmountPrice":{             '+
'     	                "specialFixedAmount":123.45,       ' +
'     	                "tcurrency":"tcurrencyTest"       ' +
'			        },                             '+
'			        "specialFixedRatePrice":{             '+
'     	                "specialRate":123.45,       ' +
'     	                "specialMinimumAmount":123.45,       ' +
'     	                "specialMaximumAmount":123.45,       ' +
'     	                "tcurrency":"tcurrencyTest"       ' +
'			        }                             '+
'     	        }]                                    ' +
'			},                             '+
'			"standardPrice": {			'+
'				"standardTiersList": [{			'+
'						"standardAmountTier": 123.45,			'+
'						"standardAmountTierType": "standardAmountTierTypeTest",			'+
'						"standardFixedAmountPrice": {			'+
'							"standardFixedAmount": 123.45,			'+
'							"tcurrency": "tcurrencyTest"			'+
'						},			'+
'						"standardFixedRatePrice": {			'+
'							"standardRate": 123.45,			'+
'							"standardMinimumAmount": 123.45,			'+
'							"standardMaximumAmount": 123.45,			'+
'							"tcurrency": "tcurrencyTest"			'+
'						}			'+
'					}			'+
'				]			'+
'			}			'+
'     	}]                                    ' +
'     }],	                                      ' +
'     "OperacionGastosCompartidos":true       ' +
'     }										  ';
            
        return res;                  
    }

    @TestVisible
    public static String WS_B2B_Orchestation(){
        String res = '{"Test":"Test"}';  
        return res;
    }
    
    @TestVisible
    public static String WS_OperationsList(){
        String res = '{"Test":"Test"}';  
        return res;
    }

    @TestVisible
    public static String WS_TrackingPaymentOperation(){
        String res = '{"status":"OK"}';  
        return res;
    } 
    
    @TestVisible
    public static String WS_OperationByStatus(){
        String res = '{"Test":"OK"}';  
        return res;
    } 
        
    @TestVisible
    public static String WS_GetPaymentDetail(){
        String res = '{"Test":"OK"}';  
        return res;
    } 
    
     @TestVisible
    public static String WS_B2B_OTP(){
        String res = '{"Test":"Test"}';  
        return res;
    } 

     @TestVisible
    public static String CNT_SwiftPaymentTable(){
        String res = '{"Test":"Test"}';  
        return res;
    } 
    
    @TestVisible
    public static String WRAPPER_Login(){
        String res = '{'+
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
		'      \"idToken\": \"               \"'+
                    '}}}';
	
        return res;
    }
    
    public static String WRAPPER_PaymentSF(){
        String res = '{' +
  		   '   "paymentId":"paymentId",  '+
            '   "clientReference":"clientReference"}  ';
        return res;
    }
}