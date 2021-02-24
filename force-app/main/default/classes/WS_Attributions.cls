global with sharing class WS_Attributions {

    private String baseEndpoint;
    private String baseMethod;

    private String endPoint;
    private String endPointParameters;

    private WS_Attributions.OUTPUT response;

    public WS_Attributions.OUTPUT getResponse () {
        return this.response;
    }

    public WS_Attributions () {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();        
       	configWs = CNT_ApiConfiguration__c.getValues('WS_Attributions'); //07-09-2020 - SNJ - WS_Attributions Callout which retrieves the contracts and the services allowed over these contracts for a given user.
        this.baseEndpoint = configWs.CNT_Endpoint__c;
        this.baseMethod = configWs.CNT_HTTPMethod__c;
    }




    public WS_Attributions.OUTPUT execute (String business_group, String customer_id, List<String> service_id, List<String> contract_type_list, List<String> contract_id_list, String status) {
        this.response = null;
        try {
            this.endPointParameters = '';
            getParameters('business_group', business_group);
            getParameters('customer_id', customer_id);
            getParameters('service_id', getListToString(service_id)); 
            getParameters('contract_type_list', getListToString(contract_type_list));
            getParameters('contract_id_list', getListToString(contract_id_list));
            getParameters('status', status);

            if (String.isNotBlank(this.endPointParameters)) {
                this.endPoint = this.baseEndpoint + '?' + this.endPointParameters;
            } else {
                this.endPoint = this.baseEndpoint;
            }
            
           // Map<String,String> extraHeaderParameters = new Map<String,String> ();
          // extraHeaderParameters.put('Access-Channel', 'Web'); //Access-Channel 
           // extraHeaderParameters.put('Channel-Access-Agreement-Id', '004910015200000090');  channel-access-agreement-id
            system.debug('>>> SNJ : this.endPoint: ' +  this.endPoint);
            String result = Global_IntegrationWrapper.launchHTTP('', this.endPoint, this.baseMethod, null, 30000);//('', this.endPoint, this.baseMethod);  //07-09-2020 - SNJ - Comment out code 12000
            
            
            if (String.isNotBlank(result)) {
                this.response = (WS_Attributions.OUTPUT) JSON.deserialize(result, WS_Attributions.OUTPUT.class);
            } else {
                throw new CustomException('Error when consulting the attributions.');
            }
            
        } catch (Exception e) {
            System.debug('execute.WS_Attributions: ' + e.getMessage());
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
        global ServiceListResponse serviceListResponse {get;set;}

        global OUTPUT () {
            System.debug('WS_Attributions.OUTPUT');
        }
    }

    global with sharing class ServiceListResponse {

        @AuraEnabled
        global List<ServiceDataDetails> serviceDataList {get;set;}

        global ServiceListResponse () {
            System.debug('WS_Attributions.ServiceListResponse');
        }
    }

    global with sharing class ServiceDataDetails {
        
        @AuraEnabled
        global String serviceId {get;set;}
        @AuraEnabled
        global List<RelationList> relationList {get;set;}
        //SNJ - 05/10/2020
        @AuraEnabled 
        global String status {get;set;}

        global ServiceDataDetails () {
            System.debug('WS_Attributions.ServiceDataDetails');
        }
    }

    global with sharing class RelationList {

        @AuraEnabled
        global ContractDataDetails contractDataDetails {get;set;}
        @AuraEnabled
        global String status {get;set;}
        
        //SNJ - 05/10/2020
        @AuraEnabled
        global String contractType {get;set;} 
        @AuraEnabled
		global String contratId {get;set;} 
        @AuraEnabled
		global String operabilityIndicator {get;set;} 
        

        global RelationList () {
            System.debug('WS_Attributions.RelationList');
        }
    }

    global with sharing class ContractDataDetails {

        @AuraEnabled
        global String contractType {get;set;}
        @AuraEnabled
        global String contractId {get;set;}
        @AuraEnabled
        global String operativityIndicatorContract {get;set;}

        global ContractDataDetails () {
            System.debug('WS_Attributions.ContractDataDetails');
        }
    }
}