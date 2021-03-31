/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:   Test for CNT_SwiftPaymentSearch
History
<Date>			<Author>		<Description>
12/12/2019		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_SwiftPamentSearch_Test {
     
    @isTest
    public static void testGetISO2(){
        CNT_SwiftPaymentSearch.getISO2Values();
    }
    
    @isTest
    public static void testgetStatus(){
        CNT_SwiftPaymentSearch.getStatus();
    }

    @isTest
    public static void testgetCurrencies(){
        CNT_SwiftPaymentSearch.getCurrencies();
    }
}