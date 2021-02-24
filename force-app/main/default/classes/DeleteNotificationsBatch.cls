/*----------------------------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:    Batch that deletes the old notification redirect records 
TestClass:		DeleteNotificationsSchedulable_Test
History
<Date>			<Author>			<Description>
05/10/2020		Antonio Duarte     	Initial version
----------------------------------------------------------------------------------*/
global class DeleteNotificationsBatch implements Database.Batchable<sObject>{
    global DeleteNotificationsBatch(){
    }
    
    global Database.QueryLocator start(Database.BatchableContext BC){
        return Database.getQueryLocator([
            SELECT Id
            FROM Notification_Redirect__c
            WHERE Delete_date__c <= TODAY
        ]);
    }
    
    global void execute(Database.BatchableContext BC, List<Notification_Redirect__c>scope){
        delete scope;
    }
    
    global void finish(Database.BatchableContext BC){
    }
}