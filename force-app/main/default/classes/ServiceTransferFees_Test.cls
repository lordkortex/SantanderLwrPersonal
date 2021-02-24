/*
Author:         A. Borraz
Company:        Deloitte
History:
<Date>          <Author>            <Description>
12/02/2021      Candido             Initial version
*/
@isTest
public class ServiceTransferFees_Test {

    @testSetup
    static void setup () {
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }

    @isTest
    static void transferFeesExecute_Test() {
        try {
            WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
            WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(false);
            Test.startTest();
            ServiceTransferFees.transferFeesExecute(paymentDraft);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ServiceTransferFees_Test.transferFeesExecute_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    @isTest
    static void setBookToBookParameters_Test() {
        try {
            Test.startTest();
            ServiceTransferFees.setBookToBookParameters('paymentId', 'sourceId', 'sourceCodigoCorporate', 'recipientCodigoCorporate', 'sourceCodigoBic', 'recipientCodigoBic', 'sourceBranch', 'recipientCurrency', 'amountReceive', 'sourceCountry', 'recipientCountry');
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ServiceTransferFees_Test.setBookToBookParameters_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    @isTest
    static void setInternationalInstantPaymentParameters_Test() {
        try {
            Test.startTest();
            ServiceTransferFees.setInternationalInstantPaymentParameters('paymentId', 'sourceId', 'sourceCodigoCorporate', 'recipientCodigoCorporate', 'sourceCodigoBic', 'recipientCodigoBic', 'sourceBranch', 'recipientCurrency', 'amountReceive', 'sourceCountry', 'recipientCountry');
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ServiceTransferFees_Test.setInternationalInstantPaymentParameters_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}