/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor 
Company:        Deloitte
Description:    Test class of CNT_SwiftPayment_Test
History
<Date>			<Author>		  <Description>
13/11/2019		Pablo Tejedor     Initial version
----------------------------------------------------------------------------------*/



@isTest
public class CNT_SwiftPayment_Test {

    @TestSetup
    static void makeData(){
        
      DataFactory.getCustomSettingCryptoKey(true);
    }

    @isTest
    public static void descryptDataTest(){  
        test.startTest();
          String encryptedData = Global_Utilities.encryptData('Test');
          String result = CNT_SwiftPayment.decryptData(encryptedData);
        test.stopTest();

        System.assertNotEquals(result, '', 'Assert para comprobar que lo que devuelve el método no es vacío');

    }
    
}