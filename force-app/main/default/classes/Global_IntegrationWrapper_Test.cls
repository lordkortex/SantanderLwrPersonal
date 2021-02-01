/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:    Global class to be to trhow custom exceptions
Test Class:     CustomException_Test
History:
<Date>          <Author>                    <Description>
31/03/2020      R. Alexander Cervino        Initial version
----------------------------------------------------------------------------------*/
@isTest
public class Global_IntegrationWrapper_Test {

    @isTest
    public static void launchHttpTest () {
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        user u = DataFactory.getRunningUser(true);
        System.runAs (u) {
            Test.startTest();
        	Global_IntegrationWrapper.launchHTTP('', 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/inicio', 'GET');
            Global_IntegrationWrapper.launchHTTP('', 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/inicio', 'POST');
            Test.stopTest();
        }
    }

    @isTest
    public static void launchHttpPartial1Test () {
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        user u = DataFactory.getRunningUser(true);
        System.runAs (u) {
            Test.startTest();
        	Global_IntegrationWrapper.launchHTTP('', 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/inicio', 'GET', new Map<String, String>());
            Global_IntegrationWrapper.launchHTTP('', 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/inicio', 'POST', new Map<String, String>());
            Test.stopTest();
        }
    }

    @isTest
    public static void launchHttpPartial2Test () {
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        user u = DataFactory.getRunningUser(true);
        System.runAs (u) {
            Test.startTest();
        	Global_IntegrationWrapper.launchHTTP('', 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/inicio', 'GET', new Map<String, String>(), 10000);
            Global_IntegrationWrapper.launchHTTP('', 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/inicio', 'POST', new Map<String, String>(), 10000);
            Test.stopTest();
        }
    }

    @isTest
    public static void launchHTTPWithResponseTest () {
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        user u = DataFactory.getRunningUser(true);
        System.runAs (u) {
            Test.startTest();
        	Global_IntegrationWrapper.launchHTTPWithResponse('', 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/inicio', 'GET', new Map<String, String>(), u.Id, false, null);
            Global_IntegrationWrapper.launchHTTPWithResponse('', 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/inicio', 'POST', new Map<String, String>(), u.Id, false, null);
            Test.stopTest();
        }
    }

    @isTest
    public static void launchHttpFullTest () {
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        user u = DataFactory.getRunningUser(true);
        System.runAs (u) {
            Test.startTest();
        	Global_IntegrationWrapper.launchHTTP('', 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/inicio', 'GET', null, u.Id, false);
            Global_IntegrationWrapper.launchHTTP('', 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/inicio', 'POST', null, u.Id, false);
            Test.stopTest();
        }
    }
}