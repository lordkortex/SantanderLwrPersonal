/*----------------------------------------------------------------------------------
Author:         Miguel Ángel
Company:        Deloitte
Description:    Wrapper of paymentStep3Ffield
Test Class:     WRAPPER_Payment_Step3fields_Test
History
<Date>			<Author>			<Description>
04/02/2021		Miguel Ángel    	Initial version
----------------------------------------------------------------------------------*/
global class WRAPPER_Payment_Step3fields {
    
    @AuraEnabled
    global String  	productId {get;set;}
    @AuraEnabled
    global String  	countryDestination {get;set;}
    @AuraEnabled
    global Boolean  clientReference {get;set;}
    @AuraEnabled
    global Boolean  clientReferenceMandatory {get;set;}
    @AuraEnabled
    global Boolean  charges {get;set;}
    @AuraEnabled
    global Boolean  chargesMandatory {get;set;}
    @AuraEnabled
    global Boolean  paymentReason {get;set;}
    @AuraEnabled
    global Boolean  paymentReasonMandatory {get;set;}
    @AuraEnabled
    global Boolean  reference {get;set;}
    @AuraEnabled
    global Boolean  referenceMandatory {get;set;}
    @AuraEnabled
    global Boolean  paymentPurpose {get;set;}
    @AuraEnabled
    global Boolean  paymentPurposeMandatory {get;set;}
     @AuraEnabled
    global Boolean  commercialCode {get;set;}
    @AuraEnabled
    global Boolean  commercialCodeMandatory {get;set;}
    @AuraEnabled
    global Boolean  beneficiaryEmail {get;set;}
    @AuraEnabled
    global Boolean  beneficiaryEmailMandatory {get;set;}
    
    global WRAPPER_Payment_Step3fields () {
    }
    
    global WRAPPER_Payment_Step3fields (Payment_Step3_Fields__mdt ps3f) {
        setPaymentStep3fields(ps3f);
    }
    /*----------------------------------------------------------------------------------
	Author:         Miguel Ángel
	Company:        Deloitte
	Description:    Set wrapper values with the Payment Step 3 Field custom metadata type Salesforce data
	History:
	<Date>          <Author>            <Description>
	04/02/2021      Miguel Ángel        Initial version
	----------------------------------------------------------------------------------*/
    global void setPaymentStep3fields (Payment_Step3_Fields__mdt ps3fData) {
        try {
            if (ps3fData == null) {
                throw new CustomException('ps3fData is not informed.');
            }
            if (ps3fData.PAY_PCK_ProductId__c != null) {
                this.productId = ps3fData.PAY_PCK_ProductId__c;
            }
            if (ps3fData.PAY_TXT_Country_Destination__c != null) {
                this.countryDestination = ps3fData.PAY_TXT_Country_Destination__c;
            }
            if (ps3fData.PAY_CHK_Client_Reference__c != null) {
                this.clientReference = ps3fData.PAY_CHK_Client_Reference__c;
            }
            if (ps3fData.PAY_CHK_Client_Reference_Mandatory__c != null) {
                this.clientReferenceMandatory = ps3fData.PAY_CHK_Client_Reference_Mandatory__c;
            }
            if (ps3fData.PAY_CHK_Charges__c != null) {
                this.charges = ps3fData.PAY_CHK_Charges__c;
            }
            if (ps3fData.PAY_CHK_Charges_Mandatory__c != null) {
                this.chargesMandatory = ps3fData.PAY_CHK_Charges_Mandatory__c;
            }
            if (ps3fData.PAY_CHK_Payment_Reason__c != null) {
                this.paymentReason = ps3fData.PAY_CHK_Payment_Reason__c;
            }
            if (ps3fData.PAY_CHK_Payment_Reason_Mandatory__c != null) {
                this.paymentReasonMandatory = ps3fData.PAY_CHK_Payment_Reason_Mandatory__c;
            }
            if (ps3fData.PAY_CHK_Reference__c != null) {
                this.reference = ps3fData.PAY_CHK_Reference__c;
            }
            if (ps3fData.PAY_CHK_Reference_Mandatory__c != null) {
                this.referenceMandatory = ps3fData.PAY_CHK_Reference_Mandatory__c;
            }
            if (ps3fData.PAY_CHK_Payment_purpose__c != null) {
                this.paymentPurpose = ps3fData.PAY_CHK_Payment_purpose__c;
            }
            if (ps3fData.PAY_CHK_Payment_Purpose_Mandatory__c != null) {
                this.paymentPurposeMandatory = ps3fData.PAY_CHK_Payment_Purpose_Mandatory__c;
            } 
            if (ps3fData.PAY_CHK_Commercial_Code__c != null) {
                this.commercialCode = ps3fData.PAY_CHK_Commercial_Code__c;
            }
            if (ps3fData.PAY_CHK_Commercial_Code_Mandatory__c != null) {
                this.commercialCodeMandatory = ps3fData.PAY_CHK_Commercial_Code_Mandatory__c;
            } 
             if (ps3fData.PAY_CHK_Beneficiary_Email__c != null) {
                this.beneficiaryEmail = ps3fData.PAY_CHK_Beneficiary_Email__c;
            }
            if (ps3fData.PAY_CHK_Beneficiary_Email_Mandatory__c != null) {
                this.beneficiaryEmailMandatory = ps3fData.PAY_CHK_Beneficiary_Email_Mandatory__c;
            } 
        } catch (Exception e) {
            System.debug('WRAPPER_Payment_Step3fields.setPaymentStep3fields: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    
    
}