/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the swift payments
Test Class:     CNT_WRAPPERSWIFTPAYMENT_Test
History
<Date>			<Author>		<Description>
13/11/2019		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_WRAPPERSWIFTPAYMENT{

    private String output;
    private String input;

    public String getOutput () {
        System.debug('devuelvo');
        System.debug(this.output);

        return this.output;
    }

    public CNT_WRAPPERSWIFTPAYMENT(String filters){
        this.input=filters;
    }

    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method that retrieves the data from the input source
    History
    <Date>			<Author>		<Description>
    13/11/2019		R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/
    public void execute(){
        try {
            String response = '';
            this.output = null;
            
            /*if(input!='' && input!='undefined' && input!=null && input=='status=Rejected'){
                response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade.de-c1.cloudhub.io/api/payments_trackva nrizer?'+input,'GET');
            }else{
                response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade.de-c1.cloudhub.io/api/payments_tracker','GET');
            }*/
            if(input!=''){
                CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_WRAPPERSWIFTPAYMENT');

                response = Global_IntegrationWrapper.launchHttp(input,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
            }

            this.output = response;

        } catch (Exception e) {
            System.debug('execute.CNT_WRAPPERSWIFTPAYMENT: ' + e.getMessage());
			throw new customException(e.getMessage());
        }
    }
}