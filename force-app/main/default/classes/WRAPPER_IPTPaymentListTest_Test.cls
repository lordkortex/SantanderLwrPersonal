@IsTest
public class WRAPPER_IPTPaymentListTest_Test {
	
	static testMethod void testParse() {
		String json = '{\"paymentList\": ['+
		'    {'+
		'      \"paymentDetail\": {'+
		'        \"paymentId\": \"3333626e-5747-4377-91a5-52e0f95122c8\",'+
		'        \"originatorAgent\": {'+
		'          \"agentCode\": \"test\",'+
		'          \"agentName\": \"test\",'+
		'          \"agentCountry\": \"test\",'+
		'          \"agentLocation\": \"test\"'+
		'        },'+
		'        \"transactionStatus\": {'+
		'          \"status\": \"RJCT\",'+
		'          \"reason\":  \"test\"'+
		'        },'+
		'        \"originatorData\": {'+
		'          \"originatorName\": \"PRUEBAS OLC DESEMPLEADO ISA\",'+
		'          \"originatorAccount\": {'+
		'            \"idType\": \"IBA\",'+
		'            \"accountId\": \"ES9000490000000000000011\"'+
		'          }'+
		'        },'+
		'        \"account\": {'+
		'          \"idType\": "IBA",'+
		'          \"accountId\": \"test\"'+
		'        },'+
		'        \"statusDate\": \"2020-03-30\",'+
		'        \"cancellationStatus\": {'+
		'          \"transactionCancellationStatus\": \"test\"'+
		'        },'+
		'        \"issueDate\": \"2020-02-19\",'+
		'        \"valueDate\": \"2020-03-19\",'+
		'        \"paymentAmount\": {'+
		'          \"amount\": \"47.74\",'+
		'          \"tcurrency\": \"EUR\"'+
		'        },'+
		'        \"beneficiaryData\": {'+
		'          \"beneficiaryName\": \"Izzy Solomon Rabinovich Rubinschtei\",'+
		'          \"creditorCreditAccount\": {'+
		'            \"idType\": \"BBA\",'+
		'            \"accountId\": \"400808595\"'+
		'          },'+
		'          \"creditorAgent\": {'+
		'            \"agentCode\": \"test\",'+
		'            \"agentName\": \"test\",'+
		'            \"agentCountry\": \"test\",'+
		'            \"agentLocation\": \"test\"'+
		'          }'+
		'        }'+
		'      },'+
		'      \"links\": {'+
		'        \"paymentTrackerDetailsLink\":\"test\",'+
		'        \"first\": \"test\",'+
		'        \"prev\": \"test\",'+
		'        \"next\":\"test\"'+
		'      }'+
		'    },'+
		'    {'+
		'      \"paymentDetail\": {'+
		'        \"paymentId\": \"a2f4bd30-1365-4c2c-948b-43b257c38881\",'+
		'        \"originatorAgent\": {'+
		'          \"agentCode\": \"test\",'+
		'          \"agentName\": \"test\",'+
		'          \"agentCountry\": \"test\",'+
		'          \"agentLocation\": \"test\"'+
		'        },'+
		'        \"transactionStatus\": {'+
		'          \"status\": \"ACCC\",'+
		'          \"reason\":\"001\"'+
		'        },'+
		'        \"originatorData\": {'+
		'          \"originatorName\": \"OJEDA OSASCO LAZARO\",'+
		'          \"originatorAccount\": {'+
		'            \"idType\": \"IBA\",'+
		'            \"accountId\": \"ES4800490000000000000000\"'+
		'          }'+
		'        },'+
		'        \"account\": {'+
		'          \"idType\": "IBAN",'+
		'          \"accountId\": "test"'+
		'        },'+
		'        \"statusDate\": \"2020-05-05\",'+
		'        \"cancellationStatus\": {'+
		'          \"transactionCancellationStatus\": \"test\"'+
		'        },'+
		'        \"issueDate\": \"2019-11-20\",'+
		'        \"valueDate\": \"2019-11-20\",'+
		'        \"paymentAmount\": {'+
		'          \"amount\": \"47.74\",'+
		'          \"tcurrency\": \"USD\"'+
		'        },'+
		'        \"beneficiaryData\": {'+
		'          \"beneficiaryName\": \"MANUELA OJEDA\",'+
		'          \"creditorCreditAccount\": {'+
		'            \"idType\": \"BBA\",'+
		'            \"accountId\": \"\"'+
		'          },'+
		'          \"creditorAgent\": {'+
		'            \"agentCode\": \"test\",'+
		'            \"agentName\": \"test\",'+
		'            \"agentCountry\":\"test\",'+
		'            \"agentLocation\": \"test\"'+
		'          }'+
		'        }'+
		'      },'+
		'      \"links\": {'+
		'        \"paymentTrackerDetailsLink\": \"test\",'+
		'        \"first\": \"test\",'+
		'        \"prev\": \"test\",'+
		'        \"next\": \"test\"'+
		'      }'+
		'    }'+
		'  ]'+
		'}';         
		WRAPPER_IPTPaymentList obj = WRAPPER_IPTPaymentList.parse(json);
		System.assert(obj != null);
	}
}