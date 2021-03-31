public class Selector_Payment_Step3fields {
    /*----------------------------------------------------------------------------------
    Author:         Miguel Ángel
    Company:        Deloitte
    Description:   	Query that is used to bring the fields that will appear in the description of step 3 when the product Id is Do and Follow
    History
    <Date>			<Author>			<Description>
    04/02/2021		Miguel Ángel    	Initial version
    ----------------------------------------------------------------------------------*/

    public static WRAPPER_Payment_Step3fields queryDandFPayment(String productId, String destinationCountry){
        System.debug('debug productId: ' +productId + ' country:' + destinationCountry);
        List<Payment_Step3_Fields__mdt>paymentStep3Fileds = [SELECT DeveloperName, Id, Label, Language, MasterLabel, NamespacePrefix, PAY_CHK_Charges_Mandatory__c, PAY_CHK_Charges__c, PAY_CHK_Client_Reference_Mandatory__c, PAY_CHK_Client_Reference__c, PAY_CHK_Payment_Purpose_Mandatory__c, 
                                          PAY_CHK_Payment_purpose__c, PAY_CHK_Payment_Reason_Mandatory__c, PAY_CHK_Payment_Reason__c, PAY_CHK_Reference_Mandatory__c, PAY_CHK_Reference__c, PAY_NUM_Charges_Position__c, PAY_NUM_Client_Reference_Position__c, 
                                          PAY_NUM_Payment_Purpose_Position__c, PAY_NUM_Payment_Reason_Position__c, PAY_NUM_Reference_Position__c, PAY_TXT_Country_Destination__c, PAY_PCK_ProductId__c, QualifiedApiName,PAY_CHK_Commercial_Code__c,PAY_CHK_Commercial_Code_Mandatory__c,
                                          PAY_CHK_Beneficiary_Email__c,PAY_CHK_Beneficiary_Email_Mandatory__c 
                                          FROM Payment_Step3_Fields__mdt 
                                          WHERE PAY_TXT_Country_Destination__c =: destinationCountry AND PAY_PCK_ProductId__c =: productId];
        
        System.debug('debug paymentStep3Fileds: ' +paymentStep3Fileds);
        if(!paymentStep3Fileds.isEmpty()){
            return new WRAPPER_Payment_Step3fields(paymentStep3Fileds.get(0));
        }
        else{
            return null;
        }
    }
    /*----------------------------------------------------------------------------------
    Author:         Miguel Ángel
    Company:        Deloitte
    Description:   	Query that is used to bring the fields that will appear in the description of step 3 when the product Id is Book to Book or International Instant Payment or International Payment
    History
    <Date>			<Author>			<Description>
    04/02/2021		Miguel Ángel    	Initial version
    ----------------------------------------------------------------------------------*/
    public static WRAPPER_Payment_Step3fields queryPayment(String productId){
        List<Payment_Step3_Fields__mdt> paymentStep3Fileds = [SELECT DeveloperName,Id,Label,Language,MasterLabel,NamespacePrefix,PAY_CHK_Charges_Mandatory__c,PAY_CHK_Charges__c,PAY_CHK_Client_Reference_Mandatory__c,PAY_CHK_Client_Reference__c,PAY_CHK_Payment_Purpose_Mandatory__c,
                                      PAY_CHK_Payment_purpose__c,PAY_CHK_Payment_Reason_Mandatory__c,PAY_CHK_Payment_Reason__c,PAY_CHK_Reference_Mandatory__c,PAY_CHK_Reference__c,PAY_NUM_Charges_Position__c,PAY_NUM_Client_Reference_Position__c,
                                      PAY_NUM_Payment_Purpose_Position__c,PAY_NUM_Payment_Reason_Position__c,PAY_NUM_Reference_Position__c,PAY_TXT_Country_Destination__c,PAY_PCK_ProductId__c,QualifiedApiName,PAY_CHK_Commercial_Code__c,PAY_CHK_Commercial_Code_Mandatory__c,
                                      PAY_CHK_Beneficiary_Email__c,PAY_CHK_Beneficiary_Email_Mandatory__c 
                                      FROM Payment_Step3_Fields__mdt 
                                      WHERE PAY_PCK_ProductId__c =: productId];
        
        if(!paymentStep3Fileds.isEmpty()){
			return new WRAPPER_Payment_Step3fields(paymentStep3Fileds.get(0));
        }
        else{
            return null;
        }
    }
}