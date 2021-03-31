public without sharing class CNT_OTVCallServicesAux {
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
    public String companyGlobalId;
    public String serviceActivationType;
  }

  public class ServiceActivationResponse {
    public ServiceActivationId serviceActivationResponse;
  }

  public class ServiceActivationId {
    public String serviceActivationId;
  }

  /*----------------------------------------------------------------------------------
	Author:         Antonio Matachana
	Company:        
	Description:    
					Parametros del service ('OTV_LOCAL_ACT', 'OTV_GLOBAL_ACT')
					Parametros del status (Pending Subsidiary, Active)
					Parametros del status campo ACC_PCK_OTView_Enrollment__c en Account (In progress, Enrolled)
	Test Class:     CNT_OTVCallServicesAux_Test
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
          SELECT Id, ACC_serviceActivationId__c
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
					Parametros del status (Pending Subsidiary, Active)
					Parametros del status campo ACC_PCK_OTView_Enrollment__c en Account (In progress, Enrolled)
	Test Class:     CNT_OTVCallServicesAux_Test
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
    CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
      'TGR_ChangeStatusOTV'
    );
    String finalEndPoint = configWs.CNT_Endpoint__c;
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
	Test Class:     CNT_OTVCallServicesAux_Test
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
	Test Class:     CNT_OTVCallServicesAux_Test
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
	Test Class:     CNT_OTVCallServicesAux_Test
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
      acc.ACC_PCK_OTView_Enrollment__c = 'In Progress';
      ServiceActivationData sad = new ServiceActivationData();
      sad.companyGlobalId = acc.ACC_TXT_CompanyId__c;
      sad.serviceActivationType = service;
      CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
        'TRG_StartProcess'
      );
      String response = Global_IntegrationWrapper.launchHttp(
        JSON.Serialize(sad),
        configWs.CNT_Endpoint__c,
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
}
