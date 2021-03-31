public class CNT_B2B_Purpose {
    @AuraEnabled(cacheable=true)
    public static ReturnValue getPurposes(){
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();          
            List<String> picklistValues = new List<String>();
            Schema.DescribeFieldResult fieldResult = Purpose_of_Payment__mdt.PUR_PCK_Purpose__c.getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            for( Schema.PicklistEntry picklistVal : ple){
                picklistValues.add(picklistVal.getLabel());
            }
            value.put('picklistValues', picklistValues);      
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_B2B_Purpose.getPurposes: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

}