/*
    Author:         Andrea Martin
    Company:        Deloitte
    Description:    Test to get the details of one specific account 

    History:
    <Date>          <Author>            <Description>
    03/02/2021      Andrea Martin         Initial version
*/
@isTest
public class WS_GetMeAccountDetails_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void execute_Test(){
        
        try{
            Test.setMock(HttpCalloutMock.class, new WS_GetMeAccountDetails_MockHttp());   
            
            String userId = 'UserId_TEST';
			String accountId = 'accountId_test';
            String accountIdType = 'accountIdType';
            String country = 'ES';
            String codigoBic = 'BSCHESMMXXX';
            
            WS_GetMeAccountDetails wsObject = new WS_GetMeAccountDetails(userId, accountId, accountIdType, country, codigoBic);
            WS_GetMeAccountDetails wsObjectNull = new WS_GetMeAccountDetails(userId, null, accountIdType, country, codigoBic);

            WS_GetMeAccountDetails.OUTPUT wsObjectOutput = (WS_GetMeAccountDetails.OUTPUT) JSON.deserialize(MockResponse.WS_GetMeAccountDetails(), WS_GetMeAccountDetails.OUTPUT.class);
            WS_GetMeAccountDetails.OUTPUT wsObjectOutputErrors = new WS_GetMeAccountDetails.OUTPUT();
            
            WS_GetMeAccountDetails.Errors error = new WS_GetMeAccountDetails.Errors(); 
            error.code = 'error_test';
            error.message = 'error_test';
            error.level = 'error_test';
            error.description = 'error_test';
            
            List<WS_GetMeAccountDetails.Errors> errors = new List<WS_GetMeAccountDetails.Errors>();
            errors.add(error);
            
            Test.startTest();

            System.assert(wsObjectOutput.accountDetailsResponse != null);
            wsObjectOutputErrors.errors = errors;
            wsObject.execute();
            wsObjectNull.execute();
 
            Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_TransfersBeneficiaries.executeGet: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}