@isTest
public class CNT_B2B_REDOModal_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.getCustomSettingCryptoKey(true);        
    }

    @isTest
    static void sendToService_Test(){
        test.startTest();
        CNT_B2B_REDOModal.sendToService('paymentId', 'status', 'reason','subject', 'EUR', 100, 'description');
        test.stopTest();
    }
    
    @isTest
    static void encryptData_Test(){
        String str = CNT_B2B_REDOModal.encryptData('Test');
        test.startTest();
        CNT_B2B_REDOModal.decryptData(str);
        CNT_B2B_REDOModal.encryptData(str);
        test.stopTest();
    }
    
    @isTest
    static void sendNotification_Test(){
        test.startTest();
        CNT_B2B_REDOModal.sendNotification('paymentID', 'notificationType');
        test.stopTest();
    }
    
    @isTest
    static void reverseLimits_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_REDOModal_MockHttp.BasicResponse());
        String res = MockResponse.PaymentList();
        WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(res, WRAPPER_PaymentDetail.OperationDetail.class); 
        test.startTest();
        CNT_B2B_REDOModal.reverseLimits(paymentData);
        test.stopTest();
    }
    
    @isTest
    static void tracking_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_REDOModal_MockHttp.BasicResponse());
        test.startTest();
        CNT_B2B_REDOModal.tracking('paymentId' , '997', '001', 'subject', 'description');
        CNT_B2B_REDOModal.tracking('paymentId' , '003', '001', 'subject', 'description');
        test.stopTest();
    }

}