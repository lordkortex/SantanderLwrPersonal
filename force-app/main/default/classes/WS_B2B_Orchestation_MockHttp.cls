@isTest
global class WS_B2B_Orchestation_MockHttp {

    global class B2B_Orchestation implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WS_B2B_Orchestation());
            res.setStatusCode(200);
            return res;
        }
    }
    
}