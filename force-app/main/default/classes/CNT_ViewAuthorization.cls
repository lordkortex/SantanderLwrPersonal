/*----------------------------------------------------------------------------------
Author:         Diego Asis
Company:        Deloitte
Description:    Controller class of CMP_AuthorizationPendingTable lightning component
Test Class:     CNT_ViewAuthorization_Test
History
<Date>			<Author>		<Description>
06/02/2020		Diego Asis      Initial version
----------------------------------------------------------------------------------*/
public class CNT_ViewAuthorization {
    
        /*----------------------------------------------------------------------------------
    Author:         Diego Asis
    Company:        Deloitte
    Description:   	Data encryptation
    History
    <Date>			<Author>				<Description>
    06/02/2020		Diego Asis			    Initial version
    ----------------------------------------------------------------------------------*/
    
    //This methos encrypts the data
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }
    
    //This methos decrypts the data
    @AuraEnabled
    public static String decryptData(String str){
        try{ 
            return Global_Utilities.decryptData(str);
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());} 
    }
}