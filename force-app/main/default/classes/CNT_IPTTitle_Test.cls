/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Test class of CNT_IPTTitle
History
<Date>			<Author>		<Description>
16/03/2020		Shahad Naji    	Initial version
----------------------------------------------------------------------------------*/
@isTest
private class CNT_IPTTitle_Test {
    /*----------------------------------------------------------------------------------
    Author:        Shahad Naji
    Company:        Deloitte
    Description:   	Test data setup
    History
    <Date>			<Author>		<Description>
    16/03/2020		Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/  
    @TestSetup
    static void makeData(){ 
        DataFactory.getRunningUser(true);    
    }
    
    /*----------------------------------------------------------------------------------
    Author:        Shahad Naji
    Company:        Deloitte
    Description:   	Test method of getUserInformation method
    History
    <Date>			<Author>		<Description>
    16/03/2020		Shahad Naji     Initial version
    ----------------------------------------------------------------------------------*/          
    @isTest
    static void getUserInformationTest(){
        Test.startTest();
        String temp = '';
        List<User> usrLst = [SELECT Id, firstname FROM User WHERE Email='test@test.es'];
        if(!usrLst.isEmpty()){
            system.runAs(usrLst.get(0)){
                temp = CNT_IPTTitle.getUserInformation();
            }
        }
        System.assert(temp == 'Peter', 'ERROR >>> CNT_IPTTitle - firstname: The variable has not a correct value');  
        Test.stopTest();
    }

    /*----------------------------------------------------------------------------------
    Author:         Adrian Muñio
    Company:        Deloitte
    Description:   	Test method of encrypt data method
    History
    <Date>			<Author>		<Description>
    18/06/2020		Adrian Muñio     Initial version
    ----------------------------------------------------------------------------------*/ 
    @isTest
    static void encryptDataTest(){
        Test.startTest();
        DataFactory.getCustomSettingCryptoKey(true);
        String temp = 'test';
        List<User> usrLst = [SELECT Id, firstname FROM User WHERE Email='test@test.es'];
        if(!usrLst.isEmpty()){
            system.runAs(usrLst.get(0)){
                temp = CNT_IPTTitle.encryptData(temp);
            }
        }
        System.assert(temp != null, 'ERROR >>> CNT_IPTTitle - encrypt: The variable has not value');  
        Test.stopTest();
    }
}