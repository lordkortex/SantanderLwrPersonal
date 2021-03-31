public with sharing class CNT_GroupNewProfileParentController {

    @AuraEnabled
    public static CNT_ServiceProfilingWrapper getServiceProfilingInfo(){
    
        return generateMockData();
    }

    @AuraEnabled
    public static Wrapper_GetProfiles.Grupo_detail getProfiles(String empGroupCod, String groupCod){
    
        return getGroupProfiles(empGroupCod, groupCod);
    }

    @AuraEnabled
    public static Wrapper_GetProfiles.Grupo_detail getGroupProfiles (String empGroupCod, String groupCod){
        try {
            //String response = '';

            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetGroupProfile');
            String finalEndPoint = configWs.CNT_Endpoint__c.replace('{empGroupCod}','2119').replace('{groupCod}','712');
            String response = Global_IntegrationWrapper.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);

            if (String.isNotBlank(response)){
                
                Wrapper_GetProfiles profiles = Wrapper_GetProfiles.parse(response);
                mapEntitlement(profiles.grupo_detail.listaServicios);
                return profiles.grupo_detail;
                
            } else {
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_GroupNewProfileParentController.getGroupProfiles: ' + e.getMessage());
        }
        return null;
    }

    @AuraEnabled
    public static List<Wrapper_GetProfiles.ListaServicios> mapEntitlement(List<Wrapper_GetProfiles.ListaServicios> profiles){

        List<Object> countryList = new List<Object>();
        Map<String, String> entitlementCodeToNameMap = Global_Utilities.getPicklistValuesWithTranslations('Admin_Param__mdt', 'Entitlement_Code__c');
        

        for(Integer h = 0; h < profiles.size(); h++) {
            countryList = profiles[h].servicio.listaPais;
            for(Integer i = 0; i < countryList.size(); i++) {
                List<Object> accountList = new List<Object>();
                accountList = profiles[h].servicio.listaPais[i].pais.listaCuentas;
                
                for(Integer j = 0; j < accountList.size(); j++) {
                    List<Object> entitlementList = new List<Object>();
                    entitlementList = profiles[h].servicio.listaPais[i].pais.listaCuentas[j].cuentasArbol.permisosSubprod;
                    
                    for(Integer k = 0; k < entitlementList.size(); k++) {
                        String entitlement = profiles[h].servicio.listaPais[i].pais.listaCuentas[j].cuentasArbol.permisosSubprod[k].permisosSubprod.codPermiso;
                        entitlement = entitlementCodeToNameMap.get(entitlement);
                        profiles[h].servicio.listaPais[i].pais.listaCuentas[j].cuentasArbol.permisosSubprod[k].permisosSubprod.codPermiso = entitlement;
                    }
                }
            }
        }

        return profiles;
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

    public class CNT_GetProfilesResponseWrapper {
        @AuraEnabled public WRAPPER_GetProfiles profiles           	{get;set;}
        @AuraEnabled public Map<String, String> entitlements	    {get;set;}

        public CNT_GetProfilesResponseWrapper(WRAPPER_GetProfiles profiles, Map<String, String> entitlements){
            this.profiles = profiles;
            this.entitlements = entitlements;  
        }
        public CNT_GetProfilesResponseWrapper(){}
    }
}