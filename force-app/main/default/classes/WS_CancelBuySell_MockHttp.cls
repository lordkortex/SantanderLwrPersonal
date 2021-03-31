@isTest
global class WS_CancelBuySell_MockHttp implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WS_CancelBuySell());
        res.setStatusCode(200);
        return res;
    }
}