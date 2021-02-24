/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for CALLOUT_PaymentsTrackerAsyncCallout 
History
<Date>          <Author>            <Description>
16/07/2020      Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CALLOUT_PaymentsTrackerAsyncCallout_Test {
    static testmethod void execute_Test() {
        // startTest/stopTest block to force async processes 
        //   to run in the test.
        Test.startTest();        
        System.enqueueJob(new CALLOUT_PaymentsTrackerAsyncCallout('abc'));
        Test.stopTest();
    }
}