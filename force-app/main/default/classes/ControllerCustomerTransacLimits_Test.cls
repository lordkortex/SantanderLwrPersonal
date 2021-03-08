@isTest
public class ControllerCustomerTransacLimits_Test {

    final static String productId = 'd24a269950664fd489c9b0b5f49035a7';
    final static String operationId = '12345';
    final static String serviceId = '67890';
    final static String paymentId = 'ID0987654321';

    @testSetup
    static void setup () {
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }

    @isTest
    static void testControllerCustomerTransacLimits() {
        Test.startTest();
         
        //create PaymentData for IIP and B2B
        WRAPPER_PaymentDetail.OperationDetail paymentDataIIP = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult_IIP(), WRAPPER_PaymentDetail.OperationDetail.class); 
        WRAPPER_PaymentDetail.OperationDetail paymentData = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class); 
        //create sourceAccountData 
        WRAPPER_AccountList.AccountDetails sourceAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountList_AccountDetails('ES', 'EUR'), WRAPPER_AccountList.AccountDetails.class);
        //create recipientAccountData 
        WRAPPER_AccountList.AccountDetails recipientAccountData = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountList_AccountDetails('ES', 'GRB'), WRAPPER_AccountList.AccountDetails.class);
        //Create paymentAmount
        WRAPPER_B2B_Data.PaymentAmount paymentAmount = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(MockResponse.B2BData_PaymentAmount(), WRAPPER_B2B_Data.PaymentAmount.class);
        //Create userData
        WrapperUserData userData = (WrapperUserData) JSON.deserialize( MockResponse.wrapperUserData('OneTrade'), WrapperUserData.class);
        
        ControllerCustomerTransactionalLimits.reverseLimits(paymentData);
        ControllerCustomerTransactionalLimits.reverseLimits(paymentDataIIP);
        ControllerCustomerTransactionalLimits.updateLimits(paymentData);
        ControllerCustomerTransactionalLimits.updateLimits(paymentDataIIP);
        ControllerCustomerTransactionalLimits.updateLimits(productId, operationId, serviceId, paymentAmount, sourceAccountData);
        ControllerCustomerTransactionalLimits.validateLimits(paymentData);
        ControllerCustomerTransactionalLimits.validateLimits(paymentDataIIP);
        ControllerCustomerTransactionalLimits.validateLimits(productId, serviceId, paymentId, userData, paymentAmount, sourceAccountData, recipientAccountData);

        Test.stopTest();
      
    }

}