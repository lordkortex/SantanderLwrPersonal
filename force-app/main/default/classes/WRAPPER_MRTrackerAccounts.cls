/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Wrapper class to retrieve and give MT103
Test Class:     WRAPPER_MRTrackerAccounts_Test
History
<Date>			<Author>		<Description>
22/01/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
global with sharing class WRAPPER_MRTrackerAccounts{
	/*
    private String output;
    private String input;

    global String getOutput () {
        return this.output;
    }

    global WRAPPER_MRTrackerAccounts ( String input) {
        this.input=input;
    }

    global class FileIncome {
        global Header header;
        global Body body;
    }
    
    global class Header {
        global String id;
    }

    global class Body {
        global String mt103CopyFile;
    }*/

    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method that retrieves the data from the input source
    History
    <Date>			<Author>		<Description>
    22/01/2020		R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------
    global void execute(){
        try {
            String response = '';
            this.output = null;

            response = Global_IntegrationWrapper.launchHttp('','https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/payments_tracker/'+input+'/messages_mt103?agent=Example','GET');

            if (String.isNotBlank(response)) {
                FileIncome deserializedInvoices =(FileIncome)JSON.deserialize(response, FileIncome.class);

                String jsonStr = deserializedInvoices.body.mt103CopyFile;


                //Generate the document
                ContentVersion cont = new ContentVersion();
                cont.Title = 'MT103_'+DateTime.now().format('yyyy-MM-dd\'T\'HH:mm:ss.SSS');
                cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.txt';
                cont.VersionData = EncodingUtil.base64Decode(jsonStr);
                if(Schema.sObjectType.ContentVersion.isCreateable()){
                    insert cont;
                }
                
                List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where title =: cont.title LIMIT 1]); 

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
    }*/
}