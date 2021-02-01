@isTest
public class CNT_B2B_SignatureUtilities_Test {

    
    //HEP: Está a medias
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createSignatureStructure();
    }
 
    @isTest
    static void getSignatureStructure_Test(){    
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp());
        
        String str = MockResponse.B2BData_PaymentAmount();
        WRAPPER_B2B_Data.PaymentAmount Amount = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(str, WRAPPER_B2B_Data.PaymentAmount.class);
        str = MockResponse.AccountList_AccountDetails('ES', 'EUR');
        WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str, WRAPPER_AccountList.AccountDetails.class);
        User u = DataFactory.getRunningUser(true); 

        Test.startTest();
        //CNT_B2B_SignatureUtilities.getSignatureStructure('paymentID', 'service_id', 'channel', Amount, sourceAccount, sourceAccount, 'subject');
        
        system.runAs(u){
            //CNT_B2B_SignatureUtilities.getSignatureStructure('paymentID', 'service_id', 'channel', Amount, sourceAccount, sourceAccount, 'subject');
        }
        
        u.USER_CHK_CashNexus__c = true;
        update u;
        
        system.runAs(u){
            //CNT_B2B_SignatureUtilities.getSignatureStructure('paymentID', 'service_id', 'channel', Amount, sourceAccount, sourceAccount, 'subject');
        }
        Test.stopTest();
    }

    @isTest
    static void storeSignatureData_Test(){        
        User u = DataFactory.getRunningUser(true);
        String str = MockResponse.SignatureStructure();
        WRAPPER_B2B_SignatureStructure structure = (WRAPPER_B2B_SignatureStructure) JSON.deserialize (str, WRAPPER_B2B_SignatureStructure.class);

        CNT_B2B_SignatureUtilities.storeSignatureData(structure);
    }
 
    @isTest
    static void storeUserSign_Test(){
		Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp());  
        
        Test.startTest();
    	CNT_B2B_SignatureUtilities.storeUserSign('PaymentId', 'userID', true, 'scaUid');
        Test.stopTest();
    }

    @isTest
    static void methods_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp());
        
	    CNT_B2B_SignatureUtilities.checkCompletedSignatureGroup('paymentId');
        CNT_B2B_SignatureUtilities.checkCompletedSignature('paymentId');        
 	    CNT_B2B_SignatureUtilities.getSignatoryStatus('paymentId');
 	    CNT_B2B_SignatureUtilities.deleteSignatureRecord('paymentId');
    }

    @isTest
    static void getSignatureStructureNexus_Test(){
		Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp());  
        
        Test.startTest();
    	CNT_B2B_SignatureUtilities.getSignatureStructureNexus(false, 'NOpaymentID', 'service_id', 'tcurrency', 'customerId', 'channel', 'amount');
        Test.stopTest();
    }
    
    @isTest
    static void getSignatoriesStatus_Test(){
		Test.setMock(HttpCalloutMock.class, new CNT_B2B_SignatureUtilities_MockHttp());  
        
        List<SGN_Group__c> listGroup = new List<SGN_Group__c>([SELECT Id from SGN_Group__c]);
        SGN_Group__c groupData = listGroup.get(0);
        
        List<SGN_User__c> listSGNtoUpdate = new List<SGN_User__c>([SELECT Id from SGN_User__c]);
        SGN_User__c user = listSGNtoUpdate.get(0);
        user.SGN_ELCK_RelatedUser__c = UserInfo.getUserId();
        user.SGN_DATET_Completed__c = null;
        update user;
        
        SNG_Group_User__c groupUser = new SNG_Group_User__c();
        groupUser.SGN_ELCK_RelatedUser__c = user.Id;
        groupUser.SGN_ELCK_RelatedGroup__c = groupData.Id;
        insert groupUser;
            //where SGN_ELCK_RelatedUser__c IN :users.keyset() and SGN_ELCK_RelatedGroup__c IN :groups.keyset()]
        
        Test.startTest();
    	CNT_B2B_SignatureUtilities.getSignatoryStatus('paymentId');
        Test.stopTest();
    }

}