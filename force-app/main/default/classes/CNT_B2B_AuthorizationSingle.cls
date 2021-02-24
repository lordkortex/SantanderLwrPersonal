public with sharing class CNT_B2B_AuthorizationSingle {

    @AuraEnabled
    public static ReturnValue getUserData () {
        ReturnValue response = ServiceUserData.getControllerUserData ();        
        return response;
    }

    @AuraEnabled
    public static ReturnValue getAccountData () {
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try {
            String userID = UserInfo.getUserId();
            Account account = Global_Utilities.getAccountData(userId);
            value.put('cib', account.ACC_CHK_CIB__c);
            value.put('documentType', account.ACC_TXT_DocumentType__c);
            value.put('documentNumber', account.ACC_TXT_DocumentNumber__c);
            value.put('companyId', account.ACC_TXT_CompanyId__c);
            System.debug('DATA: '+value);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.getAccountData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}