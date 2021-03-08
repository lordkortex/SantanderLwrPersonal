global with sharing class WRAPPER_B2B_AccountList {

    @AuraEnabled global List<AccountsDataList> accountsDataList {get;set;} 
	@AuraEnabled global Links x_links {get;set;} // in json: _links
    
            
    global WRAPPER_B2B_AccountList(){
        System.debug('WRAPPER_B2B_AccountList.WRAPPER_B2B_AccountList');
    }

	global WRAPPER_B2B_AccountList(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'accountsDataList') {
						accountsDataList = arrayOfAccountsDataList(parser);
					} else if (text == '_links') {
						x_links = new Links(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_B2B_AccountList consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	global class MainBalance {
		@AuraEnabled global Double amount {get;set;} 
		@AuraEnabled global String currencyCode {get;set;} 
		@AuraEnabled global String lastUpdate {get;set;} 
        
        global MainBalance(){
            System.debug('WRAPPER_B2B_AccountList.MainBalance');
        }

		global MainBalance(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'amount') {
							amount = parser.getDoubleValue();
						} else if (text == 'currencyCode') {
							currencyCode = parser.getText();
						} else if (text == 'lastUpdate') {
							lastUpdate = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'MainBalance consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	global class AccountsDataList {
		@AuraEnabled global String displayNumber {get;set;} 
		@AuraEnabled global String accountId {get;set;} 
		@AuraEnabled global String accountIdType {get;set;} 
		@AuraEnabled global String alias {get;set;} 
		@AuraEnabled global String mainItem {get;set;} 
		@AuraEnabled global String type_Z {get;set;} // in json: type
		@AuraEnabled global String description {get;set;} 
		@AuraEnabled global String status {get;set;} 
		@AuraEnabled global String customerId {get;set;} 
		@AuraEnabled global String costCenter {get;set;} 
		@AuraEnabled global MainBalance mainBalance {get;set;} 
		@AuraEnabled global MainBalance availableBalance {get;set;} 
		@AuraEnabled global MainBalance pendingBalance {get;set;} 
		@AuraEnabled global MainBalance withholdingBalance {get;set;} 
		@AuraEnabled global MainBalance overdraftLimit {get;set;} 
		@AuraEnabled global MainBalance overdraftUsed {get;set;} 
		@AuraEnabled global AccountsListLinks accountsListLinks {get;set;} 
        
        global AccountsDataList(){
            System.debug('WRAPPER_B2B_AccountList.AccountDataList');
        }

		global AccountsDataList(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'displayNumber') {
							displayNumber = parser.getText();
						} else if (text == 'accountId') {
							accountId = parser.getText();
						} else if (text == 'accountIdType') {
							accountIdType = parser.getText();
						} else if (text == 'alias') {
							alias = parser.getText();
						} else if (text == 'mainItem') {
							mainItem = parser.getText();
						} else if (text == 'type') {
							type_Z = parser.getText();
						} else if (text == 'description') {
							description = parser.getText();
						} else if (text == 'status') {
							status = parser.getText();
						} else if (text == 'customerId') {
							customerId = parser.getText();
						} else if (text == 'costCenter') {
							costCenter = parser.getText();
						} else if (text == 'mainBalance') {
							mainBalance = new MainBalance(parser);
						} else if (text == 'availableBalance') {
							availableBalance = new MainBalance(parser);
						} else if (text == 'pendingBalance') {
							pendingBalance = new MainBalance(parser);
						} else if (text == 'withholdingBalance') {
							withholdingBalance = new MainBalance(parser);
						} else if (text == 'overdraftLimit') {
							overdraftLimit = new MainBalance(parser);
						} else if (text == 'overdraftUsed') {
							overdraftUsed = new MainBalance(parser);
						} else if (text == 'accountsListLinks') {
							accountsListLinks = new AccountsListLinks(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'AccountsDataList consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	global class AccountsListLinks {
		@AuraEnabled global String accountDetailsLink {get;set;} 
		@AuraEnabled global String transactionsListLink {get;set;} 
        
        global AccountsListLinks(){
            System.debug('WRAPPER_B2B_AccountList.AccountsListLinks');
        }

		global AccountsListLinks(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'accountDetailsLink') {
							accountDetailsLink = parser.getText();
						} else if (text == 'transactionsListLink') {
							transactionsListLink = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'AccountsListLinks consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	global class Links {
		@AuraEnabled global String x_first {get;set;} // in json: _first
		@AuraEnabled global String x_prev {get;set;} // in json: _prev
		@AuraEnabled global String x_next {get;set;} // in json: _next
        
        global Links(){
            System.debug('WRAPPER_B2B_AccountList.Links');
        }

		global Links(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == '_first') {
							x_first = parser.getText();
						} else if (text == '_prev') {
							x_prev = parser.getText();
						} else if (text == '_next') {
							x_next = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Links consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	
	global static WRAPPER_B2B_AccountList parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_B2B_AccountList(parser);
	}
	
	global static void consumeObject(System.JSONParser parser) {
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
	






    private static List<AccountsDataList> arrayOfAccountsDataList(System.JSONParser p) {
        List<AccountsDataList> res = new List<AccountsDataList>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new AccountsDataList(p));
        }
        return res;
    }



}