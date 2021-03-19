public without sharing class CNT_OTV_UsersLanding {
  public class userData {
    @AuraEnabled
    public AccountContactRelation accountRelation { get; set; }
    @AuraEnabled
    public String name { get; set; }
    @AuraEnabled
    public String firstName { get; set; }
    @AuraEnabled
    public String lastName { get; set; }
    @AuraEnabled
    public String globalId { get; set; }
    @AuraEnabled
    public String companyId { get; set; }
    @AuraEnabled
    public Boolean admin { get; set; }
    @AuraEnabled
    public String lastLogin { get; set; }
    @AuraEnabled
    public String accountName { get; set; }
    @AuraEnabled
    public String phone { get; set; }
    @AuraEnabled
    public String email { get; set; }
    @AuraEnabled
    public String position { get; set; }
    @AuraEnabled
    public String role { get; set; }
    @AuraEnabled
    public Boolean active { get; set; }
    @AuraEnabled
    public String color { get; set; }
  }

  public class userAccountsParameters {
    @AuraEnabled
    public String companyId;
    @AuraEnabled
    public String userId;
  }

  public class CountryName {
    @AuraEnabled
    public String label { get; set; }
    @AuraEnabled
    public String value { get; set; }
    @AuraEnabled
    public String url { get; set; }
    @AuraEnabled
    public Boolean isActive { get; set; }
  }

  public class AccountsUser {
    @AuraEnabled
    public WRAPPER_AccountList_OTV.AccountAvailableService accountAvailableservice;
    @AuraEnabled
    public String accountName { get; set; }
  }

  //PARA EL PATCH DE PERSISTIR CAMBIOS EN EL USUARIO
  public class OmnichannelServiceUser {
    public String companyId;
    public String serviceId;
    public String userId;
    public String productType;
    public String contractId;
    public String contractType;
    public String bankId;
    public String country;
    public OmnichannelServiceUserData omnichannelServiceUserData;
  }

  public class OmnichannelServiceUserData {
    public String status;
    public String startDate;
    public String endDate;
  }
  public class Subsidiary {
    @AuraEnabled
    public String companyName { get; set; }
    @AuraEnabled
    public String country { get; set; }
  }

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        Deloitte
    Description:	Method to obtain a list of users from a mulesoft endpoint
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<userData> calloutGetUserList(String companyId) {
    System.debug('HANDLER_Account.calloutGetUserList >>>>> START');
    System.debug('COMPANYID >>>>>' + companyId);
    if (!Test.isRunningTest()) {
      // llamada callout persistencia usuario Admin de la cuenta
      CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
        'TRG_GetAccountUsers'
      );
      String finalEndPoint = configWs.CNT_Endpoint__c;
      if (companyId == null) {
        //finalEndPoint = finalEndpoint.replace('{companyId}', contactList[0].AccountId);
        Id userId = UserInfo.getUserId();
        List<User> currentUser = [
          SELECT Id, ContactId
          FROM User
          WHERE Id = :userId
          LIMIT 1
        ];

        if (!currentUser.isEmpty() && currentUser[0].ContactId != null) {
          List<Account> accountList = [
            SELECT Id, ACC_TXT_CompanyId__c
            FROM ACCOUNT
            WHERE ACC_CHK_OTView_Admin__r.ID = :currentUser[0].ContactId
            LIMIT 1
          ];

          System.debug('COMPANYID ENTRA NULL');
          //finalEndPoint = finalEndpoint.replace('{companyId}', '1588401980');//accountList[0].ACC_TXT_CompanyId__c);
          finalEndPoint = finalEndpoint.replace('{companyId}', '38840442'); //accountList[0].ACC_TXT_CompanyId__c);
          //String response = Global_IntegrationWrapper.launchHttp(/*accountList[0].ACC_TXT_CompanyId__c*/'1588401980', finalEndPoint, configWs.CNT_HTTPMethod__c);
          String response = Global_IntegrationWrapper.launchHttp(
            /*accountList[0].ACC_TXT_CompanyId__c*/ '38840442',
            finalEndPoint,
            configWs.CNT_HTTPMethod__c
          );
          System.debug('>>>>>>>' + response);
          WRAPPER_UserList listExtracts = WRAPPER_UserList.parse(response);
          System.debug('>>>>>>>' + listExtracts);
          return getLstUsers(listExtracts);
        }
      } else {
        System.debug('COMPANYID ENTRA NO NULL');
        String tokenPlatform = 'BBOO';
        String tokenUser = 'GTS_GLOBAL';
        TokenInformation tokenInformation = new TokenInformation(
          'ES',
          tokenPlatform,
          tokenUser,
          null,
          'BSCHESMM'
        );
        tokenInformation.mapClaims.txt_sub__c = 'SGPgtsfun211999';
        tokenInformation.mapClaims.TXT_realm__c = 'backOffice_user_global';
        system.debug(companyId);
        finalEndPoint = finalEndpoint.replace('{companyId}', companyId);
        system.debug(finalEndPoint);
        String response = Global_IntegrationWrapper.launchHTTP(
          companyId,
          finalEndPoint,
          configWs.CNT_HTTPMethod__c,
          null,
          null,
          null,
          40000,
          tokenInformation
        );
        System.debug('>>>>>>>' + response);
        WRAPPER_UserList listExtracts = WRAPPER_UserList.parse(response);
        System.debug('>>>>>>>' + listExtracts);
        return getLstUsers(listExtracts);
      }
    }
    return null;
  }

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        Deloitte
    Description:	Method to obtain a list of users from a mulesoft endpoint
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<userData> calloutGetUserList_BBO() {
    System.debug('HANDLER_Account.calloutGetUserList >>>>> START');
    if (!Test.isRunningTest()) {
      // llamada callout persistencia usuario Admin de la cuenta
      CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
        'TRG_GetAccountUsers'
      );

      String finalEndPoint = configWs.CNT_Endpoint__c;
      //finalEndPoint = finalEndpoint.replace('{companyId}', acct.ACC_TXT_CompanyId__c);
      finalEndPoint = finalEndpoint.replace('{companyId}', '1588401980');

      String response = Global_IntegrationWrapper.launchHttp(
        '1588401980',
        finalEndPoint,
        configWs.CNT_HTTPMethod__c
      );
      System.debug('>>>>>>>' + response);
      //Recuperamos los valores pero no funciona pasarlos como clase UserList
      WRAPPER_UserList listExtracts = WRAPPER_UserList.parse(response);
      return getLstUsers(listExtracts);
    }
    return null;
  }

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        Deloitte
    Description:	Method to obtain a list of users from a mulesoft endpoint
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<userData> getLstUsers(WRAPPER_UserList wrapper_UserList) {
    system.debug('wrapper_UserList');
    system.debug(wrapper_UserList);
    List<String> colors = new List<String>{
      'blue',
      'green',
      'pink',
      'lightpink',
      'cream'
    };
    List<userData> lstUserData = new List<userData>();
    Map<String, userData> mapUserData = new Map<String, userData>();
    for (WRAPPER_UserList.UserService wrapperUser : wrapper_UserList.userList) {
      userData user = new userData();
      if (wrapperUser.status == 'ACTIVE') {
        user.active = true;
      } else {
        user.active = false;
      }
      user.role = wrapperUser.serviceId;
      mapUserData.put(wrapperUser.userId, user);
    }
    system.debug('mapUserData.keyset()');
    system.debug(mapUserData.keyset());
    if (mapUserData.size() > 0) {
      List<AccountContactRelation> lstAcctContactRelation = [
        SELECT
          ID,
          Contact.FirstName,
          Contact.LastName,
          Account.Name,
          Contact.CONTACT_User__r.USER_TXT_GlobalId__c,
          Contact.CONTACT_User__r.LastLoginDate,
          //CHK_Admin__c,
          Contact.Name,
          Contact.Phone,
          Contact.Email,
          PCK_Enrollment_Request__c,
          AccountId
        FROM AccountContactRelation
        WHERE
          Contact.CONTACT_User__r.USER_TXT_GlobalId__c IN :mapUserData.keyset()
          AND Contact.CONTACT_User__r.LastLoginDate != NULL
      ];
      if (lstAcctContactRelation.size() > 0) {
        for (
          AccountContactRelation acctContactRelation : lstAcctContactRelation
        ) {
          Integer randomNumber = Integer.valueof(
            (Math.random() * colors.size())
          );
          userData acctContact = new userData();
          acctContact.name = acctContactRelation.Contact.Name;
          acctContact.firstName = acctContactRelation.Contact.FirstName;
          acctContact.lastName = acctContactRelation.Contact.LastName;
          acctContact.globalId = acctContactRelation.Contact.CONTACT_User__r.USER_TXT_GlobalId__c;
          //acctContact.admin = acctContactRelation.CHK_Admin__c;
          acctContact.lastLogin = acctContactRelation.Contact.CONTACT_User__r.LastLoginDate.format(
            'dd/MM/yyyy'
          );
          acctContact.accountName = acctContactRelation.Account.Name;
          acctContact.companyId = acctContactRelation.AccountId;
          if (acctContactRelation.Contact.Phone != null) {
            acctContact.phone = acctContactRelation.Contact.Phone;
          } else {
            acctContact.phone = '';
          }
          if (
            acctContactRelation.Contact.Email != null &&
            !acctContactRelation.Contact.Email.contains('@gtsinvalid.com')
          ) {
            acctContact.email = acctContactRelation.Contact.Email;
          } else {
            acctContact.email = '';
          }
          acctContact.position = '';
          if (
            mapUserData.containsKey(
              acctContactRelation.Contact.CONTACT_User__r.USER_TXT_GlobalId__c
            )
          ) {
            acctContact.role = mapUserData.get(
                acctContactRelation.Contact.CONTACT_User__r.USER_TXT_GlobalId__c
              )
              .role;
            if (acctContact.role == 'one_trade_view_m_administrator') {
              acctContact.admin = true;
            } else {
              acctContact.admin = false;
            }
            if (
              mapUserData.get(
                  acctContactRelation.Contact.CONTACT_User__r.USER_TXT_GlobalId__c
                )
                .active == true
            ) {
              acctContact.active = true;
              acctContact.color = 'image ' + colors[randomNumber];
            } else {
              acctContact.active = false;
              acctContact.color = 'image gray';
            }
          }
          lstUserData.add(acctContact);
        }
      }
    }
    if (lstUserData.size() > 0) {
      return lstUserData;
    }
    return null;
  }

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        Deloitte
    Description:	Method to obtain the static resource for each country
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<CountryName> getLstCountriesUser(String jsonCountries) {
    List<CountryName> listCountryNames = new List<CountryName>();
    Map<String, String> mapCountries = (Map<String, String>) JSON.deserialize(
      jsonCountries,
      Map<String, String>.class
    );
    Set<String> setCountries = new Set<String>();
    for (String country : mapCountries.values()) {
      if (String.isNotBlank(country)) {
        setCountries.add(country);
      } else {
        setCountries.add('Default');
      }
    }
    Schema.DescribeFieldResult F = Account.Consent_Country__c.getDescribe();
    Schema.sObjectField T = F.getSObjectField();
    List<PicklistEntry> picklistCountries = T.getDescribe().getPicklistValues();

    StaticResource static_resource = [
      SELECT Id, SystemModStamp
      FROM StaticResource
      WHERE Name = 'Flags'
      LIMIT 1
    ];
    for (PicklistEntry entry : picklistCountries) {
      CountryName country = new CountryName();
      if (setCountries.size() > 0 && setCountries.contains(entry.getValue())) {
        country.label = entry.getLabel();
        country.value = entry.getValue();
        country.isActive = false;
        String url =
          '/resource/' +
          String.valueOf(
            ((DateTime) static_resource.get('SystemModStamp')).getTime()
          ) +
          '/Flags/' +
          country.value +
          '.svg';
        country.url = url;
        listCountryNames.add(country);
      }
    }
    if (setCountries.contains('Default')) {
      CountryName country = new CountryName();
      country.label = 'Default';
      country.value = 'Default';
      country.isActive = false;
      String url =
        '/resource/' +
        String.valueOf(
          ((DateTime) static_resource.get('SystemModStamp')).getTime()
        ) +
        '/Flags/' +
        country.value +
        '.svg';
      country.url = url;
      listCountryNames.add(country);
    }
    return listCountryNames;
  }

  //DA 01/02/2021
  /*@AuraEnabled
    public static List<userData> getUsersWithCompanyId(String companyId) {
        List<userData> lstUserData = new List<userData>();
        Set<String> setGlobailId = new Set<String>();
        Set<Id> contactUserId = new Set<Id>();
        if(setGlobailId.size()>0){

            List<AccountContactRelation> lstAcctContactRelation=[SELECT ID,
                                                                        Contact.FirstName,
                                                                       	Contact.LastName,
                                                                        Account.Name,
                                                                        Contact.CONTACT_User__r.USER_TXT_GlobalId__c,
                                                                        Contact.CONTACT_User__r.LastLoginDate, 
                                                                        CHK_Admin__c,
                                                                        Contact.Name,
                                                                        PCK_Enrollment_Request__c
                                                                   FROM AccountContactRelation
                                                                  //WHERE Contact.CONTACT_User__r.USER_TXT_GlobalId__c IN :setGlobailId
                                                                 	WHERE Contact.CONTACT_User__r.USER_TXT_GlobalId__c = '5431ac57-96e3-4d45-8a4c-2c92aea767b9'
                                                                   	AND Contact.CONTACT_User__r.LastLoginDate != null];
           
            System.debug('List lstAcctContactRelation : ' + lstAcctContactRelation.size());
            if(lstAcctContactRelation.size()>0){
                for(AccountContactRelation acctContactRelation: lstAcctContactRelation){
                                    userData acctContact = new userData();
                                    acctContact.name = acctContactRelation.Contact.Name;
                                    acctContact.firstName = acctContactRelation.Contact.FirstName;
                                    acctContact.lastName = acctContactRelation.Contact.LastName;
                                    acctContact.globalId = acctContactRelation.Contact.CONTACT_User__r.USER_TXT_GlobalId__c;
                                    acctContact.admin = acctContactRelation.CHK_Admin__c;
                                    acctContact.lastLogin = acctContactRelation.Contact.CONTACT_User__r.LastLoginDate.format('dd/MM/yyyy');
                                    acctContact.accountName = acctContactRelation.Account.Name;
                    				acctContact.color = 'image gray';
                                    lstUserData.add(acctContact);
                 }
            }         
        }
        if(lstUserData.size()>0){
            System.debug('List lstUserData return : ' + lstUserData.size());
            return lstUserData;
        }
        return null;
    }*/

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:	Method to obtain a list of users accounts from a mulesoft endpoint
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<WRAPPER_AccountList_OTV.AccountAvailableService> calloutGetUserAccounts() {
    List<WRAPPER_AccountList_OTV.AccountAvailableService> lstAvailableAccounts = new List<WRAPPER_AccountList_OTV.AccountAvailableService>();
    Id userId = UserInfo.getUserId();
    List<Contact> currentContact = [
      SELECT Id, Account.ACC_TXT_CompanyId__c
      FROM Contact
      WHERE Id = :userId
      LIMIT 1
    ];
    //List<AccountsUser> lstAccountsUser = new List<AccountsUser>();
    String response = '';
    userAccountsParameters uap = new userAccountsParameters();
    uap.companyId = '1588401980';

    if (!Test.isRunningTest()) {
      CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
        'TRG_GetUserAccounts'
      );
      String finalEndPoint = configWs.CNT_Endpoint__c;
      finalEndPoint = finalEndpoint.replace('{companyId}', '1588401980'); //currentContact[0]?.Account?.ACC_TXT_CompanyId__c
      finalEndPoint = finalEndpoint.replace(
        '{userId}',
        '5431ac57-96e3-4d45-8a4c-2c92aea767b9'
      ); //userId
      WrapperUserData userData = ServiceUserData.getUserData(
        UserInfo.getUserId()
      );
      String gtsOperationsUserProfile = 'System Administrator'; //System.Label.Profile_BackOffice_001;
      if (userData.profileName == gtsOperationsUserProfile) {
        String tokenPlatform = 'BBOO';
        String tokenUser = 'GTS_GLOBAL';
        TokenInformation tokenInformation = new TokenInformation(
          'ES',
          tokenPlatform,
          tokenUser,
          null,
          'BSCHESMM'
        );
        tokenInformation.mapClaims.txt_sub__c = 'SGPgtsfun211999';
        tokenInformation.mapClaims.TXT_realm__c = 'backOffice_user_global';
        response = Global_IntegrationWrapper.launchHTTP(
          '1588401980',
          finalEndPoint,
          configWs.CNT_HTTPMethod__c,
          null,
          null,
          null,
          40000,
          tokenInformation
        );
      } else {
        response = Global_IntegrationWrapper.launchHttp(
          JSON.Serialize(uap),
          finalEndPoint,
          configWs.CNT_HTTPMethod__c
        );
      }
      System.debug('>>>>>>>' + response);
      WRAPPER_AccountList_OTV listAvailableAccounts = WRAPPER_AccountList_OTV.parse(
        response
      );
      List<WRAPPER_AccountList_OTV.AccountAvailableService> lst = listAvailableAccounts.availableAccountsList;
      return lst;
    }
    return null;
  }

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:	Method to persist changes of user accounts
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  //public static void calloutUpdateUserAccounts(String companyId, String serviceId, String userId, String productType, String contractId , String contractType, String bankId, String country,  String status) {
  public static void calloutUpdateUserAccounts(
    String accountList,
    String userId,
    String serviceId,
    String companyId
  ) {
    System.debug('Entra calloutUpdateUserAccounts');
    System.debug(accountList);
    System.debug(userId);
    System.debug(serviceId);
    WRAPPER_AccountList_OTV.AccountAvailableService[] accountsList = (WRAPPER_AccountList_OTV.AccountAvailableService[]) JSON.deserialize(
      accountList,
      WRAPPER_AccountList_OTV.AccountAvailableService[].class
    );
    System.debug(accountsList);

    if (!Test.isRunningTest()) {
      CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
        'TRG_PatchOmnichannelService'
      );
      String finalEndPoint = configWs.CNT_Endpoint__c;
      for (WRAPPER_AccountList_OTV.AccountAvailableService act : accountsList) {
        String response;
        OmnichannelServiceUserData osd = new OmnichannelServiceUserData();
        /* if(act.status =='ACTIVE'){
                        osd.status= 'INACTIVE';                 
                    }else{
                        osd.status= 'ACTIVE';
                    }*/
        //osd.status= 'INACTIVE';
        osd.status = act.status;
        osd.startDate = '16022021';
        osd.endDate = '16022021';
        system.debug('Body del servicio:' + osd);
        finalEndPoint = finalEndpoint.replace('{companyId}', companyId);
        finalEndPoint = finalEndpoint.replace('{serviceId}', serviceId);
        finalEndPoint = finalEndpoint.replace('{userId}', userId);
        finalEndPoint =
          finalEndPoint +
          '?productType=account&contractId=' +
          act.accountId +
          '&contractType=' +
          act.accountType +
          '&bankId=' +
          act.bankId +
          '&country=' +
          act.country;
        System.debug('Endpoint: ' + finalEndPoint);
        WrapperUserData userData = ServiceUserData.getUserData(
          UserInfo.getUserId()
        );
        String gtsOperationsUserProfile = 'System Administrator'; //System.Label.Profile_BackOffice_001;
        if (userData.profileName == gtsOperationsUserProfile) {
          String tokenPlatform = 'BBOO';
          String tokenUser = 'GTS_GLOBAL';
          TokenInformation tokenInformation = new TokenInformation(
            'ES',
            tokenPlatform,
            tokenUser,
            null,
            'BSCHESMM'
          );
          tokenInformation.mapClaims.txt_sub__c = 'SGPgtsfun211999';
          tokenInformation.mapClaims.TXT_realm__c = 'backOffice_user_global';
          response = Global_IntegrationWrapper.launchHTTP(
            JSON.Serialize(osd),
            finalEndPoint,
            configWs.CNT_HTTPMethod__c,
            null,
            null,
            null,
            40000,
            tokenInformation
          );
        } else {
          response = Global_IntegrationWrapper.launchHttp(
            JSON.Serialize(osd),
            finalEndPoint,
            configWs.CNT_HTTPMethod__c
          );
        }
        //= Global_IntegrationWrapper.launchHttp(JSON.Serialize(osd), finalEndPoint, configWs.CNT_HTTPMethod__c);
        System.debug('>>>>>>>' + response);
      }
    }
  }

  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        
    Description:	Method to get a list of subsidiaries to compare with the original list
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz       Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<Subsidiary> calloutGetAccountSubsidiaries(
    String lstAccounts
  ) {
    system.debug('Llega ');
    system.debug(lstAccounts);
    Map<String, String> mapNameCountry = new Map<String, String>();
    List<Subsidiary> lstSubsidiaries = new List<Subsidiary>();
    WRAPPER_AccountList_OTV.AccountAvailableService[] accountsList = (WRAPPER_AccountList_OTV.AccountAvailableService[]) JSON.deserialize(
      lstAccounts,
      WRAPPER_AccountList_OTV.AccountAvailableService[].class
    );
    System.debug('accountsList');
    System.debug(accountsList);
    for (
      WRAPPER_AccountList_OTV.AccountAvailableService account : accountsList
    ) {
      if (!mapNameCountry.containsKey(account.companyName)) {
        mapNameCountry.put(account.companyName, account.country);
      } else if (
        mapNameCountry.containsKey(account.companyName) &&
        mapNameCountry.get(account.companyName) != account.country
      ) {
        mapNameCountry.put(account.companyName, account.country);
      }
    }
    for (String nameCountryKey : mapNameCountry.keySet()) {
      Subsidiary sub = new Subsidiary();
      sub.companyName = nameCountryKey;
      sub.country = mapNameCountry.get(nameCountryKey);
      lstSubsidiaries.add(sub);
    }
    //System.debug(setSubsidiaries);
    //lstSubsidiaries.addAll(setSubsidiaries);
    System.debug(lstSubsidiaries);
    return lstSubsidiaries;
  }
  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:	Method to persist changes of status user
    History 
    <Date>          <Author>            <Change Description>
    18/02/2021	    Antonio Matachana   Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  //public static void calloutUpdateUserStatus(String userId, String serviceId, String companyId, String statusButton){
  public static void calloutUpdateUserStatus(
    String userId,
    String serviceId,
    String companyId,
    Boolean statusButton
  ) {
    System.debug('Entra calloutUpdateUserStatus');
    System.debug(userId);
    System.debug(serviceId);
    System.debug(companyId);
    System.debug(statusButton);
    //WRAPPER_AccountList_OTV.AccountAvailableService[] accountsList = (WRAPPER_AccountList_OTV.AccountAvailableService[]) JSON.deserialize(accountList, WRAPPER_AccountList_OTV.AccountAvailableService[].class);
    String response;
    if (!Test.isRunningTest()) {
      CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
        'TRG_PatchOmnichannelService'
      );
      String finalEndPoint = configWs.CNT_Endpoint__c;

      OmnichannelServiceUserData osd = new OmnichannelServiceUserData();
      if (statusButton) {
        osd.status = 'ACTIVE';
      } else {
        osd.status = 'INACTIVE';
      }
      osd.startDate = '16022021';
      osd.endDate = '16022021';

      finalEndPoint = finalEndpoint.replace('{userId}', userId);
      finalEndPoint = finalEndpoint.replace('{serviceId}', serviceId); //Valores one_trade_view_administrator / one_trade_view_activator / one_trade_view_operator
      finalEndPoint = finalEndpoint.replace('{companyId}', '1588401980'); //companyId
      finalEndPoint = finalEndPoint + '?productType=SERVICE'; //SERA service
      System.debug('Endpoint: ' + finalEndPoint);
      WrapperUserData userData = ServiceUserData.getUserData(
        UserInfo.getUserId()
      );
      String gtsOperationsUserProfile = 'System Administrator'; //System.Label.Profile_BackOffice_001;
      if (userData.profileName == gtsOperationsUserProfile) {
        String tokenPlatform = 'BBOO';
        String tokenUser = 'GTS_GLOBAL';
        TokenInformation tokenInformation = new TokenInformation(
          'ES',
          tokenPlatform,
          tokenUser,
          null,
          'BSCHESMM'
        );
        tokenInformation.mapClaims.txt_sub__c = 'SGPgtsfun211999';
        tokenInformation.mapClaims.TXT_realm__c = 'backOffice_user_global';
        System.debug('>>>>>>>' + tokenInformation);
        response = Global_IntegrationWrapper.launchHTTP(
          JSON.Serialize(osd),
          finalEndPoint,
          configWs.CNT_HTTPMethod__c,
          null,
          null,
          null,
          40000,
          tokenInformation
        );
      } else {
        response = Global_IntegrationWrapper.launchHttp(
          JSON.Serialize(osd),
          finalEndPoint,
          configWs.CNT_HTTPMethod__c
        );
      }
      //String response = Global_IntegrationWrapper.launchHttp(JSON.Serialize(osd), finalEndPoint, configWs.CNT_HTTPMethod__c);
      System.debug('>>>>>>>' + response);
    }
  }
}
