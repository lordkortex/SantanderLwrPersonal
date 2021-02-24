global class CNT_FilesUtilities {
    
    @AuraEnabled
    global static ContentVersion saveFile(String paymentId, String strFileName, String base64Data) {
        ContentVersion cv = new ContentVersion();
        
        try{
            List<Payment__c> paymentParent = new List<Payment__c>([SELECT id from Payment__c where PAY_TXT_PaymentId__c=:paymentId]);
            if(!paymentParent.isEmpty()) {
                String idParent = paymentParent[0].Id;
                // Decoding base64Data
                base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
                // inserting file
                cv.Title = strFileName;
                cv.PathOnClient = '/' + strFileName;
                cv.FirstPublishLocationId = idParent;
                cv.VersionData = EncodingUtil.base64Decode(base64Data);
                cv.IsMajorVersion = true;
                Insert cv;
            }else{
            	throw new CustomException('saveFile: Empty payment Object');
            }
        } catch (Exception e) {
            System.debug('saveFile: ' + e.getMessage()+' line '+e.getLineNumber());
            throw new CustomException('saveFile: ' + e.getMessage()+' line '+e.getLineNumber());
        }
        return cv;
    }
    
    @AuraEnabled
    public static String deleteFile(String fileId){
        String inputFileId = fileId;
        try{
            if(String.isNotBlank(fileId)){
                ContentVersion cv = [SELECT ContentDocumentId FROM ContentVersion Where Id=:fileId];
                
                if(cv != null){
                    List<ContentDocument> doc = new List<ContentDocument>([SELECT Id FROM ContentDocument WHERE Id =:cv.ContentDocumentId]);
                    if(!doc.isEmpty()){
                        delete doc[0];
                    }else{
                        throw new CustomException('deleteFile: Empty file');
                    }
                }
            }else{
                throw new CustomException('deleteFile: Empty file Id');
            }
            
        } catch (Exception e) {
            System.debug('deleteFile: ' + e.getMessage()+' line '+e.getLineNumber());
            throw new CustomException('deleteFile: ' + e.getMessage()+' line '+e.getLineNumber());
        }
        
        return inputFileId;
    }
    
    @AuraEnabled
    global static List<CustomContentVersion> releatedFiles(String paymentId){
        List<CustomContentVersion> res = new List<CustomContentVersion>();
        try{
            List<Payment__c> paymentParent = new List<Payment__c>([SELECT id from Payment__c where PAY_TXT_PaymentId__c=:paymentId]);
            
            if(!paymentParent.isEmpty()) {
                
                String idParent = paymentParent[0].Id;
                
                list<id> lstConDocs = new list<id>();
                for(ContentDocumentLink cntLink : [Select Id, ContentDocumentId From ContentDocumentLink Where LinkedEntityId =:idParent]) {
                    lstConDocs.add(cntLink.ContentDocumentId);
                }
                if(!lstConDocs.isEmpty()) {
                    List<ContentVersion> cvs = new List<ContentVersion>([SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE ContentDocumentId IN :lstConDocs]);
                    
                    if(!cvs.isEmpty()){
                        Integer count = 1;
                        for(ContentVersion cv : cvs){
                            CustomContentVersion item = new CustomContentVersion(cv.title, cv.Id, count);
                            res.add(item);
                            count++;
                        }
                    }
                }
            }else{
                throw new CustomException('relatedFiles: Empty payment Object');

            }
            
        } catch (Exception e) {
            System.debug('relatedFiles: ' + e.getMessage()+' line '+e.getLineNumber());
            throw new CustomException('relatedFiles: ' + e.getMessage()+' line '+e.getLineNumber());
        }
        
        return res;
        
    }
    
    global class CustomContentVersion{
        @AuraEnabled
        global String name {get;set;}
        
        @AuraEnabled
        global String key {get;set;}
        
        @AuraEnabled
        global Integer index {get;set;}
        
        global CustomContentVersion(String name, String key, Integer index){
            this.name = name;
            this.key = key;
            this.index = index;
            
        }
    }
    
}