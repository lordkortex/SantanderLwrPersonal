/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the payments of a client
Test Class:     WRAPPER_PaymentsTracker_Test
History
<Date>			<Author>		    <Description>
13/07/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public class WRAPPER_PaymentsTracker {
    public class Account {
		@AuraEnabled public String accountId {get;set;} 
		@AuraEnabled public String idType {get;set;} 

		public Account(JSONParser parser) {
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
	
	public class OriginatorData {
		@AuraEnabled public String originatorName {get;set;} 
		@AuraEnabled public AccountIdList originatorAccount {get;set;} 

		public OriginatorData(JSONParser parser) {
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
	
	public class AccountsDataList {
		@AuraEnabled public Links_Z x_links {get;set;} // in json: _links
		@AuraEnabled public Account account {get;set;} 
		@AuraEnabled public List<AccountIdList> accountIdList {get;set;} 
		@AuraEnabled public String alias {get;set;} 
		@AuraEnabled public AvailableBalance availableBalance {get;set;} 
		@AuraEnabled public Boolean balanceAllowed {get;set;} 
		@AuraEnabled public String bankDescription {get;set;} 
		@AuraEnabled public String bankId {get;set;} 
		@AuraEnabled public AvailableBalance closedAvailableBalance {get;set;} 
		@AuraEnabled public AvailableBalance closedBalance {get;set;} 
		@AuraEnabled public String country {get;set;} 
		@AuraEnabled public String customerId {get;set;} 
		@AuraEnabled public String customerName {get;set;} 
		@AuraEnabled public String description {get;set;} 
		@AuraEnabled public String displayNumber {get;set;} 
		@AuraEnabled public Flags flags {get;set;} 
		@AuraEnabled public String hasSwiftPayment {get;set;} 
		@AuraEnabled public String hasSwiftPayments {get;set;} 
		@AuraEnabled public Boolean internationalPaymentsAllowed {get;set;} 
		@AuraEnabled public String lastTransactionDate {get;set;} 
		@AuraEnabled public String lastUpdateSwiftPayment {get;set;} 
		@AuraEnabled public AvailableBalance mainBalance {get;set;} 
		@AuraEnabled public AvailableBalance overdraftLimit {get;set;} 
		@AuraEnabled public AvailableBalance overdraftUsed {get;set;} 
		@AuraEnabled public Boolean pain002Active {get;set;} 
		@AuraEnabled public String parentCustomerName {get;set;} 
		@AuraEnabled public AvailableBalance pendingBalance {get;set;} 
		@AuraEnabled public String status {get;set;} 
		@AuraEnabled public Boolean transactionsAllowed {get;set;} 
		@AuraEnabled public String type_Z {get;set;} // in json: type
		@AuraEnabled public AvailableBalance withholdingBalance {get;set;} 
        @AuraEnabled public Boolean canUserSeeGP {get;set;} 
        @AuraEnabled public Boolean canUserSeePaymentsTracker {get;set;} 
        
		public AccountsDataList(JSONParser parser) {
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
    
    public class CreditorAgent {
		@AuraEnabled public String agentCode {get;set;} 
		@AuraEnabled public String agentName {get;set;} 
		@AuraEnabled public String agentCountry {get;set;} 
		@AuraEnabled public String agentLocation {get;set;} 

		public CreditorAgent(JSONParser parser) {
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
	
	public class TransactionStatus {
		@AuraEnabled public String status {get;set;} 
		@AuraEnabled public String reason {get;set;} 

		public TransactionStatus(JSONParser parser) {
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
	}
	
	public class OriginatorAgent {
		@AuraEnabled public String agentCode {get;set;} 
		@AuraEnabled public String agentName {get;set;} 
		@AuraEnabled public String agentCountry {get;set;} 
		@AuraEnabled public String agentLocation {get;set;} 

		public OriginatorAgent(JSONParser parser) {
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
	}
	
	public class Flags {
		@AuraEnabled public Boolean additionalProp1 {get;set;} 
		@AuraEnabled public Boolean additionalProp2 {get;set;} 
		@AuraEnabled public Boolean additionalProp3 {get;set;} 

		public Flags(JSONParser parser) {
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
	}
	
	public class PaymentAmount {
		@AuraEnabled public Double amount {get;set;} 
        @AuraEnabled public String currency_X {get;set;} 
        @AuraEnabled public String paymentAmount_FormattedWholeNumber {get;set;} 
        @AuraEnabled public String paymentAmount_FormattedDecimalPart {get;set;} 
        @AuraEnabled public String paymentAmount_FormattedEntirePart {get;set;} 

		public PaymentAmount(JSONParser parser) {
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
	}
	
	public class Links_Z {
		@AuraEnabled public String accountDetailsLink {get;set;} 
		@AuraEnabled public String transactionsListLink {get;set;} 

		public Links_Z(JSONParser parser) {
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
	}
	
	@AuraEnabled public Links x_links {get;set;} // in json: _links
	@AuraEnabled public List<AccountsDataList> accountsDataList {get;set;} 
	@AuraEnabled public List<PaymentsList> paymentsList {get;set;} 

	public WRAPPER_PaymentsTracker(JSONParser parser) {
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
	
	public class AvailableBalance {
		@AuraEnabled public Double amount {get;set;} 
		@AuraEnabled public String currencyCode {get;set;} 
		@AuraEnabled public String lastUpdate {get;set;} 

		public AvailableBalance(JSONParser parser) {
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
	}
    
    public class AccountIdList {
		@AuraEnabled public String accountId {get;set;} 
		@AuraEnabled public String idType {get;set;} 

		public AccountIdList(JSONParser parser) {
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
	}
	public class Links_Y {
		@AuraEnabled public String paymentTrackerDetailsLink {get;set;} 
		@AuraEnabled public String x_first {get;set;} // in json: _first
		@AuraEnabled public String x_prev {get;set;} // in json: _prev
		@AuraEnabled public String x_next {get;set;} // in json: _next

		public Links_Y(JSONParser parser) {
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
    }
    
    public class PaymentDetail {
		@AuraEnabled public String paymentId {get;set;} 
		@AuraEnabled public OriginatorAgent originatorAgent {get;set;} 
		@AuraEnabled public TransactionStatus transactionStatus {get;set;} 
		@AuraEnabled public String statusDate {get;set;} 
		@AuraEnabled public CancellationStatus cancellationStatus {get;set;} 
		@AuraEnabled public String issueDate {get;set;} 
		@AuraEnabled public String valueDate {get;set;} 
		@AuraEnabled public PaymentAmount paymentAmount {get;set;} 
		@AuraEnabled public BeneficiaryData beneficiaryData {get;set;} 
		@AuraEnabled public OriginatorData originatorData {get;set;} 
		@AuraEnabled public Links_Y x_links {get;set;} // in json: _links

		public PaymentDetail(JSONParser parser) {
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
	}
	
	public class Links {
		@AuraEnabled public String x_first {get;set;} // in json: _first
		@AuraEnabled public String x_last {get;set;} // in json: _last
		@AuraEnabled public String x_next {get;set;} // in json: _next
		@AuraEnabled public String x_prev {get;set;} // in json: _prev
		@AuraEnabled public String accountDetailsLink {get;set;} 
		@AuraEnabled public String transactionsListLink {get;set;} 

		public Links(JSONParser parser) {
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
	}
	
	public class CancellationStatus {
		@AuraEnabled public String transactionCancellationStatus {get;set;} 

		public CancellationStatus(JSONParser parser) {
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
	}
	
	public class BeneficiaryData {
		@AuraEnabled public String beneficiaryName {get;set;} 
		@AuraEnabled public AccountIdList creditorCreditAccount {get;set;} 
		@AuraEnabled public CreditorAgent creditorAgent {get;set;} 

		public BeneficiaryData(JSONParser parser) {
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
	}
	
	public class PaymentsList {
		@AuraEnabled public PaymentDetail paymentDetail {get;set;} 

		public PaymentsList(JSONParser parser) {
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
	}
	
	
	public static WRAPPER_PaymentsTracker parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new WRAPPER_PaymentsTracker(parser);
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