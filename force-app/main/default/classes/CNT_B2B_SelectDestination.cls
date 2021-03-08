public with sharing class CNT_B2B_SelectDestination {
    /* 
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Create payment
    History
    <Date>          <Author>                <Description>
    29/11/2020      Bea Hill                Include transferType
    */
    @AuraEnabled
    public static ReturnValue getPaymentId (WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, WrapperUserData userData, WRAPPER_B2B_Data.AccountData accountData, String paymentId, WRAPPER_AccountList.AccountDetails expensesAccount) {
        ReturnValue response = null;
        String productId = null;
        String serviceId = null;
        return getPaymentId(sourceAccountData, recipientAccountData, userData, accountData, paymentId, expensesAccount, productId, serviceId);
    }

    @AuraEnabled
    public static ReturnValue getPaymentId (WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, WrapperUserData userData, WRAPPER_B2B_Data.AccountData accountData, String paymentId, WRAPPER_AccountList.AccountDetails expensesAccount, String productId, String serviceId) {
        //26/10/2020 -  Shahad Naji - WrapperUserData
        //29/11/2020 -  Bea Hill    - TransferType
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            if (String.isBlank(paymentId)) {
                // FLOWERPOWER_PARCHE_CPC
                if (String.isBlank(sourceAccountData.bankName) && sourceAccountData.country.equalsIgnoreCase('PL')) {
                    sourceAccountData.bankName = 'SANTANDER POLZKA';
                }
                WS_CreatePaymentOperation paymentOperation = new WS_CreatePaymentOperation('B2B', userData, accountData);
            	paymentId = paymentOperation.execute(sourceAccountData, recipientAccountData, expensesAccount, productId, serviceId);
            }            
            value.put('paymentId', paymentId);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.getPaymentId: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:    validate Account
    History
    <Date>          <Author>                <Description>
    12/08/2020      R. Cervino              Initial version
    01/11/2020      Candido                 Refactor and add accountIdType to check
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue accountValidation (WRAPPER_AccountList.AccountDetails data) {
        return ServiceValidateAccount.validateAccount(data, 'open', null);
    }

    /* 
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Update payment details
    History
    <Date>          <Author>                <Description>
    30/11/2020      Bea Hill                Initial version
    */
    @AuraEnabled
    public static ReturnValue updatePayment(String paymentId, WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, WRAPPER_AccountList.AccountDetails sourceFeeAccountData) {
        ReturnValue response = null;
        try {
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
            String output = wsObject.updateAccountsInformation(sourceAccountData, recipientAccountData, sourceFeeAccountData);
            response = new ReturnValue(true, output);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.updatePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         A. Quesada
    Company:        Deloitte
    Description:    Register new beneficiary
    History
    <Date>          <Author>            <Description>
    14/12/2020      A. Quesada          Initial version
    */
    @AuraEnabled
    public static ReturnValue registerNewBeneficiary (WRAPPER_AccountList.AccountDetails data) {
        WRAPPER_AccountList.AccountDetails sourceAccount = new WRAPPER_AccountList.AccountDetails();
        return registerNewBeneficiary(data, sourceAccount);
    }

    /*
    Author:         A. Quesada
    Company:        Deloitte
    Description:    Register new beneficiary
    History
    <Date>          <Author>            <Description>
    14/12/2020      A. Quesada          Initial version
    */
    @AuraEnabled
    public static ReturnValue registerNewBeneficiary (WRAPPER_AccountList.AccountDetails data, WRAPPER_AccountList.AccountDetails sourceAccount) {
        System.debug('INPUT: ' + JSON.serialize(data));
        System.debug('sourceAccount_BH: ' + JSON.serialize(sourceAccount));
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            data = ServiceTransfersBeneficiaries.registerNewBeneficiary(data, sourceAccount);
            value.put('accountData', data);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectDestination.registerNewBeneficiary: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /* @AuraEnabled
    public static ReturnValue registerNewBeneficiary (WRAPPER_AccountList.AccountDetails data) {
        System.debug('ESTE ES EL DATA: ' + JSON.serialize(data));
        ReturnValue response = null;
        if (data != null) {
            WS_TransfersBeneficiaries.BeneficiaryData benefData = new WS_TransfersBeneficiaries.BeneficiaryData();
            if (String.isNotBlank(data.subsidiaryName)) {
                benefData.name = data.subsidiaryName;
            }   
            if (String.isNotBlank(data.displayNumber)) {
                benefData.account = new WS_TransfersBeneficiaries.Account();
                String iban = data.displayNumber;
                if(iban.contains('ES')){ //FLOWERPOWER_PARCHE_BEA
                    benefData.account.accountIdType = 'IBAN';
                } else {
                    benefData.account.accountIdType = 'BBAN';
                }
                benefData.account.accountId = iban;
                data.idType = benefData.account.accountIdType;
            }
            benefData.bank = new WS_TransfersBeneficiaries.Bank();
            benefData.address = new WS_TransfersBeneficiaries.Address();
            String country = data.country;
            if (country != null) {
                benefData.address.country = country;
                benefData.bank.bankCountry = country; //FLOWERPOWER_PARCHE_BEA
                String baseCurrency = Global_Utilities.getCountryCurrency(country);
                data.currencyCodeAvailableBalance = String.isNotBlank(baseCurrency) ? baseCurrency : '';
                Boolean mandatoryPurpose = Global_Utilities.getCountryMandatoryPurpose(country); 
                data.mandatoryPurpose = mandatoryPurpose;
                String codigoBic = '';
                data.address = new WRAPPER_AccountList.Address();
                if (country.toLowerCase() == 'es') {
                    codigoBic = 'BSCHESMM';
                    // FLOWERPOWER_PARCHE_CPC
                    data.address.streetName = 'Avda. de Cantabria s/n';
                    data.address.townName = 'Boadilla del Monte, Madrid';
                    data.address.country = 'ES';
                } else if (country.toLowerCase() == 'gb' || country.toLowerCase() == 'uk') {
                    codigoBic = 'ABBYGB2L';
                    // FLOWERPOWER_PARCHE_CPC
                    data.address.streetName = '306ª, High Holborn, High Holborn';
                    data.address.townName = 'London';
                    data.address.country = 'gb';
                }
                data.codigoBic = codigoBic;
                benefData.bank.bankId = codigoBic;
                // FLOWERPOWER_PARCHE_CPC
                if (country.toLowerCase() == 'es') {
                    benefData.bank.bankName = 'SANTANDER ES';
                    data.bankName = 'SANTANDER ES';
                } else if (country.toLowerCase() == 'gb' || country.toLowerCase() == 'uk') {
                    benefData.bank.bankName = 'SANTANDER UK';
                    data.bankName = 'SANTANDER UK';
                }
            }
            // FLOWERPOWER_PARCHE_SNJ
			data.customerId = '34311586';
            try {
                Map<String, Object> value = new Map<String, Object>();
                WS_TransfersBeneficiaries.OUTPUT output = WS_TransfersBeneficiaries.executePost(benefData);
                value.put('output', output);
                value.put('accountData', data);
                response = new ReturnValue(true, value);
            } catch (Exception e) {
                System.debug('CNT_B2B_SelectDestination.registerNewBeneficiary: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
                response = new ReturnValue(false, null, e.getMessage());
            }
        }
        return response;
    } */

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get countries
    History
    <Date>          <Author>                <Description>
    04/01/2021      Bea Hill              Initial version
    */
    @AuraEnabled
    public static ReturnValue getCountryList(){
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
    History
    <Date>          <Author>                <Description>
    05/01/2021      Bea Hill                Initial version
    */
    @AuraEnabled
    public static ReturnValue getProductServiceIds(WRAPPER_AccountList.AccountDetails sourceAccountData, WRAPPER_AccountList.AccountDetails recipientAccountData, WrapperUserData userData, WRAPPER_B2B_Data.AccountData accountData, String paymentId, WRAPPER_AccountList.AccountDetails expensesAccount, String transferType) {
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
            System.debug('CNT_B2B_SelectDestination.getPaymentId: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

}