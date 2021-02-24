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
    public String iId {get; set;}
    @AuraEnabled
    public DateTime iLastModifiedDate {get; set;}
    @AuraEnabled
    public String iIsoCode {get; set;}
    @AuraEnabled
    public Decimal iConversionRate {get; set;}
    @AuraEnabled
    public Boolean iIsCorporate {get; set;}
    @AuraEnabled
    public String iCurrencyName {get; set;}
}