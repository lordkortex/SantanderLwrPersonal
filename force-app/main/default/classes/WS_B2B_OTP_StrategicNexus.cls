global with sharing class WS_B2B_OTP_StrategicNexus {
    
    global static initiateOTP initiateOTP;
    
    global class initiateOTP {
        @AuraEnabled global String scaUid;
        @AuraEnabled global String scaSecret;
        global initiateOTP(){}
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
        global String aliasLocal;
        global String globalIdentity;
        
        global IdentifierType(){}
        
        global IdentifierType(User user){
            if(user != null){
                if(String.isNotBlank(user.USER_TXT_Signer_email__c)){
                    this.emailAddress= user.USER_TXT_Signer_email__c;
                }else{
                    if(String.isNotBlank(user.USER_TXT_GlobalId__c)){
                        this.globalIdentity = user.USER_TXT_GlobalId__c;
                    }else{
                        if(String.isNotBlank(user.Alias)){
                            this.aliasLocal = user.Alias;
                        }else{
                            this.documentId = new DocumentId();
                        }
                    }
                }
            }else{
                this.documentId = new DocumentId();
            }
        }        
    }
    
    //Initiate Body
    global class InputInitiateOTP {
        
        global IdentifierType userIdentification;
        global Object payload;
        global String configurationUid;
        
        global InputInitiateOTP(){}
        
        
        global InputInitiateOTP(String beneficiaryName, String beneficiaryAccount, String paymentId, String debitAmount, String fees, String exchangeRate, String paymentAmount){
            User user = Global_Utilities.getUserData('');
            if(user != null){
                this.userIdentification = new IdentifierType(user);
                String payload = '{"title":"{title}","subtitle":"{subtitle}","oob":false,"validationChannel":"apigee","{0Label}":"{0}","{1Label}":"{1}","{2Label}":"{2}","{3Label}":"{3}","{4Label}":"{4}","{5Label}":"{5}","{6Label}":"{6}","{7Label}":"{7}"}';
                payload = payload.replace('{0}', beneficiaryName);
                payload = payload.replace('{1}', beneficiaryAccount);
                payload = payload.replace('{2}', paymentId);
                
                if(String.isNotBlank(debitAmount)){
                    payload = payload.replace('{3}', debitAmount);
                    payload = payload.replace('{3Label}', System.Label.debitAmount);
                }else{
                    payload = payload.replace(',"{3Label}":"{3}"','');
                }
                
                if(String.isNotBlank(fees)){
                    payload = payload.replace('{4}', fees);
                	payload = payload.replace('{4Label}', System.Label.Fees);

                }else{
                    payload = payload.replace(',"{4Label}":"{4}"','');
                }
                if(String.isNotBlank(exchangeRate)){
                    payload = payload.replace('{5}', exchangeRate);
                	payload = payload.replace('{5Label}', System.Label.exchangeRate);
                }else{
                    payload = payload.replace(',"{5Label}":"{5}"','');
                }
                payload = payload.replace('{6}', paymentAmount);
                
                Datetime now = Datetime.now(); 
                Integer offset = UserInfo.getTimezone().getOffset(now); 
                Datetime local = now.addSeconds(offset/1000);
                String valueDate = local.format(user.User_DateFormat__c);
                
                payload = payload.replace('{7}', valueDate);
                
                payload = payload.replace('{title}', 'test');
                payload = payload.replace('{subtitle}', 'test');
                payload = payload.replace('{0Label}', System.Label.beneficiaryName);
                payload = payload.replace('{1Label}', System.Label.beneficiaryAccount);
                payload = payload.replace('{2Label}', System.Label.Payment_ID);
                payload = payload.replace('{6Label}', System.Label.paymentAmount);
                payload = payload.replace('{7Label}', System.Label.MovementHistory_ValueDate);
                
                this.payload = JSON.deserializeUntyped(payload);
                
                this.configurationUid = System.Label.configUid; 
            }
        }
    }
    
    
    global static void getOTP(String beneficiaryName, String beneficiaryAccount, String paymentId, String debitAmount, String fees, String exchangeRate, String paymentAmount ){
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTPIniciate_Strategic');
            String finalEndPoint = configWs.CNT_Endpoint__c;
            
            if (!Test.isRunningTest()) {
                InputInitiateOTP initBody = new InputInitiateOTP(beneficiaryName, beneficiaryAccount, paymentId, debitAmount, fees, exchangeRate, paymentAmount);
                
                TokenInformation tokenInformation = new TokenInformation('ALL', configWs.tokenPlatform__c, configWs.tokenUser__c);
                
                
                String res = Global_IntegrationWrapper.launchHTTP(JSON.serialize(initBody,true),finalEndPoint,configWs.CNT_HTTPMethod__c,null,null,null,30000, tokenInformation);
                initiateOTP = (initiateOTP) System.JSON.deserialize(res, initiateOTP.class);
            }else{
                
                String json = '{'+
                    '  \"identityInitiateScaRequest\": {'+
                    '  \"identifierType\": {'+
                    '    \"emailAddress\": \"jhonrham@brithis.com\",'+
                    '    \"documentId\": {'+
                    '      \"documentType\": \"national_ id_card\",'+
                    '      \"documentNumber\": \"3456789S\"'+
                    '    },'+
                    '    \"aliasIdentity\": \"mariagarrido123\",'+
                    '    \"globalIdentity\": \"34567897er\"'+
                    '  },'+
                    '  \"embeddedSystem\": \"OTP\",'+
                    '  \"payLoadOperationRequesting\": \"accounts_balances+00000000000001221+ Json ( \'Operación\' , \'Traspaso entre cuentas\', \'importe\' \'2300,00\'  \'Fecha Valor\' , \'2020-08-15\')\",'+
                    '  \"configUid\": \"ConfiUID_000000001\"'+
                    '}'+               
                    '}';        
                
                initiateOTP = (initiateOTP) System.JSON.deserialize(json, initiateOTP.class);
            }
            
        } catch (Exception e) {
            System.debug('initiateOTP_Strategic: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); 
        }
    }
}