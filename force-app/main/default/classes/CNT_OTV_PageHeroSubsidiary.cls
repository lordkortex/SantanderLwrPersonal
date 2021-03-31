/*----------------------------------------------------------------------------------
Author:         Alberto Borraz
Company:        Deloitte
Description:    cmpOTVPageHeroSubsidiary apex controller
Test Class:     CNT_OTV_PageHeroSubsidiary_Test
History
<Date>          <Author>        	<Description>
19/03/2021      Alberto Borraz     	Initial version
----------------------------------------------------------------------------------*/
public without sharing class CNT_OTV_PageHeroSubsidiary {
    
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to get owner name of matrix
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static String getMatrixOwnerName(){
        String name;
        try{
            name = [SELECT Id, 
                    Account.Parent.ACC_CHK_OTView_Admin__r.Name
                    FROM Contact 
                    WHERE CONTACT_User__c = :UserInfo.getUserId()
                    LIMIT 1].Account.Parent.ACC_CHK_OTView_Admin__r.Name;
        }catch(Exception e){
            System.debug('CNT_OTVPageHeroSubsidiary.getMatrixOwnerName: ' + e.getMessage());
            throw new CustomException('Error getMatrixOwnerName');
        }
        return name;
    }
}