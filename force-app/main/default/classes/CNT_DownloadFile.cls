/*----------------------------------------------------------------------------------
Author:         Teresa Santos y Pablo Tejedor
Company:        Deloitte
Description:    Wrapper class to retrieve and give the file
Test Class:     CNT_WRAPPERSWIFTPAYMENT_Test
History
<Date>			<Author>		<Description>
11/12/2019		Teresa Santos y Pablo Tejedor    Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_DownloadFile{

    private String output;
    private String input;
    private Boolean isLastUpdate;
    private String order;
    private String currencyX;
    private String bookBalance;
    private String valueBalance;

    public String getOutput () {
        return this.output;
    }

    public CNT_DownloadFile ( Boolean isLastUpdate, String input, String order, String currencyX, String bookBalance, String valueBalance) {
        this.input=input;
        this.isLastUpdate=isLastUpdate;
        this.order=order;
        this.currencyX=currencyX;
        this.bookBalance=bookBalance;
        this.valueBalance=valueBalance;
    }

    public class FileIncome {
        public String content;
        public String filename;
    }
    
 

    /*----------------------------------------------------------------------------------
    Author:         Teresa Santos y Pablo Tejedor
    Company:        Deloitte
    Description:    Method that retrieves the data from the input source
    History
    <Date>			<Author>		<Description>
    11/12/2019		Teresa Santos y Pablo Tejedor     Initial version
    ----------------------------------------------------------------------------------*/
    public void execute(){
        try {
            String response = '';
            String accCode = this.input;
            String order= this.order;
        	String currencyX = this.currencyX;
        	String bookBalance = this.bookBalance;
        	String valueBalance = this.valueBalance;
            String finalEndPoint = '';
            this.output = null;
            
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();

            if(this.isLastUpdate){
                //configWs = CNT_ApiConfiguration__c.getValues('CNT_BalanceDownloadLU');
                //finalEndPoint = configWs.CNT_Endpoint__c;
            } else {
                configWs = CNT_ApiConfiguration__c.getValues('CNT_BalanceDownloadEOD');
                finalEndPoint = configWs.CNT_Endpoint__c.replace('{order}', order).replace('{currency}', currencyX).replace('{bookBalance}', bookBalance).replace('{valueBalance}', valueBalance);
			}
            response = Global_IntegrationWrapper.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);
            System.debug('Endpoint:  ' + finalEndPoint);
			if (Test.isRunningTest() ) {
                response='{"content": "JVBERi0xLjQKJfbk/N8KMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovVmVyc2lvbiAvMS40Ci9QYWdlcyAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovTWVkaWFCb3ggWzAuMCAwLjAgNTk1LjI3NTYzIDg0MS44ODk4XQovUGFyZW50IDIgMCBSCi9Db250ZW50cyA0IDAgUgovUmVzb3VyY2VzIDUgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggNDYyCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQ0KeJx1k8tu2zAQRff+Ci5bILJn+BxyR71sNbEcmHLgbRzbQLrsVtC/l0JSgGJSrQbU4", "filename": "a97e178b-5ef6-4e7b-be8c-e2f13227903b.pdf"}';
            } 

            if (String.isNotBlank(response)) {
                FileIncome deserializedInvoices =(FileIncome)JSON.deserialize(response, FileIncome.class);

                String jsonStr = deserializedInvoices.content;

                //Generate the document
                ContentVersion cont = new ContentVersion();
                //cont.Title = deserializedInvoices.filename.substring(0,deserializedInvoices.filename.length()-3)+'pdf';
                cont.Title = deserializedInvoices.filename;
                cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.xls';
                cont.VersionData = EncodingUtil.base64Decode(jsonStr);
                String title='';
                if(Schema.sObjectType.ContentVersion.isCreateable()){
                    insert cont;
                    title=cont.title;
                }
                List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where title =: title LIMIT 1]); 

                if(!doc.isEmpty()){
                    this.output = doc[0].Id;
                }else{
                    this.output = 'null';
                }
            }
   
        } catch (Exception e) {
            System.debug('execute.CNT_DownloadFile: ' + e.getMessage());
			throw new customException(e.getMessage());
        }
    }
}