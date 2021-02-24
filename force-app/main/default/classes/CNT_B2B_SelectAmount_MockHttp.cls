@isTest
global class CNT_B2B_SelectAmount_MockHttp implements HttpCalloutMock {
    
	    global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WS_TransferFees());
            res.setStatusCode(200);
            return res;
    }
}