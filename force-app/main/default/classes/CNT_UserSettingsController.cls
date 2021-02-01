/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Controller of User's my settings screen.
Test Class:     CNT_UserSettings_Test
History
<Date>			<Author>		<Description>
28/02/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_UserSettingsController 
{
   

    @AuraEnabled
    public static Map<String,String> getUserSettings()
    {
        User currentUser = null;

        if( Schema.sObjectType.User.fields.Id.isAccessible() &&
            Schema.sObjectType.User.fields.User_DateFormat__c.isAccessible() &&
            Schema.sObjectType.User.fields.USER_NumberFormat__c.isAccessible() &&
            Schema.sObjectType.User.fields.USER_CHK_CashNexus__c.isAccessible())
        {
            currentUser = [SELECT Id, User_DateFormat__c, USER_NumberFormat__c, USER_CHK_CashNexus__c FROM User WHERE Id = :UserInfo.getUserId()];
        }
        
        Map<String, String> userData = new Map<String, String>();

        List<PicklistEntry> timeZoneList = Schema.SObjectType.User.fields.TimeZoneSidKey.picklistValues;
        Schema.PicklistEntry[] languageList = Schema.SObjectType.User.fields.LanguageLocaleKey.PicklistValues;
        Schema.PicklistEntry[] currenciesList = Schema.SObjectType.User.fields.DefaultCurrencyIsoCode.PicklistValues;
        
        // Mapping of time Zones
        String userTimeZone = mapData(timeZoneList, UserInfo.getTimeZone().toString());


        // Mapping of languages
        String userLanguage = mapData(languageList, UserInfo.getLanguage());

        // Mapping of currencies
        String userCurrency = mapData(currenciesList, UserInfo.getDefaultCurrency());

        // Adding data to the map of user data
        userData.put('TimeZone', userTimeZone);
        // userData.put('Locale', userLocale);
        userData.put('Language', userLanguage);
        userData.put('Currency', userCurrency);

        if(currentUser != null) 
        {
            userData.put('DateFormat', currentUser.User_DateFormat__c);
            userData.put('NumberFormat', currentUser.USER_NumberFormat__c);
            userData.put('isCashNexus', String.valueOf(currentUser.USER_CHK_CashNexus__c));
        }
        return userData;
    }


    @AuraEnabled
    public static String getPicklistValues()
    {
        Map<String,List<Object>> data = new Map<String,List<Object>>();

        data.put('TimeZoneList', ( Object[])Schema.SObjectType.User.fields.TimeZoneSidKey.picklistValues);
        data.put('LanguageList', ( Object[])Schema.SObjectType.User.fields.USER_PCK_Language__c.PicklistValues);
        data.put('CurrencyList', ( Object[])Schema.SObjectType.User.fields.DefaultCurrencyIsoCode.PicklistValues);
        data.put('NumberFormatList', ( Object[])Schema.SObjectType.User.fields.USER_NumberFormat__c .PicklistValues);
        data.put('DateFormatList', ( Object[])Schema.SObjectType.User.fields.User_DateFormat__c .PicklistValues);
        System.debug(JSON.serialize(data.get('NumberFormatList')));
        return JSON.serialize(data);

    }

    @AuraEnabled
    public static boolean saveData(Map<String,String> userInfoCmp)
    {
        
        User currentUser = null;

        if(userInfoCmp.size() > 0) 
        {
                currentUser = [SELECT Id, User_DateFormat__c, USER_NumberFormat__c, DefaultCurrencyIsoCode, CurrencyIsoCode, TimeZoneSidKey, LanguageLocaleKey, LocaleSidKey FROM User WHERE Id = :UserInfo.getUserId() ];
                
        }
        if(currentUser != null) 
        {
            Map<String, Schema.PicklistEntry[]> picklistValues = (Map<String, Schema.PicklistEntry[]>) JSON.deserialize(getPicklistValues(), Map<String, Schema.PicklistEntry[]>.class);

            currentUser.User_dateFormat__c = userInfoCmp.get('DateFormat');
            currentUser.USER_NumberFormat__c = userInfoCmp.get('NumberFormat');
            currentUser.CurrencyIsoCode = mapValue(picklistValues.get('CurrencyList'), userInfoCmp.get('Currency'));
            currentUser.DefaultCurrencyIsoCode = mapValue(picklistValues.get('CurrencyList'), userInfoCmp.get('Currency'));
            currentUser.TimeZoneSidKey = mapValue(picklistValues.get('TimeZoneList'), userInfoCmp.get('TimeZone'));
            System.debug('Currency mapped: ' + currentUser.CurrencyIsoCode);
            String languageMapped = mapValue(picklistValues.get('LanguageList'), userInfoCmp.get('Language'));
            if(languageMapped != currentUser.LanguageLocaleKey) 
            {
                List<Country__mdt> matchingMetadata = [SELECT COU_PCK_Language__c, COU_PCK_Locale__c FROM Country__mdt WHERE COU_PCK_Language__c = :languageMapped LIMIT 1 ];
                if(matchingMetadata.size() > 0) 
                {
                    if(matchingMetadata.get(0).COU_PCK_Locale__c != null) 
                    {
                        if(matchingMetadata.get(0).COU_PCK_Language__c == 'en_US')
                        {
                            currentUser.LocaleSidKey = 'en_US';
                        }
                        else
                        {
                            currentUser.LocaleSidKey = matchingMetadata.get(0).COU_PCK_Locale__c;
                        }
                    }
                }
                currentUser.LanguageLocaleKey = languageMapped;                
            }
        }

        try 
        {
            System.debug(JSON.serialize(currentUser));
            update currentUser;

        } catch(DmlException e) 
        {
            System.debug(e);
            return false;
        }

        return true;
    }



    public static String mapData(Schema.PicklistEntry[] dataList, String toSearch)
    {
        for(PicklistEntry data : dataList) 
        {
            if(data.value.equals(toSearch)) 
            {
                return data.label;
            }
        }
        return '';
    }

    public static String mapValue(Schema.PicklistEntry[] dataList, String toSearch)
    {
        for(PicklistEntry data : dataList) 
        {
            if(data.label.equals(toSearch)) 
            {
                return data.value;
            }
        }
        return '';
    }

    @AuraEnabled
    public static String changePassword (String oldPasswordParam, String newPasswordParam)
    {

        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_UpdatePassword');
        String endpoint = configWs.CNT_Endpoint__c.replace('{New}', newPasswordParam).replace('{Old}', oldPasswordParam);
        String response = Global_IntegrationWrapper.launchHttp('', endpoint, configWs.CNT_HTTPMethod__c);
        return response;
    }

}