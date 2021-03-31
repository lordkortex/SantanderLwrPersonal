global with sharing class WRAPPER_PendingServiceActivationStatus {
    
    global WRAPPER_PendingServiceActivationStatus(){
        System.debug('WRAPPER_PendingServiceActivationStatus');
    }
    
    global class serviceActivationData{
        @AuraEnabled global Integer serviceActivationId; 
        @AuraEnabled global String companyId;
        @AuraEnabled global String serviceActivacionType;
        @AuraEnabled global String status;
           
        global serviceActivationData(){
            System.debug('WRAPPER_PendingServiceActivationStatus.serviceActivationData');
        } 
    }
    
    //https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/service_activation?companyId=''
    
    @AuraEnabled global List<serviceActivationData> pendingTaskList;

    global static WRAPPER_PendingServiceActivationStatus parse(String json) {
		return (WRAPPER_PendingServiceActivationStatus) System.JSON.deserialize(json,  WRAPPER_PendingServiceActivationStatus.class);
	} 

}