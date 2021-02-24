@isTest
global class WS_Attributions_MockHttp implements HttpCalloutMock{

    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WS_Attributions());
        res.setStatusCode(200);
        return res;
    }
    
}