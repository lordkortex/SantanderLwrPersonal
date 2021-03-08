/*----------------------------------------------------------------------------------
Author:         Javier Fernandez
Company:        Deloitte
Description:    Wrapper of account
Test Class:     Wrapper_AccountList_Test
History
<Date>			<Author>			<Description>
05/11/2019		Javier Fernandez    Initial version
----------------------------------------------------------------------------------*/
global with sharing class WRAPPER_AccountList {
    
    global WRAPPER_AccountList(){
        //System.debug('WRAPPER_AccountList');
    }
    
    global class Address {
        @AuraEnabled
		global String streetName {get;set;}
        @AuraEnabled 
		global String townName {get;set;}
		@AuraEnabled
		global String country {get;set;}
		global Address () {}  
	}
    

     
    global with sharing class LastestTransaction {
        @AuraEnabled
        global String	transactionId	{get;set;}
        @AuraEnabled
        global String	creationDate	{get;set;}
        @AuraEnabled
        global String	processedDate	{get;set;}
        @AuraEnabled
        global String	accountingDate	{get;set;} 
        @AuraEnabled
        global String	description	{get;set;}
        @AuraEnabled
        global String	transactionType	{get;set;}
        @AuraEnabled
        global String	transactionCategory	{get;set;}
        @AuraEnabled
        global Decimal	amount	{get;set;}
        @AuraEnabled
        global String	currencyCode	{get;set;}
        
        global LastestTransaction () {
            //System.debug('Wrapper_AccountList.LastestTransaction');
        }
    }
    global with sharing class AccountDetails {
        @AuraEnabled
        global String	accountId	{get;set;}
        @AuraEnabled
        global Boolean	mandatoryPurpose	{get;set;}
        @AuraEnabled
        global String	displayNumber	{get;set;}
        @AuraEnabled
        global String	parentCustomerName	{get;set;}
        @AuraEnabled
        global String	alias	{get;set;}
        @AuraEnabled
        global String	type	{get;set;}
        @AuraEnabled
        global String	description	{get;set;}
        @AuraEnabled
        global String	status	{get;set;}
        @AuraEnabled
        global String	customerId	{get;set;}
        @AuraEnabled
        global String	country	{get;set;}
        @AuraEnabled
        global Boolean	favorite	{get;set;}
        @AuraEnabled
        global Address	address	{get;set;}
        @AuraEnabled
        global String	lastTransaction	{ get;set;}
        @AuraEnabled
        global Decimal	amountMainBalance	{get;set;}
        @AuraEnabled
        global CNT_FormattedNumber amountMainBalance_Formatted;
        @AuraEnabled
        global String	currencyCodeMainBalance	{get;set;}
        @AuraEnabled
        global String	lastupdateMainBalance	{get;set;}
        @AuraEnabled
        global Decimal	amountAvailableBalance	{get;set;}
        @AuraEnabled
        global CNT_FormattedNumber amountAvailableBalance_Formatted;
        @AuraEnabled
        global String	currencyCodeAvailableBalance	{get;set;}
        @AuraEnabled
        global String	lastUpdateAvailableBalance	{get;set;}
        @AuraEnabled
        global String	lastUpdateAvailableBalanceMain	{get;set;}
        @AuraEnabled
        global Decimal	amountWithholdingBalance	{get;set;}
        @AuraEnabled
        global String	currencyCodeWithholdingBalance	{get;set;}
        @AuraEnabled
        global String	lastudpateWithholdingBalance	{get;set;}
        @AuraEnabled
        global Decimal	amountOverdraftLimit	{get;set;}
        @AuraEnabled
        global String	currencycodeOverdraftLimit	{get;set;}
        @AuraEnabled
        global String	lastUpdateOverdraftLimit	{get;set;}
        @AuraEnabled
        global String	bic	{get;set;}
        @AuraEnabled
        global String	bankName	{get;set;}
        @AuraEnabled
        global String valueDate {get;set;}
        @AuraEnabled
        global String aliasEntidad {get;set;}
        @AuraEnabled
        global String subsidiaryName {get;set;}
        @AuraEnabled
        global String countryName {get;set;}
        @AuraEnabled
        global String branch {get;set;}
        @AuraEnabled
        global String locatorbic {get;set;}
        @AuraEnabled
        global String paisbic {get;set;}
        @AuraEnabled
        global String codigoCorporate {get;set;}
        @AuraEnabled
        global String codigoCuenta {get;set;}
        @AuraEnabled
       	global List<LastestTransaction> transactionList	{get;set;}
        @AuraEnabled
        global String hasSwiftPayment	{get;set;}
        @AuraEnabled
        global String hasSwiftPayments {get;set;} 
        @AuraEnabled
       	global Boolean internationalPaymentsAllowed	{get;set;}
        @AuraEnabled
       	global String idType	{get;set;}        
        @AuraEnabled
        global String codigoEmisora {get;set;} //SNJ - 15/04/2020       
        @AuraEnabled 
        global String codigoBic {get;set;}//SNJ - 27/04/2020
        @AuraEnabled 
        global String aliasCuentaPerfilado {get;set;} //SNJ - 06/05/2020
        //@AuraEnabled 
        //global String aliasEntidadBanco {get;set;}//SNJ - 06/05/2020 
        @AuraEnabled 
        global Boolean balanceAllowed {get;set;} 
        @AuraEnabled 
        global Boolean transactionsAllowed {get;set;}
        //Map idType and ID
        @AuraEnabled 
        global Map<String,String> companyIdsList {get;set;}

        //AM - 28-09-2020 - Ebury Accounts
        @AuraEnabled global String dataProvider {get;set;}
        @AuraEnabled global List<WRAPPER_Balance_LU.AssociatedAccountList> associatedAccountList {get;set;}
        
        global AccountDetails () {
            //System.debug('Wrapper_AccountList.AccountDetails');
        }
       
    }

    global class TipoDeCambio {
		@AuraEnabled global String claError {get;set;} 
		@AuraEnabled global String divisa {get;set;} 
		@AuraEnabled global String fecha {get;set;} 		
		@AuraEnabled global Double importe {get;set;} 
		@AuraEnabled global Double importeDecimal {get;set;} 
		@AuraEnabled global String nombreDivisa {get;set;} 
		@AuraEnabled global String tipError {get;set;} 	
        global TipoDeCambio () {
            //System.debug('Wrapper_AccountList.TipoDeCambio');
        }
       
    }
    
    @AuraEnabled
    global static List<AccountDetails>	accountsList	{get;set;}

    @AuraEnabled
    global static List<TipoDeCambio> tipoDeCambio {get;set;}

}