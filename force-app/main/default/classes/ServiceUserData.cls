global with sharing class ServiceUserData {

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Get the userData to return as a result to the component
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    ----------------------------------------------------------------------------------*/
    global static ReturnValue getControllerUserData () {
        return getControllerUserData(userInfo.getUserId());
    }

    global static ReturnValue getControllerUserData (String userId) {
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try {
            WrapperUserData userData = getUserData(userId);
            value.put('userData', userData);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('ServiceUserData.getControllerUserData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Get the WrapperUserData with all important data of the user
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    ----------------------------------------------------------------------------------*/
    global static WrapperUserData getUserData () {
        return getUserData(UserInfo.getUserId());
    }

    global static WrapperUserData getUserData (String userId) {
        User userData;
        Contact contactData;
        Account accountData;
        try {
            if (String.isBlank(userId)) {
                throw new CustomException('userId is not informed.');
            }
            userData = getUserSF(userId);
            contactData = getContactSF(userId);
            accountData = getAccountSF(contactData);
        } catch (Exception e) {
            System.debug('ServiceUserData.getUserData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return getUserData(userData, contactData, accountData);
    }

    global static WrapperUserData getUserData (User userData, Contact contactData, Account accountData) {
        WrapperUserData response;
        try {
            response = new WrapperUserData(userData, contactData, accountData);
        } catch (Exception e) {
            System.debug('ServiceUserData.getUserData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return response;
    }

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Get the User object data to Salesforce
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    10/11/2020		Shahad Naji			Adding profile.name to the query
    02/12/2020      Candido             Adding email signer
    ----------------------------------------------------------------------------------*/
    global static User getUserSF (String userId) {
        User res = new User();
        try {
            if (String.isBlank(userId)) {
                throw new CustomException('userId is not informed.');
            }
            List<User> users = new List<User>([
                SELECT Id, USER_TXT_GlobalId__c, USER_TXT_LocalUid__c, USER_NumberFormat__c, User_DateFormat__c, FirstName, LastName, Alias, Email, USER_TXT_Signer_email__c, MobilePhone, USER_CHK_CashNexus__c, USER_country__c, USER_TXT_BIC__c, profile.name
                FROM User
                WHERE Id = :userId
                LIMIT 1
            ]);
            if(!users.isEmpty()) {
                res = users.get(0);
            }
        } catch (Exception e) {
            System.debug('ServiceUserData.getUserSF: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Get the Contact object data to Salesforce
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    ----------------------------------------------------------------------------------*/
    global static Contact getContactSF (String userId) {
        Contact res = new Contact();
        try {
            if (String.isBlank(userId)) {
                throw new CustomException('userId is not informed.');
            }
            List<Contact> contacts = new List<Contact>([
                SELECT Id, AccountId, Name, CHK_MultiOneTrade__c
                FROM Contact
                WHERE CONTACT_User__c = :userId
                LIMIT 1
            ]);
            if (!contacts.isEmpty()) {
                res = contacts.get(0);
            }
        } catch (Exception e) {
            System.debug('ServiceUserData.getContactSF: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    /*----------------------------------------------------------------------------------
    Author:         Candido
    Company:        Deloitte
    Description:    Get the Account object data to Salesforce
    History:
    <Date>          <Author>            <Description>
    26/10/2020      Candido             Initial version
    ----------------------------------------------------------------------------------*/
    global static Account getAccountSF (Contact contactData) {
        Account res = new Account();
        try {
            if (contactData == null) {
                throw new CustomException('contactData is not informed.');
            }
            if (contactData.AccountId == null) {
                throw new CustomException('contactData.AccountId is not informed.');
            }
            List<Account> accounts = new List<Account>([
                SELECT Id, Name, ACC_CHK_CIB__c, ACC_TXT_DocumentType__c, ACC_TXT_DocumentNumber__c, ACC_TXT_CompanyId__c, ACC_TXT_BIC__c, ACC_PCK_Country__c
                FROM Account
                WHERE Id = :contactData.AccountId
                LIMIT 1
            ]);
            if (!accounts.isEmpty()) {
                res = accounts.get(0) ;
            }
        } catch (Exception e) {
            System.debug('ServiceUserData.getAccountSF: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }
}