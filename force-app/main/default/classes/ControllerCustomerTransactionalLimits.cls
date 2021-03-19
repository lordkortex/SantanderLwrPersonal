public with sharing class ControllerCustomerTransactionalLimits {
  public static final String PRODUCT_ID_001 = System.Label.CNF_payment_productId_001; // book_to_book
  public static final String PRODUCT_ID_002 = System.Label.CNF_payment_productId_002; // international_instant_payment
  public static final String PRODUCT_ID_003 = System.Label.CNF_payment_productId_003; // do_and_follow
  public static final String MULTI_ONE_TRADE = System.Label.PAY_ServiceAPILine_001; // 'MULTI_ONE_TRADE';
  public static final String NEXUS = System.Label.PAY_ServiceAPILine_002; // 'NEXUS';
  public static final String LOCAL_BANKING = System.Label.PAY_ServiceAPILine_003; // 'LOCAL_BANKING';

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to an external WS to cancel a previously validated transaction,
                    which removes it from transactional counters for accumulated limits
    History:
    <Date>          <Author>                <Description>
    16/09/2020      Shahad Naji             Initial version
    19/01/2021      Shahad Naji             Creates another reverseLimits to be called when it is required by the action of a payment process
    04/03/2021      Bea Hill                Remove the productId from the condition so that the method depends only on user type.
    */
  @AuraEnabled
  public static ReturnValue reverseLimits(
    WRAPPER_PaymentDetail.OperationDetail paymentData
  ) {
    ReturnValue response = null;
    Map<String, Object> value = new Map<String, Object>();
    try {
      if (paymentData != null) {
        String serviceAPILine = ServiceAPILine.getAPILine();
        if (String.isNotBlank(serviceAPILine)) {
          if (
            serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) ||
            serviceAPILine.equalsIgnoreCase(NEXUS)
          ) {
            return new ReturnValue(true);
          } else if (serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)) {
            // TO-DO
          } else {
            return new ReturnValue(true);
          }
        } else {
          throw new CustomException('ERROR: Invalid data');
        }
      } else {
        throw new CustomException('ERROR: Invalid data');
      }
      if (value != null) {
        response = new ReturnValue(true, value);
      } else {
        response = new ReturnValue(false);
      }
    } catch (Exception e) {
      System.debug(
        'ControllerCustomerTransactionalLimits.reverseLimits: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
    }
    return response;
  }

  /*
    Author:         Candido Parejo
    Company:        Deloitte
    Description:    Makes a call to an external WS to cancel a previously validated transaction,
                    which removes it from transactional counters for accumulated limits
    History:
    <Date>          <Author>                <Description>
    01/02/2021      Candido Parejo          Initial version
    04/03/2021      Bea Hill                Remove the productId from the condition so that the method depends only on user type.
    */
  @AuraEnabled
  public static ReturnValue reverseLimits(
    WRAPPER_PAY_PaymentDraft paymentDraft
  ) {
    ReturnValue response = null;
    Map<String, Object> value = new Map<String, Object>();
    try {
      String serviceAPILine = ServiceAPILine.getAPILine();
      if (String.isNotBlank(serviceAPILine)) {
        if (
          serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) ||
          serviceAPILine.equalsIgnoreCase(NEXUS)
        ) {
          return new ReturnValue(true);
        } else if (serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)) {
          value = ServiceCustomerTransactionalLimits.transactionalLimitsReverse(
            paymentDraft
          );
        } else {
          return new ReturnValue(true);
        }
      }
      if (value != null) {
        response = new ReturnValue(true, value);
      } else {
        response = new ReturnValue(false);
      }
    } catch (Exception e) {
      System.debug(
        'ControllerCustomerTransactionalLimits.reverseLimits: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
    }
    return response;
  }

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits and,
                    if the transaction is validated successfully, updates the accumulated limit.
    History:
    <Date>          <Author>                <Description>
    29/11/2020      Shahad Naji             Initial version
    04/03/2021      Bea Hill                Remove the productId from the condition so that the method depends only on user type.
    */
  @AuraEnabled
  public static ReturnValue updateLimits(
    WRAPPER_PaymentDetail.OperationDetail paymentData
  ) {
    ReturnValue response = null;
    Map<String, Object> value = new Map<String, Object>();
    try {
      String serviceAPILine = ServiceAPILine.getAPILine();
      if (paymentData != null) {
        if (serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)) {
          response = ServiceCustomerTransactionalLimits.updateLimits(
            paymentData
          );
        } else {
          response = new ReturnValue(true);
        }
      } else {
        throw new CustomException('ERROR: Invalid data');
      }
    } catch (Exception e) {
      System.debug(
        'ControllerCustomerTransactionalLimits.updateLimits: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
    }
    return response;
  }

  /*
    Author:         Candido Parejo
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits and,
                    if the transaction is validated successfully, updates the accumulated limit.
    History:
    <Date>          <Author>                <Description>
    01/02/2021      Candido Parejo          Initial version
    04/03/2021      Bea Hill                Remove the productId from the condition so that the method depends only on user type.

    */
  @AuraEnabled
  public static ReturnValue updateLimits(
    WRAPPER_PAY_PaymentDraft paymentDraft
  ) {
    ReturnValue response = null;
    Map<String, Object> value = new Map<String, Object>();
    Decimal baseAmount = null;
    String baseCurrency = '';
    try {
      if (
        paymentDraft.sourceAccount != null &&
        paymentDraft.amountSend != null
      ) {
        if (
          String.isNotBlank(paymentDraft.sourceAccount.country) &&
          String.isNotBlank(
            paymentDraft.sourceAccount.currencyCodeAvailableBalance
          )
        ) {
          baseCurrency = Global_Utilities.getCountryCurrency(
            paymentDraft.sourceAccount.country
          );
          if (
            paymentDraft.sourceAccount.currencyCodeAvailableBalance ==
            baseCurrency || String.isBlank(baseCurrency)
          ) {
            baseCurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance;
            baseAmount = paymentDraft.amountSend;
          } else {
            baseAmount = UtilitiesCurrency.convertCurrency(
              paymentDraft.sourceAccount.currencyCodeAvailableBalance,
              baseCurrency,
              paymentDraft.amountSend
            );
            baseAmount = baseAmount.setScale(5, RoundingMode.DOWN);
          }
        }
      } else {
        return new ReturnValue(false);
      }
      String serviceAPILine = ServiceAPILine.getAPILine();
      if (
        serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) ||
        serviceAPILine.equalsIgnoreCase(NEXUS)
      ) {
        throw new CustomException('ERROR: Invalid data');
      } else if (serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)) {
        value = ServiceCustomerTransactionalLimits.callTransactionalLimitsUpdate(
          paymentDraft
        );
      }
      if (value != null) {
        response = new ReturnValue(true, value);
      } else {
        response = new ReturnValue(false);
      }
    } catch (Exception e) {
      System.debug(
        'ControllerCustomerTransactionalLimits.updateLimits: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
    }
    return response;
  }

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits.
    History:
    <Date>          <Author>                <Description>
    29/11/2020      Shahad Naji             Initial version
    04/03/2021      Bea Hill                Remove the productId from the condition so that the method depends only on user type.

    */
  @AuraEnabled
  public static ReturnValue validateLimits(
    WRAPPER_PaymentDetail.OperationDetail paymentData
  ) {
    ReturnValue response = null;
    Map<String, Object> value = new Map<String, Object>();
    try {
      if (paymentData != null) {
        String serviceAPILine = ServiceAPILine.getAPILine();
        if (
          serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) ||
          serviceAPILine.equalsIgnoreCase(NEXUS)
        ) {
          value = ServiceCustomerTransactionalLimits.callTransactionalLimits(
            paymentData
          );
        } else if (serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)) {
          value = ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(
            paymentData
          );
        }
        if (value != null) {
          response = new ReturnValue(true, value);
        } else {
          response = new ReturnValue(false);
        }
      } else {
        response = new ReturnValue(false);
      }
    } catch (Exception e) {
      System.debug(
        'ControllerCustomerTransactionalLimits.validateLimits: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
    }
    return response;
  }

  /*
    Author:         Candido
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits.
    History:
    <Date>          <Author>            <Description>
    29/11/2020      Candido             Initial version
    04/03/2021      Bea Hill            Remove the productId from the condition so that the method depends only on user type.

    */
  @AuraEnabled
  public static ReturnValue validateLimits(
    WrapperUserData userData,
    WRAPPER_PAY_PaymentDraft paymentDraft
  ) {
    ReturnValue response = null;
    Map<String, Object> value = new Map<String, Object>();
    Decimal baseAmount = null;
    String baseCurrency = '';
    try {
      if (
        paymentDraft.sourceAccount != null &&
        paymentDraft.amountSend != null
      ) {
        if (
          String.isNotBlank(paymentDraft.sourceAccount.country) &&
          String.isNotBlank(
            paymentDraft.sourceAccount.currencyCodeAvailableBalance
          )
        ) {
          baseCurrency = Global_Utilities.getCountryCurrency(
            paymentDraft.sourceAccount.country
          );
          if (
            paymentDraft.sourceAccount.currencyCodeAvailableBalance ==
            baseCurrency || String.isBlank(baseCurrency)
          ) {
            baseCurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance;
            baseAmount = paymentDraft.amountSend;
          } else {
            baseAmount = UtilitiesCurrency.convertCurrency(
              paymentDraft.sourceAccount.currencyCodeAvailableBalance,
              baseCurrency,
              paymentDraft.amountSend
            );
            baseAmount = baseAmount.setScale(5, RoundingMode.DOWN);
          }
        }
      } else {
        return new ReturnValue(false);
      }
      String serviceAPILine = ServiceAPILine.getAPILine(userData);
      if (
        serviceAPILine.equalsIgnoreCase(MULTI_ONE_TRADE) ||
        serviceAPILine.equalsIgnoreCase(NEXUS)
      ) {
        value = ServiceCustomerTransactionalLimits.callTransactionalLimits(
          userData,
          paymentDraft,
          baseAmount,
          baseCurrency
        );
      } else if (serviceAPILine.equalsIgnoreCase(LOCAL_BANKING)) {
        value = ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation(
          paymentDraft,
          baseAmount,
          baseCurrency
        );
      }
      if (value != null) {
        response = new ReturnValue(true, value);
      } else {
        response = new ReturnValue(false);
      }
    } catch (Exception e) {
      System.debug(
        'ControllerCustomerTransactionalLimits.validateLimits: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
    }
    return response;
  }
}
