/*------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:	cmpOTVUsersSelectionBR
Test Class:		CNT_OTV_User_Selection
History 
<Date>          <Author>            <Change Description>
12/03/2021	    Antonio Duarte     Initial version
------------------------------------------------------------*/
public without sharing class CNT_OTV_UserSelection {
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
    return CNT_OTV_BrazilSubsidiary.getLstMatrixUsersBR();
  }
}
