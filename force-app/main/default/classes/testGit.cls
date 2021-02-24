public with sharing class testGit{

    public String test(){
         /*HttpRequest req = new HttpRequest();
         Http http = new Http();
         String resBody = '';

         req.setEndpoint('http://hellomule-api-services.us-e2.cloudhub.io/hello');
         req.setMethod('GET');
         HTTPResponse res = http.send(req);
         resBody = String.valueOf(res.getBody());
         System.debug('##### DELOITTE DEV ===>>> RESPONSE : ' + res);
         return resBody;*/
        
         String response = Global_IntegrationWrapper.launchHttp('','http://hellomule-api-services.us-e2.cloudhub.io/hello','GET');
        return response;       
    }
    //SNJ
    public String listaCuentas(String globalId){
        /*HttpRequest req = new HttpRequest();
        Http http = new Http();
        String resBody = '';
        //req.setEndpoint('https://e-onetrade.de-c1.cloudhub.io/api/'+globalId+'/accounts');

        
        req.setEndpoint('https://e-onetrade.de-c1.cloudhub.io/api/accounts/poc');
        req.setMethod('GET');
        HTTPResponse res = http.send(req);
        resBody = String.valueOf(res.getBody());
        System.debug('##### DELOITTE DEV ===>>> resBody hoy: ' + resBody);
        return resBody;  */
        String response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade.de-c1.cloudhub.io/api/accounts/poc','GET');
        return response;       
    }
    //SNJ Sprint 4 08/01/2020
    public String listaCuentasAyer(String globalId){
        /*HttpRequest req = new HttpRequest();
        Http http = new Http();
        String resBody = '';
        req.setEndpoint('https://e-onetrade.de-c1.cloudhub.io/api/'+globalId+'/accounts/nx');
        req.setMethod('GET');
        HTTPResponse res = http.send(req);
        resBody = String.valueOf(res.getBody());
        System.debug('##### DELOITTE DEV ===>>> resBody ayer: ' + resBody);
        return resBody; */
        
        
         String response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade.de-c1.cloudhub.io/api/'+globalId+'/accounts/nx','GET');
        return response; 
    }
    public String listaDePagosSwift(){
         /*HttpRequest req = new HttpRequest();
         Http http = new Http();
         String resBody = '';

         req.setEndpoint('http://e-onetrade.de-c1.cloudhub.io/api/payments_tracker');
         req.setMethod('GET');
         HTTPResponse res = http.send(req);
         //System.debug('##### DELOITTE DEV ===>>> res.getBody(): ' + res.getBody());
         resBody = String.valueOf(res.getBody());
         //System.debug('##### DELOITTE DEV ===>>> resBody: ' + resBody);
         return resBody;*/
        String response = Global_IntegrationWrapper.launchHttp('','http://e-onetrade.de-c1.cloudhub.io/api/payments_tracker','GET');
        return response; 
    }     

    public String detallePagoSwift(String uetr, String agent){
        
          String response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/payments_tracker/'+uetr+'?agent='+agent,'GET');
         return response;
    }  
    
    public String testJWT(){
        /* HttpRequest req = new HttpRequest();
         Http http = new Http();
         String resBody = '';

         req.setEndpoint('callout:testJWT/payments_tracker');
         req.setMethod('GET');
         HTTPResponse res = http.send(req);
         //System.debug('##### DELOITTE DEV ===>>> res.getBody(): ' + res.getBody());
         resBody = String.valueOf(res.getBody());
         //System.debug('##### DELOITTE DEV ===>>> resBody: ' + resBody);
         return resBody;
        */
          String response = Global_IntegrationWrapper.launchHttp('','callout:testJWT/payments_tracker','GET');
        return response; 
    }
    /*
    public String testJWT2(){
        Map<String,Map<String,Object>> claims = new Map<String,Map<String,Object>>();
        Map<String,Object> resource = new Map<String,Object>();
        resource.put('question',1209);
        claims.put('resource',resource);
        
        Auth.JWT jwt = new Auth.JWT();
        jwt.setIss('testJWTIssuer');
        jwt.setSub('User=0051j000002MS3r');
        
        jwt.setAdditionalClaims(claims);
        Auth.JWS signedToken = new Auth.JWS(jwt, 'SelfSignedCert_02Oct2019_144111');
        String serializedToken = signedToken.getCompactSerialization();
        System.debug('serializedToken:  ' + serializedToken );
        HttpRequest req = new HttpRequest();
         Http http = new Http();
         String resBody = '';

         req.setEndpoint('https://e-onetrade.de-c1.cloudhub.io/api/payments_tracker');
         req.setMethod('GET');
         String authorizationHeader = 'Bearer ' +  serializedToken ;

         req.setHeader('Authorization', authorizationHeader );

         HTTPResponse res = http.send(req);
         //System.debug('##### DELOITTE DEV ===>>> res.getBody(): ' + res.getBody());
         resBody = String.valueOf(res.getBody());
         //System.debug('##### DELOITTE DEV ===>>> resBody: ' + resBody);
         return resBody; 
        
           String response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade.de-c1.cloudhub.io/api/payments_tracker','GET');
        return response; 
    }
    */
      public String testFichero(){
         /*HttpRequest req = new HttpRequest();
         Http http = new Http();
         String resBody = '';

         req.setEndpoint('https://e-onetrade-fichero.de-c1.cloudhub.io/api/fichero');
         req.setMethod('GET');
         HTTPResponse res = http.send(req);
         resBody = String.valueOf(res.getBody());
         System.debug('##### DELOITTE DEV ===>>> RESPONSE : ' + res);
         return resBody;*/
          
           String response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade-fichero.de-c1.cloudhub.io/api/fichero','GET');
        return response; 

    }
    
        public String inicioNexus(){
        /*HttpRequest req = new HttpRequest();
        Http http = new Http();
        String resBody = '';
        req.setEndpoint('https://s-gtscore-cert.de-c1.cloudhub.io/nexus/inicio');
        req.setMethod('GET');
        HTTPResponse res = http.send(req);
        resBody = String.valueOf(res.getBody());
        System.debug('##### DELOITTE DEV ===>>> resBody ayer: ' + resBody);
        return resBody; */
            
             String response = Global_IntegrationWrapper.launchHttp('','https://s-gtscore-cert.de-c1.cloudhub.io/nexus/inicio','GET');
        return response; 
    }
    
    public String pruebaDetalleDePago(String uetr){
        /*HttpRequest req = new HttpRequest();
        Http http = new Http();
        String resBody = '';
        req.setEndpoint('https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/payments_tracker/'+uetr);
        req.setMethod('GET');
        HTTPResponse res = http.send(req);
        resBody = String.valueOf(res.getBody());
        System.debug('##### DELOITTE DEV ===>>> resBody ayer: ' + resBody);
        return resBody; */
        
        String response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/payments_tracker/'+uetr,'GET');
        return response; 
    }
}