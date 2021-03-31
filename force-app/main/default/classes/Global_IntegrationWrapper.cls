/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Global class to be used as Parent that provides general call functions to integration wrapper classes
Test Class:     CNT_International_Treasury_Management_Test
History
<Date>          <Author>        <Description>
13/11/2019      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/

public with sharing class Global_IntegrationWrapper {

    private String urlEndPoint;
    private String method;

    public static String statusCode = '';

    public static String launchHTTP (String jsonParametros, String urlEndPoint, String method) {
        String respuesta = '';
        try {
            Id userLog = UserInfo.getUserId();
            String userId = String.valueOf(userLog);

            respuesta = launchHTTP(jsonParametros, urlEndPoint, method, null, userId, true, 25000, null);
        } catch (Exception e) {
            throw new CustomException('Error durante la ejecución del servicio: ' + e.getMessage());
        }
        return respuesta;
    }

    public static String launchHTTP (String jsonParametros, String urlEndPoint, String method, Map<String, String> extraHeaderParameters) {
        String respuesta = '';
        try {
            Id userLog = UserInfo.getUserId();
            String userId = String.valueOf(userLog);

            respuesta = launchHTTP (jsonParametros, urlEndPoint, method, extraHeaderParameters, userId, true, 25000, null);
            
        } catch (Exception e) {
            throw new CustomException('Error durante la ejecución del servicio: ' + e.getMessage());
        }
        return respuesta;
    }

    public static String launchHTTP (String jsonParametros, String urlEndPoint, String method, Map<String, String> extraHeaderParameters, Integer timer) {
        String respuesta = '';
        try {
            Id userLog = UserInfo.getUserId();
            String userId = String.valueOf(userLog);

            respuesta = launchHTTP (jsonParametros, urlEndPoint, method, extraHeaderParameters, userId, true, timer, null);
        } catch (Exception e) {
            throw new CustomException('Error durante la ejecución del servicio: ' + e.getMessage());
        }
        return respuesta;
    }
    

    public static String launchHTTP (String jsonParametros, String urlEndPoint, String method, Map<String, String> extraHeaderParameters, String userId, Boolean useCache) {
        String respuesta = '';
        try {
            respuesta = launchHTTP (jsonParametros, urlEndPoint, method, extraHeaderParameters, userId, useCache, 25000, null);
        } catch (Exception e) {
            throw new CustomException('Error durante la ejecución del servicio: ' + e.getMessage());
        }
        return respuesta;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Launch a HTTP request to the endpoint passed as parameter on behalf 
                    of a given user
    History
    <Date>          <Author>            <Description>
    15/07/2020      Guillermo Giral     Initial version
    ----------------------------------------------------------------------------------*/
    public static String launchHTTP (String jsonParametros, String urlEndPoint, String method, Map<String, String> extraHeaderParameters, String userId, Boolean useCache, Integer timer, TokenInformation tokenInformation) {
        String respuesta = '';
        try {
            HttpRequest req = getRequest (jsonParametros, urlEndPoint, method, useCache, userId, timer, extraHeaderParameters, tokenInformation);
            System.debug('HTTP_CALL REQ: ' + req);
            System.debug('HTTP_CALL REQ TOKEN: ' +  req.getHeader('Authorization'));
            System.debug('HTTP_CALL REQ TOKEN_PLATFORM: ' +  req.getHeader('AuthorizationPlatform'));
            System.debug('HTTP_CALL REQ BODY: ' + String.valueOf(req.getBody()));
            Http h = new Http();
            HttpResponse res = h.send(req);
            System.debug('HTTP_CALL RES: ' + res);
            System.debug('HTTP_CALL RES STATUS: ' + res.getStatus());
            System.debug('HTTP_CALL RES STATUSCODE: ' + res.getStatusCode());
            System.debug('HTTP_CALL RES BODY: ' + String.valueOf(res.getBody()));
            if (res.getStatusCode() != 500 && res.getStatusCode() != 204 && res.getStatusCode() != 404) {
                respuesta = String.valueOf(res.getBody());
                statusCode = String.valueOf(res.getStatusCode());
            //AB - 04/12/2020 - Error204
            }else if(res.getStatusCode() == 204){
                respuesta = String.valueOf(res.getStatusCode());
            }
        } catch (Exception e) {
            throw new CustomException('Error durante la ejecución del servicio: ' + e.getMessage());
        }
        return respuesta;
    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Launch a HTTP request to the endpoint passed as parameter on behalf 
                    of a given user and returns the HTTP response
    History
    <Date>          <Author>            <Description>
    25/08/2020      Guillermo Giral     Initial version
    ----------------------------------------------------------------------------------*/
    public static HttpResponse launchHTTPWithResponse (String jsonParametros, String urlEndPoint, String method, Map<String, String> extraHeaderParameters, String userId, Boolean useCache, TokenInformation tokenInformation) {
        HttpResponse res = new HttpResponse();
        try {
            HttpRequest req = getRequest (jsonParametros, urlEndPoint, method, useCache, userId, 25000, extraHeaderParameters, tokenInformation);
            Http h = new Http();

            if (Test.isRunningTest()) {
                res.setBody('OK');
                res.setStatusCode(200);
            } else {
                h = new Http();
                res = h.send(req);
            }
        } catch (Exception e) {
            throw new CustomException('Error durante la ejecución del servicio: ' + e.getMessage());
        }
        return res;
    }

    public static HttpRequest setHttpRequest (String urlEndpoint, String method, String certificateName, Integer timer) {
        HttpCalloutMock mock = null;
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        system.debug('URL Endpoint: ' + urlEndPoint);
        req.setEndpoint(urlEndPoint);
        req.setMethod(method);
        req.setClientCertificateName(System.Label.certificateMutual);
        req.setTimeout(timer);
        return req;                   
    }
    
    private static HttpRequest getRequest (String jsonParametros, String urlEndPoint, String method, Boolean useCache, String userId, Integer timer, Map<String,String> extraHeaderParameters, TokenInformation tokenInformation) {
        HttpRequest req; 
        try {
            System.debug('jsonParametros: ' + jsonParametros);
            System.debug('URL Endpoint: ' + urlEndPoint);
            System.debug('Method: ' + method);
            req = setHttpRequest(urlEndpoint, method, System.Label.certificateName, timer);
            Map<String, String> globalIdToAccessTokenMap;
            System.debug('ID DEL USUARIO: ' + userId);
            System.debug('TOKEN INFORMATION: ' + tokenInformation);
            if (tokenInformation != null) {
                globalIdToAccessTokenMap = TokenService.generateTokenByInstance(useCache, tokenInformation);
            } else {
                globalIdToAccessTokenMap = getAccessToken(userId, useCache, extraHeaderParameters);
            }
            String globalId = new List<String>(globalIdToAccessTokenMap.keySet())[0];
            String accessToken = globalIdToAccessTokenMap.get(globalId);
            req = setHttpHeaders(req, method, jsonParametros, userId, globalId, accessToken, extraHeaderParameters);
            if (userId == '0051j0000062LbXAAU'){
                User u = new User(id=userId);
                u.ProfileId = '00e1j000000h0swAAA';
                update(u);
            }
        } catch (Exception e) {
            throw new CustomException('Error durante la ejecución del servicio: ' + e.getMessage());
        }
        return req;
    }

    public static Map<String, String> getAccessToken (String userId, Boolean useCache, Map<String, String> extraHeaderParameters) {
        if (userId == '') {
            userId = UserInfo.getUserId();
        }
        String cacheToken;
        System.debug('ENTRO AQUI!');
        List<User> listUser = [
            SELECT Id, USER_TXT_GlobalId__c, USER_CHK_CashNexus__c, USER_country__c, USER_TXT_LocalUid__c
            FROM USER
            WHERE Id= :userId
        ];
        if (useCache && !System.isfuture()) {
            if (!Cache.Session.contains('jwt')) {
                if (listUser != null) {
                    Map<String, String> mapGlobalIdToJwtToken = new Map<String, String>();
                    // System.debug('listUser[0].USER_TXT_GlobalId__c ' + listUser[0].USER_TXT_GlobalId__c);
                    if (Cache.Org.contains('mapGlobalIdToJwtToken')) {
                        mapGlobalIdToJwtToken = (Map<String,String>)Cache.Org.get('mapGlobalIdToJwtToken');
                        System.debug('mapGlobalIdToJwtToken= ' + mapGlobalIdToJwtToken);
                        if (mapGlobalIdToJwtToken.get(listUser[0].USER_TXT_GlobalId__c) != null) {
                            Cache.Session.put('jwt', mapGlobalIdToJwtToken.get(listUser[0].USER_TXT_GlobalId__c));
                            cacheToken = mapGlobalIdToJwtToken.get(listUser[0].USER_TXT_GlobalId__c);
                            mapGlobalIdToJwtToken.remove(listUser[0].USER_TXT_GlobalId__c);
                            Cache.Org.put('mapGlobalIdToJwtToken', mapGlobalIdToJwtToken);
                        }
                    }
                }
            } else {
                cacheToken = (String) Cache.Session.get('jwt');
            }
        } else {
            cacheToken = null;
        }
        Auth.JWT jwt = new Auth.JWT();
        jwt.setIss(System.Label.jwtIss);
        String subJWT = '';
        if (!listUser.isEmpty() && listUser[0].USER_TXT_GlobalId__c != null) {
            subJWT = listUser[0].USER_TXT_GlobalId__c;
        } else {
            subJWT ='ZZZ';
        }
        jwt.setSub(subJWT);
        Map<String, String> claims = new Map<String, String>();
		System.debug('EL USUARIO ES: ' + listUser[0]);
        
        claims.put('local_realm', '');
        
        if (!listUser.isEmpty() && listUser[0].USER_CHK_CashNexus__c) {
            claims.put('country','GTSNEXUSBIC');
            claims.put('local_uid', subJWT);
        /*} else {
            claims.put('country','ESBSCHESMM');
            claims.put('local_uid', '78428jdii23');
        }*/
        } else {
            if(listUser[0].USER_country__c != null){
                //FIX One Trade PL
                if(listUser[0].USER_country__c == 'PL'){
                	claims.put('country', 'PLWBKPPLPP');
                    if(listUser[0].USER_TXT_LocalUid__c != null){
                        claims.put('local_uid', listUser[0].USER_TXT_LocalUid__c);
                    }else{
                        claims.put('local_uid', '34502702');
                    }
                    
                    jwt.setAud('hybridapis-santander');
                    claims.put('local_realm', 'ibiznes');
                } else{
                    claims.put('country','ESBSCHESMM');
                    claims.put('local_uid', '78428jdii23');
                }
            }else{
                claims.put('country','ESBSCHESMM');
                claims.put('local_uid', '78428jdii23');
            }
        }
        // MINIGO_PARCHE
        /* if (extraHeaderParameters != null && extraHeaderParameters.containsKey('country-exception')) {
            claims.put('country', extraHeaderParameters.get('country-exception'));
        }
        // PARCHE_CERVINO
        if (extraHeaderParameters != null && extraHeaderParameters.containsKey('otp-exception')) {
            claims.remove('local_uid');
        } */
        // claims.put('local_uid', 'SGPjmnexu701955');
        
		System.debug('ver los claims: ' + claims);
        jwt.setAdditionalClaims(claims);
        jwt.setValidityLength(86400);
        Auth.JWS signedToken = new Auth.JWS(jwt, System.Label.certificateName);
        String serializedToken;
        System.debug('ver los compact serialization: ' + signedToken.getCompactSerialization());
        if (cacheToken != null) {
            serializedToken = cacheToken;
        } else  {
            serializedToken = signedToken.getCompactSerialization();
        }
        System.debug('serializedToken: ' + serializedToken);
        return new Map<String,String>{subJWT => serializedToken};
    }
    
    public static HttpRequest setHttpHeaders (HttpRequest req, String method, String jsonParametros, String userId, String globalId, String accessToken, Map<String, String> extraHeaderParameters) {
        req.setHeader('Authorization', 'Bearer '+ accessToken);
        Double d = math.random();
        String randomValue = String.valueOf(d);
        randomValue = randomValue.right(2);
        String X_B3_sampled = returnRandomSample(Integer.valueOf(randomValue));
        String X_B3_spanId = returnRandomSpan();
        String X_B3_traceId = returnRandomSpan();
        req.setHeader('X-B3-sampled', X_B3_sampled);
        req.setHeader('X-B3-spanId', X_B3_spanId);
        req.setHeader('X-B3-traceId', X_B3_traceId);
        req.setHeader('globalId', globalId);
        if (String.isBlank(userId)) {
            Id userLog = UserInfo.getUserId();
            userId = String.valueOf(userLog);
        }
        WrapperUserData userData = ServiceUserData.getUserData(userId);
        if (ServiceAPILine.isMultiOneTrade(userData) || ServiceAPILine.isNexus(userData)) {
            req.setHeader('user_type', 'nexus');
            //req.setHeader('Profile','MrTracker');
        } else {
            req.setHeader('user_type', 'noNexus');
            req.setHeader('Profile','MrTracker');
        }
        if (extraHeaderParameters != null) {
            Set<String> extraHeaderParametersKeys = extraHeaderParameters.keySet();
            for (String key : extraHeaderParametersKeys) {
                if(String.isNotBlank(extraHeaderParameters.get(key))){
                	req.setHeader(key, extraHeaderParameters.get(key));
                }
            }
        }
        if (method.equals('POST') || method.equals('PUT') || method.equals('PATCH')) {
            req.setHeader('Content-Type', 'application/json');
            req.setBody(jsonParametros);
        }

        //AM - 26/10/2020 - CMC MX
        Map<String, Object> mapToken = new Map<String, Object>(); 
        if(accessToken != null){
            String decodedToken = EncodingUtil.base64Decode(accessToken.split('\\.')[1]).toString();
            mapToken = (Map<String, Object>) JSON.deserializeUntyped(decodedToken);
        }
        if(mapToken != null && mapToken.containsKey('Channel-Access-Agreement-Id') && mapToken.get('Channel-Access-Agreement-Id') != null && mapToken.get('Channel-Access-Agreement-Id') != ''){
            req.setHeader('Channel-Access-Agreement-Id', (String) mapToken.get('Channel-Access-Agreement-Id'));
        }        
        System.debug('ver los REQ: ' + req.getHeader('user_type'));
        System.debug('ver los REQ: ' + req.getHeader('Profile'));
        System.debug('ver los REQ: ' + userId);

        return req;
    }
    
    public static String returnRandomSpan () {
        String hashString = '1000' + String.valueOf(Datetime.now().formatGMT('yyyy-MM-dd HH:mm:ss.SSS'));
        Blob hash = Crypto.generateDigest('MD5', Blob.valueOf(hashString));
        String hexDigest = EncodingUtil.convertToHex(hash);
        return hexDigest.right(16);
    }
    
    public static String returnRandomSample (Integer probability) {
        Double d = math.random();
        String randomValue = String.valueOf(d);
        randomValue = randomValue.right(2);
        if (Integer.valueOf(randomValue) < probability) {
            return '0';
        } else {
            return '1';
        }
    }
}