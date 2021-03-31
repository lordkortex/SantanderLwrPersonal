/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    CNT_Account_Balance_Options
Test Class:     CNT_Account_Balance_Options_Test
History
<Date>			<Author>		<Description>
21/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_AccountBalanceOptions {
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Data encryptation
History
<Date>			<Author>				<Description>
21/11/2019		Shahad Naji			    Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }

}