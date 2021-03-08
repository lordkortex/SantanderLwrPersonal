/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Handler for the User trigger
Test Class:     HANDLER_User_Test
History
<Date>          <Author>        	<Description>
24/06/2020      Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public without sharing class HANDLER_User {
    public static void updateContact(List<User> newUserList){
        List<Contact> updateContactList = new List<Contact>();
        
        Map<Id, Profile> profiles = new Map<Id, Profile>([SELECT id from Profile where Name='Portal User' or Name='Nexus User'or Name='Admin Nexus User']);
        Map<Id,User> contactsInList = new Map<Id,User>([SELECT Id, ContactId FROM User WHERE Id in :newUserList]);
        for(User u : newUserList){
            Contact c = new Contact();
            System.debug(profiles);
            System.debug(u.profileId);
            System.debug(profiles.containsKey(u.profileId));
            if (profiles.containsKey(u.profileId) && !u.isDummyBackOfficeUser__c){
                if (contactsInList.containsKey(u.Id)){
                    if (contactsInList.get(u.Id).ContactId != null){
                  c.Id = contactsInList.get(u.Id).ContactId;
                    c.CONTACT_User__c=u.Id;
                    updateContactList.add(c);
                   }
                }
          }  
        }
        if (updateContactList.size() > 0){
            update updateContactList;
        }
    }
    
    /*---------------------------------------------------------------------------------------------
        Author:         Guillermo Giral
        Company:        Deloitte
        Description:    Checks if the user is dummy. If so, checks whether it is being assigned
						to a parent Back Office user and prevents the user to do the assignment
						if the parent is already assigned to another dummy user
        History 
        <Date>          <Author>            <Change Description>
        24/06/2020      Guillermo Giral  		Intial Version
	---------------------------------------------------------------------------------------------*/   
    public static void enforceOnlyOneParentDummyUser(List<User> newUserList, Map<Id,User> oldUserMap){
        List<User> usersToCheck = new List<User>();
        // Creates the list of users to check for their parent
        for(User u : newUserList){
            if(oldUserMap == null){
                // Is insert trigger
                if(u.USER_LUP_parentBackOfficeUser__c != null){
                	usersToCheck.add(u);
            	}
            } else {
                // Is update trigger
                if(u.USER_LUP_parentBackOfficeUser__c != null && u.USER_LUP_parentBackOfficeUser__c != oldUserMap.get(u.Id).USER_LUP_parentBackOfficeUser__c){
                	usersToCheck.add(u);
            	}
            }
        }
        
        // Queries all the users that are already assigned to a dummy user
        List<User> usersWithParent = [SELECT Id, Username, USER_LUP_parentBackOfficeUser__c, USER_LUP_parentBackOfficeUser__r.Username  FROM User WHERE USER_LUP_parentBackOfficeUser__c != null];
        
        // Checks whether any of the parent users are already assigned
        if(!usersToCheck.isEmpty()){
            for(User parentUser : usersWithParent){
                for(User dummyUser : usersToCheck){
                    if(parentUser.USER_LUP_parentBackOfficeUser__c == dummyUser.USER_LUP_parentBackOfficeUser__c){
                        System.debug('ERROR');
                        dummyUser.addError('Another dummy user is already assigned to the Parent User with username -> ' + parentUser.USER_LUP_parentBackOfficeUser__r.Username);
                    }
                }
            }
        }
    }
}