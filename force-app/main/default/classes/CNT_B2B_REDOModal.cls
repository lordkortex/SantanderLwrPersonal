/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CMP_B2B_ProcessHeader
History
<Date>			<Author>		<Description>
09/06/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/

public with sharing class CNT_B2B_REDOModal {
    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Makes the callout to the operation tracking service to update the  
                    payment status to "In Review"
    History
    <Date>			<Author>		            <Description>
    28/07/2020		Guillermo Giral             Initial version
	17/09/2020		Shaahd Naji					Adds reason input parameter
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static String sendToService(String paymentId, String status, String reason ,String subject, String tcurrency, Double amount, String description){
        WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
        String output = wsObject.execute(status, reason,subject, tcurrency, amount, description);
        return output;
    }

    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }
 
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:    Send notification
    History
    <Date>          <Author>                <Description>
    12/08/2020      Antonio Duarte          Notifications demo version 
    05/10/2020      Antonio Duarte          S17 version
	09/12/2020		Héctor Estivalis		REDO
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void sendNotification(String paymentId, String notificationType){
		HANDLER_CustomNotification.sendPaymentNotification(PaymentId, notificationType);
	} 
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes the callout to ancel a previously validated transaction, 
					which removes it from transactional counters for accumulated limits
    History
    <Date>			<Author>		            <Description>
    16/09/2020		Shahad Naji		            Initial version
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue reverseLimits (String operationId, String serviceId, WRAPPER_PaymentDetail.OperationDetail paymentData){
        ReturnValue response = null;
        try {
            //PARCHE_FLOWERPOWER_SNJ
            /*
            WS_TransactionalLimitsReverse transactionalLimitsReverse = new WS_TransactionalLimitsReverse();
            WS_TransactionalLimitsReverse.OUTPUT output = transactionalLimitsReverse.execute(operationId, serviceId, paymentData);
            Map<String, Object> value = new Map<String, Object>();
            if(output == null){
                response = new ReturnValue(false, value);
            }else{
                if(output.limitsResult != null){
                    if(output.limitsResult == 'ok'){
                        value.put('result', output);
                        response = new ReturnValue(true, value);    
                    }else{
                        response = new ReturnValue(false, value);
                    }
                }else{
                    response = new ReturnValue(false, value);
                }
            }*/
        } catch (Exception e) {
            System.debug('CNT_B2B_REDOModal.reverseLimits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

/*----------------------------------------------------------------------------------
    Author:         Julian Hoyos
    Company:        Deloitte
    Description:    Makes the callout to ancel a previously validated transaction, 
					which removes it from transactional counters for accumulated limits
    History
    <Date>			<Author>		            <Description>
    10/11/2020		Julian Hoyos	            Initial version
	13/11/2020		Bea Hill					return ReturnValue instead of String
	23/11/2020		Shaahd Naji					Return ReturnValue with success value according to the output value of the callout
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue tracking(String paymentId, String status, String reason ,String subject, String description){
        ReturnValue response = null;
        try {
            WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
            WrapperUserData userData = null;
            String output = wsObject.updateAdditionalData(status, reason,userData, subject, description);
            if(String.isNotBlank(output)){
                if(output == 'OK'){
                    response = new ReturnValue(true);
                }else{
                   response = new ReturnValue(false); 
                }
            }else{
               response = new ReturnValue(false); 
            }            
        } catch (Exception e) {
            System.debug('CNT_B2B_PREDOModal.tracking: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}