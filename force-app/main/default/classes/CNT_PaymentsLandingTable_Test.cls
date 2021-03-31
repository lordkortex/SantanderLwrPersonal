/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
19/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_PaymentsLandingTable_Test {
    @testSetup  
    static void setup(){
        Test.startTest();
        DataFactory.getCustomSettingCryptoKey(true);
        system.debug(encryptDataTest());
        system.debug(getSignatoryStatusTest());

        Test.stopTest();
    }
   
    @isTest
    static String encryptDataTest(){
        return CNT_PaymentsLandingTable.encryptData('Test');
    }
    @isTest
    static Map<String,String> getSignatoryStatusTest(){
        return CNT_PaymentsLandingTable.getSignatoryStatus('Test');
    }
}