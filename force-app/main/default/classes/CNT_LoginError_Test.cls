@isTest
public class CNT_LoginError_Test {
    
    
    @IsTest
    public static void getErrorMessageTest()
    {
        String response = CNT_LoginError.getErrorMessage('Session_Ended', 'ES');
        String responseNoLanguage = CNT_LoginError.getErrorMessage('Session_Ended', '');
        String responseNoCode = CNT_LoginError.getErrorMessage('', 'ES');
        
        System.assert(String.isNotBlank(response));
        System.assert(String.isNotBlank(responseNoLanguage));
        System.assert(String.isNotBlank(responseNoCode));
    }
}