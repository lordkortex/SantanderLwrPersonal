@isTest
public class CNT_GlobalPosition_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.getCustomSettingCryptoKey(true);
    }
    
    @isTest
    public static void getUserInfoTest(){              
        String data = CNT_GlobalPositionController.getUserInfo();
    }
    
    /*@isTest
    public static void doesntWorkLUTest(){
        
        String data = CNT_GlobalPositionController.doesntWorkLU();
    }*/
    
    @isTest
    public static void retrieveDataTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        user u = DataFactory.getRunningUser(true);
        System.runAs(u){   
            Test.startTest();
            CNT_GlobalPositionController data = CNT_GlobalPositionController.retrieveData(true, u.Id);
            CNT_GlobalPositionController dataLU = CNT_GlobalPositionController.retrieveData(false, u.Id);
            Test.stopTest();
        }
    }

    /*
    @isTest
    public static void handleExchangeRatesLUTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
        DataFactory.createWsConfigurationSetting(true);
String json='{'+
		'  \"accountsList\": {'+
		'    \"_links\": null,'+
		'    \"accountsDataList\": ['+
		'      {'+
		'        \"_links\": null,'+
		'        \"account\": null,'+
		'        \"accountIdList\": ['+
		'          {'+
		'            \"accountId\": \"ES4800490000000000000000\",'+
		'            \"idType\": \"IBA\"'+
		'          }'+
		'        ],'+
		'        \"alias\": null,'+
		'        \"availableBalance\": {'+
		'          \"amount\": 1000003.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"balanceAllowed\": null,'+
		'        \"bankDescription\": \"0001\",'+
		'        \"bankId\": \"BSCHESM0XXX\",'+
		'        \"country\": \"MX\",'+
		'        \"customerId\": null,'+
		'        \"customerName\": \"Customer1\",'+
		'        \"description\": null,'+
		'        \"displayNumber\": \"ES******00\",'+
		'        \"flags\": {'+
		'          \"pain002Active\": true,'+
		'          \"hasSwiftPayments\": true'+
		'        },'+
		'        \"hasSwiftPayment\": \"YES\",'+
		'        \"hasSwiftPayments\": null,'+
		'        \"internationalPaymentsAllowed\": null,'+
		'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
		'        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+
		'        \"mainBalance\": {'+
		'          \"amount\": 1000000.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"overdraftLimit\": null,'+
		'        \"overdraftUsed\": null,'+
		'        \"pain002Active\": true,'+
		'        \"parentCustomerName\": null,'+
		'        \"pendingBalance\": null,'+
		'        \"status\": null,'+
		'        \"transactionsAllowed\": null,'+
		'        \"type\": \"IBA\",'+
		'        \"withholdingBalance\": null'+
		'      },'+
		'      {'+
		'        \"_links\": null,'+
		'        \"account\": null,'+
		'        \"accountIdList\": ['+
		'          {'+
		'            \"accountId\": \"ES9000490000000000000011\",'+
		'            \"idType\": \"IBA\"'+
		'          }'+
		'        ],'+
		'        \"alias\": null,'+
		'        \"availableBalance\": {'+
		'          \"amount\": 1000003.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"balanceAllowed\": null,'+
		'        \"bankDescription\": \"0001\",'+
		'        \"bankId\": \"BSCHESM0XXX\",'+
		'        \"country\": \"ES\",'+
		'        \"customerId\": null,'+
		'        \"customerName\": \"Customer2\",'+
		'        \"description\": null,'+
		'        \"displayNumber\": \"ES******11\",'+
		'        \"flags\": {'+
		'          \"pain002Active\": true,'+
		'          \"hasSwiftPayments\": true'+
		'        },'+
		'        \"hasSwiftPayment\": \"YES\",'+
		'        \"hasSwiftPayments\": null,'+
		'        \"internationalPaymentsAllowed\": null,'+
		'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
		'        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+
		'        \"mainBalance\": {'+
		'          \"amount\": 1000000.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"overdraftLimit\": null,'+
		'        \"overdraftUsed\": null,'+
		'        \"pain002Active\": true,'+
		'        \"parentCustomerName\": \"Customer1\",'+
		'        \"pendingBalance\": null,'+
		'        \"status\": null,'+
		'        \"transactionsAllowed\": null,'+
		'        \"type\": \"IBA\",'+
		'        \"withholdingBalance\": null'+
		'      },'+
		'      {'+
		'        \"_links\": null,'+
		'        \"account\": null,'+
		'        \"accountIdList\": ['+
		'          {'+
		'            \"accountId\": \"ES8100490075473000562155\",'+
		'            \"idType\": \"IBA\"'+
		'          }'+
		'        ],'+
		'        \"alias\": null,'+
		'        \"availableBalance\": {'+
		'          \"amount\": 1000003.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"balanceAllowed\": null,'+
		'        \"bankDescription\": \"0001\",'+
		'        \"bankId\": \"BSCHESM0XXX\",'+
		'        \"country\": \"ES\",'+
		'        \"customerId\": null,'+
		'        \"customerName\": \"Customer2\",'+
		'        \"description\": null,'+
		'        \"displayNumber\": \"ES******55\",'+
		'        \"flags\": {'+
		'          \"pain002Active\": true,'+
		'          \"hasSwiftPayments\": true'+
		'        },'+
		'        \"hasSwiftPayment\": \"YES\",'+
		'        \"hasSwiftPayments\": null,'+
		'        \"internationalPaymentsAllowed\": null,'+
		'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
		'        \"lastUpdateSwiftPayment\": \"2019-10-04T11:38:00Z\",'+
		'        \"mainBalance\": {'+
		'          \"amount\": 1000000.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"overdraftLimit\": null,'+
		'        \"overdraftUsed\": null,'+
		'        \"pain002Active\": true,'+
		'        \"parentCustomerName\": null,'+
		'        \"pendingBalance\": null,'+
		'        \"status\": null,'+
		'        \"transactionsAllowed\": null,'+
		'        \"type\": \"IBA\",'+
		'        \"withholdingBalance\": null'+
		'      },'+
		'      {'+
		'        \"_links\": null,'+
		'        \"account\": null,'+
		'        \"accountIdList\": ['+
		'          {'+
		'            \"accountId\": \"ES1000490072012110458432\",'+
		'            \"idType\": \"IBA\"'+
		'          }'+
		'        ],'+
		'        \"alias\": null,'+
		'        \"availableBalance\": {'+
		'          \"amount\": 1000003.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"balanceAllowed\": null,'+
		'        \"bankDescription\": \"0001\",'+
		'        \"bankId\": \"BSCHESM0XXX\",'+
		'        \"country\": \"ES\",'+
		'        \"customerId\": null,'+
		'        \"customerName\": \"Customer3\",'+
		'        \"description\": null,'+
		'        \"displayNumber\": \"ES******32\",'+
		'        \"flags\": {'+
		'          \"pain002Active\": true,'+
		'          \"hasSwiftPayments\": true'+
		'        },'+
		'        \"hasSwiftPayment\": \"YES\",'+
		'        \"hasSwiftPayments\": null,'+
		'        \"internationalPaymentsAllowed\": null,'+
		'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
		'        \"lastUpdateSwiftPayment\": \"2020-04-01T10:57:00Z\",'+
		'        \"mainBalance\": {'+
		'          \"amount\": 1000000.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"overdraftLimit\": null,'+
		'        \"overdraftUsed\": null,'+
		'        \"pain002Active\": true,'+
		'        \"parentCustomerName\": null,'+
		'        \"pendingBalance\": null,'+
		'        \"status\": null,'+
		'        \"transactionsAllowed\": null,'+
		'        \"type\": \"IBA\",'+
		'        \"withholdingBalance\": null'+
		'      }'+
		'    ]'+
		'  }'+
		'}';
            
            
            
            WRAPPER_Balance_LU r = WRAPPER_Balance_LU.parse(json);
            CNT_GlobalPositionController.handleExchangeRatesLU(r,CNT_GlobalPositionController.retrieveData(true, ''));
        }
    }*/
      @isTest
    public static void groupAccountsLUTest(){
        Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            String json='{'+
		'  \"accountsList\": {'+
		'    \"_links\": null,'+
		'    \"accountsDataList\": ['+
		'      {'+
		'        \"_links\": null,'+
		'        \"account\": null,'+
		'        \"accountIdList\": ['+
		'          {'+
		'            \"accountId\": \"ES4800490000000000000000\",'+
		'            \"idType\": \"IBA\"'+
		'          }'+
		'        ],'+
		'        \"alias\": null,'+
		'        \"availableBalance\": {'+
		'          \"amount\": 1000003.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"balanceAllowed\": null,'+
		'        \"bankDescription\": \"0001\",'+
		'        \"bankId\": \"BSCHESM0XXX\",'+
		'        \"country\": \"MX\",'+
		'        \"customerId\": null,'+
		'        \"customerName\": \"Customer1\",'+
		'        \"description\": null,'+
		'        \"displayNumber\": \"ES******00\",'+
		'        \"flags\": {'+
		'          \"pain002Active\": true,'+
		'          \"hasSwiftPayments\": true'+
		'        },'+
		'        \"hasSwiftPayment\": \"YES\",'+
		'        \"hasSwiftPayments\": null,'+
		'        \"internationalPaymentsAllowed\": null,'+
		'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
		'        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+
		'        \"mainBalance\": {'+
		'          \"amount\": 1000000.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"overdraftLimit\": null,'+
		'        \"overdraftUsed\": null,'+
		'        \"pain002Active\": true,'+
		'        \"parentCustomerName\": null,'+
		'        \"pendingBalance\": null,'+
		'        \"status\": null,'+
		'        \"transactionsAllowed\": null,'+
		'        \"type\": \"IBA\",'+
		'        \"withholdingBalance\": null'+
		'      },'+
		'      {'+
		'        \"_links\": null,'+
		'        \"account\": null,'+
		'        \"accountIdList\": ['+
		'          {'+
		'            \"accountId\": \"ES9000490000000000000011\",'+
		'            \"idType\": \"IBA\"'+
		'          }'+
		'        ],'+
		'        \"alias\": null,'+
		'        \"availableBalance\": {'+
		'          \"amount\": 1000003.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"balanceAllowed\": null,'+
		'        \"bankDescription\": \"0001\",'+
		'        \"bankId\": \"BSCHESM0XXX\",'+
		'        \"country\": \"ES\",'+
		'        \"customerId\": null,'+
		'        \"customerName\": \"Customer2\",'+
		'        \"description\": null,'+
		'        \"displayNumber\": \"ES******11\",'+
		'        \"flags\": {'+
		'          \"pain002Active\": true,'+
		'          \"hasSwiftPayments\": true'+
		'        },'+
		'        \"hasSwiftPayment\": \"YES\",'+
		'        \"hasSwiftPayments\": null,'+
		'        \"internationalPaymentsAllowed\": null,'+
		'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
		'        \"lastUpdateSwiftPayment\": \"2020-03-03T00:00:00Z\",'+
		'        \"mainBalance\": {'+
		'          \"amount\": 1000000.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"overdraftLimit\": null,'+
		'        \"overdraftUsed\": null,'+
		'        \"pain002Active\": true,'+
		'        \"parentCustomerName\": \"Customer1\",'+
		'        \"pendingBalance\": null,'+
		'        \"status\": null,'+
		'        \"transactionsAllowed\": null,'+
		'        \"type\": \"IBA\",'+
		'        \"withholdingBalance\": null'+
		'      },'+
		'      {'+
		'        \"_links\": null,'+
		'        \"account\": null,'+
		'        \"accountIdList\": ['+
		'          {'+
		'            \"accountId\": \"ES8100490075473000562155\",'+
		'            \"idType\": \"IBA\"'+
		'          }'+
		'        ],'+
		'        \"alias\": null,'+
		'        \"availableBalance\": {'+
		'          \"amount\": 1000003.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"balanceAllowed\": null,'+
		'        \"bankDescription\": \"0001\",'+
		'        \"bankId\": \"BSCHESM0XXX\",'+
		'        \"country\": \"ES\",'+
		'        \"customerId\": null,'+
		'        \"customerName\": \"Customer2\",'+
		'        \"description\": null,'+
		'        \"displayNumber\": \"ES******55\",'+
		'        \"flags\": {'+
		'          \"pain002Active\": true,'+
		'          \"hasSwiftPayments\": true'+
		'        },'+
		'        \"hasSwiftPayment\": \"YES\",'+
		'        \"hasSwiftPayments\": null,'+
		'        \"internationalPaymentsAllowed\": null,'+
		'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
		'        \"lastUpdateSwiftPayment\": \"2019-10-04T11:38:00Z\",'+
		'        \"mainBalance\": {'+
		'          \"amount\": 1000000.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"overdraftLimit\": null,'+
		'        \"overdraftUsed\": null,'+
		'        \"pain002Active\": true,'+
		'        \"parentCustomerName\": null,'+
		'        \"pendingBalance\": null,'+
		'        \"status\": null,'+
		'        \"transactionsAllowed\": null,'+
		'        \"type\": \"IBA\",'+
		'        \"withholdingBalance\": null'+
		'      },'+
		'      {'+
		'        \"_links\": null,'+
		'        \"account\": null,'+
		'        \"accountIdList\": ['+
		'          {'+
		'            \"accountId\": \"ES1000490072012110458432\",'+
		'            \"idType\": \"IBA\"'+
		'          }'+
		'        ],'+
		'        \"alias\": null,'+
		'        \"availableBalance\": {'+
		'          \"amount\": 1000003.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"balanceAllowed\": null,'+
		'        \"bankDescription\": \"0001\",'+
		'        \"bankId\": \"BSCHESM0XXX\",'+
		'        \"country\": \"ES\",'+
		'        \"customerId\": null,'+
		'        \"customerName\": \"Customer3\",'+
		'        \"description\": null,'+
		'        \"displayNumber\": \"ES******32\",'+
		'        \"flags\": {'+
		'          \"pain002Active\": true,'+
		'          \"hasSwiftPayments\": true'+
		'        },'+
		'        \"hasSwiftPayment\": \"YES\",'+
		'        \"hasSwiftPayments\": null,'+
		'        \"internationalPaymentsAllowed\": null,'+
		'        \"lastTransactionDate\": \"2020-03-03T00:00:00Z\",'+
		'        \"lastUpdateSwiftPayment\": \"2020-04-01T10:57:00Z\",'+
		'        \"mainBalance\": {'+
		'          \"amount\": 1000000.0,'+
		'          \"currencyCode\": \"EUR\",'+
		'          \"lastUpdate\": \"2020-04-02T10:01:56.392Z\"'+
		'        },'+
		'        \"overdraftLimit\": null,'+
		'        \"overdraftUsed\": null,'+
		'        \"pain002Active\": true,'+
		'        \"parentCustomerName\": null,'+
		'        \"pendingBalance\": null,'+
		'        \"status\": null,'+
		'        \"transactionsAllowed\": null,'+
		'        \"type\": \"IBA\",'+
		'        \"withholdingBalance\": null'+
		'      }'+
		'    ]'+
		'  }'+
		'}';
            
            
            Test.startTest();
            WRAPPER_Balance_LU r = WRAPPER_Balance_LU.parse(json);
            CNT_GlobalPositionController.groupAccountsLU(r,CNT_GlobalPositionController.retrieveData(false, u.Id));
            Test.stopTest();
        }
    }
    
        @isTest
    static void decryptDataTest(){
        Test.startTest();     
        CNT_GlobalPositionController.decryptData( Global_Utilities.encryptData('Test'));
        Test.stopTest();
    }
    
         @isTest
    public static void encryotDataTest(){
        Test.startTest();
        CNT_GlobalPositionController.encryptData('hola');
        Test.stopTest();
    }
    
        @isTest
    public static void getIsCashNexusTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            CNT_GlobalPositionController.getIsCashNexus();
        }
    }
    
            @isTest
    public static void setUserCurrencyTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){           
            CNT_GlobalPositionController.setUserCurrency('EUR');
        }
    }

}