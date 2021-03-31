public class CNT_PaymentInformationButton {
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to return case data
History
<Date>          <Author>             <Description>
14/08/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/ 
    
    @AuraEnabled 
    public static ReturnValue getCaseData(String caseId){
        ReturnValue rv = null;
        Map<String, Object> value = new Map<String, Object>();
        Case iCase = null;
        try{
            iCase = [SELECT Id, Status, CASE_PCK_Sourcesystem__c, CASE_CHK_Reverse_ordering_debit__c, CASE_CHK_Reverse_limits_update__c, CASE_CHK_Reverse_FX__c, CASE_CHK_ReverseBeneficiaryCredit__c, CASE_PCK_Record_Type__c, CASE_TXT_PaymentId__c, CASE_PCK_OrderingCountry__c, CASE_TXT_BICCode__c, CASE_PCK_Beneficiary_country__c, CASE_CHK_Approved__c
                     FROM Case WHERE Id =: caseId LIMIT 1];
            value.put('output', iCase);
            rv = new ReturnValue(true,value);
        }catch(Exception e){            
            System.debug('CNT_CaseRefundButtons.getCaseData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());            
            rv = new ReturnValue(false, null, e.getMessage());
        }
        return rv;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Gets the detail of a payment
History
<Date>			<Author>		       <Description>
16/09/2020      Shahad Naji       		Initial version - besed on CNT_PaymentsPaymentDetail
----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getPaymentDetail(String paymentId){
        WRAPPER_PaymentList.WRAPPER_Payment paymentDetail = new  WRAPPER_PaymentList.WRAPPER_Payment();
        ReturnValue response = null;
        response = CNT_PAY_PaymentOptions.getPaymentDetail(paymentId);
        return response;
    }
}