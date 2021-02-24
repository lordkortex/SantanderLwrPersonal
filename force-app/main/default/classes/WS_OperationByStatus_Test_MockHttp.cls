@isTest
global class WS_OperationByStatus_Test_MockHttp implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WS_OperationByStatus());
        res.setStatusCode(200);
        return res;
    }
}