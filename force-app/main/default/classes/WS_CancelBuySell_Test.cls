@isTest
public class WS_CancelBuySell_Test {

    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);  
        DataFactory.createClaims();
    }
    
    @isTest
    static void execute_Test(){
        Test.setMock(HttpCalloutMock.class, new WS_CancelBuySell_MockHttp());
        String res = MockResponse.PaymentDetail();
		WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(res, WRAPPER_PaymentDetail.OperationDetail.class);
        
        Test.startTest();
        
        WS_CancelBuySell wsObject = new WS_CancelBuySell();
        wsObject.execute(paymentData);
        
        Test.stopTest();
    }
    
}