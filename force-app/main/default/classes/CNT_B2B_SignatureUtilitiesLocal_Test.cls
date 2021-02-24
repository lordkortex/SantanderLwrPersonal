@isTest
global class CNT_B2B_SignatureUtilitiesLocal_Test {

    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }

    
    @isTest
    static void getSignatureStructure(){   
                
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp.Signature());
        user u = DataFactory.getRunningUser(true); 
        String str = MockResponse.B2BData_PaymentAmount(); 
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        
        Test.startTest();
        
        Map<String, String> navInfo = new Map<String,String>();
        
        system.runAs(u){
            CNT_B2B_SignatureUtilitiesLocal.getSignatureStructure('paymentID', 'service_id', amountData, destinationAccount, destinationAccount, 'subject', navInfo);
        }
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
        
        CNT_B2B_SignatureUtilitiesLocal.getOTP_Strategic('TEST', amountData, destinationAccount, destinationAccount, 'subject', 'service_id', navInfo);
    	Test.stopTest();   
    }
    
    @isTest
    static void getOTP_Strategic_Test2(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_PaymentSummary_MockHttp());
        WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);    
        Test.startTest();
        Map<String, String> navInfo = new Map<String, String>();
        
        CNT_B2B_SignatureUtilitiesLocal.getOTP_Strategic('TEST', payment, 'service_id', navInfo);
    	Test.stopTest();   
    }
/*
    @isTest
    static void storeSignatureData_Test(){       
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp.BasicResponse());
        User u = DataFactory.getRunningUser(true);
        String str = MockResponse.SignatureStructure();
        WRAPPER_B2B_SignatureStructure structure = (WRAPPER_B2B_SignatureStructure) JSON.deserialize (str, WRAPPER_B2B_SignatureStructure.class);
        test.startTest();
        CNT_B2B_SignatureUtilities.storeSignatureData(structure);
        test.stopTest();
    }*/
 



}