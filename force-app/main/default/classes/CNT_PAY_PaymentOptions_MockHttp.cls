@isTest
global class CNT_PAY_PaymentOptions_MockHttp implements HttpCalloutMock {
    
	    global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WRAPPER_PaymentDetail());
            res.setStatusCode(200);
            return res;
    }
}