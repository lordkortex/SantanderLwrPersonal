@isTest
public class WS_B2B_OTP_StrategicLocal_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }  
    

    @isTest
    static void getOTP_Test(){
        Test.setMock(HttpCalloutMock.class, new WS_B2B_OTP_StrategicLocal_MockHttp.OTP());
        Test.startTest(); 
        Map<String, String> navigatorInfo = new Map<String, String>();
        WS_B2B_OTP_StrategicLocal.getOTP('serviceId', 'operationId', 'operationToken', navigatorInfo);
        Test.stopTest();
    }
    
    @isTest
    static void inputInitiateOTP_constructor_Test(){
        Test.startTest();
        WS_B2B_OTP_StrategicLocal.InputInitiateOTP inputTest = new WS_B2B_OTP_StrategicLocal.InputInitiateOTP('service_id','payment_id');
        Test.stopTest();
    }
    
}