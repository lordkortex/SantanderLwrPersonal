/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
23/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WS_TrackingPaymentOperation_Test {
	
    @TestSetup  
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
		main();
    }
   
    @isTest
    static void main(){
       CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(Name = 'WS_TrackingPaymentOperation',
                                                                       CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/operation_tracking/operation/{paymentId}',
                                                                       CNT_HTTPMethod__c = 'POST',
                                                                       CNT_Service__c = 'Mulesoft');
       insert configWs;
       Test.setMock(HttpCalloutMock.class, new WS_TrackingPaymentOperation_MockHttp());
       Test.startTest();
       WS_TrackingPaymentOperation ws_Tracking = new WS_TrackingPaymentOperation('Test');
       WrapperUserData userData = new WrapperUserData();
       userData.globalId = 'Test';

        WS_TransferFees.CurrencyList CurrencyList = new WS_TransferFees.CurrencyList(); 
        CurrencyList.tcurrency = 'EUR';
        CurrencyList.currencyName = 'EUR';
        CurrencyList.conceptsList = null;
        
        List<WS_TransferFees.CurrencyList> curLst = new List<WS_TransferFees.CurrencyList>();
        
        curLst.add(CurrencyList);
        
        WS_TransferFees.OUTPUT outputTest = new WS_TransferFees.OUTPUT();
        outputTest.status = 'Test';
        outputTest.transactionFee = 'Test';
        outputTest.transactionFeeCurrency = 'EUR';
        outputTest.productName = 'Test';
        outputTest.OperacionGastosCompartidos = false;
        outputTest.currencyList = curLst;
        
        WS_ExchangeRate.CcyCountervalue CcyCountervalue = new WS_ExchangeRate.CcyCountervalue(); 
        CcyCountervalue.ccyCountervalueAmount = '1.38';
        CcyCountervalue.ccyCountervalueCurrency = 'EUR';
        
        WS_ExchangeRate.FxExchangeResponse FxExchangeResponse = new WS_ExchangeRate.FxExchangeResponse(); 
        FxExchangeResponse.fxCountervalueId = 'Test';
        FxExchangeResponse.ccyCountervalue = CcyCountervalue;
        FxExchangeResponse.valueDateEfx = 'Test';
        FxExchangeResponse.customerExchangeRate = 10.00;
        
        WS_ExchangeRate.OUTPUT outputExchange = new WS_ExchangeRate.OUTPUT(); 
        outputExchange.amountReceive = '140.00';
        outputExchange.amountSend = '140.00';
        outputExchange.timestamp = 'Test';
        outputExchange.priceType = 'EUR';
        outputExchange.fxExchangeResponse = FxExchangeResponse;
        
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
       
        
        WRAPPER_AccountList.AccountDetails AccountData = new WRAPPER_AccountList.AccountDetails();
        AccountData.currencyCodeAvailableBalance ='EUR';
        
        ws_Tracking.execute('003', 'Test', 'Test', 'EUR', null, 'Test');
	 	ws_Tracking.execute('003', 'Test', 'EUR', null, 'Test');
        ws_Tracking.updateStatus('OK', 'Test', userData);
		ws_Tracking.updateStatus('OK', 'Test');
        ws_Tracking.updateInformation('Test', 'Test', 'Test', 'Test', 'Test', 'Test');
		
        try{
            ws_Tracking.updateAmountInformation(paymentAmount,AccountData);
        }catch(Exception e){
             system.debug(e);
        }
         try{
            ws_Tracking.updateAmountInformation(paymentAmount, AccountData, AccountData, 'source');
        }catch(Exception e){
             system.debug(e);
        }
		//ws_Tracking.updateAdditionalData('997', '001', userData, 'Test', 'Test');
        //ws_Tracking.updateAdditionalData('003', '001', userData, 'Test', 'Test');
        ws_Tracking.getResult();
		Test.stopTest();
    }
	
}