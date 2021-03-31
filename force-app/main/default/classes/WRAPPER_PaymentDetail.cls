/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to get the details of a payment
Test Class:     WRAPPER_PaymentDetail_Test
History
<Date>			<Author>				<Description>
23/07/2020      Guillermo Giral        	Initial version
13/01/2021		Shahad Naji 			Add operationAmountBaseCurrency structure
----------------------------------------------------------------------------------*/
global class WRAPPER_PaymentDetail {

    @AuraEnabled
    global OperationResponse operationResponse;

    global WRAPPER_PaymentDetail () {}

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

        global ConceptsList () {}
    }

    global class DestinationData {
        @AuraEnabled
        global String name {get;set;}
        @AuraEnabled
        global String customerId {get;set;}
        @AuraEnabled
        global String companyGlobalId {get;set;}
        @AuraEnabled
        global SourceAddress destinationAddress {get;set;}
        @AuraEnabled
        global SourceAccount destinationAccount {get;set;}
        @AuraEnabled
        global SourceAgent destinationAgent {get;set;}
        @AuraEnabled
        global String country {get;set;}
        @AuraEnabled
        global CreditorDocument creditorDocument {get;set;}

        global DestinationData () {}
    }

    global class OperationAmount {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double amount {get;set;}

        global OperationAmount () {}
    }

    global class FxComercialMargin {
        @AuraEnabled
        global String fxComercialMarginCurrency {get;set;}
        @AuraEnabled
        global Double fxComercialMarginAmount {get;set;}

        global FxComercialMargin () {}
    }

    global class CounterValueOperationAmount {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tradeCurrency {get;set;}

        global CounterValueOperationAmount () {}
    }

    global class SpecialFixedRatePrice {
        @AuraEnabled
        global Double specialRate {get;set;}
        @AuraEnabled
        global Double specialMinimumAmount {get;set;}
        @AuraEnabled
        global Double specialMaximumAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}

        global SpecialFixedRatePrice () {}
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
        //MAHR
        @AuraEnabled
        global String uetr {get;set;}
        @AuraEnabled
        global IntermediateAgentAccount intermediateAgentAccount {get;set;}

        global OperationStep2Data () {}
    }

    global class OperationFraudDetails {
        @AuraEnabled
        global String fraudValidationResult {get;set;}
        @AuraEnabled
        global String fraudReference {get;set;}

        global OperationFraudDetails () {}
    }

    global class SourceAddress {
        @AuraEnabled
        global String streetName {get;set;}
        @AuraEnabled
        global String floor {get;set;}
        @AuraEnabled
        global String townName {get;set;}
        @AuraEnabled
        global String streetBuildingIdentification {get;set;}
        @AuraEnabled
        global String postCodeIdentification {get;set;}
        @AuraEnabled
        global String state {get;set;}
        @AuraEnabled
        global String country {get;set;}

        global SourceAddress () {}
    }

    global class SourceData {
        @AuraEnabled
        global String name {get;set;}
        @AuraEnabled
        global String customerId {get;set;}
        @AuraEnabled
        global String companyGlobalId {get;set;}
        @AuraEnabled
        global SourceAddress sourceAddress {get;set;}
        @AuraEnabled
        global SourceAccount sourceAccount {get;set;}
        @AuraEnabled
        global SourceAgent sourceAgent {get;set;}
        @AuraEnabled
        global String country {get;set;}
        @AuraEnabled
        global String parsedCountry {get;set;}

        global SourceData () {}
    }

    global class OperationDetail {
        @AuraEnabled
        global String operationType {get;set;}
        @AuraEnabled
        global String productId {get;set;}
        @AuraEnabled
        global String paymentMethod {get;set;}
        @AuraEnabled
        global String serviceId {get;set;}
        @AuraEnabled
        global String userGlobalId {get;set;}
        @AuraEnabled
        global OperationStatus operationStatus {get;set;}
        @AuraEnabled
        global List<OperationStatusHistory> operationStatusesHistorical {get;set;}
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
        global OperationAmountBaseCurrency operationAmountBaseCurrency {get;set;}
        @AuraEnabled
        global CounterValueOperationAmount counterValueOperationAmount {get;set;}
        @AuraEnabled
        global OperationAmount sourceTotalAmount {get;set;}
        @AuraEnabled
        global String clientReference {get;set;}
        @AuraEnabled
        global String purpose {get;set;}
        @AuraEnabled
        global String comercialCode {get;set;}
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
        global OperationNominalFxRollbackDetails operationNominalFxRollbackDetails {get;set;}
        @AuraEnabled
        global PricingDetails pricingDetails {get;set;}
        @AuraEnabled
        global String paymentId {get;set;}
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
        global Double amount {get;set;}
        @AuraEnabled
        global String paymentCurrency {get;set;}
        @AuraEnabled
        global Date valueDate {get;set;}
        @AuraEnabled
        global Date parsedValueDate {get;set;}
        // @AuraEnabled
        // global String paymentMethod {get;set;}
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
        global String parsedPurpose {get;set;}
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
        global String commercialCode {get;set;}
        @AuraEnabled
        global String parsedCommercialCode {get;set;}
        @AuraEnabled
        global SourceData sourceFeeData {get;set;}
        @AuraEnabled
        global String statusUpdateUser {get;set;}
        @AuraEnabled
        global String trackingStep {get;set;}
        @AuraEnabled
        global String amountSend {get;set;}
        @AuraEnabled
        global String amountReceive {get;set;}
        @AuraEnabled
        global Boolean addFees {get;set;}
        @AuraEnabled
        global String userDefinedAmount {get;set;}
        @AuraEnabled
        global String draftDate {get;set;}
        @AuraEnabled
        global ReviewAdditionalData reviewAdditionalData {get;set;}
        @AuraEnabled
        global RejectAdditionalData rejectAdditionalData {get;set;}
        @AuraEnabled
        global Boolean hasDocument {get;set;}
        @AuraEnabled
        global List<CNT_FilesUtilities.CustomContentVersion> documents {get;set;}
        @AuraEnabled
        global String uetr {get;set;}
        
        global OperationDetail () {}
    }

    global class CreditorDocument {
        @AuraEnabled
		global String documentType {get;set;}
        @AuraEnabled 
		global String documentNumber {get;set;}
		
		global CreditorDocument () {}  
	}
    
    global class IntermediateAgentAccount {
        @AuraEnabled
        global String accountType {get;set;}
        @AuraEnabled
        global String accountId {get;set;}

        global IntermediateAgentAccount () {}
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

        global OperationNominalFxDetails () {}
    }

    global class OperationStatus {
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String reason {get;set;}
        @AuraEnabled
        global String statusDate {get;set;}
        @AuraEnabled
        global String globalUserId {get;set;}

        global OperationStatus () {}
    }

    global class OperationStatusHistory {
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String reason {get;set;}
        @AuraEnabled
        global String statusDate {get;set;}
        @AuraEnabled
        global String globalUserId {get;set;}
        @AuraEnabled
        global String userName {get;set;}
        @AuraEnabled
        global String parsedDateTime {get;set;}
        @AuraEnabled
        global String parsedTime {get;set;}
        @AuraEnabled
        global String parsedDate {get;set;}

        global OperationStatusHistory () {}
    }

    global class SpecialFixedAmountPrice {
        @AuraEnabled
        global Double specialFixedAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}

        global SpecialFixedAmountPrice () {}
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

        global PricingDetails () {}
    }

    global class CcyCountervalue {
        @AuraEnabled
        global Double ccyCountervalueAmount {get;set;}
        @AuraEnabled
        global String ccyCountervalueCurrency {get;set;}

        global CcyCountervalue () {}
    }

    global class CurrencyList {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String currencyName {get;set;}
        @AuraEnabled
        global List<ConceptsList> conceptsList {get;set;}

        global CurrencyList () {}
    }

    global class StandardFixedRatePrice {
        @AuraEnabled
        global Double standardRate {get;set;}
        @AuraEnabled
        global Double standardMinimumAmount {get;set;}
        @AuraEnabled
        global Double standardMaximumAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}

        global StandardFixedRatePrice () {}
    }

    global class SourceAccount {
        @AuraEnabled
        global String accountType {get;set;}
        @AuraEnabled
        global String accountId {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}

        global SourceAccount () {}
    }

    global class SpecialPrice {
        @AuraEnabled
        global String specialPriceLevel {get;set;}
        @AuraEnabled
        global List<SpecialTiersList> specialTiersList {get;set;}

        global SpecialPrice () {}
    }

    global class RefundDetails {
        @AuraEnabled
        global String globalUserId {get;set;}
        @AuraEnabled
        global String authUserId {get;set;}
        @AuraEnabled
        global String authDate {get;set;}
        @AuraEnabled
        global String authComments {get;set;}
        @AuraEnabled
        global String creationDate {get;set;}
        @AuraEnabled
        global String refundType {get;set;}
        @AuraEnabled
        global NominalAmountNoMarkUp refundAmount {get;set;}
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String reason {get;set;}
        @AuraEnabled
        global String comments {get;set;}
        @AuraEnabled
        global String refundDate {get;set;}
        @AuraEnabled
        global OperationNominalFxDetails operationNominalFxRefundDetails {get;set;}
        @AuraEnabled
        global OperationFeesFxDetails operationFeesFxRefundDetails {get;set;}

        global RefundDetails () {}
    }

    global class StandardPrice {
        @AuraEnabled
        global List<StandardTiersList> standardTiersList {get;set;}

        global StandardPrice () {}
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

        global SpecialTiersList () {}
    }

    global class NominalAmountNoMarkUp {
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}

        global NominalAmountNoMarkUp () {}
    }

    global class ConceptAmount {
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double fixing {get;set;}

        global ConceptAmount () {}
    }

    global class StandardFixedAmountPrice {
        @AuraEnabled
        global Double standardFixedAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}

        global StandardFixedAmountPrice () {}
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

        global StandardTiersList () {}
    }

    global class SourceAgent {
        @AuraEnabled
        global String agentId {get;set;}
        @AuraEnabled
        global String name {get;set;}
        @AuraEnabled
        global String address {get;set;}

        global SourceAgent () {}
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

        global OperationStep1Data () {}
    }

    global class OperationResponse {
        @AuraEnabled
        global OperationDetail operationDetail {get;set;}
        // @AuraEnabled
        // global String customerIndicator {get;set;}
        @AuraEnabled
        global RefundDetails refundDetails {get;set;}

        global OperationResponse () {}
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

        global OperationFeesFxDetails () {}
    }

    global class OperationNominalFxRollbackDetails {
        global String fxCountervalueId;
        global String priceType;
        global CcyCountervalue ccyCountervalue;
        global String valueDateEfx;
        global Double customerExchangeRate;

        global OperationNominalFxRollbackDetails () {}

        global OperationNominalFxRollbackDetails (String fxCountervalueId, String priceType, CcyCountervalue ccyCountervalue, String valueDateEfx, Double customerExchangeRate) {
            this.fxCountervalueId = fxCountervalueId;
            this.priceType = priceType;
            this.ccyCountervalue = ccyCountervalue;
            this.valueDateEfx = valueDateEfx;
            this.customerExchangeRate = customerExchangeRate;
        }
    }

    global class ReviewAdditionalData {
        @AuraEnabled
        global String subject {get;set;}
        @AuraEnabled
        global String description {get;set;}

        global ReviewAdditionalData () {}
    }

    global class RejectAdditionalData {
        @AuraEnabled
        global String subject {get;set;}
        @AuraEnabled
        global String description {get;set;}

        global RejectAdditionalData () {}
    }
    
    global class OperationAmountBaseCurrency{
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        global OperationAmountBaseCurrency(){}
    }

    global static WRAPPER_PaymentDetail parse (String json) {
        return (WRAPPER_PaymentDetail) System.JSON.deserialize(json, WRAPPER_PaymentDetail.class);
    }
}