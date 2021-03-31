public class TRS_ControllerVAM {
	
    @AuraEnabled
    public static ReturnValue retrieveVirtualAccountsList() {
        ReturnValue response = null;
        try{
            User usr = [SELECT Id, USER_country__c FROM User WHERE Id = :UserInfo.getUserId()];
            WS_TRS_VAM.OUTPUT virtualAccountsList = TRS_ServiceVAM.retrieveList(usr.USER_country__c);
            Map<String, Object> value = new Map<String, Object>();
            value.put('VirtualAccountsList', virtualAccountsList);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('TRS_ControllerVAM.retrieveVirtualAccountsList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;    
    }
    
    @AuraEnabled
    public static ReturnValue retrieveVirtualAccountDetail(String vamAccount) {
        ReturnValue response = null;
        try{
            WS_TRS_VAM.OUTPUT virtualAccount = TRS_ServiceVAM.retrieveAccount(vamAccount);
            Map<String, Object> value = new Map<String, Object>();
            value.put('virtualAccount', virtualAccount);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('TRS_ControllerVAM.retrieveVirtualAccountDetail: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;    
    }
}