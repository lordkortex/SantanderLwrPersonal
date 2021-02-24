/*----------------------------------------------------------------------------------
Author:         Beatrice Hill
Company:        Deloitte
Description:    Controller of CMP_B2B_ProcessHeader
History
<Date>			<Author>		    <Description>
15/06/2020		Beatrice Hill       Initial version
----------------------------------------------------------------------------------*/

public with sharing class CNT_PaymentsMethod {
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }
}