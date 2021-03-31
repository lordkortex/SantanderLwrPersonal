@isTest
global class WRAPPER_FunctionalLogs_Mock implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {        
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WRAPPER_FunctionalLogs());
        res.setStatusCode(200);
        res.setStatus('OK');
        return res;
    }
}