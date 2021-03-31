@isTest
global class TestClass_MockHttp implements HttpCalloutMock{
    
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.TestResponse());
        res.setStatusCode(200);
        return res;
    }
    
}