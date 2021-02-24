/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
History
<Date>			<Author>		<Description>
22/05/2020		R. Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest

public class CNT_termsFooterTest {
    
    @isTest
    static void decryptDataTest(){
        Test.startTest();
        DataFactory.getCustomSettingCryptoKey(true);
        CNT_termsFooter.decryptData( Global_Utilities.encryptData('Test'));
        Test.stopTest();
    }
}