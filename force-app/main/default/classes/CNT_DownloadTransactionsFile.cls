/*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Wrapper class to retrieve and create and excel file to 
                    download transactions data
    Test Class:     TO DO
    History
    <Date>			<Author>		    <Description>
    27/04/2020      Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_DownloadTransactionsFile {
    
    private String output;
    private String input;
    private String applicationName;

    public CNT_DownloadTransactionsFile(String input) {
        this.input=input;
    }
    
    public CNT_DownloadTransactionsFile(String input, String applicationName) {
        this.input=input;
        this.applicationName=applicationName;
    }

    public String getOutput () {
        return this.output;
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
            String params = this.input;
        
            this.output = null;
            
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();

            if(this.applicationName == 'oneTrade'){
                configWs = CNT_ApiConfiguration__c.getValues('CNT_OneT_Transactions_Search');
                Map<String, String> extraHeaders = new Map<String,String>{'Accept' => 'text/csv'};
                response = Global_IntegrationWrapper.launchHttp(params, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, extraHeaders);
            } else {
                configWs = CNT_ApiConfiguration__c.getValues('CNT_Transactions_Download');
                System.debug('params: ' + params);
                response = Global_IntegrationWrapper.launchHttp(params, configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
            }

            if (String.isNotBlank(response)) {
                //Generate the document
                ContentVersion cont = new ContentVersion();
                
                if(this.applicationName != 'oneTrade'){
                    FileIncome deserializedInvoices =(FileIncome)JSON.deserialize(response, FileIncome.class);
                    System.debug('Archivo a Descargar deserializado: ' + deserializedInvoices);
                    String jsonStr = deserializedInvoices.content;
            
                    //cont.Title = deserializedInvoices.filename.substring(0,deserializedInvoices.filename.length()-3)+'pdf';
                    cont.Title = deserializedInvoices.filename;
                    cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.xls'; 
                    cont.VersionData = EncodingUtil.base64Decode(jsonStr);
                } else {
                    cont.Title = 'transactions_' + Datetime.now().getTime();
					cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.csv';
					cont.VersionData = Blob.valueOf(response);
                }
                
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
            System.debug('execute.CNT_DownloadTransactionsFile: ' + e.getMessage());
			throw new customException(e.getMessage());
        }
    }
}