/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Wrapper class to retrieve and give MT103
Test Class:     CNT_WRAPPERSWIFTPAYMENT_Test
History
<Date>			<Author>		<Description>
11/12/2019		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_DownloadMT103{

    private String output;
    private String input;

    public String getOutput () {
        return this.output;
    }

    public CNT_DownloadMT103 ( String input) {
        this.input=input;
    }

    public class FileIncome {
        public String mt103CopyFile;
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
            this.output = null;
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadMT103');
            String finalEndPoint = configWs.CNT_Endpoint__c.replace('{input}',input);
            
            //Start - Callout with token generation based on the user profile - fix INC015782345 
            String response = null;
            WrapperUserData userData = ServiceUserData.getUserData(UserInfo.getUserId()); 
            String gtsOperationsUserProfile = System.Label.Profile_BackOffice_001;
            String localBankUserProfile = 'Local Support';
            if (userData != null) {
                if (String.isNotBlank(userData.profileName)) {
                    if(userData.profileName != gtsOperationsUserProfile && userData.profileName != localBankUserProfile) {
                        response = Global_IntegrationWrapper.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);
                    } else {
                        String tokenPlatform = 'BBOO';
                        String tokenUser = '';
                        if (userData.profileName == gtsOperationsUserProfile) {
                            tokenUser = 'GTS_GLOBAL';
                            TokenInformation tokenInformation = new TokenInformation('ES', tokenPlatform, tokenUser, null, 'BSCHESMM');
                            response = Global_IntegrationWrapper.launchHTTP('', finalEndPoint,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation); 
                        } else if(userData.profileName == localBankUserProfile) {
                            tokenUser = 'GTS_LOB';
                            TokenInformation tokenInformation = new TokenInformation(userData.country, tokenPlatform, tokenUser, null, userData.bic);
                            response = Global_IntegrationWrapper.launchHTTP('', finalEndPoint,  configWs.CNT_HTTPMethod__c, null, null, null, 40000, tokenInformation);
                        }   
                    }
                } else {
                    response = null;
                }
            } else {
                response = null;
            }
            //End - fix INC015782345
            
            if (Test.isRunningTest() ) {
                response='{"mt103CopyFile": "JVBERi0xLjQKJfbk/N8KMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovVmVyc2lvbiAvMS40Ci9QYWdlcyAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovTWVkaWFCb3ggWzAuMCAwLjAgNTk1LjI3NTYzIDg0MS44ODk4XQovUGFyZW50IDIgMCBSCi9Db250ZW50cyA0IDAgUgovUmVzb3VyY2VzIDUgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggNDYyCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQ0KeJx1k8tu2zAQRff+Ci5bILJn+BxyR71sNbEcmHLgbRzbQLrsVtC/l0JSgGJSrQbU4", "filename": "a97e178b-5ef6-4e7b-be8c-e2f13227903b.pdf"}';
            } 
            
            if (String.isNotBlank(response)) {
                FileIncome deserializedInvoices =(FileIncome)JSON.deserialize(response, FileIncome.class);
                
                String jsonStr = deserializedInvoices.mt103CopyFile;
                
                //Generate the document
                ContentVersion cont = new ContentVersion();
                //cont.Title = deserializedInvoices.filename.substring(0,deserializedInvoices.filename.length()-3)+'pdf';
                cont.Title = deserializedInvoices.filename;
                cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.pdf';
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
            System.debug('execute.CNT_DownloadMT103: ' + e.getMessage());
            throw new customException(e.getMessage());
        }
    }
}