@isTest
public class ServiceFraud_Test {

    @testSetup
    static void setup () {
        DataFactory.createWsConfigurationSetting(true);
    }

    @isTest
    static void execute_Test () {
        try {
            Test.setMock(HttpCalloutMock.class, new WS_Fraud_MockHttp());
            // Payment Draft
            WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
            WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.bookToBookDraft(null);
            // NavigatorInfo
            Map<String, String> navigatorInfo = DataFactory.getNavigatorInfo();
            Test.startTest();
            ServiceFraud.executeFraud(navigatorInfo, paymentDraft);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ServiceFraud.execute_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}