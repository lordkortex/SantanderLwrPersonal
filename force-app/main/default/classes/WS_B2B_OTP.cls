global with sharing class WS_B2B_OTP {
    
    global static initiateOTP initiateOTP;
    global static validateOTP validateOTP;

    global class initiateOTP {

        @AuraEnabled global String scaUid;

        global initiateOTP(){}
    }
    
    //Init body
    global class AuthenticateRequest {
        global String embeddedSystem;
        global String serviceId;
        global String metaData;

        global AuthenticateRequest(){}
        
        global AuthenticateRequest(String embeddedSystem, String serviceId, String metaData){
            this.embeddedSystem = embeddedSystem;
            this.serviceId = serviceId;
            this.metaData = '{\'otp\':\''+metaData+'\'}';
        }
        
 
    }
    
    global class DocumentId {
        global String documentType;
        global String documentNumber;
        
        global DocumentId(){
            Account userAccount = Global_Utilities.getAccountData('');

            if(userAccount != null){
                this.documentType = userAccount.ACC_TXT_DocumentType__c;
                this.documentNumber = userAccount.ACC_TXT_DocumentNumber__c;
            }
        }
    }
    
    global class IdentifierType {
        global String emailAddress;
        global DocumentId documentId;
        global String aliasIdentity;
        global String phoneNumber;

        global IdentifierType(){
            this.documentId = new DocumentId();
            
            User user = Global_Utilities.getUserData('');
            if(user != null){
                this.emailAddress = user.Email;
                this.aliasIdentity = user.Alias;
                this.phoneNumber = user.MobilePhone;
            }
        }        
    }

    //Initiate Body
    global class InputInitiateOTP {
        global IdentifierType identifierType;
        global String embeddedSystem;
        
        global InputInitiateOTP(){
            this.identifierType = new IdentifierType();
            this.embeddedSystem = 'OTP';            
        }
        

    }

 
    global class validateOTP {
        @AuraEnabled global jwtValidate jwt;
        
        @AuraEnabled global String validateResult;
        @AuraEnabled global String codeAuthenticateResult;
        @AuraEnabled global String scaId;
        @AuraEnabled global String token;
        @AuraEnabled global String timestamp;

        global validateOTP(String jwt){
            
			String jwtUtil = jwt.split('\\.')[1];
            String decoded = EncodingUtil.base64Decode(jwtUtil).toString();
            this.jwt = (jwtValidate) System.JSON.deserialize(decoded, jwtValidate.class);
        }
        
        global validateOTP(){
        }
    }
    
    global class jwtValidate {
        
		@AuraEnabled global String jti;
        @AuraEnabled global String iat;
        @AuraEnabled global String status;
        @AuraEnabled global String scaUid; 
        @AuraEnabled global String config_uid;        
        
        
        global jwtValidate(){
        }

    }
    
    //Validate Body

    global class InputValidateOTP {
        global String scaUid;
        global String scaSecret;
        
        global InputValidateOTP(String scaUid, String scaSecret){
            this.scaUid = scaUid;
            this.scaSecret = scaSecret;
        }
        
        global InputValidateOTP(){}
        
    }
    

    global static void getOTP(String sourceCountry, String sourceBIC){
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTPInitiate');
            String finalEndPoint = configWs.CNT_Endpoint__c;
            
            if (!Test.isRunningTest()) {
                InputInitiateOTP initBody = new InputInitiateOTP();
                
               	//SNJ - 07/10/2020 - Token
                String tokenPlatform = configWs.tokenPlatform__c;
                String tokenUser = configWs.tokenUser__c;
                TokenInformation tokenInformation = new TokenInformation(sourceCountry, tokenPlatform, tokenUser, null, sourceBIC);
                String res = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBody,true), finalEndPoint, configWs.CNT_HTTPMethod__c, null, null, null, 30000, tokenInformation);
                //String res = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBody,true),finalEndPoint,configWs.CNT_HTTPMethod__c);
                
                /*String res = '{'+
                    '  \"authenticateResult\": \"ko\",'+
                    '  \"codeAuthenticateResult\": \"User_locked_revocation\",'+
                    '  \"scaId\": \"445389345904\",'+
                    '  \"metaData\": \"{\'otp\':\'3434\'}\"'+
                    '}';*/
                
                
                initiateOTP = (initiateOTP) System.JSON.deserialize(res, initiateOTP.class);
            }else{
                
                String json = '{'+
                    '  \"authenticateResult\": \"ko\",'+
                    '  \"codeAuthenticateResult\": \"User_locked_revocation\",'+
                    '  \"scaId\": \"445389345904\",'+
                    '  \"metaData\": \"{\'otp\':\'3434\'}\"'+
                    '}';
                
                initiateOTP = (initiateOTP) System.JSON.deserialize(json, initiateOTP.class);
            }
            
        } catch (Exception e) {
            System.debug('initiateOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());

            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); 
        }
    }
    
     global static void validateOTP(String paymentId, String metaData, String sourceCountry, String sourceBIC){
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTPValidate');
            String finalEndPoint = configWs.CNT_Endpoint__c;
            
            if (!Test.isRunningTest()) {

                
                String scaUid = obtainOTPId(paymentId);
                InputValidateOTP initBody = new InputValidateOTP(scaUid, metaData);

                                
                //SNJ - 07/10/2020 - Token               
                String tokenPlatform = configWs.tokenPlatform__c;
                String tokenUser = configWs.tokenUser__c;
                TokenInformation tokenInformation = new TokenInformation( sourceCountry, tokenPlatform, tokenUser, null, sourceBIC);
                String res = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBody,true), finalEndPoint, configWs.CNT_HTTPMethod__c, null, null, null, 30000, tokenInformation);
                //String res = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBody,true),finalEndPoint,configWs.CNT_HTTPMethod__c);
                /*String res = '{'+
                    '  \"validateResult\": \"ok\",'+
                    '  \"codeAuthenticateResult\": \"Document_not_found\",'+
                    '  \"scaId\": \"445389345904\",'+
                    '  \"token\": \"JhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJSaHNuYy1xZ3hDVWhFb2tyTjRyalhBT2F3TXhxLVFMOTFHUHNBX1B4SlBnIn0\",'+
                    '  \"timestamp\": \"2018-09-12-11.59.14.997581\"'+
                    '}';*/
                
                //validateOTP = new validateOTP(res);
                validateOTP = (validateOTP) System.JSON.deserialize(res, validateOTP.class);
            }else{
                
                String json = '{'+
                    '  \"validateResult\": \"ok\",'+
                    '  \"codeAuthenticateResult\": \"Document_not_found\",'+
                    '  \"scaId\": \"445389345904\",'+
                    '  \"token\": \"JhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJSaHNuYy1xZ3hDVWhFb2tyTjRyalhBT2F3TXhxLVFMOTFHUHNBX1B4SlBnIn0\",'+
                    '  \"timestamp\": \"2018-09-12-11.59.14.997581\"'+
                    '}';
                
                validateOTP = (validateOTP) System.JSON.deserialize(json, validateOTP.class);
            }
            
        } catch (Exception e) {

            System.debug('validateOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
			throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); 
        }
    }

    global static void storeOTPId(String otpId, String paymentID){
        try {
            List<SNG_Payment__c> signature = new List<SNG_Payment__c>([SELECT Id from SNG_Payment__c where SGN_TXT_IdPayment__c = :paymentID]);
            if(!signature.isEmpty()){ 

                String userID = Global_Utilities.getUserData('').USER_TXT_GlobalId__c;

                List<SGN_User__c> user = new List<SGN_User__c>([SELECT Id, SNG_OTP_ID__c,SGN_DATET_Completed__c,SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c from SGN_User__c  WHERE SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c= :PaymentID AND SGN_TXT_GlobalId__c = :userID]);

                if(!user.isEmpty()){
                    user[0].SNG_OTP_ID__c = otpId;
                    update user;   
                }
            }

            
        } catch (Exception e) {
            System.debug('initiateOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    global static String obtainOTPId (String paymentID) {
        try {
            List<SNG_Payment__c> signature = new List<SNG_Payment__c>([SELECT Id from SNG_Payment__c where SGN_TXT_IdPayment__c = :paymentID]);
            if(!signature.isEmpty()){ 
                String userID = Global_Utilities.getUserData('').USER_TXT_GlobalId__c;
                List<SGN_User__c> user = new List<SGN_User__c>([SELECT Id, SNG_OTP_ID__c,SGN_DATET_Completed__c,SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c from SGN_User__c  WHERE SGN_ELCK_RelatedSign__r.SGN_TXT_IdPayment__c= :PaymentID AND SGN_TXT_GlobalId__c = :userID]);
                if(!user.isEmpty()) {
                    return user[0].SNG_OTP_ID__c;
                }
            }
        } catch (Exception e) {
            System.debug('obtainOTPId: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return '';
    }

}