public without sharing class CNT_OTVBackfrontAccounts {
	
    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:	Method to obtain the account list of a company
    History 
    <Date>          <Author>            <Change Description>
    02/03/2021	    Antonio Duarte      Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static List<WRAPPER_AccountList_OTV.AccountAvailableService> getCompanyAccountsList (String companyId){
        List<WRAPPER_AccountList_OTV.AccountAvailableService> lstAvailableAccounts;
        
        if(!Test.isRunningTest()){
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('TRG_GetUserAccounts');//sustituir por el endpoint correspondiente
            String finalEndPoint = configWs.CNT_Endpoint__c.replace('{companyId}', companyId);
            WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId());
            String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
            if (gtsOperationsUserProfile.equals(userData.profileName) || 'System Administrator'.equals(userData.profileName)) {
                TokenInformation tokenInformation = new TokenInformation('ES', 'BBOO', 'GTS_GLOBAL', null, 'BSCHESMM');
                String response = Global_IntegrationWrapper.launchHTTP(companyId, finalEndPoint,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
            	System.debug('>>>>>>>' + response);
            	lstAvailableAccounts = WRAPPER_AccountList_OTV.parse(response)?.availableAccountsList;
            }else{
                System.debug('User is not a backoffice agent');
            }
        }
        return lstAvailableAccounts;
    }
}