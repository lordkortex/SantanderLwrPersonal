/*----------------------------------------------------------------------------------
Author:         Diego Asis
Company:        Deloitte
Description:    Test class of CNT_AccountBalance
History
<Date>			<Author>		<Description>
24/01/2020		Diego Asis      Initial version
----------------------------------------------------------------------------------*/

@isTest
public class CNT_AccountBalance_Test {
	
    @isTest
    static void encryptDataTest(){
        
        User u = DataFactory.getRunningUser(true);
        System.runAs(u){
            DataFactory.getCustomSettingCryptoKey(true);
        	String data = CNT_AccountBalance.encryptData('');
        }
    }
}