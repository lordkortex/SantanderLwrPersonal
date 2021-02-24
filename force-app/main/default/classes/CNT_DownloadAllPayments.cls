/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    WRAPPER of download all payments
Test Class:     CNT_MRTrackerSearch_Testy
History
<Date>          <Author>        <Description>
17/03/2020      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_DownloadAllPayments {

    private String output;
    private String input;

    public String getOutput () {
        return this.output;
    }

    public CNT_DownloadAllPayments ( String input) {
        this.input=input;
    }

    public class FileIncome {
        public String copyOfPaymentList;
        public String filename;
    }
    

    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method that retrieves the data from the input source
    History
    <Date>			<Author>		<Description>
    11/12/2019		R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/
    public void execute(){
        try {
            String response = '';
            this.output = 'null';

            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadAllPayments');

            response = Global_IntegrationWrapper.launchHttp(input,configWs.CNT_Endpoint__c,configWs.CNT_HTTPMethod__c);
            
			if (Test.isRunningTest() ) {
                response='{"copyOfPaymentList": "JVBERi0xLjQKJfbk/N8KMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovVmVyc2lvbiAvMS40Ci9QYWdlcyAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovTWVkaWFCb3ggWzAuMCAwLjAgNTk1LjI3NTYzIDg0MS44ODk4XQovUGFyZW50IDIgMCBSCi9Db250ZW50cyA0IDAgUgovUmVzb3VyY2VzIDUgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggNDYyCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQ0KeJx1k8tu2zAQRff+Ci5bILJn+BxyR71sNbEcmHLgbRzbQLrsVtC/l0JSgGJSrQbU4", "filename": "a97e178b-5ef6-4e7b-be8c-e2f13227903b.pdf"}';
            } 

            if (String.isNotBlank(response)) {
                FileIncome deserializedInvoices =(FileIncome)JSON.deserialize(response, FileIncome.class);

                String jsonStr = deserializedInvoices.copyOfPaymentList;

                //Generate the document
                ContentVersion cont = new ContentVersion();
                cont.Title = deserializedInvoices.filename;
                cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.xml';
                cont.VersionData = EncodingUtil.base64Decode(jsonStr);
                if(Schema.sObjectType.ContentVersion.isCreateable()){
                    insert cont;
                }
                
                List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where title =: cont.Title ORDER BY CreatedDate DESC LIMIT 1]); 

                if(!doc.isEmpty()){
                    this.output = doc[0].Id;
                }else{
                    this.output = 'null';
                }
            }
        } catch (Exception e) {
            System.debug('execute.CNT_DownloadMT103: ' + e.getMessage());
			throw new customException(e.getMessage());
        }
    }
}