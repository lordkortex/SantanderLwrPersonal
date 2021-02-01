@isTest
global class CNT_MovementHistoryParent_MockHttp implements HttpCalloutMock{
    
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.CNT_MovementHistoryDataWrapper());
        res.setStatusCode(200);
        return res;
    }
    
}