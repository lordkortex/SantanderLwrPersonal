public with sharing class CNT_B2B_Process {

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
            System.debug('CNT_B2B_SelectAccount.getAccountData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue getUserData () {
        ReturnValue response = ServiceUserData.getControllerUserData ();
        return response;
    }

    @AuraEnabled
    public static List<WRAPPER_AccountList.AccountDetails> formatDates (List<WRAPPER_AccountList.AccountDetails> response) {
        try {
            if(!response.isEmpty()){
                for (WRAPPER_AccountList.AccountDetails a : response){
                    if(a.valueDate !='' && a.valueDate!=null){
                        a.valueDate = String.ValueofGmt(DateTime_Utilities.getDateTime(a.valueDate,0));
                    }
                    if(a.lastUpdateAvailableBalance !='' && a.lastUpdateAvailableBalance!=null){
                        a.lastUpdateAvailableBalance = String.ValueofGmt(DateTime_Utilities.getDateTime(a.lastUpdateAvailableBalance,0));
                    }
                }
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAccount.getUserFormatString: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return response;
    }

    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
    }
}