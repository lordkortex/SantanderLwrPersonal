/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
18/11/2020		A. Borraz     Initial version
23/02/2021		Andrea Martin	Add method getExchanfeAmount_Test
----------------------------------------------------------------------------------*/
@isTest
public class UtilitiesCurrency_Test {
  @testSetup
  static void setObjects() {
    Test.startTest();
    system.debug(exchangeRatesTest());
    Test.stopTest();
  }

  @isTest
  static Map<String, Decimal> exchangeRatesTest() {
    Map<String, Decimal> otherCurrencyType = new Map<String, Decimal>();
    otherCurrencyType.put('EUR', 0.9);
    otherCurrencyType.put('USD', 0.9);
    return UtilitiesCurrency.exchangeRates('EUR', 0.9, otherCurrencyType);
  }
  @isTest
  static void getExchanfeAmount_Test() {
    try {
      String currencySend = 'GBP';
      String currencyReceive = 'EUR';
      String dominantCurrency = 'EUR';
      Decimal valueSend = 10;
      Decimal valueReceive = null;
      Decimal valueDominant = 10;
      Test.startTest();
      UtilitiesCurrency.getExchangeAmount(
        currencySend,
        currencyReceive,
        dominantCurrency,
        valueSend,
        valueReceive,
        valueDominant
      );
      Test.stopTest();
    } catch (Exception e) {
      System.debug(
        'UtilitiesCurrency_Test.getExchanfeAmount_Test: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
  }
}
