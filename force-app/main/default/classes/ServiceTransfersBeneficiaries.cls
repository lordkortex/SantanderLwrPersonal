global class ServiceTransfersBeneficiaries {

    global static List<WRAPPER_AccountList.AccountDetails> getBeneficiaries () {
        List<WRAPPER_AccountList.AccountDetails> res = new List<WRAPPER_AccountList.AccountDetails>();
        try {
            WS_TransfersBeneficiaries.OUTPUT executeRes = WS_TransfersBeneficiaries.executeGet();
            if (executeRes != null && executeRes.beneficiaryList != null) {
                for (WS_TransfersBeneficiaries.BeneficiaryData accountsData : executeRes.beneficiaryList) {
                    System.debug('BH_accountsData: ' + JSON.serialize(accountsData));
                    WRAPPER_AccountList.AccountDetails element = new WRAPPER_AccountList.AccountDetails();
                    element.alias = String.isNotBlank(accountsData.alias) ? accountsData.alias : '';
                    // element.type = accountsData.type;
                    if (accountsData.account != null) {
                        element.idType = String.isNotBlank(accountsData.account.accountIdType) ? accountsData.account.accountIdType : '';
                        element.displayNumber = String.isNotBlank(accountsData.account.accountId) ? accountsData.account.accountId : '';
                    }
                    // element.favorite = accountsData.favorite != null ? accountsData.favorite : null;
                    // element.description = accountsData.description;
                    // element.status = accountsData.status;
                    // element.codigoCorporate = accountsData.customerId;
                    // element.customerId = accountsData.customerId;
                    if (accountsData.address != null) {
                        element.country = String.isNotBlank(accountsData.address.country) ? accountsData.address.country : ''; 
                        if (String.isNotBlank(element.country)) {
                            element.mandatoryPurpose = Global_Utilities.getCountryMandatoryPurpose(element.country);
                            String baseCurrency = Global_Utilities.getCountryCurrency(element.country);
                			element.currencyCodeAvailableBalance = String.isNotBlank(baseCurrency) ? baseCurrency : '';
                        }
                        element.countryName = Global_Utilities.getCountryName(element.country);
                        element.address = new WRAPPER_AccountList.Address();
                        element.address.streetName = String.isNotBlank(accountsData.address.streetName) ? accountsData.address.streetName : '';
                        element.address.townName = String.isNotBlank(accountsData.address.townName) ? accountsData.address.townName : '';
                        element.address.country = String.isNotBlank(accountsData.address.country) ? accountsData.address.country : '';
                    }
                    if (accountsData.bank != null) {
                        if (String.isNotBlank(accountsData.bank.bankId)) {
                            String bic_aux = accountsData.bank.bankId;
                            if (bic_aux.length() >= 11) {
                                element.bic = accountsData.bank.bankId.substring(0, 4);
                                element.branch = accountsData.bank.bankId.substring(8, 11);
                                element.locatorbic = accountsData.bank.bankId.substring(6, 8);
                                element.paisbic = accountsData.bank.bankId.substring(4, 6); 
                            } else {
                                element.bic = accountsData.bank.bankId.substring(0, 4);
                                element.branch = 'XXX';
                                element.locatorbic = accountsData.bank.bankId.substring(6, 8);
                                element.paisbic = accountsData.bank.bankId.substring(4, 6); 
                            }
                            element.codigoBic = accountsData.bank.bankId; 
                        }
                        element.bankName = String.isNotBlank(accountsData.bank.bankName) ? accountsData.bank.bankName : '';
                        // element.parentCustomerName = accountsData.parentCustomerName;
                        element.subsidiaryName = String.isNotBlank(accountsData.name) ? accountsData.name : '';
                        //element.lastTransaction = accountsData.lastTransactionDate;
                        /* if (accountsData.mainBalance != null) {
                            element.amountMainBalance = accountsData.mainBalance.amount;
                            element.currencyCodeMainBalance = accountsData.mainBalance.currencyCode;
                            element.lastupdateMainBalance = accountsData.mainBalance.lastUpdate;
                        }
                        if (accountsData.availableBalance != null) {
                            element.amountAvailableBalance = accountsData.availableBalance.amount;
                            element.currencyCodeAvailableBalance = accountsData.availableBalance.currencyCode;
                            element.lastUpdateAvailableBalance = accountsData.availableBalance.lastUpdate;
                        }
                        if (accountsData.withholdingBalance != null) {
                            element.amountWithholdingBalance = accountsData.withholdingBalance.amount;
                            element.currencyCodeWithholdingBalance = accountsData.withholdingBalance.currencyCode;
                            element.lastudpateWithholdingBalance = accountsData.withholdingBalance.lastUpdate;
                        }
                        if (accountsData.overdraftLimit != null) {
                            element.amountOverdraftLimit = accountsData.overdraftLimit.amount;
                            element.currencycodeOverdraftLimit = accountsData.overdraftLimit.currencyCode;
                            element.lastUpdateOverdraftLimit = accountsData.overdraftLimit.lastUpdate;
                        } */
                    }
                    System.debug('BH_element: ' + JSON.serialize(element));

                    res.add(element);
                }
            }
        } catch (Exception e) {
            System.debug('ServiceTransfersBeneficiaries.getBeneficiaries: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return res;
    }

    global static WRAPPER_AccountList.AccountDetails registerNewBeneficiary (WRAPPER_AccountList.AccountDetails data) {
        WRAPPER_AccountList.AccountDetails sourceAccount = new WRAPPER_AccountList.AccountDetails();
        return registerNewBeneficiary(data, sourceAccount);
    }

    global static WRAPPER_AccountList.AccountDetails registerNewBeneficiary (WRAPPER_AccountList.AccountDetails data, WRAPPER_AccountList.AccountDetails sourceAccount) {
        try {
            if (data == null) {
                throw new CustomException('Destination account is mandatory to register new beneficiary');
            }
            checkValuesAccount(data);
            completeAccountDetails(data);
            WS_TransfersBeneficiaries.BeneficiaryData benefData = createBeneficiaryData(data, sourceAccount);
            WS_TransfersBeneficiaries.OUTPUT output = WS_TransfersBeneficiaries.executePost(benefData);
        } catch (Exception e) {
            System.debug('ServiceTransfersBeneficiaries.registerNewBeneficiary: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return data;
    }

    global static void checkValuesAccount (WRAPPER_AccountList.AccountDetails data) {
        try {
            String errorMessage = Label.B2B_Error_Invalid_Input;
            String messageParameter = Label.B2B_Recipient_account;
            String fullMessage = errorMessage.replace('{0}', messageParameter);
            if (data == null) {
                throw new CustomException('Destination account is mandatory to register new beneficiary');
            }
            if (String.isBlank(data.displayNumber)) {
                throw new CustomException('AccountId is mandatory to registre new beneficiary');
            }
            if (String.isBlank(data.country)) {
                throw new CustomException('country is mandatory to registre new beneficiary');
            } else {
                if (data.country.equalsIgnoreCase('ES')) {
                    if (data.displayNumber.length() != 24) {
                        throw new CustomException(fullMessage);
                    }
                } else if (data.country.equalsIgnoreCase('GB')){
                    if (data.displayNumber.length() != 22) {
                        throw new CustomException(fullMessage);
                    }
                } else {
                    throw new CustomException(fullMessage);
                }
            }
            if (String.isBlank(data.subsidiaryName)) {
                throw new CustomException('Account holder is mandatory to registre new beneficiary');
            }
            if (!data.country.equalsIgnoreCase('ES') && !data.country.equalsIgnoreCase('GB')) {
                throw new CustomException(fullMessage);
            }
        } catch (Exception e) {
            System.debug('ServiceTransfersBeneficiaries.checkValuesAccount: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
    }

    // FLOWERPOWER_PARCHE_CPC: Deben revisarse todos los datos que se asignen extras a la cuenta en este metodo.
    global static WRAPPER_AccountList.AccountDetails completeAccountDetails (WRAPPER_AccountList.AccountDetails data) {
        try {
            if (data == null) {
                throw new CustomException('Destination account is mandatory to register new beneficiary');
            }
            String iban = data.displayNumber;
            if (String.isNotBlank(iban)) {
                if (iban.contains('ES')) {
                    data.idType = 'IBA';
                } else {
                    data.idType = 'BBA';
                }
            }
            String country = data.country;
            if (country != null) {
                String baseCurrency = Global_Utilities.getCountryCurrency(country);
                data.currencyCodeAvailableBalance = String.isNotBlank(baseCurrency) ? baseCurrency : '';
                Boolean mandatoryPurpose = Global_Utilities.getCountryMandatoryPurpose(country); 
                data.mandatoryPurpose = mandatoryPurpose;
                data.address = new WRAPPER_AccountList.Address();
                if (country.toLowerCase() == 'es') {
                    data.address.streetName = 'Avda. de Cantabria s/n';
                    data.address.townName = 'Boadilla del Monte, Madrid';
                    data.address.country = 'ES';
                } else if (country.toLowerCase() == 'gb' || country.toLowerCase() == 'uk') {
                    data.address.streetName = '306ª, High Holborn, High Holborn';
                    data.address.townName = 'London';
                    data.address.country = 'GB';
                }
                if (country.toLowerCase() == 'es') {
                    data.bankName = 'SANTANDER ES';
                } else if (country.toLowerCase() == 'gb' || country.toLowerCase() == 'uk') {
                    data.bankName = 'SANTANDER UK';
                }
            }
            ServiceFixByCountry.fixBicByCountry(data);
            data.customerId = '34311586';
        } catch (Exception e) {
            System.debug('ServiceTransfersBeneficiaries.completeAccountDetails: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return data;
    }

    public static WS_TransfersBeneficiaries.BeneficiaryData createBeneficiaryData (WRAPPER_AccountList.AccountDetails data) {
        WRAPPER_AccountList.AccountDetails sourceAccount = new WRAPPER_AccountList.AccountDetails();
        return createBeneficiaryData(data, sourceAccount);
    }
    
    public static WS_TransfersBeneficiaries.BeneficiaryData createBeneficiaryData (WRAPPER_AccountList.AccountDetails data, WRAPPER_AccountList.AccountDetails sourceAccount) {
        WS_TransfersBeneficiaries.BeneficiaryData res = new WS_TransfersBeneficiaries.BeneficiaryData();
        
        try {
            System.debug('sourceAccount: ' + sourceAccount);

            if (data == null) {
                throw new CustomException('Destination account is mandatory to register new beneficiary');
            }
            if (String.isNotBlank(data.subsidiaryName)) {
                res.name = data.subsidiaryName;
            }   
            if (String.isNotBlank(data.displayNumber)) {
                res.account = new WS_TransfersBeneficiaries.Account();
                res.account.accountId = data.displayNumber;
                res.account.accountIdType = data.idType;
            }
            res.bank = new WS_TransfersBeneficiaries.Bank();
            res.address = new WS_TransfersBeneficiaries.Address();
            String country = data.country;
            if (country != null) {
                res.address.country = country;
                res.bank.bankCountry = country;
                res.bank.bankId = data.codigoBic;
                res.bank.bankName =  data.bankName;
            }
            if (sourceAccount != null) {
                res.companyGlobalId = sourceAccount.codigoCorporate;
                if (sourceAccount.companyIdsList != null) {
                    String companyGlobalId = sourceAccount.companyIdsList.get('GLOBAL');
                    if (String.isNotBlank(companyGlobalId)) {
                        res.companyGlobalId = companyGlobalId;
                    }
                }
            }
        } catch (Exception e) {
            System.debug('ServiceTransfersBeneficiaries.createBeneficiaryData: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return res;
    }
}