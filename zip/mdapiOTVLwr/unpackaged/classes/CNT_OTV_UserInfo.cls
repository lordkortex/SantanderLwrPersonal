/*------------------------------------------------------------
Author:         Alberto Borraz
Company:        Deloitte
Description:	User Information management
Test Class:		CNT_OTV_UserInfo_Test
History 
<Date>          <Author>            <Change Description>
12/03/2021	    Alberto Borraz     Initial version
------------------------------------------------------------*/ 
public class CNT_OTV_UserInfo {

    
    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:	Method to obtain user role
    History 
    <Date>          <Author>            <Change Description>
    11/03/2021	    Antonio Duarte      Initial version
    ------------------------------------------------------------*/
    @AuraEnabled
	public static Boolean isAdmin(){
        Boolean isAdmin = false;
        List<Account> acctList = new List<Account>();
        Id userId = UserInfo.getUserId();
        List<User> currentUser = [SELECT Id, ContactId FROM User WHERE Id = :userId LIMIT 1];
        
        if(!currentUser.isEmpty() && currentUser[0].ContactId != null){
            
            List<Contact> contactList = [SELECT Id, AccountId FROM Contact WHERE Id = :currentUser[0].ContactId LIMIT 1];
            
        	if(!contactList.isEmpty() && contactList[0].AccountId != null){
        		acctList = [SELECT Id, ACC_CHK_OTView_Admin__r.CONTACT_User__c, ACC_CHK_OTView_Admin__c, ACC_serviceActivationId__c FROM Account WHERE ACC_CHK_OTView_Admin__r.CONTACT_User__c = :contactList[0].Id LIMIT 1];
            }
        }
        return isAdmin;
    }
    
    
    /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:	Method to obtain user role
    History 
    <Date>          <Author>            <Change Description>
    11/03/2021	    Antonio Duarte      Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static String getUserRole(){
        String roleUser = '';
        try{
            User currentUser = [SELECT Id, USER_TXT_GlobalId__c, ContactId, Contact.Account.ACC_TXT_CompanyId__c FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
            //Prepare and execute callout
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_OmnichannelServiceUserServices_GET');
            String finalEndPoint = configWs.CNT_Endpoint__c;
            finalEndPoint = finalEndpoint.replace('{company_id}', currentUser.Contact.Account.ACC_TXT_CompanyId__c);
            finalEndPoint = finalEndpoint.replace('{user_id}', currentUser.USER_TXT_GlobalId__c);//'5431ac57-96e3-4d45-8a4c-2c92aea767b9');//
            String response = Global_IntegrationWrapper.launchHttp('', finalEndPoint , configWs.CNT_HTTPMethod__c);
            System.debug('getUserRole response>>>>>>>' + response);
            
            //Parse response
            WRAPPER_Services_OTV.ServiceOmnichannelUser serviceOmnichannelUser = WRAPPER_Services_OTV.parse(response);
            roleUser = serviceOmnichannelUser.role;
            
            //Update account admin in case of role Activator
            if(roleUser == 'Activator'){
                Map<String,String> flowParams = new Map<String,String>();
                flowParams.put('ContactId',currentUser.ContactId);
                new Flow.Interview.OTV_UpdateAccountAdmin(flowParams).start();
            }
        }catch(Exception e){
            System.debug('getUserRole exception: '+e);
            throw new CustomException(e);
        }
        
        return roleUser;
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
        String userCountry;
        try {
            Id userId = UserInfo.getUserId();
            List<User> currentUser = [SELECT USER_country__c 
                                        FROM User 
                                       WHERE Id = :userId 
                                       LIMIT 1];
            if(!currentUser.isEmpty()){
                userCountry = currentUser[0].USER_country__c;
            }
        } catch (Exception e) {
            throw new CustomException('ERROR RETRIEVING USER COUNTRY');
        }
        return userCountry;
    }
    
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:    Method to obtain a User Information neccesary
    History 
    <Date>          <Author>            <Change Description>
    18/03/2021	    Alberto Borraz       Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static WRAPPER_OTV_Info.userInfo getUserInfo(){
        Id userId = UserInfo.getUserId();
        WRAPPER_OTV_Info.userInfo user = new WRAPPER_OTV_Info.userInfo();
        try{
        	User userInformation = [SELECT Name,Email,Phone,Contact.Account.Name,Country,USER_country__c from user where id = :userId LIMIT 1]; 
            
            user.Name = userInformation.Name;
            user.Email = userInformation.Email;
            user.Phone = userInformation.Phone != null?userInformation.Phone:'';
            user.Company = userInformation.Contact?.Account?.Name;
            
            if(userInformation.Country == null){
                Schema.DescribeFieldResult F = Account.Consent_Country__c.getDescribe();
                Schema.sObjectField T = F.getSObjectField();        
                List<PicklistEntry> picklistCountries = T.getDescribe().getPicklistValues();
            	for(PicklistEntry entry: picklistCountries){
                	if(userInformation.USER_country__c == entry.getValue()){
                		user.Country = entry.getLabel();
                	}
            	}
            }else{
                user.Country = userInformation.USER_country__c;
            }
            

        }catch(Exception e){
            System.debug('CNT_OTV_NewCase.getCountriesList: ' + e.getMessage());
            throw new CustomException('error obtaining the list of all countries' + e.getMessage());
        }
        return user;
    }
}