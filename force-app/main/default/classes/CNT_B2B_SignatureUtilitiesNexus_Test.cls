@isTest
global class CNT_B2B_SignatureUtilitiesNexus_Test {

    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }

    
    @isTest
    static void getSignatureStructure(){   
                
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp.Signature());
        user u = DataFactory.getRunningUser(true); 
      /*  String str = MockResponse.B2BData_PaymentAmount(); 
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);*/
        
        WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
        Test.startTest();
        
        Map<String, String> navInfo = new Map<String,String>();
        
        system.runAs(u){
            CNT_B2B_SignatureUtilitiesNexus.getSignatureStructure('channel', paymentDraft);
            
            //CNT_B2B_SignatureUtilitiesNexus.getSignatureStructure('paymentID', 'service_id','channel', amountData, destinationAccount);
        }
        Test.stopTest();
    }
    
    @isTest
    static void getOTP_Strategic_Test(){

        Test.startTest();
        	CNT_B2B_SignatureUtilitiesNexus.getOTP_Strategic('TEST', 'TEST', 'TEST', 'TEST', 'TEST', 'TEST', 'TEST');
    	Test.stopTest();   
    }
   
}