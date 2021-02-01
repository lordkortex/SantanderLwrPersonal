/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Auxiliar wrapper for Payments Landing Parent 
Test Class:     TBD
History
<Date>			<Author>		<Description>
28/05/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
global class WRAPPER_PaymentsStatuses {
    
    @AuraEnabled
    global Integer totalNumberOfRecords{get;set;}
    @AuraEnabled
    global List<WRAPPER_PaymentsStatus> paymentStatusList {get;set;}
    
    global class WRAPPER_PaymentsStatus {        
        @AuraEnabled
        global String statusId {get;set;}
        @AuraEnabled
        global String statusCod {get;set;}
        @AuraEnabled
        global Integer numberOfRecords {get;set;}
        @AuraEnabled
        global String statusName {get;set;}
        @AuraEnabled
        global String parsedStatusName {get;set;}
        @AuraEnabled
        global String statusDescription {get;set;}
        @AuraEnabled
        global String parsedStatusDescription {get;set;}
        
        global WRAPPER_PaymentsStatus() { }
    }
    
}