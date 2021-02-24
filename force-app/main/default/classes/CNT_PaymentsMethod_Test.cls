/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
18/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_PaymentsMethod_Test {
    
    @testSetup
    static void init(){
      	DataFactory.getCustomSettingCryptoKey(true);
        Test.startTest();
        system.debug(encryptDataTest());
        Test.stopTest();
    }

	@isTest
    static String encryptDataTest(){
        
       return CNT_PaymentsMethod.encryptData('Test');
    }

}