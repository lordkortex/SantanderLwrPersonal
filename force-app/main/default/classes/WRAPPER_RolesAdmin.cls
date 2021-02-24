/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the roles data
Test Class:     WRAPPER_RolesAdmin_Test
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public with sharing class WRAPPER_RolesAdmin {
    @AuraEnabled public String order;
	@AuraEnabled public String rolAlias;
	@AuraEnabled public String rolName;

	
	public static List<WRAPPER_RolesAdmin> parse(String json) {
		return (List<WRAPPER_RolesAdmin>) System.JSON.deserialize(json, List<WRAPPER_RolesAdmin>.class);
	}
}