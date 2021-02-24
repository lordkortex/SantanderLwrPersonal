@isTest
private class HANDLER_Case_Test {
    
    @testSetup static void setup(){
        //Create common test users
        Profile p = [SELECT Id FROM Profile WHERE Name='System Administrator']; 
        Profile p_IntranetSupport = [SELECT Id FROM Profile WHERE Name='Intranet GTS Support Partner']; 
        User usr1 = new User(Alias = 'standt', Email='standarduser1@desan.com', 
                            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                            LocaleSidKey='en_US', ProfileId = p.Id, 
                            TimeZoneSidKey='America/Los_Angeles', UserName='standarduser1@desan.com');
        insert usr1 ;
        
        Account ac = new Account(name ='Grazitti') ;
        insert ac; 
        Contact con = new Contact(LastName ='testCon',AccountId = ac.Id);
        insert con; 
        User usr2 = new User(Alias = 'standt', Email='standarduser2@desan.com', 
                            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                            LocaleSidKey='en_US', ProfileId = p_IntranetSupport.Id, 
                            TimeZoneSidKey='America/Los_Angeles', UserName='standarduser2@desan.com', ContactId = con.Id);
        insert usr2;
        con.CONTACT_User__c = usr2.Id;
        update con;
        
        // Create common test cases
        System.runAs(usr1) {            
            list<case> oldCases = new list<case>();
            list<case> newCases = new list<case>();
            
            for(Integer i=0; i<3; i++){
                oldCases.add(new case(OwnerId = usr1.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'New', Origin = 'Internal',  Subject = 'oldCase'+ i));
                newCases.add(new case(OwnerId = usr2.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'CAU1', Origin = 'Internal', Subject = 'newCase'+ i));
                
            }
            insert oldCases;
            insert newCases;
            
            case cs = new case(OwnerId = usr2.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'Closed Solved', Origin = 'Internal', Subject = 'closed case');
            insert cs;
            task tsk = new task(OwnerId = usr2.Id, WhatId = cs.id, Priority = 'High');
            insert tsk;
            
            case itCs = new case(OwnerId = usr2.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'IT', Origin = 'Internal', Subject = 'IT case');
            insert itCs;
            
            //case afterUpdateOwner = new case(OwnerId = usr2.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'In progress', Origin = 'Internal', CASE_PCK_Record_Type__c= 'Case RecordType', Subject = 'updateOwner');       
            case afterUpdateOwner = new case(OwnerId = usr2.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'In progress', Origin = 'Internal', CASE_PCK_Record_Type__c= 'Case RecordType', Subject = 'updateOwner', CASE_DATE_StartDateInProgress__c = System.now().addHours(-1));
            insert afterUpdateOwner;
        }
        
        
        
    }
    
    @isTest static void createTaskTest(){
        
        list<case> oldCases = [select id, ownerId, Priority, CASE_affected_functionality__c, CaseNumber, Status, Origin, Subject from case where Subject =: 'oldCase0' limit 1];
        list<case> newCases = [select id, ownerId, Priority, CASE_affected_functionality__c, CaseNumber, Status, Origin, Subject from case where Subject =: 'newCase0' limit 1]; 
        HANDLER_Case.createTask(oldCases, newCases);
        list<task> tsk = [select id, Subject from task where WhatId =: newCases.get(0).id];
        system.assert(tsk.size() >  0, 'ERROR');
        
    }
    
    @isTest static void deleteRelatedTasks(){
        
        list<case> myCases = [select id, ownerId, Priority, CASE_affected_functionality__c, CaseNumber, Status, Origin, Subject, IsClosed from case where Subject =: 'closed case' limit 1];
		HANDLER_Case.deleteRelatedTasks(myCases);  
        
    }
    
    @isTest static void updateMilestoneCaseTest(){
        
        list<case> myCases = [select id, ownerId, Priority, CASE_affected_functionality__c, CaseNumber, Status, Origin, Subject, IsClosed from case where Subject =: 'closed case' limit 1];
		HANDLER_Case.updateMilestoneCase(myCases); 
        
    }    
    
    
    @isTest static void updateOwnerTest(){
        Case caseRecord = [select id, ownerId, Priority, CASE_affected_functionality__c, CaseNumber, Status, Origin, Subject from case where  Status = 'In progress' and Subject = 'updateOwner' limit 1];
        caseRecord.status = 'CAU1';
        update caseRecord;      
    }
    
    @isTest static void stopMilestoneTest(){
        
        list<case> itCases = [select id, ownerId, Priority, CASE_affected_functionality__c, CaseNumber, Status, Origin, Subject, CreatedById from case];
        HANDLER_Case.stopMilestone(itCases);
        
    }
 
    
}