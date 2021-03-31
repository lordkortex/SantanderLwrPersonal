global class TokenService {

    global static Map<String, String> generateTokenByInstance (Boolean useCache, TokenInformation tokenInformation) {
        String globalId = null;
        String serializedToken = null;
        try {
            if (tokenInformation == null) {
                throw new CustomException('Need the tokenInformation object.');
            }
            if (tokenInformation.userData == null) {
                throw new CustomException('Need the user data.');
            }
            if (tokenInformation.mapClaims == null) {
                throw new CustomException('Need the claims data.');
            }
            /* String cacheToken = null;
            if (useCache != null && useCache == true) {
                cacheToken = getTokenFromCache(tokenInformation.userData);
            } */
            if (String.isNotBlank(tokenInformation.mapClaims.TXT_sub__c)) {
                globalId = tokenInformation.mapClaims.TXT_sub__c;
            } else {
                globalId = tokenInformation.userData.USER_TXT_GlobalId__c;
            }
            // if (String.isBlank(cacheToken)) {
            Auth.JWT jwt = new Auth.JWT();
            jwt.setIss(System.Label.jwtIss);
            if (tokenInformation.mapClaims.TXT_sub__c != null) {
                jwt.setSub(tokenInformation.mapClaims.TXT_sub__c);
            }
            Map<String, String> claims = new Map<String, String>();
            if (tokenInformation.mapClaims.TXT_country__c != null) {
                claims.put('country', tokenInformation.mapClaims.TXT_country__c);
            }
            if (tokenInformation.mapClaims.TXT_local_uid__c != null) {
                claims.put('local_uid', tokenInformation.mapClaims.TXT_local_uid__c);
            }
            if (tokenInformation.mapClaims.TXT_local_realm__c != null) {
                claims.put('local_realm', tokenInformation.mapClaims.TXT_local_realm__c);
            }
            if (tokenInformation.mapClaims.TXT_aud__c != null) {
                jwt.setAud(tokenInformation.mapClaims.TXT_aud__c);
            }
            if (tokenInformation.mapClaims.TXT_sec_mode__c != null) {
                claims.put('sec_mode', tokenInformation.mapClaims.TXT_sec_mode__c);
            }
            if (tokenInformation.mapClaims.TXT_realm__c != null) {
                claims.put('realm', tokenInformation.mapClaims.TXT_realm__c);
            }
            if (tokenInformation.mapClaims.TXT_country__c != 'GTSNEXUSBIC') {
                claims.put('platform_id', System.Label.jwtIss);
            }
            jwt.setAdditionalClaims(claims);
            jwt.setValidityLength(86400);
            Auth.JWS signedToken = new Auth.JWS(jwt, System.Label.certificateName);
            serializedToken = signedToken.getCompactSerialization();
            System.debug('TokenService_TokenAuth: ' +serializedToken );
            /* } else {
                serializedToken = cacheToken;
            } */
        } catch (Exception e) {
            System.debug('TokenInformation.getSub: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return new Map<String, String>{globalId => serializedToken};
    }

    global static String getTokenPlatform (String country) {
        String res = null;
        try {
            TokenInformation tokenInformation = new TokenInformation(country, 'SANDIGITAL', 'platform');
            System.debug(tokenInformation);
            Map<String, String> tokenMap = TokenService.generateTokenByInstance(null, tokenInformation);
            String globalId = new List<String>(tokenMap.keySet())[0];
            res = tokenMap.get(globalId);
        } catch (Exception e) {
            System.debug('WS_B2B_ValidateAccount.getTokenPlatform: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new AuraHandledException(e.getMessage()); 
        }
        return res;
    }

    /* global static String getTokenFromCache (User userData) {
        String res = null;
        if (!Cache.Session.contains('jwt')) {
            if (userData != null) {
                Map<String,String> mapGlobalIdToJwtToken = new Map<String,String>();
                if (Cache.Org.contains('mapGlobalIdToJwtToken')) {
                    mapGlobalIdToJwtToken = (Map<String,String>)Cache.Org.get('mapGlobalIdToJwtToken');
                    System.debug('mapGlobalIdToJwtToken= ' + mapGlobalIdToJwtToken);
                    if (mapGlobalIdToJwtToken.get(userData.USER_TXT_GlobalId__c) != null) {
                        Cache.Session.put('jwt', mapGlobalIdToJwtToken.get(userData.USER_TXT_GlobalId__c));
                        res = mapGlobalIdToJwtToken.get(userData.USER_TXT_GlobalId__c);
                        mapGlobalIdToJwtToken.remove(userData.USER_TXT_GlobalId__c);
                        Cache.Org.put('mapGlobalIdToJwtToken', mapGlobalIdToJwtToken);
                    }
                }
            }
        } else {
            res = (String) Cache.Session.get('jwt');
        }
        return res;
    } */
}