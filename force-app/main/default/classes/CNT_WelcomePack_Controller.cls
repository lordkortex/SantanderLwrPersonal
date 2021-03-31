public class CNT_WelcomePack_Controller {
    
    @AuraEnabled 
    public static void updateCheckboxWelcomePack (Boolean selectedCheckbox){
        
        List<User> lstUser = new List<User>();
        Id userId = UserInfo.getUserId();
        
        try{
            lstUser = [SELECT Id, USER_CHK_welcomePack__c FROM User WHERE Id=:userId LIMIT 1];
            
            if(lstUser != null){
                lstUser[0].USER_CHK_welcomePack__c = selectedCheckbox;
            }
            
        } catch(Exception e ){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        
        update lstUser;
    }
}