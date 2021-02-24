public class CNT_TermsConditions_Controller {
	
    @AuraEnabled 
    public static void updateCheckboxTerms (Boolean selectedCheckbox){
        
        List<User> lstUser = new List<User>();
        Id userId = UserInfo.getUserId();
        
        try{
            lstUser = [SELECT Id, USER_CHK_TermsConditions__c, USER_FOR_TermsDate__c FROM User WHERE Id=:userId LIMIT 1];
            if(lstUser != null){
                lstUser[0].USER_CHK_TermsConditions__c = selectedCheckbox;
                lstUser[0].USER_FOR_TermsDate__c = system.now();
            }
            
        } catch(Exception e ){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        
        update lstUser;
    }

    @AuraEnabled
    public static String getBodyContent (String fileName){

        String body = '';
        
        try{
            StaticResource[] sr = [SELECT Id, Body FROM StaticResource WHERE Name = :fileName LIMIT 1];

            if(sr.size() > 0){
                body = sr[0].Body.toString();
            }
        } catch(Exception e){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }

        return body;
    }
}