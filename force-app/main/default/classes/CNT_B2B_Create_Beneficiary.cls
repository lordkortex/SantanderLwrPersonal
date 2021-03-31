public with sharing class CNT_B2B_Create_Beneficiary {

    /*
    Author:         Quesada
    Company:        Deloitte
    Description:    Gets the country picklist value from account IBAN code
    History:
    <Date>          <Author>            <Description>
    12/2020         Quesada             Initial version
    */
    @AuraEnabled
    public static String initCountryValues (String searchedString) {
        System.debug('searchedString: ' + searchedString);
        Map<String, String> isoCodeValue = new Map<String, String>();
        String picklistValue = null;
        if (searchedString != null) {
            String code = searchedString.substring(0, 2);
            System.debug('code: ' + code);
            List<Country__mdt> countries = new List<Country__mdt>([
                SELECT Id, COU_PCK_ISO_Code2__c, COU_PCK_Name__c
                FROM Country__mdt
            ]);
            System.debug('countries.isEmpty(): ' + countries.isEmpty());
            if (!countries.isEmpty()) {
                for (Country__mdt cmdt : countries) {
                    isoCodeValue.put(cmdt.COU_PCK_ISO_Code2__c, cmdt.COU_PCK_Name__c);
                }
                picklistValue = isoCodeValue.get(code);
                System.debug('picklistValue: ' + picklistValue);
            }
        }
        return picklistValue;
    }
}