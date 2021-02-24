/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    WS class to handle the callout to the web service to get
                the details of a given payment
Test Class:     
History
<Date>			<Author>		      <Description>
23/07/2020      Guillermo Giral       Initial version
----------------------------------------------------------------------------------*/
global with sharing class WS_GetPaymentDetail {
    private WRAPPER_PaymentDetail result;

    private String baseEndpoint;
    private String baseMethod;

    private String paymentId;

    global WRAPPER_PaymentDetail getResult () {
        return this.result;
    }

    global WS_GetPaymentDetail (String paymentId) {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_GetPaymentDetail');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.paymentId = paymentId;
    }

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Executes the callout to the payment detail web service and
                    returns the parsed response
    History
    <Date>			<Author>		            <Description>
    23/07/2020		Guillermo Giral             Initial version
	02/12/2020		Candido						Adding users and token control
    */
    global WRAPPER_PaymentDetail execute () {
        String finalEndpoint = '';
        this.result = null;
        try {
            Map<String, String> extraHeaderParameters = new Map<String, String>();
            String B2B = System.Label.CNF_payment_productId_001;
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Global-Payment-Id', this.paymentId);
            finalEndpoint = baseEndpoint.replace('{paymentId}', this.paymentId);
            //finalEndpoint = finalEndpoint.replace('{productId}', B2B);
            //String response = Global_IntegrationWrapper.launchHTTP('', finalEndpoint, this.baseMethod, extraHeaderParameters);
            String response = null;
             WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId()); 
            String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
            String localBankUserProfile = System.Label.Profile_BackOffice_002;
            if (userData != null) {
                if (String.isNotBlank(userData.profileName)) {
                    if(userData.profileName != gtsOperationsUserProfile && userData.profileName != localBankUserProfile) {
                        response = Global_IntegrationWrapper.launchHTTP('', finalEndpoint, this.baseMethod, extraHeaderParameters);
                    } else {
                        String tokenPlatform = 'BBOO';
                        String tokenUser = '';
                        if (userData.profileName == gtsOperationsUserProfile) {
                         	tokenUser = 'GTS_GLOBAL';
                        } else if(userData.profileName == localBankUserProfile) {
                            tokenUser = 'GTS_LOB';
                        }
                        TokenInformation tokenInformation = new TokenInformation(userData.country, tokenPlatform, tokenUser, null, userData.bic);
                        response = Global_IntegrationWrapper.launchHTTP('', finalEndpoint,  this.baseMethod, extraHeaderParameters, null, null, 40000, tokenInformation);      
                    }
                } else {
                   response = null;
                }
            } else {
               response = null;
            }
            if (String.isNotBlank(response)) {
                WRAPPER_PaymentDetail output = WRAPPER_PaymentDetail.parse(response);  
                this.result = output;
            } else {
                throw new CustomException('Error when consulting the payment detail server');
            }
        } catch (Exception e) {
            System.debug('execute.WS_GetPaymentDetail: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return this.result;
    }
}