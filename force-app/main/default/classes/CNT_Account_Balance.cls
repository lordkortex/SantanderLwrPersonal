/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CMP_Account_
Test Class:     CNT_Account_Balance_Test
History
<Date>			<Author>		<Description>
18/11/2019		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/

public with sharing class CNT_Account_Balance {

    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }
}