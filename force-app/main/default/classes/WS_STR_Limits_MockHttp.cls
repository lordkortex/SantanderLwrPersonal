@isTest
global class WS_STR_Limits_MockHttp {

    global class getLimitsResponse implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WS_STR_Limits());
            res.setStatusCode(200);
            return res;
        }
    }
    
}