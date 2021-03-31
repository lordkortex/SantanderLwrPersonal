/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CMP_BackFrontPain002Table
Test Class:     CNT_BackFrontPain002Table_Test
History
<Date>          <Author>        <Description>
22/02/2020      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_BackFrontPain002Table {
    
    /*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Method to get the filtered data
History
<Date>          <Author>        <Description>
22/02/2020      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String getFilteredData(Boolean pain,String filters){
        
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontPain002TableGetPain');           
        
        String response = null;
        WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId()); 
        String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
        String localBankUserProfile = 'Local Support';
        if (userData != null) {
            if (String.isNotBlank(userData.profileName)) {
                if(userData.profileName != gtsOperationsUserProfile && userData.profileName != localBankUserProfile) {
                    response = Global_IntegrationWrapper.launchHttp(filters,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
                } else {
                    String tokenPlatform = 'BBOO';
                    String tokenUser = '';
                    if (userData.profileName == gtsOperationsUserProfile) {
                        tokenUser = 'GTS_GLOBAL';
                        TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
                        response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c + filters,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation); 
                    } else if(userData.profileName == localBankUserProfile) {
                        tokenUser = 'GTS_LOB';
                        TokenInformation tokenInformation = new TokenInformation(userData.country, tokenPlatform, tokenUser, null, userData.bic);
                        response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c + filters,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
                    }   
                }
            } else {
                response = null;
            }
        } else {
            response = null;
        } 
        try{       
            return response;
        } catch (Exception e) {throw new customException(e.getMessage());}
    }
    
    /*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Method to get the filtered data
History
<Date>          <Author>        <Description>
22/02/2020      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String getDeactivatedPain002(String filters){
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontPain002TableDeactivePain');
        String finalEndPoint = configWs.CNT_Endpoint__c.replace('{filters}',filters);
        String response = null;
        WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId()); 
        String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
        String localBankUserProfile = 'Local Support';
        if (userData != null) {
            if (String.isNotBlank(userData.profileName)) {				
                if(userData.profileName != gtsOperationsUserProfile && userData.profileName != localBankUserProfile) {
                    response = Global_IntegrationWrapper.launchHttp(filters,finalEndPoint,configWs.CNT_HTTPMethod__c);
                } else {
                    String tokenPlatform = 'BBOO';
                    String tokenUser = '';
                    if (userData.profileName == gtsOperationsUserProfile) {
                        tokenUser = 'GTS_GLOBAL';
                        TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
                        response = Global_IntegrationWrapper.launchHTTP(filters, finalEndPoint ,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation); 
                    } else if(userData.profileName == localBankUserProfile) {
                        tokenUser = 'GTS_LOB';
                        TokenInformation tokenInformation = new TokenInformation(userData.country, tokenPlatform, tokenUser, null, userData.bic);
                        response = Global_IntegrationWrapper.launchHTTP(filters, finalEndPoint ,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
                    }   
                }
            } else {
                response = null;
            }
        } else {
            response = null;
        } 
        try{
            
            return response;
        } catch (Exception e) {throw new customException(e.getMessage());}
    }
    
    /*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Method to get the filtered data
History
<Date>          <Author>        <Description>
22/02/2020      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String deletePain002Account(String account,String bic){
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontPain002TableDeletePain');
        String response = null;
        WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId()); 
        String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
        String localBankUserProfile = 'Local Support';
        if (userData != null) {
            if (String.isNotBlank(userData.profileName)) {				
                if(userData.profileName != gtsOperationsUserProfile && userData.profileName != localBankUserProfile) {
                    response = Global_IntegrationWrapper.launchHttp('',configWs.CNT_Endpoint__c.replace('{account}',account).replace('{bic}',bic) ,configWs.CNT_HTTPMethod__c);
                } else {
                    String tokenPlatform = 'BBOO';
                    String tokenUser = '';
                    if (userData.profileName == gtsOperationsUserProfile) {
                        tokenUser = 'GTS_GLOBAL';
                        TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
                        response = Global_IntegrationWrapper.launchHTTP('',configWs.CNT_Endpoint__c.replace('{account}',account).replace('{bic}',bic) ,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation); 
                    } else if(userData.profileName == localBankUserProfile) {
                        tokenUser = 'GTS_LOB';
                        TokenInformation tokenInformation = new TokenInformation(userData.country, tokenPlatform, tokenUser, null, userData.bic);
                        response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c.replace('{account}',account).replace('{bic}',bic) ,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
                    }   
                }
            } else {
                response = null;
            }
        } else {
            response = null;
        } 
        try{
            return response;
        } catch (Exception e) {throw new customException(e.getMessage());}
    }
    
    /*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Method to get the filtered data
History
<Date>          <Author>        <Description>
22/02/2020      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String activePain002(String body){
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontPain002TableActivePain');           
        String response = null;
        WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId()); 
        String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
        String localBankUserProfile = 'Local Support';
        if (userData != null) {
            if (String.isNotBlank(userData.profileName)) {				
                if(userData.profileName != gtsOperationsUserProfile && userData.profileName != localBankUserProfile) {
                    response = Global_IntegrationWrapper.launchHttp(body,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
                } else {
                    String tokenPlatform = 'BBOO';
                    String tokenUser = '';
                    if (userData.profileName == gtsOperationsUserProfile) {
                        tokenUser = 'GTS_GLOBAL';
                        TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
                        response = Global_IntegrationWrapper.launchHTTP(body, configWs.CNT_Endpoint__c ,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation); 
                    } else if(userData.profileName == localBankUserProfile) {
                        tokenUser = 'GTS_LOB';
                        TokenInformation tokenInformation = new TokenInformation(userData.country, tokenPlatform, tokenUser, null, userData.bic);
                        response = Global_IntegrationWrapper.launchHTTP(body, configWs.CNT_Endpoint__c ,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
                    }   
                }
            } else {
                response = null;
            }
        } else {
            response = null;
        } 
        try{
            return response;
        } catch (Exception e) {throw new customException(e.getMessage());}
    }
}