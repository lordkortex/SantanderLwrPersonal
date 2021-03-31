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
            if (profiles.containsKey(u.profileId)){
                if (contactsInList.containsKey(u.Id) && !u.isDummyBackOfficeUser__c){
                    if (contactsInList.get(u.Id).ContactId != null){
                  c.Id = contactsInList.get(u.Id).ContactId;
                    c.CONTACT_User__c=u.Id;
                    updateContactList.add(c);
                   }
                }
          	}
          	
            //DA - 23/03/21 - Auth Provider
            if (u.USER_CHK_CashNexus__c) {
                setAuthProvider(u.Id);
            }
        }
        
        if (updateContactList.size() > 0){
            update updateContactList;
        }
    }
    
    //DA - 23/03/21 - Auth Provider
    @Future
    public static void setAuthProvider(Id userId){
        
        Id authNexusId;
        Id authNexusSSOId; 
        User u = [SELECT Id, USER_TXT_GlobalId__c from User where Id =: userId];
        
        List<AuthProvider> authProv = new List<AuthProvider>();
        authProv = [select Id, DeveloperName, FriendlyName from AuthProvider];
        for (AuthProvider i : authProv) {
            if(i.FriendlyName == 'GlobalIDNexus') {
                authNexusId = i.Id;
            }
            if(i.FriendlyName == 'GlobalIDNexusSSO') {
                authNexusSSOId = i.Id;
            }
        }
        
        List<ThirdPartyAccountLink> userProv = new List<ThirdPartyAccountLink>();
        userProv = [SELECT Handle, RemoteIdentifier, SsoProviderId, UserId, Provider FROM ThirdPartyAccountLink WHERE UserId =: u.Id];
        
        if(userProv.size() > 0) {
            if (userProv[0].SsoProviderId == authNexusId) {
                ThirdPartyAccountLink insertAuth = new ThirdPartyAccountLink (Handle = u.USER_TXT_GlobalId__c, RemoteIdentifier = u.USER_TXT_GlobalId__c, SsoProviderId = authNexusSSOId, UserId = u.Id, Provider = 'open id connect');
                Database.insertImmediate(insertAuth);
            } else if (userProv[0].SsoProviderId == authNexusSSOId) {
                ThirdPartyAccountLink insertAuth = new ThirdPartyAccountLink (Handle = u.USER_TXT_GlobalId__c, RemoteIdentifier = u.USER_TXT_GlobalId__c, SsoProviderId = authNexusId, UserId = u.Id, Provider = 'open id connect');
                Database.insertImmediate(insertAuth);
            }
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
        for(User parentUser : usersWithParent){
            for(User dummyUser : usersToCheck){
                if(parentUser.USER_LUP_parentBackOfficeUser__c == dummyUser.USER_LUP_parentBackOfficeUser__c){
                    dummyUser.addError('Another dummy user is already assigned to the Parent User with username -> ' + parentUser.USER_LUP_parentBackOfficeUser__r.Username);
                }
            }
        }
    }
    
    @future
 	public static void updateContact(List<Id> userId){    
    }
}