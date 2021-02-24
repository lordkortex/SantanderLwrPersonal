@isTest
public class WS_B2B_OTP_StrategicNexus_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void inputInitiateOTP_constructor_Test(){
        
        WS_B2B_OTP_StrategicNexus.InputInitiateOTP inputTest = new WS_B2B_OTP_StrategicNexus.InputInitiateOTP('beneficiaryName', 'beneficiaryAccount', 
                                                                                                   'paymentId', 'debitAmount', 'fees',
                                                                                                   'exchangeRate', 'paymentAmount');
        
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

			WS_B2B_OTP_StrategicNexus.IdentifierType idType = new WS_B2B_OTP_StrategicNexus.IdentifierType(supportUser);            
        }
      
    }
    
    @isTest
    static void identifierType_noUser_Test(){
        
       User nullUser = null;
       WS_B2B_OTP_StrategicNexus.IdentifierType idType = new WS_B2B_OTP_StrategicNexus.IdentifierType(nullUser);
        
    }
    
    @isTest
    static void getOTP_Test(){
        
        WS_B2B_OTP_StrategicNexus.getOTP('beneficiaryName', 'beneficiaryAccount', 'paymentId', 
                                    'debitAmount', 'fees', 'exchangeRate', 'paymentAmount' );
        
    }
        
}