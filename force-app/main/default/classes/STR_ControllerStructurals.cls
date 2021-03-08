public class STR_ControllerStructurals {

    @AuraEnabled
    public static ReturnValue retrieveLimits (String accountId){
        ReturnValue response;
        ReturnValue limitResponse;
        Savepoint sp;
        try {
            Account acc = [SELECT Id, Name, ACC_TXT_CompanyId__c FROM Account WHERE Id = :accountId];
            if (String.isNotBlank(acc.ACC_TXT_CompanyId__c)) {
                List<STR_Company__c> company = [SELECT Id FROM STR_Company__c WHERE STR_TXT_CompanyGlobalId__c = :acc.ACC_TXT_CompanyId__c AND RecordType.DeveloperName = 'STR_Limits' LIMIT 1];
                if(!company.isEmpty()) {
                    Map<String, Object> value = new Map<String, Object>();
                    value.put('companyId', company[0].Id);
                    response = new ReturnValue(true, value);
                }
                else{
                	limitResponse = STR_ServiceStructurals.getLimits(acc.ACC_TXT_CompanyId__c);
                	sp = Database.setSavepoint();
                	if(limitResponse.success){
                   	 	sp = Database.setSavepoint();
                        Id companyRecordType = Schema.SObjectType.STR_Company__c.getRecordTypeInfosByDeveloperName().get('STR_Limits').getRecordTypeId();
           				Id companyId = insertCompany(acc.ACC_TXT_CompanyId__c, acc.Name, companyRecordType);
            			HANDLER_STR_Limits.insertLimitRecords(companyId, limitResponse.value.get('OUTPUT'));
            			Map<String, Object> value = new Map<String, Object>();
            			value.put('companyId', companyId);
            			response = new ReturnValue(true, value); 
                	}
               	 	else {
                    	response = new ReturnValue(false, null, 'Give this information to your administrator: ' + limitResponse.msg);
                	}
                }
            }
            else{
                response = new ReturnValue(false, null, 'The company you are trying to update does not have global Id informed. Please, contact your administrator');
            }
        } catch (Exception e) {
            System.debug('STR_ControllerStructurals.retrieveRules: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            Database.rollback(sp);
            response = new ReturnValue(false, null, 'Something went wrong retrieving the limits. Give this information to your administrator: ' + e.getMessage());   
        }
        return response;
    }
    
    @AuraEnabled    
    public static ReturnValue retrieveRules (String accountId){ 
        ReturnValue response;
        ReturnValue ruleResponse;
        ReturnValue groupResponse;
        Savepoint sp;
        String companyId;
        try {
            Account acc = [Select Id, Name, ACC_TXT_CompanyId__c FROM Account WHERE Id = :accountId];
            Boolean isSuccess = null;
            if (String.isNotBlank(acc.ACC_TXT_CompanyId__c)) {
                List<STR_Company__c> company = [SELECT Id FROM STR_Company__c WHERE STR_TXT_CompanyGlobalId__c = :acc.ACC_TXT_CompanyId__c AND RecordType.DeveloperName = 'STR_SignatureRules' LIMIT 1];
                if(!company.isEmpty()) {
                    Map<String, Object> value = new Map<String, Object>();
                    value.put('companyId', company[0].Id);
                    response = new ReturnValue(true, value);
            	}
            	else{
            		ruleResponse = STR_ServiceStructurals.getRules(acc.ACC_TXT_CompanyId__c);
                	if (ruleResponse.success) {
                    	groupResponse = STR_ServiceStructurals.getGroups(acc.ACC_TXT_CompanyId__c);
                        if(groupResponse.success){
                            sp = Database.setSavepoint();
            				Id companyRecordType = Schema.SObjectType.STR_Company__c.getRecordTypeInfosByDeveloperName().get('STR_SignatureRules').getRecordTypeId();
            				companyId = insertCompany(acc.ACC_TXT_CompanyId__c, acc.Name, companyRecordType);
            				HANDLER_STR_Rules.insertRuleRecords(companyId, ruleResponse.value.get('OUTPUT'), groupResponse.value.get('OUTPUT'));
            				Map<String, Object> value = new Map<String, Object>();
            				value.put('companyId', companyId);
				            response = new ReturnValue(isSuccess, value);
                        }
                        else {
                            response = new ReturnValue (false, 'Error retrieving groups data. Please give this information to your administrator: ' + groupResponse.msg);
                        }
                	} 
                    else {
                    	response = new ReturnValue (false, 'Error retrieving rules data. Plase give this information to your administrator: ' + ruleResponse.msg);
                	}
            	} 
            } 
            else {
                response = new ReturnValue(false, null, 'The company you are trying to update does not have global Id informed. Please, contact your administrator');
            }           
        } catch (Exception e) {
            System.debug('STR_ControllerStructurals.retrieveRules: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            Database.rollback(sp);
            response = new ReturnValue(false, null, e.getMessage());            
        }
        return response;
    }    
    
    public static Id insertCompany(String companyGlobalId, String companyName, Id companyRecordType){
        STR_Company__c company = new STR_Company__c (
            Name = companyName,
            STR_TXT_CompanyGlobalId__c = companyGlobalId,
            RecordTypeId = companyRecordType
        );
        Database.insert(company);
        return company.Id;
    }
    
    @AuraEnabled
    public static ReturnValue discardChanges (String companyId){
        ReturnValue response;
        try{
       		STR_Company__c company = [SELECT Id FROM STR_Company__c WHERE Id = :companyId];
            database.delete (company);
            response = new ReturnValue(true, 'Changes discarded successfully. Please, wait.');        
        } catch (Exception e) {
            System.debug('STR_ControllerStructurals.discardChanges: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, 'Give this message to your administrator: ' + e.getMessage());            
        }
        return response;
    }
       
    @AuraEnabled
    public static ReturnValue commitChanges (String companyId){
        ReturnValue response = new ReturnValue(true);
        try {
            STR_Company__c company = [SELECT Id FROM STR_Company__c WHERE Id = :companyId];
            String recordTypeId = [SELECT RecordTypeId FROM STR_Company__c WHERE Id = :companyId]?.RecordTypeId;
            String recordTypeDevName = [SELECT DeveloperName FROM RecordType WHERE Id = :recordTypeId]?.DeveloperName;
            ReturnValue validateResponse = null;
            Switch on recordTypeDevName {
                When 'STR_SignatureRules' {                    
                    List<STR_SignatureRule__c> ruleList = new List<STR_SignatureRule__c>();
                	ruleList = [SELECT Id, STR_LKP_Company__r.STR_TXT_CompanyGlobalId__c, STR_TXT_RuleId__c, STR_TXT_RuleName__c, STR_PCK_Service__c, 
                                STR_CUR_AmountFrom__c, STR_CUR_AmountTo__c, CurrencyIsoCode, STR_CHK_createdByAPI__c, 
                                (SELECT Id, STR_TXT_GroupId__c, STR_NUM_Level__c, STR_NUM_SignsRequired__c FROM SignersGroups__r WHERE STR_CHK_IsIncluded__c = true) 
                                FROM STR_SignatureRule__c WHERE STR_LKP_Company__r.Id = :companyId ORDER BY STR_CUR_AmountFrom__c ASC];
                    validateResponse = validateData(ruleList, recordTypeDevName);
                    if(validateResponse.success){
                        String key;
                        List<STR_SignatureRule__c> rulesToPatch = new List<STR_SignatureRule__c>();
                        List<STR_SignatureRule__c> rulesToPost = new List<STR_SignatureRule__c>();
                        Map<String, List<STR_SignatureRule__c>> rulesToPostMap = new Map<String, List<STR_SignatureRule__c>>();
                        for(STR_SignatureRule__c rule : ruleList){
                            if(rule.STR_CHK_createdByAPI__c){
                                rulesToPatch.add(rule);
                            } 
                            else {
								rulesToPost.add(rule);
                            }
                        }
                        rulesToPostMap = HANDLER_STR_Rules.createMapRules(rulesToPost);
                        for(STR_SignatureRule__c rule : rulesToPatch){
                            STR_ServiceStructurals.patchRule(rule);
                        }
                        for(String mapKey : rulesToPostMap.keySet()){
                            STR_ServiceStructurals.postRules(companyId, rulesToPostMap.get(mapKey));
                        }
                    }
                } 
                When 'STR_Limits'{
					List<STR_Limit__c> limitList = new List<STR_Limit__c>();
                	limitList = [SELECT Id, STR_LKP_Company__r.STR_TXT_CompanyGlobalId__c, CurrencyIsoCode, STR_CUR_Amount__c, STR_PCK_ServiceId__c, STR_PCK_Status__c, STR_CHK_CreatedbyAPI__c, createdDate, LastModifiedDate                             
                                 FROM STR_Limit__c WHERE STR_LKP_Company__r.Id = :companyId];
                    validateResponse = validateData(limitList, recordTypeDevName);
                    if(validateResponse.success){
                        List<STR_Limit__c> limitsToPatch = new List<STR_Limit__c>();
                        List<STR_Limit__c> limitsToPost = new List<STR_Limit__c>();
                        for(STR_Limit__c tlimit : limitList){
                            if(!tlimit.STR_CHK_CreatedByAPI__c){
                                limitsToPost.add(tlimit);
                            }
                            else if(tlimit.CreatedDate != tlimit.LastModifiedDate){
                                limitsToPatch.add(tlimit);
                            }
                        }
                        if(!limitsToPatch.isEmpty()){
                            for(STR_Limit__c tlimit : limitsToPatch){
                                STR_ServiceStructurals.updateLimit(tlimit, 'PATCH');
                            }
                        }
                        if(!limitsToPost.isEmpty()){
                            for(STR_Limit__c tlimit : limitsToPost){
                                STR_ServiceStructurals.updateLimit(tlimit, 'POST');
                            }
                        }
                    }
                    else {
                        response = new ReturnValue(false, validateResponse.msg); 
                    }
                }
            }
            database.delete (company);
        } catch (Exception e) {
            System.debug('STR_ControllerStructurals.commitChanges: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, 'Give this information to your administrator: ' + e.getMessage());            
        }
        return response;     
    }
    
    public static ReturnValue validateData (List<sObject> dataList, String recordTypeDevName) {
        ReturnValue response;
        Switch on recordTypeDevName {
            When 'STR_SignatureRules' {
                List<STR_SignatureRule__c> ruleList = (List<STR_SignatureRule__c>) dataList;  
                response = HANDLER_STR_Rules.validateData(ruleList);
            }
            When 'STR_Limits' {
                List<STR_Limit__c> limitList = (List<STR_Limit__c>) dataList;    
                response = HANDLER_STR_Limits.validateData(limitList);
            }                
        }
        return response;
    }
}