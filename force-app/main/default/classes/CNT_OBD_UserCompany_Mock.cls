@isTest
global class CNT_OBD_UserCompany_Mock implements HttpCalloutMock{
	global HTTPResponse respond(HTTPRequest req) {        
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('');
        res.setStatusCode(200);
        res.setStatus('OK');
        return res;
    }
}