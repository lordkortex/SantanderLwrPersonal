@isTest
public class WS_B2B_OTP_Strategic_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true); 
    }
    
    @isTest
    static void inputInitiateOTP_constructor_Test(){
        User u = DataFactory.getRunningUser(true);
        system.runAs(u){
            WS_B2B_OTP_Strategic.InputInitiateOTP inputTest = new WS_B2B_OTP_Strategic.InputInitiateOTP('beneficiaryName', 'beneficiaryAccount', 
                                                                                                   'paymentId', 'debitAmount', 'fees',
                                                                                                  'exchangeRate', 'paymentAmount');
          }
        
    }
    
    @isTest
    static void identifierType_userNoGlobalId_Test(){
        
       User currentUser = [SELECT Id FROM User WHERE Id = :UserInfo.getUserId()];
        
        System.runAs(currentUser){
            // Get the support profile
            Profile p = [SELECT Id FROM Profile WHERE Name='Support']; 
            UserRole portalRole = [Select Id From UserRole Where PortalType = 'None' Limit 1];
        
            // Create a support user
            User supportUser = new User(Alias = 'scau', Email='supportUser@testorg.com', 
                                EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                                LocaleSidKey='en_US', ProfileId = p.Id, UserRoleId = portalRole.Id,
                                TimeZoneSidKey='America/Los_Angeles', UserName='standardusergts@acmesupport.com', isActive = true);
            insert supportUser;

            WS_B2B_OTP_Strategic.IdentifierType idType = new WS_B2B_OTP_Strategic.IdentifierType(supportUser);            
        }
      
    }
    
    @isTest
    static void identifierType_noUser_Test(){
        
       User nullUser = null;
       WS_B2B_OTP_Strategic.IdentifierType idType = new WS_B2B_OTP_Strategic.IdentifierType(nullUser);
        
    }
    
    @isTest
    static void getOTP_Test(){
        
        WS_B2B_OTP_Strategic.getOTP('beneficiaryName', 'beneficiaryAccount', 'paymentId', 
                                    'debitAmount', 'fees', 'exchangeRate', 'paymentAmount' );
        
    }
    
    @isTest
    static void storeOTPId_Test(){
        User u = DataFactory.getRunningUser(true);
        system.runAs(u){
            String paymentID = 'paymentID';
            SNG_Payment__c sngPay = new SNG_Payment__c();
            sngPay.SGN_TXT_IdPayment__c = paymentID;
            insert sngPay;
            
            String userID = Global_Utilities.getUserData('').USER_TXT_GlobalId__c;
            
            SGN_User__c user = new SGN_User__c();
            user.SNG_OTP_ID__c = 'test';
            user.SGN_TXT_GlobalId__c = userID;
            user.SGN_ELCK_RelatedSign__c = sngPay.Id;
            
            insert user;
            
            WS_B2B_OTP_Strategic.storeOTPId('otpId', paymentID);
        }
        
    }
    
}