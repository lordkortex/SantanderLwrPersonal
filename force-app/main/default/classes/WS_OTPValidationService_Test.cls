/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
19/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WS_OTPValidationService_Test {
	
    @testSetup  
    static void setup(){
        Test.startTest();
        system.debug(validateOTPTest());
		system.debug(validateOTPTestError());
        Test.stopTest();
    }
   
    @isTest
    static String validateOTPTest(){
        
        return WS_OTPValidationService.validateOTP('Test','Test','Test','Test','Test');
    }
    @isTest
    static String validateOTPTestError(){
        
        return WS_OTPValidationService.validateOTP(null,null,null,null,null);
    }

}