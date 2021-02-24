/*----------------------------------------------------------------------------------
Author:         Bea Hill
Company:        Deloitte
Description:   	Apex controller for CMP_PaymentsLandingTable
Test Class: 
History
<Date>			<Author>				<Description>
23/06/2020      Bea Hill			    Initial version
----------------------------------------------------------------------------------*/
public class CNT_PaymentsLandingTable {

    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:   	Data encryptation
    History
    <Date>			<Author>				<Description>
    10/01/2020		Shahad Naji			    Initial version
    23/06/2020      Bea Hill                Adapted from CNT_AccountBalance
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }

       /*----------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:   	Get signatory status for a payment
    History
    <Date>			<Author>				<Description>
    30/07/2020      Bea Hill                Initial version
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static Map<String,String> getSignatoryStatus(String paymentId){
        system.debug(paymentId);
        return CNT_B2B_SignatureUtilities.getSignatoryStatus(paymentId);
    }

    
}