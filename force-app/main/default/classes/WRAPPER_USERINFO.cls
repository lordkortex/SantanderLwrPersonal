/*----------------------------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the user info
Test Class:     WRAPPER_USERINFO_Test
History
<Date>			<Author>		    <Description>
17/02/2020		Joaquin Vera    Initial version
----------------------------------------------------------------------------------*/
public with sharing class WRAPPER_USERINFO {

	@AuraEnabled public String userId {get;set;} 
	@AuraEnabled public String Name {get;set;} 
	@AuraEnabled public String Surname {get;set;} 
	@AuraEnabled public String Type_Z {get;set;} // in json: Type
	@AuraEnabled public String State {get;set;} 
	@AuraEnabled public String Language {get;set;} 
	@AuraEnabled public String TimeZone {get;set;} 
	@AuraEnabled public String NumberFormat {get;set;} 
	@AuraEnabled public String dateFormat {get;set;} 
	@AuraEnabled public String Email {get;set;} 
	@AuraEnabled public String Phone {get;set;} 
	@AuraEnabled public String Address {get;set;} 
	@AuraEnabled public String MobileAppAccess {get;set;} 
	@AuraEnabled public String HasCryptoCalculator {get;set;} 
	@AuraEnabled public String CryptoCalculatorNumber {get;set;} 
	@AuraEnabled public String VascoID {get;set;} 
	@AuraEnabled public String TieneVasco {get;set;} 
	@AuraEnabled public List<Corporates> corporates {get;set;} 

	public WRAPPER_USERINFO(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'userId') {
						userId = parser.getText();
					} else if (text == 'Name') {
						Name = parser.getText();
					} else if (text == 'Surname') {
						Surname = parser.getText();
					} else if (text == 'Type') {
						Type_Z = parser.getText();
					} else if (text == 'State') {
						State = parser.getText();
					} else if (text == 'Language') {
						Language = parser.getText();
					} else if (text == 'TimeZone') {
						TimeZone = parser.getText();
					} else if (text == 'NumberFormat') {
						NumberFormat = parser.getText();
					} else if (text == 'dateFormat') {
						dateFormat = parser.getText();
					} else if (text == 'Email') {
						Email = parser.getText();
					} else if (text == 'Phone') {
						Phone = parser.getText();
					} else if (text == 'Address') {
						Address = parser.getText();
					} else if (text == 'MobileAppAccess') {
						MobileAppAccess = parser.getText();
					} else if (text == 'HasCryptoCalculator') {
						HasCryptoCalculator = parser.getText();
					} else if (text == 'CryptoCalculatorNumber') {
						CryptoCalculatorNumber = parser.getText();
					} else if (text == 'VascoID') {
						VascoID = parser.getText();
					} else if (text == 'TieneVasco') {
						TieneVasco = parser.getText();
					} else if (text == 'corporates') {
						corporates = arrayOfCorporates(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_USERINFO consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	public class Corporates {
		@AuraEnabled public Integer codigoCorporate {get;set;} 
		@AuraEnabled public String nombreCorporate {get;set;} 
		@AuraEnabled public String numDocumento {get;set;} 

		public Corporates(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'codigoCorporate') {
							codigoCorporate = parser.getIntegerValue();
						} else if (text == 'nombreCorporate') {
							nombreCorporate = parser.getText();
						} else if (text == 'numDocumento') {
							numDocumento = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Corporates consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	
	public static WRAPPER_USERINFO parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_USERINFO(parser);
	}
	
	public static void consumeObject(System.JSONParser parser) {
		Integer depth = 0;
		do {
			System.JSONToken curr = parser.getCurrentToken();
			if (curr == System.JSONToken.START_OBJECT || 
				curr == System.JSONToken.START_ARRAY) {
				depth++;
			} else if (curr == System.JSONToken.END_OBJECT ||
				curr == System.JSONToken.END_ARRAY) {
				depth--;
			}
		} while (depth > 0 && parser.nextToken() != null);
	}
	


    private static List<Corporates> arrayOfCorporates(System.JSONParser p) {
        List<Corporates> res = new List<Corporates>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Corporates(p));
        }
        return res;
    }

}