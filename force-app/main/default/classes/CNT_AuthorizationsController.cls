public with sharing class CNT_AuthorizationsController {

    @AuraEnabled
    public static CNT_AuthorizationsDataWrapper getAuthorizations(){
    
        return generateMockData();
    }

    public static CNT_AuthorizationsDataWrapper generateMockData() {
    
        List<CNT_PendingAuthorizationsDataWrapper> listPendingAuth = new List<CNT_PendingAuthorizationsDataWrapper>();
        List<CNT_RequestAuthorizationsDataWrapper> listRequestAuth = new List<CNT_RequestAuthorizationsDataWrapper>();

        // Fill pending authorizations data
        for(Integer i = 0; i < 50; i++){
            
            CNT_PendingAuthorizationsDataWrapper creationUserProfile = new CNT_PendingAuthorizationsDataWrapper('Trinidad Hernandez Arias', '25/11/2019, 12:35', 'Creation User profile USER PROFILE, GR TESTPORTAL ' + i, 'Creation User profile');
            CNT_PendingAuthorizationsDataWrapper modifyUserProfile = new CNT_PendingAuthorizationsDataWrapper('Trinidad Hernandez Arias', '25/11/2019, 12:35', 'Modify User profile USER PROFILE, GR TESTPORTAL ' + i, 'Modify User profile');
            
            CNT_PendingAuthorizationsDataWrapper creationUser = new CNT_PendingAuthorizationsDataWrapper('Trinidad Hernandez Arias', '25/11/2019, 12:35', 'Creation User María Yolanda del Valle Redondo, GR TESTPORTAL ' + i, 'Creation User');
            CNT_PendingAuthorizationsDataWrapper modifyUser = new CNT_PendingAuthorizationsDataWrapper('Trinidad Hernandez Arias', '25/11/2019, 12:35', 'Modify User María Yolanda del Valle Redondo, GR TESTPORTAL ' + i, 'Modify User');
            CNT_PendingAuthorizationsDataWrapper deleteUser = new CNT_PendingAuthorizationsDataWrapper('Trinidad Hernandez Arias', '25/11/2019, 12:35', 'Delete User María Yolanda del Valle Redondo, GR TESTPORTAL ' + i, 'Delete User');
            
            CNT_PendingAuthorizationsDataWrapper deleteUserGroup = new CNT_PendingAuthorizationsDataWrapper('Trinidad Hernandez Arias', '25/11/2019, 12:35', 'Delete User group USER GROUP, GR TESTPORTAL ' + i, 'Delete User group');
            CNT_PendingAuthorizationsDataWrapper creationUserGroup = new CNT_PendingAuthorizationsDataWrapper('Trinidad Hernandez Arias', '25/11/2019, 12:35', 'Creation User group USER GROUP, GR TESTPORTAL ' + i, 'Creation User group');
            CNT_PendingAuthorizationsDataWrapper modifyUserGroup = new CNT_PendingAuthorizationsDataWrapper('Trinidad Hernandez Arias', '25/11/2019, 12:35', 'Modify User group USER GROUP, GR TESTPORTAL ' + i, 'Modify User group');
            
            listPendingAuth.add(creationUserProfile);
            listPendingAuth.add(modifyUserProfile);
            listPendingAuth.add(creationUser);
            listPendingAuth.add(modifyUser);
            listPendingAuth.add(deleteUser);
            listPendingAuth.add(deleteUserGroup);
            listPendingAuth.add(creationUserGroup);
            listPendingAuth.add(modifyUserGroup);
            
        }

        // Fill request authorizations data
        for(Integer i = 0; i < 50; i++){
            
            CNT_RequestAuthorizationsDataWrapper creationUserProfile = new CNT_RequestAuthorizationsDataWrapper('25/11/2019, 12:35', 'Creation User profile USER PROFILE', 'Pending', 'Miguel Admin Temporal ' + i, '25/11/2019, 12:30', 'OK perfilado funcional', 'Creation User profile');
            CNT_RequestAuthorizationsDataWrapper modifyUserProfile = new CNT_RequestAuthorizationsDataWrapper('25/11/2019, 12:35', 'Modify User profile USER PROFILE', 'Pending', 'Miguel Admin Temporal ' + i, '25/11/2019, 12:30', 'OK perfilado funcional', 'Modify User profile');
            CNT_RequestAuthorizationsDataWrapper creationUser = new CNT_RequestAuthorizationsDataWrapper('25/11/2019, 12:35', 'Creation User María Yolanda del Valle Redondo', 'Pending', 'Miguel Admin Temporal ' + i, '25/11/2019, 12:30', 'OK perfilado funcional', 'Creation User');
            
            CNT_RequestAuthorizationsDataWrapper modifyUser = new CNT_RequestAuthorizationsDataWrapper('25/11/2019, 12:35', 'Modify User María Yolanda del Valle Redondo', 'Pending', 'Miguel Admin Temporal ' + i, '25/11/2019, 12:30', 'OK perfilado funcional', 'Modify User');
            CNT_RequestAuthorizationsDataWrapper deleteUser = new CNT_RequestAuthorizationsDataWrapper('25/11/2019, 12:35', 'Delete User María Yolanda del Valle Redondo', 'Pending', 'Miguel Admin Temporal ' + i, '25/11/2019, 12:30', 'OK perfilado funcional', 'Delete User');
            
            CNT_RequestAuthorizationsDataWrapper deleteUserGroup = new CNT_RequestAuthorizationsDataWrapper('25/11/2019, 12:35', 'Delete User group USER GROUP', 'Pending', 'Miguel Admin Temporal ' + i, '25/11/2019, 12:30', 'OK perfilado funcional', 'Delete User group');
            CNT_RequestAuthorizationsDataWrapper creationUserGroup = new CNT_RequestAuthorizationsDataWrapper('25/11/2019, 12:35', 'Creation User group USER GROUP', 'Pending', 'Miguel Admin Temporal ' + i, '25/11/2019, 12:30', 'OK perfilado funcional', 'Creation User group');
            CNT_RequestAuthorizationsDataWrapper modifyUserGroup = new CNT_RequestAuthorizationsDataWrapper('25/11/2019, 12:35', 'Modify User group USER GROUP', 'Pending', 'Miguel Admin Temporal ' + i, '25/11/2019, 12:30', 'OK perfilado funcional', 'Modify User group');
            
            listRequestAuth.add(creationUserProfile);
            listRequestAuth.add(modifyUserProfile);
            listRequestAuth.add(creationUser);
            listRequestAuth.add(modifyUser);
            listRequestAuth.add(deleteUser);
            listRequestAuth.add(deleteUserGroup);
            listRequestAuth.add(creationUserGroup);
            listRequestAuth.add(modifyUserGroup);
        }

        // Fill global wrapper
        CNT_AuthorizationsDataWrapper data = new CNT_AuthorizationsDataWrapper(listPendingAuth, listRequestAuth);
        return data;

    }

    //WRAPPER OF PENDING AUTHORIZATIONS DATA
    public class CNT_PendingAuthorizationsDataWrapper {
        @AuraEnabled public String administrator                        {get;set;}
        @AuraEnabled public String requestDate                          {get;set;}
        @AuraEnabled public String authorizeAction                      {get;set;}
        @AuraEnabled public String action                      			{get;set;}

        public CNT_PendingAuthorizationsDataWrapper(String administrator,String requestDate,String authorizeAction, String action){
            this.administrator = administrator;
            this.requestDate = requestDate;
            this.authorizeAction = authorizeAction;
            this.action = action;
        }
    } 

    //WRAPPER OF REQUEST AUTHORIZATIONS DATA
    public class CNT_RequestAuthorizationsDataWrapper {
        @AuraEnabled public String requestDate                          {get;set;}
        @AuraEnabled public String authorizeAction                      {get;set;}
        @AuraEnabled public String state                                {get;set;}
        @AuraEnabled public String approver                             {get;set;}
        @AuraEnabled public String approvalDate                         {get;set;}
        @AuraEnabled public String comment                              {get;set;}
        @AuraEnabled public String action                      			{get;set;}

        public CNT_RequestAuthorizationsDataWrapper(String requestDate,String authorizeAction,String state,String approver, String approvalDate, String comment, String action){
            this.requestDate = requestDate;
            this.authorizeAction = authorizeAction;
            this.state = state;
            this.approver = approver;
            this.approvalDate = approvalDate;
            this.comment = comment;
            this.action = action;
        }
    }  

    //WRAPPER OF AUTHORIZATIONS DATA
    public class CNT_AuthorizationsDataWrapper {
        @AuraEnabled public List<CNT_PendingAuthorizationsDataWrapper>  pendingAuthorizations                          {get;set;}
        @AuraEnabled public List<CNT_RequestAuthorizationsDataWrapper>  requestAuthorizations                          {get;set;}

        public CNT_AuthorizationsDataWrapper(List<CNT_PendingAuthorizationsDataWrapper> pendingAuthorizations, List<CNT_RequestAuthorizationsDataWrapper> requestAuthorizations){
            this.pendingAuthorizations = pendingAuthorizations;
            this.requestAuthorizations = requestAuthorizations;
        }
    }  

}