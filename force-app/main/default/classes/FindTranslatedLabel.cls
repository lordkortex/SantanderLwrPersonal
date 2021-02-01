public with sharing class FindTranslatedLabel {

    @AuraEnabled(cacheable=true)
    public static String decryptData(String str){
        try{ 
            return Global_Utilities.decryptData(str);
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());} 
    }
}