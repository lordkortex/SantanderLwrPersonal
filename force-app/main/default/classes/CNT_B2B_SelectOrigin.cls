public with sharing class CNT_B2B_SelectOrigin {

    /*----------------------------------------------------------------------------------
    Author:         R. cervino
    Company:        Deloitte
    Description:    validate Account
    History
    <Date>          <Author>                <Description>
    12/08/2020      R. Cervino              Initial version
    01/11/2020      Candido                 Refactor and add accountIdType to check
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue accountValidation (WRAPPER_AccountList.AccountDetails data) {
        return ServiceValidateAccount.validateAccount(data, 'open', null);
    }
}