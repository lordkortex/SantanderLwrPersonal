@isTest
public class CNT_B2B_Create_Beneficiary_Test {

    @isTest
    public static void initCountryValues_Test(){
        
        Test.startTest();
        String result = CNT_B2B_Create_Beneficiary.initCountryValues('ES23 4545 4545 4545 4545');
        Test.stopTest();
        System.assertEquals('Spain', result, 'ERROR');
    } 
}