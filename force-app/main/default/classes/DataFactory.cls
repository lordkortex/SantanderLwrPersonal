/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    This class is use to create all data in tests classes that we have need.
Test Class:     DataFactory_Test
History
<Date>          <Author>         <Description>
19/11/2019      Pablo Tejedor    Initial version
----------------------------------------------------------------------------------*/

public with sharing class DataFactory {

/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Method to create custom setting cryptoKey for test
History
<Date>          <Author>         <Description>
19/11/2019      Pablo Tejedor    Initial version
----------------------------------------------------------------------------------*/
    @TestVisible
    public static List<cryptoKey__c> getCustomSettingCryptoKey (Boolean insertSettings){

        List<cryptoKey__c> crytoKeyList = new List<cryptoKey__c>();

        cryptoKey__c cryptoKeyCS = new cryptoKey__c();
        cryptoKeyCS.cryptoKey__c = 'diVx0f8icCEue3thX94RbuhAPh7z3nwuK1Q5bY/dCaY=';

        if(insertSettings){
            if(Schema.sObjectType.cryptoKey__c.isCreateable()){
                Insert cryptoKeyCS;
                crytoKeyList.add(cryptoKeyCS);

            }else{
                return null;
            }
        }
        return crytoKeyList;

    }

    /*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Method to create custom setting cryptoKey for test
History
<Date>          <Author>         <Description>
19/11/2019      Pablo Tejedor    Initial version
----------------------------------------------------------------------------------*/
 public static List<WRAPPER_AccountList.AccountDetails> getAccountList (){

         List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();

        WRAPPER_AccountList.AccountDetails accWraperUno  = new WRAPPER_AccountList.AccountDetails();
        WRAPPER_AccountList.AccountDetails accWraperDos  = new WRAPPER_AccountList.AccountDetails();
        WRAPPER_AccountList.AccountDetails accWrapertres = new WRAPPER_AccountList.AccountDetails();

        accWraperUno.accountId = 'Spain_'+1;
        accWraperUno.country = 'ESP';
        accWraperUno.alias = 'Subsidiary Name 1';
        accWraperUno.lastUpdateAvailableBalance = Global_Utilities.getCurrentUserDateTime();
        accWraperUno.displayNumber = 'ES26 0110 7298 5555 8888 1589';
        accWraperUno.bankName = 'Banco Santander';
        accWraperUno.amountMainBalance = 8343765.17;
        accWraperUno.amountAvailableBalance = 8045086.17;
        accWraperUno.currencyCodeAvailableBalance = 'EUR';
        accountList.add(accWraperUno);

        accWraperDos.accountId = 'Spain_'+2;
        accWraperDos.country = 'ESP';
        accWraperDos.alias = 'Subsidiary Name 2';
        accWraperDos.lastUpdateAvailableBalance = Global_Utilities.getCurrentUserDateTime();
        accWraperDos.displayNumber = 'ES26 0110 7298 5555 8888 1589';
        accWraperDos.bankName = 'Banco Santander';
        accWraperDos.amountMainBalance = 9500500.84;
        accWraperDos.amountAvailableBalance = 7945086.17 ;
        accWraperDos.currencyCodeAvailableBalance = 'EUR';
        accountList.add(accWraperDos);


        accWrapertres.accountId = 'Gran_Britain_'+2;
        accWrapertres.country = 'GBR';
        accWrapertres.alias = 'Subsidiary Name 1';
        accWrapertres.lastUpdateAvailableBalance = Global_Utilities.getCurrentUserDateTime();
        accWrapertres.displayNumber = 'GB26 0110 7298 5555 8888 1589';
        accWrapertres.bankName = 'Banco Santander';
        accWrapertres.amountMainBalance = 3100700.17;
        accWrapertres.amountAvailableBalance = 2945086.17 ;
        accWrapertres.currencyCodeAvailableBalance = 'GBP';
        accountList.add(accWrapertres);

        return accountList;

    }

    /*----------------------------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Method to create an user to use in test methods.
History
<Date>          <Author>         <Description>
19/11/2019      Joaquin Vera    Initial version
13/01/2020      Shahad Naji     Adds USER_TXT_GlobalId__c when creating a new user
12/02/2020      Shahad Naji     Adding DateTime.now().getTime() to USER_TXT_GlobalId__c because it is a unique value field of user
----------------------------------------------------------------------------------*/
    @TestVisible
    public static User getRunningUser(boolean insertUser)
    {

        Profile p;
        if(Schema.sObjectType.Profile.isAccessible()&&
        Schema.sObjectType.Profile.fields.Id.isAccessible())
        {
            p = [Select Id from Profile where Name='System Administrator' LIMIT 1];
        }
        // Setup test data
        // Create a unique UserName
        String uniqueUserName = 'standarduser' + DateTime.now().getTime() + '@testorg.com';

        UserRole adminRole;
        if(Schema.sObjectType.UserRole.isAccessible()&&
        Schema.sObjectType.UserRole.fields.Id.isAccessible())
        {
        	adminRole = [SELECT ID FROM UserRole WHERE Name = 'Admin'];
        }
        // This code runs as the system user

        User user = new User();
        user.Alias='alias';
        user.Email='test@test.es';
        user.EmailEncodingKey='UTF-8';
        user.LastName='Test';
        user.FirstName = 'Peter';
        user.LanguageLocaleKey='en_US';
        user.LocaleSidKey='en_US';
        user.TimeZoneSidKey='America/Los_Angeles';
        user.ProfileId=p.Id;
        user.UserName=uniqueUserName;
        user.USER_TXT_GlobalId__c = 'DummyDataGlobalId' + DateTime.now().getTime();
        user.CurrencyIsoCode = 'EUR';
        user.USER_NumberFormat__c = '###.###.###,##';
        user.User_DateFormat__c = 'dd/MM/yyyy';
        user.USER_CHK_CashNexus__c=false;
        user.USER_CHK_TermsConditions__c=false;
        user.USER_TXT_BIC__c='BIC0GB00000';
        user.UserRoleId = adminRole.Id;

        if(insertUser)
        {
            if(Schema.sObjectType.User.isCreateable())
            {
                insert user;
            }
        }

        return user;


    }

    /*
    Author:         Pablo Tejedor Salas
    Company:        Deloitte
    Description:    Method to create a custom setting with the configurations about the webservice.
    History
    <Date>          <Author>         <Description>
    16/12/2019      Pablo Tejedor    Initial version
    */
    public static Map<String,CNT_ApiConfiguration__c> createWsConfigurationSetting (Boolean insertSettings) {
        List<CNT_ApiConfiguration__c> listCustomSettings = new List<CNT_ApiConfiguration__c>();
        Map<String,CNT_ApiConfiguration__c> mapSettingToRecord = new Map<String,CNT_ApiConfiguration__c>();

        CNT_ApiConfiguration__c wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_SendPaymentProcess';
        wsSetting.CNT_Endpoint__c = 'https://e-paymenthub-cert.de-c1.cloudhub.io/api/payments';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_GetMovementHistoryData';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/extracts/history?accountCode={}&dateTo={}dateFrom={}';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_GetExtractData';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/extracts/12314?account={account}&dateTo={dateTo}';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_WRAPPERSWIFTPAYMENT';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/payments_tracker';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);
        
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_DownloadAllPayments';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/payments_tracker/download ';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_GetGroups';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/admin/groups';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_Transactions_Download';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/payments_tracker/{uetr}?{agent}=example';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BalanceDownloadEOD';
        wsSetting.CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/nx/balance/tree/download?order={order}&currency={currency}&bookBalance={bookBalance}&valueBalance={valueBalance}';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_GetIPTDetail';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/payments_tracker/{uetr}?{agent}=example';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'OTPIniciateLocal_Strategic';
        wsSetting.CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/execution/signatures';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        wsSetting.tokenPlatform__c = 'GTS';
        wsSetting.tokenUser__c = 'local';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_GetLoginInfo';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/inicio';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_GetLogs';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/admin/logs';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_AccountTransactions_Search    ';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/balance/transactions?codigoCuenta={accountCode}&indicadorOrdenacion=D&typeBalance={typeOfBalance}&fecha={searchDateTime}';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_Transactions_Search';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/balance/transactions';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'B2B_SignatureStructure_Local';
        wsSetting.CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/structure/signatures?operation_id=00000001&service_id={service_id}&amount={amount}&currency={currency}';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        wsSetting.tokenPlatform__c = 'GTS';
        wsSetting.tokenUser__c = 'local';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_GetRolesData';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/admin/roles';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BalanceLastUpdate';
        wsSetting.CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/nx/inicio/home';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BalanceEOD';
        wsSetting.CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/nx/balance';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_Users_GetUserInfo';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/admin/users/[]';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_Users_RetrieveUsers';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/admin/users';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_IPTDetailParentGetSteps';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/payments_tracker/{str}';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BackFrontPain002TableDeactivePain';
        wsSetting.CNT_Endpoint__c = '   https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/accounts/{filters}?has_swift_payments=true&pain002_active=false';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BackFrontPain002TableGetPain';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/accounts/pain002?active=true&company_id=';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BackFrontPain002TableDeletePain';
        wsSetting.CNT_Endpoint__c = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/accounts/{account}/{bic}';
        wsSetting.CNT_HTTPMethod__c = 'DELETE';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_DownloadMT103';
        wsSetting.CNT_Endpoint__c = '   https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/payments_tracker/{input}/messages_mt103';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BackFrontPain002TableActivePain';
        wsSetting.CNT_Endpoint__c ='https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/accounts/pain002';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // SNJ - 22/04/2020 - Adding PersonalSettings
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'PersonalSettings';
        wsSetting.CNT_Endpoint__c ='https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/admin/personalSettings';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // SNJ - 22/04/2020 - Adding CNT_AccountDetails_ChangeAliasBank
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_AccountDetails_ChangeAliasBank';
        wsSetting.CNT_Endpoint__c ='https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/admin/alias/bank';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // SNJ - 22/04/2020 - Adding CNT_AccountDetails_ChangeAliasAccount
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_AccountDetails_ChangeAliasAccount';
        wsSetting.CNT_Endpoint__c ='https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/admin/alias/account';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // ADR - 11/08/2020 - Adding CNT_BackFrontAccountConverterSearch
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BackFrontAccountConverterSearch';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/search';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // ADR - 11/08/2020 - Adding CNT_BackFrontAccountConverterCreate
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BackFrontAccountConverterCreate';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/cuentas';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // ADR - 11/08/2020 - Adding CNT_BackFrontAccountConverterModify
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BackFrontAccountConverterModify';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/cuentas/{bankId}/{accountId}';
        wsSetting.CNT_HTTPMethod__c = 'PUT';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // ADR - 11/08/2020 - Adding CNT_BackFrontAccountConverterDelete
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_BackFrontAccountConverterDelete';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/cuentas/{bankId}/{accountId}';
        wsSetting.CNT_HTTPMethod__c = 'DELETE';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 09/11/2020 - Adding AttributionService
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_Attributions';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/nx/channel_services';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 09/11/2020 - Adding executePayment
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'B2B_executePayment';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/payment_orchestration';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 09/11/2020 - Adding store signature
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'B2B_StoreSignature';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/operation_signature/add_signer';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 09/11/2020 - Adding OTPInitiate
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'OTPInitiate';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/globalid/initiate_sca';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 09/11/2020 - Adding OTPIniciate_Strategic
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'OTPIniciate_Strategic';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/globalid/identity_initiate_sca/otp';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 09/11/2020 - Adding OTPValidate
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'OTPValidate';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/globalid/validate_sca';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 09/11/2020 - Adding WS_TrackingPaymentOperation
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_TrackingPaymentOperation';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/operation_tracking/operation/{paymentId}';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 10/11/2020 - Adding B2B_SignatureStructure_Nexus
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'B2B_SignatureStructure_Nexus';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/signature_structure?service_id={service_id}&currency={currency}&channel={channel}&amount={amount}&operation_id={operation_id}&customer_id={customer_id}';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 10/11/2020 - Adding WS_ExchangeRate
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_ExchangeRate';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/request/countervalue';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        wsSetting.tokenPlatform__c = 'GTS';
        wsSetting.tokenUser__c = 'local';
        wsSetting.CNT_Service__c = 'local';
        listCustomSettings.add(wsSetting);

        // 10/11/2020 - Adding B2B_AccountValidation
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'B2B_AccountValidation';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/me/accounts/{account_id}/validate_information?account_id_type={accountIdType}';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        wsSetting.tokenPlatform__c = 'GTS';
        wsSetting.tokenUser__c = 'local';
        listCustomSettings.add(wsSetting);

        // 10/11/2020 - Adding WS_TransactionalLimits
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_TransactionalLimits';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/orchestration_limits';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 10/11/2020 - Adding WS_TransactionalLimits
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_TransferFees';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/prices';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_GetMeAccountDetails';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/me/accounts/{account_id}?account_id_type={accountIdType}';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_DominantCurrency';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/currencies/dominant';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 10/11/2020 - Adding WS_CreatePaymentOperation
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_CreatePaymentOperation';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/operation_tracking/create_operation';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_GetPaymentDetail
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_GetPaymentDetail';
        wsSetting.CNT_Endpoint__c ='https://WS_GetPaymentDetail';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_OperationsByStatus
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_OperationsByStatus';
        wsSetting.CNT_Endpoint__c ='https://WS_OperationsByStatus';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // CNT_DownloadsTransactions
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_DownloadsTransactions';
        wsSetting.CNT_Endpoint__c ='https://CNT_DownloadsTransactions';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // CNT_DownloadsTransactionsLast
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_DownloadsTransactionsLast';
        wsSetting.CNT_Endpoint__c ='https://CNT_DownloadsTransactionsLast';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // CNT_DownloadsFichPost
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_DownloadsFichPost';
        wsSetting.CNT_Endpoint__c ='https://CNT_DownloadsFichPost';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_CancelBookToBook
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_CancelBookToBook';
        wsSetting.CNT_Endpoint__c ='https://WS_CancelBookToBook';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_TransactionalLimitsUpdate
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_TransactionalLimitsUpdate';
        wsSetting.CNT_Endpoint__c ='https://WS_TransactionalLimitsUpdate';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        wsSetting.tokenPlatform__c = 'GTS';
        wsSetting.tokenUser__c = 'local';
        listCustomSettings.add(wsSetting);

        // WS_TransactionalLimitsReverse
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_TransactionalLimitsReverse';
        wsSetting.CNT_Endpoint__c ='https://WS_TransactionalLimitsReverse';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        wsSetting.tokenPlatform__c = 'GTS';
        wsSetting.tokenUser__c = 'local';
        listCustomSettings.add(wsSetting);

        // WS_TransactionalLimitsValidation
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_TransactionalLimitsValidation';
        wsSetting.CNT_Endpoint__c ='https://WS_TransactionalLimitsValidation';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        wsSetting.tokenPlatform__c = 'GTS';
        wsSetting.tokenUser__c = 'local';
        listCustomSettings.add(wsSetting);

        // WS_Fraud
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_Fraud';
        wsSetting.CNT_Endpoint__c ='https://WS_Fraud';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        wsSetting.tokenPlatform__c = 'GTS';
        wsSetting.tokenUser__c = 'local';
        listCustomSettings.add(wsSetting);

        // WS_CancelBuySell
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_CancelBuySell';
        wsSetting.CNT_Endpoint__c ='https://WS_CancelBuySell';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.tokenPlatform__c = 'FakeToken';
        wsSetting.tokenUser__c = 'FakeToken';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // CNT_StatementMovementsSearch
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_StatementMovementsSearch';
        wsSetting.CNT_Endpoint__c ='https://CNT_StatementMovementsSearch';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service_URI__c= 'test';
        wsSetting.tokenPlatform__c = 'FakeToken';
        wsSetting.tokenUser__c = 'FakeToken';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // CNT_Transactions_Search_OneTrade
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_Transactions_Search_OneTrade';
        wsSetting.CNT_Endpoint__c ='https://CNT_Transactions_Search_OneTrade';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_BeneficiaryAccounts
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_BeneficiaryAccounts';
        wsSetting.CNT_Endpoint__c ='https://WS_BeneficiaryAccounts';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_OperationsList
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_OperationsList';
        wsSetting.CNT_Endpoint__c ='https://WS_OperationsList';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_FCCDowJones
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_FCCDowJones';
        wsSetting.CNT_Endpoint__c ='https://WS_FCCDowJones';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // CNT_OneT_AccountDetails
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_OneT_AccountDetails';
        wsSetting.CNT_Endpoint__c ='https://CNT_OneT_AccountDetails';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // CNT_OneT_Accounts
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_OneT_Accounts';
        wsSetting.CNT_Endpoint__c ='https://CNT_OneT_Accounts';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // AccountService
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'AccountService';
        wsSetting.CNT_Endpoint__c ='https://AccountService';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_ChannelServices
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_ChannelServices';
        wsSetting.CNT_Endpoint__c ='https://WS_ChannelServices';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_VAMGetList
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_VAMGetList';
        wsSetting.CNT_Endpoint__c ='https://WS_VAMGetList';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_VAMGetAccount
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_VAMGetAccount';
        wsSetting.CNT_Endpoint__c ='https://WS_VAMGetAccount';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_STR_SignatureRulesGET
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_STR_SignatureRulesGET';
        wsSetting.CNT_Endpoint__c ='https://WS_STR_SignatureRulesGET';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // WS_STR_SignatureGroupsGET
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'WS_STR_SignatureGroupsGET';
        wsSetting.CNT_Endpoint__c ='https://WS_STR_SignatureGroupsGET';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 15/12/2020 - Adding WS_TransactionalLimits
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = '	WS_TransferBeneficiariesPost';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/beneficiaries/transfer';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);

        // 15/12/2020 - Adding WS_TransfersBeneficiaries
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = '	WS_TransferBeneficiariesGet';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/beneficiaries/transfer';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);
		
        // 24/02/2020 - Adding CNT_OBD_PersistCompany
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_OBD_PersistCompany';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/company';
        wsSetting.CNT_HTTPMethod__c = 'POST';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);
        
        // 24/02/2020 - Adding CNT_OBD_Identify
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_OBD_Identify';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/identify/me';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);
        
        // 24/02/2020 - Adding CNT_OBD_CustomerLinks
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_OBD_CustomerLinks';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/customer_links/me?relationship_group_type={rgt}&status_relations={sr}';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);
        
        // 24/02/2020 - Adding CNT_OBD_ChannelAccessAgreements
        wsSetting = new CNT_ApiConfiguration__c();
        wsSetting.Name = 'CNT_OBD_ChannelAccessAgreements';
        wsSetting.CNT_Endpoint__c ='https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/channel_access_agreements';
        wsSetting.CNT_HTTPMethod__c = 'GET';
        wsSetting.CNT_Service__c = 'mulesoft';
        listCustomSettings.add(wsSetting);
        
        if (insertSettings && Schema.sObjectType.CNT_ApiConfiguration__c.isCreateable()) {
            insert listCustomSettings;
        }
        for (CNT_ApiConfiguration__c setting : listCustomSettings) {
            mapSettingToRecord.put(setting.Name, setting);
        }
        return mapSettingToRecord;
    }


        /*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:    Method to create a custom accounts
History
<Date>          <Author>         <Description>
30/03/2020      R.Cervino    Initial version
----------------------------------------------------------------------------------*/
     public static void createAccount(){
        Account acc1 = new Account(Name='Deloitte');
        Account acc2 = new Account(Name='Santander');
        Account acc3 = new Account(Name='GPU');
        Account acc4 = new Account(Name='Empresa', ACC_PCK_Country__c = 'ES', ACC_TXT_BIC__c  = 'BSCHESM0000');
        List<Account> toInsert = new List<Account>();

         toInsert.add(acc1);
         toInsert.add(acc2);
         toInsert.add(acc3);
         toInsert.add(acc4);

         insert toInsert;

    }

            /*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:    Method to create a custom accounts
History
<Date>          <Author>         <Description>
30/03/2020      R.Cervino    Initial version
----------------------------------------------------------------------------------*/
     public static List<ContentDocument> createDoc(){
        ContentVersion cont = new ContentVersion();
         //cont.Title = deserializedInvoices.filename.substring(0,deserializedInvoices.filename.length()-3)+'pdf';
        cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.pdf';
        cont.Title = 'test';
        cont.VersionData = EncodingUtil.base64Decode('hola');

         insert cont;

         List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument]);

         return doc;
    }

    public static void createB2BOrderingFilters(){

        Nexus_B2B_Ordering_Filters__c NexusOrdFilter = new Nexus_B2B_Ordering_Filters__c (
                Name = 'ordfilter1', B2B_TXT_Country_ISO_Code__c = 'ES', B2B_TXT_Country_Name__c  ='Spain', B2B_TXT_Currencies__c  = 'EUR',  B2B_CHK_Active__c = true);

        Multi_One_Trade_B2B_Ordering_Filters__c multiOneTradeOrdFilter = new Multi_One_Trade_B2B_Ordering_Filters__c (
                Name = 'ordfilter2', B2B_TXT_Country_ISO_Code__c = 'ES', B2B_TXT_Country_Name__c  ='Spain', B2B_TXT_Currencies__c  = 'EUR',  B2B_CHK_Active__c = true);

         Local_Banking_Filters__c localBankingFilter = new Local_Banking_Filters__c (
            Name = 'ordFilter3', LB_CHK_Active__c = true, LB_TXT_Country_ISO_Code__c = 'ES', LB_TXT_Country_Name__c = 'Spain', LB_TXT_Currencies__c = 'EUR'
        );

        insert NexusOrdFilter;
        insert multiOneTradeOrdFilter;
        insert localBankingFilter;

    }

    public static void createClaims () {
        parametrized_claims__c claim = new parametrized_claims__c(Name = 'Claim', PCK_Token_Country__c = 'ES', PCK_Token_Platform__c = 'BBOO', PCK_Token_User__c = '');
        parametrized_claims__c claim2 = new parametrized_claims__c(Name = 'Claim2', PCK_Token_Country__c = 'ALL', PCK_Token_Platform__c = 'Faketoken', PCK_Token_User__c = 'Faketoken');
        parametrized_claims__c claim3 = new parametrized_claims__c(Name = 'Claim3', PCK_Token_Country__c = 'ALL', PCK_Token_Platform__c = 'GTS', PCK_Token_User__c = 'local');
        parametrized_claims__c claim4 = new parametrized_claims__c(Name = 'Claim4', PCK_Token_Country__c = 'ALL', PCK_Token_Platform__c = 'SANDIGITAL', PCK_Token_User__c = 'platform');
        insert claim;
        insert claim2;
        insert claim3;
        insert claim4;
    }

    public static void createSignatureStructure(){

        SNG_Payment__c payment = new SNG_Payment__c (SGN_TXT_IdPayment__c = 'paymentId');
        insert payment;

        SGN_Group__c SGNgroup = new SGN_Group__c(SGN_ELCK_RelatedSign__c = payment.Id, SGN_TXT_IdExt__C = 'idExt', SGN_TXT_Level__C = 'A', SGN_TXT_SingsRequired__c = 2);
        insert SGNgroup;

        SGN_User__c users = new SGN_User__c(SGN_ELCK_RelatedSign__c = payment.Id, SGN_DATET_Completed__c = system.today(), SGN_TXT_GlobalId__c = 'GlobalId');
        insert users;
    }

    public static void createCase(){
        Case c = new Case(
                    CASE_Affected_functionality__C = 'Others');
        insert c;
    }

    /*
    Author:         Candido
    Company:        Deloitte
    Description:    Create user with account and contact related.
    History
    <Date>          <Author>            <Description>
    19/11/2019      Candido             Initial version
    */
    @TestVisible
    public static User getWrapperUserData () {
        Profile p;
        if (Schema.sObjectType.Profile.isAccessible() && Schema.sObjectType.Profile.fields.Id.isAccessible()) {
            p = [
                SELECT Id
                FROM Profile
                WHERE Name = 'System Administrator'
                LIMIT 1
            ];
        }
        String uniqueUserName = 'standarduser' + DateTime.now().getTime() + '@testorg.com';
        String bic = 'GTSNEXUSBIC';
        String firstName = 'Peter';
        String lastName = 'Test';
        User user = new User(
            Alias = 'alias',
            Email = 'test@test.es',
            MobilePhone = '666777888',
            EmailEncodingKey = 'UTF-8',
            LastName = lastName,
            FirstName = firstName,
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            TimeZoneSidKey = 'America/Los_Angeles',
            ProfileId = p.Id,
            UserName = uniqueUserName,
            USER_TXT_GlobalId__c = 'DummyDataGlobalId' + DateTime.now().getTime(),
            CurrencyIsoCode = 'EUR',
            USER_NumberFormat__c = '###.###.###,##',
            USER_DateFormat__c = 'dd/MM/yyyy',
            USER_country__c = 'ES',
            USER_CHK_CashNexus__c = false,
            USER_CHK_TermsConditions__c = false,
            USER_TXT_BIC__c = bic
        );
        if (Schema.sObjectType.User.isCreateable()) {
            insert user;
        }
        Account account = new Account(
            Name = uniqueUserName,
            ACC_CHK_CIB__c = false,
            ACC_TXT_DocumentType__c = 'tax_id',
            ACC_TXT_DocumentNumber__c = 'B86561412',
            ACC_TXT_CompanyId__c = '2119',
            ACC_TXT_BIC__c = bic
        );
        if (Schema.sObjectType.Account.isCreateable()) {
            insert account;
        }
        Contact contact = new Contact(
            LastName = lastName,
            FirstName = firstName,
            AccountId = account.Id,
            CONTACT_User__c = user.Id,
            CHK_MultiOneTrade__c = false
        );
        if (Schema.sObjectType.Contact.isCreateable()) {
            insert contact;
        }
        return user;
    }

    public static User getWrapperUserDataNexus () {
        Profile p;
        if (Schema.sObjectType.Profile.isAccessible() && Schema.sObjectType.Profile.fields.Id.isAccessible()) {
            p = [
                SELECT Id
                FROM Profile
                WHERE Name = 'System Administrator'
                LIMIT 1
            ];
        }
        String uniqueUserName = 'standarduser' + DateTime.now().getTime() + '@testorg.com';
        String bic = 'GTSNEXUSBIC';
        String firstName = 'Peter';
        String lastName = 'Test';
        User user = new User(
            Alias = 'alias',
            Email = 'test@test.es',
            MobilePhone = '666777888',
            EmailEncodingKey = 'UTF-8',
            LastName = lastName,
            FirstName = firstName,
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            TimeZoneSidKey = 'America/Los_Angeles',
            ProfileId = p.Id,
            UserName = uniqueUserName,
            USER_TXT_GlobalId__c = 'DummyDataGlobalId' + DateTime.now().getTime(),
            CurrencyIsoCode = 'EUR',
            USER_NumberFormat__c = '###.###.###,##',
            USER_DateFormat__c = 'dd/MM/yyyy',
            USER_country__c = 'ES',
            USER_CHK_CashNexus__c = true,
            USER_CHK_TermsConditions__c = false,
            USER_TXT_BIC__c = bic
        );
        if (Schema.sObjectType.User.isCreateable()) {
            insert user;
        }
        Account account = new Account(
            Name = uniqueUserName,
            ACC_CHK_CIB__c = false,
            ACC_TXT_DocumentType__c = 'tax_id',
            ACC_TXT_DocumentNumber__c = 'B86561412',
            ACC_TXT_CompanyId__c = '2119',
            ACC_TXT_BIC__c = bic
        );
        if (Schema.sObjectType.Account.isCreateable()) {
            insert account;
        }
        Contact contact = new Contact(
            LastName = lastName,
            FirstName = firstName,
            AccountId = account.Id,
            CONTACT_User__c = user.Id,
            CHK_MultiOneTrade__c = false
        );
        if (Schema.sObjectType.Contact.isCreateable()) {
            insert contact;
        }
        return user;
    }


    public static Map<String, String> getNavigatorInfo () {
        Map<String, String> navigatorInfo = new Map<String, String>();
        navigatorInfo.put('userAgent', 'Mozilla / 5.0(Windows NT 10.0; Win64; x64)AppleWebKit / 537.36(KHTML, like Gecko)Chrome / 87.0.4280.88 Safari / 537.36');
        navigatorInfo.put('latitude', 'latitude');
        navigatorInfo.put('longitude', 'longitude');
        return navigatorInfo;
    }

    public static Payment__c createPayment(){
        Payment__c payment = new Payment__c (
        	PAY_TXT_PaymentId__c = 'paymentId', PAY_TXT_ClientReference__c = 'clientReference');
        insert payment;
        return payment;
    }

    public static void createCustomTexts(){
        List<CustomText__c> listCustomTexts = new List<CustomText__c>();
         CustomText__c customText = new CustomText__c();
         customText.Name = 'en_PaymentPending';
         customText.Text__c ='test';
         listCustomTexts.add(customText);

         customText = new CustomText__c();
         customText.Name = 'en_PaymentRejected';
         customText.Text__c ='test';
         listCustomTexts.add(customText);

         customText = new CustomText__c();
         customText.Name = 'en_PaymentReview';
         customText.Text__c ='test';
         listCustomTexts.add(customText);

         customText = new CustomText__c();
         customText.Name = 'en_PaymentCompleted';
         customText.Text__c ='test';
         listCustomTexts.add(customText);

         customText = new CustomText__c();
         customText.Name = 'en_PaymentTitle';
         customText.Text__c ='test';
         listCustomTexts.add(customText);

        database.insert(listCustomTexts, true);
    }
}