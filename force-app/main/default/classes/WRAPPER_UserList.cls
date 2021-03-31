/*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Wrapper class of the user list from Account
    History 
    <Date>          <Author>            <Change Description>
    29/01/2021	    Antonio Matachana      Initial version
    ------------------------------------------------------------*/ 
	
global with sharing class WRAPPER_UserList {
    
    global WRAPPER_UserList(){
        System.debug('WRAPPER_UserList.UserService');
    }

	global class UserService {
	
        @AuraEnabled	global String userId;
        @AuraEnabled	global String serviceId;
        @AuraEnabled	global String status;
        
        global UserService(){
            System.debug('WRAPPER_UserList.UserService');
        }
	}

	@AuraEnabled global List<UserService> userList;

	
	global static WRAPPER_UserList parse(String json) {
		return (WRAPPER_UserList) System.JSON.deserialize(json, WRAPPER_UserList.class);
	}
}