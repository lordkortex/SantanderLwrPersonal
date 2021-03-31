public with sharing class CNT_profileServiceController {

    /*------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Gets the profile of the group which is being profiled
    History 
    <Date>          <Author>                <Change Description>
    08/06/2020		Guillermo Giral         Initial version
    ------------------------------------------------------------*/  
    @AuraEnabled(cacheable=true)
    public static WRAPPER_GetProfiles getGroupProfile (String empGroupCod, String groupCod)
    {
        try {
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetGroupProfile');
            String finalEndPoint = configWs.CNT_Endpoint__c.replace('{empGroupCod}','2119').replace('{groupCod}','712');
            String response = Global_IntegrationWrapper.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);

            if (String.isNotBlank(response)){
                Wrapper_GetProfiles groupProfiles = Wrapper_GetProfiles.parse(response);
                return groupProfiles;
            } else {
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_GroupNewProfileParentController.getGroupProfiles: ' + e.getMessage());
        }
        return null;
    }

    /*------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Gets the translations maps for countries and entitlement codes
    History 
    <Date>          <Author>                <Change Description>
    08/06/2020		Guillermo Giral         Initial version
    -------------------------------------------------------------------------------*/  
    @AuraEnabled(cacheable=true)
    public static CNT_profileServiceControllerWrapper getTranslationsMaps ()
    {
        Map<String, String> countryCodeToNameMap = Global_Utilities.getCountriesMap();
        Map<String, String> entitlementCodeToNameMap = Global_Utilities.getPicklistValuesWithTranslations('Admin_Param__mdt', 'Entitlement_Code__c');
        CNT_profileServiceControllerWrapper profilingWrapper = new CNT_profileServiceControllerWrapper(null, entitlementCodeToNameMap, countryCodeToNameMap);
        return profilingWrapper;
    }

    /*------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Calls to the global utilities encrypt data method 
                    to send encrypted params when navigating to another page
    History 
    <Date>          <Author>                <Change Description>
    31/01/2020		Guillermo Giral         Initial version
    ------------------------------------------------------------*/   
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }

    /*------------------------------------------------------------
    Author:         Guillermo Giral  
    Company:        Deloitte
    Description:    Calls to the global utilities decrypt data method 
                    to received and parse encrypted params when navigating 
                    from a different page
    History 
    <Date>          <Author>                <Change Description>
    31/01/2020		Guillermo Giral          Initial version
    ------------------------------------------------------------*/     
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
    
    }


    /*------------------------------------------------------------
    Author:         Guillermo Giral  
    Company:        Deloitte
    Description:    Constructor to return all data to the component
    History 
    <Date>          <Author>                    <Description>
    08/06/2020		Guillermo Giral             Initial version
    ------------------------------------------------------------*/     
    public class CNT_profileServiceControllerWrapper {
        @AuraEnabled public WRAPPER_GetProfiles profiles           	{get;set;}
        @AuraEnabled public Map<String, String> entitlementsMap	    {get;set;}
        @AuraEnabled public Map<String, String> countriesMap	    {get;set;}

        public CNT_profileServiceControllerWrapper(WRAPPER_GetProfiles profiles, Map<String, String> entitlementsMap, Map<String, String> countriesMap){
            this.profiles = profiles;
            this.entitlementsMap = entitlementsMap;
            this.countriesMap = countriesMap;
        }

        public CNT_profileServiceControllerWrapper(){}
    }
}