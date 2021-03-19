@isTest
global class ServiceValidateAccount_MockHttp {
  global class BasicResponse implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
      HttpResponse res = new HttpResponse();
      res.setHeader('Content-Type', 'application/json');
      res.setBody(MockResponse.WS_B2B_ValidateAccount());
      res.setStatusCode(200);
      return res;
    }
  }
}
