/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Class to test classes with mocks.
History
<Date>			<Author>		<Description>
13/12/2019		Joaquín Vera     Initial version
----------------------------------------------------------------------------------*/
@isTest
public with sharing class CNT_MultipleHTTPCalloutMock implements HttpCalloutMock{
    Map<String, HttpCalloutMock> requests;

	public CNT_MultipleHTTPCalloutMock() {
		this.requests = new Map<String, HttpCalloutMock>();
	}

	public CNT_MultipleHTTPCalloutMock(Map<String, HttpCalloutMock> requests) {
		this.requests = requests;
	}

	public HTTPResponse respond(HTTPRequest req) {
		HttpCalloutMock mock = requests.get(req.getEndpoint());
		if (mock != null) {
			return mock.respond(req);
		} else {
            return null;
		}
	}

	public void addRequestMock(String url, HttpCalloutMock mock) {
		requests.put(url, mock);
	}
}