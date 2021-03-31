@RestResource(urlMapping='/TokenGenerator/*')
global with sharing class WS_TokenGenerator {

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
            
            if(String.isNotBlank(country)){
                List<Country__mdt> countryNameList = [SELECT COU_PCK_signatureHeader__c FROM Country__mdt WHERE COU_PCK_ISO_Code2__c =: country LIMIT 1];
                if(!countryNameList.isEmpty()){
                    if(countryNameList[0].COU_PCK_signatureHeader__c == true){
                        claims.put('globalsignaturestatus', CNT_B2B_SignatureUtilities.getSignatoriesStatus(paymentId));
                    }
                }
            }
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