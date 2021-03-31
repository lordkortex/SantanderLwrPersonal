/*
Author:         Shahad Naji
Company:        Deloitte
Description:   	
Test Class:     ServiceFraud_Test
History:
<Date>			<Author>		<Description>
29/12/2020		Shahad Naji     Initial version
01/02/2021      Candido         Refactor with WRAPPER_PAY_PaymentDraft
*/
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
    global static WS_Fraud.OUTPUT executeFraud (Map<String, String> navigatorInfo, WRAPPER_PAY_PaymentDraft paymentDraft, String callType) {
        WS_Fraud.OUTPUT output = new WS_Fraud.OUTPUT();
        try {
            String fraudId = null;
            String referenceId = paymentDraft.paymentId;
            String operationType = '100';
            String operationSubtype = '101';
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
    
    
    //FRAUD CALL WITH THE PAYMENT DETAIL AS INPUT   
    global static WS_Fraud.OUTPUT executeFraud (Map<String, String> navigatorInfo, WRAPPER_PaymentDetail.OperationDetail paymentDetail, String callType) {
        try{
            
            //Map the Payment detail with the paymentDraft
            WRAPPER_PAY_PaymentDraft paymentDraft = new WRAPPER_PAY_PaymentDraft();
            
            paymentDraft.paymentId = paymentDetail.paymentId;
            paymentDraft.reference = paymentDetail.subject;
            paymentDraft.description = paymentDetail.operationDescription;
            
            WRAPPER_AccountList.AccountDetails sourceAccount = new WRAPPER_AccountList.AccountDetails();
            sourceAccount.country = paymentDetail.sourcedata.country;
            sourceAccount.codigoBic = paymentDetail.sourcedata.sourceAgent.agentId;
            sourceAccount.subsidiaryName = paymentDetail.sourcedata.name;
            sourceAccount.idType = paymentDetail.sourcedata.sourceAccount.accountType;
            sourceAccount.displayNumber = paymentDetail.sourcedata.sourceAccount.accountId;
            sourceAccount.bankName = paymentDetail.sourcedata.sourceAgent.name;
            
            sourceAccount.address = new WRAPPER_AccountList.Address();
            sourceAccount.address.streetName = paymentDetail.sourcedata.sourceAddress.streetName;
            sourceAccount.address.country = paymentDetail.sourcedata.sourceAddress.country;
            sourceAccount.address.townName = paymentDetail.sourcedata.sourceAddress.townName;

            sourceaccount.companyIdsList = new Map<String, String>();
            sourceaccount.companyIdsList.put('API', paymentDetail.sourceData.customerId);
            sourceaccount.companyIdsList.put('GTS', paymentDetail.sourceData.companyGlobalId);
            
            sourceAccount.currencyCodeAvailableBalance = paymentDetail.sourcedata.sourceAccount.tcurrency;
            sourceAccount.codigoCorporate = paymentDetail.sourceData.customerId;
            
            paymentDraft.sourceAccount = sourceAccount;
            
            WRAPPER_AccountList.AccountDetails destinationAccount = new WRAPPER_AccountList.AccountDetails();
            destinationAccount.country = paymentDetail.destinationData.country;
            destinationAccount.codigoBic = paymentDetail.destinationData.destinationAgent.agentId;
            destinationAccount.subsidiaryName = paymentDetail.destinationData.name;
            destinationAccount.idType = paymentDetail.destinationData.destinationAccount.accountType;
            destinationAccount.displayNumber = paymentDetail.destinationData.destinationAccount.accountId;
            destinationAccount.bankName = paymentDetail.destinationData.destinationAgent.name;
            
            destinationAccount.address = new WRAPPER_AccountList.Address();
            destinationAccount.address.streetName = paymentDetail.destinationData.destinationAddress.streetName;
            destinationAccount.address.country = paymentDetail.destinationData.destinationAddress.country;
            destinationAccount.address.townName = paymentDetail.destinationData.destinationAddress.townName;

            destinationAccount.companyIdsList = new Map<String, String>();
            destinationAccount.companyIdsList.put('API', paymentDetail.destinationData.customerId);
            destinationAccount.companyIdsList.put('GTS', paymentDetail.destinationData.companyGlobalId);
            
            destinationAccount.currencyCodeAvailableBalance = paymentDetail.destinationData.destinationAccount.tcurrency;
            destinationAccount.codigoCorporate = paymentDetail.destinationData.customerId;
            
            paymentDraft.destinationAccount = destinationAccount;

            paymentDraft.amountSend = (paymentDetail.amountSend == null ? null : Decimal.valueOf(paymentDetail.amountSend));
            paymentDraft.amountSend = (paymentDetail.amountReceive == null ? null : Decimal.valueOf(paymentDetail.amountReceive));
            
            if(paymentDraft.amountSend != null) {
                paymentDraft.amountEnteredFrom = 'source';
            }else{
                paymentDraft.amountEnteredFrom = 'destination';
            }

            return ServiceFraud.executeFraud(navigatorInfo, paymentDraft, callType);
                
        } catch (Exception e) {
            System.debug('ControllerFraud.postFraud: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        
        return null;
    }
    
    
    
}