@isTest
public class ServiceFraud_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void execute_Test(){
        
        try {
                      
            Test.setMock(HttpCalloutMock.class, new WS_TransactionalLimitsReverse_MockHttp());            
            
            //create sourceAccount 
            WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
            //create destinationAccount 
            WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.destinationAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
            //Create amountData
            WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(MockResponse.amountData_Fraud(), WRAPPER_B2B_Data.PaymentAmount.class);
            Map<String, String> navigatorInfo = new Map<String, String>();
            
            Map<String, String> stepData = new Map<String, String>();
            stepData.put('description', 'description');
            stepData.put('reference', 'reference');
            
            String amountEnteredFrom = 'source';
                        
            Test.startTest();
            ServiceFraud.executeFraud(stepData, navigatorInfo, 'paymentId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ServiceFraud.execute_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    
}