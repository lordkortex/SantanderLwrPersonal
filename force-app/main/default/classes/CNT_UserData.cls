public without sharing class CNT_UserData {
    
    public static User getUserData(String userId)
    {
        User result = new User();
        if(userId==''){ 
            userId=UserInfo.getUserId();
        }
        List<User> user = [SELECT Id, FirstName, LastName, Alias, Profile.Name, UserRole.Name, Email, MobilePhone, USER_TXT_Signer_email__c,USER_TXT_LocalUid__c, LanguageLocaleKey, User_DateFormat__c, USER_NumberFormat__c, USER_CHK_CashNexus__c, USER_TXT_GlobalId__c, USER_country__c, USER_TXT_BIC__c, UserRoleId FROM User WHERE Id = :userId LIMIT 1 ];
        if(user.size() > 0) {
            result = user.get(0);
        }
        
        return result;
    }
    
    public static List<User> getUsersDataGlobal(List<String> userIds)
    {
        List<User> result = new List<User>();
        
        if(userIds.size() > 0){     
            List<User> users = [SELECT Id, Name, FirstName, LastName, Alias, Profile.Name, UserRole.Name, Email, MobilePhone, USER_TXT_Signer_email__c,USER_TXT_LocalUid__c, LanguageLocaleKey, User_DateFormat__c, USER_NumberFormat__c, USER_CHK_CashNexus__c, USER_TXT_GlobalId__c, USER_country__c, USER_TXT_BIC__c, UserRoleId FROM User WHERE USER_TXT_GlobalId__c IN :userIds];
            if(users.size() > 0) {
                result = users;
            }
        }
        
        return result;
    }


}