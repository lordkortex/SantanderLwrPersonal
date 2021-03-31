/*
    Author:         Andrea Martin
    Company:        Deloitte
    Description:    Test to get the details of one specific account 

    History:
    <Date>          <Author>            <Description>
    03/02/2021      Andrea Martin         Initial version
*/
@isTest
global class WS_GetMeAccountDetails_MockHttp implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(MockResponse.WS_GetMeAccountDetails());
        res.setStatusCode(200);
        return res;
    }
}