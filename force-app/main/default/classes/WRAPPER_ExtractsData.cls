/*------------------------------------------------------------
    Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Wrapper class of the Extract list
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020	    Pablo Tejedor       Initial version
    ------------------------------------------------------------*/ 
	
public with sharing class WRAPPER_ExtractsData {

	public class Movements {
	
	@AuraEnabled	public String accountNumber;
	@AuraEnabled	public String amount;
	@AuraEnabled	public String bookBalance;
	@AuraEnabled	public String bookDate;
	@AuraEnabled	public String category;
	@AuraEnabled	public String currencyExtract;
	@AuraEnabled	public String refCliente;
	@AuraEnabled	public String refBank;
	@AuraEnabled	public String valueDate;
	@AuraEnabled	public String description;
	}

	@AuraEnabled public String accountNumber;
	@AuraEnabled public String refCliente;
	@AuraEnabled public String initialBalance;
	@AuraEnabled public String finalBookBalance;
	@AuraEnabled public String currencyAux;
	@AuraEnabled public String debtAmount;
	@AuraEnabled public String creditAmount;
	@AuraEnabled public String debtNumber;
	@AuraEnabled public String creditNumber;
	@AuraEnabled public List<Movements> movements;

	
	public static WRAPPER_ExtractsData parse(String json) {
		return (WRAPPER_ExtractsData) System.JSON.deserialize(json, WRAPPER_ExtractsData.class);
	}
}