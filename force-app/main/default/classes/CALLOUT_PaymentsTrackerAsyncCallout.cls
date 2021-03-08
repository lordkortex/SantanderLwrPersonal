/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    
Test Class:     
History
<Date>          <Author>            <Description>
15/07/2020      Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public class CALLOUT_PaymentsTrackerAsyncCallout implements Queueable, Database.AllowsCallouts {

    public final String globalId;

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    
    History
    <Date>          <Author>            <Description>
    15/07/2020      Guillermo Giral     Initial version
    ----------------------------------------------------------------------------------*/
    public void execute(QueueableContext context) {

        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BalanceLastUpdate');
        List<User> loggedUser = [SELECT Id, Username FROM User WHERE USER_TXT_GlobalId__c =: globalId];
        System.debug('Logged user: ' + loggedUser);
        if(!loggedUser.isEmpty()){
            String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, null, loggedUser[0].Id, false);
        }
    }

    public CALLOUT_PaymentsTrackerAsyncCallout(String input){
        globalId = input;
    }
}