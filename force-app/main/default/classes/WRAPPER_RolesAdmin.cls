/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the roles data
Test Class:     WRAPPER_RolesAdmin_Test
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
global with sharing class WRAPPER_RolesAdmin {
    @AuraEnabled global String order;
	@AuraEnabled global String rolAlias;
 	@AuraEnabled global String rolName;

	
	global static List<WRAPPER_RolesAdmin> parse(String json) {
		return (List<WRAPPER_RolesAdmin>) System.JSON.deserialize(json, List<WRAPPER_RolesAdmin>.class);
	}
    
    global WRAPPER_RolesAdmin(){
        System.debug('WRAPPER_RolesAdmin');
    }
}