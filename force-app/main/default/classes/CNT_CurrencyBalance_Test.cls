/*----------------------------------------------------------------------------------
Author:         Diego Asis
Company:        Deloitte
Description:    Test class of CMP_CurrencyBalance
History
<Date>			<Author>		<Description>
24/01/2020		Diego Asis      Initial version
----------------------------------------------------------------------------------*/

@isTest
public class CNT_CurrencyBalance_Test {
	 
    @TestSetup
    static void setup() {
        DataFactory.getCustomSettingCryptoKey(true);
    }
    
    @isTest
    static void getCountryNameTest(){
        
        User u = DataFactory.getRunningUser(true);
        System.runAs(u){
        	String data = '';
        	data = CNT_CurrencyBalance.getCountryName('');
        }
    }
    
    @isTest
    static void getSumBalanceTest(){
        
        User u = DataFactory.getRunningUser(true);
        List<WRAPPER_AccountList.AccountDetails> listaNueva = new List<WRAPPER_AccountList.AccountDetails>();
        WRAPPER_AccountList.AccountDetails accDetail =  new WRAPPER_AccountList.AccountDetails();
        accDetail.currencyCodeAvailableBalance = 'ARS';
        accDetail.amountMainBalance = 10;
        listaNueva.add(accDetail);
        Decimal data = 0;
        System.runAs(u){
            data = CNT_CurrencyBalance.getSumBalance(' ', listaNueva);
        }
    }
}