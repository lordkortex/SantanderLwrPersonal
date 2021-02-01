/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for WRAPPER_GroupAdmin
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WRAPPER_GroupAdmin_Test {
	
	static testMethod void testParse() {
		String json = '['+
		'  {'+
		'    \"name\": \"Grupo 1\"'+
		'  },'+
		'  {'+
		'    \"name\": \"Grupo 2\"'+
		'  },'+
		'  {'+
		'    \"name\": \"Grupo 3\"'+
		'  },'+
		'  {'+
		'    \"name\": \"Grupo 4\"'+
		'  },'+
		'  {'+
		'    \"name\": \"Grupo 5\"'+
		'  }'+
		']';
		List<WRAPPER_GroupAdmin> obj = WRAPPER_GroupAdmin.parse(json);
		System.assert(obj != null, 'The expected wrapper is wrong');
	}
}