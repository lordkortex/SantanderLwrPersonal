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
        System.debug('enter getStepFields in Service_payment');
		paymentStep3Fields = Selector_Payment_Step3fields.queryDandFPayment(productId, destinationCountry);
        System.debug('enter paymentStep3Fields in Service_payment: ' + JSON.serialize(paymentStep3Fields));
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
    /*
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
    */

    /*----------------------------------------------------------------------------------
    Author:         Miguel Ángel
    Company:        Deloitte
    Description:   	Method to get picklist values
    History
    <Date>			<Author>			<Description>
    04/02/2021		Miguel Ángel    	Initial version
    08/03/2021      Bea Hill            Obtain values for Brazil from Custom Object
    ----------------------------------------------------------------------------------*/

    public static Map<String, Object> getPicklistValueField(Map<String, Object> value,WRAPPER_Payment_Step3fields paymentStep3Fields){
        try{
            value.put('paymentPurposeValues', null); 
            value.put('chargesValues', null); 
            String language = UserInfo.getLanguage();
            System.debug('bh_debug userInfo.getLanguage() ' + language);
            if(paymentStep3Fields.charges){
                value = getPicklistValueList(value, 'PAY_PCK_Charges_Value__c','chargesValues','Payment_Step3_Fields__mdt');
            }
            if(paymentStep3Fields.paymentPurpose){
                List<ValueLabelPair> purposeList = new List<ValueLabelPair>();
                if(paymentStep3Fields.countryDestination == 'BR'){
                    purposeList = getBrazilPurposes();
                }else{
                    purposeList = getValueLabelList('PUR_PCK_Purpose__c', 'Purpose_of_Payment__mdt');
                }
                value.put('paymentPurposeValues', purposeList);
            }
            
        }catch (Exception e) {
            System.debug('Service_Payment_StepFields.getPicklistValueField: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
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

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Adapted from getPicklistValueList() to return value-label pairs for the dropdown component.
    History:
    <Date>          <Author>                <Description>
    08/03/2021      Bea Hill                Initial version
    */

    public static List<ValueLabelPair> getValueLabelList(String field, String objectName){
        List<ValueLabelPair> valueLabelList = new List<ValueLabelPair>();
        try {      
            Map<String, Schema.SObjectField> object_fields_map = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
            List<Schema.PicklistEntry> ple = object_fields_map.get(field).getDescribe().getPicklistValues();
            for( Schema.PicklistEntry picklistVal : ple){
                ValueLabelPair item = new ValueLabelPair(picklistVal.getLabel(), picklistVal.getLabel());
                valueLabelList.add(item);
            }
        } catch (Exception e) {
            System.debug('Service_Payment_StepFields.getValueLabelList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return valueLabelList;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get values for Purpose dropdown for Brazil inbound payments
    History:
    <Date>          <Author>                <Description>
    08/03/2021      Bea Hill                Initial version
    */
    @AuraEnabled
    public static List<ValueLabelPair> getBrazilPurposes () {
        List<ValueLabelPair> purposeList = new List<ValueLabelPair>();
        String language = UserInfo.getLanguage();
        String languageQuery = '%'+ language + '%';
        try {
            List<PaymentPurpose__c> purposeListAux = new List<PaymentPurpose__c>();
            //purposeListAux = [SELECT PP_TXT_Code__c, PP_TXT_Description__c, Decription_PT__c FROM PaymentPurpose__c WHERE PP_TXT_Language__c=: language];
            purposeListAux = [SELECT PP_TXT_Code__c, PP_TXT_Description__c, Decription_PT__c FROM PaymentPurpose__c WHERE PP_TXT_Language__c LIKE: languageQuery];
            if (purposeListAux.size() == 0 ){ 
                //languageQuery = '%en_us%';
                languageQuery = System.Label.PAY_defaultPurposeLanguage;
                purposeListAux = [SELECT PP_TXT_Code__c, PP_TXT_Description__c, Decription_PT__c FROM PaymentPurpose__c WHERE PP_TXT_Language__c LIKE: languageQuery];
            }
            for (PaymentPurpose__c purpose : purposeListAux) {
                if(String.isNotBlank(purpose.PP_TXT_Code__c)) {
                    String value = purpose.PP_TXT_Code__c;
                    String label = purpose.PP_TXT_Description__c;
                   /* String label = '';
                    if (language == 'pt_PT' || language == 'pt_BR') {
                        if(String.isNotBlank(purpose.Decription_PT__c)) {
                            label = purpose.Decription_PT__c;
                        }
                    } else {
                        if(String.isNotBlank(purpose.PP_TXT_Description__c)) {
                            label = purpose.PP_TXT_Description__c;
                        }
                    }*/
                    if (String.isBlank(label)){
                        label = value;
                    }
                    ValueLabelPair item = new ValueLabelPair(value, label);
                    purposeList.add(item);
                }
            }
        } catch (Exception e) {
            System.debug('Service_Payment_StepFields.getBrazilPurposes: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return purposeList;
    }

    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get value-label pairs to populate dropdown values
    History:
    <Date>          <Author>                <Description>
    08/03/2021      Bea Hill                Initial version
    */

    public class ValueLabelPair {
        @AuraEnabled
        public String value {get;set;}
        @AuraEnabled
        public String label {get;set;}

        public valueLabelPair (String value, String label) {
            this.value = value;
            this.label = label;
        }
    }

}