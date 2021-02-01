/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for WRAPPER_PaymentsTracker
History
<Date>			<Author>		    <Description>
13/07/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@IsTest
public class WRAPPER_PaymentsTracker_Test {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'    \"_links\": {'+
		'        \"_first\": \"/me/accounts?_offset=0\",'+
		'        \"_last\": \"/me/accounts?_offset=99\",'+
		'        \"_next\": \"/me/accounts?_offset=1\",'+
		'        \"_prev\": \"/me/accounts?_offset=0\",'+
		'        \"accountDetailsLink\": \"/me/accounts/{account_id}\",'+
		'        \"transactionsListLink\": \"/me/accounts/{account_id}/transactions\"'+
		'      },'+
		'      \"accountsDataList\": ['+
		'        {'+
		'          \"_links\": {'+
		'            \"accountDetailsLink\": \"/me/accounts/{account_id}\",'+
		'            \"transactionsListLink\": \"/me/accounts/{account_id}/transactions\"'+
		'          },'+
		'          \"account\": {'+
		'            \"accountId\": 32180000118359700,'+
		'            \"idType\": \"BBA\"'+
		'          },'+
		'          \"accountIdList\": ['+
		'            {'+
		'              \"accountId\": 32180000118359700,'+
		'              \"idType\": \"BBA\"'+
		'            }'+
		'          ],'+
		'          \"alias\": \"My chequing account\",'+
		'          \"availableBalance\": {'+
		'            \"amount\": 1234.56,'+
		'            \"currencyCode\": \"MXN\",'+
		'            \"lastUpdate\": \"20190314T014319491-0600\"'+
		'          },'+
		'          \"balanceAllowed\": true,'+
		'          \"bankDescription\": \"string\",'+
		'          \"bankId\": \"string\",'+
		'          \"closedAvailableBalance\": {'+
		'            \"amount\": 1234.56,'+
		'            \"currencyCode\": \"MXN\",'+
		'            \"lastUpdate\": \"20190314T014319491-0600\"'+
		'          },'+
		'          \"closedBalance\": {'+
		'            \"amount\": 1234.56,'+
		'            \"currencyCode\": \"MXN\",'+
		'            \"lastUpdate\": \"20190314T014319491-0600\"'+
		'          },'+
		'          \"country\": \"string\",'+
		'          \"customerId\": \"000223141\",'+
		'          \"customerName\": \"string\",'+
		'          \"description\": \"Cuenta 123 joven\",'+
		'          \"displayNumber\": \"00*****384\",'+
		'          \"flags\": {'+
		'            \"additionalProp1\": true,'+
		'            \"additionalProp2\": true,'+
		'            \"additionalProp3\": true'+
		'          },'+
		'          \"hasSwiftPayment\": \"YES\",'+
		'          \"hasSwiftPayments\": \"string\",'+
		'          \"internationalPaymentsAllowed\": true,'+
		'          \"lastTransactionDate\": \"string\",'+
		'          \"lastUpdateSwiftPayment\": \"string\",'+
		'          \"mainBalance\": {'+
		'            \"amount\": 1234.56,'+
		'            \"currencyCode\": \"MXN\",'+
		'            \"lastUpdate\": \"20190314T014319491-0600\"'+
		'          },'+
		'          \"overdraftLimit\": {'+
		'            \"amount\": 1234.56,'+
		'            \"currencyCode\": \"MXN\",'+
		'            \"lastUpdate\": \"20190314T014319491-0600\"'+
		'          },'+
		'          \"overdraftUsed\": {'+
		'            \"amount\": 1234.56,'+
		'            \"currencyCode\": \"MXN\",'+
		'            \"lastUpdate\": \"20190314T014319491-0600\"'+
		'          },'+
		'          \"pain002Active\": true,'+
		'          \"parentCustomerName\": \"string\",'+
		'          \"pendingBalance\": {'+
		'            \"amount\": 1234.56,'+
		'            \"currencyCode\": \"MXN\",'+
		'            \"lastUpdate\": \"20190314T014319491-0600\"'+
		'          },'+
		'          \"status\": \"Open\",'+
		'          \"transactionsAllowed\": true,'+
		'          \"type\": \"Current Account\",'+
		'          \"withholdingBalance\": {'+
		'            \"amount\": 1234.56,'+
		'            \"currencyCode\": \"MXN\",'+
		'            \"lastUpdate\": \"20190314T014319491-0600\"'+
		'          }'+
		'        }'+
		'      ],'+
		'      \"paymentsList\": ['+
		'        {'+
		'            \"paymentId\": \"ce309661-45a5-486b-b4ef-7fc907bcd13a\",'+
		'            \"originatorAgent\": {'+
		'                \"agentCode\": \"BSCHESM0XXX\",'+
		'                \"agentName\": \"BANCO SANTANDER S.A.\",'+
		'                \"agentCountry\": \"ES\",'+
		'                \"agentLocation\": \"28660 MADRID\"'+
		'            },'+
		'            \"transactionStatus\": {'+
		'                \"status\": \"ACSP\",'+
		'                \"reason\": \"G000\"'+
		'            },'+
		'            \"statusDate\": \"2020-07-03T16:52:00Z\",'+
		'            \"cancellationStatus\": {'+
		'                \"transactionCancellationStatus\": null'+
		'            },'+
		'            \"issueDate\": \"2020-07-03\",'+
		'            \"valueDate\": \"2020-07-07\",'+
		'            \"paymentAmount\": {'+
		'                \"amount\": 5000.0,'+
		'                \"currency\": \"USD\"'+
		'            },'+
		'            \"beneficiaryData\": {'+
		'                \"beneficiaryName\": \"TEST RUTEO\",'+
		'                \"creditorCreditAccount\": {'+
		'                    \"idType\": \"BBA\",'+
		'                    \"accountId\": \"CTABENEF\"'+
		'                },'+
		'                \"creditorAgent\": {'+
		'                    \"agentCode\": \"CHASUSU3MX0\",'+
		'                    \"agentName\": \"JPMORGAN CHASE BANK, N.A.\",'+
		'                    \"agentCountry\": \"US\",'+
		'                    \"agentLocation\": \"NEW YORK,NY\"'+
		'                }'+
		'            },'+
		'            \"originatorData\": {'+
		'                \"originatorName\": \"SBINTELLIGENCE S.N.C\",'+
		'                \"originatorAccount\": {'+
		'                    \"idType\": \"IBA\",'+
		'                    \"accountId\": \"ES8100490075473000562155\"'+
		'                }'+
		'            },'+
		'            \"_links\": {'+
		'                \"paymentTrackerDetailsLink\": null,'+
		'                \"_first\": null,'+
		'                \"_prev\": null,'+
		'                \"_next\": null'+
		'            }'+
		'        }'+
		'    ]     '+
		'}';
		WRAPPER_PaymentsTracker r = WRAPPER_PaymentsTracker.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.Account objAccount = new WRAPPER_PaymentsTracker.Account(System.JSON.createParser(json));
		System.assert(objAccount != null);
		System.assert(objAccount.accountId == null);
		System.assert(objAccount.idType == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.OriginatorData objOriginatorData = new WRAPPER_PaymentsTracker.OriginatorData(System.JSON.createParser(json));
		System.assert(objOriginatorData != null);
		System.assert(objOriginatorData.originatorName == null);
		System.assert(objOriginatorData.originatorAccount == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.AccountsDataList objAccountsDataList = new WRAPPER_PaymentsTracker.AccountsDataList(System.JSON.createParser(json));
		System.assert(objAccountsDataList != null);
		System.assert(objAccountsDataList.x_links == null);
		System.assert(objAccountsDataList.account == null);
		System.assert(objAccountsDataList.accountIdList == null);
		System.assert(objAccountsDataList.alias == null);
		System.assert(objAccountsDataList.availableBalance == null);
		System.assert(objAccountsDataList.balanceAllowed == null);
		System.assert(objAccountsDataList.bankDescription == null);
		System.assert(objAccountsDataList.bankId == null);
		System.assert(objAccountsDataList.closedAvailableBalance == null);
		System.assert(objAccountsDataList.closedBalance == null);
		System.assert(objAccountsDataList.country == null);
		System.assert(objAccountsDataList.customerId == null);
		System.assert(objAccountsDataList.customerName == null);
		System.assert(objAccountsDataList.description == null);
		System.assert(objAccountsDataList.displayNumber == null);
		System.assert(objAccountsDataList.flags == null);
		System.assert(objAccountsDataList.hasSwiftPayment == null);
		System.assert(objAccountsDataList.hasSwiftPayments == null);
		System.assert(objAccountsDataList.internationalPaymentsAllowed == null);
		System.assert(objAccountsDataList.lastTransactionDate == null);
		System.assert(objAccountsDataList.lastUpdateSwiftPayment == null);
		System.assert(objAccountsDataList.mainBalance == null);
		System.assert(objAccountsDataList.overdraftLimit == null);
		System.assert(objAccountsDataList.overdraftUsed == null);
		System.assert(objAccountsDataList.pain002Active == null);
		System.assert(objAccountsDataList.parentCustomerName == null);
		System.assert(objAccountsDataList.pendingBalance == null);
		System.assert(objAccountsDataList.status == null);
		System.assert(objAccountsDataList.transactionsAllowed == null);
		System.assert(objAccountsDataList.type_Z == null);
		System.assert(objAccountsDataList.withholdingBalance == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.TransactionStatus objTransactionStatus = new WRAPPER_PaymentsTracker.TransactionStatus(System.JSON.createParser(json));
		System.assert(objTransactionStatus != null);
		System.assert(objTransactionStatus.status == null);
		System.assert(objTransactionStatus.reason == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.Account objCreditorCreditAccount = new WRAPPER_PaymentsTracker.Account(System.JSON.createParser(json));
		System.assert(objCreditorCreditAccount != null);
		System.assert(objCreditorCreditAccount.idType == null);
		System.assert(objCreditorCreditAccount.accountId == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.OriginatorAgent objOriginatorAgent = new WRAPPER_PaymentsTracker.OriginatorAgent(System.JSON.createParser(json));
		System.assert(objOriginatorAgent != null);
		System.assert(objOriginatorAgent.agentCode == null);
		System.assert(objOriginatorAgent.agentName == null);
		System.assert(objOriginatorAgent.agentCountry == null);
		System.assert(objOriginatorAgent.agentLocation == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.Flags objFlags = new WRAPPER_PaymentsTracker.Flags(System.JSON.createParser(json));
		System.assert(objFlags != null);
		System.assert(objFlags.additionalProp1 == null);
		System.assert(objFlags.additionalProp2 == null);
		System.assert(objFlags.additionalProp3 == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.PaymentAmount objPaymentAmount = new WRAPPER_PaymentsTracker.PaymentAmount(System.JSON.createParser(json));
		System.assert(objPaymentAmount != null);
		System.assert(objPaymentAmount.amount == null);
		System.assert(objPaymentAmount.currency_X == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.Links_Z objLinks_Z = new WRAPPER_PaymentsTracker.Links_Z(System.JSON.createParser(json));
		System.assert(objLinks_Z != null);
		System.assert(objLinks_Z.accountDetailsLink == null);
		System.assert(objLinks_Z.transactionsListLink == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker objWRAPPER_PaymentsTracker = new WRAPPER_PaymentsTracker(System.JSON.createParser(json));
		System.assert(objWRAPPER_PaymentsTracker != null);
		System.assert(objWRAPPER_PaymentsTracker.x_links == null);
		System.assert(objWRAPPER_PaymentsTracker.accountsDataList == null);
		System.assert(objWRAPPER_PaymentsTracker.paymentsList == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.AvailableBalance objAvailableBalance = new WRAPPER_PaymentsTracker.AvailableBalance(System.JSON.createParser(json));
		System.assert(objAvailableBalance != null);
		System.assert(objAvailableBalance.amount == null);
		System.assert(objAvailableBalance.currencyCode == null);
		System.assert(objAvailableBalance.lastUpdate == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.Links_Y objLinks_Y = new WRAPPER_PaymentsTracker.Links_Y(System.JSON.createParser(json));
		System.assert(objLinks_Y != null);
		System.assert(objLinks_Y.paymentTrackerDetailsLink == null);
		System.assert(objLinks_Y.x_first == null);
		System.assert(objLinks_Y.x_prev == null);
		System.assert(objLinks_Y.x_next == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.Links objLinks = new WRAPPER_PaymentsTracker.Links(System.JSON.createParser(json));
		System.assert(objLinks != null);
		System.assert(objLinks.x_first == null);
		System.assert(objLinks.x_last == null);
		System.assert(objLinks.x_next == null);
		System.assert(objLinks.x_prev == null);
		System.assert(objLinks.accountDetailsLink == null);
		System.assert(objLinks.transactionsListLink == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.CancellationStatus objCancellationStatus = new WRAPPER_PaymentsTracker.CancellationStatus(System.JSON.createParser(json));
		System.assert(objCancellationStatus != null);
		System.assert(objCancellationStatus.transactionCancellationStatus == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.BeneficiaryData objBeneficiaryData = new WRAPPER_PaymentsTracker.BeneficiaryData(System.JSON.createParser(json));
		System.assert(objBeneficiaryData != null);
		System.assert(objBeneficiaryData.beneficiaryName == null);
		System.assert(objBeneficiaryData.creditorCreditAccount == null);
		System.assert(objBeneficiaryData.creditorAgent == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_PaymentsTracker.PaymentDetail objPaymentsList = new WRAPPER_PaymentsTracker.PaymentDetail(System.JSON.createParser(json));
		System.assert(objPaymentsList != null);
		System.assert(objPaymentsList.paymentId == null);
		System.assert(objPaymentsList.originatorAgent == null);
		System.assert(objPaymentsList.transactionStatus == null);
		System.assert(objPaymentsList.statusDate == null);
		System.assert(objPaymentsList.cancellationStatus == null);
		System.assert(objPaymentsList.issueDate == null);
		System.assert(objPaymentsList.valueDate == null);
		System.assert(objPaymentsList.paymentAmount == null);
		System.assert(objPaymentsList.beneficiaryData == null);
		System.assert(objPaymentsList.originatorData == null);
		System.assert(objPaymentsList.x_links == null);
	}
}