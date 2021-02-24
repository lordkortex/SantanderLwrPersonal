@isTest
public class WS_Fraud_Test {

    @testSetup
    static void setup () {
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createClaims();
    }

    @isTest
    static void validate_Test () {
        try {
            Test.setMock(HttpCalloutMock.class, new WS_Fraud_MockHttp());
            String fraudId = 'fraudId';
            String referenceId = 'paymentId';
            String customerId = 'customerId';
            String operationType = '100';
            String operationSubtype = '101';
            String callType = '04';
            String status = 'OK';
            Double score = 200;
            WS_Fraud.FraudValidateRequest fraudValidateRequest = null;
            WS_Fraud.FraudValidateResponse fraudValidateResponse = null;
            Test.startTest();
            String res= '{"accessChannel": "web", "customerId":"customerId", "documentNumber": "documentNumber", "documentType":"documentType", "PaymentDataArea" : {"idempotentReference": "idempotentReference", "destinationName": "destinationName", "destinationAccount": { "accountIdType": "accountIdType", "accountId" : "accountId"}, "destinationAgent":{ "agent" : "agent"}, "sourceAccount":{"accountIdType": "accountIdType", "accountId": "accountId"}, "flowIndicator": "flowIndicator"}}';
            WRAPPER_PaymentMetaData metaData = (WRAPPER_PaymentMetaData) JSON.deserialize(res, WRAPPER_PaymentMetaData.class);
            fraudValidateRequest = new WS_Fraud.FraudValidateRequest(fraudId, referenceId, customerId, operationType, operationSubtype, callType, metaData);
            fraudValidateResponse = new WS_Fraud.FraudValidateResponse(fraudId, referenceId, customerId, operationType, operationSubtype, callType, metaData, status, score);
            WS_Fraud wsObject = new WS_Fraud();
            Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_Fraud.validate_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }

    @isTest
    static void execute_Test () {
        try {
            Test.setMock(HttpCalloutMock.class, new WS_Fraud_MockHttp());
            Map<String, String> navigatorInfo = DataFactory.getNavigatorInfo();
            String fraudId = 'fraudId';
            String referenceId = 'paymentId';
            String customerId = 'customerId';
            String operationType = '100';
            String operationSubtype = '101';
            String callType = '04';
            String country = 'ES';
            String codigoBic = 'BSCHESMMXXX';
            WRAPPER_PaymentMetaData.DestinationAddress destinationAddress = new WRAPPER_PaymentMetaData.DestinationAddress();
            destinationAddress.streetName = 'streetNameTEST';
            destinationAddress.townName = 'townNameTETS';
            WRAPPER_PaymentMetaData.DestinationAccount destinationAccount = new WRAPPER_PaymentMetaData.DestinationAccount();
            destinationAccount.accountIdType = 'accountIdTypeTEST';
            destinationAccount.accountId = 'accountIdTEST';
            WRAPPER_PaymentMetaData.DestinationAgent destinationAgent = new WRAPPER_PaymentMetaData.DestinationAgent();
            destinationAgent.agent = 'agentTEST';
            WRAPPER_PaymentMetaData.SourceAccount sourceAccount = new WRAPPER_PaymentMetaData.SourceAccount();
            sourceAccount.accountIdType= 'accountIdTypeTEST';
            sourceAccount.accountId = 'accountIdTEST';
            WRAPPER_PaymentMetaData.SourceAddress sourceAddress = new WRAPPER_PaymentMetaData.SourceAddress();
            sourceAddress.streetName = 'streetNameTEST';
            sourceAddress.townName = 'townNameTEST';
            WRAPPER_PaymentMetaData.SourceAmlInformation sourceAmlInformation = new  WRAPPER_PaymentMetaData.SourceAmlInformation();
            sourceAmlInformation.sourceAddress = sourceAddress;
            WRAPPER_PaymentMetaData.PaymentDataArea paymentDataArea = new WRAPPER_PaymentMetaData.PaymentDataArea();
            paymentDataArea.idempotentReference = 'idempotentReferenceTEST';
            paymentDataArea.destinationName = 'destinationNameTEST';
            paymentDataArea.destinationAddress = destinationAddress;
            paymentDataArea.destinationAccount = destinationAccount;
            paymentDataArea.destinationAgent = destinationAgent;
            paymentDataArea.sourceAccount = sourceAccount;
            paymentDataArea.sourceAmlInformation =sourceAmlInformation;
            paymentDataArea.flowIndicator = 'flowIndicatorTEST';
            WRAPPER_PaymentMetaData metaData =  new WRAPPER_PaymentMetaData();
            metaData.accessChannel ='web';
            metaData.PaymentDataArea = paymentDataArea;
            Test.startTest();
            WS_Fraud wsObject = new WS_Fraud();
            wsObject.execute(fraudId, referenceId, customerId, operationType, operationSubtype, callType, metaData, navigatorInfo, country, codigoBic);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_Fraud.execute_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}