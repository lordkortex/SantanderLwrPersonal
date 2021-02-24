/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Controller class of CMP_AccountBalance lightning component
Test Class:     CNT_AccountBalance_Test
History
<Date>			<Author>		<Description>
10/01/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_AccountBalance {
    
        /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:   	Data encryptation
    History
    <Date>			<Author>				<Description>
    10/01/2020		Shahad Naji			    Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }
}