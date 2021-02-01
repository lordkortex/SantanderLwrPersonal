/*
Author:         Candido
Company:        Deloitte
Description:    Test class to cover ControllerFCCDowJones, ServiceFCCDowJones and WS_FCCDowJones
History:
<Date>          <Author>        <Description>
18/11/2020      Candido         Initial version
08/01/2021      Candido         Added test to check the new response
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
            ControllerFCCDowJones.checkFCCDowJonesAndUpdateStatus(PAYMENT_ID, DESCRIPTION, null, null);
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
            ControllerFCCDowJones.checkFCCDowJonesAndUpdateStatus(PAYMENT_ID, DESCRIPTION, null, null);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ControllerFCCDowJones_Test.testFCCDowJonesWithHits: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    @isTest
    static void testWrapperResponse () {
        try {
            WS_FCCDowJones_Mock mock = new WS_FCCDowJones_Mock();
            mock.setSearchWithHits();
            WS_FCCDowJones.OUTPUT res = (WS_FCCDowJones.OUTPUT) JSON.deserialize(mock.response, WS_FCCDowJones.OUTPUT.class);
            System.debug(res.headerSummary.totalHits);
            System.debug(res.headerSummary.searchNameResultsList);
            if (res.headerSummary.searchNameResultsList != null && !res.headerSummary.searchNameResultsList.isEmpty()) {
                for (WS_FCCDowJones.SearchNameResults searchNameResult : res.headerSummary.searchNameResultsList) {
                    System.debug(searchNameResult.searchName);
                    if (searchNameResult.searchResults != null) {
                        if (searchNameResult.searchResults.head != null) {
                            System.debug(searchNameResult.searchResults.head.apiVersion);
                            System.debug(searchNameResult.searchResults.head.backendVersion);
                            System.debug(searchNameResult.searchResults.head.totalHits);
                            System.debug(searchNameResult.searchResults.head.hitsFrom);
                            System.debug(searchNameResult.searchResults.head.hitsTo);
                            System.debug(searchNameResult.searchResults.head.truncated);
                            System.debug(searchNameResult.searchResults.head.cachedResultsId);
                        }
                        if (searchNameResult.searchResults.body != null) {
                            if (searchNameResult.searchResults.body.match != null && !searchNameResult.searchResults.body.match.isEmpty()) {
                                for (WS_FCCDowJones.Match match : searchNameResult.searchResults.body.match) {
                                    System.debug(match.score);
                                    if (match.matchType != null) {
                                        System.debug(match.matchType.value);
                                        System.debug(match.matchType.linguisticVariation);
                                        System.debug(match.matchType.nonLinguisticVariation);
                                        System.debug(match.matchType.structuralVariation);
                                    }
                                    if (match.payload != null) {
                                        if (match.payload.riskIcons.riskIcon != null && !match.payload.riskIcons.riskIcon.isEmpty()) {
                                            for (String riskIcon : match.payload.riskIcons.riskIcon) {
                                                System.debug(riskIcon);
                                            }
                                        }
                                        System.debug(match.payload.primaryName);
                                        System.debug(match.payload.countryCode);
                                        System.debug(match.payload.title);
                                        System.debug(match.payload.subsidiary);
                                        System.debug(match.payload.matchedName);
                                        if (match.payload.matchedName != null) {
                                            System.debug(match.payload.matchedName.value);
                                            System.debug(match.payload.matchedName.nameType);
                                        }
                                        if (match.payload.matchedDateOfBirth != null) {
                                            System.debug(match.payload.matchedDateOfBirth.year);
                                            System.debug(match.payload.matchedDateOfBirth.month);
                                            System.debug(match.payload.matchedDateOfBirth.day);
                                        }
                                        if (match.payload.datesOfBirth.dateOfBirth != null && !match.payload.datesOfBirth.dateOfBirth.isEmpty()) {
                                            System.debug(match.payload.datesOfBirth.dateOfBirth);
                                            for (WS_FCCDowJones.DateOfBirth dateOfBirth : match.payload.datesOfBirth.dateOfBirth) {
                                                System.debug(dateOfBirth.year);
                                                System.debug(dateOfBirth.month);
                                                System.debug(dateOfBirth.day);
                                            }
                                        }
                                        if (match.payload.countries != null) {
                                            if (match.payload.countries.country != null && !match.payload.countries.country.isEmpty()) {
                                                for (WS_FCCDowJones.Country country : match.payload.countries.country) {
                                                    System.debug(country.countryType);
                                                    System.debug(country.countryCode);
                                                }
                                            }
                                        }
                                        System.debug(match.payload.gender);
                                    }
                                    System.debug(match.peid);
                                    System.debug(match.revision);
                                    System.debug(match.recordType);
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.debug('ControllerFCCDowJones_Test.testWrapperResponse: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}