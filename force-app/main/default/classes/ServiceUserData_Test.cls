/*
Author:         Candido
Company:        Deloitte
Description:    Test class to cover ServiceUserData and WrapperUserData
History:
<Date>          <Author>                <Description>
19/11/2020      Candido                 Initial version
*/
@isTest
public with sharing class ServiceUserData_Test {

    @isTest
    static void testGetUserData () {
        try {
            Test.startTest();
            User user = DataFactory.getWrapperUserData();
            System.runAs (user) {
                ServiceUserData.getControllerUserData();
            }
            Test.stopTest();
        } catch (Exception e) {
            System.debug('ServiceUserData_Test.testGetUserData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}