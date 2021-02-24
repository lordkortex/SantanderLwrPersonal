@isTest
global class WS_B2B_OTP_Test_MockHttp implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WS_B2B_OTP());
        res.setStatusCode(200);
        return res;
    }
}