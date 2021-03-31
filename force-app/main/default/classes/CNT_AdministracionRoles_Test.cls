@isTest
public class CNT_AdministracionRoles_Test {
    
    @IsTest
    static void generateMockDataTest(){
        
        CNT_GroupNewProfileParentController.CNT_ServiceProfilingWrapper listaWrapper = CNT_GroupNewProfileParentController.generateMockData();
    }
    
    @isTest
    static void getServiceProfilingInfoTest() {
        CNT_GroupNewProfileParentController.CNT_ServiceProfilingWrapper listaWrapper = CNT_GroupNewProfileParentController.getServiceProfilingInfo();
    }
    
    @isTest
    static void encryptDataTest() {
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            DataFactory.getCustomSettingCryptoKey(true);
            String encryptData = CNT_GroupNewProfileParentController.encryptData('');
        }
    }
    
    @isTest
    static void decryptDataTest() {
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            DataFactory.getCustomSettingCryptoKey(true);
        String decryptData = CNT_GroupNewProfileParentController.decryptData(Global_Utilities.encryptData('test'));
        }
    }
}