@IsTest
public class WRAPPER_AuthorizationApproval_Test {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'  \"modifAuthorization\": null,'+
		'  \"nomObject\": null'+
		'}';
		WRAPPER_AuthorizationApproval r = WRAPPER_AuthorizationApproval.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_AuthorizationApproval objWRAPPER_AuthorizationApproval = new WRAPPER_AuthorizationApproval(System.JSON.createParser(json));
		System.assert(objWRAPPER_AuthorizationApproval != null);
		System.assert(objWRAPPER_AuthorizationApproval.modifAuthorization == null);
		System.assert(objWRAPPER_AuthorizationApproval.nomObject == null);
	}
}