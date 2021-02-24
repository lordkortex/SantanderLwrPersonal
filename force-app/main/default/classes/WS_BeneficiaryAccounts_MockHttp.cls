@isTest
global class WS_BeneficiaryAccounts_MockHttp{
    
    global class BasicResponse implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.TestResponse());
            res.setStatusCode(200);
            return res;
        }
    }
    
    global class BeneficiaryAccounts implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WS_BeneficiaryAccounts());
            res.setStatusCode(200);
            return res;
        }
    }
    
}