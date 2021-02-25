/*
    Author:         Andrea Martin
    Company:        Deloitte

    History:
    <Date>          <Author>            <Description>
    24/02/2021      Andrea Martin         Initial version
*/
@isTest
public class ControllerTransfersBeneficiaries_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void execute_Test(){
        
        try{
            Test.setMock(HttpCalloutMock.class, new WS_TransfersBeneficiaries_MockHttp.OperationsResponse());

            Test.startTest();
            ControllerTransfersBeneficiaries.getBeneficiaries();
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ControllerTransfersBeneficiaries_Test.execute_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
     @isTest
    static void catch_Test(){
        
        try{
            Test.startTest();
            ControllerTransfersBeneficiaries.getBeneficiaries();
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ControllerTransfersBeneficiaries_Test.catch_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}