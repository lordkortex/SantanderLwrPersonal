/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the groups data
Test Class:     WRAPPER_GroupAdmin_Test
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public with sharing class WRAPPER_GroupAdmin {
    
    @AuraEnabled public String name;

	public static List<WRAPPER_GroupAdmin> parse(String json) {
		return (List<WRAPPER_GroupAdmin>) System.JSON.deserialize(json, List<WRAPPER_GroupAdmin>.class);
	}
}