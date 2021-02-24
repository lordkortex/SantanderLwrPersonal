@isTest
public class CNT_B2B_REDOModal_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.getCustomSettingCryptoKey(true);        
    }

    @isTest
    static void sendToService_Test(){
        CNT_B2B_REDOModal.sendToService('paymentId', 'status', 'reason','subject', 'EUR', 100, 'description');
    }
    
    @isTest
    static void encryptData_Test(){
        String str = CNT_B2B_REDOModal.encryptData('Test');
        CNT_B2B_REDOModal.decryptData(str);
    }
    
    @isTest
    static void sendNotification_Test(){
        CNT_B2B_REDOModal.sendNotification('notifType', 'paymentID', 'clientReference', 'paymentCreator');
    }
    
    @isTest
    static void reverseLimits_Test(){
        CNT_B2B_REDOModal.reverseLimits('operationId', 'serviceId', null);
    }
    
    @isTest
    static void tracking_Test(){
        //CNT_B2B_REDOModal.tracking('paymentId', 'status', 'reason', 'subject', 'description');
    }

}