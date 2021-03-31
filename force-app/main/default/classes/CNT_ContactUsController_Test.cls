/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor 
Company:        Deloitte
Description:    Class to test CNT_ContactUsController
Test Class:     CNT_ContactUsController_Test
History
<Date>			<Author>		<Description>
17/02/2020		Pablo Tejedor    Initial version
----------------------------------------------------------------------------------*/

@isTest
public with sharing class CNT_ContactUsController_Test {
    
    @isTest
    static void getDataContacUstest(){
        
        ContactUsPhoneMail__c csTest = new ContactUsPhoneMail__c();
		csTest.Name = 'ContactUsParams';
        csTest.contactUsMail__C = 'OneTradeClientService1@gruposantander.com';
		csTest.phoneNumberContacUs__c = '113123123';
		insert csTest;
        
        Test.startTest();
        ContactUsPhoneMail__c vuelta = CNT_ContactUsController.getDataContacUs();
        Test.stopTest();
        
        system.assertNotEquals(null, vuelta, 'la custom seting no esta vacia');
        

        
    }

}