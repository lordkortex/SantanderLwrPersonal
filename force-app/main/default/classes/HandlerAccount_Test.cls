@isTest
private class HandlerAccount_Test {
    
    @testSetup static void setup(){
        //Create common test users
        
        Account acc = new Account(Name='test');
        insert acc;
    }
    
    @isTest static void setParentTest(){
        
        list<account> oldCases = [select id, IsPartner, ACC_CHK_Partner__c from Account where Name='test' limit 1];
        oldCases[0].Name='test1';
        update oldCases;
        system.assert(oldCases[0].IsPartner == oldCases[0].ACC_CHK_Partner__c);
        
    }

}