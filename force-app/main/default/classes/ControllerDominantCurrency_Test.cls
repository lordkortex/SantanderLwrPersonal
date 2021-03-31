/*
    Author:         Andrea Martin
    Company:        Deloitte
    Description:    Test to get the dominant currency 

    History:
    <Date>          <Author>            <Description>
    08/02/2021      Andrea Martin         Initial version
    */
@isTest
public class ControllerDominantCurrency_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void execute_Test(){
        
        try{
            Test.setMock(HttpCalloutMock.class, new WS_DominantCurrency_MockHttp());            
            
            //Create UserData ONE_TRADE
            WrapperUserData userData = (WrapperUserData) JSON.deserialize(MockResponse.wrapperUserData('OneTrade'), WrapperUserData.class);
			String currencyOrigin = 'EUR';
            String currencyDestination= 'GBP';
            Test.startTest();
            ControllerDominantCurrency.getDominantCurrency(userData, currencyOrigin, currencyDestination);
            ControllerDominantCurrency.getDominantCurrency(userData, null, null);

            Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_TransfersBeneficiaries.executeGet: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}