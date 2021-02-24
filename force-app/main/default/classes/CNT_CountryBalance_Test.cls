@isTest
public class CNT_CountryBalance_Test {

    @IsTest
    static void getCountryNameTest(){
        
    	String isoCode = CNT_CountryBalance.getCountryName('');
    }
    
    @IsTest
    static void getSumBalanceTest(){
        
        List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
        WRAPPER_AccountList.AccountDetails ad = new WRAPPER_AccountList.AccountDetails();
        ad.currencyCodeAvailableBalance = 'EUR';
        ad.amountMainBalance = 90;
        ad.amountAvailableBalance = 80;
        accountlist.add(ad);
        
        WRAPPER_AccountList.AccountDetails ad2 = new WRAPPER_AccountList.AccountDetails();
        ad2.currencyCodeAvailableBalance = '';
        ad2.amountMainBalance = 90;
        ad2.amountAvailableBalance = 80;
        accountlist.add(ad2);
        
    	Map<String, Decimal> balanceValues = CNT_CountryBalance.getSumBalance('', accountList);
    }
}