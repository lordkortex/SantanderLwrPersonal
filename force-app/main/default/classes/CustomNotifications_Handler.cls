/*----------------------------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:   	Class that handles the custom notification delivery
History
<Date>			<Author>				<Description>
05/10/2020      Antonio Duarte          Initial version    
----------------------------------------------------------------------------------*/
global class CustomNotifications_Handler {
    
    /*----------------------------------------------------------------------------------
	Author:         Antonio Duarte
	Company:        Deloitte
	Description:   	Method that calls the flow that will send the notification
	History
	<Date>			<Author>				<Description>
	05/10/2020      Antonio Duarte          Initial version    
	----------------------------------------------------------------------------------*/
    global static void sendCustomNotification(String title, String body, String targetId, List<String> receptorIDs){
        try{
            //Get Notification Type Id
            String notifTypeId = [SELECT Id FROM CustomNotificationType WHERE CustomNotifTypeName = 'Custom Community Notification' LIMIT 1].Id;
            
            //Prepare flow params
            Map<String, Object> params = new Map<String, Object>();
            params.put('RecipientIDs', receptorIDs);
            params.put('NotificationBody', body);
            params.put('NotificationTitle', title);
            params.put('TargetID', targetId);
            params.put('NotifTypeID', notifTypeId);
            
            //Call flow
            Flow.Interview.Send_Custom_Notification sendNotificationFlow = new Flow.Interview.Send_Custom_Notification(params);
            sendNotificationFlow.start();
            
        }catch(Exception e){
            System.debug('Error sending the custom notification');
        }
    }
    
    
    /*----------------------------------------------------------------------------------
    Author:         Antonio Duarte
	Company:        Deloitte
	Description:   	Method that searches the notifredirect record. Creates if doesnt exist
	History
	<Date>			<Author>				<Description>
	05/10/2020      Antonio Duarte          Initial version    
	----------------------------------------------------------------------------------*/
    global static Notification_Redirect__c getRedirectRecord(String urlParams, String pageName){
        Notification_Redirect__c nr;
        try{
            nr = [SELECT Id FROM Notification_Redirect__c WHERE URLParams__c=:urlParams AND Page_Name__c=:pageName LIMIT 1];
            if(nr == null){
                throw new CustomException();
            }
        }catch(Exception e){
            nr = new Notification_Redirect__c(URLParams__c = urlParams, Page_Name__c = pageName);
            insert nr;
        }
        return nr;
    }
    
    
}