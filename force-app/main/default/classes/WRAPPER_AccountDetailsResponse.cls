/*----------------------------------------------------------------------------------
Author:         Andrea Martin
Company:        Deloitte
Description:   	All data from account

History
<Date>			<Author>		<Description>
02/02/2021		Andrea Martin     Initial version
----------------------------------------------------------------------------------*/
global class WRAPPER_AccountDetailsResponse {

   
    global class AccountDetailsResponse{
        @AuraEnabled
        global String displayNumber {get;set;} 
        @AuraEnabled
        global String accountId {get;set;}
        @AuraEnabled
        global String accountIdType {get;set;}
        @AuraEnabled
        global String alias {get;set;}
        @AuraEnabled
        global Boolean mainItem {get;set;}
        @AuraEnabled
        global String type {get;set;}
        @AuraEnabled
        global String description {get;set;}
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String customerId {get;set;}
        @AuraEnabled
        global String lastTransactionDate {get;set;}
        @AuraEnabled
        global List<RelatedCard> relatedCards {get;set;}
        @AuraEnabled
        global String costCenter {get;set;}
        @AuraEnabled
        global Balance mainBalance {get;set;}
        @AuraEnabled
        global Balance availableBalance {get;set;}
        @AuraEnabled
        global Balance pendingBalance {get;set;}
        @AuraEnabled
        global Balance withholdingBalance {get;set;}
        @AuraEnabled
        global Balance overdraftLimit {get;set;}
        @AuraEnabled
        global Balance overdraftUsed {get;set;}
        @AuraEnabled
        global List<LastTransaction> latestTransactions {get;set;}
        @AuraEnabled
        global String transactionsListLink {get;set;}
        global accountDetailsResponse(){}
    }

    global class RelatedCard{
        @AuraEnabled
        global String displayNumber {get;set;}
        @AuraEnabled
        global String cardLink {get;set;}
        global RelatedCard(){}

    }

    global class Balance{
        @AuraEnabled
        global Decimal amount {get;set;}
        @AuraEnabled
        global String currencyCode {get;set;}
        @AuraEnabled
        global String lastUpdate {get;set;}
        global Balance(){}
    }

    global class LastTransaction{ 
        @AuraEnabled
        global String transactionId {get;set;}
        @AuraEnabled
        global String creationDate {get;set;}
        @AuraEnabled
        global String processedDate {get;set;}
        @AuraEnabled
        global String accountingDate {get;set;}
        @AuraEnabled
        global String description {get;set;}
        @AuraEnabled
        global String transactionType {get;set;}
        @AuraEnabled
        global String transactionCategory {get;set;}
        @AuraEnabled
        global Amount amount {get;set;}
        @AuraEnabled
        global String transactionDetailsLink {get;set;}
        global LastTransaction(){}
    }

    global class Amount{ 
        @AuraEnabled
        global Decimal amount {get;set;}
        @AuraEnabled
        global String currencyCode {get;set;}
        global Amount(){}
    }

    global WRAPPER_AccountDetailsResponse (){}

}