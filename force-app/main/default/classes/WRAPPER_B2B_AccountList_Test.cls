@IsTest
public class WRAPPER_B2B_AccountList_Test {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'  \"accountsDataList\": ['+
		'    {'+
		'      \"displayNumber\": \"ES6000491500051234567892\",'+
		'      \"accountId\": \"ES6000491500051234567892\",'+
		'      \"accountIdType\": \"IBA\",'+
		'      \"alias\": \"My chequing account\",'+
		'      \"mainItem\": \"true\",'+
		'      \"type\": \"Current Account\",'+
		'      \"description\": \"Cuenta 123 joven\",'+
		'      \"status\": \"Open\",'+
		'      \"customerId\": \"F000223141\",'+
		'      \"costCenter\": \"EEEEBBBB\",'+
		'      \"mainBalance\": {'+
		'        \"amount\": 12000.5,'+
		'        \"currencyCode\": \"EUR\",'+
		'        \"lastUpdate\": \"20190314T014319060+0100\"'+
		'      },'+
		'      \"availableBalance\": {'+
		'        \"amount\": 12000.5,'+
		'        \"currencyCode\": \"EUR\",'+
		'        \"lastUpdate\": \"20190314T014319060+0100\"'+
		'      },'+
		'      \"pendingBalance\": {'+
		'        \"amount\": 12000.5,'+
		'        \"currencyCode\": \"EUR\",'+
		'        \"lastUpdate\": \"20190314T014319060+0100\"'+
		'      },'+
		'      \"withholdingBalance\": {'+
		'        \"amount\": 12000.5,'+
		'        \"currencyCode\": \"EUR\",'+
		'        \"lastUpdate\": \"20190314T014319060+0100\"'+
		'      },'+
		'      \"overdraftLimit\": {'+
		'        \"amount\": 12000.5,'+
		'        \"currencyCode\": \"EUR\",'+
		'        \"lastUpdate\": \"20190314T014319060+0100\"'+
		'      },'+
		'      \"overdraftUsed\": {'+
		'        \"amount\": 12000.5,'+
		'        \"currencyCode\": \"EUR\",'+
		'        \"lastUpdate\": \"20190314T014319060+0100\"'+
		'      },'+
		'      \"accountsListLinks\": {'+
		'        \"accountDetailsLink\": \"/accounts/00491500051234567892\",'+
		'        \"transactionsListLink\": \"/accounts/00491500051234567892/transactions\"'+
		'      }'+
		'    }'+
		'  ],'+
		'  \"_links\": {'+
		'    \"_first\": \"/accounts?_offset=0\",'+
		'    \"_prev\": \"/accounts?_offset=0\",'+
		'    \"_next\": \"/accounts?_offset=1\"'+
		'  }'+
		'}';
		WRAPPER_B2B_AccountList r = WRAPPER_B2B_AccountList.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_B2B_AccountList objWRAPPER_B2B_AccountList = new WRAPPER_B2B_AccountList(System.JSON.createParser(json));
		System.assert(objWRAPPER_B2B_AccountList != null);
		System.assert(objWRAPPER_B2B_AccountList.accountsDataList == null);
		System.assert(objWRAPPER_B2B_AccountList.x_links == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_B2B_AccountList.MainBalance objMainBalance = new WRAPPER_B2B_AccountList.MainBalance(System.JSON.createParser(json));
		System.assert(objMainBalance != null);
		System.assert(objMainBalance.amount == null);
		System.assert(objMainBalance.currencyCode == null);
		System.assert(objMainBalance.lastUpdate == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_B2B_AccountList.AccountsDataList objAccountsDataList = new WRAPPER_B2B_AccountList.AccountsDataList(System.JSON.createParser(json));
		System.assert(objAccountsDataList != null);
		System.assert(objAccountsDataList.displayNumber == null);
		System.assert(objAccountsDataList.accountId == null);
		System.assert(objAccountsDataList.accountIdType == null);
		System.assert(objAccountsDataList.alias == null);
		System.assert(objAccountsDataList.mainItem == null);
		System.assert(objAccountsDataList.type_Z == null);
		System.assert(objAccountsDataList.description == null);
		System.assert(objAccountsDataList.status == null);
		System.assert(objAccountsDataList.customerId == null);
		System.assert(objAccountsDataList.costCenter == null);
		System.assert(objAccountsDataList.mainBalance == null);
		System.assert(objAccountsDataList.availableBalance == null);
		System.assert(objAccountsDataList.pendingBalance == null);
		System.assert(objAccountsDataList.withholdingBalance == null);
		System.assert(objAccountsDataList.overdraftLimit == null);
		System.assert(objAccountsDataList.overdraftUsed == null);
		System.assert(objAccountsDataList.accountsListLinks == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_B2B_AccountList.AccountsListLinks objAccountsListLinks = new WRAPPER_B2B_AccountList.AccountsListLinks(System.JSON.createParser(json));
		System.assert(objAccountsListLinks != null);
		System.assert(objAccountsListLinks.accountDetailsLink == null);
		System.assert(objAccountsListLinks.transactionsListLink == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_B2B_AccountList.Links objLinks = new WRAPPER_B2B_AccountList.Links(System.JSON.createParser(json));
		System.assert(objLinks != null);
		System.assert(objLinks.x_first == null);
		System.assert(objLinks.x_prev == null);
		System.assert(objLinks.x_next == null);
	}
}