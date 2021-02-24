public class HANDLER_STR_Limits {

     public static void insertLimitRecords(String companyId, Object limitOutput){
        String res = '';
        try{
            WS_STR_Limits.OUTPUT limitObj = (WS_STR_Limits.OUTPUT) limitOutput;
            List<STR_Limit__c> limitsToInsert = transformOUTPUT(companyId, limitObj);
            if(!limitsToInsert.isEmpty()){
                database.insert(limitsToInsert, true);
            }
        } catch (Exception e) {
            System.debug('STR_ControllerStructurals.insertLimitRecords: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    public static List<STR_Limit__c> transformOUTPUT (String companyId, WS_STR_Limits.OUTPUT limitObj) {
        Id limitRecordType = Schema.SObjectType.STR_Limit__c.getRecordTypeInfosByDeveloperName().get('STR_Limit').getRecordTypeId();
		List<STR_Limit__c> response = new List<STR_Limit__c>();
        if(limitObj != null && limitObj.operationLimitList != null){
            for(WS_STR_Limits.OperationLimit tlimit : limitObj.operationLimitList){
                STR_Limit__c newLimit = new STR_Limit__c (
                    RecordTypeId = limitRecordType,
                    STR_CHK_createdByAPI__c = true,
                    STR_LKP_Company__c = companyId,
                    STR_PCK_ServiceId__c = tlimit.serviceId,
                    CurrencyIsoCode = tlimit.limitAmount.tcurrency,
                    STR_CUR_Amount__c = tlimit.limitAmount.amount,     
                    STR_PCK_Status__c = tlimit.status
                );
                response.add(newLimit);
            }
        }
        return response;
    }
    
        
    public static Map<String, List<STR_Limit__c>> createMapActiveLimits (List<STR_Limit__c> limitList){
        String key;
        Map<String, List<STR_Limit__c>> limitMap = new Map<String, List<STR_Limit__c>>();       
        for(STR_Limit__c tLimit : limitList){
            if(tLimit.STR_PCK_Status__c == 'active'){
                key = tLimit.CurrencyIsoCode + tLimit.STR_PCK_ServiceId__c;
            	if(LimitMap.containsKey(key)){
               		LimitMap.get(key).add(tLimit);
                }	
            	else {
                	List<STR_Limit__c> newList = new List<STR_Limit__c>();
                	newList.add(tLimit);
                	LimitMap.put(key, newList);
            	}    
            }
        }
        return limitMap;
    }
    
    public static ReturnValue validateData (List<STR_Limit__c> limitList){
        ReturnValue response = new ReturnValue(true);
        String errorMsg = '';
        ReturnValue RV_GTSLimits = STR_ServiceStructurals.getLimits('GTS_PLATFORM');
        WS_STR_Limits.OUTPUT OP_GTSLimits = (WS_STR_Limits.OUTPUT) RV_GTSLimits.value.get('OUTPUT');
        List<STR_Limit__c> GTSLimits = transformOUTPUT(null, OP_GTSLimits);
        Map<String, List<STR_Limit__c>> limitMap = createMapActiveLimits (limitList);
        Map<String, List<STR_Limit__c>> GTSLimitMap = createMapActiveLimits (GTSLimits);
        for(String key : limitMap.keySet()){
            if(limitMap.get(key).size() > 1){
                errorMsg = 'Invalid data for the combination service: ' +  limitMap.get(key)[0].STR_PCK_ServiceId__c + ' and currency: ' + limitMap.get(key)[0].CurrencyIsoCode + ': Several active limits';                        
            	response = new ReturnValue(false, errorMsg);
            }
            else{
                if(GTSLimitMap.get(key) != null && limitMap.get(key)[0].STR_CUR_Amount__c > GTSLimitMap.get(key)[0].STR_CUR_Amount__c){                    
                    errorMsg = 'Invalid data for the combination service: ' +  limitMap.get(key)[0].STR_PCK_ServiceId__c + ' and currency: ' + limitMap.get(key)[0].CurrencyIsoCode + 'Limit is greater than the GTS limit (' + GTSLimitMap.get(key)[0].STR_CUR_Amount__c + ')';
                	response = new ReturnValue(false, errorMsg);
                }
            }
        }   
        return response;
    }
}