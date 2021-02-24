/*
Author:         Candido
Company:        Deloitte
Description:    Test class to cover ControllerFCCDowJones, ServiceFCCDowJones and WS_FCCDowJones
History:
<Date>          <Author>                <Description>
18/11/2020      Candido                 Initial version
*/
@isTest
public with sharing class ControllerFCCDowJones_Test {
    
    final static String PAYMENT_ID = 'd24a269950664fd489c9b0b5f49035a7';
    final static String DESCRIPTION = 'medvedev';

    @testSetup
    static void setup () {
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }

    @isTest
    static void testFCCDowJonesWithoutHits () {
        try {
            WS_FCCDowJones_Mock mock = new WS_FCCDowJones_Mock();
            mock.setSearchWithOutHits();
            Test.setMock(HttpCalloutMock.class, mock);
            Test.startTest();
            ControllerFCCDowJones.checkFCCDowJonesAndUpdateStatus(PAYMENT_ID, DESCRIPTION);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ControllerFCCDowJones_Test.testFCCDowJonesWithoutHits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    @isTest
    static void testFCCDowJonesWithHits () {
        try {
            WS_FCCDowJones_Mock mock = new WS_FCCDowJones_Mock();
            mock.setSearchWithHits();
            Test.setMock(HttpCalloutMock.class, mock);
            Test.startTest();
            ControllerFCCDowJones.checkFCCDowJonesAndUpdateStatus(PAYMENT_ID, DESCRIPTION);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ControllerFCCDowJones_Test.testFCCDowJonesWithHits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}