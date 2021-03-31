@isTest
global class CNT_AccountsParent_MockHttp implements HttpCalloutMock {
    
	    global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.SignatureStructure());
            res.setStatusCode(200);
            return res;
    }
}