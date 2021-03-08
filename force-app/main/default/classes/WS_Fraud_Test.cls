@isTest
public class WS_Fraud_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void validate_Test(){
         try {

        Test.setMock(HttpCalloutMock.class, new WS_Fraud_MockHttp());            
        WS_Fraud wsObject = new WS_Fraud();
        
        //create sourceAccount 
        WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
        //create destinationAccount 
        WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.destinationAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
        //Create amountData
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(MockResponse.amountData_Fraud(), WRAPPER_B2B_Data.PaymentAmount.class);
        
        Map<String, String> navigatorInfo = new Map<String, String>();
        navigatorInfo.put('userAgent','Mozilla / 5.0(Windows NT 10.0; Win64; x64)AppleWebKit / 537.36(KHTML, like Gecko)Chrome / 87.0.4280.88 Safari / 537.36');
        navigatorInfo.put('latitude','latitude');
        navigatorInfo.put('longitude','longitude');
        
        Map<String, String> stepData = new Map<String, String>();
        stepData.put('description', 'description');
        stepData.put('reference', 'reference');
        
        String amountEnteredFrom = 'source';
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
        
        //WRAPPER_PaymentMetaData metaData = ServiceFraud.setPaymentMetaData(referenceId, stepData, sourceAccount, destinationAccount, amountData, amountEnteredFrom);
        //System.debug('AML:' + metaData);
        //WRAPPER_PaymentMetaData metaData = (WRAPPER_PaymentMetaData) JSON.deserialize(MockResponse.metaData_Fraud(), WRAPPER_PaymentMetaData.class);
        String res= '{"accessChannel": "web", "customerId":"customerId", "documentNumber": "documentNumber", "documentType":"documentType", "PaymentDataArea" : {"idempotentReference": "idempotentReference", "destinationName": "destinationName", "destinationAccount": { "accountIdType": "accountIdType", "accountId" : "accountId"}, "destinationAgent":{ "agent" : "agent"}, "sourceAccount":{"accountIdType": "accountIdType", "accountId": "accountId"}, "flowIndicator": "flowIndicator"}}';
        WRAPPER_PaymentMetaData metaData = (WRAPPER_PaymentMetaData) JSON.deserialize(res, WRAPPER_PaymentMetaData.class);
        fraudValidateRequest = new WS_Fraud.FraudValidateRequest(fraudId, referenceId, customerId, operationType, operationSubtype, callType, metaData);
        fraudValidateResponse = new WS_Fraud.FraudValidateResponse(fraudId, referenceId, customerId, operationType, operationSubtype, callType, metaData, status, score);      
        //wsObject.execute(fraudId, referenceId, customerId, operationType, operationSubtype, callType, metaData, navigatorInfo);
        Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_Fraud.validate_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        
    }
    @isTest
    static void execute_Test(){
        try{
            Test.setMock(HttpCalloutMock.class, new WS_Fraud_MockHttp());            
            WS_Fraud wsObject = new WS_Fraud();
            
            Map<String, String> navigatorInfo = new Map<String, String>();
            navigatorInfo.put('userAgent','Mozilla / 5.0(Windows NT 10.0; Win64; x64)AppleWebKit / 537.36(KHTML, like Gecko)Chrome / 87.0.4280.88 Safari / 537.36');
            navigatorInfo.put('latitude','latitude');
            navigatorInfo.put('longitude','longitude');
            
            String fraudId = 'fraudId';
            String referenceId = 'paymentId';
            String customerId = 'customerId';
            String operationType = '100';
            String operationSubtype = '101';
            String callType = '04';
            
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
            wsObject.execute(fraudId, referenceId, customerId, operationType, operationSubtype, callType, metaData, navigatorInfo);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_Fraud.execute_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        
    }
    
    
}