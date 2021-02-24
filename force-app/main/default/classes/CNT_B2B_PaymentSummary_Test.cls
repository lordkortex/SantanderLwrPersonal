@isTest
public class CNT_B2B_PaymentSummary_Test { 
    
    @testSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void executePayment_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        String str = MockResponse.B2BData_PaymentAmount(); 
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        
        Test.startTest();
        CNT_B2B_PaymentSummary.executePayment (amountData, destinationAccount, destinationAccount, 'paymentId', 'FXTimer', 'description', 'clientReference','productID','chargeBearer','urgency');
		Test.stopTest();
    }
    
    @isTest
    static void getSignLevel_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        Test.startTest();
        CNT_B2B_PaymentSummary.getSignLevel('12345');
        Test.stopTest();
    }
    
    @isTest
    static void authorizePayment_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        Test.startTest();
        CNT_B2B_PaymentSummary.authorizePayment('12345', true, 'scaUid');
        Test.stopTest();
    }
    
    @isTest
    static void getOTP_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        Test.startTest();
        CNT_B2B_PaymentSummary.getOTP('12345', 'ES', 'sourceBIC');
        Test.stopTest();
    }
    
    @isTest
    static void validateOTP_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        Test.startTest();
        CNT_B2B_PaymentSummary.validateOTP('12345', 'metaData' ,'ES', 'sourceBIC');
        Test.stopTest();
    }
    
    @isTest
    static void updateStatus_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        Test.startTest();
        CNT_B2B_PaymentSummary.updateStatus('12345', 'status', 'reason');
        Test.stopTest();
    }
    
    @isTest
    static void getExchangeRate_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        String str = MockResponse.B2BData_PaymentAmount(); 
        WRAPPER_B2B_Data.PaymentAmount paymentData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.B2BData_AccountData(); 
        WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(str, WRAPPER_B2B_Data.AccountData.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR'); 
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        
        Test.startTest();
        //sourceAccountData.companyIdsList.put ('LOCAL', 'J101484427');
        CNT_B2B_PaymentSummary.getExchangeRate(true, '12345', paymentData, accountData, sourceAccountData, sourceAccountData);
        CNT_B2B_PaymentSummary.getExchangeRate(false, '12345', paymentData, accountData, sourceAccountData, sourceAccountData);
        paymentData.fromOrigin = false; 
        CNT_B2B_PaymentSummary.getExchangeRate(true, '12345', paymentData, accountData, sourceAccountData, sourceAccountData);
        CNT_B2B_PaymentSummary.getExchangeRate(false, '12345', paymentData, accountData, sourceAccountData, sourceAccountData);
        

        Test.stopTest();
    }    
    
    @isTest
    static void encryptData_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        Test.startTest();
        CNT_B2B_PaymentSummary.encryptData('Test');
        Test.stopTest();
    }
    
    @isTest
    static void updateLimits_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        String str = MockResponse.B2BData_PaymentAmount(); 
        WRAPPER_B2B_Data.PaymentAmount paymentData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR'); 
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        
        Test.startTest();
        CNT_B2B_PaymentSummary.updateLimits('operationId', 'serviceId', paymentData, sourceAccountData);
        Test.stopTest();
    }
    
    @isTest
    static void removeSignature_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        Test.startTest();
        CNT_B2B_PaymentSummary.removeSignature('12345');
        Test.stopTest();
    }
        
    @isTest
    static void sendNotification_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        Test.startTest();
        CNT_B2B_PaymentSummary.sendNotification('12345', 'clientReference');
        Test.stopTest();
    }
        
    @isTest
    static void getSessionId_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        Test.startTest();
        CNT_B2B_PaymentSummary.getSessionId();
        Test.stopTest();
    }

    
    @isTest
    static void getOTP_Strategic_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        String str = MockResponse.B2BData_PaymentAmount(); 
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        
        Test.startTest();
        Map<String, String> navInfo = new Map<String, String>();
        
        CNT_B2B_PaymentSummary.getOTP_Strategic('TEST','beneficiaryName', 'beneficiaryAccount', 'paymentId', 'debitAmount', 'fees', 'exchangeRate', 'paymentAmount', amountData, destinationAccount, destinationAccount, 'subject', 'service_id', navInfo);
    	Test.stopTest();   
    }
   
}