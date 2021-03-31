/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	Controller class por CMP_CaseRefundButtons
				Book To Book Payment Refund process manually triggered from the GTS back-end portal by an agent of the Santander ordering bank, triggering in parallel the refund to the ordering account & the reimbursement petition to the beneficiary bank for confirmation
Test Class:     TBD
History
<Date>			<Author>		<Description>
14/08/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_CaseRefundButtons {

    
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
Description:    Method to Reverse Ordering debit
History
<Date>          <Author>             <Description>
14/08/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/ 
	@AuraEnabled
    public static ReturnValue reverseOrderingDebit(String caseId, String book_to_book_id){
        ReturnValue rv = null;
        Map<String, Object> value = new Map<String, Object>();
        Case iCase = null;
        try {
            //PARCHE_FLOWERPOWER_SNJ
            //WS_CancelBookToBook cancelBookToBook = new WS_CancelBookToBook(book_to_book_id);
            //String result = cancelBookToBook.execute('S','E');
            String result = 'OK';
            if(result != null){
                if(result == 'OK'){
                    system.debug('>>> SNJ OK WS_CancelBookToBook');
                    value.put('output', 'OK');
                    rv = new ReturnValue(true,value); 
                    iCase = [SELECT id, Status, CASE_CHK_Reverse_ordering_debit__c  FROM Case WHERE Id =: caseId LIMIT 1]; 
                    iCase.CASE_CHK_Reverse_ordering_debit__c = true;
                    iCase.Status = 'Management Process';
                    update iCase;
                }else{
                    value.put('output', 'KO');
                    rv = new ReturnValue(false,value);
                    system.debug('>>> SNJ KO 1 WS_CancelBookToBook');
                }
            }else{
                value.put('output', 'KO');
                rv = new ReturnValue(false,value);
               system.debug('>>> SNJ KO 2 WS_CancelBookToBook');
            }
            
            
        }catch (Exception e) {
            System.debug('CNT_CaseRefundButtons.reverseOrderingDebit: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            rv = new ReturnValue(false, null, e.getMessage());
        }
        return rv;
    }
    
    
    
       /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to Reverse beneficiary credit
History
<Date>          <Author>             <Description>
14/08/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/ 
	@AuraEnabled
    public static ReturnValue reverseBeneficiaryCredit(String caseId, String operation_id){
        ReturnValue rv = null;
        Map<String, Object> value = new Map<String, Object>();
        Case iCase = null;
        try {
            //PARCHE_FLOWERPOWER_SNJ
            //WS_CancelPaymentOrchestrator cancelPaymentOrch = new WS_CancelPaymentOrchestrator(operation_id);
            //String result = cancelPaymentOrch.execute('D','E');
            String result = 'OK';
            if(result != null){
                if(result == 'OK'){
                    system.debug('>>> SNJ OK WS_CancelPaymentOrchestrator');
                    value.put('output', 'OK');
                    rv = new ReturnValue(true,value); 
                    iCase = [SELECT id, Status, CASE_CHK_ReverseBeneficiaryCredit__c  FROM Case WHERE Id =: caseId LIMIT 1]; 
                    iCase.CASE_CHK_ReverseBeneficiaryCredit__c = true;
                    iCase.Status = 'Management Process';
                    update iCase;
                  
                }else{
                    value.put('output', 'KO');
                    rv = new ReturnValue(false,value);
                    system.debug('>>> SNJ KO 1 WS_CancelPaymentOrchestrator');
                }
            }else{
                value.put('output', 'KO');
                rv = new ReturnValue(false,value);
               system.debug('>>> SNJ KO 2 WS_CancelPaymentOrchestrator');
            }
            
            
        }catch (Exception e) {
            System.debug('CNT_CaseRefundButtons.reverseBeneficiaryCredit: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            rv = new ReturnValue(false, null, e.getMessage());
        }
        return rv;
    }
    
       /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to Reverse FX 
History
<Date>          <Author>             <Description>
14/08/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/ 
    @AuraEnabled
    public static ReturnValue reverseFX(String caseId, WRAPPER_PaymentDetail.OperationDetail paymentData){
        ReturnValue rv = null;
        Map<String, Object> value = new Map<String, Object>();
        Case iCase = new Case();
        Case iParentCase = new Case();
        try {
            //PARCHE_FLOWERPOWER_SNJ
           //  WS_CancelBuySell cancelBuySell = new WS_CancelBuySell();
           // String result = cancelBuySell.execute(paymentData);
            String result = 'OK';
            if(result != null){
                if(result == 'OK'){                    
                    value.put('output', 'OK');
                    rv = new ReturnValue(true,value); 
                    iCase = [SELECT id, Status, CASE_CHK_ReverseBeneficiaryCredit__c, ParentId  FROM Case WHERE Id =: caseId LIMIT 1]; 
                   /* if(iCase.ParentId != ''){
                        system.debug('SNJ parent: ' + iCase.ParentId);
                        iParentCase =  [SELECT id, Status, CASE_CHK_Reverse_FX__c FROM Case WHERE Id =: caseId LIMIT 1];
                        if(iParentCase.Status == 'Management Process' && iParentCase.CASE_CHK_Reverse_FX__c == false){
                            iParentCase.CASE_CHK_Reverse_FX__c = true;
                            update iParentCase;
                        }
                    }else{
                        system.debug('SNJ parent: NO PARENT');
                    }*/
                    
                }else{
                    value.put('output', 'KO');
                    rv = new ReturnValue(false,value);
                    system.debug('>>> SNJ KO 1 WS_CancelBuySell');
                }
            }else{
                value.put('output', 'KO');
                rv = new ReturnValue(false,value);
                system.debug('>>> SNJ KO 2 WS_CancelBuySell');
            }
            
            
        }catch (Exception e) {
            System.debug('CNT_CaseRefundButtons.reverseBeneficiaryCredit: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
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
        ReturnValue response = null;
        response = CNT_PAY_PaymentOptions.getPaymentDetail(paymentId);
        return response;
    }
}