global class WS_B2B_storeSignature {
    
    global static String statusCode;
    
    global WS_B2B_storeSignature(){}
    
	global class storeSignatureBody {
        global String operationGlobalId;
        global String globalUserId;
        global String scaId;
        global storeSignatureBody(String operationGlobalId, String scaId){
            this.operationGlobalId = operationGlobalId;
            this.globalUserId = Global_Utilities.getUserData('').USER_TXT_GlobalId__c;
            this.scaId = scaId;
        }
    }
    
    
    global static String storeSignature(String operationGlobalId, String scaId){
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('B2B_StoreSignature');
			String finalEndPoint = configWs.CNT_Endpoint__c;            
            if (!Test.isRunningTest()) {
                
                Map<String, String> extraHeader = new Map<String, String>();
                extraHeader.put('Global-Payment-Id', operationGlobalId);
                storeSignatureBody initBody = new storeSignatureBody(operationGlobalId, scaId);
                
                String res = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBody,true),finalEndPoint,configWs.CNT_HTTPMethod__c);
                return Global_IntegrationWrapper.statusCode;              
                //validateAccountOutput = (validateAccountOutput) System.JSON.deserialize(res, validateAccountOutput.class);
            }else{
                
                String json = '{'+
                    '    \"operationGlobalId\": \"00000001\",'+
                    '    \"operationGlobalId\": \"00000001\"'+
                    '  }';
                //validateAccountOutput = (validateAccountOutput) System.JSON.deserialize(json, validateAccountOutput.class);
            }
            
            return '';
            
        } catch (Exception e) {
            System.debug('storeSognature: ' + e.getMessage() + ', in line: ' + e.getLineNumber());

            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); 
        }
    }
}