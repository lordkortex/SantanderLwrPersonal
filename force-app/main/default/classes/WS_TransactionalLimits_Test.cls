/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
23/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WS_TransactionalLimits_Test {
	
    @testSetup  
    static void setup(){
        Test.startTest();
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(Name = 'WS_TransactionalLimits',
                                                                       CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/orchestration_limits',
                                                                       CNT_HTTPMethod__c = 'POST',
                                                                       tokenPlatform__c = 'GTS',
                                                                       tokenUser__c = 'nexus',
                                                                       CNT_Service__c = 'mulesoft');
        insert configWs;
       	main();

        Test.stopTest();
    }
   
    @isTest
    static void main(){ 
		WS_TransactionalLimits.OUTPUT output = new WS_TransactionalLimits.OUTPUT(); 
		output.limitsResult = 'Test';                                          
        output.codeLimitsResult = 'Test';   
        
		WS_TransactionalLimits.TransactionContract TransactionContract = new WS_TransactionalLimits.TransactionContract(); 
		TransactionContract.contractType = 'Test';                                          
        TransactionContract.contractId = 'Test';       
		
        WS_TransactionalLimits.TransactionContract TransactionContract_sub = new WS_TransactionalLimits.TransactionContract('Test2','Test2'); 

		WS_TransactionalLimits.AmountCurrency AmountCurrency = new WS_TransactionalLimits.AmountCurrency(); 
		AmountCurrency.amount = '100';                                          
        AmountCurrency.tcurrency = 'EUR';       
		
        WS_TransactionalLimits.AmountCurrency AmountCurrency_sub = new WS_TransactionalLimits.AmountCurrency(100.00,'EUR'); 
        
		WS_TransactionalLimits.NominalAmountCurrency NominalAmountCurrency = new WS_TransactionalLimits.NominalAmountCurrency(); 
		NominalAmountCurrency.nominalAmount = '100';                                          
        NominalAmountCurrency.nominalCurrency = 'EUR';       
		
        WS_TransactionalLimits.NominalAmountCurrency NominalAmountCurrency_sub = new WS_TransactionalLimits.NominalAmountCurrency(100.00,'EUR'); 

		WS_TransactionalLimits.DataRequestOperationLimit DataRequestOperationLimit = new WS_TransactionalLimits.DataRequestOperationLimit(); 
		DataRequestOperationLimit.accessChannel = 'Test';                                          
        DataRequestOperationLimit.channelAccessAgreementId = 'Test';       
		DataRequestOperationLimit.customerId = 'Test';                                          
        DataRequestOperationLimit.operationBaseCurrencyNominal = NominalAmountCurrency;    
		DataRequestOperationLimit.operationNominal = NominalAmountCurrency;                                          
        DataRequestOperationLimit.operationalDateRequested = '10/10/2020';    
		DataRequestOperationLimit.serviceId = 'Test';                                          
        DataRequestOperationLimit.transactionContract = TransactionContract;    
		DataRequestOperationLimit.transactionAmount = AmountCurrency;                                          
        DataRequestOperationLimit.transactionAmountBaseCurrency = AmountCurrency;    
        
        WS_TransactionalLimits.DataRequestOperationLimit DataRequestOperationLimit_sub = new WS_TransactionalLimits.DataRequestOperationLimit('Test2','Test2','Test2',NominalAmountCurrency,NominalAmountCurrency,'10/10/2020','Test2',TransactionContract,AmountCurrency,AmountCurrency); 


        WS_TransactionalLimits.INPUT input = new WS_TransactionalLimits.INPUT(); 

        input.usuarioNexus = false;                                          
        input.dataRequestOperationLimit = DataRequestOperationLimit;                     
        input.operationReference = 'Test';                                           

        WS_TransactionalLimits.INPUT input_sub = new WS_TransactionalLimits.INPUT(false, DataRequestOperationLimit, 'Test2');        
        
        WrapperUserData userData = new WrapperUserData();
        userData.cashNexus = true;
        
        WRAPPER_B2B_Data.AccountData acctData = new WRAPPER_B2B_Data.AccountData();
        WRAPPER_AccountList.AccountDetails accountDetail = new WRAPPER_AccountList.AccountDetails();
        accountDetail.codigoCorporate = 'Test';

        
        WRAPPER_B2B_Data.PaymentAmount paymentAmount = new WRAPPER_B2B_Data.PaymentAmount();        
        paymentAmount.fromOrigin = false;
        paymentAmount.amountSend = 140.00;
        paymentAmount.amountReceive = 140.00;
        paymentAmount.exchangeRate = 1.00;
        paymentAmount.timestamp = 'Test';
        paymentAmount.transactionFee = 100.00;
        paymentAmount.transactionFeeCurrency = 'EUR';
        paymentAmount.convertedTransactionFee = 100.00;
        paymentAmount.convertedTransactionFeeCurrency = 'EUR';
        

        
        WS_TransactionalLimits WS_TransactionalLimitsTest = new WS_TransactionalLimits('b2b', 'Test', userData, acctData);
        WS_TransactionalLimitsTest.getResult();
        try{
            WS_TransactionalLimitsTest.execute(paymentAmount, accountDetail, accountDetail, 100, 'EUR');
        }catch(Exception e){
            
        }
        //WS_TransactionalLimitsTest.getMapData(output);
        WS_TransactionalLimitsTest.getDate();
        

    }

}