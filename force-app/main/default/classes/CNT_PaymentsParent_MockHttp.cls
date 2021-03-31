@isTest
global class CNT_PaymentsParent_MockHttp {
    
    global class BasicResponse implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.TestResponse());
            res.setStatusCode(200);
            return res;
        }
    }
    
    global class OperationsList implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WRAPPER_OperationsList());
            res.setStatusCode(200);
            return res;
        }
    }
    
}