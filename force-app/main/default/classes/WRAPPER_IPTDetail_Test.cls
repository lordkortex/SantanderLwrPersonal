/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Test class of WRAPPER_IPTDetail
History
<Date>			<Author>		<Description>
16/03/2020		Shahad Naji    	Initial version
----------------------------------------------------------------------------------*/
@isTest
private class WRAPPER_IPTDetail_Test {
   
        
    static testMethod void testParse() {
		String json = '{'+
		'  \"transactionStatus\": {'+
		'    \"status\": \"ACSP\",'+
		'    \"reason\": \"G000\"'+
		'  },'+
		'  \"cancellationStatus\": {'+
		'    \"transactionCancellationStatus\": null'+
		'  },'+
		'  \"initiationTime\": \"2020-02-06T17:43:37Z\",'+
		'  \"completionTime\": null,'+
		'  \"lastUpdateTime\": \"2020-02-06T17:43:54Z\",'+
		'  \"paymentEventsArray\": ['+
		'    {'+
		'      \"interbankSettlementDate\": \"2020-02-07\",'+
		'      \"networkReference\": \"20200206BSCHESM0AXXX4781836040\",'+
		'      \"messageNameIdentification\": \"103\",'+
		'      \"businessService\": \"001\",'+
		'      \"trackerEventType\": \"CTPT\",'+
		'      \"valid\": \"true\",'+
		'      \"invalidityReason\": null,'+
		'      \"invalidityDescription\": null,'+
		'      \"instructionIdentification\": \"0075185601007446\",'+
		'      \"relatedReference\": null,'+
		'      \"caseIdentification\": null,'+
		'      \"originalInstructionIdentification\": null,'+
		'      \"assignmentIdentification\": null,'+
		'      \"resolvedCaseIdentification\": null,'+
		'      \"eventTransactionStatus\": null,'+
		'      \"underlyingCancellationStatus\": {'+
		'        \"cancellationRequestDetails\": null,'+
		'        \"cancellationResponseDetails\": null,'+
		'        \"cancellationRequestTrackingStatus\": null'+
		'      },'+
		'      \"forwardedToAgent\": null,'+
		'      \"fundsAvailableDate\": null,'+
		'      \"fromAgent\": {'+
		'        \"agentCode\": \"BSCHESM0XXX\",'+
		'        \"agentName\": null,'+
		'        \"agentCountry\": null,'+
		'        \"agentLocation\": null'+
		'      },'+
		'      \"toAgent\": {'+
		'        \"agentCode\": \"IRVTUS30XXX\",'+
		'        \"agentName\": null,'+
		'        \"agentCountry\": null,'+
		'        \"agentLocation\": null'+
		'      },'+
		'      \"originatorAgent\": {'+
		'        \"agentCode\": \"BSCHESM0XXX\",'+
		'        \"agentName\": null,'+
		'        \"agentCountry\": null,'+
		'        \"agentLocation\": null'+
		'      },'+
		'      \"serialParties\": {'+
		'        \"debtorAgent\": {'+
		'          \"agentCode\": \"BSCHESM0XXX\",'+
		'          \"agentName\": null,'+
		'          \"agentCountry\": null,'+
		'          \"agentLocation\": null'+
		'        },'+
		'        \"instructingReimbursementAgent\": null,'+
		'        \"creditorAgent\": {'+
		'          \"agentCode\": \"COBADEFFXXX\",'+
		'          \"agentName\": \"COMMERZBANK AG\",'+
		'          \"agentCountry\": \"GERMANY\",'+
		'          \"agentLocation\": \"FRANKFURT AM MAIN\"'+
		'        },'+
		'        \"creditor\": null,'+
		'        \"debtor\": null,'+
		'        \"intermediaryAgent1\": null'+
		'      },'+
		'      \"coverParties\": {'+
		'        \"debtor\": null,'+
		'        \"debtorAgent\": null,'+
		'        \"intermediaryAgent1\": null,'+
		'        \"creditorAgent\": null,'+
		'        \"creditor\": null'+
		'      },'+
		'      \"senderAcknowledgementReceipt\": \"2020-02-06T17:43:37Z\",'+
		'      \"receivedDate\": \"2020-02-06T17:43:54Z\",'+
		'      \"instructedAmount\": {'+
		'        \"amount\": 500.0,'+
		'        \"currency\": \"USD\"'+
		'      },'+
		'      \"confirmedAmount\": {'+
		'        \"amount\": 500.0,'+
		'        \"currency\": \"USD\"'+
		'      },'+
		'      \"interbankSettlementAmount\": {'+
		'        \"amount\": null,'+
		'        \"currency\": null'+
		'      },'+
		'      \"chargeBearer\": \"SHAR\",'+
		'      \"chargeAmount\": [{'+
		'        \"amount\": 0.0,'+
		'        \"currency\": \"USD\"'+
		'      }],'+
		'      \"foreignExchangeDetails\": {'+
		'        \"sourceCurrency\": null,'+
		'        \"targetCurrency\": null,'+
		'        \"exchangeRate\": 0.0'+
		'      },'+
		'      \"updatePayment\": null,'+
		'      \"duplicateMessageReference\": null,'+
		'      \"copiedBusinessService\": null,'+
		'      \"lastUpdateTime\": \"2020-02-06T17:43:51.684Z\"'+
		'    }'+
		'  ],'+
		'  \"statusUpdatedOnline\": true'+
		'}';
		WRAPPER_IPTDetail obj = WRAPPER_IPTDetail.parse(json);
		System.assert(obj != null);
	}
    
    
    @isTest
    public static void getVisualStepsTest(){
        
        Test.startTest();
        DataFactory.createWsConfigurationSetting(true);
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            String json = '  {  "cancellationStatus": {    "transactionCancellationStatus": null  },  "completionTime": null,  "initiationTime": "2020-10-14T07:38:08Z",  "lastUpdateTime": "2020-10-14T07:40:06.334Z",  "paymentEventsArray": [    {      "networkReference": "20201014BSCHESMMAXXX4667194407",      "messageNameIdentification": "299",      "fromAgent": {        "agentCode": "BSCHESMMXXX",        "agentCountry": "ES",        "agentLocation": "MADRID",        "agentName": "BANCO SANTANDER S.A."      },      "toAgent": {        "agentCode": "TRCKCHZZXXX",        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "originatorAgent": {        "agentCode": "BSCHESMMXXX",        "agentCountry": "ES",        "agentLocation": "MADRID",        "agentName": "BANCO SANTANDER S.A."      },      "senderAcknowledgementReceipt": "2020-10-14T07:39:55Z",      "receivedDate": null,      "chargeBearer": null,      "chargeAmount": [              ],      "instructedAmount": {        "amount": null,        "tcurrency": null      },      "confirmedAmount": {        "amount": 272.0,        "tcurrency": "EUR"      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:40:03.548Z",      "updatePayment": "20201014SCBLDEFXAXXX0801763204"    },    {      "networkReference": "20201014073953133-030000122933",      "messageNameIdentification": "199",      "fromAgent": {        "agentCode": "BSCHBRSPXXX",        "agentCountry": "BR",        "agentLocation": "SAO PAULO",        "agentName": "BANCO SANTANDER (BRASIL) S.A."      },      "toAgent": {        "agentCode": "TRCKCHZZXXX",        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "originatorAgent": {        "agentCode": "BSCHBRSPXXX",        "agentCountry": "BR",        "agentLocation": "SAO PAULO",        "agentName": "BANCO SANTANDER (BRASIL) S.A."      },      "senderAcknowledgementReceipt": "2020-10-14T07:39:53Z",      "receivedDate": null,      "chargeBearer": null,      "chargeAmount": [              ],      "instructedAmount": {        "amount": null,        "tcurrency": null      },      "confirmedAmount": {        "amount": 272.0,        "tcurrency": "EUR"      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:40:03.423Z",      "updatePayment": "20201014SCBLDEFXAXXX0801763201"    },    {      "networkReference": "20201014SCBLDEFXAXXX0801763204",      "messageNameIdentification": "202COV",      "fromAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "toAgent": {        "agentCode": "BSCHESMMXXX",        "agentCountry": "ES",        "agentLocation": "MADRID",        "agentName": "BANCO SANTANDER S.A."      },      "originatorAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "senderAcknowledgementReceipt": "2020-10-14T07:39:19Z",      "receivedDate": "2020-10-14T07:39:50Z",      "chargeBearer": null,      "chargeAmount": [              ],      "instructedAmount": {        "amount": 297.0,        "tcurrency": "EUR"      },      "confirmedAmount": {        "amount": null,        "tcurrency": null      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:39:32.961Z",      "updatePayment": null    },    {      "networkReference": "20201014SCBLDEFXAXXX0801763201",      "messageNameIdentification": "103",      "fromAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "toAgent": {        "agentCode": "BSCHBRSPXXX",        "agentCountry": "BR",        "agentLocation": "SAO PAULO",        "agentName": "BANCO SANTANDER (BRASIL) S.A."      },      "originatorAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "senderAcknowledgementReceipt": "2020-10-14T07:39:17Z",      "receivedDate": "2020-10-14T07:39:30Z",      "chargeBearer": "SHAR",      "chargeAmount": [        {          "amount": 0.0,          "tcurrency": "EUR"        },        {          "amount": 25.0,          "tcurrency": "EUR"        }      ],      "instructedAmount": {        "amount": 297.0,        "tcurrency": "EUR"      },      "confirmedAmount": {        "amount": null,        "tcurrency": null      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:39:32.785Z",      "updatePayment": null    },    {      "networkReference": "20201014SCBLDEFXAXXX0801763189",      "messageNameIdentification": "103",      "fromAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "toAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "originatorAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "senderAcknowledgementReceipt": "2020-10-14T07:39:00Z",      "receivedDate": "2020-10-14T07:39:13Z",      "chargeBearer": "SHAR",      "chargeAmount": [              ],      "instructedAmount": {        "amount": 297.0,        "tcurrency": "EUR"      },      "confirmedAmount": {        "amount": null,        "tcurrency": null      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:39:18.938Z",      "updatePayment": null    },    {      "networkReference": "20201014PASCITMMAXXX0128377723",      "messageNameIdentification": "103",      "fromAgent": {        "agentCode": "PASCITMMXXX",        "agentCountry": "IT",        "agentLocation": "SIENA",        "agentName": "BANCA MONTE DEI PASCHI DI SIENA S.P.A."      },      "toAgent": {        "agentCode": "SCBLDEFXXXX",        "agentCountry": "DE",        "agentLocation": "FRANKFURT AM MAIN",        "agentName": "STANDARD CHARTERED BANK AG"      },      "originatorAgent": {        "agentCode": "PASCITMMXXX",        "agentCountry": "IT",        "agentLocation": "SIENA",        "agentName": "BANCA MONTE DEI PASCHI DI SIENA S.P.A."      },      "senderAcknowledgementReceipt": "2020-10-14T07:38:08Z",      "receivedDate": "2020-10-14T07:38:50Z",      "chargeBearer": "SHAR",      "chargeAmount": [              ],      "instructedAmount": {        "amount": 297.0,        "tcurrency": "EUR"      },      "confirmedAmount": {        "amount": null,        "tcurrency": null      },      "foreignExchangeDetails": {        "sourceCurrency": null,        "targetCurrency": null,        "exchangeRate": 0.0      },      "forwardedToAgent": {        "agentCode": null,        "agentCountry": null,        "agentLocation": null,        "agentName": null      },      "lastUpdateTime": "2020-10-14T07:38:17.097Z",      "updatePayment": null    }  ],  "transactionStatus": {    "status": "ACSP",    "reason": "G004"  },  "creditorAgent": {    "agentCode": "BSCHBRSPXXX",    "agentCountry": "BR",    "agentLocation": "SAO PAULO",    "agentName": "BANCO SANTANDER (BRASIL) S.A."  },  "debtorAgent": {    "agentCode": "PASCITMMXXX",    "agentCountry": "IT",    "agentLocation": "SIENA",    "agentName": "BANCA MONTE DEI PASCHI DI SIENA S.P.A."  }}';
			WRAPPER_IPTDetail data = WRAPPER_IPTDetail.parse(json);
            WRAPPER_IPTDetail.getVisualSteps(data);
            /*String json2='{"cancellationStatus": {      "transactionCancellationStatus": null    },    "completionTime": "2020-03-10T14:45:13Z",    "initiationTime": "2020-04-03T15:55:52Z",    "lastUpdateTime": "2020-04-06T05:57:20Z",    "paymentEventsArray": [      {        "networkReference": "20200403BSCHBRSPAXXX3428440974",        "messageNameIdentification": "103",        "fromAgent": {          "agentCode": "BSCHBRSPSPO",          "agentCountry": "BR",          "agentLocation": "SAO PAULO",          "agentName": "BANCO SANTANDER (BRASIL) S.A."        },        "toAgent": {          "agentCode": "COBADEFFXXX",          "agentCountry": "DE",          "agentLocation": "60261 FRANKFURT AM MAIN",          "agentName": "COMMERZBANK AG"        },        "senderAcknowledgementReceipt": "2020-04-03T15:55:52Z",        "receivedDate": "2020-04-03T15:56:05Z",        "chargeBearer": null,        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "EUR"          }        ],        "instructedAmount": {          "amount": 235.64,          "tcurrency": "EUR"        },        "confirmedAmount": {          "amount": null,          "tcurrency": null        },        "foreignExchangeDetails": {          "sourceCurrency": null,          "targetCurrency": null,          "exchangeRate": 0.0        },        "forwardedToAgent": {          "agentCode": null,          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-04-03T15:56:02Z"      },      {        "networkReference": "20200403COBADEFFCXXX4420982991",        "messageNameIdentification": "199",        "fromAgent": {          "agentCode": "COBADEFFXXX",          "agentCountry": "DE",          "agentLocation": "60261 FRANKFURT AM MAIN",          "agentName": "COMMERZBANK AG"        },        "toAgent": {          "agentCode": "TRCKCHZZXXX",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "senderAcknowledgementReceipt": "2020-04-03T16:57:16Z",        "receivedDate": null,        "chargeBearer": null,        "chargeAmount": [          {            "amount": null,            "tcurrency": null          }        ],        "instructedAmount": {          "amount": null,          "tcurrency": null        },        "confirmedAmount": {          "amount": 235.64,          "tcurrency": "EUR"        },        "foreignExchangeDetails": {          "sourceCurrency": null,          "targetCurrency": null,          "exchangeRate": 0.0        },        "forwardedToAgent": {          "agentCode": null,          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-04-03T16:57:31Z"      },      {        "networkReference": "20200406COBADEFFFXXX1601742850",        "messageNameIdentification": "103",        "fromAgent": {          "agentCode": "COBADEFFXXX",          "agentCountry": "DE",          "agentLocation": "60261 FRANKFURT AM MAIN",          "agentName": "COMMERZBANK AG"        },        "toAgent": {          "agentCode": "UNCRITMMXXX",          "agentCountry": "IT",          "agentLocation": "20154 MILANO",          "agentName": "UNICREDIT S.P.A."        },        "senderAcknowledgementReceipt": "2020-04-06T04:23:48Z",        "receivedDate": "2020-04-06T05:53:04Z",        "chargeBearer": null,        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "EUR"          },          {            "amount": 12.0,            "tcurrency": "EUR"          }        ],        "instructedAmount": {          "amount": 235.64,          "tcurrency": "EUR"        },        "confirmedAmount": {          "amount": null,          "tcurrency": null        },        "foreignExchangeDetails": {          "sourceCurrency": null,          "targetCurrency": null,          "exchangeRate": 0.0        },        "forwardedToAgent": {          "agentCode": null,          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-04-06T04:24:02Z"      },      {        "networkReference": "20200406UNCRITMMBXXX6569114871",        "messageNameIdentification": "103",        "fromAgent": {          "agentCode": "UNCRITMMXXX",          "agentCountry": "IT",          "agentLocation": "20154 MILANO",          "agentName": "UNICREDIT S.P.A."        },        "toAgent": {          "agentCode": "DEUTITMMXXX",          "agentCountry": "IT",          "agentLocation": "20126 MILANO",          "agentName": "DEUTSCHE BANK S.P.A."        },        "senderAcknowledgementReceipt": "2020-04-06T05:56:48Z",        "receivedDate": "2020-04-06T05:57:20Z",        "chargeBearer": null,        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "EUR"          },          {            "amount": 12.0,            "tcurrency": "EUR"         },         {           "amount": 18.0,           "tcurrency": "EUR"         }       ],       "instructedAmount": {         "amount": 235.64,         "tcurrency": "EUR"       },       "confirmedAmount": {         "amount": null,         "tcurrency": null       },       "foreignExchangeDetails": {         "sourceCurrency": null,         "targetCurrency": null,         "exchangeRate": 0.0       },       "forwardedToAgent": {         "agentCode": null,         "agentCountry": null,         "agentLocation": null,         "agentName": null       },       "lastUpdateTime": "2020-04-06T05:57:04Z"     }   ],   "transactionStatus": {     "status": "ACCC",     "reason": null   } }';
			WRAPPER_IPTDetail data2 = WRAPPER_IPTDetail.parse(json2);
            WRAPPER_IPTDetail.getVisualSteps(data2);
            
            String json3 =    '{ "cancellationStatus": {      "transactionCancellationStatus": null    },    "completionTime": null,    "initiationTime": "2020-06-16T23:58:10Z",    "lastUpdateTime": "2020-06-16T23:58:26Z",    "paymentEventsArray": [      {        "networkReference": "20200617BSCHESM0AXXX4833947456",        "messageNameIdentification": "103",        "fromAgent": {          "agentCode": "BSCHESM0XXX",          "agentCountry": "ES",          "agentLocation": "MADRID",          "agentName": "BANCO SANTANDER S.A."        },        "toAgent": {          "agentCode": "IRVTUS30XXX",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",        "receivedDate": "2020-06-16T23:58:26Z",        "chargeBearer": "SHAR",        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "USD"          }        ],        "instructedAmount": {          "amount": 500.0,          "tcurrency": "USD"        },        "confirmedAmount": {          "amount": null,          "tcurrency": null        },        "foreignExchangeDetails": {          "sourceCurrency": null,          "targetCurrency": null,          "exchangeRate": 0.0        },        "forwardedToAgent": {          "agentCode": null,          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-06-16T23:58:24.028Z"      }    ],    "transactionStatus": {      "status": "ACSP",      "reason": "G000"    }  }';
        	WRAPPER_IPTDetail data3 = WRAPPER_IPTDetail.parse(json3);
            WRAPPER_IPTDetail.getVisualSteps(data3);
            
            String json4 = '{    "cancellationStatus": {      "transactionCancellationStatus": null    },    "completionTime": null,    "initiationTime": "2020-06-16T23:58:10Z",    "lastUpdateTime": "2020-06-16T23:58:26Z",    "paymentEventsArray": [      {        "networkReference": "20200617BSCHESM0AXXX4833947456",        "messageNameIdentification": "103",        "fromAgent": {          "agentCode": "BSCHESM0XXX",          "agentCountry": "ES",          "agentLocation": "MADRID",          "agentName": "BANCO SANTANDER S.A."        },        "toAgent": {          "agentCode": "test4",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",        "receivedDate": "2020-06-16T23:58:26Z",        "chargeBearer": "SHAR",        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "USD"          }        ],        "instructedAmount": {          "amount": 500.0,          "tcurrency": "USD"        },        "confirmedAmount": {          "amount": null,          "tcurrency": null        },        "foreignExchangeDetails": {          "sourceCurrency": null,          "targetCurrency": null,          "exchangeRate": 0.0        },        "forwardedToAgent": {          "agentCode": null,          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-06-16T23:58:24.028Z"      },{         "networkReference": "20200617BSCHESM0AXXX4833947456",         "messageNameIdentification": "103",         "fromAgent": {           "agentCode": "BSCHESM0XXX",           "agentCountry": "ES",           "agentLocation": "MADRID",           "agentName": "BANCO SANTANDER S.A."         },         "toAgent": {           "agentCode": "test3",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",         "receivedDate": "2020-06-16T23:58:26Z",         "chargeBearer": "SHAR",         "chargeAmount": [           {             "amount": 0.0,             "tcurrency": "USD"           }         ],         "instructedAmount": {           "amount": 500.0,           "tcurrency": "USD"         },         "confirmedAmount": {           "amount": null,           "tcurrency": null         },         "foreignExchangeDetails": {           "sourceCurrency": null,           "targetCurrency": null,           "exchangeRate": 0.0         },         "forwardedToAgent": {           "agentCode": null,           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "lastUpdateTime": "2020-06-16T23:58:24.028Z"       },  {         "networkReference": "20200617BSCHESM0AXXX4833947456",         "messageNameIdentification": "103",         "fromAgent": {           "agentCode": "BSCHESM0XXX",           "agentCountry": "ES",           "agentLocation": "MADRID",           "agentName": "BANCO SANTANDER S.A."         },         "toAgent": {           "agentCode": "IRVTUS30XXX",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",         "receivedDate": "2020-06-16T23:58:26Z",         "chargeBearer": "SHAR",         "chargeAmount": [           {             "amount": 0.0,             "tcurrency": "USD"           }         ],         "instructedAmount": {           "amount": 500.0,           "tcurrency": "USD"         },         "confirmedAmount": {           "amount": null,           "tcurrency": null         },         "foreignExchangeDetails": {           "sourceCurrency": null,           "targetCurrency": null,           "exchangeRate": 0.0         },         "forwardedToAgent": {           "agentCode": "test1",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "lastUpdateTime": "2020-06-16T23:58:24.028Z"       }	   ],    "transactionStatus": {      "status": "ACSP",      "reason": "G000"    }  }';
            WRAPPER_IPTDetail data4 = WRAPPER_IPTDetail.parse(json4);
            WRAPPER_IPTDetail.getVisualSteps(data4);
            
            String json5 ='{    "cancellationStatus": {      "transactionCancellationStatus": null    },    "completionTime": null,    "initiationTime": "2020-06-16T23:58:10Z",    "lastUpdateTime": "2020-06-16T23:58:26Z",    "paymentEventsArray": [      {        "networkReference": "20200617BSCHESM0AXXX4833947456",        "messageNameIdentification": "103",        "fromAgent": {          "agentCode": "BSCHESM0XXX",          "agentCountry": "ES",          "agentLocation": "MADRID",          "agentName": "BANCO SANTANDER S.A."        },        "toAgent": {          "agentCode": "test1",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",        "receivedDate": "2020-06-16T23:58:26Z",        "chargeBearer": "SHAR",        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "USD"          }        ],        "instructedAmount": {          "amount": 500.0,          "tcurrency": "USD"        },        "confirmedAmount": {          "amount": null,          "tcurrency": null        },        "foreignExchangeDetails": {          "sourceCurrency": "EUR",          "targetCurrency": "EUR",          "exchangeRate": 4        },        "forwardedToAgent": {          "agentCode": null,          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-06-16T23:58:24.028Z"      },  	{        "networkReference": "20200617BSCHESM0AXXX4833947456",        "messageNameIdentification": "199",        "fromAgent": {          "agentCode": "BSCHESM0XXX",          "agentCountry": "ES",          "agentLocation": "MADRID",          "agentName": "BANCO SANTANDER S.A."        },        "toAgent": {          "agentCode": "test3",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",        "receivedDate": "2020-06-16T23:58:26Z",        "chargeBearer": "SHAR",        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "USD"          }        ],        "instructedAmount": {          "amount": 500.0,          "tcurrency": "USD"        },        "confirmedAmount": {          "amount": null,          "tcurrency": null        },        "foreignExchangeDetails": {          "sourceCurrency": "EUR",          "targetCurrency": "EUR",          "exchangeRate": 4        },        "forwardedToAgent": {          "agentCode": "test",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-06-16T23:58:24.028Z"      },   	{         "networkReference": "20200617BSCHESM0AXXX4833947456",         "messageNameIdentification": "199",         "fromAgent": {           "agentCode": "BSCHESM0XXX",           "agentCountry": "ES",           "agentLocation": "MADRID",           "agentName": "BANCO SANTANDER S.A."         },         "toAgent": {           "agentCode": "IRVTUS30XXX",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",         "receivedDate": "2020-06-16T23:58:26Z",         "chargeBearer": "SHAR",         "chargeAmount": [           {             "amount": 0.0,             "tcurrency": "USD"           }         ],         "instructedAmount": {           "amount": 500.0,           "tcurrency": "USD"         },         "confirmedAmount": {           "amount": null,           "tcurrency": null         },         "foreignExchangeDetails": {           "sourceCurrency": "EUR",           "targetCurrency": "EUR",           "exchangeRate": 4         },         "forwardedToAgent": {           "agentCode": "test",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "lastUpdateTime": "2020-06-16T23:58:24.028Z"       },   	{         "networkReference": "20200617BSCHESM0AXXX4833947456",         "messageNameIdentification": "199",         "fromAgent": {           "agentCode": "BSCHESM0XXX",           "agentCountry": "ES",           "agentLocation": "MADRID",           "agentName": "BANCO SANTANDER S.A."         },         "toAgent": {           "agentCode": "test7",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",         "receivedDate": "2020-06-16T23:58:26Z",         "chargeBearer": "SHAR",         "chargeAmount": [           {             "amount": 0.0,             "tcurrency": "USD"           }         ],         "instructedAmount": {           "amount": 500.0,           "tcurrency": "USD"         },         "confirmedAmount": {           "amount": null,           "tcurrency": null         },         "foreignExchangeDetails": {           "sourceCurrency": "EUR",           "targetCurrency": "EUR",           "exchangeRate": 4         },         "forwardedToAgent": {           "agentCode": "test",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "lastUpdateTime": "2020-06-16T23:58:24.028Z"       }    ],    "transactionStatus": {      "status": "ACSP",      "reason": "G000"    }  }';
       		WRAPPER_IPTDetail data5 = WRAPPER_IPTDetail.parse(json5);
            WRAPPER_IPTDetail.getVisualSteps(data5);

            String json6 ='{    "cancellationStatus": {      "transactionCancellationStatus": null    },    "completionTime": null,    "initiationTime": "2020-06-16T23:58:10Z",    "lastUpdateTime": "2020-06-16T23:58:26Z",    "paymentEventsArray": [      {        "networkReference": "20200617BSCHESM0AXXX4833947456",        "messageNameIdentification": "103",        "fromAgent": {          "agentCode": "BSCHESM0XXX",          "agentCountry": "ES",          "agentLocation": "MADRID",          "agentName": "BANCO SANTANDER S.A."        },        "toAgent": {          "agentCode": "IRVTUS30XXX",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",        "receivedDate": "2020-06-16T23:58:26Z",        "chargeBearer": "SHAR",        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "USD"          }        ],        "instructedAmount": {          "amount": 500.0,          "tcurrency": "USD"        },        "confirmedAmount": {          "amount": null,          "tcurrency": null        },        "foreignExchangeDetails": {          "sourceCurrency": "EUR",          "targetCurrency": "EUR",          "exchangeRate": 4        },        "forwardedToAgent": {          "agentCode": null,          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-06-16T23:58:24.028Z"      },  	{        "networkReference": "20200617BSCHESM0AXXX4833947456",        "messageNameIdentification": "103",        "fromAgent": {          "agentCode": "BSCHESM0XXX",          "agentCountry": "ES",          "agentLocation": "MADRID",          "agentName": "BANCO SANTANDER S.A."        },        "toAgent": {          "agentCode": "IRVTUS30XXX",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",        "receivedDate": "2020-06-16T23:58:26Z",        "chargeBearer": "SHAR",        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "USD"          }        ],        "instructedAmount": {          "amount": 500.0,          "tcurrency": "USD"        },        "confirmedAmount": {          "amount": null,          "tcurrency": null        },        "foreignExchangeDetails": {          "sourceCurrency": "EUR",          "targetCurrency": "EUR",          "exchangeRate": 4        },        "forwardedToAgent": {          "agentCode": "test",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-06-16T23:58:24.028Z"      },   	{         "networkReference": "20200617BSCHESM0AXXX4833947456",         "messageNameIdentification": "103",         "fromAgent": {           "agentCode": "BSCHESM0XXX",           "agentCountry": "ES",           "agentLocation": "MADRID",           "agentName": "BANCO SANTANDER S.A."         },         "toAgent": {           "agentCode": "IRVTUS30XXX",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",         "receivedDate": "2020-06-16T23:58:26Z",         "chargeBearer": "SHAR",         "chargeAmount": [           {             "amount": 0.0,             "tcurrency": "USD"           }         ],         "instructedAmount": {           "amount": 500.0,           "tcurrency": "USD"         },         "confirmedAmount": {           "amount": null,           "tcurrency": null         },         "foreignExchangeDetails": {           "sourceCurrency": "EUR",           "targetCurrency": "EUR",           "exchangeRate": 4         },         "forwardedToAgent": {           "agentCode": "test",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "lastUpdateTime": "2020-06-16T23:58:24.028Z"       },   	{         "networkReference": "20200617BSCHESM0AXXX4833947456",         "messageNameIdentification": "103",         "fromAgent": {           "agentCode": "BSCHESM0XXX",           "agentCountry": "ES",           "agentLocation": "MADRID",           "agentName": "BANCO SANTANDER S.A."         },         "toAgent": {           "agentCode": "IRVTUS30XXX",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",         "receivedDate": "2020-06-16T23:58:26Z",         "chargeBearer": "SHAR",         "chargeAmount": [           {             "amount": 0.0,             "tcurrency": "USD"           }         ],         "instructedAmount": {           "amount": 500.0,           "tcurrency": "USD"         },         "confirmedAmount": {           "amount": null,           "tcurrency": null         },         "foreignExchangeDetails": {           "sourceCurrency": "EUR",           "targetCurrency": "EUR",           "exchangeRate": 4         },         "forwardedToAgent": {           "agentCode": "test",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "lastUpdateTime": "2020-06-16T23:58:24.028Z"       }    ],    "transactionStatus": {      "status": "ACSP",      "reason": "G000"    }  }';
            WRAPPER_IPTDetail data6 = WRAPPER_IPTDetail.parse(json6);
            WRAPPER_IPTDetail.getVisualSteps(data6);
            
            String json7 ='{    "cancellationStatus": {      "transactionCancellationStatus": null    },    "completionTime": null,    "initiationTime": "2020-06-16T23:58:10Z",    "lastUpdateTime": "2020-06-16T23:58:26Z",    "paymentEventsArray": [      {        "networkReference": "20200617BSCHESM0AXXX4833947456",        "messageNameIdentification": "103",        "fromAgent": {          "agentCode": "BSCHESM0XXX",          "agentCountry": "ES",          "agentLocation": "MADRID",          "agentName": "BANCO SANTANDER S.A."        },        "toAgent": {          "agentCode": "test1",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",        "receivedDate": "2020-06-16T23:58:26Z",        "chargeBearer": "SHAR",        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "USD"          }        ],        "instructedAmount": {          "amount": 500.0,          "tcurrency": "USD"        },        "confirmedAmount": {          "amount": null,          "tcurrency": null        },        "foreignExchangeDetails": {          "sourceCurrency": "EUR",          "targetCurrency": "EUR",          "exchangeRate": 4        },        "forwardedToAgent": {          "agentCode": null,          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-06-16T23:58:24.028Z"      },  	{        "networkReference": "20200617BSCHESM0AXXX4833947456",        "messageNameIdentification": "103",        "fromAgent": {          "agentCode": "BSCHESM0XXX",          "agentCountry": "ES",          "agentLocation": "MADRID",          "agentName": "BANCO SANTANDER S.A."        },        "toAgent": {          "agentCode": "test3",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",        "receivedDate": "2020-06-16T23:58:26Z",        "chargeBearer": "SHAR",        "chargeAmount": [          {            "amount": 0.0,            "tcurrency": "USD"          }        ],        "instructedAmount": {          "amount": 500.0,          "tcurrency": "USD"        },        "confirmedAmount": {          "amount": null,          "tcurrency": null        },        "foreignExchangeDetails": {          "sourceCurrency": "EUR",          "targetCurrency": "EUR",          "exchangeRate": 4        },        "forwardedToAgent": {          "agentCode": "test",          "agentCountry": null,          "agentLocation": null,          "agentName": null        },        "lastUpdateTime": "2020-06-16T23:58:24.028Z"      },   	{         "networkReference": "20200617BSCHESM0AXXX4833947456",         "messageNameIdentification": "199",         "fromAgent": {           "agentCode": "BSCHESM0XXX",           "agentCountry": "ES",           "agentLocation": "MADRID",           "agentName": "BANCO SANTANDER S.A."         },         "toAgent": {           "agentCode": "IRVTUS30XXX",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",         "receivedDate": "2020-06-16T23:58:26Z",         "chargeBearer": "SHAR",         "chargeAmount": [           {             "amount": 0.0,             "tcurrency": "USD"           }         ],         "instructedAmount": {           "amount": 500.0,           "tcurrency": "USD"         },         "confirmedAmount": {           "amount": null,           "tcurrency": null         },         "foreignExchangeDetails": {           "sourceCurrency": "EUR",           "targetCurrency": "EUR",           "exchangeRate": 4         },         "forwardedToAgent": {           "agentCode": "test",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "lastUpdateTime": "2020-06-16T23:58:24.028Z"       },   	{         "networkReference": "20200617BSCHESM0AXXX4833947456",         "messageNameIdentification": "199",         "fromAgent": {           "agentCode": "BSCHESM0XXX",           "agentCountry": "ES",           "agentLocation": "MADRID",           "agentName": "BANCO SANTANDER S.A."         },         "toAgent": {           "agentCode": "test7",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "senderAcknowledgementReceipt": "2020-06-16T23:58:10Z",         "receivedDate": "2020-06-16T23:58:26Z",         "chargeBearer": "SHAR",         "chargeAmount": [           {             "amount": 0.0,             "tcurrency": "USD"           }         ],         "instructedAmount": {           "amount": 500.0,           "tcurrency": "USD"         },         "confirmedAmount": {           "amount": null,           "tcurrency": null         },         "foreignExchangeDetails": {           "sourceCurrency": "EUR",           "targetCurrency": "EUR",           "exchangeRate": 4         },         "forwardedToAgent": {           "agentCode": "test",           "agentCountry": null,           "agentLocation": null,           "agentName": null         },         "lastUpdateTime": "2020-06-16T23:58:24.028Z"       }    ],    "transactionStatus": {      "status": "ACSP",      "reason": "G000"    }  }';
 			WRAPPER_IPTDetail data7 = WRAPPER_IPTDetail.parse(json7);
            WRAPPER_IPTDetail.getVisualSteps(data7);*/
        }
        Test.stopTest();
    }
    
    @isTest
    public static void getLastUpdateTest(){
        
        Test.startTest();
        DataFactory.createWsConfigurationSetting(true);
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
		String json = '{'+
		'  \"transactionStatus\": {'+
		'    \"status\": \"ACSP\",'+
		'    \"reason\": \"G000\"'+
		'  },'+
		'  \"cancellationStatus\": {'+
		'    \"transactionCancellationStatus\": null'+
		'  },'+
		'  \"initiationTime\": \"2020-02-06T17:43:37Z\",'+
		'  \"completionTime\": null,'+
		'  \"lastUpdateTime\": \"2020-02-06T17:43:54Z\",'+
		'  \"paymentEventsArray\": ['+
		'    {'+
		'      \"interbankSettlementDate\": \"2020-02-07\",'+
		'      \"networkReference\": \"20200206BSCHESM0AXXX4781836040\",'+
		'      \"messageNameIdentification\": \"199\",'+
		'      \"businessService\": \"001\",'+
		'      \"trackerEventType\": \"CTPT\",'+
		'      \"valid\": \"true\",'+
		'      \"invalidityReason\": null,'+
		'      \"invalidityDescription\": null,'+
		'      \"instructionIdentification\": \"0075185601007446\",'+
		'      \"relatedReference\": null,'+
		'      \"caseIdentification\": null,'+
		'      \"originalInstructionIdentification\": null,'+
		'      \"assignmentIdentification\": null,'+
		'      \"resolvedCaseIdentification\": null,'+
		'      \"eventTransactionStatus\": null,'+
		'      \"underlyingCancellationStatus\": {'+
		'        \"cancellationRequestDetails\": null,'+
		'        \"cancellationResponseDetails\": null,'+
		'        \"cancellationRequestTrackingStatus\": null'+
		'      },'+
		'      \"forwardedToAgent\": null,'+
		'      \"fundsAvailableDate\": null,'+
		'      \"fromAgent\": {'+
		'        \"agentCode\": \"BSCHESM0XXX\",'+
		'        \"agentName\": null,'+
		'        \"agentCountry\": null,'+
		'        \"agentLocation\": null'+
		'      },'+
		'      \"toAgent\": {'+
		'        \"agentCode\": \"IRVTUS30XXX\",'+
		'        \"agentName\": null,'+
		'        \"agentCountry\": null,'+
		'        \"agentLocation\": null'+
		'      },'+
		'      \"originatorAgent\": {'+
		'        \"agentCode\": \"BSCHESM0XXX\",'+
		'        \"agentName\": null,'+
		'        \"agentCountry\": null,'+
		'        \"agentLocation\": null'+
		'      },'+
		'      \"serialParties\": {'+
		'        \"debtorAgent\": {'+
		'          \"agentCode\": \"BSCHESM0XXX\",'+
		'          \"agentName\": null,'+
		'          \"agentCountry\": null,'+
		'          \"agentLocation\": null'+
		'        },'+
		'        \"instructingReimbursementAgent\": null,'+
		'        \"creditorAgent\": {'+
		'          \"agentCode\": \"COBADEFFXXX\",'+
		'          \"agentName\": \"COMMERZBANK AG\",'+
		'          \"agentCountry\": \"GERMANY\",'+
		'          \"agentLocation\": \"FRANKFURT AM MAIN\"'+
		'        },'+
		'        \"creditor\": null,'+
		'        \"debtor\": null,'+
		'        \"intermediaryAgent1\": null'+
		'      },'+
		'      \"coverParties\": {'+
		'        \"debtor\": null,'+
		'        \"debtorAgent\": null,'+
		'        \"intermediaryAgent1\": null,'+
		'        \"creditorAgent\": null,'+
		'        \"creditor\": null'+
		'      },'+
		'      \"senderAcknowledgementReceipt\": \"2020-02-06T17:43:37Z\",'+
		'      \"receivedDate\": \"2020-02-06T17:43:54Z\",'+
		'      \"instructedAmount\": {'+
		'        \"amount\": 500.0,'+
		'        \"currency\": \"USD\"'+
		'      },'+
		'      \"confirmedAmount\": {'+
		'        \"amount\": 500.0,'+
		'        \"currency\": \"USD\"'+
		'      },'+
		'      \"interbankSettlementAmount\": {'+
		'        \"amount\": null,'+
		'        \"currency\": null'+
		'      },'+
		'      \"chargeBearer\": \"SHAR\",'+
		'      \"chargeAmount\":[ {'+
		'        \"amount\": 0.0,'+
		'        \"currency\": \"USD\"'+
		'      }],'+
		'      \"foreignExchangeDetails\": {'+
		'        \"sourceCurrency\": null,'+
		'        \"targetCurrency\": null,'+
		'        \"exchangeRate\": 0.0'+
		'      },'+
		'      \"updatePayment\": null,'+
		'      \"duplicateMessageReference\": null,'+
		'      \"copiedBusinessService\": null,'+
		'      \"lastUpdateTime\": \"2020-02-06T17:43:51.684Z\"'+
		'    }'+
		'  ],'+
		'  \"statusUpdatedOnline\": true'+
		'}';
		WRAPPER_IPTDetail data = WRAPPER_IPTDetail.parse(json);
            WRAPPER_IPTDetail.getLastUpdate(data);
        }
        Test.stopTest();
    }
    
    
}