@isTest
public class CNT_B2B_SignatureUtilities_Test {

    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true); 
    }

    @isTest
    static void getSignatureStructureLocal_Test(){    
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp.Signature());
        user u = DataFactory.getRunningUser(true); 
        WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
        Test.startTest();
        
        Map<String, String> navInfo = new Map<String,String>();
        system.runAs(u){
            CNT_B2B_SignatureUtilities.getSignatureStructure( 'channel', navInfo, paymentDraft);
        }
        Test.stopTest();
    }

    @isTest
    static void storeSignatureData_Test(){       
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp.BasicResponse());
        User u = DataFactory.getRunningUser(true);
        String str = MockResponse.SignatureStructure();
        WRAPPER_B2B_SignatureStructure structure = (WRAPPER_B2B_SignatureStructure) JSON.deserialize (str, WRAPPER_B2B_SignatureStructure.class);
        test.startTest();
        CNT_B2B_SignatureUtilities.storeSignatureData(structure);
        test.stopTest();
    }
 
    @isTest
    static void storeUserSign_Test(){
		Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp.basicResponse());  
        User u = DataFactory.getRunningUser(true);
        Test.startTest();
        system.runAs(u){
            CNT_B2B_SignatureUtilities.storeUserSign('PaymentId', u.Id, true, 'scaUid');
            CNT_B2B_SignatureUtilities.storeUserSign('PaymentId', u.Id, false, 'scaUid');
            CNT_B2B_SignatureUtilities.getSignatoriesStatus('PaymentId');
            CNT_B2B_SignatureUtilities.storeOTPId('test','PaymentId');
        }
        Test.stopTest();
    }

    @isTest
    static void methods_Test(){
        User u = DataFactory.getRunningUser(true);
        Test.startTest();
        system.runAs(u){
   	    	CNT_B2B_SignatureUtilities.checkCompletedSignatureGroup('paymentId');
        	CNT_B2B_SignatureUtilities.checkCompletedSignature('paymentId');        
 	    	CNT_B2B_SignatureUtilities.getSignatoryStatus('paymentId');
	 	    CNT_B2B_SignatureUtilities.deleteSignatureRecord('paymentId');
        }
        Test.stopTest();
    }


}