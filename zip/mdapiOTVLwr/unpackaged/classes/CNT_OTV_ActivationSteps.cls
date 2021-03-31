/*----------------------------------------------------------------------------------
Author:         Alberto Borraz
Company:        Deloitte
Description:    cmpOTVActivationSteps apex controller
Test Class:     CNT_OTV_ActivationSteps_Test
History
<Date>          <Author>        	<Description>
19/03/2021      Alberto Borraz     	Initial version
----------------------------------------------------------------------------------*/
public class CNT_OTV_ActivationSteps {
    
    
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
        Boolean result = false;
        try{
            String matrixId = [SELECT Id, Contact.Account.ParentId FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1][0].Contact?.Account?.ParentId;
            if(matrixId != null){
                result = true;
            }
        }catch(Exception e){
            System.debug('CNT_OTVActivationSteps.isSubsidiaryProcess: ' + e.getMessage());
            throw new CustomException('Error getting the activation process');
        }
        return result;
    }
    
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to obtain user country
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/ 
	@AuraEnabled
    public static String getUserCountry(){
        return CNT_OTV_UserInfo.getUserCountry();
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
        String result;
        
        try{
            List<Contact> contactList = [SELECT Id, AccountId FROM Contact WHERE CONTACT_User__c = :UserInfo.getUserId() LIMIT 1];
            result = getEnrollmentValueByAccount(contactList[0].AccountId); 
        }catch(Exception e){
            system.debug(e);
            throw new CustomException('Error obtaining ACC_PCK_OTView_Enrollment picklist current value');
        }
        return result;
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
        String otviewEnrollmentValue;
        try{
            if(accountId != null){
                List<Account> accList = [SELECT Id, ACC_TXT_CompanyId__c, ACC_PCK_OTView_Enrollment__c FROM Account WHERE Id =:accountId LIMIT 1]; 
                if(!String.isEmpty(accList[0].ACC_PCK_OTView_Enrollment__c)){
                    otviewEnrollmentValue = accList[0].ACC_PCK_OTView_Enrollment__c;
                    System.debug('getEnrollmentValue: ' + otviewEnrollmentValue);
                }
            }
        }catch(Exception e){
            system.debug(e);
            throw new CustomException('Error obtaining ACC_PCK_OTView_Enrollment picklist current value of a company');
        }
        
        return otviewEnrollmentValue;         
    }
        
}