/*----------------------------------------------------------------------------------
Author:        R. Cervino
Company:        Deloitte
Description:    Global class to be to trhow custom exceptions
Test Class:     CustomException_Test
History
<Date>			<Author>		<Description>
01/04/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class AutocreatedRegHandler1579603571638_Test {
    @isTest
    public static  void testCreateAndUpdateUser() {
        user userAdmin =DataFactory.getRunningUser(true);
        System.runAs(userAdmin){
            
            AutocreatedRegHandler1579603571638 handler = new AutocreatedRegHandler1579603571638 ();
            Auth.UserData sampleData = new Auth.UserData('test', 'test', 'test',
                                                         'test test', 'test@example.org', null, 'test', 'en_US', 'facebook',
                                                         null, new Map<String, String>{'language' => 'en_US','sub' => 'test','country' => 'test','entity' => 'test','luid' => 'test'});
            DataFactory.createAccount();
            handler.canCreateUser(sampleData);
            User u = handler.createUser(null, sampleData);
            
            sampleData = new Auth.UserData('testNewId', 'testNewFirst', 'testNewLast','testNewFirst testNewLast', 'test@example.org', null, 'testnewuserlong', 'en_US', 'facebook',null, new Map<String, String>{'language' => 'en_US','sub' => 'test','country' => 'test','entity' => 'test','luid' => 'test'});
            handler.updateUser(u.Id, null, sampleData);
            
            // User updatedUser = [SELECT userName, email, firstName, lastName, alias FROM user WHERE id=:uid];
        }
        
    }
    
    
}