/*----------------------------------------------------------------------------------
Author:        R. Cervino
Company:        Deloitte
Description:    Global class to be to trhow custom exceptions
Test Class:     CustomException_Test
History
<Date>      <Author>    <Description>
01/04/2020    R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class GtsRegistrationHandler_Test {
    @isTest
    public static  void testCreateAndUpdateUser() {
        user userAdmin =DataFactory.getRunningUser(true);
        System.runAs(userAdmin){
            
            GtsRegistrationHandler handler = new GtsRegistrationHandler ();
            Auth.UserData sampleData = new Auth.UserData('test', 'test', 'test',
                                                         'test test', 'test@example.org', null, 'test', 'en_US', 'facebook',
                                                         null, new Map<String, String>{'language' => 'en_US','sub' => 'test','country' => 'test','entity' => 'test','luid' => 'test'});
            Auth.UserData sampleData2 = new Auth.UserData('test', 'test', 'test',
                                                         'test test', 'test@example.org', null, 'test', 'en_US', 'facebook',
                                                         null, new Map<String, String>{'language' => 'en_US','sub' => 'test2','country' => 'test','entity' => 'test','luid' => 'test'});
            Auth.UserData sampleData3 = new Auth.UserData('test', 'test', 'test',
                                                         'test test', 'test@example.org', null, 'test', 'en_US', 'facebook',
                                                         null, new Map<String, String>{'language' => 'en_US','sub' => 'test3','country' => 'test','entity' => 'test','luid' => 'test'});
            
            
            DataFactory.createAccount();
            handler.canCreateUser(sampleData);
            Contact cont=new Contact(CONTACT_TXT_GlobalId__c='test', LastName='last');
            insert cont;
            User u = handler.createUser(null, sampleData);
            Contact cont2 =new Contact(CONTACT_TXT_GlobalId__c='test2', LastName='last', CONTACT_TXT_RelationshipType__c='FUNC');
            insert cont2;
            u = handler.createUser(null, sampleData2);
            Contact cont3 =new Contact(CONTACT_TXT_GlobalId__c='test3', LastName='last', CONTACT_TXT_RelationshipType__c='ADMIN');
            insert cont3;
            u = handler.createUser(null, sampleData3);
            sampleData = new Auth.UserData('testNewId', 'testNewFirst', 'testNewLast','testNewFirst testNewLast', 'test@example.org', null, 'testnewuserlong', 'en_US', 'facebook',null, new Map<String, String>{'language' => 'en_US','sub' => 'test','country' => 'test','entity' => 'test','luid' => 'test'});
            System.debug(sampleData);
            handler.updateUser(u.Id, null, sampleData);
            
            // User updatedUser = [SELECT userName, email, firstName, lastName, alias FROM user WHERE id=:uid];
        }
        
    }
    
    
}