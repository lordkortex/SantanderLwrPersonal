/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
18/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_PaymentsMethod_Test {

    @testSetup
    static void init(){
      	DataFactory.getCustomSettingCryptoKey(true);
        Test.startTest();
        system.debug(checkTypeAvailableTestNull());
        system.debug(checkTypeAvailableTestCashNexus());
        system.debug(checkTypeAvailableTestOneTrade());

        Test.stopTest();
    }

	@isTest
    static ReturnValue checkTypeAvailableTestNull(){
        WrapperUserData wrapper = new WrapperUserData();
        
       return CNT_PaymentsMethod.checkTypeAvailable(null);
    }
    
    @isTest
    static ReturnValue checkTypeAvailableTestOneTrade(){
        User user = new User(USER_NumberFormat__c ='111',
                             User_DateFormat__c ='dd-mm-yyyy',
                             FirstName ='Test',
                             LastName ='Test',
                             Alias ='Test',
                             Email ='Test@test.com',
                             MobilePhone ='12345678',
                             USER_CHK_CashNexus__c =false,
                             USER_country__c ='Spain',
                             USER_TXT_BIC__c ='Test');
        
        Contact contact = new Contact (CHK_MultiOneTrade__c = true);
        
		/*Account acct = new Account(ACC_CHK_CIB__c 			 = false,
                                   ACC_TXT_DocumentType__c   = 'test',
                                   ACC_TXT_DocumentNumber__c = 'test',
                                   ACC_TXT_CompanyId__c 	 = 'test',
                                   ACC_TXT_BIC__c 			 = 'test'); */

        WrapperUserData wrapper = new WrapperUserData(user,contact,null);
        
       return CNT_PaymentsMethod.checkTypeAvailable(wrapper);
    }
   @isTest
    static ReturnValue checkTypeAvailableTestCashNexus(){
        User user = new User(USER_NumberFormat__c ='111',
                             User_DateFormat__c ='dd-mm-yyyy',
                             FirstName ='Test',
                             LastName ='Test',
                             Alias ='Test',
                             Email ='Test@test.com',
                             MobilePhone ='12345678',
                             USER_CHK_CashNexus__c =true,
                             USER_country__c ='Spain',
                             USER_TXT_BIC__c ='Test');
        
        Contact contact = new Contact (CHK_MultiOneTrade__c = false);
        
    
        
		/*Account acct = new Account(ACC_CHK_CIB__c 			 = false,
                                   ACC_TXT_DocumentType__c   = 'test',
                                   ACC_TXT_DocumentNumber__c = 'test',
                                   ACC_TXT_CompanyId__c 	 = 'test',
                                   ACC_TXT_BIC__c 			 = 'test'); */

        WrapperUserData wrapper = new WrapperUserData(user,contact,null);
        
       return CNT_PaymentsMethod.checkTypeAvailable(wrapper);
    }
      @isTest
    static ReturnValue catchTest(){
        
        Contact contact = new Contact (CHK_MultiOneTrade__c = false);

        WrapperUserData wrapper = new WrapperUserData(null,contact,null);
        
       return CNT_PaymentsMethod.checkTypeAvailable(wrapper);
    }
 
}