@isTest
private class HANDLER_Case_Test {
    
    @testSetup static void setup(){
        //Create common test users
        Profile p = [SELECT Id FROM Profile WHERE Name='System Administrator']; 
        User usr1 = new User(Alias = 'standt', Email='standarduser1@desan.com', 
                            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                            LocaleSidKey='en_US', ProfileId = p.Id, 
                            TimeZoneSidKey='America/Los_Angeles', UserName='standarduser1@desan.com');
        insert usr1 ;
        User usr2 = new User(Alias = 'standt', Email='standarduser2@desan.com', 
                            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                            LocaleSidKey='en_US', ProfileId = p.Id, 
                            TimeZoneSidKey='America/Los_Angeles', UserName='standarduser2@desan.com');
        insert usr2;
        // Create common test cases
        list<case> oldCases = new list<case>();
        list<case> newCases = new list<case>();
        
        for(Integer i=0; i<3; i++){
            oldCases.add(new case(OwnerId = usr1.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'New', Origin = 'Internal', CASE_PCK_Record_Type__c= 'Case RecordType', Subject = 'oldCase'+ i));
            newCases.add(new case(OwnerId = usr2.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'CAU1', Origin = 'Internal',CASE_PCK_Record_Type__c= 'Case RecordType', Subject = 'newCase'+ i));
            oldCases.add(new case(OwnerId = usr1.Id, Priority = 'Low', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'New', Origin = 'Internal', CASE_PCK_Record_Type__c= 'Payment Parent Case', CASE_PCK_Sourcesystem__c = 'Mulesoft', CASE_PCK_OrderingCountry__c = 'ES', Subject = 'oldCase'+ i));
            newCases.add(new case(OwnerId = usr2.Id, Priority = 'Low', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'CAU1', Origin = 'Internal',CASE_PCK_Record_Type__c= 'Payment Child Case', CASE_PCK_Sourcesystem__c = 'Salesforce', CASE_PCK_Beneficiary_country__c='ES', CASE_PCK_OrderingCountry__c = 'ES', Subject = 'newCase'+ i));
        }
        insert oldCases;
        insert newCases;
        
        case cs = new case(OwnerId = usr2.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'Closed Solved', Origin = 'Internal', Subject = 'closed case');
        insert cs;
        task tsk = new task(OwnerId = usr2.Id, WhatId = cs.id, Priority = 'High');
        insert tsk;
        
        case itCs = new case(OwnerId = usr2.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'IT', Origin = 'Internal', Subject = 'IT case');
        insert itCs;
        
        case afterUpdateOwner = new case(OwnerId = usr1.Id, Priority = 'High', CASE_affected_functionality__c = 'International_Payment_Tracker', Status = 'In progress', Origin = 'Internal', CASE_PCK_Record_Type__c= 'Case RecordType', Subject = 'updateOwner');       
        insert afterUpdateOwner;

        
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
    
    @isTest static void fillBasicFieldsTest(){
        
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
 
    @isTest
    static void createComplianceCaseTest(){
        WRAPPER_AccountList.AccountDetails accData = new WRAPPER_AccountList.AccountDetails();
        ReturnValue rv = HANDLER_Case.createComplianceCase('PaymentId', 'Description', accData, accData); 
    }
    
    @isTest
    static void TreasuryUpdatesTest(){
        User treasurer = [SELECT Id FROM User WHERE Profile.Name = 'Treasury' AND isActive = true LIMIT 1 ];
        User integration = [SELECT Id FROM User WHERE Profile.Name = 'Integration' AND isActive = true LIMIT 1];
        
        Case objCase = new Case (
            Type = 'Funding Back',
            CASE_PCK_Record_Type__c = 'Treasury',
            Status = 'New');
        
        Case objCase2 = new Case (
            Type = 'Notification',
            CASE_PCK_Record_Type__c = 'Treasury',
            Status = 'New');
        
        Test.startTest();
        insert objCase2;
        system.runAs(treasurer){
            insert objCase;
        	objCase.status = 'Pending of Authorization';
        	update objCase;
        }
        system.runAs(integration){
        	objCase.status = 'Closed Solved';
        	update objCase;
        }
        objCase.status = 'Closed Cancelled';
        objCase.CASE_TXT_cancelledReason__c = 'TestReason';
        update objCase;
        Test.stopTest();
    }
    
}