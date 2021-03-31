/*
    Author:         Andrea Martin
    Company:        Deloitte
    Description:    Makes a call to get the details of one specific account 

    History:
    <Date>          <Author>            <Description>
    03/02/2021      Andrea Martin         Initial version
    */
global class ServiceAccountDetails {

    global static WS_GetMeAccountDetails.OUTPUT executeGetMeAccountDetails (WrapperUserData userData, String accountId, String accountIdType, String country, String codigoBic, String customerId) {
        WS_GetMeAccountDetails.OUTPUT output = new WS_GetMeAccountDetails.OUTPUT();
        try {
            String userId = null;
            if (userData!= null && userData.userId != null){
                userId = userData.userId; 
            }
            else{
                throw new CustomException('Empty user data');
            }

            WS_GetMeAccountDetails ws_GetMeAccountDetails = new WS_GetMeAccountDetails(userId, accountId, accountIdType, country, codigoBic, customerId);
            output = ws_GetMeAccountDetails.execute();
        } catch (Exception e) {
            System.debug('ServiceAccountDetails.executeGetMeAccountDetails: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return output;
    }
    global static WRAPPER_PAY_PaymentDraft addBeneficiaryAccount (WRAPPER_PAY_PaymentDraft paymentDraft,  WS_GetMeAccountDetails.OUTPUT accountDetails) {
        try {

            if(accountDetails.accountDetailsResponse != null){
                String statusOpen = 'OPEN';
                String statusAccountDetails = accountDetails.accountDetailsResponse.status;
                String currencyAccountDetails = accountDetails.accountDetailsResponse.mainBalance.currencyCode;
                WRAPPER_AccountList.AccountDetails destinationAccount = new  WRAPPER_AccountList.AccountDetails();
                if ( (statusAccountDetails.equalsIgnoreCase(statusOpen)) && (currencyAccountDetails != null)){ 

                    destinationAccount.status = statusAccountDetails;
                    destinationAccount.currencyCodeMainBalance = currencyAccountDetails;
                    
                    destinationAccount.accountId = accountDetails.accountDetailsResponse.accountId;
                    destinationAccount.displayNumber = accountDetails.accountDetailsResponse.displayNumber;
                    destinationAccount.alias = accountDetails.accountDetailsResponse.alias;
                    destinationAccount.type = accountDetails.accountDetailsResponse.type;
                    destinationAccount.customerId = accountDetails.accountDetailsResponse.customerId;
                    paymentDraft.destinationAccount = destinationAccount;

                }
                else { 
                    throw new CustomException('The account is not OPEN or the currecyMain balance is null');
                }
        }
        else { 
            throw new CustomException('The accountDetailsResponse is null');
        }

           
        } catch (Exception e) {
            System.debug('ServiceAccountDetails.addBeneficiaryAccount: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            throw new CustomException(e.getMessage());
        }
        return paymentDraft;
    }
}