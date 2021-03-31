/*----------------------------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:    Controller of CMP_LoginError 
Test Class:     CNT_LoginError_Test
History
<Date>          <Author>        	<Description>
19/08/2020      Antonio Duarte     	Initial version
----------------------------------------------------------------------------------*/
public class CNT_LoginError {
	
    @AuraEnabled
    public static String getErrorMessage(String errorCode, String language){
        String errorMessage = '';
        
        try{
            if(errorCode == null || ''.equals(errorCode) || 'Not found'.equals(errorCode)){
                errorCode = 'Default';
            }
            if(language == null || ''.equals(language)){
                language = 'EN';
            }
            
            List<Login_Error__mdt> loginErrors = [SELECT Error_Message__c, Language__c, Error_Code__c FROM Login_Error__mdt];
            
            for(Login_Error__mdt error : loginErrors){
                if(error.Error_Code__c.equals(errorCode) && error.Language__c.equals(language)){
                    errorMessage = error.Error_Message__c;
                    break;
                }else if(error.Error_Code__c.equals('Default') && error.Language__c.equals(language)){
                    errorMessage = error.Error_Message__c;
                }
            }
            
        }catch(Exception e){
            errorMessage = 'Undefined Error';
        }
        
        return errorMessage;
    }
}