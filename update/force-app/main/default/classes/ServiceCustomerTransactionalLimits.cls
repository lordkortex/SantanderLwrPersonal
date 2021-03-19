global with sharing class ServiceCustomerTransactionalLimits {
  global static final String PRODUCT_ID_001 = System.Label.CNF_payment_productId_001; // book_to_book
  global static final String PRODUCT_ID_002 = System.Label.CNF_payment_productId_002; // international_instant_payment

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to an external WS to cancel a previously validated transaction,
                    which removes it from transactional counters for accumulated limits
    History
    <Date>          <Author>                <Description>
    16/09/2020      Shahad Naji             Initial version
    19/01/2021      Shahad Naji             Creates another reverseLimits to be called when it is required by the action of a payment process
    */
  global static Map<String, Object> transactionalLimitsReverse(
    WRAPPER_PaymentDetail.OperationDetail paymentData
  ) {
    Map<String, Object> value = new Map<String, Object>();
    try {
      WS_TransactionalLimitsReverse transactionalLimitsReverse = new WS_TransactionalLimitsReverse();
      WS_TransactionalLimitsReverse.OUTPUT output = transactionalLimitsReverse.execute(
        paymentData
      );
      if (output != null) {
        value = getTransactionalLimitsReverse(output);
      } else {
        return null;
      }
    } catch (Exception e) {
      System.debug(
        'ServiceCustomerTransactionalLimits.transactionalLimitsReverse: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      return value;
    }
    return value;
  }

  /*
    Author:         Candido Parejo
    Company:        Deloitte
    Description:    Makes a call to an external WS to cancel a previously validated transaction,
                    which removes it from transactional counters for accumulated limits
    History:
    <Date>          <Author>                <Description>
    01/02/2021      Candido Parejo          Initial version
    */
  global static Map<String, Object> transactionalLimitsReverse(
    WRAPPER_PAY_PaymentDraft paymentDraft
  ) {
    Map<String, Object> value = new Map<String, Object>();
    try {
      String transactionDate = String.valueOf(Date.today());
      WS_TransactionalLimitsReverse.TransactionContract transactionContract = null;
      WS_TransactionalLimitsReverse.TransactionAmount transactionAmount = null;
      WS_TransactionalLimitsReverse.TransactionAmount transactionAmountBaseCurrency = null;
      String country = null;
      String codigoBic = null;
      if (paymentDraft != null) {
        if (paymentDraft.sourceAccount != null) {
          if (
            String.isNotBlank(paymentDraft.sourceAccount.idType) &&
            String.isNotBlank(paymentDraft.sourceAccount.displayNumber)
          ) {
            transactionContract = new WS_TransactionalLimitsReverse.TransactionContract(
              paymentDraft.sourceAccount.idType,
              paymentDraft.sourceAccount.displayNumber
            );
          } else {
            return null;
          }
          country = String.isNotBlank(paymentDraft.sourceAccount.country)
            ? paymentDraft.sourceAccount.country
            : '';
          codigoBic = String.isNotBlank(paymentDraft.sourceAccount.codigoBic)
            ? paymentDraft.sourceAccount.codigoBic
            : '';
        } else {
          return null;
        }
        if (
          paymentDraft.amountSend != null &&
          String.isNotBlank(
            paymentDraft.sourceAccount.currencyCodeAvailableBalance
          )
        ) {
          transactionAmount = new WS_TransactionalLimitsReverse.TransactionAmount(
            String.valueOf(paymentDraft.amountSend),
            paymentDraft.sourceAccount.currencyCodeAvailableBalance
          );
        } else {
          return null;
        }
        if (
          paymentDraft.baseAmount != null &&
          String.isNotBlank(paymentDraft.baseCurrency)
        ) {
          transactionAmountBaseCurrency = new WS_TransactionalLimitsReverse.TransactionAmount(
            String.valueOf(paymentDraft.baseAmount),
            paymentDraft.baseCurrency
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
      WS_TransactionalLimitsReverse transactionalLimitsReverse = new WS_TransactionalLimitsReverse();
      WS_TransactionalLimitsReverse.OUTPUT output = transactionalLimitsReverse.execute(
        country,
        codigoBic,
        paymentDraft.paymentId,
        paymentDraft.serviceId,
        transactionDate,
        transactionContract,
        transactionAmount,
        transactionAmountBaseCurrency,
        null,
        null,
        null
      );
      value = getTransactionalLimitsReverse(output);
      if (output != null) {
        value = getTransactionalLimitsReverse(output);
      } else {
        return null;
      }
    } catch (Exception e) {
      System.debug(
        'ServiceCustomerTransactionalLimits.transactionalLimitsReverse: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      return null;
    }
    return value;
  }

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits and,
                    if the transaction is validated successfully, updates the accumulated limit.
    History:
    <Date>          <Author>                <Description>
    29/11/2020      Shahad Naji             Initial version
    */
  global static ReturnValue updateLimits(
    WRAPPER_PaymentDetail.OperationDetail paymentData
  ) {
    ReturnValue response = null;
    Map<String, Object> value = new Map<String, Object>();
    try {
      WS_TransactionalLimitsUpdate transactionalLimitsUpdate = new WS_TransactionalLimitsUpdate();
      WS_TransactionalLimitsUpdate.OUTPUT output = transactionalLimitsUpdate.execute(
        paymentData
      );
      if (output != null) {
        if (output.limitsResult == 'ok') {
          response = new ReturnValue(true);
        } else {
          response = new ReturnValue(false);
        }
      } else {
        response = new ReturnValue(false);
      }
    } catch (Exception e) {
      System.debug(
        'ServiceCustomerTransactionalLimits.updateLimits: ' +
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
    01/02/2021      Candido Parejo          Refactorized with WRAPPER_PAY_PaymentDraft
    */
  global static Map<String, Object> callTransactionalLimitsUpdate(
    WRAPPER_PAY_PaymentDraft paymentDraft
  ) {
    Map<String, Object> value = new Map<String, Object>();
    try {
      WS_TransactionalLimitsUpdate transactionalLimits = new WS_TransactionalLimitsUpdate();
      WS_TransactionalLimitsUpdate.OUTPUT output = transactionalLimits.execute(
        paymentDraft
      );
      value = ServiceCustomerTransactionalLimits.getTransactionalLimitsUpdateOutput(
        output
      );
    } catch (Exception e) {
      System.debug(
        'ServiceCustomerTransactionalLimits.callTransactionalLimitsUpdate: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      value = null;
    }
    return value;
  }

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits.
    History:
    <Date>          <Author>                <Description>
    29/11/2020      Shahad Naji             Initial version
    */
  global static Map<String, Object> callTransactionalLimits(
    WRAPPER_PaymentDetail.OperationDetail paymentData
  ) {
    Map<String, Object> value = new Map<String, Object>();
    try {
      System.debug('INFO: Currenly this function is not required');
    } catch (Exception e) {
      System.debug(
        'ServiceCustomerTransactionalLimits.callTransactionalLimits: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      value = null;
    }
    return value;
  }

  /*
    Author:         Candido
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits.
    History:
    <Date>          <Author>                <Description>
    01/02/2021      Candido                 Refactorized with WRAPPER_PAY_PaymentDraft
    */
  global static Map<String, Object> callTransactionalLimits(
    WrapperUserData userData,
    WRAPPER_PAY_PaymentDraft paymentDraft,
    Decimal baseAmount,
    String baseCurrency
  ) {
    Map<String, Object> value = new Map<String, Object>();
    try {
      WS_TransactionalLimits transactionalLimits = new WS_TransactionalLimits(
        'b2b',
        paymentDraft.paymentId,
        userData
      );
      value = transactionalLimits.execute(
        paymentDraft,
        baseAmount,
        baseCurrency
      );
    } catch (Exception e) {
      System.debug(
        'ServiceCustomerTransactionalLimits.callTransactionalLimits: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      value = null;
    }
    return value;
  }

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits.
    History:
    <Date>          <Author>                <Description>
    29/11/2020      Shahad Naji             Initial version
    */
  global static Map<String, Object> callTransactionalLimitsValidation(
    WRAPPER_PaymentDetail.OperationDetail paymentData
  ) {
    Map<String, Object> value = new Map<String, Object>();
    try {
      WS_TransactionalLimitsValidation transactionalLimits = new WS_TransactionalLimitsValidation();
      WS_TransactionalLimitsValidation.OUTPUT output = transactionalLimits.execute(
        paymentData
      );
      if (output != null) {
        value = ServiceCustomerTransactionalLimits.getTransactionalLimitsValidationOutput(
          output
        );
      } else {
        value = null;
      }
    } catch (Exception e) {
      System.debug(
        'ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      value = null;
    }
    return value;
  }

  /*
    Author:         Candido
    Company:        Deloitte
    Description:    Makes a call to an external WS to validate if a transaction can be processed on behalf of a customer according to their transactional limits.
    History:
    <Date>          <Author>                <Description>
    01/02/2021      Candido                 Refactorized with WRAPPER_PAY_PaymentDraft
    */
  global static Map<String, Object> callTransactionalLimitsValidation(
    WRAPPER_PAY_PaymentDraft paymentDraft,
    Decimal baseAmount,
    String baseCurrency
  ) {
    Map<String, Object> value = new Map<String, Object>();
    try {
      WS_TransactionalLimitsValidation transactionalLimits = new WS_TransactionalLimitsValidation();
      WS_TransactionalLimitsValidation.OUTPUT output = transactionalLimits.execute(
        paymentDraft,
        baseAmount,
        baseCurrency
      );
      if (output != null) {
        value = ServiceCustomerTransactionalLimits.getTransactionalLimitsValidationOutput(
          output
        );
      } else {
        value = null;
      }
    } catch (Exception e) {
      System.debug(
        'ServiceCustomerTransactionalLimits.callTransactionalLimitsValidation: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      value = null;
    }
    return value;
  }

  @TestVisible
  private static Map<String, Object> getTransactionalLimitsValidationOutput(
    WS_TransactionalLimitsValidation.OUTPUT output
  ) {
    Map<String, Object> result = new Map<String, Object>();
    String limitsResult = '';
    String errorMessage = '';
    if (output != null) {
      if (String.isNotBlank(output.limitsResult)) {
        if (output.limitsResult == 'ok') {
          limitsResult = output.limitsResult;
          errorMessage = null;
        } else {
          limitsResult = output.limitsResult;
          errorMessage = output.codeLimitsResult;
        }
      }
    }
    result.put('limitsResult', limitsResult);
    result.put('errorMessage', errorMessage);
    result.put('output', output);
    return result;
  }

  @TestVisible
  private static Map<String, Object> getTransactionalLimitsUpdateOutput(
    WS_TransactionalLimitsUpdate.OUTPUT output
  ) {
    Map<String, Object> result = new Map<String, Object>();
    String limitsResult = '';
    String errorMessage = '';
    if (output != null) {
      if (String.isNotBlank(output.limitsResult)) {
        if (output.limitsResult == 'ok') {
          limitsResult = output.limitsResult;
          errorMessage = null;
        } else {
          limitsResult = output.limitsResult;
          errorMessage = output.codeLimitsResult;
        }
      }
    }
    result.put('limitsResult', limitsResult);
    result.put('errorMessage', errorMessage);
    result.put('output', output);
    return result;
  }

  @TestVisible
  private static Map<String, Object> getTransactionalLimitsReverse(
    WS_TransactionalLimitsReverse.OUTPUT output
  ) {
    Map<String, Object> result = new Map<String, Object>();
    String limitsResult = '';
    String errorMessage = '';
    if (output != null) {
      if (output.limitsResult.endsWithIgnoreCase('ok')) {
        limitsResult = output.limitsResult;
        errorMessage = null;
      } else {
        limitsResult = output.limitsResult;
        errorMessage = output.codeLimitsResult;
      }
    }
    result.put('limitsResult', limitsResult);
    result.put('errorMessage', errorMessage);
    result.put('output', output);
    return result;
  }
}
