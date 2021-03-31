/*----------------------------------------------------------------------------------
Author:         Antonio Matachana
Company:        
Description:    cmpOTVCancelService apex controller
Test Class:     CNT_OTV_CancelService_Test
History
<Date>          <Author>        	<Description>
22/03/2021      Antonio Matachana    	Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_OTV_CancelService {
  public CNT_OTV_CancelService() {
  }

  /*------------------------------------------------------------
    Author:         Antonio Matachana
    Company:        
    Description:    Insert a case for Cncel Service in Salesforce BBDD
    History 
    <Date>          <Author>            <Change Description>
    08/03/2021	    Antonio Matachana        Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static void createCancelServiceCase(
    String Reason,
    String Description
  ) {
    CNT_OTV_CaseManagement.createCancelServiceCase(Reason, Description);
  }

  /*------------------------------------------------------------
    Author:         Diego de Asis
    Company:        Deloitte
    Description:    Method to obtain ther username
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Diego de Asis        Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static String getUserName() {
    return CNT_OTV_CaseManagement.getUserName();
  }

  /*------------------------------------------------------------
    Author:         Diego de Asis
    Company:        Deloitte
    Description:    Method to obtain ther username
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Diego de Asis        Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static String declineOTVInvitation(
    String reason,
    String details,
    String status
  ) {
    return CNT_OTV_ServiceDeclination.declineOTVInvitation(
      reason,
      details,
      status
    );
  }
}
