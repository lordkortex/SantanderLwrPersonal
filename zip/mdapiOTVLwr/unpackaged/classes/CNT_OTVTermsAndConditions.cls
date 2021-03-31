public without sharing class CNT_OTVTermsAndConditions {
  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to obtain user country
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static String getUserCountry() {
    Id userId = UserInfo.getUserId();
    try {
      List<User> currentUser = [
        SELECT USER_country__c
        FROM User
        WHERE Id = :userId
        LIMIT 1
      ];
      if (!currentUser.isEmpty()) {
        return currentUser[0].USER_country__c;
      }
    } catch (Exception e) {
      system.debug('Error getUserCountry');
      return null;
    }
    return null;
  }

  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to obtain user country to select the correct T&C PDF 
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static String getTCByCountry(String userCountry) {
    String pdf_TC = 'OTVTermsAndConditionsPDF_' + userCountry + '%';
    try {
      StaticResource stcResource = [
        SELECT Name, SystemModStamp
        FROM StaticResource
        WHERE Name LIKE :pdf_TC
        LIMIT 1
      ];

      if (stcResource != null) {
        String url =
          '/resource/' +
          String.valueOf(
            ((DateTime) stcResource.get('SystemModStamp')).getTime()
          ) +
          '/' +
          stcResource.get('Name');
        if (url != null) {
          return url;
        }
      }
    } catch (Exception e) {
      system.debug(e);
      return null;
    }
    return null;
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
  public static void termsConditionsSignature(String pdfName) {
    List<Account> accsToUpdate = new List<Account>();
    Id userId = UserInfo.getUserId();
    try {
      if (userId != null) {
        List<Contact> contactList = [
          SELECT Id, AccountId
          FROM Contact
          WHERE CONTACT_User__c = :userId
          LIMIT 1
        ];
        if (!contactList.isEmpty()) {
          Id accId = contactList[0].AccountId;
          if (accId != null) {
            List<Account> lstAccts = [
              SELECT
                Id,
                ACC_TXT_DocumentType__c,
                ACC_TXT_DocumentNumber__c,
                Name,
                Consent_Country__c,
                ACC_PCK_Country__c,
                ACC_PCK_OTView_Enrollment__c,
                ACC_CHK_OTView_Admin__c,
                ACC_CHK_OTView_TermsConditions__c,
                ACC_DATE_OTView_TermsConditions_Date__c,
                ACC_LCK_OTView_TermsConditions_Signatory__c,
                ACC_TXT_OTView_TermsConditions_DocName__c
              FROM Account
              WHERE Id = :accId AND ACC_CHK_OTView_Admin__c != NULL
            ];

            if (contactList[0].Id == lstAccts[0].ACC_CHK_OTView_Admin__c) {
              lstAccts[0].ACC_CHK_OTView_TermsConditions__c = true;
              lstAccts[0]
                .ACC_DATE_OTView_TermsConditions_Date__c = system.now();
              lstAccts[0]
                .ACC_LCK_OTView_TermsConditions_Signatory__c = contactList[0]
                .Id;
              lstAccts[0]
                .ACC_TXT_OTView_TermsConditions_DocName__c = pdfName.split(
                '/'
              )[3];
              accsToUpdate.add(lstAccts[0]);
            }
          }
        }
      }
      if (!accsToUpdate.isEmpty()) {
        update accsToUpdate;
      }
    } catch (Exception e) {
      system.debug(e);
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
  public static String getSessionId() {
    return UserInfo.getSessionId();
  }
}
