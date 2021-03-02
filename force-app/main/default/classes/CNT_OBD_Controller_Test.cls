@isTest
public class CNT_OBD_Controller_Test {
    @testSetup
    static void setup() {
        
        
        user u = DataFactory.getRunningUser(true);
        Profile idPortalUser = [SELECT ID FROM PROFILE WHERE NAME ='PORTAL USER'];
        user u2 = [SELECT ID, Name from User WHERE ProfileID =: idPortalUser.id AND isActive=true Limit 1];
        Account account;
        Contact c;
        
        System.runAs(u){
            DataFactory.createWsConfigurationSetting(true);
            account = new Account( Name = 'testOBD1243');
            insert account;	
            c = new Contact(FirstName = 'Test2', LastName = 'OBD', Email = 'testControllerOBD2@testorg.com', AccountID = account.Id);
            insert c;
        }   
        
        
        User testUser2;
        System.runAs(u){    
            Profile p = [SELECT ID FROM Profile WHERE Name='Support'];
            Profile p2 =  [SELECT Id FROM Profile WHERE Name = 'Portal User'];
            
            UserRole portalRole = [Select Id From UserRole Where Name = 'ES Country'];
            
            
            // Create support users
            List<User> listUsu = new List<User>();
            
            testUser2 = new User(Alias = 'tstOBD2', Email='tstOBD@testorg.com', 
                                 EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                                 LocaleSidKey='en_US', ProfileId = p2.id, PortalRole = 'Manager',
                                 TimeZoneSidKey='America/Los_Angeles', UserName='tstOBD2@@testorg.com', isActive = true,
                                 USER_TXT_BIC__c='test', ContactId = c.Id);
            listUsu.add(testUser2);
            
            insert listUsu;
            
        }
        
        
        
        CNT_MultipleHTTPCalloutMock httpMocks = new CNT_MultipleHTTPCalloutMock ();
        
        CNT_ApiConfiguration__c configWs1 = CNT_ApiConfiguration__c.getValues('CNT_OBD_Identify');
        httpMocks.addRequestMock(configWs1.CNT_Endpoint__c, new WRAPPER_ApiIdentify_Mock());
        
        CNT_ApiConfiguration__c configWs2 = CNT_ApiConfiguration__c.getValues('CNT_OBD_ChannelAccessAgreements');
        httpMocks.addRequestMock(configWs2.CNT_Endpoint__c, new WRAPPER_ChannelAccessAgreement_Mock());
        
        CNT_ApiConfiguration__c configWs3 = CNT_ApiConfiguration__c.getValues('CNT_OBD_CustomerLinks');
        httpMocks.addRequestMock(configWs3.CNT_Endpoint__c, new WRAPPER_CustomerLinks_Mock());
        
        CNT_ApiConfiguration__c configWs4 = CNT_ApiConfiguration__c.getValues('CNT_OBD_PersistCompany');
        httpMocks.addRequestMock(configWs4.CNT_Endpoint__c, new WRAPPER_PersistCompany_Mock());
        
        Test.setMock(HttpCalloutMock.class, httpMocks);
        
    }
    
    @isTest
    public static void testOnBoardingIsEmpty(){
        CNT_OBD_Controller.isActiveOnboarding();
    }
    
    @isTest
    public static void testOnBoardingHaveUser(){            
        user u = [SELECT Id, Username, USER_TXT_BIC__c  FROM User WHERE Username = 'tstOBD2@@testorg.com' LIMIT 1][0];
        Test.setMock(HttpCalloutMock.class, new WRAPPER_ChannelAccessAgreement_Mock());    
        Test.startTest();
        System.runAs(u){
            CNT_OBD_Controller.isActiveOnboarding();
        }
        Test.stopTest();
    }
    
    
    
    @isTest
    public static void testCreateAcc(){
        WRAPPER_ApiIdentify w = WRAPPER_ApiIdentify.parse(MockResponse.WRAPPER_ApiIdentify());
        Contact testContact = [SELECT Id FROM Contact WHERE Email = 'testcontrollerobd2@testorg.com' LIMIT 1];
        
        User u = [SELECT Id, Username, USER_TXT_BIC__c  FROM User WHERE Username = 'tstOBD2@@testorg.com' LIMIT 1][0];
        System.runAs(u){
            CNT_OBD_Controller.createAccount(w, '123456789ABCDEFG', testContact.Id);
        }
    }
    
    @isTest
    public static void testEndOBD(){
        User u = [SELECT Id, Username, USER_TXT_BIC__c  FROM User WHERE Username = 'tstOBD2@@testorg.com' LIMIT 1][0];        
        System.runAs(u){
            CNT_OBD_Controller.endObd();
        }
    }
    
    @isTest
    public static void testActivateAcc(){       
        
        User u = [SELECT Id, Username, USER_TXT_BIC__c  FROM User WHERE Username = 'tstOBD2@@testorg.com' LIMIT 1][0];
        WRAPPER_ChannelAccessAgreement wca = WRAPPER_ChannelAccessAgreement.parse(MockResponse.WRAPPER_ChannelAccessAgreement());
        Entity_Parameter__mdt testEntityP = [SELECT Digital_Onboarding_enabled__c,Powered_User_required__c, Manual_Company_Selection_enabled__c FROM Entity_Parameter__mdt WHERE DeveloperName = 'test'  LIMIT 1];
        
        
        System.runAs(u){
            Test.startTest();
            CNT_OBD_Controller.activateAccounts(wca, testEntityP);
            Test.stopTest();
        }
        
    }
}