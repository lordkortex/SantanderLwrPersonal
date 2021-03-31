public class CNT_OTVActivationSteps {
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:    Method to obtain if the activation process belong to matrix or subsidiary company.
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz        Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static Boolean isSubsidiaryProcess(){
        try{
            Id userId = UserInfo.getUserId();
            List<User> currentUser = [SELECT Id, 
                                      		 ContactId 
                                        FROM User 
                                       WHERE Id = :userId 
                                       LIMIT 1];
            if(!currentUser.isEmpty() && currentUser[0].ContactId != null){
                List<Contact> contactList = [SELECT Id, 
                                             		AccountId 
                                               FROM Contact 
                                              WHERE Id = :currentUser[0].ContactId 
                                              LIMIT 1];
                 
                if(!contactList.isEmpty() && contactList[0].AccountId != null){
                	List<Account> accList = [SELECT Id, 
                                             	    ParentId 
                                               FROM Account 
                                              WHERE Id = :contactList[0].AccountId];
                    
                    if(!accList.isEmpty() && accList[0].ParentId != null){
                        return true; //ES SUBSIDIARIA
                    }else{
                        return false; //ES MATRIZ
                    }
                }
            }
            return false;
        }catch(Exception e){
            System.debug('CNT_OTVActivationSteps.isSubsidiaryProcess: ' + e.getMessage());
        }
        return false;
    }
    
    
    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Method to obtain ACC_PCK_OTView_Enrollment picklist current value.
    History 
    <Date>          <Author>            <Change Description>
    18/02/2021	    Antonio Matachana        Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static String getEnrollmentValue(){  
        Id userId = UserInfo.getUserId(); 
        System.debug('getEnrollmentValue userId: ' + userId);
        try{
            if(userId != null ){
                List<Contact> contactList = [SELECT Id, AccountId FROM Contact WHERE CONTACT_User__c = :userId LIMIT 1];
                return getEnrollmentValueByAccount(contactList[0].AccountId); 
            }
            return null;
        }catch(Exception e){
            system.debug(e);
            return null;
        }
    }
    
    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Method to obtain ACC_PCK_OTView_Enrollment picklist current value of a company.
    History 
    <Date>          <Author>            <Change Description>
    18/02/2021	    Antonio Matachana        Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static String getEnrollmentValueByAccount(Id accountId){
        String otviewEnrollmentValue = '';
       
        if(accountId != null){
            List<Account> accList = [SELECT Id, ACC_TXT_CompanyId__c, ACC_PCK_OTView_Enrollment__c FROM Account WHERE Id =:accountId LIMIT 1]; 
            if(!String.isEmpty(accList[0].ACC_PCK_OTView_Enrollment__c)){
                otviewEnrollmentValue = accList[0].ACC_PCK_OTView_Enrollment__c;
                System.debug('getEnrollmentValue: ' + otviewEnrollmentValue);
                return otviewEnrollmentValue;
            }
        }
        return null;         
    }
    
}