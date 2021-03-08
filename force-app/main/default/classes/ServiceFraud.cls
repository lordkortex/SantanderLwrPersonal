/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:   	

Test Class:     TBD
History
<Date>			<Author>		<Description>
29/12/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
global with sharing class ServiceFraud {
    

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to simulate or validate Fraud in a transaction
    History:
    <Date>          <Author>            <Description>
    30/12/2020      Shahad Naji         Initial version
    01/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    global static WS_Fraud.OUTPUT executeFraud (Map<String, String> navigatorInfo, WRAPPER_PAY_PaymentDraft paymentDraft) {
        WS_Fraud.OUTPUT output = new WS_Fraud.OUTPUT();
        try {
            String fraudId = null;
            String referenceId = paymentDraft.paymentId;
            String operationType = '100';
            String operationSubtype = '101';
            String callType = '04';
            String sourceCustomerId = paymentDraft.sourceAccount.codigoCorporate;
            if (paymentDraft.sourceAccount.companyIdsList != null &&  String.isNotBlank(paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier))) {
                sourceCustomerId = paymentDraft.sourceAccount.companyIdsList.get(System.Label.CNF_APIIdentifier);
            }
            String country = paymentDraft.sourceAccount.country;
            String codigoBic = paymentDraft.sourceAccount.codigoBic;
            WRAPPER_PaymentMetaData metaData = ServiceFraud.setPaymentMetaData(paymentDraft);
            WS_Fraud ws_fraud = new WS_Fraud();
            output = ws_fraud.execute(fraudId, referenceId, sourceCustomerId, operationType, operationSubtype, callType, metaData, navigatorInfo, country, codigoBic);
        } catch (Exception e) {
            System.debug('ServiceFraud.getFraud: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            output = null;
        }
        return output;
    }
    

          /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to simulate or validate Fraud in a transaction
    History:
    <Date>          <Author>            <Description>
    30/12/2020      Shahad Naji         Initial version
----------------------------------------------------------------------------------*/
    global static WS_Fraud.OUTPUT executeFraud (Map<String, String> stepData, Map<String, String> navigatorInfo, String paymentId, WRAPPER_AccountList.AccountDetails sourceAccount, WRAPPER_AccountList.AccountDetails destinationAccount, WRAPPER_B2B_Data.PaymentAmount amountData, String amountEnteredFrom){
        WS_Fraud.OUTPUT output = new WS_Fraud.OUTPUT();
        try {
            String fraudId = null;
            String referenceId = paymentId;
            String operationType = '100';
            String operationSubtype = '101';
            String callType = '04';
            
            String sourceCustomerId = sourceAccount.codigoCorporate;
            if(sourceAccount.companyIdsList != null &&  String.isNotBlank(sourceAccount.companyIdsList.get('LOCAL'))){
                sourceCustomerId = sourceAccount.companyIdsList.get('LOCAL');
            }
             
            WRAPPER_PaymentMetaData metaData = ServiceFraud.setPaymentMetaData(paymentId, stepData, sourceAccount, destinationAccount, amountData, amountEnteredFrom);
            WS_Fraud ws_fraud = new WS_Fraud();
            output = ws_fraud.execute(fraudId, referenceId, sourceCustomerId, operationType, operationSubtype, callType, metaData, navigatorInfo);
        } catch (Exception e) {
            System.debug('ServiceFraud.getFraud: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            output = null;
        }
        return output;
    }
    
    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Set metadata values according to WS_B2B_Orchestation & WS_TrackingPaymentOperation
    History:
    <Date>          <Author>            <Description>
    29/12/2020      Shahad Naji         Initial version
    30/12/2020      Andrea Martin       Initiates parameters
    01/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
    global static WRAPPER_PaymentMetaData setPaymentMetaData( WRAPPER_PAY_PaymentDraft paymentDraft) {
        WRAPPER_PaymentMetaData paymentMetaData = new WRAPPER_PaymentMetaData();
        paymentMetaData.accessChannel = 'web'; //MANDATORY
        WRAPPER_PaymentMetaData.PaymentDataArea paymentDataAreaAux =  new WRAPPER_PaymentMetaData.PaymentDataArea();
        WRAPPER_PaymentMetaData.DestinationAddress destinationAddressAux = new WRAPPER_PaymentMetaData.DestinationAddress();        
        WRAPPER_PaymentMetaData.DestinationAccount destinationAccountAux = new WRAPPER_PaymentMetaData.DestinationAccount(); // MANDATORY
        WRAPPER_PaymentMetaData.DestinationAgent destinationAgentAux = new WRAPPER_PaymentMetaData.DestinationAgent(); // MANDATORY
        WRAPPER_PaymentMetaData.SourceAccount sourceAccountAux = new WRAPPER_PaymentMetaData.SourceAccount(); // MANDATORY
        WRAPPER_PaymentMetaData.SourceAmlInformation sourceAmlInformationAux = new WRAPPER_PaymentMetaData.SourceAmlInformation();
        WRAPPER_PaymentMetaData.SourceAddress sourceAddressAux = new  WRAPPER_PaymentMetaData.SourceAddress();
        WRAPPER_PaymentMetaData.SourceAgent sourceAgentAux = new WRAPPER_PaymentMetaData.SourceAgent();
        WRAPPER_PaymentMetaData.PaymentAmount paymentAmountAux = new WRAPPER_PaymentMetaData.PaymentAmount();
        WRAPPER_PaymentMetaData.CounterValuePaymentAmount counterValuePaymentAmountAux = new WRAPPER_PaymentMetaData.CounterValuePaymentAmount();
        WRAPPER_PaymentMetaData.FxValueDetailsNominal fxValueDetailsNominalAux = new WRAPPER_PaymentMetaData.FxValueDetailsNominal(); // exchangeRateServiceResponse
        WRAPPER_PaymentMetaData.FxCommercialMargin fxCommercialMarginAux = new WRAPPER_PaymentMetaData.FxCommercialMargin();
        WRAPPER_PaymentMetaData.FxCounterpaymentAmount fxCounterpaymentAmountAux = new WRAPPER_PaymentMetaData.FxCounterpaymentAmount();
        WRAPPER_PaymentMetaData.FxValueDetailsFee fxValueDetailsFeeAux =  new WRAPPER_PaymentMetaData.FxValueDetailsFee(); // transactionFeeServiceResponse
        if (String.isNotBlank(paymentDraft.paymentId)) {
            paymentDataAreaAux.idempotentReference = paymentDraft.paymentId; // MANDATORY
        }
        paymentDataAreaAux.flowIndicator = 'S';
        paymentDataAreaAux.chargeBearer = 'OUR'; // Description of expenses  BEN,OUR,SHA. By default 'ORD'  ISO20022/Pain001. by Default "OUR"  
        paymentDataAreaAux.purposeCode = 'OTHR';
        if (paymentDraft.destinationAccount != null && paymentDraft.sourceAccount != null) {
            if (String.isNotBlank(paymentDraft.destinationAccount.subsidiaryName)) {
                paymentDataAreaAux.destinationName = paymentDraft.destinationAccount.subsidiaryName; // MANDATORY
            }
            if (String.isNotBlank(paymentDraft.destinationAccount.idType)) {
                destinationAccountAux.accountIdType = paymentDraft.destinationAccount.idType; // MANDATORY    
            }
            if (String.isNotBlank(paymentDraft.destinationAccount.displayNumber)) {
                destinationAccountAux.accountId = paymentDraft.destinationAccount.displayNumber; // MANDATORY    
            }
            if (String.isNotBlank(paymentDraft.destinationAccount.codigoBic)) {
                destinationAgentAux.agent = paymentDraft.destinationAccount.codigoBic; // MANDATORY   
            }
            if (String.isNotBlank(paymentDraft.destinationAccount.bankName)) {
                destinationAgentAux.agentName = paymentDraft.destinationAccount.bankName;
            }
            if (String.isNotBlank(paymentDraft.destinationAccount.country)) {
                paymentDataAreaAux.countryDestinationFunds = paymentDraft.destinationAccount.country; 
            }
            if (paymentDraft.destinationAccount.address != null) {
                if (String.isNotBlank(paymentDraft.destinationAccount.address.streetName)) {
                    destinationAddressAux.streetName = paymentDraft.destinationAccount.address.streetName;
                }
                if (String.isNotBlank(paymentDraft.destinationAccount.address.townName)) {
                    destinationAddressAux.townName = paymentDraft.destinationAccount.address.townName;
                }
                if (String.isNotBlank(paymentDraft.destinationAccount.address.country)) {
                    destinationAddressAux.country = paymentDraft.destinationAccount.address.country;
                }
            }
            if (String.isNotBlank(paymentDraft.sourceAccount.idType)) {
                sourceAccountAux.accountIdType = paymentDraft.sourceAccount.idType; // MANDATORY 
            }
            if (String.isNotBlank(paymentDraft.sourceAccount.displayNumber)) {
                sourceAccountAux.accountId = paymentDraft.sourceAccount.displayNumber; // MANDATORY
            }
            if (String.isNotBlank(paymentDraft.sourceAccount.subsidiaryName)) {
                paymentDataAreaAux.sourceName = paymentDraft.sourceAccount.subsidiaryName;
            }
            if (String.isNotBlank(paymentDraft.sourceAccount.codigoBic)) {
                sourceAgentAux.agent = paymentDraft.sourceAccount.codigoBic;
            }
            if (String.isNotBlank(paymentDraft.sourceAccount.bankName)) {
                sourceAgentAux.agentName = paymentDraft.sourceAccount.bankName;
            }
            if(paymentDraft.sourceAccount.address != null){
                if (String.isNotBlank(paymentDraft.sourceAccount.address.streetName)) {
                    sourceAddressAux.streetName = paymentDraft.sourceAccount.address.streetName;
                }
                if (String.isNotBlank(paymentDraft.sourceAccount.address.townName)) {
                    sourceAddressAux.townName = paymentDraft.sourceAccount.address.townName; 
                }
                if (String.isNotBlank(paymentDraft.sourceAccount.address.country)) {
                    sourceAddressAux.country = paymentDraft.sourceAccount.address.country;
                }
            }
            if (String.isNotBlank(paymentDraft.destinationAccount.currencyCodeAvailableBalance.trim()) && String.isNotBlank(paymentDraft.sourceAccount.currencyCodeAvailableBalance.trim())) {
                if(paymentDraft.destinationAccount.currencyCodeAvailableBalance.trim() == paymentDraft.sourceAccount.currencyCodeAvailableBalance.trim()){
                    if (String.isNotBlank(paymentDraft.sourceAccount.currencyCodeAvailableBalance.trim())) {
                        paymentAmountAux.tcurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance.trim();
                    }
                    if (paymentDraft.amountSend != null) {
                        paymentAmountAux.amount = paymentDraft.amountSend;
                    }
                } else if ((paymentDraft.destinationAccount.currencyCodeAvailableBalance.trim() != paymentDraft.sourceAccount.currencyCodeAvailableBalance.trim())) {
                    if (String.isNotBlank(paymentDraft.amountEnteredFrom)) {
                        if (paymentDraft.amountEnteredFrom == 'source') {
                            if (String.isNotBlank(paymentDraft.sourceAccount.currencyCodeAvailableBalance.trim())) {
                                counterValuePaymentAmountAux.tcurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance.trim();
                            }
                            if (paymentDraft.amountSend != null) {
                                counterValuePaymentAmountAux.amount = paymentDraft.amountSend;
                            }
                            if (String.isNotBlank(paymentDraft.destinationAccount.currencyCodeAvailableBalance.trim())) {
                                counterValuePaymentAmountAux.tradeCurrency = paymentDraft.destinationAccount.currencyCodeAvailableBalance.trim();
                            }
                        } else {
                            if (String.isNotBlank(paymentDraft.destinationAccount.currencyCodeAvailableBalance.trim())) {
                                paymentAmountAux.tcurrency = paymentDraft.destinationAccount.currencyCodeAvailableBalance.trim();
                            }
                            if (paymentDraft.amountReceive != null) {
                                paymentAmountAux.amount = paymentDraft.amountReceive;
                            }
                        }
                    }
                }
            }
            if (String.isNotBlank(paymentDraft.destinationAccount.codigoCorporate) && String.isNotBlank(paymentDraft.sourceAccount.codigoCorporate) && String.isNotBlank(paymentDraft.destinationAccount.codigoCorporate.trim()) && String.isNotBlank(paymentDraft.sourceAccount.codigoCorporate.trim())) {
                if (paymentDraft.destinationAccount.codigoCorporate.trim() == paymentDraft.sourceAccount.codigoCorporate.trim()) {
                    paymentDataAreaAux.customerIndicator = 'equal';
                } else {
                    paymentDataAreaAux.customerIndicator = 'different';
                }
            }
        }
        if (paymentDraft != null) {
            if (String.isNotBlank(paymentDraft.reference)) {
                paymentDataAreaAux.endToEndIdentification = paymentDraft.reference;
            }
            if (String.isNotBlank(paymentDraft.description)) {
                paymentDataAreaAux.subject = paymentDraft.description;  
            }
        }
        if (paymentDraft.exchangeRateServiceResponse != null) {
            if (paymentDraft.exchangeRateServiceResponse.fxExchangeResponse != null) {
                if (String.isNotBlank(paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.fxCountervalueId)) {
                    fxValueDetailsNominalAux.fxCountervalueId = paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.fxCountervalueId;
                    fxValueDetailsFeeAux.fxCountervalueId = paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.fxCountervalueId; // PREGUNTAR SI ES EL ID PUEDE SER LE MISMO EN AMBOS OBJETOS
                }
                if (paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.fxComercialMargin != null) {
                    if (paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount != null) {
                        fxCommercialMarginAux.fxCommercialMarginAmount = paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount;
                    }
                    if (String.isNotBlank(paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency)) {
                        fxCommercialMarginAux.fxCommercialMarginCurrency = paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency;
                    }
                }
                if (paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.ccyCountervalue != null) {
                    if(paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.ccyCountervalue.ccyCountervalueAmount != null) {
                        fxCounterpaymentAmountAux.amount = Double.valueOf(paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.ccyCountervalue.ccyCountervalueAmount);
                    }
                    if (String.isNotBlank(paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.ccyCountervalue.ccyCountervalueCurrency)) {
                        fxCounterpaymentAmountAux.tcurrency = paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.ccyCountervalue.ccyCountervalueCurrency;
                    }
                }
                if (String.isNotBlank(paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.valueDateEfx)) {
                    fxValueDetailsNominalAux.fxExecutionDate = Date.valueOf(paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.valueDateEfx);
                    fxValueDetailsNominalAux.fxValueDate = Date.valueOf(paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.valueDateEfx);
                }
                if (paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.customerExchangeRate != null) {
                    fxValueDetailsNominalAux.fxExchangeRate = paymentDraft.exchangeRateServiceResponse.fxExchangeResponse.customerExchangeRate;
                }
            }
        }
        fxValueDetailsNominalAux.fxCounterpaymentAmount = fxCounterpaymentAmountAux;
        fxValueDetailsNominalAux.fxCommercialMargin = fxCommercialMarginAux;
        paymentDataAreaAux.fxValueDetailsNominal = fxValueDetailsNominalAux;
        paymentDataAreaAux.fxValueDetailsFee = fxValueDetailsFeeAux;
        paymentDataAreaAux.counterValuePaymentAmount = counterValuePaymentAmountAux;
        paymentDataAreaAux.paymentAmount = paymentAmountAux;
        paymentDataAreaAux.destinationAddress = destinationAddressAux;
        paymentDataAreaAux.sourceAgent = sourceAgentAux;
        sourceAmlInformationAux.sourceAddress = sourceAddressAux;
        paymentDataAreaAux.sourceAmlInformation = sourceAmlInformationAux;        
        paymentDataAreaAux.sourceAccount = sourceAccountAux;
        paymentDataAreaAux.destinationAgent = destinationAgentAux;
        paymentDataAreaAux.destinationAccount = destinationAccountAux;
        paymentMetaData.PaymentDataArea = paymentDataAreaAux;
        return paymentMetaData;
    }

          /*----------------------------------------------------------------------------------
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Set metadata values according to WS_B2B_Orchestation & WS_TrackingPaymentOperation
    History:
    <Date>          <Author>            <Description>
    29/12/2020      Shahad Naji         Initial version
	30/12/2020			Andrea Martin		Initiates parameters
----------------------------------------------------------------------------------*/
    global static WRAPPER_PaymentMetaData setPaymentMetaData(String paymentId, Map<String, String> stepData, WRAPPER_AccountList.AccountDetails sourceAccount, WRAPPER_AccountList.AccountDetails destinationAccount, WRAPPER_B2B_Data.PaymentAmount amountData, String amountEnteredFrom){
        WRAPPER_PaymentMetaData paymentMetaData = new WRAPPER_PaymentMetaData();
        
        paymentMetaData.accessChannel = 'web'; //MANDATORY
        
        WRAPPER_PaymentMetaData.PaymentDataArea paymentDataArea_aux =  new WRAPPER_PaymentMetaData.PaymentDataArea();
        WRAPPER_PaymentMetaData.DestinationAddress destinationAddress_aux = new WRAPPER_PaymentMetaData.DestinationAddress();        
        WRAPPER_PaymentMetaData.DestinationAccount destinationAccount_aux = new WRAPPER_PaymentMetaData.DestinationAccount(); //MANDATORY
        WRAPPER_PaymentMetaData.DestinationAgent destinationAgent_aux = new WRAPPER_PaymentMetaData.DestinationAgent(); //MANDATORY
        WRAPPER_PaymentMetaData.SourceAccount sourceAccount_aux = new WRAPPER_PaymentMetaData.SourceAccount(); //MANDATORY
        WRAPPER_PaymentMetaData.SourceAmlInformation sourceAmlInformation_aux = new WRAPPER_PaymentMetaData.SourceAmlInformation();
        WRAPPER_PaymentMetaData.SourceAddress sourceAddress_aux = new  WRAPPER_PaymentMetaData.SourceAddress();
        WRAPPER_PaymentMetaData.SourceAgent sourceAgent_aux = new WRAPPER_PaymentMetaData.SourceAgent();
        WRAPPER_PaymentMetaData.PaymentAmount paymentAmount_aux = new WRAPPER_PaymentMetaData.PaymentAmount();
        WRAPPER_PaymentMetaData.CounterValuePaymentAmount counterValuePaymentAmount_aux = new WRAPPER_PaymentMetaData.CounterValuePaymentAmount();
        WRAPPER_PaymentMetaData.FxValueDetailsNominal fxValueDetailsNominal_aux = new WRAPPER_PaymentMetaData.FxValueDetailsNominal(); //--->exchangeRateServiceResponse
        WRAPPER_PaymentMetaData.FxCommercialMargin fxCommercialMargin_aux = new WRAPPER_PaymentMetaData.FxCommercialMargin();
        WRAPPER_PaymentMetaData.FxCounterpaymentAmount fxCounterpaymentAmount_aux = new WRAPPER_PaymentMetaData.FxCounterpaymentAmount();
        WRAPPER_PaymentMetaData.FxValueDetailsFee fxValueDetailsFee_aux =  new WRAPPER_PaymentMetaData.FxValueDetailsFee(); //--> transactionFeeServiceResponse
        //WRAPPER_PaymentMetaData.FxCommercialMargin fxCommercialMarginValuesDetailsFeed_aux = new WRAPPER_PaymentMetaData.FxCommercialMargin();
        
        if(String.isNotBlank(paymentId)){
            paymentDataArea_aux.idempotentReference = paymentId; //MANDATORY
        }
        
        paymentDataArea_aux.flowIndicator = 'S';
        paymentDataArea_aux.chargeBearer = 'OUR'; //Description of expenses  BEN,OUR,SHA. By default 'ORD'  ISO20022/Pain001. by Default "OUR"  
        paymentDataArea_aux.purposeCode = 'OTHR';
        
        
        if(destinationAccount != null && sourceAccount != null){
            if(String.isNotBlank(destinationAccount.subsidiaryName)){
                paymentDataArea_aux.destinationName = destinationAccount.subsidiaryName; //MANDATORY
            }
            if(String.isNotBlank(destinationAccount.idType)){
                destinationAccount_aux.accountIdType = destinationAccount.idType; //MANDATORY    
            }
            if(String.isNotBlank(destinationAccount.displayNumber)){
                destinationAccount_aux.accountId = destinationAccount.displayNumber; //MANDATORY    
            }
            if(String.isNotBlank(destinationAccount.codigoBic)){
                destinationAgent_aux.agent = destinationAccount.codigoBic; //MANDATORY   
            }
            if(String.isNotBlank(destinationAccount.bankName)){
                destinationAgent_aux.agentName = destinationAccount.bankName;
            }
            if(String.isNotBlank(destinationAccount.country)){
                paymentDataArea_aux.countryDestinationFunds = destinationAccount.country; 
            }
            
            
            if(destinationAccount.address != null){
                if(String.isNotBlank(destinationAccount.address.streetName)){
                    destinationAddress_aux.streetName = destinationAccount.address.streetName;
                }
                if(String.isNotBlank(destinationAccount.address.townName)){
                    destinationAddress_aux.townName = destinationAccount.address.townName;
                }
                if(String.isNotBlank(destinationAccount.address.country)){
                    destinationAddress_aux.country = destinationAccount.address.country;
                }
            }
            
            
            if(String.isNotBlank(sourceAccount.idType)){
                sourceAccount_aux.accountIdType = sourceAccount.idType; //MANDATORY 
            }
            if(String.isNotBlank(sourceAccount.displayNumber)){
                sourceAccount_aux.accountId = sourceAccount.displayNumber; //MANDATORY
            }
            if(String.isNotBlank(sourceAccount.subsidiaryName)){
                paymentDataArea_aux.sourceName = sourceAccount.subsidiaryName;
            }
            if(String.isNotBlank(sourceAccount.codigoBic)){
                sourceAgent_aux.agent = sourceAccount.codigoBic;
            }
            if(String.isNotBlank(sourceAccount.bankName)){
                sourceAgent_aux.agentName = sourceAccount.bankName;
            }
            
            
            if(sourceAccount.address != null){
                if(String.isNotBlank(sourceAccount.address.streetName)){
                    sourceAddress_aux.streetName = sourceAccount.address.streetName;
                }
                if(String.isNotBlank(sourceAccount.address.townName)){
                    sourceAddress_aux.townName = sourceAccount.address.townName; 
                }
                if(String.isNotBlank(sourceAccount.address.country)){
                    sourceAddress_aux.country = sourceAccount.address.country;
                }
            }
            
            
            if(String.isNotBlank(destinationAccount.currencyCodeAvailableBalance.trim()) && String.isNotBlank(sourceAccount.currencyCodeAvailableBalance.trim()) && amountData != null){
                if(destinationAccount.currencyCodeAvailableBalance.trim() == sourceAccount.currencyCodeAvailableBalance.trim()){
                    if(String.isNotBlank(sourceAccount.currencyCodeAvailableBalance.trim())){
                        paymentAmount_aux.tcurrency = sourceAccount.currencyCodeAvailableBalance.trim();
                    }
                    if(amountData.amountSend != null){
                        paymentAmount_aux.amount = amountData.amountSend;
                    }
                }else if((destinationAccount.currencyCodeAvailableBalance.trim() != sourceAccount.currencyCodeAvailableBalance.trim())){
                    if(String.isNotBlank(amountEnteredFrom)){
                        if(amountEnteredFrom == 'source'){
                            if(String.isNotBlank(sourceAccount.currencyCodeAvailableBalance.trim())){
                                counterValuePaymentAmount_aux.tcurrency = sourceAccount.currencyCodeAvailableBalance.trim();
                            }
                            if(amountData.amountSend != null){
                                counterValuePaymentAmount_aux.amount = amountData.amountSend;
                            }
                            if(String.isNotBlank(destinationAccount.currencyCodeAvailableBalance.trim())){
                                counterValuePaymentAmount_aux.tradeCurrency = destinationAccount.currencyCodeAvailableBalance.trim();
                            }
                        }else{
                            if(String.isNotBlank(destinationAccount.currencyCodeAvailableBalance.trim())){
                                paymentAmount_aux.tcurrency = destinationAccount.currencyCodeAvailableBalance.trim();
                            }
                            if(amountData.amountReceive != null){
                                paymentAmount_aux.amount = amountData.amountReceive;
                            }
                        }
                    }
                }
            }
            
            system.debug(destinationAccount);
            system.debug(sourceAccount);
            if(String.isNotBlank(destinationAccount.codigoCorporate) && String.isNotBlank(sourceAccount.codigoCorporate) && String.isNotBlank(destinationAccount.codigoCorporate.trim()) && String.isNotBlank(sourceAccount.codigoCorporate.trim())){
                if(destinationAccount.codigoCorporate.trim() == sourceAccount.codigoCorporate.trim()){
                    paymentDataArea_aux.customerIndicator = 'equal';
                }else{
                    paymentDataArea_aux.customerIndicator = 'different';
                }
            }
            
        }
        
        
        if(stepData != null && !stepData.isEmpty()){
            if(String.isNotBlank(stepData.get('reference'))){
                paymentDataArea_aux.endToEndIdentification = stepData.get('reference');
            }
            if(String.isNotBlank(stepData.get('description'))){
                paymentDataArea_aux.subject = stepData.get('description');  
            }
            
            
        }
        
        
        if(amountData != null){
            if(amountData.exchangeRateServiceResponse != null){
                if(amountData.exchangeRateServiceResponse.fxExchangeResponse !=null){
                    if(String.isNotBlank(amountData.exchangeRateServiceResponse.fxExchangeResponse.fxCountervalueId)){
                        fxValueDetailsNominal_aux.fxCountervalueId = amountData.exchangeRateServiceResponse.fxExchangeResponse.fxCountervalueId;
                        fxValueDetailsFee_aux.fxCountervalueId = amountData.exchangeRateServiceResponse.fxExchangeResponse.fxCountervalueId; //PREGUNTAR SI ES EL ID PUEDE SER LE MISMO EN AMBOS OBJETOS
                    }
                    if(amountData.exchangeRateServiceResponse.fxExchangeResponse.fxComercialMargin != null){
                        if(amountData.exchangeRateServiceResponse.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount != null){
                            fxCommercialMargin_aux.fxCommercialMarginAmount = amountData.exchangeRateServiceResponse.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount;
                        }
                        if(String.isNotBlank(amountData.exchangeRateServiceResponse.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency)){
                            fxCommercialMargin_aux.fxCommercialMarginCurrency = amountData.exchangeRateServiceResponse.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency;
                        }
                    }
                    if (amountData.exchangeRateServiceResponse.fxExchangeResponse.ccyCountervalue != null){
                        if(amountData.exchangeRateServiceResponse.fxExchangeResponse.ccyCountervalue.ccyCountervalueAmount != null){
                            fxCounterpaymentAmount_aux.amount = Double.valueOf(amountData.exchangeRateServiceResponse.fxExchangeResponse.ccyCountervalue.ccyCountervalueAmount);
                        }
                        if(String.isNotBlank(amountData.exchangeRateServiceResponse.fxExchangeResponse.ccyCountervalue.ccyCountervalueCurrency)){
                            fxCounterpaymentAmount_aux.tcurrency = amountData.exchangeRateServiceResponse.fxExchangeResponse.ccyCountervalue.ccyCountervalueCurrency;
                        }
                    }
                    if (String.isNotBlank(amountData.exchangeRateServiceResponse.fxExchangeResponse.valueDateEfx)){
                        fxValueDetailsNominal_aux.fxExecutionDate = Date.valueOf(amountData.exchangeRateServiceResponse.fxExchangeResponse.valueDateEfx);
                        fxValueDetailsNominal_aux.fxValueDate = Date.valueOf(amountData.exchangeRateServiceResponse.fxExchangeResponse.valueDateEfx);
                    }
                    if (amountData.exchangeRateServiceResponse.fxExchangeResponse.customerExchangeRate != null){
                        fxValueDetailsNominal_aux.fxExchangeRate = amountData.exchangeRateServiceResponse.fxExchangeResponse.customerExchangeRate;
                    }
                }
            }
           /* if(amountData.transactionFeeServiceResponse != null){
                if(amountData.transactionFeeServiceResponse.currencyList != null){
                    if(amountData.transactionFeeServiceResponse.currencyList. != null){
                        
                    }  
                }
            }*/
        }
        
        //fxValueDetailsFee_aux.fxCommercialMargin = fxCommercialMarginValuesDetailsFeed_aux;
        fxValueDetailsNominal_aux.fxCounterpaymentAmount = fxCounterpaymentAmount_aux;
        fxValueDetailsNominal_aux.fxCommercialMargin = fxCommercialMargin_aux;
        paymentDataArea_aux.fxValueDetailsNominal = fxValueDetailsNominal_aux;
        paymentDataArea_aux.fxValueDetailsFee = fxValueDetailsFee_aux;
        paymentDataArea_aux.counterValuePaymentAmount = counterValuePaymentAmount_aux;
        paymentDataArea_aux.paymentAmount = paymentAmount_aux;
        paymentDataArea_aux.destinationAddress = destinationAddress_aux;
        paymentDataArea_aux.sourceAgent = sourceAgent_aux;
        sourceAmlInformation_aux.sourceAddress = sourceAddress_aux;
        paymentDataArea_aux.sourceAmlInformation = sourceAmlInformation_aux;        
        paymentDataArea_aux.sourceAccount = sourceAccount_aux;
        paymentDataArea_aux.destinationAgent = destinationAgent_aux;
        paymentDataArea_aux.destinationAccount = destinationAccount_aux;
        
        paymentMetaData.PaymentDataArea = paymentDataArea_aux;
        return paymentMetaData;
    }
}