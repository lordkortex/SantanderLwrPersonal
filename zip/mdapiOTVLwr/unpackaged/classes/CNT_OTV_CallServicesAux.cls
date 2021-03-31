public without sharing class CNT_OTV_CallServicesAux {
  public class ServiceActivationPath {
    public String service_activation_id;
    public String companyId;
    public String serviceActivacionType;
    public serviceActivationDataPath serviceActivationDataPath;
  }
  public class ServiceActivationDataPath {
    public string status;
  }

  public class ServiceActivationData {
    public String companyId;
    public String serviceActivationType;
    //public String matrixCompanyGlobalId;
  }

  public class ServiceActivationResponse {
    public ServiceActivationId serviceActivationResponse;
  }

  public class ServiceActivationId {
    public String serviceActivationId;
  }

  public class OmnichannelServiceData {
    public String matrixCompanyId;
    public String reason;
    public String description;
    public String status;
  }

  /*----------------------------------------------------------------------------------
	Author:         Antonio Matachana
	Company:        
	Description:    
					Parametros del service ('OTV_LOCAL_ACT', 'OTV_GLOBAL_ACT')
					Parametros del status (Pending Subsidiary, Active)
					Parametros del status campo ACC_PCK_OTView_Enrollment__c en Account (In progress, Enrolled)
	Test Class:     CNT_OTV_CallServicesAux_Test
	History
	<Date>          <Author>        <Description>
	11/02/2021      Antonio Matachana     	Initial version
	----------------------------------------------------------------------------------*/
  @AuraEnabled
  public static void processAppFirma(
    String service,
    String status,
    String statusSF,
    String updateStr
  ) {
    Account acct = null;
    Id userId = UserInfo.getUserId();
    List<User> currentUser = [
      SELECT Id, ContactId
      FROM User
      WHERE Id = :userId
      LIMIT 1
    ];
    system.debug('LLEGA');
    if (!currentUser.isEmpty() && currentUser[0].ContactId != null) {
      List<Contact> contactList = [
        SELECT Id, AccountId
        FROM Contact
        WHERE Id = :currentUser[0].ContactId
        LIMIT 1
      ];
      if (!contactList.isEmpty() && contactList[0].AccountId != null) {
        acct = [
          SELECT Id, ACC_serviceActivationId__c, Parent.ACC_TXT_CompanyId__c
          FROM Account
          WHERE Id = :contactList[0].AccountId
          LIMIT 1
        ];
        System.debug('processAppFirma acct: ' + acct);
        if (acct.Id != null) {
          if (updateStr == null) {
            if (service == 'OTV_GLOBAL_ACT') {
              system.debug('startProcessAppFirma updateProcess GLOBAL');
              updateProcess(service, status, statusSF, acct);
            }
            if (service == 'OTV_LOCAL_ACT') {
              system.debug('startProcessAppFirma updateProcess LOCAL');
              updateProcess(service, status, statusSF, acct);
            }
          } else {
            system.debug(updateStr);
            String[] lstSubsidiaries = (String[]) System.JSON.deserialize(
              updateStr,
              String[].class
            );
            system.debug('sale updateStr');
            system.debug(lstSubsidiaries);
            List<Account> lstAccts = new List<Account>(
              [
                SELECT Id, ACC_CHK_OTView_Enrollment__c, ACC_TXT_CompanyId__c
                FROM Account
                WHERE Id IN :lstSubsidiaries
              ]
            );
            system.debug('processAppFirma susidiary List: ' + lstAccts);

            if (lstAccts.size() > 0) {
              service = 'OTV_LOCAL_ACT';
              status = 'In Progress';
              List<Account> lstAccToUpdate = startProcessSubsidiaries(
                service,
                lstAccts
              );
              service = 'OTV_GLOBAL_ACT';
              status = 'ACTIVE';
              statusSF = 'Enrolled';
              Account acc = updateProcess(service, status, statusSF, acct);
              update lstAccToUpdate;
              update acc;
            }
          }
        }
      }
    }
  }

  /*----------------------------------------------------------------------------------
	Author:         Antonio Matachana
	Company:        
	Description:    Update status of account
					Parametros del service ('OTV_LOCAL_ACT', 'OTV_GLOBAL_ACT')
					Parametros del status (ACTIVATION_PENDING, SUBSIDIARY_SELECTION_PENDING, SELECTION_PENDING, ACTIVE, INACTIVE, REJECTED, CANCELLED)
					Parametros del statusSF campo ACC_PCK_OTView_Enrollment__c en Account en SF (In progress, Subsidiary Selection Pending, Enrolled, Rejected, Cancelled)
	Test Class:     CNT_OTV_CallServicesAux_Test
	History
	<Date>          <Author>        <Description>
	11/02/2021      Antonio Matachana     	Initial version
	----------------------------------------------------------------------------------*/
  @AuraEnabled
  public static Account updateProcess(
    String service,
    String status,
    String statusSF,
    Account acct
  ) {
    if (statusSF != null) {
      acct.ACC_PCK_OTView_Enrollment__c = statusSF;
    }
    System.debug('updateProcess >>>>>>>' + acct.ACC_serviceActivationId__c);
    System.debug('updateProcess statusSF >>>>>>>' + statusSF);
    serviceActivationDataPath dataPath = new serviceActivationDataPath();
    datapath.status = status;
    CNT_ApiConfiguration__c configWs;
    String finalEndPoint;
    if (service == 'OTV_GLOBAL_ACT') {
      configWs = CNT_ApiConfiguration__c.getValues(
        'OTV_ServiceActivation_PATCH'
      );
      finalEndPoint = configWs.CNT_Endpoint__c;
    } else {
      configWs = CNT_ApiConfiguration__c.getValues(
        'OTV_ServiceActivationSub_PATCH'
      );
      finalEndPoint = configWs.CNT_Endpoint__c;
      finalEndPoint = finalEndpoint.replace(
        '{company_id_matrix}',
        acct.Parent.ACC_TXT_CompanyId__c
      );
    }
    finalEndPoint = finalEndpoint.replace(
      '{service_activation_id}',
      acct.ACC_serviceActivationId__c
    );
    String response = Global_IntegrationWrapper.launchHttp(
      JSON.Serialize(dataPath),
      finalEndPoint,
      configWs.CNT_HTTPMethod__c
    );
    System.debug('updateProcessFinal >>>>>>>' + response);
    return acct;
  }

  /*----------------------------------------------------------------------------------
	Author:         Antonio Matachana
	Company:        
	Description:    Initiate subsidiaries process
					Parametros del service ('OTV_LOCAL_ACT', 'OTV_GLOBAL_ACT')
	Test Class:     CNT_OTV_CallServicesAux_Test
	History
	<Date>          <Author>        <Description>
	11/02/2021      Antonio Matachana     	Initial version
	----------------------------------------------------------------------------------*/
  @AuraEnabled
  public static List<Account> startProcessSubsidiaries(
    String service,
    List<Account> lstSubsidiaries
  ) {
    List<Account> lstAccToUpdate = new List<Account>();
    for (Account acc : lstSubsidiaries) {
      lstAccToUpdate.add(startProcessAccountCallout(service, acc));
    }
    return lstAccToUpdate;
  }

  /*----------------------------------------------------------------------------------
	Author:         Antonio Matachana
	Company:        Initiate matrix process
	Description:    Initiate activation matrix process
					Parametros del service ('OTV_LOCAL_ACT', 'OTV_GLOBAL_ACT')
	Test Class:     CNT_OTV_CallServicesAux_Test
	History
	<Date>          <Author>        <Description>
	11/02/2021      Antonio Matachana     	Initial version
	----------------------------------------------------------------------------------*/
  @AuraEnabled
  public static void startProcessMatrix(String service, Account accMatrix) {
    startProcessAccountCallout(service, accMatrix);
    update accMatrix;
  }

  /*----------------------------------------------------------------------------------
	Author:         Antonio Matachana
	Company:        
	Description:    Call service to activate service.
					Parametros del service ('OTV_LOCAL_ACT', 'OTV_GLOBAL_ACT')
	Test Class:     CNT_OTV_CallServicesAux_Test
	History
	<Date>          <Author>        <Description>
	11/02/2021      Antonio Matachana     	Initial version
	----------------------------------------------------------------------------------*/
  @AuraEnabled
  public static Account startProcessAccountCallout(
    String service,
    Account acc
  ) {
    if (acc != null) {
      //String matrixGlobalId = [SELECT Id, Contact.Account.Parent.ACC_TXT_CompanyId__c FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1][0]?.Contact?.Account?.Parent?.ACC_TXT_CompanyId__c;
      acc.ACC_PCK_OTView_Enrollment__c = 'In Progress';
      ServiceActivationData sad = new ServiceActivationData();
      //sad.companyGlobalId = acc.ACC_TXT_CompanyId__c;
      sad.companyId = acc.ACC_TXT_CompanyId__c;
      sad.serviceActivationType = service;
      //sad.matrixCompanyGlobalId = matrixGlobalId;
      CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
        'OTV_ServiceActivationSub_POST'
      );
      String finalEndPoint = configWs.CNT_Endpoint__c;
      finalEndPoint = finalEndpoint.replace(
        '{company_id_matrix}',
        acc.Parent.ACC_TXT_CompanyId__c
      );
      String response = Global_IntegrationWrapper.launchHttp(
        JSON.Serialize(sad),
        finalEndPoint,
        configWs.CNT_HTTPMethod__c
      );
      System.debug('startProcessAccountCallout >>>>>>>' + response);
      ServiceActivationResponse res = (ServiceActivationResponse) System.JSON.deserialize(
        response,
        ServiceActivationResponse.class
      );
      acc.ACC_serviceActivationId__c = res.serviceActivationResponse.ServiceActivationId;
      System.debug(
        'startProcessAccountCallout >>>>>>>:' +
        res.serviceActivationResponse.ServiceActivationId
      );
    }
    return acc;
  }

  /*------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:    Method to send the invitation declination.
    History 
    <Date>          <Author>            <Change Description>
    11/03/2021	    Antonio Duarte     	Initial version
    ------------------------------------------------------------
    @AuraEnabled
    public static String declineOTVInvitation(String reason, String details,String status){
        String response;
        try{	
            User u = [SELECT Id, Contact.Account.ACC_TXT_CompanyId__c, Contact.Account.Parent.ACC_TXT_CompanyId__c,Contact.Account.ACC_PCK_OTView_Enrollment__c,contact.CONTACT_CHK_Admin__c  FROM User WHERE Id = :UserInfo.getUserId()][0];
            OmnichannelServiceData osd = new OmnichannelServiceData();
            osd.matrixCompanyId = '1588401980';//u.Contact.Account?.Parent?.ACC_TXT_CompanyId__c == null?'':u.Contact.Account?.Parent?.ACC_TXT_CompanyId__c;
        	osd.reason = reason;
        	osd.description = details;// != '' ? details : null;
            if(status == 'Enrolled'){
              	osd.status = 'active';
            }else{
        		osd.status = 'inactive';
                u.contact.CONTACT_CHK_Admin__c = false;
            }
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('OTV_OmnichannelService_PATCH');
            configWs.CNT_Endpoint__c = configWs.CNT_Endpoint__c.replace('{company_id}',u.Contact.Account.ACC_TXT_CompanyId__c).replace('{service_id}','one_trade_view_multi');
            response = Global_IntegrationWrapper.launchHttp(JSON.Serialize(osd), configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
            System.debug('declineOTVInvitation >>>>>>>' + response);
             u.Contact.Account.ACC_PCK_OTView_Enrollment__c = status;
        	update u.Contact.Account;
            update u.Contact;
        }catch(Exception e){
            throw new CustomException ('SFERROR');
        }
        
       
        return response;
    }*/
}
