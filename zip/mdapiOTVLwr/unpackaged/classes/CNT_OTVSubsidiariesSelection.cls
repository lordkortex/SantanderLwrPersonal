public without sharing class CNT_OTVSubsidiariesSelection {
  /*public class AccountUrl { 
        @AuraEnabled
        public Account account{get;set;}
        @AuraEnabled
        public String imgCountry{get;set;}
    }*/
  /*public class Subsidiaries { 
        @AuraEnabled
        public Account account{get;set;}
        @AuraEnabled
        public Boolean completo{get;set;}
        }*/
  public class AccountUrlService {
    @AuraEnabled
    public String companyName { get; set; }
    @AuraEnabled
    public String country { get; set; }
    @AuraEnabled
    public String companyGlobalId { get; set; }
    @AuraEnabled
    public String documentType { get; set; }
    @AuraEnabled
    public String documentNumber { get; set; }
    @AuraEnabled
    public String imgCountry { get; set; }
  }

  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to obtain a list of accounts from a mulesoft endpoint 
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<AccountUrlService> getLstAccounts() {
    Id userId = UserInfo.getUserId();
    List<Account> accountList = new List<Account>();
    CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
      'TRG_GetSubsidiaries'
    );
    String finalEndPoint = configWs.CNT_Endpoint__c;

    List<User> currentUser = [
      SELECT Id, ContactId
      FROM User
      WHERE Id = :userId
      LIMIT 1
    ];

    if (!currentUser.isEmpty() && currentUser[0].ContactId != null) {
      accountList = [
        SELECT Id, ACC_TXT_CompanyId__c
        FROM ACCOUNT
        WHERE ACC_CHK_OTView_Admin__r.ID = :currentUser[0].ContactId
        LIMIT 1
      ];
    }

    if (accountList[0].ACC_TXT_CompanyId__c != null) {
      finalEndPoint = finalEndpoint.replace('{companyGlobalId}', '38840442'); // accountList[0].ACC_TXT_CompanyId__c
    }
    /*else{
            finalEndPoint = finalEndpoint.replace('{companyGlobalId}',companyGlobalId);
        }*/
    System.debug('debug finalEndPoint' + finalEndPoint);
    String response = Global_IntegrationWrapper.launchHttp(
      '',
      finalEndPoint,
      configWs.CNT_HTTPMethod__c
    );
    System.debug('getLstAccounts response>>>>>>>' + response);
    //WRAPPER_CompanySubsidiary_OTV lstSub = WRAPPER_CompanySubsidiary_OTV.parse(response);
    List<WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary> lstSub = WRAPPER_CompanySubsidiary_OTV.parse(
      response
    );
    System.debug('getLstAccounts lstSub >>>>>>>' + lstSub);
    return getAccountUrl(lstSub);
  }

  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to get the static resource for each value in the list of accounts 
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static List<AccountUrlService> getAccountUrl(
    List<WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary> lstSub
  ) {
    List<AccountUrlService> lstAcctUrl = new List<AccountUrlService>();
    //if(!lstSub.companySubsidiaryList.isEmpty()){
    if (lstSub.size() > 0) {
      StaticResource static_resource = [
        SELECT Id, SystemModStamp
        FROM StaticResource
        WHERE Name = 'Flags'
        LIMIT 1
      ];

      //for(WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary sub : lstSub.companySubsidiaryList ){
      for (WRAPPER_CompanySubsidiary_OTV.CompanySubsidiary sub : lstSub) {
        System.debug('getAccountUrl: ' + sub.companyIdentifications);
        String url =
          '/resource/' +
          String.valueOf(
            ((DateTime) static_resource.get('SystemModStamp')).getTime()
          ) +
          '/Flags/' +
          (sub.country == null ? 'Default' : sub.country) +
          '.svg';

        AccountUrlService a = new AccountUrlService();
        a.companyName = sub.companyName;
        a.country = sub.country;
        system.debug(sub.companyIdentificationid);
        system.debug(sub.companyGlobalId);
        a.companyGlobalId = sub.companyGlobalId;
        //Pendiente verificar valor de la lista a incluir (varios valores)
        a.documentType = sub.companyIdentifications[0].documentType[0];
        a.documentNumber = sub.companyIdentifications[0].documentNumber[0];
        a.imgCountry = url;
        lstAcctUrl.add(a);
      }
    }
    System.debug('getAccountUrl lstAcctUrl: ' + lstAcctUrl);
    return lstAcctUrl;
  }

  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to obtain a list of accounts from a salesforce BBDD (pending delete) 
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/
  /* @AuraEnabled
	public static List<AccountUrl> getLstAccounts(){
        try{
			Boolean terminar = false;
            Id userId = UserInfo.getUserId();
            List<User> currentUser = [SELECT Id, ContactId FROM User WHERE Id = :userId LIMIT 1];

            if(!currentUser.isEmpty() && currentUser[0].ContactId != null){
                List<Contact> contactList = [SELECT Id, AccountId FROM Contact WHERE Id = :currentUser[0].ContactId LIMIT 1];
                
                if(!contactList.isEmpty() && contactList[0].AccountId != null){
                    //Children of the main company 
                    List<Account>  lstAccts = [SELECT Id, 
                                               ACC_TXT_DocumentType__c, 
                                               ACC_TXT_DocumentNumber__c, 
                                               Name, 
                                               Consent_Country__c
                                               FROM Account
                                               WHERE ParentID = :contactList[0].AccountId
                                               AND ACC_CHK_OTView_Admin__c != null];
                    
                    //All accounts with ParentID to obtain children of other accounts             
                    List<Account>  lstAcctsTotal = [SELECT Id,
                                                    ParentId,
                                                    ACC_TXT_DocumentType__c, 
                                                    ACC_TXT_DocumentNumber__c, 
                                                    Name, 
                                                    Consent_Country__c
                                                    FROM Account
                                                    WHERE ParentId != null
                                                    AND ACC_CHK_OTView_Admin__c != null];
                    
                    List<Subsidiaries> lstSub = new List<Subsidiaries>();
                    if(!lstAccts.isEmpty()){
                        for(Account acct : lstAccts){
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
                        List<AccountUrl> lstAcctUrl = new List<AccountUrl>();
                        if(!lstSub.isEmpty()){
                            StaticResource static_resource = [SELECT Id, SystemModStamp
                                                                FROM StaticResource 
                                                               WHERE Name = 'Flags'
                                                               LIMIT 1];
                            for(Subsidiaries sub : lstSub ){
                              String url = '/resource/'
                                                + String.valueOf(((DateTime)static_resource.get('SystemModStamp')).getTime())
                                                + '/Flags/' 	
                                                + (sub.account.Consent_Country__c == null ? 'Default' : sub.account.Consent_Country__c) + '.svg';  
                                   
                                AccountUrl a = new AccountUrl();
                                a.account = sub.account;
                                a.imgCountry = url;
                                lstAcctUrl.add(a);
                            }
                        }
                        if(!lstAcctUrl.isEmpty()){
                            return lstAcctUrl;
                        }
              		}
               }
            }
            return null;
        }catch(Exception e){
            system.debug(e);
            return null;
         }
    }*/
}
