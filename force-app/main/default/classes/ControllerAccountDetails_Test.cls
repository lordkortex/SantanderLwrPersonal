/*
    Author:         Andrea Martin
    Company:        Deloitte
    Description:    Test to get the details of one specific account 

    History:
    <Date>          <Author>            <Description>
    03/02/2021      Andrea Martin         Initial version
*/
@isTest
public class ControllerAccountDetails_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void execute_Test(){
        
        try{
            Test.setMock(HttpCalloutMock.class, new WS_GetMeAccountDetails_MockHttp());            
            
            
            //Create UserData ONE_TRADE
            WrapperUserData userData = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('OneTrade'), WrapperUserData.class);
            WRAPPER_PAY_PaymentDraft paymentDraft = new WRAPPER_PAY_PaymentDraft();
			String accountId = 'accountId';
            String accountIdType= 'BBA';
            String country = 'ES';
            String codigoBic = 'BSCHESMMXXX';
            
            Test.startTest();
            ControllerAccountDetails.getAccountsDetails(userData, accountId, accountIdType, country, codigoBic, paymentDraft);
            ControllerAccountDetails.getAccountsDetails(null, accountId, accountIdType, country, codigoBic, paymentDraft);

            Test.stopTest();
        } catch (Exception e) {
            System.debug('ControllerAccountDetails_Test.execute_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}