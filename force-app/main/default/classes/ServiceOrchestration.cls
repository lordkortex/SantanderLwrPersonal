public with sharing class ServiceOrchestration {

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Release Payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    26/11/2020      Bea Hill            Adapted from CNT_B2B_Authorization for ServiceOrchestration
    */
    @AuraEnabled
    public static ReturnValue executePayment (String paymentId, String FXTimer, WRAPPER_PaymentDetail.operationDetail paymentDetail , WS_ExchangeRate.OUTPUT FXData, WS_ExchangeRate.OUTPUT feesData) {
        ReturnValue response = null;
        try {
            WS_B2B_Orchestation orchestration = new WS_B2B_Orchestation();
            orchestration.setPaymentId(paymentId);
            orchestration.executePayment(paymentDetail, paymentId, FXTimer, FXData, feesData);
            WS_B2B_Orchestation.OrchestationOutput output = WS_B2B_Orchestation.OrchestationOutput;
            Map<String, Object> value = new Map<String, Object>();
            if (output != null) {
                reviewOutput(output, paymentId);
            }
            value.put('OrchestationOutput', output);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('ServiceOrchestration.executePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
            throw new CustomException('ServiceOrchestration.executePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return response;
    }

    /*
    Author:         R. cervino
    Company:        Deloitte
    Description:    Release Payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    26/11/2020      Bea Hill            Adapted from CNT_B2B_Authorization for ServiceOrchestration
    02/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    @AuraEnabled
    public static ReturnValue executePayment (WRAPPER_PAY_PaymentDraft paymentDraft, String urgencyIndicator) {
        ReturnValue response = null;
        try {
            WS_B2B_Orchestation orchestration = new WS_B2B_Orchestation();
            orchestration.setPaymentId(paymentDraft.paymentId);
            orchestration.executePayment(paymentDraft, urgencyIndicator);
            Map<String, Object> value = new Map<String, Object>();
            WS_B2B_Orchestation.OrchestationOutput output = WS_B2B_Orchestation.OrchestationOutput;
            if (output != null) {
                reviewOutput(output, paymentDraft.paymentId);
            }
            value.put('OrchestationOutput', output);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('ServiceOrchestration.executePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
            throw new CustomException('ServiceOrchestration.executePayment: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return response;
    } 

 	@TestVisible
    private static void reviewOutput (WS_B2B_Orchestation.OrchestationOutput output, String paymentId) {
        try {
            String responseCode = '';
            String responseMessage = '';
            String status = '';
            String reason = '';
            String trackingOutput = '';
            Boolean uncontrolledError = false;
            if (output != null) {
                if (String.isNotBlank(output.code)) {
                    responseCode = output.code;
                    if (responseCode == '500') {
                        if (String.isBlank(output.message)) {
                            uncontrolledError = true;
                        } else {
                            responseMessage = output.message;
                            if (Test.isRunningTest() == false) {
                                Payment_Orchestration__mdt controlledResponse = [
                                    SELECT PAY_ResponseStatus__c
                                    FROM Payment_Orchestration__mdt
                                    WHERE PAY_ResponseStatus__c =: responseMessage
                                    AND PAY_PCK_ResponseCode__c =: responseCode LIMIT 1
                                ];
                                if (controlledResponse == null) {
                                    uncontrolledError = true;
                                }
                            }
                        }
                    }
                }
            }
            if (uncontrolledError == true) {
                WS_TrackingPaymentOperation wsObject = new WS_TrackingPaymentOperation(paymentId);
                status = '999';
                reason = '003';
                trackingOutput = wsObject.updateStatus(status, reason);
            }
        } catch (Exception e) {
            throw new CustomException('ServiceOrchestration.ReviewOutput: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}