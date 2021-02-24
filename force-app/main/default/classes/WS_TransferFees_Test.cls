/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
18/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/

@isTest
public class WS_TransferFees_Test {
    
    @testSetup  
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
		main();
    }
   
    @isTest
    static void main(){
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(Name = 'WS_TransferFees',
                                                                       CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/prices',
                                                                       CNT_HTTPMethod__c = 'GET',
                                                                       tokenPlatform__c = 'GTS',
                                                                       tokenUser__c = 'nexus',
                                                                       CNT_Service__c = 'mulesoft');
        insert configWs;
        
        Test.setMock(HttpCalloutMock.class, new WS_TrackingPaymentOperation_MockHttp());
        Test.startTest();
        
        WS_TransferFees.StandardFixedRatePrice StandardFixedRatePrice = new WS_TransferFees.StandardFixedRatePrice();
        StandardFixedRatePrice.standardRate = 2;
        StandardFixedRatePrice.standardMinimumAmount = 100.00;
        StandardFixedRatePrice.standardMaximumAmount = 200.00;
        StandardFixedRatePrice.tcurrency ='EUR';
        
        WS_TransferFees.StandardFixedAmountPrice StandardFixedAmountPrice = new WS_TransferFees.StandardFixedAmountPrice();
        StandardFixedAmountPrice.standardFixedAmount = 120.00;
        StandardFixedAmountPrice.tcurrency = 'EUR';
        
        WS_TransferFees.StandardTiers StandardTiers = new WS_TransferFees.StandardTiers();
        StandardTiers.standardAmountTier = 120.00;
        StandardTiers.standardAmountTierType = 'EUR';
        StandardTiers.standardFixedRatePrice = StandardFixedRatePrice;
        StandardTiers.standardFixedAmountPrice = StandardFixedAmountPrice;
        
        List<WS_TransferFees.StandardTiers> lstStandardTiers= new List<WS_TransferFees.StandardTiers>();
        
        WS_TransferFees.StandardPrice StandardPrice = new WS_TransferFees.StandardPrice();
        StandardPrice.standardTiersList = lstStandardTiers;
        
        WS_TransferFees.SpecialFixedRatePrice SpecialFixedRatePrice = new WS_TransferFees.SpecialFixedRatePrice();
        SpecialFixedRatePrice.specialRate = 2;
        SpecialFixedRatePrice.specialMinimumAmount = 100.00;
        SpecialFixedRatePrice.specialMaximumAmount = 200.00;
        SpecialFixedRatePrice.tcurrency ='EUR';
        
        WS_TransferFees.SpecialFixedAmountPrice SpecialFixedAmountPrice = new WS_TransferFees.SpecialFixedAmountPrice();
        SpecialFixedAmountPrice.specialFixedAmount = 120.00;
        SpecialFixedAmountPrice.tcurrency ='EUR';
        
        WS_TransferFees.SpecialTiers SpecialTiers = new WS_TransferFees.SpecialTiers();
        SpecialTiers.specialAmountTier = 120.00;
        SpecialTiers.specialAmountTierType = 'Test';
        SpecialTiers.specialFixedAmountPrice = SpecialFixedAmountPrice;
        SpecialTiers.specialFixedRatePrice = SpecialFixedRatePrice;
        
        List<WS_TransferFees.SpecialTiers> lstSpecialTiers= new List<WS_TransferFees.SpecialTiers>();
        
        WS_TransferFees.SpecialPrice SpecialPrice = new WS_TransferFees.SpecialPrice();
        SpecialPrice.specialPriceLevel = 'Test';
        SpecialPrice.specialTiersList = lstSpecialTiers;
        
        WS_TransferFees.ConceptAmount ConceptAmount = new WS_TransferFees.ConceptAmount();
        ConceptAmount.amount = 100.00;
        ConceptAmount.tcurrency = 'EUR';
        ConceptAmount.fixing = 200.00;
        
        WS_TransferFees.Concepts Concepts = new WS_TransferFees.Concepts();
        Concepts.conceptId = 'Test';
        Concepts.conceptName = 'Test';
        Concepts.specialPrice = SpecialPrice;
        Concepts.standardPrice = StandardPrice;
        Concepts.conceptAmount = ConceptAmount;
        
        List<WS_TransferFees.Concepts> lstConcepts= new List<WS_TransferFees.Concepts>();
        lstConcepts.add(Concepts);
        
        WS_TransferFees.CurrencyList CurrencyList = new WS_TransferFees.CurrencyList();
        CurrencyList.tcurrency = 'EUR';
        CurrencyList.currencyName = 'EUR';
        CurrencyList.conceptsList = lstConcepts;

        List<WS_TransferFees.CurrencyList> lstCurrencyList= new List<WS_TransferFees.CurrencyList>();
        lstCurrencyList.add(CurrencyList);
        
        WS_TransferFees.PageData PageData = new WS_TransferFees.PageData();
        PageData.rel = 'Test';
        PageData.href = 'Test';
        
        List<WS_TransferFees.PageData> lstPageData= new List<WS_TransferFees.PageData>();
        
        WS_TransferFees.OUTPUT outputTest = new WS_TransferFees.OUTPUT();
        outputTest.status = null;
        outputTest.transactionFee = 'Test';
        outputTest.transactionFeeCurrency = 'EUR';
        outputTest.productName = 'Test';
        outputTest.currencyList = lstCurrencyList;
        outputTest.OperacionGastosCompartidos = false;
        outputTest.pageDataList = lstPageData;
        
        WS_ExchangeRate.OUTPUT outputExchange = new WS_ExchangeRate.OUTPUT(); 
        outputExchange.amountReceive = '140.00';
        outputExchange.amountSend = '140.00';
        outputExchange.timestamp = 'Test';
        outputExchange.priceType = 'EUR';
        
		WRAPPER_B2B_Data.PaymentAmount paymentAmount = new WRAPPER_B2B_Data.PaymentAmount();        
        paymentAmount.fromOrigin = false;
        paymentAmount.amountSend = 140.00;
        paymentAmount.amountReceive = 140.00;
        paymentAmount.exchangeRate = 1.00;
        paymentAmount.timestamp = 'Test';
        paymentAmount.transactionFee = 100.00;
        paymentAmount.transactionFeeCurrency = 'EUR';
        paymentAmount.convertedTransactionFee = 100.00;
        paymentAmount.convertedTransactionFeeCurrency = 'EUR';
        paymentAmount.transactionFeeServiceResponse = outputTest;
        paymentAmount.convertedTransactionFeeServiceResponse = outputExchange;
        paymentAmount.exchangeRateServiceResponse = outputExchange;
            
        WRAPPER_B2B_Data.AccountData accountData = new WRAPPER_B2B_Data.AccountData();
        
        WRAPPER_AccountList.AccountDetails accountDetail = new WRAPPER_AccountList.AccountDetails();
        accountDetail.currencyCodeAvailableBalance = 'EUR';
        
        WS_TransferFees ws = new WS_TransferFees('2','b2b',accountData);
        
         
        
        ws.setPaymentId('Test');
        ws.setIntegrationType('b2b');
        ws.getResult ();
        //ws.getParameters('Campo', 'Valor');
        
        
        try{
            ws.execute(paymentAmount, accountDetail, accountDetail); 
        }catch(Exception e){}  
        
        try{
            //ws.getMapData (outputTest, 9.2, 'EUR'); 
        }catch(Exception e){}
        Test.stopTest();
    }
    
}