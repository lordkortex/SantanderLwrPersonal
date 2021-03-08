@isTest
public class ControllerFraud_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void execute_Test(){
        
        
        Test.setMock(HttpCalloutMock.class, new WS_TransactionalLimitsReverse_MockHttp());            
       
        //create sourceAccount 
        WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
        //create destinationAccount 
        WRAPPER_AccountList.AccountDetails destinationAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.destinationAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
        //Create amountData
        WRAPPER_B2B_Data.PaymentAmount amountData = (WRAPPER_B2B_Data.PaymentAmount) JSON.deserialize(MockResponse.amountData_Fraud(), WRAPPER_B2B_Data.PaymentAmount.class);
        //Create UserData ONE_TRADE
        WrapperUserData userData_OneTrade = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('OneTrade'), WrapperUserData.class);
        //Create UserData Nexus
        WrapperUserData userData_Nexus = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('Nexus'), WrapperUserData.class);
        //Create UserData Country Support
        WrapperUserData userData_CountrySupport = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('Country Support'), WrapperUserData.class);
        //Create UserData Country Support
        WrapperUserData userData_other = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('other'), WrapperUserData.class);
        
        Map<String, String> navigatorInfo = new Map<String, String>();
        
		Map<String, String> stepData = new Map<String, String>();
        stepData.put('description', 'description');
        stepData.put('reference', 'reference');

        String amountEnteredFrom = 'source';
        String productID_b2b = 'Book_to_Book';
        String productID_iip = 'International_Instant_Payment';
        
        Test.startTest();
        ControllerFraud.postFraud(userData_OneTrade, stepData, navigatorInfo, 'paymentId', productID_b2b, 'serviceId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);
        ControllerFraud.postFraud(userData_OneTrade, stepData, navigatorInfo, 'paymentId', productID_iip, 'serviceId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);
        
        ControllerFraud.postFraud(userData_Nexus, stepData, navigatorInfo, 'paymentId', productID_b2b, 'serviceId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);
        ControllerFraud.postFraud(userData_Nexus, stepData, navigatorInfo, 'paymentId', productID_iip, 'serviceId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);
        
        ControllerFraud.postFraud(userData_CountrySupport, stepData, navigatorInfo, 'paymentId', productID_b2b, 'serviceId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);
        ControllerFraud.postFraud(userData_CountrySupport, stepData, navigatorInfo, 'paymentId', productID_iip, 'serviceId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);
        
        ControllerFraud.postFraud(userData_other, stepData, navigatorInfo, 'paymentId', productID_b2b, 'serviceId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);
        ControllerFraud.postFraud(userData_other, stepData, navigatorInfo, 'paymentId', productID_iip, 'serviceId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);
        
        ControllerFraud.postFraud(null, stepData, navigatorInfo, 'paymentId', productID_iip, 'serviceId', sourceAccount, destinationAccount, amountData, amountEnteredFrom);

        
        Test.stopTest();
    }
    

}