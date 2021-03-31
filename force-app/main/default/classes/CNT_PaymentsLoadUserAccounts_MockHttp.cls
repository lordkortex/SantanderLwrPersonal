@isTest
global class CNT_PaymentsLoadUserAccounts_MockHttp {

	global class GlobalPosition implements HttpCalloutMock {
  	  	global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.CNT_GlobalPositionController());
            res.setStatusCode(200);
            return res;
    	}
	}
    
    global class BeneficiaryAccounts implements HttpCalloutMock {
  	  	global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WS_BeneficiaryAccounts());
            res.setStatusCode(200);
            return res;
    	}
	}
}