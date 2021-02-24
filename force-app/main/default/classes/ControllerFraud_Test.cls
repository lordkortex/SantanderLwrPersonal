@isTest
public class ControllerFraud_Test {

    @testSetup
    static void setup () {
        DataFactory.createWsConfigurationSetting(true);
    }

    @isTest
    static void execute_Test () {
        Test.setMock(HttpCalloutMock.class, new WS_Fraud_MockHttp());
        // Create UserData ONE_TRADE
        WrapperUserData userData_OneTrade = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('OneTrade'), WrapperUserData.class);
        // Create UserData Nexus
        WrapperUserData userData_Nexus = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('Nexus'), WrapperUserData.class);
        // Create UserData Country Support
        WrapperUserData userData_CountrySupport = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('Country Support'), WrapperUserData.class);
        // Create UserData Country Support
        WrapperUserData userData_other = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('other'), WrapperUserData.class);
        // Payment Draft
        WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft bookToBookDraft = paymentDraftMock.bookToBookDraft(null);
        WRAPPER_PAY_PaymentDraft internationalInstantPaymentDraft = paymentDraftMock.internationalInstantPaymentDraft(null);
        // NavigatorInfo
        Map<String, String> navigatorInfo = DataFactory.getNavigatorInfo();
        Test.startTest();
        ControllerFraud.postFraud(userData_OneTrade, navigatorInfo, bookToBookDraft);
        ControllerFraud.postFraud(userData_Nexus, navigatorInfo, bookToBookDraft);
        ControllerFraud.postFraud(userData_CountrySupport, navigatorInfo, internationalInstantPaymentDraft);
        ControllerFraud.postFraud(userData_other, navigatorInfo, internationalInstantPaymentDraft);
        Test.stopTest();
    }
}