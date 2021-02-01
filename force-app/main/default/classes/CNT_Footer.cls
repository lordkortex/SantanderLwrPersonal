public class CNT_Footer {
	@AuraEnabled 
    public static Map<String, boolean> getIsCashNexus(){
        Map<String, boolean> userData = new Map <String, boolean>();
        
               try{
            Id userId = UserInfo.getUserId();
            User isCashNexus = [SELECT Id, USER_CHK_CashNexus__c, USER_CHK_TermsConditions__c, USER_TXT_BIC__c, LanguageLocaleKey FROM User WHERE Id =: userId LIMIT 1];

            System.debug('OOOOOOOOOOOOO    '+isCashNexus.USER_CHK_CashNexus__c+'   OOOOOOOOOOOOO');
            
            if(!userData.containsKey('isCashNexusUser')){ 
                if(isCashNexus.USER_CHK_CashNexus__c){
                    userData.put('isCashNexusUser', true); 
                }
                else{
                    userData.put('isCashNexusUser', false);
                    
                    if(!userData.containsKey('BIC')){ 
                        if(isCashNexus.USER_TXT_BIC__c != '') {
                            String bicCountry = isCashNexus.USER_TXT_BIC__c.substring(4, 6);
                            List<String> countries = new List<String>();
                            countries.add('GB');
                            countries.add('ES');
                            countries.add('BR');
                            countries.add('KY');
                            countries.add('LU');
                            countries.add('PL');
                            countries.add('CL');
                            countries.add('MX');
                            countries.add('PT');
                            
                            if(countries.contains(bicCountry)) {
                                userData.put('BIC', true);
                                if(bicCountry == 'GB'){ 
                                    userData.put('GB', true);
                                }
                                else if(bicCountry == 'ES'){
                                    userData.put('ES', true);
                                }
                                else if(bicCountry == 'BR' || bicCountry == 'KY' || bicCountry == 'LU'){
                                    userData.put('Other', true);
                                }
                                else if(bicCountry == 'CL'){
                                    userData.put('CL', true);
                                }
                                else if(bicCountry == 'MX'){
                                    userData.put('MX', true);
                                }
                                else if(bicCountry == 'PL'){
                                    userData.put('PL', true);
                                }
                                else if(bicCountry == 'PT'){
                                    userData.put('PT', true);
                                }
                            } else {
                                userData.put('BIC', false);
                            }
                        } else {
                            userData.put('BIC', false);
                        }              
                    }
                }                
            }

            if (isCashNexus.LanguageLocaleKey == 'pl') {
                userData.put('polish', true);
            }
        }
        catch(Exception e ){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
        
        return userData;
    }
    
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }
}