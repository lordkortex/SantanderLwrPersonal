global with sharing class ServicePaymentLine {
  public static final String PRODUCT_ID_001 = System.Label.CNF_payment_productId_001; // book_to_book
  public static final String PRODUCT_ID_002 = System.Label.CNF_payment_productId_002; // international_instant_payment
  public static final String PRODUCT_ID_003 = System.Label.CNF_payment_productId_003;
  public static final String PRODUCT_ID_004 = System.Label.CNF_payment_productId_004;

  public static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; // 'MULTI_ONE_TRADE';
  public static final String NEXUS = System.Label.PAY_ServiceAPILine_002; // 'NEXUS';
  public static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003; // 'LOCAL_BANKING';
  public static final String INSTANT_TRANSFER = System.Label.PTT_instant_transfer;
  public static final String INTERNATIONAL_TRANSFER_SINGLE = System.Label.PTT_international_transfer_single;
  public static final String SERVICE_ID_001 = 'add_international_payment_internal';
  public static final String SERVICE_ID_002 = 'add_inter_paym_int_cust_diff_group';
  public static final String SERVICE_ID_003 = 'add_international_payment_external';

  global static Map<String, String> getPaymentLine(
    String transferType,
    WRAPPER_PAY_PaymentDraft paymentDraft
  ) {
    Map<String, String> paymentLine = new Map<String, String>();
    String productId = '';
    String serviceId = '';
    if (transferType.equalsIgnoreCase(INSTANT_TRANSFER)) {
      //book_to_book
      productId = PRODUCT_ID_001;
      serviceId = SERVICE_ID_001;
    } else if (transferType.equalsIgnoreCase(INTERNATIONAL_TRANSFER_SINGLE)) {
      if (
        paymentDraft.destinationAccount == null ||
        String.isBlank(
          paymentDraft.destinationAccount.currencyCodeAvailableBalance
        ) ||
        String.isBlank(paymentDraft.paymentCurrency)
      ) {
        System.debug('ServicePaymentLine.getPaymentLine');
        throw new customException('ERROR: ServicePaymentLine.getPaymentLine');
      } else {
        Boolean isSantader = ServicePaymentLine.isSantander(
          paymentDraft.destinationAccount
        );
        system.debug(isSantader);
        system.debug(paymentDraft.paymentCurrency);
        system.debug(
          paymentDraft.destinationAccount.currencyCodeAvailableBalance
        );
        system.debug(PRODUCT_ID_002);
        system.debug(PRODUCT_ID_003);
        if (
          isSantader &&
          paymentDraft.paymentCurrency.equalsIgnoreCase(
            paymentDraft.destinationAccount.currencyCodeAvailableBalance
          )
        ) {
          //PAGO IIP
          productId = PRODUCT_ID_002;
          serviceId = SERVICE_ID_002;
        } else {
          productId = PRODUCT_ID_003;
          serviceId = SERVICE_ID_003;
        }
      }
    }
    paymentLine.put('productId', productId);
    paymentLine.put('serviceId', serviceId);
    return paymentLine;
  }

  private static Boolean isSantander(
    WRAPPER_AccountList.AccountDetails destinationAccount
  ) {
    Boolean isSantander = false;
    List<String> santanderBankCounries = new List<String>();
    santanderBankCounries.add('ES');
    santanderBankCounries.add('GB');
    santanderBankCounries.add('PL');
    if (
      destinationAccount == null || String.isBlank(destinationAccount.country)
    ) {
      System.debug('ServicePaymentLine.isSantander');
      throw new customException('ERROR: ServicePaymentLine.isSantander');
    } else {
      if (santanderBankCounries.contains(destinationAccount.country)) {
        isSantander = true;
      } else {
        if (destinationAccount.country.equalsIgnoreCase('BR')) {
          if (
            String.isBlank(destinationAccount.idType) ||
            String.isBlank(destinationAccount.bankName) ||
            String.isBlank(destinationAccount.displayNumber)
          ) {
            System.debug('ServicePaymentLine.isSantander');
            throw new customException('ERROR: ServicePaymentLine.isSantander');
          } else {
            if (
              destinationAccount.idType.equalsIgnoreCase('BBA') &&
              destinationAccount.bankName.equalsIgnoreCase('SAN Brasil')
            ) {
              isSantander = true;
            } else if (destinationAccount.idType.equalsIgnoreCase('IBA')) {
              if (destinationAccount.displayNumber.length() > 12) {
                String displayNumber_aux = destinationAccount.displayNumber.substring(
                  4,
                  12
                );
                if (displayNumber_aux.equalsIgnoreCase('90400888')) {
                  isSantander = true;
                }
              }
            }
          }
        }
      }
    }
    return isSantander;
  }
}
