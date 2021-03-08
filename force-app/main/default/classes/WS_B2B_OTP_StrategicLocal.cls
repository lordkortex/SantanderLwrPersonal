/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 03-03-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   03-03-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
global with sharing class WS_B2B_OTP_StrategicLocal {
    global static initiateOTP initiateOTP;

    global class initiateOTP {
        @AuraEnabled global String signId;
        @AuraEnabled global String signatureMode;
        @AuraEnabled global String serviceId;
        @AuraEnabled global String operationId;
        @AuraEnabled global String localSigningUrl;
        @AuraEnabled global String executionId;

        global initiateOTP (){}
    }

    // Initiate Body
    global class InputInitiateOTP {
        global String signId;
        global String serviceId;
        global String operationId;
        global String language;

        global InputInitiateOTP (){}

        global InputInitiateOTP (String serviceId, String operationId) {
            this.signId = Global_Utilities.generateRandomNumber(12);
            this.serviceId = serviceId;
            this.operationId = operationId;
            User user = Global_Utilities.getUserData(userInfo.getUserId());
            if (user != null) {
                this.language = user.LanguageLocaleKey.replace('_', '-');
            }
        }
    }

    global static void getOTP (String country, String codigoBic, String serviceId, String operationId, String operationToken,  Map<String, String> navigatorInfo) {
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTPIniciateLocal_Strategic');
            String finalEndPoint = configWs.CNT_Endpoint__c;
            InputInitiateOTP initBody = new InputInitiateOTP(serviceId, operationId);
            Map<String, String> header = new Map<String, String>();
            Account userAccount = Global_Utilities.getAccountData(userInfo.getUserId());
            String documentType = '';
            String documentNumber = '';
            if (userAccount != null) {
                if (userAccount.ACC_TXT_DocumentType__c != null) {
                    documentType = userAccount.ACC_TXT_DocumentType__c;
                }
                if (userAccount.ACC_TXT_DocumentNumber__c != null) {
                    documentType = userAccount.ACC_TXT_DocumentNumber__c;
                }
            }
            header.put('Document-Type', documentType);
            header.put('Document-Number', documentNumber);
            header.put('Device-Info-Token', ServiceDeviceInfo.getDeviceInfo(navigatorInfo, configWs.CNT_HTTPMethod__c));
            header.put('Global-Payment-Id', operationId);
            header.put('Operation-Token', operationToken);
            TokenInformation tokenInformation = new TokenInformation(country, configWs.tokenPlatform__c, configWs.tokenUser__c, null, codigoBic);
            String res = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBody, true), finalEndPoint, configWs.CNT_HTTPMethod__c, header, null, null, 25000, tokenInformation);
            initiateOTP = (initiateOTP) System.JSON.deserialize(res, initiateOTP.class);
        } catch (Exception e) {
            System.debug('WS_B2B_OTP_StrategicLocal: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CustomException('WS_B2B_OTP_StrategicLocal: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}