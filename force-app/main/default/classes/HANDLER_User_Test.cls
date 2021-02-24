/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for the User handler class
History
<Date>          <Author>        	<Description>
24/06/2020      Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class HANDLER_User_Test {
    @testSetup
    static void setup(){
        User currentUser = [ select Id from User where Id = :UserInfo.getUserId() ];
        User supportUserCopy;
        
        System.runAs(currentUser){
            // Get the support profile
            Profile p = [SELECT Id FROM Profile WHERE Name='Support']; 
            UserRole portalRole = [Select Id From UserRole Where PortalType = 'None' Limit 1];
        
        	// Create a support user
        	User supportUser = new User(Alias = 'scau', Email='supportUser@testorg.com', 
                                EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                                LocaleSidKey='en_US', ProfileId = p.Id, UserRoleId = portalRole.Id,
                                TimeZoneSidKey='America/Los_Angeles', UserName='standarduserGTS@acmesupport.com', isActive = true);
        	insert supportUser;
            supportUserCopy = supportUser;
        }
        
        // Create a dummy user associated with a community profile (Nexus User)
       	Account acc = new Account(
            			Name = 'Test Account',
            			OwnerId = supportUserCopy.Id
        );
        insert acc;
        Contact c = new Contact(
        		FirstName = 'Test',
        		LastName = 'Portal',
        		AccountId = acc.Id,
        		Email = 'testPortal@testSF.com');
        insert c;  
        
        System.runAs(currentUser){
            Profile portalProfile = [SELECT Id FROM Profile WHERE Name = 'Nexus User'];
            User dummyUser = new User(Alias = 'scau', Email='supportUser@testorg.com', 
                                EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                                LocaleSidKey='en_US', ProfileId = portalProfile.Id, 
                                TimeZoneSidKey='America/Los_Angeles', UserName='standarduserGTS@acme.com',
                                ContactId = c.Id, isActive = false, USER_LUP_parentBackOfficeUser__c = supportUserCopy.Id,
                                isDummyBackOfficeUser__c = true);
            insert dummyUser;
        }
    }
    
	@isTest
    public static void enforceOnlyOneParentDummyUser_Test(){
        // Get the parent support user
        User parentSupportUser = [SELECT Id, Username FROM User WHERE Username = 'standarduserGTS@acmesupport.com'];
        Account businessAccount = [SELECT Id FROM Account WHERE Name = 'Test Account'];
        Contact c = new Contact(
        		FirstName = 'Test',
        		LastName = 'Portal 2',
        		AccountId = businessAccount.Id,
        		Email = 'testPortal@testSF.com');
        insert c;  
        // Create a dummy user and try to assign it a support user with a children dummy
        Profile portalProfile = [SELECT Id FROM Profile WHERE Name = 'Nexus User'];
        User currentUser = [SELECT Id from User where Id = :UserInfo.getUserId() ];
        System.runAs(currentUser){
          User dummyUser = new User(Alias = 'scau', Email='supportUser@testorg.com', 
                                  EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                                  LocaleSidKey='en_US', ProfileId = portalProfile.Id, 
                                  TimeZoneSidKey='America/Los_Angeles', UserName='standarduserGTSDummy2@acme.com',
                                  ContactId = c.Id, isActive = false, USER_LUP_parentBackOfficeUser__c = parentSupportUser.Id,
                                  isDummyBackOfficeUser__c = true);
        
            // Run the test, in this case an error shold be thrown and caught
            Test.startTest();
            try{
                insert dummyUser;
            } catch(Exception e){
                Boolean expectedExceptionThrown =  e.getMessage().contains(parentSupportUser.Username) ? true : false;
                System.AssertEquals(expectedExceptionThrown, true);    
            } 
            
            // If the user is created and then updated to match the same parent, an error should be thrown again
            try{
                dummyUser.USER_LUP_parentBackOfficeUser__c = null;
                insert dummyUser;
                dummyUser.USER_LUP_parentBackOfficeUser__c = parentSupportUser.Id;
                update dummyUser;
            } catch(Exception e){
                Boolean expectedExceptionThrown =  e.getMessage().contains(parentSupportUser.Username) ? true : false;
                System.AssertEquals(expectedExceptionThrown, true);
            }
            Test.stopTest();  
        }    
    }
}