@isTest
global class WS_Fraud_MockHttp implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WS_Fraud());
        res.setStatusCode(200);
        return res;
    }
}