/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
History
<Date>			<Author>		<Description>
30/03/2020		R. Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public with sharing class CNT_AccountBalanceOptions_Test {
	@isTest
    static void encryptTest(){
        Test.startTest();
        DataFactory.getCustomSettingCryptoKey(true);
        CNT_AccountBalanceOptions.encryptData('Test');
        CNT_Account_Balance_Options.encryptData('Test');
        Test.stopTest();
    }
}