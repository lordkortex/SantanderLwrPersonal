@isTest
global class CNT_PaymentsPaymentDetail_MockHttp {
    
    global class BasicResponse implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.TestResponse());
            res.setStatusCode(200);
            return res;
        }
    }
    
    global class Structure implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.SignatureStructure());
            res.setStatusCode(200);
            return res;
        }
    }
    
}