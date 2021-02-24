/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for WRAPPER_LogAdminSearch
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WRAPPER_LogAdminSearch_Test {
	
	static testMethod void testParse() {
		String json = '['+
		'  {'+
		'    \"action\": \"User Login : OK 02101626092254 Miguel Admin Temporal\",'+
		'    \"logDate\": \"25/11/2019, 12:35\",'+
		'    \"name\": \"Miguel Admin Temporal 0\",'+
		'    \"userId\": \"02101626092254\"'+
		'  },'+
		'  {'+
		'    \"action\": \"User Login : OK 02101626092254 Miguel Admin Temporal\",'+
		'    \"logDate\": \"25/11/2019, 12:35\",'+
		'    \"name\": \"Miguel Admin Temporal 1\",'+
		'    \"userId\": \"02101626092254\"'+
		'  },'+
		'  {'+
		'    \"action\": \"User Login : OK 02101626092254 Miguel Admin Temporal\",'+
		'    \"logDate\": \"25/11/2019, 12:35\",'+
		'    \"name\": \"Miguel Admin Temporal 2\",'+
		'    \"userId\": \"02101626092254\"'+
		'  },'+
		'  {'+
		'    \"action\": \"User Login : OK 02101626092254 Miguel Admin Temporal\",'+
		'    \"logDate\": \"25/11/2019, 12:35\",'+
		'    \"name\": \"Miguel Admin Temporal 3\",'+
		'    \"userId\": \"02101626092254\"'+
		'  }'+
		']';
		List<WRAPPER_LogAdminSearch> obj = WRAPPER_LogAdminSearch.parse(json);
		System.assert(obj != null, 'The expected wrapper is wrong');
	}
}