/*
    Author:         Andrea Martin
    Company:        Deloitte
    Description:    Test to get the dominant currency 

    History:
    <Date>          <Author>            <Description>
    08/02/2021      Andrea Martin         Initial version
    */
@isTest
public class WS_DominantCurrency_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void execute_Test(){
        
        try{
            Test.setMock(HttpCalloutMock.class, new WS_DominantCurrency_MockHttp());   
            String userId = 'UserId_TEST';
			String currencyOrigin = 'EUR';
            String dominationCurrency = 'EUR';
            String currencyDestination= 'GBP';
            
            WS_DominantCurrency wsObject = new WS_DominantCurrency(userId, currencyOrigin, currencyDestination);
            WS_DominantCurrency wsObject_empty_1 = new WS_DominantCurrency(null, currencyOrigin, currencyDestination);
            WS_DominantCurrency wsObject_empty_2 = new WS_DominantCurrency(userId, '', currencyDestination);
            
            WS_DominantCurrency.OUTPUT wsObjectOutput = new WS_DominantCurrency.OUTPUT();
            WS_DominantCurrency.OUTPUT wsObjectOutputErrors = new WS_DominantCurrency.OUTPUT();
            
            WS_DominantCurrency.CurrencyPairOutput currencyPair = null;
            WS_DominantCurrency.CurrencyPairListOutput currencyPairList = null;
            List<WS_DominantCurrency.CurrencyPairListOutput> currencyPairLO = new List<WS_DominantCurrency.CurrencyPairListOutput>();
            currencyPair = new WS_DominantCurrency.CurrencyPairOutput(currencyOrigin, currencyDestination, dominationCurrency);
            currencyPairList = new WS_DominantCurrency.CurrencyPairListOutput(currencyPair);
            currencyPairLO.add(currencyPairList);
            wsObjectOutput.currencyPairListResponse = currencyPairLO;
            
            
            WS_DominantCurrency.Errors error = new WS_DominantCurrency.Errors(); 
            error.code = 'error_test';
            error.message = 'error_test';
            error.level = 'error_test';
            error.description = 'error_test';
            
            List<WS_DominantCurrency.Errors> errors = new List<WS_DominantCurrency.Errors>();
            errors.add(error);
            
            
            wsObjectOutputErrors.errors = errors;
            
            Test.startTest();
            wsObject.execute();
            wsObject_empty_1.execute();
            wsObject_empty_2.execute();
            
            if ( wsObjectOutput.currencyPairListResponse != null){
                Boolean todo_OK = true;
            }
            if (wsObjectOutputErrors.errors != null){
                Boolean todo_KO = true;
            }
           
            
            
            
            
            Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_TransfersBeneficiaries.executeGet: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}