public class CNT_OBD_DataToken {
    
    public static String generateDataToken(Object data)
    {
        Auth.JWT jwt = new Auth.JWT();
        jwt.setIss(System.Label.jwtIss);
        Map<String, Object> claims = new Map<String, Object>();
        //Object deserializedJSON = (Object) JSON.deserializeUntyped(data);
        
        Blob targetBlob = Blob.valueOf(String.valueOf(data));
        Blob hash = Crypto.generateDigest('SHA-256', targetBlob);
        claims.put('hd', EncodingUtil.convertToHex(hash));
        
        //claims.put('hd', Global_Utilities.encryptData(String.valueOf(data)));
        jwt.setAdditionalClaims(claims);
        jwt.setValidityLength(86400);
        Auth.JWS signedToken = new Auth.JWS(jwt, System.Label.certificateName);
        System.debug(signedToken.getCompactSerialization());
        return  signedToken.getCompactSerialization();
    }
}