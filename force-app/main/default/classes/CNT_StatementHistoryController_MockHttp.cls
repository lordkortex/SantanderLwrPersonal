@isTest
global class CNT_StatementHistoryController_MockHttp {

	global class GlobalPosition implements HttpCalloutMock {
  	  	global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.CNT_GlobalPositionController());
            res.setStatusCode(200);
            return res;
    }
}

	global class StatementList implements HttpCalloutMock {
   	 	global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WRAPPER_StatementList());
            res.setStatusCode(200);
            return res;
     }
    }

   global class AccountTransactionSearch implements HttpCalloutMock {
   		global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WRAPPER_AccountTransactionSearch());
            res.setStatusCode(200);
            return res;
     }
    }
    
    
}