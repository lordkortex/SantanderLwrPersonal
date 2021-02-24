/*----------------------------------------------------------------------------------
Author:         Joaquin Vera Valles
Company:        Deloitte
Description:    Test Class for CNT_PaymentProcessWrapper
History
<Date>			<Author>		<Description>
13/12/2019		Joaquin Vera     Initial version
----------------------------------------------------------------------------------*/
@isTest
public with sharing class CNT_PaymentProcessWrapper_Test {
    
    @TestSetup
    static void testSetup(){ 
        DataFactory.getCustomSettingCryptoKey(true);        
    }

    @IsTest
    static void CNT_PaymentProcessWrapperConstructor_Test(){
        
        Test.startTest();
        String data = CNT_InstantCashManagementController.generateFalseData();
        List<CNT_PaymentProcessWrapper.CNT_OriginDataWrapper> dataDeserialized;
        dataDeserialized = (List<CNT_PaymentProcessWrapper.CNT_OriginDataWrapper>)JSON.deserialize(data, List<CNT_PaymentProcessWrapper.CNT_OriginDataWrapper>.class);
        Map<String,CNT_PaymentProcessWrapper.CNT_OriginDataWrapper> dataMap = new Map<String,CNT_PaymentProcessWrapper.CNT_OriginDataWrapper>();
        dataMap.put('originData', dataDeserialized.get(0));
        dataMap.put('destinationData', dataDeserialized.get(1));
        CNT_PaymentProcessWrapper datos = new CNT_PaymentProcessWrapper(dataMap);

        Test.stopTest();
        
    }

}