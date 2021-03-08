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
        Test.startTest();
        testExecute();
        main();
        Test.stopTest();
    }
   
    @isTest
    static void main(){
        
        WS_TransferFees.taxAmount taxAmount = new WS_TransferFees.taxAmount();
        taxAmount.amount = 10.5;
        taxAmount.tcurrency='EUR';
        
        WS_TransferFees.mainTax mainTax = new WS_TransferFees.mainTax();
        mainTax.name = 'Test';
        mainTax.type = 'Test';
        mainTax.rate = 2;
        mainTax.taxAmount = taxAmount;

        WS_TransferFees.conceptTax conceptTax = new WS_TransferFees.conceptTax();
        conceptTax.name = 'Test';
        conceptTax.type = 'Test';
        conceptTax.rate = 2;
        conceptTax.taxAmount = taxAmount;

        WS_TransferFees.baseAmount baseAmount = new WS_TransferFees.baseAmount();
        baseAmount.amount = 10.5;
        baseAmount.tcurrency ='EUR';
        
        WS_TransferFees.conceptList conceptList = new WS_TransferFees.conceptList();
        conceptList.conceptId = 'Test';
        conceptList.baseAmount = baseAmount;
        conceptList.conceptTax = conceptTax;
        
        List<WS_TransferFees.conceptList> lstConcept= new List<WS_TransferFees.conceptList>();
        
        WS_TransferFees.taxesInformation taxesInformation = new WS_TransferFees.taxesInformation();
        taxesInformation.customerTaxId = 'Test';
        taxesInformation.mainTax = mainTax;
        taxesInformation.conceptListResponse =lstConcept;
        
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
        outputTest.status = 'Test';
        outputTest.transactionFee = 'Test';
        outputTest.transactionFeeCurrency = 'EUR';
        outputTest.productName = 'Test';
        outputTest.priceLocator = 'Test';
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
        
        WS_TransferFees ws = new WS_TransferFees('2','Test',accountData);

        ws.setPaymentId('Test');
        ws.setIntegrationType('international_transfer');
        ws.getResult ();
        ws.getParameters('Campo', 'Valor');
        
        
        try{
            ws.execute(paymentAmount, accountDetail, accountDetail); 
        }catch(Exception e){}  
        
        try{
            ws.getMapData (outputTest, 9.2, 'EUR'); 
        }catch(Exception e){}
        
    }
    @isTest
    static void testExecute(){
       
        Map<String, String> info = new Map<String,String>(); 
        info.put('product_id', 'product_id');
        info.put('operation_id','operation_id');
        info.put('agreement_type', 'agreement_type');
        info.put('agreement_id','agreement_id');
        info.put('customer_id','customer_id');
        info.put('bank_id','bank_id');
        info.put('branch_id','branch_id');
        info.put('currency','currency');
        info.put('payment_amount','payment_amount');
        info.put('urgency_indicator','urgency_indicator');
        info.put('country_indicator','country_indicator');
        info.put('entity_indicator','entity_indicator');
        info.put('customer_indicator','customer_indicator');
        info.put('purpose_code','purpose_code');
 
         WS_TransferFees.taxAmount taxAmount = new WS_TransferFees.taxAmount();
        taxAmount.amount = 10.5;
        taxAmount.tcurrency='EUR';
        
        WS_TransferFees.mainTax mainTax = new WS_TransferFees.mainTax();
        mainTax.name = 'Test';
        mainTax.type = 'Test';
        mainTax.rate = 2;
        mainTax.taxAmount = taxAmount;

        WS_TransferFees.conceptTax conceptTax = new WS_TransferFees.conceptTax();
        conceptTax.name = 'Test';
        conceptTax.type = 'Test';
        conceptTax.rate = 2;
        conceptTax.taxAmount = taxAmount;

        WS_TransferFees.baseAmount baseAmount = new WS_TransferFees.baseAmount();
        baseAmount.amount = 10.5;
        baseAmount.tcurrency ='EUR';
        
        WS_TransferFees.conceptList conceptList = new WS_TransferFees.conceptList();
        conceptList.conceptId = 'Test';
        conceptList.baseAmount = baseAmount;
        conceptList.conceptTax = conceptTax;
        
        List<WS_TransferFees.conceptList> lstConcept= new List<WS_TransferFees.conceptList>();
        lstConcept.add(conceptList);
        
        WS_TransferFees.taxesInformation taxesInformation = new WS_TransferFees.taxesInformation();
        taxesInformation.customerTaxId = 'Test';
        taxesInformation.mainTax = mainTax;
        taxesInformation.conceptListResponse =lstConcept;
        
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
        lstPageData.add(PageData);
        
        WS_TransferFees.OUTPUT outputTest = new WS_TransferFees.OUTPUT();
        outputTest.status = 'Test';
        outputTest.transactionFee = 'Test';
        outputTest.transactionFeeCurrency = 'EUR';
        outputTest.productName = 'Test';
        outputTest.priceLocator = 'Test';
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
        
        WS_TransferFees ws = new WS_TransferFees('2','Test',accountData);

        ws.setPaymentId('Test');
        ws.setIntegrationType('b2B');
        ws.getResult ();
        ws.getParameters('Campo', 'Valor');
        
        
        try{
            ws.execute(info);
        }catch(Exception e){}  
       
    }
     @isTest
    static void testContructor(){
        
        //create amountData 
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(MockResponse.B2BData_PaymentAmount(), WRAPPER_B2B_Data.PaymentAmount.class);
        //create sourceAccountData 
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountList_AccountDetails('ES', 'EUR'), WRAPPER_AccountList.AccountDetails.class);
        //create recipientAccountData 
        WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountList_AccountDetails('ES', 'GRB'), WRAPPER_AccountList.AccountDetails.class);
        
        try{
            ServiceTransferFees.transferFeesExecute('paymentId', 'productId', amountData, sourceAccountData, recipientAccountData);
        }catch(Exception e){}  
    }
          
}