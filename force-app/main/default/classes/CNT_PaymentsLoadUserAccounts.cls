public with sharing class CNT_PaymentsLoadUserAccounts {

    public static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; //'MULTI_ONE_TRADE';
    public static final String NEXUS = System.Label.PAY_ServiceAPILine_002;//'NEXUS';
    public static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003;//'LOCAL_BANKING';

    //19-11-2020 - Shahad Naji - Restructure the method to get Accounts List according to ServiceAPILine and transferType
    @AuraEnabled
    public static ReturnValue callToAccountsWithAttributions (WrapperUserData userData, String transferType) {
        ReturnValue response = null;
        try {
            List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
            String serviceAPILine = ServiceAPILine.getAPILine (userData);
            if (serviceAPILine == NEXUS) {
                CNT_AccountsParent.getBalanceData('lastUpdate', UserInfo.getUserId());
                accountList = CNT_AccountsParent.accountList;
            } else if (serviceAPILine == MULTI_ONE_TRADE|| serviceAPILine == LOCAL_BANKING) {
                CNT_AccountsParent.getBalanceData('oneTrade', UserInfo.getUserId());
                accountList = CNT_AccountsParent.accountList;
            } else {
                throw new CustomException('To-Do');
            }
            if (accountList != null) {
                if (!accountList.isEmpty()) {
                    List<String> servicesList = CNT_PaymentsLoadUserAccounts.getServices(userData, serviceAPILine, transferType);
                    if (serviceAPILine == NEXUS || serviceAPILine == MULTI_ONE_TRADE) {
                        accountList = ServiceFilterAccounts.filterAccountsByAttributions(accountList, servicesList);
                    } else if (serviceAPILine == LOCAL_BANKING) {
                        accountList = ServiceFilterAccounts.filterAccountsByChannelServices(userData, accountList, servicesList);
                    } else {
                        throw new CustomException('To-Do');
                    }
                } else {
                    throw new CustomException('Error getting user accounts.');
                }
            } else {
                throw new CustomException('Error getting user accounts.');
            }
            Map<String, Object> value = new Map<String, Object>();
            if (accountList != null) {
                if (!accountList.isEmpty()) {
                    value.put('accountList', ServiceFixByCountry.fixBicByCountry(accountList));
                } else {
                    throw new CustomException('Error getting user accounts.');
                }
            } else {
                throw new CustomException('Error getting user accounts.');
            }
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLoadUserAccounts.callToAccountsWithAttributions: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    //29-09-2020 - Shahad Naji - Method to retrieve Real Time Balance Accounts without calling Attributions service
    //19-10-2020 - Shahad Naji - oneTrade or Local Bank accounts
    //26-10-2020 - Shahad Naji - Call ServiceAPILine.getAPILine(...) to retrieve source data
    @AuraEnabled
    public static ReturnValue callToAccountsWithoutAttributions (WrapperUserData userData) {
        ReturnValue response = null;

        try {
            List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
            String serviceAPILine = ServiceAPILine.getAPILine (userData);
            if(serviceAPILine == NEXUS){
                CNT_AccountsParent.getBalanceData('lastUpdate', UserInfo.getUserId());
                accountList = CNT_AccountsParent.accountList;
            } else if(serviceAPILine == MULTI_ONE_TRADE|| serviceAPILine == LOCAL_BANKING){
                CNT_AccountsParent.getBalanceData('oneTrade', UserInfo.getUserId());
                accountList = CNT_AccountsParent.accountList;
            }else{
                throw new CustomException('TO-DO');
            }
            Map<String, Object> value = new Map<String, Object>();
            if (accountList.isEmpty()) {
                throw new CustomException('Error getting user accounts.');
            } else {
                value.put('accountList', ServiceFixByCountry.fixBicByCountry(accountList));
            }
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLoadUserAccounts.callToAccountsWithoutAttributions: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue callToBeneficiaryAccounts (WrapperUserData userData, String transferType, WRAPPER_AccountList.AccountDetails sourceAccount, List<WRAPPER_AccountList.AccountDetails> originAccounts) {
        ReturnValue response = null;
        try {
            List< WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
            String serviceAPILine = ServiceAPILine.getAPILine();
            String PTT_instant_transfer = System.Label.PTT_instant_transfer;
            String PTT_international_transfer_single = System.Label.PTT_international_transfer_single;
            if (transferType == PTT_international_transfer_single) {
                // FLOWERPOWER_PARCHE_JHM
                //if (serviceAPILine == LOCAL_BANKING) {
                    accountList = ServiceTransfersBeneficiaries.getBeneficiaries();
                //} else { 
                //    throw new CustomException('Incorrect user type.');
                //}
            } else if (transferType == PTT_instant_transfer) {
                if (serviceAPILine == NEXUS || serviceAPILine == MULTI_ONE_TRADE) {
                    WS_BeneficiaryAccounts beneficiaryAccounts = new WS_BeneficiaryAccounts(userData, sourceAccount);
                    accountList = beneficiaryAccounts.execute();
                } else {
                    throw new CustomException('Incorrect user type.');
                }
                if (accountList.isEmpty()) {
                    throw new CustomException('Error getting beneficiary accounts.');
                }
            } else {
                throw new CustomException('Transfer type is not informed.');
            }
            if(originAccounts.isEmpty()){	
                throw new CustomException('Origin accounts are not informed.');	
            }else{	
            	ServiceFilterAccounts.filterBalanceView(accountList, originAccounts);	
            }
            Map<String, Object> value = new Map<String, Object>();
            value.put('accountList', ServiceFixByCountry.fixBicByCountry(accountList));
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLoadUserAccounts.callToBeneficiaryAccounts: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue encryptAccountsData (String str) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            Blob data = Blob.valueOf(str);
            Blob cryptoKey = EncodingUtil.base64Decode(cryptoKey__c.getOrgDefaults().cryptoKey__c);
            Blob encryptedData = Crypto.encryptWithManagedIV('AES256', cryptoKey, data);
            String result = EncodingUtil.base64Encode(encryptedData);
            value.put('result', result);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLoadUserAccounts.encryptData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue decryptAccountsData (String str) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            Blob cryptoKey = EncodingUtil.base64Decode(cryptoKey__c.getOrgDefaults().cryptoKey__c);
            Blob decryptedData = Crypto.decryptWithManagedIV('AES256', cryptoKey, EncodingUtil.base64Decode(str));
            String result =  decryptedData.toString();
            value.put('result', result);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLoadUserAccounts.decryptData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to discard accounts by country
    History
    <Date>          <Author>            <Description>
    12/11/2020      Shahad Naji         Initial version
    */
    @AuraEnabled
    public static ReturnValue discardAccountsByCountry (WrapperUserData userData, List<WRAPPER_AccountList.AccountDetails> accountList) {
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();

        String countriesLabel = '';
        try{
            if (userData == null) {
                userData = ServiceUserData.getUserData();
            }
            if (userData != null && !accountList.isEmpty()) {
                String serviceAPILine = ServiceAPILine.getAPILine (userData);
                if (serviceAPILine == MULTI_ONE_TRADE) {
                    countriesLabel = System.Label.PAY_MultiOneTrade_DiscardAccountCountry;
                } else if(serviceAPILine == NEXUS) {
                    // value.put('accountList', accountList);
                    // response = new ReturnValue(true, value);
                    countriesLabel = 'N/A';
                } else if (serviceAPILine == LOCAL_BANKING) {
                    countriesLabel = System.Label.PAY_LocalBanking_DicardAccountCountry;
                } else {
                     throw new CustomException('Error getting user accounts.');
                }
                if (String.isNotBlank(countriesLabel)) {
                    if (countriesLabel != 'N/A') {
                        List<String> countries = countriesLabel.split(';');
                        accountList = new List<WRAPPER_AccountList.AccountDetails>(ServiceFilterAccounts.discardAccountsByCountry(accountList, countries));
                         value.put('accountList', accountList);
                        response = new ReturnValue(true, value);
                    } else {
                        value.put('accountList', accountList);
                        response = new ReturnValue(true, value);
                    }
                } else {
                    value.put('accountList', accountList);
                    response = new ReturnValue(true, value);
                }
            } else {
                throw new CustomException('Error getting user accounts.');
            }
        } catch (Exception e) {
            System.debug('CNT_PaymentsLoadUserAccounts.discardAccountsByCountry: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;

    }

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to filter accounts by country and currency
    History
    <Date>          <Author>            <Description>
    12/11/2020      Shahad Naji         Initial version
    */
    @AuraEnabled
    public static ReturnValue filterAccountsByCountryAndCurrency (WrapperUserData userData, List<WRAPPER_AccountList.AccountDetails> accountList) {
           ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try {
            List<WRAPPER_AccountList.AccountDetails> accountListResponse = new List<WRAPPER_AccountList.AccountDetails>(ServiceFilterAccounts.filterAccountsByCountryAndCurrency( userData, accountList));
            if (accountListResponse != null) {
                if (!accountListResponse.isEmpty()) {
                    value.put('accountList', accountListResponse);
                    response = new ReturnValue(true, value);
                } else {
                     response = new ReturnValue(false);
                }
            } else {
                response = new ReturnValue(false);
            }
        } catch (Exception e) {
            System.debug('CNT_PaymentsLoadUserAccounts.filterAccountsByCountryAndCurrency: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
          return response;
    }

    /* public static List<WRAPPER_AccountList.AccountDetails> formatDates (List<WRAPPER_AccountList.AccountDetails> response) {
        try {
            if (!response.isEmpty()) {
                for (WRAPPER_AccountList.AccountDetails a : response) {
                    if (a.valueDate != '' && a.valueDate != null) {
                        a.valueDate = String.ValueofGmt(DateTime_Utilities.getDateTime(a.valueDate, 0));
                    }
                    if (a.lastUpdateAvailableBalance != '' && a.lastUpdateAvailableBalance != null) {
                        a.lastUpdateAvailableBalance = String.ValueofGmt(DateTime_Utilities.getDateTime(a.lastUpdateAvailableBalance,0));
                    }
                }
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAccount.getUserFormatString: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return response;
    } */

    /*
    Author:         Cándido Parejo
    Company:        Deloitte
    Description:    Method to get service list
    History
    <Date>          <Author>             <Description>
    19/11/2020     Shahad Naji        Initial version
    */
    private static List<String> getServices (WrapperUserData userData, String serviceAPILine, String transferType) {
        List<String> servicesList = new List<String>();
        String PTT_instant_transfer = System.Label.PTT_instant_transfer;
        String PTT_international_transfer_single = System.Label.PTT_international_transfer_single;
        if (transferType == PTT_instant_transfer) {
            servicesList.add('add_international_payment_internal');
        } else if (transferType == PTT_international_transfer_single) {
            servicesList.add('add_inter_paym_int_cust_diff_group');
        }
        return servicesList;
    }
}