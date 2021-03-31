global with sharing class STR_ServiceStructurals {

    global static ReturnValue getRules (String companyId) {
        ReturnValue response;
        try {
            WS_STR_SignatureRules.INPUT input = new WS_STR_SignatureRules.INPUT();
            input.companyId = companyId;          
            ReturnValue res = WS_STR_SignatureRules.getRules(input);
            if (res.value.get('statusCode') == '200') {
            	Map<String, Object> value = new Map<String, Object>();
            	value.put('OUTPUT', res.value.get('OUTPUT'));
            	response = new ReturnValue(true, value);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.getRules: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue(false,  e.getMessage());
        }
        return response; 
    }
    
	global static ReturnValue postRules (String companyId, List<STR_SignatureRule__c> ruleList) {
        ReturnValue response;
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
                    newGroup.signersRequired = Integer.valueOf(sGroup.STR_NUM_SignsRequired__c);
                    newRule.levelList.add(newGroup);
                }
                body.ruleList.add(newRule);
            } 
            String sBody = JSON.serialize(body, true);
            ReturnValue res = WS_STR_SignatureRules.postRules(sBody);
            if(res.value.get('statusCode') == '200'){
                response = new ReturnValue (true);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.postRules: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, 'Integration failed: ' +  e.getMessage());
        }
        return response;
    }
    
 	global static ReturnValue patchRule (STR_SignatureRule__c rule) {
        ReturnValue response;
        try {
            WS_STR_SignatureRules.INPUT input = new WS_STR_SignatureRules.INPUT();
            input.ruleId = rule.STR_TXT_RuleId__c;
            input.amountFrom = String.valueOf(rule.STR_CUR_AmountFrom__c);
            input.amountTo = String.valueOf(rule.STR_CUR_AmountTo__c);
            
            WS_STR_SignatureRules.patchBODY body = new WS_STR_SignatureRules.patchBODY();
            body.LevelSignersList = new List<WS_STR_SignatureRules.SignerGroup>();
			for(STR_RuleGroup__c sGroup : rule.SignersGroups__r){
                WS_STR_SignatureRules.SignerGroup newGroup = new WS_STR_SignatureRules.SignerGroup();
                newGroup.groupId = sGroup.STR_TXT_GroupId__c;
                newGroup.level = String.valueOf(sGroup.STR_NUM_Level__c);
                newGroup.signersRequired = Integer.valueOf(sGroup.STR_NUM_SignsRequired__c);
                body.LevelSignersList.add(newGroup);
            }
            String sBody = JSON.serialize(body, true).replace('groupId', 'groupName');
            ReturnValue res = WS_STR_SignatureRules.patchRule (input, sBody);
            if(res.value.get('statusCode') == '200'){
                response = new ReturnValue (true);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.patchRule: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, 'Integration failed: ' +  e.getMessage());
        }
        return response;
    }
    
    global static ReturnValue deleteRule (STR_SignatureRule__c rule) {
        ReturnValue response;
        try {
            WS_STR_SignatureRules.INPUT input = new WS_STR_SignatureRules.INPUT();
            input.ruleId = rule.STR_TXT_RuleId__c;           
            ReturnValue res = WS_STR_SignatureRules.deleteRule(input);
            if(res.value.get('statusCode') == '200'){
                response = new ReturnValue (true);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureRules.deleteRule: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, 'Integration failed: ' +  e.getMessage());
        }
        return response;
    }
    
    global static ReturnValue getGroups (String companyId) {
        ReturnValue response;
        try {
            WS_STR_SignatureGroups.INPUT input = new WS_STR_SignatureGroups.INPUT();
            input.customerId = companyId;    
            ReturnValue res = WS_STR_SignatureGroups.getGroups(input);
            if (res.value.get('statusCode') == '200') {
            	Map<String, Object> value = new Map<String, Object>();
            	value.put('OUTPUT', res.value.get('OUTPUT'));
            	response = new ReturnValue(true, value);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups.getGroups: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue(false,  e.getMessage());
        }
        return response;
    } 
    
    global static ReturnValue postGroup (String companyId, STR_SignersGroup__c tGroup) {
        ReturnValue response;
        try {
            WS_STR_SignatureGroups.BODY body = new WS_STR_SignatureGroups.BODY();
            body.customerId = companyId;
            body.groupName = tGroup.Name;
            body.userList = new List<WS_STR_SignatureGroups.Signers>();
            for(STR_Signer__c signer : tGroup.Signers__r){
                WS_STR_SignatureGroups.Signers newSigner = new WS_STR_SignatureGroups.Signers();
                newSigner.userId = signer.STR_LKP_User__r.USER_TXT_GlobalId__c;
                body.userList.add(newSigner);
            }
            String sBody = JSON.serialize(body, true);
            ReturnValue res = WS_STR_SignatureGroups.postGroup(sBody);
            if(res.value.get('statusCode') == '200'){
                response = new ReturnValue (true);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups.postGroup: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, 'Integration failed: ' +  e.getMessage());
        }
        return response;
    }
    
    global static ReturnValue patchGroup (STR_SignersGroup__c tGroup) {
        ReturnValue response;
        try {
            WS_STR_SignatureGroups.INPUT input = new WS_STR_SignatureGroups.INPUT();
            input.groupId = tGroup.STR_TXT_GroupId__c;
            
			WS_STR_SignatureGroups.BODY body = new WS_STR_SignatureGroups.BODY();
            body.groupStatus = tGroup.STR_TXT_GroupStatus__c;
            body.groupName = tGroup.Name;
            body.signersList = new List<WS_STR_SignatureGroups.Signers>();
            for(STR_Signer__c signer : tGroup.Signers__r){
                WS_STR_SignatureGroups.Signers newSigner = new WS_STR_SignatureGroups.Signers();
                newSigner.userId = signer.STR_LKP_User__r.USER_TXT_GlobalId__c;
                body.signersList.add(newSigner);
            }
            String sBody = JSON.serialize(body, true);
            ReturnValue res = WS_STR_SignatureGroups.patchGroup (input, sBody);
            if(res.value.get('statusCode') == '200'){
                response = new ReturnValue (true);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups.patchGroup: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, 'Integration failed: ' +  e.getMessage());
        }
        return response;
    }
    
    global static ReturnValue getLimits (String companyId) {
        ReturnValue response;
        try {
            WS_STR_Limits.INPUT input = new WS_STR_Limits.INPUT();
            input.customerId = companyId;          
            input.status = 'active';
            ReturnValue res = WS_STR_Limits.getLimits(input);
            if (res.value.get('statusCode') == '200') {
            	Map<String, Object> value = new Map<String, Object>();
            	value.put('OUTPUT', res.value.get('OUTPUT'));
            	response = new ReturnValue(true, value);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('WS_STR_Limits.getLimits: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue(false, e.getMessage());
        }
        return response;
    } 
    
    global static ReturnValue updateLimit (STR_Limit__c tLimit, String method) {
        ReturnValue response;
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
            ReturnValue res = WS_STR_Limits.updateLimit(sBody, method);
            if(res.value.get('statusCode') == '200'){
                response = new ReturnValue (true);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('WS_STR_Limits.patchLimit: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, 'Integration failed: ' +  e.getMessage());
        }
        return response;
    }
}