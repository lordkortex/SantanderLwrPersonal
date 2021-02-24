/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the swift payments
Test Class:     WRAPPER_BackFrontPain002_Test
History
<Date>			<Author>		<Description>
23/01/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class WRAPPER_MRTracker{
/*
    private String output;
    private String input;

    public String getOutput () {
        return this.output;
    }

    public WRAPPER_MRTracker(String filters){
        this.input=filters;
    }
*/
    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method that retrieves the data from the input source
    History
    <Date>			<Author>		<Description>
23/01/2020		R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------
    public void execute(){
        try {
            String response='["ES2601107298555588881589","ABNABRSP00010932840814P2","S3201239876456734210001","ES3221249896456634211479","GB19NWBK06161331926819"]';
            this.output = null;
            
            /*if(input!='' && input!='undefined' && input!=null && input=='status=Rejected'){
                response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade.de-c1.cloudhub.io/api/payments_tracker?'+input,'GET');
            }else{
                response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade.de-c1.cloudhub.io/api/payments_tracker','GET');
            }

            this.output = response;
            
            if(Test.isRunningTest()){
                throw new customException();
            }
                  
        } catch (Exception e) {
            System.debug('execute.CNT_WRAPPERSWIFTPAYMENT: ' + e.getMessage());
			throw new customException(e.getMessage());
        }
    }*/
}