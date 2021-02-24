@isTest
public class CNT_UserNewButtons_Test {
    
    @IsTest
    static void encryptDataTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            DataFactory.getCustomSettingCryptoKey(true);
            String data = CNT_UserNewButtonsController.encryptData('');
        }
    }
    
    @IsTest
    static void decryptDataTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            DataFactory.getCustomSettingCryptoKey(true);
            String data = CNT_UserNewButtonsController.decryptData(Global_Utilities.encryptData('test'));
        }
    }
    
    @IsTest
    static void entitlementDataTest(){
        
        CNT_GroupNewProfileParentController.CNT_ServiceProfilingWrapper data = CNT_UserNewButtonsController.entitlementData();
    }
    
    @IsTest
    static void getServiceProfilingInfoTest(){
        
        CNT_GroupNewProfileParentController.CNT_ServiceProfilingWrapper data = CNT_UserNewButtonsController.getServiceProfilingInfo();
    }
}