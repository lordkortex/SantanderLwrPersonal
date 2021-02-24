@isTest
global class ServiceFilterAccounts_MockHttp implements HttpCalloutMock{

    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WS_ChannelServices());
        res.setStatusCode(200);
        return res;
    }
    
}