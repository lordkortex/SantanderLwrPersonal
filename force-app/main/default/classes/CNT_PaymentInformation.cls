/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Apex class for CMP_PaymentInformation component
Test Class:     CNT_PaymentInformation_Test
History
<Date>          <Author>        <Description>
15/07/2020      Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_PaymentInformation {

            /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to create a case for a certain payment
History
<Date>          <Author>             <Description>
15/07/2020      Shahad Naji        	Initial version
12/08/2020		Shaha Naji			Method to receive payment object parameters and insert them into the case to create
24/09/2020		Shahad Naji			Create a new case record only if there is no another one associated to the payment
*/

    @AuraEnabled
    public static ReturnValue createCase(String payment){
        ReturnValue rv = null;
        Map<String, Object> value = new Map<String, Object>();
        
        WRAPPER_PaymentList.WRAPPER_Payment  paymentObj = (WRAPPER_PaymentList.WRAPPER_Payment)JSON.deserialize(payment, WRAPPER_PaymentList.WRAPPER_Payment .class);
        
        if(paymentObj != null){           
            
            if(String.isNotBlank(paymentObj.paymentId) && String.isNotBlank(paymentObj.sourceCountry) ){
                //Validate if there is a case created for this input method payment
                List<Case> oldCaseList = new List<Case>([SELECT CaseNumber, RecordTypeId, id, CASE_PCK_OrderingCountry__c FROM Case WHERE CASE_TXT_PaymentId__c =: paymentObj.paymentId]);
                if(oldCaseList.size() > 0){
                    Case oldCase = oldCaseList.get(0);
                    value.put('output', oldCase);
                    rv = new ReturnValue(false,value);
                }else{      
                    Case newCase = new Case();
                    //Fetching the assignment rules on case
                    AssignmentRule AR = new AssignmentRule();
                    AR = [select id from AssignmentRule where SobjectType = 'Case' and Active = true and Name='Asignar caso' limit 1]; 
                    if(AR != null){
                        //Creating the DMLOptions for "Assign using active assignment rules" checkbox
                        Database.DMLOptions dmlOpts = new Database.DMLOptions();
                        dmlOpts.assignmentRuleHeader.assignmentRuleId= AR.id;                        
                        newCase.CASE_TXT_PaymentId__c = paymentObj.paymentId;
                        RecordType RTP = [Select Name, id, SobjectType from RecordType where Name = 'Payment Parent Case' and SobjectType  = 'Case' LIMIT 1];
                        newCase.RecordTypeId = RTP.Id;
                        newCase.Origin = 'Bank issue';
                        newCase.CASE_affected_functionality__c = 'Others';
                        newCase.CASE_PCK_OrderingCountry__c = paymentObj.sourceCountry;
                        newCase.CASE_PCK_Beneficiary_country__c = paymentObj.destinationCountry;
                        newCase.CASE_TXT_BICCode__c = paymentObj.sourceSwiftCode;
                        newCase.CASE_PCK_Sourcesystem__c = 'Salesforce';
                        //Setting the DMLOption on Case instance
                        newCase.setOptions(dmlOpts);
                        
                        insert newCase;
                        newCase = [SELECT CaseNumber, RecordTypeId, id, CASE_PCK_OrderingCountry__c FROM Case WHERE Id = :newCase.Id LIMIT 1];
                        value.put('output', newCase);
                        rv = new ReturnValue(true,value);
                    }
                }  
            }
        }
        return rv;        
    }
    
	@AuraEnabled
    public static String encryptData(String str){
        String response = null;
        try {
			response =CNT_SwiftPaymentTable.encryptData(str);
        } catch (Exception e) {
            System.debug('CNT_B2B_PaymentInformation.encryptData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return response;
	}
    @AuraEnabled 
    public static List<contentDocument> fetchContentDocument(String ccvList){
        List<CNT_FilesUtilities.CustomContentVersion> ccvList2 = (List<CNT_FilesUtilities.CustomContentVersion>) JSON.deserialize(ccvList, List<CNT_FilesUtilities.CustomContentVersion>.class);
        //List<CNT_FilesUtilities.CustomContentVersion> ccvList2 = (List<CNT_FilesUtilities.CustomContentVersion>)ccvList.values();
        Set<Id> contentDocumentId = new Set<Id>();
        System.debug(ccvList2);
        for(CNT_FilesUtilities.CustomContentVersion ccv : ccvList2){
            contentDocumentId.add(ccv.ContentDocumentId);
        }
        System.debug(contentDocumentId);
        return [Select id,Title,FileType,CreatedBy.Name,ContentSize From contentDocument Where Id =: contentDocumentId];
    }
    
    @AuraEnabled 
    public static Id viewMT103(String paymentId){
		Id contentDocumentId;
		CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_DownloadMT103');
        String finalEndPoint = configWs.CNT_Endpoint__c.replace('{input}',paymentId);
            
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
                CNT_DownloadMT103.FileIncome deserializedInvoices =(CNT_DownloadMT103.FileIncome)JSON.deserialize(response, CNT_DownloadMT103.FileIncome.class);
                
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
                    return doc[0].Id;
                }
            }
        
        return contentDocumentId;
    }
    
}