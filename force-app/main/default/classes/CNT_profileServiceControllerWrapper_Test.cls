/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
18/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_profileServiceControllerWrapper_Test {
@testSetup  
    static void setObjects(){
        Test.startTest();
        system.debug(getGroupProfileTest());
        system.debug(getTranslationsMapsTest());
         //system.debug(encryptDataTest());
        // system.debug(decryptDataTest());
		//system.debug(CNT_PaymentInformationButton.CNT_profileServiceControllerWrapper());
        Test.stopTest();
    }
   
    @isTest
    static WRAPPER_GetProfiles getGroupProfileTest(){
        return CNT_profileServiceController.getGroupProfile('Test','Test');
    }

    @isTest
    static CNT_profileServiceController.CNT_profileServiceControllerWrapper getTranslationsMapsTest(){
        return CNT_profileServiceController.getTranslationsMaps();
    }
  /*  @isTest
    static String encryptDataTest(){
       return CNT_profileServiceController.encryptData('Test');
    }*/
  /*      @isTest
    static String  decryptDataTest(){
		return CNT_profileServiceController.decryptData('Test');
    }
    */
}