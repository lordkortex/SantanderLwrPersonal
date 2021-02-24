/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CMP_B2B_ProcessHeader
History
<Date>			<Author>		<Description>
28/05/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/

public with sharing class CNT_B2B_ProcessHeader {
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }
    
     /*----------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Makes the callout to the operation tracking service to update the  
                    payment status to "Pending"
    History
    <Date>			<Author>		     <Description>
    28/07/2020		Bea Hill             Initial version
    15/09/2020      Maria Inigo          Added to apex class
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String updateStatus(String paymentId, String status, String reason){
        System.debug('updateStatus on discard');
        WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
        String output = wsObject.updateStatus(status, reason);
        return output;
    }
    
}