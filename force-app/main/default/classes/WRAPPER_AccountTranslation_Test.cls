/*----------------------------------------------------------------------------------
Author:         A. Duarte Rausell
Company:        Deloitte
Description:    Test class for WRAPPER_AccountTranslation
Test Class:     N/A
History
<Date>          <Author>        		<Description>
22/06/2020      A. Duarte Rausell     	Initial version
----------------------------------------------------------------------------------*/
@IsTest
public class WRAPPER_AccountTranslation_Test {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'	\"accounts\":['+
		'		{'+
		'			\"bankId\":\"BSCHBRSP\",'+
		'			\"accountId\":\"2167130010391GTS\",'+
		'			\"currency\":\"BRL\",'+
		'			\"listIds\":['+
		'				{'+
		'					\"idType\":\"BBA\",'+
		'					\"accountId\":\"0002167130010391\"'+
		'				}'+
		'			]'+
		'		}'+
		'	]'+
		'}';
		WRAPPER_AccountTranslation r = WRAPPER_AccountTranslation.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_AccountTranslation objWRAPPER_AccountTranslation = new WRAPPER_AccountTranslation(System.JSON.createParser(json));
		System.assert(objWRAPPER_AccountTranslation != null);
		System.assert(objWRAPPER_AccountTranslation.accounts == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_AccountTranslation.ListIds objListIds = new WRAPPER_AccountTranslation.ListIds(System.JSON.createParser(json));
		System.assert(objListIds != null);
		System.assert(objListIds.idType == null);
		System.assert(objListIds.accountId == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_AccountTranslation.Accounts objAccounts = new WRAPPER_AccountTranslation.Accounts(System.JSON.createParser(json));
		System.assert(objAccounts != null);
		System.assert(objAccounts.bankId == null);
		System.assert(objAccounts.accountId == null);
		System.assert(objAccounts.accountCurrency == null);
		System.assert(objAccounts.listIds == null);
	}
}