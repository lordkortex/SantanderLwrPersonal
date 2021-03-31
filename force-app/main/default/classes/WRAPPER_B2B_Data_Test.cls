/*----------------------------------------------------------------------------------
Author:         Andrea Martin
Company:        Deloitte
Description:    Test class of Wrapper_B2B_Data
History
<Date>			<Author>		<Description>
01/02/2021		Andrea Martin    	Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WRAPPER_B2B_Data_Test {
 @isTest
    static void testUtil (){
        
        WRAPPER_B2B_Data.AccountData accountData = new WRAPPER_B2B_Data.AccountData();
        accountData.cib = true;
        accountData.companyId= 'test';
        accountData.documentNumber= 'test';
        accountData.documentType= 'test';
        
        WRAPPER_B2B_Data.UserData userData = new WRAPPER_B2B_Data.UserData();
        userData.firstName= 'test';
        userData.globalId= 'test';
        userData.isNexus=true;
        userData.lastName='test';
        userData.numberFormat='test';
        userData.userId='test';
        
        WS_TransferFees.OUTPUT  transactionFeeServiceResponse = new WS_TransferFees.OUTPUT();
        WS_ExchangeRate.OUTPUT convertedTransactionFeeServiceResponse = new WS_ExchangeRate.OUTPUT();
		WS_ExchangeRate.OUTPUT exchangeRateServiceResponse = new WS_ExchangeRate.OUTPUT();
        
        WRAPPER_B2B_Data.PaymentAmount paymentAmount = new WRAPPER_B2B_Data.PaymentAmount();
        paymentAmount.fromOrigin=true;
        paymentAmount.amountSend=10.1;
        paymentAmount.amountReceive=12.1;
        paymentAmount.exchangeRate=0.1;
        paymentAmount.timestamp='test';
        paymentAmount.transactionFee=0.1;
        paymentAmount.transactionFeeCurrency='test';
        paymentAmount.convertedTransactionFee=0.1;
        paymentAmount.convertedTransactionFeeCurrency ='test';
        paymentAmount.transactionFeeServiceResponse = transactionFeeServiceResponse;
        paymentAmount.convertedTransactionFeeServiceResponse = convertedTransactionFeeServiceResponse;
        paymentAmount.exchangeRateServiceResponse = exchangeRateServiceResponse;
        paymentAmount.baseAmount=0.1;
        paymentAmount.baseCurrency='test';
        
        
    }
}