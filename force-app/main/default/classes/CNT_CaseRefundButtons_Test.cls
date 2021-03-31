@isTest
global class CNT_CaseRefundButtons_Test {
    
    @TestSetup
    static void setup(){
        Case c = new Case(
        Origin = '', Subject = 'Test', CASE_Affected_functionality__C = 'Others');
        insert c;
    }

    @isTest
    static void getCaseData_Test(){
        Case c = [Select Id from Case LIMIT 1];
        CNT_CaseRefundButtons.getCaseData(c.Id);
    }
    
    @isTest
    static void reverseOrderingDebit_Test(){
        Case c = [Select Id from Case LIMIT 1];
        CNT_CaseRefundButtons.reverseOrderingDebit(c.Id, 'B2BId');
    }
    
    @isTest
    static void reverseBeneficiaryCredit_Test(){
        Case c = [Select Id from Case LIMIT 1];
        CNT_CaseRefundButtons.reverseBeneficiaryCredit(c.Id, 'Test');
    }
    
    @isTest
    static void reverseFX_Test(){
        Case c = [Select Id from Case LIMIT 1];
        CNT_CaseRefundButtons.reverseFX(c.Id, null);
    }
    
    @isTest
    static void getPaymentDetail_Test(){
        CNT_CaseRefundButtons.getPaymentDetail('12345');
    }
}