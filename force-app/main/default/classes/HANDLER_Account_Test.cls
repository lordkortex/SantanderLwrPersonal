/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
19/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class HANDLER_Account_Test {
	
    @isTest  
    static void setup(){
        Test.startTest();
        
        Account acct1= new Account(Name = 'Test1', ACC_TXT_CompanyId__c = 'ACID1');
        insert acct1;
        
        Account acct2= new Account(Name = 'Test2', ACC_TXT_CompanyId__c = 'ACID2');
        insert acct2;
        
        Account acct3= new Account(Name = 'Test3', ACC_TXT_CompanyId__c = 'ACID3');
        insert acct3;
        
        acct2.ParentId = acct1.Id;
        update acct2;
        
        acct2.ParentId = acct3.Id;
        update acct2;
        
        acct2.ParentId = null;
        update acct2;
        
        /*
        HANDLER_Account.AssignSupportManager(newAccountList);
        try{
        	HANDLER_Account.updateCompanyParent(newAccountList);    
        }catch(Exception e){}
        try{
        	HANDLER_Account.deleteAccount(newAccountList);    
        }catch(Exception e){}
 		*/
        
        Test.stopTest();
    }


}