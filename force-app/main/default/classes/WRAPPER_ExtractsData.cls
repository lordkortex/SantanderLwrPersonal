/*------------------------------------------------------------
    Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Wrapper class of the Extract list
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020	    Pablo Tejedor       Initial version
    ------------------------------------------------------------*/ 
	
global with sharing class WRAPPER_ExtractsData {
    
    global WRAPPER_ExtractsData(){
        System.debug('WRAPPER_ExtractsData.Movements');
    }

	global class Movements {
	
        @AuraEnabled	global String accountNumber;
        @AuraEnabled	global String amount;
        @AuraEnabled	global String bookBalance;
        @AuraEnabled	global String bookDate;
        @AuraEnabled	global String category;
        @AuraEnabled	global String currencyExtract;
        @AuraEnabled	global String refCliente;
        @AuraEnabled	global String refBank;
        @AuraEnabled	global String valueDate;
        @AuraEnabled	global String description;
        
        global Movements(){
            System.debug('WRAPPER_ExtractsData.Movements');
        }
	}

	@AuraEnabled global String accountNumber;
	@AuraEnabled global String refCliente;
	@AuraEnabled global String initialBalance;
	@AuraEnabled global String finalBookBalance;
	@AuraEnabled global String currencyAux;
	@AuraEnabled global String debtAmount;
	@AuraEnabled global String creditAmount;
	@AuraEnabled global String debtNumber;
	@AuraEnabled global String creditNumber;
	@AuraEnabled global List<Movements> movements;

	
	global static WRAPPER_ExtractsData parse(String json) {
		return (WRAPPER_ExtractsData) System.JSON.deserialize(json, WRAPPER_ExtractsData.class);
	}
}