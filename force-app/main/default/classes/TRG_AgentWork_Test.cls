/*----------------------------------------------------------------------------------
Author:        R. Cervino
Company:        Deloitte
Description:    Global class to be to trhow custom exceptions
Test Class:     CustomException_Test
History
<Date>			<Author>		<Description>
31/03/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class TRG_AgentWork_Test {    
    /*@isTest static void test_method_one() {
        
        
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            
            ServiceChannel serviceChannel = [SELECT Id FROM ServiceChannel LIMIT 1];
            System.debug('HOLA ');
            System.debug(serviceChannel);
            
            PresenceUserConfig puc = [SELECT Id
                                      FROM PresenceUserConfig
                                      
                                      LIMIT 1];
            ServicePresenceStatus sps = [SELECT Id
                                         FROM ServicePresenceStatus
                                         LIMIT 1];
            
            Account acnt1 = new Account(Name = 'John');
            insert acnt1;
            
            Id queueId = [SELECT Id FROM Group WHERE DeveloperName = 'MEDIUM_OC'].Id;

            
            Case case1 = new Case(Origin = 'Facebook', 
                                  Accountid = acnt1.id,CASE_affected_functionality__c='Onboarding', ownerId= queueId);
            
           insert case1;
            List<UserServicePresence> onlineStatusList = [ select Id,userId from UserServicePresence];

            System.debug(onlineStatusList);
            
            AgentWork aw = new AgentWork();
            aw.UserId = u.id; 
            aw.ServiceChannelId = serviceChannel.Id;
            aw.WorkItemId = case1.Id; 
            System.debug(aw);
            
            insert aw;
            
            update aw;
            
        }
    }*/
    
      static Task task;
    static Contact contact, contact2;
    static Account account, account2;
    static RecordType rtCase;
    static Case caso, caso2;
    static ServiceChannel canalServicio;
    
    @isTest 
    static void createAgentWork(){
        user u =DataFactory.getRunningUser(true);
        //System.runAs(u){
        createDataTest();

        Id serviceChannelId = [SELECT Id FROM ServiceChannel WHERE DeveloperName = 'Omni_Setup_Flow_Cases'].Id;
        
        AgentWork agentwork1 = new AgentWork();
        
        agentwork1.WorkItemId = caso.Id;
        agentwork1.UserId = userinfo.getUserId();
        agentwork1.ServiceChannelId = serviceChannelId ;
        
        insert agentwork1;

        update agentwork1;
        //}
        
    }
    


    static void createDataTest(){
        
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
        account = new Account();
        account.Name = 'test3';
        account.BillingState = 'test3';         
        account.BillingCity = 'eff';
        account.BillingCountry = 'Spain';
        account.BillingPostalCode = '11022';
        account.BillingStreet = 'Gran vía';
        account.OwnerId = UserInfo.getUserId();
        account.Industry='Otros';        
        insert account;
        
    
        
        account2 = new Account();        
        account2.Name = 'test';      
        account2.OwnerId = UserInfo.getUserId();
       insert account2;
        
        
        contact2 = new Contact (        
        FirstName = 'abcd',        
        LastName = 'abcLast',        
        AccountId = account2.Id,        
        Email = 'abcmail@mail.com',
        CONTACT_User__c = u.Id
        );        
        insert contact2;
             
            //Create account
            Account portalAccount1 = new Account(
                Name = 'TestAccount',
                OwnerId = UserInfo.getUserId()
            );
            Database.insert(portalAccount1);
            
            //Create contact
            contact = new Contact(
                FirstName = 'Test',
                Lastname = 'McTesty',
                AccountId = portalAccount1.Id,
                Email = System.now().millisecond() + 'test@test.com',
                CONTACT_User__c = u.Id
            );
            Database.insert(contact);
                    
        

 
        
        Id queueId = [SELECT Id FROM Group WHERE DeveloperName = 'MEDIUM_OC'].Id;
        
        rtCase = [SELECT Id FROM RecordType WHERE SobjectType='Case' LIMIT 1];
           
        caso = new Case();
        caso.AccountId = account.Id;
        caso.ContactId = contact.Id;
        caso.Priority = 'Media';        
        caso.Subject = 'test';
        caso.Description = 'test';
        caso.CASE_affected_functionality__c='Onboarding';
        caso.RecordTypeId = rtCase.Id;
        //caso.OwnerId = queueId;
        insert caso; 
        
        system.debug('>>>> caso ' + caso);
        
        caso2 = new Case();
        caso2.AccountId = account.Id;
        caso2.ContactId = contact.Id;
        caso2.Priority = 'Medium';        
        caso2.CASE_affected_functionality__c='Onboarding';
        caso2.Subject = 'test';
        caso2.Description = 'test';
        caso2.RecordTypeId = rtCase.Id;
        //caso2.OwnerId = queueId;
        insert caso2;
        }
    }


}