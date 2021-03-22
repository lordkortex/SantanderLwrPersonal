public class Service_Payment_StepFields {
    /*----------------------------------------------------------------------------------
       Author:         Miguel Ángel
       Company:        Deloitte
       Description:   	Service that is used to call selector method when the product Id is Do and Follow
       History
       <Date>			<Author>			<Description>
       04/02/2021		Miguel Ángel    	Initial version
       ----------------------------------------------------------------------------------*/
       public static Map<String, Object> getStepFields(String productId){
           WRAPPER_Payment_Step3fields paymentStep3Fields = new WRAPPER_Payment_Step3fields();
           paymentStep3Fields = Selector_Payment_Step3fields.queryPayment(productId);
           return buildMapValue(paymentStep3Fields);
       }
        /*----------------------------------------------------------------------------------
       Author:         Miguel Ángel
       Company:        Deloitte
       Description:   	Service that is used to call selector method when the product Id is  Book to Book or International Instant Payment or International Payment
       History
       <Date>			<Author>			<Description>
       04/02/2021		Miguel Ángel    	Initial version
       ----------------------------------------------------------------------------------*/
       public static Map<String, Object> getStepFields(String productId, String destinationCountry){
           WRAPPER_Payment_Step3fields paymentStep3Fields = new WRAPPER_Payment_Step3fields();
           paymentStep3Fields = Selector_Payment_Step3fields.queryDandFPayment(destinationCountry, productId);
           return buildMapValue(paymentStep3Fields);
       }
       /*----------------------------------------------------------------------------------
       Author:         Miguel Ángel
       Company:        Deloitte
       Description:   	Method that build a map to use in the Controller Payment Step3fields
       History
       <Date>			<Author>			<Description>
       04/02/2021		Miguel Ángel    	Initial version
       ----------------------------------------------------------------------------------*/
       public static Map<String, Object> buildMapValue (WRAPPER_Payment_Step3fields paymentStep3Fields){
           Map<String, Object> value = new Map<String, Object>();
           if(paymentStep3Fields != null){
               value.put('output', paymentStep3Fields); 
               value = getPicklistValueField(value,paymentStep3Fields);
           }	
           else{
               value = null ;
           }
           return value;
       }
       
       public static Map<String, Object> getPicklistValueField(Map<String, Object> value,WRAPPER_Payment_Step3fields paymentStep3Fields){
           ReturnValue response = null;
           try{
               value.put('paymentPurposeValues', null); 
               value.put('chargesValues', null); 
               if(paymentStep3Fields.charges){
                   value = getPicklistValueList(value, 'PAY_PCK_Charges_Value__c','chargesValues','Payment_Step3_Fields__mdt');
               }
               if(paymentStep3Fields.paymentPurpose){
                   if(paymentStep3Fields.countryDestination == 'BR'){
                       value = getPicklistValueList(value,'PUR_PCK_PurposeBR__c','paymentPurposeValues','Purpose_of_Payment__mdt');
                   }else{
                       value = getPicklistValueList(value,'PUR_PCK_Purpose__c','paymentPurposeValues','Purpose_of_Payment__mdt');
                   }
                   system.debug('mensaje');
                   //response = new ReturnValue(true, value);
               }
               
           }catch (Exception e) {
               System.debug('Controller_Payment_StepFields.getPicklistValue: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
               //response = new ReturnValue(false, null, e.getMessage());
           }
           return value;
       }
       
       public static Map<String, Object> getPicklistValueList(Map<String, Object> value,String field,String namekey,String objectName){
           try {      
               List<String> picklistValues = new List<String>();
               //Schema.DescribeFieldResult fieldResult = Purpose_of_Payment__mdt.field.getDescribe();
               //Schema.DescribeFieldResult fieldResult =Schema.sObjectType.Purpose_of_Payment__mdt.fields.field.getDescribe();
               Map<String, Schema.SObjectField> object_fields_map = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
               List<Schema.PicklistEntry> ple = object_fields_map.get(field).getDescribe().getPicklistValues();
               //List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
               for( Schema.PicklistEntry picklistVal : ple){
                   picklistValues.add(picklistVal.getLabel());
               }
               value.put(namekey, picklistValues);      
           } catch (Exception e) {
               System.debug('CNT_B2B_Purpose.getPurposes: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
           }
           return value;
       }
   }