/*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Wrapper class of the account list from User
    History 
    <Date>          <Author>            <Change Description>
    29/01/2021	    Antonio Matachana      Initial version
    ------------------------------------------------------------*/ 
global with sharing class WRAPPER_AccountList_OTV {

    global WRAPPER_AccountList_OTV(){
        System.debug('WRAPPER_AccountList_OTV.AccountAvailableService');
    }
    	@AuraEnabled	global String companyId;
		@AuraEnabled	global String userId;
    
	global class AccountAvailableService {
	
        @AuraEnabled	global String accountId;
        @AuraEnabled	global String accountType;
        @AuraEnabled	global String bankId;
        @AuraEnabled	global String country;
        @AuraEnabled	global String alias;
        @AuraEnabled	global String companyName;
        @AuraEnabled	global String status;
        
        global AccountAvailableService(){
            System.debug('WRAPPER_AccountList_OTV.AccountAvailableService');
        }
	}

	@AuraEnabled global List<AccountAvailableService> availableAccountsList;

	
	global static WRAPPER_AccountList_OTV parse(String json) {
		return (WRAPPER_AccountList_OTV) System.JSON.deserialize(json, WRAPPER_AccountList_OTV.class);
	}
}