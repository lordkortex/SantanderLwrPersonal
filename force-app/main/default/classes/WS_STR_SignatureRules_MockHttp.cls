@isTest
global class WS_STR_SignatureRules_MockHttp {

    global class getRulesResponse implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WS_STR_SignatureRules());
            res.setStatusCode(200);
            return res;
        }
    }
    
}