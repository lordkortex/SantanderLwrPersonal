public with sharing class CNT_GroupNewProfileParentController {

    @AuraEnabled
    public static CNT_ServiceProfilingWrapper getServiceProfilingInfo(){
    
        return generateMockData();
    }

    public static CNT_ServiceProfilingWrapper generateMockData() {
        
        Map<String,String> countriesMap = new Map<String,String>{
                                                                    'Argentina'=>'AR',
                                                                    'Spain'=>'ES',
                                                                    'United Kingdom'=>'UK'
                                                                };
        List<String> countriesList = new List<String>();
        for(String ct : countriesMap.keySet()){
            countriesList.add(ct);
        }
        List<String> accountsList = new List<String>{
                                                        Label.ServiceProfiling_EntitltementNoAccount,
                                                        'AR - ARS - 0721666666666015 - ISBAN-SPAIN',
                                                        'AR - ARS - 0000000000028914 - TESTPORTAG',
                                                        'AR - EUR - 0000000000288044 - TESTPORTESP',
                                                        'AR - GBP - 0000000000288915 - TESTPORTGBP',
                                                        'ES - EUR - 1111111111322281 - TESTPORTEUR',
                                                        'UK - GBP - 4444444444221329 - TESTPORTUKGBP',
                                                        'UK - EUR - 4444444444958256 - TESTPORTUKEUR'
                                                    };
        List<String> entitlementsList = new List<String>{
                                                            'Balances - Work',
                                                            'Downloads & Reporting - SIC Contingency',
                                                            'Downloads - BAI2',
                                                            'Downloads - BalancesExcel',
                                                            'Downloads - CAMT0052',
                                                            'Downloads - FINSTA',
                                                            'Downloads - MT941',
                                                            'Downloads - MT942',
                                                            'Intraday - Work'
                                                        };
        CNT_ServiceProfilingWrapper serviceProfilingData = new CNT_ServiceProfilingWrapper(countriesMap, countriesList, accountsList, entitlementsList);

        return serviceProfilingData;

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

    //WRAPPER OF PENDING AUTHORIZATIONS DATA
    public class CNT_ServiceProfilingWrapper {
        @AuraEnabled public Map<String,String> countryMap                   {get;set;}
        @AuraEnabled public List<String> countries                          {get;set;}
        @AuraEnabled public List<String> accounts                           {get;set;}
        @AuraEnabled public List<String> entitlements                       {get;set;}

        public CNT_ServiceProfilingWrapper(Map<String,String> countryMap, List<String> countries, List<String> accounts, List<String> entitlements){
            this.countryMap = countryMap;
            this.countries = countries;
            this.accounts = accounts;
            this.entitlements = entitlements;
        }
    }  
}