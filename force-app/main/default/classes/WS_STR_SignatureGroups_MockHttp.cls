@isTest
global class WS_STR_SignatureGroups_MockHttp {

    global class getGroupsResponse implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WS_STR_SignatureGroups());
            res.setStatusCode(200);
            return res;
        }
    }
    
}