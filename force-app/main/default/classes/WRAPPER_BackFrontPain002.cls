/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Wrapper class to retrieve and give format to the swift payments
Test Class:     WRAPPER_BackFrontPain002_Test
History
<Date>			<Author>		<Description>
23/01/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class WRAPPER_BackFrontPain002{
    /*

    private String output;
    private String input;
    private Boolean pain;

    public String getOutput () {
        return this.output;
    } 

    public WRAPPER_BackFrontPain002(Boolean pain,String filters){
        this.pain=pain;
        this.input=filters;
    }

    public class Pain002{
        public List<Acc> accounts;
    }
    
    public class Acc {
        public String accountName;
        public String BIC;
        public String channel;
        public String pain002;
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
            //String response='[{"account": "ES2601107298555588881589","bic": "BRASBRRJIBR", "channel":"H2H"},{"account": "ABNABRSP00010932840814P2","bic": "BPOALILIT", "channel":"H2H"},{"account": "S3201239876456734210001","bic": "TPBKUS6L", "channel":"SFTP"},{"account": "ES3221249896456634211479","bic": "EWBCPHMM", "channel":"H2H"},{"account": "GB19NWBK06161331926819","bic": "BPOALILIT", "channel":"EBICS"},{"account": "S3201299188387734210020","bic": "BRASBRRJIBR", "channel":"Otros"},{"account": "ABNABRSP15627364561726P2","bic": "BPOALILIT", "channel":"SFTP"},{"account": "GB19NWBK06166178293876","bic": "TPBKUS6L", "channel":"Editran"}]';
            this.output = '';
            String response='';
             
            if(input!='' && input!='undefined' && input!=null){
                response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/accounts/aaaa/pain002?active='+pain+'&company_id='+input,'GET');
                
                /*if(res!=''){
                    List<pain002> result= (List<Pain002>)JSON.deserialize(res,List<Pain002>.class); 
                    System.debug(result);
                    for(Acc x  :result[0].accounts){
                        response+='{"accountName":"'+x.accountName+'","BIC":"'+x.BIC+'","channel":"'+x.channel+'","pain002":"'+x.pain002+'"},';
                    }
    
                    response=response.removeEnd(',')+']';
                    
                }else{
                    response='';
                }
            }

            this.output = response;
            
        } catch (Exception e) {
            System.debug('execute.CNT_WRAPPERSWIFTPAYMENT: ' + e.getMessage());
			throw new customException(e.getMessage());
        }
    }*/
}