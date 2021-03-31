public without sharing class CNT_OTVPageHeroSubsidiary {
  /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to get owner name of matrix
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/
  @AuraEnabled
  public static String getMatrixOwnerName() {
    try {
      Id userId = UserInfo.getUserId();
      List<User> currentUser = [
        SELECT Id, ContactId
        FROM User
        WHERE Id = :userId
        LIMIT 1
      ];

      if (!currentUser.isEmpty() && currentUser[0].ContactId != null) {
        List<Contact> contactList = [
          SELECT Id, AccountId
          FROM Contact
          WHERE Id = :currentUser[0].ContactId
          LIMIT 1
        ];

        if (!contactList.isEmpty() && contactList[0].AccountId != null) {
          List<Account> accList = [
            SELECT Id, ParentId
            FROM Account
            WHERE Id = :contactList[0].AccountId
            LIMIT 1
          ];

          if (!accList.isEmpty() && accList[0].ParentId != null) {
            List<Account> accParentList = [
              SELECT Id, ACC_CHK_OTView_Admin__c
              FROM Account
              WHERE Id = :accList[0].ParentId
              LIMIT 1
            ];

            if (
              !accParentList.isEmpty() &&
              accParentList[0].ACC_CHK_OTView_Admin__c != null
            ) {
              List<Contact> adminList = [
                SELECT Id, Name
                FROM Contact
                WHERE Id = :accParentList[0].ACC_CHK_OTView_Admin__c
                LIMIT 1
              ];
              if (!adminList.isEmpty()) {
                return adminList[0].Name;
              }
            }
          }
        }
      }
      return 'Error getMatrixOwnerName';
    } catch (Exception e) {
      System.debug(
        'CNT_OTVPageHeroSubsidiary.getMatrixOwnerName: ' + e.getMessage()
      );
    }
    return 'Error getMatrixOwnerName';
  }
}
