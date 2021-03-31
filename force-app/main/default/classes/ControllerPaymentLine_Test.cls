@isTest
public class ControllerPaymentLine_Test {
  
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true); 
    }
    @isTest 
    static void getPaymentLine_Test(){
        try {
            WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
            WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
            String transferType = System.Label.PTT_instant_transfer;
            Test.startTest();
            ControllerPaymentLine.getPaymentLine(paymentDraft, transferType);
            ControllerPaymentLine.getPaymentLine(null, transferType);

            Test.stopTest();
            
        } catch (Exception e) {
            System.debug('ControllerPaymentLine_Test.getPaymentLine_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}