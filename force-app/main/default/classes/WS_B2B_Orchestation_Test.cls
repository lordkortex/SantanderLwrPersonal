@isTest
public class WS_B2B_Orchestation_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true); 
    }
    
    @isTest
    static void OrchestationConstructor_Test01(){
        
        Test.setMock(HttpCalloutMock.class, new WS_B2B_Orchestation_MockHttp.B2B_Orchestation());
        Test.setMock(HttpCalloutMock.class, new CNT_PAY_PaymentOptions_MockHttp());
        
        //OrcErrors params
        WS_B2B_Orchestation.OrcErrors orcErrors = new WS_B2B_Orchestation.OrcErrors();
        orcErrors.code = 'codeTest';
        orcErrors.description = 'descriptionTest';
        orcErrors.level = 'levelTest';
        orcErrors.message = 'messageTest';
        
        List<WS_B2B_Orchestation.OrcErrors> errors = new List<WS_B2B_Orchestation.OrcErrors>();
        errors.add(orcErrors);
        
        //BuyNominal params
        WS_B2B_Orchestation.BuyNominal buyNom = new WS_B2B_Orchestation.BuyNominal();
        buyNom = new WS_B2B_Orchestation.BuyNominal('buyNominalAmountTest', 'buyNominalCurrencyTest');
        
        //SellNominal params
        WS_B2B_Orchestation.SellNominal sellNom = new WS_B2B_Orchestation.SellNominal();
        sellNom = new WS_B2B_Orchestation.SellNominal('sellNominalAmountTest', 'sellNominalCurrencyTest');
        
        //PaymentFraudDetails params
        WS_B2B_Orchestation.PaymentFraudDetails fraudDetails = new WS_B2B_Orchestation.PaymentFraudDetails();
        fraudDetails.fraudReference = 'fraudReferenceTest';
        fraudDetails.fraudValidationResult = 'fraudValidationResultTest';
        
        //DataCancelConfirmFx params
        WS_B2B_Orchestation.DataCancelConfirmFx datCancelConfirmFx = new WS_B2B_Orchestation.DataCancelConfirmFx();
        datCancelConfirmFx.buyNominal = buyNom;
        datCancelConfirmFx.operationReference = 'operationReferenceTest';
        datCancelConfirmFx.priceType = 'priceTypeTest';
        datCancelConfirmFx.sellNominal = sellNom;
        datCancelConfirmFx.valueDateRequested = 'valueDateRequestedTest';
        
        //FxValueDetailsFee params
        WS_B2B_Orchestation.FxValueDetailsFee fxValueDetailsFeeTest = new WS_B2B_Orchestation.FxValueDetailsFee();
        fxValueDetailsFeeTest.FxCommercialMargin = new WS_B2B_Orchestation.FxCommercialMargin();
        fxValueDetailsFeeTest.fxContravalueId = 'test';
        fxValueDetailsFeeTest.fxCounterpaymentAmount = fxValueDetailsFeeTest.FxCommercialMargin;
        fxValueDetailsFeeTest.fxExchangeRate = 'fxExchangeRateTest';
        fxValueDetailsFeeTest.fxExecutionDate = 'test';
        fxValueDetailsFeeTest.fxValueDate = 'test';
        
        //IntermediateAgent params
        WS_B2B_Orchestation.IntermediateAgent interAgent = new WS_B2B_Orchestation.IntermediateAgent();
        interAgent.addressAgent = 'addressAgentTest';
        interAgent.agent = 'agentTest';
        interAgent.agentName = 'agentNameTest';
        interAgent.intermediateAccount = new WS_B2B_Orchestation.DestinationAccount();
        
        //Tiers params
        WS_B2B_Orchestation.Tiers tiersTest = new WS_B2B_Orchestation.Tiers();
        tiersTest.amountTier = 123.34;
        tiersTest.amountTierType = 'amountTierTypeTest';
        WS_B2B_Orchestation.FixedAmountPrice fixedAmountPriceTest = new WS_B2B_Orchestation.FixedAmountPrice();
        fixedAmountPriceTest.amount = '1000';
        fixedAmountPriceTest.tcurrency = 'PLN';
        tiersTest.fixedAmountPrice = fixedAmountPriceTest;
        WS_B2B_Orchestation.FixedRatePrice fixedRatePriceTest = new WS_B2B_Orchestation.FixedRatePrice();
        fixedRatePriceTest.tcurrency = 'PLN';
        fixedRatePriceTest.maximumAmount = 123.45;
        fixedRatePriceTest.minimumAmount = 123;
        fixedRatePriceTest.rate = 10;
        tiersTest.fixedRatePrice = fixedRatePriceTest;
        
        //Concepts params
        WS_B2B_Orchestation.Concepts conceptsTest = new WS_B2B_Orchestation.Concepts();
        WS_B2B_Orchestation.SpecialPrice specialPriceTest = new WS_B2B_Orchestation.SpecialPrice();
        specialPriceTest.specialPriceLevel = 'specialPriceLevelTest';
        specialPriceTest.specialTiersList = new List<WS_B2B_Orchestation.Tiers>();
        specialPriceTest.specialTiersList.add(tiersTest);
        WS_B2B_Orchestation.StandardPrice standardPriceTest = new WS_B2B_Orchestation.StandardPrice();
        standardPriceTest.standardTiersList = new List<WS_B2B_Orchestation.Tiers>();
        conceptsTest.specialPrice = specialPriceTest;
        conceptsTest.standardPrice = standardPriceTest;
        
        //OrchestationBody empty constructor
        WS_B2B_Orchestation.OrchestationBody emptyOrchestrationBody = new WS_B2B_Orchestation.OrchestationBody();
        
        //params
        String str = MockResponse.B2BData_PaymentAmount(); 
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        str = MockResponse.WS_ExchangeRate();
        WS_ExchangeRate.OUTPUT exchRate = (WS_ExchangeRate.OUTPUT) JSON.deserialize(str, WS_ExchangeRate.OUTPUT.class);
        str = MockResponse.WS_TransferFees();
        WS_TransferFees.OUTPUT pricesData = (WS_TransferFees.OUTPUT) JSON.deserialize(str, WS_TransferFees.OUTPUT.class);
        
        Test.startTest();
        
        //Constructor OrchestationBody v1
        WS_B2B_Orchestation orchestration = new WS_B2B_Orchestation();
        WS_B2B_Orchestation.OrchestationBody orchestrationBody = new WS_B2B_Orchestation.OrchestationBody(amountData, 
                                                                    exchRate, exchRate, 
                                                                    pricesData, destinationAccount, 
                                                                    destinationAccount, 'paymentId', 'FXTimer', 
                                                                    'description', 'clientReference','productId','chargebearer','urgencyindicator');
        
        //executePayment v1
        orchestration.setPaymentId('paymentId');
        orchestration.executePayment(amountData, 
                                     amountData.exchangeRateServiceResponse, 
                                     amountData.convertedTransactionFeeServiceResponse, 
                                     amountData.transactionFeeServiceResponse, 
                                     destinationAccount, 
                                     destinationAccount, 
                                     'FXTimer', 
                                     'description',
                                     'clientReference','productId','chargebearer','urgencyindicator');
        Test.stopTest();
        
    }
    
    @isTest
    static void OrchestationConstructor_Test02(){
        
        Test.setMock(HttpCalloutMock.class, new WS_B2B_Orchestation_MockHttp.B2B_Orchestation());
        Test.setMock(HttpCalloutMock.class, new CNT_PAY_PaymentOptions_MockHttp());
        //params
        String str = MockResponse.B2BData_PaymentAmount(); 
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        str = MockResponse.WS_ExchangeRate();
        WS_ExchangeRate.OUTPUT exchRate = (WS_ExchangeRate.OUTPUT) JSON.deserialize(str, WS_ExchangeRate.OUTPUT.class);
        str = MockResponse.WS_TransferFees();
        WS_TransferFees.OUTPUT pricesData = (WS_TransferFees.OUTPUT) JSON.deserialize(str, WS_TransferFees.OUTPUT.class);
        str = MockResponse.WRAPPER_PaymentDetail();
        
        WRAPPER_PaymentDetail payment = WRAPPER_PaymentDetail.parse(str);
        
        Test.startTest();
        
        //Constructor OrchestationBody v2
        WS_B2B_Orchestation orchestration = new WS_B2B_Orchestation();
        WS_B2B_Orchestation.OrchestationBody orchestrationBody = new WS_B2B_Orchestation.OrchestationBody(payment.operationResponse.operationDetail,
                                                                                                          'paymentId',
                                                                                                          'FXTimer',exchRate,exchRate);
        
        //executePayment v2
        orchestration.setPaymentId('paymentId');
        orchestration.executePayment(payment.operationResponse.operationDetail, 'paymentId', 'FXTimer', exchRate, exchRate);
        Test.stopTest();
        
    }
    
}