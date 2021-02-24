@isTest
public class ControllerCustomerTransacLimits_Test {

    @testSetup
    static void setup () {
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }

    @isTest
    static void testControllerCustomerTransacLimits_OK () {
        User u = DataFactory.getWrapperUserData();
        // Create PaymentData for IIP and B2B
        WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class); 
        // Payment Draft
        WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.bookToBookDraft(null);
        System.runAs(u) {
            // Create userData
            WrapperUserData userData = ServiceUserData.getUserData();
            Test.startTest();
            ControllerCustomerTransactionalLimits.reverseLimits(paymentData);
            ControllerCustomerTransactionalLimits.reverseLimits(paymentDraft);
            ControllerCustomerTransactionalLimits.updateLimits(paymentData);
            ControllerCustomerTransactionalLimits.updateLimits(paymentDraft);
            ControllerCustomerTransactionalLimits.validateLimits(paymentData);
            ControllerCustomerTransactionalLimits.validateLimits(userData, paymentDraft);
            Test.stopTest();
        }
    }

    @isTest
    static void testControllerCustomerTransacLimits_KO () {
        User u = DataFactory.getWrapperUserData();
        // Create PaymentData for IIP and B2B
        WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class); 
        paymentData.productId = null;
        // Payment Draft
        WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.bookToBookDraft(null);
        paymentDraft.productId = null;
        System.runAs(u) {
            // Create userData
            WrapperUserData userData = ServiceUserData.getUserData();
            Test.startTest();
            try {
                ControllerCustomerTransactionalLimits.reverseLimits((WRAPPER_PaymentDetail.OperationDetail) null);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.reverseLimits(paymentData);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.reverseLimits((WRAPPER_PAY_PaymentDraft) null);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.reverseLimits(paymentDraft);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.updateLimits((WRAPPER_PaymentDetail.OperationDetail) null);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.updateLimits(paymentData);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.updateLimits((WRAPPER_PAY_PaymentDraft) null);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.updateLimits(paymentDraft);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.validateLimits((WRAPPER_PaymentDetail.OperationDetail) null);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.validateLimits(paymentData);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.validateLimits(userData, (WRAPPER_PAY_PaymentDraft) null);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            try {
                ControllerCustomerTransactionalLimits.validateLimits(userData, paymentDraft);
            } catch (Exception e) {
                System.debug('testControllerCustomerTransacLimits_KO');
            }
            Test.stopTest();
        }
    }

    @isTest
    static void testControllerCustomerTransacLimits_OK_IIP () {
        User u = DataFactory.getWrapperUserData();
        // Create PaymentData for IIP and B2B
        WRAPPER_PaymentDetail.OperationDetail paymentDataIIP = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult_IIP(), WRAPPER_PaymentDetail.OperationDetail.class); 
        // Payment Draft
        WRAPPER_PAY_PaymentDraft_Mock paymentDraftMock = new WRAPPER_PAY_PaymentDraft_Mock();
        WRAPPER_PAY_PaymentDraft paymentDraft = paymentDraftMock.bookToBookDraft(null);
        System.runAs(u) {
            // Create userData
            WrapperUserData userData = ServiceUserData.getUserData();
            Test.startTest();
            ControllerCustomerTransactionalLimits.reverseLimits(paymentDataIIP);
            ControllerCustomerTransactionalLimits.updateLimits(paymentDataIIP);
            ControllerCustomerTransactionalLimits.validateLimits(paymentDataIIP);
            Test.stopTest();
        }
    }
}