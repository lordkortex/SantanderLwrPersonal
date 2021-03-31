/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CMP_SwiftPayment
Test Class:     CNT_SwiftPayment_Test
History
<Date>			<Author>		<Description>
18/11/2019		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_SwiftPayment {
    
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
    }

}