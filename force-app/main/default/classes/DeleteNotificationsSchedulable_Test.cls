/*----------------------------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:    TestClass for DeleteNotificationsBatch and DeleteNotificationsSchedulable
History
<Date>			<Author>			<Description>
05/10/2020		Antonio Duarte     	Initial version
----------------------------------------------------------------------------------*/
@isTest
public class DeleteNotificationsSchedulable_Test {

    public static testMethod void executeSchedulableTest(){
        Notification_Redirect__c nr = new Notification_Redirect__c();
        insert nr;
        Test.setCreatedDate(nr.Id, System.today()-91);
        
        Test.startTest();
        DeleteNotificationsSchedulable sh1 = new DeleteNotificationsSchedulable();
        String sch = '0 0 2 * * ?'; 
        System.schedule('Test Delete Notifications', sch, sh1); 
        sh1.execute(null);
        Test.stopTest();
    }
}