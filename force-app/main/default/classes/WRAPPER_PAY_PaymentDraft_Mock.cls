@isTest
public with sharing class WRAPPER_PAY_PaymentDraft_Mock {

    public WRAPPER_PAY_PaymentDraft_Mock (){}

    public WRAPPER_PAY_PaymentDraft bookToBookDraft () {
        return bookToBookDraft(false);
    }

    public WRAPPER_PAY_PaymentDraft bookToBookDraft (Boolean addExpensesAccount) {
        // Accounts
        WRAPPER_PAY_PaymentDraft paymentDraft = new WRAPPER_PAY_PaymentDraft();
        paymentDraft.sourceAccount = addSpainAccount();
        if (addExpensesAccount != null && addExpensesAccount == true) {
            paymentDraft.expensesAccount = addSpainAccount();
        }
        paymentDraft.destinationAccount = addGreatBritainAccount();
        // Basic Data
        paymentDraft.paymentId = 'f548286b75ca42e7ad5c5602589338c7';
        paymentDraft.productId = System.Label.CNF_payment_productId_001;
        paymentDraft.serviceId = 'add_international_payment_internal';
        paymentDraft.paymentMethod = 'book_to_book';
        // Amount Data
        paymentDraft.fromOrigin = true;
        paymentDraft.amountSend = 6;
        paymentDraft.amountReceive = 7;
        paymentDraft.amountEnteredFrom = 'source';
        paymentDraft.exchangeRate = 0.9;
        paymentDraft.timestamp = '15:48';
        paymentDraft.fxTimer = '2021-01-05 10:48:40';
        paymentDraft.transactionFee = 2;
        paymentDraft.transactionFeeCurrency = 'EUR';
        paymentDraft.convertedTransactionFee = null;
        paymentDraft.convertedTransactionFeeCurrency = null;
        paymentDraft.exchangeRateServiceResponse = addExchangeRate();
        paymentDraft.transactionFeeServiceResponse = addTransactionFeeServiceResponse();
        paymentDraft.convertedTransactionFeeServiceResponse = null;
        paymentDraft.baseAmount = 12.5;
        paymentDraft.baseCurrency = 'EUR';
        paymentDraft.sourceCurrencyDominant = true;
        paymentDraft.paymentCurrency = 'EUR';
        // Other Information
        paymentDraft.chargeBearer = 'OUR';
        paymentDraft.reference = 'sfdc202012301830';
        paymentDraft.purpose = 'Charity';
        paymentDraft.comercialCode = 'Charity';
        paymentDraft.description = 'Example draft';
        paymentDraft.reason = 'Reasonable';
        paymentDraft.documents = addDocuments();
        return paymentDraft;
    }
    private List<Map<String,String>> addDocuments () {
        List<Map<String, String>> response = new List<Map<String,String>>();
        Map<String,String> mapDocument = new Map<String, String>();
        mapDocument.put('DOC','DOC');
        response.add(mapDocument);
        return response; 
        
    }

    public WRAPPER_PAY_PaymentDraft internationalInstantPaymentDraft (Boolean addExpensesAccount) {
        // Accounts
        WRAPPER_PAY_PaymentDraft paymentDraft = new WRAPPER_PAY_PaymentDraft();
        paymentDraft.sourceAccount = addSpainAccount();
        if (addExpensesAccount != null && addExpensesAccount == true) {
            paymentDraft.expensesAccount = addSpainAccount();
        }
        paymentDraft.destinationAccount = addGreatBritainAccount();
        // Basic Data
        paymentDraft.paymentId = 'f548286b75ca42e7ad5c5602589338c7';
        paymentDraft.productId = System.Label.CNF_payment_productId_002;
        paymentDraft.serviceId = 'add_international_payment_internal';
        paymentDraft.paymentMethod = 'book_to_book';
        // Amount Data
        paymentDraft.fromOrigin = true;
        paymentDraft.amountSend = 6;
        paymentDraft.amountReceive = 7;
        paymentDraft.amountEnteredFrom = 'source';
        paymentDraft.exchangeRate = 0.9;
        paymentDraft.timestamp = '15:48';
        paymentDraft.fxTimer = '2021-01-05 10:48:40';
        paymentDraft.transactionFee = 2;
        paymentDraft.transactionFeeCurrency = 'EUR';
        paymentDraft.convertedTransactionFee = null;
        paymentDraft.convertedTransactionFeeCurrency = null;
        paymentDraft.exchangeRateServiceResponse = addExchangeRate();
        paymentDraft.transactionFeeServiceResponse = addTransactionFeeServiceResponse();
        paymentDraft.convertedTransactionFeeServiceResponse = null;
        paymentDraft.baseAmount = 12.5;
        paymentDraft.baseCurrency = 'EUR';
        paymentDraft.sourceCurrencyDominant = true;
        paymentDraft.paymentCurrency = 'EUR';
        
        // Other Information
        paymentDraft.chargeBearer = 'OUR';
        paymentDraft.reference = 'sfdc202012301830';
        paymentDraft.purpose = 'Charity';
        paymentDraft.comercialCode = 'Charity';
        paymentDraft.description = 'Example draft';
        paymentDraft.reason = 'Reasonable';

        return paymentDraft;
    }

    private WS_TransferFees.OUTPUT addTransactionFeeServiceResponse () {
        WS_TransferFees.OUTPUT response = new WS_TransferFees.OUTPUT();
        response.productName = 'productName';
        response.currencyList = new List<WS_TransferFees.CurrencyList>();
        WS_TransferFees.CurrencyList tcurrency = addCurrencyList();
        response.currencyList.add(tcurrency);
        return response;
    }

    private WS_TransferFees.CurrencyList addCurrencyList () {
        WS_TransferFees.CurrencyList response = new WS_TransferFees.CurrencyList();
        response.tcurrency = 'EUR';
        response.conceptsList = new List<WS_TransferFees.Concepts>();
        WS_TransferFees.Concepts concept = addConcept();
        response.conceptsList.add(concept);
        return response;
    }

    private WS_TransferFees.Concepts addConcept () {
        WS_TransferFees.Concepts response = new WS_TransferFees.Concepts();
        response.conceptId = '291';
        response.conceptName = 'OUR Expenses Commission';
        response.standardPrice = new WS_TransferFees.StandardPrice();       
        response.standardPrice.standardTiersList = new List<WS_TransferFees.StandardTiers>();
        WS_TransferFees.StandardTiers standardTier = addStandardTier();
        response.standardPrice.standardTiersList.add(standardTier);
        response.specialPrice = new WS_TransferFees.SpecialPrice();
        response.specialPrice.specialTiersList = new List<WS_TransferFees.SpecialTiers>();
        WS_TransferFees.SpecialTiers specialTiers = addSpecialTier();
        response.specialPrice.specialTiersList.add(specialTiers);
        response.specialPrice.specialPriceLevel = '';
        response.conceptAmount = addConceptAmount();
       
        return response;
    }

    private WS_TransferFees.StandardTiers addStandardTier () {
        WS_TransferFees.StandardTiers response = new WS_TransferFees.StandardTiers();
        response.standardAmountTier = 9999999999.00;
        response.standardFixedAmountPrice = addStandardFixedAmountPrice();
        return response;
    }
    private WS_TransferFees.SpecialTiers addSpecialTier () {
        WS_TransferFees.SpecialTiers response = new WS_TransferFees.SpecialTiers();
        response.specialAmountTier = 9999999999.00;
        response.specialAmountTierType = '';
        response.specialFixedAmountPrice = addspecialFixedAmountPrice();
        response.specialFixedRatePrice = addspecialFixedRatePrice();
        return response;
    }
    
    private WS_TransferFees.SpecialFixedRatePrice addspecialFixedRatePrice () {
        WS_TransferFees.SpecialFixedRatePrice response = new WS_TransferFees.SpecialFixedRatePrice();
        response.specialRate = 2;
        response.specialMinimumAmount = 1;
        response.specialMaximumAmount = 100;
        response.tcurrency = 'GBP';
        return response;
    }
     private WS_TransferFees.SpecialFixedAmountPrice addspecialFixedAmountPrice () {
        WS_TransferFees.SpecialFixedAmountPrice response = new WS_TransferFees.SpecialFixedAmountPrice();
        response.specialFixedAmount = 2;
        response.tcurrency = 'GBP';
        return response;
    }
    
    private WS_TransferFees.StandardFixedAmountPrice addStandardFixedAmountPrice () {
        WS_TransferFees.StandardFixedAmountPrice response = new WS_TransferFees.StandardFixedAmountPrice();
        response.standardFixedAmount = 2;
        response.tcurrency = 'GBP';
        return response;
    }

    private WS_TransferFees.ConceptAmount addConceptAmount () {
        WS_TransferFees.ConceptAmount response = new WS_TransferFees.ConceptAmount();
        response.amount = 2;
        response.tcurrency = 'GBP';
        return response;
    }

    private WS_ExchangeRate.OUTPUT addExchangeRate () {
        WS_ExchangeRate.OUTPUT exchangeRate = new WS_ExchangeRate.OUTPUT();
        WS_ExchangeRate.FxExchangeResponse fxExchangeResponse = new WS_ExchangeRate.FxExchangeResponse();
        fxExchangeResponse.fxCountervalueId = 'GTS0000000000000000038';
        fxExchangeResponse.ccyCountervalue = new WS_ExchangeRate.CcyCountervalue();
        fxExchangeResponse.ccyCountervalue.ccyCountervalueAmount = '7';
        fxExchangeResponse.ccyCountervalue.ccyCountervalueCurrency = 'GBP';
        fxExchangeResponse.valueDateEfx = '2020-12-29';
        fxExchangeResponse.customerExchangeRate = 0.9;
        fxExchangeResponse.fxComercialMargin = new WS_ExchangeRate.FxComercialMargin();
        fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount = 0.2;
        fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency = 'GBP';
        exchangeRate.fxExchangeResponse = fxExchangeResponse;
        exchangeRate.amountReceive = '7';
        exchangeRate.amountSend = '6'; 
        exchangeRate.priceType = 'EUR';
        exchangeRate.timestamp = '2021-01-05 10:48:40';
        return exchangeRate;
    }

    private WRAPPER_AccountList.AccountDetails addGreatBritainAccount () {
        WRAPPER_AccountList.AccountDetails greatBritainAccount = new WRAPPER_AccountList.AccountDetails();
        greatBritainAccount.address = new WRAPPER_AccountList.Address();
        greatBritainAccount.address.streetName = 'Calle Heatrow';
        greatBritainAccount.address.townName = 'Belo Horizonte';
        greatBritainAccount.address.country = 'GB';
        greatBritainAccount.alias = '';
        greatBritainAccount.amountAvailableBalance = 40001;
        greatBritainAccount.amountMainBalance = 40000;
        greatBritainAccount.balanceAllowed = true;
        greatBritainAccount.bankName = 'BANCO SANTANDER S.A.';
        greatBritainAccount.bic = 'BSCH';
        greatBritainAccount.branch = 'XXX';
        greatBritainAccount.codigoBic = 'BSCHESMMXXX';
        greatBritainAccount.codigoCorporate = 'J000104892';
        greatBritainAccount.companyIdsList = new Map<String, String>();
        greatBritainAccount.companyIdsList.put('LOCAL', 'J101484427');
        greatBritainAccount.companyIdsList.put('GLOBAL', '-1363016250');
        greatBritainAccount.companyIdsList.put('NEXUS', '4382');
        greatBritainAccount.country = 'GB';
        greatBritainAccount.countryName = 'Great Britain';
        greatBritainAccount.currencyCodeAvailableBalance = 'GBP';
        greatBritainAccount.customerId = 'J000104892';
        greatBritainAccount.displayNumber = 'GB37ABBY09072445283289';
        greatBritainAccount.hasSwiftPayments = 'false';
        greatBritainAccount.idType = 'IBA';
        greatBritainAccount.internationalPaymentsAllowed = true;
        greatBritainAccount.lastUpdateAvailableBalance = '2021-01-05 10:48:40';
        greatBritainAccount.lastUpdateAvailableBalanceMain = '2021-01-05T09:48:40.247+0000';
        greatBritainAccount.locatorbic = 'MM';
        greatBritainAccount.mandatoryPurpose = false;
        greatBritainAccount.paisbic = 'GB';
        greatBritainAccount.status = 'Open';
        greatBritainAccount.subsidiaryName = 'M.G.M. ACCIAIERIA ITALIA';
        greatBritainAccount.transactionsAllowed = true;
        greatBritainAccount.valueDate = '2021-01-20T12:51:07.285+0000';
        return greatBritainAccount;
    }

    private WRAPPER_AccountList.AccountDetails addSpainAccount () {
        WRAPPER_AccountList.AccountDetails spainAccount = new WRAPPER_AccountList.AccountDetails();
        spainAccount.address = new WRAPPER_AccountList.Address();
        spainAccount.address.streetName = 'Calle Patones';
        spainAccount.address.townName = 'Madrid';
        spainAccount.address.country = 'ES';
        spainAccount.alias = '';
        spainAccount.amountAvailableBalance = 671.36;
        spainAccount.amountMainBalance = 670.36;
        spainAccount.balanceAllowed = true;
        spainAccount.bankName = 'BANCO SANTANDER S.A.';
        spainAccount.bic = 'BSCH';
        spainAccount.branch = 'XXX';
        spainAccount.codigoBic = 'BSCHESMMXXX';
        spainAccount.codigoCorporate = 'J101484427';
        spainAccount.companyIdsList = new Map<String, String>();
        spainAccount.companyIdsList.put('LOCAL', 'J101484427');
        spainAccount.companyIdsList.put('GLOBAL', '-1363016250');
        spainAccount.companyIdsList.put('NEXUS', '4382');
        spainAccount.country = 'ES';
        spainAccount.countryName = 'Spain';
        spainAccount.currencyCodeAvailableBalance = 'EUR';
        spainAccount.customerId = 'J101484427';
        spainAccount.displayNumber = 'ES7700490454193000541739';
        spainAccount.hasSwiftPayments = 'false';
        spainAccount.idType = 'IBA';
        spainAccount.internationalPaymentsAllowed = true;
        spainAccount.lastUpdateAvailableBalance = '2021-01-20 13:51:07';
        spainAccount.lastUpdateAvailableBalanceMain = '2021-01-20T12:51:07.285+0000';
        spainAccount.locatorbic = 'MM';
        spainAccount.mandatoryPurpose = false;
        spainAccount.paisbic = 'ES';
        spainAccount.status = 'Open';
        spainAccount.subsidiaryName = 'M.G.M. ACCIAIERIA ITALIA';
        spainAccount.transactionsAllowed = true;
        spainAccount.valueDate = '2021-01-20T12:51:07.285+0000';
        return spainAccount;
    }

    public WRAPPER_PAY_PaymentDraft paymentDraftOrchestration(){
        String str = MockResponse.WRAPPER_PaymentDetail();
        WRAPPER_PaymentDetail payment = WRAPPER_PaymentDetail.parse(str);
        
        String paymentId = '12345';
     
        WRAPPER_PAY_PaymentDraft paymentDraft = new WRAPPER_PAY_PaymentDraft();        
        paymentDraft.paymentId = paymentId;
        paymentDraft.amountSend = Decimal.valueOf(payment.operationResponse.operationDetail.amountSend);
        paymentDraft.amountReceive =  Decimal.valueOf(payment.operationResponse.operationDetail.amountReceive);
        paymentDraft.serviceId = payment.operationResponse.operationDetail.serviceId; 
        paymentDraft.paymentMethod =  payment.operationResponse.operationDetail.paymentMethod;
        paymentDraft.purpose =  payment.operationResponse.operationDetail.purpose;
        paymentDraft.chargeBearer =  payment.operationResponse.operationDetail.chargeBearer;
        WRAPPER_AccountList.AccountDetails sourceAccount = new WRAPPER_AccountList.AccountDetails();
        sourceAccount.subsidiaryName = payment.operationResponse.operationDetail.sourceData.name;
        sourceAccount.displayNumber = payment.operationResponse.operationDetail.sourceData.sourceAccount.accountId;
        sourceAccount.type = payment.operationResponse.operationDetail.sourceData.sourceAccount.accountType;
        sourceAccount.currencyCodeMainBalance = payment.operationResponse.operationDetail.sourceData.sourceAccount.tcurrency;
        WRAPPER_AccountList.Address address = new  WRAPPER_AccountList.Address();
        address.streetName = payment.operationResponse.operationDetail.sourceData.sourceAddress.streetName;
        address.townName = payment.operationResponse.operationDetail.sourceData.sourceAddress.townName;
        address.country = payment.operationResponse.operationDetail.sourceData.sourceAddress.country;
        sourceAccount.address = address;
        sourceAccount.codigoBic = payment.operationResponse.operationDetail.sourceData.sourceAgent.agentId;
        sourceAccount.bankName = payment.operationResponse.operationDetail.sourceData.sourceAgent.name;
        sourceAccount.currencyCodeAvailableBalance = payment.operationResponse.operationDetail.operationAmount.tcurrency;
        paymentDraft.sourceAccount = sourceAccount;
        
        WRAPPER_AccountList.AccountDetails destinationAccount = new WRAPPER_AccountList.AccountDetails();
        destinationAccount.subsidiaryName = payment.operationResponse.operationDetail.destinationData.name;
        destinationAccount.displayNumber = payment.operationResponse.operationDetail.destinationData.destinationAccount.accountId;
        destinationAccount.type = payment.operationResponse.operationDetail.destinationData.destinationAccount.accountType;
        destinationAccount.currencyCodeMainBalance = payment.operationResponse.operationDetail.destinationData.destinationAccount.tcurrency;
        WRAPPER_AccountList.Address addressDestination = new  WRAPPER_AccountList.Address();
        addressDestination.streetName = payment.operationResponse.operationDetail.destinationData.destinationAddress.streetName;
        addressDestination.townName = payment.operationResponse.operationDetail.destinationData.destinationAddress.townName;
        addressDestination.country = payment.operationResponse.operationDetail.destinationData.destinationAddress.country;
        destinationAccount.address = addressDestination;
        destinationAccount.codigoBic = payment.operationResponse.operationDetail.destinationData.destinationAgent.agentId;
        destinationAccount.bankName = payment.operationResponse.operationDetail.destinationData.destinationAgent.name;
        destinationAccount.currencyCodeAvailableBalance = payment.operationResponse.operationDetail.operationAmount.tcurrency;

        paymentDraft.destinationAccount = destinationAccount;

        paymentDraft.description = payment.operationResponse.operationDetail.subject;
        paymentDraft.reference = payment.operationResponse.operationDetail.clientReference;
        
        
        WS_ExchangeRate.OUTPUT exchangeRateServiceResponse = new WS_ExchangeRate.OUTPUT();
        WS_ExchangeRate.FxExchangeResponse fxExchangeResponse = new WS_ExchangeRate.FxExchangeResponse();
        fxExchangeResponse.valueDateEfx = payment.operationResponse.operationDetail.operationNominalFxDetails.valueDateEfx;
        fxExchangeResponse.fxCountervalueId = payment.operationResponse.operationDetail.operationNominalFxDetails.fxCountervalueId;
        WS_ExchangeRate.CcyCountervalue ccyCountervalue = new WS_ExchangeRate.CcyCountervalue();
        ccyCountervalue.ccyCountervalueAmount = String.valueOf(payment.operationResponse.operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount);
        ccyCountervalue.ccyCountervalueCurrency = payment.operationResponse.operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency;
        fxExchangeResponse.ccyCountervalue = ccyCountervalue;
        fxExchangeResponse.valueDateEfx = payment.operationResponse.operationDetail.operationNominalFxDetails.valueDateEfx;
        fxExchangeResponse.customerExchangeRate = payment.operationResponse.operationDetail.operationNominalFxDetails.customerExchangeRate;
        WS_ExchangeRate.FxComercialMargin fxComercialMargin = new WS_ExchangeRate.FxComercialMargin();
        fxComercialMargin.fxComercialMarginAmount = payment.operationResponse.operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount;
        fxComercialMargin.fxComercialMarginCurrency = payment.operationResponse.operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency;
        fxExchangeResponse.fxComercialMargin = fxComercialMargin;
        exchangeRateServiceResponse.fxExchangeResponse = fxExchangeResponse;
        paymentDraft.exchangeRateServiceResponse = exchangeRateServiceResponse;

        WS_ExchangeRate.OUTPUT convertedTransactionFeeServiceResponse = new WS_ExchangeRate.OUTPUT();
        WS_ExchangeRate.FxExchangeResponse fxExchangeResponseConverted = new WS_ExchangeRate.FxExchangeResponse();
        fxExchangeResponseConverted.valueDateEfx = payment.operationResponse.operationDetail.operationFeesFxDetails.valueDateEfx;
        fxExchangeResponseConverted.fxCountervalueId = payment.operationResponse.operationDetail.operationFeesFxDetails.fxCountervalueId;
        WS_ExchangeRate.CcyCountervalue ccyCountervalueConverted = new WS_ExchangeRate.CcyCountervalue();
        ccyCountervalueConverted.ccyCountervalueAmount = String.valueOf(payment.operationResponse.operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueAmount);
        ccyCountervalueConverted.ccyCountervalueCurrency = payment.operationResponse.operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueCurrency;
        fxExchangeResponseConverted.ccyCountervalue = ccyCountervalueConverted;
        fxExchangeResponseConverted.customerExchangeRate = payment.operationResponse.operationDetail.operationFeesFxDetails.customerExchangeRate;
        convertedTransactionFeeServiceResponse.fxExchangeResponse = fxExchangeResponseConverted;
        paymentDraft.convertedTransactionFeeServiceResponse = convertedTransactionFeeServiceResponse;
        
        WS_TransferFees.OUTPUT transactionFeeServiceResponse = new WS_TransferFees.OUTPUT();
        List<WS_TransferFees.CurrencyList> currencyList = new List<WS_TransferFees.CurrencyList>();
        transactionFeeServiceResponse.productName = payment.operationResponse.operationDetail.pricingDetails.productName;   

        for (Integer i = 0; i < payment.operationResponse.operationDetail.pricingDetails.currencyList.size(); i++) {
            WS_TransferFees.CurrencyList currencyToAdd = new  WS_TransferFees.CurrencyList();

            currencyToAdd.tcurrency = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].tcurrency;
            currencyToAdd.currencyName = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].currencyName;

            List<WS_TransferFees.Concepts> conceptsList = new List<WS_TransferFees.Concepts> ();
            
            for  (Integer j = 0; j < payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList.size(); j++)
            {
                WS_TransferFees.Concepts conceptToAdd = new WS_TransferFees.Concepts();
                conceptToAdd.conceptId = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].conceptId;
                conceptToAdd.conceptName = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].conceptName;
                WS_TransferFees.ConceptAmount conceptAmount = new WS_TransferFees.ConceptAmount();
                conceptAmount.amount = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.amount;
                conceptAmount.tcurrency = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.tcurrency;
                conceptAmount.fixing = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.fixing;
                conceptToAdd.conceptAmount = conceptAmount;

                WS_TransferFees.SpecialPrice specialPrice = new WS_TransferFees.SpecialPrice();
                specialPrice.specialPriceLevel = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialPriceLevel;
                List<WS_TransferFees.SpecialTiers> specialTiersList = new List<WS_TransferFees.SpecialTiers>();

                for (Integer k = 0; k < payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.size(); k++)
                {
                    WS_TransferFees.SpecialTiers specialTiersToAdd = new WS_TransferFees.SpecialTiers();
                    specialTiersToAdd.specialAmountTier = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTier;
                    specialTiersToAdd.specialAmountTierType = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTierType;
                        
                    WS_TransferFees.SpecialFixedRatePrice specialFixedRatePrice = new WS_TransferFees.SpecialFixedRatePrice ();
                    specialFixedRatePrice.tcurrency = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.tcurrency;
                    specialFixedRatePrice.specialRate = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialRate;
                    specialFixedRatePrice.specialMinimumAmount = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMinimumAmount;
                    specialFixedRatePrice.specialMaximumAmount = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMaximumAmount;
                    specialTiersToAdd.specialFixedRatePrice = specialFixedRatePrice;

                    WS_TransferFees.SpecialFixedAmountPrice specialFixedAmountPrice = new  WS_TransferFees.SpecialFixedAmountPrice();
                    specialFixedAmountPrice.tcurrency = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.tcurrency;
                    specialFixedAmountPrice.specialFixedAmount = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.specialFixedAmount;
                    specialTiersToAdd.specialFixedAmountPrice = specialFixedAmountPrice;

                    specialTiersList.add(specialTiersToAdd);
                }
                specialPrice.specialTiersList = specialTiersList;
                conceptToAdd.specialPrice = specialPrice;

                WS_TransferFees.StandardPrice standardPrice = new WS_TransferFees.StandardPrice();
                List<WS_TransferFees.StandardTiers> standarTiersList = new List<WS_TransferFees.StandardTiers>();
                for (Integer m = 0; m < payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList.size(); m++)
                {
                    WS_TransferFees.StandardTiers standardTiersToAdd = new WS_TransferFees.StandardTiers();
                    standardTiersToAdd.standardAmountTier = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[m].standardAmountTier;
                    standardTiersToAdd.standardAmountTierType = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[m].standardAmountTierType;

                    WS_TransferFees.StandardFixedRatePrice standarFixedRatePrice = new WS_TransferFees.StandardFixedRatePrice ();
                    standarFixedRatePrice.standardRate = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[m].standardFixedRatePrice.standardRate;
                    standarFixedRatePrice.standardMinimumAmount = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[m].standardFixedRatePrice.standardMinimumAmount;
                    standarFixedRatePrice.standardMaximumAmount = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[m].standardFixedRatePrice.standardMaximumAmount;
                    standarFixedRatePrice.tcurrency = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[m].standardFixedRatePrice.tcurrency;
                    standardTiersToAdd.standardFixedRatePrice = standarFixedRatePrice; 

                    WS_TransferFees.StandardFixedAmountPrice standarFixedAmountPrice = new  WS_TransferFees.StandardFixedAmountPrice();
                    standarFixedAmountPrice.standardFixedAmount = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[m].standardFixedAmountPrice.standardFixedAmount; 
                    standarFixedAmountPrice.tcurrency = payment.operationResponse.operationDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[m].standardFixedAmountPrice.tcurrency;
                    standardTiersToAdd.standardFixedAmountPrice = standarFixedAmountPrice;

                    standarTiersList.add(standardTiersToAdd);
                }
                standardPrice.standardTiersList = standarTiersList;
                conceptToAdd.standardPrice = standardPrice;

                conceptsList.add(conceptToAdd);
            }
            currencyToAdd.conceptsList = conceptsList;
            currencyList.add(currencyToAdd);
        }
        
        transactionFeeServiceResponse.currencyList = currencyList;
        paymentDraft.transactionFeeServiceResponse = transactionFeeServiceResponse;

        return paymentDraft;

    }
}