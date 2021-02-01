@isTest
public class WRAPPER_USERINFO_Test {

	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'  \"userId\": \"7\",'+
		'  \"Name\": \"funjmrol1\",'+
		'  \"Surname\": \"funjmrol1                                                                       \",'+
		'  \"Type\": \"F\",'+
		'  \"State\": \"H\",'+
		'  \"Language\": \"ES\",'+
		'  \"TimeZone\": \"14\",'+
		'  \"NumberFormat\": \"01\",'+
		'  \"dateFormat\": \"01\",'+
		'  \"Email\": \"                    \",'+
		'  \"Phone\": \"                    \",'+
		'  \"Address\": \"                    \",'+
		'  \"MobileAppAccess\": \"S\",'+
		'  \"HasCryptoCalculator\": \"S\",'+
		'  \"CryptoCalculatorNumber\": \"61-0004682-5\",'+
		'  \"VascoID\": \"61-0004682-5\",'+
		'  \"TieneVasco\": \"N\",'+
		'  \"corporates\": ['+
		'    {'+
		'      \"codigoCorporate\": 1,'+
		'      \"nombreCorporate\": \"TESTPORTARG\",'+
		'      \"numDocumento\": \"13456789001111111111\"'+
		'    },'+
		'    {'+
		'      \"codigoCorporate\": 2,'+
		'      \"nombreCorporate\": \"TESTPORTBR\",'+
		'      \"numDocumento\": \"12345678903456111111\"'+
		'    },'+
		'    {'+
		'      \"codigoCorporate\": 3,'+
		'      \"nombreCorporate\": \"TESTPORTMEX                                                                                                                                                                                             \",'+
		'      \"numDocumento\": \"RFC56678909878      \"'+
		'    },'+
		'    {'+
		'      \"codigoCorporate\": 5,'+
		'      \"nombreCorporate\": \"TESTPORTESP\",'+
		'      \"numDocumento\": \"A78676776689\"'+
		'    },'+
		'    {'+
		'      \"codigoCorporate\": 8,'+
		'      \"nombreCorporate\": \"ISBAN-SPAIN\",'+
		'      \"numDocumento\": \"A79194148111\"'+
		'    },'+
		'    {'+
		'      \"codigoCorporate\": 2797,'+
		'      \"nombreCorporate\": \"TESTPORTUSA\",'+
		'      \"numDocumento\": \"TESTPORTUSA\"'+
		'    },'+
		'    {'+
		'      \"codigoCorporate\": 2798,'+
		'      \"nombreCorporate\": \"TESTPORTUS\",'+
		'      \"numDocumento\": \"TESTPORTUS\"'+
		'    },'+
		'    {'+
		'      \"codigoCorporate\": 2806,'+
		'      \"nombreCorporate\": \"TESTPORTUK\",'+
		'      \"numDocumento\": \"TESTPORTUK\"'+
		'    },'+
		'    {'+
		'      \"codigoCorporate\": 2847,'+
		'      \"nombreCorporate\": \"TESTCORPCO\",'+
		'      \"numDocumento\": \"TESTCORPCO\"'+
		'    }'+
		'  ]'+
		'}';
		WRAPPER_USERINFO r = WRAPPER_USERINFO.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_USERINFO objJSON2Apex = new WRAPPER_USERINFO(System.JSON.createParser(json));
		System.assert(objJSON2Apex != null);
		System.assert(objJSON2Apex.userId == null);
		System.assert(objJSON2Apex.Name == null);
		System.assert(objJSON2Apex.Surname == null);
		System.assert(objJSON2Apex.Type_Z == null);
		System.assert(objJSON2Apex.State == null);
		System.assert(objJSON2Apex.Language == null);
		System.assert(objJSON2Apex.TimeZone == null);
		System.assert(objJSON2Apex.NumberFormat == null);
		System.assert(objJSON2Apex.dateFormat == null);
		System.assert(objJSON2Apex.Email == null);
		System.assert(objJSON2Apex.Phone == null);
		System.assert(objJSON2Apex.Address == null);
		System.assert(objJSON2Apex.MobileAppAccess == null);
		System.assert(objJSON2Apex.HasCryptoCalculator == null);
		System.assert(objJSON2Apex.CryptoCalculatorNumber == null);
		System.assert(objJSON2Apex.VascoID == null);
		System.assert(objJSON2Apex.TieneVasco == null);
		System.assert(objJSON2Apex.corporates == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		WRAPPER_USERINFO.Corporates objCorporates = new WRAPPER_USERINFO.Corporates(System.JSON.createParser(json));
		System.assert(objCorporates != null);
		System.assert(objCorporates.codigoCorporate == null);
		System.assert(objCorporates.nombreCorporate == null);
		System.assert(objCorporates.numDocumento == null);
	}
}