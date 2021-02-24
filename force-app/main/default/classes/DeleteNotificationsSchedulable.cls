/*----------------------------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:    Schedulable that calls the DeleteNotificationsBatch 
TestClass: 		DeleteNotificationsSchedulable_Test
History
<Date>			<Author>			<Description>
05/10/2020		Antonio Duarte     	Initial version
----------------------------------------------------------------------------------*/
global class DeleteNotificationsSchedulable implements Schedulable{

    global void execute(SchedulableContext SC){
        DeleteNotificationsBatch dnb = new DeleteNotificationsBatch();
        Database.executeBatch(dnb);
    }
    
}