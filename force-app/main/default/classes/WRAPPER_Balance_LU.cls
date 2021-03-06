//
// Generated by JSON2Apex http://json2apex.herokuapp.com/
//
// The supplied json has fields with names that are not valid in apex
// and so can only be parsed with explicitly generated code, this option
// was auto selected for you.

global class WRAPPER_Balance_LU {
    
    global WRAPPER_Balance_LU(){
        System.debug('WRAPPER_Balance_LU');
    }
    global class AccountHolderAddress {
        @AuraEnabled
		global String streetName {get;set;}
        @AuraEnabled
		global String townName {get;set;}
		@AuraEnabled
		global String country {get;set;}
		global AccountHolderAddress () {}  
        
         global AccountHolderAddress(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'streetName') {
                            streetName = parser.getText();
                        } else if (text == 'townName') {
                            townName = parser.getText();
                        } else if (text == 'country') {
                            country = parser.getText();
                        } else {
                            System.debug(LoggingLevel.WARN, 'AccountHolderAddress consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
	}
    
    
    global class AccountsDataList {
        global Object x_links {get;set;} // in json: _links
        global Object account {get;set;} 
        global List<AccountIdList> accountIdList {get;set;} 
        global String alias {get;set;} 
        global String aliasGts {get;set;} 
        global AvailableBalance availableBalance {get;set;} 
        global AccountHolderAddress accountHolderAddress {get; set;}
        global Boolean balanceAllowed {get;set;} 
        global String bankDescription {get;set;} 
        global String bankId {get;set;} 
        global String country {get;set;} 
        global String codEmisora {get;set;} 
        global String accountNexusId {get;set;} 
        
        global String customerName {get;set;} 
        global String description {get;set;} 
        global String displayNumber {get;set;} 
        global Flags flags {get;set;} 
        global String hasSwiftPayment {get;set;} 
        global String hasSwiftPayments {get;set;} 
        global Boolean internationalPaymentsAllowed {get;set;} 
        global String lastTransactionDate {get;set;} 
        global String lastUpdateSwiftPayment {get;set;} 
        global AvailableBalance mainBalance {get;set;} 
        global Object overdraftLimit {get;set;} 
        global Object overdraftUsed {get;set;} 
        global Boolean pain002Active {get;set;} 
        global String parentCustomerName {get;set;} 
        global Object pendingBalance {get;set;} 
        global String status {get;set;} 
        global String customerId {get;set;} 
        global Boolean transactionsAllowed {get;set;} 
        global String type_Z {get;set;} // in json: type
        global Object withholdingBalance {get;set;} 
        global String aliasCuentaPerfilado {get;set;} 
        global String aliasEntidad {get;set;}
        
        //AM - 28/09/2020 - Ebury Accounts
        global String dataProvider {get;set;}
        @AuraEnabled global List<AssociatedAccountList> associatedAccountList {get;set;}
        
        global AccountsDataList(){
            System.debug('WRAPPER_Balance_LU.AccountsDataList');
        }
        
        global AccountsDataList(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == '_links') {
                            x_links = parser.readValueAs(Object.class);
                        } else if (text == 'account') {
                            account = parser.readValueAs(Object.class);
                        } else if (text == 'accountIdList') {
                            accountIdList = arrayOfAccountIdList(parser);
                        } else if (text == 'alias') {
                            alias = parser.getText();
                        }else if (text == 'customerId') {
                            customerId = parser.getText();
                        } else if (text == 'aliasGts') {
                            aliasGts = parser.getText();
                        } else if (text == 'availableBalance') {
                            availableBalance = new AvailableBalance(parser);
                        } else if (text == 'balanceAllowed') {
                            balanceAllowed = parser.getBooleanValue();
                        } else if (text == 'bankDescription') {
                            bankDescription = parser.getText();
                        } else if (text == 'bankId') {
                            bankId = parser.getText();
                        } else if (text == 'country') {
                            country = parser.getText();
                        } else if (text == 'customerId') {
                            customerId = parser.getText();
                        } else if (text == 'codEmisora') {
                            codEmisora = parser.getText();
                        } else if (text == 'accountNexusId') {
                            accountNexusId = parser.getText();
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
                        } else if (text == 'accountHolderAddress') {
                            accountHolderAddress = new AccountHolderAddress(parser);
                        } else if (text == 'aliasCuentaPerfilado') {
							aliasCuentaPerfilado = parser.getText();
						} else if (text == 'aliasEntidad') {
                            aliasEntidad = parser.getText();
                            
                        //AM - 28/09/2020 - Ebury Accounts
						} else if (text == 'dataProvider') { 
							dataProvider = parser.getText();
						}else if (text == 'associatedAccountList') {
                            associatedAccountList = arrayOfAssociatedAccountList(parser);
                        }
                         else {
                            System.debug(LoggingLevel.WARN, 'AccountsDataList consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    global class AvailableBalance {
        global Double amount {get;set;} 
        global String currencyCode {get;set;} 
        global String lastUpdate {get;set;} 
        
        global AvailableBalance(){
            System.debug('WRAPPER_Balance_LU.AvailableBalance');
        }
        
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
    }
    
    global class AccountIdList {
        global String accountId {get;set;} 
        global String idType {get;set;}
        
        global AccountIdList(){
            System.debug('WRAPPER_Balance_LU.AccountIdList');
        }
        
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
    }

    //AM - 28/09/2020 - Ebury Accounts
    global class AssociatedAccountList {
        @AuraEnabled global String accountAddress {get;set;}
        @AuraEnabled global String accountName {get;set;}
        @AuraEnabled global AssociatedAccount account {get;set;}
        @AuraEnabled global String bankIdType {get;set;}
        @AuraEnabled global String bankId {get;set;}
        
        global AssociatedAccountList(){
            System.debug('WRAPPER_Balance_LU.AssociatedAccountList');
        }
        
        global AssociatedAccountList(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'accountAddress') {
                            accountAddress = parser.getText();
                        } else if (text == 'accountName') {
                            accountName = parser.getText();
                        } else if (text == 'account') {
                            account = new AssociatedAccount(parser);
                        } else if (text == 'bankIdType') {
                            bankIdType = parser.getText();
                        } else if (text == 'bankId') {
                            bankId = parser.getText();
                        } else {
                            System.debug(LoggingLevel.WARN, 'AssociatedAccountList consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }

    //AM - 28/09/2020 - Ebury Accounts
    global class AssociatedAccount {
        @AuraEnabled global String accountIdType {get;set;}
        @AuraEnabled global String accountId {get;set;}
        
        global AssociatedAccount(){
            System.debug('WRAPPER_Balance_LU.AssociatedAccount');
        }
        
        global AssociatedAccount(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'accountIdType') {
                            accountIdType = parser.getText();
                        } else if (text == 'accountId') {
                            accountId = parser.getText();
                        } else {
                            System.debug(LoggingLevel.WARN, 'AssociatedAccount consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }

    
    global class AccountsList {
        global Object x_links {get;set;} // in json: _links
        global List<AccountsDataList> accountsDataList {get;set;}
        
        global AccountsList(){
            System.debug('WRAPPER_Balance_LU.AccountList');
        }
        
        global AccountsList(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == '_links') {
                            x_links = parser.readValueAs(Object.class);
                        } else if (text == 'accountsDataList') {
                            accountsDataList = arrayOfAccountsDataList(parser);
                        } else {
                            System.debug(LoggingLevel.WARN, 'AccountsList consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    global AccountsList accountsList {get;set;} 
    
    global WRAPPER_Balance_LU(JSONParser parser) {
        while (parser.nextToken() != System.JSONToken.END_OBJECT) {
            if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                String text = parser.getText();
                if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                    if (text == 'accountsList') {
                        accountsList = new AccountsList(parser);
                    }else if (text == 'descripcionConversion') {
                        descripcionConversion = parser.getText();//SNJ
                    }else if(text == 'listaTipCambio'){                        
                        listaTipCambio = arrayOfListaTipCambio(parser);	
                    }/*else if(text == 'accountsDataList'){
                        accountsList = new AccountsList(parser);
                        accountsList.accountsDataList = arrayOfAccountsDataList(parser);
                    }*/else {
                        System.debug(LoggingLevel.WARN, 'WRAPPER_Balance_LU consuming unrecognized property: '+text);
                        consumeObject(parser);
                    }
                }
            }
        }
    }
    
    global class Flags {
        global Boolean pain002Active {get;set;} 
        global Boolean hasSwiftPayments {get;set;} 
        
        global Flags(){
            System.debug('WRAPPER_Balance_LU.Flags');
        }
        
        global Flags(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'pain002Active') {
                            pain002Active = parser.getBooleanValue();
                        } else if (text == 'hasSwiftPayments') {
                            hasSwiftPayments = parser.getBooleanValue();
                        } else {
                            System.debug(LoggingLevel.WARN, 'Flags consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    
    global static WRAPPER_Balance_LU parse(String json) {
        try{
            System.JSONParser parser = System.JSON.createParser(json);
            return new WRAPPER_Balance_LU(parser);
        }catch (Exception e) {
            System.debug('execute parse Balance LU: ' + e.getMessage());
            throw new customException(e.getMessage());
        }
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
    
    
    
    
    
    
    
    private static List<AccountIdList> arrayOfAccountIdList(System.JSONParser p) {
        List<AccountIdList> res = new List<AccountIdList>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new AccountIdList(p));
        }
        return res;
    }

    //AM - 28/09/2020 - Ebury Accounts
    private static List<AssociatedAccountList> arrayOfAssociatedAccountList(System.JSONParser p) {
        List<AssociatedAccountList> res = new List<AssociatedAccountList>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new AssociatedAccountList(p));
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
    
    
    //SNJ
    global String descripcionConversion {get;set;}
    global List<ListaTipCambio> listaTipCambio {get;set;} 
    
    
    //SNJ
    global class TipoDeCambio {
        global String claError {get;set;} 
        global String divisa {get;set;} 
        global String fecha {get;set;} 
        global Double importe {get;set;} 
        global Double importeDecimal {get;set;} 
        global String nombreDivisa {get;set;} 
        global String tipError {get;set;} 

        global TipoDeCambio(){}
        
        global TipoDeCambio(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'claError') {
                           // claError = parser.readValueAs(Object.class);
                           claError = parser.getText();
                        } else if (text == 'divisa') {
                            divisa = parser.getText();
                        } else if (text == 'fecha') {
                           // fecha = parser.readValueAs(Object.class);
                            fecha = parser.getText();
                        } else if (text == 'importe') {
                            importe = parser.getDoubleValue();
                        } else if (text == 'importeDecimal') {
                            importeDecimal = parser.getDoubleValue();
                        } else if (text == 'nombreDivisa') {
                            //nombreDivisa = parser.readValueAs(Object.class);
                            nombreDivisa = parser.getText();
                        } else if (text == 'tipError') {
                           // tipError = parser.readValueAs(Object.class);
                           tipError = parser.getText();
                        } else {
                            System.debug(LoggingLevel.WARN, 'TipoDeCambio consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    
    
    //SNJ
    global class ListaTipCambio {
        global TipoDeCambio tipoDeCambio {get;set;} 
        
        global ListaTipCambio(){}

        global ListaTipCambio(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'tipoDeCambio') {
                            tipoDeCambio = new TipoDeCambio(parser);
                        } else {
                            System.debug(LoggingLevel.WARN, 'ListaTipCambio consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
   //SNJ 
   private static List<ListaTipCambio> arrayOfListaTipCambio(System.JSONParser p) {
        List<ListaTipCambio> res = new List<ListaTipCambio>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new ListaTipCambio(p));
        }
        return res;
    } 
    
    
}