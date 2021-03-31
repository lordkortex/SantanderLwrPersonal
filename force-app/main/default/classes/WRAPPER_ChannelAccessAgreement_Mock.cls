@isTest
global class WRAPPER_ChannelAccessAgreement_Mock implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {        
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WRAPPER_ChannelAccessAgreement());
        res.setStatusCode(200);
        return res;
    }
}