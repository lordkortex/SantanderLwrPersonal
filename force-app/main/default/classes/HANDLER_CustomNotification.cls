/*----------------------------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:    Class that handles the custom notification delivery
History
<Date>          <Author>                <Description>
05/10/2020      Antonio Duarte          Initial version     
09/12/2020      Héctor Estivalis        REDO   
----------------------------------------------------------------------------------*/
global without sharing class HANDLER_CustomNotification {
    
    global static void sendPaymentNotification(String paymentId, String notificationType){
        try{
            String notifTypeId = [SELECT Id FROM CustomNotificationType WHERE CustomNotifTypeName = 'Custom Community Notification' LIMIT 1]?.Id;
            Payment__c payment = [SELECT Id, PAY_TXT_PaymentId__c, PAY_TXT_ClientReference__c, CreatedById FROM Payment__c WHERE PAY_TXT_PaymentId__c = :paymentId LIMIT 1];

            if (payment != null){
                List<Id> receptorIds = getReceptors (payment, notificationType);
                String body          = getBody (payment.PAY_TXT_ClientReference__c, notificationType);
                String title         = getTitle ();
                
                Map<String, Object> params = new Map<String, Object>();
                params.put('RecipientIDs', receptorIds);
                params.put('NotificationBody', body);
                params.put('NotificationTitle', title);
                params.put('TargetID', payment.Id);
                params.put('NotifTypeID', notifTypeId);
                
                if(!receptorIds.isEmpty()){
                    Flow.Interview.Send_Custom_Notification sendNotificationFlow = new Flow.Interview.Send_Custom_Notification(params);
                    sendNotificationFlow.start();
                }
            }
        }catch(Exception e){
            System.debug('Error sending the custom notification');
        }
    }

    @TestVisible
    private static List<Id> getReceptors (Payment__c payment, String notificationType){
        List<Id> response = new List<Id>();
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
        system.debug('getReceptors:' + response);    
        return response;
    }
    
    @TestVisible
    private static String getBody (String clientReference, String notificationType){
        String response = '';
        clientReference = clientReference == null ? '[client_ref]' : clientReference;
        String userName = Userinfo.getName();
        Switch on notificationType {
            when 'Pending'{
                response = System.label.PAY_NotificationPaymentPending.replace('[client_ref]', clientReference);
            }
            when 'Reject'{
                response = System.label.PAY_NotificationPaymentRejected.replace('[client_ref]', clientReference).replace('[Authorizator]', userName);
            }
            when 'Review'{
                response = System.label.PAY_NotificationPaymentReview.replace('[client_ref]', clientReference).replace('[Authorizator]', userName);
            }
            when 'Completed'{
                response = System.label.PAY_NotificationPaymentAuthorized.replace('[client_ref]', clientReference);
            }
        }
        system.debug('getBody:' + response);
        return response;
    }
    
    @TestVisible
    private static String getTitle (){
        String response = System.label.Payments;
        system.debug('getTitle:' + response);
        return response;
    }    
}