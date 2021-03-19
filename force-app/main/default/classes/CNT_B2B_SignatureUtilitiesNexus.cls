global class CNT_B2B_SignatureUtilitiesNexus {
  /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    get the signature structure for GTS
    History:
    <Date>          <Author>            <Description>
    11/12/2020      R. Cervino          Initial version
    08/01/2021      Candido             Move the place to delete the old structure, if exist
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
  global static WRAPPER_B2B_SignatureStructure getSignatureStructure(
    String channel,
    WRAPPER_PAY_PaymentDraft paymentDraft
  ) {
    WRAPPER_B2B_SignatureStructure structure = new WRAPPER_B2B_SignatureStructure();
    try {
      CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues(
        'B2B_SignatureStructure_Nexus'
      );
      String finalEndPoint = configWs.CNT_Endpoint__c.replace(
        '{service_id}',
        paymentDraft.serviceId
      );
      finalEndPoint = finalEndPoint.replace(
        '{currency}',
        paymentDraft.sourceAccount.currencyCodeAvailableBalance
      );
      finalEndPoint = finalEndPoint.replace('{channel}', channel);
      finalEndPoint = finalEndPoint.replace(
        '{amount}',
        String.valueOf(paymentDraft.amountSend)
      );
      finalEndPoint = finalEndPoint.replace(
        '{operation_id}',
        paymentDraft.paymentId
      );
      if (String.isNotBlank(paymentDraft.sourceAccount.codigoCorporate)) {
        finalEndPoint = finalEndPoint.replace(
          '{customer_id}',
          paymentDraft.sourceAccount.codigoCorporate
        );
      }
      Map<String, String> header = new Map<String, String>();
      header.put('userType', 'nexus');
      header.put('Global-Payment-Id', paymentDraft.paymentId);
      structure = WRAPPER_B2B_SignatureStructure.parse(
        Global_IntegrationWrapper.launchHTTP(
          '',
          finalEndPoint,
          configWs.CNT_HTTPMethod__c,
          header
        )
      );
      if (structure != null) {
        // First, delete the old structure
        List<SNG_Payment__c> signature = new List<SNG_Payment__c>(
          [
            SELECT Id
            FROM SNG_Payment__c
            WHERE SGN_TXT_IdPayment__c = :paymentDraft.paymentId
          ]
        );
        if (!signature.isEmpty()) {
          CNT_B2B_SignatureUtilities.deleteSignatureRecord(signature[0].Id);
        }
        // Then, save new structure
        structure.paymentId = paymentDraft.paymentId;
        CNT_B2B_SignatureUtilities.storeSignatureData(structure);
      } else {
        throw new CustomException('Structure is required to continue.');
      }
    } catch (Exception e) {
      System.debug(
        'CNT_B2B_SignatureUtilitiesNexus.getSignatureStructure: ' +
        e.getMessage() +
        ', in line: ' +
        e.getLineNumber()
      );
      throw new CustomException(e.getMessage());
    }
    return structure;
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
    String paymentAmount
  ) {
    ReturnValue response = null;
    try {
      Map<String, Object> value = new Map<String, Object>();
      WS_B2B_OTP_StrategicNexus.getOTP(
        beneficiaryName,
        beneficiaryAccount,
        paymentId,
        debitAmount,
        fees,
        exchangeRate,
        paymentAmount
      );
      value.put('initiateOTP', WS_B2B_OTP_StrategicNexus.initiateOTP);
      response = new ReturnValue(true, value);
      if (WS_B2B_OTP_StrategicNexus.initiateOTP.scaUid != '') {
        CNT_B2B_SignatureUtilities.storeOTPId(
          WS_B2B_OTP_StrategicNexus.initiateOTP.scaUid,
          paymentId
        );
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
}
