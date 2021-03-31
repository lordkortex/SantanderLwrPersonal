/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	All payment data 

Test Class:     TBD
History
<Date>			<Author>		<Description>
14/12/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
global class WRAPPER_PaymentMetaData {
    
    @AuraEnabled
	global String documentType {get;set;} //Document-Type
    @AuraEnabled
    global String documentNumber {get;set;} //Document-Number
    @AuraEnabled
    global String customerId {get;set;} //Customer-Id
    @AuraEnabled
    global String accessChannel {get;set;} //Access-Channel ---------> //MANDATORY	---------> //Included in ServiceFraud	
    @AuraEnabled
    global PaymentDataArea PaymentDataArea {get;set;}
    
 
    
    global class PaymentDataArea{
        @AuraEnabled
        global String idempotentReference {get;set;} //MANDATORY	---------> //Included in ServiceFraud	
        @AuraEnabled
        global String endToEndIdentification {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String destinationName {get;set;} //MANDATORY //---------> //Included in ServiceFraud	
        @AuraEnabled
       	global DestinationAddress destinationAddress {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global DestinationAccount destinationAccount {get;set;} //MANDATORY //---------> //Included in ServiceFraud	
        @AuraEnabled
        global DestinationAgent destinationAgent {get;set;} //MANDATORY //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String countryDestinationFunds {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global IssuedFromOtherBusiness issuedFromOtherBusiness {get;set;}
        @AuraEnabled
        global SourceAccount sourceAccount {get;set;} //MANDATORY //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String sourceName {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global SourceAmlInformation sourceAmlInformation {get;set;}  //---------> //Included in ServiceFraud	
        @AuraEnabled
        global SourceAgent sourceAgent {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global SourceFeeAccount sourceFeeAccount {get;set;}
        @AuraEnabled
        global PaymentAmount paymentAmount {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global CounterValuePaymentAmount counterValuePaymentAmount {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global PaymentFraudDetails paymentFraudDetails {get;set;}
        @AuraEnabled
        global String flowIndicator {get;set;} //MANDATORY //---------> //Included in ServiceFraud	
        @AuraEnabled
        global IntermediateAgentAccount intermediateAgentAccount {get;set;}
        @AuraEnabled
        global String chargeBearer {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String subject {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String purposeCode {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String issueLocalLegalCode {get;set;}
        @AuraEnabled
        global String issueLocalLegalTxt {get;set;}
        @AuraEnabled
        global FxValueDetailsNominal fxValueDetailsNominal {get;set;} //---------> //Included in ServiceFraud
        @AuraEnabled
        global FxValueDetailsFee fxValueDetailsFee {get;set;}
        @AuraEnabled
        global String customerIndicator {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String priceLocator {get;set;}
        @AuraEnabled
        global FundMovementPricesDataList fundMovementPricesDataList {get;set;}
        @AuraEnabled
        global TaxesInformation taxesInformation {get;set;}
        @AuraEnabled
        global String operationId {get;set;}
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String statusReturnReason {get;set;}
        @AuraEnabled
        global String statusCustomerDetails {get;set;}
        @AuraEnabled
        global String statusInternalDetails {get;set;}
        @AuraEnabled
        global String valueDate {get;set;}
        @AuraEnabled
        global SourceTotalAmount sourceTotalAmount {get;set;}
        @AuraEnabled
        global VirtualAccountAmount virtualAccountAmount {get;set;}
        global PaymentDataArea(){}
        global PaymentDataArea(String idempotentReference, String destinationName,  DestinationAccount destinationAccount, DestinationAgent destinationAgent, SourceAccount sourceAccount, String flowIndicator){
            this.idempotentReference = idempotentReference;
            this.destinationName = destinationName;
            this.destinationAccount = destinationAccount;
            this.destinationAgent = destinationAgent;
            this.sourceAccount = sourceAccount;
            this.flowIndicator = flowIndicator;   
        }
        
         global PaymentDataArea(String idempotentReference, String endToEndIdentification, String destinationName, DestinationAddress destinationAddress, DestinationAccount destinationAccount, DestinationAgent destinationAgent, String countryDestinationFunds, 
                               IssuedFromOtherBusiness issuedFromOtherBusiness, SourceAccount sourceAccount, String sourceName, SourceAmlInformation sourceAmlInformation, SourceAgent sourceAgent, SourceFeeAccount sourceFeeAccount, PaymentAmount paymentAmount, 
                               CounterValuePaymentAmount counterValuePaymentAmount, PaymentFraudDetails paymentFraudDetails, String flowIndicator, IntermediateAgentAccount intermediateAgentAccount, String chargeBearer, String subject, String purposeCode,
                               String issueLocalLegalCode, String issueLocalLegalTxt,FxValueDetailsNominal fxValueDetailsNominal, String statusInternalDetails, String valueDate, SourceTotalAmount sourceTotalAmount,VirtualAccountAmount virtualAccountAmount){
                                   this.idempotentReference = idempotentReference;
                                   this.endToEndIdentification = endToEndIdentification;
                                   this.destinationName = destinationName;
                                   this.destinationAddress = destinationAddress;
                                   this.destinationAccount = destinationAccount;
                                   this.destinationAgent = destinationAgent;
                                   this.countryDestinationFunds = countryDestinationFunds;
                                   this.issuedFromOtherBusiness = issuedFromOtherBusiness;
                                   this.sourceAccount = sourceAccount;
                                   this.sourceName = sourceName;
                                   this.statusInternalDetails = statusInternalDetails;
                                   this.valueDate = valueDate;
                                   this.sourceTotalAmount = sourceTotalAmount;
                                   this.virtualAccountAmount = virtualAccountAmount;
                               }
       
        
    }
    
    global class DestinationAddress{
        @AuraEnabled
        global String addressType {get;set;}
        @AuraEnabled
        global String streetName {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String streetBuildingIdentification {get;set;}
        @AuraEnabled
        global String postCodeIdentification {get;set;}
        @AuraEnabled
        global String townName {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String state {get;set;}
        @AuraEnabled
        global String buildingName {get;set;}
        @AuraEnabled
        global String floor {get;set;}
        @AuraEnabled
        global String districtName {get;set;}
        @AuraEnabled
        global String regionIdentification {get;set;}
        @AuraEnabled
        global String countyIdentification {get;set;}
        @AuraEnabled
        global String postOfficeBox {get;set;}
        @AuraEnabled
        global String province {get;set;}
        @AuraEnabled
        global String department {get;set;}
        @AuraEnabled
        global String subDepartment {get;set;}
        @AuraEnabled
        global String location {get;set;}
        @AuraEnabled
        global String country {get;set;} //---------> //Included in ServiceFraud	
        global DestinationAddress(){}        
    }
    
    global class DestinationAccount{
        @AuraEnabled
        global String accountIdType {get;set;} //MANDATORY //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String accountId {get;set;} //MANDATORY //---------> //Included in ServiceFraud	
        global DestinationAccount(){}
    }
    
    global class DestinationAgent{
        @AuraEnabled
        global String agent {get;set;} //MANDATORY  //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String agentName {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String addressAgent {get;set;}
        global DestinationAgent(){}
        global DestinationAgent(String agent){
            this.agent = agent;
        }
        global DestinationAgent(String agent, String agentName, String addressAgent){
            this.agent = agent;
            this.agentName = agentName;
            this.addressAgent = addressAgent;
        }        
    }
    
    global class IssuedFromOtherBusiness{
        @AuraEnabled
        global Boolean sourceAccountsAreInformative {get;set;}
        @AuraEnabled
        global String informativeReference {get;set;}
        global IssuedFromOtherBusiness(){}
    }
    
    global class SourceAccount{
        @AuraEnabled
        global String accountIdType {get;set;} //MANDATORY //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String accountId {get;set;} //MANDATORY //---------> //Included in ServiceFraud	
        global SourceAccount(){} 
        global SourceAccount(String accountIdType, String accountId){
            this.accountIdType = accountIdType;
            this.accountId = accountId;
        } 
    }
    
    global class SourceAmlInformation{
        @AuraEnabled
        global SourceAddress sourceAddress {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global Date sourceBirthDate {get;set;}
        @AuraEnabled
        global String sourceBirthPlace {get;set;}
        @AuraEnabled
        global SourceDocument sourceDocument {get;set;}
        @AuraEnabled
        global String sourceCustomerId {get;set;}
        global SourceAmlInformation (){}
    }
    
    global class SourceAddress{
        @AuraEnabled
        global String addressType {get;set;}
        @AuraEnabled
        global String streetName {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String streetBuildingIdentification {get;set;}
        @AuraEnabled
        global String postCodeIdentification {get;set;}
        @AuraEnabled
        global String townName {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String state {get;set;}
        @AuraEnabled
        global String buildingName {get;set;}
        @AuraEnabled
        global String floor {get;set;}
        @AuraEnabled
        global String districtName {get;set;}
        @AuraEnabled
        global String regionIdentification {get;set;}
        @AuraEnabled
        global String countyIdentification {get;set;}
        @AuraEnabled
        global String postOfficeBox {get;set;}
        @AuraEnabled
        global String province {get;set;}
        @AuraEnabled
        global String department {get;set;}
        @AuraEnabled
        global String subDepartment {get;set;}
        @AuraEnabled
        global String location {get;set;}
        @AuraEnabled
        global String country {get;set;} //---------> //Included in ServiceFraud	
        global SourceAddress(){} 
    }
    
    global class SourceDocument{
        @AuraEnabled
        global String documentType {get;set;}
        @AuraEnabled
        global String documentNumber {get;set;}
        global SourceDocument(){}   
    }
    
    global class SourceAgent{
        @AuraEnabled
        global String agent {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String agentName {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String addressAgent {get;set;}
        global SourceAgent(){}
    }
    
    global class SourceFeeAccount{
        @AuraEnabled
        global String accountIdType {get;set;}
        @AuraEnabled
        global String accountId {get;set;}
        global SourceFeeAccount(){}
    }
    
    global class PaymentAmount{
        @AuraEnabled
        global String tcurrency {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global Double amount {get;set;} //---------> //Included in ServiceFraud	
        global PaymentAmount(){}
    }
    
    global class CounterValuePaymentAmount{
        @AuraEnabled
        global String tcurrency {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global Double amount {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String tradeCurrency {get;set;} //---------> //Included in ServiceFraud	
        global CounterValuePaymentAmount(){}
    }
    
    global class PaymentFraudDetails{
        @AuraEnabled
        global String fraudValidationResult {get;set;}
        @AuraEnabled
        global String fraudReference {get;set;}
        global PaymentFraudDetails(){}
    }
    
    global class IntermediateAgentAccount{
        @AuraEnabled
        global String accountIdType {get;set;}
        @AuraEnabled
        global String accountId {get;set;}
        global IntermediateAgentAccount(){}
    }
    
    global class FxValueDetailsNominal{
        @AuraEnabled
        global String fxCountervalueId {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global FxCommercialMargin fxCommercialMargin {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global FxCounterpaymentAmount fxCounterpaymentAmount {get;set;}
        @AuraEnabled
        global Date fxExecutionDate {get;set;}
        @AuraEnabled
        global Date fxValueDate {get;set;}
        @AuraEnabled
        global Double fxExchangeRate {get;set;}
        global FxValueDetailsNominal(){}
    }
    
    global class FxCommercialMargin{
        @AuraEnabled
        global Double fxCommercialMarginAmount {get;set;} //---------> //Included in ServiceFraud	
        @AuraEnabled
        global String fxCommercialMarginCurrency {get;set;} //---------> //Included in ServiceFraud	
        global FxCommercialMargin(){}
    }
    
    global class FxCounterpaymentAmount{
        @AuraEnabled
        global String tcurrency {get;set;} //---------> //Included in ServiceFraud
        @AuraEnabled
        global Double amount {get;set;} //---------> //Included in ServiceFraud
        global FxCounterpaymentAmount(){}
    }
    
    global class FxValueDetailsFee{
        //TBD
        @AuraEnabled
        global String fxCountervalueId {get;set;}  //---------> //Included in ServiceFraud
        @AuraEnabled
        global FxCommercialMargin fxCommercialMargin {get;set;}
        @AuraEnabled
        global FxCounterpaymentAmount fxCounterpaymentAmount {get;set;}
        @AuraEnabled
        global Date fxExecutionDate {get;set;}
        @AuraEnabled
        global Date fxValeDate {get;set;}
        @AuraEnabled
        global Double fxExangeRate {get;set;}
        global FxValueDetailsFee(){}
    }
    
    global class FundMovementPricesDataList{
        @AuraEnabled
        global CurrencyDetails currencyDetails {get;set;}
        global FundMovementPricesDataList(){}
    }
    
    global class CurrencyDetails{
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String currencyName {get;set;}
        @AuraEnabled
        global ConceptsList conceptsList {get;set;}
        global CurrencyDetails(){}
    }
    
    global class ConceptsList { 
        @AuraEnabled
        global Concepts concepts {get;set;}
        global ConceptsList (){}
        global ConceptsList (Concepts concepts){
            this.concepts = concepts;
        }
    }
    
    global class Concepts{
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
        global Concepts(){}
        global Concepts(String conceptId, String conceptName, SpecialPrice specialPrice, StandardPrice standardPrice, ConceptAmount conceptAmount){
            this.conceptId = conceptId;
            this.conceptName = conceptName;
            this.specialPrice = specialPrice;
            this.standardPrice = standardPrice;
            this.conceptAmount = conceptAmount;
        }
    }
    
    global class SpecialPrice{
        @AuraEnabled
        global String specialPriceLevel {get;set;}
        @AuraEnabled
        global SpecialTiersList specialTiersList {get;set;}
        global SpecialPrice(){}
        global SpecialPrice(String specialPriceLevel, SpecialTiersList specialTiersList){
            this.specialPriceLevel = specialPriceLevel;
            this.specialTiersList = specialTiersList;
        }
    }
    
    global class SpecialTiersList{
        @AuraEnabled
        global Tiers tiers {get;set;}
        global SpecialTiersList(){}
        global SpecialTiersList(Tiers tiers){
            this.tiers = tiers;
        }
    }
    
    global class Tiers{
        @AuraEnabled
        global Double amountTier {get;set;}
        @AuraEnabled
        global String amountTierType {get;set;}
        @AuraEnabled
        global FixedRatePrice fixedRatePrice {get;set;}
        @AuraEnabled
        global FixedAmountPrice fixedAmountPrice {get;set;}
        global Tiers(){}
        global Tiers(Double amountTier, String amountTierType, FixedRatePrice fixedRatePrice, FixedAmountPrice fixedAmountPrice){
            this.amountTier = amountTier;
            this.amountTierType = amountTierType;
            this.fixedRatePrice = fixedRatePrice;
            this.fixedAmountPrice = fixedAmountPrice;
        }
    }
    
    global class FixedRatePrice{
        @AuraEnabled
        global Double rate {get;set;}
        @AuraEnabled
        global Double minimumAmount {get;set;}
        @AuraEnabled
        global Double maximumAmount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        global FixedRatePrice(){}
        global FixedRatePrice(Double rate, Double minimumAmount, Double maximumAmount, String tcurrency){
            this.rate = rate;
            this.minimumAmount = minimumAmount;
            this.maximumAmount = maximumAmount;
            this.tcurrency = tcurrency;
        }
    }
    
    global class FixedAmountPrice{
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        global FixedAmountPrice(){}
        global FixedAmountPrice(Double amount, String tcurrency){
            this.amount =  amount;
            this.tcurrency = tcurrency;
        }
    }
    
    global class StandardPrice {
        @AuraEnabled
        global StandardTiersList standardTiersList {get;set;}
        global StandardPrice(){}
        global StandardPrice(StandardTiersList standardTiersList){
            this.standardTiersList = standardTiersList;
        }
    }
    
    global class StandardTiersList {
        @AuraEnabled
        global Tiers tiers {get;set;}
        global StandardTiersList(){}
        global StandardTiersList(Tiers tiers){
            this.tiers = tiers;
        }
    }
    
    global class ConceptAmount{
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double fixing {get;set;}
        global ConceptAmount(){}
        global ConceptAmount(Double amount, String tcurrency, Double fixing){
            this.amount = amount;
            this.tcurrency = tcurrency;
            this.fixing = fixing;
        }
    }
    
    global class TaxesInformation{
        @AuraEnabled
        global String customerTaxId {get;set;}
        @AuraEnabled
        global MainTax mainTax {get;set;}
        @AuraEnabled
        global ConceptListResponse conceptListResponse {get;set;}
        global TaxesInformation(){}
        global TaxesInformation(String customerTaxId, MainTax mainTax, ConceptListResponse conceptListResponse){
            this.customerTaxId = customerTaxId;
            this.mainTax = mainTax;
            this.conceptListResponse = conceptListResponse;
        }
    }
    
    global class MainTax {
        @AuraEnabled
        global String name {get;set;}
        @AuraEnabled
        global String ttype {get;set;} //type
        @AuraEnabled
        global Double rate {get;set;}
        @AuraEnabled
        global TaxAmount taxAmount {get;set;}
        global MainTax(){}
        global MainTax(String name, String ttype, Double rate, TaxAmount taxAmount){
            this.name = name;
            this.ttype = ttype;
            this.rate = rate;
            this.taxAmount = taxAmount;
        }
    }
    
    global class TaxAmount{
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        global TaxAmount(){}
        global TaxAmount(String tcurrency, Double amount){
            this.tcurrency = tcurrency;
            this.amount = amount;
        }
    } 
    
    global class ConceptListResponse{
        @AuraEnabled
        global ConceptList conceptList {get;set;}
        global ConceptListResponse(){}
        global ConceptListResponse(ConceptList conceptList){
            this.conceptList = conceptList;
        }
    }
    
    global class ConceptList{
        @AuraEnabled
        global String conceptId {get;set;}
        @AuraEnabled
        global BaseAmount baseAmount {get;set;}
        @AuraEnabled
        global ConceptTax conceptTax {get;set;}
        global ConceptList(){}
        global ConceptList(String conceptId, BaseAmount baseAmount, ConceptTax conceptTax){
            this.conceptId = conceptId;
            this.baseAmount = baseAmount;
            this.conceptTax = conceptTax;
        }
    }
    
    global class BaseAmount {
        @AuraEnabled
        global Double amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        global baseAmount(){}
        global baseAmount(String tcurrency, Double amount){
            this.tcurrency = tcurrency;
            this.amount = amount;
        }
    }
    
    global class ConceptTax {
        @AuraEnabled
        global String name {get;set;}
        @AuraEnabled
        global String ttype {get;set;} //type
        @AuraEnabled
        global Double rate {get;set;}
        @AuraEnabled
        global TaxAmount taxAmount {get;set;}
        global ConceptTax(){}
        global ConceptTax(String name, String ttype, Double rate, TaxAmount taxAmount){
            this.name = name;
            this.ttype = ttype;
            this.rate = rate;
            this.taxAmount = taxAmount;
        }
    }
    
    global class SourceTotalAmount {
        @AuraEnabled
        global String tcurrency {get;set;} //currency
        @AuraEnabled
        global Double amount {get;set;}
        global SourceTotalAmount(){}
        global SourceTotalAmount(String tcurrency, Double amount){
            this.tcurrency = tcurrency;
            this.amount = amount;
        }
    }
    
    global class VirtualAccountAmount {
        @AuraEnabled
        global String tcurrency {get;set;} //currency
        @AuraEnabled
        global Double amount {get;set;}        
        global VirtualAccountAmount(){}
        global VirtualAccountAmount(String tcurrency, Double amount){
            this.tcurrency = tcurrency;
            this.amount = amount;
        }
        
    }
    
    global WRAPPER_PaymentMetaData (){}
    
    global WRAPPER_PaymentMetaData (String accessChannel, PaymentDataArea PaymentDataArea){
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.customerId = customerId;
        this.accessChannel = accessChannel;
        this.PaymentDataArea = PaymentDataArea;
    } 
    
    global WRAPPER_PaymentMetaData (String documentType, String documentNumber, String customerId, String accessChannel, PaymentDataArea PaymentDataArea){
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.customerId = customerId;
        this.accessChannel = accessChannel;
        this.PaymentDataArea = PaymentDataArea;
    }  

}