@isTest
global class WS_TransfersBeneficiaries_MockHttp implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WS_TransfersBeneficiaries());
        res.setStatusCode(200);
        return res;
    }
    
      global class OperationsResponse implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WS_TransfersBeneficiariesResponse());
            res.setStatusCode(200);
            return res;
        }
      }
    
}