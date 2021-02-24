public with sharing class CNT_PaymentsLoadUserAccounts {
    
    //global static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; //'MULTI_ONE_TRADE';
    //global static final String NEXUS = System.Label.PAY_ServiceAPILine_002;//'NEXUS';
    //global static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003;//'LOCAL_BANKING';
    
    @AuraEnabled
    public static ReturnValue callToAccountsWithAttributions (WrapperUserData userData, List<String> services) {
        ReturnValue response = null;
        try {
            List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>(); 
            String serviceAPILine = ServiceAPILine.getAPILine (userData);
            
            if(serviceAPILine == System.Label.PAY_ServiceAPILine_002){ //'NEXUS'
                CNT_AccountsParent.getBalanceData('lastUpdate', UserInfo.getUserId());
                accountList = CNT_AccountsParent.accountList;                
            } else if(serviceAPILine == System.Label.PAY_ServiceAPILine_001 || serviceAPILine == System.Label.PAY_ServiceAPILine_003) {//'MULTI_ONE_TRADE' 'LOCAL_BANKING'
                //SNJ - 19-10-2020 - oneTrade or Local Bank accounts                
                CNT_AccountsParent.getBalanceData('oneTrade', UserInfo.getUserId());
                accountList = CNT_AccountsParent.accountList;                 
            }else{
                throw new CustomException('TO-DO');
            } 
            if (!accountList.isEmpty()) {                    
                WS_Attributions wsAttributions = new WS_Attributions();
                wsAttributions.execute(null, null, services, null, null, null);
                if(wsAttributions.getResponse() != null){
                    if(wsAttributions.getResponse().serviceListResponse != null){
                        if(wsAttributions.getResponse().serviceListResponse.serviceDataList != null){
                            // 07-09-2020 - SNJ - comment callout code to not filter accounts by attibutions result                               
                          	accountList = AttributionsService.getAccountsByAttributionsAndServices(accountList, wsAttributions.getResponse().serviceListResponse.serviceDataList, services);
                        }  
                    }
                }
                
            }
            
            
            Map<String, Object> value = new Map<String, Object>();
            if (accountList.isEmpty()) {
                throw new CustomException('Error getting user accounts.');
            } else {
                value.put('accountList', accountList);
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
            if(serviceAPILine == 'NEXUS'){ 
                CNT_AccountsParent.getBalanceData('lastUpdate', UserInfo.getUserId());
                accountList = CNT_AccountsParent.accountList; 
            } else if(serviceAPILine == 'MULTI_ONE_TRADE' || serviceAPILine == 'LOCAL_BANKING'){
                CNT_AccountsParent.getBalanceData('oneTrade', UserInfo.getUserId());
                accountList = CNT_AccountsParent.accountList; 
            }else{
                throw new CustomException('TO-DO');
            }
            Map<String, Object> value = new Map<String, Object>();
            if (accountList.isEmpty()) {
                throw new CustomException('Error getting user accounts.');
            } else {
                value.put('accountList', accountList);
            }
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLoadUserAccounts.callToAccountsWithoutAttributions: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue callToBeneficiaryAccounts (WrapperUserData userData) {
        ReturnValue response = null;
        try {
            List< WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>(); 
            String serviceAPILine = ServiceAPILine.getAPILine (userData);
            if (serviceAPILine == 'NEXUS' || serviceAPILine == 'MULTI_ONE_TRADE') { 
                WS_BeneficiaryAccounts beneficiaryAccounts = new WS_BeneficiaryAccounts(userData);
                accountList = beneficiaryAccounts.execute();
            } else {
                throw new CustomException('TO-DO');
            }
            Map<String, Object> value = new Map<String, Object>();
            if (accountList.isEmpty()) {
                throw new CustomException('Error getting beneficiary accounts.');
            } else {
                value.put('accountList', accountList);
            }
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
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to discard accounts by country 
History
<Date>          <Author>             <Description>
12/11/2020     Shahad Naji        Initial version
----------------------------------------------------------------------------------*/   
    @AuraEnabled
    public static ReturnValue discardAccountsByCountry(WrapperUserData userData, List<WRAPPER_AccountList.AccountDetails> accountList){
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try{
            if(userData == null){
                userData = ServiceUserData.getUserData();
            }
            if(userData != null && !accountList.isEmpty()){
                String serviceAPILine = ServiceAPILine.getAPILine (userData);
                if(serviceAPILine == System.Label.PAY_ServiceAPILine_001 || serviceAPILine == System.Label.PAY_ServiceAPILine_002){
                    
                    String countriesLabel = System.Label.PAY_MultiOneTrade_DiscardAccountCountry;                    
                    if(String.isNotBlank(countriesLabel)){
                        List<String> countries = countriesLabel.split(';');                        
                        response = ServiceFilterAccounts.discardAccountsByCountry(accountList, countries);
                    }else{
                        value.put('accountList', accountList);
                        response = new ReturnValue(true, value);
                    }                    
                }else{
                    value.put('accountList', accountList);
                    response = new ReturnValue(true, value);
                }
            }else{
                throw new CustomException('Error getting user accounts.');
            }
        } catch (Exception e) {
            System.debug('CNT_PaymentsLoadUserAccounts.discardAccountsByCountry: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
        
    }
    
        /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to filter accounts by country and currency 
History
<Date>          <Author>             <Description>
12/11/2020     Shahad Naji        Initial version
----------------------------------------------------------------------------------*/ 
    @AuraEnabled
    public static ReturnValue filterAccountsByCountryAndCurrency(WrapperUserData userData, List<WRAPPER_AccountList.AccountDetails> accountList){
        return ServiceFilterAccounts.filterAccountsByCountryAndCurrency( userData, accountList);
    }

 /*   // FLOWERPOWER_PARCHE_CPC
    private static List<WRAPPER_AccountList.AccountDetails> loadAccountList () {
        List<WRAPPER_AccountList.AccountDetails> response = new List<WRAPPER_AccountList.AccountDetails>();
        WRAPPER_AccountList.AccountDetails account1 = new WRAPPER_AccountList.AccountDetails();
            account1.valueDate = null;
            account1.type = null;
            account1.transactionList = null;
            account1.subsidiaryName = 'CORPORATE GTS 1 ES';
            account1.status = null;
            account1.paisbic = 'ES';
            account1.locatorbic = 'MM';
            account1.lastUpdateOverdraftLimit = null;
            account1.lastupdateMainBalance = null;
            account1.lastUpdateAvailableBalance = '';
            account1.lastudpateWithholdingBalance = null;
            account1.lastTransaction = null;
            account1.internationalPaymentsAllowed = null;
            account1.idType = 'BBA';
            account1.hasSwiftPayment = null;
            account1.displayNumber = '00491500001234567801';
            account1.description = null;
            account1.currencyCodeWithholdingBalance = null;
            account1.currencycodeOverdraftLimit = null;
            account1.currencyCodeMainBalance = null;
            account1.currencyCodeAvailableBalance = 'EUR';
            account1.countryName = 'Spain';
            account1.country = 'ES';
            account1.codigoEmisora = '7';
            account1.codigoCuenta = '6804';
            account1.codigoCorporate = '2938';
            account1.codigoBic = 'BSCHESMMXXX';
            account1.branch = 'XXX';
            account1.bic = 'BSCH';
            account1.bankName = 'BANCO SANTANDER ESPANA';
            account1.amountWithholdingBalance = null;
            account1.amountOverdraftLimit = null;
            account1.amountMainBalance = 0.0;
            account1.amountAvailableBalance = 15325.70;
            account1.aliasEntidad = '';
            account1.aliasCuentaPerfilado = null;
            account1.alias = 'test2020 v2    ';
            account1.accountId = null;
            account1.balanceAllowed = false;
        response.add(account1);
        WRAPPER_AccountList.AccountDetails account2 = new WRAPPER_AccountList.AccountDetails();
            account2.valueDate = '2020-03-03T00:00:00.000+0000';
            account2.type = null;
            account2.transactionList = null;
            account2.subsidiaryName = 'CORPORATE GTS 3 AR';
            account2.status = null;
            account2.paisbic = 'AR';
            account2.locatorbic = 'BA';
            account2.lastUpdateOverdraftLimit = null;
            account2.lastupdateMainBalance = null;
            account2.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
            account2.lastudpateWithholdingBalance = null;
            account2.lastTransaction = null;
            account2.internationalPaymentsAllowed = null;
            account2.idType = 'BBA';
            account2.hasSwiftPayment = null;
            account2.displayNumber = 'GB54ABBY6578956387330';
            account2.description = null;
            account2.currencyCodeWithholdingBalance = null;
            account2.currencycodeOverdraftLimit = null;
            account2.currencyCodeMainBalance = null;
            account2.currencyCodeAvailableBalance = 'USD';
            account2.countryName = 'Argentina';
            account2.country = 'AR';
            account2.codigoEmisora = '104482';
            account2.codigoCuenta = '6864';
            account2.codigoCorporate = '2961';
            account2.codigoBic = 'BSCHARBACAI';
            account2.branch = 'CAI';
            account2.bic = 'BSCH';
            account2.bankName = 'BANCO SANTANDER RIO S.A.';
            account2.amountWithholdingBalance = null;
            account2.amountOverdraftLimit = null;
            account2.amountMainBalance = 123103.0;
            account2.amountAvailableBalance = 10001.0;
            account2.aliasEntidad = '';
            account2.aliasCuentaPerfilado = null;
            account2.alias = '';
            account2.accountId = null;
            account2.balanceAllowed = true;
        response.add(account2);
        WRAPPER_AccountList.AccountDetails account3 = new WRAPPER_AccountList.AccountDetails();
            account3.valueDate = '2020-03-03T00:00:00.000+0000';
            account3.type = null;
            account3.transactionList = null;
            account3.subsidiaryName = 'CORPORATE GTS 3 AR';
            account3.status = null;
            account3.paisbic = 'AR';
            account3.locatorbic = 'BA';
            account3.lastUpdateOverdraftLimit = null;
            account3.lastupdateMainBalance = null;
            account3.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
            account3.lastudpateWithholdingBalance = null;
            account3.lastTransaction = null;
            account3.internationalPaymentsAllowed = null;
            account3.idType = 'BBA';
            account3.hasSwiftPayment = null;
            account3.displayNumber = 'ES54004956387330056782';
            account3.description = null;
            account3.currencyCodeWithholdingBalance = null;
            account3.currencycodeOverdraftLimit = null;
            account3.currencyCodeMainBalance = null;
            account3.currencyCodeAvailableBalance = 'EUR';
            account3.countryName = 'Argentina';
            account3.country = 'AR';
            account3.codigoEmisora = '104992';
            account3.codigoCuenta = '6863';
            account3.codigoCorporate = '2961';
            account3.codigoBic = 'BSCHARBAXXX';
            account3.branch = 'XXX';
            account3.bic = 'BSCH';
            account3.bankName = 'BANCO SANTANDER RIO IC';
            account3.amountWithholdingBalance = null;
            account3.amountOverdraftLimit = null;
            account3.amountMainBalance = 30.0;
            account3.amountAvailableBalance = 10001.0;
            account3.aliasEntidad = '';
            account3.aliasCuentaPerfilado = null;
            account3.alias = 'Test 3.2       ';
            account3.accountId = null;
            account3.balanceAllowed = true;
        response.add(account3);
        WRAPPER_AccountList.AccountDetails account4 = new WRAPPER_AccountList.AccountDetails();
            account4.valueDate = '2020-03-03T00:00:00.000+0000';
            account4.type = null;
            account4.transactionList = null;
            account4.subsidiaryName = 'CORPORATE GTS 2 CL';
            account4.status = null;
            account4.paisbic = 'CL';
            account4.locatorbic = 'RM';
            account4.lastUpdateOverdraftLimit = null;
            account4.lastupdateMainBalance = null;
            account4.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
            account4.lastudpateWithholdingBalance = null;
            account4.lastTransaction = null;
            account4.internationalPaymentsAllowed = null;
            account4.idType = 'BBA';
            account4.hasSwiftPayment = null;
            account4.displayNumber = '00491500001234567803';
            account4.description = null;
            account4.currencyCodeWithholdingBalance = null;
            account4.currencycodeOverdraftLimit = null;
            account4.currencyCodeMainBalance = null;
            account4.currencyCodeAvailableBalance = 'CLP';
            account4.countryName = 'Chile';
            account4.country = 'CL';
            account4.codigoEmisora = '6';
            account4.codigoCuenta = '6861';
            account4.codigoCorporate = '2960';
            account4.codigoBic = 'BSCHCLRMABC';
            account4.branch = 'ABC';
            account4.bic = 'BSCH';
            account4.bankName = 'BANCO DE CHILE SAN';
            account4.amountWithholdingBalance = null;
            account4.amountOverdraftLimit = null;
            account4.amountMainBalance = 2.0;
            account4.amountAvailableBalance = 10001.0;
            account4.aliasEntidad = '';
            account4.aliasCuentaPerfilado = null;
            account4.alias = 'CtaCLP018138GTT';
            account4.accountId = null;
            account4.balanceAllowed = true;
        response.add(account4);
        WRAPPER_AccountList.AccountDetails account5 = new WRAPPER_AccountList.AccountDetails();
            account5.valueDate = '2020-03-03T00:00:00.000+0000';
            account5.type = null;
            account5.transactionList = null;
            account5.subsidiaryName = 'CORPORATE GTS 1 ES';
            account5.status = null;
            account5.paisbic = 'ES';
            account5.locatorbic = 'M0';
            account5.lastUpdateOverdraftLimit = null;
            account5.lastupdateMainBalance = null;
            account5.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
            account5.lastudpateWithholdingBalance = null;
            account5.lastTransaction = null;
            account5.internationalPaymentsAllowed = null;
            account5.idType = 'BBA';
            account5.hasSwiftPayment = null;
            account5.displayNumber = 'ES4800490000000000000000';
            account5.description = null;
            account5.currencyCodeWithholdingBalance = null;
            account5.currencycodeOverdraftLimit = null;
            account5.currencyCodeMainBalance = null;
            account5.currencyCodeAvailableBalance = 'EUR';
            account5.countryName = 'Spain';
            account5.country = 'ES';
            account5.codigoEmisora = '105048';
            account5.codigoCuenta = '6902';
            account5.codigoCorporate = '2938';
            account5.codigoBic = 'BSCHESM0XXX';
            account5.branch = 'XXX';
            account5.bic = 'BSCH';
            account5.bankName = 'GTS SANTANDER ES PRUEBAS';
            account5.amountWithholdingBalance = null;
            account5.amountOverdraftLimit = null;
            account5.amountMainBalance = 1000000.0;
            account5.amountAvailableBalance = 1000001.0;
            account5.aliasEntidad = '';
            account5.aliasCuentaPerfilado = null;
            account5.alias = 'prueba4        ';
            account5.accountId = null;
            account5.balanceAllowed = true;
        response.add(account5);
        WRAPPER_AccountList.AccountDetails account6 = new WRAPPER_AccountList.AccountDetails();
            account6.valueDate = '2020-03-03T00:00:00.000+0000';
            account6.type = null;
            account6.transactionList = null;
            account6.subsidiaryName = 'CORPORATE GTS 1 ES';
            account6.status = null;
            account6.paisbic = 'ES';
            account6.locatorbic = 'M0';
            account6.lastUpdateOverdraftLimit = null;
            account6.lastupdateMainBalance = null;
            account6.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
            account6.lastudpateWithholdingBalance = null;
            account6.lastTransaction = null;
            account6.internationalPaymentsAllowed = null;
            account6.idType = 'BBA';
            account6.hasSwiftPayment = null;
            account6.displayNumber = 'ES9000490000000000000011';
            account6.description = null;
            account6.currencyCodeWithholdingBalance = null;
            account6.currencycodeOverdraftLimit = null;
            account6.currencyCodeMainBalance = null;
            account6.currencyCodeAvailableBalance = 'EUR';
            account6.countryName = 'Spain';
            account6.country = 'ES';
            account6.codigoEmisora = '105048';
            account6.codigoCuenta = '6901';
            account6.codigoCorporate = '2938';
            account6.codigoBic = 'BSCHESM0XXX';
            account6.branch = 'XXX';
            account6.bic = 'BSCH';
            account6.bankName = 'GTS SANTANDER ES PRUEBAS';
            account6.amountWithholdingBalance = null;
            account6.amountOverdraftLimit = null;
            account6.amountMainBalance = 1000000.0;
            account6.amountAvailableBalance = 1000001.0;
            account6.aliasEntidad = '';
            account6.aliasCuentaPerfilado = null;
            account6.alias = '';
            account6.accountId = null;
            account6.balanceAllowed = true;
        response.add(account6);
        WRAPPER_AccountList.AccountDetails account7 = new WRAPPER_AccountList.AccountDetails();
            account7.valueDate = null;
            account7.type = null;
            account7.transactionList = null;
            account7.subsidiaryName = 'CORPORATE GTS 1 ES';
            account7.status = null;
            account7.paisbic = 'ES';
            account7.locatorbic = 'MM';
            account7.lastUpdateOverdraftLimit = null;
            account7.lastupdateMainBalance = null;
            account7.lastUpdateAvailableBalance = '';
            account7.lastudpateWithholdingBalance = null;
            account7.lastTransaction = null;
            account7.internationalPaymentsAllowed = null;
            account7.idType = 'BBA';
            account7.hasSwiftPayment = null;
            account7.displayNumber = 'ES6000491500051234567891';
            account7.description = null;
            account7.currencyCodeWithholdingBalance = null;
            account7.currencycodeOverdraftLimit = null;
            account7.currencyCodeMainBalance = null;
            account7.currencyCodeAvailableBalance = null;
            account7.countryName = 'Spain';
            account7.country = 'ES';
            account7.codigoEmisora = '7';
            account7.codigoCuenta = '6804';
            account7.codigoCorporate = '2938';
            account7.codigoBic = 'BSCHESMMXXX';
            account7.branch = 'XXX';
            account7.bic = 'BSCH';
            account7.bankName = 'BANCO SANTANDER ESPANA';
            account7.amountWithholdingBalance = null;
            account7.amountOverdraftLimit = null;
            account7.amountMainBalance = 0.0;
            account7.amountAvailableBalance = null;
            account7.aliasEntidad = '';
            account7.aliasCuentaPerfilado = null;
            account7.alias = 'test2020 v2    ';
            account7.accountId = null;
            account7.balanceAllowed = true;
        response.add(account7);
        WRAPPER_AccountList.AccountDetails account8 = new WRAPPER_AccountList.AccountDetails();
            account8.valueDate = '2020-03-03T00:00:00.000+0000';
            account8.type = null;
            account8.transactionList = null;
            account8.subsidiaryName = 'CORPORATE GTS 3 AR';
            account8.status = null;
            account8.paisbic = 'AR';
            account8.locatorbic = 'BA';
            account8.lastUpdateOverdraftLimit = null;
            account8.lastupdateMainBalance = null;
            account8.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
            account8.lastudpateWithholdingBalance = null;
            account8.lastTransaction = null;
            account8.internationalPaymentsAllowed = null;
            account8.idType = 'BBA';
            account8.hasSwiftPayment = null;
            account8.displayNumber = 'Banco Santander';
            account8.description = null;
            account8.currencyCodeWithholdingBalance = null;
            account8.currencycodeOverdraftLimit = null;
            account8.currencyCodeMainBalance = null;
            account8.currencyCodeAvailableBalance = 'USD';
            account8.countryName = 'Argentina';
            account8.country = 'AR';
            account8.codigoEmisora = '104482';
            account8.codigoCuenta = '6864';
            account8.codigoCorporate = '2961';
            account8.codigoBic = 'BSCHARBACAI';
            account8.branch = 'CAI';
            account8.bic = 'BSCH';
            account8.bankName = 'BANCO SANTANDER RIO S.A.';
            account8.amountWithholdingBalance = null;
            account8.amountOverdraftLimit = null;
            account8.amountMainBalance = 123103.0;
            account8.amountAvailableBalance = 10001.0;
            account8.aliasEntidad = '';
            account8.aliasCuentaPerfilado = null;
            account8.alias = '';
            account8.accountId = null;
            account8.balanceAllowed = true;
        response.add(account8);
        WRAPPER_AccountList.AccountDetails account9 = new WRAPPER_AccountList.AccountDetails();
            account9.valueDate = '2020-03-03T00:00:00.000+0000';
            account9.type = null;
            account9.transactionList = null;
            account9.subsidiaryName = 'CORPORATE GTS 3 AR';
            account9.status = null;
            account9.paisbic = 'AR';
            account9.locatorbic = 'BA';
            account9.lastUpdateOverdraftLimit = null;
            account9.lastupdateMainBalance = null;
            account9.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
            account9.lastudpateWithholdingBalance = null;
            account9.lastTransaction = null;
            account9.internationalPaymentsAllowed = null;
            account9.idType = 'BBA';
            account9.hasSwiftPayment = null;
            account9.displayNumber = 'EX00720194005000096557GTS';
            account9.description = null;
            account9.currencyCodeWithholdingBalance = null;
            account9.currencycodeOverdraftLimit = null;
            account9.currencyCodeMainBalance = null;
            account9.currencyCodeAvailableBalance = 'EUR';
            account9.countryName = 'Argentina';
            account9.country = 'AR';
            account9.codigoEmisora = '104992';
            account9.codigoCuenta = '6863';
            account9.codigoCorporate = '2961';
            account9.codigoBic = 'BSCHARBAXXX';
            account9.branch = 'XXX';
            account9.bic = 'BSCH';
            account9.bankName = 'BANCO SANTANDER RIO IC';
            account9.amountWithholdingBalance = null;
            account9.amountOverdraftLimit = null;
            account9.amountMainBalance = 30.0;
            account9.amountAvailableBalance = 10001.0;
            account9.aliasEntidad = '';
            account9.aliasCuentaPerfilado = null;
            account9.alias = 'Test 3.2       ';
            account9.accountId = null;
            account9.balanceAllowed = true;
        response.add(account9);
        WRAPPER_AccountList.AccountDetails account10 = new WRAPPER_AccountList.AccountDetails();
            account10.valueDate = '2020-03-03T00:00:00.000+0000';
            account10.type = null;
            account10.transactionList = null;
            account10.subsidiaryName = 'CORPORATE GTS 2 CL';
            account10.status = null;
            account10.paisbic = 'CL';
            account10.locatorbic = 'RM';
            account10.lastUpdateOverdraftLimit = null;
            account10.lastupdateMainBalance = null;
            account10.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
            account10.lastudpateWithholdingBalance = null;
            account10.lastTransaction = null;
            account10.internationalPaymentsAllowed = null;
            account10.idType = 'BBA';
            account10.hasSwiftPayment = null;
            account10.displayNumber = '00350401005100018138GTS';
            account10.description = null;
            account10.currencyCodeWithholdingBalance = null;
            account10.currencycodeOverdraftLimit = null;
            account10.currencyCodeMainBalance = null;
            account10.currencyCodeAvailableBalance = 'CLP';
            account10.countryName = 'Chile';
            account10.country = 'CL';
            account10.codigoEmisora = '6';
            account10.codigoCuenta = '6861';
            account10.codigoCorporate = '2960';
            account10.codigoBic = 'BSCHCLRMABC';
            account10.branch = 'ABC';
            account10.bic = 'BSCH';
            account10.bankName = 'BANCO DE CHILE SAN';
            account10.amountWithholdingBalance = null;
            account10.amountOverdraftLimit = null;
            account10.amountMainBalance = 2.0;
            account10.amountAvailableBalance = 10001.0;
            account10.aliasEntidad = '';
            account10.aliasCuentaPerfilado = null;
            account10.alias = 'CtaCLP018138GTT';
            account10.accountId = null;
            account10.balanceAllowed = true;
        response.add(account10);
        WRAPPER_AccountList.AccountDetails account11 = new WRAPPER_AccountList.AccountDetails();
            account11.valueDate = '2020-03-03T00:00:00.000+0000';
            account11.type = null;
            account11.transactionList = null;
            account11.subsidiaryName = 'CORPORATE GTS 1 ES';
            account11.status = null;
            account11.paisbic = 'ES';
            account11.locatorbic = 'M0';
            account11.lastUpdateOverdraftLimit = null;
            account11.lastupdateMainBalance = null;
            account11.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
            account11.lastudpateWithholdingBalance = null;
            account11.lastTransaction = null;
            account11.internationalPaymentsAllowed = null;
            account11.idType = 'BBA';
            account11.hasSwiftPayment = null;
            account11.displayNumber = 'ES4800490000000000000000';
            account11.description = null;
            account11.currencyCodeWithholdingBalance = null;
            account11.currencycodeOverdraftLimit = null;
            account11.currencyCodeMainBalance = null;
            account11.currencyCodeAvailableBalance = 'EUR';
            account11.countryName = 'Spain';
            account11.country = 'ES';
            account11.codigoEmisora = '105048';
            account11.codigoCuenta = '6902';
            account11.codigoCorporate = '2938';
            account11.codigoBic = 'BSCHESM0XXX';
            account11.branch = 'XXX';
            account11.bic = 'BSCH';
            account11.bankName = 'GTS SANTANDER ES PRUEBAS';
            account11.amountWithholdingBalance = null;
            account11.amountOverdraftLimit = null;
            account11.amountMainBalance = 1000000.0;
            account11.amountAvailableBalance = 1000001.0;
            account11.aliasEntidad = '';
            account11.aliasCuentaPerfilado = null;
            account11.alias = 'prueba4        ';
            account11.accountId = null;
            account11.balanceAllowed = true;
        response.add(account11);
        WRAPPER_AccountList.AccountDetails account12 = new WRAPPER_AccountList.AccountDetails();
            account12.valueDate = '2020-03-03T00:00:00.000+0000';
            account12.type = null;
            account12.transactionList = null;
            account12.subsidiaryName = 'CORPORATE GTS 1 ES';
            account12.status = null;
            account12.paisbic = 'ES';
            account12.locatorbic = 'M0';
            account12.lastUpdateOverdraftLimit = null;
            account12.lastupdateMainBalance = null;
            account12.lastUpdateAvailableBalance = '2020-03-03T00:00:00.000+0000';
            account12.lastudpateWithholdingBalance = null;
            account12.lastTransaction = null;
            account12.internationalPaymentsAllowed = null;
            account12.idType = 'BBA';
            account12.hasSwiftPayment = null;
            account12.displayNumber = 'ES9000490000000000000011';
            account12.description = null;
            account12.currencyCodeWithholdingBalance = null;
            account12.currencycodeOverdraftLimit = null;
            account12.currencyCodeMainBalance = null;
            account12.currencyCodeAvailableBalance = 'EUR';
            account12.countryName = 'Spain';
            account12.country = 'ES';
            account12.codigoEmisora = '105048';
            account12.codigoCuenta = '6901';
            account12.codigoCorporate = '2938';
            account12.codigoBic = 'BSCHESM0XXX';
            account12.branch = 'XXX';
            account12.bic = 'BSCH';
            account12.bankName = 'GTS SANTANDER ES PRUEBAS';
            account12.amountWithholdingBalance = null;
            account12.amountOverdraftLimit = null;
            account12.amountMainBalance = 1000000.0;
            account12.amountAvailableBalance = 1000001.0;
            account12.aliasEntidad = '';
            account12.aliasCuentaPerfilado = null;
            account12.alias = '';
            account12.accountId = null;
            account12.balanceAllowed = true;
        response.add(account12);
        response=formatDates(response);
        System.debug('resposne');
        System.debug(response);
        for (WRAPPER_AccountList.AccountDetails a : response){
            System.debug(a.valueDate);
        }
        return response;
    }*/

    public static List<WRAPPER_AccountList.AccountDetails> formatDates (List<WRAPPER_AccountList.AccountDetails> response) {
        try {
            if(!response.isEmpty()){
                for (WRAPPER_AccountList.AccountDetails a : response){
                    if(a.valueDate !='' && a.valueDate!=null){
                        a.valueDate = String.ValueofGmt(DateTime_Utilities.getDateTime(a.valueDate,0));
                    }
                    if(a.lastUpdateAvailableBalance !='' && a.lastUpdateAvailableBalance!=null){
                        a.lastUpdateAvailableBalance = String.ValueofGmt(DateTime_Utilities.getDateTime(a.lastUpdateAvailableBalance,0));
                    }
                }
            }
        } catch (Exception e) {
            System.debug('CNT_B2B_SelectAccount.getUserFormatString: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return response;
    }
    
   
}