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

    @IsTest
    static void getSumBalanceCurrencyTest(){
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
        
    	Map<String, Decimal> balanceValues = CNT_CountryBalance.getSumBalanceCurrency(accountList);

    }
    
    
    @IsTest
    static void getSumBalanceExpertoTest(){
        
        List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
        WRAPPER_AccountList.AccountDetails ad = new WRAPPER_AccountList.AccountDetails();
        ad.currencyCodeAvailableBalance = 'EUR';
        ad.amountMainBalance = 90;
        ad.amountAvailableBalance = 80;
        accountlist.add(ad);
        
        List<WRAPPER_AccountList.TipoDeCambio> cambiosList = new List<WRAPPER_AccountList.TipoDeCambio>();

         WRAPPER_AccountList.TipoDeCambio wcTestTipoCambio = new WRAPPER_AccountList.TipoDeCambio();
        wcTestTipoCambio.claError='test';
        wcTestTipoCambio.divisa='CHF';
        wcTestTipoCambio.fecha='05/05/2019';
        wcTestTipoCambio.tipError='test';
        wcTestTipoCambio.importeDecimal=1.0;
        wcTestTipoCambio.importe=1.0;
        wcTestTipoCambio.nombreDivisa='CHF'; 
        
        cambiosList.add(wcTestTipoCambio);
        
            WRAPPER_AccountList.TipoDeCambio wcTestTipoCambio2 = new WRAPPER_AccountList.TipoDeCambio();
        wcTestTipoCambio2.claError='test';
        wcTestTipoCambio2.divisa='EUR';
        wcTestTipoCambio2.fecha='05/05/2019';
        wcTestTipoCambio2.tipError='test';
        wcTestTipoCambio2.importeDecimal=1.0;
        wcTestTipoCambio2.importe=1.0;
        wcTestTipoCambio2.nombreDivisa='EUR'; 
        
        cambiosList.add(wcTestTipoCambio2);
        
    	Map<String, Decimal> balanceValues = CNT_CountryBalance.getSumBalanceExperto('CHF', accountList,cambiosList);
    }
}