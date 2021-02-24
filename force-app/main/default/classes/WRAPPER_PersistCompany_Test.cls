@IsTest
public class WRAPPER_PersistCompany_Test {
	
	static testMethod void testParse() {
		String json = '{'+
		'\"companyGlobalId\":\"\",'+
		'\"segmentTypeGlobal\":\"\"'+
		'}';
		WRAPPER_PersistCompany obj = WRAPPER_PersistCompany.parse(json);
		System.assert(obj != null);
	}
}