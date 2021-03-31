public with sharing class CNT_ConsentForm {

    @AuraEnabled
    public static ReturnValue initComponent (String accountId) {
        ReturnValue response = null;
        
        try {
            
            Map<String, Object> value = new Map<String, Object>();
            Account account = getAccountById(accountId);
            if (account == null) {
                account = new Account();
            }
            value.put('account', account);
            List<Map<String, String>> listCountries = getPicklistValues('Account', 'ACC_PCK_Country__c');
            value.put('listCountries', listCountries);
            List<Map<String, String>> listTypes = getPicklistValues('Account', 'ACC_PCK_Type__c');
            value.put('listTypes', listTypes);
            List<Map<String, String>> listManagement = getPicklistValues('Account', 'ACC_PCK_Management__c');
            value.put('listManagement', listManagement);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_ConsentForm.initComponent: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        } 
        return response;
    }

    private static Account getAccountById (String accountId) {
        Account response = null;
        
        try {
            if (String.isNotBlank(accountId)) {
                List<Account> lAccounts = new List<Account>([
                    SELECT Id, Name, ACC_PCK_Country__c, ACC_TXT_BIC__c, ACC_PCK_Type__c, ACC_PCK_Management__c, ACC_DATE_InitialDate__c, ACC_DATE_FinalDate__c, ACC_CHK_Validation__c, ACC_LCK_User__c, ACC_TXT_TaxId__c, ACC_TXT_CompanyId__c
                    FROM Account
                    WHERE Id = :accountId
                    LIMIT 1
                ]);
                if (!lAccounts.isEmpty()) {
                    response = lAccounts.get(0);
                }
            }
        } catch (Exception e) {
            System.debug('CNT_ConsentForm.getAccountById' + e.getMessage());
        } 
        return response;
    }

    private static List<Map<String, String>> getPicklistValues (String objectName, String fieldName) {
        List<Map<String, String>> response = new List<Map<String, String>>();
        try {
            List<Schema.DescribeSobjectResult> results = Schema.describeSObjects(new List<String>{objectName});
            for (Schema.DescribeSobjectResult res : results) {
                List<Schema.PicklistEntry> entries = res.fields.getMap().get(fieldName).getDescribe().getPicklistValues();
                for (Schema.PicklistEntry entry : entries) {
                    Map<String, String> element = new Map<String, String>();
                    if (entry.isActive()) {
                        element.put('label', entry.getLabel());
                        element.put('value', entry.getValue());
                        response.add(element);
                    }
                }
            }
        } catch (Exception e) {
            System.debug('CNT_ConsentForm.getPicklistValues' + e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue getConsentTypeAndManagement (String country, String countryBIC) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            Consent_Type_Management__mdt consent = getMetadataConsent(country, countryBIC);
            if (consent != null) {
                value.put('consentType', consent.Type__c);
                value.put('consentManagement', consent.Management__c);
            } else {
                throw new CustomException('No se ha encontrado tipo de consentimiento y gestión para el pais y el BIC indicados.');
            }
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_ConsentForm.getConsentTypeAndManagement: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    private static Consent_Type_Management__mdt getMetadataConsent (String country, String countryBIC) {
        Consent_Type_Management__mdt response = null;
        try {
            List<Consent_Type_Management__mdt> listConsent = new List<Consent_Type_Management__mdt>([
                SELECT Type__c, Management__c
                FROM Consent_Type_Management__mdt
                WHERE Country__c = :country
                AND BIC__c = :countryBIC
                LIMIT 1
            ]);
            if (!listConsent.isEmpty()) {
                response = listConsent.get(0);
            }
        } catch (Exception e) {
            System.debug('CNT_ConsentForm.getMetadataConsent');
            throw new CustomException(e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue callStratioAndSaveAccount (Account account) {
        Map<String, Object> value = new Map<String, Object>();
        ReturnValue response = null;
        try {
            validationsForm(account);
            saveAccount(account);
            response = new ReturnValue(true);
        } catch (Exception e) {
            System.debug('CNT_ConsentForm.callStratioAndSaveAccount: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    private static void validationsForm (Account account) {
        
        try {
            if (account == null) {
                throw new CustomException('Debe informar de la cuenta.');
            }
            if (String.isBlank(account.Name)) {
                throw new CustomException('Debe informar del nombre de la cuenta.');
            }
            if (String.isBlank(account.ACC_PCK_Country__c)) {
                throw new CustomException('Debe informar del país de la cuenta.');
            }
            if (String.isBlank(account.ACC_TXT_BIC__c)) {
                throw new CustomException('Debe informar del BIC del país de la cuenta.');
            }
            if (String.isBlank(account.ACC_PCK_Type__c)) {
                throw new CustomException('Debe informar de un tipo de consentimiento.');
            }
            if (account.ACC_PCK_Type__c == Label.Consent_Explicit && String.isBlank(account.ACC_PCK_Management__c)) {
                throw new CustomException('Debe informar de un tipo de gestión.');
            }
            if (account.ACC_PCK_Type__c == Label.Consent_Explicit && account.ACC_PCK_Management__c == Label.Consent_GTS) {
                if (account.ACC_CHK_Validation__c != null) {
                    if (account.ACC_CHK_Validation__c == true) {
                        if (account.ACC_DATE_InitialDate__c == null) {
                            throw new CustomException('Debe informar de la fecha de inicio del consentimiento.');
                        }
                        if (account.ACC_DATE_FinalDate__c == null) {
                            throw new CustomException('Debe informar de la fecha de fin del consentimiento.');
                        }
                        Date today = date.today();
                        if (today.daysBetween(account.ACC_DATE_InitialDate__c) < 0) {
                            throw new CustomException('La fecha de inicio del consentimiento tiene que ser mayor a hoy.');
                        }
                        if (today.daysBetween(account.ACC_DATE_FinalDate__c) < 0) {
                            throw new CustomException('La fecha de fin del consentimiento tiene que ser mayor a hoy.');
                        }
                        if (account.ACC_DATE_InitialDate__c.daysBetween(account.ACC_DATE_FinalDate__c) <= 0) {
                            throw new CustomException('La fecha de inicio debe ser superior a la fecha de fin.');
                        }
                    }
                }
            }
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        } 
    }

    private static void saveAccount (Account account) {
        try {
            upsert account;
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }
}