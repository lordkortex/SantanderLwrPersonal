/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for WRAPPER_RolesAdmin
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@IsTest
public class WRAPPER_RolesAdmin_Test {
	
	static testMethod void testParse() {
		String json = '['+
		'  {'+
		'    \"order\": \"1\",'+
		'    \"rolAlias\": \"Rol Alias 1\",'+
		'    \"rolName\": \"Rol1\"'+
		'  },'+
		'  {'+
		'    \"order\": \"2\",'+
		'    \"rolAlias\": \"Rol Alias 2\",'+
		'    \"rolName\": \"Rol2\"'+
		'  },'+
		'  {'+
		'    \"order\": \"3\",'+
		'    \"rolAlias\": \"Rol Alias 3\",'+
		'    \"rolName\": \"Rol3\"'+
		'  },'+
		'  {'+
		'    \"order\": \"4\",'+
		'    \"rolAlias\": \"Rol Alias 4\",'+
		'    \"rolName\": \"Rol4\"'+
		'  },'+
		'  {'+
		'    \"order\": \"5\",'+
		'    \"rolAlias\": \"Rol Alias 5\",'+
		'    \"rolName\": \"Rol5\"'+
		'  },'+
		'  {'+
		'    \"order\": \"6\",'+
		'    \"rolAlias\": \"Rol Alias 6\",'+
		'    \"rolName\": \"Rol6\"'+
		'  },'+
		'  {'+
		'    \"order\": \"7\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol7\"'+
		'  },'+
		'  {'+
		'    \"order\": \"8\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol8\"'+
		'  },'+
		'  {'+
		'    \"order\": \"9\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol9\"'+
		'  },'+
		'  {'+
		'    \"order\": \"10\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol10\"'+
		'  },'+
		'  {'+
		'    \"order\": \"11\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol11\"'+
		'  },'+
		'  {'+
		'    \"order\": \"12\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol12\"'+
		'  },'+
		'  {'+
		'    \"order\": \"13\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol13\"'+
		'  },'+
		'  {'+
		'    \"order\": \"14\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol14\"'+
		'  },'+
		'  {'+
		'    \"order\": \"15\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol15\"'+
		'  },'+
		'  {'+
		'    \"order\": \"16\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol16\"'+
		'  },'+
		'  {'+
		'    \"order\": \"17\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol17\"'+
		'  },'+
		'  {'+
		'    \"order\": \"18\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol18\"'+
		'  },'+
		'  {'+
		'    \"order\": \"19\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol19\"'+
		'  },'+
		'  {'+
		'    \"order\": \"20\",'+
		'    \"rolAlias\": \"\",'+
		'    \"rolName\": \"Rol20\"'+
		'  }'+
		']';
		List<WRAPPER_RolesAdmin> obj = WRAPPER_RolesAdmin.parse(json);
		System.assert(obj != null, 'The expected wrapper is wrong');
	}
}