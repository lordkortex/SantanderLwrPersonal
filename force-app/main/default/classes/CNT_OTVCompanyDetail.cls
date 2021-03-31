public without sharing class CNT_OTVCompanyDetail {
    
    public class MatrixServiceStatus{
        @auraEnabled public String companyId;
        @auraEnabled public String status;
    }

    public class CompanyDetail {
        @auraEnabled public String companyName;
        @auraEnabled public String companyDetail;
        @auraEnabled public String companyCountry;
    }
    
    //metodo recuperar lista de usuarios (br) (CNT_OTV_UsersLanding.calloutGetUserList)
    //metodo persistir revocar/dar permisos (CNT_OTVCallServicesAux.updateProcess)
    
    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:	Method to obtain the status of the service matrix-subsd
    History 
    <Date>          <Author>            <Change Description>
    03/03/2021	    Antonio Duarte      Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static MatrixServiceStatus getMatrixStatus (String companyId){
        List<WRAPPER_AccountList_OTV.AccountAvailableService> lstAvailableAccounts;
        MatrixServiceStatus mss;
        String response;
        
        if(!Test.isRunningTest()){
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('TRG_GetUserAccounts');//sustituir por el endpoint correspondiente
            String finalEndPoint = configWs.CNT_Endpoint__c.replace('{companyId}', companyId);
            WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId());
            String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
            if (gtsOperationsUserProfile.equals(userData.profileName) || 'System Administrator'.equals(userData.profileName)) {
                System.debug('User is a BackOffice agent');
                TokenInformation tokenInformation = new TokenInformation('ES', 'BBOO', 'GTS_GLOBAL', null, 'BSCHESMM');
                response = Global_IntegrationWrapper.launchHTTP(companyId, finalEndPoint,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
            }else{
                System.debug('User is a portal customer');
                response = Global_IntegrationWrapper.launchHTTP(companyId, finalEndPoint,  configWs.CNT_HTTPMethod__c);
            }
            System.debug('>>>>>>>' + response);
           	mss = (MatrixServiceStatus) JSON.deserialize(response, MatrixServiceStatus.class);
        }
        return mss;
    }
    

    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:	Method to obtain the company details(Name, Detail, Country) from SF
    History 
    <Date>          <Author>            <Change Description>
    12/03/2021	    Antonio Matachana     Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static CompanyDetail getCompanyDetails(){
        Account acct = null;
        CompanyDetail compDetail = new CompanyDetail();
        Id userId = UserInfo.getUserId();

        Schema.DescribeFieldResult F = Account.Consent_Country__c.getDescribe();
        Schema.sObjectField T = F.getSObjectField();
        List<PicklistEntry> picklistCountries = T.getDescribe().getPicklistValues();

        Map<String,String> mapCountryPicklist = new Map<String,String>();
        for(PicklistEntry entry: picklistCountries){
            mapCountryPicklist.put(entry.getValue(), entry.getLabel());
        }

        List<User> currentUser = [SELECT Id, ContactId FROM User WHERE Id = :userId LIMIT 1];
        List<Contact> contactList = [SELECT Id, AccountId FROM Contact WHERE Id = :currentUser[0].ContactId LIMIT 1];
        if(!contactList.isEmpty() && contactList[0].AccountId != null){
            acct = [SELECT Id, Name, Consent_Country__c, ACC_TXT_DocumentNumber__c  FROM Account WHERE Id = :contactList[0].AccountId LIMIT 1];
            if(acct != null){
                compDetail.companyName = acct.Name;
                if(acct.ACC_TXT_DocumentNumber__c != null){
                    compDetail.companyDetail = acct.Name + ' S.L. - ' + acct.ACC_TXT_DocumentNumber__c;
                }else {
                    compDetail.companyDetail = acct.Name + ' S.L.';
                }
                compDetail.companyCountry = mapCountryPicklist.get(acct.Consent_Country__c);
            }
            System.debug('getCompanyDetails: ' + compDetail);
            return compDetail;
        }else{
            return null;
        }
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