/*
Author:         Andrea Martin
Company:        Deloitte
History:
<Date>          <Author>            <Description>
24/02/2021      Andrea Martin             Initial version
*/
@isTest
public class ControllerTransferFees_Test {

    @testSetup
    static void setup () {
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }

    @isTest
    static void transferFeesExecute_Test() {
        try {
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
                Name = 'WS_TransferFees',
                CNT_Endpoint__c = 'WS_TransferFees',
                CNT_HTTPMethod__c = 'GET',
                CNT_Service__c = 'mulesoft'
            );
            insert configWs;
           Test.setMock(HttpCalloutMock.class, new WS_TransferFees_Test_MockHttp());   

            WRAPPER_PAY_PaymentDraft_Mock mock = new WRAPPER_PAY_PaymentDraft_Mock();
            WRAPPER_PAY_PaymentDraft paymentDraft = mock.bookToBookDraft(true);
            Test.startTest();
            ControllerTransferFees.transferFeesExecute(paymentDraft);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ControllerTransferFees_Test.transferFeesExecute_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}