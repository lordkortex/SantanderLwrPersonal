/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
24/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/

@isTest
public class WS_B2B_OTP_Test {
    
    @testSetup  
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
		main();
    }
   
    @isTest
    static void main(){
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(Name = 'WS_TransferFees',
                                                                       CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/prices',
                                                                       CNT_HTTPMethod__c = 'GET',
                                                                       tokenPlatform__c = 'GTS',
                                                                       tokenUser__c = 'nexus',
                                                                       CNT_Service__c = 'mulesoft');
        insert configWs;
        
        SNG_Payment__c payment = new SNG_Payment__c(SGN_TXT_IdPayment__c='Test');
		insert payment;
        
        Test.setMock(HttpCalloutMock.class, new WS_B2B_OTP_Test_MockHttp());
        Test.startTest();
        
        WS_B2B_OTP.initiateOTP initiateOTP = new WS_B2B_OTP.initiateOTP();
        initiateOTP.scaUid = 'Test';
        
        WS_B2B_OTP.AuthenticateRequest AuthenticateRequest = new WS_B2B_OTP.AuthenticateRequest();
        AuthenticateRequest.embeddedSystem = 'Test';
        AuthenticateRequest.serviceId = 'Test';
        AuthenticateRequest.metaData = 'Test';
        WS_B2B_OTP.AuthenticateRequest AuthenticateRequest_sub = new WS_B2B_OTP.AuthenticateRequest('Test','Test','Test');
        
        WS_B2B_OTP.DocumentId DocumentId = new WS_B2B_OTP.DocumentId();
        DocumentId.documentType = 'Test';
		DocumentId.documentNumber = 'Test';
        
        WS_B2B_OTP.IdentifierType IdentifierType = new WS_B2B_OTP.IdentifierType();
        IdentifierType.emailAddress = 'Test';
		IdentifierType.documentId = DocumentId;
        IdentifierType.aliasIdentity = 'Test';    
        IdentifierType.phoneNumber = 'Test';  

        WS_B2B_OTP.InputInitiateOTP InputInitiateOTP = new WS_B2B_OTP.InputInitiateOTP();
        InputInitiateOTP.identifierType = IdentifierType;
		InputInitiateOTP.embeddedSystem = 'Test';        

        WS_B2B_OTP.jwtValidate jwtValidate = new WS_B2B_OTP.jwtValidate();
        jwtValidate.jti = 'Test';
		jwtValidate.iat = 'Test';
        jwtValidate.status = 'Test';    
        jwtValidate.scaUid = 'Test';  
        jwtValidate.config_uid = 'Test';  

        
        WS_B2B_OTP.validateOTP validateOTP = new WS_B2B_OTP.validateOTP();
        validateOTP.jwt = jwtValidate;
		validateOTP.validateResult = 'Test';      
		validateOTP.codeAuthenticateResult = 'Test';  
		validateOTP.scaId = 'Test';  
		validateOTP.token = 'Test';
		validateOTP.timestamp = 'Test';  
        try{
          WS_B2B_OTP.validateOTP validateOTP_sub = new WS_B2B_OTP.validateOTP('Test\\.Test');  
        }catch(Exception e){
            system.debug(e);
        }  
        
        
        WS_B2B_OTP.InputValidateOTP InputValidateOTP = new WS_B2B_OTP.InputValidateOTP();
        InputValidateOTP.scaUid = 'Test';
		InputValidateOTP.scaSecret = 'Test';  
        
        WS_B2B_OTP.InputValidateOTP InputValidateOTP_sub = new WS_B2B_OTP.InputValidateOTP('Test','Test');
      
        
       
        Test.stopTest();
    }
    
    @isTest
    public static void getOTPTest(){
        WS_B2B_OTP.getOTP('ES','09090909');
    }
    
 	@isTest
    public static void validateOTPTest(){
        WS_B2B_OTP.validateOTP('Test','Test','ES','09090909');
    }
    
 	@isTest
    public static void storeOTPIdTest(){
        WS_B2B_OTP.storeOTPId('Test','Test');
    }
    
 	@isTest
    public static void obtainOTPIdTest(){
        WS_B2B_OTP.obtainOTPId('Test');
    }
}