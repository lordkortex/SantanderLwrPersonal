/*------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:	OTV Brazil Subsidiary controller
Test Class:		CNT_OTV_BrazilSubsidiary_Test
History 
<Date>          <Author>            <Change Description>
12/03/2021	    Antonio Duarte     	Initial version
------------------------------------------------------------*/
public without sharing class CNT_OTV_BrazilSubsidiary {
  /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:	Method to obtain a list of the matrix users
					for BR subsidiaries
    History 
    <Date>          <Author>            <Change Description>
    26/02/2021	    Antonio Duarte      Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<WRAPPER_OTV_Info.UserInformation> getLstMatrixUsersBR() {
    Boolean useMockInfo = true;
    List<WRAPPER_OTV_Info.UserInformation> userList = new List<WRAPPER_OTV_Info.UserInformation>();
    try {
      if (useMockInfo) {
        userList = getDummyUsers();
      } else {
        String matrixId = [
            SELECT Contact.Account.ParentId
            FROM User
            WHERE Id = :UserInfo.getUserId()
            LIMIT 1
          ][0]
          ?.Contact
          ?.Account
          ?.ParentId;
        System.debug('MatrixId: ' + matrixId);
        if (matrixId != null) {
          List<User> matrixUserList = [
            SELECT
              FirstName,
              LastName,
              Name,
              Contact.Account.Name,
              USER_country__c,
              USER_TXT_GlobalId__c
            FROM User
            WHERE Contact.AccountId = :matrixId
          ];
          StaticResource static_resource = [
            SELECT Id, SystemModStamp
            FROM StaticResource
            WHERE Name = 'Flags'
            LIMIT 1
          ];
          System.debug('matrixUserList: ' + matrixUserList);
          System.debug('static_resource: ' + static_resource);
          for (User u : matrixUserList) {
            String countryImg =
              '/resource/' +
              String.valueOf(
                ((DateTime) static_resource.get('SystemModStamp')).getTime()
              ) +
              '/Flags/' +
              (u.USER_country__c == null ? 'Default' : u.USER_country__c) +
              '.svg';
            String initials;
            if (u.FirstName != null && !''.equals(u.FirstName)) {
              initials =
                u.FirstName.subString(0, 1) + u.LastName.subString(0, 1);
            } else {
              initials = u.LastName.subString(0, 2);
            }
            WRAPPER_OTV_Info.UserInformation usr = new WRAPPER_OTV_Info.UserInformation();
            usr.initials = initials;
            usr.fullName = u.Name;
            usr.companyName = u.Contact?.Account?.Name;
            usr.imgCountry = countryImg;
            usr.countryName = u.USER_country__c;
            usr.userGlobalId = u.USER_TXT_GlobalId__c;
            userList.add(usr);
          }
        }
      }
    } catch (Exception e) {
      throw new CustomException('ERROR RETRIEVING LIST OF MATRIX USERS BRASIL');
    }
    //System.debug('userList: '+userList);
    return userList;
  }

  public static List<WRAPPER_OTV_Info.UserInformation> getDummyUsers() {
    StaticResource static_resource = [
      SELECT Id, SystemModStamp
      FROM StaticResource
      WHERE Name = 'Flags'
      LIMIT 1
    ];

    WRAPPER_OTV_Info.UserInformation usr1 = new WRAPPER_OTV_Info.UserInformation();
    usr1.initials = 'MD';
    usr1.fullName = 'Mary Dillon';
    usr1.companyName = 'Bamboo Matrix';
    usr1.imgCountry =
      '/resource/' +
      String.valueOf(
        ((DateTime) static_resource.get('SystemModStamp')).getTime()
      ) +
      '/Flags/ES.svg';
    usr1.countryName = 'Spain';
    usr1.userGlobalId = 'spainglobalid';

    WRAPPER_OTV_Info.UserInformation usr2 = new WRAPPER_OTV_Info.UserInformation();
    usr2.initials = 'BK';
    usr2.fullName = 'Barbara Kelley';
    usr2.companyName = 'Bamboo Matrix';
    usr2.imgCountry =
      '/resource/' +
      String.valueOf(
        ((DateTime) static_resource.get('SystemModStamp')).getTime()
      ) +
      '/Flags/FR.svg';
    usr2.countryName = 'France';
    usr2.userGlobalId = 'franceglobalid';

    WRAPPER_OTV_Info.UserInformation usr3 = new WRAPPER_OTV_Info.UserInformation();
    usr3.initials = 'DL';
    usr3.fullName = 'Deborah Lloyd';
    usr3.companyName = 'Bamboo Matrix';
    usr3.imgCountry =
      '/resource/' +
      String.valueOf(
        ((DateTime) static_resource.get('SystemModStamp')).getTime()
      ) +
      '/Flags/IT.svg';
    usr3.countryName = 'Italy';
    usr3.userGlobalId = 'italyuserid';

    WRAPPER_OTV_Info.UserInformation usr4 = new WRAPPER_OTV_Info.UserInformation();
    usr4.initials = 'CM';
    usr4.fullName = 'Charles Mcdaniel';
    usr4.companyName = 'Bamboo Matrix';
    usr4.imgCountry =
      '/resource/' +
      String.valueOf(
        ((DateTime) static_resource.get('SystemModStamp')).getTime()
      ) +
      '/Flags/PT.svg';
    usr4.countryName = 'Portugal';
    usr4.userGlobalId = 'portugaluserid';

    WRAPPER_OTV_Info.UserInformation usr5 = new WRAPPER_OTV_Info.UserInformation();
    usr5.initials = 'TD';
    usr5.fullName = 'Thomas Dale';
    usr5.companyName = 'Bamboo Matrix';
    usr5.imgCountry =
      '/resource/' +
      String.valueOf(
        ((DateTime) static_resource.get('SystemModStamp')).getTime()
      ) +
      '/Flags/CL.svg';
    usr5.countryName = 'Chile';
    usr5.userGlobalId = 'chileuserid';

    WRAPPER_OTV_Info.UserInformation usr6 = new WRAPPER_OTV_Info.UserInformation();
    usr6.initials = 'PJ';
    usr6.fullName = 'Paul Jordan';
    usr6.companyName = 'Bamboo Matrix';
    usr6.imgCountry =
      '/resource/' +
      String.valueOf(
        ((DateTime) static_resource.get('SystemModStamp')).getTime()
      ) +
      '/Flags/PL.svg';
    usr6.countryName = 'Poland';
    usr6.userGlobalId = 'polanduserid';
    return new List<WRAPPER_OTV_Info.UserInformation>{
      usr1,
      usr2,
      usr3,
      usr4,
      usr5,
      usr6
    };
  }

  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        
    Description:	Method to get a list of subsidiaries to compare with the original list for Brasil
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz       Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<WRAPPER_OTV_Info.Subsidiary> calloutGetAccountSubsidiaries(
    String lstAccounts
  ) {
    system.debug('Llega ');
    system.debug(lstAccounts);
    Map<String, String> mapNameCountry = new Map<String, String>();
    List<WRAPPER_OTV_Info.Subsidiary> lstSubsidiaries = new List<WRAPPER_OTV_Info.Subsidiary>();
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
      WRAPPER_OTV_Info.Subsidiary sub = new WRAPPER_OTV_Info.Subsidiary();
      sub.companyName = nameCountryKey;
      sub.country = mapNameCountry.get(nameCountryKey);
      lstSubsidiaries.add(sub);
    }
    //System.debug(setSubsidiaries);
    //lstSubsidiaries.addAll(setSubsidiaries);
    System.debug(lstSubsidiaries);
    return lstSubsidiaries;
  }
}
