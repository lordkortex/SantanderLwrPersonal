@isTest
global class CNT_SwiftPaymentTable_MockHttp implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.CNT_SwiftPaymentTable());
        res.setStatusCode(200);
        return res;
    }

}