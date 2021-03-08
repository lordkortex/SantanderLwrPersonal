/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the payments of a client
Test Class:     WRAPPER_PaymentsTracker_Test
History
<Date>			<Author>		    <Description>
13/07/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
global class WRAPPER_PaymentsTracker {
    global class Account {
		@AuraEnabled global String accountId {get;set;} 
		@AuraEnabled global String idType {get;set;} 

		global Account(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'accountId') {
							accountId = parser.getText();
						} else if (text == 'idType') {
							idType = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Account consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	global class OriginatorData {
		@AuraEnabled global String originatorName {get;set;} 
		@AuraEnabled global AccountIdList originatorAccount {get;set;} 

		global OriginatorData(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'originatorName') {
							originatorName = parser.getText();
						} else if (text == 'originatorAccount') {
							originatorAccount = new AccountIdList(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'OriginatorData consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	global class AccountsDataList {
		@AuraEnabled global Links_Z x_links {get;set;} // in json: _links
		@AuraEnabled global Account account {get;set;} 
		@AuraEnabled global List<AccountIdList> accountIdList {get;set;} 
		@AuraEnabled global String alias {get;set;} 
		@AuraEnabled global AvailableBalance availableBalance {get;set;} 
		@AuraEnabled global Boolean balanceAllowed {get;set;} 
		@AuraEnabled global String bankDescription {get;set;} 
		@AuraEnabled global String bankId {get;set;} 
		@AuraEnabled global AvailableBalance closedAvailableBalance {get;set;} 
		@AuraEnabled global AvailableBalance closedBalance {get;set;} 
		@AuraEnabled global String country {get;set;} 
		@AuraEnabled global String customerId {get;set;} 
		@AuraEnabled global String customerName {get;set;} 
		@AuraEnabled global String description {get;set;} 
		@AuraEnabled global String displayNumber {get;set;} 
		@AuraEnabled global Flags flags {get;set;} 
		@AuraEnabled global String hasSwiftPayment {get;set;} 
		@AuraEnabled global String hasSwiftPayments {get;set;} 
		@AuraEnabled global Boolean internationalPaymentsAllowed {get;set;} 
		@AuraEnabled global String lastTransactionDate {get;set;} 
		@AuraEnabled global String lastUpdateSwiftPayment {get;set;} 
		@AuraEnabled global AvailableBalance mainBalance {get;set;} 
		@AuraEnabled global AvailableBalance overdraftLimit {get;set;} 
		@AuraEnabled global AvailableBalance overdraftUsed {get;set;} 
		@AuraEnabled global Boolean pain002Active {get;set;} 
		@AuraEnabled global String parentCustomerName {get;set;} 
		@AuraEnabled global AvailableBalance pendingBalance {get;set;} 
		@AuraEnabled global String status {get;set;} 
		@AuraEnabled global Boolean transactionsAllowed {get;set;} 
		@AuraEnabled global String type_Z {get;set;} // in json: type
		@AuraEnabled global AvailableBalance withholdingBalance {get;set;} 
		@AuraEnabled global Boolean canUserSeeGP {get;set;} 
        @AuraEnabled global Boolean canUserSeePaymentsTracker {get;set;} 
																		 
		
		global AccountsDataList(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == '_links') {
							x_links = new Links_Z(parser);
						} else if (text == 'account') {
							account = new Account(parser);
						} else if (text == 'accountIdList') {
							accountIdList = arrayOfAccountIdList(parser);
						} else if (text == 'alias') {
							alias = parser.getText();
						} else if (text == 'availableBalance') {
							availableBalance = new AvailableBalance(parser);
						} else if (text == 'balanceAllowed') {
							balanceAllowed = parser.getBooleanValue();
						} else if (text == 'bankDescription') {
							bankDescription = parser.getText();
						} else if (text == 'bankId') {
							bankId = parser.getText();
						} else if (text == 'closedAvailableBalance') {
							closedAvailableBalance = new AvailableBalance(parser);
						} else if (text == 'closedBalance') {
							closedBalance = new AvailableBalance(parser);
						} else if (text == 'country') {
							country = parser.getText();
						} else if (text == 'customerId') {
							customerId = parser.getText();
						} else if (text == 'customerName') {
							customerName = parser.getText();
						} else if (text == 'description') {
							description = parser.getText();
						} else if (text == 'displayNumber') {
							displayNumber = parser.getText();
						} else if (text == 'flags') {
							flags = new Flags(parser);
						} else if (text == 'hasSwiftPayment') {
							hasSwiftPayment = parser.getText();
						} else if (text == 'hasSwiftPayments') {
							hasSwiftPayments = parser.getText();
						} else if (text == 'internationalPaymentsAllowed') {
							internationalPaymentsAllowed = parser.getBooleanValue();
						} else if (text == 'lastTransactionDate') {
							lastTransactionDate = parser.getText();
						} else if (text == 'lastUpdateSwiftPayment') {
							lastUpdateSwiftPayment = parser.getText();
						} else if (text == 'mainBalance') {
							mainBalance = new AvailableBalance(parser);
						} else if (text == 'overdraftLimit') {
							overdraftLimit = new AvailableBalance(parser);
						} else if (text == 'overdraftUsed') {
							overdraftUsed = new AvailableBalance(parser);
						} else if (text == 'pain002Active') {
							pain002Active = parser.getBooleanValue();
						} else if (text == 'parentCustomerName') {
							parentCustomerName = parser.getText();
						} else if (text == 'pendingBalance') {
							pendingBalance = new AvailableBalance(parser);
						} else if (text == 'status') {
							status = parser.getText();
						} else if (text == 'transactionsAllowed') {
							transactionsAllowed = parser.getBooleanValue();
						} else if (text == 'type') {
							type_Z = parser.getText();
						} else if (text == 'withholdingBalance') {
							withholdingBalance = new AvailableBalance(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'AccountsDataList consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
    }   
    
    global class CreditorAgent {
		@AuraEnabled global String agentCode {get;set;} 
		@AuraEnabled global String agentName {get;set;} 
		@AuraEnabled global String agentCountry {get;set;} 
		@AuraEnabled global String agentLocation {get;set;} 

		global CreditorAgent(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'agentCode') {
							agentCode = parser.getText();
						} else if (text == 'agentName') {
							agentName = parser.getText();
						} else if (text == 'agentCountry') {
							agentCountry = parser.getText();
						} else if (text == 'agentLocation') {
							agentLocation = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'CreditorAgent consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	global class TransactionStatus {
		@AuraEnabled global String status {get;set;} 
		@AuraEnabled global String reason {get;set;} 

		global TransactionStatus(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'status') {
							status = parser.getText();
						} else if (text == 'reason') {
							reason = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'TransactionStatus consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

		global TransactionStatus() {}
	}
	
	global class OriginatorAgent {
		@AuraEnabled global String agentCode {get;set;} 
		@AuraEnabled global String agentName {get;set;} 
		@AuraEnabled global String agentCountry {get;set;} 
		@AuraEnabled global String agentLocation {get;set;} 

		global OriginatorAgent(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'agentCode') {
							agentCode = parser.getText();
						} else if (text == 'agentName') {
							agentName = parser.getText();
						} else if (text == 'agentCountry') {
							agentCountry = parser.getText();
						} else if (text == 'agentLocation') {
							agentLocation = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'OriginatorAgent consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
		global OriginatorAgent() {}
	}
	
	global class Flags {
		@AuraEnabled global Boolean additionalProp1 {get;set;} 
		@AuraEnabled global Boolean additionalProp2 {get;set;} 
		@AuraEnabled global Boolean additionalProp3 {get;set;} 

		global Flags(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'additionalProp1') {
							additionalProp1 = parser.getBooleanValue();
						} else if (text == 'additionalProp2') {
							additionalProp2 = parser.getBooleanValue();
						} else if (text == 'additionalProp3') {
							additionalProp3 = parser.getBooleanValue();
						} else {
							System.debug(LoggingLevel.WARN, 'Flags consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
		global Flags() {}
	}
	
	global class PaymentAmount {
		@AuraEnabled global Double amount {get;set;} 
        @AuraEnabled global String currency_X {get;set;} 
        @AuraEnabled global String paymentAmount_FormattedWholeNumber {get;set;} 
        @AuraEnabled global String paymentAmount_FormattedDecimalPart {get;set;} 
        @AuraEnabled global String paymentAmount_FormattedEntirePart {get;set;} 

		global PaymentAmount(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'amount') {
							amount = parser.getDoubleValue();
						} else if (text == 'currency') {
							currency_X = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'PaymentAmount consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

		global PaymentAmount() {}
	}
	
	global class Links_Z {
		@AuraEnabled global String accountDetailsLink {get;set;} 
		@AuraEnabled global String transactionsListLink {get;set;} 

		global Links_Z(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'accountDetailsLink') {
							accountDetailsLink = parser.getText();
						} else if (text == 'transactionsListLink') {
							transactionsListLink = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Links_Z consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
		global Links_Z() {}
	}
	
	@AuraEnabled global Links x_links {get;set;} // in json: _links
	@AuraEnabled global List<AccountsDataList> accountsDataList {get;set;} 
	@AuraEnabled global List<PaymentsList> paymentsList {get;set;} 

	global WRAPPER_PaymentsTracker(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == '_links') {
						x_links = new Links(parser);
					} else if (text == 'accountsDataList') {
						accountsDataList = arrayOfAccountsDataList(parser);
					} else if (text == 'paymentsList') {
						paymentsList = arrayOfPaymentsList(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'WRAPPER_PaymentsTracker consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	global class AvailableBalance {
		@AuraEnabled global Double amount {get;set;} 
		@AuraEnabled global String currencyCode {get;set;} 
		@AuraEnabled global String lastUpdate {get;set;} 

		global AvailableBalance(JSONParser parser) {
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
							System.debug(LoggingLevel.WARN, 'AvailableBalance consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

		global AvailableBalance() {}
	}
    
    global class AccountIdList {
		@AuraEnabled global String accountId {get;set;} 
		@AuraEnabled global String idType {get;set;} 

		global AccountIdList(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'accountId') {
							accountId = parser.getText();
						} else if (text == 'idType') {
							idType = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'AccountIdList consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

		global AccountIdList() {}
	}
	global class Links_Y {
		@AuraEnabled global String paymentTrackerDetailsLink {get;set;} 
		@AuraEnabled global String x_first {get;set;} // in json: _first
		@AuraEnabled global String x_prev {get;set;} // in json: _prev
		@AuraEnabled global String x_next {get;set;} // in json: _next

		global Links_Y(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'paymentTrackerDetailsLink') {
							paymentTrackerDetailsLink = parser.getText();
						} else if (text == '_first') {
							x_first = parser.getText();
						} else if (text == '_prev') {
							x_prev = parser.getText();
						} else if (text == '_next') {
							x_next = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Links_Y consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
		global Links_Y() {}
    }
    
    global class PaymentDetail {
		@AuraEnabled global String paymentId {get;set;} 
		@AuraEnabled global OriginatorAgent originatorAgent {get;set;} 
		@AuraEnabled global TransactionStatus transactionStatus {get;set;} 
		@AuraEnabled global String statusDate {get;set;} 
		@AuraEnabled global CancellationStatus cancellationStatus {get;set;} 
		@AuraEnabled global String issueDate {get;set;} 
		@AuraEnabled global String valueDate {get;set;} 
		@AuraEnabled global PaymentAmount paymentAmount {get;set;} 
		@AuraEnabled global BeneficiaryData beneficiaryData {get;set;} 
		@AuraEnabled global OriginatorData originatorData {get;set;} 
		@AuraEnabled global Links_Y x_links {get;set;} // in json: _links

		global PaymentDetail(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'paymentId') {
							paymentId = parser.getText();
						} else if (text == 'originatorAgent') {
							originatorAgent = new OriginatorAgent(parser);
						} else if (text == 'transactionStatus') {
							transactionStatus = new TransactionStatus(parser);
						} else if (text == 'statusDate') {
							statusDate = parser.getText();
						} else if (text == 'cancellationStatus') {
							cancellationStatus = new CancellationStatus(parser);
						} else if (text == 'issueDate') {
							issueDate = parser.getText();
						} else if (text == 'valueDate') {
							valueDate = parser.getText();
						} else if (text == 'paymentAmount') {
							paymentAmount = new PaymentAmount(parser);
						} else if (text == 'beneficiaryData') {
							beneficiaryData = new BeneficiaryData(parser);
						} else if (text == 'originatorData') {
							originatorData = new OriginatorData(parser);
						} else if (text == '_links') {
							x_links = new Links_Y(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'PaymentDetail consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
		global PaymentDetail() {}
	}
	
	global class Links {
		@AuraEnabled global String x_first {get;set;} // in json: _first
		@AuraEnabled global String x_last {get;set;} // in json: _last
		@AuraEnabled global String x_next {get;set;} // in json: _next
		@AuraEnabled global String x_prev {get;set;} // in json: _prev
		@AuraEnabled global String accountDetailsLink {get;set;} 
		@AuraEnabled global String transactionsListLink {get;set;} 

		global Links(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == '_first') {
							x_first = parser.getText();
						} else if (text == '_last') {
							x_last = parser.getText();
						} else if (text == '_next') {
							x_next = parser.getText();
						} else if (text == '_prev') {
							x_prev = parser.getText();
						} else if (text == 'accountDetailsLink') {
							accountDetailsLink = parser.getText();
						} else if (text == 'transactionsListLink') {
							transactionsListLink = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Links consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

		global Links() {}
	}
	
	global class CancellationStatus {
		@AuraEnabled global String transactionCancellationStatus {get;set;} 

		global CancellationStatus(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'transactionCancellationStatus') {
							transactionCancellationStatus = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'CancellationStatus consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

		global CancellationStatus() {}
	}
	
	global class BeneficiaryData {
		@AuraEnabled global String beneficiaryName {get;set;} 
		@AuraEnabled global AccountIdList creditorCreditAccount {get;set;} 
		@AuraEnabled global CreditorAgent creditorAgent {get;set;} 

		global BeneficiaryData(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'beneficiaryName') {
							beneficiaryName = parser.getText();
						} else if (text == 'creditorCreditAccount') {
							creditorCreditAccount = new AccountIdList(parser);
						} else if (text == 'creditorAgent') {
							creditorAgent = new CreditorAgent(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'BeneficiaryData consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
		global BeneficiaryData() {}
	}
	
	global class PaymentsList {
		@AuraEnabled global PaymentDetail paymentDetail {get;set;} 

		global PaymentsList(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'paymentDetail') {
							paymentDetail = new PaymentDetail(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'PaymentsList consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}

		global PaymentsList() {}
	}
	
	
	global static WRAPPER_PaymentsTracker parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_PaymentsTracker(parser);
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
      
    private static List<PaymentsList> arrayOfPaymentsList(System.JSONParser p) {
        List<PaymentsList> res = new List<PaymentsList>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new PaymentsList(p));
        }
        return res;
    }

    private static List<AccountIdList> arrayOfAccountIdList(System.JSONParser p) {
        List<AccountIdList> res = new List<AccountIdList>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new AccountIdList(p));
        }
        return res;
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