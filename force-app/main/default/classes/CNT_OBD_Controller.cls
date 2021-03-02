/*----------------------------------------------------------------------------------
Author:         Joaquin Vera Vallés
Company:        Deloitte
Description:    Class to be used as controller of the digital onboarding
Test Class:     CNT_OBD_Controller_Test
History
<Date>          <Author>        <Description>
04/02/2021      Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
public class CNT_OBD_Controller 
{
    
    public enum ErrorCode 
    {
        PARAMETRIC_NO_ACTIVE, NO_MANUAL_SELECTION, USER_HAS_NO_BIC, D, E, F, G, H, I
    }
    
    /*------------------------------------------------------------
Author:         Joaquin Vera Vallés	
Company:        Deloitte
Description:    controller method for onboarding
History 
<Date>          <Author>                <Change Description>
04/02/2021      Joaquín Vera Vallés     Initial version
------------------------------------------------------------*/  
    @AuraEnabled
    public static String isActiveOnboarding()
    {
        List<User> currentUser = [SELECT USER_TXT_BIC__c, USER_TXT_GlobalId__c from USER where Id =: UserInfo.getUserId() ];
        Entity_Parameter__mdt[] activeOBD;
        if(!currentUser.isEmpty() && currentUser.get(0).USER_TXT_BIC__c != null)
        {
            activeOBD = [SELECT Digital_Onboarding_enabled__c, Powered_User_required__c, Manual_Company_Selection_enabled__c FROM Entity_Parameter__mdt WHERE DeveloperName =: currentUser.get(0).USER_TXT_BIC__c  LIMIT 1];
        }
        else
        {
            handleErrors(ErrorCode.USER_HAS_NO_BIC);	
        }
        
        if(activeOBD!=null && !activeOBD.isEmpty())
        {
            if(activeOBD[0].Digital_Onboarding_enabled__c)
            {
                //Preparing query params for the http request
                String additionalQuery = '?active_only=true&customer_id='+currentUser.get(0).USER_TXT_GlobalId__c;
                
                //Calling to the web service
                HttpResponse channelAgreements = callService('CNT_OBD_ChannelAccessAgreements', '', null,additionalQuery);
                if(channelAgreements != null && channelAgreements.getStatusCode() == 200 && channelAgreements.getBody() != '')
                {
                    if(activeOBD[0].Manual_Company_Selection_enabled__c)
                    {
                        //Parse the data and calling the activate accounts Method
                        //TODO After HAPPY --> change to account selection
                        WRAPPER_ChannelAccessAgreement response;                            
                        if(Test.isRunningTest()){
                            response = WRAPPER_ChannelAccessAgreement.parse(MockResponse.WRAPPER_ChannelAccessAgreement());
                        }else{
                            response = WRAPPER_ChannelAccessAgreement.parse(channelAgreements.getBody());
                        }
                        
                        
                        activateAccounts(response, activeOBD[0]);
                        
                    }
                    else
                    {
                        handleErrors(ErrorCode.NO_MANUAL_SELECTION);
                    }
                }
            }
            else
            {
                handleErrors(ErrorCode.PARAMETRIC_NO_ACTIVE);
            }
        }
        return 'SUCCESS';
    }
    
   /*------------------------------------------------------------
Author:         Joaquin Vera Vallés	
Company:        Deloitte
Description:    controller method for activating accounts and persistance in salesforce
History 
<Date>          <Author>                <Change Description>
04/02/2021      Joaquín Vera Vallés     Initial version
------------------------------------------------------------*/  
    @AuraEnabled
    public static String activateAccounts(WRAPPER_ChannelAccessAgreement agreementsResponse, Entity_Parameter__mdt entityParameter)
    {
        Id contactId = [SELECT ContactId from User where Id = : UserInfo.getUserId() LIMIT 1].ContactId;
        Map<String,String> headerParams;
        Map<WRAPPER_ChannelAccessAgreement.AgreementsDataDetails, WRAPPER_ApiIdentify> mapIdentify = new Map<WRAPPER_ChannelAccessAgreement.AgreementsDataDetails, WRAPPER_ApiIdentify>();

        HttpResponse accountDetail;
        List<Id> listResponseAccId = new List<Id>();
        
        for(WRAPPER_ChannelAccessAgreement.AgreementsList agreement : agreementsResponse.agreementsListResponse.agreementsList)
        {
            //TODO GET THE MAPPING FIELD

            headerParams = new Map<String,String>();
            
            headerParams.put('Document-Type', agreement.agreementsDataDetails.documentId.documentType);
            headerParams.put('Document-Number', agreement.agreementsDataDetails.documentId.documentNumber);
            
            accountDetail = callService('CNT_OBD_Identify', '', headerParams,'');
            
            if(accountDetail.getStatusCode() == 200)
            {
                WRAPPER_ApiIdentify identifyParsed;
                if(Test.isRunningTest()){
                    identifyParsed = WRAPPER_ApiIdentify.parse(MockResponse.WRAPPER_ApiIdentify());
                }else{
                    identifyParsed = WRAPPER_ApiIdentify.parse(accountDetail.getBody());
                }              
                
                if(identifyParsed != null && identifyParsed.companyData != null && identifyParsed.companyData.companyGlobalId != null)
                {
                    listResponseAccId.add(identifyParsed.companyData.companyGlobalId);
                }
                mapIdentify.put(agreement.agreementsDataDetails, identifyParsed);
            }
            else
            {
                //TODO IDENTIFY ERROR HANDLE
            }
            
        }  
		
        //Getting the accounts from Salesforce     TODO GET THE MAPPING FIELD
        List<Account> accountList = [SELECT ACC_TXT_CompanyId__c FROM Account WHERE ACC_TXT_CompanyId__c IN :listResponseAccId];
		        
        //Iterating the map of responses
        
        for(WRAPPER_ChannelAccessAgreement.AgreementsDataDetails channelAccessResp : mapIdentify.keySet())
        {
            WRAPPER_ApiIdentify correspondingIdentify = mapIdentify.get(channelAccessResp);
            Boolean accIsInSF = false;

            //Mapping the globalId from Salesforce accounts with the globalId of the company received from the service
			for(Account acc : accountList)
            {
                if(acc.ACC_TXT_CompanyId__c == correspondingIdentify.companyData.companyGlobalId)
                {
                 	accIsInSF = true;   
                    //TODO If the account is in sf -- Update without checking if powered.

                }
            }
                
                if(!accIsInSF)
                {
                    //TODO If the account is not in sf -Check if powered user (parametric), obtain if powered user(API CUSTOMER LINKS) -- update
                    if(entityParameter.Powered_User_required__c)
                    {
						Map<String,String> calloutParams = new Map<String,String>();                       
                        headerParams.put('Document-Type', channelAccessResp.documentId.documentType);
            			headerParams.put('Document-Number', channelAccessResp.documentId.documentNumber);
						HttpResponse responseCustomerLinks = callService('CNT_OBD_CustomerLinks', '', calloutParams, '?relationship_group_type=legal_relationship&status_relations=active');
                        
                        if(responseCustomerLinks.getStatusCode() == 200)
                        {
                           //USER IS AUTHORIZED TO ONBOARD THE ACCOUNT - call api to get company global Id
                           HttpResponse responsePersistCompany = callService('CNT_OBD_PersistCompany', JSON.serialize(correspondingIdentify), new Map<String,String>(),'');
                            if(responsePersistCompany.getStatusCode() == 200)
                            {
                                WRAPPER_PersistCompany persistCompanyParsed;
                                if(Test.isRunningTest()){
                                    persistCompanyParsed = WRAPPER_PersistCompany.parse(MockResponse.WRAPPER_PersistCompany());
                                }else{
                                    persistCompanyParsed = WRAPPER_PersistCompany.parse(responsePersistCompany.getBody());
                                }
                                
                                
                           		createAccount(correspondingIdentify, persistCompanyParsed.companyGlobalId, contactId);
                            }                        
                        }
                        else
                        {
                          //TODO HANDLE ERROR    
                        }
                            
                    }
                    else
                    {
                        //TODO UPDATE THE DATA IN SALESFORCE
                    }
                }
            
        } 
        return 'SUCCESS';
    }
    
    /*------------------------------------------------------------
Author:         Joaquin Vera Vallés	
Company:        Deloitte
Description:    Creates the account and maps the data
History 
<Date>          <Author>                <Change Description>
04/02/2021      Joaquín Vera Vallés     Initial version
------------------------------------------------------------*/      
public static void createAccount(WRAPPER_ApiIdentify identify, String globalId, Id userContactId)
{
    Account acc = new Account();
    acc.Name = identify.companyData.companyName;    
    acc.ACC_TXT_BIC__c = identify.companyData.companyBank.bic;
    //acc.ACC_TXT_CompanyId__c = identify.companyData.companyGlobalId;
    acc.ACC_TXT_CompanyId__c = globalId;
    acc.ACC_TXT_SegmentTypeLocal__c = identify.companyData.localSegment.segmentCode;
    acc.ACC_TXT_SegmentLocal__c = identify.companyData.localSegment.segmentDescription;
    insert acc;
    
    AccountContactRelation relation = new AccountContactRelation();
    relation.AccountId = acc.Id;
    relation.ContactId = userContactId;
    insert relation;
}
    
    
    /*------------------------------------------------------------
Author:         Joaquin Vera Vallés	
Company:        Deloitte
Description:    Calling services for onboarding.
History 
<Date>          <Author>                <Change Description>
04/02/2021      Joaquín Vera Vallés     Initial version
------------------------------------------------------------*/  
    public static HttpResponse callService (String customSettingKey, String body, Map<String,String> additionalParams, String additionalQuery) 
    {  
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();     
        configWs = CNT_ApiConfiguration__c.getValues(customSettingKey);
        System.debug('Llama a : ' +  configWs.CNT_Endpoint__c + additionalQuery);
        HttpResponse res = Global_IntegrationWrapper.launchHTTPWithResponse(body, configWs.CNT_Endpoint__c + additionalQuery, configWs.CNT_HTTPMethod__c, 
                                                                            additionalParams, UserInfo.getUserId(), 
                                                                            true, null);
        
        return res;
    }
    
        /*------------------------------------------------------------
Author:         Joaquin Vera Vallés	
Company:        Deloitte
Description:    Updates final contact and user on end of the obd
History 
<Date>          <Author>                <Change Description>
04/02/2021      Joaquín Vera Vallés     Initial version
------------------------------------------------------------*/ 
    @AuraEnabled
    public static String endObd()
    {
		List<User> actualUser = [SELECT Id, ContactId, USER_CHK_Digital_Onboarding_running__c,USER_CHK_Digital_Onboarding_enabled__c,  Name FROM User WHERE Id = :UserInfo.getUserId()];
		if(!actualUser.isEmpty())        
        {
            actualUser.get(0).USER_CHK_Digital_Onboarding_running__c = false;
            update actualUser;
        }
        return 'SUCCESS';
    }
    
    
    /*------------------------------------------------------------
Author:         Joaquin Vera Vallés	
Company:        Deloitte
Description:    controller method for handling errors.
History 
<Date>          <Author>                <Change Description>
04/02/2021      Joaquín Vera Vallés     Initial version
------------------------------------------------------------*/  
    public static void handleErrors(ErrorCode errorCode)
    {
        //TODO ON ERROR CALL SERVICE
    }
    
}