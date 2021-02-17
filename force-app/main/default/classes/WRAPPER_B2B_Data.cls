/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 02-17-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   02-17-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
global with sharing class WRAPPER_B2B_Data {

    global with sharing class PaymentAmount {
 
        @AuraEnabled
        global Boolean fromOrigin {get;set;}
        @AuraEnabled
        global Decimal amountSend {get;set;}
        @AuraEnabled
        global Decimal amountReceive {get;set;}
        @AuraEnabled
        global Decimal exchangeRate {get;set;}
        @AuraEnabled
        global String timestamp {get;set;}
        @AuraEnabled
        global Decimal transactionFee {get;set;}
        @AuraEnabled
        global String transactionFeeCurrency {get;set;}
        @AuraEnabled
        global Decimal convertedTransactionFee {get;set;}
        @AuraEnabled
        global String convertedTransactionFeeCurrency {get;set;}
        @AuraEnabled
        global WS_TransferFees.OUTPUT transactionFeeServiceResponse {get;set;}
        @AuraEnabled
        global WS_ExchangeRate.OUTPUT convertedTransactionFeeServiceResponse {get;set;}
        @AuraEnabled
        global WS_ExchangeRate.OUTPUT exchangeRateServiceResponse {get;set;}
        @AuraEnabled
        global Decimal baseAmount {get;set;}
        @AuraEnabled
        global String baseCurrency {get;set;}
        
    }

    global with sharing class AccountData {

        @AuraEnabled
        global Boolean cib {get;set;}
        @AuraEnabled
        global String documentType {get;set;}
        @AuraEnabled
        global String documentNumber {get;set;}
        @AuraEnabled
        global String companyId {get;set;}
        
        global AccountData () {
            System.debug('WRAPPER_B2B_Data.AccountData');
        }
    
    }

    global with sharing class UserData {

        @AuraEnabled
        global String userId {get;set;}
        @AuraEnabled
        global String numberFormat {get;set;}
        @AuraEnabled
        global Boolean isNexus {get;set;}
        @AuraEnabled
        global String globalId {get;set;}
        @AuraEnabled
        global String firstName {get;set;}
        @AuraEnabled
        global String lastName {get;set;}
        
        global UserData () {
            System.debug('WRAPPER_B2B_Data.UserData');
        }    
    }

}