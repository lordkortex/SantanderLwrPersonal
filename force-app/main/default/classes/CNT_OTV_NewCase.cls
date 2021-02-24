public class CNT_OTV_NewCase {
    /*------------------------------------------------------------
    Author:         Diego de Asis
    Company:        Deloitte
    Description:    Method to create a case according to the given parameters
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Diego de Asis        Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static void createCase(String valueTopic, String valueIssue, String description, String fileName, String base64){
        System.debug('FILES: '+fileName+' and '+base64);

        Case newCase = new Case(
        Subject = valueTopic + '/' + valueIssue, 
        Description = description);
        
        insert newCase;
        
        String recordId = newCase.id;
        if(fileName != null) {
            ContentVersion cv = createContentVersion(base64, fileName);
            System.debug('CONTENT VERSION: '+ cv);
            ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
            System.debug('CONTENT DOCUMENT LINK: '+ cdl);
        }
    }
    
    /*------------------------------------------------------------
    Author:         Diego de Asis
    Company:        Deloitte
    Description:    Method to obtain content version
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Diego de Asis        Initial version
    ------------------------------------------------------------*/ 
    private static ContentVersion createContentVersion(String base64, String filename) {
        ContentVersion cv = new ContentVersion();
        cv.VersionData = EncodingUtil.base64Decode(base64);
        cv.Title = filename;
        cv.PathOnClient = filename;
        try {
            insert cv;
            return cv;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }
    
    /*------------------------------------------------------------
    Author:         Diego de Asis
    Company:        Deloitte
    Description:    Method to create a link between the contentVersionID and the recordID
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Diego de Asis        Initial version
    ------------------------------------------------------------*/ 
    private static ContentDocumentLink createContentLink(String contentVersionId, String recordId) {
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = [SELECT ContentDocumentId 
                                   FROM ContentVersion 
                                  WHERE Id = :contentVersionId].ContentDocumentId;
        cdl.LinkedEntityId = recordId;
        try {
            insert cdl;
            return cdl;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }
    
    /*------------------------------------------------------------
    Author:         Diego de Asis
    Company:        Deloitte
    Description:    Insert a case in Salesforce BBDD
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Diego de Asis        Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static void talkWithExpert(String valueName, String valueEmail, String valuePhone, List<String> timeList){
        String timeListString = string.join(timeList, ';');
        Case newCase = new Case( 
        Contact_Email__c = valueEmail,
        Contact_Phone__c = valuePhone,
        CASE_PCK_contactTime__c = timeListString);
        insert newCase;   
    }
    /*------------------------------------------------------------
    Author:         Diego de Asis
    Company:        Deloitte
    Description:    Method to obtain ther username
    History 
    <Date>          <Author>            <Change Description>
    11/02/2021	    Diego de Asis        Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static String getUserName(){
        try{
            Id userId = UserInfo.getUserId();
            List<User> currentUser = [SELECT Name 
                                        FROM User 
                                       WHERE Id = :userId 
                                       LIMIT 1];
            return currentUser[0].Name;
        }catch(Exception e){
            System.debug('CNT_OTV_NewCase.getUserName: ' + e.getMessage());
        }
        return 'ERROR getUserName';
    }
}