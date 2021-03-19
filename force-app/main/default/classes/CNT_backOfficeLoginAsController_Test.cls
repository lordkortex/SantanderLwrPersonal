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

    System.runAs(currentUser) {
      // Get the support profile
      Profile p = [SELECT Id FROM Profile WHERE Name = 'Support'];
      UserRole portalRole = [
        SELECT Id
        FROM UserRole
        WHERE PortalType = 'None'
        LIMIT 1
      ];

      // Create a support user
      User supportUser = new User(
        Alias = 'scau',
        Email = 'supportUser@testorg.com',
        EmailEncodingKey = 'UTF-8',
        LastName = 'Testing',
        LanguageLocaleKey = 'en_US',
        LocaleSidKey = 'en_US',
        ProfileId = p.Id,
        UserRoleId = portalRole.Id,
        TimeZoneSidKey = 'America/Los_Angeles',
        UserName = 'standardusergts@acmesupport.com',
        isActive = true
      );
      insert supportUser;
      supportUserCopy = supportUser;
    }

    // Create a dummy user associated with a community profile (Nexus User)
    Account acc = new Account(
      Name = System.Label.NexusAccount,
      OwnerId = supportUserCopy.Id,
      ACC_TXT_CompanyId__c = '123'
    );
    insert acc;

    List<Contact> contacts = new List<Contact>();
    Contact c = new Contact(
      FirstName = 'Test2',
      LastName = 'Portal Dummy',
      CONTACT_TXT_GlobalId__c = 'abc',
      AccountId = acc.Id,
      Email = 'testPorta2l@testSF.com'
    );
    contacts.add(c);
    Contact targetContact = new Contact(
      FirstName = 'Test',
      LastName = 'Portal Target',
      AccountId = acc.Id,
      CONTACT_TXT_GlobalId__c = 'def',
      Email = 'testPortal@testSFTarget.com'
    );
    contacts.add(targetContact);
    insert contacts;

    System.runAs(currentUser) {
      Profile portalProfile = [
        SELECT Id
        FROM Profile
        WHERE Name = :System.Label.NexusUserProfile
      ];
      User dummyUser = new User(
        Alias = 'scau',
        Email = 'supportUser@testorg.com',
        EmailEncodingKey = 'UTF-8',
        LastName = 'Testing',
        LanguageLocaleKey = 'en_US',
        LocaleSidKey = 'en_US',
        ProfileId = portalProfile.Id,
        TimeZoneSidKey = 'America/Los_Angeles',
        UserName = 'standardusergtsdummy@acme.com',
        ContactId = c.Id,
        isActive = false,
        USER_LUP_parentBackOfficeUser__c = supportUserCopy.Id,
        isDummyBackOfficeUser__c = true,
        USER_CHK_CashNexus__c = true
      );
      insert dummyUser;

      User targetUser = new User(
        Alias = 'tguser',
        Email = 'targetUser@testorg.com',
        EmailEncodingKey = 'UTF-8',
        LastName = 'Testing',
        LanguageLocaleKey = 'en_US',
        LocaleSidKey = 'en_US',
        ProfileId = portalProfile.Id,
        TimeZoneSidKey = 'America/Los_Angeles',
        UserName = 'targerusergts@acme.com',
        ContactId = targetContact.Id,
        isActive = false,
        USER_CHK_CashNexus__c = true
      );
      insert targetUser;
      contacts.get(0).CONTACT_User__c = dummyUser.Id;
      contacts.get(1).CONTACT_User__c = targetUser.Id;
      System.debug(contacts);
      update contacts;
    }
  }

  @isTest
  static void createAuditRecord_Test() {
    User supportUser = [
      SELECT Id, Username
      FROM User
      WHERE Username = 'standardusergts@acmesupport.com'
      LIMIT 1
    ][0];
    Contact targetContact = [
      SELECT Name, Id, Account.Parent.Name
      FROM Contact
      WHERE Email = 'testPortal@testSFTarget.com'
      LIMIT 1
    ];
    Test.startTest();
    CNT_backOfficeLoginAsController.createAuditRecord(
      supportUser.Id,
      targetContact.Id
    );
    UserLoginAudit__c userLogin = [
      SELECT Id, loggedInUser__r.Username, loggedAsUser__c
      FROM UserLoginAudit__c
    ][0];
    Test.stopTest();
  }

  @isTest
  static void getUserAccessToken_Test() {
    // The fake access token is defined in the actual class --> CNT_backOfficeLoginAsController
    String targetUserId = [
      SELECT Id, Username
      FROM User
      WHERE Username = 'targerusergts@acme.com'
      LIMIT 1
    ][0]
    .Id;
    User u = [
      SELECT ID
      FROM User
      WHERE Username = 'standardusergts@acmesupport.com'
    ];
    System.runAs(u) {
      System.assertEquals(
        'test-token-will-not-be-used',
        CNT_backOfficeLoginAsController.getUserAccessToken(
            'standardusergts@acme.com',
            System.Label.consumerKeyLoginAsApp,
            targetUserId
          )
          .get('accessToken'),
        'The access token has not been generated'
      );
    }
  }
  @isTest
  static void getDummyUsername_Test() {
    User supportUser = [
      SELECT Id, Username
      FROM User
      WHERE Username = 'standardusergts@acmesupport.com'
      LIMIT 1
    ][0];
    System.runAs(supportUser) {
      String targetContact = [
        SELECT Id
        FROM Contact
        WHERE Email = 'testPortal@testSFTarget.com'
        LIMIT 1
      ][0]
      .Id;
      Test.startTest();
      CNT_backOfficeLoginAsController.getDummyUsername(targetContact);
      Test.stopTest();
    }
  }
  @isTest
  static void getDummyUsername_Test_WW() {
    Account accP = new Account(Name = 'WW');
    insert accP;

    User currentUser = [SELECT Id FROM User WHERE Id = :UserInfo.getUserId()];

    Contact targetContact = [
      SELECT Name, Id, Account.Parent.Name
      FROM Contact
      WHERE Email = 'testPortal@testSFTarget.com'
      LIMIT 1
    ];
    Account acc = [
      SELECT Id, Name
      FROM Account
      WHERE Name = :System.Label.NexusAccount
      LIMIT 1
    ];
    acc.ParentId = accP.Id;
    update acc;

    System.debug(
      'AAAAFG' + [SELECT Name, Parent.Name FROM Account WHERE ID = :acc.ID]
    );
    System.runAs(currentUser) {
      targetContact.AccountId = acc.Id;
      update targetContact;
    }
    targetContact = [
      SELECT Name, Id, Account.Parent.Name
      FROM Contact
      WHERE Email = 'testPortal@testSFTarget.com'
      LIMIT 1
    ];

    User supportUser = [
      SELECT Id, Username
      FROM User
      WHERE Username = 'standardusergts@acmesupport.com'
      LIMIT 1
    ][0];
    System.runAs(supportUser) {
      System.debug(
        'Account.Parent.Name-->' + targetContact.Account.Parent.Name
      );
      Test.startTest();
      CNT_backOfficeLoginAsController.getDummyUsername(targetContact.Id);
      Test.stopTest();
    }
  }
  @isTest
  static void getDummyUsername_Test_RareName() {
    Account accP = new Account(Name = 'C3PO');
    insert accP;

    User currentUser = [SELECT Id FROM User WHERE Id = :UserInfo.getUserId()];

    Contact targetContact = [
      SELECT Name, Id, Account.Parent.Name
      FROM Contact
      WHERE Email = 'testPortal@testSFTarget.com'
      LIMIT 1
    ];
    Account acc = [
      SELECT Id, Name
      FROM Account
      WHERE Name = :System.Label.NexusAccount
      LIMIT 1
    ];
    acc.ParentId = accP.Id;
    update acc;

    System.debug(
      'AAAAFG' + [SELECT Name, Parent.Name FROM Account WHERE ID = :acc.ID]
    );
    System.runAs(currentUser) {
      targetContact.AccountId = acc.Id;
      update targetContact;
    }
    targetContact = [
      SELECT Name, Id, Account.Parent.Name
      FROM Contact
      WHERE Email = 'testPortal@testSFTarget.com'
      LIMIT 1
    ];

    User supportUser = [
      SELECT Id, Username
      FROM User
      WHERE Username = 'standardusergts@acmesupport.com'
      LIMIT 1
    ][0];
    System.runAs(supportUser) {
      System.debug(
        'Account.Parent.Name-->' + targetContact.Account.Parent.Name
      );
      Test.startTest();
      CNT_backOfficeLoginAsController.getDummyUsername(targetContact.Id);
      Test.stopTest();
    }
  }
  @isTest
  static void getDummyUsername_NotDummies() {
    Contact targetContact = [
      SELECT Name, Id, Account.Parent.Name
      FROM Contact
      WHERE Email = 'testPortal@testSFTarget.com'
      LIMIT 1
    ];
    CNT_backOfficeLoginAsController.getDummyUsername(targetContact.Id);
  }
}
