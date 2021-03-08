/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
History
<Date>			<Author>		<Description>
30/03/2020		R. Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_IPTDetail_Test {
    
     @isTest
    static void getStepsTest(){
        
        Test.startTest();
        DataFactory.createWsConfigurationSetting(true);
        CNT_IPTDetailParent.generateObject();
        CNT_IPTDetailParent.getSteps('',true);
        Test.stopTest();
    }
    
    @isTest
    static void getDateAndTimeTest(){
        Test.startTest();
        CNT_IPTDetailParent.getDateAndTime('');
        CNT_IPTDetailParent.getDateAndTime('2011-08-12T20:17:46.384Z');
        Test.stopTest();
    }
    
    @isTest
    static void diffDatesTest(){
        Test.startTest();
        CNT_IPTDetailParent.diffDates('2011-08-12T20:17:46.384Z','2011-08-15T20:17:46.384Z');
        Test.stopTest();
    }
    
    @isTest
    static void getReasonTest(){
        Test.startTest();
        CNT_IPTDetailParent.getReason('');
        Test.stopTest();
    }
    
    @isTest
    static void decryptDataTest(){
        Test.startTest();
        DataFactory.getCustomSettingCryptoKey(true);
        CNT_IPTDetailParent.decryptData( Global_Utilities.encryptData('Test'));
        Test.stopTest();
    }
     @isTest
    static void getBICListTest(){
        Test.startTest();
        DataFactory.getCustomSettingCryptoKey(true);
        CNT_IPTDetailParent.getBICList();
        Test.stopTest();
    }

    @isTest
    static void getShowFeeValueTest(){
        Test.startTest();

        DataFactory.createAccount();
        Account acc = [SELECT Id, ACC_PCK_Segment__c FROM Account LIMIT 1];
        acc.ACC_PCK_Segment__c = '07 - CIB';
        update acc;

        Contact c = new Contact(
            LastName = 'test', 
            CONTACT_User__c = UserInfo.getUserId(), 
            AccountId = acc.Id);
        insert c;

        BICSegmentRelation__c cs = new BICSegmentRelation__c(
            Name= 'test', 
            BIC__c= 'test', 
            segment__c = '07 - CIB', 
            showFeeValue__c = '1');
        insert cs;

        CNT_IPTDetailParent.getShowFeeValue('test');
        Test.stopTest();
    }
}