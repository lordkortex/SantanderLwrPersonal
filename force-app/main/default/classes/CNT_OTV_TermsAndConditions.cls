/*------------------------------------------------------------
Author:         Alberto Borraz
Company:        Deloitte
Description:	cmpOTVTermsAndConditions
Test Class:		CNT_OTV_TermsAndConditions_Test
History 
<Date>          <Author>            <Change Description>
12/03/2021	    Alberto Borraz     Initial version
------------------------------------------------------------*/ 
public without sharing class CNT_OTV_TermsAndConditions {
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to obtain user country to select the correct T&C PDF 
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/ 
 	@AuraEnabled
    public static String getTCByCountry(String userCountry){
        String url;
        try{
            String pdf_TC = 'OTVTermsAndConditionsPDF_' + userCountry + '%';
            StaticResource stcResource = [SELECT Name,SystemModStamp
                                       	    FROM StaticResource 
                                           WHERE Name LIKE :pdf_TC
                                           LIMIT 1];
            url = '/resource/'
                + String.valueOf(((DateTime)stcResource.get('SystemModStamp')).getTime())
                + '/' + stcResource.get('Name');
         }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING T&C PDF');
         }
         return url;
    }
    
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to update account signature fields
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/ 
	@AuraEnabled
    public static void termsConditionsSignature(String pdfName){
        List<Account> accsToUpdate = new List<Account>();
        Id userId = UserInfo.getUserId();
        try {
        	if(userId != null ){
                List<Contact> lstAccts = [SELECT Id, 
                                             	 AccountId,
                                             	 Account.ACC_TXT_DocumentType__c,
                                                 Account.ACC_TXT_DocumentNumber__c,
                                                 Account.Name,
                                                 Account.Consent_Country__c,
                                                 Account.ACC_PCK_Country__c,
                                                 Account.ACC_PCK_OTView_Enrollment__c,
                                                 Account.ACC_CHK_OTView_Admin__c,
                                                 Account.ACC_CHK_OTView_TermsConditions__c,
                                                 Account.ACC_DATE_OTView_TermsConditions_Date__c,
                                                 Account.ACC_LCK_OTView_TermsConditions_Signatory__c,
                                                 Account.ACC_TXT_OTView_TermsConditions_DocName__c
                                           FROM Contact
                                          WHERE CONTACT_User__c = :userId
                                            AND Account.ACC_CHK_OTView_Admin__c != null
                                          LIMIT 1];
                if(lstAccts[0].Id == lstAccts[0].Account.ACC_CHK_OTView_Admin__c){
                    lstAccts[0].Account.ACC_CHK_OTView_TermsConditions__c 			= true;
                    lstAccts[0].Account.ACC_DATE_OTView_TermsConditions_Date__c 	= system.now();
                    lstAccts[0].Account.ACC_LCK_OTView_TermsConditions_Signatory__c = lstAccts[0].Id;
                    lstAccts[0].Account.ACC_TXT_OTView_TermsConditions_DocName__c 	= pdfName.split('/')[3];
                    accsToUpdate.add(lstAccts[0].Account);
                }
            }
        	update accsToUpdate;            
        } catch (Exception e) {
            throw new CustomException('ERROR RETRIEVING T&C SIGN');
        }
    }
    
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to get scauID to complete globalID application signing
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/ 
	@AuraEnabled
    public static WS_B2B_OTP_Strategic_OTV.initiateOTP_OTV getScauId() {
        return WS_B2B_OTP_Strategic_OTV.getOTP_OTV();
    }
    
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to get sessionID to complete globalID application signing
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/ 
	@AuraEnabled
    public static String getSessionId () {
        return UserInfo.getSessionId();
    }
    
	/*----------------------------------------------------------------------------------
	Author:         Alberto Borraz
	Company:        
	Description:    Update Service Activation status and picklist from Salesforce for Matrix company
	History
	<Date>          <Author>        	<Description>
	11/02/2021      Alberto Borraz     	Initial version
	----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void updateMatrixStatus() {
        Id userId = UserInfo.getUserId();
        try{
            User currentUser = [SELECT Id,
                                       ContactId, 
                                       Contact.AccountId,
                                       Contact.Account.ACC_serviceActivationId__c,
                                       Contact.Account.ACC_TXT_CompanyId__c  
                                  FROM User 
                                 WHERE Id = :userId
                                 LIMIT 1];
            WRAPPER_OTV_ServiceActivation.serviceActivationDataPath dataPath = new WRAPPER_OTV_ServiceActivation.serviceActivationDataPath();
            datapath.status ='ACTIVE';//'SUBSIDIARY_SELECTION_PENDING';
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_ServiceActivation_PATCH');
            String  finalEndPoint = configWs.CNT_Endpoint__c;
            if(currentUser.Contact.Account.ACC_serviceActivationId__c != null){
                finalEndPoint = finalEndPoint + '?serviceActivationId=' + currentUser.Contact.Account.ACC_serviceActivationId__c;
            }else{
                finalEndPoint = finalEndPoint + '?companyId=' + currentUser.Contact.Account.ACC_TXT_CompanyId__c + '&serviceActivacionType=OTV_GLOBAL_ACT';
            }
            String response = Global_IntegrationWrapper.launchHttp(JSON.Serialize(dataPath), finalEndPoint, configWs.CNT_HTTPMethod__c);
            System.debug('updateProcessFinal >>>>>>>' + response);
            currentUser.Contact.Account.ACC_PCK_OTView_Enrollment__c = 'Subsidiary Selection Pending';
        }catch(Exception e){
           throw new CustomException('ERROR Updating Matrix Status'); 
        }
	}
    
	/*----------------------------------------------------------------------------------
	Author:         Alberto Borraz
	Company:        
	Description:    Update Service Activation status and picklist from Salesforce for Subsidiary company
	History
	<Date>          <Author>        	<Description>
	11/02/2021      Alberto Borraz     	Initial version
	----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void updateSubsidiaryStatus() {
        Id userId = UserInfo.getUserId();
        try{
            User currentUser = [SELECT Id,
                                       ContactId, 
                                       Contact.AccountId,
                                       Contact.Account.ACC_serviceActivationId__c,
                                       Contact.Account.Parent.ACC_TXT_CompanyId__c  
                                  FROM User 
                                 WHERE Id = :userId
                                 LIMIT 1];
            WRAPPER_OTV_ServiceActivation.serviceActivationDataPath dataPath = new WRAPPER_OTV_ServiceActivation.serviceActivationDataPath();
            datapath.status ='ACTIVE';
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_ServiceActivationSub_PATCH');
            String  finalEndPoint = configWs.CNT_Endpoint__c;
            finalEndPoint = finalEndpoint.replace('{company_id_matrix}', currentUser.Contact.Account.Parent.ACC_TXT_CompanyId__c); 
            if(currentUser.Contact.Account.ACC_serviceActivationId__c != null){
                finalEndPoint = finalEndPoint + '?serviceActivationId=' + currentUser.Contact.Account.ACC_serviceActivationId__c;
            }else{
                finalEndPoint = finalEndPoint + '?companyId=' + '123456789' /*currentUser.Contact.Account.Parent.ACC_TXT_CompanyId__c*/ + '&serviceActivacionType=OTV_LOCAL_ACT';
            }
            String response = Global_IntegrationWrapper.launchHttp(JSON.Serialize(dataPath), finalEndPoint, configWs.CNT_HTTPMethod__c);
            System.debug('updateProcessFinal >>>>>>>' + response);
            currentUser.Contact.Account.ACC_PCK_OTView_Enrollment__c = 'Enrolled';
        }catch(Exception e){
           throw new CustomException('ERROR Updating Subsidiary Status'); 
        }
	}
}