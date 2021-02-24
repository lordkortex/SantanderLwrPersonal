/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor Salas
Company:        Deloitte
Description:    CNT_ContactUsController 
Test Class:     CNT_ContactUsController_Test
History
<Date>			<Author>		<Description>
17/02/2020		Pablo Tejedor     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_ContactUsController {
    

    

     /*----------------------------------------------------------------------------------
   Author:         Pablo Tejedor Salas
   Company:        Deloitte
   Description:    Method to get all values of custom setting  ContactUsPhoneMail__c
   History
   <Date>          <Author>        <Description>
   17/02/2020      R. Alexander Cervino     Initial version
   ----------------------------------------------------------------------------------*/

    @AuraEnabled 
    public static ContactUsPhoneMail__c getDataContacUs (){
    
    ContactUsPhoneMail__c contactUsObject = ContactUsPhoneMail__c.getValues('ContactUsParams');

      return contactUsObject; 
    }
}