/*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Obtain signsture status
    History:
    <Date>          <Author>            <Description>
    02/03/2021     R. Cervino          Initial version
    */
global class WS_signatureGetStatus {
    
    global static String getSignatureStatus(String sign_id, String operationGlobalId){
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('WS_SignatureGetStatus');
            String finalEndPoint = configWs.CNT_Endpoint__c.replace('{sign_id}', sign_id);            
			
            Map<String, String> extraHeader = new Map<String, String>();
            extraHeader.put('Global-Payment-Id', operationGlobalId);
            String res = Global_IntegrationWrapper.launchHTTP('',finalEndPoint,configWs.CNT_HTTPMethod__c, extraHeader);
            
            if(String.isNotBlank(res)){
                WS_signatureGetStatus.OUTPUT signatureStatus = (WS_signatureGetStatus.OUTPUT) JSON.deserialize(res, WS_signatureGetStatus.OUTPUT.class);
				
                if(String.isBlank(signatureStatus.statusResponse.signId) || signatureStatus.statusResponse.signId != sign_id){
            		throw new CustomException('getSignatureStatus: wrong or empty signId');
                }else{
                    if(String.isNotBlank(signatureStatus.statusResponse.status)){
                        return signatureStatus.statusResponse.status;
                    }else{
            			throw new CustomException('getSignatureStatus: wrong or empty status');
                    }
                }
				
            }else{
            	throw new CustomException('getSignatureStatus: empty response');
            }

		} catch (Exception e) {
            throw new CustomException('getSignatureStatus: ' + e.getMessage() + ', in line: ' + e.getLineNumber());

        }
    }
    
    global class OUTPUT{
        global StatusResponse statusResponse;
        
        global OUTPUT(){}
    }
    
    global class StatusResponse{
        global String signId;
        global String status;
        
        global StatusResponse(){}
    }
}