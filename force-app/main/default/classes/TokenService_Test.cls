@IsTest
public with sharing class TokenService_Test {

    @TestSetup
    static void testSetup () {
        List<parametrized_claims__c> listParametrized = new List<Parametrized_claims__c>();
        parametrized_claims__c GTSlocal = new parametrized_claims__c(
            TXT_aud__c = 'aud',
            TXT_country__c = 'country',
            TXT_local_realm__c = 'local_realm',
            TXT_local_uid__c = 'local_uid',
            TXT_realm__c = 'realm',
            TXT_sec_mode__c = 'sec_mode',
            TXT_sub__c = 'sub',
            Name = 'GTSlocal',
            PCK_Token_Country__c = 'ALL',
            PCK_Token_Platform__c = 'GTS',
            PCK_Token_User__c = 'local'
        );
        listParametrized.add(GTSlocal);
        parametrized_claims__c SANDIGITALplatformES = new parametrized_claims__c(
            TXT_aud__c = TokenInformation.NOT_SEND,
            TXT_country__c = TokenInformation.NOT_SEND,
            TXT_local_realm__c = TokenInformation.NOT_SEND,
            TXT_local_uid__c = TokenInformation.NOT_SEND,
            TXT_realm__c = TokenInformation.NOT_SEND,
            TXT_sec_mode__c = TokenInformation.NOT_SEND,
            TXT_sub__c = TokenInformation.NOT_SEND,
            Name = 'SANDIGITALplatformES',
            PCK_Token_Country__c = 'ES',
            PCK_Token_Platform__c = 'SANDIGITAL',
            PCK_Token_User__c = 'platform'
        );
        listParametrized.add(SANDIGITALplatformES);
        parametrized_claims__c SANDIGITALplatformUK = new parametrized_claims__c(
            TXT_aud__c = TokenInformation.EMPTY_DATA,
            TXT_country__c = TokenInformation.EMPTY_DATA,
            TXT_local_realm__c = TokenInformation.EMPTY_DATA,
            TXT_local_uid__c = TokenInformation.EMPTY_DATA,
            TXT_realm__c = TokenInformation.EMPTY_DATA,
            TXT_sec_mode__c = TokenInformation.EMPTY_DATA,
            TXT_sub__c = TokenInformation.EMPTY_DATA,
            Name = 'SANDIGITALplatformUK',
            PCK_Token_Country__c = 'UK',
            PCK_Token_Platform__c = 'SANDIGITAL',
            PCK_Token_User__c = 'platform'
        );
        listParametrized.add(SANDIGITALplatformUK);
        parametrized_claims__c GTSnexus = new parametrized_claims__c(
            TXT_aud__c = 'aud',
            TXT_country__c = 'country',
            TXT_local_realm__c = 'local_realm',
            TXT_local_uid__c = 'local_uid',
            TXT_realm__c = 'realm',
            TXT_sec_mode__c = 'sec_mode',
            TXT_sub__c = 'sub',
            Name = 'GTSnexus',
            PCK_Token_Country__c = 'ALL',
            PCK_Token_Platform__c = 'GTS',
            PCK_Token_User__c = 'nexus'
        );
        listParametrized.add(GTSnexus);
        parametrized_claims__c SANDIGITALlocal = new parametrized_claims__c(
            TXT_aud__c = 'aud',
            TXT_country__c = 'country',
            TXT_local_realm__c = 'local_realm',
            TXT_local_uid__c = 'local_uid',
            TXT_realm__c = 'realm',
            TXT_sec_mode__c = 'sec_mode',
            TXT_sub__c = 'sub',
            Name = 'SANDIGITALlocal',
            PCK_Token_Country__c = 'ALL',
            PCK_Token_Platform__c = 'SANDIGITAL',
            PCK_Token_User__c = 'local'
        );
        listParametrized.add(SANDIGITALlocal);
        parametrized_claims__c SANDIGITALplatform = new parametrized_claims__c(
            TXT_aud__c = 'aud',
            TXT_country__c = 'country',
            TXT_local_realm__c = 'local_realm',
            TXT_local_uid__c = 'local_uid',
            TXT_realm__c = 'realm',
            TXT_sec_mode__c = 'sec_mode',
            TXT_sub__c = 'sub',
            Name = 'SANDIGITALplatform',
            PCK_Token_Country__c = 'ALL',
            PCK_Token_Platform__c = 'SANDIGITAL',
            PCK_Token_User__c = 'platform'
        );
        listParametrized.add(SANDIGITALplatform);
        parametrized_claims__c BBOOGTS_LOB = new parametrized_claims__c(
            TXT_aud__c = 'aud',
            TXT_country__c = 'country',
            TXT_local_realm__c = 'local_realm',
            TXT_local_uid__c = 'local_uid',
            TXT_realm__c = 'realm',
            TXT_sec_mode__c = 'sec_mode',
            TXT_sub__c = 'sub',
            Name = 'BBOOGTS_LOB',
            PCK_Token_Country__c = 'ALL',
            PCK_Token_Platform__c = 'BBOO',
            PCK_Token_User__c = 'GTS_LOB'
        );
        listParametrized.add(BBOOGTS_LOB);
        parametrized_claims__c BBOOGTS_GLOBAL = new parametrized_claims__c(
            TXT_aud__c = 'aud',
            TXT_country__c = 'country',
            TXT_local_realm__c = 'local_realm',
            TXT_local_uid__c = 'local_uid',
            TXT_realm__c = 'realm',
            TXT_sec_mode__c = 'sec_mode',
            TXT_sub__c = 'sub',
            Name = 'BBOOGTS_GLOBAL',
            PCK_Token_Country__c = 'ALL',
            PCK_Token_Platform__c = 'BBOO',
            PCK_Token_User__c = 'GTS_GLOBAL'
        );
        listParametrized.add(BBOOGTS_GLOBAL);
        parametrized_claims__c BBOOGLOBAL_API_LOB = new parametrized_claims__c(
            TXT_aud__c = 'aud',
            TXT_country__c = 'country',
            TXT_local_realm__c = 'local_realm',
            TXT_local_uid__c = 'local_uid',
            TXT_realm__c = 'realm',
            TXT_sec_mode__c = 'sec_mode',
            TXT_sub__c = 'sub',
            Name = 'BBOOGLOBAL_API_LOB',
            PCK_Token_Country__c = 'ALL',
            PCK_Token_Platform__c = 'BBOO',
            PCK_Token_User__c = 'GLOBAL_API_LOB'
        );
        listParametrized.add(BBOOGLOBAL_API_LOB);
        parametrized_claims__c BBOOGLOBAL_API_PLATFORM = new parametrized_claims__c(
            TXT_aud__c = 'aud',
            TXT_country__c = 'country',
            TXT_local_realm__c = 'local_realm',
            TXT_local_uid__c = 'local_uid',
            TXT_realm__c = 'realm',
            TXT_sec_mode__c = 'sec_mode',
            TXT_sub__c = 'sub',
            Name = 'BBOOGLOBAL_API_PLATFORM',
            PCK_Token_Country__c = 'ALL',
            PCK_Token_Platform__c = 'BBOO',
            PCK_Token_User__c = 'GLOBAL_API_PLATFORM'
        );
        listParametrized.add(BBOOGLOBAL_API_PLATFORM);
        insert listParametrized;
    }

    @IsTest
    static void launchHappy () {
        try {
            Test.startTest();
            TokenInformation GTSlocal = new TokenInformation('ALL', 'GTS', 'local');
            TokenService.generateTokenByInstance(null, GTSlocal);
            TokenInformation GTSnexus = new TokenInformation('ALL', 'GTS', 'nexus', null);
            TokenService.generateTokenByInstance(null, GTSnexus);
            TokenInformation SANDIGITALlocal = new TokenInformation('ALL', 'SANDIGITAL', 'local', null, null);
            TokenService.generateTokenByInstance(null, SANDIGITALlocal);
            TokenInformation SANDIGITALplatform = new TokenInformation('ALL', 'SANDIGITAL', 'platform', null, null, null);
            TokenService.generateTokenByInstance(null, SANDIGITALplatform);
            TokenInformation BBOOGTS_LOB = new TokenInformation('ALL', 'BBOO', 'GTS_LOB', null, null, null, null);
            TokenService.generateTokenByInstance(null, BBOOGTS_LOB);
            TokenInformation BBOOGTS_GLOBAL = new TokenInformation('ALL', 'BBOO', 'GTS_GLOBAL', null, null, null, null, null);
            TokenService.generateTokenByInstance(null, BBOOGTS_GLOBAL);
            TokenInformation BBOOGLOBAL_API_LOB = new TokenInformation('ALL', 'BBOO', 'GLOBAL_API_LOB', null, null, null, null, null, null);
            TokenService.generateTokenByInstance(null, BBOOGLOBAL_API_LOB);
            TokenInformation BBOOGLOBAL_API_PLATFORM = new TokenInformation('ALL', 'BBOO', 'GLOBAL_API_PLATFORM', null, null, null, null, null, null, null);
            TokenService.generateTokenByInstance(null, BBOOGLOBAL_API_PLATFORM);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('launchHappy: ' + e.getMessage());
        }
    }

    @IsTest
    static void launchHappyWithCache () {
        try {
            Test.startTest();
            TokenInformation GTSlocal = new TokenInformation('ALL', 'GTS', 'local');
            List<User> users = new List<User>([
                SELECT Id, USER_TXT_GlobalId__c, Name
                FROM User
                WHERE Id = :UserInfo.getUserId()
                LIMIT 1
            ]);
            User res = users.get(0);
            Map<String, String> mapGlobalIdToJwtToken = new Map<String, String>();
            String accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlc0d0c1NhbGVzZm9yY2VJbnRlcm5ldCJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IlNHUGd0c2Z1bjIxMTkxMSIsImlhdCI6MTYwNTU1MzY5OCwibmJmIjoxNjA1NTUzNjY4LCJleHAiOjE2MDU2NDAwOTgsImp0aSI6IjkyZWIwNWU3LTI4MjAtNDc3OC1hMjU3LWMwMmFlZmNiOGVhOCIsImNvdW50cnkiOiJHVFNORVhVU0JJQyIsImxvY2FsX3VpZCI6IlNHUGd0c2Z1bjIxMTkxMSIsImxvY2FsX3JlYWxtIjoiIn0.RQYyMz1JO-myYWZdRhHP2z9oxMZ0u_FNSwK_oCikM7VqH5hV2mEY4-jHL4Dc8NAZDOzeMif1jRmqPOIjba369bDA8zMDyVOclZ0vfIQx4Z4UQ3gobEeVbsMU78uVQ2xGYZmrv8zC6b38kz6OuYu6e3oohY0iN4xYEA9rrXpz-d0JLuI89FJIDV8hKjwHwfTmVq-KESi1qhPchq0fNPwoeOw-KH5aYhVkPCbTbydS4jmqi4u_hwJ_TmbnmNN9nrKK3-Gx-dceUMdQw8lpER5PMZ0-Up20c8DH_y7KvjpLTz5DhKGZkPnTiv38eGalq3tNzstTsmofhpXrKMkMJDH0xA';
            if(!Cache.Org.contains('mapGlobalIdToJwtToken')) {
                mapGlobalIdToJwtToken.put(res.USER_TXT_GlobalId__c, accessToken);
            } else {
                mapGlobalIdToJwtToken = (Map<String, String>) Cache.Org.get('mapGlobalIdToJwtToken');
                mapGlobalIdToJwtToken.put(res.USER_TXT_GlobalId__c, accessToken);
            }
            Integer orgCacheTtlSecs = 60000;
            Cache.Org.put('mapGlobalIdToJwtToken', mapGlobalIdToJwtToken, orgCacheTtlSecs);
            TokenInformation GTSnexus = new TokenInformation('ALL', 'GTS', 'nexus');
            TokenInformation SANDIGITALlocal = new TokenInformation('ALL', 'SANDIGITAL', 'local');
            Test.stopTest();
        } catch (Exception e) {
            System.debug('launchHappyWithCache: ' + e.getMessage());
        }
    }

    @IsTest
    static void launchUnHappy () {
        Test.startTest();
        try {
            TokenService.generateTokenByInstance(null, null);
        } catch (Exception e) {
            System.debug('launchUnHappy: ' + e.getMessage());
        }
        try {
            TokenInformation tk = new TokenInformation('ALL', null, null);
        } catch (Exception e) {
            System.debug('launchUnHappy: ' + e.getMessage());
        }
        try {
            TokenInformation tk = new TokenInformation('ALL', 'GTS', null);
        } catch (Exception e) {
            System.debug('launchUnHappy: ' + e.getMessage());
        }
        try {
            TokenInformation tk = new TokenInformation('ALL', null, 'local');
        } catch (Exception e) {
            System.debug('launchUnHappy: ' + e.getMessage());
        }
        try {
            TokenInformation tk = new TokenInformation(null, 'GTS', 'local');
        } catch (Exception e) {
            System.debug('launchUnHappy: ' + e.getMessage());
        }
        try {
            TokenInformation tk = new TokenInformation('ES', 'GTS', 'nexus');
        } catch (Exception e) {
            System.debug('launchUnHappy: ' + e.getMessage());
        }
        Test.stopTest();
    }

    @IsTest
    static void launchHappyNotSendAndEmptyData () {
        Test.startTest();
        try {
            TokenInformation tk = new TokenInformation('ES', 'SANDIGITAL', 'platform');
        } catch (Exception e) {
            System.debug('launchHappyNotSendAndEmptyData: ' + e.getMessage());
        }
        try {
            TokenInformation tk = new TokenInformation('UK', 'SANDIGITAL', 'platform');
        } catch (Exception e) {
            System.debug('launchHappyNotSendAndEmptyData: ' + e.getMessage());
        }
        Test.stopTest();
    }
}