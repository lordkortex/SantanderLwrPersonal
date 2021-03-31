/*----------------------------------------------------------------------------------
Author:         Antonio Matachana
Company:        
Description:    CmpOTVTalkWithAnExpert apex controller
Test Class:     CNT_OTV_TalkWithAndExpert_Test
History
<Date>          <Author>        	<Description>
22/03/2021      Antonio Matachana    	Initial version
----------------------------------------------------------------------------------*/
public class CNT_OTV_TalkWithAnExpert {
  /*------------------------------------------------------------
    Author:         Diego de Asis
    Company:        Deloitte
    Description:    Method to create a case according to the given parameters
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Diego de Asis        Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static void createCase(
    String valueTopic,
    String valueIssue,
    String description,
    String fileName,
    String base64
  ) {
    CNT_OTV_CaseManagement.createCase(
      valueTopic,
      valueIssue,
      description,
      fileName,
      base64
    );
  }

  /*------------------------------------------------------------
    Author:         Diego de Asis
    Company:        Deloitte
    Description:    Insert a case in Salesforce BBDD
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Diego de Asis        Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static void talkWithExpert(
    String valueName,
    String valueEmail,
    String valuePhone,
    String valueCompany,
    String valueCountry,
    List<String> timeList
  ) {
    String timeListString = string.join(timeList, ';');
    Case newCase = new Case(
      Contact_Email__c = valueEmail,
      Contact_Phone__c = valuePhone,
      CASE_TXT_accountName__c = valueCompany,
      //CASE_TXT_country__c = valueCountry, ¿Añadir campo country en Case?
      CASE_PCK_contactTime__c = timeListString
    );
    insert newCase;
  }

  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:    Method to obtain a list of all countries
    History 
    <Date>          <Author>            <Change Description>
    18/03/2021	    Alberto Borraz       Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static WRAPPER_OTV_Info.userInfo getUserInfo() {
    return CNT_OTV_UserInfo.getUserInfo();
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
}
