@IsTest
public class CNT_ViewAuthorization_Test {
    
    @IsTest
    static void encryptDataTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            DataFactory.getCustomSettingCryptoKey(true);
            
            String data = CNT_ViewAuthorization.encryptData('test');
        }
        
    }
    
    @IsTest
    static void decryptDataTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            DataFactory.getCustomSettingCryptoKey(true);
            String data = CNT_ViewAuthorization.decryptData(Global_Utilities.encryptData('test'));
            
        }
    }
}