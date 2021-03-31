public with sharing class CNT_PaymentsMethod {

    @AuraEnabled
    public static ReturnValue checkTypeAvailable (WrapperUserData userData) {
        ReturnValue response = null;
        try {
            if (userData == null) {
                userData = ServiceUserData.getUserData();
            }
            parameterized_transfer_Type__mdt param = getParamsByUser(userData);
            Map<String, Object> value = new Map<String, Object>();
            if (param.CHK_PTT_InstantTransfer__c) {
                value.put(Label.PTT_instant_transfer,Global_utilities.encryptData(Label.PARAM_transferType + '=' + Label.PTT_instant_transfer + '&' + Label.PARAM_paymentMethod + '=' + Label.CNF_payment_productId_001 + '&' + Label.PARAM_parsedPaymentMethod + '=' + Label.BookTobook));
            }
            if (param.CHK_PTT_DomesticTransferSingle__c) {
                value.put(Label.PTT_domestic_transfer_single, Global_utilities.encryptData(Label.PARAM_transferType + '=' + Label.PTT_domestic_transfer_single + '&' + Label.PARAM_paymentMethod + '=' + Label.CNF_payment_productId_001 + '&' + Label.PARAM_parsedPaymentMethod + '=' + Label.BookTobook));
            }
            if (param.CHK_PTT_DomesticTransferMultiple__c) {
                value.put(Label.PTT_domestic_transfer_multiple, Global_utilities.encryptData(Label.PARAM_transferType + '=' + Label.PTT_domestic_transfer_multiple + '&' + Label.PARAM_paymentMethod + '=' + Label.CNF_payment_productId_001 + '&' + Label.PARAM_parsedPaymentMethod + '=' + Label.BookTobook));
            }
            if (param.CHK_PTT_InternationalTransferSingle__c) {
                value.put(Label.PTT_international_transfer_single, Global_utilities.encryptData(Label.PARAM_transferType + '=' + Label.PTT_international_transfer_single + '&' + Label.PARAM_paymentMethod + '=' + Label.CNF_payment_productId_002 + '&' + Label.PARAM_parsedPaymentMethod + '=' + Label.InternationalInstantTransfer));
            }
            if (param.CHK_PTT_InternationalTransferMultiple__c) {
                value.put(Label.PTT_international_transfer_multiple, Global_utilities.encryptData(Label.PARAM_transferType + '=' + Label.PTT_international_transfer_multiple + '&' + Label.PARAM_paymentMethod + '=' + Label.CNF_payment_productId_001 + '&' + Label.PARAM_parsedPaymentMethod + '=' + Label.BookTobook));
            }
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsMethod.checkTypeAvailable: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    private static parameterized_transfer_Type__mdt getParamsByUser (WrapperUserData userData) {
        parameterized_transfer_Type__mdt res = null;
        try {
            String userType = null;
            String userCountry = null;
            if (ServiceAPILine.isMultiOneTrade(userData)) {
                userType = ServiceAPILine.MULTI_ONE_TRADE;
                userCountry = 'ALL';
            } else if (ServiceAPILine.isNexus(userData)) {
                userType = ServiceAPILine.NEXUS;
                userCountry = 'ALL';
            } else if (ServiceAPILine.isLocalBanking(userData)) {
                userType = ServiceAPILine.LOCAL_BANKING;
                userCountry = userData.country;
            }
            if (String.isBlank(userType) || String.isBlank(userCountry)) {
                throw new CustomException('Need to inform userType or userCountry.');
            }
            List<parameterized_transfer_Type__mdt> params = new List<parameterized_transfer_Type__mdt>([
                SELECT PCK_PTT_UserType__c, PCK_PTT_UserCountry__c, CHK_PTT_InstantTransfer__c, CHK_PTT_DomesticTransferSingle__c, CHK_PTT_DomesticTransferMultiple__c, CHK_PTT_InternationalTransferSingle__c, CHK_PTT_InternationalTransferMultiple__c
                FROM parameterized_transfer_Type__mdt
                WHERE PCK_PTT_UserType__c = :userType
                AND PCK_PTT_UserCountry__c = :userCountry
            ]);
            if (!params.isEmpty()) {
                res = params.get(0);
            } else {
                throw new CustomException('Could not found parameterized transfer type.');
            }
        } catch (Exception e) {
            System.debug('CNT_PaymentsMethod.getParamsByUser: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return res;
    }
}