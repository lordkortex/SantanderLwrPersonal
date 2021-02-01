public with sharing class CNT_B2B_AuthorizationSingle {

    @AuraEnabled
    public static ReturnValue getAccountData () {
        return CNT_B2B_Process.getAccountData();
    }

    @AuraEnabled
    public static ReturnValue getUserData () {
        
        return CNT_B2B_Process.getUserData();
    }


}