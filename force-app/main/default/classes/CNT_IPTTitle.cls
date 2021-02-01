/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    CMP_IPTtitle Controller
History
<Date>			<Author>		<Description>
27/02/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_IPTTitle {

    /*----------------------------------------------------------------------------------
        Author:         R. Alexander Cervino
        Company:        Deloitte
        Description:    Method to get user info
        History
        <Date>			<Author>		<Description>
        27/02/2020		R. Alexander Cervino     Initial version
        ----------------------------------------------------------------------------------*/

    @AuraEnabled
    public static String getUserInformation() {     
      
        // Create a Dynamic SOQL Query For Fetch Record List with LIMIT 5   
        User u = [select firstname from user where id=:userinfo.getuserid()];
        

        if(u != null){
            system.debug(u.firstname);
            return u.firstname;
        }
        return '';
    }

    /*----------------------------------------------------------------------------------
        Author:         Adrian Muñio
        Company:        Deloitte
        Description:    Method to encrypt the Data to navigate other pages 
        History
        <Date>			<Author>		<Description>
        27/02/2020		Adrian Muuñio   Initial version
        ----------------------------------------------------------------------------------*/

    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }
}