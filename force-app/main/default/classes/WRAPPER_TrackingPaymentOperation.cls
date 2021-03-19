/*
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to create the body for the tracking operation PATCH
Test Class:     WRAPPER_TrackingPaymentOperation_Test
History:
<Date>          <Author>            <Description>
27/07/2020      Guillermo Giral     Initial version
14/08/2020      Bea Hill            Change ConceptsList to Concepts as they are the items of the list, change conceptId type from Integer to String
13/01/2021      Shahad Naji         Add OperationAmountBaseCurrency
04/02/2021      Candido             Added constructor to OperationDetail with new WS_TrackingPaymentOperation method's
19/02/2021		Shahad Naji			Added constructor within OperationDetail with new WS_TrackingPaymentOperation method's
*/
global class WRAPPER_TrackingPaymentOperation {
  global WRAPPER_TrackingPaymentOperation() {
    System.debug('WRAPPER_TrackingPaymentOperation');
  }

  global class INPUT {
    global InputData inputData;

    global INPUT(InputData inputData) {
      this.inputData = inputData;
    }

    global INPUT() {
    }
  }

  global class OUTPUT {
    global String response;

    global OUTPUT() {
    }
  }

  global class ConceptsList {
    global String conceptId;
    global String conceptName;
    global SpecialPrice specialPrice;
    global StandardPrice standardPrice;
    global ConceptAmount conceptAmount;

    global ConceptsList() {
    }
  }

  global class DestinationData {
    global String name;
    global String customerId;
    global String companyGlobalId;
    global DestinationAddress destinationAddress;
    global SourceAccount destinationAccount;
    global SourceAgent destinationAgent;
    global String country;
    global CreditorDocument creditorDocument;

    global DestinationData() {
    }

    global DestinationData(
      String name,
      String customerId,
      String companyGlobalId,
      DestinationAddress destinationAddress,
      SourceAccount destinationAccount,
      SourceAgent destinationAgent,
      String country
    ) {
      this.name = name;
      this.customerId = customerId;
      this.companyGlobalId = companyGlobalId;
      this.destinationAddress = destinationAddress;
      this.destinationAccount = destinationAccount;
      this.destinationAgent = destinationAgent;
      this.country = country;
    }
    global DestinationData(
      String name,
      String customerId,
      String companyGlobalId,
      DestinationAddress destinationAddress,
      SourceAccount destinationAccount,
      SourceAgent destinationAgent,
      String country,
      CreditorDocument creditorDocument
    ) {
      this.name = name;
      this.customerId = customerId;
      this.companyGlobalId = companyGlobalId;
      this.destinationAddress = destinationAddress;
      this.destinationAccount = destinationAccount;
      this.destinationAgent = destinationAgent;
      this.country = country;
      this.creditorDocument = creditorDocument;
    }
  }
  global class CreditorDocument {
    global String documentType;
    global String documentNumber;

    global CreditorDocument() {
    }

    global CreditorDocument(String documentType, String documentNumber) {
      this.documentType = documentType;
      this.documentNumber = documentNumber;
    }
  }

  global class OperationAmount {
    global String tcurrency;
    global Double amount;

    global OperationAmount() {
    }

    global OperationAmount(String tcurrency) {
      this.tcurrency = tcurrency;
    }
    global OperationAmount(String tcurrency, Double amount) {
      this.tcurrency = tcurrency;
      this.amount = amount;
    }
  }

  global class OperationAmountBaseCurrency {
    global String tcurrency;
    global Double amount;

    global operationAmountBaseCurrency() {
    }

    global OperationAmountBaseCurrency(String tcurrency, Double amount) {
      this.tcurrency = tcurrency;
      this.amount = amount;
    }
  }

  global class FxComercialMargin {
    global String fxComercialMarginCurrency;
    global Double fxComercialMarginAmount;

    global FxComercialMargin() {
    }
  }

  global class CounterValueOperationAmount {
    global String tcurrency;
    global Double amount;
    global String tradeCurrency;

    global CounterValueOperationAmount() {
    }

    global CounterValueOperationAmount(
      String tcurrency,
      Double amount,
      String tradeCurrency
    ) {
      this.tcurrency = tcurrency;
      this.amount = amount;
      this.tradeCurrency = tradeCurrency;
    }
  }

  global class OperationTracking {
    global String trackingOperationType;
    global String headers;
    global String resquestBody;
    global String responseBody;
    global String responseDate;
    global Integer responseCode;
    global String responseDescription;

    global OperationTracking() {
    }
  }

  global class SpecialFixedRatePrice {
    global Double specialRate;
    global Double specialMinimumAmount;
    global Double specialMaximumAmount;
    global String tcurrency;

    global SpecialFixedRatePrice() {
    }
  }

  global class OperationStep2Data {
    global String opStep2Id;
    global String status;
    global String valueDate;
    global String flowIndicator;
    global String uetr;

    global IntermediateAgentAccount intermediateAgentAccount;

    global OperationStep2Data() {
    }
  }

  global class OperationFraudDetails {
    global String fraudValidationResult;
    global String fraudReference;

    global OperationFraudDetails() {
    }
  }

  global class SourceAddress {
    global String streetName;
    global String townName;
    global String country;
    global String floor;
    global String state;

    global SourceAddress() {
    }

    global SourceAddress(String streetName, String townName, String country) {
      this.streetName = streetName;
      this.townName = townName;
      this.country = country;
    }
    global SourceAddress(
      String streetName,
      String floor,
      String townName,
      String state,
      String country
    ) {
      this.streetName = streetName;
      this.floor = floor;
      this.townName = townName;
      this.state = state;
      this.country = country;
    }
  }
  global class DestinationAddress {
    global String streetName;
    global String townName;
    global String country;
    global String floor;
    global String state;
    global String province;
    global String additionalInformation; //addressAddition

    global DestinationAddress() {
    }

    global DestinationAddress(
      String streetName,
      String floor,
      String townName,
      String state,
      String province,
      String country,
      String additionalInformation
    ) {
      this.streetName = streetName;
      this.floor = floor;
      this.townName = townName;
      this.state = state;
      this.province = province;
      this.country = country;
      this.additionalInformation = additionalInformation;
    }
  }

  global class SourceData {
    global String sourceName;
    global String customerId;
    global String companyGlobalId;
    global SourceAddress sourceAddress;
    global SourceAccount sourceAccount;
    global SourceAgent sourceAgent;
    global String country;

    global SourceData() {
    }

    global SourceData(
      String sourceName,
      String customerId,
      String companyGlobalId,
      SourceAddress sourceAddress,
      SourceAccount sourceAccount,
      SourceAgent sourceAgent,
      String country
    ) {
      this.sourceName = sourceName;
      this.customerId = customerId;
      this.companyGlobalId = companyGlobalId;
      this.sourceAddress = sourceAddress;
      this.sourceAccount = sourceAccount;
      this.sourceAgent = sourceAgent;
      this.country = country;
    }
  }

  global class OperationDetail {
    global String paymentMethod;
    global String serviceId;
    global String productId;
    global OperationStatus operationStatus;
    global SourceData sourceData;
    global SourceFeeData sourceFeeData;
    global DestinationData destinationData;
    global OperationStep1Data operationStep1Data;
    global OperationStep2Data operationStep2Data;
    global String issueDate;
    global String chargeBearer;
    global OperationAmount operationAmount;
    global OperationAmountBaseCurrency operationAmountBaseCurrency;
    global CounterValueOperationAmount counterValueOperationAmount;
    global OperationAmount sourceTotalAmount;
    global String clientReference;
    global String purpose;
    global String subject;
    global OperationFraudDetails operationFraudDetails;
    global OperationNominalFxDetails operationNominalFxDetails;
    global OperationFeesFxDetails operationFeesFxDetails;
    global OperationNominalFxRollbackDetails operationNominalFxRollbackDetails;
    global PricingDetails pricingDetails;
    global String commercialCode;
    global ReviewAdditionalData reviewAdditionalData;
    global RejectAdditionalData rejectAdditionalData;
    global String operationCurrency;

    global OperationDetail() {
    }

    global OperationDetail(
      String paymentMethod,
      OperationStatus operationStatus,
      SourceData sourceData,
      DestinationData destinationData,
      OperationStep1Data operationStep1Data,
      OperationStep2Data operationStep2Data,
      String issueDate,
      String chargeBearer,
      OperationAmount operationAmount,
      CounterValueOperationAmount counterValueOperationAmount,
      OperationAmount sourceTotalAmount,
      String clientReference,
      String purpose,
      String operationDescription,
      String subject,
      operationFraudDetails operationFraudDetails,
      operationNominalFxDetails operationNominalFxDetails,
      operationFeesFxDetails operationFeesFxDetails,
      OperationNominalFxRollbackDetails operationNominalFxRollbackDetails,
      PricingDetails pricingDetails
    ) {
      this.paymentMethod = paymentMethod;
      this.operationStatus = operationStatus;
      this.sourceData = sourceData;
      this.destinationData = destinationData;
      this.operationStep1Data = operationStep1Data;
      this.operationStep2Data = operationStep2Data;
      this.issueDate = issueDate;
      this.chargeBearer = chargeBearer;
      this.operationAmount = operationAmount;
      this.counterValueOperationAmount = counterValueOperationAmount;
      this.sourceTotalAmount = sourceTotalAmount;
      this.clientReference = clientReference;
      this.purpose = purpose;
      this.subject = subject;
      this.operationFraudDetails = operationFraudDetails;
      this.operationNominalFxDetails = operationNominalFxDetails;
      this.operationFeesFxDetails = operationFeesFxDetails;
      this.operationNominalFxRollbackDetails = operationNominalFxRollbackDetails;
      this.pricingDetails = pricingDetails;
    }

    global OperationDetail(
      String subject,
      String description,
      OperationAmount operationAmount,
      OperationStatus operationStatus
    ) {
      this.operationAmount = operationAmount;
      this.operationStatus = operationStatus;
    }

    global OperationDetail(OperationStatus operationStatus) {
      this.operationStatus = operationStatus;
    }

    global OperationDetail(
      OperationAmount operationAmount,
      CounterValueOperationAmount counterValueOperationAmount,
      OperationAmount sourceTotalAmount
    ) {
      this.operationAmount = operationAmount;
      this.counterValueOperationAmount = counterValueOperationAmount;
      this.sourceTotalAmount = sourceTotalAmount;
    }

    global OperationDetail(
      OperationAmount operationAmount,
      CounterValueOperationAmount counterValueOperationAmount,
      OperationAmount sourceTotalAmount,
      OperationNominalFxDetails operationNominalFxDetails
    ) {
      this.operationAmount = operationAmount;
      this.counterValueOperationAmount = counterValueOperationAmount;
      this.sourceTotalAmount = sourceTotalAmount;
      this.operationNominalFxDetails = operationNominalFxDetails;
    }

    global OperationDetail(PricingDetails pricingDetails) {
      this.pricingDetails = pricingDetails;
    }

    global OperationDetail(
      String clientReference,
      String purpose,
      String subject,
      String chargeBearer,
      String paymentMethod,
      String commercialCode
    ) {
      this.clientReference = clientReference;
      this.purpose = purpose;
      this.subject = subject;
      this.chargeBearer = chargeBearer;
      this.paymentMethod = paymentMethod;
      this.commercialCode = commercialCode;
    }
    global OperationDetail(
      String clientReference,
      String purpose,
      String subject,
      String chargeBearer,
      String paymentMethod,
      String commercialCode,
      String issueDate,
      OperationAmountBaseCurrency operationAmountBaseCurrency,
      String productId,
      String serviceId
    ) {
      this.clientReference = clientReference;
      this.purpose = purpose;
      this.subject = subject;
      this.chargeBearer = chargeBearer;
      this.paymentMethod = paymentMethod;
      this.commercialCode = commercialCode;
      this.issueDate = issueDate;
      this.operationAmountBaseCurrency = operationAmountBaseCurrency;
      this.productId = productId;
      this.serviceId = serviceId;
    }
    global OperationDetail(
      String clientReference,
      String purpose,
      String subject,
      String chargeBearer,
      String paymentMethod
    ) {
      this.clientReference = clientReference;
      this.purpose = purpose;
      this.subject = subject;
      this.chargeBearer = chargeBearer;
      this.paymentMethod = paymentMethod;
    }

    global OperationDetail(
      CounterValueOperationAmount counterValueOperationAmount,
      PricingDetails pricingDetails
    ) {
      this.counterValueOperationAmount = counterValueOperationAmount;
      this.pricingDetails = pricingDetails;
    }

    global OperationDetail(
      OperationAmount operationAmount,
      PricingDetails pricingDetails
    ) {
      this.operationAmount = operationAmount;
      this.pricingDetails = pricingDetails;
    }

    global OperationDetail(
      OperationAmount operationAmount,
      PricingDetails pricingDetails,
      OperationFeesFxDetails operationFeesFxDetails
    ) {
      this.operationAmount = operationAmount;
      this.pricingDetails = pricingDetails;
      this.operationFeesFxDetails = operationFeesFxDetails;
    }

    global OperationDetail(
      OperationAmount operationAmount,
      CounterValueOperationAmount counterValueOperationAmount,
      PricingDetails pricingDetails,
      OperationFeesFxDetails operationFeesFxDetails,
      OperationAmount sourceTotalAmount
    ) {
      this.operationAmount = operationAmount;
      this.counterValueOperationAmount = counterValueOperationAmount;
      this.pricingDetails = pricingDetails;
      this.operationFeesFxDetails = operationFeesFxDetails;
      this.sourceTotalAmount = sourceTotalAmount;
    }

    global OperationDetail(
      OperationAmount operationAmount,
      CounterValueOperationAmount counterValueOperationAmount,
      PricingDetails pricingDetails,
      OperationFeesFxDetails operationFeesFxDetails
    ) {
      this.operationAmount = operationAmount;
      this.counterValueOperationAmount = counterValueOperationAmount;
      this.pricingDetails = pricingDetails;
      this.operationFeesFxDetails = operationFeesFxDetails;
    }
    global OperationDetail(
      OperationStatus operationStatus,
      RejectAdditionalData rejectAdditionalData
    ) {
      this.operationStatus = operationStatus;
      this.rejectAdditionalData = rejectAdditionalData;
    }
    global OperationDetail(
      OperationStatus operationStatus,
      ReviewAdditionalData reviewAdditionalData
    ) {
      this.operationStatus = operationStatus;
      this.reviewAdditionalData = reviewAdditionalData;
    }
    global OperationDetail(
      SourceData sourceData,
      DestinationData destinationData,
      SourceFeeData sourceFeeData
    ) {
      this.sourceData = sourceData;
      this.destinationData = destinationData;
      this.sourceFeeData = sourceFeeData;
    }
    global OperationDetail(
      SourceData sourceData,
      DestinationData destinationData,
      SourceFeeData sourceFeeData,
      OperationAmount operationAmount
    ) {
      this.sourceData = sourceData;
      this.destinationData = destinationData;
      this.sourceFeeData = sourceFeeData;
      this.operationAmount = operationAmount;
    }
    global OperationDetail(SourceData sourceData, SourceFeeData sourceFeeData) {
      this.sourceData = sourceData;
      this.sourceFeeData = sourceFeeData;
    }
  }

  global class IntermediateAgentAccount {
    global String accountType;
    global String accountId;

    global IntermediateAgentAccount() {
    }
  }

  global class OperationNominalFxDetails {
    global String fxCountervalueId;
    global String priceType;
    global Integer discount;
    global CcyCountervalue ccyCountervalue;
    global String valueDateEfx;
    global Double customerExchangeRate;
    global FxComercialMargin fxComercialMargin;
    global NominalAmountNoMarkUp nominalAmountNoMarkUp;

    global OperationNominalFxDetails() {
    }
  }

  global class OperationStatus {
    global String status;
    global String reason;
    global String statusDate;
    global String globalUserId;

    global OperationStatus() {
    }

    global OperationStatus(String status, String reason, String statusDate) {
      this.status = status;
      this.reason = reason;
      this.statusDate = statusDate;
    }

    global OperationStatus(
      String status,
      String reason,
      String statusDate,
      String globalUserId
    ) {
      this.status = status;
      this.reason = reason;
      this.statusDate = statusDate;
      this.globalUserId = globalUserId;
    }

    global OperationStatus(String status, String reason) {
      this.status = status;
      this.reason = reason;
    }

    global OperationStatus(String status) {
      this.status = status;
    }
  }

  global class SpecialFixedAmountPrice {
    global Double specialFixedAmount;
    global String tcurrency;

    global SpecialFixedAmountPrice() {
    }
  }

  global class PricingDetails {
    global String productName;
    global Double totalPrice;
    global String tcurrency;
    global List<CurrencyList> currencyList;

    global PricingDetails() {
    }

    global PricingDetails(Double totalPrice, String tcurrency) {
      this.totalPrice = totalPrice;
      this.tcurrency = tcurrency;
    }

    global PricingDetails(
      String productName,
      Double totalPrice,
      String tcurrency,
      List<CurrencyList> currencyList
    ) {
      this.productName = productName;
      this.totalPrice = totalPrice;
      this.tcurrency = tcurrency;
      this.currencyList = currencyList;
    }
  }

  global class CcyCountervalue {
    global Double ccyCountervalueAmount;
    global String ccyCountervalueCurrency;

    global CcyCountervalue() {
    }

    global CcyCountervalue(
      Double ccyCountervalueAmount,
      String ccyCountervalueCurrency
    ) {
      this.ccyCountervalueAmount = ccyCountervalueAmount;
      this.ccyCountervalueCurrency = ccyCountervalueCurrency;
    }
  }

  global class InputData {
    global OperationDetail operationDetail;
    global RefundDetails refundDetails;
    global List<OperationTracking> operationTracking;

    global InputData() {
    }

    global InputData(OperationDetail operationDetail) {
      this.operationDetail = operationDetail;
    }
  }

  global class CurrencyList {
    global String tcurrency;
    global String currencyName;
    global List<ConceptsList> conceptsList;

    global CurrencyList() {
    }

    global CurrencyList(String tcurrency) {
      this.tcurrency = tcurrency;
    }
  }

  global class StandardFixedRatePrice {
    global Double standardRate;
    global Double standardMinimumAmount;
    global Double standardMaximumAmount;
    global String tcurrency;

    global StandardFixedRatePrice() {
    }
  }

  global class SourceAccount {
    global String accountType;
    global String accountId;
    global String tcurrency;

    global SourceAccount() {
    }

    global SourceAccount(
      String accountType,
      String accountId,
      String tcurrency
    ) {
      this.accountType = accountType;
      this.accountId = accountId;
      this.tcurrency = tcurrency;
    }
  }

  global class SpecialPrice {
    global String specialPriceLevel;
    global List<SpecialTiersList> specialTiersList;

    global SpecialPrice() {
    }
  }

  global class RefundDetails {
    global String globalUserId;
    global String authUserId;
    global String authDate;
    global String authComments;
    global String creationDate;
    global String refundType;
    global NominalAmountNoMarkUp refundAmount;
    global String status;
    global String reason;
    global String comments;
    global String refundDate;
    global OperationNominalFxDetails operationNominalFxRefundDetails;
    global OperationFeesFxDetails operationFeesFxRefundDetails;

    global RefundDetails() {
    }
  }

  global class StandardPrice {
    global List<StandardTiersList> standardTiersList;

    global StandardPrice() {
    }
  }

  global class SpecialTiersList {
    global Double specialAmountTier;
    global String specialAmountTierType;
    global SpecialFixedRatePrice specialFixedRatePrice;
    global SpecialFixedAmountPrice specialFixedAmountPrice;

    global SpecialTiersList() {
    }
  }

  global class NominalAmountNoMarkUp {
    global Double amount;
    global String tcurrency;

    global NominalAmountNoMarkUp() {
    }
  }

  global class ConceptAmount {
    global Double amount;
    global String tcurrency;
    global Double fixing;

    global ConceptAmount() {
    }
  }

  global class StandardFixedAmountPrice {
    global Double standardFixedAmount;
    global String tcurrency;

    global StandardFixedAmountPrice() {
    }
  }

  global class StandardTiersList {
    global Double standardAmountTier;
    global String standardAmountTierType;
    global StandardFixedRatePrice standardFixedRatePrice;
    global StandardFixedAmountPrice standardFixedAmountPrice;

    global StandardTiersList() {
    }
  }

  global class SourceAgent {
    global String agentId;
    global String name;
    global String address;

    global SourceAgent() {
    }

    global SourceAgent(String agentId, String name, String address) {
      this.agentId = agentId;
      this.name = name;
      this.address = address;
    }
  }

  global class OperationStep1Data {
    global String opStep1Id;
    global String status;
    global String valueDate;
    global String flowIndicator;
    global IntermediateAgentAccount intermediateAgentAccount;

    global OperationStep1Data() {
    }
  }

  global InputData inputData;

  global class OperationFeesFxDetails {
    global String fxCountervalueId;
    global String priceType;
    global Integer discount;
    global CcyCountervalue ccyCountervalue;
    global String valueDateEfx;
    global Double customerExchangeRate;

    global OperationFeesFxDetails() {
    }

    global OperationFeesFxDetails(
      String fxCountervalueId,
      String priceType,
      Integer discount,
      CcyCountervalue ccyCountervalue,
      String valueDateEfx,
      Double customerExchangeRate
    ) {
      this.fxCountervalueId = fxCountervalueId;
      this.priceType = priceType;
      this.discount = discount;
      this.ccyCountervalue = ccyCountervalue;
      this.valueDateEfx = valueDateEfx;
      this.customerExchangeRate = customerExchangeRate;
    }
  }

  global class OperationNominalFxRollbackDetails {
    global String fxCountervalueId;
    global String priceType;
    global CcyCountervalue ccyCountervalue;
    global String valueDateEfx;
    global Double customerExchangeRate;

    global OperationNominalFxRollbackDetails() {
    }

    global OperationNominalFxRollbackDetails(
      String fxCountervalueId,
      String priceType,
      CcyCountervalue ccyCountervalue,
      String valueDateEfx,
      Double customerExchangeRate
    ) {
      this.fxCountervalueId = fxCountervalueId;
      this.priceType = priceType;
      this.ccyCountervalue = ccyCountervalue;
      this.valueDateEfx = valueDateEfx;
      this.customerExchangeRate = customerExchangeRate;
    }
  }

  global class ReviewAdditionalData {
    global String subject;
    global String description;

    global ReviewAdditionalData() {
    }

    global ReviewAdditionalData(String subject, String description) {
      this.subject = subject;
      this.description = description;
    }
  }

  global class RejectAdditionalData {
    global String subject;
    global String description;

    global RejectAdditionalData() {
    }

    global RejectAdditionalData(String subject, String description) {
      this.subject = subject;
      this.description = description;
    }
  }

  global class SourceFeeData {
    global String sourceName;
    global SourceAccount sourceAccount;
    global SourceAgent sourceAgent;
    global String country;

    global SourceFeeData() {
    }

    global SourceFeeData(
      String sourceName,
      SourceAccount sourceAccount,
      SourceAgent sourceAgent,
      String country
    ) {
      this.sourceName = sourceName;
      this.sourceAccount = sourceAccount;
      this.sourceAgent = sourceAgent;
      this.country = country;
    }
  }

  global static WRAPPER_TrackingPaymentOperation parse(String json) {
    return (WRAPPER_TrackingPaymentOperation) System.JSON.deserialize(
      json,
      WRAPPER_TrackingPaymentOperation.class
    );
  }
}
