@isTest
public class HANDLER_Contact_Test {
  @testSetup
  static void setup() {
    User u = [
      SELECT Id, contactId
      FROM User
      WHERE
        USER_TXT_GlobalId__c != NULL
        AND Profile.Name = 'Nexus User'
        AND isActive = TRUE
      LIMIT 1
    ];
    Contact cnt = new Contact(
      FirstName = 'test',
      LastName = 'test2',
      CONTACT_User__c = u.Id,
      CONTACT_TXT_GlobalId__c = 'ContactTest'
    );
    insert cnt;
  }

  @isTest
  static void updateUser_Test() {
    User u = [
      SELECT Id, ContactId
      FROM User
      WHERE
        USER_TXT_GlobalId__c != NULL
        AND Profile.Name = 'Nexus User'
        AND isActive = TRUE
      LIMIT 1
    ];
    Contact cnct = [
      SELECT Id, FirstName, LastName
      FROM Contact
      WHERE CONTACT_TXT_GlobalId__c = 'ContactTest'
      LIMIT 1
    ];
    cnct.FirstName = 'Changed FirstName';
    cnct.LastName = 'Changed LastName';
    update cnct;
  }
}
