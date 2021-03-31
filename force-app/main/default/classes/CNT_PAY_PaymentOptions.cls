/*----------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Methods used for a payment selected either in the landing table or in payment detail
    History
    <Date>			<Author>		       <Description>
    08/09/2020      Bea Hill        Initial version
    
    ----------------------------------------------------------------------------------*/
public with sharing class CNT_PAY_PaymentOptions {
    public CNT_PAY_PaymentOptions() {

    }

    /*----------------------------------------------------------------------------------
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Gets the detail of a payment
    History
    <Date>			<Author>		       	<Description>
    23/07/2020      Guillermo Giral        	Initial version
    09/09/2020		Shahad Naji			   	Adds more parameters after validating data
    25/09/2020      Bea Hill               	Add productId, paymentMethod
    29/10/2020      Bea Hill               	Add status history 
    09/11/2020      Bea Hill               	paymentDetail.amount and paymentDetail.paymentCurrency are operationAmount if that is defined, else they are the result of the currency conversion.
	13/01/2021		Shahad Naji				Add operationAmountBaseCurrency 
	13/01/2021		M.A Hernandez			Add hasDocument and document
    ----------------------------------------------------------------------------------*/
    @AuraEnabled
    public static ReturnValue getPaymentDetail(String paymentId){     
     	WRAPPER_PaymentDetail.OperationDetail paymentDetail = new WRAPPER_PaymentDetail.OperationDetail();
        ReturnValue response = null;
        try {
            // Create a request and response object to handle the web service response
            Map<String, Object> value = new Map<String, Object>();
            WS_GetPaymentDetail wsObject = new WS_GetPaymentDetail(paymentId);
            WRAPPER_PaymentDetail output = wsObject.execute();
            
            System.debug(output);
            value.put('paymentDetailOutput', output);


            // Once the response has been recieved, transform it into the WRAPPER_PaymentList.WRAPPER_Payment object
            if(output != null){  
                WRAPPER_PaymentDetail.OperationDetail operationDetail = new WRAPPER_PaymentDetail.OperationDetail();
                operationDetail = output.operationResponse.operationDetail;                
                if(operationDetail != null){
                    paymentDetail.operationType = operationDetail.operationType != null ? operationDetail.operationType : ''; 
                    paymentDetail.productId = operationDetail.productId != null ? operationDetail.productId : '';
                    paymentDetail.operationDescription = operationDetail.operationDescription != null ? operationDetail.operationDescription : '';
                    if(operationDetail.paymentMethod != null){
                        paymentDetail.paymentMethod = operationDetail.paymentMethod;
                        if (operationDetail.paymentMethod == System.Label.CNF_payment_productId_001) { // FLOWERPOWER_PARCHE JHM PENDIENTE DE REVISAR 'book_to_book'
                            paymentDetail.parsedPaymentMethod = System.Label.BookTobook;
                        } else {
                            paymentDetail.parsedPaymentMethod = operationDetail.paymentMethod;
                        }
                    }else{
                        paymentDetail.paymentMethod = '';
                        paymentDetail.parsedPaymentMethod = '';
                    }
                    paymentDetail.serviceId = operationDetail.serviceId != null ? operationDetail.serviceId : '';
                    
                    
                   
                    if(operationDetail.operationStatus != null){
                        
                        paymentDetail.paymentStatus = operationDetail.operationStatus.status != null ? operationDetail.operationStatus.status : '';
                        paymentDetail.paymentReason = operationDetail.operationStatus.reason != null ? operationDetail.operationStatus.reason : '';
                        paymentDetail.parsedPaymentReason = operationDetail.operationStatus.reason != null ?  operationDetail.operationStatus.reason : '';//SNJ - Revisar
                        List<Payment_Status__mdt> paymentStatusList = [SELECT toLabel(PAY_PCK_Status__c) FROM Payment_Status__mdt WHERE PAY_TXT_StatusCode__c =: paymentDetail.paymentStatus LIMIT 1];
                        paymentDetail.parsedPaymentStatus = paymentStatusList.size() > 0 ? paymentStatusList[0].PAY_PCK_Status__c : '';
                        paymentDetail.statusUpdateDate = operationDetail.operationStatus.statusDate != null ? operationDetail.operationStatus.statusDate : '';
                        paymentDetail.statusUpdateUser = operationDetail.operationStatus.globalUserId != null ? operationDetail.operationStatus.globalUserId : '';
                        paymentDetail.trackingStep = CNT_Payments.getTrackingStep(paymentDetail.paymentStatus, paymentDetail.paymentReason);
                        // Payment_Step__mdt paymentTrackingStep = [SELECT PAY_PCK_TrackingStep__c FROM Payment_Step__mdt WHERE  PAY_PCK_Reason__c =: paymentDetail.paymentReason AND PAY_PCK_Status__c =: paymentDetail.paymentStatus LIMIT 1];
                        // if(paymentTrackingStep != null) {
                        //     paymentDetail.trackingStep = paymentTrackingStep.PAY_PCK_TrackingStep__c;
                        // }
                    }

                    if(operationDetail.operationStatusesHistorical != null){
                        if(operationDetail.operationStatusesHistorical.size() > 0){
                            List<String> userIdList = new List<String>();
                            for(WRAPPER_PaymentDetail.OperationStatusHistory statusListItem : operationDetail.operationStatusesHistorical){
                                String userId = statusListItem.globalUserId;
                                if (userId != null) {
                                    if(userIdList != null) {
                                        if(!userIdList.contains(userId)) {
                                            userIdList.add(userId);
                                        }
                                    } else {
                                        userIdList.add(userId);
                                    }
                                }  
                            }

                            Map<String, String> userMap = CNT_Payments.getUserMap(userIdList);
                            List<WRAPPER_PaymentDetail.OperationStatusHistory> statusList = new List<WRAPPER_PaymentDetail.OperationStatusHistory>();

                            for(WRAPPER_PaymentDetail.OperationStatusHistory statusListItem : operationDetail.operationStatusesHistorical){
                                WRAPPER_PaymentDetail.OperationStatusHistory itemToAdd = new WRAPPER_PaymentDetail.OperationStatusHistory(); 
                                if(statusListItem.status != null){
                                    itemToAdd.status = statusListItem.status;
                                    if(statusListItem.reason != null){
                                        if(statusListItem.status == '001' && statusListItem.reason == '000'){
                                            if(statusListItem.statusDate != null){
                                            paymentDetail.draftDate = statusListItem.statusDate;
                                            }
                                        }
                                    }
                                    
                                }
                                if(statusListItem.reason != null){
                                    itemToAdd.reason = statusListItem.reason;
                                }
                                if(statusListItem.statusDate != null){
                                    String statusDateTime = statusListItem.statusDate;
                                    itemToAdd.statusDate = statusDateTime;
                                    // DateTime parsedDateTime = DateTime_Utilities.stringToDateTimeStep(statusListItem.statusDate, 0);
                                    // if (parsedDateTime != null) {
                                    //     String dateTimeString = String.valueOf(parsedDateTime);
                                    //     itemToAdd.parsedDateTime = dateTimeString;
                                    //     System.debug('dateTimeString: ' + dateTimeString);
                                    //     List<String> splitDateTime = dateTimeString.split(' ');
                                    //     System.debug('splitDateTime: ' + splitDateTime);
                                    //     itemToAdd.parsedDate = splitDateTime[0];
                                    //     String parsedTime = splitDateTime[1];
                                    //     itemToAdd.parsedTime = parsedTime.substring(0, 5);
                                    //     System.debug('HH:MM time: ' + splitDateTime);
                                    // }
                                    // List<String> splitDateTime = statusDateTime.split('T');
                                    // itemToAdd.parsedDate = splitDateTime[0];
                                    // itemToAdd.parsedTime = splitDateTime[1].substring(0,5);

                                }
                                if(statusListItem.globalUserId != null){
                                    itemToAdd.globalUserId = statusListItem.globalUserId;
                                    String userName = userMap.get(itemToAdd.globalUserId);
                                    if(userName != null) {
                                        System.debug('CNT_PAY_PaymentOptions userName: ' + userMap);
                                        itemToAdd.userName = userName;
                                    }
                                }
                                statusList.add(itemToAdd);
                            }
                            paymentDetail.operationStatusesHistorical = statusList;
                        }
                    }
                    
                    //send to review or reject
                    if(operationDetail.reviewAdditionalData != null){
                        paymentDetail.reviewAdditionalData = new WRAPPER_PaymentDetail.ReviewAdditionalData();
                        if(operationDetail.reviewAdditionalData.subject != null){
                            paymentDetail.reviewAdditionalData.subject = operationDetail.reviewAdditionalData.subject;
                        }
                        if(operationDetail.reviewAdditionalData.description != null){
                            paymentDetail.reviewAdditionalData.description = operationDetail.reviewAdditionalData.description;
                        }
                    }

                     //reject
                     if(operationDetail.rejectAdditionalData != null){
                        paymentDetail.rejectAdditionalData = new WRAPPER_PaymentDetail.RejectAdditionalData();
                        if(operationDetail.rejectAdditionalData.subject != null){
                            paymentDetail.rejectAdditionalData.subject = operationDetail.rejectAdditionalData.subject;
                        }
                        if(operationDetail.rejectAdditionalData.description != null){
                            paymentDetail.rejectAdditionalData.description = operationDetail.rejectAdditionalData.description;
                        }
                    }
                    
                    if(operationDetail.sourceData != null){
                        paymentDetail.sourceData =  new  WRAPPER_PaymentDetail.SourceData();
                        
                        paymentDetail.sourceData.name = operationDetail.sourceData.name != null ? operationDetail.sourceData.name : '';
                        paymentDetail.sourceAlias = operationDetail.sourceData.name != null ? operationDetail.sourceData.name : '';
                        paymentDetail.sourceAccountHolder = operationDetail.sourceData.name != null ? operationDetail.sourceData.name : '';
                        paymentDetail.sourceData.country = operationDetail.sourceData.country != null ?  operationDetail.sourceData.country : '';
                        paymentDetail.sourceCountry = operationDetail.sourceData.country != null ? operationDetail.sourceData.country : '';
                        paymentDetail.parsedSourceCountry = operationDetail.sourceData.country != null ? Global_Utilities.getCountryName(paymentDetail.sourceCountry) : '';
                        paymentDetail.sourceData.customerId = operationDetail.sourceData.customerId != null ? operationDetail.sourceData.customerId : '';
                        paymentDetail.sourceData.companyGlobalId = operationDetail.sourceData.companyGlobalId != null ? operationDetail.sourceData.companyGlobalId : '';
                        
                        if(operationDetail.sourceData.sourceAddress != null){
                            paymentDetail.sourceData.sourceAddress = new WRAPPER_PaymentDetail.SourceAddress();                            
                            
                            if(operationDetail.sourceData.sourceAddress.streetName != null){
                                paymentDetail.sourceData.sourceAddress.streetName =  operationDetail.sourceData.sourceAddress.streetName;
                            }
                            if(operationDetail.sourceData.sourceAddress.townName != null){
                                paymentDetail.sourceData.sourceAddress.townName = operationDetail.sourceData.sourceAddress.townName;
                            }
                            if(operationDetail.sourceData.sourceAddress.country != null){
                                paymentDetail.sourceData.sourceAddress.country = operationDetail.sourceData.sourceAddress.country;
                            }
                        }
                        
                        
                        if(operationDetail.sourceData.sourceAccount != null){
                            paymentDetail.sourceData.sourceAccount = new WRAPPER_PaymentDetail.SourceAccount();                            
                            
                            if(operationDetail.sourceData.sourceAccount.accountType != null){
                                paymentDetail.sourceData.sourceAccount.accountType =  operationDetail.sourceData.sourceAccount.accountType;
                            }
                            if(operationDetail.sourceData.sourceAccount.accountId != null){
                                paymentDetail.sourceData.sourceAccount.accountId = operationDetail.sourceData.sourceAccount.accountId;
                            }
                            if(operationDetail.sourceData.sourceAccount.tcurrency != null){
                                paymentDetail.sourceData.sourceAccount.tcurrency = operationDetail.sourceData.sourceAccount.tcurrency;
                            }
                            paymentDetail.sourceAccount = operationDetail.sourceData.sourceAccount.accountId != null ? operationDetail.sourceData.sourceAccount.accountId : '';
                            paymentDetail.sourceAccountIdType = operationDetail.sourceData.sourceAccount.accountType != null ? operationDetail.sourceData.sourceAccount.accountType : '';
                            paymentDetail.sourceCurrency = operationDetail.sourceData.sourceAccount.tcurrency != null ? operationDetail.sourceData.sourceAccount.tcurrency : '';
                        }
                        if(operationDetail.sourceData.sourceAgent != null){
                            paymentDetail.sourceData.sourceAgent =  new WRAPPER_PaymentDetail.SourceAgent();
                            if(operationDetail.sourceData.sourceAgent.agentId != null){
                                paymentDetail.sourceData.sourceAgent.agentId = operationDetail.sourceData.sourceAgent.agentId;
                            }
                            if(operationDetail.sourceData.sourceAgent.name != null){
                                paymentDetail.sourceData.sourceAgent.name = operationDetail.sourceData.sourceAgent.name;
                            }
                            if(operationDetail.sourceData.sourceAgent.address != null){
                                paymentDetail.sourceData.sourceAgent.address = operationDetail.sourceData.sourceAgent.address;
                            }
                            paymentDetail.sourceSwiftCode = operationDetail.sourceData.sourceAgent.agentId != null ? operationDetail.sourceData.sourceAgent.agentId : '';
                            paymentDetail.sourceBank = operationDetail.sourceData.sourceAgent.name != null ? operationDetail.sourceData.sourceAgent.name : '';
                        }
                       
                    }
                    /* CUENTA DE COMISIONES */
                    
                    if(operationDetail.sourceFeeData != null){
                        paymentDetail.sourceFeeData =  new  WRAPPER_PaymentDetail.SourceData();
                        
                        paymentDetail.sourceFeeData.name = operationDetail.sourceFeeData.name != null ? operationDetail.sourceFeeData.name : '';
                        paymentDetail.sourceFeeData.country = operationDetail.sourceFeeData.country != null ?  operationDetail.sourceFeeData.country : '';
                        paymentDetail.sourceFeeData.parsedCountry = operationDetail.sourceFeeData.country != null ? Global_Utilities.getCountryName(paymentDetail.sourceFeeData.country) : '';
                        
                        if(operationDetail.sourceFeeData.sourceAccount != null){
                            paymentDetail.sourceFeeData.sourceAccount = new WRAPPER_PaymentDetail.SourceAccount();                            
                            paymentDetail.sourceFeeData.sourceAccount.accountType =  operationDetail.sourceFeeData.sourceAccount.accountType != null ? operationDetail.sourceFeeData.sourceAccount.accountType : '';
                            paymentDetail.sourceFeeData.sourceAccount.accountId =  operationDetail.sourceFeeData.sourceAccount.accountId != null ? operationDetail.sourceFeeData.sourceAccount.accountId : '';
                            paymentDetail.sourceFeeData.sourceAccount.tcurrency =  operationDetail.sourceFeeData.sourceAccount.tcurrency != null ? operationDetail.sourceFeeData.sourceAccount.tcurrency : '';
                        }
                        if(operationDetail.sourceFeeData.sourceAgent != null){
                            paymentDetail.sourceFeeData.sourceAgent =  new WRAPPER_PaymentDetail.SourceAgent();
                            paymentDetail.sourceFeeData.sourceAgent.agentId =  operationDetail.sourceFeeData.sourceAgent.agentId != null ? operationDetail.sourceFeeData.sourceAgent.agentId : '';
                            paymentDetail.sourceFeeData.sourceAgent.name =  operationDetail.sourceFeeData.sourceAgent.name != null ? operationDetail.sourceFeeData.sourceAgent.name : '';
                            paymentDetail.sourceFeeData.sourceAgent.address =  operationDetail.sourceFeeData.sourceAgent.address != null ? operationDetail.sourceFeeData.sourceAgent.address : '';
                        }
                    }
                    
                    if(operationDetail.destinationData != null){
                        paymentDetail.destinationData = new  WRAPPER_PaymentDetail.destinationData();
                        paymentDetail.destinationData.name = operationDetail.destinationData.name != null ? operationDetail.destinationData.name : '';
                        paymentDetail.beneficiaryAlias = operationDetail.destinationData.name != null ? operationDetail.destinationData.name : '';
                        paymentDetail.beneficiaryAccountHolder = operationDetail.destinationData.name != null ? operationDetail.destinationData.name : '';
                        paymentDetail.destinationData.customerId = operationDetail.destinationData.customerId != null ? operationDetail.destinationData.customerId : '';
                        paymentDetail.destinationData.companyGlobalId = operationDetail.destinationData.companyGlobalId != null ? operationDetail.destinationData.companyGlobalId : '';

                        if(operationDetail.destinationData.destinationAccount != null){
                            
                            paymentDetail.destinationData.destinationAccount =  new WRAPPER_PaymentDetail.SourceAccount();
                            
                            if(operationDetail.destinationData.destinationAccount.accountType != null){
                                paymentDetail.destinationData.destinationAccount.accountType = operationDetail.destinationData.destinationAccount.accountType;
                            }
                            if(operationDetail.destinationData.destinationAccount.accountId != null){
                                paymentDetail.destinationData.destinationAccount.accountId  = operationDetail.destinationData.destinationAccount.accountId;
                            }
                            if(operationDetail.destinationData.destinationAccount.tcurrency != null){
                                paymentDetail.destinationData.destinationAccount.tcurrency  = operationDetail.destinationData.destinationAccount.tcurrency;
                            }
                            
                            if(operationDetail.destinationData.destinationAddress != null){
                            paymentDetail.destinationData.destinationAddress = new WRAPPER_PaymentDetail.SourceAddress();                            
                            
                            if(operationDetail.destinationData.destinationAddress.streetName != null){
                                paymentDetail.destinationData.destinationAddress.streetName =  operationDetail.destinationData.destinationAddress.streetName;
                            }
                            if(operationDetail.destinationData.destinationAddress.townName != null){
                                paymentDetail.destinationData.destinationAddress.townName = operationDetail.destinationData.destinationAddress.townName;
                            }
                            if(operationDetail.destinationData.destinationAddress.country != null){
                                paymentDetail.destinationData.destinationAddress.country = operationDetail.destinationData.destinationAddress.country;
                            }                              
                                //creditorDocument
                             if(operationDetail.destinationData.creditorDocument !=null){
                                if(String.isNotBlank(operationDetail.destinationData.creditorDocument.documentType) && String.isNotBlank(operationDetail.destinationData.creditorDocument.documentNumber)){
                                        WRAPPER_PaymentDetail.CreditorDocument creditorDocument = new WRAPPER_PaymentDetail.CreditorDocument();
                                        creditorDocument.documentType = operationDetail.destinationData.creditorDocument.documentType;
                                        creditorDocument.documentNumber = operationDetail.destinationData.creditorDocument.documentNumber;
                                        paymentDetail.destinationData.creditorDocument = creditorDocument;
                                    }
                                }
                                
                        }
                        
                            
                            paymentDetail.beneficiaryAccount = operationDetail.destinationData.destinationAccount.accountId != null ? operationDetail.destinationData.destinationAccount.accountId : '';
                            paymentDetail.beneficiaryCurrency = operationDetail.destinationData.destinationAccount.tcurrency != null ? operationDetail.destinationData.destinationAccount.tcurrency : '';
                            paymentDetail.beneficiaryAccountIdType = operationDetail.destinationData.destinationAccount.accountType != null ? operationDetail.destinationData.destinationAccount.accountType : '';
                        }
                        if(operationDetail.destinationData.destinationAgent != null){
                            paymentDetail.destinationData.destinationAgent = new WRAPPER_PaymentDetail.SourceAgent();
                            if(operationDetail.destinationData.destinationAgent.agentId != null){
                                paymentDetail.destinationData.destinationAgent.agentId = operationDetail.destinationData.destinationAgent.agentId;
                            }
                            if(operationDetail.destinationData.destinationAgent.name != null){
                                paymentDetail.destinationData.destinationAgent.name = operationDetail.destinationData.destinationAgent.name;                                
                            }
                            if(operationDetail.destinationData.destinationAgent.address != null){
                                paymentDetail.destinationData.destinationAgent.address = operationDetail.destinationData.destinationAgent.address;
                            }
                            paymentDetail.beneficiaryBank = operationDetail.destinationData.destinationAgent.name != null ? operationDetail.destinationData.destinationAgent.name : '';
                            paymentDetail.beneficiarySwiftCode = operationDetail.destinationData.destinationAgent.agentId != null ? operationDetail.destinationData.destinationAgent.agentId : '';
                        }
                        
                        paymentDetail.destinationData.country = operationDetail.destinationData.country != null ? operationDetail.destinationData.country: '';
                        paymentDetail.destinationCountry = operationDetail.destinationData.country != null ? operationDetail.destinationData.country : '';
                        paymentDetail.parsedDestinationCountry = operationDetail.destinationData.country != null ? Global_Utilities.getCountryName(paymentDetail.destinationCountry) : '';
                    }
                    if(operationDetail.operationStep1Data != null){
                       	paymentDetail.operationStep1Data =  new WRAPPER_PaymentDetail.OperationStep1Data();
                        if(operationDetail.operationStep1Data.opStep1Id != null){
                            paymentDetail.operationStep1Data.opStep1Id = operationDetail.operationStep1Data.opStep1Id;
                        }
                        if(operationDetail.operationStep1Data.status != null){
                            paymentDetail.operationStep1Data.status = operationDetail.operationStep1Data.status;
                        }
                        if(operationDetail.operationStep1Data.valueDate != null){
                            paymentDetail.operationStep1Data.valueDate = operationDetail.operationStep1Data.valueDate;
                        }
                        if(operationDetail.operationStep1Data.flowIndicator != null){
                            paymentDetail.operationStep1Data.flowIndicator = operationDetail.operationStep1Data.flowIndicator;
                        }
                        if(operationDetail.operationStep1Data.intermediateAgentAccount != null){
                            paymentDetail.operationStep1Data.intermediateAgentAccount = new WRAPPER_PaymentDetail.IntermediateAgentAccount();
                            if(operationDetail.operationStep1Data.intermediateAgentAccount.accountType != null){
                                paymentDetail.operationStep1Data.intermediateAgentAccount.accountType = operationDetail.operationStep1Data.intermediateAgentAccount.accountType;
                            }
                            if(operationDetail.operationStep1Data.intermediateAgentAccount.accountId != null){
                                paymentDetail.operationStep1Data.intermediateAgentAccount.accountId = operationDetail.operationStep1Data.intermediateAgentAccount.accountId;
                            }
                        }
                    }
                    if(operationDetail.operationStep2Data != null){
                        paymentDetail.operationStep2Data =  new WRAPPER_PaymentDetail.OperationStep2Data();
                        if(operationDetail.operationStep2Data.opStep2Id != null){
                            paymentDetail.operationStep2Data.opStep2Id  = operationDetail.operationStep2Data.opStep2Id;
                        }
                        if(operationDetail.operationStep2Data.status != null){
                            paymentDetail.operationStep2Data.status = operationDetail.operationStep2Data.status;
                        }
                        if(operationDetail.operationStep2Data.valueDate != null){
                            paymentDetail.operationStep2Data.valueDate = operationDetail.operationStep2Data.valueDate;
                        }
                        if(operationDetail.operationStep2Data.flowIndicator != null){
                            paymentDetail.operationStep2Data.flowIndicator = operationDetail.operationStep2Data.flowIndicator;
                        }
                        if(operationDetail.operationStep2Data.intermediateAgentAccount != null){
                            paymentDetail.operationStep2Data.intermediateAgentAccount = new WRAPPER_PaymentDetail.IntermediateAgentAccount();
                            if(operationDetail.operationStep2Data.intermediateAgentAccount.accountType != null){
                                paymentDetail.operationStep2Data.intermediateAgentAccount.accountType = operationDetail.operationStep2Data.intermediateAgentAccount.accountType;
                            }
                            if(operationDetail.operationStep2Data.intermediateAgentAccount.accountId != null){
                                paymentDetail.operationStep2Data.intermediateAgentAccount.accountId = operationDetail.operationStep2Data.intermediateAgentAccount.accountId;
                            }
                        }
                    }
                    if(operationDetail.issueDate != null){
                        paymentDetail.issueDate = operationDetail.issueDate;
                        paymentDetail.valueDate = Date.valueOf(operationDetail.issueDate);
                    }
                    if(operationDetail.chargeBearer != null){
                        paymentDetail.chargeBearer = operationDetail.chargeBearer;
                    }

                    //Amount in currency of the recipient account
                    if(operationDetail.operationAmount != null){
                        paymentDetail.operationAmount =  new WRAPPER_PaymentDetail.OperationAmount();
                        if(operationDetail.operationAmount.tcurrency != null){
                            paymentDetail.operationAmount.tcurrency = operationDetail.operationAmount.tcurrency;
                        }
                        if(operationDetail.operationAmount.amount != null){
                            paymentDetail.operationAmount.amount = operationDetail.operationAmount.amount;
                        }
                        if(operationDetail.operationAmount.amount != null && operationDetail.operationAmount.tcurrency != null){
                            paymentDetail.amount = operationDetail.operationAmount.amount;
                            paymentDetail.paymentCurrency = operationDetail.operationAmount.tcurrency;
                        } 
                    }

                    //Amount in currency of the source account
                    if(operationDetail.counterValueOperationAmount != null){
                        paymentDetail.counterValueOperationAmount =  new WRAPPER_PaymentDetail.CounterValueOperationAmount();
                        if(operationDetail.counterValueOperationAmount.tcurrency != null){
                            paymentDetail.counterValueOperationAmount.tcurrency = operationDetail.counterValueOperationAmount.tcurrency;
                        }
                        if(operationDetail.counterValueOperationAmount.amount != null){
                            paymentDetail.counterValueOperationAmount.amount = operationDetail.counterValueOperationAmount.amount;
                            paymentDetail.tradeAmount = operationDetail.CounterValueOperationAmount.amount;
                        }
                        if(operationDetail.counterValueOperationAmount.tradeCurrency != null){
                            paymentDetail.counterValueOperationAmount.tradeCurrency = operationDetail.counterValueOperationAmount.tradeCurrency;
                        }
                        
                    }
                    if(operationDetail.sourceTotalAmount != null){
                        paymentDetail.sourceTotalAmount =  new WRAPPER_PaymentDetail.OperationAmount();
                        if(operationDetail.sourceTotalAmount.tcurrency != null){
                            paymentDetail.sourceTotalAmount.tcurrency = operationDetail.sourceTotalAmount.tcurrency;
                        }
                        if(operationDetail.sourceTotalAmount.amount !=  null){
                            paymentDetail.sourceTotalAmount.amount = operationDetail.sourceTotalAmount.amount;
                        }
                    }
                    if(operationDetail.clientReference != null){
                        paymentDetail.clientReference = operationDetail.clientReference;
                    }
                    if(operationDetail.purpose != null){
                       paymentDetail.purpose = operationDetail.purpose; 
                        paymentDetail.parsedPurpose = operationDetail.purpose != '' ? CNT_Payments.getPaymentPurpose(operationDetail.purpose) : ''; //SNJ - Revisar
                    }
                    
                    if(operationDetail.subject != null){
                       paymentDetail.subject =  operationDetail.subject;
                    }
                    if(String.isNotBlank(operationDetail.commercialCode)){
                        paymentDetail.commercialCode =  operationDetail.commercialCode;
                        String aux = CNT_Payments.getComercialCodeRecord(operationDetail.commercialCode);
                        if(String.isNotBlank(aux)){
                            paymentDetail.parsedCommercialCode =  aux;
                        }else{
                            paymentDetail.parsedCommercialCode = '';
                        }
                    }
                    if(operationDetail.operationFraudDetails != null){
                        paymentDetail.operationFraudDetails = new WRAPPER_PaymentDetail.OperationFraudDetails();
                        if(operationDetail.operationFraudDetails.fraudValidationResult != null){
                            paymentDetail.operationFraudDetails.fraudValidationResult = operationDetail.operationFraudDetails.fraudValidationResult;
                        }
                        if(operationDetail.operationFraudDetails.fraudReference != null){
                            paymentDetail.operationFraudDetails.fraudReference = operationDetail.operationFraudDetails.fraudReference;
                        }
                    }
                    
                    if(operationDetail.operationNominalFxDetails != null){
                        paymentDetail.operationNominalFxDetails = new WRAPPER_PaymentDetail.OperationNominalFxDetails();
                        if(operationDetail.operationNominalFxDetails.fxCountervalueId != null){
                            paymentDetail.operationNominalFxDetails.fxCountervalueId = operationDetail.operationNominalFxDetails.fxCountervalueId;
                        }
                        if(operationDetail.operationNominalFxDetails.priceType != null){
                            paymentDetail.operationNominalFxDetails.priceType = operationDetail.operationNominalFxDetails.priceType;
                        }
                        if(operationDetail.operationNominalFxDetails.discount != null){
                            paymentDetail.operationNominalFxDetails.discount = operationDetail.operationNominalFxDetails.discount;
                        }
                        if(operationDetail.operationNominalFxDetails.ccyCountervalue != null){
                             paymentDetail.operationNominalFxDetails.ccyCountervalue = new WRAPPER_PaymentDetail.CcyCountervalue();
                            if(operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount != null){
                                paymentDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount = operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount;
                            }
                            if(operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency != null){
                                paymentDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency = operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency;
                            }
                            //If operationAmount not defined, get recipient amount from the nominal FX details
                            if(operationDetail.operationAmount == null || operationDetail.operationAmount.amount == null) {
                                if(operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency != null && operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount != null) {
                                    paymentDetail.amount = operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount;
                                    paymentDetail.paymentCurrency = paymentDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency; 
                                }
                            }
                        }
                        if(operationDetail.operationNominalFxDetails.valueDateEfx != null){
                            paymentDetail.operationNominalFxDetails.valueDateEfx = operationDetail.operationNominalFxDetails.valueDateEfx;
                        }
                        if(operationDetail.operationNominalFxDetails.customerExchangeRate != null){
                            paymentDetail.operationNominalFxDetails.customerExchangeRate = operationDetail.operationNominalFxDetails.customerExchangeRate;
                        }
                        if(operationDetail.operationNominalFxDetails.fxComercialMargin != null){
                            paymentDetail.operationNominalFxDetails.fxComercialMargin =  new WRAPPER_PaymentDetail.FxComercialMargin();
                            if(operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency != null){
                                paymentDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency = operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency;
                            }
                            if(operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount != null){
                                paymentDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount = operationDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount;
                            }
                        }
                        if(operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp != null){
                            paymentDetail.operationNominalFxDetails.nominalAmountNoMarkUp =  new WRAPPER_PaymentDetail.NominalAmountNoMarkUp();
                            if(operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.amount != null){
                                paymentDetail.operationNominalFxDetails.nominalAmountNoMarkUp.amount = operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.amount;
                            }
                            if(operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.tcurrency != null){
                                paymentDetail.operationNominalFxDetails.nominalAmountNoMarkUp.tcurrency = operationDetail.operationNominalFxDetails.nominalAmountNoMarkUp.tcurrency;
                            }
                        }
                    }
                    if(operationDetail.operationFeesFxDetails != null){
                        paymentDetail.operationFeesFxDetails = new WRAPPER_PaymentDetail.OperationFeesFxDetails();
                        if(operationDetail.operationFeesFxDetails.fxCountervalueId != null){
                            paymentDetail.operationFeesFxDetails.fxCountervalueId = operationDetail.operationFeesFxDetails.fxCountervalueId;
                        }
                        if(operationDetail.operationFeesFxDetails.priceType != null){
                            paymentDetail.operationFeesFxDetails.priceType = operationDetail.operationFeesFxDetails.priceType;
                        }
                        if(operationDetail.operationFeesFxDetails.discount != null){
                            paymentDetail.operationFeesFxDetails.discount = operationDetail.operationFeesFxDetails.discount;
                        }
                        if(operationDetail.operationFeesFxDetails.ccyCountervalue != null){
                            paymentDetail.operationFeesFxDetails.ccyCountervalue = new WRAPPER_PaymentDetail.CcyCountervalue();
                            if(operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueAmount != null){
                                paymentDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueAmount = operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueAmount;
                            }
                            if(operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueCurrency != null){
                                paymentDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueCurrency = operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueCurrency;
                            }
                        }
                        if(operationDetail.operationFeesFxDetails.valueDateEfx != null){
                            paymentDetail.operationFeesFxDetails.valueDateEfx = operationDetail.operationFeesFxDetails.valueDateEfx;
                        }
                        if(operationDetail.operationFeesFxDetails.customerExchangeRate != null){
                            paymentDetail.operationFeesFxDetails.customerExchangeRate = operationDetail.operationFeesFxDetails.customerExchangeRate;
                        }
                    }
                    if(operationDetail.operationNominalFxRollbackDetails != null){
                        paymentDetail.operationNominalFxRollbackDetails = new WRAPPER_PaymentDetail.OperationNominalFxRollbackDetails();
                        if(operationDetail.operationNominalFxRollbackDetails.fxCountervalueId != null){
                            paymentDetail.operationNominalFxRollbackDetails.fxCountervalueId = operationDetail.operationNominalFxRollbackDetails.fxCountervalueId;
                        }
                        if(operationDetail.operationNominalFxRollbackDetails.priceType != null){
                            paymentDetail.operationNominalFxRollbackDetails.priceType = operationDetail.operationNominalFxRollbackDetails.priceType;
                        }
                        if(operationDetail.operationNominalFxRollbackDetails.ccyCountervalue != null){
                            paymentDetail.operationNominalFxRollbackDetails.ccyCountervalue = new WRAPPER_PaymentDetail.CcyCountervalue();
                            if(operationDetail.operationNominalFxRollbackDetails.ccyCountervalue.ccyCountervalueAmount != null){
                                paymentDetail.operationNominalFxRollbackDetails.ccyCountervalue.ccyCountervalueAmount = operationDetail.operationNominalFxRollbackDetails.ccyCountervalue.ccyCountervalueAmount;
                            }
                            if(operationDetail.operationNominalFxRollbackDetails.ccyCountervalue.ccyCountervalueCurrency != null){
                                paymentDetail.operationNominalFxRollbackDetails.ccyCountervalue.ccyCountervalueCurrency = operationDetail.operationNominalFxRollbackDetails.ccyCountervalue.ccyCountervalueCurrency;
                            }
                        }
                        if(operationDetail.operationNominalFxRollbackDetails.valueDateEfx != null){
                            paymentDetail.operationNominalFxRollbackDetails.valueDateEfx = operationDetail.operationNominalFxRollbackDetails.valueDateEfx;
                        }
                        if(operationDetail.operationNominalFxRollbackDetails.customerExchangeRate != null){
                            paymentDetail.operationNominalFxRollbackDetails.customerExchangeRate = operationDetail.operationNominalFxRollbackDetails.customerExchangeRate;
                        }
                    }
                    if(operationDetail.pricingDetails != null){
                        paymentDetail.pricingDetails = new WRAPPER_PaymentDetail.PricingDetails();
                        if(operationDetail.pricingDetails.productName != null){
                            paymentDetail.pricingDetails.productName = operationDetail.pricingDetails.productName;
                        }
                        if(operationDetail.pricingDetails.totalPrice != null){
                            paymentDetail.pricingDetails.totalPrice = operationDetail.pricingDetails.totalPrice;
                        }
                        if(operationDetail.pricingDetails.tcurrency != null){
                            paymentDetail.pricingDetails.tcurrency = operationDetail.pricingDetails.tcurrency;
                        }
                        
                        if(operationDetail.pricingDetails.currencyList != null){
                            if(operationDetail.pricingDetails.currencyList.size() > 0){
                                
                                List<WRAPPER_PaymentDetail.CurrencyList> lst = new  List<WRAPPER_PaymentDetail.CurrencyList>();
                                
                                for(WRAPPER_PaymentDetail.CurrencyList reponseItem : operationDetail.pricingDetails.currencyList){
                                    
                                    WRAPPER_PaymentDetail.CurrencyList item = new WRAPPER_PaymentDetail.CurrencyList();
                                    
                                    if(reponseItem.tcurrency != null){
                                        item.tcurrency = reponseItem.tcurrency;
                                    }
                                    if(reponseItem.currencyName != null){
                                        item.currencyName = reponseItem.currencyName;
                                    }
                                    
                                    if(reponseItem.conceptsList != null){
                                        if(reponseItem.conceptsList.size() > 0){
                                            
                                            List<WRAPPER_PaymentDetail.ConceptsList> concepts = new  List<WRAPPER_PaymentDetail.ConceptsList>();
                                            
                                            for(WRAPPER_PaymentDetail.ConceptsList responseConcept : reponseItem.conceptsList){
                                                
                                               WRAPPER_PaymentDetail.ConceptsList concept = new  WRAPPER_PaymentDetail.ConceptsList();
                                                if(responseConcept.conceptId != null){
                                                    concept.conceptId = responseConcept.conceptId;
                                                }
                                                if(responseConcept.conceptName != null){
                                                    concept.conceptName = responseConcept.conceptName;
                                                }
                                                WRAPPER_PaymentDetail.SpecialPrice specialPrice= new WRAPPER_PaymentDetail.SpecialPrice();
                                                if(responseConcept.specialPrice != null){                                                    
                                                   
                                                    if(responseConcept.specialPrice.specialPriceLevel != null){
                                                        specialPrice.specialPriceLevel = responseConcept.specialPrice.specialPriceLevel;
                                                    }
                                                    if(responseConcept.specialPrice.specialTiersList != null && !responseConcept.specialPrice.specialTiersList.isEmpty()){
                                                        List<WRAPPER_PaymentDetail.SpecialTiersList> specialTiersList = new List<WRAPPER_PaymentDetail.SpecialTiersList>();
                                                        for(WRAPPER_PaymentDetail.SpecialTiersList specialTiersResponse : responseConcept.specialPrice.specialTiersList){
                                                            WRAPPER_PaymentDetail.SpecialTiersList specialTiersItem = new WRAPPER_PaymentDetail.SpecialTiersList();
                                                            if(specialTiersResponse.specialAmountTier != null){
                                                                specialTiersItem.specialAmountTier = specialTiersResponse.specialAmountTier;
                                                            }
                                                            if(specialTiersResponse.specialAmountTierType != null){
                                                                specialTiersItem.specialAmountTierType = specialTiersResponse.specialAmountTierType;
                                                            }
                                                            specialTiersItem.specialFixedRatePrice =  new WRAPPER_PaymentDetail.SpecialFixedRatePrice();
                                                            if(specialTiersResponse.specialFixedRatePrice != null){
                                                                if(specialTiersResponse.specialFixedRatePrice.specialRate != null){
                                                                    specialTiersItem.specialFixedRatePrice.specialRate = specialTiersResponse.specialFixedRatePrice.specialRate;
                                                                }
                                                                if(specialTiersResponse.specialFixedRatePrice.specialMinimumAmount != null){
                                                                     specialTiersItem.specialFixedRatePrice.specialMinimumAmount =  specialTiersResponse.specialFixedRatePrice.specialMinimumAmount;                                                                
                                                                }
                                                                if(specialTiersResponse.specialFixedRatePrice.specialMaximumAmount != null){
                                                                    specialTiersItem.specialFixedRatePrice.specialMaximumAmount = specialTiersResponse.specialFixedRatePrice.specialMaximumAmount;
                                                                }                                                                
                                                                if(specialTiersResponse.specialFixedRatePrice.tcurrency != null){
                                                                    specialTiersItem.specialFixedRatePrice.tcurrency = specialTiersResponse.specialFixedRatePrice.tcurrency;
                                                                }
                                                            }
                                                            specialTiersItem.specialFixedAmountPrice = new WRAPPER_PaymentDetail.SpecialFixedAmountPrice();
                                                            if(specialTiersResponse.specialFixedAmountPrice != null){
                                                                if(specialTiersResponse.specialFixedAmountPrice.specialFixedAmount != null){
                                                                     specialTiersItem.specialFixedAmountPrice.specialFixedAmount = specialTiersResponse.specialFixedAmountPrice.specialFixedAmount;
                                                                }
                                                                if(specialTiersResponse.specialFixedAmountPrice.tcurrency != null){
                                                                    specialTiersItem.specialFixedAmountPrice.tcurrency = specialTiersResponse.specialFixedAmountPrice.tcurrency;
                                                                }
                                                            }
                                                            
                                                            specialTiersList.add(specialTiersItem);
                                                        }
                                                        specialPrice.specialTiersList = specialTiersList;
                                                    }
                                                    concept.specialPrice = specialPrice;
                                                }
                                                WRAPPER_PaymentDetail.StandardPrice standardPrice = new WRAPPER_PaymentDetail.StandardPrice();
                                                if(responseConcept.standardPrice != null){
                                                    if(responseConcept.standardPrice.standardTiersList != null && !responseConcept.standardPrice.standardTiersList.isEmpty()){
                                                        List<WRAPPER_PaymentDetail.StandardTiersList> standardTiersList = new List<WRAPPER_PaymentDetail.StandardTiersList>();
                                                        for(WRAPPER_PaymentDetail.StandardTiersList standardTiersResponse: responseConcept.standardPrice.standardTiersList){
                                                            WRAPPER_PaymentDetail.StandardTiersList standardTiersItem = new WRAPPER_PaymentDetail.StandardTiersList();
                                                            if(standardTiersResponse.standardAmountTier != null){
                                                                standardTiersItem.standardAmountTier = standardTiersResponse.standardAmountTier;
                                                            }
                                                            if(standardTiersResponse.standardAmountTierType != null){
                                                                standardTiersItem.standardAmountTierType = standardTiersResponse.standardAmountTierType;
                                                            }
                                                            standardTiersItem.standardFixedRatePrice = new WRAPPER_PaymentDetail.StandardFixedRatePrice();
                                                            if(standardTiersResponse.standardFixedRatePrice != null){
                                                                if(standardTiersResponse.standardFixedRatePrice.standardRate != null){
                                                                    standardTiersItem.standardFixedRatePrice.standardRate = standardTiersResponse.standardFixedRatePrice.standardRate;
                                                                }
                                                                if(standardTiersResponse.standardFixedRatePrice.standardMinimumAmount != null){
                                                                    standardTiersItem.standardFixedRatePrice.standardMinimumAmount = standardTiersResponse.standardFixedRatePrice.standardMinimumAmount;
                                                                }
                                                                if(standardTiersResponse.standardFixedRatePrice.standardMaximumAmount != null){
                                                                    standardTiersItem.standardFixedRatePrice.standardMaximumAmount = standardTiersResponse.standardFixedRatePrice.standardMaximumAmount;
                                                                }
                                                                if(standardTiersResponse.standardFixedRatePrice.tcurrency != null){
                                                                    standardTiersItem.standardFixedRatePrice.tcurrency = standardTiersResponse.standardFixedRatePrice.tcurrency;
                                                                }
                                                            }
                                                            standardTiersItem.standardFixedAmountPrice = new WRAPPER_PaymentDetail.StandardFixedAmountPrice();
                                                            if(standardTiersResponse.standardFixedAmountPrice != null){
                                                                if(standardTiersResponse.standardFixedAmountPrice.standardFixedAmount != null){
                                                                    standardTiersItem.standardFixedAmountPrice.standardFixedAmount = standardTiersResponse.standardFixedAmountPrice.standardFixedAmount;
                                                                }
                                                                if(standardTiersResponse.standardFixedAmountPrice.tcurrency != null){
                                                                   standardTiersItem.standardFixedAmountPrice.tcurrency =  standardTiersResponse.standardFixedAmountPrice.tcurrency;
                                                                }
                                                            }
                                                            standardTiersList.add(standardTiersItem);
                                                        }
                                                        standardPrice.standardTiersList = standardTiersList;
                                                    }
                                                   concept.standardPrice = standardPrice;
                                                }
                                                WRAPPER_PaymentDetail.ConceptAmount conceptAmount = new WRAPPER_PaymentDetail.ConceptAmount(); 
                                                 if(responseConcept.conceptAmount != null){
                                                     if(responseConcept.conceptAmount.amount != null){
                                                         conceptAmount.amount = responseConcept.conceptAmount.amount;
                                                     }
                                                     if(responseConcept.conceptAmount.tcurrency != null){
                                                         conceptAmount.tcurrency = responseConcept.conceptAmount.tcurrency;
                                                     }
                                                     if(responseConcept.conceptAmount.fixing != null){
                                                         conceptAmount.fixing = responseConcept.conceptAmount.fixing;
                                                     }
                                                   concept.conceptAmount = conceptAmount;
                                                }
                                                concepts.add(concept);
                                            }
                                            item.conceptsList = concepts;
                                        }
                                    }  
                                  lst.add(item);  
                                }
                                paymentDetail.pricingDetails.currencyList = lst;
                            }
                        }
                    }
                    if (operationDetail.pricingDetails != null) {
                        if (operationDetail.pricingDetails.totalPrice != null) {
                            paymentDetail.fees = String.valueOf(operationDetail.pricingDetails.totalPrice);
                        }
                        if (operationDetail.pricingDetails.tcurrency != null) {
                            paymentDetail.feesCurrency = String.valueOf(operationDetail.pricingDetails.tcurrency);
                        }
                    } 
                    if (operationDetail.operationFeesFxDetails != null) {
                        if (operationDetail.operationFeesFxDetails.ccyCountervalue != null) {
                            if (operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueAmount != null) {
                                paymentDetail.fees = String.valueOf(operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueAmount);
                                if (operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueCurrency != null) {
                                    paymentDetail.feesCurrency = String.valueOf(operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueCurrency);
                                }
                            }
                        }
                    }
                    
                    paymentDetail.convertedAmount = '';
                    paymentDetail.convertedCurrency = '';
                    
                    if (operationDetail.operationNominalFxDetails != null) {
                        if (operationDetail.operationNominalFxDetails.ccyCountervalue != null) {
                            paymentDetail.convertedAmount = operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount != null ? String.valueOf(operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount) : '';
                            paymentDetail.convertedCurrency = operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency != null ? String.valueOf(operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency) : '';                            
                        }
                    }
                    
                    paymentDetail.userGlobalId = operationDetail.userGlobalId != null ? operationDetail.userGlobalId : '';
                    
                    // amountSend
                    if(operationDetail.counterValueOperationAmount != null){
                        if(operationDetail.counterValueOperationAmount.tcurrency != null && operationDetail.counterValueOperationAmount.amount != null){
                            paymentDetail.userDefinedAmount = 'source';
                            if (operationDetail.counterValueOperationAmount.tcurrency == paymentDetail.sourceCurrency){
                                paymentDetail.amountSend = String.valueOf(operationDetail.counterValueOperationAmount.amount);
                            }
                        }
                    }
 
                    // amountReceive
                    if(operationDetail.operationAmount != null){                        
                        if(operationDetail.operationAmount.tcurrency != null && operationDetail.operationAmount.amount != null){
                            paymentDetail.userDefinedAmount = 'recipient';	
                            if (operationDetail.operationAmount.tcurrency == paymentDetail.beneficiaryCurrency){
                                paymentDetail.amountReceive = String.valueOf(operationDetail.operationAmount.amount);
                            } 
                        }
                    }
                    
                  
 
                    // converted amount
                    if (String.isNotBlank(paymentDetail.convertedAmount) && String.isNotBlank(paymentDetail.convertedCurrency)) {
                        if (paymentDetail.userDefinedAmount == 'recipient') {
                            if (paymentDetail.convertedCurrency == paymentDetail.sourceCurrency) {
                                paymentDetail.amountSend = paymentDetail.convertedAmount;
                            }
                        } else if (paymentDetail.userDefinedAmount == 'source'){
                            if (paymentDetail.convertedCurrency == paymentDetail.beneficiaryCurrency) {
                                paymentDetail.amountReceive = paymentDetail.convertedAmount;
                            }
                        }
                    }
 
                    // addFees = if chargeBearer==OUR && cuenta de comisiones vacío && currency is that of the source account
                    if (paymentDetail.chargeBearer == 'OUR' && paymentDetail.sourceFeeData == null) {
                        paymentDetail.addFees = true;
                    } else {
                        paymentDetail.addFees = false;
                    }
                    
                    // totalAmount = amountSend + fees
                    paymentDetail.totalAmount = paymentDetail.amountSend;
                    if (paymentDetail.addFees == true) {
                        if(paymentDetail.feesCurrency == paymentDetail.sourceCurrency) {
                            if(paymentDetail.amountSend != null && paymentDetail.fees != null){
                                paymentDetail.totalAmount = String.valueOf(Decimal.valueOf(paymentDetail.amountSend) + Decimal.valueOf(paymentDetail.fees));
                            }
                        }
                    }
                  
                }
                
                paymentDetail.paymentId = paymentId;
                
                //MAHR 
                paymentDetail.hasDocument = false;
                paymentDetail.documents = new List<CNT_FilesUtilities.CustomContentVersion>();
                List<CNT_FilesUtilities.CustomContentVersion> listDocument = new List<CNT_FilesUtilities.CustomContentVersion>();
				listDocument = releatedFiles(paymentId);
                System.debug(listDocument);
                if(!listDocument.isEmpty()){
                    paymentDetail.hasDocument = true;
                    paymentDetail.documents = listDocument;
                }
                /*List<ContentVersion> cvs = new List<ContentVersion>([SELECT Id, Title, ContentDocumentId FROM ContentVersion LIMIT 3]);
                if(!cvs.isEmpty()){
                     paymentDetail.hasDocument = true;
                        Integer count = 1;
                        for(ContentVersion cv : cvs){
                            CNT_FilesUtilities.CustomContentVersion item = new CNT_FilesUtilities.CustomContentVersion(cv.title, cv.Id, count,cv.ContentDocumentId);
                            paymentDetail.documents.add(item);
                            count++;
                        }
                    }*/
                //paymentDetail.documents.addAll(listDocument);
                //paymentDetail.documents = listDocument;*/
                

                if(paymentDetail.amount != null ){
                    paymentDetail.totalAmount = String.valueOf(paymentDetail.amount);
                }
                if(paymentDetail.amount != null && paymentDetail.fees != null){
                    paymentDetail.totalAmount = String.valueOf(paymentDetail.amount + Decimal.valueOf(paymentDetail.fees));
                }
                if(String.isNotBlank(paymentDetail.convertedAmount)  ){
                    paymentDetail.totalAmount = String.valueOf(Decimal.valueOf(paymentDetail.convertedAmount));
                }
              
               if( String.isNotBlank(paymentDetail.convertedAmount) && paymentDetail.fees != null){
                    paymentDetail.totalAmount = String.valueOf(Decimal.valueOf(paymentDetail.convertedAmount) + Decimal.valueOf(paymentDetail.fees));
                }

                if(operationDetail.operationAmountBaseCurrency != null){
                    paymentDetail.OperationAmountBaseCurrency =  new WRAPPER_PaymentDetail.OperationAmountBaseCurrency();
                    if(operationDetail.operationAmountBaseCurrency.amount != null){
                        paymentDetail.OperationAmountBaseCurrency.amount = operationDetail.operationAmountBaseCurrency.amount;
                    }
                    if(String.isNotBlank(operationDetail.operationAmountBaseCurrency.tcurrency)){
                        paymentDetail.OperationAmountBaseCurrency.tcurrency = operationDetail.operationAmountBaseCurrency.tcurrency;
                    }
                }
                
            }
            
            value.put('paymentDetail', paymentDetail);

            System.debug('Payment Detail: ' + paymentDetail);

            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PAY_PaymentOptions.getPaymentDetail: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }

    /*------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:   	Get names of users for list of globalUserIds
    History 
    <Date>          <Author>            <Change Description>
    29/10/2019		Bea Hill       		Intial Version
    ------------------------------------------------------------*/
    @AuraEnabled
    public static Map<String, String> getUserMap(List<String> idList) {
        Map<String, String> userMap;
        try{
            if(idList != null && idList.size() > 0) {
                List<User> userList = [SELECT USER_TXT_GlobalId__c, Name FROM User WHERE USER_TXT_GlobalId__c IN :idList LIMIT 1];
                if (userList != null) {
                    System.debug('userList: ' + userList);
                    for(User user : userList) {
                        String userName = user.name;
                        String globalUserId = user.USER_TXT_GlobalId__c;
                        userMap.put(globalUserId, userName);
                    } 
                }  
            }
        } catch(Exception e){
            System.debug('CNT_PAY_PaymentOptions.getUserList: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return userMap;
        }       
        return userMap;
    }


    /*
    Author:         Andrea Martin
    Company:        Deloitte
    Description:    Gets the detail of a payment from the paymentDraft
    History:
    <Date>          <Author>                <Description>
    08/03/2021      Andrea Martin         Initial version
    */
    @AuraEnabled
    public static ReturnValue getPaymentDetailFromPaymentDraft(WRAPPER_PAY_PaymentDraft paymentDraft){  
        WRAPPER_PaymentDetail.OperationDetail paymentDetail = new WRAPPER_PaymentDetail.OperationDetail();
        WRAPPER_PaymentDetail.SourceData sourceData = new WRAPPER_PaymentDetail.SourceData();
        WRAPPER_PaymentDetail.SourceData sourceFeeData = new WRAPPER_PaymentDetail.SourceData();
        WRAPPER_PaymentDetail.DestinationData destinationData = new WRAPPER_PaymentDetail.DestinationData();
        WRAPPER_PaymentDetail.SourceAccount sourceAccount = new WRAPPER_PaymentDetail.SourceAccount();
        WRAPPER_PaymentDetail.SourceAccount feeAccount = new WRAPPER_PaymentDetail.SourceAccount();
        WRAPPER_PaymentDetail.SourceAccount destinationAccount = new WRAPPER_PaymentDetail.SourceAccount();
        WRAPPER_PaymentDetail.SourceAgent sourceAgent = new WRAPPER_PaymentDetail.SourceAgent();
        WRAPPER_PaymentDetail.SourceAgent feeAgent = new WRAPPER_PaymentDetail.SourceAgent();
		WRAPPER_PaymentDetail.SourceAgent destinationAgent = new WRAPPER_PaymentDetail.SourceAgent();
        WRAPPER_PaymentDetail.OperationAmount operationAmount = new WRAPPER_PaymentDetail.OperationAmount();
        WRAPPER_PaymentDetail.CounterValueOperationAmount counterValueOperationAmount = new WRAPPER_PaymentDetail.CounterValueOperationAmount();
        
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        try {
            //productId
            if ( String.isNotBlank(paymentDraft.productId)  && paymentDraft.productId != null){
                paymentDetail.productId = paymentDraft.productId;
            }
            //paymentMethod
            if ( String.isNotBlank(paymentDraft.paymentMethod)  && paymentDraft.paymentMethod != null){
                paymentDetail.paymentMethod = paymentDraft.paymentMethod;
            }
            //serviceId
            if ( String.isNotBlank(paymentDraft.serviceId)  && paymentDraft.serviceId != null){
                paymentDetail.serviceId = paymentDraft.serviceId;
            }

            if ( paymentDraft.sourceAccount != null){
                //sourceAccount
                if ( String.isNotBlank(paymentDraft.sourceAccount.displayNumber)  && paymentDraft.sourceAccount.displayNumber != null){
                    paymentDetail.sourceAccount = paymentDraft.sourceAccount.displayNumber;
                    sourceAccount.accountId = paymentDraft.sourceAccount.displayNumber;
                }
                //sourceAlias
                if ( String.isNotBlank(paymentDraft.sourceAccount.alias)  && paymentDraft.sourceAccount.alias != null){
                    paymentDetail.sourceAlias = paymentDraft.sourceAccount.alias;
                }
                //sourceAccountIdType
                if ( String.isNotBlank(paymentDraft.sourceAccount.idType)  && paymentDraft.sourceAccount.idType != null){
                    paymentDetail.sourceAccountIdType = paymentDraft.sourceAccount.idType;
                    sourceAccount.accountType = paymentDraft.sourceAccount.idType;
                }     
                //sourceCountry
                if ( String.isNotBlank(paymentDraft.sourceAccount.country)  && paymentDraft.sourceAccount.country != null){
                    paymentDetail.sourceCountry = paymentDraft.sourceAccount.country;
                    sourceData.country = paymentDraft.sourceAccount.country;
                }
                 //parsedSourceCountry
                 if ( String.isNotBlank(paymentDraft.sourceAccount.countryName)  && paymentDraft.sourceAccount.countryName != null){
                    paymentDetail.parsedSourceCountry = paymentDraft.sourceAccount.countryName;
                    sourceAgent.address = paymentDraft.sourceAccount.countryName;
                }
                //sourceBic && //sourceSwiftCode
                if ( String.isNotBlank(paymentDraft.sourceAccount.codigoBic)  && paymentDraft.sourceAccount.codigoBic != null){
                    paymentDetail.sourceBic = paymentDraft.sourceAccount.codigoBic;
                    paymentDetail.sourceSwiftCode = paymentDraft.sourceAccount.codigoBic;
                    sourceAgent.agentId =  paymentDraft.sourceAccount.codigoBic;
                }
                //sourceAccountHolder
                if ( String.isNotBlank(paymentDraft.sourceAccount.subsidiaryName)  && paymentDraft.sourceAccount.subsidiaryName != null){
                    paymentDetail.sourceAccountHolder = paymentDraft.sourceAccount.subsidiaryName;
                    sourceData.name = paymentDraft.sourceAccount.subsidiaryName;

                }
                //sourceBank
                if ( String.isNotBlank(paymentDraft.sourceAccount.bankName)  && paymentDraft.sourceAccount.bankName != null){
                    paymentDetail.sourceBank = paymentDraft.sourceAccount.bankName;
                    sourceAgent.name = paymentDraft.sourceAccount.bankName;
                }
                //sourceTotalAmount
               /* if ( Decimal.isNotBlank(paymentDraft.sourceAccount.amountAvailableBalance)  && paymentDraft.sourceAccount.amountAvailableBalance != null){
                    paymentDetail.sourceTotalAmount = paymentDraft.sourceAccount.amountAvailableBalance;
                }*/
                //sourceCurrency
                if ( String.isNotBlank(paymentDraft.sourceAccount.currencyCodeAvailableBalance)  && paymentDraft.sourceAccount.currencyCodeAvailableBalance != null){
                    paymentDetail.sourceCurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance;
                    sourceAccount.tcurrency = paymentDraft.sourceAccount.currencyCodeAvailableBalance;
                } 
                //customerId
                if ( String.isNotBlank(paymentDraft.sourceAccount.customerId)  && paymentDraft.sourceAccount.customerId != null){
                    sourceData.customerId = paymentDraft.sourceAccount.customerId;
                }
            
                //sourceFeeData
            }

            
            if ( paymentDraft.destinationAccount != null){
                //WRAPPER_PaymentDetail.DestinationData destinationData = new WRAPPER_PaymentDetail.DestinationData();
                
                //beneficiaryAccount
                if ( String.isNotBlank(paymentDraft.destinationAccount.displayNumber)  && paymentDraft.destinationAccount.displayNumber != null){
                    paymentDetail.beneficiaryAccount = paymentDraft.destinationAccount.displayNumber;
                    destinationAccount.accountId = paymentDraft.destinationAccount.displayNumber;
                }
                //beneficiaryAlias
                if ( String.isNotBlank(paymentDraft.destinationAccount.alias)  && paymentDraft.destinationAccount.alias != null){
                    paymentDetail.beneficiaryAlias = paymentDraft.destinationAccount.alias;
                }
                //beneficiaryAccountIdType
                if ( String.isNotBlank(paymentDraft.destinationAccount.idType)  && paymentDraft.destinationAccount.idType != null){
                    paymentDetail.beneficiaryAccountIdType = paymentDraft.destinationAccount.idType;
                    destinationAccount.accountType = paymentDraft.destinationAccount.idType;
                }
                //destinationCountry
                if ( String.isNotBlank(paymentDraft.destinationAccount.country)  && paymentDraft.destinationAccount.country != null){
                    paymentDetail.destinationCountry = paymentDraft.destinationAccount.country;
                    destinationData.country = paymentDraft.destinationAccount.country;                   
                }
                //parsedDestinationCountry
                if ( String.isNotBlank(paymentDraft.destinationAccount.countryName)  && paymentDraft.destinationAccount.countryName != null){
                    paymentDetail.parsedDestinationCountry = paymentDraft.destinationAccount.countryName;   
                    destinationAgent.address = paymentDraft.destinationAccount.countryName;

                }
                //destinationBic
                if ( String.isNotBlank(paymentDraft.destinationAccount.codigoBic)  && paymentDraft.destinationAccount.codigoBic != null){
                    paymentDetail.destinationBic = paymentDraft.destinationAccount.codigoBic;
                    destinationAgent.agentId = paymentDraft.destinationAccount.codigoBic;
                }
                //beneficiaryAccountHolder
                if ( String.isNotBlank(paymentDraft.destinationAccount.subsidiaryName)  && paymentDraft.destinationAccount.subsidiaryName != null){
                    paymentDetail.beneficiaryAccountHolder = paymentDraft.destinationAccount.subsidiaryName;
                    destinationData.name = paymentDraft.destinationAccount.subsidiaryName;

                }
                //beneficiaryBank
                if ( String.isNotBlank(paymentDraft.destinationAccount.bankName)  && paymentDraft.destinationAccount.bankName != null){
                    paymentDetail.beneficiaryBank = paymentDraft.destinationAccount.bankName;
                    destinationAgent.name = paymentDraft.destinationAccount.bankName;
                    
                }
                //beneficiaryCurrency
                if ( String.isNotBlank(paymentDraft.destinationAccount.currencyCodeAvailableBalance)  && paymentDraft.destinationAccount.currencyCodeAvailableBalance != null){
                    paymentDetail.beneficiaryCurrency = paymentDraft.destinationAccount.currencyCodeAvailableBalance;
                    destinationAccount.tcurrency = paymentDraft.destinationAccount.currencyCodeAvailableBalance;
                }
                //customerId
                if ( String.isNotBlank(paymentDraft.destinationAccount.customerId)  && paymentDraft.destinationAccount.customerId != null){
                    destinationData.customerId = paymentDraft.destinationAccount.customerId;
                }
				//creditorDocument
                    if(paymentDraft.destinationAccount.creditorDocument !=null){
                        if(String.isNotBlank(paymentDraft.destinationAccount.creditorDocument.documentType) && String.isNotBlank(paymentDraft.destinationAccount.creditorDocument.documentNumber)){
                            WRAPPER_PaymentDetail.CreditorDocument creditorDocument = new WRAPPER_PaymentDetail.CreditorDocument();
                            creditorDocument.documentType = paymentDraft.destinationAccount.creditorDocument.documentType;
                            creditorDocument.documentNumber = paymentDraft.destinationAccount.creditorDocument.documentNumber;
                            paymentDetail.destinationData.creditorDocument = creditorDocument;
                        }
                    }
                //beneficiarySwiftCode
               // paymentDetail.destinationData = destinationData;
            }
            
            if (paymentDetail.beneficiaryCurrency != null && paymentDetail.sourceCurrency != null){
                if ( paymentDetail.beneficiaryCurrency == paymentDetail.sourceCurrency){
                    if (paymentDraft.amountReceive != null){
                        operationAmount.amount = Double.valueOf(paymentDraft.baseAmount);
                    }
                    operationAmount.tcurrency = paymentDetail.beneficiaryCurrency;
                                paymentDetail.operationAmount = operationAmount;
                }
                else{
                    if (paymentDraft.amountReceive != null){
                        counterValueOperationAmount.amount = Double.valueOf(paymentDraft.baseAmount);
                    }
                    counterValueOperationAmount.tcurrency = paymentDetail.beneficiaryCurrency;
                    paymentDetail.counterValueOperationAmount = counterValueOperationAmount;

                }
            }
            
            
            //issueDate
            if ( String.isNotBlank(paymentDraft.timestamp)  && paymentDraft.timestamp != null){
                paymentDetail.issueDate = paymentDraft.timestamp;
            }
            //chargeBearer
            if ( String.isNotBlank(paymentDraft.chargeBearer)  && paymentDraft.chargeBearer != null){
                paymentDetail.chargeBearer = paymentDraft.chargeBearer;
            }
            //purpose
            if ( String.isNotBlank(paymentDraft.purpose)  && paymentDraft.purpose != null){
                paymentDetail.purpose = paymentDraft.purpose;
            }
            //comercialCode
            if ( String.isNotBlank(paymentDraft.comercialCode)  && paymentDraft.comercialCode != null){
                paymentDetail.comercialCode = paymentDraft.comercialCode;
            }
            //operationDescription
            if ( String.isNotBlank(paymentDraft.description)  && paymentDraft.description != null){
                paymentDetail.operationDescription = paymentDraft.description;
                paymentDetail.subject = paymentDraft.description;

            }
            if ( String.isNotBlank(paymentDraft.reason)  && paymentDraft.reason != null){
                //paymentReason
                paymentDetail.paymentReason = paymentDraft.reason;

                //parsedPaymentReason
                paymentDetail.parsedPaymentReason = paymentDraft.reason;
            }
            //amount
            if (paymentDraft.baseAmount != null){
                paymentDetail.amount = Double.valueOf(paymentDraft.baseAmount);
            }
            
            //paymentCurrency
            if ( String.isNotBlank(paymentDraft.paymentCurrency)  && paymentDraft.paymentCurrency != null){
                paymentDetail.paymentCurrency = paymentDraft.paymentCurrency;

            }
            /*if ( String.isNotBlank(paymentDraft.timestamp)  && paymentDraft.timestamp != null){
                //draftDate
                paymentDetail.draftDate = paymentDraft.timestamp;
                //valueDate
                paymentDetail.valueDate = Date.valueOf(paymentDraft.timestamp);
            }*/
            //paymentId
            if ( String.isNotBlank(paymentDraft.paymentId)  && paymentDraft.paymentId != null){
                paymentDetail.paymentId = paymentDraft.paymentId;
            }
            //parsedPaymentMethod
            if ( String.isNotBlank(paymentDraft.parsedPaymentMethod)  && paymentDraft.parsedPaymentMethod != null){
                paymentDetail.parsedPaymentMethod = paymentDraft.parsedPaymentMethod;
            }
            //paymentReference
            if ( String.isNotBlank(paymentDraft.reference)  && paymentDraft.reference != null){
                paymentDetail.paymentReference = paymentDraft.reference;
            }
            //parsedPurpose
            if ( String.isNotBlank(paymentDraft.purpose)  && paymentDraft.purpose != null){
                paymentDetail.parsedPurpose = paymentDraft.purpose;
            }
            //amountSend
            if (paymentDraft.amountSend != null){
                paymentDetail.amountSend = String.valueOf(paymentDraft.amountSend);
            }
            //amountReceive
            if (paymentDraft.amountReceive != null){
                paymentDetail.amountReceive = String.valueOf(paymentDraft.amountReceive);
                operationAmount.amount = Double.valueOf(paymentDraft.baseAmount);
            }
            if ( String.isNotBlank(paymentDraft.comercialCode)  && paymentDraft.comercialCode != null){
                //commercialCode
                paymentDetail.commercialCode = paymentDraft.comercialCode;
                //parsedCommercialCode
                paymentDetail.parsedCommercialCode = paymentDraft.comercialCode;
            }
            //feesCurrency
            if ( String.isNotBlank(paymentDraft.convertedTransactionFeeCurrency)  && paymentDraft.convertedTransactionFeeCurrency != null){
                paymentDetail.feesCurrency = paymentDraft.convertedTransactionFeeCurrency;
            }
            //fees
            //addFees
            if (paymentDraft.convertedTransactionFee != null){
                paymentDetail.fees = String.valueOf(paymentDraft.convertedTransactionFee);
                paymentDetail.addFees = true;
            }
            else {
                paymentDetail.addFees = false;
            }
            //charges
            if (paymentDraft.exchangeRate != null){
                paymentDetail.charges = String.valueOf(paymentDraft.exchangeRate);
            }
            //clientReference
            if ( String.isNotBlank(paymentDraft.reference)  && paymentDraft.reference != null){
                paymentDetail.clientReference = paymentDraft.reference;
            }
            //feeAccount and feeBankname
            if ( paymentDraft.expensesAccount != null){
                if(String.isNotBlank(paymentDraft.expensesAccount.displayNumber) && paymentDraft.expensesAccount.displayNumber !=null){
                    feeAccount.accountId = paymentDraft.expensesAccount.displayNumber;
                }
                if(String.isNotBlank(paymentDraft.expensesAccount.bankName) && paymentDraft.expensesAccount.bankName !=null){
                    feeAgent.name = paymentDraft.expensesAccount.bankName;
                }
            }
            //documents
           /* if ( paymentDraft.documents != null){
                if(String.isNotBlank(paymentDraft.paymentId)  && paymentDraft.paymentId != null ){
                    List<CNT_FilesUtilities.CustomContentVersion> documents = new List<CNT_FilesUtilities.CustomContentVersion>();
                    paymentData.documents = releatedFiles(paymentData.paymentId);
                }
            }*/
            
            
            
            sourceFeeData.sourceAccount = feeAccount;
            sourceFeeData.sourceAgent = feeAgent;
            sourceData.sourceAgent = sourceAgent;
            sourceData.sourceAccount = sourceAccount;
            destinationData.destinationAgent = destinationAgent;
            destinationData.destinationAccount = destinationAccount;
            
            paymentDetail.sourceData = sourceData;
            paymentDetail.destinationData = destinationData;

            value.put('paymentDetail', paymentDetail);

            System.debug('Payment Detail: ' + paymentDetail);

            response = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('CNT_PAY_PaymentOptions.getPaymentDetail: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        return response;
    }
    
    public static List<CNT_FilesUtilities.CustomContentVersion> releatedFiles(String paymentId){
        List<CNT_FilesUtilities.CustomContentVersion> res = new List<CNT_FilesUtilities.CustomContentVersion>();
		List<Payment__c> paymentParent = new List<Payment__c>([SELECT id from Payment__c where PAY_TXT_PaymentId__c=:paymentId]);
		if(!paymentParent.isEmpty()) {               
                String idParent = paymentParent[0].Id;
                
                list<id> lstConDocs = new list<id>();
                List<ContentDocumentLink> cntList = [Select Id, ContentDocumentId From ContentDocumentLink Where LinkedEntityId =:idParent];
                if(!cntList.isEmpty()){
                    for(ContentDocumentLink cntLink : cntList) {
                        lstConDocs.add(cntLink.ContentDocumentId);
                    }
                }
                if(!lstConDocs.isEmpty()) {
                    List<ContentVersion> cvs = new List<ContentVersion>([SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE ContentDocumentId IN :lstConDocs]);
                    
                    if(!cvs.isEmpty()){
                        Integer count = 1;
                        for(ContentVersion cv : cvs){
                            CNT_FilesUtilities.CustomContentVersion item = new CNT_FilesUtilities.CustomContentVersion(cv.title, cv.Id, count,cv.ContentDocumentId);
                            res.add(item);
                            count++;
                        }
                    }
                }
            }
        return res;
        
    }

}