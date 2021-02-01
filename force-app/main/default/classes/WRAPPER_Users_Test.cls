/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for WRAPPER_Users
History
<Date>			<Author>		    <Description>
29/01/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WRAPPER_Users_Test {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '['+
		'  {'+
		'    \"groupName\": \"Sales\",'+
		'    \"role\": \"Sales Manager\",'+
		'    \"state\": \"Enabled\",'+
		'    \"type\": \"Functional\",'+
		'    \"userId\": \"SAL - 4776184\",'+
		'    \"userName\": \"Miguel Álvarez Aguilera \"'+
		'  },'+
		'  {'+
		'    \"groupName\": \"Sales\",'+
		'    \"role\": \"Sales Director\",'+
		'    \"state\": \"Enabled\",'+
		'    \"type\": \"Functional\",'+
		'    \"userId\": \"SAL - 9518471\",'+
		'    \"userName\": \"Maria Yolanda del Valle Redondo  \"'+
		'  },'+
		'  {'+
		'    \"groupName\": \"Marketing\",'+
		'    \"role\": \"\",'+
		'    \"state\": \"Enabled\",'+
		'    \"type\": \"Administrator\",'+
		'    \"userId\": \"MRK - 6076084\",'+
		'    \"userName\": \"Trinidad Hernandez Arias \"'+
		'  },'+
		'  {'+
		'    \"groupName\": \"\",'+
		'    \"role\": \"\",'+
		'    \"state\": \"Enabled\",'+
		'    \"type\": \"Functional\",'+
		'    \"userId\": \"NG - 6559471\",'+
		'    \"userName\": \"Jan Hernandez Pena \"'+
		'  },'+
		'  {'+
		'    \"groupName\": \"Service\",'+
		'    \"role\": \"Service Representative\",'+
		'    \"state\": \"Enabled\",'+
		'    \"type\": \"Functional\",'+
		'    \"userId\": \"SRV - 9873878\",'+
		'    \"userName\": \"Lorena Ballesteros de Miguel \"'+
		'  },'+
		'  {'+
		'    \"groupName\": \"B2B\",'+
		'    \"role\": \"B2B Representative\",'+
		'    \"state\": \"Enabled\",'+
		'    \"type\": \"Functional\",'+
		'    \"userId\": \"B2B - 2797327\",'+
		'    \"userName\": \"Eloisa Gallardo Melero\"'+
		'  },'+
		'  {'+
		'    \"groupName\": \"\",'+
		'    \"role\": \"Customer\",'+
		'    \"state\": \"Disabled\",'+
		'    \"type\": \"Advisory\",'+
		'    \"userId\": \"CST - 3904297\",'+
		'    \"userName\": \"Javier Marcos Hurtado \"'+
		'  },'+
		'  {'+
		'    \"groupName\": \"\",'+
		'    \"role\": \"\",'+
		'    \"state\": \"Disabled\",'+
		'    \"type\": \"Administrator\",'+
		'    \"userId\": \"ADM - 1885709\",'+
		'    \"userName\": \"Luis David Latorre Castaño \"'+
		'  },'+
		'  {'+
		'    \"groupName\": \"Sales\",'+
		'    \"role\": \"Sales Manager\",'+
		'    \"state\": \"Enabled\",'+
		'    \"type\": \"Functional\",'+
		'    \"userId\": \"SAL - 8394160\",'+
		'    \"userName\": \"Miguel Álvarez Aguilera \"'+
		'  },'+
		'  {'+
		'    \"groupName\": \"Sales\",'+
		'    \"role\": \"Sales Director\",'+
		'    \"state\": \"Enabled\",'+
		'    \"type\": \"Functional\",'+
		'    \"userId\": \"SAL - 5647552\",'+
		'    \"userName\": \"Maria Yolanda del Valle Redondo  \"'+
		'  },'+
		'  {'+
		'    \"groupName\": \"Marketing\",'+
		'    \"role\": \"\",'+
		'    \"state\": \"Enabled\",'+
		'    \"type\": \"Administrator\",'+
		'    \"userId\": \"MRK - 7079110\",'+
		'    \"userName\": \"Trinidad Hernandez Arias \"'+
		'  }'+
		']';
		List<WRAPPER_Users> r = WRAPPER_Users.parse(json);
		System.assert(r != null, '');

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_Users usersWrapper = new WRAPPER_Users(System.JSON.createParser(json));
		System.assert(usersWrapper != null);
		System.assert(usersWrapper.groupName == null);
		System.assert(usersWrapper.role == null);
		System.assert(usersWrapper.state == null);
		System.assert(usersWrapper.type_Z == null);
		System.assert(usersWrapper.userId == null);
		System.assert(usersWrapper.userName == null);
	}
}