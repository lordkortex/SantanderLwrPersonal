/*----------------------------------------------------------------------------------
Author:         Antonio Matachana
Company:        
Description:    
Test Class:     CNT_OTV_CaseManagement_Test
History
<Date>          <Author>        	<Description>
22/03/2021      Antonio Matachana    	Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_OTV_CaseManagement {

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
    Author:         Antonio Matachana
    Company:        
    Description:    Create a case for Cancel Service.
    History 
    <Date>          <Author>            <Change Description>
    08/03/2021	    Antonio Matachana        Initial version
    ------------------------------------------------------------*/ 
    @AuraEnabled
    public static void createCancelServiceCase(String Reason, String Description){
        Id userId = UserInfo.getUserId();
        if(userId != null){
            List<User> currentUser = [SELECT Id, ContactId FROM User WHERE Id = :userId LIMIT 1];
            if(currentUser.size()>0){
                Contact contactUser = [SELECT Id, Email, Phone FROM Contact WHERE Id = :currentUser[0].ContactId LIMIT 1][0];
                Case newCase = new Case( 
                    Subject = Reason, 
                    Description = Description
                );
                insert newCase;  
            }
        }
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
        String userName;
        try{
            Id userId = UserInfo.getUserId();
            List<User> currentUser = [SELECT Name 
                                        FROM User 
                                       WHERE Id = :userId 
                                       LIMIT 1];
            userName = currentUser[0].Name;
            //return currentUser[0].Name;
        }catch(Exception e){
            throw new CustomException('Error obtaining current user name');
        }
        return userName;
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
}