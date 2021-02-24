@isTest
public class CNT_UserSettings_Test {
	
    @isTest
    static void getUserSettingsTest(){
        
        Map<String,String> data = CNT_UserSettingsController.getUserSettings();
    }
    
    @isTest
    static void getPicklistValuesTest(){
        
       String data = CNT_UserSettingsController.getPicklistValues();
    }
    
    @isTest
    static void saveDataTest(){
        
       Map<String,String> temp = CNT_UserSettingsController.getUserSettings();
       boolean data = CNT_UserSettingsController.saveData(temp);
    }
}