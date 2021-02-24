/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor Salas
Company:        Deloitte
Description:    Controller of CMP_ICMOriginDestination
Test Class:     No tiene aun
History
<Date>			<Author>		        <Description>
19/11/2019		Pablo Tejedor Salas     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_ICMOriginDestinationTable {
      
      
      @AuraEnabled
      public static map<String,String> countryIsoLabels {get;set;}

      @AuraEnabled
      public static String getOriginData(){
         return CNT_InstantCashManagementController.getJsonICMStep1();
      }

      @AuraEnabled
      public Static map<String,String> getCountryValuesMap(){
         countryIsoLabels = new  map<String,String>();
      
         if(Schema.sObjectType.Country__mdt.isAccessible()){
            
            for(Country__mdt  mapCountry : [SELECT  COU_PCK_ISO_Code2__c, COU_PCK_Name__c  FROM Country__mdt ]){
               countryIsoLabels.put(mapCountry.COU_PCK_ISO_Code2__c, mapCountry.COU_PCK_Name__c );
            } 

            return countryIsoLabels;
         } else {
            return null;
         }
      }
}