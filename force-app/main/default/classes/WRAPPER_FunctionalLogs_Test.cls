@IsTest
public class WRAPPER_FunctionalLogs_Test {
	
    @testSetup
    static void setup() {
		DataFactory.createWsConfigurationSetting(true);
    }
    
	static testMethod void testParse() {
		String json = '{'+
		'\"CompanyGlobalId\": \"a\",'+
		'\"IP\": \"a\",'+
		'\"country\": \"a\",'+
		'\"localId\": \"a\",'+
		'\"companyLocalId\": \"a\",'+
		'\"clientName\": \"a\",'+
		'\"clientLastName\": \"a\",'+
		'\"error\": true,'+
		'\"description\": \"a\",'+
		'\"operationType\": \"a\",'+
		'\"logType\": \"ACTIVITY/FUNCTIONAL/TECHNICAL/SECURITY\",'+
		'\"logLevel\": \"DEBUG/ERROR/INFO/TRACE/WARN\",'+
		'\"appName\": \"Onboarding Digital\"'+
		'}';
		WRAPPER_FunctionalLogs obj = WRAPPER_FunctionalLogs.parse(json);
		System.assert(obj != null);
        new WRAPPER_FunctionalLogs(WRAPPER_FunctionalLogs.LogTypeEnum.FUNCTIONAL, WRAPPER_FunctionalLogs.LogLevelEnum.ERROR, 'a').sendLog();
        new WRAPPER_FunctionalLogs(WRAPPER_FunctionalLogs.LogTypeEnum.FUNCTIONAL, WRAPPER_FunctionalLogs.LogLevelEnum.ERROR, 'a', 'a', 'a', 'COMPANY').sendLog();
        new WRAPPER_FunctionalLogs(WRAPPER_FunctionalLogs.LogTypeEnum.FUNCTIONAL, WRAPPER_FunctionalLogs.LogLevelEnum.ERROR, 'a', 'a', 'a', 'USER').sendLog();

	}
}