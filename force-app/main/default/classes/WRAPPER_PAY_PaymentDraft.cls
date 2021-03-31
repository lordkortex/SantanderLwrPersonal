global with sharing class WRAPPER_PAY_PaymentDraft {

    // ACCOUNTS
    @AuraEnabled
    global WRAPPER_AccountList.AccountDetails sourceAccount {get;set;}
    @AuraEnabled
    global WRAPPER_AccountList.AccountDetails expensesAccount {get;set;}
    @AuraEnabled
    global WRAPPER_AccountList.AccountDetails destinationAccount {get;set;}
    @AuraEnabled 
    global Boolean registerNewBeneficiary {get;set;}

    // BASIC DATA
    @AuraEnabled
    global String paymentId {get;set;}
    @AuraEnabled
    global String productId {get;set;}
    @AuraEnabled
    global String serviceId {get;set;}
    @AuraEnabled
    global String paymentMethod {get;set;}
    @AuraEnabled
    global String parsedPaymentMethod {get;set;}
    
    // AMOUNT DATA
    @AuraEnabled
    global Boolean fromOrigin {get;set;}
    @AuraEnabled
    global Decimal amountSend {get;set;}
    @AuraEnabled
    global Decimal amountReceive {get;set;}
    @AuraEnabled
    global String amountEnteredFrom {get;set;}
    @AuraEnabled
    global Decimal exchangeRate {get;set;}
    @AuraEnabled
    global String timestamp {get;set;}
    @AuraEnabled
    global String fxTimer {get;set;}
    @AuraEnabled
    global Decimal transactionFee {get;set;}
    @AuraEnabled
    global String transactionFeeCurrency {get;set;}
    @AuraEnabled
    global Decimal convertedTransactionFee {get;set;}
    @AuraEnabled
    global String convertedTransactionFeeCurrency {get;set;}
    @AuraEnabled
    global WS_ExchangeRate.OUTPUT exchangeRateServiceResponse {get;set;}
    @AuraEnabled
    global WS_TransferFees.OUTPUT transactionFeeServiceResponse {get;set;}
    @AuraEnabled
    global WS_ExchangeRate.OUTPUT convertedTransactionFeeServiceResponse {get;set;}
    @AuraEnabled
    global Decimal baseAmount {get;set;}
    @AuraEnabled
    global String baseCurrency {get;set;}
    @AuraEnabled
    global Boolean sourceCurrencyDominant {get;set;}
    @AuraEnabled
    global String paymentCurrency {get;set;}

    // OTHER INFORMATION
    @AuraEnabled
    global String chargeBearer {get;set;}
    @AuraEnabled
    global String reference {get;set;}
    @AuraEnabled
    global String purpose {get;set;}
    @AuraEnabled
    global String comercialCode {get;set;}
    @AuraEnabled
    global String description {get;set;}
    @AuraEnabled
    global String reason {get;set;}
    @AuraEnabled
    global List<Map<String,String>> documents {get;set;}

    global WRAPPER_PAY_PaymentDraft (){}
}