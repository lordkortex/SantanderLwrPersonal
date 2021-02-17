public class CNT_PaymentTemporal {
    
     @AuraEnabled
        public static ReturnValue getPaymentDetailTempMain(String paymentId){
         //   WRAPPER_PaymentList.WRAPPER_Payment paymentDetail = new  WRAPPER_PaymentList.WRAPPER_Payment(); SNJ
             WRAPPER_PaymentDetail.OperationDetail paymentDetail = new WRAPPER_PaymentDetail.OperationDetail();
            ReturnValue response = null;
            try {
                // Create a request and response object to handle the web service response
                Map<String, Object> value = new Map<String, Object>();
                WS_GetPaymentDetail wsObject = new WS_GetPaymentDetail(paymentId);
                //WS_GetPaymentDetail wsObject = new WS_GetPaymentDetail('0a46eabf4b5b452abd32a0f8f0f21574');
                //WS_GetPaymentDetail wsObject = new WS_GetPaymentDetail('4bdb73688d1849e1941f5160c52c8ae4');
                WRAPPER_PaymentDetail output = getPaymentDetailTemp(paymentId) ;//wsObject.execute();
                
                
                System.debug(output);
                value.put('paymentDetailOutput', output);
    
    
                // Once the response has been recieved, transform it into the WRAPPER_PaymentList.WRAPPER_Payment object
                if(output != null){  
                    WRAPPER_PaymentDetail.OperationDetail operationDetail = new WRAPPER_PaymentDetail.OperationDetail();
                    operationDetail = output.operationResponse.operationDetail;
                    System.debug('RETURNS: '+operationDetail);
                    if(operationDetail != null){
                        paymentDetail.operationType = operationDetail.operationType != null ? operationDetail.operationType : ''; 
                        paymentDetail.productId = operationDetail.productId != null ? operationDetail.productId : '';
                        paymentDetail.operationDescription = operationDetail.operationDescription != null ? operationDetail.operationDescription : '';
                        if(operationDetail.paymentMethod != null){
                            paymentDetail.paymentMethod = operationDetail.paymentMethod;
                            if (operationDetail.paymentMethod == 'book_to_book') {
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
                                            itemToAdd.userName = userName;
                                        }
                                    }
                                    statusList.add(itemToAdd);
                                }
                                paymentDetail.operationStatusesHistorical = statusList;
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
                            // paymentDetail.amount = operationDetail.operationAmount.amount != null ? operationDetail.operationAmount.amount : null;
                            // paymentDetail.paymentCurrency = operationDetail.operationAmount.tcurrency != null ? operationDetail.operationAmount.tcurrency : '';
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
                        /*if(String.isNotBlank(operationDetail.commercialCode)){
                            paymentDetail.commercialCode =  operationDetail.commercialCode;
                            String aux = CNT_Payments.getComercialCodeRecord(operationDetail.commercialCode);
                            if(String.isNotBlank(aux)){
                                paymentDetail.parsedCommercialCode =  aux;
                            }else{
                                paymentDetail.parsedCommercialCode = '';
                            }
                        }*/
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
                        
                        if (operationDetail.operationNominalFxDetails != null) {
                            if (operationDetail.operationNominalFxDetails.ccyCountervalue != null) {
                                if (operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount != null) {
                                    paymentDetail.convertedAmount = String.valueOf(operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount);
                                    if (operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency != null) {
                                        paymentDetail.convertedCurrency = String.valueOf(operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueCurrency);
                                    }
                                }
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
                        if (paymentDetail.convertedAmount != null && paymentDetail.convertedCurrency != null) {
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
                    
                 
                    //if(operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueAmount != null && operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount != null){
                      //  paymentDetail.totalAmount = String.valueOf(operationDetail.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount +operationDetail.operationFeesFxDetails.ccyCountervalue.ccyCountervalueAmount);
                    //}
                    if(paymentDetail.amount != null ){
                        paymentDetail.totalAmount = String.valueOf(paymentDetail.amount);
                    }
                    if(paymentDetail.amount != null && paymentDetail.fees != null){
                        paymentDetail.totalAmount = String.valueOf(paymentDetail.amount + Decimal.valueOf(paymentDetail.fees));
                    }
                    if(paymentDetail.convertedAmount != null ){
                        paymentDetail.totalAmount = String.valueOf(Decimal.valueOf(paymentDetail.convertedAmount));
                    }
                  
                   if(paymentDetail.convertedAmount != null && paymentDetail.fees != null){
                        paymentDetail.totalAmount = String.valueOf(Decimal.valueOf(paymentDetail.convertedAmount) + Decimal.valueOf(paymentDetail.fees));
                    }
    
                    //paymentDetail.fxFlag = operationDetail.operationFraudDetails.fraudReference;
                    
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
    
    @AuraEnabled
    public static WRAPPER_PaymentDetail getPaymentDetailTemp (String paymentId) {
        String  response = '{   "operationResponse": {     "operationDetail": {       "operationType": "Order",       "productId": "book_to_book",       "paymentMethod": "book_to_book",       "serviceId": "add_international_payment_internal",       "userGlobalId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c",       "operationStatus": {         "status": "103",         "reason": "001",         "statusDate": "2021-01-28T16:29:54.550+0000",         "globalUserId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c"       },       "operationStatusesHistorical": [         {           "status": "001",           "reason": "000",           "statusDate": null,           "globalUserId": null         },         {           "status": "101",           "reason": "001",           "statusDate": "2021-01-28T15:57:31.358+0000",           "globalUserId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c"         },         {           "status": "002",           "reason": "001",           "statusDate": "2021-01-28T16:15:10.459+0000",           "globalUserId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c"         },         {           "status": "103",           "reason": "001",           "statusDate": "2021-01-28T16:29:54.550+0000",           "globalUserId": null         },         {           "status": "001",           "reason": "000",           "statusDate": null,           "globalUserId": null         },         {           "status": "002",           "reason": "001",           "statusDate": "2021-01-28T15:57:02.875+0000",           "globalUserId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c"         },         {           "status": null,           "reason": null,           "statusDate": null,           "globalUserId": null         },         {           "status": "001",           "reason": "000",           "statusDate": "2021-01-28T16:29:12.433+0000",           "globalUserId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c"         },         {           "status": "001",           "reason": "000",           "statusDate": "2021-01-28T15:59:59.777+0000",           "globalUserId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c"         },         {           "status": "002",           "reason": "001",           "statusDate": "2021-01-28T16:26:51.981+0000",           "globalUserId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c"         },         {           "status": "002",           "reason": "001",           "statusDate": "2021-01-28T16:14:40.093+0000",           "globalUserId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c"         },         {           "status": null,           "reason": null,           "statusDate": null,           "globalUserId": null         },         {           "status": "001",           "reason": "000",           "statusDate": "2021-01-28T15:45:36.087+0000",           "globalUserId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c"         },         {           "status": "101",           "reason": "001",           "statusDate": "2021-01-28T16:27:22.360+0000",           "globalUserId": "283f71c9-34ca-4bed-9ebc-5ad93f708d3c"         }       ],       "sourceData": {         "name": "M.G.M. ACCIAIERIA ITALIA",         "customerId": "4382",         "companyGlobalId": "-1363016250",         "sourceAddress": {           "streetName": "Avda. de Cantabria s/n",           "townName": "Boadilla del Monte, Madrid",           "country": "ES"         },         "sourceAccount": {           "accountType": "IBA",           "accountId": "GB37ABBY09072445283289",           "tcurrency": "GBP"         },         "sourceAgent": {           "agentId": "ABBYGB20XXX",           "name": "SANTANDER UK PLC",           "address": "GB"         },         "country": "GB"       },       "sourceFeeData": {         "sourceName": null,         "sourceAccount": {           "accountType": null,           "accountId": null,           "tcurrency": null         },         "sourceAgent": {           "agentId": null,           "name": null,           "address": null         },         "country": null       },       "destinationData": {         "name": "M.G.M. ACCIAIERIA ITALIA",         "customerId": "J101484427",         "companyGlobalId": "-1363016250",         "destinationAddress": {           "streetName": "306, High Holborn, High Holborn",           "townName": "London",           "country": "GB"         },         "destinationAccount": {           "accountType": "IBA",           "accountId": "ES7700490454193000541739",           "tcurrency": "EUR"         },         "destinationAgent": {           "agentId": "BSCHESMMXXX",           "name": "BANCO SANTANDER S.A.",           "address": "ES"         },         "country": "ES"       },       "operationStep1Data": {         "opStep1Id": "1",         "status": "PDNG",         "valueDate": "2021-01-28",         "flowIndicator": "S",         "intermediateAgentAccount": {           "accountType": "IBA",           "accountId": "ES7700490454193000541739"         }       },       "operationStep2Data": {         "opStep2Id": "3",         "status": "ACCC",         "valueDate": "2021-01-28",         "flowIndicator": "D",         "intermediateAgentAccount": {           "accountType": null,           "accountId": null         }       },       "issueDate": "2021-01-28T16:29:54.091+0000",       "chargeBearer": "OUR",       "operationAmount": {         "tcurrency": "EUR",         "amount": 5.56       },       "operationAmountBaseCurrency": {         "tcurrency": "GBP",         "amount": 5.0       },       "counterValueOperationAmount": {         "tcurrency": "GBP",         "amount": 5.0,         "tradeCurrency": "EUR"       },       "sourceTotalAmount": {         "tcurrency": "GBP",         "amount": 5.0       },       "clientReference": "202101281703",       "purpose": "OTHR",       "subject": "REF 202101281703",       "commercialCode": "",       "reviewAdditionalData": {         "subject": null,         "description": null       },       "rejectAdditionalData": {         "subject": null,         "description": null       },       "operationFraudDetails": {         "fraudValidationResult": null,         "fraudReference": null       },       "operationNominalFxDetails": {         "fxCountervalueId": "GTS00000000000000000191",         "priceType": "ONL",         "discount": 0,         "ccyCountervalue": {           "ccyCountervalueAmount": 5.56,           "ccyCountervalueCurrency": "EUR"         },         "valueDateEfx": "2021-01-28",         "customerExchangeRate": 0.9,         "fxComercialMargin": {           "fxComercialMarginCurrency": "EUR",           "fxComercialMarginAmount": 0.1668         },         "nominalAmountNoMarkUp": {           "amount": 4.8332,           "tcurrency": "EUR"         }       },       "operationFeesFxDetails": {         "fxCountervalueId": null,         "priceType": null,         "discount": null,         "ccyCountervalue": {           "ccyCountervalueAmount": null,           "ccyCountervalueCurrency": null         },         "valueDateEfx": null,         "customerExchangeRate": null       },       "operationNominalFxRollbackDetails": {         "fxCountervalueId": "GTS000000000000000004",         "priceType": "ONI",         "ccyCountervalue": {           "ccyCountervalueAmount": 1.60714285714286,           "ccyCountervalueCurrency": "EUR"         },         "valueDateEfx": "2021-01-28",         "customerExchangeRate": 1.12       },       "operationFeesFxRollbackDetails": {         "fxCountervalueId": "GTS000000000000000004",         "priceType": "ONI",         "ccyCountervalue": {           "ccyCountervalueAmount": 1.60714285714286,           "ccyCountervalueCurrency": "EUR"         },         "valueDateEfx": "2021-01-28",         "customerExchangeRate": 1.12       },       "pricingDetails": {         "productName": "book_to_book",         "totalPrice": 2.0,         "tcurrency": "GBP",         "currencyList": [           {             "tcurrency": null,             "currencyName": null,             "conceptsList": [                           ]           }         ]       }     },     "refundDetails": {       "globalUserId": "",       "authUserId": "",       "authDate": "2021-01-28T16:27:18.959Z",       "authComments": "",       "creationDate": "2021-01-28T16:27:18.959Z",       "refundType": "user_request",       "refundAmount": {         "amount": 0.0,         "tcurrency": "EUR"       },       "status": "",       "reason": "",       "comments": "",       "refundDate": "2021-01-28",       "operationNominalFxRefundDetails": {         "fxCountervalueId": null,         "priceType": null,         "discount": null,         "ccyCountervalue": {           "ccyCountervalueAmount": null,           "ccyCountervalueCurrency": null         },         "valueDateEfx": null,         "customerExchangeRate": null,         "fxComercialMargin": {           "fxComercialMarginAmount": null,           "fxComercialMarginCurrency": null         },         "nominalAmountNoMarkUp": {           "amount": null,           "tcurrency": null         }       },       "operationFeesFxRefundDetails": {         "fxCountervalueId": null,         "priceType": null,         "discount": null,         "ccyCountervalue": {           "ccyCountervalueAmount": null,           "ccyCountervalueCurrency": null         },         "valueDateEfx": null,         "customerExchangeRate": null       }     }   } }';
		WRAPPER_PaymentDetail output = WRAPPER_PaymentDetail.parse(response);  
        return output;
    }

    @AuraEnabled
    public static String getAmerica () {
        return 'America';
    }
    
    @AuraEnabled
    public static String getAsia () {
        return 'Asia';
    }

    @AuraEnabled
    public static String getAfrica () {
        return 'Africa';
    }

    @AuraEnabled
    public static String getEuropa () {
        return 'Europa';
    }

    @AuraEnabled
    public static String getOceania () {
        return 'Oceania';
    }

}