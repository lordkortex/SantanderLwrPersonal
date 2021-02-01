/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Auxiliar wrapper for Payments Landing Parent 
Test Class:     TBD
History
<Date>			<Author>		<Description>
28/05/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
global class WRAPPER_PaymentList {

    global WRAPPER_PaymentList(){
        System.debug('WRAPPER_PaymentList');
    }
    
    @AuraEnabled
    global List<WRAPPER_Payment> paymentsList {get;set;}    
    @AuraEnabled
    global List<WRAPPER_Status> statusList {get;set;}
    @AuraEnabled
    global List<WRAPPER_Currency> currencyList {get;set;}
    @AuraEnabled
    global List<WRAPPER_Country> countryList {get;set;}
    @AuraEnabled
    global List<WRAPPER_PaymentMethod> paymentMethodList {get;set;}
    @AuraEnabled
    global List<WRAPPER_PaymentType> paymentTypeList {get;set;}
    @AuraEnabled
    global List<WS_OperationsList.StatusList> availableStatuses {get;set;}

    global class WRAPPER_Payment {

        @AuraEnabled
        global String paymentId {get;set;}
        @AuraEnabled
        global String clientReference {get;set;}
        @AuraEnabled
        global String paymentStatus {get;set;}
        @AuraEnabled
        global String parsedPaymentStatus {get;set;}
        @AuraEnabled
        global String paymentReason {get;set;}
        @AuraEnabled
        global String parsedPaymentReason {get;set;}
        @AuraEnabled
        global String sourceAccount {get;set;}
        @AuraEnabled
        global String sourceAlias {get;set;}
        @AuraEnabled
        global String sourceAccountIdType {get;set;}
        @AuraEnabled
        global String beneficiaryAccount {get;set;}
        @AuraEnabled
        global String beneficiaryAccountIdType {get;set;}
        @AuraEnabled
        global String beneficiaryAlias {get;set;}
        @AuraEnabled
        global Decimal amount {get;set;}
        @AuraEnabled
        global String paymentCurrency {get;set;}
        @AuraEnabled
        global Date valueDate {get;set;}
        @AuraEnabled
        global Date parsedValueDate {get;set;}
        @AuraEnabled
        global String paymentMethod {get;set;}
        @AuraEnabled
        global String parsedPaymentMethod {get;set;}
        @AuraEnabled
        global String destinationCountry {get;set;}
        @AuraEnabled
        global String parsedDestinationCountry {get;set;}
        @AuraEnabled
        global String destinationBic {get;set;}
        @AuraEnabled
        global String sourceBank {get;set;}
        @AuraEnabled
        global String statusUpdateDate {get;set;}
        @AuraEnabled
        global String fees {get;set;}
        @AuraEnabled
        global String charges {get;set;}
        @AuraEnabled
        global String sourceAccountHolder {get;set;}
        @AuraEnabled
        global String sourceCountry {get;set;}
        @AuraEnabled
        global String parsedSourceCountry {get;set;}
        @AuraEnabled
        global String sourceBic {get;set;}
        @AuraEnabled
        global String beneficiaryAccountHolder {get;set;}
        @AuraEnabled
        global String beneficiaryBank {get;set;}
        @AuraEnabled
        global String beneficiarySwiftCode {get;set;}
        @AuraEnabled
        global String sourceSwiftCode {get;set;}
        @AuraEnabled
        global String paymentReference {get;set;}
        @AuraEnabled
        global Boolean fxFlag {get;set;}
        @AuraEnabled
        global String purpose {get;set;}
        @AuraEnabled
        global String parsedPurpose {get;set;}
        @AuraEnabled
        global String userGlobalId {get;set;}
        @AuraEnabled
        global String sourceCurrency {get;set;}
        @AuraEnabled
        global String beneficiaryCurrency {get;set;}
        @AuraEnabled
        global Double tradeAmount {get;set;}
        @AuraEnabled
        global String feesCurrency {get;set;}
        @AuraEnabled
        global String convertedAmount {get;set;}
        @AuraEnabled
        global String convertedCurrency {get;set;}
        @AuraEnabled
        global String totalAmount {get;set;}
        
        
        
        @AuraEnabled
        global String operationType {get;set;}
        @AuraEnabled
		global String serviceId {get;set;}
		@AuraEnabled
		global OperationStatus operationStatus {get;set;}
        @AuraEnabled
		global SourceData sourceData {get;set;}
        @AuraEnabled
		global DestinationData destinationData {get;set;}
        @AuraEnabled
		global OperationStep1Data operationStep1Data {get;set;}
        @AuraEnabled
		global OperationStep2Data operationStep2Data {get;set;}
        @AuraEnabled
		global String issueDate {get;set;}
        @AuraEnabled
		global String chargeBearer {get;set;}
        @AuraEnabled
		global OperationAmount operationAmount {get;set;}
        @AuraEnabled
		global CounterValueOperationAmount counterValueOperationAmount {get;set;}
        @AuraEnabled
		global OperationAmount sourceTotalAmount {get;set;}
		@AuraEnabled
		global String operationDescription {get;set;}
        @AuraEnabled
		global String subject {get;set;}
        @AuraEnabled
		global OperationFraudDetails operationFraudDetails {get;set;}
        @AuraEnabled
		global OperationNominalFxDetails operationNominalFxDetails {get;set;}
        @AuraEnabled
		global OperationFeesFxDetails operationFeesFxDetails {get;set;}
        @AuraEnabled
		global PricingDetails pricingDetails {get;set;}
        
        global WRAPPER_Payment(){
            System.debug('WRAPPER_PaymentList.WRAPPER_Payment');
        }
    }
    
    global class WRAPPER_Status {

        @AuraEnabled
        global String statusName {get;set;}
        @AuraEnabled
        global String parsedStatusName {get;set;}
        
         global WRAPPER_Status(){
            System.debug('WRAPPER_PaymentList.WRAPPER_Status');
        }
        
    }
    
    global class WRAPPER_Currency {

        @AuraEnabled
        global String currencyName {get;set;}
        @AuraEnabled
        global String parsedCurrencyName {get;set;}
        
        global WRAPPER_Currency(){
            System.debug('WRAPPER_PaymentList.WRAPPER_Currency');
        }
        
    }
    
    global class WRAPPER_PaymentMethod {

        @AuraEnabled
        global String paymentMethodName {get;set;}
        @AuraEnabled
        global String parsedPaymentMethodName {get;set;}  
        
        global WRAPPER_PaymentMethod() {
            System.debug('WRAPPER_PaymentList.WRAPPER_PaymentMethod');
        }
    }
    
    global class WRAPPER_PaymentType {

        @AuraEnabled
        global String paymentTypeName {get;set;}
        @AuraEnabled
        global String parsedPaymentTypeName {get;set;}  
        
        global WRAPPER_PaymentType() {
            System.debug('WRAPPER_PaymentList.WRAPPER_PaymentType');
        }
    }

    global class WRAPPER_Country {

        @AuraEnabled
        global String countryName {get;set;}
        @AuraEnabled
        global String parsedCountryName {get;set;}    
        
        global WRAPPER_Country(){
            System.debug('WRAPPER_PaymentList.WRAPPER_Country');
        }
    }
    
    global class OperationStatus {
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String reason {get;set;}
        @AuraEnabled
        global String statusDate {get;set;}
        
        global OperationStatus(){
            System.debug('WRAPPER_PaymentDetail.OperationStatus');
        }
    }
    
    global class SourceData {
        @AuraEnabled
        global String name {get;set;}
        @AuraEnabled
        global SourceAccount sourceAccount {get;set;}
        @AuraEnabled
        global SourceAgent sourceAgent {get;set;}
        @AuraEnabled
        global String country {get;set;}
        
        global SourceData(){
            System.debug('WRAPPER_PaymentDetail.SourceData');
        }
    }
    
    global class SourceAgent {
        @AuraEnabled
        global String agentId {get;set;}
        @AuraEnabled
        global String name {get;set;}
        @AuraEnabled
        global String address {get;set;}
        
        global SourceAgent(){
            System.debug('WRAPPER_PaymentDetail.SourceAgent');
        }
    }
    
    global class DestinationData {
        @AuraEnabled
        global String name {get;set;}
        @AuraEnabled
        global SourceAccount destinationAccount {get;set;}
        @AuraEnabled
        global SourceAgent destinationAgent {get;set;}
        @AuraEnabled
        global String country {get;set;}
        
        global DestinationData(){
            System.debug('WRAPPER_PaymentDetail.DestinationData');
        }
    }
    
    
    global class OperationStep1Data {
        @AuraEnabled
        global String opStep1Id {get;set;}
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String valueDate {get;set;}
        @AuraEnabled
        global String flowIndicator {get;set;}
        @AuraEnabled
        global IntermediateAgentAccount intermediateAgentAccount {get;set;}
        
        global OperationStep1Data(){
            System.debug('WRAPPER_PaymentDetail.OperationStep1Data');
        }
    }
    
    
    global class OperationStep2Data {
        @AuraEnabled
        global String opStep2Id {get;set;}
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String valueDate {get;set;}
        @AuraEnabled
        global String flowIndicator {get;set;}
        @AuraEnabled
        global IntermediateAgentAccount intermediateAgentAccount {get;set;}
        
        global OperationStep2Data(){
            System.debug('WRAPPER_PaymentDetail.OperationStep2Data');
        }
    }
    
    global class OperationAmount {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double amount {get;set;}
        
        global OperationAmount(){
            System.debug('WRAPPER_PaymentDetail.OperationAmount');
        }
    }

    global class CounterValueOperationAmount {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tradeCurrency {get;set;}
        
        global CounterValueOperationAmount(){
            System.debug('WRAPPER_PaymentDetail.CounterValueOperationAmount');
        }
    }
    
    global class OperationFraudDetails {
        @AuraEnabled
        global String fraudValidationResult {get;set;}
        @AuraEnabled
        global String fraudReference {get;set;}
        
        global OperationFraudDetails(){
            System.debug('WRAPPER_PaymentDetail.OperationFraudDetails');
        }
    }
    
    global class OperationNominalFxDetails {
        @AuraEnabled
        global String fxCountervalueId {get;set;}
        @AuraEnabled
        global String priceType {get;set;}
        @AuraEnabled
        global Integer discount {get;set;}
        @AuraEnabled
        global CcyCountervalue ccyCountervalue {get;set;}
        @AuraEnabled
        global String valueDateEfx {get;set;}
        @AuraEnabled
        global Double customerExchangeRate {get;set;}
        @AuraEnabled
        global FxComercialMargin fxComercialMargin {get;set;}
        @AuraEnabled
        global NominalAmountNoMarkUp nominalAmountNoMarkUp {get;set;}
        
        global OperationNominalFxDetails(){
            System.debug('WRAPPER_PaymentDetail.OperationNominalFxDetails');
        }
    }
    
    
    global class OperationFeesFxDetails {
        @AuraEnabled
        global String fxCountervalueId {get;set;}
        @AuraEnabled
        global String priceType {get;set;}
        @AuraEnabled
        global Integer discount {get;set;}
        @AuraEnabled
        global CcyCountervalue ccyCountervalue {get;set;}
        @AuraEnabled
        global String valueDateEfx {get;set;}
        @AuraEnabled
        global Double customerExchangeRate {get;set;}
        
        global OperationFeesFxDetails(){
            System.debug('WRAPPER_PaymentDetail.OperationFeesFxDetails');
        }
    }
    
    global class PricingDetails {
        @AuraEnabled
        global String productName {get;set;}
        @AuraEnabled
        global Double totalPrice {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global List<CurrencyList> currencyList {get;set;}
        
        global PricingDetails(){
            System.debug('WRAPPER_PaymentDetail.PricingDetails');
        }
    }
    global class SourceAccount {
        @AuraEnabled
        global String accountType {get;set;}
        @AuraEnabled
        global String accountId {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global SourceAccount(){
            System.debug('WRAPPER_PaymentDetail.SourceAccount');
        }
    }
    
    global class CurrencyList {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String currencyName {get;set;}
        @AuraEnabled
        global List<ConceptsList> conceptsList {get;set;}
        
        global CurrencyList(){
            System.debug('WRAPPER_PaymentDetail.CurrencyList');
        }
    }
    
    global class CcyCountervalue {
        @AuraEnabled
        global Double ccyCountervalueAmount {get;set;}
        @AuraEnabled
        global String ccyCountervalueCurrency {get;set;}
        
        global CcyCountervalue(){
            System.debug('WRAPPER_PaymentDetail.CcyCountervalue');
        }
    }
    
    global class IntermediateAgentAccount {
        @AuraEnabled
        global String accountType {get;set;}
        @AuraEnabled
        global String accountId {get;set;}
        
        global IntermediateAgentAccount(){
            System.debug('WRAPPER_PaymentDetail.IntermediateAgentAccount');
        }
    }
    
    global class ConceptsList {
        @AuraEnabled
        global String conceptId {get;set;}
        @AuraEnabled
        global String conceptName {get;set;}
        @AuraEnabled
        global SpecialPrice specialPrice {get;set;}
        @AuraEnabled
        global StandardPrice standardPrice {get;set;}
        @AuraEnabled
        global ConceptAmount conceptAmount {get;set;}
        
        global ConceptsList(){
            System.debug('WRAPPER_PaymentDetail.ConceptsList');
        }
    }
    
    global class SpecialPrice {
        @AuraEnabled
        global String specialPriceLevel {get;set;}
        @AuraEnabled
        global List<SpecialTiersList> specialTiersList {get;set;}
        
        global SpecialPrice(){
            System.debug('WRAPPER_PaymentDetail.SpecialPrice');
        }
    }
    
    
	global class StandardPrice {
        @AuraEnabled
		global List<StandardTiersList> standardTiersList {get;set;}
        
        global StandardPrice(){
            System.debug('WRAPPER_PaymentDetail.StandardPrice');
        }
	}
    global class ConceptAmount {
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double fixing {get;set;}
        
        global ConceptAmount(){
            System.debug('WRAPPER_PaymentDetail.ConceptAmount');
        }
    }
    
    global class SpecialTiersList {
        @AuraEnabled
        global Double specialAmountTier {get;set;}
        @AuraEnabled
        global String specialAmountTierType {get;set;}
        @AuraEnabled
        global SpecialFixedRatePrice specialFixedRatePrice {get;set;}
        @AuraEnabled
        global SpecialFixedAmountPrice specialFixedAmountPrice {get;set;}
        
        global SpecialTiersList(){
            System.debug('WRAPPER_PaymentDetail.SpecialTiersList');
        }
    }
    
    global class SpecialFixedRatePrice {
        @AuraEnabled
        global Double specialRate {get;set;}
        @AuraEnabled
        global Integer specialMinimumAmount {get;set;}
        @AuraEnabled
        global Integer specialMaximumAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global SpecialFixedRatePrice(){
            System.debug('WRAPPER_PaymentDetail.SpecialFixedRatePrice');
        }
    }
    
    global class SpecialFixedAmountPrice {
        @AuraEnabled
        global Integer specialFixedAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global SpecialFixedAmountPrice(){
            System.debug('WRAPPER_PaymentDetail.SpecialFixedAmountPrice');
        }
    }
    
    global class StandardTiersList {
        @AuraEnabled
        global Double standardAmountTier {get;set;}
        @AuraEnabled
        global String standardAmountTierType {get;set;}
        @AuraEnabled
        global StandardFixedRatePrice standardFixedRatePrice {get;set;}
        @AuraEnabled
        global StandardFixedAmountPrice standardFixedAmountPrice {get;set;}
        
        global StandardTiersList(){
            System.debug('WRAPPER_PaymentDetail.StandardTiersList');
        }
    }
    
    global class FxComercialMargin {
        @AuraEnabled
        global String fxComercialMarginCurrency {get;set;}
        @AuraEnabled
        global Double fxComercialMarginAmount {get;set;}
        
        global FxComercialMargin(){
            System.debug('WRAPPER_PaymentDetail.FxComercialMargin');
        }
    }
    
    global class StandardFixedRatePrice {
        @AuraEnabled
        global Double standardRate {get;set;}
        @AuraEnabled
        global Integer standardMinimumAmount {get;set;}
        @AuraEnabled
        global Integer standardMaximumAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global StandardFixedRatePrice(){
            System.debug('WRAPPER_PaymentDetail.StandardFixedRatePrice');
        }
    }
    
    global class StandardFixedAmountPrice {
        @AuraEnabled
        global Integer standardFixedAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global StandardFixedAmountPrice(){
            System.debug('WRAPPER_PaymentDetail.StandardFixedAmountPrice');
        }
    }
    
    global class NominalAmountNoMarkUp {
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        
        global NominalAmountNoMarkUp(){
            System.debug('WRAPPER_PaymentDetail.NominalAmountNoMarkUp');
        }
    }

    global class WRAPPER_CommercialCode {

        @AuraEnabled
        global String commercialCode {get;set;}
        @AuraEnabled
        global String parsedCommercialCode {get;set;}  
        
        global WRAPPER_CommercialCode() {
            System.debug('WRAPPER_PaymentList.WRAPPER_CommercialCode');
        }
    }
}