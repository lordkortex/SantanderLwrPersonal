global class WS_B2B_ValidateAccount {

    global static ValidateAccountOutput validateAccountOutput;

    global class ValidateAccountOutput {
        @AuraEnabled
        global CustomerIdResult customerIdResult {get;set;}
        @AuraEnabled
        global AmountResult amountResult {get;set;}
        @AuraEnabled
        global CurrencyCodeResult currencyCodeResult {get;set;}
        @AuraEnabled
        global StatusResult statusResult {get;set;}
        @AuraEnabled
        global ProductTypeResult productTypeResult {get;set;}
        @AuraEnabled
        global List<Errors> errors {get;set;}
        
        global ValidateAccountOutput () {
        }
    }

    
    
    global class CustomerIdResult {
        @AuraEnabled
        global String customerId {get;set;}
        @AuraEnabled
        global String result {get;set;}

        global CustomerIdResult () {
        }
	}

	global class AmountResult {
        @AuraEnabled
        global String amount {get;set;}
        @AuraEnabled
        global String result {get;set;}

        global AmountResult () {
        }
    }

    global class CurrencyCodeResult {
        @AuraEnabled
        global String currencyCode {get;set;}
        @AuraEnabled
        global String result {get;set;}

        global CurrencyCodeResult () {
        }
    }

    global class StatusResult {
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global String result {get;set;}

        global StatusResult () {
        }
    }


    global class ProductTypeResult {
        @AuraEnabled
        global String productType {get;set;}
        @AuraEnabled
        global String result {get;set;}

        global ProductTypeResult () {
        }
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

        global Errors () {
        }
    }
    
    global class ValidateAccountBody {
        @AuraEnabled
        global String status {get;set;}
        @AuraEnabled
        global Decimal amount {get;set;}
        @AuraEnabled
        global String currencyCode {get;set;}
        @AuraEnabled
        global String productType {get;set;}
        
        global ValidateAccountBody () {
        }

        global ValidateAccountBody (String status, Decimal amount, String currencyCode, String productType) {
            this.status = status;
            this.amount = amount;
            this.currencyCode = currencyCode;
            this.productType = productType;
        }
    }

    global static ValidateAccountOutput validateAccount (WRAPPER_AccountList.AccountDetails account, validateAccountBody validateBody) {
        String accountId = '';
        String accountIdType = '';
        String country = '';
        String codigoBic = '';
        String localCompanyIdentifier = '';
        try {
            if (account == null) {
                throw new CustomException('You need to inform the accountId.');
            }
            accountId = account.displayNumber;
            accountIdType = account.idType;
            country = account.country;
            codigoBic = account.codigoBic;
            if (account.companyIdsList != null &&  String.isNotBlank(account.companyIdsList.get(System.Label.CNF_APIIdentifier))) {
                localCompanyIdentifier = account.companyIdsList.get(System.Label.CNF_APIIdentifier);
            }
        } catch (Exception e) {
            System.debug('WS_B2B_ValidateAccount.validateAccount: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage()); 
        }
        return validateAccount(accountId, accountIdType, country, codigoBic, localCompanyIdentifier, validateBody);
    }

    global static ValidateAccountOutput validateAccount (String accountId, String accountIdType, String country, String codigoBic, String localCompanyIdentifier, validateAccountBody validateBody) {
        validateAccountOutput = null;
        try {
            if (String.isBlank(accountId)) {
                throw new CustomException('You need to inform the accountId.');
            }
            if (String.isBlank(accountIdType)) {
                throw new CustomException('You need to inform the accountIdType.');
            }
            if (String.isBlank(country)) {
                throw new CustomException('You need to inform the country.');
            }
            if (String.isBlank(codigoBic)) {
                throw new CustomException('You need to inform the codigoBic.');       
            }
            if (validateBody == null) {
                throw new CustomException('You need to inform the validateAccount conditions.');
            }
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('B2B_AccountValidation');
            String finalEndPoint = configWs.CNT_Endpoint__c;
            finalEndPoint = finalEndpoint.replace('{account_id}', accountId);
            finalEndPoint = finalEndpoint.replace('{accountIdType}', accountIdType);
            TokenInformation tokenInformation = new TokenInformation(country, configWs.tokenPlatform__c, configWs.tokenUser__c, null, codigoBic, null, null, null, null);
            Map<String, String> extraHeaders = new Map<String, String>();
            String authenticationplatform = TokenService.getTokenPlatform(country);
            extraHeaders.put('authenticationplatform', authenticationplatform);
            Boolean xCompanySan = ServiceCustomLabels.checkCountryWithXCompanySan(country);
            if (xCompanySan == true) {
                if (String.isNotBlank(localCompanyIdentifier)) {
                    extraHeaders.put('X-Company-San', localCompanyIdentifier);
                } else {
                    throw new CustomException('You need to inform the localCompanyIdentifier.');
                }
            }
            String res = Global_IntegrationWrapper.launchHTTP(JSON.serialize(validateBody, true), finalEndPoint, configWs.CNT_HTTPMethod__c, extraHeaders, null, null, 120000, tokenInformation);      
            validateAccountOutput = (ValidateAccountOutput) System.JSON.deserialize(res, ValidateAccountOutput.class); 
            // FLOWERPOWER_PARCHE_CPC
            /*validateAccountOutput = new ValidateAccountOutput();
            validateAccountOutput.customerIdResult = new customerIdResult();
            validateAccountOutput.customerIdResult.result = 'OK';
            validateAccountOutput.customerIdResult.customerId = '2123';
            validateAccountOutput.amountResult = new AmountResult();
            validateAccountOutput.amountResult.result = 'OK';
            validateAccountOutput.amountResult.amount = '12345.0';
            validateAccountOutput.currencyCodeResult = new CurrencyCodeResult();
            validateAccountOutput.currencyCodeResult.result = 'OK';
            validateAccountOutput.currencyCodeResult.currencyCode = 'EUR';
            validateAccountOutput.statusResult = new StatusResult();
            validateAccountOutput.statusResult.result = 'OK';
            validateAccountOutput.statusResult.status = 'Active';
            validateAccountOutput.productTypeResult = new ProductTypeResult();
            validateAccountOutput.productTypeResult.result = 'OK';
            validateAccountOutput.productTypeResult.productType = 'accounts';*/
            // FLOWERPOWER_PARCHE_CPC
            if (validateAccountOutput != null) {
                if (validateAccountOutput.errors != null && !validateAccountOutput.errors.isEmpty()) {
                    String descriptions = '';
                    for (Errors error : validateAccountOutput.errors) {
                        if (error != null && String.isNotBlank(error.description)) {
                        	descriptions += error.description + '.';
                        }
                    }
                    throw new CustomException(descriptions);
                }
            }
        } catch (Exception e) {
            System.debug('WS_B2B_ValidateAccount.validateAccount: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage()); 
        }
        return validateAccountOutput;
    }
}