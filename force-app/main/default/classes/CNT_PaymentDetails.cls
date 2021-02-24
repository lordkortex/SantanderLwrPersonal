/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    CMP_PaymentDetails
Test Class:     CNT_PaymentDetails_Test
History
<Date>			<Author>		<Description>
25/11/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_PaymentDetails {
    
/*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Decrypts URL parameters
History 
<Date>          <Author>            <Change Description>
02/12/2019		Shahad Naji     Initial version
------------------------------------------------------------    
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
    }*/

/*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Retrieves the payment information
History 
<Date>          <Author>            <Change Description>
25/11/2019		Shahad Naji     Initial version
------------------------------------------------------------
    @AuraEnabled 
    public static String generateData(){
        String aux = '';
       	aux =  DUMMYDATA_SWIFTPAYMENTS.getJsonPaymentsDetails();
        return aux;
    }*/
/*------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Retrieves the payment information through MuleSoft
History 
<Date>          <Author>            <Change Description>
25/11/2019		Shahad Naji     Initial version
------------------------------------------------------------
    @AuraEnabled 
    public static String getInformation(String uetr, String agent){
        String aux = '';
        testGit prueba = new testGit();
        aux=prueba.detallePagoSwift(uetr,agent);
        System.debug('Result : ' + aux);
        return aux;
    }*/
  
}