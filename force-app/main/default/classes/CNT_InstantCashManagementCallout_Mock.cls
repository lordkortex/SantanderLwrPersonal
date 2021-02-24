/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Mock Class to test the call of sending data to Mulesoft.
History
<Date>			<Author>		<Description>
13/12/2019		Joaquín Vera     Initial version
----------------------------------------------------------------------------------*/
@isTest
global with sharing class CNT_InstantCashManagementCallout_Mock implements HttpCalloutMock
{

    public static final string RESPONSEBODY = '{ '+
                                            '"data": {' +
                                            '"status": "ok"' +
                                            ' }' +
                                            '}';

    /*----------------------------------------------------------------------------------
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:   	Recieves a http request and returns a response.
    History
    <Date>			<Author>		<Description>
    26/12/2019		Joaquin Vera     Initial version
    ----------------------------------------------------------------------------------*/ 
    global HttpResponse respond(HttpRequest request)
    {

        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        
        if(!request.getBody().equals(''))
        {
            try
            {
                JSON.deserialize(request.getBody(), CNT_PaymentProcessWrapper.class);
                response.setStatusCode(200);
                response.setBody(RESPONSEBODY);
            } catch(Exception e)
            {
                response.setStatusCode(418);
            }
        } else
        {
            response.setStatusCode(418);
        }
        return response;
    }
}