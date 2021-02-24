global class WRAPPER_OneTrade_AccTransactions {
    @AuraEnabled global Decimal openingBalance; 
	@AuraEnabled global Decimal closeringBalance; 
	@AuraEnabled global Integer numberDebits ;
	@AuraEnabled global Integer numberCredits ;
	@AuraEnabled global Decimal totalDebits ;
	@AuraEnabled global Decimal totalCredits ;
	@AuraEnabled global Integer totalRegistros ;

	
	@AuraEnabled global String openingBalance_Formatted ;
	@AuraEnabled global String openingBalanceDecimals_Formatted;
	
	@AuraEnabled global String closeringBalance_Formatted ;
	@AuraEnabled global String closeringBalanceDecimals_Formatted ;

	@AuraEnabled global String totalDebits_Formatted ;
	@AuraEnabled global String totalCredits_Formatted ;

	
    
	@AuraEnabled global Balances balances;

	global class Balances {
		@AuraEnabled global Transactions transactions;
	}

	global class Transactions {
		@AuraEnabled global Integer totalRegistros;
		@AuraEnabled global List<ListaObtTransacciones> listaObtTransacciones;
	}
	
	global class ListaObtTransacciones {
		@AuraEnabled global ObtTransacBusqueda obtTransacBusqueda;
	}

	global class ObtTransacBusqueda {
        @AuraEnabled global Double importe;
        @AuraEnabled global String importeString;
		@AuraEnabled global String importeEntero;
		@AuraEnabled global String importeDecimal;
		@AuraEnabled global String tipoTransaccion;
		@AuraEnabled global String refCliente;
		@AuraEnabled global String refBanco;
		@AuraEnabled global String descripcion;
		@AuraEnabled global String ltcCode;
		@AuraEnabled global String ltcDescription;
		@AuraEnabled global String transactionBatchReference;
		@AuraEnabled global String valueDate;
        @AuraEnabled global String bookDate;
        @AuraEnabled global String formattedValueDate;
        @AuraEnabled global String formattedBookDate;
		@AuraEnabled global String moneda;

		//AM - 28/09/2020 - Ebury Accounts
		@AuraEnabled global String	transactionType;
		@AuraEnabled global String	customerAdditionalInformation;
		@AuraEnabled global Double	balanceResultAmount;
		@AuraEnabled global CreditorAccountsDetails creditorAccountsDetails;
		@AuraEnabled global DebtorAccountDetails 	debtorAccountDetails;
		
	}

	//AM - 28/09/2020 - Ebury Accounts
	global class CreditorAccountsDetails {
		@AuraEnabled global String name;
		@AuraEnabled global String accountName;
		@AuraEnabled global String accountNumber;
		@AuraEnabled global String bankId;
		@AuraEnabled global String bankCode;
		@AuraEnabled global String iban;
		@AuraEnabled global String swift;
	}

	//AM - 28/09/2020 - Ebury Accounts
	global class DebtorAccountDetails {
		@AuraEnabled global String name;
		@AuraEnabled global String accountName;
		@AuraEnabled global String accountNumber;
		@AuraEnabled global String bankId;
		@AuraEnabled global String bankCode;
		@AuraEnabled global String iban;
		@AuraEnabled global String swift;
	}

	
	global static WRAPPER_OneTrade_AccTransactions parse(String json) {
		return (WRAPPER_OneTrade_AccTransactions) System.JSON.deserialize(json, WRAPPER_OneTrade_AccTransactions.class);
	}
}