public class HANDLER_STR_Rules {

    public static void insertRuleRecords(String companyId, Object ruleOutput, Object groupOutput){
        try{
            WS_STR_SignatureRules.OUTPUT ruleObj = (WS_STR_SignatureRules.OUTPUT) ruleOutput;
            WS_STR_SignatureGroups.OUTPUT groupObj = (WS_STR_SignatureGroups.OUTPUT) groupOutput;
            List<Id> RuleListId = insertRules(companyId, ruleObj);
            List<Id> GroupListId = insertRuleGroups(RuleListId, groupObj);
            List<Id> UpsertedGroupListId = upsertRuleGroups(GroupListId, ruleObj);
        } catch (Exception e) {
            System.debug('STR_ControllerStructurals.InsertRuleRecords: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
        
    public static List<Id> insertRules(Id companyId, WS_STR_SignatureRules.OUTPUT obj){
        List<Id> response = new List<Id>();
        List<STR_SignatureRule__c> ruleListToInsert = new List<STR_SignatureRule__c>();
        Id RuleRecordTypeId = Schema.SObjectType.STR_SignatureRule__c.getRecordTypeInfosByDeveloperName().get('STR_SignatureRule').getRecordTypeId();
        for(WS_STR_SignatureRules.ResponseStructure rule : obj.responseStructure){
            STR_SignatureRule__c newRule = new STR_SignatureRule__c (
                RecordtypeId = RuleRecordTypeId, 
                STR_LKP_Company__c = companyId,
                STR_CUR_AmountFrom__c = rule.amountFrom, 
                STR_CUR_AmountTo__c = rule.amountTo, 
                STR_PCK_Service__c = rule.serviceId, 
                STR_TXT_RuleId__c = rule.ruleId, 
                CurrencyIsoCode = rule.tcurrency,
                STR_CHK_createdByAPI__c = true
            );
            ruleListToInsert.add(newRule);
        }
        if(!ruleListToInsert.isEmpty()){
            Database.SaveResult[] srList = Database.insert(ruleListToInsert, true);
            for (Database.SaveResult sr : srList) {
                if (sr.isSuccess()) {
                    response.add(sr.getId());
                }
            }
        } 
        return response;
    }
    
    public static List<Id> insertRuleGroups (List<Id> ruleListId, WS_STR_SignatureGroups.OUTPUT obj) {
        List<Id> response = new List<Id>();
        List<STR_RuleGroup__c> GroupListToInsert = new List<STR_RuleGroup__c>();      
        Id GroupRuleRecordTypeId = Schema.SObjectType.STR_RuleGroup__c.getRecordTypeInfosByDeveloperName().get('STR_GroupRule').getRecordTypeId();      
        for (Id RuleId : ruleListId){
            for (WS_STR_SignatureGroups.tGroup sGroup : obj.getGroupsResponse.groupList){
            	STR_RuleGroup__c newGroup = new STR_RuleGroup__c (
                	STR_TXT_GroupId__c = sGroup.groupId,
                	Name = sGroup.groupName, 
                	STR_LKP_SignatureRule__c = ruleId,
                	RecordTypeId = GroupRuleRecordTypeId
            	);
            	GroupListToInsert.add(newGroup);
        	}
        }
        if(!GroupListToInsert.isEmpty()){
            Database.SaveResult[] srList = Database.insert(GroupListToInsert, true);
            for (Database.SaveResult sr : srList) {
                if (sr.isSuccess()) {
                    response.add(sr.getId());
                }
            }
        }
        return response;
    }
            
    public static List<Id> upsertRuleGroups (List<Id> groupListId, WS_STR_SignatureRules.OUTPUT obj) {
    	List<Id> response = new List<Id>();
        List<STR_RuleGroup__c> groupListToUpsert = new List<STR_RuleGroup__c>(); 
        List<STR_RuleGroup__c> groupList = [SELECT Id, STR_TXT_GroupId__c, STR_LKP_SignatureRule__r.STR_TXT_RuleId__c FROM STR_RuleGroup__c WHERE Id IN :groupListId];
        for(WS_STR_SignatureRules.ResponseStructure rule : obj.responseStructure){
            for (WS_STR_SignatureRules.SignerGroup sGroup : rule.LevelSignersList){
                for (STR_RuleGroup__c GroupToUpdate : groupList){
                    if(GroupToUpdate.STR_TXT_GroupId__c == sGroup.groupId && GroupToUpdate.STR_LKP_SignatureRule__r.STR_TXT_RuleId__c == rule.ruleId){
                		GroupToUpdate.STR_NUM_Level__c = Double.valueOf(sGroup.level);
             			GroupToUpdate.STR_NUM_SignsRequired__c = sGroup.signsRequired;
             	    	GroupToUpdate.STR_CHK_IsIncluded__c = true;
                    	groupListToUpsert.add(GroupToUpdate);
                    }
    			}
        	}
        }
        if(!groupListToUpsert.isEmpty()){
            Database.UpsertResult[] urList = Database.upsert(groupListToUpsert, true);
            for (Database.UpsertResult ur : urList) {
                if (ur.isSuccess()) {
                    response.add(ur.getId());
                }
            }
        }
        return response;
    }    
    
    public static Map<String, List<STR_SignatureRule__c>> createMapRules (List<STR_SignatureRule__c> ruleList){
        String key;
        Map<String, List<STR_SignatureRule__c>> ruleMap = new Map<String, List<STR_SignatureRule__c>>();       
        for(STR_SignatureRule__c rule : ruleList){
        	key = rule.CurrencyIsoCode + rule.STR_PCK_Service__c;
            if(ruleMap.containsKey(key)){
               	ruleMap.get(key).add(rule);
            }	
            else {
                List<STR_SignatureRule__c> newList = new List<STR_SignatureRule__c>();
                newList.add(rule);
                ruleMap.put(key, newList);
            }    
        }
        return ruleMap;
    }
           
    public static ReturnValue validateData (List<STR_SignatureRule__c> ruleList){
        ReturnValue response = new ReturnValue(true);
        String errorMsg = '';
        Map<String, List<STR_SignatureRule__c>> ruleMap = createMapRules (ruleList);
        List<STR_SignatureRule__c> rules = new List<STR_SignatureRule__c>();
        for(String key : ruleMap.keySet()){          
			rules = ruleMap.get(key);
            for(Integer i=0;  i < rules.size(); i++){
                if(rules[i].STR_CUR_AmountTo__c > rules[i+1].STR_CUR_AmountFrom__c){
                    errorMsg = 'Invalid data for the combination service: ' +  rules[i].STR_PCK_Service__c + ' and currency: ' + rules[i].CurrencyIsoCode + ': overlapped amounts';                        
            		response = new ReturnValue(false, errorMsg);
                }
				else if(rules[i].STR_CUR_AmountTo__c < rules[i+1].STR_CUR_AmountFrom__c){
                    errorMsg = 'Invalid data for the combination service ' +  rules[i].STR_PCK_Service__c + ' and currency: ' + rules[i].CurrencyIsoCode + ': amount gaps';                        
            		response = new ReturnValue(false, errorMsg);  
                }
            }
        }   
        return response;
    }
}