global with sharing class STR_ServiceStructurals {

    global static ReturnValue getRules (String companyId) {
        ReturnValue response = new ReturnValue(false);
        try {
            WS_STR_SignatureRules.INPUT input = new WS_STR_SignatureRules.INPUT();
            input.companyId = companyId;          
            WS_STR_SignatureRules.OUTPUT res = WS_STR_SignatureRules.getRules(input);
            if (res != null) {
            	Map<String, Object> value = new Map<String, Object>();
            	value.put('OUTPUT', res);
            	response = new ReturnValue(true, value);
            }
            else{
                response = new ReturnValue (false, 'Integration failed');
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.getRules: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue(false,  e.getMessage());
        }
        return response; 
    }
    
	global static ReturnValue postRules (String companyId, List<STR_SignatureRule__c> ruleList) {
        ReturnValue res = new ReturnValue(false);
        try {
            WS_STR_SignatureRules.postBODY body = new WS_STR_SignatureRules.postBODY();
            body.customerId = companyId;
            body.serviceId = ruleList[0].STR_PCK_Service__c;
            body.tcurrency = ruleList[0].currencyIsoCode;
            body.ruleList = new List<WS_STR_SignatureRules.RuleList>();
            for (STR_SignatureRule__c rule : ruleList){
                WS_STR_SignatureRules.RuleList newRule = new WS_STR_SignatureRules.RuleList ();
                newRule.amountFrom = rule.STR_CUR_amountFrom__c;
                newRule.amountTo = rule.STR_CUR_amountTo__c;
                newRule.levelList = new List<WS_STR_SignatureRules.SignerGroup>();
                for(STR_RuleGroup__c sGroup : rule.SignersGroups__r){
                    WS_STR_SignatureRules.SignerGroup newGroup = new WS_STR_SignatureRules.SignerGroup();
                    newGroup.groupId = sGroup.STR_TXT_GroupId__c;
                    newGroup.level = String.valueOf(sGroup.STR_NUM_Level__c);
                    newGroup.signersRequired = sGroup.STR_NUM_SignsRequired__c;
                    newRule.levelList.add(newGroup);
                }
                body.ruleList.add(newRule);
            } 
            String sBody = JSON.serialize(body);
            Boolean response = WS_STR_SignatureRules.postRules(sBody);
            if (response != null) {
            	res = new ReturnValue(response);
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.postRules: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return res;
    }
    
 	global static ReturnValue patchRule (STR_SignatureRule__c rule) {
        ReturnValue res = new ReturnValue(false);
        try {
            WS_STR_SignatureRules.INPUT input = new WS_STR_SignatureRules.INPUT();
            input.ruleId = rule.STR_TXT_RuleId__c;
            input.amountFrom = String.valueOf(rule.STR_CUR_AmountFrom__c);
            input.amountTo = String.valueOf(rule.STR_CUR_AmountTo__c);
            
            List<WS_STR_SignatureRules.SignerGroup> body = new List<WS_STR_SignatureRules.SignerGroup>();
			for(STR_RuleGroup__c sGroup : rule.SignersGroups__r){
                WS_STR_SignatureRules.SignerGroup newGroup = new WS_STR_SignatureRules.SignerGroup();
                newGroup.groupId = sGroup.STR_TXT_GroupId__c;
                newGroup.level = String.valueOf(sGroup.STR_NUM_Level__c);
                newGroup.signersRequired = sGroup.STR_NUM_SignsRequired__c;
                body.add(newGroup);
            }
            String sBody = JSON.serialize(body);
            Boolean response = WS_STR_SignatureRules.postRules(sBody);
            if (response != null) {
            	res = new ReturnValue(response);
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.patchRule: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return res;
    }
    
    global static ReturnValue getGroups (String companyId) {
        ReturnValue response = new ReturnValue(false);
        try {
            WS_STR_SignatureGroups.INPUT input = new WS_STR_SignatureGroups.INPUT();
            input.customerId = companyId;          
            WS_STR_SignatureGroups.OUTPUT res = WS_STR_SignatureGroups.getGroups(input);
            if (res != null) {
            	Map<String, Object> value = new Map<String, Object>();
            	value.put('OUTPUT', res);
            	response = new ReturnValue(true, value);
            }
            else{
                response = new ReturnValue (false, 'Integration failed');
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups.getGroups: ' + e.getMessage() + ' in line ' + e.getLineNumber());
        }
        return response;
    } 
    
    global static ReturnValue getLimits (String companyId) {
        ReturnValue response = new ReturnValue(false);
        try {
            WS_STR_Limits.INPUT input = new WS_STR_Limits.INPUT();
            input.customerId = companyId;          
            input.status = 'active';
            WS_STR_Limits.OUTPUT res = WS_STR_Limits.getLimits(input);
            if (res != null) {
            	Map<String, Object> value = new Map<String, Object>();
            	value.put('OUTPUT', res);
            	response = new ReturnValue(true, value);
            }
            else{
                response = new ReturnValue (false, 'Integration failed');
            }
        } catch (Exception e) {
            System.debug('WS_STR_Limits.getLimits: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue(false, e.getMessage());
        }
        return response;
    } 
    
    global static ReturnValue updateLimit (STR_Limit__c tLimit, String method) {
        ReturnValue res;
        try {
            WS_STR_Limits.BODY body = new WS_STR_Limits.BODY();
			body.limitData = new WS_STR_Limits.LimitData();
            body.limitData.customerId = tLimit.STR_LKP_Company__r.STR_TXT_CompanyGlobalId__c;
            body.limitData.serviceId = tLimit.STR_PCK_ServiceId__c;
            body.limitData.status = tLimit.STR_PCK_status__c;
            body.limitData.limitAmount = new WS_STR_Limits.LimitAmount();
            body.limitData.limitAmount.tcurrency = tlimit.CurrencyIsoCode;
            body.limitData.limitAmount.amount = tlimit.STR_CUR_Amount__c;
            String sBody = JSON.serialize(body, true);
            Boolean response = WS_STR_Limits.updateLimit(sBody, method);
            res = new ReturnValue(response);
        } catch (Exception e) {
            System.debug('WS_STR_Limits.patchLimit: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            res = new ReturnValue(false, e.getMessage());
        }
        return res;
    }
}