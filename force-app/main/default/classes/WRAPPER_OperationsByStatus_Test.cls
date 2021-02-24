@IsTest
public class WRAPPER_OperationsByStatus_Test {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'  \"statusList\": ['+
		'    {'+
		'      \"status\": \"001\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 6'+
		'    },'+
		'    {'+
		'      \"status\": \"002\",'+
		'      \"pendingAuthorization\": true,'+
		'      \"countOperation\": 0'+
		'    },'+
		'    {'+
		'      \"status\": \"002\",'+
		'      \"pendingAuthorization\": false,'+
		'      \"countOperation\": 0'+
		'    },'+
		'    {'+
		'      \"status\": \"003\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 0'+
		'    },'+
		'    {'+
		'      \"status\": \"997\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 0'+
		'    },'+
		'    {'+
		'      \"status\": \"101\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 17'+
		'    },'+
		'    {'+
		'      \"status\": \"201\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 0'+
		'    },'+
		'    {'+
		'      \"status\": \"998\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 0'+
		'    },'+
		'    {'+
		'      \"status\": \"202\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 0'+
		'    },'+
		'    {'+
		'      \"status\": \"999\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 0'+
		'    },'+
		'    {'+
		'      \"status\": \"800\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 0'+
		'    },'+
		'    {'+
		'      \"status\": \"801\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 0'+
		'    },'+
		'    {'+
		'      \"status\": \"103\",'+
		'      \"pendingAuthorization\": null,'+
		'      \"countOperation\": 0'+
		'    }'+
		'  ]'+
		'}';
		WRAPPER_OperationsByStatus r = WRAPPER_OperationsByStatus.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_OperationsByStatus objWRAPPER_OperationsByStatus = new WRAPPER_OperationsByStatus(System.JSON.createParser(json));
		System.assert(objWRAPPER_OperationsByStatus != null);
		System.assert(objWRAPPER_OperationsByStatus.statusList == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_OperationsByStatus.StatusList objStatusList = new WRAPPER_OperationsByStatus.StatusList(System.JSON.createParser(json));
		System.assert(objStatusList != null);
		System.assert(objStatusList.status == null);
		System.assert(objStatusList.pendingAuthorization == null);
		System.assert(objStatusList.countOperation == null);
	}
}