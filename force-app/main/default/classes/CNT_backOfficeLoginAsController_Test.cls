/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for controller of the Login As functionality
History
<Date>			<Author>		    <Description>
30/06/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_backOfficeLoginAsController_Test {
    @testSetup
    static void setup() {
        User currentUser = [SELECT Id FROM User WHERE Id = :UserInfo.getUserId()];
        User supportUserCopy;
        
        System.runAs(currentUser){
            // Get the support profile
            Profile p = [SELECT Id FROM Profile WHERE Name='Support']; 
            UserRole portalRole = [Select Id From UserRole Where PortalType = 'None' Limit 1];
            
            // Create a support user
            User supportUser = new User(Alias = 'scau', Email='supportUser@testorg.com', 
                                        EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                                        LocaleSidKey='en_US', ProfileId = p.Id, UserRoleId = portalRole.Id,
                                        TimeZoneSidKey='America/Los_Angeles', UserName='standardusergts@acmesupport.com', isActive = true);
            insert supportUser;
            supportUserCopy = supportUser;
        }
        
        // Create a dummy user associated with a community profile (Nexus User)
        Account acc = new Account(
            Name = System.Label.NexusAccount,
            OwnerId = supportUserCopy.Id
        );
        insert acc;

        List<Contact> contacts = new List<Contact>();
        Contact c = new Contact(
            FirstName = 'Test2',
            LastName = 'Portal Dummy',
            AccountId = acc.Id,
            Email = 'testPorta2l@testSF.com');
        contacts.add(c)        ;
        Contact targetContact = new Contact(
            FirstName = 'Test',
            LastName = 'Portal Target',
            AccountId = acc.Id,
            Email = 'testPortal@testSFTarget.com');         
        contacts.add(targetContact);
        insert contacts;
        
        System.runAs(currentUser){
            Profile portalProfile = [SELECT Id FROM Profile WHERE Name =: System.Label.NexusUserProfile];
            User dummyUser = new User(Alias = 'scau', Email='supportUser@testorg.com', 
                                      EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                                      LocaleSidKey='en_US', ProfileId = portalProfile.Id, 
                                      TimeZoneSidKey='America/Los_Angeles', UserName='standardusergtsdummy@acme.com',
                                      ContactId = c.Id, isActive = false, USER_LUP_parentBackOfficeUser__c = supportUserCopy.Id,
                                      isDummyBackOfficeUser__c = true, USER_CHK_CashNexus__c = true);
            insert dummyUser;
            
            User targetUser = new User(Alias = 'tguser', Email='targetUser@testorg.com', 
                                       EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                                       LocaleSidKey='en_US', ProfileId = portalProfile.Id, 
                                       TimeZoneSidKey='America/Los_Angeles', UserName='targerusergts@acme.com',
                                       ContactId = targetContact.Id, isActive = false, USER_CHK_CashNexus__c = true);
            insert targetUser;
            contacts.get(0).CONTACT_User__c = dummyUser.Id;
            contacts.get(1).CONTACT_User__c = targetUser.Id;
            System.debug(contacts);
            update contacts;
        }
    }
    
    @isTest
    static void getDummyUsername_Test() {
        User supportUser = [SELECT Id, Username FROM User WHERE Username = 'standardusergts@acmesupport.com' LIMIT 1][0];
        System.runAs(supportUser){
            String targetUserId = [SELECT Id, Username FROM User WHERE Username = 'targerusergts@acme.com' LIMIT 1][0].Id;
            Test.startTest();
            System.assertEquals('standardusergtsdummy@acme.com', CNT_backOfficeLoginAsController.getDummyUsername(targetUserId), 'The dummy user does not exist');
            Test.stopTest();
        }
    }
    
    @isTest
    static void createAuditRecord_Test() {
        User supportUser = [SELECT Id, Username FROM User WHERE Username = 'standardusergts@acmesupport.com' LIMIT 1][0];
        User targetUser = [SELECT Id, Username FROM User WHERE Username = 'targerusergts@acme.com' LIMIT 1][0];
        Test.startTest();
        CNT_backOfficeLoginAsController.createAuditRecord(supportUser.Id, targetUser.Id);
        UserLoginAudit__c userLogin = [SELECT Id, loggedInUser__r.Username, loggedAsUser__c FROM UserLoginAudit__c][0];
        System.assertEquals(supportUser.Username, userLogin.loggedInUser__r.Username, 'The record has not been created properly');
        Test.stopTest();
    }
    
    @isTest
    static void getUserAccessToken_Test() {
        // The fake access token is defined in the actual class --> CNT_backOfficeLoginAsController
        String targetUserId = [SELECT Id, Username FROM User WHERE Username = 'targerusergts@acme.com' LIMIT 1][0].Id;
        
        System.assertEquals('test-token-will-not-be-used', 
                            CNT_backOfficeLoginAsController.getUserAccessToken('standardusergts@acme.com', System.Label.consumerKeyLoginAsApp, targetUserId).get('accessToken'), 
                            'The access token has not been generated');
    }
}