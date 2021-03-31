public class TRS_ControllerFunding {
    
    @AuraEnabled
    public static ReturnValue authorize (Id caseId){
        ReturnValue response;
        try {
        	String soql = getQuery(caseId); 
        	Case objCase = database.query(soql);
            if(!objCase.CASE_CHK_Approved__c){
            	ReturnValue authorizeResponse = TRS_ServiceFunding.authorize(objCase);
				if(authorizeResponse.success) {  
                    objCase.CASE_LKP_ApprovedBy__c = UserInfo.getUserId();
            		objCase.CASE_DATET_ApprovalDate__c = system.now();
            		objCase.CASE_CHK_Approved__c = true;
					update objCase;
                }
            	response = new ReturnValue (true);
            }
            else {
                response = new ReturnValue (false, 'This Settlement is already approved');
            }
        } catch (Exception e) {
            System.debug('TRS_ControllerFunding.authorize: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, e.getMessage());
        }
        return response;
    }
    
    @AuraEnabled
    public static ReturnValue reject (Id caseId){
        ReturnValue response = new ReturnValue (true);
        system.debug(caseId);
        return response;
    }

    @AuraEnabled
    public static ReturnValue createOperation (Id caseId){
        ReturnValue response;
        try{
            String soql = getQuery(caseId); 
        	Case objCase = database.query(soql);  
            
            
        } catch (Exception e) {
            System.debug('TRS_ControllerFunding.createOperation: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, e.getMessage());
        }
        return response;
    }
    
    @AuraEnabled
    public static ReturnValue relateSettlementWithPayment (Id caseId){
        ReturnValue response = new ReturnValue (true);
        system.debug(caseId);
        return response;
    }
    
    @AuraEnabled
    public static ReturnValue execute (Id caseId){
        ReturnValue response;
        try{
            List<Case> SettlementsToFund = new List<Case>();
            List<Case> SettlementsToNotify = new List<Case>();
            Case objCase = [SELECT Id, (SELECT Id, Type, CASE_TXT_VAId__c, CASE_TXT_PaymentId__c, CASE_TXT_Reference__c, CASE_CUR_Amount__c, CurrencyIsoCode, CASE_PCK_accountCountry__c FROM Cases) FROM Case WHERE Id = :caseId LIMIT 1];
            for(Case tCase :objCase.Cases){
                if(tCase.Type == 'Funding back' || tCase.CASE_PCK_accountCountry__c == 'ES') {
                    SettlementsToFund.add(tCase);
                }
                else {
                    SettlementsToNotify.add(tCase);
                }                    
            }
            for(Case funding : SettlementsToFund){
        		//ReturnValue fundResult = TRS_ServiceFunding.sendFunding (funding);
            }
            for(Case notification : SettlementsToNotify){
        		//HANDLER_CustomEmailNotification.sendTreasuryEmail (notification.Id, 'Settlement');
            }
        } catch (Exception e) {
            System.debug('TRS_ControllerFunding.sendFunding: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, 'Integration failed: ' +  e.getMessage());
        }      
        return response;
    }
                                               
	private static String getQuery (Id caseId){
        List<String> fields = new List<String>(Case.SObjectType.getDescribe().fields.getMap().keySet());
			String soql = ''
        + ' SELECT ' + String.join(fields, ',')
        + ' FROM Case'
        + ' WHERE Id = \'' + caseId + '\'';

        return soql;
	}
}