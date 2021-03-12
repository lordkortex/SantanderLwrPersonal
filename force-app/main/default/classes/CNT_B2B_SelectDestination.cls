global with sharing class CNT_B2B_SelectDestination {

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Create payment
    History:
    <Date>          <Author>                <Description>
    29/11/2020      Bea Hill                Include transferType
    01/02/2021      Candido                 Refactor with WRAPPER_PAY_PaymentDraft
    */
    // FLOWERPOWER_DECPRECATED se genera el id del pago en el CNT_B2B_SelectOrigin
    /* @AuraEnabled
    public static ReturnValue getPaymentId (WRAPPER_PAY_PaymentDraft paymentDraft, WrapperUserData userData) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            String paymentId = null;
            if (String.isBlank(paymentDraft.paymentId)) {
                // FLOWERPOWER_PARCHE_CPC
                if (String.isBlank(paymentDraft.sourceAccount.bankName) && paymentDraft.sourceAccount.country.equalsIgnoreCase('PL')) {
                    paymentDraft.sourceAccount.bankName = 'SANTANDER POLZKA';
                }
                WS_CreatePaymentOperation paymentOperation = new WS_CreatePaymentOperation(userData);
                paymentId = paymentOperation.execute(paymentDraft.sourceAccount, paymentDraft.destinationAccount, paymentDraft.expensesAccount, paymentDraft.productId, paymentDraft.serviceId);
            }
            value.put('paymentId', paymentId);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getPaymentId: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    } */

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Update payment details
    History:
    <Date>          <Author>                <Description>
    30/11/2020      Bea Hill                Initial version
    */
    /*
    @AuraEnabled
    public static ReturnValue updatePayment (String paymentId, WRAPPER_AccountList.AccountDetails sourceAccount, WRAPPER_AccountList.AccountDetails destinationAccount, WRAPPER_AccountList.AccountDetails expensesAccount) {
        ReturnValue response = null;
        System.debug('BH updatePayment(paymentId...)');
        try {
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
            String output = wsObject.updateAccountsInformation(sourceAccount, destinationAccount, expensesAccount);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.updatePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }*/

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Update payment details
    History:
    <Date>          <Author>                <Description>
    18/02/2021      Bea Hill                paymentDraft as only input parameter
    */
    @AuraEnabled
    public static ReturnValue updatePayment (WRAPPER_PAY_PaymentDraft paymentDraft) {
        System.debug('BH updatePayment(paymentDraft):' + JSON.serialize(paymentDraft));
        ReturnValue response = null;
        try {
            if (paymentDraft == null) {
                throw new CustomException('Must inform paymentDraft');
            }
            if (String.isBlank(paymentDraft.paymentId)) {
                throw new CustomException('Must inform paymentDraft.paymentId');
            }
            if (paymentDraft.sourceAccount == null) {
                throw new CustomException('Must inform paymentDraft.sourceAccount');
            }
            if (paymentDraft.destinationAccount == null) {
                throw new CustomException('Must inform paymentDraft.destinationAccount');
            }
            if (String.isBlank(paymentDraft.paymentCurrency)) {
                throw new CustomException('Must inform paymentDraft.paymentCurrency');
            }
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentDraft.paymentId);
            String output = wsObject.updateAccountsInformation(paymentDraft.sourceAccount, paymentDraft.destinationAccount, paymentDraft.expensesAccount, paymentDraft.paymentCurrency);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.updatePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    validate Account
    History:
    <Date>          <Author>                <Description>
    12/08/2020      R. Cervino              Initial version
    01/11/2020      Candido                 Refactor and add accountIdType to check
    */
    @AuraEnabled
    public static ReturnValue accountValidation (WRAPPER_AccountList.AccountDetails data) {
        return ServiceValidateAccount.validateAccount(data, 'open', null);
    }

    /*
    Author:         A. Quesada
    Company:        Deloitte
    Description:    Register new beneficiary
    History
    <Date>          <Author>            <Description>
    14/12/2020      A. Quesada          Initial version
    */
    /*@AuraEnabled
    public static ReturnValue registerNewBeneficiary (WRAPPER_AccountList.AccountDetails data) {
        WRAPPER_AccountList.AccountDetails sourceAccount = new WRAPPER_AccountList.AccountDetails();
        return registerNewBeneficiary(data, sourceAccount);
    }*/

    /*
    Author:         A. Quesada
    Company:        Deloitte
    Description:    Register new beneficiary
    History
    <Date>          <Author>            <Description>
    14/12/2020      A. Quesada          Initial version
    */
    @AuraEnabled
    public static ReturnValue registerNewBeneficiary (WRAPPER_AccountList.AccountDetails newAccount, WRAPPER_AccountList.AccountDetails sourceAccount) {
        System.debug('sourceAccount_BH: ' + JSON.serialize(sourceAccount));
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            newAccount = ServiceTransfersBeneficiaries.registerNewBeneficiary(newAccount, sourceAccount);
            value.put('accountData', newAccount);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.registerNewBeneficiary: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get countries
    History
    <Date>          <Author>            <Description>
    04/01/2021      Bea Hill            Initial version
    */
    @AuraEnabled
    public static ReturnValue getCountryList () {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            List<WRAPPER_PaymentList.WRAPPER_Country> countryList = CNT_Payments.getCountryList();
            value.put('countryList', countryList);
            response = new ReturnValue(true, value);
        } catch(Exception e) {
            System.debug('CNT_B2B_SelectDestination.getCountryList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get productId and serviceId for the payment
    History:
    <Date>          <Author>                <Description>
    05/01/2021      Bea Hill                Initial version
    01/02/2021      Candido                 Refactor with WRAPPER_PAY_PaymentDraft
    */
    // FLOWERPOWER_DEPRECATED Se asignan productId y serviceId después del paso 2.
    /* @AuraEnabled
    public static ReturnValue getProductServiceIds (WRAPPER_PAY_PaymentDraft paymentDraft, WrapperUserData userData, String transferType) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            String productId = '';
            String serviceId = '';
            if (!String.isBlank(transferType)) {
                if (transferType == System.Label.PTT_instant_transfer) {
                    serviceId = 'add_international_payment_internal';
                    productId = System.Label.CNF_payment_productId_001;
                } else if (transferType == System.Label.PTT_international_transfer_single) {
                    serviceId = 'add_inter_paym_int_cust_diff_group';
                    productId = System.Label.CNF_payment_productId_002;
                }
            }
            value.put('productId', productId);
            value.put('serviceId', serviceId);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getProductServiceIds: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    } */

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get countries with IIP Beneficiary check, excluding the country of the ordering account
    History
    <Date>          <Author>                <Description>
    02/02/2021      Bea Hill              Initial version
    */
    @AuraEnabled
    public static ReturnValue getIipBeneficicaryCountries (String sourceAccountCountry) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            List<WRAPPER_PaymentList.WRAPPER_Country> countryList = CNT_Payments.getIipBeneficicaryCountries(sourceAccountCountry);
            value.put('countryList', countryList);
            response = new ReturnValue(true, value);
        } catch(Exception e) {
            System.debug('CNT_B2B_SelectDestination.getIipBeneficicaryCountries: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get list of currencies for each country.
    History
    <Date>          <Author>                <Description>
    03/02/2021      Bea Hill              Initial version
    */
    @AuraEnabled
    public static ReturnValue getCurrencyListByCountry () {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            List<Local_Banking_Filters__c> lst = new List<Local_Banking_Filters__c>();
            lst = getLocalBankingCountries();
            Map<String, Object> countryCurrencyLists = new Map<String, Object>();
            for (Local_Banking_Filters__c country : lst) {
                Map<String, Object> countryCurrencyInfo = new Map<String, Object>();
                String countryCode = country.LB_TXT_Country_ISO_Code__c;
                String currencies = country.LB_TXT_Currencies__c;
                List<String> currencyList = new List<String>();
                currencyList = currencies.split(';');
                countryCurrencyInfo.put('currencyList', currencyList);
                String baseCurrency = Global_Utilities.getCountryCurrency(countryCode);
                countryCurrencyInfo.put('baseCurrency', baseCurrency);
                countryCurrencyLists.put(countryCode, countryCurrencyInfo);
            }
            value.put('countryCurrencyLists', countryCurrencyLists);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getCurrencyListByCountry: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get list of beneficiaries filtering by country.
    History:
    <Date>          <Author>                <Description>
    03/02/2021      Bea Hill              Initial version
    */
    @AuraEnabled
    public static ReturnValue getBeneficiariesByCountry (String countryCode) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            List< WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
            WS_TransfersBeneficiaries.INPUT filters = new WS_TransfersBeneficiaries.INPUT();
            WRAPPER_AccountList.AccountDetails sourceAccount = new WRAPPER_AccountList.AccountDetails();
            filters.bankCountry = countryCode;
            accountList = ServiceTransfersBeneficiaries.getBeneficiaries(sourceAccount, filters);
            value.put('accountList', accountList);
            response = new ReturnValue(true, value);
        } catch(Exception e) {
            System.debug('CNT_B2B_SelectDestination.getBeneficiariesByCountry: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static List<Local_Banking_Filters__c> getLocalBankingCountries () {
        List<Local_Banking_Filters__c> lst = new List<Local_Banking_Filters__c>();
        try {
            lst = [
                SELECT Id, LB_TXT_Country_ISO_Code__c, LB_TXT_Country_Name__c, LB_TXT_Currencies__c
                FROM Local_Banking_Filters__c
            ];
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getLocalBankingCountries: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return lst;
    }

     /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get dominant currency.
    History:
    <Date>          <Author>                <Description>
    09/02/2021      Bea Hill                Initial version
    */
    @AuraEnabled
    public static ReturnValue getDominantCurrency (WrapperUserData userData, String currencyOrigin, String currencyDestination) {
        ReturnValue response = null;
        try {
            if (currencyOrigin == null) {
                throw new CustomException('Must inform currencyOrigin');
            }
            if (currencyDestination == null) {
                throw new CustomException('Must inform currencyDestination');
            }
            Map<String, Object> value = new Map<String, Object>();
            String dominantCurrency = '';
            if (currencyOrigin != currencyDestination) {
                ReturnValue res = ControllerDominantCurrency.getDominantCurrency(userData, currencyOrigin, currencyDestination);
                if (res != null) {
                    if (res.value != null) {
                        value = res.value;
                    }
                } else {
                    throw new CustomException('Empty response');
                }
            } else {
                value.put('dominantCurrency', currencyOrigin);
            }
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getDominantCurrency: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get exchange rate.
    History:
    <Date>          <Author>                <Description>
    09/02/2021      Bea Hill              Initial version
    */
    @AuraEnabled
    public static ReturnValue getExchangeRate (String currency1, String currency2, WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        try {
            if (currency1 == null) {
                throw new CustomException('Must inform currency1');
            }
            if (currency2 == null) {
                throw new CustomException('Must inform currency2');
            }
            if (paymentDraft == null) {
                throw new CustomException('Must inform paymentDraft');
            }
            if (paymentDraft.sourceAccount == null) {
                throw new CustomException('Must inform paymentDraft.sourceAccount');
            }
            Map<String, Object> value = new Map<String, Object>();
            if (currency1 != currency2) {
                WS_ExchangeRate exchangeRate = new WS_ExchangeRate(paymentDraft.paymentId, 'b2b', 'I', 'ONL', null, 25000, 'Nominal_request');
                String sourceCustomerId = paymentDraft.sourceAccount.codigoCorporate;
                if (paymentDraft.sourceAccount.companyIdsList != null &&  String.isNotBlank(paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier))) {
                    sourceCustomerId = paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier);
                }
                value = exchangeRate.execute(5, null, currency1, currency2, paymentDraft.sourceAccount.alias, paymentDraft.sourceAccount.aliasEntidad,sourceCustomerId, paymentDraft.sourceAccount.country, paymentDraft.sourceAccount.codigoBic);
            } else {
                value.put('sameCurrencies', true);
            }
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getExchangeRate: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Validate Account with GET Me Account Details service
    History
    <Date>          <Author>                <Description>
    11/02/2021      Bea Hill                  Initial version
    */
    /* @AuraEnabled
    public static ReturnValue accountValidation (WrapperUserData userData, WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        String accountId = null;
        String accountIdType = null;
        String country = null;
        String codigoBic = null;
        try {
            if (paymentDraft == null) {
                throw new CustomException('Must inform paymentDraft');
            }
            if (paymentDraft.destinationAccount == null) {
                throw new CustomException('Must inform paymentDraft.destinationAccount');
            }
            accountId = paymentDraft.destinationAccount.displayNumber;
            accountIdType = paymentDraft.destinationAccount.idType;
            country = paymentDraft.destinationAccount.country;
            codigoBic = paymentDraft.destinationAccount.codigoBic;
            response = ControllerAccountDetails.getAccountsDetails(userData, accountId, accountIdType, country, codigoBic, paymentDraft);
        } catch (Exception e) {
            System.debug('ControllerTransfersBeneficiaries.getBeneficiaries: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    } */

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get settings and lists for creating a new beneficiary
    History
    <Date>          <Author>                <Description>
    12/02/2021      Bea Hill                Initial version
    */
    @AuraEnabled
    public static ReturnValue newBeneficiarySettings (List<WRAPPER_PaymentList.WRAPPER_Country> countryList) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            List<String> countryCodeList = new List<String>();
            for (WRAPPER_PaymentList.WRAPPER_Country item : countryList) {
                countryCodeList.add(item.countryName);
            }
            List<Local_Banking_Filters__c> lst = new List<Local_Banking_Filters__c>();
            lst = getLocalBankingCountries();
            for (Local_Banking_Filters__c country : lst) {
                String countryCode = country.LB_TXT_Country_ISO_Code__c;
                if (countryCodeList.contains(countryCode)) {
                    Map<String, Object> settings = new Map<String, Object>();
                    List<String> currencyList = getAvailableCurrencies(country);
                    String baseCurrency = Global_Utilities.getCountryCurrency(countryCode);
                    Integer ibanLength = getIbanLength(countryCode);
                    Boolean simpleForm = getFormType(countryCode);
                    List<ValueLabelPair> accountTypeList = getAccountTypes(countryCode);
                    List<ValueLabelPair> bankNameList = getBanks(countryCode);
                    settings.put('currencyList', currencyList);
                    settings.put('baseCurrency', baseCurrency);
                    settings.put('ibanLength', ibanLength);
                    settings.put('simpleForm', simpleForm);
                    settings.put('accountTypeList', accountTypeList);
                    settings.put('bankNameList', bankNameList);
                    value.put(countryCode, settings);
                }
            }
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getCurrencyListByCountry: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get list of currencies for each country.
    History
    <Date>          <Author>                <Description>
    12/02/2021      Bea Hill              Initial version
    */
    @AuraEnabled
    public static List<String> getAvailableCurrencies (Local_Banking_Filters__c country) {
        List<String> currencyList = new List<String>();
        try {
            String currencies = country.LB_TXT_Currencies__c;
            currencyList = currencies.split(';');
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getAvailableCurrencies: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return currencyList;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get number of characters required for valid IBAN
    History:
    <Date>          <Author>                <Description>
    12/02/2021      Bea Hill              Initial version
    */
    @AuraEnabled
    public static Integer getIbanLength (String countryCode) {
        Integer ibanLength = null;
        try {
            if (countryCode == 'BR') {
                ibanLength = 29;
            }
            if (countryCode == 'GB') {
                ibanLength = 22;
            }
            if (countryCode == 'ES') {
                ibanLength = 24;
            }
            if (countryCode == 'PL') {
                ibanLength = 26;
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getIbanLength: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return ibanLength;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get number of characters required for valid IBAN
    History:
    <Date>          <Author>                <Description>
    12/02/2021      Bea Hill              Initial version
    */
    @AuraEnabled
    public static Boolean getFormType (String countryCode) {
        Boolean simpleForm = true;
        try {
            if(countryCode == 'BR') {
                simpleForm = false;
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getFormType: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return simpleForm;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get values for Account Type dropdown
    History:
    <Date>          <Author>            <Description>
    12/02/2021      Bea Hill            Initial version
    */
    @AuraEnabled
    public static List<ValueLabelPair> getAccountTypes (String countryCode) {
        List<ValueLabelPair> accountTypeList =  new List<ValueLabelPair>();
        try {
            if (countryCode == 'BR') {
                ValueLabelPair item1 = new ValueLabelPair('C', 'Current Account');
                ValueLabelPair item2 = new ValueLabelPair('P', 'Savings Account');
                ValueLabelPair item3 = new ValueLabelPair('E', 'Payments Account');
                accountTypeList.add(item1);
                accountTypeList.add(item2);
                accountTypeList.add(item3);
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getAccountTypes: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return accountTypeList;
    }

      /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get values for Bank Name  dropdown
    History:
    <Date>          <Author>                <Description>
    12/02/2021      Bea Hill                Initial version
    */
    @AuraEnabled
    public static List<ValueLabelPair> getBanks (String countryCode) {
        List<ValueLabelPair> bankList = new List<ValueLabelPair>();
        try {
            if (countryCode == 'BR') {
                ValueLabelPair item1 = new ValueLabelPair('Brasil Bank', 'Brasil Bank');
                ValueLabelPair item2 = new ValueLabelPair('SAN Brasil', 'SAN Brasil');
                bankList.add(item1);
                bankList.add(item2);
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getBanks: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return bankList;
    }

    global class ValueLabelPair {
        @AuraEnabled
        global String value {get;set;}
        @AuraEnabled
        global String label {get;set;}

        global valueLabelPair (String value, String label) {
            this.value = value;
            this.label = label;
        }
    }
}