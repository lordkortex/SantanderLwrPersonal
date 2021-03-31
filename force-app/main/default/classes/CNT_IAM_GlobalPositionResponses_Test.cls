/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
19/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_IAM_GlobalPositionResponses_Test {
	
    @testSetup  
    static void setup(){
        Test.startTest();
        system.debug(getIAMOkResponseTest());
        system.debug(getIAMErrorResponseTest());
        Test.stopTest();
    }
   
    @isTest
    static String getIAMErrorResponseTest(){
        return CNT_IAM_GlobalPositionResponses.getIAMErrorResponse();
    }
    @isTest
    static String getIAMOkResponseTest(){
        return CNT_IAM_GlobalPositionResponses.getIAMOkResponse();
    }

}