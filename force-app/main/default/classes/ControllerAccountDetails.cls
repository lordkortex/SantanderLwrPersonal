/*
Author:         Andrea Martin
Company:        Deloitte
Description:    Makes a call to get the details of one specific account
History:
<Date>          <Author>                <Description>
03/02/2021      Andrea Martin           Initial version
*/
public class ControllerAccountDetails {

    public static ReturnValue getAccountsDetails (WrapperUserData userData, String accountId, String accountIdType, String country, String codigoBic, WRAPPER_PAY_PaymentDraft paymentDraft) {
        ReturnValue response = null;
        try {
            String customerId = '';
            if (paymentDraft.sourceAccount != null && paymentDraft.sourceAccount.companyIdsList != null &&  String.isNotBlank(paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier))) {
                customerId = paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier);
            }
            WS_GetMeAccountDetails.OUTPUT resGetAccountDetails = ServiceAccountDetails.executeGetMeAccountDetails(userData, accountId, accountIdType, country, codigoBic, customerId);     
            if (resGetAccountDetails != null) {
                paymentDraft = ServiceAccountDetails.addBeneficiaryAccount(paymentDraft, resGetAccountDetails);
                Map<String, Object> value = new Map<String, Object>();
                value.put('result', paymentDraft);
                response = new ReturnValue(true, value);
            } else {
                throw new CustomException('Error obtaining the server response.');
            }
        } catch (Exception e) {
            System.debug('ControllerAccountDetails.getAccountsDetails: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
}