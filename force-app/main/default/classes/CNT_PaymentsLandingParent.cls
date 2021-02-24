/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    CMP_PaymentsLandingParent controller
Test Class:     CNT_PaymentsLandingParent_Test
History
<Date>          <Author>        <Description>
28/05/2020      Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
public class CNT_PaymentsLandingParent {
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Get current user information 
of them
History
<Date>          <Author>             <Description>
28/05/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/    
    
    @AuraEnabled
    public static ReturnValue getUserData () {
        ReturnValue response = ServiceUserData.getControllerUserData ();        
        return response;
    }

    @AuraEnabled
    public static ReturnValue getAccountData () {
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try {
            String userID = UserInfo.getUserId();
            Account account = Global_Utilities.getAccountData(userId);
            value.put('cib', account.ACC_CHK_CIB__c);
            value.put('documentType', account.ACC_TXT_DocumentType__c);
            value.put('documentNumber', account.ACC_TXT_DocumentNumber__c);
            value.put('companyId', account.ACC_TXT_CompanyId__c);
            System.debug('DATA: '+value);
            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.getAccountData: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    @AuraEnabled
    public static ReturnValue getPaymentsStatuses(List<WRAPPER_AccountList.AccountDetails> accountList, String globalUserId){
        ReturnValue  rv = null;
        String getMockData = System.Label.GET_MOCK_DATA;
        Map<String, Object> value = new Map<String, Object>();
        WRAPPER_PaymentsStatuses response = new WRAPPER_PaymentsStatuses();
        try {            
            if(getMockData == 'True'){
                response = CNT_PaymentsLandingParent.getTestPaymentsStatuses(true, '');
                value.put('output', response);
            }else{
                List<WS_OperationsList.StatusList> frontStatusList = CNT_Payments.wsGetStatusList(true, false);  
                List<WS_OperationsByStatus.AccountList> inputAccountList = createInputAccountList(accountList);
                List<WS_OperationsByStatus.StatusList> inputStatusList = createInputStatusList(frontStatusList);
               	WS_OperationsByStatus ws_OperationsByStatus = new WS_OperationsByStatus();
                WRAPPER_OperationsByStatus result =  ws_OperationsByStatus.execute(inputAccountList, inputStatusList, globalUserId);
                if(result != null) {
                    List<WRAPPER_OperationsByStatus.StatusList> collatedResult = collateCounts(result.statusList); 
                    Integer totalCount = getTotalCount(collatedResult);  
                    List<WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus> paymentStatusesList = completeStatusListOutput(collatedResult);
                    WRAPPER_PaymentsStatuses paymentStatuses = new WRAPPER_PaymentsStatuses();
                    paymentStatuses.paymentStatusList = paymentStatusesList;
                    paymentStatuses.totalNumberOfRecords = totalCount;
                    response = paymentStatuses; 
                }else{
                    response = CNT_PaymentsLandingParent.getTestPaymentsStatuses(true, '');
                }
                value.put('output', response);
            }
            rv = new ReturnValue(true, value);
        }catch(Exception e){
            System.debug('CNT_PaymentsLandingParent.getPaymentsStatuses: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            rv = new ReturnValue(false, null, e.getMessage());
        }
        return rv;
    }  


        /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns
History
<Date>          <Author>             <Description>
27/07/2020      Shahad Naji        	Initial version
18/09/2020		Shahad Naji			Discarded payments (Status = "997" y Reason= "001") are not returned to be shown in the table
02/10/2020		Shahad Naji			Discarded payments (Status = "990" y Reason= "001") are not returned to be shown in the table
09/10/2020		Shahad Naji			Remove Discarded payments (Status = "990" y Reason= "001") condition
----------------------------------------------------------------------------------*/ 
    @AuraEnabled
    public static ReturnValue searchPaymentsInformation(String globalUserId,Boolean pendingAuthorization, 
                                                        List<WS_OperationsList.SourceAccountList> sourceAccountList, String destinationCountry, 
                                                        Decimal amountFrom, Decimal amountTo, List<WS_OperationsList.CurrencyList> currencyList, String productId, String clientReference, String valueDateFrom, String valueDateTo, 
                                                        Boolean latestOperationsFlag, List<WS_OperationsList.StatusList> statusList, List<WRAPPER_AccountList.AccountDetails> accountList){

        ReturnValue  rv = null;
        String getMockData = System.Label.GET_MOCK_DATA;
        try {
            Map<String, Object> value = new Map<String, Object>();
            WRAPPER_PaymentList response = new WRAPPER_PaymentList();
            if (getMockData == 'True'){
                response = CNT_Payments.getTestPaymentsInformation(true);
                value.put('output', response);
            } else {
               if(sourceAccountList == null){
                    sourceAccountList = getUserAccounts(accountList);                 
                }else if (sourceAccountList.size() == 0){
                    sourceAccountList = getUserAccounts(accountList);
                }else{
                    system.debug('>>> An account has been already selected by end user to filter by'); 
                }
                if(currencyList.size() == 0){
                    currencyList = null;
                }
                if(statusList.size() == 0){
                    statusList = CNT_Payments.wsGetStatusList(true, false);
                }
                WS_OperationsList ws_operationsList = new WS_OperationsList();   
                WRAPPER_OperationsList output = ws_operationsList.execute(globalUserId, pendingAuthorization, latestOperationsFlag, sourceAccountList,destinationCountry, statusList, amountFrom, amountTo, currencyList, null, clientReference, valueDateFrom, valueDateTo, null, null, null, productId);
                if(output != null){
                    if(output.operationsList != null){
                        if(output.operationsList.size() > 0){
                            List<WRAPPER_OperationsList.OperationsList> auxiliarList = output.operationsList;
                            List<WRAPPER_PaymentList.WRAPPER_Payment> paymentsList = new List<WRAPPER_PaymentList.WRAPPER_Payment>();
                            Map <String, String> statusMap = CNT_Payments.getPaymentStatusMap();
                            for(WRAPPER_OperationsList.OperationsList item : auxiliarList){  
                                WRAPPER_PaymentList.WRAPPER_Payment payment = new WRAPPER_PaymentList.WRAPPER_Payment();
                                Boolean addPayment = true;
                                if(item.operationDetail != null){
                                    payment.paymentId = item.operationDetail.operationGlobalId != null ? item.operationDetail.operationGlobalId : '';
                                    payment.clientReference = item.operationDetail.clientReference != null ? item.operationDetail.clientReference : '';
                                    payment.userGlobalId = item.operationDetail.globalUserId != null ? item.operationDetail.globalUserId : '';
                                    if (item.operationDetail.operationAmount != null && item.operationDetail.operationAmount.amount != null && item.operationDetail.operationAmount.tcurrency != null) {
                                        payment.amount = item.operationDetail.operationAmount.amount != null ? item.operationDetail.operationAmount.amount.setScale(2) : 0;
                                        payment.paymentCurrency = item.operationDetail.operationAmount.tcurrency != null ? item.operationDetail.operationAmount.tcurrency : '';                                    
                                    } else {
                                        if(item.operationDetail.operationNominalFxDetails != null){
                                            WRAPPER_PaymentList.OperationNominalFxDetails operationNominalFxDetails = new WRAPPER_PaymentList.OperationNominalFxDetails();
                                            operationNominalFxDetails.fxCountervalueId = item.operationDetail.operationNominalFxDetails.fxCountervalueId != null ? item.operationDetail.operationNominalFxDetails.fxCountervalueId : '';
                                            operationNominalFxDetails.priceType = item.operationDetail.operationNominalFxDetails.priceType != null ? item.operationDetail.operationNominalFxDetails.priceType : '';
                                            operationNominalFxDetails.discount = item.operationDetail.operationNominalFxDetails.discount != null ? item.operationDetail.operationNominalFxDetails.discount : null;
                                            if(item.operationDetail.operationNominalFxDetails.ccyCountervalue != null){
                                                WRAPPER_PaymentList.CcyCountervalue ccyCountervalue = new WRAPPER_PaymentList.CcyCountervalue();
                                                ccyCountervalue.ccyCountervalueAmount = item.operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount != null ? item.operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount : null;
                                                ccyCountervalue.ccyCountervalueCurrency = item.operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency != null ? item.operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency : '';
                                                payment.amount = ccyCountervalue.ccyCountervalueAmount;
                                                payment.paymentCurrency = ccyCountervalue.ccyCountervalueCurrency;                                    
                                                operationNominalFxDetails.ccyCountervalue = ccyCountervalue;
                                            }
                                            operationNominalFxDetails.valueDateEfx = item.operationDetail.operationNominalFxDetails.valueDateEfx != null ? item.operationDetail.operationNominalFxDetails.valueDateEfx : '';
                                            operationNominalFxDetails.customerExchangeRate  = item.operationDetail.operationNominalFxDetails.customerExchangeRate  != null ? item.operationDetail.operationNominalFxDetails.customerExchangeRate  : null;
                                            if(item.operationDetail.operationNominalFxDetails.fxComercialMargin != null){
                                                WRAPPER_PaymentList.FxComercialMargin fxComercialMargin = new WRAPPER_PaymentList.FxComercialMargin();
                                                fxComercialMargin.fxComercialMarginAmount = item.operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount != null ? item.operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount : null;
                                                fxComercialMargin.fxComercialMarginCurrency = item.operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency != null ? item.operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency : '';
                                                operationNominalFxDetails.fxComercialMargin = fxComercialMargin;
                                            }
                                            if(item.operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp != null){
                                                WRAPPER_PaymentList.NominalAmountNoMarkUp nominalAmountNoMarkUp = new WRAPPER_PaymentList.NominalAmountNoMarkUp();
                                                nominalAmountNoMarkUp.amount = item.operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.amount != null ? item.operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.amount : null;
                                                nominalAmountNoMarkUp.tcurrency = item.operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.tcurrency != null ? item.operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.tcurrency : '';
                                                operationNominalFxDetails.nominalAmountNoMarkUp = nominalAmountNoMarkUp;
                                            }
                                            payment.operationNominalFxDetails = operationNominalFxDetails;
                                        }
                                    }
                                    if(item.operationDetail.sourceData != null){
                                        payment.sourceAlias = item.operationDetail.sourceData.name != null ? item.operationDetail.sourceData.name : '';
                                        if(item.operationDetail.sourceData.sourceAccount != null){
                                            payment.sourceAccount =  item.operationDetail.sourceData.sourceAccount.accountId != null ? item.operationDetail.sourceData.sourceAccount.accountId : '';
                                            payment.sourceCurrency = item.operationDetail.sourceData.sourceAccount.tcurrency != null ? item.operationDetail.sourceData.sourceAccount.tcurrency : '';
                                            payment.sourceAccountHolder = item.operationDetail.sourceData.name != null ? item.operationDetail.sourceData.name : '';
                                            if(item.operationDetail.sourceData.sourceAgent != null){
                                                payment.sourceBank = item.operationDetail.sourceData.sourceAgent.name != null ? item.operationDetail.sourceData.sourceAgent.name: '' ;
                                            }else{
                                                payment.sourceBank = '';
                                            }
                                        }
                                    } 
                                    if(item.operationDetail.destinationData != null){
                                        payment.beneficiaryAlias = item.operationDetail.destinationData.destinationName != null ? item.operationDetail.destinationData.destinationName : '';
                                        payment.beneficiaryAccountHolder = item.operationDetail.destinationData.destinationName != null ? item.operationDetail.destinationData.destinationName : '';
                                        if(item.operationDetail.destinationData.destinationAccount != null){
                                            payment.beneficiaryAccount =  item.operationDetail.destinationData.destinationAccount.accountId != null ? item.operationDetail.destinationData.destinationAccount.accountId : '';
                                            payment.beneficiaryCurrency = item.operationDetail.destinationData.destinationAccount.tcurrency != null ? item.operationDetail.destinationData.destinationAccount.tcurrency : '';
                                        }
                                        if(item.operationDetail.destinationData.destinationAgent != null){
                                            payment.beneficiaryBank = item.operationDetail.destinationData.destinationAgent.name != null ? item.operationDetail.destinationData.destinationAgent.name  : '';
                                        }else{
                                            payment.beneficiaryBank = '';
                                        }
                                    }
                                    if(item.operationDetail.valueDate != null){
                                        payment.valueDate = Date.valueOf(item.operationDetail.valueDate);
                                        payment.parsedValueDate =  Date.valueOf(item.operationDetail.valueDate);
                                    }else{
                                        payment.valueDate = null;
                                        payment.parsedValueDate =  null;
                                    } 
                                    if(item.operationDetail.operationStatus != null){
                                        if(item.operationDetail.operationStatus.status != null){
                                            payment.paymentStatus = item.operationDetail.operationStatus.status;
                                            if(statusMap.containsKey(item.operationDetail.operationStatus.status)){
                                                 payment.parsedPaymentStatus = statusMap.get(item.operationDetail.operationStatus.status);
                                            }else{
                                              payment.parsedPaymentStatus = '';  
                                            }
                                        }else{
                                            payment.paymentStatus = '';
                                            payment.parsedPaymentStatus = '';
                                        }
                                        payment.paymentReason = item.operationDetail.operationStatus.reason != null ? item.operationDetail.operationStatus.reason : '' ; 
                                    }
                                    if(addPayment){
                                        paymentsList.add(payment); 
                                    }
                                    
                                }
                            }
                            response.paymentsList = paymentsList;

                        }else{
                            response.paymentsList = null;
                        }
                    }
                    
                }                
                value.put('output', response);
            }         
            
            
            rv = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.searchPaymentsInformation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            rv = new ReturnValue(false, null, e.getMessage());
        }
        return rv; 
        
    }
    
      
        /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns payments information
of them
History
<Date>          <Author>             <Description>
23/07/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static ReturnValue getPaymentsInformationWithoutAccounts(){
        ReturnValue  rv = null;
        String getMockData = System.Label.GET_MOCK_DATA;
        try {
            
            Map<String, Object> value = new Map<String, Object>();
            WRAPPER_PaymentList response = new WRAPPER_PaymentList();
            
            if(getMockData == 'True'){                
                response = CNT_Payments.getTestPaymentsInformation(true);
                value.put('output', response);
            }else{
                WS_OperationsList ws_operationsList = new WS_OperationsList();                 
                WRAPPER_OperationsList output = ws_operationsList.execute(true);
                if(output != null){                    
                    if(output.operationsList != null){
                        if(output.operationsList.size() > 0){
                            List<WRAPPER_OperationsList.OperationsList> auxiliarList = output.operationsList;
                            List<WRAPPER_PaymentList.WRAPPER_Payment> paymentsList = new List<WRAPPER_PaymentList.WRAPPER_Payment>();
                            Map <String, String> statusMap = CNT_Payments.getPaymentStatusMap();
                            
                            for(WRAPPER_OperationsList.OperationsList item : auxiliarList){  
                                WRAPPER_PaymentList.WRAPPER_Payment payment = new WRAPPER_PaymentList.WRAPPER_Payment();
                                
                                if(item.operationDetail != null){
                                    payment.paymentId = item.operationDetail.operationGlobalId != null ? item.operationDetail.operationGlobalId : '';
                                    payment.clientReference = item.operationDetail.clientReference != null ? item.operationDetail.clientReference : '';
                                    payment.userGlobalId = item.operationDetail.globalUserId != null ? item.operationDetail.globalUserId : '';
                                    
                                   
                                    if(item.operationDetail.operationStatus != null){
                                        if(item.operationDetail.operationStatus.status != null){
                                            payment.paymentStatus = item.operationDetail.operationStatus.status;
                                            if(statusMap.containsKey(item.operationDetail.operationStatus.status)){
                                                 payment.paymentStatus = statusMap.get(item.operationDetail.operationStatus.status);
                                            }else{
                                                payment.parsedPaymentStatus = ''; 
                                            }
                                        }else{
                                            payment.paymentStatus = '';
                                            payment.parsedPaymentStatus = '';  
                                        }
                                       // payment.paymentStatus = item.operationDetail.operationStatus.status != null ? item.operationDetail.operationStatus.status : '' ;                                        
                                       // payment.parsedPaymentStatus = CNT_PaymentsLandingParent.getPaymentStatus(payment.paymentStatus);                                        
                                        payment.paymentReason = item.operationDetail.operationStatus.reason != null ? item.operationDetail.operationStatus.reason : '' ;
                                    }
                                    
                                    
                                    if(item.operationDetail.operationAmount != null){
                                        payment.amount = item.operationDetail.operationAmount.amount != null ? item.operationDetail.operationAmount.amount.setScale(2) : 0;
                                        payment.paymentCurrency = item.operationDetail.operationAmount.tcurrency != null ? item.operationDetail.operationAmount.tcurrency : '';                                    
                                    }
                                    
                                    if(item.operationDetail.sourceData != null){
                                        payment.sourceAlias = item.operationDetail.sourceData.name != null ? item.operationDetail.sourceData.name : '';
                                        if(item.operationDetail.sourceData.sourceAccount != null){
                                            payment.sourceAccount =  item.operationDetail.sourceData.sourceAccount.accountId != null ? item.operationDetail.sourceData.sourceAccount.accountId : '';
                                        }
                                        payment.sourceCurrency = item.operationDetail.sourceData.sourceAccount.tcurrency;
                                        payment.sourceAccountHolder = item.operationDetail.sourceData.name;
                                        payment.sourceBank = item.operationDetail.sourceData.sourceAgent.name;
                                    } 
                                    
                                    if(item.operationDetail.destinationData != null){
                                        payment.beneficiaryAlias = item.operationDetail.destinationData.destinationName != null ? item.operationDetail.destinationData.destinationName : '';
                                        if(item.operationDetail.destinationData.destinationAccount != null){
                                            payment.beneficiaryAccount =  item.operationDetail.destinationData.destinationAccount.accountId != null ? item.operationDetail.destinationData.destinationAccount.accountId : '';
                                        }
                                        payment.beneficiaryCurrency = item.operationDetail.destinationData.destinationAccount.tcurrency;
                                        payment.beneficiaryAccountHolder = item.operationDetail.destinationData.destinationName;
                                        payment.beneficiaryBank = item.operationDetail.destinationData.destinationAgent.name;
                                    }
                                    
                                    if(item.operationDetail.valueDate != null){
                                        payment.valueDate = Date.valueOf(item.operationDetail.valueDate);
                                        payment.parsedValueDate =  Date.valueOf(item.operationDetail.valueDate);
                                    }else{
                                        payment.valueDate = null;
                                        payment.parsedValueDate =  null;
                                    }
                                    
                                    paymentsList.add(payment); 
                                }
                            }
                            response.paymentsList = paymentsList;
                        }else{
                            response.paymentsList = null;
                        }
                    }
                    
                }    
       
                
                List<WRAPPER_PaymentList.WRAPPER_Status> statusList = CNT_Payments.getStatusList();
                
                List<WRAPPER_PaymentList.WRAPPER_Currency> currencyList = CNT_Payments.getCurrencyList();            
                
                List<WRAPPER_PaymentList.WRAPPER_PaymentType> paymentTypeList = CNT_Payments.getPaymentTypeList();

                // List<WRAPPER_PaymentList.WRAPPER_PaymentMethod> paymentMethodList = CNT_Payments.getPaymentMethodList();
                
                List<WRAPPER_PaymentList.WRAPPER_Country> countryList = CNT_Payments.getCountryList();
                response.statusList = statusList;
                response.currencyList = currencyList;
                // response.paymentMethodList = paymentMethodList;
                response.paymentTypeList = paymentTypeList;
                response.countryList = countryList;
                
                
                
                value.put('output', response);
            }         
            rv = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.getPaymentsInformationWithoutAccounts: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            rv = new ReturnValue(false, null, e.getMessage());
        }
        return rv; 
        
    }

    
    
            /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns payments information providing account list as request parameter
of them
History
<Date>          <Author>             <Description>
05/07/2020      Shahad Naji        	 Initial version
18/09/2020		Shahad Naji			 Discarded payments (Status = "997" y Reason= "001") are not returned to be shown in the table
02/10/2020		Shahad Naji			 Discarded payments (Status = "990" y Reason= "001") are not returned to be shown in the table
09/10/2020		Shahad Naji			Remove Discarded payments (Status = "990" y Reason= "001") condition
----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static ReturnValue getPaymentsInformation(List<WRAPPER_AccountList.AccountDetails> accountList){
        ReturnValue  rv = null;
        String getMockData = System.Label.GET_MOCK_DATA;
        try {
            Map<String, Object> value = new Map<String, Object>();
            WRAPPER_PaymentList response = new WRAPPER_PaymentList();
            
            if (getMockData == 'True'){                
                response = CNT_Payments.getTestPaymentsInformation(true);
                value.put('output', response);
            } else {
                List<WS_OperationsList.SourceAccountList> sourceAccountList =  getUserAccounts(accountList);                
                WS_OperationsList ws_operationsList = new WS_OperationsList();
                WRAPPER_OperationsList output = null;
                List<WS_OperationsList.StatusList> wsStatusList = CNT_Payments.wsGetStatusList(true, false);  
                if (sourceAccountList.size() > 0){
                    output = ws_operationsList.execute(true, sourceAccountList, wsStatusList);
                } else {
                    output = null; 
                }              
                if (output != null){                    
                    if (output.operationsList != null){
                        if (output.operationsList.size() > 0){
                            List<WRAPPER_OperationsList.OperationsList> auxiliarList = output.operationsList;
                            List<WRAPPER_PaymentList.WRAPPER_Payment> paymentsList = new List<WRAPPER_PaymentList.WRAPPER_Payment>();
                            Map<String,String> statusMap = CNT_Payments.getPaymentStatusMap();
                            for(WRAPPER_OperationsList.OperationsList item : auxiliarList){  
                                WRAPPER_PaymentList.WRAPPER_Payment payment = new WRAPPER_PaymentList.WRAPPER_Payment();
                                Boolean addPayment = true;
                                if(item.operationDetail != null){
                                    payment.paymentId = item.operationDetail.operationGlobalId != null ? item.operationDetail.operationGlobalId : '';
                                    payment.clientReference = item.operationDetail.clientReference != null ? item.operationDetail.clientReference : '';
                                    payment.userGlobalId = item.operationDetail.globalUserId != null ? item.operationDetail.globalUserId : '';
                                    if (item.operationDetail.operationAmount != null && item.operationDetail.operationAmount.amount != null && item.operationDetail.operationAmount.tcurrency != null) {
                                        payment.amount = item.operationDetail.operationAmount.amount != null ? item.operationDetail.operationAmount.amount.setScale(2) : 0;
                                        payment.paymentCurrency = item.operationDetail.operationAmount.tcurrency != null ? item.operationDetail.operationAmount.tcurrency : '';                                    
                                    } else {
                                        if(item.operationDetail.operationNominalFxDetails != null){
                                            WRAPPER_PaymentList.OperationNominalFxDetails operationNominalFxDetails = new WRAPPER_PaymentList.OperationNominalFxDetails();
                                            operationNominalFxDetails.fxCountervalueId = item.operationDetail.operationNominalFxDetails.fxCountervalueId != null ? item.operationDetail.operationNominalFxDetails.fxCountervalueId : '';
                                            operationNominalFxDetails.priceType = item.operationDetail.operationNominalFxDetails.priceType != null ? item.operationDetail.operationNominalFxDetails.priceType : '';
                                            operationNominalFxDetails.discount = item.operationDetail.operationNominalFxDetails.discount != null ? item.operationDetail.operationNominalFxDetails.discount : null;
                                            if(item.operationDetail.operationNominalFxDetails.ccyCountervalue != null){
                                                WRAPPER_PaymentList.CcyCountervalue ccyCountervalue = new WRAPPER_PaymentList.CcyCountervalue();
                                                ccyCountervalue.ccyCountervalueAmount = item.operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount != null ? item.operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount : null;
                                                ccyCountervalue.ccyCountervalueCurrency = item.operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency != null ? item.operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency : '';
                                                payment.amount = ccyCountervalue.ccyCountervalueAmount;
                                                payment.paymentCurrency = ccyCountervalue.ccyCountervalueCurrency;                                    
                                                operationNominalFxDetails.ccyCountervalue = ccyCountervalue;
                                            }
                                            operationNominalFxDetails.valueDateEfx = item.operationDetail.operationNominalFxDetails.valueDateEfx != null ? item.operationDetail.operationNominalFxDetails.valueDateEfx : '';
                                            operationNominalFxDetails.customerExchangeRate  = item.operationDetail.operationNominalFxDetails.customerExchangeRate  != null ? item.operationDetail.operationNominalFxDetails.customerExchangeRate  : null;
                                            if(item.operationDetail.operationNominalFxDetails.fxComercialMargin != null){
                                                WRAPPER_PaymentList.FxComercialMargin fxComercialMargin = new WRAPPER_PaymentList.FxComercialMargin();
                                                fxComercialMargin.fxComercialMarginAmount = item.operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount != null ? item.operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount : null;
                                                fxComercialMargin.fxComercialMarginCurrency = item.operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency != null ? item.operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency : '';
                                                operationNominalFxDetails.fxComercialMargin = fxComercialMargin;
                                            }
                                            if(item.operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp != null){
                                                WRAPPER_PaymentList.NominalAmountNoMarkUp nominalAmountNoMarkUp = new WRAPPER_PaymentList.NominalAmountNoMarkUp();
                                                nominalAmountNoMarkUp.amount = item.operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.amount != null ? item.operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.amount : null;
                                                nominalAmountNoMarkUp.tcurrency = item.operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.tcurrency != null ? item.operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.tcurrency : '';
                                                operationNominalFxDetails.nominalAmountNoMarkUp = nominalAmountNoMarkUp;
                                            }
                                            payment.operationNominalFxDetails = operationNominalFxDetails;
                                        }
                                    }
                                    if(item.operationDetail.sourceData != null){
                                        payment.sourceAlias = item.operationDetail.sourceData.name != null ? item.operationDetail.sourceData.name : '';
                                        if(item.operationDetail.sourceData.sourceAccount != null){
                                            payment.sourceAccount =  item.operationDetail.sourceData.sourceAccount.accountId != null ? item.operationDetail.sourceData.sourceAccount.accountId : '';
                                            payment.sourceCurrency = item.operationDetail.sourceData.sourceAccount.tcurrency != null ? item.operationDetail.sourceData.sourceAccount.tcurrency : '';
                                            payment.sourceAccountHolder = item.operationDetail.sourceData.name != null ? item.operationDetail.sourceData.name : '';
                                            if(item.operationDetail.sourceData.sourceAgent != null){
                                                payment.sourceBank = item.operationDetail.sourceData.sourceAgent.name != null ? item.operationDetail.sourceData.sourceAgent.name: '' ;
                                            }else{
                                                payment.sourceBank = '';
                                            }
                                        }
                                    } 
                                    if(item.operationDetail.destinationData != null){
                                        payment.beneficiaryAlias = item.operationDetail.destinationData.destinationName != null ? item.operationDetail.destinationData.destinationName : '';
                                        payment.beneficiaryAccountHolder = item.operationDetail.destinationData.destinationName != null ? item.operationDetail.destinationData.destinationName : '';
                                        if(item.operationDetail.destinationData.destinationAccount != null){
                                            payment.beneficiaryAccount =  item.operationDetail.destinationData.destinationAccount.accountId != null ? item.operationDetail.destinationData.destinationAccount.accountId : '';
                                            payment.beneficiaryCurrency = item.operationDetail.destinationData.destinationAccount.tcurrency != null ? item.operationDetail.destinationData.destinationAccount.tcurrency : '';
                                        }
                                        if(item.operationDetail.destinationData.destinationAgent != null){
                                            payment.beneficiaryBank = item.operationDetail.destinationData.destinationAgent.name != null ? item.operationDetail.destinationData.destinationAgent.name  : '';
                                        }else{
                                            payment.beneficiaryBank = '';
                                        }
                                    }
                                    if(item.operationDetail.valueDate != null){
                                        payment.valueDate = Date.valueOf(item.operationDetail.valueDate);
                                        payment.parsedValueDate =  Date.valueOf(item.operationDetail.valueDate);
                                    }else{
                                        payment.valueDate = null;
                                        payment.parsedValueDate =  null;
                                    } 
                                    if(item.operationDetail.operationStatus != null){
                                        if(item.operationDetail.operationStatus.status != null){
                                            payment.paymentStatus = item.operationDetail.operationStatus.status;
                                            if(statusMap.containsKey(item.operationDetail.operationStatus.status)){
                                                 payment.parsedPaymentStatus = statusMap.get(item.operationDetail.operationStatus.status);
                                            }else{
                                              payment.parsedPaymentStatus = '';  
                                            }
                                        }else{
                                            payment.paymentStatus = '';
                                            payment.parsedPaymentStatus = '';
                                        }
                                        payment.paymentReason = item.operationDetail.operationStatus.reason != null ? item.operationDetail.operationStatus.reason : '' ; 
                                    }
                                    if(addPayment){
                                        paymentsList.add(payment); 
                                    }
                                }
                            }
                            response.paymentsList = paymentsList;
                        } else {
                            response.paymentsList = null;
                        }
                    }           
                }    
                
                List<WRAPPER_PaymentList.WRAPPER_Status> statusList = CNT_Payments.getStatusList();            
                List<WRAPPER_PaymentList.WRAPPER_Currency> currencyList = CNT_Payments.getCurrencyList();                            
                List<WRAPPER_PaymentList.WRAPPER_PaymentType> paymentTypeList = CNT_Payments.getPaymentTypeList();
                List<WRAPPER_PaymentList.WRAPPER_Country> countryList = CNT_Payments.getCountryList();
                response.statusList = statusList;
                response.currencyList = currencyList;
                response.paymentTypeList = paymentTypeList;
                response.countryList = countryList;
                response.availableStatuses = wsStatusList;
                
                value.put('output', response);
            }  
            
            /*if(response.paymentsList == null){
                rv = new ReturnValue(false, value);
            }else{*/
              rv = new ReturnValue(true, value);  
            //}
            
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.getPaymentsInformation: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            rv = new ReturnValue(false, null, e.getMessage());
        }
        return rv; 
        
    }

    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns a payment status label
History
<Date>          <Author>             <Description>
29/07/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/     
    private static String getPaymentStatus (String statusCode){
        String aux = '';
        try{
            if(statusCode != null && statusCode != ''){
                Payment_Status__mdt ps = new Payment_Status__mdt();
                ps =  [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: statusCode LIMIT 1]; 
                aux = ps.PAY_PCK_Status__c;
            }
        }catch(Exception e){
            System.debug('CNT_PaymentsLandingParent.getPaymentStatus: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return aux;
        }
        return aux;
    }    
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns a payment status custom metadata register
History
<Date>          <Author>             <Description>
29/07/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/    
    private static Payment_Status__mdt getStatus(String statusName){
        Payment_Status__mdt aux;
        try{
            if(statusName != null && statusName != ''){
                Payment_Status__mdt ps =  [SELECT PAY_TXT_StatusCode__c, toLabel(PAY_PCK_Status__c), toLabel(PAY_PCK_Reason__c), toLabel(PAY_PCK_Description__c)  FROM Payment_Status__mdt WHERE toLabel(PAY_PCK_Reason__c) =: statusName LIMIT 1];
                aux = ps;
            }
        }catch(Exception e){
            System.debug('CNT_PaymentsLandingParent.getStatus: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return aux;
        }
        return aux;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji 
    Company:        Deloitte
    Description:    Returns account list for OperationsList service request
    History
    <Date>          <Author>             <Description>
    29/07/2020      Shahad Naji        Initial version
    11/08/2020		Shahad Naji 		Set idType of an account with the value of 'BBA', when it is empty
    ----------------------------------------------------------------------------------*/
 
    private static List<WS_OperationsList.SourceAccountList> getUserAccounts(List<WRAPPER_AccountList.AccountDetails> accountList){ 
        List<WS_OperationsList.SourceAccountList> sourceAccountList = new List<WS_OperationsList.SourceAccountList>();        
        for(WRAPPER_AccountList.AccountDetails item : accountList){              
            if(item.idType == null || item.idType == ''){
                item.idType = 'BBA';
            }
            if((item.idType != null && item.idType != '') && (item.displayNumber != null && item.displayNumber != '')){
                WS_OperationsList.SourceAccountList sourceItem = new WS_OperationsList.SourceAccountList();
                WS_OperationsList.SourceAccount sourceAccount = new WS_OperationsList.SourceAccount();
                sourceAccount.accountType = item.idType;
                sourceAccount.accountId = item.displayNumber;
                sourceItem.sourceAccount = sourceAccount;
                sourceAccountList.add(sourceItem); 
            }            
        }
        return sourceAccountList;
    }
    
    
  
        /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Returns payments statuses 
of them
History
<Date>          <Author>             <Description>
28/05/2020      Shahad Naji        Initial version
----------------------------------------------------------------------------------*/  
    
    @AuraEnabled
    public static WRAPPER_PaymentsStatuses getTestPaymentsStatuses(Boolean isSingleTabSelected, String userId){
        
        WRAPPER_PaymentsStatuses paymentStatuses = new WRAPPER_PaymentsStatuses();
        String customLabelValue = '';
        
        List<WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus> paymentStatusesList = new WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus[6];
        
        WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus paymentsStatus6 = new WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus();
  
        customLabelValue = System.Label.PAY_Status_PendingOne;
        system.debug('PAY ' + customLabelValue);
        
        Payment_Status__mdt ps1 =  getStatus(customLabelValue);
       if(ps1 <> null){
        paymentsStatus6.statusId = ps1.PAY_TXT_StatusCode__c;         
        paymentsStatus6.statusCod = 'Cod'+ps1.PAY_TXT_StatusCode__c;
        paymentsStatus6.statusName = 'true_'+ps1.PAY_TXT_StatusCode__c;
        paymentsStatus6.parsedStatusName = ps1.PAY_PCK_Status__c;
        paymentsStatus6.statusDescription = ps1.PAY_PCK_Description__c;
        paymentsStatus6.numberOfRecords =0;
        paymentsStatus6.parsedStatusDescription = ps1.PAY_PCK_Reason__c;
        paymentStatusesList.add(0,paymentsStatus6); 
       }

        
        WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus paymentsStatus2 = new WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus();
        
        customLabelValue = System.Label.PAY_Status_PendingTwo;
        system.debug('PAY ' + customLabelValue);
        Payment_Status__mdt ps2 =  getStatus(customLabelValue);
        if(ps2 <> null){
            paymentsStatus2.statusId = ps2.PAY_TXT_StatusCode__c; 
            paymentsStatus2.statusCod = 'Cod'+ps2.PAY_TXT_StatusCode__c;
            paymentsStatus2.statusName = 'false_'+ps2.PAY_TXT_StatusCode__c;
            paymentsStatus2.parsedStatusName = ps2.PAY_PCK_Status__c;
            paymentsStatus2.statusDescription = ps2.PAY_PCK_Description__c;
            paymentsStatus2.numberOfRecords = 0;
            paymentsStatus2.parsedStatusDescription = ps2.PAY_PCK_Reason__c;
            paymentStatusesList.add(1,paymentsStatus2); 
        }
     
        
        WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus paymentsStatus1 = new WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus(); 
        
        customLabelValue = System.Label.PAY_Status_InReviewOne;
        system.debug('PAY ' + customLabelValue);
       Payment_Status__mdt ps3 =  getStatus(customLabelValue);
        if(ps3 <> null){
            paymentsStatus1.statusId = ps3.PAY_TXT_StatusCode__c; 
            paymentsStatus1.statusCod = 'Cod'+ps3.PAY_TXT_StatusCode__c;
            paymentsStatus1.statusName = ps3.PAY_TXT_StatusCode__c;
            paymentsStatus1.parsedStatusName = ps3.PAY_PCK_Status__c;
            paymentsStatus1.statusDescription = ps3.PAY_PCK_Description__c;
            paymentsStatus1.numberOfRecords = 0;
            paymentsStatus1.parsedStatusDescription = ps3.PAY_PCK_Reason__c;
            paymentStatusesList.add(2,paymentsStatus1); 
        }
        

        WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus paymentsStatus5 = new WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus();
        customLabelValue = System.Label.PAY_Status_ScheduledOne;
        system.debug('PAY ' + customLabelValue);
        Payment_Status__mdt ps4 =  getStatus(customLabelValue);
        if(ps4 <> null){
            paymentsStatus5.statusId = ps4.PAY_TXT_StatusCode__c; 
            paymentsStatus5.statusCod = 'Cod'+ps4.PAY_TXT_StatusCode__c;
            paymentsStatus5.statusName = ps4.PAY_TXT_StatusCode__c;
            paymentsStatus5.parsedStatusName = ps4.PAY_PCK_Status__c;
            paymentsStatus5.statusDescription = ps4.PAY_PCK_Description__c;
            paymentsStatus5.numberOfRecords = 0;
            paymentsStatus5.parsedStatusDescription = ps4.PAY_PCK_Reason__c;
            paymentStatusesList.add(3,paymentsStatus5); 
        }

        
        WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus paymentsStatus3 = new WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus();
        customLabelValue = System.Label.PAY_Status_CompletedOne;
        system.debug('PAY ' + customLabelValue);
        Payment_Status__mdt ps5 =  getStatus(customLabelValue);
        if(ps5 <> null){
            paymentsStatus3.statusId = ps5.PAY_TXT_StatusCode__c; 
            paymentsStatus3.statusCod = 'Cod'+ps5.PAY_TXT_StatusCode__c;
            paymentsStatus3.statusName = ps5.PAY_TXT_StatusCode__c;
            paymentsStatus3.parsedStatusName = ps5.PAY_PCK_Status__c;
            paymentsStatus3.statusDescription = ps5.PAY_PCK_Description__c;
            paymentsStatus3.numberOfRecords = 0;
            paymentsStatus3.parsedStatusDescription = ps5.PAY_PCK_Reason__c;
            paymentStatusesList.add(4,paymentsStatus3); 
        }

        
        WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus paymentsStatus4 = new WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus();
        customLabelValue = System.Label.PAY_Status_RejectedOne;
        system.debug('PAY ' + customLabelValue);
        Payment_Status__mdt ps6 =  getStatus(customLabelValue);
        if(ps6 <> null){
            paymentsStatus4.statusId = ps6.PAY_TXT_StatusCode__c; 
            paymentsStatus4.statusCod = 'Cod'+ps6.PAY_TXT_StatusCode__c;
            paymentsStatus4.statusName = ps6.PAY_TXT_StatusCode__c;
            paymentsStatus4.parsedStatusName = ps6.PAY_PCK_Status__c;
            paymentsStatus4.statusDescription = ps6.PAY_PCK_Description__c;
            paymentsStatus4.numberOfRecords = 0;
            paymentsStatus4.parsedStatusDescription = ps6.PAY_PCK_Reason__c;
            paymentStatusesList.add(5,paymentsStatus4); 
        }

         
        
        paymentStatuses.paymentStatusList = paymentStatusesList;
        paymentStatuses.totalNumberOfRecords = 0;
        
        return paymentStatuses;
    }

    /*----------------------------------------------------------------------------------
    Author:         Shahad Naji 
    Company:        Deloitte
    Description:    Returns payments to download as an array of bytes
    History
    <Date>          <Author>       <Description>
    04/09/2020      Bea Hill       Initial version
    ----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static ReturnValue downloadPayments(List<WRAPPER_AccountList.AccountDetails> accountList, String fileFormat){
        ReturnValue  rv = null;
        try {
            Map<String, Object> value = new Map<String, Object>();
            List<WS_OperationsList.SourceAccountList> sourceAccountList =  getUserAccounts(accountList);
            WS_OperationsList downloadOperationsList = new WS_OperationsList();   
            Map<String, Object> output = new Map<String, Object>();
            if(sourceAccountList.size() > 0){
                output = downloadOperationsList.downloadPaymentsList(true, sourceAccountList, fileFormat);
                
                System.debug('CNT_PaymentsLandingParent.downloadPayments: ' + fileFormat);
            }              
            if(output != null){
                value.put('output', output);
                System.debug('CNT_PaymentsLandingParent.downloadPayments output: ' + output);
            }                
            
            rv = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.downloadPayments: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            rv = new ReturnValue(false, null, e.getMessage());
        }
        return rv; 
        
    }

    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Remove file
    History
    <Date>			<Author>		        <Description>
    11/12/2019		R. Alexander Cervino     Initial version
    27/08/2020      Bea Hill                Adapted for CNT_PaymentsLandingFilters

    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static void removeFile(String id){
        try{
            if(id!=''){
                List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument where Id=:id LIMIT 1]);

                if(!doc.isEmpty()){
                    delete doc[0];
                }
            }

        } catch (Exception e) {throw new customException(e.getMessage());}

    }
    
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
        
    }  
    @AuraEnabled
    public static String encryptData(String str){
        return Global_Utilities.encryptData(str);
    }

     /*----------------------------------------------------------------------------------
    Author:         Bea Hill 
    Company:        Deloitte
    Description:    Prepare list of accounts for statusHeader input
    History
    <Date>          <Author>       <Description>
    14/01/2021      Bea Hill       Initial version
    ----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static List<WS_OperationsByStatus.AccountList> createInputAccountList(List<WRAPPER_AccountList.AccountDetails> accountList) {
        List<WS_OperationsByStatus.AccountList> inputAccountList = new List<WS_OperationsByStatus.AccountList>();
        try {
            if(!accountList.isEmpty()) {
                for(WRAPPER_AccountList.AccountDetails item : accountList){  
                    if(item.idType == null || item.idType == ''){
                        item.idType = 'BBA';
                    }
                    if((item.idType != null && item.idType != '') && (item.displayNumber != '' && item.displayNumber != null)){
                        WS_OperationsByStatus.Account input_account = new WS_OperationsByStatus.Account();
                        input_account.idType = item.idType;
                        input_account.accountId = item.displayNumber;
                        WS_OperationsByStatus.AccountList input_accountList = new WS_OperationsByStatus.AccountList(input_account);    
                        inputAccountList.add(input_accountList);                      
                    } 
                }
            }
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.createInputAccountList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }  
        return inputAccountList;
    }

    /*----------------------------------------------------------------------------------
    Author:         Bea Hill 
    Company:        Deloitte
    Description:    Prepare list of statuses, reasons and date filters for statusHeader input
    History
    <Date>          <Author>       <Description>
    14/01/2021      Bea Hill       Initial version
    ----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static List<WS_OperationsByStatus.StatusList> createInputStatusList(List<WS_OperationsList.StatusList> frontStatusList) {
        List<WS_OperationsByStatus.StatusList> inputStatusList = new List<WS_OperationsByStatus.StatusList>();  
        try {
            if(!frontStatusList.isEmpty()) {
                String today = Datetime.now().format('yyyy-MM-dd');
                Datetime dtNext = Datetime.now() + 7;
                String nextWeek =dtNext.format('yyyy-MM-dd');
                Datetime dtLast = Datetime.now() - 7; 
                String lastWeek = dtLast.format('yyyy-MM-dd');
                String noDate = null;

                //002 = Pending
                List<WS_OperationsByStatus.StatusList> statuses002 = getStatusReasonPairs('002', noDate, noDate, frontStatusList);
                inputStatusList.addAll(statuses002);
                // WS_OperationsByStatus.StatusList inputStatus002 = new WS_OperationsByStatus.StatusList();
                // inputStatus002.status = '002';
                // inputStatusList.add(inputStatus002);

                
                //003 = In review
                List<WS_OperationsByStatus.StatusList> statuses003 = getStatusReasonPairs('003', noDate, noDate, frontStatusList);
                inputStatusList.addAll(statuses003);  
                // WS_OperationsByStatus.StatusList inputStatus003 = new WS_OperationsByStatus.StatusList();
                // inputStatus003.status = '003';
                // inputStatusList.add(inputStatus003);
                
                // String dateString1 = Datetime.now().format('yyyy-MM-dd');
                // Datetime dt = Datetime.now() + 7;
                // String dateString2 =dt.format('yyyy-MM-dd');

                //201 = Scheduled
                List<WS_OperationsByStatus.StatusList> statuses201 = getStatusReasonPairs('201', today, nextWeek, frontStatusList);  
                inputStatusList.addAll(statuses201);
                // WS_OperationsByStatus.StatusList inputStatus201 = new WS_OperationsByStatus.StatusList();
                // inputStatus201.status = '201';                
                // inputStatus201.valueDateFrom = String.valueOf(dateString1);
                // inputStatus201.valueDateTo = String.valueOf(dateString2);
                // inputStatusList.add(inputStatus201);
                
                // dateString1 = Datetime.now().format('yyyy-MM-dd');
                // dt = Datetime.now() - 7; 
                // dateString2 =dt.format('yyyy-MM-dd');

                //103 = Completed
                List<WS_OperationsByStatus.StatusList> statuses103 = getStatusReasonPairs('103', lastWeek, today, frontStatusList);  
                inputStatusList.addAll(statuses103);
                // WS_OperationsByStatus.StatusList inputStatus103 = new WS_OperationsByStatus.StatusList();
                // inputStatus103.status = '103';               
                // inputStatus103.valueDateFrom = String.valueOf(dateString2); 
                // inputStatus103.valueDateTo = String.valueOf(dateString1); 
                // inputStatusList.add(inputStatus103);
                
                //999 = Rejected
                List<WS_OperationsByStatus.StatusList> statuses999 = getStatusReasonPairs('999', lastWeek, today, frontStatusList);  
                inputStatusList.addAll(statuses999);
                // for (WS_OperationsList.StatusList statusReason : frontStatusList) {
                //     if(statusReason.status == '999' && String.isNotBlank(statusReason.reason)) {
                //         WS_OperationsByStatus.StatusList inputStatus999 = new WS_OperationsByStatus.StatusList();
                //         inputStatus999.status = '999';    
                //         inputStatus999.reason = statusReason.reason;            
                //         inputStatus999.valueDateFrom = String.valueOf(dateString2);
                //         inputStatus999.valueDateTo = String.valueOf(dateString1);
                //         inputStatusList.add(inputStatus999);
                //     }
                // }      
            }
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.createInputStatusList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }  
        return inputStatusList;
    }


     /*----------------------------------------------------------------------------------
    Author:         Bea Hill 
    Company:        Deloitte
    Description:    Sum the status-reason counts for each status
    History
    <Date>          <Author>       <Description>
    14/01/2021      Bea Hill       Initial version
    ----------------------------------------------------------------------------------*/     
    // @AuraEnabled
    // public static List<WRAPPER_OperationsByStatus.StatusList> collateCounts(List<WRAPPER_OperationsByStatus.StatusList> separateCountList, List<String> statusesToCollate) {
    //     List<WRAPPER_OperationsByStatus.StatusList> collatedCountList = new List<WS_OperationsByStatus.StatusList>();  
    //     List<String> auxStatusList = [];  
    //     try {
    //         if(!separateCountList.isEmpty()) {
    //             for (WRAPPER_OperationsByStatus.StatusList inputItem : separateCountList) {
    //                 if (isNotBlank(inputItem.status)) {
    //                     if (statusesToCollate.contains(inputItem.status)) {
    //                         WRAPPER_OperationsByStatus.StatusList outputItem = new WRAPPER_OperationsByStatus.StatusList();
    //                         if (!auxStatusList.contains(inputItem.status)) {
    //                             auxStatusList.add(inputItem.status);
    //                             outputItem.status = inputItem.status;
    //                             outputItem.countOperation = (inputItem.countOperation != null ? inputItem.countOperation : 0);
    //                             outputItem.pendingAuthorization = inputItem.pendingAuthorization;
    //                         } else {
    //                             for (WRAPPER_OperationsByStatus.StatusList outputItem : collatedCountList) {
    //                                 if (outputItem.status == inputItem.status) {
    //                                     outputItem.countOperation += (inputItem.countOperation != null ? inputItem.countOperation : 0);
    //                                 }
    //                             } 
    //                         }
    //                         collatedCountList.add(outputItem);
    //                     } else {
    //                         collatedCountList.add(inputItem);
    //                     }
                        
    //                 } 
    //             }
    //         }
    //     } catch (Exception e) {
    //         System.debug('CNT_PaymentsLandingParent.collateCounts: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
    //     }  
    //     return collatedCountList;
    // }

/*----------------------------------------------------------------------------------
Author:         Bea Hill 
Company:        Deloitte
Description:    Get the total of the countOperation
History
<Date>          <Author>       <Description>
14/01/2021      Bea Hill       Initial version
----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static Integer getTotalCount(List<WRAPPER_OperationsByStatus.StatusList> statusCountList) {
        Integer totalCount = 0;
        try {
            if(!statusCountList.isEmpty()) {
                for (WRAPPER_OperationsByStatus.StatusList statusCount : statusCountList) {
                    totalCount += (statusCount.countOperation != null ? statusCount.countOperation : 0);
                }
            }
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.getTotalCount: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }  
        return totalCount;
    }

    /*----------------------------------------------------------------------------------
    Author:         Bea Hill 
    Company:        Deloitte
    Description:    Complete the status list output
    History
    <Date>          <Author>       <Description>
    14/01/2021      Bea Hill       Initial version
    ----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static List<WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus> completeStatusListOutput(List<WRAPPER_OperationsByStatus.StatusList> statusList) {
        List<WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus> paymentStatusesList = new WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus[6];
        try {
            if(!statusList.isEmpty()) {
                for(WRAPPER_OperationsByStatus.StatusList item :  statusList){           
                    WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus paymentsStatus = new WRAPPER_PaymentsStatuses.WRAPPER_PaymentsStatus();
                    String customLabelValue = '';
                    if(item.status == '002'){
                        if(item.pendingAuthorization == true){
                            customLabelValue = System.Label.PAY_Status_PendingOne;   
                        }else{
                            customLabelValue = System.Label.PAY_Status_PendingTwo;  
                        }                                 
                    }                            
                    if(item.status == '003'){
                        customLabelValue = System.Label.PAY_Status_InReviewOne;
                    }                            
                    if(item.status == '201'){
                        customLabelValue = System.Label.PAY_Status_ScheduledOne;
                    }                             
                    if(item.status == '103'){
                        customLabelValue = System.Label.PAY_Status_CompletedOne;
                    }
                    if(item.status == '999'){
                        customLabelValue = System.Label.PAY_Status_RejectedOne;
                    }
                    if(customLabelValue != null && customLabelValue != ''){
                        Payment_Status__mdt ps =  getStatus(customLabelValue);
                        if(ps != null){
                            paymentsStatus.statusId = ps.PAY_TXT_StatusCode__c;       
                            paymentsStatus.statusCod = 'Cod'+ps.PAY_TXT_StatusCode__c;
                            paymentsStatus.statusName = ps.PAY_TXT_StatusCode__c;
                            paymentsStatus.parsedStatusName = ps.PAY_PCK_Status__c;
                            paymentsStatus.statusDescription = ps.PAY_PCK_Description__c;
                            paymentsStatus.numberOfRecords = item.countOperation != null ? item.countOperation : 0;
                            paymentsStatus.parsedStatusDescription = ps.PAY_PCK_Reason__c;

                            if(item.status == '002'){
                                if(item.pendingAuthorization == true){
                                    paymentsStatus.statusName = 'true_'+ps.PAY_TXT_StatusCode__c;
                                    paymentStatusesList.add(0,paymentsStatus);                         
                                }else{
                                    //adding "aux_" to differentiate between the different types of pending payments 
                                    paymentsStatus.statusName = 'false_'+ps.PAY_TXT_StatusCode__c;
                                    paymentStatusesList.add(1,paymentsStatus);  
                                }                                 
                            }                            
                            if(item.status == '003'){
                                paymentStatusesList.add(2,paymentsStatus);
                            }                            
                            if(item.status == '201'){
                                paymentStatusesList.add(3,paymentsStatus);
                            }                             
                            if(item.status == '103'){
                                paymentStatusesList.add(4,paymentsStatus);
                            }
                            if(item.status == '999'){
                                paymentStatusesList.add(5,paymentsStatus);
                            } 
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.completeStatusListOutput: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }  
        return paymentStatusesList;
    }
        
    /*----------------------------------------------------------------------------------
    Author:         Bea Hill 
    Company:        Deloitte
    Description:    Sum the status-reason counts for each status, keeping those with pendingAuthorization separate
    History
    <Date>          <Author>       <Description>
    14/01/2021      Bea Hill       Initial version
    ----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static List<WRAPPER_OperationsByStatus.StatusList> collateCounts(List<WRAPPER_OperationsByStatus.StatusList> separateCountList) {
        List<WRAPPER_OperationsByStatus.StatusList> collatedCountList = new List<WRAPPER_OperationsByStatus.StatusList>();  
        List<String> auxStatusList = new List<String>(); 
        try {
            if(!separateCountList.isEmpty()) {
                for (WRAPPER_OperationsByStatus.StatusList inputItem : separateCountList) {
                    if (String.isNotBlank(inputItem.status)) {
                        String statusToCheck = '';
                        if(inputItem.pendingAuthorization != null) {
                            if(inputItem.pendingAuthorization == true) {
                                statusToCheck = inputItem.status + 'T';
                            } else {
                                statusToCheck = inputItem.status + 'F';
                            }
                        } else {
                            statusToCheck = inputItem.status;
                        }
                        if (auxStatusList.size() == 0 || !auxStatusList.contains(statusToCheck)) {
                            WRAPPER_OperationsByStatus.StatusList outputItem = new WRAPPER_OperationsByStatus.StatusList();
                            auxStatusList.add(statusToCheck);
                            outputItem.status = inputItem.status;
                            outputItem.countOperation = (inputItem.countOperation != null ? inputItem.countOperation : 0);
                            outputItem.pendingAuthorization = inputItem.pendingAuthorization;
                            collatedCountList.add(outputItem);
                        } else {
                            for (WRAPPER_OperationsByStatus.StatusList existingItem : collatedCountList) {
                                if (existingItem.status == inputItem.status) {
                                    existingItem.countOperation += (inputItem.countOperation != null ? inputItem.countOperation : 0);
                                }
                            } 
                        }
                    } 
                }
            }
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.collateCounts: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }  
        return collatedCountList;
    }

    /*----------------------------------------------------------------------------------
    Author:         Bea Hill 
    Company:        Deloitte
    Description:    Given a status code and date filters, return a list of the individual separated status-reason pairs that are visible in front and the date filters.
    History
    <Date>          <Author>       <Description>
    18/01/2021      Bea Hill       Initial version
    ----------------------------------------------------------------------------------*/     
    @AuraEnabled
    public static List<WS_OperationsByStatus.StatusList> getStatusReasonPairs(String status, String valueDateFrom, String valueDateTo, List<WS_OperationsList.StatusList> frontStatusList) {
        List<WS_OperationsByStatus.StatusList> statusReasonList = new List<WS_OperationsByStatus.StatusList>();  
        try {
            if(String.isNotBlank(status)) {
                for (WS_OperationsList.StatusList statusReason : frontStatusList) {
                    if(statusReason.status == status && String.isNotBlank(statusReason.reason)) {
                        WS_OperationsByStatus.StatusList statusReasonItem = new WS_OperationsByStatus.StatusList();
                        statusReasonItem.status = status;    
                        statusReasonItem.reason = statusReason.reason;            
                        statusReasonItem.valueDateFrom = valueDateFrom;
                        statusReasonItem.valueDateTo = valueDateTo;
                        statusReasonList.add(statusReasonItem);
                    }
                }     
            }
        } catch (Exception e) {
            System.debug('CNT_PaymentsLandingParent.getStatusReasonPairs: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }  
        return statusReasonList;
    }
}