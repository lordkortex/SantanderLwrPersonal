@isTest
public class CNT_B2B_OrchestationUtilitiesTest {
    
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true); 
    }
    
    
    @isTest
    static void validateUserInput_Test01(){
        try{ 
        Test.setMock(HttpCalloutMock.class, new WS_B2B_Orchestation_MockHttp.B2B_Orchestation());
        Test.setMock(HttpCalloutMock.class, new CNT_PAY_PaymentOptions_MockHttp());
        //params
        String str = MockResponse.WS_ExchangeRate();
        WS_ExchangeRate.OUTPUT exchRate = (WS_ExchangeRate.OUTPUT) JSON.deserialize(str, WS_ExchangeRate.OUTPUT.class);

        str = MockResponse.WRAPPER_PaymentDetail();
        
        WRAPPER_PaymentDetail payment = WRAPPER_PaymentDetail.parse(str);
        WRAPPER_PaymentDetail.OperationDetail payment_1 = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);    

        
        Test.startTest();
        	ReturnValue res = CNT_B2B_OrchestationUtilities.validateUserInput(payment.operationResponse.operationDetail,'paymentId',exchRate,exchRate);
            CNT_B2B_OrchestationUtilities.validateUserInput(payment_1,'paymentId',exchRate,exchRate);

            
            
        Test.stopTest();
        
          } catch (Exception e) {
            System.debug('CNT_B2B_OrchestationUtilitiesTest.validateUserInput_Test01 ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }        

        
    }
        @isTest
    static void validateUserInput_Test02(){
        try{  
        Test.setMock(HttpCalloutMock.class, new WS_B2B_Orchestation_MockHttp.B2B_Orchestation());
        Test.setMock(HttpCalloutMock.class, new CNT_PAY_PaymentOptions_MockHttp());
                    
            WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
            WRAPPER_PAY_PaymentDraft paymentDraft = mock.paymentDraftOrchestration();
            WRAPPER_PAY_PaymentDraft paymentDraft_2 = mock.bookToBookDraft(true);
        
        Test.startTest();
        	ReturnValue res = CNT_B2B_OrchestationUtilities.validateUserInput(paymentDraft);
            CNT_B2B_OrchestationUtilities.validateUserInput(paymentDraft_2);

        Test.stopTest();

          } catch (Exception e) {
            System.debug('CNT_B2B_OrchestationUtilitiesTest.validateUserInput_Test02: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }        
    }
    
}