@isTest
global class CNT_MovementHistoryExtrac_MockHttp implements HttpCalloutMock{
    
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WRAPPER_ExtractsData());
        res.setStatusCode(200);
        return res;
    }
    
}