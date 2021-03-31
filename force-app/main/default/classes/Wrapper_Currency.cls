/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Currency wrapper
Test Class:     Wrapper_Currency_Test
History
<Date>			<Author>		<Description>
12/12/2019		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
global with sharing class Wrapper_Currency {
    @AuraEnabled
    global String iId {get; set;}
    @AuraEnabled
    global DateTime iLastModifiedDate {get; set;}
    @AuraEnabled
    global String iIsoCode {get; set;}
    @AuraEnabled
    global Decimal iConversionRate {get; set;}
    @AuraEnabled
    global Boolean iIsCorporate {get; set;}
    @AuraEnabled
    global String iCurrencyName {get; set;}
    
    global Wrapper_Currency(){
        System.debug('Wrapper_Currency');
    }
}