/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the log data
Test Class:     WRAPPER_LogAdminSearch_Test
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public with sharing class WRAPPER_LogAdminSearch {

	@AuraEnabled public String action;
	@AuraEnabled public String logDate;
	@AuraEnabled public String name;
	@AuraEnabled public String userId;

	
	public static List<WRAPPER_LogAdminSearch> parse(String json) {
		return (List<WRAPPER_LogAdminSearch>) System.JSON.deserialize(json, List<WRAPPER_LogAdminSearch>.class);
	}
}