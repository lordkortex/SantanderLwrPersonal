@isTest
public class WS_TransactionalLimitsReverse_Test {

    @testSetup
    static void setup () {
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createClaims();
    }

    @isTest
    static void execute_Test () {
        try {
            WS_TransactionalLimitsReverse wsObject = new WS_TransactionalLimitsReverse();
            WRAPPER_PaymentDetail.OperationDetail payment = (WRAPPER_PaymentDetail.OperationDetail) JSON.deserialize(MockResponse.PaymentOptionsResult(), WRAPPER_PaymentDetail.OperationDetail.class);
            String country = 'ES';
            String codigoBic = 'BSCHESMMXXX';
            Test.setMock(HttpCalloutMock.class, new WS_TransactionalLimitsReverse_MockHttp());
            Test.startTest();
            wsObject.execute(payment);
            wsObject.execute(country, codigoBic, 'operationId', 'serviceId', payment);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_TransactionalLimitsReverse.execute_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    @isTest
    static void output_Test () {
        try {
            Test.setMock(HttpCalloutMock.class, new WS_TransactionalLimitsReverse_MockHttp());
            WS_TransactionalLimitsReverse.OUTPUT output = new WS_TransactionalLimitsReverse.OUTPUT();
            Test.startTest();
            output.codeLimitsResult = 'codeLimitsResult_Test';
            output.limitsResult = 'limitsResult_Test';
            output.operationId = 'operationId_Test';
            Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_TransactionalLimitsReverse.output_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}