/*------------------------------------------------------------
Author:         Alberto Borraz
Company:        Deloitte
Description:	cmpOTVParentUsersLanding + cmpOTVTableUsersLanding + cmpOTVUserInfoPermissions + cmpOTVUserPermissionsBackfront + 
Test Class:		CNT_OTV_CompantDetail_Test
History 
<Date>          <Author>            <Change Description>
12/03/2021	    Alberto Borraz     Initial version
------------------------------------------------------------*/ 
public without sharing class CNT_OTV_UsersLanding {
    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        Deloitte
    Description:	Method to obtain a list of users from a mulesoft endpoint
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static List<WRAPPER_OTV_Info.userData> calloutGetUserList(String companyId) {
        String response = null;
        List<WRAPPER_OTV_Info.userData> lstUsers;
        try{
        	if(!Test.isRunningTest()){
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_OmnichannelServiceUsers_GET');
                String finalEndPoint = configWs.CNT_Endpoint__c;
                if(companyId == null){
                    Id userId = UserInfo.getUserId();
                    List<User> currentUser = [SELECT Id, 
                                                     ContactId,
                                                     Contact.AccountId
                                                FROM User 
                                               WHERE Id = :userId 
                                               LIMIT 1];
                    
                    if(!currentUser.isEmpty() && currentUser[0].ContactId != null){
                        finalEndPoint = finalEndpoint.replace('{companyId}', '1588401980');//currentUser[0].Contact.AccountId);
                        response = Global_IntegrationWrapper.launchHttp('1588401980', finalEndPoint, configWs.CNT_HTTPMethod__c);
                        System.debug('>>>>>>>' + response);
                        WRAPPER_UserList listExtracts = WRAPPER_UserList.parse(response);
                        System.debug('>>>>>>>' + listExtracts);
                        lstUsers = getLstUsers(listExtracts);
                    }
                }else{ 
                    String tokenPlatform = 'BBOO';
                    String tokenUser = 'GTS_GLOBAL';
                    TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
                    tokenInformation.mapClaims.txt_sub__c = 'SGPgtsfun211999';            
                    tokenInformation.mapClaims.TXT_realm__c = 'backOffice_user_global';
                    finalEndPoint = finalEndpoint.replace('{companyId}', companyId);
                    response = Global_IntegrationWrapper.launchHTTP(companyId, finalEndPoint,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
                    System.debug('>>>>>>>' + response);
                    WRAPPER_UserList listExtracts = WRAPPER_UserList.parse(response);
                    System.debug('>>>>>>>' + listExtracts);
                    lstUsers = getLstUsers(listExtracts);
                }
			}
        }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING calloutGetUserList');
        }
        return lstUsers;
    }
    
    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        Deloitte
    Description:	Method to obtain a list of users from a mulesoft endpoint
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/ 
 	@AuraEnabled
    public static List<WRAPPER_OTV_Info.userData> calloutGetUserList_BBO() {
        List<WRAPPER_OTV_Info.userData> lstUsers;
        try{
            if(!Test.isRunningTest()){
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_OmnichannelServiceUsers_GET');
                String finalEndPoint = configWs.CNT_Endpoint__c;
                finalEndPoint = finalEndpoint.replace('{companyId}', '1588401980');//acct.ACC_TXT_CompanyId__c);
                String response = Global_IntegrationWrapper.launchHttp('1588401980', finalEndPoint, configWs.CNT_HTTPMethod__c);
                System.debug('>>>>>>>' + response);
                WRAPPER_UserList listExtracts = WRAPPER_UserList.parse(response);
                lstUsers = getLstUsers(listExtracts);
            }          
        }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING calloutGetUserList_BBO');
        }
        return lstUsers;
    }    
    
    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        Deloitte
    Description:	Method to obtain a list of users from a mulesoft endpoint
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/ 
	@AuraEnabled
    public static List<WRAPPER_OTV_Info.userData> getLstUsers(WRAPPER_UserList wrapper_UserList) {
        String response = null;
        String url;
        List<String> colors = new List<String>{'blue','green','pink','lightpink','cream'}; 
        List<WRAPPER_OTV_Info.userData> lstUserData = new List<WRAPPER_OTV_Info.userData>();
        Map<String,WRAPPER_OTV_Info.userData> mapUserData = new Map<String,WRAPPER_OTV_Info.userData>();
        try{
            for(WRAPPER_UserList.UserService wrapperUser : wrapper_UserList.userList){ 
                WRAPPER_OTV_Info.userData user= new WRAPPER_OTV_Info.userData();
                if(wrapperUser.status == 'ACTIVE'){
                    user.active = true;
                }else{
                    user.active = false;
                }
                user.role = wrapperUser.serviceId;
                mapUserData.put(wrapperUser.userId,user);
            }
            if(mapUserData.size()>0){
                List<AccountContactRelation> lstAcctContactRelation=[SELECT ID,
                                                                     		PCK_Enrollment_Request__c,
                                                                            Contact.FirstName,
                                                                            Contact.LastName,
                                                                            Contact.Name,
                                                                            Contact.Phone,
                                                                            Contact.Email,
                                                                         	Contact.CONTACT_User__r.USER_TXT_GlobalId__c,
                                                                            Contact.CONTACT_User__r.LastLoginDate,
                                                                            Contact.CONTACT_Country__c,
                                                                     		Account.Name,
                                                                            AccountId
                                                                       FROM AccountContactRelation
                                                                      WHERE Contact.CONTACT_User__r.USER_TXT_GlobalId__c  IN :mapUserData.keyset()
                                                                        AND Contact.CONTACT_User__r.LastLoginDate != null];
                if(lstAcctContactRelation.size()>0){
                    for(AccountContactRelation acctContactRelation: lstAcctContactRelation){
                        Integer randomNumber = Integer.valueof((Math.random() * colors.size()));
                        WRAPPER_OTV_Info.userData acctContact = new WRAPPER_OTV_Info.userData();
                        acctContact.name 	  	= acctContactRelation.Contact.Name;
                        acctContact.firstName 	= acctContactRelation.Contact.FirstName;
                        acctContact.lastName  	= acctContactRelation.Contact.LastName;
                        acctContact.globalId  	= acctContactRelation.Contact.CONTACT_User__r.USER_TXT_GlobalId__c;
                        acctContact.lastLogin 	= acctContactRelation.Contact.CONTACT_User__r.LastLoginDate.format('dd/MM/yyyy');
                        acctContact.accountName = acctContactRelation.Account.Name;
                        acctContact.companyId 	= acctContactRelation.AccountId;
                        acctContact.position 	= ''; 
                        if(acctContactRelation.Contact.Phone!=null){
                            acctContact.phone 	= acctContactRelation.Contact.Phone;
                        }else{
                            acctContact.phone 	= '';
                        }
                        if(acctContactRelation.Contact.Email!=null && !acctContactRelation.Contact.Email.contains('@gtsinvalid.com')){
                            acctContact.email 	= acctContactRelation.Contact.Email;
                        }else{
                            acctContact.email 	= '';
                        }
                        if(mapUserData.containsKey(acctContactRelation.Contact.CONTACT_User__r.USER_TXT_GlobalId__c)){
                            acctContact.role 	= mapUserData.get(acctContactRelation.Contact.CONTACT_User__r.USER_TXT_GlobalId__c).role;
                            if(acctContact.role == 'one_trade_view_m_administrator'){
                                acctContact.admin = true;
                            }else{
                                acctContact.admin = false;
                            }
                            if(mapUserData.get(acctContactRelation.Contact.CONTACT_User__r.USER_TXT_GlobalId__c).active == true){
                                acctContact.active = true;
                                acctContact.color  = 'image ' + colors[randomNumber];
                            }else{
                                acctContact.active = false;
                                acctContact.color  = 'image gray';
                            }
                        }
                        Schema.DescribeFieldResult F = Account.Consent_Country__c.getDescribe();
                        Schema.sObjectField T = F.getSObjectField();  
                        List<PicklistEntry> picklistCountries = T.getDescribe().getPicklistValues();
                        StaticResource static_resource = [SELECT Id, SystemModStamp
                                                        	FROM StaticResource 
                                                       	   WHERE Name = 'Flags'
                                                       	   LIMIT 1];
                        for(PicklistEntry entry: picklistCountries){
                            WRAPPER_OTV_Info.CountryName country = new WRAPPER_OTV_Info.CountryName();
                            if(acctContactRelation.Contact.CONTACT_Country__c == null){
                                url = '/resource/'
                                           + String.valueOf(((DateTime)static_resource.get('SystemModStamp')).getTime())
                                           + '/Flags/Default.svg'; 
                                
                                acctContact.country = 'Default';
                                acctContact.countryURL = url;
                            }else if(entry.getValue() == acctContactRelation.Contact.CONTACT_Country__c){
                                url = '/resource/'
                                           + String.valueOf(((DateTime)static_resource.get('SystemModStamp')).getTime())
                                           + '/Flags/' 
                                           + entry.getValue() + '.svg';
                                acctContact.country = entry.getLabel();
                                acctContact.countryURL = url;
                            }
                        }
                        lstUserData.add(acctContact);
                    }
                }   
            }
        }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING getLstUsers');
        }
        return lstUserData;
    }

    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        Deloitte
    Description:	Method to obtain the static resource for each country
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
    @AuraEnabled
    public static List<WRAPPER_OTV_Info.CountryName> getLstCountriesUser (String jsonCountries) {
    	List<WRAPPER_OTV_Info.CountryName> listCountryNames = new List<WRAPPER_OTV_Info.CountryName>();
        Set<String> setCountries = new Set<String>();  
        try{
    		Map<String,String> mapCountries = (Map<String,String>) JSON.deserialize(jsonCountries, Map<String,String>.class);      
            for(String country: mapCountries.values()){
               if(String.isNotBlank(country)){
                    setCountries.add(country);
               }else{
                    setCountries.add('Default');
               }
            }
            Schema.DescribeFieldResult F = Account.Consent_Country__c.getDescribe();
            Schema.sObjectField T = F.getSObjectField();        
            List<PicklistEntry> picklistCountries = T.getDescribe().getPicklistValues();
            
            StaticResource static_resource = [SELECT Id, SystemModStamp
                                                FROM StaticResource 
                                               WHERE Name = 'Flags'
                                               LIMIT 1];
            for(PicklistEntry entry: picklistCountries){
                WRAPPER_OTV_Info.CountryName country = new WRAPPER_OTV_Info.CountryName();
                if(setCountries.size()>0 && setCountries.contains(entry.getValue())){
                    country.label = entry.getLabel();
                    country.value = entry.getValue();
                    country.isActive = false;
                    String url = '/resource/'
                               + String.valueOf(((DateTime)static_resource.get('SystemModStamp')).getTime())
                               + '/Flags/' 
                               + country.value + '.svg';
                    country.url = url;
                    listCountryNames.add(country);
                }
            }
            if(setCountries.contains('Default')){
                WRAPPER_OTV_Info.CountryName country = new WRAPPER_OTV_Info.CountryName();
                country.label = 'Default';
                country.value = 'Default';
                country.isActive = false;
                String url = '/resource/'
                           + String.valueOf(((DateTime)static_resource.get('SystemModStamp')).getTime())
                           + '/Flags/' 
                           + country.value + '.svg';
                country.url = url;
                listCountryNames.add(country);
            }
        }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING getLstCountriesUser');
        }   
        return listCountryNames;
    }    
    
	/*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:	Method to obtain a list of users accounts from a mulesoft endpoint
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
 	@AuraEnabled
    public static List<WRAPPER_AccountList_OTV.AccountAvailableService> calloutGetUserAccounts(String companyId, String userId) {
        String response;
        List<WRAPPER_AccountList_OTV.AccountAvailableService> lstAvailableAccounts = new List<WRAPPER_AccountList_OTV.AccountAvailableService>();
        List<WRAPPER_AccountList_OTV.AccountAvailableService> lst;
        try{
            WRAPPER_OTV_Info.userAccountsParameters uap = new WRAPPER_OTV_Info.userAccountsParameters();
            uap.companyId = companyId;
            uap.userId = userId;
            if(!Test.isRunningTest()){
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_OmnichannelServiceUserAccounts_GET');
                String finalEndPoint = configWs.CNT_Endpoint__c;
                finalEndPoint = finalEndpoint.replace('{company_id}', companyId);
                finalEndPoint = finalEndpoint.replace('{user_id}', userId);
                response = checkToken(JSON.Serialize(uap),finalEndPoint,configWs.CNT_HTTPMethod__c);               
                System.debug('>>>>>>>' + response);
                WRAPPER_AccountList_OTV listAvailableAccounts = WRAPPER_AccountList_OTV.parse(response);
                lst = listAvailableAccounts.availableAccountsList;
        	}
        }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING calloutGetUserAccounts');
        }
        return lst;
    }
    
    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:	Method to persist changes of user accounts
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
 	@AuraEnabled
    public static void calloutUpdateUserAccounts(String accountList,String userId, String serviceId,String companyId){
        String response;
        WRAPPER_AccountList_OTV.AccountAvailableService[] accountsList = (WRAPPER_AccountList_OTV.AccountAvailableService[]) JSON.deserialize(accountList, WRAPPER_AccountList_OTV.AccountAvailableService[].class);  
        try{
            if(!Test.isRunningTest()){
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_OmnichannelServiceUser_PATCH');
                String finalEndPoint = configWs.CNT_Endpoint__c; 
                for (WRAPPER_AccountList_OTV.AccountAvailableService act : accountsList) {
               
                    WRAPPER_OTV_Omnichannel.OmnichannelServiceUserData_PATCH osd = new WRAPPER_OTV_Omnichannel.OmnichannelServiceUserData_PATCH();
                    osd.status 		= act.status;
                    osd.startDate	= '16022021';
                    osd.endDate		= '16022021';
                    finalEndPoint 	= finalEndpoint.replace('{companyId}', companyId);
                    finalEndPoint 	= finalEndpoint.replace('{serviceId}', serviceId);
                    finalEndPoint 	= finalEndpoint.replace('{userId}', userId);
                    finalEndPoint 	= finalEndPoint + '?productType=account&contractId=' + act.accountId +  '&contractType=' + act.accountType + '&bankId=' + act.bankId + '&country=' + act.country;
                    response = checkToken(JSON.Serialize(osd),finalEndPoint,configWs.CNT_HTTPMethod__c);  
                    System.debug('>>>>>>>' + response);
                }
            }   
        }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING calloutUpdateUserAccounts');
        }   
    }
    
	/*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        
    Description:	Method to get a list of subsidiaries to compare with the original list
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz       Initial version
    ------------------------------------------------------------*/
 	@AuraEnabled
    public static List<WRAPPER_OTV_Info.Subsidiary> calloutGetAccountSubsidiaries(String lstAccounts) {
        Map<String,String> mapNameCountry = new Map<String,String>();
        List<WRAPPER_OTV_Info.Subsidiary> lstSubsidiaries = new List<WRAPPER_OTV_Info.Subsidiary>();
        try{
            WRAPPER_AccountList_OTV.AccountAvailableService[] accountsList = (WRAPPER_AccountList_OTV.AccountAvailableService[]) JSON.deserialize(lstAccounts, WRAPPER_AccountList_OTV.AccountAvailableService[].class);
            for(WRAPPER_AccountList_OTV.AccountAvailableService account: accountsList){
                if(!mapNameCountry.containsKey(account.companyName)){
                    mapNameCountry.put(account.companyName, account.country);
                }else if(mapNameCountry.containsKey(account.companyName) && mapNameCountry.get(account.companyName) != account.country){
                    mapNameCountry.put(account.companyName, account.country);
                }
            }
            for(String nameCountryKey : mapNameCountry.keySet()){
                WRAPPER_OTV_Info.Subsidiary sub = new WRAPPER_OTV_Info.Subsidiary();
                sub.companyName = nameCountryKey;
                sub.country = mapNameCountry.get(nameCountryKey);
                lstSubsidiaries.add(sub);
            }
        }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING calloutGetAccountSubsidiaries');
        }  
        return lstSubsidiaries;
    } 
    /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:	Method to persist changes of status user
    History 
    <Date>          <Author>            <Change Description>
    18/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
    @AuraEnabled
    public static void calloutUpdateUser(String userId, String serviceId, String companyId, Boolean statusButton){
        String response;
        try{
            if(!Test.isRunningTest()){
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_OmnichannelServiceUser_PATCH');
                String finalEndPoint = configWs.CNT_Endpoint__c;
                
                WRAPPER_OTV_Omnichannel.OmnichannelServiceUserData_PATCH osd = new WRAPPER_OTV_Omnichannel.OmnichannelServiceUserData_PATCH();        
                if(statusButton){
                    osd.status 	= 'ACTIVE';                 
                }else{
                    osd.status 	= 'INACTIVE'; 
                }                
                //osd.startDate 	= '16022021';
                //osd.endDate 	= '16022021';
                
                finalEndPoint = finalEndpoint.replace('{userId}', userId);
                finalEndPoint = finalEndpoint.replace('{serviceId}', serviceId);
                finalEndPoint = finalEndpoint.replace('{companyId}', '1588401980');//companyId
                finalEndPoint = finalEndPoint + '?productType=SERVICE';
                
                response = checkToken(JSON.Serialize(osd),finalEndPoint,configWs.CNT_HTTPMethod__c); 
                System.debug('>>>>>>>' + response);
            }    
        }catch(Exception e){
            throw new CustomException('ERROR RETRIEVING calloutUpdateUser');
        }
    }   
    
    
    public static String checkToken(String osd,String finalEndPoint, String method){
        String response;
        WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId());
        String gtsOperationsUserProfile = 'System Administrator';//System.Label.Profile_BackOffice_001;
        try{
            if (userData.profileName == gtsOperationsUserProfile) {
                String tokenPlatform = 'BBOO';
                String tokenUser = 'GTS_GLOBAL';
                TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
                tokenInformation.mapClaims.txt_sub__c = 'SGPgtsfun211999';            
                tokenInformation.mapClaims.TXT_realm__c = 'backOffice_user_global';
                response = Global_IntegrationWrapper.launchHTTP(osd, finalEndPoint,  method, null, null, null, 40000, tokenInformation);
            }else{
                response = Global_IntegrationWrapper.launchHttp(osd, finalEndPoint, method);
            }   
        }catch(Exception e){
           throw new CustomException('ERROR RETRIEVING checkToken');
        }  
        return response;
    }

    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:    Method to update a checkbox value in a welcome modal, if this value is true, the modal will not appear again.
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz        Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled 
    public static void updateCheckboxWelcomePack (Boolean selectedCheckbox){
        
        List<User> lstUser = new List<User>();
        Id userId = UserInfo.getUserId();
        
        try{
            lstUser = [SELECT Id, 
                       		  USER_CHK_OTV_welcomePack__c 
                        FROM User 
                       WHERE Id = :userId 
                       LIMIT 1];
            if(lstUser != null){
                lstUser[0].USER_CHK_OTV_welcomePack__c = selectedCheckbox;
            }
        } catch(Exception e ){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        update lstUser;
    }
    
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:    Method to get a checkbox value in a welcome modal, if this value is true, the modal will not appear again.
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz        Initial version
    ------------------------------------------------------------*/ 
	@AuraEnabled 
    public static Boolean getCheckboxWelcomePack(){
        List<User> lstUser = new List<User>();
        Id userId = UserInfo.getUserId();
        try{
            lstUser = [SELECT USER_CHK_OTV_welcomePack__c 
                         FROM User 
                        WHERE Id = :userId 
                        LIMIT 1];
            if(lstUser != null){
                if(lstUser[0].USER_CHK_OTV_welcomePack__c == true){
                    return true;
                }else{
                    return false;
                }
            }
        } catch(Exception e ){
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return  null;
    }

}