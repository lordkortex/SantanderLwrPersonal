global class TokenInformation {

    global static String NOT_SEND = 'NOT_SEND';
    global static String NEED_DATA = 'NEED_DATA';
    global static String EMPTY_DATA = 'EMPTY_DATA';
    global static String DEFAULT_GLOBAL_ID = 'ZZZ';

    @AuraEnabled
    global User userData {get;set;}
    @AuraEnabled
    global WrapperCacheToken userToken {get;set;}
    @AuraEnabled
    global parametrized_claims__c defaultClaims {get;set;}
    @AuraEnabled
    global parametrized_claims__c mapClaims {get;set;}

    global TokenInformation (String tokenCountry, String tokenPlatform, String tokenUser) {
        this(tokenCountry, tokenPlatform, tokenUser, null, null, null, null, null, null);
    }

    global TokenInformation (String tokenCountry, String tokenPlatform, String tokenUser, String sub) {
        this(tokenCountry, tokenPlatform, tokenUser, sub, null, null, null, null, null, null, null);
    }

    global TokenInformation (String tokenCountry, String tokenPlatform, String tokenUser, String sub, String country) {
        this(tokenCountry, tokenPlatform, tokenUser, sub, country, null, null, null, null, null, null);
    }

    global TokenInformation (String tokenCountry, String tokenPlatform, String tokenUser, String sub, String country, String local_uid) {
        this(tokenCountry, tokenPlatform, tokenUser, sub, country, local_uid, null, null, null, null, null);
    }

    global TokenInformation (String tokenCountry, String tokenPlatform, String tokenUser, String sub, String country, String local_uid, String local_realm) {
        this(tokenCountry, tokenPlatform, tokenUser, sub, country, local_uid, local_realm, null, null, null, null);
    }

    global TokenInformation (String tokenCountry, String tokenPlatform, String tokenUser, String sub, String country, String local_uid, String local_realm, String aud) {
        this(tokenCountry, tokenPlatform, tokenUser, sub, country, local_uid, local_realm, aud, null, null, null);
    }

    global TokenInformation (String tokenCountry, String tokenPlatform, String tokenUser, String sub, String country, String local_uid, String local_realm, String aud, String sec_mode) {
        this(tokenCountry, tokenPlatform, tokenUser, sub, country,local_uid, local_realm, aud, sec_mode, null, null);
    }

    global TokenInformation (String tokenCountry, String tokenPlatform, String tokenUser, String sub, String country, String local_uid, String local_realm, String aud, String sec_mode, String cmc) {
        this(tokenCountry, tokenPlatform, tokenUser, sub, country,local_uid, local_realm, aud, sec_mode, cmc, null);
    }

    global TokenInformation (String tokenCountry, String tokenPlatform, String tokenUser, String sub, String country, String local_uid, String local_realm, String aud, String sec_mode, String cmc, String realm) {
        if (String.isBlank(tokenPlatform)) {
            throw new CustomException('Need to inform the tokenPlatform parameter.');
        }
        if (String.isBlank(tokenUser)) {
            throw new CustomException('Need to inform the tokenUser parameter.');
        }
        setParameters(tokenCountry, tokenPlatform, tokenUser, sub, country,local_uid, local_realm, aud, sec_mode, cmc, realm);
    }

    global parametrized_claims__c setParameters (String tokenCountry, String tokenPlatform, String tokenUser, String sub, String country, String local_uid, String local_realm, String aud, String sec_mode, String cmc, String realm) {
        tokenCountry = recalculateTokenCountry(tokenCountry);
        this.defaultClaims = getDefaultClaims(tokenCountry, tokenPlatform, tokenUser, false);
        if (this.defaultClaims == null) {
            throw new CustomException('We need the default claims of the country to check the data.');
        }
        this.userData = getUserData();
        this.userToken = getUserToken();
        if (tokenPlatform == 'GTS') {
            if (tokenUser == 'local') {
                sub = getSub(sub);
                country = getCountry(tokenCountry, country);
                local_uid = getLocal_uid(local_uid);
                if (String.isBlank(local_realm)) {
                    local_realm = defaultClaims.TXT_local_realm__c;
                }
                if (String.isBlank(aud)) {
                    aud = defaultClaims.TXT_aud__c;
                }
                if (String.isBlank(sec_mode)) {
                    sec_mode = defaultClaims.TXT_sec_mode__c;
                }
                if (String.isBlank(realm)) {
                    realm = defaultClaims.TXT_realm__c;
                }
            } else if (tokenUser == 'nexus') {
                if (String.isBlank(sub)) {
                    if (userToken != null && String.isNotBlank(userToken.sub)) {
                        sub = userToken.sub;
                    } else if (userData != null && String.isNotBlank(userData.USER_TXT_GlobalId__c)) {
                        sub = userData.USER_TXT_GlobalId__c;
                    } else {
                        sub = DEFAULT_GLOBAL_ID;
                    }
                }
                if (String.isBlank(country)) {
                    if (userToken != null && String.isNotBlank(userToken.country)) {
                        country = userToken.country;
                    } else {
                        if (userData != null && userData.USER_CHK_CashNexus__c == true) {
                            country = defaultClaims.TXT_country__c;
                        } else {
                            country = 'ESBSCHESMM';
                        }
                    }
                }
                if (String.isBlank(local_uid)) {
                    if (userToken != null && String.isNotBlank(userToken.local_uid)) {
                        local_uid = userToken.local_uid;
                    } else {
                        if (userData != null && userData.USER_CHK_CashNexus__c == true) {
                            local_uid = userData.USER_TXT_GlobalId__c;
                        } else {
                            local_uid = '78428jdii23';
                        }
                    }
                }
                if (String.isBlank(local_realm)) {
                    local_realm = defaultClaims.TXT_local_realm__c;
                }
                if (String.isBlank(aud)) {
                    aud = defaultClaims.TXT_aud__c;
                }
                if (String.isBlank(sec_mode)) {
                    sec_mode = defaultClaims.TXT_sec_mode__c;
                }
                if (String.isBlank(realm)) {
                    realm = defaultClaims.TXT_realm__c;
                }
            }
        } else if (tokenPlatform == 'SANDIGITAL') {
            if (tokenUser == 'local') {
                sub = getSub(sub);
                country = getCountry(tokenCountry, country);
                local_uid = getLocal_uid(local_uid);
                if (String.isBlank(local_realm)) {
                    local_realm = defaultClaims.TXT_local_realm__c;
                }
                if (String.isBlank(aud)) {
                    aud = defaultClaims.TXT_aud__c;
                }
                if (String.isBlank(sec_mode)) {
                    sec_mode = defaultClaims.TXT_sec_mode__c;
                }
                if (String.isBlank(realm)) {
                    realm = defaultClaims.TXT_realm__c;
                }
            } else if (tokenUser == 'platform') {
                if (String.isBlank(sub)) {
                    sub = defaultClaims.TXT_sub__c;
                }
                if (String.isBlank(country)) {
                    country = defaultClaims.TXT_country__c;
                }
                if (String.isBlank(local_uid)) {
                    local_uid = defaultClaims.TXT_local_uid__c;
                }
                if (String.isBlank(local_realm)) {
                    local_realm = defaultClaims.TXT_local_realm__c;
                }
                if (String.isBlank(aud)) {
                    aud = defaultClaims.TXT_aud__c;
                }
                if (String.isBlank(sec_mode)) {
                    sec_mode = defaultClaims.TXT_sec_mode__c;
                }
                if (String.isBlank(realm)) {
                    realm = defaultClaims.TXT_realm__c;
                }
            }
        } else if (tokenPlatform == 'BBOO') {
            if (tokenUser == 'GTS_LOB') {
                sub = getBBOOIdentifier(sub);                
                country = getCountry(tokenCountry, country);
                local_uid = getBBOOIdentifier(local_uid);
                if (String.isBlank(local_realm)) {
                    local_realm = defaultClaims.TXT_local_realm__c;
                }
                if (String.isBlank(aud)) {
                    aud = defaultClaims.TXT_aud__c;
                }
                if (String.isBlank(sec_mode)) {
                    sec_mode = defaultClaims.TXT_sec_mode__c;
                }
                if (String.isBlank(realm)) {
                    realm = defaultClaims.TXT_realm__c;
                }
            } else if (tokenUser == 'GTS_GLOBAL') {
                if (String.isBlank(sub)) {
                    sub = defaultClaims.TXT_sub__c;
                }
                country = getCountry(tokenCountry, country);
                if (String.isBlank(local_uid)) {
                    local_uid = defaultClaims.TXT_local_uid__c;
                }
                if (String.isBlank(local_realm)) {
                    local_realm = defaultClaims.TXT_local_realm__c;
                }
                if (String.isBlank(aud)) {
                    aud = defaultClaims.TXT_aud__c;
                }
                if (String.isBlank(sec_mode)) {
                    sec_mode = defaultClaims.TXT_sec_mode__c;
                }
                if (String.isBlank(realm)) {
                    realm = defaultClaims.TXT_realm__c;
                }
            }
        }
        this.mapClaims = getMapClaims(sub, country, local_uid, local_realm, aud, sec_mode, cmc, realm);
        return this.mapClaims;
    }

    global String recalculateTokenCountry (String tokenCountry) {
        String res = null;
        if (tokenCountry == 'GB') {
            res = 'UK';
        } else {
            res = tokenCountry;
        }
        return res;
    }

    global String getBBOOIdentifier (String identifier) {
        String res = null;
        try {
            if (String.isBlank(identifier)) {
				if (userData != null && String.isNotBlank(userData.USER_TXT_GlobalId__c)) {
                    res = userData.USER_TXT_GlobalId__c;
                } else {
                    res = defaultClaims.TXT_sub__c;
                }
            } else {
                res = identifier;
            }
        } catch (Exception e) {
            System.debug('TokenInformation.getBBOOIdentifier: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }
    
    global String getSub (String sub) {
        String res = null;
        try {
            system.debug(this.userData);
            system.debug(userData);
            if (String.isBlank(sub)) {
                if (userToken != null && String.isNotBlank(userToken.sub)) {
                    res = userToken.sub;
                } else if (userData != null && String.isNotBlank(userData.USER_TXT_GlobalId__c)) {
                    res = userData.USER_TXT_GlobalId__c;
                } else {
                    res = defaultClaims.TXT_sub__c;
                }
            } else {
                res = sub;
            }
        } catch (Exception e) {
            System.debug('TokenInformation.getSub: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    global String getCountry (String tokenCountry, String country) {
        String res = null;
        try {
            if (String.isNotBlank(tokenCountry) && String.isNotBlank(country)) {
                if (country.length() >= 11) {
                    country = country.subString(0, 8);
                }
                res = tokenCountry + country;
            } else if (userToken != null && String.isNotBlank(userToken.country)) {
                res = userToken.country;
            } else {
                res =  defaultClaims.TXT_country__c;
            }
        } catch (Exception e) {
            System.debug('TokenInformation.getCountry: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    global String getLocal_uid (String local_uid) {
        String res = null;
        try {
            if (String.isBlank(local_uid)) {
                if (userToken != null && String.isNotBlank(userToken.local_uid)) {
                    res = userToken.local_uid;
                } else if (userData != null && String.isNotBlank(userData.USER_TXT_LocalUid__c)) {
                    res = userData.USER_TXT_LocalUid__c;
                } else if (userData != null && String.isNotBlank(userData.USER_TXT_GlobalId__c)) {
                    res = userData.USER_TXT_GlobalId__c;
                } else {
                    res = defaultClaims.TXT_local_uid__c;
                }
            } else {
                res = local_uid;
            }
        } catch (Exception e) {
            System.debug('TokenInformation.getLocal_uid: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    global User getUserData () {
        User res = null;
        try {
            res = Global_Utilities.getUserData(UserInfo.getUserId());
        } catch (Exception e) {
            System.debug('TokenInformation.getUserData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    global WrapperCacheToken getUserToken () {
        WrapperCacheToken res = null;
        try {
            String accessToken = null;
            if (!Cache.Session.contains('jwt')) {
                if (this.userData != null && this.userData.USER_TXT_GlobalId__c != null) {
                    Map<String, String> mapGlobalIdToJwtToken = new Map<String, String>();
                    if (Cache.Org.contains('mapGlobalIdToJwtToken')) {
                        mapGlobalIdToJwtToken = (Map<String, String>) Cache.Org.get('mapGlobalIdToJwtToken');
                        if (mapGlobalIdToJwtToken.get(this.userData.USER_TXT_GlobalId__c) != null) {
                            Cache.Session.put('jwt', mapGlobalIdToJwtToken.get(this.userData.USER_TXT_GlobalId__c));
                            accessToken = mapGlobalIdToJwtToken.get(this.userData.USER_TXT_GlobalId__c);
                            mapGlobalIdToJwtToken.remove(this.userData.USER_TXT_GlobalId__c);
                            Cache.Org.put('mapGlobalIdToJwtToken', mapGlobalIdToJwtToken);
                        }
                    }
                }
            } else {
                accessToken = (String) Cache.Session.get('jwt');
            }
            if (String.isNotBlank(accessToken)) {
                String decodedToken = EncodingUtil.base64Decode(accessToken.split('\\.')[1]).toString();
                res = (WrapperCacheToken) System.JSON.deserialize(decodedToken, WrapperCacheToken.class);
            }
        } catch (Exception e) {
            System.debug('TokenInformation.getUserToken: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    global parametrized_claims__c getMapClaims (String sub, String country, String local_uid, String local_realm, String aud, String sec_mode, String cmc, String realm) {
        parametrized_claims__c res = new parametrized_claims__c();
        try {
            if (sub == NOT_SEND) {
                sub = null;
            } else if (sub == EMPTY_DATA) {
                sub = '';
            } else if (sub == NEED_DATA) {
                throw new customException('sub needs a value.');
            }
            res.TXT_sub__c = sub;
            if (country == NOT_SEND) {
                country = null;
            } else if (country == EMPTY_DATA) {
                country = '';
            } else if (country == NEED_DATA) {
                throw new customException('country needs a value.');
            }
            res.TXT_country__c = country;
            if (local_uid == NOT_SEND) {
                local_uid = null;
            } else if (local_uid == EMPTY_DATA) {
                local_uid = '';
            } else if (local_uid == NEED_DATA) {
                throw new customException('local_uid needs a value.');
            }
            res.TXT_local_uid__c = local_uid;
            if (local_realm == NOT_SEND) {
                local_realm = null;
            } else if (local_realm == EMPTY_DATA) {
                local_realm = '';
            } else if (local_realm == NEED_DATA) {
                throw new customException('local_realm needs a value.');
            }
            res.TXT_local_realm__c = local_realm;
            if (aud == NOT_SEND) {
                aud = null;
            } else if (aud == EMPTY_DATA) {
                aud = '';
            } else if (aud == NEED_DATA) {
                throw new customException('aud needs a value.');
            }
            res.TXT_aud__c = aud;
            if (sec_mode == NOT_SEND) {
                sec_mode = null;
            } else if (sec_mode == EMPTY_DATA) {
                sec_mode = '';
            } else if (sec_mode == NEED_DATA) {
                throw new customException('sec_mode needs a value.');
            }
            res.TXT_sec_mode__c = sec_mode;
            if (realm == NOT_SEND) {
                realm = null;
            } else if (realm == EMPTY_DATA) {
                realm = '';
            } else if (realm == NEED_DATA) {
                throw new customException('realm needs a value.');
            }
            res.TXT_realm__c = realm;
        } catch (Exception e) {
            System.debug('TokenInformation.getMapClaims: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return res;
    } 

    global parametrized_claims__c getDefaultClaims (String tokenCountry, String tokenPlatform, String tokenUser, Boolean secondLap) {
        parametrized_claims__c res = null;
        try {
            if (String.isBlank(tokenCountry)) {
                tokenCountry = 'ALL';
            }
            if (secondLap == null) {
                secondLap = false;
            }
            List<parametrized_claims__c> result = new List<parametrized_claims__c>([
                SELECT Id, PCK_Token_Country__c, PCK_Token_Platform__c, PCK_Token_User__c, TXT_sub__c, TXT_country__c, TXT_local_uid__c, TXT_local_realm__c, TXT_aud__c, TXT_sec_mode__c, TXT_realm__c
                FROM parametrized_claims__c
                WHERE PCK_Token_Country__c = :tokenCountry
                AND PCK_Token_Platform__c = :tokenPlatform
                AND PCK_Token_User__c = :tokenUser
            ]);
            if (!result.isEmpty()) {
                res = result.get(0);
            } else {
                if (secondLap == false) {
                    res = getDefaultClaims('ALL', tokenPlatform, tokenUser, true);
                }
            }
        } catch (Exception e) {
            System.debug('TokenInformation.getDefaultClaims: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }

    global class WrapperCacheToken {
        @AuraEnabled 
        global String iss {get;set;}
        @AuraEnabled 
        global String sub {get;set;}
        @AuraEnabled 
        global String iat {get;set;}
        @AuraEnabled 
        global String nbf {get;set;}
        @AuraEnabled 
        global String exp {get;set;}
        @AuraEnabled 
        global String jti {get;set;}
        @AuraEnabled 
        global String country {get;set;}
        @AuraEnabled 
        global String local_uid {get;set;}

        global WrapperCacheToken () {
        }
    }
}