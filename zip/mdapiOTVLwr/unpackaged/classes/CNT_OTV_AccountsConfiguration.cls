public without sharing class CNT_OTV_AccountsConfiguration {
  /*public class Subsidiaries { 
        @AuraEnabled
        public Account account{get;set;}
        @AuraEnabled
        public Boolean completo{get;set;}
        @AuraEnabled
        public Boolean enrolado{get;set;}
		@AuraEnabled
        public String statusActivation{get;set;}
    }
    
    
    public class SubsidiariesServiceList {
        @AuraEnabled
        public List<SubsidiariesService> listSubsidiariesService{get;set;}
    }
    
    public class CountryName { 
        @AuraEnabled
        public String label{get;set;}
        @AuraEnabled
        public String value{get;set;}
        @AuraEnabled
        public String url{get;set;}
    }*/

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Return Subsidiaries accounts from Main Company
    History 
    <Date>          <Author>            <Change Description>
    17/02/2021      Antonio Matachana  		Intial Version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<WRAPPER_OTV_Info.SubsidiariesService> getSubsidiariesByAccountService() {
    List<WRAPPER_OTV_Info.SubsidiariesService> lstSub = new List<WRAPPER_OTV_Info.SubsidiariesService>();
    try {
      String mainCompanyId = '1588401980'; //[SELECT Id, Contact.Account.ACC_TXT_CompanyId__c FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];

      //Prepare and execute callout
      CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
        'OTV_OmnichannelServiceSubStatus_GET'
      );
      String finalEndPoint = configWs.CNT_Endpoint__c;
      finalEndPoint = finalEndpoint.replace('{companyId}', mainCompanyId);
      String response = Global_IntegrationWrapper.launchHttp(
        '',
        finalEndPoint,
        configWs.CNT_HTTPMethod__c
      );
      System.debug('getSubsidiariesByAccountServie response>>>>>>>' + response);

      //Parse response
      WRAPPER_CompanyOmniChannelStatus_OTV subsidiariesStatus = WRAPPER_CompanyOmniChannelStatus_OTV.parse(
        response
      );

      //Get the active companies
      List<WRAPPER_CompanyOmniChannelStatus_OTV.companyList> companyList = subsidiariesStatus.companyList;
      Set<String> setCompanyIdActive = new Set<String>();
      List<WRAPPER_CompanyOmniChannelStatus_OTV.companyList> companyListActive = new List<WRAPPER_CompanyOmniChannelStatus_OTV.companyList>();
      for (WRAPPER_CompanyOmniChannelStatus_OTV.companyList c : companyList) {
        if (c.status != 'INACTIVE') {
          companyListActive.add(c);
          setCompanyIdActive.add(c.companyId);
        }
      }

      //With companyid get country and company name
      Map<String, Account> mapCompanyIdAcc = new Map<String, Account>();
      if (setCompanyIdActive.size() > 0) {
        List<Account> listAccounts = [
          SELECT Id, Name, Consent_Country__c, ACC_TXT_CompanyId__c
          FROM Account
          WHERE ACC_TXT_CompanyId__c IN :setCompanyIdActive
        ];
        if (listAccounts.size() > 0) {
          for (Account acc : listAccounts) {
            mapCompanyIdAcc.put(acc.ACC_TXT_CompanyId__c, acc);
          }
        }
      }

      for (
        WRAPPER_CompanyOmniChannelStatus_OTV.companyList c : companyListActive
      ) {
        WRAPPER_OTV_Info.SubsidiariesService subServ = new WRAPPER_OTV_Info.SubsidiariesService();
        subServ.account = mapCompanyIdAcc.get(c.companyId);
        if (c.status == 'ACTIVE') {
          subServ.enrolado = true;
          subServ.statusActivation = 'Enrolled';
        } else {
          subServ.enrolado = false;
          subServ.statusActivation = 'To be confirmed by subsdiary';
        }
        subServ.companyId = c.companyId;
        subServ.serviceId = c.serviceId;
        subServ.status = c.status;
        subServ.companyName = mapCompanyIdAcc.get(c.companyId).Name; //SACAR QUERY
        if (mapCompanyIdAcc.get(c.companyId).Consent_Country__c == null) {
          subServ.companyCountry = 'Default';
        } else {
          subServ.companyCountry = mapCompanyIdAcc.get(c.companyId)
            .Consent_Country__c; //SACAR QUERY
        }

        lstSub.add(subServ);
      }

      /*if(listSubsidiariesStatus.size()>0){
            return listSubsidiariesStatus;
            } */
      //TO DO
      //DEVOLVER TODAS MENOS LAS INACTIVAS
      //NO TENEMOS EL PAIS (OPCION1--> Sacarlo de SF), (OPCION2--> Perdir que nos lo pase el servicio (BUENA)
      /*if(sub.account.ACC_PCK_OTView_Enrollment__c == 'Enrolled'){ 	//STATUS = ACTIVE
            sub.enrolado = true;
            sub.statusActivation = 'Enrolled';
            }else{												//PARA EL RESTO
            sub.enrolado = false;
            sub.statusActivation = 'To be confirmed by subsdiary';
            }*/
      if (lstSub.size() > 0) {
        return lstSub;
      }
    } catch (Exception e) {
      throw new CustomException(
        'Error getting the Subsidiaries from Main Company'
      );
    }
    return lstSub;
  }

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Recieve a list of SubsidiariesService and return List<CountryName>
    History 
    <Date>          <Author>            <Change Description>
    17/02/2021      Antonio Matachana  		Intial Version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<WRAPPER_OTV_Info.CountryName> getCountriesNamesService(
    String json
  ) {
    System.debug('getCountriesNamesService json ' + json);
    List<String> listCountries = new List<String>();
    Set<String> setCountries = new Set<String>();
    //List<String> subsidieriesCountry = new List<String>();

    List<String> subsidiariesService = (List<String>) System.JSON.deserialize(
      json,
      List<String>.class
    );
    System.debug(
      'getCountriesNamesService DESERIALIZE subsidiariesService: ' +
      subsidiariesService
    );

    for (String ss : subsidiariesService) {
      if (String.isNotBlank(ss)) {
        setCountries.add(ss);
      } else {
        setCountries.add('Default');
      }
    }
    for (String country : setCountries) {
      listCountries.add(country);
    }
    //List<String> listCountries = getCountries();

    List<WRAPPER_OTV_Info.CountryName> listCountryNames = new List<WRAPPER_OTV_Info.CountryName>();
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
      WRAPPER_OTV_Info.CountryName country = new WRAPPER_OTV_Info.CountryName();
      if (
        listCountries.size() > 0 && listCountries.contains(entry.getValue())
      ) {
        country.label = entry.getLabel();
        country.value = entry.getValue();
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
    if (listCountries.contains('Default')) {
      WRAPPER_OTV_Info.CountryName country = new WRAPPER_OTV_Info.CountryName();
      country.label = 'Default';
      country.value = 'Default';
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

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Retrieves the list of countries of Subsidiaries
    History 
    <Date>          <Author>            <Change Description>
    20/01/2021      Antonio Matachana  		Intial Version
    ------------------------------------------------------------       
    @AuraEnabled
    public static List<String> getCountries(){
        Id userId = UserInfo.getUserId();
        List<Subsidiaries> listSub = getSubsidiariesByUser();
        List<String> subsidieriesCountry = new List<String>();
        Set<String> setCountries = new Set<String>();
        for(Subsidiaries sub :listSub){
            if(String.isNotBlank(sub.account.Consent_Country__c)){
                setCountries.add(sub.account.Consent_Country__c);
            }else{
                setCountries.add('Default');
            }
        }
        for(String country: setCountries){
            subsidieriesCountry.add(country);
        }
        return subsidieriesCountry; 
    }*/

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Retrieves the list of CountryName object in format (Spain, ES)
    History 
    <Date>          <Author>            <Change Description>
    20/01/2021      Antonio Matachana  		Intial Version
    ------------------------------------------------------------
    @AuraEnabled
    public static List<CountryName> getCountriesNames(){
        List<String> listCountries = getCountries();
        List<CountryName> listCountryNames = new List<CountryName>();
        Schema.DescribeFieldResult F = Account.Consent_Country__c.getDescribe();
        Schema.sObjectField T = F.getSObjectField();
        List<PicklistEntry> picklistCountries = T.getDescribe().getPicklistValues();
        StaticResource static_resource = [SELECT Id, SystemModStamp
                                            FROM StaticResource 
                                           WHERE Name = 'Flags'
                                           LIMIT 1];
        for(PicklistEntry entry: picklistCountries){
            CountryName country = new CountryName();
            if(listCountries.size()>0 && listCountries.contains(entry.getValue())){
                country.label = entry.getLabel();
                country.value = entry.getValue();
				String url = '/resource/'
						   + String.valueOf(((DateTime)static_resource.get('SystemModStamp')).getTime())
                           + '/Flags/' 
                           + country.value + '.svg';
                country.url = url;
                listCountryNames.add(country);
            }
        }
        if(listCountries.contains('Default')){
            CountryName country = new CountryName();
            country.label = 'Default';
            country.value = 'Default';
            String url = '/resource/'
					   + String.valueOf(((DateTime)static_resource.get('SystemModStamp')).getTime())
                       + '/Flags/' 
                       + country.value + '.svg';
            country.url = url;
            listCountryNames.add(country);
        }
        return listCountryNames;
    }*/

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Retrieves the information of subsidiaries grouped by country
    History 
    <Date>          <Author>            <Change Description>
    20/01/2021      Antonio Matachana  		Intial Version
    ------------------------------------------------------------
    @AuraEnabled
    public static Map<CountryName, List<Subsidiaries>> getMapCountrySubsidiaries(List<CountryName> countriesNameList ,List<Subsidiaries> listSub){
        Map<CountryName, List<Subsidiaries>> subsidiaryAccountMap = new Map<CountryName, List<Subsidiaries>>();
        try {
            for(CountryName countryNameItem: countriesNameList){
                List<Subsidiaries> subsidieriesAux = new List<Subsidiaries>();
                for(Subsidiaries subItem : listSub){
                    if(countryNameItem.value.equalsIgnoreCase(subItem.account.Consent_Country__c)){      
                        subsidieriesAux.add(subItem);
                    }  
                }
                subsidiaryAccountMap.put(countryNameItem, subsidieriesAux);
            }
        } catch (Exception e) {
             system.debug(e);
        }
        return subsidiaryAccountMap;
    }*/

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Retrieves list of subsidiaries by country
    History 
    <Date>          <Author>            <Change Description>
    20/01/2021      Antonio Matachana  		Intial Version
    ------------------------------------------------------------
    @AuraEnabled
    public static List<Subsidiaries> getSubsidiariesByCountry(List<Subsidiaries> listSub, String country){
        List<Subsidiaries> subsidieriesCountry = new List<Subsidiaries>();
        if(!listSub.isEmpty() && String.isNotBlank(country)){
            for(Subsidiaries sub : listSub){
                if(String.isNotBlank(sub.account.Consent_Country__c) && sub.account.Consent_Country__c == country){
                    subsidieriesCountry.add(sub);
                }
            }
        }
            return subsidieriesCountry;
    }*/

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Retrieves list of subsidiaries by User
    History 
    <Date>          <Author>            <Change Description>
    20/01/2021      Antonio Matachana  		Intial Version
    ------------------------------------------------------------
    @AuraEnabled
    public static List<Subsidiaries> getSubsidiariesByUser(){
        Id userId = UserInfo.getUserId();
        List<Subsidiaries> listSub = new List<Subsidiaries>();
        try{
            if(userId != null ){
                List<Contact> contactList = [SELECT Id, AccountId FROM Contact WHERE CONTACT_User__c = :userId LIMIT 1];
                listSub =  getSubsidiariesByAccount (contactList[0].AccountId);
                for(Subsidiaries sub: listSub){
                    if(sub.account.ACC_PCK_OTView_Enrollment__c == 'Enrolled'){
                        sub.enrolado = true;
                        sub.statusActivation = 'Enrolled';
                    }else{
                        sub.enrolado = false;
                        sub.statusActivation = 'To be confirmed by subsdiary';
                    }
                }    
            }
            return listSub;
        }catch(Exception e){
            system.debug(e);
            return null;
         }
    }*/

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Return Subsidiaries accounts from Main Company
    History 
    <Date>          <Author>            <Change Description>
    20/01/2021      Antonio Matachana  		Intial Version
    ------------------------------------------------------------
    @AuraEnabled
    public static List<Subsidiaries> getSubsidiariesByAccount (Id mainCompanyId){
        List<Subsidiaries> lstSub = new List<Subsidiaries>();
        try {
            Boolean terminar = false;
            if(mainCompanyId != null){
                List<Account>  lstAccts = [SELECT Id, 
                                                  ACC_TXT_DocumentType__c, 
                                                  ACC_TXT_DocumentNumber__c, 
                                                  Name, 
                                                  Consent_Country__c,
                                                  ACC_PCK_Country__c,
                                                  ACC_PCK_OTView_Enrollment__c
                                       	 	 FROM Account
                                        	WHERE ParentID = :mainCompanyId
                    						  AND ACC_CHK_OTView_Admin__c != null
                                              AND ACC_PCK_OTView_Enrollment__c != NULL];

                //All accounts with ParentID to obtain children of other accounts             
                List<Account>  lstAcctsTotal = [SELECT Id,
                                                	   ParentId,
                                                       ACC_TXT_DocumentType__c, 
                                                       ACC_TXT_DocumentNumber__c, 
                                                       Name, 
                                                       Consent_Country__c,
                                                       ACC_PCK_Country__c,
                                                       ACC_PCK_OTView_Enrollment__c
                                       	 		  FROM Account
                                                 WHERE ParentId != null
                    						  	   AND ACC_CHK_OTView_Admin__c != null
                                                   AND ACC_PCK_OTView_Enrollment__c != NULL];

                
                if(!lstAccts.isEmpty()){
                    for(Account acct : lstAccts){
                        if(String.isBlank(acct.Consent_Country__c)){
                            acct.Consent_Country__c = 'Default';
                        }
                        Subsidiaries sub = new Subsidiaries();
                        sub.account = acct;
                        sub.completo = false;
                        lstSub.add(sub);
                    }
                    do{
                        List<Subsidiaries> lstSubAux = new List<Subsidiaries>();
                        for(Subsidiaries subsidiary : lstSub){     
                            if(subsidiary.completo == false){
                                subsidiary.completo = true;
                                for(Account account: lstAcctsTotal){
                                    if(account.ParentId == subsidiary.account.Id){
                                        if(String.isBlank(account.Consent_Country__c)){
                                            account.Consent_Country__c = 'Default';
                                        }  
                                        Subsidiaries sub = new Subsidiaries();
                                        sub.account = account;
                                        sub.completo = false;
                                        lstSubAux.add(sub);
                                     }
                                }
                                lstSubAux.add(subsidiary); 
                            }
                        }
                        if(!lstSubAux.isEmpty()){
                            for(Subsidiaries sub: lstSubAux){
                                for(Subsidiaries sub2: lstSub){
                                    if(sub.account.Id == sub2.account.Id && sub.completo != sub2.completo){
                                        sub2.completo = true;
                                    }
                                }
                                if(!lstSub.contains(sub)){
                                    lstSub.add(sub);
                                }                             
                            } 
                        }else{
                            terminar = true;
                        }
                    }while(!terminar);                                       
                }
            }
            return lstSub;
        } catch (Exception e) {
            system.debug(e);
            return null;
        }
    }*/
}
