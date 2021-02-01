global class WS_B2B_Orchestation {
    
    global static OrchestationOutput OrchestationOutput;

    global String paymentId; 
    
    global String setPaymentId (String paymentId) {
        return this.paymentId = paymentId;
    }
    
    global class OrchestationOutput {
        @AuraEnabled
        global String code {get;set;}
        @AuraEnabled
        global String message {get;set;}
        @AuraEnabled
        global String level {get;set;}
        @AuraEnabled
        global String description {get;set;}
        @AuraEnabled
        global List<OrcErrors> errors {get;set;}
        
        global orchestationOutput () {
        }
    }

    global with sharing class OrcErrors {
        @AuraEnabled
        global String code {get;set;}
        @AuraEnabled
        global String message {get;set;}
        @AuraEnabled
        global String level {get;set;}
        @AuraEnabled
        global String description {get;set;}

        global OrcErrors () {
        }
    }
  
    global class FxCommercialMargin {
        @AuraEnabled
        global String fxCommercialMarginAmount {get;set;}
        @AuraEnabled
        global String fxCommercialMarginCurrency {get;set;}
        
        global FxCommercialMargin () {
        }
    }
    
    global class DestinationAgent {
        @AuraEnabled
        global String agent {get;set;}
        @AuraEnabled
        global String agentName {get;set;}
        @AuraEnabled
        global String addressAgent {get;set;}
        
        global DestinationAgent () {
        }
    }
    
    global class IntermediateAgent {
        @AuraEnabled
        global String addressAgent {get;set;}
        @AuraEnabled
        global String agent {get;set;}
        @AuraEnabled
        global String agentName {get;set;}
        @AuraEnabled
        global DestinationAccount intermediateAccount {get;set;}
        
        global IntermediateAgent () {
        }
    }
    
    global class PaymentAmount {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String amount {get;set;}
        
        global PaymentAmount () {
        }
    }

    global class CountervaluePaymentAmount {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String amount {get;set;}
        @AuraEnabled
        global String tradeCurrency {get;set;}
        
        global CountervaluePaymentAmount () {
        }
    }
    
    global class BuyNominal {
        @AuraEnabled
        global String buyNominalAmount {get;set;}
        @AuraEnabled
        global String buyNominalCurrency {get;set;}
        
        global BuyNominal () {
        }
        
        global BuyNominal (String buyNominalAmount, String buyNominalCurrency) {
            this.buyNominalAmount = buyNominalAmount;
            this.buyNominalCurrency = buyNominalCurrency;
        }
    }
    
    global class SellNominal {
        @AuraEnabled
        global String sellNominalAmount {get;set;}
        @AuraEnabled
        global String sellNominalCurrency {get;set;}
        
        global SellNominal () {
        }
        
        global SellNominal (String sellNominalAmount, String sellNominalCurrency) {
            this.sellNominalAmount = sellNominalAmount;
            this.sellNominalCurrency = sellNominalCurrency;
        }
    }
    
    global class PaymentFraudDetails {
        @AuraEnabled
        global String fraudValidationResult {get;set;}
        @AuraEnabled
        global String fraudReference {get;set;}
        
        global PaymentFraudDetails () {
        }
    }

    global class DataCancelConfirmFx {
        @AuraEnabled
        global String priceType {get;set;}
        @AuraEnabled
        global SellNominal sellNominal {get;set;}
        @AuraEnabled
        global BuyNominal buyNominal {get;set;}
        @AuraEnabled
        global String valueDateRequested {get;set;}
        @AuraEnabled
        global String operationReference {get;set;}
        
        global DataCancelConfirmFx () {
        }
    }
    
    global class FxValueDetailsNominal {
        @AuraEnabled
        global String fxContravalueId {get;set;}
        @AuraEnabled
        global FxCommercialMargin fxCommercialMargin {get;set;}
        @AuraEnabled
        global PaymentAmount fxCounterpaymentAmount {get;set;}
        @AuraEnabled
        global String fxExecutionDate {get;set;}
        @AuraEnabled
        global String fxValueDate {get;set;}
        @AuraEnabled
        global String fxExchangeRate {get;set;}
        
        global FxValueDetailsNominal () {
        }
    }
    
    global class DestinationAccount {
        @AuraEnabled
        global String accountIdType {get;set;}
        @AuraEnabled
        global String accountId {get;set;}
        
        global DestinationAccount () {
        }
    }
    
    global class FxValueDetailsFee {
        @AuraEnabled
        global FxCommercialMargin fxCommercialMargin {get;set;}
        @AuraEnabled
        global String fxContravalueId {get;set;}
        @AuraEnabled
        global FxCommercialMargin fxCounterpaymentAmount {get;set;}
        @AuraEnabled
        global String fxExchangeRate {get;set;}
        @AuraEnabled
        global String fxExecutionDate {get;set;}
        @AuraEnabled
        global String fxValueDate {get;set;}
        
        global FxValueDetailsFee () {
        }
    }
    
    global class Tiers {
        @AuraEnabled
		global Double amountTier {get;set;}
        @AuraEnabled
		global String amountTierType {get;set;}
        @AuraEnabled
		global FixedAmountPrice fixedAmountPrice {get;set;}
        @AuraEnabled
		global FixedRatePrice fixedRatePrice {get;set;}
        
        global Tiers () {
        }
	}

	global class Concepts {
        @AuraEnabled
		global ConceptAmount conceptAmount {get;set;}
        @AuraEnabled
		global String conceptId {get;set;}
        @AuraEnabled
		global String conceptName {get;set;}
        @AuraEnabled
		global SpecialPrice specialPrice {get;set;}
        @AuraEnabled
		global StandardPrice standardPrice {get;set;}
        
        global Concepts () {
        }
	}


	global class ConceptAmount {
        @AuraEnabled
		global String amount {get;set;}
        @AuraEnabled
		global String tcurrency {get;set;}
        @AuraEnabled
		global Integer fixing {get;set;}
        
        global ConceptAmount () {
        }
	}

	global class SpecialPrice {
        @AuraEnabled
		global String specialPriceLevel {get;set;}
        @AuraEnabled
		global List<Tiers> specialTiersList {get;set;}

        global SpecialPrice () {
        }
	}

	global class StandardPrice {
        @AuraEnabled
		global List<Tiers> standardTiersList {get;set;}
        
        global StandardPrice () {
        }
	}

	global class FixedAmountPrice {
        @AuraEnabled
		global String amount {get;set;}
        @AuraEnabled
		global String tcurrency {get;set;}
        
        global FixedAmountPrice () {
        }
	}

	global class FixedRatePrice {
        @AuraEnabled
		global String tcurrency {get;set;}
        @AuraEnabled
		global Double maximumAmount {get;set;}
        @AuraEnabled
		global Integer minimumAmount {get;set;}
        @AuraEnabled
		global Integer rate {get;set;}

        global FixedRatePrice () {
        }
	}

	global class FundMovementPricesDataList {
        @AuraEnabled
		global CurrencyDetails currencyDetails {get;set;}
        
        global FundMovementPricesDataList () {
        }
	}
    
    global class DestinationAddress {
        @AuraEnabled
		global String streetName {get;set;}
        @AuraEnabled
		global String townName {get;set;}
        @AuraEnabled
        global String country {get;set;}

        global DestinationAddress () {
        }
	}

	global class CurrencyDetails {
        @AuraEnabled
		global List<Concepts> conceptsList {get;set;}
        @AuraEnabled
		global String tcurrency {get;set;}
        @AuraEnabled
		global String currencyName {get;set;}
        
        global CurrencyDetails () {
        }
	}
    
    global class SourceAmlInformation {
        @AuraEnabled
        global DestinationAddress sourceAddress;
        
        global SourceAmlInformation () {
        }
	}
    
    global class OrchestationBody {
        @AuraEnabled
        global String fxTimer;
        @AuraEnabled
        global String productId;
        @AuraEnabled
        global String bookToBookId;
        @AuraEnabled
        global String idempotentReference;
        @AuraEnabled
        global String endToEndIdentification;
        @AuraEnabled
        global String destinationName;
        @AuraEnabled
        global DestinationAccount destinationAccount;
       	@AuraEnabled
        global DestinationAddress destinationAddress;
        @AuraEnabled
        global SourceAmlInformation sourceAmlInformation;
        @AuraEnabled
        global String customerIndicator;
        @AuraEnabled
        global DestinationAgent destinationAgent;
        @AuraEnabled
        global String countryDestinationFunds;
        @AuraEnabled
        global DestinationAccount sourceAccount;
        @AuraEnabled
        global String sourceName;
        @AuraEnabled
        global PaymentAmount paymentAmount;
        @AuraEnabled
        global CountervaluePaymentAmount countervaluePaymentAmount;
        @AuraEnabled
        global PaymentFraudDetails paymentFraudDetails;
        @AuraEnabled
        global String flowIndicator;
        @AuraEnabled
        global DestinationAccount intermediateAgentAccount;
        @AuraEnabled
        global String chargeBearer;
        @AuraEnabled
        global String subject;
        @AuraEnabled
        global FxValueDetailsNominal fxValueDetailsNominal;
        @AuraEnabled
        global FundMovementPricesDataList fundMovementPricesDataList;
        @AuraEnabled
        global String purposeCode;
        @AuraEnabled
        global FxValueDetailsNominal fxValueDetailsFee;
        @AuraEnabled
        global IntermediateAgent intermediateAgent;
        @AuraEnabled
        global IntermediateAgent intermediateDestinationAgent;
        @AuraEnabled
        global DestinationAgent sourceAgent;
        @AuraEnabled
        global String requestExecutionDate;
        @AuraEnabled
        global String signCrlCode;
        @AuraEnabled
        global String urgencyIndicator;
        @AuraEnabled
        global String urlAppRedirect;
        
        global OrchestationBody () {
        }

        global OrchestationBody (WRAPPER_B2B_Data.PaymentAmount amountData, WS_ExchangeRate.OUTPUT FXData, WS_ExchangeRate.OUTPUT feesData, WS_TransferFees.OUTPUT pricesData, WRAPPER_AccountList.AccountDetails sourceAccount, WRAPPER_AccountList.AccountDetails destinationAccount, String paymentId, String FXTimer, String description, String clientReference){
            this.fxTimer = FXTimer;
            this.productId = 'book_to_book';
            this.bookToBookId = paymentId;

            /*if (String.isNotBlank(destinationAccount.country)) {
                this.destinationAddress = new DestinationAddress();
                if (destinationAccount.country == 'ES') {
                    this.destinationAddress.streetName = 'Avda. de Cantabria s/n';
                    this.destinationAddress.townName = 'Boadilla del Monte, Madrid';
                    this.destinationAddress.country = destinationAccount.country;
                } else if (destinationAccount.country == 'GB' || destinationAccount.country == 'UK') {
                    this.destinationAddress.streetName = '306ª, High Holborn, High Holborn';
                    this.destinationAddress.townName = 'London';
                    this.destinationAddress.country = destinationAccount.country;
                }
            }

            if (String.isNotBlank(sourceAccount.country)) {
                this.sourceAmlInformation = new SourceAmlInformation();
                this.sourceAmlInformation.sourceAddress = new DestinationAddress();
                if (sourceAccount.country == 'ES') {
                    this.sourceAmlInformation.sourceAddress.streetName = 'Avda. de Cantabria s/n';
                    this.sourceAmlInformation.sourceAddress.townName = 'Boadilla del Monte, Madrid';
                    this.sourceAmlInformation.sourceAddress.country = sourceAccount.country;
                } else if (sourceAccount.country == 'GB' || sourceAccount.country == 'UK') {
                    this.sourceAmlInformation.sourceAddress.streetName = '306ª, High Holborn, High Holborn';
                    this.sourceAmlInformation.sourceAddress.townName = 'London';
                    this.sourceAmlInformation.sourceAddress.country = sourceAccount.country;
                }
            }

            this.customerIndicator = 'equal';*/
            
                        
            
            if( sourceAccount.address != null){
                this.sourceAmlInformation = new SourceAmlInformation();
                this.sourceAmlInformation.sourceAddress = new DestinationAddress();
                if( sourceAccount.address.streetName != null){
                    this.sourceAmlInformation.sourceAddress.streetName =   sourceAccount.address.streetName;
                }
                if( sourceAccount.address.townName != null){
                    this.sourceAmlInformation.sourceAddress.townName =  sourceAccount.address.townName;
                }
                if (sourceAccount.address.country != null){
                    this.sourceAmlInformation.sourceAddress.country =  sourceAccount.address.country;
                }
             }
            
             if(destinationAccount.address != null){
                 this.destinationAddress = new DestinationAddress();
                 if(destinationAccount.address.streetName != null){
                     this.destinationAddress.streetName = destinationAccount.address.streetName;
                 }
                 if(destinationAccount.address.townName != null){
                     this.destinationAddress.townName = destinationAccount.address.townName;
                 }
                 if(destinationAccount.address.country != null){
                     this.destinationAddress.country = destinationAccount.address.country;
                 }
             }        

            /*if (sourceAccount.customerId != destinationAccount.customerId) {
            	this.customerIndicator = 'different';
            } else {*/
            	this.customerIndicator = 'equal';
            //}
            
            this.idempotentReference = paymentId;
            this.endToEndIdentification = clientReference;

            system.debug(destinationAccount.subsidiaryName);
            if(destinationAccount.subsidiaryName == null || destinationAccount.subsidiaryName == '' || destinationAccount.subsidiaryName == 'null'){
                // FLOWERPOWER_PARCHE_RCERVINO
            	this.destinationName = 'SUBS GTS 001-003';
            }else{
                this.destinationName = destinationAccount.subsidiaryName;
           	}
            this.destinationAccount = new DestinationAccount();
            this.destinationAccount.accountId = destinationAccount.displayNumber;
            this.destinationAccount.accountIdType = destinationAccount.idType;
            this.destinationAgent = new DestinationAgent();
            this.destinationAgent.agent = destinationAccount.codigoBic;
            this.destinationAgent.agentName = destinationAccount.bankName;
            this.destinationAgent.addressAgent = destinationAccount.country; //PENDIENTE
            this.countryDestinationFunds = destinationAccount.country;
            this.sourceName = sourceAccount.subsidiaryName;
            this.sourceAccount = new DestinationAccount();
            this.sourceAccount.accountId = sourceAccount.displayNumber;
            this.sourceAccount.accountIdType = sourceAccount.idType;
            this.paymentAmount = new PaymentAmount();
            if (amountData != null) {
                if (amountData.amountReceive != null) {
                    this.paymentAmount.amount = String.valueOf(amountData.amountReceive);
                	this.paymentAmount.tcurrency = destinationAccount.currencyCodeAvailableBalance;
                } else {
                    this.paymentAmount.amount = String.valueOf(amountData.amountSend);
                    this.paymentAmount.tcurrency = destinationAccount.currencyCodeAvailableBalance;
                }
            }
            // global PaymentFraudDetails paymentFraudDetails; // DE DONDE SACO ESTA INFO
            // global String flowIndicator; // COMO SE QUE UN BANCO NO ES DEL GRUPO SANTANDER
            this.chargeBearer = 'OUR'; 
            this.subject = description;
            if (FXData != null && FXData.fxExchangeResponse != null) {
                this.countervaluePaymentAmount = new CountervaluePaymentAmount();
                this.countervaluePaymentAmount.tcurrency = FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency ;
                this.countervaluePaymentAmount.amount = FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount;
                if (FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != destinationAccount.currencyCodeAvailableBalance) {
                    this.countervaluePaymentAmount.tradeCurrency = destinationAccount.currencyCodeAvailableBalance;
                }
                this.fxValueDetailsNominal = new FxValueDetailsNominal();
                this.fxValueDetailsNominal.fxContravalueId = FXData.fxExchangeResponse.fxCountervalueId; 
                this.fxValueDetailsNominal.fxCommercialMargin = new FxCommercialMargin();
                if (FXData.fxExchangeResponse.fxComercialMargin != null) {
                    this.fxValueDetailsNominal.fxCommercialMargin.fxCommercialMarginAmount = String.valueOf(FXData.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount);
                    this.fxValueDetailsNominal.fxCommercialMargin.fxCommercialMarginCurrency = FXData.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency;
                }
                this.fxValueDetailsNominal.fxCounterpaymentAmount = new PaymentAmount();
                this.fxValueDetailsNominal.fxCounterpaymentAmount.amount = String.valueOf(amountData.amountSend);
                this.fxValueDetailsNominal.fxCounterpaymentAmount.tcurrency = sourceAccount.currencyCodeAvailableBalance;
                
                
                String myNumber = String.valueOf(FXData.fxExchangeResponse.customerExchangeRate) ;
                String afterDecimal = myNumber.substringAfter('.');
                String myTruncatedNumber = myNumber;
                if(afterDecimal.length() >6){
                    myTruncatedNumber = myNumber.subString(0,myNumber.indexOf('.')+7);
                }
                        
                this.fxValueDetailsNominal.fxExchangeRate = myTruncatedNumber;
                
                this.fxValueDetailsNominal.fxExecutionDate = FXData.fxExchangeResponse.valueDateEfx;
                this.fxValueDetailsNominal.fxValueDate = FXData.fxExchangeResponse.valueDateEfx;
            } else {
                this.countervaluePaymentAmount = new CountervaluePaymentAmount();
                this.countervaluePaymentAmount.tcurrency = this.paymentAmount.tcurrency;
                this.countervaluePaymentAmount.amount = this.paymentAmount.amount;
            }
            FundMovementPricesDataList fund = new FundMovementPricesDataList();
            // 09-09-2020 - SNJ - Adding data validation
            WS_TransferFees.CurrencyList curr = new WS_TransferFees.CurrencyList();
            List<Concepts> concepts = null;
            if (pricesData != null) {
                if(pricesData.currencyList != null){
                    if(!pricesData.currencyList.isEmpty()){
                        curr = pricesData.currencyList[0];
                        fund.currencyDetails = new CurrencyDetails();
                        fund.currencyDetails.tcurrency = curr.tcurrency;
                        fund.currencyDetails.currencyName = curr.currencyName;
                        concepts = new List<Concepts>();
                        for (WS_TransferFees.Concepts concept : curr.conceptsList) {
                            Concepts cs  = new Concepts();
                            cs.conceptId = concept.conceptId;
                            cs.conceptName = concept.conceptName;
                            cs.conceptAmount = new ConceptAmount();
                            cs.conceptAmount.amount = String.valueOf(concept.conceptAmount.amount);
                            cs.conceptAmount.tcurrency = concept.conceptAmount.tcurrency;
                            cs.conceptAmount.fixing = Integer.valueOf(concept.conceptAmount.fixing);
                            if (concept.specialPrice != null) {
                                cs.specialPrice = new SpecialPrice();
                                cs.specialPrice.specialPriceLevel = concept.specialPrice.specialPriceLevel;
                                if (concept.specialPrice.specialTiersList != null && !concept.specialPrice.specialTiersList.isEmpty()) {
                                    List<Tiers> specialPriceList = new List<Tiers>();
                                    for (WS_TransferFees.SpecialTiers s : concept.specialPrice.specialTiersList) {
                                        Tiers t = new Tiers();
                                        t.amountTier = s.specialAmountTier;
                                        t.amountTierType = s.specialAmountTierType;
                                        if (s.specialFixedRatePrice != null && (s.specialFixedRatePrice.specialRate != null || s.specialFixedRatePrice.specialMinimumAmount != null || s.specialFixedRatePrice.specialMaximumAmount != null || s.specialFixedRatePrice.tcurrency != null)) {
                                            t.fixedRatePrice = new FixedRatePrice();
                                            if (s.specialFixedRatePrice.specialRate != null) {
                                                t.fixedRatePrice.rate = Integer.valueOf(s.specialFixedRatePrice.specialRate);
                                            }
                                            if (s.specialFixedRatePrice.specialMinimumAmount != null) {
                                                t.fixedRatePrice.minimumAmount = Integer.valueOf(s.specialFixedRatePrice.specialMinimumAmount);
                                            }
                                            if (s.specialFixedRatePrice.specialMaximumAmount != null) {
                                                t.fixedRatePrice.maximumAmount = s.specialFixedRatePrice.specialMaximumAmount;
                                            }
                                            if (s.specialFixedRatePrice.tcurrency != null) {
                                                t.fixedRatePrice.tcurrency = s.specialFixedRatePrice.tcurrency;
                                            }
                                        }
                                        if (s.specialFixedAmountPrice != null && (s.specialFixedAmountPrice.specialFixedAmount != null || s.specialFixedAmountPrice.tcurrency != null)) {
                                            t.fixedAmountPrice = new FixedAmountPrice();
                                            if (s.specialFixedAmountPrice.specialFixedAmount != null) {
                                                t.fixedAmountPrice.amount = String.valueOf(s.specialFixedAmountPrice.specialFixedAmount);
                                            }
                                            if (s.specialFixedAmountPrice.tcurrency != null) {
                                                t.fixedAmountPrice.tcurrency = s.specialFixedAmountPrice.tcurrency;
                                            }
                                        }
                                        specialPriceList.add(t);
                                    }
                                    cs.specialPrice.specialTiersList  = specialPriceList;
                                }
                            }
                            if (concept.standardPrice != null) {
                                cs.standardPrice = new StandardPrice();
                                if (concept.standardPrice.standardTiersList != null && !concept.standardPrice.standardTiersList.isEmpty()) {
                                    List<Tiers> standardPriceList = new List<Tiers>();
                                    for (WS_TransferFees.StandardTiers s : concept.standardPrice.standardTiersList) {
                                        Tiers t = new Tiers();
                                        t.amountTier = s.standardAmountTier;
                                        t.amountTierType = s.standardAmountTierType;
                                        if (s.standardFixedRatePrice != null && (s.standardFixedRatePrice.standardRate != null || s.standardFixedRatePrice.standardMinimumAmount != null || s.standardFixedRatePrice.standardMaximumAmount != null || s.standardFixedRatePrice.tcurrency != null)) {
                                        	t.fixedRatePrice = new FixedRatePrice();
                                            if (s.standardFixedRatePrice.standardRate != null) {
                                                t.fixedRatePrice.rate = Integer.valueOf(s.standardFixedRatePrice.standardRate);
                                            }
                                            if (s.standardFixedRatePrice.standardMinimumAmount != null) {
                                                t.fixedRatePrice.minimumAmount = Integer.valueOf(s.standardFixedRatePrice.standardMinimumAmount);
                                            }
                                            if (s.standardFixedRatePrice.standardMaximumAmount != null) {
                                                t.fixedRatePrice.maximumAmount = s.standardFixedRatePrice.standardMaximumAmount;
                                            }
                                            if (s.standardFixedRatePrice.tcurrency != null) {
                                                t.fixedRatePrice.tcurrency = s.standardFixedRatePrice.tcurrency;
                                            }
                                        }
                                        if (s.standardFixedAmountPrice != null && (s.standardFixedAmountPrice.standardFixedAmount != null || s.standardFixedAmountPrice.tcurrency != null)) {
                                        	t.fixedAmountPrice = new FixedAmountPrice();
                                            if (s.standardFixedAmountPrice.standardFixedAmount != null) {
                                                t.fixedAmountPrice.amount = String.valueOf(s.standardFixedAmountPrice.standardFixedAmount);
                                            }
                                            if (s.standardFixedAmountPrice.tcurrency != null) {
                                                t.fixedAmountPrice.tcurrency = s.standardFixedAmountPrice.tcurrency;
                                            }
                                        }
                                        standardPriceList.add(t);
                                    }
                                    cs.standardPrice.standardTiersList = standardPriceList;
                                }
                            }
                            concepts.add(cs);
                        }
                        fund.currencyDetails.conceptsList = concepts;
                    }
                }
            }
            this.fundMovementPricesDataList = fund;
            this.purposeCode = 'OTHR';
            if (feesData != null) {
                if (feesData.fxExchangeResponse != null) {
                    this.fxValueDetailsFee = new FxValueDetailsNominal();
                    this.fxValueDetailsFee.fxContravalueId = feesData.fxExchangeResponse.fxCountervalueId; 
                    this.fxValueDetailsFee.fxCommercialMargin = new FxCommercialMargin();
                    if (feesData.fxExchangeResponse.fxComercialMargin != null) {
                        this.fxValueDetailsFee.fxCommercialMargin.fxCommercialMarginAmount = String.valueOf(feesData.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount);
                        this.fxValueDetailsFee.fxCommercialMargin.fxCommercialMarginCurrency = feesData.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency;
                    }
                    this.fxValueDetailsFee.fxCounterpaymentAmount = new PaymentAmount();
                    this.fxValueDetailsFee.fxCounterpaymentAmount.amount = feesData.amountReceive;
                    this.fxValueDetailsFee.fxCounterpaymentAmount.tcurrency = sourceAccount.currencyCodeAvailableBalance;
                    
					String myNumber = String.valueOf(feesData.fxExchangeResponse.customerExchangeRate) ;
                    String afterDecimal = myNumber.substringAfter('.');
                    String myTruncatedNumber = myNumber;
                    if(afterDecimal.length() >6){
                        myTruncatedNumber = myNumber.subString(0,myNumber.indexOf('.')+7);
                    }
                    this.fxValueDetailsFee.fxExchangeRate = myTruncatedNumber;	                    
                    
                    this.fxValueDetailsFee.fxExecutionDate = feesData.fxExchangeResponse.valueDateEfx;
                    this.fxValueDetailsFee.fxValueDate = feesData.fxExchangeResponse.valueDateEfx;
                }
            }
            /* PENDIENTE DUDAS INTERMEDIARIO
            this.intermediateAgent 
            this.intermediateAgentAccount 
            this.intermediateDestinationAgent */
            // FLOWERPOWER_PARCHE_CERVINO
            this.intermediateAgentAccount = new DestinationAccount();
            this.intermediateAgentAccount.accountId = sourceAccount.displayNumber;
            this.intermediateAgentAccount.accountIdType = sourceAccount.idType;
            this.sourceAgent = new DestinationAgent();
            this.sourceAgent.agent = sourceAccount.codigoBic;
            this.sourceAgent.agentName = sourceAccount.bankName;
            this.sourceAgent.addressAgent = sourceAccount.country; // FLOWERPOWER_PARCHE_CERVINO: PENDIENTE PREGUNTAR MARIA
            this.sourceName = sourceAccount.subsidiaryName;
            // this.requestExecutionDate = FXData.fxExchangeResponse.valueDateEfx; // SOLO APLICA CUENTAS NO BANCO SANTANDER
            // this.signCrlCode; Como se si no es una cuenta del santander // SOLO APLICA CUENTAS NO BANCO SANTANDER
            this.urgencyIndicator = 'Standard';
            // this.urlAppRedirect; De donde saco este valor // SOLO APLICA CUENTAS NO BANCO SANTANDER
        }
        
        global OrchestationBody (WRAPPER_PaymentDetail.OperationDetail paymentDetail, String paymentId, String FXTimer, WS_ExchangeRate.OUTPUT FXData, WS_ExchangeRate.OUTPUT feesData ){
            this.fxTimer = FXTimer;
            this.productId = 'book_to_book';
            this.bookToBookId = paymentId;
            
           /* if (String.isNotBlank(paymentDetail.destinationCountry)) {
                this.destinationAddress = new DestinationAddress();
                if (paymentDetail.destinationCountry == 'ES') {
                    this.destinationAddress.streetName = 'Avda. de Cantabria s/n';
                    this.destinationAddress.townName = 'Boadilla del Monte, Madrid';
                    this.destinationAddress.country = paymentDetail.destinationCountry;
                } else if (paymentDetail.destinationCountry == 'GB' || paymentDetail.destinationCountry == 'UK') {
                    this.destinationAddress.streetName = '306ª, High Holborn, High Holborn';
                    this.destinationAddress.townName = 'London';
                    this.destinationAddress.country = paymentDetail.destinationCountry;
                }
            }

            if (String.isNotBlank(paymentDetail.sourceCountry)) {
                this.sourceAmlInformation = new SourceAmlInformation();
                this.sourceAmlInformation.sourceAddress = new DestinationAddress();
                if (paymentDetail.sourceCountry == 'ES') {
                    this.sourceAmlInformation.sourceAddress.streetName = 'Avda. de Cantabria s/n';
                    this.sourceAmlInformation.sourceAddress.townName = 'Boadilla del Monte, Madrid';
                    this.sourceAmlInformation.sourceAddress.country = paymentDetail.sourceCountry;
                } else if (paymentDetail.sourceCountry == 'GB' || paymentDetail.sourceCountry == 'UK') {
                    this.sourceAmlInformation.sourceAddress.streetName = '306ª, High Holborn, High Holborn';
                    this.sourceAmlInformation.sourceAddress.townName = 'London';
                    this.sourceAmlInformation.sourceAddress.country = paymentDetail.sourceCountry;
            	}
            }
            
            this.customerIndicator = 'equal';*/
            
             if(paymentDetail.sourceData != null){
                 if(paymentDetail.sourceData.sourceAddress != null){
                 	this.sourceAmlInformation = new SourceAmlInformation();
                 	this.sourceAmlInformation.sourceAddress = new DestinationAddress();
                     if(paymentDetail.sourceData.sourceAddress.streetName != null){
                         this.sourceAmlInformation.sourceAddress.streetName =  paymentDetail.sourceData.sourceAddress.streetName;
                     }
                     if(paymentDetail.sourceData.sourceAddress.townName != null){
                         this.sourceAmlInformation.sourceAddress.townName = paymentDetail.sourceData.sourceAddress.townName;
                     }
                     if(paymentDetail.sourceData.sourceAddress.country != null){
                         this.sourceAmlInformation.sourceAddress.country = paymentDetail.sourceData.sourceAddress.country;
                     }
                 }
             }
            
             if(paymentDetail.destinationData != null){
                 if(paymentDetail.destinationData.destinationAddress != null){
            		this.destinationAddress = new DestinationAddress();
                     if(paymentDetail.destinationData.destinationAddress.streetName != null){
                         this.destinationAddress.streetName =  paymentDetail.destinationData.destinationAddress.streetName;
                     }
                     if(paymentDetail.destinationData.destinationAddress.townName != null){
                         this.destinationAddress.townName = paymentDetail.destinationData.destinationAddress.townName;
                     }
                     if(paymentDetail.destinationData.destinationAddress.country != null){
                         this.destinationAddress.country = paymentDetail.destinationData.destinationAddress.country;
                     }
                 }
             }
            
 
            


            /*if(paymentDetail.sourceData.customerId != paymentDetail.destinationData.customerId){
            	this.customerIndicator = 'different';
            }else{*/
            	this.customerIndicator = 'equal';
           // }
            
            
            this.idempotentReference = paymentId; 
            this.endToEndIdentification = paymentDetail.clientReference;
            //09-09-2020 - SNJ - Data validation
            this.destinationAccount = new DestinationAccount();
            this.destinationAgent = new DestinationAgent();
            this.sourceAccount = new DestinationAccount();
            this.paymentAmount = new PaymentAmount();
            this.countervaluePaymentAmount = new CountervaluePaymentAmount();
            FundMovementPricesDataList fund = new FundMovementPricesDataList();
            this.sourceAgent = new DestinationAgent();
            this.fxValueDetailsNominal = new FxValueDetailsNominal();
            this.fxValueDetailsNominal.fxCommercialMargin = new FxCommercialMargin();
            this.fxValueDetailsNominal.fxCounterpaymentAmount = new PaymentAmount();            
            this.intermediateAgentAccount = new DestinationAccount();
            if (paymentDetail != null) {
                if (paymentDetail.destinationData != null) {
                    if (paymentDetail.destinationData.name != null) {
                        this.destinationName = paymentDetail.destinationData.name;
                    } else {
                        this.destinationName = 'SUBS GTS 001-003'; // FLOWERPOWER_PARCHE_CERVINO
                    }
                    if (paymentDetail.destinationData.destinationAccount != null) {
                        if (paymentDetail.destinationData.destinationAccount.accountId != null) {
                            this.destinationAccount.accountId = paymentDetail.destinationData.destinationAccount.accountId;
                        }
                        if (paymentDetail.destinationData.destinationAccount.accountType != null) {
                           this.destinationAccount.accountIdType = paymentDetail.destinationData.destinationAccount.accountType; 
                        }
                    }
                    if (paymentDetail.destinationData.destinationAgent != null) {
                        if (paymentDetail.destinationData.destinationAgent.agentId != null) {
                            this.destinationAgent.agent = paymentDetail.destinationData.destinationAgent.agentId;
                        }
                        if (paymentDetail.destinationData.destinationAgent.name != null) {
                            this.destinationAgent.agentName = paymentDetail.destinationData.destinationAgent.name;
                        }
                        if (paymentDetail.destinationData.destinationAgent.address != null) {
                            this.destinationAgent.addressAgent = paymentDetail.destinationData.destinationAgent.address;
                        }
                    }
                    if (paymentDetail.destinationData.country != null) {
                        this.countryDestinationFunds = paymentDetail.destinationData.country;
                    }
                }
                if (paymentDetail.sourceData != null) {
                    if (paymentDetail.sourceData.name != null) {
                        this.sourceName = paymentDetail.sourceData.name;
                    }
                    if (paymentDetail.sourceData.sourceAgent != null) {
                        if (paymentDetail.sourceData.sourceAgent.agentId != null) {
                            this.sourceAgent.agent = paymentDetail.sourceData.sourceAgent.agentId;
                        }
                        if (paymentDetail.sourceData.sourceAgent.name != null) {
                            this.sourceAgent.agentName = paymentDetail.sourceData.sourceAgent.name;
                        }
                        if (paymentDetail.sourceData.sourceAgent.address != null) {
                            this.sourceAgent.addressAgent = paymentDetail.sourceData.sourceAgent.address;
                        }
                    }
                    if (paymentDetail.sourceData.sourceAccount != null) {
                        if (paymentDetail.sourceData.sourceAccount.accountId != null) {
                            this.sourceAccount.accountId = paymentDetail.sourceData.sourceAccount.accountId;
                            this.intermediateAgentAccount.accountId = paymentDetail.sourceData.sourceAccount.accountId;
                        }
                        if (paymentDetail.sourceData.sourceAccount.accountType != null) {
                            this.sourceAccount.accountIdType = paymentDetail.sourceData.sourceAccount.accountType;
                            this.intermediateAgentAccount.accountIdType = paymentDetail.sourceData.sourceAccount.accountType;
                        }
                        if (paymentDetail.sourceData.sourceAccount.tcurrency != null) {
                           this.fxValueDetailsNominal.fxCounterpaymentAmount.tcurrency = paymentDetail.sourceData.sourceAccount.tcurrency; 
                        }
                    }
                }
                String shadowAmount = null;
                String shadowCurrency = null;
                String shadowTradeCurrency = null;
                if (paymentDetail.operationAmount != null && (paymentDetail.operationAmount.amount != null || paymentDetail.operationAmount.tcurrency != null)) {
                    if (paymentDetail.operationAmount.amount != null) {
                        shadowAmount = String.valueOf(paymentDetail.operationAmount.amount);
                    }
                    if (paymentDetail.operationAmount.tcurrency != null) {
                        shadowCurrency = paymentDetail.operationAmount.tcurrency;
                    }
                } else {
                    if (FXData != null && FXData.fxExchangeResponse != null && FXData.fxExchangeResponse.CcyCountervalue != null && (FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount != null || FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != null)) {
                        shadowAmount = FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount;
                        shadowCurrency = FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency;
                    } else if (paymentDetail.counterValueOperationAmount != null && (paymentDetail.counterValueOperationAmount.amount != null || paymentDetail.counterValueOperationAmount.tcurrency != null)) {
                        if (paymentDetail.counterValueOperationAmount.amount != null) {
                            shadowAmount = String.valueOf(paymentDetail.counterValueOperationAmount.amount);
                        }
                        if (paymentDetail.counterValueOperationAmount.tcurrency != null) {
                            shadowCurrency = paymentDetail.counterValueOperationAmount.tcurrency;
                        }
                    }
                    if (FXData != null && FXData.fxExchangeResponse != null && FXData.fxExchangeResponse.CcyCountervalue != null && paymentDetail.counterValueOperationAmount.tradeCurrency != null) {
                        if (FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != paymentDetail.counterValueOperationAmount.tradeCurrency) {
                            shadowTradeCurrency = paymentDetail.counterValueOperationAmount.tradeCurrency;
                        }
                    }
                }
                if (String.isNotBlank(shadowAmount) || String.isNotBlank(shadowCurrency)) {
                    this.paymentAmount = new PaymentAmount();
                    this.countervaluePaymentAmount = new CountervaluePaymentAmount();
                    if (String.isNotBlank(shadowAmount)) {
                        this.paymentAmount.amount = shadowAmount;
                        this.countervaluePaymentAmount.amount = shadowAmount;  
                    }
                    if (String.isNotBlank(shadowCurrency)) {
                      this.paymentAmount.tcurrency = shadowCurrency;
                      this.countervaluePaymentAmount.tcurrency = shadowCurrency;
                    }
                    if (String.isNotBlank(shadowTradeCurrency)) {
                        this.countervaluePaymentAmount.tradeCurrency = shadowTradeCurrency;
                    }
                }
                if (paymentDetail.operationFraudDetails != null) {
                    if (paymentDetail.operationFraudDetails.fraudValidationResult != null || paymentDetail.operationFraudDetails.fraudReference != null) {
                        this.paymentFraudDetails = new PaymentFraudDetails();
                        if (paymentDetail.operationFraudDetails.fraudValidationResult != null) {
                            this.paymentFraudDetails.fraudValidationResult =  paymentDetail.operationFraudDetails.fraudValidationResult; 
                         }
                         if (paymentDetail.operationFraudDetails.fraudReference != null) {
                            this.paymentFraudDetails.fraudReference =  paymentDetail.operationFraudDetails.fraudReference; 
                         }
                    }
                }
                if(paymentDetail.chargeBearer != null){
                    this.chargeBearer = paymentDetail.chargeBearer;
                }
                if(paymentDetail.subject != null){
                   this.subject = paymentDetail.subject; 
                }
            }
            // global String flowIndicator; // COMO SE QUE UN BANCO NO ES DEL GRUPO SANTANDER
            if (FXData != null) {
                if (FXData.fxExchangeResponse != null) {
                    if (FXData.fxExchangeResponse.fxCountervalueId != null) {
                        this.fxValueDetailsNominal.fxContravalueId = FXData.fxExchangeResponse.fxCountervalueId; 
                    }
                    if (FXData.fxExchangeResponse.fxComercialMargin != null) {
                        if (FXData.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount != null) {
                            this.fxValueDetailsNominal.fxCommercialMargin.fxCommercialMarginAmount = String.valueOf(FXData.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount);
                        }
                        if (FXData.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency != null) {
                           this.fxValueDetailsNominal.fxCommercialMargin.fxCommercialMarginCurrency = FXData.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency;
                        }
                    }
                    if (FXData.fxExchangeResponse.customerExchangeRate != null) {
                        String myNumber = String.valueOf(FXData.fxExchangeResponse.customerExchangeRate) ;
                        String afterDecimal = myNumber.substringAfter('.');
                        String myTruncatedNumber = myNumber;
                        if(afterDecimal.length() >6){
                            myTruncatedNumber = myNumber.subString(0,myNumber.indexOf('.')+7);
                        }
                         
                        this.fxValueDetailsNominal.fxExchangeRate = myTruncatedNumber;
                    }
                    if (FXData.fxExchangeResponse.valueDateEfx != null) {
                        this.fxValueDetailsNominal.fxExecutionDate = FXData.fxExchangeResponse.valueDateEfx;
                    }
                    if (FXData.fxExchangeResponse.valueDateEfx != null) {
                        this.fxValueDetailsNominal.fxValueDate = FXData.fxExchangeResponse.valueDateEfx;
                    }
                }
                if (FXData.amountSend != null) {
                    this.fxValueDetailsNominal.fxCounterpaymentAmount.amount = FXData.amountSend;
                }
            }
            List<Concepts> concepts = new List<Concepts>();
            if (paymentDetail != null) {
                System.debug('CPC_paymentDetail.pricingDetails: ' + JSON.serialize(paymentDetail.pricingDetails));
                if (paymentDetail.pricingDetails != null) {
                    if (paymentDetail.pricingDetails.currencyList != null && !paymentDetail.pricingDetails.currencyList.isEmpty()) {
                        WRAPPER_PaymentDetail.CurrencyList curr = paymentDetail.pricingDetails.currencyList[0];
                       	fund.currencyDetails = new CurrencyDetails();
                        fund.currencyDetails.tcurrency = curr.tcurrency;
                        fund.currencyDetails.currencyName = curr.currencyName;
                        if (curr.conceptsList != null) {
                            if(!curr.conceptsList.isEmpty()) {
                                for (WRAPPER_PaymentDetail.ConceptsList concept : curr.conceptsList) {
                                    Concepts cs  = new Concepts();
                                    cs.conceptId = concept.conceptId;
                                    cs.conceptName = concept.conceptName;
                                    cs.conceptAmount = new ConceptAmount();
                                    cs.conceptAmount.amount = String.valueOf(concept.conceptAmount.amount);
                                    cs.conceptAmount.tcurrency = concept.conceptAmount.tcurrency;
                                    cs.conceptAmount.fixing = Integer.valueOf(concept.conceptAmount.fixing);
                                    if (concept.specialPrice != null) {
                                        cs.specialPrice = new SpecialPrice();
                                        cs.specialPrice.specialPriceLevel = concept.specialPrice.specialPriceLevel;
                                        if (concept.specialPrice.specialTiersList != null && !concept.specialPrice.specialTiersList.isEmpty()) {
                                            List<Tiers> specialPriceList = new List<Tiers>();
                                            for (WRAPPER_PaymentDetail.SpecialTiersList s : concept.specialPrice.specialTiersList) {
                                                Tiers t = new Tiers();
                                                t.amountTier = s.specialAmountTier;
                                                t.amountTierType = s.specialAmountTierType;
                                                if (s.specialFixedRatePrice != null && (s.specialFixedRatePrice.specialRate != null || s.specialFixedRatePrice.specialMinimumAmount != null || s.specialFixedRatePrice.specialMaximumAmount != null || s.specialFixedRatePrice.tcurrency != null)) {
                                                    t.fixedRatePrice = new FixedRatePrice();
                                                    if (s.specialFixedRatePrice.specialRate != null) {
                                                        t.fixedRatePrice.rate = Integer.valueOf(s.specialFixedRatePrice.specialRate);
                                                    }
                                                    if (s.specialFixedRatePrice.specialMinimumAmount != null) {
                                                        t.fixedRatePrice.minimumAmount = Integer.valueOf(s.specialFixedRatePrice.specialMinimumAmount);
                                                    }
                                                    if (s.specialFixedRatePrice.specialMaximumAmount != null) {
                                                        t.fixedRatePrice.maximumAmount = s.specialFixedRatePrice.specialMaximumAmount;
                                                    }
                                                    if (s.specialFixedRatePrice.tcurrency != null) {
                                                        t.fixedRatePrice.tcurrency = s.specialFixedRatePrice.tcurrency;
                                                    }
                                                }
                                                if (s.specialFixedAmountPrice != null && (s.specialFixedAmountPrice.specialFixedAmount != null || s.specialFixedAmountPrice.tcurrency != null)) {
                                                    t.fixedAmountPrice = new FixedAmountPrice();
                                                    if (s.specialFixedAmountPrice.specialFixedAmount != null) {
                                                        t.fixedAmountPrice.amount = String.valueOf(s.specialFixedAmountPrice.specialFixedAmount);
                                                    }
                                                    if (s.specialFixedAmountPrice.tcurrency != null) {
                                                        t.fixedAmountPrice.tcurrency = s.specialFixedAmountPrice.tcurrency;
                                                    }
                                                }
                                                specialPriceList.add(t);
                                            }
                                            cs.specialPrice.specialTiersList  = specialPriceList;
                                        }
                                    }
                                    if (concept.standardPrice != null) {
                                        cs.standardPrice = new StandardPrice();
                                        if (concept.standardPrice.standardTiersList != null && !concept.standardPrice.standardTiersList.isEmpty()) {
                                            List<Tiers> standardPriceList = new List<Tiers>();
                                            for (WRAPPER_PaymentDetail.standardTiersList s : concept.standardPrice.standardTiersList) {
                                                Tiers t = new Tiers();
                                                t.amountTier = s.standardAmountTier;
                                                t.amountTierType = s.standardAmountTierType;
                                                if (s.standardFixedRatePrice != null && (s.standardFixedRatePrice.standardRate != null || s.standardFixedRatePrice.standardMinimumAmount != null || s.standardFixedRatePrice.standardMaximumAmount != null || s.standardFixedRatePrice.tcurrency != null)) {
                                                    t.fixedRatePrice = new FixedRatePrice();
                                                    if (s.standardFixedRatePrice.standardRate != null) {
                                                        t.fixedRatePrice.rate = Integer.valueOf(s.standardFixedRatePrice.standardRate);
                                                    }
                                                    if (s.standardFixedRatePrice.standardMinimumAmount != null) {
                                                        t.fixedRatePrice.minimumAmount = Integer.valueOf(s.standardFixedRatePrice.standardMinimumAmount);
                                                    }
                                                    if (s.standardFixedRatePrice.standardMaximumAmount != null) {
                                                        t.fixedRatePrice.maximumAmount = s.standardFixedRatePrice.standardMaximumAmount;
                                                    }
                                                    if (s.standardFixedRatePrice.tcurrency != null) {
                                                        t.fixedRatePrice.tcurrency = s.standardFixedRatePrice.tcurrency;
                                                    }
                                                }
                                                if (s.standardFixedAmountPrice != null && (s.standardFixedAmountPrice.standardFixedAmount != null || s.standardFixedAmountPrice.tcurrency != null)) {
                                                    t.fixedAmountPrice = new FixedAmountPrice();
                                                    if (s.standardFixedAmountPrice.standardFixedAmount != null) {
                                                        t.fixedAmountPrice.amount = String.valueOf(s.standardFixedAmountPrice.standardFixedAmount);
                                                    }
                                                    if (s.standardFixedAmountPrice.tcurrency != null) {
                                                        t.fixedAmountPrice.tcurrency = s.standardFixedAmountPrice.tcurrency;
                                                    }
                                                }
                                                standardPriceList.add(t);
                                            }
                                            cs.standardPrice.standardTiersList  = standardPriceList;
                                        }
                                    }
                                    concepts.add(cs);
                                }
                                fund.currencyDetails.conceptsList = concepts;
                            }
                        }
                        
                        
                    }
                }
            }
            this.fundMovementPricesDataList = fund;
            this.purposeCode = 'OTHR';
            // 09-09-2020 - SNJ - Data validation
            if (feesData != null) {
                if (feesData.fxExchangeResponse != null) {
                    this.fxValueDetailsFee = new FxValueDetailsNominal();
                    this.fxValueDetailsFee.fxContravalueId = feesData.fxExchangeResponse.fxCountervalueId;
                    this.fxValueDetailsFee.fxCommercialMargin = new FxCommercialMargin();
                    this.fxValueDetailsFee.fxCommercialMargin.fxCommercialMarginAmount = String.valueOf(feesData.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount);
                    this.fxValueDetailsFee.fxCommercialMargin.fxCommercialMarginCurrency = feesData.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency;
                    this.fxValueDetailsFee.fxCounterpaymentAmount = new PaymentAmount();
                    this.fxValueDetailsFee.fxCounterpaymentAmount.amount = feesData.amountReceive;
                    if (paymentDetail != null) {
                        if (paymentDetail.sourceData != null) {
                            if (paymentDetail.sourceData.sourceAccount != null) {
                                if (paymentDetail.sourceData.sourceAccount.tcurrency != null) {
                                    this.fxValueDetailsFee.fxCounterpaymentAmount.tcurrency = paymentDetail.sourceData.sourceAccount.tcurrency;
                                }
                            }
                        }
                    }
                    
 
                    String myNumber = String.valueOf(feesData.fxExchangeResponse.customerExchangeRate) ;
                    String afterDecimal = myNumber.substringAfter('.');
                    String myTruncatedNumber = myNumber;
                    if(afterDecimal.length() >6){ 
                        myTruncatedNumber = myNumber.subString(0,myNumber.indexOf('.')+7);
                    }
                    this.fxValueDetailsFee.fxExchangeRate = myTruncatedNumber; 
                    this.fxValueDetailsFee.fxExecutionDate = feesData.fxExchangeResponse.valueDateEfx;
                    this.fxValueDetailsFee.fxValueDate = feesData.fxExchangeResponse.valueDateEfx; 
                }
            }
            /* PENDIENTE DUDAS INTERMEDIARIO
            this.intermediateAgent 
            this.intermediateAgentAccount 
            this.intermediateDestinationAgent */
            // this.requestExecutionDate = FXData.fxExchangeResponse.valueDateEfx; //NO APLICA PARA BANCO SANTANDER
            // this.signCrlCode; Como se si no es una cuenta del santander //NO APLICA PARA BANCO SANTANDER
            this.urgencyIndicator = 'Standard';
            // this.urlAppRedirect; De donde saco este valor //NO APLICA PARA BANCO SANTANDER
        }
    }

    global void executePayment (WRAPPER_B2B_Data.PaymentAmount amountData, WS_ExchangeRate.OUTPUT FXData, WS_ExchangeRate.OUTPUT feesData, WS_TransferFees.OUTPUT pricesData, WRAPPER_AccountList.AccountDetails sourceAccount, WRAPPER_AccountList.AccountDetails destinationAccount, String FXTimer, String description, String clientReference) {
        try {
            String country;
            String codigoBic;
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('B2B_executePayment');
            String finalEndPoint = configWs.CNT_Endpoint__c;
            if (!Test.isRunningTest()) {
                OrchestationBody initBody = new OrchestationBody(amountData, FXData, feesData, pricesData, sourceAccount, destinationAccount, this.paymentId, FXTimer, description, clientReference);
                Map<String, String> headers = new Map<string, String>();
                if (String.isNotBlank(sourceAccount.country) && String.isNotBlank(sourceAccount.codigoBic)) { 
                    country = sourceAccount.country;
                    codigoBic = sourceAccount.codigoBic;
                    if (codigoBIC.length() >= 11) {
                         codigoBIC = codigoBIC.subString(0, 8);
                    }
                }
                headers.put('Signature-step1', 'step1');
                headers.put('Signature-step2', 'step2'); 
                headers.put('Global-Payment-Id', this.paymentId);
                
                if(String.isNotBlank(sourceAccount.customerId)){
                	headers.put('customer_id', sourceAccount.customerId);
                }else{
                    headers.put('customer_id','');
                }

                headers.put('Access-Channel', 'web');
                String authenticationplatform = getTokenPlatform(country);
                headers.put('authenticationplatform', authenticationplatform);
                TokenInformation tokenInformation = new TokenInformation(country, configWs.tokenPlatform__c, configWs.tokenUser__c, null, codigoBic, null, null, null, null);
                String response = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBody, true), finalEndPoint, configWs.CNT_HTTPMethod__c, headers, null, null, 120000, tokenInformation);
                if (String.isNotBlank(response)) {
                	OrchestationOutput = (OrchestationOutput) System.JSON.deserialize(response, OrchestationOutput.class);
                }
            } else {
                OrchestationOutput = new OrchestationOutput();
                OrchestationOutput.code = '200';
				OrchestationOutput.message = 'Payment successfully executed.';
                OrchestationOutput.level = 'OK';
                OrchestationOutput.description = 'Payment successfully executed.';
            }
        } catch (Exception e) {
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentID);
            wsObject.updateStatus('999', '003');
            System.debug('OrchestationOutput: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); 
        }
    }
    
    global void executePayment (WRAPPER_PaymentDetail.OperationDetail paymentDetail, String paymentId, String FXTimer,WS_ExchangeRate.OUTPUT FXData, WS_ExchangeRate.OUTPUT feesData) {
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('B2B_executePayment');
            String finalEndPoint = configWs.CNT_Endpoint__c;
            if (!Test.isRunningTest()) {
                OrchestationBody initBody = new OrchestationBody(paymentDetail, paymentId, FXTimer, FXData, feesData);
                Map<String, String> headers = new Map<string, String>();
                String country = '';
                String codigoBic = '';
                if (paymentDetail != null) {
                    if (paymentDetail.sourceData != null) {
                        if (paymentDetail.sourceData.sourceAgent != null) {
                            if (paymentDetail.sourceData.sourceAgent.agentId != null) {
                                codigoBic = paymentDetail.sourceData.sourceAgent.agentId;
                                if (codigoBIC.length() >= 11) {
                                    codigoBIC = codigoBIC.subString(0, 8);
                                }
                            }
                        }
                        if (paymentDetail.sourceData.country != null) {
                            country = paymentDetail.sourceData.country;
                        }
                    }
                }
                headers.put('Global-Payment-Id', this.paymentId);
                headers.put('Access-Channel', 'web');
                
                if(paymentDetail.sourceData != null){
                    if(String.isNotBlank(paymentDetail.sourceData.customerId)){
                	headers.put('customer_id', paymentDetail.sourceData.customerId);
                    }else{
                        headers.put('customer_id','');
                    }      
                }else{
                    headers.put('customer_id','');
                }
			    System.debug('customer_id: ' + headers.get('customer_id'));
                
                String authenticationplatform = getTokenPlatform(country);
                headers.put('authenticationplatform', authenticationplatform);
                TokenInformation tokenInformation = new TokenInformation(country, configWs.tokenPlatform__c, configWs.tokenUser__c, null, codigoBIC, null, null, null, null);
                String response = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBody, true), finalEndPoint, configWs.CNT_HTTPMethod__c, headers, null, null, 120000, tokenInformation);
                if (String.isNotBlank(response)) {
                	OrchestationOutput = (OrchestationOutput) System.JSON.deserialize(response, OrchestationOutput.class);
                }
            } else {
                OrchestationOutput = new OrchestationOutput();
                OrchestationOutput.code = '200';
                OrchestationOutput.message = 'Payment successfully executed.';
                OrchestationOutput.level = 'OK';
                OrchestationOutput.description = 'Payment successfully executed.';
            }
        } catch (Exception e) {
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentID);
            wsObject.updateStatus('999', '003');
            System.debug('OrchestationOutput: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); 
        }
    }

    private static String getTokenPlatform (String country) {
        String res = null;
        try {
            TokenInformation tokenInformation = new TokenInformation(country, 'SANDIGITAL', 'platform');
            System.debug(tokenInformation);
            Map<String, String> tokenMap = TokenService.generateTokenByInstance(null, tokenInformation);
            String globalId = new List<String>(tokenMap.keySet())[0];
            res = tokenMap.get(globalId);
        } catch (Exception e) {
            System.debug('WS_B2B_Orchestation.getTokenPlatform: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new AuraHandledException(e.getMessage()); 
        }
        return res;
    }
}