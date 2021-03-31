global class TRS_ServiceFunding {

    global static ReturnValue sendFunding (Case funding) {
        ReturnValue response;
        try {
            WS_TRS_VAM.OUTPUT virtualAccountInfo = TRS_ServiceVAM.retrieveAccount (funding.CASE_TXT_VAId__c);
            WS_TRS_VAM.LinkedAccountDataDetails linkedAccountInfo =  virtualAccountInfo.virtualAccountParent.virtualAccountData.linkedAccountDataDetails;
            
            WS_TRS_Funding.BODY body = new WS_TRS_Funding.BODY();
			body.fundDetails = new WS_TRS_Funding.FundDetails();
            body.fundDetails.fundsDirectionIndicator = funding.Type == 'Funding' ? 'b2bCreditCorrAccount' : 'b2bDebitCorrAccount';
            body.fundDetails.idempotentReference = funding.CASE_TXT_PaymentId__c;           
            body.fundDetails.senderReference = funding.CASE_TXT_Reference__c;
            body.fundDetails.countryOrigingFunds = linkedAccountInfo.country;
            body.fundDetails.requestedExecutionDate = system.now();
            body.fundDetails.fundAmount = new WS_TRS_Funding.FundAmount();
            body.fundDetails.fundAmount.amount = funding.CASE_CUR_Amount__c;
            body.fundDetails.fundAmount.tcurrency = funding.CurrencyIsoCode;
            body.fundDetails.debtorDetails = new WS_TRS_Funding.DebtorDetails();
            body.fundDetails.debtorDetails.debtorAccount = new WS_TRS_Funding.AccountData();
            //body.fundDetails.debtorDetails.debtorAccount.accountIdType = 'TXT';
            //body.fundDetails.debtorDetails.debtorAccount.accountId = 'funding.CASE_TXT_VAId__c';
            body.fundDetails.debtorDetails.debtorAgent = new WS_TRS_Funding.AgentData();  
            body.fundDetails.debtorDetails.debtorAgent.Agent = linkedAccountInfo.bankId;
            body.fundDetails.creditorDetails = new WS_TRS_Funding.CreditorDetails();
            body.fundDetails.creditorDetails.creditorAccount = new WS_TRS_Funding.AccountData();
            //body.fundDetails.creditorDetails.creditorAccount.accountIdType = 'BBAN';
            //body.fundDetails.creditorDetails.creditorAccount.accountId = linkedAccountInfo.destinationAccountId;
            body.fundDetails.creditorDetails.creditorAgent = new WS_TRS_Funding.AgentData();
            body.fundDetails.creditorDetails.creditorAgent.Agent = linkedAccountInfo.destinationEntityDetails.destinationEntityBic;
            
            String sBody = JSON.serialize(body, true);
            ReturnValue res = WS_TRS_Funding.sendFunding (sBody);
            if(res.value.get('statusCode') == '200'){
                response = new ReturnValue (true);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('TRS_ServiceFunding.sendFunding: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, 'Integration failed: ' +  e.getMessage());
        }
        return response;
    }
    
    global static ReturnValue authorize (Case funding) {
        ReturnValue response;
        try {
            User currentUser = [SELECT Id, FederationIdentifier FROM User WHERE Id = :UserInfo.getUserId()];
            WS_TRS_Funding.authorizeBODY body = new WS_TRS_Funding.authorizeBODY();
			body.operationGlobalId = funding.CASE_TXT_PaymentId__c;
        	body.globalUserId = currentUser.FederationIdentifier;
        	body.approvalType = 'VALIDATE';
            
            String sBody = JSON.serialize(body, true);
            ReturnValue res = WS_TRS_Funding.authorize (sBody);
            if(res.value.get('statusCode') == '200'){
                response = new ReturnValue (true);
            }
            else{
                response = new ReturnValue (false, 'Integration failed: ' + res.value.get('OUTPUT'));
            }
        } catch (Exception e) {
            System.debug('TRS_ServiceFunding.authorize: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, 'Integration failed: ' +  e.getMessage());
        }
        return response;
    }
    
    global static ReturnValue createOperation (Case funding) {
        ReturnValue response;
        try{            
            User tUser = [SELECT Id, FederationIdentifier FROM User WHERE Id = :UserInfo.getUserId()];
            WrapperUserData userData = new WrapperUserData();
            userData.globalId = tUser.FederationIdentifier;
        	WRAPPER_AccountList.AccountDetails sourceAccountData = new WRAPPER_AccountList.AccountDetails();
        	WRAPPER_AccountList.AccountDetails recipientAccountData = new WRAPPER_AccountList.AccountDetails();
        	String productId = null;
        	String serviceId = null;
            WS_CreatePaymentOperation createOperation = new WS_CreatePaymentOperation(userData);
       		String operationId = createOperation.execute (sourceAccountData, recipientAccountData, null, productId, serviceId);
            Map<String, Object> value = new Map<String, Object>();
            value.put('paymentId', operationId);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('TRS_ServiceFunding.createOperation: ' + e.getMessage() + ' in line ' + e.getLineNumber());
            response = new ReturnValue (false, 'Integration failed: ' +  e.getMessage());
        }
        return response;
    }
}