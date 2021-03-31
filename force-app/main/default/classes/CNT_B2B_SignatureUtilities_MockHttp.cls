@isTest
global class CNT_B2B_SignatureUtilities_MockHttp  {
    global class Signature implements HttpCalloutMock{
	    global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.SignatureStructure());
            res.setStatusCode(200);
            return res;
    	}
     }
    global class BasicResponse implements HttpCalloutMock{
	    global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.TestResponse());
            res.setStatusCode(200);
            return res;
    	}
     }
    
    global class StoreSignature implements HttpCalloutMock{
	    global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.storeSignature());
            res.setStatusCode(200);
            return res;
    	}
     }
}