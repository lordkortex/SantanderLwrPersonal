/*----------------------------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:    cmpOTVRedirectionProcess apex controller
Test Class:     CNT_OTV_AdminSteps_Test
History
<Date>          <Author>        	<Description>
19/03/2021      Antonio Duarte     	Initial version
----------------------------------------------------------------------------------*/
public class CNT_OTV_AdminSteps {

    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:    Method to obtain if the user is the subsidiary activator.
    History 
    <Date>          <Author>            <Change Description>
    03/03/2021	    Antonio Duarte        Initial version
    ------------------------------------------------------------*/
    @AuraEnabled
    public static Boolean isSubsidiaryActivator(){
        Boolean isActivator = false;
        try{
            /*String role = CNT_OTV_UserInfo.getUserRole();
            if(role == 'activator'){
                isActivator = true;
            }*/
            User user = [SELECT Contact.PCK_UserRoleOTV__c FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
            if(user.Contact.PCK_UserRoleOTV__c == 'Activator'){
                isActivator = true;
            }
            //isActivator = [SELECT Id, Contact.CONTACT_CHK_Admin__c FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1][0]?.Contact?.CONTACT_CHK_Admin__c; local method - not webservice
        }catch(Exception e){
            System.debug('CNT_OTVActivationSteps.isSubsidiaryActivator: ' + e.getMessage());
            throw new CustomException('Error obtaining if the user is the subsidiary activator');
        }
        return isActivator;
    }
    
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
        return CNT_OTV_ActivationSteps.isSubsidiaryProcess();
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
}