/*----------------------------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:   	Class that handles the custom notification delivery
History
<Date>			<Author>				<Description>
05/10/2020      Antonio Duarte          Initial version 	
09/12/2020		Héctor Estivalis		REDO   
----------------------------------------------------------------------------------*/
global without sharing class HANDLER_CustomNotification {
    
    @future
    global static void sendNotification(String process, String objId, String notificationType){
        try{            
            Id recordId = getRecordId (process, objId);
            List<Id> receptorIds = getReceptors (process, recordId, notificationType);
            Map<String, List<Id>> receptorIdsMap = createUserMap (receptorIds);
            for(String language : receptorIdsMap.keySet()){
                receptorIds = receptorIdsMap.get(language);
            	String body = getBody (process, recordId, notificationType, language);
				String title = getTitle (process, language);
                SendNotificationWithParams(recordId, receptorIds, title, body);
            }			
        }catch(Exception e){
            System.debug('HANDLER_CustomNotification.sendNotification: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    global static void SendNotificationWithParams (Id recordId, List<Id> receptorIds, String title, String body){
        String notifTypeId = [SELECT Id FROM CustomNotificationType WHERE CustomNotifTypeName = 'Custom Community Notification' LIMIT 1]?.Id;                 
        Map<String, Object> params = new Map<String, Object>();
        params.put('RecipientIDs', receptorIds);
        params.put('NotificationBody', body);
        params.put('NotificationTitle', title);
        params.put('TargetID', recordId);
        params.put('NotifTypeID', notifTypeId);           
        if(!receptorIds.isEmpty()){
            Flow.Interview.Send_Custom_Notification sendNotificationFlow = new Flow.Interview.Send_Custom_Notification(params);
            sendNotificationFlow.start();
        }
    }

    @TestVisible
    private static Id getRecordId (String process, String objId){
        Id response;
        Switch on process{
            when 'Payment' {
                Payment__c payment = [SELECT Id, PAY_TXT_PaymentId__c, PAY_TXT_ClientReference__c, CreatedById FROM Payment__c WHERE PAY_TXT_PaymentId__c = :objId LIMIT 1];
                response = payment.Id;
            }
            when 'Treasury' {
                Case objCase = [SELECT Id, CaseNumber, CASE_PCK_accountCountry__c FROM Case WHERE Id = :objId LIMIT 1];
                response = objCase.Id;
            }
        }
        system.debug('getRecordId:' + response);  
        return response;
    }
    
	@TestVisible
    private static List<Id> getReceptors (String process, Id recordId, String notificationType){
        List<Id> response = new List<Id>();
        Switch on process {
            when 'Payment' {
                Payment__c payment = [SELECT Id, PAY_TXT_PaymentId__c, PAY_TXT_ClientReference__c, CreatedById FROM Payment__c WHERE Id = :recordId LIMIT 1];
         		if(notificationType == 'Pending'){
            		List<SNG_Group_User__c> signers = [SELECT SGN_ELCK_RelatedUser__r.SGN_ELCK_RelatedUser__r.Id FROM SNG_Group_User__c WHERE SGN_ELCK_RelatedGroup__r.SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c = :payment.PAY_TXT_PaymentId__c];
            		for (SNG_Group_User__c u : signers){
                		if(u.SGN_ELCK_RelatedUser__c != null && u.SGN_ELCK_RelatedUser__r.SGN_ELCK_RelatedUser__c != null){
                			response.add(u.SGN_ELCK_RelatedUser__r.SGN_ELCK_RelatedUser__r.Id);
                		}
            		}
        		}
        		else {
            		response.add(payment.CreatedById);
        		}               
            }
            when 'Treasury'{
                Case objCase = [SELECT Id, CaseNumber, CASE_PCK_accountCountry__c FROM Case WHERE Id = :recordId LIMIT 1];
            	String userRole = 'Treasury' + objCase.CASE_PCK_accountCountry__c;
        		List<User> LocalTreasurers = [SELECT Id, Email FROM User WHERE Profile.Name = 'Treasury' AND UserRole.DeveloperName = :userRole AND isActive = true];            
            	Switch on notificationType {
            		when 'Pending'{
                    //Add operations users
            		}
            		when 'Solved'{
                    	//Add operations users
                    	for(User treasurer : LocalTreasurers)
               				response.add(treasurer.Id);       	
               	 	}
            		when 'Cancelled'{
                    	//Add operations users
                    	for(User treasurer : LocalTreasurers)
               				response.add(treasurer.Id);          	
                	}
        		}
            }
        }
        system.debug('getReceptors:' + response);    
        return response;
    }
    
    @TestVisible
    private static String getBody (String process,  Id recordId, String notificationType, String language){
        String response = '';
        Switch on process {
            when 'Payment'{
                Payment__c payment = [SELECT Id, PAY_TXT_PaymentId__c, PAY_TXT_ClientReference__c, CreatedById FROM Payment__c WHERE Id = :recordId LIMIT 1];
                String clientReference = payment.PAY_TXT_ClientReference__c;
        		String userName = Userinfo.getName();
                Switch on notificationType{
                	when 'Pending'{
                        if(CustomText__c.getValues(language + '_PaymentPending') != null){
                        	response = CustomText__c.getValues(language + '_PaymentPending').Text__c.replace('[client_ref]', clientReference);
                        }
                        else {
                            response = CustomText__c.getValues('en_PaymentPending').Text__c.replace('[client_ref]', clientReference);
                        }
            		}
            		when 'Reject'{
                        if(CustomText__c.getValues(language + '_PaymentRejected') != null){
                        	response = CustomText__c.getValues(language + '_PaymentRejected').Text__c.replace('[client_ref]', clientReference).replace('[Authorizator]', userName);
                        }
                        else {
                            response = CustomText__c.getValues('en_PaymentRejected').Text__c.replace('[client_ref]', clientReference).replace('[Authorizator]', userName);
                        }                      
            		}
            		when 'Review'{
                        if(CustomText__c.getValues(language + '_PaymentReview') != null){
                        	response = CustomText__c.getValues(language + '_PaymentReview').Text__c.replace('[client_ref]', clientReference).replace('[Authorizator]', userName);
                        }
                        else {
                            response = CustomText__c.getValues('en_PaymentReview').Text__c.replace('[client_ref]', clientReference).replace('[Authorizator]', userName);
                        }
               		}
            		when 'Completed'{
                        if(CustomText__c.getValues(language + '_PaymentAuthorized') != null){
                        	response = CustomText__c.getValues(language + '_PaymentAuthorized').Text__c.replace('[client_ref]', clientReference);
                        }
                        else {
                            response = CustomText__c.getValues('en_PaymentAuthorized').Text__c.replace('[client_ref]', clientReference);
                        }                        
            		}
                }
            }
            when 'Treasury'{
            	Switch on notificationType {
            		when 'Pending'{
               			response = System.Label.BBOO_TRS_BellPendingBody;
            		}
            		when 'Solved'{
               			response = System.Label.BBOO_TRS_BellSolvedBody;         	
                	}
            		when 'Cancelled'{
               			response = System.Label.BBOO_TRS_BellCancelledBody;          	
                	}
                }
        	}
        }
        system.debug('getBody:' + response);
        return response;
    }
    
    @TestVisible
    private static String getTitle (String process,  String language){
        String response = '';
        Switch on process{
            when 'Payment'{           
                response = CustomText__c.getValues(language + '_PaymentTitle').Text__c;
             }
            when 'Treasury'{
                response = 'Treasury';
            }
        }
        system.debug('getTitle:' + response);
        return response;
	}    
    
    @TestVisible
    private static Map<String, List<Id>> createUserMap (List<Id> receptorIds){
        List<User> userList = [SELECT Id, LanguageLocaleKey FROM User WHERE Id IN :receptorIds];
        Map<String, List<Id>> receptorIdsMap = new Map<String, List<Id>> ();
        String key;
        for(User receptor : userList){
            key = receptor.LanguageLocaleKey.left(2);
            if(receptorIdsMap.get(key) == null){
                List<Id> idList = new List<Id>();
                idList.add(receptor.Id);
                receptorIdsMap.put(key, idList);
            }
            else {
                receptorIdsMap.get(key).add(receptor.Id);
            }
        }
        return receptorIdsMap;
    }
}