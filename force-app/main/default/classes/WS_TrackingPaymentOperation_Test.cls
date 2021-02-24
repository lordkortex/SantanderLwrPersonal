/*
Author:         A. Borraz
Company:        Deloitte
History:
<Date>          <Author>		<Description>
23/11/2020      A. Borraz       Initial version
04/02/2021      Candido         Refactored of method 'updateAmountInformation'
*/
@isTest
public class WS_TrackingPaymentOperation_Test {

    @TestSetup
    static void setup () {
        DataFactory.createWsConfigurationSetting(true);
        main();
    }

    @isTest
    static void main () {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
            Name = 'WS_TrackingPaymentOperation',
            CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/operation_tracking/operation/{paymentId}',
            CNT_HTTPMethod__c = 'POST',
            CNT_Service__c = 'Mulesoft'
        );
        insert configWs;
        Test.setMock(HttpCalloutMock.class, new WS_TrackingPaymentOperation_MockHttp());
        Test.startTest();
        WS_TrackingPaymentOperation ws_Tracking = new WS_TrackingPaymentOperation('Test');
        WrapperUserData userData = new WrapperUserData();
        userData.globalId = 'Test';
        ws_Tracking.execute('003', 'Test', 'Test', 'EUR', null, 'Test');
        ws_Tracking.execute('003', 'Test', 'EUR', null, 'Test');
        ws_Tracking.updateStatus('OK', 'Test', userData);
        ws_Tracking.updateStatus('OK', 'Test');
        ws_Tracking.updateInformation('Test', 'Test', 'Test', 'Test', 'Test', 'Test');
        try {
            String originAmount = 'source';
            Decimal convertedAmount = 9.2;
            String sourceCurrency = 'EUR';
            Decimal sourceAmount = 5.1;
            String destinationCurrency = 'GBP';
            Decimal destinationAmount = 15.1;
            ws_Tracking.updateAmountInformation(originAmount, convertedAmount, sourceCurrency, sourceAmount, destinationCurrency, destinationAmount);
            originAmount = 'recipient';
            ws_Tracking.updateAmountInformation(originAmount, convertedAmount, sourceCurrency, sourceAmount, destinationCurrency, destinationAmount);
            destinationCurrency = 'GBP';
            ws_Tracking.updateAmountInformation(originAmount, convertedAmount, sourceCurrency, sourceAmount, destinationCurrency, destinationAmount);
        } catch (Exception e) {
             system.debug(e);
        }
        try {
            WS_TransferFees.OUTPUT transactionFeeServiceResponse = new WS_TransferFees.OUTPUT();
            transactionFeeServiceResponse.status = 'Test';
            transactionFeeServiceResponse.transactionFee = 'Test';
            transactionFeeServiceResponse.transactionFeeCurrency = 'EUR';
            transactionFeeServiceResponse.productName = 'Test';
            transactionFeeServiceResponse.priceLocator = 'Test';
            transactionFeeServiceResponse.OperacionGastosCompartidos = false;
            Decimal transactionFee = 15.2;
            String transactionFeeCurrency = 'EUR';
            ws_Tracking.updateFeesInformation(transactionFeeServiceResponse, transactionFee, transactionFeeCurrency);
        } catch (Exception e) {
             system.debug(e);
        }
        ws_Tracking.updateAdditionalData('997', '001', userData, 'Test', 'Test');
        ws_Tracking.updateAdditionalData('003', '001', userData, 'Test', 'Test');
        String str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails testAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        ws_Tracking.updateAccountsInformation(testAccount, testAccount, testAccount);
        ws_Tracking.getResult();
        Test.stopTest();
    }

}