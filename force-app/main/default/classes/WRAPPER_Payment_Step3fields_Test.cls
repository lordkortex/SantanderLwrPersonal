@isTest
public class WRAPPER_Payment_Step3fields_Test { 
    /*@testSetup
    static void setup(){
        List<Payment_Step3_Fields__mdt> payList = new  List<Payment_Step3_Fields__mdt> ();
        Payment_Step3_Fields__mdt payDoandFollow = new Payment_Step3_Fields__mdt(DeveloperName = 'PruebaTest1',PAY_CHK_Charges_Mandatory__c = false, PAY_CHK_Charges__c = false , PAY_CHK_Client_Reference_Mandatory__c= false, PAY_CHK_Client_Reference__c = true , PAY_CHK_Payment_Purpose_Mandatory__c = true, 
                                          PAY_CHK_Payment_purpose__c = true , PAY_CHK_Payment_Reason_Mandatory__c = false, PAY_CHK_Payment_Reason__c = false, PAY_CHK_Reference_Mandatory__c = false, PAY_CHK_Reference__c = false, PAY_TXT_Country_Destination__c = 'ES', PAY_PCK_ProductId__c = System.Label.CNF_payment_productId_003 );
 		
        insert payDoandFollow;
        Payment_Step3_Fields__mdt payBooktoBook = new Payment_Step3_Fields__mdt(DeveloperName = 'PruebaTest12',PAY_CHK_Charges_Mandatory__c = false, PAY_CHK_Charges__c = false , PAY_CHK_Client_Reference_Mandatory__c= false, PAY_CHK_Client_Reference__c = true , PAY_CHK_Payment_Purpose_Mandatory__c = true, 
                                          PAY_CHK_Payment_purpose__c = true , PAY_CHK_Payment_Reason_Mandatory__c = false, PAY_CHK_Payment_Reason__c = false, PAY_CHK_Reference_Mandatory__c = false, PAY_CHK_Reference__c = false, PAY_TXT_Country_Destination__c = 'ES', PAY_PCK_ProductId__c = System.Label.CNF_payment_productId_001);
 
       	insert payBooktoBook;
    }*/
    @isTest(SeeAllData=true)
    static void booktoBookTest (){
		String ad = MockResponse.AccountListAccountDetails_ES();
		ReturnValue rv = Controller_Payment_StepFields.getStepFields(System.Label.CNF_payment_productId_001,(WRAPPER_AccountList.AccountDetails)JSON.deserialize(ad, WRAPPER_AccountList.AccountDetails.class));
        
    }
    @isTest(SeeAllData=true)
    static void doandfollowTest (){
		String ad = MockResponse.AccountListAccountDetails_ES();
		ReturnValue rv = Controller_Payment_StepFields.getStepFields(System.Label.CNF_payment_productId_003,(WRAPPER_AccountList.AccountDetails)JSON.deserialize(ad, WRAPPER_AccountList.AccountDetails.class));
        
    }
    @isTest(SeeAllData=true)
    static void errorTest (){
		String ad = MockResponse.AccountListAccountDetails_ES();
		ReturnValue rv = Controller_Payment_StepFields.getStepFields('',null);
        
    }

}