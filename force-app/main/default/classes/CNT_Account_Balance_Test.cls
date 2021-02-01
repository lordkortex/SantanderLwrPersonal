/*----------------------------------------------------------------------------------
Author:         Joaquín Vera
Company:        Deloitte
Description:    Global class to be to trhow custom exceptions
Test Class:     CustomException_Test
History
<Date>			<Author>		<Description>
13/11/2019		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/

@isTest
public with sharing class CNT_Account_Balance_Test {

    @TestSetup
    static void makeData()
    {
        DataFactory.getCustomSettingCryptoKey(true);
    }


    @IsTest
    static void encryptDataTest()
    {
        Test.startTest();
        String vuelta = CNT_Account_Balance.encryptData('Prueba');
        Test.stopTest();

        System.assertNotEquals(vuelta, '', 'Assert para comprobar que lo que devuelve el método no es vacío');
    }
}