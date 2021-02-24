/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Test class of Wrapper_Currency
History
<Date>			<Author>		<Description>
16/03/2020		Shahad Naji    	Initial version
----------------------------------------------------------------------------------*/
@isTest
private class Wrapper_Currency_Test {
    @isTest
    static void testUtil (){
        Wrapper_Currency wcTest = new Wrapper_Currency();
        wcTest.iId = '987655433';
        DateTime dtTest = system.today();
        wcTest.iLastModifiedDate = dtTest;
        wcTest.iIsoCode = 'EUR';
        wcTest.iConversionRate = 1;
        wcTest.iIsCorporate = true;
        wcTest.iCurrencyName = 'EUR - Euro';
        
        system.assert( wcTest.iId == '987655433', 'ERROR >>> Wrapper_Currency - iId: The variable has not a correct value');
        system.assert(wcTest.iLastModifiedDate == system.today(), 'ERROR >>> Wrapper_Currency - iLastModifiedDate: The variable has not a correct value');
        system.assert(wcTest.iIsoCode == 'EUR', 'ERROR >>> Wrapper_Currency - iIsoCode: The variable has not a correct value');
        system.assert(wcTest.iConversionRate == 1, 'ERROR >>> Wrapper_Currency - iConversionRate: The variable has not a correct value');
        system.assert( wcTest.iIsCorporate == true, 'ERROR >>> Wrapper_Currency - iIsCorporate: The variable has not a correct value');
        system.assert( wcTest.iCurrencyName == 'EUR - Euro', 'ERROR >>> Wrapper_Currency - iCurrencyName: The variable has not a correct value');
        
    }
        
}