/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    This class is use to test CNT_InstantCashManagementController class.
Test Class:     CNT_InstantCashManagementController_Test
History
<Date>			<Author>		 <Description>
13/12/2019		Pablo Tejedor    Initial version
----------------------------------------------------------------------------------*/


@isTest
global class CNT_InstantCashManagementController_Test {
    
    @TestSetup
    static void testSetup(){ 
        DataFactory.getCustomSettingCryptoKey(true);   
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest 
    static void getJsonICMStep1_Test(){  
        
        test.startTest();
        String stringReturn = CNT_InstantCashManagementController.getJsonICMStep1();
        test.stopTest();
        
        System.assertNotEquals(stringReturn,null,'Comprobamos que devuelva algún valor');
    }
    
    @isTest 
    static void sendPayment_Test(){ 
        
        CNT_MultipleHTTPCalloutMock httpMocks = new CNT_MultipleHTTPCalloutMock ();
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_SendPaymentProcess');
        httpMocks.addRequestMock(configWs.CNT_Endpoint__c, new CNT_InstantCashManagementCallout_Mock());
        //Se le pone el mock.
        Test.setMock(HttpCalloutMock.class, httpMocks);
        
        String data = CNT_InstantCashManagementController.generateFalseData();
        List<CNT_PaymentProcessWrapper.CNT_OriginDataWrapper> dataDeserialized;
        dataDeserialized = (List<CNT_PaymentProcessWrapper.CNT_OriginDataWrapper>)JSON.deserialize(data, List<CNT_PaymentProcessWrapper.CNT_OriginDataWrapper>.class);
        Map<String,CNT_PaymentProcessWrapper.CNT_OriginDataWrapper> dataMap = new Map<String,CNT_PaymentProcessWrapper.CNT_OriginDataWrapper>();
        dataMap.put('originData', dataDeserialized.get(0));
        dataMap.put('destinationData', dataDeserialized.get(1)); 
        
        test.startTest();
        String response = CNT_InstantCashManagementController.sendPayment(dataMap);
        test.stopTest();
              
        
    }
}