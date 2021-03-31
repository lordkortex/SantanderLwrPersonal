@isTest
private class HANDLER_AccountContactRelation_Test {

    @testSetup static void setup(){
        Profile p = [SELECT Id FROM Profile WHERE Name='System Administrator'];
        Profile pPortal = [SELECT Id FROM Profile WHERE Name='Portal User'];

        UserRole portalRole = new UserRole(DeveloperName = 'MyCustomRole', Name = 'My Role', 
        PortalType='None' );
        insert portalRole; 

        //UserRole roleCustomerUser = [SELECT Id, name from UserRole WHERE name= 'TEST 2 Customer User'];

        //User System Administrator
        User usr = new User(Alias = 'standt', Email='standarduser@desan.com', 
                           EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                           LocaleSidKey='en_US', ProfileId = p.Id, UserRoleId = portalRole.Id,
                           TimeZoneSidKey='America/Los_Angeles', UserName='standarduser@desan.com', IsActive= true);
        insert usr ; 


        System.runAs ( usr ){
            //Create an Account (Insertada una lista)
            Account acc1 = new Account(Name='Empresa1');
            acc1.ACC_TXT_CompanyId__c = '1111';
            acc1.CurrencyIsoCode = 'EUR';
            insert acc1;

            Account acc2 = new Account(Name='Empresa2');
            acc2.ACC_TXT_CompanyId__c = '2222';
            acc2.CurrencyIsoCode = 'EUR';
            insert acc2;
            
            Account acc3 = new Account(Name='Empresa3');
            acc3.ACC_TXT_CompanyId__c = '3333';
            acc3.CurrencyIsoCode = 'EUR';
            insert acc3;

            //Create Contact
            Contact c1 = new Contact();
            c1.LastName = 'ContactTest1';
            c1.CurrencyIsoCode = 'EUR';
            c1.CONTACT_TXT_GlobalId__c = 'abc';
            c1.AccountId = acc1.Id;
            c1.OwnerId = usr.Id;
            insert c1; //Se tiene que crear una relación ACR incial

            Contact c2 = new Contact();
            c2.LastName = 'ContactTest2';
            c2.CurrencyIsoCode = 'EUR';
            c2.CONTACT_TXT_GlobalId__c = 'def';
            c2.AccountId = acc2.Id;
            c2.OwnerId = usr.Id;
            insert c2; //Se tiene que crear una relación ACR incial
            
            Contact c3 = new Contact();
            c3.LastName = 'ContactTest3';
            c3.CurrencyIsoCode = 'EUR';
            c3.CONTACT_TXT_GlobalId__c = 'ghi';
            c3.AccountId = acc3.Id;
            c3.OwnerId = usr.Id;
            insert c3; //Se tiene que crear una relación ACR incial

            //Create User
            User usr1 = new User(Alias = 'standt1', Email='standarduser1@desan.com', 
                               EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                               LocaleSidKey='en_US', ProfileId = pPortal.Id,  ContactId = c1.Id,
                               TimeZoneSidKey='America/Los_Angeles', UserName='standarduser1@desan.com', IsActive= true);
            insert usr1 ; 

            User usr2 = new User(Alias = 'standt2', Email='standarduser2@desan.com', 
                               EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                               LocaleSidKey='en_US', ProfileId = pPortal.Id,  ContactId = c2.Id,
                               TimeZoneSidKey='America/Los_Angeles', UserName='standarduser2@desan.com', IsActive= true);
            insert usr2 ; 
            
            User usr3 = new User(Alias = 'standt3', Email='standarduser3@desan.com', 
                               EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                               LocaleSidKey='en_US', ProfileId = pPortal.Id,  ContactId = c3.Id,
                               TimeZoneSidKey='America/Los_Angeles', UserName='standarduser3@desan.com', isActive= false);
            insert usr3 ; 

            //Create AccountContactRelation
            AccountContactRelation acr1 = new AccountContactRelation();
            acr1.ContactId = c1.Id;
            acr1.AccountId = acc2.Id;
            acr1.IsActive = true;
            insert acr1;
            AccountContactRelation acr2 = new AccountContactRelation();
            acr2.ContactId = c2.Id;
            acr2.AccountId = acc1.Id;
            acr2.IsActive = true;
            insert acr2;
            AccountContactRelation acr3 = new AccountContactRelation();
            acr3.ContactId = c3.Id;
            acr3.AccountId = acc1.Id;
            acr3.IsActive = true;
            insert acr3;
            
            
            List<AccountContactRelation> listAcrs = [Select Id, ContactId, AccountId, ACR_TXT_RelationId__c, isActive FROM AccountContactRelation];
        }
    }

     @isTest static void deactivateTime(){
        List<AccountContactRelation> listAcrs = [Select Id, ContactId, AccountId, ACR_TXT_RelationId__c, ACR_DATET_Deactivate__c, isActive FROM AccountContactRelation limit 1];
        listAcrs.get(0).isActive = false;
        listAcrs.get(0).ACR_DATET_Deactivate__c = system.today();
        update listAcrs;
        HANDLER_AccountContactRelation.deactivateTime(listAcrs);
    }

    @isTest static void createRelationId(){
        List<AccountContactRelation> listAcrs = [Select Id, ContactId, AccountId, ACR_TXT_RelationId__c, isActive, IsDirect FROM AccountContactRelation];
        System.debug('createRelationId TEST: ' + listAcrs.size());
        HANDLER_AccountContactRelation.createRelationId(listAcrs);
    }


    @isTest static void checkUsers(){
        List<Contact> lisContacts = [SELECT Id FROM Contact];        
        List<AccountContactRelation> listAcrs = [Select Id, ContactId, Contact.CONTACT_TXT_GlobalId__c,  AccountId, Account.ACC_TXT_CompanyId__c,  ACR_TXT_RelationId__c, ACR_DATET_Deactivate__c, isActive, IsDirect FROM AccountContactRelation];
        List<AccountContactRelation> listAcrsUpdated = new List<AccountContactRelation>();
        for(AccountContactRelation acr: listAcrs){
            if(acr.Contact.CONTACT_TXT_GlobalId__c == 'abc'){
                if(!acr.IsDirect){
                    acr.IsActive = false;
            		acr.ACR_DATET_Deactivate__c = system.today();
                    listAcrsUpdated.add(acr);
                }
                
            }
            if(acr.Contact.CONTACT_TXT_GlobalId__c == 'def'){
                if(!acr.IsDirect){
                    acr.IsActive = false;
            		acr.ACR_DATET_Deactivate__c = system.today();
                    listAcrsUpdated.add(acr);
                }else{
                    listAcrsUpdated.add(acr);
                }
            }     
        }        
        update listAcrsUpdated;
        HANDLER_AccountContactRelation.checkUsers(listAcrsUpdated);
    }

    @isTest static void checkUsersInsert(){
        List<AccountContactRelation> listAcrs = [Select Id, ContactId, AccountId, ACR_TXT_RelationId__c, isActive FROM AccountContactRelation];
        HANDLER_AccountContactRelation.checkUsersInsert(listAcrs);
    }

    @isTest static void updateUsers(){
        Set<Id> setIdContact = new Set<Id>();
        List<Contact> lisContacts = [SELECT Id FROM Contact];
        for(Contact c:lisContacts){
            setIdContact.add(c.Id);
        }
        HANDLER_AccountContactRelation.updateUsers(setIdContact);
    }

}