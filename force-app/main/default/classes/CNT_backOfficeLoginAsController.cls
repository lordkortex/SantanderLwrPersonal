/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Controller for the custom Login As component
Test Class:     CNT_backOfficeLoginAsController_Test
History
<Date>			<Author>		    <Description>
16/06/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public without sharing class CNT_backOfficeLoginAsController { 
    /*------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Gets the dummy username based on the userId passed as parameter
and updates the globalId of the user with the target user Id
History 
<Date>          <Author>            <Change Description>
16/06/2020      Guillermo Giral  	Intial Version
------------------------------------------------------------*/
    @AuraEnabled
    public static String getDummyUsername(String userId) {    
        // Get the dummy user associated with the back office user
        List<User> dummyUsers = [SELECT Id, Username, USER_TXT_GlobalId__c, ProfileId, USER_CHK_CashNexus__c, USER_TXT_BIC__c, ContactId, Contact.CHK_MultiOneTrade__c, USER_country__c  FROM User WHERE USER_LUP_parentBackOfficeUser__c =: UserInfo.getUserId() LIMIT 1];
        
        if(!dummyUsers.isEmpty()){
            // Get the target user
            User targetUser = getTargetUser(userId);
            
            if(targetUser != null){
                // Copy the globalId from the target user to the dummy user
                User dummyUser = dummyUsers[0];  
                dummyUser.USER_TXT_GlobalId__c = targetUser.USER_TXT_GlobalId__c;
                dummyUser.ProfileId = targetUser.ProfileId;
                dummyUser.USER_CHK_CashNexus__c = targetUser.USER_CHK_CashNexus__c;
                dummyUser.USER_TXT_BIC__c = targetUser.USER_TXT_BIC__c;
                dummyUser.USER_country__c = targetUser.USER_country__c;
                
                
                update dummyUser;
                
                return dummyUser.Username;
            }
        }
        return null;
    }
    
    /*------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Gets the target user, who must be associated with the
WW account and have the Nexus User profile assigned
History 
<Date>          <Author>            <Change Description>
16/06/2020      Guillermo Giral  	Intial Version
------------------------------------------------------------*/
    private static User getTargetUser(String userId){
        return [SELECT Id, Username, Profile.Name, USER_TXT_GlobalId__c, ProfileId, USER_CHK_CashNexus__c, ContactId, Contact.CHK_MultiOneTrade__c, USER_TXT_BIC__c, USER_country__c
                FROM User 
                WHERE Id =: userId 
                //AND USER_CHK_CashNexus__c = true
                //AND AccountId IN (SELECT Id FROM Account WHERE Name =: System.Label.NexusAccount OR Parent.Name =: System.Label.NexusAccount)  
                //AND ProfileId IN (SELECT Id FROM Profile WHERE Name =: System.Label.NexusUserProfile)
                LIMIT 1][0];
    }
    
    /*------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Gets the access token for the dummy user through   
the JWT token OAuth 2.0 flow
History 
<Date>          <Author>            <Change Description>
16/06/2020      Guillermo Giral  	Intial Version
------------------------------------------------------------*/
    @AuraEnabled
    public static Map<String,String> getUserAccessToken(String username, String consumerKey, String targetUserId) {    
        
        //get the target user
        User targetUser = [Select Id, Username, USER_TXT_GlobalId__c, ProfileId, USER_CHK_CashNexus__c, USER_TXT_BIC__c, ContactId, Contact.CHK_MultiOneTrade__c, USER_country__c, Profile.Name from User Where Id = :targetUserId];
        
        // Get the dummy user associated with the back office user
        List<User> dummyUsers = [SELECT Id, Username, USER_TXT_GlobalId__c, ProfileId, USER_CHK_CashNexus__c, USER_TXT_BIC__c, ContactId, Contact.CHK_MultiOneTrade__c, USER_country__c  FROM User WHERE USER_LUP_parentBackOfficeUser__c =: UserInfo.getUserId() ];
        

        // Create a session with the dummy user and pass it to the frontdoor.jsp
        Auth.JWT jwt = new Auth.JWT();
        jwt.setSub(username); 
        
        if(targetUser.Profile.Name == System.label.PortalUserProfile && !targetUser.USER_CHK_CashNexus__c)
        {
            jwt.setAud(System.Label.domain);
        }
        else
        {
            jwt.setAud(System.Label.domainCashNexus);
        }
        
        jwt.setIss(consumerKey);
        
        //Create the object that signs the JWT bearer token
        Auth.JWS jws = new Auth.JWS(jwt, Label.certificateName);
        
        //Get the resulting JWS in case debugging is required
        String token = jws.getCompactSerialization();
        
        //Set the token endpoint that the JWT bearer token is posted to
        String tokenEndpoint = '';
        if(targetUser.Profile.Name == System.label.PortalUserProfile && !targetUser.USER_CHK_CashNexus__c)
        {
            
            tokenEndpoint =  System.Label.domain + '/services/oauth2/token';
        }
        else
        {
            tokenEndpoint =  System.Label.domainCashNexus + '/services/oauth2/token';            
        }        
        //POST the JWT bearer token
        Auth.JWTBearerTokenExchange bearer = new Auth.JWTBearerTokenExchange(tokenEndpoint, jws);
        System.debug(bearer);
        //Get the access token
        String accessToken = '';
        if(!Test.isRunningTest()){
            accessToken = bearer.getAccessToken(); 
        } else {
            // Allows the method to be tested
            accessToken = 'test-token-will-not-be-used';
        }        
        Map<String, String> returnMap = new Map<String, String>();
        returnMap.put('accessToken', accessToken);
        returnMap.put('userProfile',targetUser.Profile.Name);
        
                //If user is portal user
        if(dummyUsers != null && !dummyUsers.isEmpty() && targetUser != null && targetUser.Profile.Name == System.Label.PortalUserProfile){
            // Get the target user
            User dummyUser = dummyUsers[0];
            if(targetUser.Profile.Name == System.Label.PortalUserProfile)
            {
                //get the dummy contact and the target contact
                List<Contact> dummyContact = [Select Id, CHK_MultiOneTrade__c from Contact Where Id = :dummyUser.ContactId ];
                List<Contact> targetContact = [Select Id, CHK_MultiOneTrade__c from Contact Where Id = :targetUser.ContactId ];
                if(dummyContact != null && dummyContact.size() > 0 && targetContact != null && targetContact != null && targetContact.size() > 0)
                {
                    //Align the contacts
                    dummyContact.get(0).CHK_MultiOneTrade__c = targetContact.get(0).CHK_MultiOneTrade__c;
                    Database.update(dummyContact);
                }
            }
            
        }
        
        return returnMap;            
    }
    
    /*------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Creates an audit record to keep track of which
support user has logged in with which target user
(Nexus User)
History 
<Date>          <Author>            <Change Description>
23/06/2020      Guillermo Giral  	Intial Version
------------------------------------------------------------*/
    @AuraEnabled
    public static void createAuditRecord(String loggedInUserId, String loggedAsUserId) {   
        UserLoginAudit__c auditRecord = new UserLoginAudit__c(
            loggedInUser__c = loggedInUserId,
            loggedAsUser__c = loggedAsUserId,
            loginDate__c = Datetime.now()
        );
        
        insert auditRecord;
    }     
}