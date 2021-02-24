@isTest
global class CNT_UsersController_MockHttp implements HttpCalloutMock{
    
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WRAPPER_Login());
        res.setStatusCode(200);
        return res;
    }
    
}