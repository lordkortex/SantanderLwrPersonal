/*----------------------------------------------------------------------------------
Author:         Héctor Estivalis
Company:        Deloitte
Description:   	Class that handles the custom email notification delivery
History
<Date>			<Author>				<Description>
19/01/2021  	Héctor Estivalis		Initial version   
----------------------------------------------------------------------------------*/
public without sharing class HANDLER_CustomEmailNotification {

    @future
    public static void sendTreasuryEmail(String CaseId, String NotificationType){
        try{
            Case objCase = [SELECT Id, CaseNumber, Subject, Description, CASE_PCK_accountCountry__c FROM Case WHERE Id = :CaseId];
            String userRole = 'Treasury_' + objCase.CASE_PCK_accountCountry__c;
            List<User> LocalTreasurers = [SELECT Id, Email FROM User WHERE Profile.Name = 'Treasury' AND UserRole.DeveloperName = :userRole AND isActive = true];
			Group OperationsGroup = [SELECT Id, Email FROM Group where Type = 'Queue' and DeveloperName = 'Operations' LIMIT 1];
            String Body = '';
        	String Subject = '';
			List<String> EmailAddresses = new List <String>();
            Map<String, String> replacements = new Map<String, String>();
            Switch on notificationType {
                when 'Creation'{
					Body = objCase.Description;
        			Subject = objCase.Subject;
                    for (User Treasurer : LocalTreasurers){
                        EmailAddresses.add(Treasurer.Email);   
                    }
                }
            	when 'Pending'{
               		Body = System.Label.BBOO_TRS_EmailPendingSubject;
        			Subject = System.Label.BBOO_TRS_EmailPendingSubject;                    
					EmailAddresses.add(OperationsGroup.Email);
                    replacements.put('{CaseNumber}', objCase.CaseNumber);
           			replacements.put('{url}', system.label.domainBackFront + '/' + CaseId);                
                }
                when 'Solved'{
               		Body = System.Label.BBOO_TRS_EmailSolvedSubject;
        			Subject = System.Label.BBOO_TRS_EmailSolvedSubject;
					for (User Treasurer : LocalTreasurers){
                        EmailAddresses.add(Treasurer.Email);
                    }
                    EmailAddresses.add(OperationsGroup.Email);   
                    replacements.put('{CaseNumber}', objCase.CaseNumber);
           			replacements.put('{url}', system.label.domainBackFront + '/' + CaseId);
                }
            	when 'Cancelled'{
               		Body = System.Label.BBOO_TRS_EmailCancelledSubject;
        			Subject = System.Label.BBOO_TRS_EmailCancelledSubject;
					for (User Treasurer : LocalTreasurers){
                        EmailAddresses.add(Treasurer.Email);
                    }
                    EmailAddresses.add(OperationsGroup.Email);  
                    replacements.put('{CaseNumber}', objCase.CaseNumber);
            		replacements.put('{url}', system.label.domainBackFront + '/' + CaseId);
                }
                when 'Settlement'{
                    Body = 'TBD';
                    Subject = 'TBD';
                    for (User Treasurer : LocalTreasurers){
                        EmailAddresses.add(Treasurer.Email);
                    }
                    replacements.put('{CaseNumber}', objCase.CaseNumber);
            		replacements.put('{url}', system.label.domainBackFront + '/' + CaseId);
                }
        	}
        	if(!EmailAddresses.isEmpty()){                
                Global_Utilities.sendEmailWithoutTemplate(Subject, Body, null, EmailAddresses, null, null, null, replacements);
			}
        } catch (Exception e) {
            System.debug('HANDLER_CustomEmailNotification.sendTreasuryEmail: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }     
    }    
    
    @future
    public static void sendComplianceEmail(String CaseId){
        try{
            Case objCase = [SELECT Id, CaseNumber FROM Case WHERE Id = :CaseId];
            String DowJonesQueueEmail = [SELECT Id, DeveloperName, Email FROM Group WHERE Type = 'Queue' AND DeveloperName = 'ScreeningDowJones' LIMIT 1]?.Email; 
       		String Body = System.Label.PAY_CaseNotificationEmailBody;
        	String Subject = System.Label.PAY_CaseNotificationEmailSubject;
			List<String> DowJonesQueueEmailList = new List<String>();
       	 	DowJonesQueueEmailList.add(DowJonesQueueEmail);
        	if(!DowJonesQueueEmailList.isEmpty()){            	
				Map<String, String> replacements = new Map<String, String>();
        		replacements.put('{CaseNumber}', objCase.CaseNumber);
                replacements.put('{url}', system.label.domainBackFront + '/' + caseId);
            	Global_Utilities.sendEmailWithoutTemplate(Subject, Body, 'FC Ops PagoNxt Trade', DowJonesQueueEmailList, null, null, null, replacements);
			}
        } catch (Exception e) {
            System.debug('HANDLER_CustomEmailNotification.sendComplianceEmail: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }     
    }
}