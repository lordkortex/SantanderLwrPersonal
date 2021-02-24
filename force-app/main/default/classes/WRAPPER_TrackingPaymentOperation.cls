/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Wrapper class to create the body for the tracking operation PATCH
Test Class:     WRAPPER_TrackingPaymentOperation_Test
History
<Date>			<Author>		<Description>
27/07/2020      Guillermo Giral        Initial version
14/08/2020		Bea Hill			Change ConceptsList to Concepts as they are the items of the list, change conceptId type from Integer to String 
----------------------------------------------------------------------------------*/
global class WRAPPER_TrackingPaymentOperation {
    
    global WRAPPER_TrackingPaymentOperation(){
        System.debug('WRAPPER_TrackingPaymentOperation');
    }
    
    global class INPUT {

        global InputData inputData;

        global INPUT (InputData inputData) {
            this.inputData = inputData;
		}       

		global INPUT () {}       
    }

    global class OUTPUT {
		global String response; 

		global OUTPUT () {}     
    }

    global class ConceptsList {
		global String conceptId;
		global String conceptName;
		global SpecialPrice specialPrice;
		global StandardPrice standardPrice;
		global ConceptAmount conceptAmount;

		global ConceptsList () {}  
	}

	global class DestinationData {
		global String name;
		global SourceAddress destinationAddress;
		global SourceAccount destinationAccount;
		global SourceAgent destinationAgent;
		global String country;

		global DestinationData () {}  
	}

	global class OperationAmount {      
		global String tcurrency;
        global Double amount;
        
        global OperationAmount (String tcurrency, Double amount){
            this.tcurrency = tcurrency;
            this.amount = amount;
		}
		
		global OperationAmount () {}  
	}

	global class FxComercialMargin {
		global String fxComercialMarginCurrency;
		global Double fxComercialMarginAmount;

		global FxComercialMargin () {}  
	}

	global class CounterValueOperationAmount {
		global String tcurrency;
		global Double amount;
		global String tradeCurrency;

		global CounterValueOperationAmount (String tcurrency, Double amount, String tradeCurrency){
            this.tcurrency = tcurrency;
			this.amount = amount;
			this.tradeCurrency = tradeCurrency;
		}
		
		global CounterValueOperationAmount () {}  
	}

	global class OperationTracking {
		global String trackingOperationType;
		global String headers;
		global String resquestBody;
		global String responseBody;
		global String responseDate;
		global Integer responseCode;
		global String responseDescription;

		global OperationTracking () {}  
	}

	global class SpecialFixedRatePrice {
		global Double specialRate;
		global Integer specialMinimumAmount;
		global Integer specialMaximumAmount;
		global String tcurrency;

		global SpecialFixedRatePrice () {}  
	}

	global class OperationStep2Data {
		global String opStep2Id;
		global String status;
		global String valueDate;
		global String flowIndicator;
		global IntermediateAgentAccount intermediateAgentAccount;

		global OperationStep2Data () {}  
	}

	global class OperationFraudDetails {
		global String fraudValidationResult;
		global String fraudReference;

		global OperationFraudDetails () {}  
	}
    
    global class SourceAddress {
		global String streetName;
		global String townName;
		global String country;
        global SourceAddress () {}  
	}

	global class SourceData {
		global String name;
		global String customerId;
		global SourceAddress sourceAddress;
		global SourceAccount sourceAccount;
		global SourceAgent sourceAgent;
		global String country;

		global SourceData () {}  
	}

	global class OperationDetail {
		global String paymentMethod;
		// global String operationType;
		// global String serviceId;
		// global String userGlobalId;
		global OperationStatus operationStatus;
		global SourceData sourceData;
		global DestinationData destinationData;
		global OperationStep1Data operationStep1Data;
		global OperationStep2Data operationStep2Data;
		global String issueDate;
		global String chargeBearer;
		global OperationAmount operationAmount;
		global CounterValueOperationAmount counterValueOperationAmount;
		global OperationAmount sourceTotalAmount;
		global String clientReference;
		global String purpose;
		// global String operationDescription;
		global String subject;
		global OperationFraudDetails operationFraudDetails;
		global OperationNominalFxDetails operationNominalFxDetails;
		global OperationFeesFxDetails operationFeesFxDetails;
		global OperationNominalFxRollbackDetails operationNominalFxRollbackDetails;
		global PricingDetails pricingDetails;
		global String commercialCode;
		global ReviewAdditionalData reviewAdditionalData;
		global RejectAdditionalData rejectAdditionalData;

        global OperationDetail () {
            System.debug('WRAPPER_TrackingPaymentOperation.OperationDetail');
        }

        global OperationDetail (String paymentMethod, OperationStatus operationStatus, SourceData sourceData, 
                                DestinationData destinationData, OperationStep1Data operationStep1Data, OperationStep2Data operationStep2Data, String issueDate, 
                                String chargeBearer, OperationAmount operationAmount, CounterValueOperationAmount counterValueOperationAmount,
                                OperationAmount sourceTotalAmount, String clientReference, String purpose, String operationDescription, String subject,
								operationFraudDetails operationFraudDetails, operationNominalFxDetails operationNominalFxDetails, operationFeesFxDetails operationFeesFxDetails,
								OperationNominalFxRollbackDetails operationNominalFxRollbackDetails,
                                PricingDetails pricingDetails) {
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
            // this.operationDescription = operationDescription;
            this.subject = subject;
            this.operationFraudDetails = operationFraudDetails;
            this.operationNominalFxDetails = operationNominalFxDetails;
			this.operationFeesFxDetails = operationFeesFxDetails;
			this.operationNominalFxRollbackDetails = operationNominalFxRollbackDetails;
            this.pricingDetails = pricingDetails;
        }

        global OperationDetail (String subject, String description, OperationAmount operationAmount, OperationStatus operationStatus) {
            // this.subject = subject;
            // this.operationDescription = description;
            this.operationAmount = operationAmount;
            this.operationStatus = operationStatus;
		}
		
		// global OperationDetail (String clientReference, String purpose, String description, OperationStatus operationStatus) {
        //     this.clientReference = clientReference;
		// 	this.purpose = purpose;
		// 	this.operationDescription = description;
        //     this.operationStatus = operationStatus;
		// }

		global OperationDetail (OperationStatus operationStatus) {
            this.operationStatus = operationStatus;
		}

		global OperationDetail (String clientReference, String purpose, String subject, String chargeBearer, String paymentMethod, String commercialCode) {
            this.clientReference = clientReference;
			this.purpose = purpose;
			this.subject = subject;
			this.chargeBearer = chargeBearer;
			this.paymentMethod = paymentMethod;
			this.commercialCode = commercialCode;
		}

		global OperationDetail (String clientReference, String purpose, String subject, String chargeBearer, String paymentMethod) {
			this.clientReference = clientReference;
			this.purpose = purpose;
			this.subject = subject;
			this.chargeBearer = chargeBearer;
			this.paymentMethod = paymentMethod;
		}


		global OperationDetail (CounterValueOperationAmount counterValueOperationAmount, PricingDetails pricingDetails) {
            this.counterValueOperationAmount = counterValueOperationAmount;
			this.pricingDetails = pricingDetails;
		}

		global OperationDetail (OperationAmount operationAmount, PricingDetails pricingDetails) {
            this.operationAmount = operationAmount;
			this.pricingDetails = pricingDetails;
		}

		global OperationDetail (OperationAmount operationAmount, PricingDetails pricingDetails, OperationFeesFxDetails operationFeesFxDetails) {
            this.operationAmount = operationAmount;
			this.pricingDetails = pricingDetails;
			this.operationFeesFxDetails = operationFeesFxDetails;
		}

		global OperationDetail (OperationAmount operationAmount, CounterValueOperationAmount counterValueOperationAmount, PricingDetails pricingDetails, OperationFeesFxDetails operationFeesFxDetails) {
			this.operationAmount = operationAmount;
			this.counterValueOperationAmount = counterValueOperationAmount; 
			this.pricingDetails = pricingDetails;
			this.operationFeesFxDetails = operationFeesFxDetails;
		}
		global OperationDetail (OperationStatus operationStatus, RejectAdditionalData rejectAdditionalData ) {
			this.operationStatus = operationStatus;
			this.rejectAdditionalData = rejectAdditionalData;
		}
		global OperationDetail (OperationStatus operationStatus, ReviewAdditionalData reviewAdditionalData ) {
			this.operationStatus = operationStatus;
			this.reviewAdditionalData = reviewAdditionalData;
		}
		
	}

	global class IntermediateAgentAccount {
		global String accountType;
		global String accountId;

        global IntermediateAgentAccount () {
            System.debug('WRAPPER_TrackingPaymentOperation.IntermediateAgentAccount');
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
        
        global OperationNominalFxDetails () {
            System.debug('WRAPPER_TrackingPaymentOperation.OperationNominalFxDetails');
        }
	}

	global class OperationStatus {
        global String status;
		global String reason;
		global String statusDate;
		global String globalUserId;

        global OperationStatus () {
            System.debug('WRAPPER_TrackingPaymentOperation.OperationStatus');
        }

        global OperationStatus (String status, String reason, String statusDate){
            this.status = status;
            this.reason = reason;
            this.statusDate = statusDate;
		}

		global OperationStatus (String status, String reason, String statusDate, String globalUserId){
            this.status = status;
            this.reason = reason;
			this.statusDate = statusDate;
			this.globalUserId = globalUserId;
		}

		global OperationStatus (String status, String reason){
            this.status = status;
            this.reason = reason;
		}
		
		global OperationStatus (String status){
            this.status = status;
        }
	}

	global class SpecialFixedAmountPrice {
		global Integer specialFixedAmount;
		global String tcurrency;
        
        global SpecialFixedAmountPrice () {
            System.debug('WRAPPER_TrackingPaymentOperation.SpecialFixedAmountPrice');
        }
	}

	global class PricingDetails {
		global String productName;
		global Double totalPrice;
		global String tcurrency;
		global List<CurrencyList> currencyList;

        global PricingDetails () {
            System.debug('WRAPPER_TrackingPaymentOperation.PricingDetails');
        }

		global PricingDetails (Double totalPrice, String tcurrency){
			this.totalPrice = totalPrice;
			this.tcurrency = tcurrency;
		}

		global PricingDetails (String productName, Double totalPrice, String tcurrency, List<CurrencyList> currencyList ){
			this.productName = productName;
			this.totalPrice = totalPrice;
			this.tcurrency = tcurrency;
			this.currencyList = currencyList;
        }
	}

	global class CcyCountervalue {
		global Double ccyCountervalueAmount;
		global String ccyCountervalueCurrency;
        
        global CcyCountervalue () {
            System.debug('WRAPPER_TrackingPaymentOperation.CcyCountervalue');
		}
		
		global CcyCountervalue (Double ccyCountervalueAmount, String ccyCountervalueCurrency) {
			this.ccyCountervalueAmount = ccyCountervalueAmount;
			this.ccyCountervalueCurrency = ccyCountervalueCurrency;
		}
	}

	global class InputData {
		global OperationDetail operationDetail;
		//global String customerIndicator;
		global RefundDetails refundDetails;
		global List<OperationTracking> operationTracking;

        global InputData () {
            System.debug('WRAPPER_TrackingPaymentOperation.InputData');
        }
        
		global InputData (OperationDetail operationDetail){
            this.operationDetail = operationDetail;
		}
	}

	global class CurrencyList {
		global String tcurrency;
		global String currencyName;
		global List<ConceptsList> conceptsList;

        global CurrencyList () {
            System.debug('WRAPPER_TrackingPaymentOperation.CurrencyList');
        }
        
		global CurrencyList (String tcurrency) {
            this.tcurrency = tcurrency;
		}
	}

	global class StandardFixedRatePrice {
		global Double standardRate;
		global Integer standardMinimumAmount;
		global Integer standardMaximumAmount;
		global String tcurrency;
        
        global StandardFixedRatePrice () {
            System.debug('WRAPPER_TrackingPaymentOperation.StandardFixedRatePrice');
        }
	}

	global class SourceAccount {
		global String accountType;
		global String accountId;
		global String tcurrency;
        
        global SourceAccount () {
            System.debug('WRAPPER_TrackingPaymentOperation.SourceAccount');
        }
	}

	global class SpecialPrice {
		global String specialPriceLevel;
		global List<SpecialTiersList> specialTiersList;
        
        global SpecialPrice () {
            System.debug('WRAPPER_TrackingPaymentOperation.SpecialPrice');
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

        
        global RefundDetails () {
            System.debug('WRAPPER_TrackingPaymentOperation.RefundDetails');
        }
	}

	global class StandardPrice {
		global List<StandardTiersList> standardTiersList;
        
        global StandardPrice () {
            System.debug('WRAPPER_TrackingPaymentOperation.StandardPrice');
        }
	}

	global class SpecialTiersList {
		global Double specialAmountTier;
		global String specialAmountTierType;
		global SpecialFixedRatePrice specialFixedRatePrice;
		global SpecialFixedAmountPrice specialFixedAmountPrice;
        
        global SpecialTiersList () {
            System.debug('WRAPPER_TrackingPaymentOperation.SpecialTiersList');
        }
	}

	global class NominalAmountNoMarkUp {
		global Double amount;
		global String tcurrency;
        
        global NominalAmountNoMarkUp () {
            System.debug('WRAPPER_TrackingPaymentOperation.NominalAmountNoMarkUp');
        }
	}

	global class ConceptAmount {
		global Double amount;
		global String tcurrency;
		global Double fixing;
        
        global ConceptAmount () {
            System.debug('WRAPPER_TrackingPaymentOperation.ConceptAmount');
        }
	}

	global class StandardFixedAmountPrice {
		global Double standardFixedAmount;
		global String tcurrency;
        
        global StandardFixedAmountPrice () {
            System.debug('WRAPPER_TrackingPaymentOperation.StandardFixedAmountPrice');
        }
	}

	global class StandardTiersList {
		global Double standardAmountTier;
		global String standardAmountTierType;
		global StandardFixedRatePrice standardFixedRatePrice;
		global StandardFixedAmountPrice standardFixedAmountPrice;
        
        global StandardTiersList () {
            System.debug('WRAPPER_TrackingPaymentOperation.StandardTiersList');
        }
	}

	global class SourceAgent {
		global String agentId;
		global String name;
		global String address;
        
        global SourceAgent () {
            System.debug('WRAPPER_TrackingPaymentOperation.SourceAgent');
        }
	}

	global class OperationStep1Data {
		global String opStep1Id;
		global String status;
		global String valueDate;
		global String flowIndicator;
		global IntermediateAgentAccount intermediateAgentAccount;
        
        global OperationStep1Data () {
            System.debug('WRAPPER_TrackingPaymentOperation.OperationStep1Data');
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
        
        global OperationFeesFxDetails () {
            System.debug('WRAPPER_TrackingPaymentOperation.OperationFeesFxDetails');
		}

		global OperationFeesFxDetails (String fxCountervalueId, String priceType, Integer discount, CcyCountervalue ccyCountervalue, String valueDateEfx, Double customerExchangeRate) {
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
        
        global OperationNominalFxRollbackDetails () {
            System.debug('WRAPPER_TrackingPaymentOperation.OperationNominalFxRollbackDetails');
		}

		global OperationNominalFxRollbackDetails (String fxCountervalueId, String priceType, CcyCountervalue ccyCountervalue, String valueDateEfx, Double customerExchangeRate) {
			this.fxCountervalueId = fxCountervalueId;
			this.priceType = priceType;
			this.ccyCountervalue = ccyCountervalue;
			this.valueDateEfx = valueDateEfx;
			this.customerExchangeRate = customerExchangeRate;
		}
	}

	global class ReviewAdditionalData{
		global String subject;
		global String description;
		global ReviewAdditionalData() {
            System.debug('WRAPPER_TrackingPaymentOperation.ReviewAdditionalData');
		}
		global ReviewAdditionalData(String subject, String description){
			this.subject = subject;
			this.description = description;
		}
	}
	global class RejectAdditionalData{
		global String subject;
		global String description;
		global RejectAdditionalData() {
            System.debug('WRAPPER_TrackingPaymentOperation.RejectAdditionalData');
		}
		global RejectAdditionalData(String subject, String description){
			this.subject = subject;
			this.description = description;
		}
	}
	

	
	global static WRAPPER_TrackingPaymentOperation parse(String json) {
		return (WRAPPER_TrackingPaymentOperation) System.JSON.deserialize(json, WRAPPER_TrackingPaymentOperation.class);
	}
}