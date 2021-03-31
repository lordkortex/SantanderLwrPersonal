/*------------------------------------------------------------
Author:         Alberto Borraz
Company:        Deloitte
Description:	cmpOTVParentCompanyDetail
Test Class:		CNT_OTV_CompantDetail_Test
History 
<Date>          <Author>            <Change Description>
12/03/2021	    Alberto Borraz     Initial version
------------------------------------------------------------*/ 
public without sharing class CNT_OTV_CompanyDetail {
    
    
    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:	Method to obtain the status of the service matrix-subsd
    History 
    <Date>          <Author>            <Change Description>
    03/03/2021	    Antonio Duarte      Initial version 
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static WRAPPER_OTV_Info.MatrixServiceStatus getMatrixStatus (String companyId){
        List<WRAPPER_AccountList_OTV.AccountAvailableService> lstAvailableAccounts;
        WRAPPER_OTV_Info.MatrixServiceStatus mss;
        String response;
        try{
            if(!Test.isRunningTest()){
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('TRG_GetUserAccounts');//sustituir por el endpoint correspondiente
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{companyId}', companyId);
                WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId());
                String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
                if (gtsOperationsUserProfile.equals(userData.profileName) || 'System Administrator'.equals(userData.profileName)) {
                    TokenInformation tokenInformation = new TokenInformation('ES', 'BBOO', 'GTS_GLOBAL', null, 'BSCHESMM');
                    response = Global_IntegrationWrapper.launchHTTP(companyId, finalEndPoint,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
                }else{
                    response = Global_IntegrationWrapper.launchHTTP(companyId, finalEndPoint,  configWs.CNT_HTTPMethod__c);
                }
                System.debug('>>>>>>>' + response);
                mss = (WRAPPER_OTV_Info.MatrixServiceStatus) JSON.deserialize(response, WRAPPER_OTV_Info.MatrixServiceStatus.class);
            }
        }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING getMatrixStatus');
        }
        return mss;
    }

    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:	Method to obtain the company details(Name, Detail, Cuntry) from SF
    History 
    <Date>          <Author>            <Change Description>
    12/03/2021	    Antonio Matachana     Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static WRAPPER_OTV_Info.CompanyDetail getCompanyDetails(){
        Account acct = null;
        WRAPPER_OTV_Info.CompanyDetail compDetail = new WRAPPER_OTV_Info.CompanyDetail();
        Id userId = UserInfo.getUserId();
        Schema.DescribeFieldResult F = Account.Consent_Country__c.getDescribe();
        Schema.sObjectField T = F.getSObjectField();
        List<PicklistEntry> picklistCountries = T.getDescribe().getPicklistValues();
        Map<String,String> mapCountryPicklist = new Map<String,String>();
        try{
            for(PicklistEntry entry: picklistCountries){
                mapCountryPicklist.put(entry.getValue(), entry.getLabel());
            }
            User currentUser = [SELECT Id, 
                                       ContactId,
                                       Contact.AccountId, 
                                       Contact.Account.Name, 
                                       Contact.Account.Consent_Country__c, 
                                       Contact.Account.ACC_TXT_DocumentNumber__c 
                                  FROM User 
                                 WHERE Id = :userId 
                                 LIMIT 1];
            compDetail.companyName = currentUser.Contact.Account.Name;
            if(currentUser.Contact.Account.ACC_TXT_DocumentNumber__c != null){
            	compDetail.companyDetail = currentUser.Contact.Account.Name + ' S.L. - ' + currentUser.Contact.Account.ACC_TXT_DocumentNumber__c;
            }else {
                compDetail.companyDetail = currentUser.Contact.Account.Name + ' S.L.';
            }
        	compDetail.companyCountry = mapCountryPicklist.get(currentUser.Contact.Account.Consent_Country__c);
        }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING getCompanyDetails');
        }
		return compDetail; 
    }
    
    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:    Method to send the invitation declination.
    History 
    <Date>          <Author>            <Change Description>
    11/03/2021	    Antonio Duarte     	Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static String declineOTVInvitation(String reason, String details,String status){
        return CNT_OTV_ServiceDeclination.declineOTVInvitation(reason, details, status);
    }
    
    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        Deloitte
    Description:	Method to obtain a list of users from a mulesoft endpoint
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static List<WRAPPER_OTV_Info.userData> calloutGetUserList(String companyId) {
        return CNT_OTV_UsersLanding.calloutGetUserList(companyId);
    }
}