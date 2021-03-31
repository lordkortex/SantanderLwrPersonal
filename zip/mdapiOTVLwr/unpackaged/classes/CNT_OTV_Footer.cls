/*----------------------------------------------------------------------------------
Author:         Antonio Duarte
Company:        Deloitte
Description:    cmpOTVFooter apex controller
Test Class:     CNT_OTV_Footer_Test
History
<Date>          <Author>        	<Description>
19/03/2021      Antonio Duarte     	Initial version
----------------------------------------------------------------------------------*/
public class CNT_OTV_Footer {
    
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to obtain user country to select the correct T&C PDF 
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static String getTCByCountry(String userCountry){
        return CNT_OTV_TermsAndConditions.getTCByCountry(userCountry);
    }
    
    /*------------------------------------------------------------
    Author:         Alberto Borraz
    Company:        Deloitte
    Description:	Method to obtain user country
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Alberto Borraz      Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static String getUserCountry(){
        return CNT_OTV_UserInfo.getUserCountry();
    }
    
}