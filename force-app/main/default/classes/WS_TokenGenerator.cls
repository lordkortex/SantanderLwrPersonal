@RestResource(urlMapping='/TokenGenerator/*')
global with sharing class WS_TokenGenerator {

    /* @HttpGet
    global static String generateToken () {
        RestRequest restReq = RestContext.request;
        String countryCode = restReq.params.get('countryCode');
        String platform = restReq.params.get('platform');
        String userType = restReq.params.get('userType');
        String subject = restReq.params.get('subject');
        String country = restReq.params.get('country');
        String local_uid = restReq.params.get('local_uid');
        String local_realm = restReq.params.get('local_realm');
        String aud = restReq.params.get('aud');
        String sec_mode = restReq.params.get('sec_mode');
        TokenInformation tokenInformation = new TokenInformation(countryCode, platform, userType, subject, country, local_uid, local_realm, aud, sec_mode);
        Map<String, String> token = new Map<String, String>();
        token = tokenService.generateTokenByInstance(false, tokenInformation);
        String globalId = new List<String>(token.keySet())[0];
        String accessToken = token.get(globalId);
        return accessToken;
    } */

    @HttpPost
    global static Map<String, String> generateSignatureHeader (String paymentId, String bodyString, String country) {
        Map<String, String> response = new Map<string, String>();
        RestRequest restReq = RestContext.request;
        if (paymentId == null) {
            paymentId = '';
        }
        try {
            if (String.isBlank(bodyString)) {
                throw new CustomException('Need a body to generate a header.');
            }
            Auth.JWT jwt = new Auth.JWT();            
            jwt.setIss(System.Label.jwtIss);
            Map<String, String> claims = new Map<String, String>();
            claims.put('payment_id', paymentId);
            claims.put('hd', bodyString);
            claims.put('nonce', paymentId);
            claims.put('alg', 'SHA256');
            jwt.setAdditionalClaims(claims);
            jwt.setValidityLength(86400);
            Auth.JWS signedToken = new Auth.JWS(jwt, System.Label.certificateName);
            System.debug(signedToken);
            System.debug(signedToken.getCompactSerialization());
            response.put('status', 'OK');
            response.put('value', signedToken.getCompactSerialization());
        } catch (Exception e) {
            response.put('status', 'KO');
            response.put('error', e.getMessage());
            response.put('value', null);
        }
        return response;
    }
}