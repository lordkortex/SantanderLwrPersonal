public class CNT_VAMDetail {

    @AuraEnabled
    public static ReturnValue getVAMDetail(String vamAccount){
        return TRS_ControllerVAM.retrieveVirtualAccountDetail(vamAccount);
    }
    
    @AuraEnabled
    public static List<String> getPriorityPicklist(){
       List<String> pickListValuesList= new List<String>();
		Schema.DescribeFieldResult fieldResult = Case.Priority.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
			pickListValuesList.add(pickListVal.getLabel());
		}     
		return pickListValuesList; 
    }
    
    @AuraEnabled
    public static ReturnValue getUserData () {
        return ServiceUserData.getControllerUserData();
    }
    
    @AuraEnabled
    public static String createCase ( String amount, String tcurrency, String priority, String subject, String description, String VAMAccount , String beneficiaryId, String beneficiaryName, String beneficiaryBic) {
        Id RTFundingId   = Schema.SObjectType.Case.getRecordTypeInfosByDeveloperName().get('TRS_Funding').getRecordTypeId();
        Case newCase = new Case(
            RecordTypeId = RTFundingId,
            CASE_PCK_Record_Type__c = 'TRS_Funding',
            Type = 'Funding Back',
       		CASE_CUR_Amount__c = Decimal.valueOf(amount),
        	CurrencyIsoCode = tcurrency,
        	Priority = priority,
        	Subject = subject,
        	Description = description,
        	CASE_TXT_VAId__c = VAMAccount,
        	CASE_TXT_beneficiaryAccountName__c = beneficiaryName,
        	CASE_TXT_beneficiaryAccountNumber__c = beneficiaryId,
        	CASE_TXT_BICCode__c = beneficiaryBic);
        insert newCase;        
        return newCase.Id;
    }
    
    @AuraEnabled
    public static void updateCase(String CaseId, String amount, String tcurrency, String priority, String subject, String description) {        
        List<Case> caseList = new List<Case>([SELECT Priority, CurrencyISOCode, CASE_CUR_Amount__c, Subject, Description FROM Case WHERE Id = :CaseId]);        
        if(!CaseList.isEmpty()){
            Case caseRecord = caseList.get(0);
            caseRecord.CASE_CUR_Amount__c = Decimal.valueOf(amount);
            caseRecord.CurrencyISOCode = tcurrency;
            caseRecord.Priority = priority;
            caseRecord.Subject = subject;
            caseRecord.Description = description;
            update caseRecord;
        }
        
    }
    
    @AuraEnabled
    public static Case getCaseData(String CaseId){
        Case res = null;
        List<Case> caseList = new List<Case>([SELECT Priority, CurrencyISOCode, CASE_CUR_Amount__c, Subject, Description FROM Case WHERE Id = :CaseId]);       
        if(!CaseList.isEmpty()){
            res = caseList.get(0);
        }
        return res;
    }
}