/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Retrieves the services a customer has with the bank, based on their channel access agreement.
Test Class:     TBD
History
<Date>			<Author>		<Description>
18/11/2020		Julian Hoyos    Initial version (based on WS_CreatePaymentOperation)
----------------------------------------------------------------------------------*/
global with sharing class WS_ChannelServices {

    private String baseEndpoint;
    private String baseMethod;
    private String tokenPlatform;
    private String tokenUser;

    private String endPoint;
    private String endPointParameters;

    private WS_ChannelServices.OUTPUT response;

    public WS_ChannelServices.OUTPUT getResponse () {
        return this.response;
    }

    public WS_ChannelServices () {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
        configWs = CNT_ApiConfiguration__c.getValues('WS_ChannelServices');
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
        this.tokenPlatform = configWs.tokenPlatform__c;
        this.tokenUser = configWs.tokenUser__c;
    }

    public WS_ChannelServices.OUTPUT execute (String business_group, String customer_id, List<String> service_id, List<String> contract_type_list, List<String> contract_id_list, String status, String channelAccessAgreementId) {
        return execute (business_group, customer_id, service_id, contract_type_list, contract_id_list, status, channelAccessAgreementId, null, null);
    }

    public WS_ChannelServices.OUTPUT execute (String business_group, String customer_id, List<String> service_id, List<String> contract_type_list, List<String> contract_id_list, String status, String channelAccessAgreementId, String country, String codigoBic) {
        this.response = null;
        try {
            this.endPointParameters = '';
            getParameters('business_group', business_group);
          	getParameters('customer_id', customer_id);
            getParameters('service_id', getListToString(service_id));
            getParameters('contract_type_list', getListToString(contract_type_list));
            getParameters('contract_id_list', getListToString(contract_id_list));
            getParameters('status', status);
            getParameters('_expand', 'contracts');
            if (String.isNotBlank(this.endPointParameters)) {
                this.endPoint = this.baseEndpoint + '?' + this.endPointParameters;
            } else {
                this.endPoint = this.baseEndpoint;
            }
            Map<String,String> extraHeaderParameters = new Map<String,String> ();
            extraHeaderParameters.put('Access-Channel', 'Web');
            extraHeaderParameters.put('Channel-Access-Agreement-Id', channelAccessAgreementId);
            TokenInformation tokenInformation = null;
            if (String.isNotBlank(country) && String.isNotBlank(codigoBic)) {
                tokenInformation = new TokenInformation(country, this.tokenPlatform, this.tokenUser, null, codigoBic);
            }
            String result = Global_IntegrationWrapper.launchHTTP('', this.endPoint, this.baseMethod, extraHeaderParameters, null, null, 30000, tokenInformation);
            if (String.isNotBlank(result)) {
                this.response = (WS_ChannelServices.OUTPUT) JSON.deserialize(result, WS_ChannelServices.OUTPUT.class);
            } else {
                throw new CustomException('Error when consulting the attributions.');
            }
        } catch (Exception e) {
            System.debug('execute.WS_ChannelServices: ' + e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return response;
    }

    private String getListToString (List<String> listToString) {
        String res = '';
        if (listToString != null) {
            for (String aux : ListToString) {
                if (String.isNotBlank(aux)) {
                    res = res + aux + ',';
                }
            }
            if (String.isNotBlank(res) && res.substring(res.length() - 1, res.length()) == ',') {
                res = res.substring(0, res.length() - 1);
            }
        }
        return res;
    }

    private String getParameters (String fieldName, String field) {
        if (String.isNotBlank(fieldName) && String.isNotBlank(field)) {
            if (String.isNotBlank(this.endPointParameters) && this.endPointParameters.substring(this.endPointParameters.length() - 1, this.endPointParameters.length()) != '&') {
                this.endPointParameters = this.endPointParameters + '&';
            }
            this.endPointParameters = this.endPointParameters + fieldName + '=' + field;
        }
        return this.endPointParameters;
    }

    global with sharing class OUTPUT {
        @AuraEnabled
        global List<ServicesDataList> servicesDataList {get;set;}

        global OUTPUT (){}
    }

    global class ServicesDataList {
        @AuraEnabled
        global String serviceId {get;set;}
        @AuraEnabled
        global List<ContractsList> contractsList {get;set;}
        
        global ServicesDataList (){}
    }

    global class ContractsList {
        @AuraEnabled
        global String contractId {get;set;}
        @AuraEnabled
        global String operativityIndicatorContract {get;set;}
        @AuraEnabled
        global String contractType {get;set;}

        global ContractsList (){}
    }

}