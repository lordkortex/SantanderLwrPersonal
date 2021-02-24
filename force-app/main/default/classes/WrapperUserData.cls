global with sharing class WrapperUserData {

    // User SF Data
    @AuraEnabled
    global String  userId {get;set;}
    @AuraEnabled
    global String  globalId {get;set;}
    @AuraEnabled
    global String  localUid {get;set;}
    @AuraEnabled
    global String  numberFormat {get;set;}
    @AuraEnabled
    global String  dateFormat {get;set;}
    @AuraEnabled
    global String  firstName {get;set;}
    @AuraEnabled
    global String  lastName {get;set;}
    @AuraEnabled
    global String  alias {get;set;}
    @AuraEnabled
    global String  email {get;set;}
    @AuraEnabled
    global String  emailSigner {get;set;}
    @AuraEnabled
    global String  mobilePhone {get;set;}
    @AuraEnabled
    global Boolean cashNexus {get;set;}
    @AuraEnabled
    global String  country {get;set;}
    @AuraEnabled
    global String  bic {get;set;}
    @AuraEnabled
    global String  profileName {get;set;}

    // Contact SF Data
    @AuraEnabled
    global String  contactId {get;set;}
    @AuraEnabled
    global String  contactName {get;set;}
    @AuraEnabled
    global Boolean multiOneTrade {get;set;}

    // Account SF Data
    @AuraEnabled
    global String  accountId {get;set;}
    @AuraEnabled
    global String  accountName {get;set;}  
    @AuraEnabled
    global String  accountCountry {get;set;}  
    @AuraEnabled
    global Boolean cib {get;set;}
    @AuraEnabled
    global String  documentType {get;set;}
    @AuraEnabled
    global String  documentNumber {get;set;}
    @AuraEnabled
    global String  companyId {get;set;}
    @AuraEnabled
    global String  companyBIC {get;set;}

    global WrapperUserData () {
    }

    global WrapperUserData (User userData, Contact contactData, Account accountData) {
        setUserData(userData);
        setContactData(contactData);
        setAccountData(accountData);
    }

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Set wrapper values with the User object Salesforce data
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    ----------------------------------------------------------------------------------*/
    global void setUserData (User userData) {
        try {
            if (userData == null) {
                throw new CustomException('userData is not informed.');
            }
            if (userData.Id != null) {
                this.userId = userData.Id;
            }
            if (userData.USER_TXT_GlobalId__c != null) {
                this.globalId = userData.USER_TXT_GlobalId__c;
            }
            if (userData.USER_TXT_LocalUid__c != null){
                this.localUid = userData.USER_TXT_LocalUid__c;
            }
            if (userData.USER_NumberFormat__c != null) {
                this.numberFormat = userData.USER_NumberFormat__c;
            }
            if (userData.User_DateFormat__c != null) {
                this.dateFormat = userData.User_DateFormat__c;
            }
            if (userData.FirstName != null) {
                this.firstName = userData.FirstName;
            }
            if (userData.LastName != null) {
                this.lastName = userData.LastName;
            }
            if (userData.Alias != null) {
                this.alias = userData.Alias;
            }
            if (userData.Email != null) {
                this.email = userData.Email;
            }
            if (userData.Email != null) {
                this.emailSigner = userData.USER_TXT_Signer_email__c;
            }
            if (userData.MobilePhone != null) {
                this.mobilePhone = userData.MobilePhone;
            }
            if (userData.USER_CHK_CashNexus__c != null) {
                this.cashNexus = userData.USER_CHK_CashNexus__c;
            }
            if (userData.USER_country__c != null) {
                this.country = userData.USER_country__c;
            }
            if (userData.USER_TXT_BIC__c != null) {
                this.bic = userData.USER_TXT_BIC__c;
            }
            if(userData.profile.name != null){
                this.profileName = userData.profile.name;
            }
        } catch (Exception e) {
            System.debug('WrapperUserData.UserData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Set wrapper values with the Contact object Salesforce data
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    ----------------------------------------------------------------------------------*/
    global void setContactData (Contact contactData) {
        try {
            if (contactData == null) {
                throw new CustomException('contactData is not informed.');
            }
            if (contactData.Id != null) {
                this.contactId = contactData.Id;
            }
            if (contactData.Name != null) {
                this.contactName = contactData.Name;
            }
            if (contactData.CHK_MultiOneTrade__c != null) {
                this.multiOneTrade = contactData.CHK_MultiOneTrade__c;
            }
        } catch (Exception e) {
            System.debug('WrapperUserData.UserData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Set wrapper values with the Account object Salesforce data
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    ----------------------------------------------------------------------------------*/
    global void setAccountData (Account accountData) {
        try {
            if (accountData == null) {
                throw new CustomException('accountData is not informed.');
            }
            if (accountData.Id != null) {
                this.accountId = accountData.Id;
            }
            if (accountData.Name != null) {
                this.accountName = accountData.Name;
            }
            if (accountData.ACC_PCK_Country__c != null) {
                this.accountCountry = accountData.ACC_PCK_Country__c;
            }
            if (accountData.ACC_CHK_CIB__c != null) {
                this.cib = accountData.ACC_CHK_CIB__c;
            }
            if (accountData.ACC_TXT_DocumentType__c != null) {
                this.documentType = accountData.ACC_TXT_DocumentType__c;
            }
            if (accountData.ACC_TXT_DocumentNumber__c != null) {
                this.documentNumber = accountData.ACC_TXT_DocumentNumber__c;
            }
            if (accountData.ACC_TXT_CompanyId__c != null) {
                this.companyId = accountData.ACC_TXT_CompanyId__c;
            }
            if (accountData.ACC_TXT_BIC__c != null) {
                this.companyBIC = accountData.ACC_TXT_BIC__c;
            }   
        } catch (Exception e) {
            System.debug('WrapperUserData.UserData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}