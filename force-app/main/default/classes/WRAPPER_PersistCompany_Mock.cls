@isTest
global class WRAPPER_PersistCompany_Mock implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {        
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WRAPPER_PersistCompany());
        res.setStatusCode(200);
        return res;
    }
}