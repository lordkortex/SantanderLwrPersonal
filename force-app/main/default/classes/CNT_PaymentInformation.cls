/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Apex class for CMP_PaymentInformation component
Test Class:     CNT_PaymentInformation_Test
History
<Date>          <Author>        <Description>
15/07/2020      Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_PaymentInformation {

            /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to create a case for a certain payment
History
<Date>          <Author>             <Description>
15/07/2020      Shahad Naji        	Initial version
12/08/2020		Shaha Naji			Method to receive payment object parameters and insert them into the case to create
24/09/2020		Shahad Naji			Create a new case record only if there is no another one associated to the payment
*/

    @AuraEnabled
    public static ReturnValue createCase(String payment){
        ReturnValue rv = null;
        Map<String, Object> value = new Map<String, Object>();
        /*
        WRAPPER_PaymentList.WRAPPER_Payment  paymentObj = (WRAPPER_PaymentList.WRAPPER_Payment)JSON.deserialize(payment, WRAPPER_PaymentList.WRAPPER_Payment .class);
        
        if(paymentObj != null){           
            
            if(String.isNotBlank(paymentObj.paymentId) && String.isNotBlank(paymentObj.sourceCountry) ){
                //Validate if there is a case created for this input method payment
                List<Case> oldCaseList = new List<Case>([SELECT CaseNumber, RecordTypeId, id, CASE_PCK_OrderingCountry__c FROM Case WHERE CASE_TXT_PaymentId__c =: paymentObj.paymentId]);
                if(oldCaseList.size() > 0){
                    Case oldCase = oldCaseList.get(0);
                    value.put('output', oldCase);
                    rv = new ReturnValue(false,value);
                }else{      
                    Case newCase = new Case();
                    //Fetching the assignment rules on case
                    AssignmentRule AR = new AssignmentRule();
                    AR = [select id from AssignmentRule where SobjectType = 'Case' and Active = true and Name='Asignar caso' limit 1]; 
                    if(AR != null){
                        //Creating the DMLOptions for "Assign using active assignment rules" checkbox
                        Database.DMLOptions dmlOpts = new Database.DMLOptions();
                        dmlOpts.assignmentRuleHeader.assignmentRuleId= AR.id;                        
                        newCase.CASE_TXT_PaymentId__c = paymentObj.paymentId;
                        RecordType RTP = [Select Name, id, SobjectType from RecordType where Name = 'Payment Parent Case' and SobjectType  = 'Case' LIMIT 1];
                        newCase.RecordTypeId = RTP.Id;
                        newCase.Origin = 'Bank issue';
                        newCase.CASE_affected_functionality__c = 'Others';
                        newCase.CASE_PCK_OrderingCountry__c = paymentObj.sourceCountry;
                        newCase.CASE_PCK_Beneficiary_country__c = paymentObj.destinationCountry;
                        newCase.CASE_TXT_BICCode__c = paymentObj.sourceSwiftCode;
                        newCase.CASE_PCK_Sourcesystem__c = 'Salesforce';
                        //Setting the DMLOption on Case instance
                        newCase.setOptions(dmlOpts);
                        
                        insert newCase;
                        newCase = [SELECT CaseNumber, RecordTypeId, id, CASE_PCK_OrderingCountry__c FROM Case WHERE Id = :newCase.Id LIMIT 1];
                        value.put('output', newCase);
                        rv = new ReturnValue(true,value);
                    }
                }  
            }
        }*/
        return rv;        
    }
    
}