public class WRAPPER_FX_TradesData {


	@AuraEnabled public String tradeId{get;set;}
	@AuraEnabled public TradeStatusStructure tradeStatusStructure{get;set;}
	@AuraEnabled public String product{get;set;}
	@AuraEnabled public String dateCreated{get;set;}
	@AuraEnabled public String dateSettlement{get;set;}
	@AuraEnabled public String dateFarSettlement{get;set;}
	@AuraEnabled public DealtAmountStructure dealtAmountStructure{get;set;}
	@AuraEnabled public DealtAmountStructure contraAmountStructure{get;set;}
	@AuraEnabled public DealtAmountStructure farDealtAmountStructure{get;set;}
	@AuraEnabled public DealtAmountStructure farContraAmountStructure{get;set;}
	@AuraEnabled public TargetAccountStructure targetAccountStructure{get;set;}
	@AuraEnabled public DebitAccountStructure debitAccountStructure{get;set;}
	@AuraEnabled public String counterparty{get;set;}
	@AuraEnabled public String currencyPair{get;set;}
	@AuraEnabled public String tofStartDate{get;set;}
	@AuraEnabled public String baseDirection{get;set;}
	@AuraEnabled public String submittedBy{get;set;}
	@AuraEnabled public String confirmedBy{get;set;}
	@AuraEnabled public Double rate{get;set;}
	@AuraEnabled public Double spotRate{get;set;}
	@AuraEnabled public Double shortLegPoints{get;set;}
	@AuraEnabled public Double farLegPoints{get;set;}
	@AuraEnabled public String platform{get;set;}
	@AuraEnabled public Double farRate{get;set;}

	public class DebitAccountStructure {
		@AuraEnabled public String targetAccount{get;set;}
		@AuraEnabled public String currencyDebitAccount{get;set;}
	}

	public class TargetAccountStructure {
		@AuraEnabled public String targetAccount{get;set;}
		@AuraEnabled public String currencyTargetAccount{get;set;}
	}

	public class TradeStatusStructure {
		@AuraEnabled public String status{get;set;}
	}

	public class DealtAmountStructure {
		@AuraEnabled public Double amount{get;set;}
		@AuraEnabled public String currency1{get;set;}
		@AuraEnabled public String side{get;set;}
	}

	


    public static List<WRAPPER_FX_TradesData> parse(String json){
        return (List<WRAPPER_FX_TradesData>) System.JSON.deserialize(json, List<WRAPPER_FX_TradesData>.class);
    }

}