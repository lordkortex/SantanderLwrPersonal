public with sharing class WRAPPER_FX_TradeDeatil {
    @AuraEnabled public String baseDirection;
	@AuraEnabled public String confirmedBy;
	@AuraEnabled public ContraAmountStructure contraAmountStructure;
	@AuraEnabled public String counterparty;
	@AuraEnabled public String currencyPair;
	@AuraEnabled public String dateCreated;
	@AuraEnabled public ContraAmountStructure dealtAmountStructure;
	@AuraEnabled public DebitAccountStructure debitAccountStructure;
	@AuraEnabled public ContraAmountStructure farContraAmountStructure;
	@AuraEnabled public ContraAmountStructure farDealtAmountStructure;
	@AuraEnabled public String farLegPoints;
	@AuraEnabled public String product;
	@AuraEnabled public String shortLegPoints;
	@AuraEnabled public String spotRate;
	@AuraEnabled public String submittedBy;
	@AuraEnabled public DebitAccountStructure targetAccountStructure;
	@AuraEnabled public String tofStartDate;
	@AuraEnabled public String tradeId;
	@AuraEnabled public TradeStatusStructure tradeStatusStructure;

	public class DebitAccountStructure {
		@AuraEnabled public String targetAccount;
	}

	public class ContraAmountStructure {
		@AuraEnabled public String amount;
		@AuraEnabled public String side;
	}

	public class TradeStatusStructure {
		@AuraEnabled public String confirmationStatus;
		@AuraEnabled public String settlementStatus;
		@AuraEnabled public String tradeStatus;
	}

    public static List<WRAPPER_FX_TradeDeatil> parse(String json){
        return (List<WRAPPER_FX_TradeDeatil>) System.JSON.deserialize(json, List<WRAPPER_FX_TradeDeatil>.class);
    }
}