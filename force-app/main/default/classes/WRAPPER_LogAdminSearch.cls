/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the log data
Test Class:     WRAPPER_LogAdminSearch_Test
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
global with sharing class WRAPPER_LogAdminSearch {

	@AuraEnabled global String action;
	@AuraEnabled global String logDate;
	@AuraEnabled global String name;
	@AuraEnabled global String userId;

    global WRAPPER_LogAdminSearch(){
        System.debug('WRAPPER_LogAdminSearch');
    }
	
	global static List<WRAPPER_LogAdminSearch> parse(String json) {
		return (List<WRAPPER_LogAdminSearch>) System.JSON.deserialize(json, List<WRAPPER_LogAdminSearch>.class);
	}
}