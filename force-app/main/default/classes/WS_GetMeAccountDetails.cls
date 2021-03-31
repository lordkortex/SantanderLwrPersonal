/*
Author:         Andrea Martin
Company:        Deloitte
Description:    Allows applications to show the data Account Inquiry of Santander customers. Retrieve currents accounts basic data.
History:
<Date>          <Author>            <Description>
03/02/2021      Andrea Martin       Initial version
*/
global class WS_GetMeAccountDetails {

    private String baseEndpoint;
    private String baseMethod;
    private String tokenPlatform;
    private String tokenUser;
    private String userId;
    private String accountId;
    private String accountIdType;
    private String country;
    private String codigoBic;
    private String customerId;

    public WS_GetMeAccountDetails(String userId, String accountId, String accountIdType, String country, String codigoBic, String customerId) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_GetMeAccountDetails');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
        this.userId = userId;
        this.accountId = accountId;
        this.accountIdType = accountIdType;
        this.country = country;
        this.codigoBic = codigoBic;
        this.customerId = customerId;
    }

    public OUTPUT execute () {
        WS_GetMeAccountDetails.OUTPUT output;
        try {
            if (String.isNotBlank(accountId) && accountId != null) {
                this.baseEndpoint = this.baseEndpoint.replace('{account_id}', accountId);
            } else {
                throw new CustomException('Empty account Id');
            }
            if (String.isNotBlank(accountIdType)&& accountIdType != null) {
                this.baseEndpoint = this.baseEndpoint.replace('{accountIdType}', accountIdType);
            } else {
                throw new CustomException('Empty account id type');
            }
            if (String.isBlank(country)) {
                throw new CustomException('You need to inform the country.');
            }
            if (String.isBlank(codigoBic)) {
                throw new CustomException('You need to inform the codigoBic.');
            }
            if (String.isBlank(customerId)) {
                throw new CustomException('You need to inform the customerId.');
            }
            TokenInformation tokenInformation = new TokenInformation(country, tokenPlatform, tokenUser, null, codigoBic, null, null, null, null);
            String authenticationplatform = TokenService.getTokenPlatform(country);
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'web');
            extraHeaderParameters.put('authenticationplatform', authenticationplatform);
            Boolean xCompanySan = ServiceCustomLabels.checkCountryWithXCompanySan(country);
            if (xCompanySan == true) {
                if (String.isNotBlank(customerId)) {
                    extraHeaderParameters.put('X-Company-San', customerId);
                } else {
                    throw new CustomException('You need to inform the customerId.');
                }
            }
            String serviceResponse = Global_IntegrationWrapper.launchHTTP(null, this.baseEndpoint, this.baseMethod, extraHeaderParameters, null, null,  120000, tokenInformation);
            if (String.isNotBlank(serviceResponse)) {
                output = (WS_GetMeAccountDetails.OUTPUT) JSON.deserialize(serviceResponse, WS_GetMeAccountDetails.OUTPUT.class);
            } else {
                throw new CustomException('Error when consulting the accounts details.');
            }
            return output;
        }  catch (Exception e) {
            System.debug('WS_GetMeAccountDetails.execute: ' + e.getMessage() + ', ' + ' in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
    }

    global with sharing class OUTPUT {
        @AuraEnabled
        global WRAPPER_AccountDetailsResponse.AccountDetailsResponse accountDetailsResponse {get;set;}
        @AuraEnabled
        global List<Errors> errors {get;set;}

        global OUTPUT () {}
    }

    global with sharing class Errors {
        @AuraEnabled
        global String code {get;set;}
        @AuraEnabled
        global String message {get;set;}
        @AuraEnabled
        global String level {get;set;}
        @AuraEnabled
        global String description {get;set;}

        global Errors () {}
    }
}