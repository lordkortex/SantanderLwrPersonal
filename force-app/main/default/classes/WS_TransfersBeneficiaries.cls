global with sharing class WS_TransfersBeneficiaries {

    global static WS_TransfersBeneficiaries.OUTPUT executeGet() {
        WS_TransfersBeneficiaries.OUTPUT res = null; 
        try {
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
            configWs = CNT_ApiConfiguration__c.getValues('WS_TransferBeneficiariesGet');
            String baseEndpoint = configWs.CNT_Endpoint__c;
            String baseMethod = configWs.CNT_HTTPMethod__c;
            String response = Global_IntegrationWrapper.launchHTTP(null, baseEndpoint, baseMethod);
            if (String.isNotBlank(response)) {
                system.debug('BH_ response ws_transfersBeneficiaries: '+ response);
                res = (WS_TransfersBeneficiaries.OUTPUT) JSON.deserialize(response, WS_TransfersBeneficiaries.OUTPUT.class);
                system.debug('BH_ deserialized response ws_transfersBeneficiaries: '+ res);
                system.debug('BH_ serialized res ws_transfersBeneficiaries: ' + JSON.serialize(res));
                throwPossiblesErrors(res.errors);
            } else {
                throw new CustomException('Error getting registered beneficiaries.');
            }
        } catch (Exception e) {
            System.debug('WS_TransfersBeneficiaries.execute: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return res;
    }

    global static WS_TransfersBeneficiaries.OUTPUT executePost(BeneficiaryData beneficiaryData) {
        WS_TransfersBeneficiaries.OUTPUT res = null;
        try {
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();
            configWs = CNT_ApiConfiguration__c.getValues('WS_TransferBeneficiariesPost');
            String baseEndpoint = configWs.CNT_Endpoint__c;
            String baseMethod = configWs.CNT_HTTPMethod__c;
            String inputJson = '';  
            if (beneficiaryData == null) {
                throw new CustomException('You must inform the beneficiary data.');
            } else {
                Map<String,String> extraHeaderParameters = new Map<String,String> ();
                extraHeaderParameters.put('Access-Channel', 'Web');
                inputJson = JSON.serialize(beneficiaryData, true);
                if (!Test.isRunningTest()) {
                    String response = Global_IntegrationWrapper.launchHTTP(inputJson, baseEndpoint, baseMethod);
                    res = (WS_TransfersBeneficiaries.OUTPUT) System.JSON.deserialize(response, WS_TransfersBeneficiaries.OUTPUT.class);
                    throwPossiblesErrors(res.errors);
                    if (res == null) {
                        throw new CustomException('Error creating new beneficiary.');
                    } 
                }
           }
        } catch (Exception e) {
            System.debug('WS_TransfersBeneficiaries.execute: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return res;
    }

    private static void throwPossiblesErrors (List<Error> errors) {
        if (errors != null && !errors.isEmpty()) {
            String msg = '';
            for (Error error : errors) {
                msg += error.description + '. ';
            }
            throw new CustomException(msg);
        }
    }
    
    global class OUTPUT {
        @AuraEnabled
        global List<BeneficiaryData> beneficiaryList {get;set;}
        @AuraEnabled
        global List<Error> errors {get;set;}
        
        global OUTPUT () {}
    }
    
    global class OutBeneficiaryList {
        @AuraEnabled
        global List<BeneficiaryData> beneficiaryData {get;set;}
        
        global OutBeneficiaryList () {}
    }

    global class BeneficiaryData {
        @AuraEnabled
        global String beneficiaryId {get;set;}
        @AuraEnabled
        global String beneficiaryName  {get;set;}
        @AuraEnabled
        global String name  {get;set;}
        @AuraEnabled
        global Account account {get;set;}
        @AuraEnabled
        global Bank bank {get;set;}
        @AuraEnabled
        global String residenceIndicator {get;set;}
        @AuraEnabled
        global String residenceCountry {get;set;}
        @AuraEnabled
        global String documentType {get;set;}
        @AuraEnabled
        global String documentNumber {get;set;}
        @AuraEnabled
        global Address address {get;set;}
        @AuraEnabled
        global String emailAddress {get;set;}
        @AuraEnabled
        global String phoneNumber {get;set;}
        @AuraEnabled
        global String alias {get;set;}
        @AuraEnabled
        global Boolean favorite {get;set;}
        @AuraEnabled
        global String visibility {get;set;}   
        @AuraEnabled
        global String companyGlobalId {get;set;} 
        @AuraEnabled
        global String lastUsedDate {get;set;}   
        
        global BeneficiaryData () {}
    }
    
    global class Account {
        @AuraEnabled
        global String accountIdType {get;set;}
        @AuraEnabled
        global String accountId {get;set;}
        @AuraEnabled
        global String accountType {get;set;}
        
        global Account () {}
    }
    
    global class Bank {
        @AuraEnabled
        global String bankId {get;set;}
        @AuraEnabled
        global String bankName {get;set;}
        @AuraEnabled
        global String bankAddress {get;set;}
        @AuraEnabled
        global String bankCountry {get;set;}
        @AuraEnabled
        global String bankIdType {get;set;}
        @AuraEnabled
        global String bankbranchId {get;set;}

        global Bank () {}
    }
    
    global class Address {
        @AuraEnabled
        global String addressType {get;set;}
        @AuraEnabled
        global String streetName {get;set;}
        @AuraEnabled
        global String streetBuildingIdentification {get;set;}
        @AuraEnabled
        global String postCodeIdentification {get;set;}
        @AuraEnabled
        global String townName {get;set;}
        @AuraEnabled
        global String state {get;set;}
        @AuraEnabled
        global String buildingName {get;set;}
        @AuraEnabled
        global String floor {get;set;}
        @AuraEnabled
        global String districtName {get;set;}
        @AuraEnabled
        global String regionIdentification {get;set;}
        @AuraEnabled
        global String countyIdentification {get;set;}
        @AuraEnabled
        global String postOfficeBox {get;set;}
        @AuraEnabled
        global String province {get;set;}
        @AuraEnabled
        global String department {get;set;}
        @AuraEnabled
        global String subDepartment {get;set;}
        @AuraEnabled
        global String location {get;set;}
        @AuraEnabled
        global String country {get;set;}
        @AuraEnabled
        global String addressAddition {get;set;}
        
        global Address () {}
    }

    global class Error {
        @AuraEnabled
        global String code {get;set;}
        @AuraEnabled
        global String message {get;set;}
        @AuraEnabled
        global String level {get;set;}
        @AuraEnabled
        global String description {get;set;}
        
        global Error () {}
    }
}