public class CNT_B2B_Authorization {
  /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Gets the detail of a payment
    History:
    <Date>          <Author>            <Description>
    07/08/2020      R. Cervino          Initial version
    */
  @AuraEnabled
  public static String decryptData(String str) {
    return Global_Utilities.decryptData(str);
  }

  /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Gets the detail of a payment
    History:
    <Date>          <Author>            <Description>
    07/08/2020      R. Cervino          Initial version
    */
  @AuraEnabled
  public static ReturnValue getPaymentDetail(String paymentId) {
    return CNT_PaymentsPaymentDetail.getPaymentDetail(paymentId);
  }

  /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Gets the detail of a payment
    History
    <Date>          <Author>            <Description>
    07/08/2020      R. Cervino          Initial version
    */
  @AuraEnabled
  public static ReturnValue getUserData() {
    return CNT_B2B_Process.getUserData();
  }

  /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Release Payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    26/11/2020      Bea Hill            Adapted to pass through ServiceOrchestration
    */
  @AuraEnabled
  public static ReturnValue executePayment(
    String paymentId,
    String FXTimer,
    WRAPPER_PaymentDetail.operationDetail paymentDetail,
    WS_ExchangeRate.OUTPUT FXData,
    WS_ExchangeRate.OUTPUT feesData
  ) {
    ReturnValue response = null;
    try {
      response = ServiceOrchestration.executePayment(
        paymentId,
        FXTimer,
        paymentDetail,
        FXData,
        feesData
      );
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_Authorization.executePayment: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
      throw new CustomException(
        'CNT_B2B_Authorization.executePayment: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
    }
    return response;
  }

  /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Get sign status
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    */
  @AuraEnabled
  public static Map<String, String> getSignLevel(String paymentId) {
    return CNT_B2B_SignatureUtilities.getSignatoryStatus(paymentId);
  }

  /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Authorize Payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    */
  @AuraEnabled
  public static ReturnValue authorizePayment(
    String paymentId,
    Boolean finalAuthorizer,
    String scaUid
  ) {
    ReturnValue response = null;
    try {
      CNT_B2B_SignatureUtilities.storeUserSign(
        paymentId,
        '',
        finalAuthorizer,
        scaUid
      );
      response = new ReturnValue(true, 'ok');
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_Authorization.authorizePayment: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
      throw new AuraHandledException(
        'The following exception has occurred: ' + e.getMessage()
      );
    }
    return response;
  }

  /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Obtain OTP
    History:
    <Date>          <Author>            <Description>
    05/08/2020      R. Cervino          Initial version
    07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
    */
  @AuraEnabled
  public static ReturnValue getOTP(
    String paymentID,
    String sourceCountry,
    String sourceBIC
  ) {
    ReturnValue response = null;
    try {
      Map<String, Object> value = new Map<String, Object>();
      WS_B2B_OTP.getOTP(sourceCountry, sourceBIC);
      value.put('initiateOTP', WS_B2B_OTP.initiateOTP);
      response = new ReturnValue(true, value);
      if (WS_B2B_OTP.initiateOTP.scaUid != '') {
        WS_B2B_OTP.storeOTPId(WS_B2B_OTP.initiateOTP.scaUid, paymentID);
      }
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_Authorization.getOTP: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
      throw new AuraHandledException(
        'The following exception has occurred: ' + e.getMessage()
      );
    }
    return response;
  }

  /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Obtain OTP
    History:
    <Date>          <Author>            <Description>
    05/08/2020      R. Cervino          Initial version
    07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
    */
  @AuraEnabled
  public static ReturnValue getOTP_Strategic(
    String beneficiaryName,
    String beneficiaryAccount,
    String paymentId,
    String debitAmount,
    String fees,
    String exchangeRate,
    String paymentAmount,
    WRAPPER_PaymentDetail.OperationDetail paymentDetail,
    String service_id,
    Map<String, String> navigatorInfo
  ) {
    return CNT_B2B_SignatureUtilities.getOTP_Strategic(
      beneficiaryName,
      beneficiaryAccount,
      paymentId,
      debitAmount,
      fees,
      exchangeRate,
      paymentAmount,
      paymentDetail,
      service_id,
      navigatorInfo
    );
  }

  /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    validate OTP
    History:
    <Date>          <Author>            <Description>
    05/08/2020      R. Cervino          Initial Version
    07/10/2020      Shahad Naji         Adding sourceCountry and sourceBIC to generate token
    */
  @AuraEnabled
  public static ReturnValue validateOTP(
    String paymentId,
    String metaData,
    String sourceCountry,
    String sourceBIC
  ) {
    ReturnValue response = null;
    try {
      Map<String, Object> value = new Map<String, Object>();
      WS_B2B_OTP.validateOTP(paymentId, metaData, sourceCountry, sourceBIC);
      value.put('validateOTP', WS_B2B_OTP.validateOTP);
      response = new ReturnValue(true, value);
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_Authorization.validateOTP: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
      throw new AuraHandledException(
        'The following exception has occurred: ' + e.getMessage()
      );
    }
    return response;
  }

  /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Makes the callout to the operation tracking service to update the payment status to "Pending"
    History:
    <Date>          <Author>            <Description>
    28/07/2020      Bea Hill            Initial version

    */
  @AuraEnabled
  public static String updateStatus(
    String paymentId,
    String status,
    String reason
  ) {
    WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(
      paymentId
    );
    String output = wsObject.updateStatus(status, reason);
    return output;
  }

  /*
    Author:         Antonio Matachana
    Company:
    Description:    Makes the callout to the operation tracking service to update the payment status to "Pending"
    History:
    <Date>          <Author>            <Description>
    11/11/2020      Antonio Matachana            Initial version
    */
  @AuraEnabled
  public static String updateStatus(
    String paymentId,
    String status,
    String reason,
    WrapperUserData userData
  ) {
    WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(
      paymentId
    );
    //String output = wsObject.updateStatus(status, reason);
    String output;
    if (userData != null) {
      output = wsObject.updateStatus(status, reason, userData);
    } else {
      output = wsObject.updateStatus(status, reason);
    }
    return output;
  }

  /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Get exchange rate
    History:
    <Date>          <Author>            <Description>
    17/08/2020      R. Cervino          Initial version - adapted from CNT_PaymentsParent
    09/11/2020      Bea Hill            Do the conversion in the direction originally specified by the user in step 3 of the process
    14/01/2021		Shahad Naji			Add requestPurpose that indicates if the callout is related to the nominal amount of a payment or to the fee applied to the payment
    04/02/2021      Candido             Update the result of exchange rate to Operation Tracking
    */
  @AuraEnabled
  public static ReturnValue getExchangeRate(
    Boolean feesBoolean,
    String paymentId,
    WRAPPER_PaymentDetail.OperationDetail payment,
    WRAPPER_B2B_Data.AccountData accountData
  ) {
    ReturnValue response = null;
    try {
      Map<String, Object> value = new Map<String, Object>();
      WRAPPER_AccountList.AccountDetails sourceAccountData = new WRAPPER_AccountList.AccountDetails();
      sourceAccountData.currencyCodeAvailableBalance = payment.sourceCurrency;
      sourceAccountData.alias = payment.sourceAccountHolder;
      sourceAccountData.aliasEntidad = payment.sourceBank;
      sourceAccountData.codigoCorporate = payment.sourceData.customerId;
      sourceAccountData.country = payment.sourceCountry;
      sourceAccountData.codigoBic = payment.sourceSwiftCode;
      WRAPPER_AccountList.AccountDetails recipientAccountData = new WRAPPER_AccountList.AccountDetails();
      recipientAccountData.currencyCodeAvailableBalance = payment.beneficiaryCurrency;
      Decimal sendAmount = null;
      Decimal receiveAmount = null;
      if (
        payment.operationAmount != null &&
        payment.operationAmount.amount != null
      ) {
        receiveAmount = payment.operationAmount.amount;
      } else if (
        payment.counterValueOperationAmount != null &&
        payment.counterValueOperationAmount.amount != null
      ) {
        sendAmount = payment.counterValueOperationAmount.amount;
      }
      String callType = 'ONL';
      String requestType = 'T';
      String requestPurpose = 'Nominal_request';
      if (feesBoolean == true && payment.fees != null) {
        sendAmount = Decimal.valueOf(payment.fees);
        receiveAmount = null;
        callType = 'ONI';
        requestType = 'I';
        requestPurpose = 'Fee_request';
      }
      WS_ExchangeRate exchangeRate = new WS_ExchangeRate(
        paymentId,
        'b2b',
        requestType,
        callType,
        accountData,
        120000,
        requestPurpose
      );
      Map<String, Object> output = exchangeRate.execute(
        sendAmount,
        receiveAmount,
        sourceAccountData.currencyCodeAvailableBalance,
        recipientAccountData.currencyCodeAvailableBalance,
        sourceAccountData.alias,
        sourceAccountData.aliasEntidad,
        sourceAccountData.codigoCorporate,
        sourceAccountData.country,
        sourceAccountData.codigoBic
      );
      response = new ReturnValue(true, output);
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_Authorization.getExchangeRate: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
    }
    return response;
  }

  /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Delete signature
    History:
    <Date>          <Author>            <Description>
    15/09/2020      R. Cervino          Initial version
    */
  @AuraEnabled
  public static ReturnValue removeSignature(String paymentId) {
    ReturnValue response = null;
    try {
      CNT_B2B_SignatureUtilities.deleteSignatureRecord(paymentId);
      response = new ReturnValue(true, 'ok');
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_Authorization.removeSignature: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
    }
    return response;
  }

  /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Data encryption
    History:
    <Date>          <Author>            <Description>
    28/09/2020      R. Cervino          Initial version
    */
  @AuraEnabled
  public static String encryptData(String str) {
    return Global_Utilities.encryptData(str);
  }

  @AuraEnabled
  public static String getSessionId() {
    return UserInfo.getSessionId();
  }

  /*
    Author:         Antonio Duarte
    Company:        Deloitte
    Description:    Send notification
    History:
    <Date>          <Author>                <Description>
    06/10/2020      Antonio Duarte          Initial version
    09/12/2020		Héctor Estivalis		REDO
    */
  @AuraEnabled
  public static void sendNotification(String paymentId) {
    HANDLER_CustomNotification.sendNotification(
      'Payment',
      PaymentId,
      'Completed'
    );
  }

  @AuraEnabled
  public static ReturnValue getAccountData() {
    ReturnValue response = null;
    Map<String, Object> value = new Map<String, Object>();
    try {
      String userID = UserInfo.getUserId();
      Account account = Global_Utilities.getAccountData(userId);
      value.put('cib', account.ACC_CHK_CIB__c);
      value.put('documentType', account.ACC_TXT_DocumentType__c);
      value.put('documentNumber', account.ACC_TXT_DocumentNumber__c);
      value.put('companyId', account.ACC_TXT_CompanyId__c);
      System.debug('DATA: ' + value);
      response = new ReturnValue(true, value);
    } catch (Exception e) {
      System.debug(
        'CNT_PaymentsLandingParent.getAccountData: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      response = new ReturnValue(false, null, e.getMessage());
    }
    return response;
  }
}
