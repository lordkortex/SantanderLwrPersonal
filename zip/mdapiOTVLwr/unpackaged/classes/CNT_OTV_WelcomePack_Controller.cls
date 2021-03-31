public class CNT_OTV_WelcomePack_Controller {
  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:    Method to update a checkbox value in a welcome modal, if this value is true, the modal will not appear again.
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz        Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static void updateCheckboxWelcomePack(Boolean selectedCheckbox) {
    List<User> lstUser = new List<User>();
    Id userId = UserInfo.getUserId();

    try {
      lstUser = [
        SELECT Id, USER_CHK_OTV_welcomePack__c
        FROM User
        WHERE Id = :userId
        LIMIT 1
      ];
      if (lstUser != null) {
        lstUser[0].USER_CHK_OTV_welcomePack__c = selectedCheckbox;
      }
    } catch (Exception e) {
      throw new AuraHandledException(
        'The following exception has occurred: ' + e.getMessage()
      );
    }
    update lstUser;
  }

  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:    Method to get a checkbox value in a welcome modal, if this value is true, the modal will not appear again.
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz        Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static Boolean getCheckboxWelcomePack() {
    List<User> lstUser = new List<User>();
    Id userId = UserInfo.getUserId();
    try {
      lstUser = [
        SELECT USER_CHK_OTV_welcomePack__c
        FROM User
        WHERE Id = :userId
        LIMIT 1
      ];
      if (lstUser != null) {
        if (lstUser[0].USER_CHK_OTV_welcomePack__c == true) {
          return true;
        } else {
          return false;
        }
      }
    } catch (Exception e) {
      throw new AuraHandledException(
        'The following exception has occurred: ' + e.getMessage()
      );
    }
    return null;
  }
}
