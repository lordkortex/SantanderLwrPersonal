public with sharing class CNT_consentAccountList {

    @AuraEnabled
    public static ReturnValue getAccountList(String idAccount){

        ReturnValue response;
        
        try {
            Map<String, Object> out = new Map<String, Object>();

            //List<String> fields = new List<String>(['Name', 'ACC_CHK_Validation__c']);

            List<Account> accountData = new List<Account>([SELECT Id, Name, ACC_PCK_Type__c, ACC_PCK_Management__c,ACC_CHK_Validation__c, ACC_DATE_FinalDate__c FROM Account]);
            out.put('accountData', accountData);

            response = new ReturnValue(true, out);

        } catch (Exception e) {
            System.debug('CNT_consentAccountList.getAccountList: ' + e.getMessage());
            response = new ReturnValue(false, e.getMessage());
        }
        return response;
    }

    public static void getColumnsFromFields (String objectName, List<String> fields) {

        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.SObjectType leadSchema = schemaMap.get(objectName);
        Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();

        for (String fieldName: fields) {
            System.debug(fieldMap.get(fieldName).getDescribe().getLabel());
        }
    }
}