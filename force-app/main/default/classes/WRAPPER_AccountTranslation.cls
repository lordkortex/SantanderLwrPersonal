/*----------------------------------------------------------------------------------
Author:         A. Duarte Rausell
Company:        Deloitte
Description:    WRAPPER class for the Account Translator
Test Class:     WRAPPER_AccountTranslation_Test
History
<Date>          <Author>        		<Description>
22/06/2020      A. Duarte Rausell     	Initial version
----------------------------------------------------------------------------------*/
public class WRAPPER_AccountTranslation {

	@AuraEnabled public List<Accounts> accounts {get;set;} 

	public WRAPPER_AccountTranslation(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'accounts') {
						accounts = arrayOfAccounts(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_AccountTranslation consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	public class ListIds {
		@AuraEnabled public String idType {get;set;} 
		@AuraEnabled public String accountId {get;set;} 

		public ListIds(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'idType') {
							idType = parser.getText();
						} else if (text == 'accountId') {
							accountId = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'ListIds consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	public class Accounts {
		@AuraEnabled public String bankId {get;set;} 
		@AuraEnabled public String accountId {get;set;} 
		@AuraEnabled public String accountCurrency {get;set;} 
		@AuraEnabled public List<ListIds> listIds {get;set;} 

		public Accounts(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'bankId') {
							bankId = parser.getText();
						} else if (text == 'accountId') {
							accountId = parser.getText();
						} else if (text == 'currency') {
							accountCurrency = parser.getText();
						} else if (text == 'listIds') {
							listIds = arrayOfListIds(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Accounts consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	
	public static WRAPPER_AccountTranslation parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_AccountTranslation(parser);
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
	
    private static List<Accounts> arrayOfAccounts(System.JSONParser p) {
        List<Accounts> res = new List<Accounts>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Accounts(p));
        }
        return res;
    }






    private static List<ListIds> arrayOfListIds(System.JSONParser p) {
        List<ListIds> res = new List<ListIds>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListIds(p));
        }
        return res;
    }


}