/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    This class is the entry point when a user logs into the Community.
                Based on the user's permission, the access to the different screens
                on the Community will be different.
Test Class:     
History
<Date>			<Author>		    <Description>
20/02/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_LoginVisibilityManagerController {
    /*------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Returns the data from Mulesoft to the component
    History 
    <Date>          <Author>             <Change Description>
    20/02/2020		Guillermo Giral      Initial version
    ------------------------------------------------------------  
    @AuraEnabled
    public static String getUserSerializedJwtToken()
    {
        try {                        
            // Get current User context info
            //List<User> loggedUser = [SELECT Id, FederationIdentifier, USER_TXT_GlobalId__c FROM User WHERE Id := UserInfo.getUserId()];
            User loggedUser = [SELECT Id, FederationIdentifier, USER_TXT_GlobalId__c FROM User WHERE Id = '0051j000002sQ7ZAAU'][0];
            //if(!loggedUser.isEmpty()){
            if(loggedUser != null){
                // Get access token from the session cache
                //String accessToken = Cache.Org.get(loggedUser[0].USER_TXT_GlobalId__c);
                Map<String,String> jwtTokenMap = (Map<String,String>)Cache.Org.get('mapGlobalIdToJwtToken');
                System.debug('JWT token map:'  + jwtTokenMap);
                if(jwtTokenMap != null){
                    String serializedJwtToken = jwtTokenMap.get(loggedUser.USER_TXT_GlobalId__c);
                    System.debug('Serialized Jwt access token: ' + jwtTokenMap);
                    // TO-DO : check token expiration date
                    if(serializedJwtToken != null && serializedJwtToken != ''){
                        return serializedJwtToken;
                    }
                }
            }
            return null;
        } catch (Exception e) {
            System.debug('CNT_LoginVisibilityManagerController.getUserAccessToken: ' + e.getMessage());
			throw new customException(e.getMessage());
        }
    }*/


    /*------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Returns the data from Mulesoft to the component
    History 
    <Date>          <Author>             <Change Description>
    20/02/2020		Guillermo Giral      Initial version
    ------------------------------------------------------------    
    @AuraEnabled
    public static WRAPPER_Login getUserLoginData()
    {
        try {            
            String response = '';
            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetLoginInfo');
            String serializedJwtToken = getUserSerializedJwtToken();
            if(serializedJwtToken == null){
                response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
            } else {
                response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, serializedJwtToken);
            }

            if (String.isNotBlank(response)) {
                WRAPPER_Login loginData = WRAPPER_Login.parse(response);
                return loginData;
            } else {
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_LoginVisibilityManagerController.getUserLoginData: ' + e.getMessage());
			throw new customException(e.getMessage());
        }
    }*/
}