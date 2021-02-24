@IsTest
public class WRAPPER_B2B_SignatureStructure_Test {
	
    @isTest
	static WRAPPER_B2B_SignatureStructure testParse() {
		String json = '{'+
		'  \"structureListResponse\": {'+
		'    \"groupDataDetails\": ['+
		'      {'+
		'        \"groupDescription\": \"Executivos de nivel 5\",'+
		'        \"groupId\": \"Executive\",'+
		'        \"groupLevel\": \"A\",'+
		'        \"singsRequired\": 1,'+
		'        \"userList\": ['+
		'          {'+
		'            \"userId\": 43244234'+
		'          }'+
		'        ]'+
		'      },'+
		'      {'+
		'        \"groupDescription\": \"Executivos de nivel 4\",'+
		'        \"groupId\": \"Executive\",'+
		'        \"groupLevel\": \"B\",'+
		'        \"singsRequired\": 2,'+
		'        \"userList\": ['+
		'          {'+
		'            \"userId\": 43244234'+
		'          },'+
		'          {'+
		'            \"userId\": 43244235'+
		'          },'+
		'          {'+
		'            \"userId\": 43244236'+
		'          }'+
		'        ]'+
		'      },'+
		'      {'+
		'        \"groupDescription\": \"Executivos de nivel 3\",'+
		'        \"groupId\": \"Executive\",'+
		'        \"groupLevel\": \"C\",'+
		'        \"singsRequired\": 3,'+
		'        \"userList\": ['+
		'          {'+
		'            \"userId\": 43244234'+
		'          },'+
		'          {'+
		'            \"userId\": 43244237'+
		'          },'+
		'          {'+
		'            \"userId\": 43244238'+
		'          },'+
		'          {'+
		'            \"userId\": 43244235'+
		'          }'+
		'        ]'+
		'      }'+
		'    ]'+
		'  }'+
		'}';
		WRAPPER_B2B_SignatureStructure obj = WRAPPER_B2B_SignatureStructure.parse(json);
		System.assert(obj != null);
        return obj;
	}
}