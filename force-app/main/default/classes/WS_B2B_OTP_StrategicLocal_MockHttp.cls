@isTest
global class WS_B2B_OTP_StrategicLocal_MockHttp {
    global class OTP implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.GetOTP_Local());
            res.setStatusCode(200);
            return res;
        }
    }
}