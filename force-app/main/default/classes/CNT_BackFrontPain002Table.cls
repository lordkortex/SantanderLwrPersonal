/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CMP_BackFrontPain002Table
Test Class:     CNT_BackFrontPain002Table_Test
History
<Date>          <Author>        <Description>
22/02/2020      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/

public with sharing class CNT_BackFrontPain002Table {

   /*----------------------------------------------------------------------------------
   Author:         R. Alexander Cervino
   Company:        Deloitte
   Description:    Method to get the filtered data
   History
   <Date>          <Author>        <Description>
22/02/2020      R. Alexander Cervino     Initial version
   ----------------------------------------------------------------------------------*/

     @AuraEnabled
     public static String getFilteredData(Boolean pain,String filters){
        try{
            //WRAPPER_BackFrontPain002 data = new WRAPPER_BackFrontPain002(pain,filters);
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontPain002TableGetPain');
            String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c+filters, configWs.CNT_HTTPMethod__c);
            return response;
        } catch (Exception e) {throw new customException(e.getMessage());}
     }

     /*----------------------------------------------------------------------------------
   Author:         R. Alexander Cervino
   Company:        Deloitte
   Description:    Method to get the filtered data
   History
   <Date>          <Author>        <Description>
22/02/2020      R. Alexander Cervino     Initial version
   ----------------------------------------------------------------------------------*/

   @AuraEnabled
   public static String getDeactivatedPain002(String filters){
      try{
          //WRAPPER_BackFrontPain002 data = new WRAPPER_BackFrontPain002(pain,filters);
          CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontPain002TableDeactivePain');
          String finalEndPoint = configWs.CNT_Endpoint__c.replace('{filters}',filters);

          String response = Global_IntegrationWrapper.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);

          return response;
      } catch (Exception e) {throw new customException(e.getMessage());}

   }

     /*----------------------------------------------------------------------------------
   Author:         R. Alexander Cervino
   Company:        Deloitte
   Description:    Method to get the filtered data
   History
   <Date>          <Author>        <Description>
22/02/2020      R. Alexander Cervino     Initial version
   ----------------------------------------------------------------------------------*/

   @AuraEnabled
   public static String deletePain002Account(String account,String bic){
      try{

         CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontPain002TableDeletePain');
         String finalEndPoint = configWs.CNT_Endpoint__c.replace('{account}',account).replace('{bic}',bic);

         String response = Global_IntegrationWrapper.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);

          return response;
      } catch (Exception e) {throw new customException(e.getMessage());}

   }

     /*----------------------------------------------------------------------------------
   Author:         R. Alexander Cervino
   Company:        Deloitte
   Description:    Method to get the filtered data
   History
   <Date>          <Author>        <Description>
22/02/2020      R. Alexander Cervino     Initial version
   ----------------------------------------------------------------------------------*/

   @AuraEnabled
   public static String activePain002(String body){
      try{
         CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_BackFrontPain002TableActivePain');

         String response = Global_IntegrationWrapper.launchHTTP(body, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);

          return response;
        } catch (Exception e) {throw new customException(e.getMessage());}

   }
}