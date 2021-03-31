global class CNT_B2B_SignatureUtilitiesLocal {
    
    
    global class SourceAccount {
        @AuraEnabled
        global String accountIdType {get;set;}
        @AuraEnabled
        global String accountId {get;set;}
        /*@AuraEnabled
global String tcurrency {get;set;}*/
        
        global SourceAccount(){
        }
        
        global SourceAccount(WRAPPER_AccountList.AccountDetails sourceAccount){
            this.accountIdType = sourceAccount.idType;
            this.accountId = sourceAccount.displayNumber;
            //this.tcurrency = sourceAccount.currencyCodeAvailableBalance;
        }
    }
    
    global class SourceAgent {
        @AuraEnabled
        global String agent {get;set;}
        @AuraEnabled
        global String agentName {get;set;} 
        @AuraEnabled
        global String addressAgent {get;set;}
        
        global SourceAgent(){
        }
        
        global SourceAgent(WRAPPER_AccountList.AccountDetails sourceAccount){
            this.agent = sourceAccount.codigoBic;
            this.agentName = sourceAccount.bankName;
            this.addressAgent = sourceAccount.country;
        }
    }
    
    global class PaymentAmount {
        @AuraEnabled
        global String tcurrency {get;set;}
        @AuraEnabled
        global Double amount {get;set;}
        
        global PaymentAmount () {
        }
        
        global PaymentAmount (WRAPPER_B2B_Data.PaymentAmount amount, WRAPPER_AccountList.AccountDetails sourceAccount){
            this.tcurrency = sourceAccount.currencyCodeAvailableBalance;
            this.amount = amount.amountSend;
        }
        global PaymentAmount (Double amount, String tcurrency) {
            this.amount = amount;
            this.tcurrency = tcurrency;
        }
    }
    
    
    global class Data_Payment{
        @AuraEnabled
        global String idempotentReference {get;set;}
        @AuraEnabled
        global String countryDestinationFunds {get;set;}
        @AuraEnabled
        global String sourceName {get;set;}
        @AuraEnabled
        global SourceAccount sourceAccount {get;set;}
        /*@AuraEnabled
        global SourceAgent sourceAgent {get;set;}*/
        @AuraEnabled
        global SourceAccount destinationAccount {get;set;}
        @AuraEnabled
        global SourceAgent destinationAgent {get;set;}
        @AuraEnabled
        global PaymentAmount paymentAmount {get;set;}
        @AuraEnabled
        global String subject {get;set;}
        @AuraEnabled
        global String transactionDate {get;set;}
        @AuraEnabled
        global String destinationName {get;set;}
        global Data_Payment () {}
        
        global Data_Payment (WRAPPER_PAY_PaymentDraft paymentDraft,String subject) {
            this.idempotentReference = paymentDraft.paymentId;
            this.countryDestinationFunds = paymentDraft.destinationAccount.country;
            this.sourceName = paymentDraft.sourceAccount.alias;
            this.sourceAccount = new SourceAccount(paymentDraft.sourceAccount);
            //this.sourceAgent = new SourceAgent(paymentDraft.sourceAccount);
            this.destinationAccount = new SourceAccount(paymentDraft.destinationAccount);
            this.destinationAgent = new SourceAgent(paymentDraft.destinationAccount);
            this.destinationName = paymentDraft.destinationAccount.bankName;

            this.paymentAmount = new PaymentAmount(Double.valueOf(paymentDraft.amountSend), paymentDraft.sourceAccount.currencyCodeAvailableBalance);
            this.subject = subject;
            DateTime todaysDate = System.today();
            this.transactionDate = todaysDate.format('yyyy-MM-dd');
        }
        
        global Data_Payment (WRAPPER_PAY_PaymentDraft paymentDraft) {
            this.idempotentReference = paymentDraft.paymentId;
            this.countryDestinationFunds = paymentDraft.destinationAccount.country;
            this.sourceName = paymentDraft.sourceAccount.alias;
            this.sourceAccount = new SourceAccount(paymentDraft.sourceAccount);
            //this.sourceAgent = new SourceAgent(paymentDraft.sourceAccount);
            this.destinationAccount = new SourceAccount(paymentDraft.destinationAccount);
            this.destinationAgent = new SourceAgent(paymentDraft.destinationAccount);
            this.destinationName = paymentDraft.destinationAccount.bankName;
            this.paymentAmount = new PaymentAmount(Double.valueOf(paymentDraft.amountSend), paymentDraft.sourceAccount.currencyCodeAvailableBalance);
            this.subject = subject;
            DateTime todaysDate = System.today();
            this.transactionDate = todaysDate.format('yyyy-MM-dd');
        }
        
        global Data_Payment (String paymentId, String serviceId, WRAPPER_PaymentDetail.OperationDetail paymentDetail) {
            this.idempotentReference = paymentId;
            this.countryDestinationFunds = paymentDetail.destinationData.country;
            this.sourceAccount = new SourceAccount();
            this.sourceAccount.accountId = paymentDetail.sourceData.sourceAccount.accountId;
            this.sourceAccount.accountIdType = paymentDetail.sourceData.sourceAccount.accountType;
            /*this.sourceAgent = new SourceAgent();
            this.sourceAgent.agent = paymentDetail.sourceData.sourceAgent.agentId;
            this.sourceAgent.agentName = paymentDetail.sourceData.sourceAgent.name;
            this.sourceAgent.addressAgent = paymentDetail.sourceData.sourceAgent.address;*/
            this.destinationAccount = new SourceAccount();
            this.destinationAccount.accountId = paymentDetail.destinationData.destinationAccount.accountId;
            this.destinationAccount.accountIdType = paymentDetail.destinationData.destinationAccount.accountType;
            this.destinationAgent = new SourceAgent();
            this.destinationAgent.agent = paymentDetail.destinationData.destinationAgent.agentId;
            this.destinationAgent.agentName = paymentDetail.destinationData.destinationAgent.name;
            this.destinationAgent.addressAgent = paymentDetail.destinationData.destinationAgent.address;
            this.destinationName = paymentDetail.destinationData.name;
            this.paymentAmount = new PaymentAmount(Double.valueOf(paymentDetail.amount), paymentDetail.sourceData.sourceAccount.tcurrency);
            this.subject = paymentDetail.subject;
            DateTime todaysDate = System.today();
            this.transactionDate = todaysDate.format('yyyy-MM-dd');
        }
    }
    
    /*
Author:         R. cervino
Company:        Deloitte
Description:    get the signature structure for GTS
History:
<Date>          <Author>            <Description>
11/12/2020      R. Cervino          Initial version
08/01/2021      Candido             Move the place to delete the old structure, if exist
02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
*/
    global static WRAPPER_B2B_SignatureStructure getSignatureStructure (String channel, Map<String, String> navigatorInfo, WRAPPER_PAY_PaymentDraft paymentDraft) {
        WRAPPER_B2B_SignatureStructure structure = new WRAPPER_B2B_SignatureStructure();
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('B2B_SignatureStructure_Local');
            String finalEndPoint = configWs.CNT_Endpoint__c.replace('{service_id}', paymentDraft.serviceId);
            finalEndPoint = finalEndPoint.replace('{currency}', paymentDraft.sourceAccount.currencyCodeAvailableBalance);
            finalEndPoint = finalEndPoint.replace('{amount}', String.valueOf(paymentDraft.amountSend));
            finalEndPoint = finalEndPoint.replace('{operation_id}', paymentDraft.paymentId);

            Map<String, String> header = new Map<String, String>();
            Account userAccount = Global_Utilities.getAccountData(userInfo.getUserId());
            
            if(paymentDraft.sourceAccount != null && String.isNotBlank(paymentDraft.sourceAccount.country) && paymentDraft.sourceAccount.country != 'PL'){
                String documentType = '';
                String documentNumber = '';
                if (userAccount != null) {
                    if (userAccount.ACC_TXT_DocumentType__c != null) {
                        documentType = userAccount.ACC_TXT_DocumentType__c;
                    }
                    if (userAccount.ACC_TXT_DocumentNumber__c != null) {
                        documentNumber = userAccount.ACC_TXT_DocumentNumber__c;
                    }
                }
                header.put('Document-Type', documentType);
                header.put('Document-Number', documentNumber);
            }
            String country = String.isNotBlank(paymentDraft.sourceAccount.country) ?  paymentDraft.sourceAccount.country : '';
            String codigoBic = String.isNotBlank(paymentDraft.sourceAccount.codigoBic) ?  paymentDraft.sourceAccount.codigoBic : '';
            header.put('Global-Payment-Id', String.isNotBlank(paymentDraft.paymentId) ? paymentDraft.paymentId : '');
            header.put('Access-Channel', 'web');
            header.put('Device-Info-Token', ServiceDeviceInfo.getDeviceInfo(navigatorInfo, configWs.CNT_HTTPMethod__c));
            header.put('Operation-Token', generateOperationToken(paymentDraft.paymentId, paymentDraft.serviceId, new Data_Payment(paymentDraft)));
            TokenInformation tokenInformation = new TokenInformation(country, configWs.tokenPlatform__c, configWs.tokenUser__c, null, codigoBic);
            String auxRes = Global_IntegrationWrapper.launchHTTP('', finalEndPoint, configWs.CNT_HTTPMethod__c, header, null, null, 25000, tokenInformation);
            structure = WRAPPER_B2B_SignatureStructure.parse(auxRes);
            if (structure != null) {
                // First, delete the old structure
                List<SNG_Payment__c> signature = new List<SNG_Payment__c>([
                    SELECT Id
                    FROM SNG_Payment__c
                    WHERE SGN_TXT_IdPayment__c = :paymentDraft.paymentId
                ]);
                if (!signature.isEmpty()) {
                    CNT_B2B_SignatureUtilities.deleteSignatureRecord(signature[0].Id);
                }
                // Then, save new structure
                structure.paymentID = paymentDraft.paymentId;
                CNT_B2B_SignatureUtilities.storeSignatureData(structure);
            } else {
                throw new CustomException('Structure is required to continue.');
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SignatureUtilitiesLocal.getSignatureStructure: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return structure;
    }
    
    /*
Author:         R. cervino
Company:        Deloitte
Description:    Obtain OTP
History:
<Date>          <Author>            <Description>
05/08/2020      R. Cervino          Initial version
07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
*/
    @AuraEnabled
    public static ReturnValue getOTP_Strategic (String paymentId, WRAPPER_PaymentDetail.OperationDetail paymentDetail, String service_id, Map<String, String> deviceHeader) {
        ReturnValue response = null;
        try {
            System.debug('generateToken '+ generateOperationToken(paymentId, service_id, new Data_Payment(paymentId, service_id, paymentDetail)));
            String country = paymentDetail.sourceData.country != null ?  paymentDetail.sourceData.country : '';
            String codigoBic = paymentDetail.sourceData.SourceAgent.agentId != null ?  paymentDetail.sourceData.SourceAgent.agentId : '';
            WS_B2B_OTP_StrategicLocal.getOTP(country, codigoBic, service_id, paymentId, generateOperationToken(paymentId, service_id, new Data_Payment(paymentId, service_id, paymentDetail)),deviceHeader);
            Map<String, Object> value = new Map<String, Object>();
            value.put('initiateOTP', WS_B2B_OTP_StrategicLocal.initiateOTP);
            response = new ReturnValue(true, value);
            if (WS_B2B_OTP_StrategicLocal.initiateOTP.signId != '') {
                CNT_B2B_SignatureUtilities.storeOTPId(WS_B2B_OTP_StrategicLocal.initiateOTP.signId, paymentId);
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SignatureUtilitiesLocal.getOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response =  new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
    }
    
    /*
Author:         R. cervino
Company:        Deloitte
Description:    Obtain OTP
History:
<Date>          <Author>            <Description>
05/08/2020      R. Cervino          Initial version
07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
*/
    @AuraEnabled
    public static ReturnValue getOTP_Strategic (Map<String, String> navigatorInfo, WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            String country = String.isNotBlank(paymentDraft.sourceAccount.country) ?  paymentDraft.sourceAccount.country : '';
            String codigoBic = String.isNotBlank(paymentDraft.sourceAccount.codigoBic) ?  paymentDraft.sourceAccount.codigoBic : '';
            WS_B2B_OTP_StrategicLocal.getOTP(country, codigoBic, paymentDraft.serviceId, paymentDraft.paymentId, generateOperationToken(paymentDraft.serviceId, paymentDraft.paymentId, new Data_Payment(paymentDraft)), navigatorInfo);
            value.put('getOTP_Strategic', WS_B2B_OTP_StrategicLocal.initiateOTP);
            response = new ReturnValue(true,value);
            if (WS_B2B_OTP_StrategicLocal.initiateOTP.signId != '') {
                CNT_B2B_SignatureUtilities.storeOTPId(WS_B2B_OTP_StrategicLocal.initiateOTP.signId, paymentDraft.paymentId);
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SignatureUtilitiesLocal.getOTP: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response =  new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
    }
    
    global static String generateOperationToken (String paymentID, String service_id, Data_Payment data_payment) {
        try {
            Auth.JWT jwt = new Auth.JWT();
            jwt.setIss(System.Label.jwtIss);
            Map<String, Object> claims = new Map<String, Object>();
            claims.put('payment_id', paymentID);
            claims.put('nonce', Global_Utilities.generateRandomNumber(12));
            String jsonExample = JSON.serialize(data_payment, true);
            jsonExample = jsonExample.replace('"tcurrency"', '"currency"');
            Object deserializedJSON = (Object) JSON.deserializeUntyped(jsonExample);
            claims.put('data_payment', deserializedJSON);
            jwt.setAdditionalClaims(claims);
            jwt.setValidityLength(86400);
            Auth.JWS signedToken = new Auth.JWS(jwt, System.Label.certificateName);
            return  signedToken.getCompactSerialization();
        } catch (Exception e) {
            throw new CustomException('generateOperationToken: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    /*
Author:         R. cervino
Company:        Deloitte
Description:    Obtain signsture status
History:
<Date>          <Author>            <Description>
02/03/2021     R. Cervino          Initial version
*/
    @AuraEnabled
    public static ReturnValue getSignatureStatus (String signId, String paymentId) {
        ReturnValue response = null;
        try {
            String status = WS_signatureGetStatus.getSignatureStatus(signId, paymentId);
            Map<String, Object> value = new Map<String, Object>();
            value.put('signatureStatus', status);
            response = new ReturnValue(true, value);
            
        } catch (Exception e) {
            System.debug('CNT_B2B_SignatureUtilitiesLocal.getSignatureStatus: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response =  new ReturnValue(false, null, e.getMessage());
            throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());
        }
        return response;
    }
}