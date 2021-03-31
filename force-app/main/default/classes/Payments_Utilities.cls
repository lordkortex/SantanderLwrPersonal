/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Holds auxiliar functions
Test Class:     Payments_Utilities_Test
History
<Date>			<Author>		<Description>
03/06/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public without sharing class Payments_Utilities {
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Returns Payment_Status__mdt
    History
    <Date>			<Author>		<Description>
    03/06/2020		Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/    
    public static Payment_Status__mdt getPaymentStatusRowByStatus(String input){
        Payment_Status__mdt output = new Payment_Status__mdt();
        try{
            output = [SELECT toLabel(PAY_PCK_Status__c), toLabel(PAY_PCK_Reason__c) FROM Payment_Status__mdt WHERE Label =: input LIMIT 1];
        }catch(Exception e){            
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());  
        }        
        return output;
    }
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Returns Payment_Status__mdt
    History
    <Date>			<Author>		<Description>
    03/06/2020		Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/    
    public static List<Payment_Status__mdt> getPaymentStatusRowByReason(String input){
        List<Payment_Status__mdt> output = new List<Payment_Status__mdt>();
        try{
            output = [SELECT toLabel(PAY_PCK_Status__c), toLabel(PAY_PCK_Reason__c) FROM Payment_Status__mdt WHERE PAY_PCK_Reason__c =: input LIMIT 1];
        }catch(Exception e){            
            System.debug('Exception type caught: ' + e.getTypeName());    
            System.debug('Message: ' + e.getMessage());
            System.debug('Cause: ' + e.getCause());    // returns null
            System.debug('Line number: ' + e.getLineNumber());    
            System.debug('Stack trace: ' + e.getStackTraceString());  
        }        
        return output;
    }
    
}