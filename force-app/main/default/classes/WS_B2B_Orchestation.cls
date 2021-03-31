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

        global orchestationOutput () {}
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

        global OrcErrors () {}
    }

    global class FxCommercialMargin {
        @AuraEnabled
        global String fxCommercialMarginAmount {get;set;}
        @AuraEnabled
        global String fxCommercialMarginCurrency {get;set;}

        global FxCommercialMargin () {}
    }

    global class DestinationAgent {
        @AuraEnabled
        global String agent {get;set;}
        @AuraEnabled
        global String agentName {get;set;}
        @AuraEnabled
        global String addressAgent {get;set;}

        global DestinationAgent () {}
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

        global IntermediateAgent () {}
    }

    global class PaymentAmount {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String amount {get;set;}

        global PaymentAmount () {}
    }

    global class CountervaluePaymentAmount {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String amount {get;set;}
        @AuraEnabled
        global String tradeCurrency {get;set;}

        global CountervaluePaymentAmount () {}
    }

    global class BuyNominal {
        @AuraEnabled
        global String buyNominalAmount {get;set;}
        @AuraEnabled
        global String buyNominalCurrency {get;set;}

        global BuyNominal () {}

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

        global SellNominal () {}

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

        global PaymentFraudDetails () {}
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

        global DataCancelConfirmFx () {}
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

        global FxValueDetailsNominal () {}
    }

    global class DestinationAccount {
        @AuraEnabled
        global String accountIdType {get;set;}
        @AuraEnabled
        global String accountId {get;set;}

        global DestinationAccount () {}
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

        global FxValueDetailsFee () {}
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

        global Tiers () {}
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

        global Concepts () {}
    }


    global class ConceptAmount {
        @AuraEnabled
        global String amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Integer fixing {get;set;}

        global ConceptAmount () {}
    }

    global class SpecialPrice {
        @AuraEnabled
        global String specialPriceLevel {get;set;}
        @AuraEnabled
        global List<Tiers> specialTiersList {get;set;}

        global SpecialPrice () {}
    }

    global class StandardPrice {
        @AuraEnabled
        global List<Tiers> standardTiersList {get;set;}

        global StandardPrice () {}
    }

    global class FixedAmountPrice {
        @AuraEnabled
        global String amount {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}

        global FixedAmountPrice () {}
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

        global FixedRatePrice () {}
    }

    global class FundMovementPricesDataList {
        @AuraEnabled
        global CurrencyDetails currencyDetails {get;set;}

        global FundMovementPricesDataList () {}
    }

    global class DestinationAddress {
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
        @AuraEnabled
        global String province {get;set;}
        @AuraEnabled
        global String additionalInformation {get;set;}

        global DestinationAddress () {}
    }

    global class CreditorDocument {
        @AuraEnabled
        global String documentType {get;set;}
        @AuraEnabled
        global String documentNumber {get;set;}

        global CreditorDocument () {}
    }

    global class CurrencyDetails {
        @AuraEnabled
        global List<Concepts> conceptsList {get;set;}
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global String currencyName {get;set;}

        global CurrencyDetails () {}
    }

    global class OrchestationBody {
        @AuraEnabled
        global String fxTimer  {get;set;}
        @AuraEnabled
        global String productId  {get;set;}
        @AuraEnabled
        global String serviceId  {get;set;}
        @AuraEnabled
        global String bookToBookId  {get;set;}
        @AuraEnabled
        global String idempotentReference  {get;set;}
        @AuraEnabled
        global String endToEndIdentification  {get;set;}
        @AuraEnabled
        global String destinationName  {get;set;}
        @AuraEnabled
        global DestinationAccount destinationAccount  {get;set;}
        @AuraEnabled
        global DestinationAddress destinationAddress  {get;set;}
        @AuraEnabled
        global DestinationAddress sourceAddress  {get;set;}
        @AuraEnabled
        global String customerIndicator  {get;set;}
        @AuraEnabled
        global DestinationAgent destinationAgent  {get;set;}
        @AuraEnabled
        global String countryDestinationFunds  {get;set;}
        @AuraEnabled
        global DestinationAccount sourceAccount  {get;set;}
        @AuraEnabled
        global String sourceName  {get;set;}
        @AuraEnabled
        global PaymentAmount paymentAmount  {get;set;}
        @AuraEnabled
        global CountervaluePaymentAmount countervaluePaymentAmount  {get;set;}
        @AuraEnabled
        global PaymentFraudDetails paymentFraudDetails  {get;set;}
        @AuraEnabled
        global String flowIndicator  {get;set;}
        @AuraEnabled
        global DestinationAccount intermediateAgentAccount  {get;set;}
        @AuraEnabled
        global String chargeBearer  {get;set;}
        @AuraEnabled
        global String subject  {get;set;}
        @AuraEnabled
        global FxValueDetailsNominal fxValueDetailsNominal  {get;set;}
        @AuraEnabled
        global FundMovementPricesDataList fundMovementPricesDataList  {get;set;}
        @AuraEnabled
        global String purposeCode  {get;set;}
        @AuraEnabled
        global FxValueDetailsNominal fxValueDetailsFee  {get;set;}
        @AuraEnabled
        global IntermediateAgent intermediateAgent  {get;set;}
        @AuraEnabled
        global IntermediateAgent intermediateDestinationAgent  {get;set;}
        @AuraEnabled
        global DestinationAgent sourceAgent  {get;set;}
        @AuraEnabled
        global String requestExecutionDate  {get;set;}
        @AuraEnabled
        global String signCrlCode  {get;set;}
        @AuraEnabled
        global String urgencyIndicator  {get;set;}
        @AuraEnabled
        global String urlAppRedirect  {get;set;}

        global OrchestationBody () {}

        global OrchestationBody (WRAPPER_PAY_PaymentDraft paymentDraft, String urgencyIndicator) {
            this.fxTimer = paymentDraft.fxTimer;
            this.productId = paymentDraft.productId;
            this.serviceId = paymentDraft.serviceId;
            this.bookToBookId = paymentDraft.paymentId;
            if (paymentDraft.sourceAccount.address != null) {
                this.sourceAddress = new DestinationAddress();
                if (paymentDraft.sourceAccount.address.streetName != null) {
                    this.sourceAddress.streetName = paymentDraft.sourceAccount.address.streetName;
                }
                if (paymentDraft.sourceAccount.address.floor != null) {
                    this.sourceAddress.floor = paymentDraft.sourceAccount.address.floor;
                }
                if (paymentDraft.sourceAccount.address.townName != null) {
                    this.sourceAddress.townName = paymentDraft.sourceAccount.address.townName;
                }
                if (paymentDraft.sourceAccount.address.state != null) {
                    this.sourceAddress.state = paymentDraft.sourceAccount.address.state;
                }
                if (paymentDraft.sourceAccount.address.country != null){
                    this.sourceAddress.country = paymentDraft.sourceAccount.address.country;
                }
            }
            if (paymentDraft.destinationAccount.address != null) {
                this.destinationAddress = new DestinationAddress();
                if (paymentDraft.destinationAccount.address.streetName != null) {
                    this.destinationAddress.streetName = paymentDraft.destinationAccount.address.streetName;
                }
                if (paymentDraft.sourceAccount.address.floor != null) {
                    this.sourceAddress.floor = paymentDraft.sourceAccount.address.floor;
                }
                if (paymentDraft.destinationAccount.address.townName != null) {
                    this.destinationAddress.townName = paymentDraft.destinationAccount.address.townName;
                }
                if (paymentDraft.sourceAccount.address.state != null) {
                    this.sourceAddress.state = paymentDraft.sourceAccount.address.state;
                }
                if (paymentDraft.destinationAccount.address.country != null) {
                    this.destinationAddress.country = paymentDraft.destinationAccount.address.country;
                }
                if (paymentDraft.destinationAccount.address.streetBuildingIdentification != null) {
                    this.destinationAddress.streetBuildingIdentification = paymentDraft.destinationAccount.address.streetBuildingIdentification;
                }
                if (paymentDraft.destinationAccount.address.postCodeIdentification != null) {
                    this.destinationAddress.postCodeIdentification = paymentDraft.destinationAccount.address.postCodeIdentification;
                }
            }
            if (paymentDraft.productId != System.Label.CNF_payment_productId_001) {
                this.customerIndicator = 'different';
            } else {
                this.customerIndicator = 'equal';
            }
            this.idempotentReference = paymentDraft.paymentId;
            this.endToEndIdentification = paymentDraft.reference;
            if (paymentDraft.destinationAccount.subsidiaryName == null || paymentDraft.destinationAccount.subsidiaryName == '' || paymentDraft.destinationAccount.subsidiaryName == 'null') {
                // FLOWERPOWER_PARCHE_RCERVINO
                this.destinationName = 'SUBS GTS 001-003';
            } else {
                this.destinationName = paymentDraft.destinationAccount.subsidiaryName;
            }
            this.destinationAccount = new DestinationAccount();
            this.destinationAccount.accountId = paymentDraft.destinationAccount.displayNumber;
            this.destinationAccount.accountIdType = paymentDraft.destinationAccount.idType;
            this.destinationAgent = new DestinationAgent();
            this.destinationAgent.agent = paymentDraft.destinationAccount.codigoBic;
            this.destinationAgent.agentName = paymentDraft.destinationAccount.bankName;
            this.destinationAgent.addressAgent = paymentDraft.destinationAccount.country; //PENDIENTE
            this.countryDestinationFunds = paymentDraft.destinationAccount.country;
            this.sourceName = paymentDraft.sourceAccount.subsidiaryName;
            this.sourceAccount = new DestinationAccount();
            this.sourceAccount.accountId = paymentDraft.sourceAccount.displayNumber;
            this.sourceAccount.accountIdType = paymentDraft.sourceAccount.idType;
            this.paymentAmount = new PaymentAmount();
            this.countervaluePaymentAmount = new CountervaluePaymentAmount();
            if (paymentDraft.amountReceive != null) {
                this.paymentAmount.amount = String.valueOf(paymentDraft.amountReceive);
                this.paymentAmount.tcurrency = paymentDraft.destinationAccount.currencyCodeAvailableBalance;
            } else {
                this.paymentAmount.amount = String.valueOf(paymentDraft.amountSend);
                // this.paymentAmount.tcurrency = destinationAccount.currencyCodeAvailableBalance;
                this.paymentAmount.tcurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance; //BH 30/12/2020
            }
            // global PaymentFraudDetails paymentFraudDetails; // DE DONDE SACO ESTA INFO
            // global String flowIndicator; // COMO SE QUE UN BANCO NO ES DEL GRUPO SANTANDER
            this.chargeBearer = paymentDraft.chargeBearer;
            this.subject = paymentDraft.description;
            if (paymentDraft.exchangeRateServiceResponse != null && paymentDraft.exchangeRateServiceResponse.fxExchangeResponse != null) {
                WS_ExchangeRate.OUTPUT fxData = paymentDraft.exchangeRateServiceResponse;
                    this.countervaluePaymentAmount = new CountervaluePaymentAmount();
                    this.countervaluePaymentAmount.tcurrency = fxData.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency;
                    this.countervaluePaymentAmount.amount = fxData.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount;
                    if (fxData.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != paymentDraft.destinationAccount.currencyCodeAvailableBalance) {
                        this.countervaluePaymentAmount.tradeCurrency = paymentDraft.destinationAccount.currencyCodeAvailableBalance;
                    } else {
                        this.countervaluePaymentAmount.tradeCurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance; // BH 30/12/2020
                    }
                    this.fxValueDetailsNominal = new FxValueDetailsNominal();
                    this.fxValueDetailsNominal.fxContravalueId = fxData.fxExchangeResponse.fxCountervalueId;
                    this.fxValueDetailsNominal.fxCommercialMargin = new FxCommercialMargin();
                    if (fxData.fxExchangeResponse.fxComercialMargin != null) {
                        this.fxValueDetailsNominal.fxCommercialMargin.fxCommercialMarginAmount = String.valueOf(fxData.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount);
                        this.fxValueDetailsNominal.fxCommercialMargin.fxCommercialMarginCurrency = fxData.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency;
                    }
                    this.fxValueDetailsNominal.fxCounterpaymentAmount = new PaymentAmount();
                    this.fxValueDetailsNominal.fxCounterpaymentAmount.amount = String.valueOf(paymentDraft.amountSend);
                    this.fxValueDetailsNominal.fxCounterpaymentAmount.tcurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance;
                    String myNumber = String.valueOf(fxData.fxExchangeResponse.customerExchangeRate) ;
                    String afterDecimal = myNumber.substringAfter('.');
                    String myTruncatedNumber = myNumber;
                    if (afterDecimal.length() > 6) {
                        myTruncatedNumber = myNumber.subString(0,myNumber.indexOf('.') + 7);
                    }
                    this.fxValueDetailsNominal.fxExchangeRate = myTruncatedNumber;
                    this.fxValueDetailsNominal.fxExecutionDate = fxData.fxExchangeResponse.valueDateEfx;
                    this.fxValueDetailsNominal.fxValueDate = fxData.fxExchangeResponse.valueDateEfx;
            } else {
                this.countervaluePaymentAmount = new CountervaluePaymentAmount();
                this.countervaluePaymentAmount.tcurrency = this.paymentAmount.tcurrency;
                this.countervaluePaymentAmount.amount = this.paymentAmount.amount;
            }
            FundMovementPricesDataList fund = new FundMovementPricesDataList();
            WS_TransferFees.CurrencyList curr = new WS_TransferFees.CurrencyList();
            List<Concepts> concepts = null;
            if (paymentDraft.transactionFeeServiceResponse != null) {
                WS_TransferFees.OUTPUT pricesData = paymentDraft.transactionFeeServiceResponse;
                if (pricesData.currencyList != null) {
                    if (!pricesData.currencyList.isEmpty()) {
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
                                if (concept.standardPrice.standardTiersList != null) {
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
            if (paymentDraft.convertedTransactionFeeServiceResponse != null) {
                WS_ExchangeRate.OUTPUT feesData = paymentDraft.convertedTransactionFeeServiceResponse;
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
                    this.fxValueDetailsFee.fxCounterpaymentAmount.tcurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance;
                    String myNumber = String.valueOf(feesData.fxExchangeResponse.customerExchangeRate) ;
                    String afterDecimal = myNumber.substringAfter('.');
                    String myTruncatedNumber = myNumber;
                    if (afterDecimal.length() >6) {
                        myTruncatedNumber = myNumber.subString(0, myNumber.indexOf('.') + 7);
                    }
                    this.fxValueDetailsFee.fxExchangeRate = myTruncatedNumber;
                    this.fxValueDetailsFee.fxExecutionDate = feesData.fxExchangeResponse.valueDateEfx;
                    this.fxValueDetailsFee.fxValueDate = feesData.fxExchangeResponse.valueDateEfx;
                }
            }
            // PENDIENTE DUDAS INTERMEDIARIO
            // this.intermediateAgent
            // this.intermediateAgentAccount
            // this.intermediateDestinationAgent
            // FLOWERPOWER_PARCHE_CERVINO
            this.intermediateAgentAccount = new DestinationAccount();
            this.intermediateAgentAccount.accountId = paymentDraft.sourceAccount.displayNumber;
            this.intermediateAgentAccount.accountIdType = paymentDraft.sourceAccount.idType;
            this.sourceAgent = new DestinationAgent();
            this.sourceAgent.agent = paymentDraft.sourceAccount.codigoBic;
            this.sourceAgent.agentName = paymentDraft.sourceAccount.bankName;
            this.sourceAgent.addressAgent = paymentDraft.sourceAccount.country; // FLOWERPOWER_PARCHE_CERVINO: PENDIENTE PREGUNTAR MARIA
            this.sourceName = paymentDraft.sourceAccount.subsidiaryName;
            // this.requestExecutionDate = FXData.fxExchangeResponse.valueDateEfx; // SOLO APLICA CUENTAS NO BANCO SANTANDER
            // this.signCrlCode; Como se si no es una cuenta del santander // SOLO APLICA CUENTAS NO BANCO SANTANDER
            this.urgencyIndicator = urgencyIndicator;
            // this.urlAppRedirect; De donde saco este valor // SOLO APLICA CUENTAS NO BANCO SANTANDER
        }

        global OrchestationBody (WRAPPER_PaymentDetail.OperationDetail paymentDetail, String paymentId, String FXTimer, WS_ExchangeRate.OUTPUT FXData, WS_ExchangeRate.OUTPUT feesData ){
            this.fxTimer = FXTimer;
            if (String.isNotBlank(paymentDetail.productId)) {
                this.productId = paymentDetail.productId;
            }
            if (String.isNotBlank(paymentDetail.productId)) {
                this.serviceId = paymentDetail.serviceId;
            }
            this.bookToBookId = paymentId;
            if (paymentDetail.sourceData != null) {
                if (paymentDetail.sourceData.sourceAddress != null) {
                    this.sourceAddress = new DestinationAddress();
                    if (paymentDetail.sourceData.sourceAddress.streetName != null) {
                        this.sourceAddress.streetName =  paymentDetail.sourceData.sourceAddress.streetName;
                    }
                    if (paymentDetail.sourceData.sourceAddress.floor != null) {
                        this.sourceAddress.floor =  paymentDetail.sourceData.sourceAddress.floor;
                    }
                    if (paymentDetail.sourceData.sourceAddress.townName != null) {
                        this.sourceAddress.townName = paymentDetail.sourceData.sourceAddress.townName;
                    }
                    if (paymentDetail.sourceData.sourceAddress.state != null) {
                        this.sourceAddress.state =  paymentDetail.sourceData.sourceAddress.state;
                    }
                    if (paymentDetail.sourceData.sourceAddress.country != null) {
                        this.sourceAddress.country = paymentDetail.sourceData.sourceAddress.country;
                    }
                }
            }
            if (paymentDetail.destinationData != null) {
                if (paymentDetail.destinationData.destinationAddress != null) {
                    this.destinationAddress = new DestinationAddress();
                    if (paymentDetail.destinationData.destinationAddress.streetName != null) {
                        this.destinationAddress.streetName =  paymentDetail.destinationData.destinationAddress.streetName;
                    }
                    if (paymentDetail.sourceData.sourceAddress.floor != null) {
                        this.sourceAddress.floor =  paymentDetail.sourceData.sourceAddress.floor;
                    }
                    if (paymentDetail.destinationData.destinationAddress.townName != null) {
                        this.destinationAddress.townName = paymentDetail.destinationData.destinationAddress.townName;
                    }
                    if (paymentDetail.sourceData.sourceAddress.state != null) {
                        this.sourceAddress.state =  paymentDetail.sourceData.sourceAddress.state;
                    }
                    if (paymentDetail.destinationData.destinationAddress.country != null) {
                        this.destinationAddress.country = paymentDetail.destinationData.destinationAddress.country;
                    }
                    if (paymentDetail.destinationData.destinationAddress.streetBuildingIdentification != null) {
                        this.destinationAddress.streetBuildingIdentification = paymentDetail.destinationData.destinationAddress.streetBuildingIdentification;
                    }
                    if (paymentDetail.destinationData.destinationAddress.postCodeIdentification != null) {
                        this.destinationAddress.postCodeIdentification = paymentDetail.destinationData.destinationAddress.postCodeIdentification;
                    }
                }
            }
            if (paymentDetail.productId != System.Label.CNF_payment_productId_001) {
                this.customerIndicator = 'different';
            } else {
                this.customerIndicator = 'equal';
            }
            this.idempotentReference = paymentId;
            this.endToEndIdentification = paymentDetail.clientReference;
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
                        String myNumber = String.valueOf(FXData.fxExchangeResponse.customerExchangeRate);
                        String afterDecimal = myNumber.substringAfter('.');
                        String myTruncatedNumber = myNumber;
                        if (afterDecimal.length() > 6) {
                            myTruncatedNumber = myNumber.subString(0, myNumber.indexOf('.') + 7);
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
                if (paymentDetail.pricingDetails != null) {
                    if (paymentDetail.pricingDetails.currencyList != null && !paymentDetail.pricingDetails.currencyList.isEmpty()) {
                        WRAPPER_PaymentDetail.CurrencyList curr = paymentDetail.pricingDetails.currencyList[0];
                        fund.currencyDetails = new CurrencyDetails();
                        fund.currencyDetails.tcurrency = curr.tcurrency;
                        fund.currencyDetails.currencyName = curr.currencyName;
                        if (curr.conceptsList != null) {
                            if (!curr.conceptsList.isEmpty()) {
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
            // PENDIENTE DUDAS INTERMEDIARIO
            // this.intermediateAgent
            // this.intermediateAgentAccount
            // this.intermediateDestinationAgent
            // this.requestExecutionDate = FXData.fxExchangeResponse.valueDateEfx; // NO APLICA PARA BANCO SANTANDER
            // this.signCrlCode; Como se si no es una cuenta del santander // NO APLICA PARA BANCO SANTANDER
            this.urgencyIndicator = 'Standard';
            // this.urlAppRedirect; De donde saco este valor // NO APLICA PARA BANCO SANTANDER
        }
    }

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Release Payment
    History
    <Date>          <Author>            <Description>
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
     global void executePayment (WRAPPER_PAY_PaymentDraft paymentDraft, String urgencyIndicator) {
        try {

            ReturnValue dataValidation = CNT_B2B_OrchestationUtilities.validateUserInput(paymentDraft);
            if (dataValidation != null && dataValidation.success) {
                String country;
                String codigoBic;
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('B2B_executePayment');
                String finalEndPoint = configWs.CNT_Endpoint__c;
                if (!Test.isRunningTest()) {
                    OrchestationBody initBody = new OrchestationBody(paymentDraft, urgencyIndicator);
                    Map<String, String> headers = new Map<string, String>();
                    if (String.isNotBlank(paymentDraft.sourceAccount.country) && String.isNotBlank(paymentDraft.sourceAccount.codigoBic)) {
                        country = paymentDraft.sourceAccount.country;
                        codigoBic = paymentDraft.sourceAccount.codigoBic;
                        if (codigoBIC.length() >= 11) {
                            codigoBIC = codigoBIC.subString(0, 8);
                        }
                    }
                    if (String.isNotBlank(paymentDraft.destinationAccount.creditorDocument.documentType)) {
                        headers.put('Document-Type', paymentDraft.destinationAccount.creditorDocument.documentType);
                    }
                    if (String.isNotBlank(paymentDraft.destinationAccount.creditorDocument.documentNumber)) {
                        headers.put('Document-Number', paymentDraft.destinationAccount.creditorDocument.documentNumber);
                    }
                    headers.put('Signature-step1', 'step1');
                    headers.put('Signature-step2', 'step2');
                    headers.put('Global-Payment-Id', this.paymentId);
                    String sourceCustomerId = '';
                    if (String.isNotBlank(paymentDraft.sourceAccount.customerId)) {
                        sourceCustomerId = paymentDraft.sourceAccount.customerId;
                    }
                    if(paymentDraft.sourceAccount.companyIdsList != null &&  String.isNotBlank(paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier))) {
                        sourceCustomerId = paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier);
                    }
                    headers.put('customer_id', sourceCustomerId);
                    headers.put('Access-Channel', 'web');
                    String authenticationplatform = TokenService.getTokenPlatform(country);
                    headers.put('authenticationplatform', authenticationplatform);
                    TokenInformation tokenInformation = new TokenInformation(country, configWs.tokenPlatform__c, configWs.tokenUser__c, null, codigoBic, null, null, null, null);
                   String response = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBody, true), finalEndPoint, configWs.CNT_HTTPMethod__c, headers, null, null, 120000, tokenInformation);
                   //String response = '{ "errors": [ { "code": "500", "message": "PAY004", "level": "", "description": "An error occurred when executing first B2B payment" } ] }';
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
            } else {
                WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentDraft.paymentId);
                String status = '999';
                String reason = '004';
                wsObject.updateStatus(status, reason);
                
                System.debug('The following exception has occurred: ' + dataValidation.msg);
                throw new CustomException(dataValidation.msg);
            }
        } catch (Exception e) {
            System.debug('WS_B2B_Orchestation.OrchestationOutput: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
    }

    global void executePayment (WRAPPER_PaymentDetail.OperationDetail paymentDetail, String paymentId, String FXTimer,WS_ExchangeRate.OUTPUT FXData, WS_ExchangeRate.OUTPUT feesData) {
        try {
            ReturnValue dataValidation = CNT_B2B_OrchestationUtilities.validateUserInput(paymentDetail, paymentId, FXData, feesData);

            if(dataValidation != null && dataValidation.success){
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
                    
                    if (String.isNotBlank(paymentDetail.destinationData.creditorDocument.documentType)) {
                        headers.put('Document-Type', paymentDetail.destinationData.creditorDocument.documentType);
                    }
                    if (String.isNotBlank(paymentDetail.destinationData.creditorDocument.documentNumber)) {
                        headers.put('Document-Number', paymentDetail.destinationData.creditorDocument.documentNumber);
                    }
                    headers.put('Global-Payment-Id', this.paymentId);
                    headers.put('Access-Channel', 'web');
                    if (paymentDetail.sourceData != null) {
                        if (String.isNotBlank(paymentDetail.sourceData.customerId)) {
                        headers.put('customer_id', paymentDetail.sourceData.customerId);
                        } else {
                            headers.put('customer_id','');
                        }
                    } else {
                        headers.put('customer_id','');
                    }
                    String authenticationplatform = TokenService.getTokenPlatform(country);
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
            } else {
                WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
                String status = '999';
                String reason = '004';
                wsObject.updateStatus(status, reason);
                
                System.debug('The following exception has occurred: ' + dataValidation.msg);
                throw new CustomException(dataValidation.msg);
            }
        } catch (Exception e) {
            System.debug('OrchestationOutput: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
    }
}