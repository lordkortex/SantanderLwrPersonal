/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
History
<Date>			<Author>		<Description>
22/05/2020		R. Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_FooterTest {
    
     @isTest
    public static void encryotDataTest(){
        Test.startTest();
        DataFactory.getCustomSettingCryptoKey(true);
        CNT_Footer.encryptData('hola');
        Test.stopTest();
    }
    
        @isTest
    public static void getIsCashNexusTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            CNT_Footer.getIsCashNexus();
        }
    }

}