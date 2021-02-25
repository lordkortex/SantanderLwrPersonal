public with sharing class ServiceValidateAccount {

    public static final String STATUS_OPEN = 'open';

    /*
    Author:         Candido
    Company:        Deloitte
    Description:    validate Account
    History:
    <Date>          <Author>            <Description>
    02/11/2020      Candido             Initial version
    24/02/2021      Candido             Update to send company identifier
    */
    @AuraEnabled
    public static ReturnValue validateAccount (WRAPPER_AccountList.AccountDetails sourceAccount, String status, Decimal amount) {
        ReturnValue response = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            WS_B2B_ValidateAccount.ValidateAccountBody validateBody = new  WS_B2B_ValidateAccount.ValidateAccountBody(status, amount, null, null);
            WS_B2B_ValidateAccount.ValidateAccountOutput validateOutput = WS_B2B_ValidateAccount.validateAccount(sourceAccount, validateBody);
            String statusResult = null;
            String amountResult = null;
            if (validateOutput != null) {
                if (status != null) {
                    if (validateOutput.statusResult != null) {
                        if (validateOutput.statusResult.result != null) {
                            statusResult = validateOutput.statusResult.result;
                        } else {
                            statusResult = 'KO';
                        }
                    } else {
                        throw new CustomException('validateOutput.statusResult is not informed.');
                    }
                }
                if (amount != null) {
                    if (validateOutput.amountResult != null) {
                        if (validateOutput.amountResult.result != null) {
                            amountResult = validateOutput.amountResult.result;
                        } else {
                            amountResult = 'KO';
                        }
                    } else {
                        throw new CustomException('validateOutput.amountResult is not informed.');
                    }
                }
            } else {
                throw new CustomException('ValidateAccount is not response.');
            }
            value.put('statusResult', statusResult);
            value.put('amountResult', amountResult);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('ServiceValidateAccount.validateAccount: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response =  new ReturnValue(false, null, e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return response;
    }

    /*
    Author:         Candido
    Company:        Deloitte
    Description:   	validate Account
    History:
    <Date>          <Author>            <Description>
    02/11/2020      Candido             Initial version
    24/02/2021      Candido             Update to send company identifier
    */
    @AuraEnabled
    public static ReturnValue validateAccount (WRAPPER_PaymentDetail.OperationDetail payment, Decimal amount) {
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try {
            WS_B2B_ValidateAccount.ValidateAccountBody validateBodySource = new  WS_B2B_ValidateAccount.ValidateAccountBody(STATUS_OPEN, amount, null, null);
            WS_B2B_ValidateAccount.ValidateAccountOutput validateOutputSource = WS_B2B_ValidateAccount.validateAccount(payment.sourceAccount, payment.sourceAccountIdType, payment.sourceCountry, payment.sourceSwiftCode, payment.sourceData.customerId, validateBodySource);
            String amountResult = null;
            String statusResult = null;
            if (validateOutputSource != null) {
                if (validateOutputSource.statusResult != null) {
                    if (validateOutputSource.statusResult.result != null) {
                        statusResult = validateOutputSource.statusResult.result;
                    } else {
                        statusResult = 'KO';
                    }
                } else {
                    throw new CustomException('validateOutputSource.statusResult is not informed.');
                }
                if (validateOutputSource.amountResult != null) {
                    if (validateOutputSource.amountResult.result != null) {
                        amountResult = validateOutputSource.amountResult.result;
                    } else {
                        amountResult = 'KO';
                    }
                } else {
                    throw new CustomException('validateOutputSource.amountResult is not informed.');
                }
            } else {
                throw new CustomException('validateOutputSource is not response.');
            }
            if (amountResult != null && amountResult != 'KO' && statusResult != null && statusResult != 'KO') {
                WS_B2B_ValidateAccount.ValidateAccountBody validateBodyBeneficiary = new  WS_B2B_ValidateAccount.ValidateAccountBody(STATUS_OPEN, null, null, null);
                WS_B2B_ValidateAccount.ValidateAccountOutput validateOutputBeneficiary = WS_B2B_ValidateAccount.validateAccount(payment.beneficiaryAccount, payment.beneficiaryAccountIdType, payment.destinationCountry, payment.beneficiarySwiftCode, payment.destinationData.customerId, validateBodyBeneficiary);
                if (validateOutputBeneficiary != null) {
                    if (validateOutputBeneficiary.statusResult != null) {
                        if (validateOutputBeneficiary.statusResult.result != null) {
                            statusResult = validateOutputBeneficiary.statusResult.result;
                        } else {
                            statusResult = 'KO';
                        }
                    } else {
                        throw new CustomException('validateOutputBeneficiary.statusResult is not informed.');
                    }
                } else {
                    throw new CustomException('validateOutputBeneficiary is not response.');
                }
            }
            value.put('amountResult', amountResult);
            value.put('statusResult', statusResult);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('ServiceValidateAccount.validateAccount: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response =  new ReturnValue(false, null, e.getMessage());
            throw new CustomException(e.getMessage());
        }
        return response;
    }
}