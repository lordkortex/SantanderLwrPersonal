@isTest
global class WS_OperationsList_MockHttp implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WS_OperationsList());
        res.setStatusCode(200);
        return res;
    }
}