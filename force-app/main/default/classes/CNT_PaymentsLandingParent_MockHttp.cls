@isTest  
global class CNT_PaymentsLandingParent_MockHttp {

    global class BasicResponse implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.TestResponse());
            res.setStatusCode(200);
            return res;
        }
    }
    
    global class OperationsList implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(MockResponse.WRAPPER_OperationsList());
            res.setStatusCode(200);
            return res;
        }
    }
    
        global class PaymentsStatus implements HttpCalloutMock{
        global HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody(WRAPPER_PaymentsStatuses());
            res.setStatusCode(200);
            return res;
        }
    }
    
    public static String WRAPPER_PaymentsStatuses(){
        String res = '{'+
        '      \"paymentStatusList\": {['+
		'          {'+
		'            \"WRAPPER_PaymentsStatus\": {'+
		'              \"statusId\": 400,'+
		'              \"statusCod\": 200,'+
		'              \"numberOfRecords\": 3,'+
		'              \"statusName\": "Passed",'+
		'              \"parsedStatusName\": "Validation",'+
		'              \"statusDescription\": "Success",'+
		'              \"parsedStatusDescription\": "Succeeded"'+
		'            }'+
		'          },'+
        '        ]}'+
		'}';  
        return res;
    }
    
}