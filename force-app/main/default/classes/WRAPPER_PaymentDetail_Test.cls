@IsTest
public class WRAPPER_PaymentDetail_Test {
    static testMethod void testParse() {
		String json = '{' +
        '    "operationResponse": {' +
        '        "operationDetail": {' +
        '            "operationType": "Order",' +
        '            "productId": "Book_to_Book",' +
        '            "paymentMethod": "Book_to_Book",' +
        '            "serviceId": "add_international_payment_internal",' +
        '            "userGlobalId": "5b05d962-a3ed-4ee6-af65-4d738b560446",' +
        '            "operationStatus": {' +
        '                "status": "002",' +
        '                "reason": "001",' +
        '                "statusDate": "2020-12-23T09:07:12.429+0000",' +
        '                "globalUserId": "5b05d962-a3ed-4ee6-af65-4d738b560446"' +
        '            },' +
        '            "operationStatusesHistorical": [{' +
        '                    "status": "001",' +
        '                    "reason": "000",' +
        '                    "statusDate": "2020-12-23T09:04:59.772+0000",' +
        '                    "globalUserId": "5b05d962-a3ed-4ee6-af65-4d738b560446"' +
        '                }, {' +
        '                    "status": "002",' +
        '                    "reason": "001",' +
        '                    "statusDate": "2020-12-23T09:07:12.429+0000",' +
        '                    "globalUserId": "5b05d962-a3ed-4ee6-af65-4d738b560446"' +
        '                }' +
        '            ],' +
        '            "sourceData": {' +
        '                "name": null,' +
        '                "customerId": null,' +
        '                "sourceAddress": {' +
        '                    "streetName": "Avda. de Cantabria s/n",' +
        '                    "townName": "Boadilla del Monte, Madrid",' +
        '                    "country": "ES"' +
        '                },' +
        '                "sourceAccount": {' +
        '                    "accountType": "IBA",' +
        '                    "accountId": "GB66ABBY09022210211272",' +
        '                    "tcurrency": "GBP"' +
        '                },' +
        '                "sourceAgent": {' +
        '                    "agentId": "ABBYGB20XXX",' +
        '                    "name": "SANTANDER UK PLC",' +
        '                    "address": "United Kingdom"' +
        '                },' +
        '                "country": "GB"' +
        '            },' +
        '            "sourceFeeData": {' +
        '                "sourceName": null,' +
        '                "sourceAccount": {' +
        '                    "accountType": null,' +
        '                    "accountId": null,' +
        '                    "tcurrency": null' +
        '                },' +
        '                "sourceAgent": {' +
        '                    "agentId": null,' +
        '                    "name": null,' +
        '                    "address": null' +
        '                },' +
        '                "country": null' +
        '            },' +
        '            "destinationData": {' +
        '                "name": "M.G.M. ACCIAIERIA ITALIA",' +
        '                "customerId": "J101484427",' +
        '                "destinationAddress": {' +
        '                    "streetName": "Calle Patones",' +
        '                    "townName": "Madrid",' +
        '                    "country": "ES"' +
        '                },' +
        '                "destinationAccount": {' +
        '                    "accountType": "IBA",' +
        '                    "accountId": "ES7700490454193000541739",' +
        '                    "tcurrency": "EUR"' +
        '                },' +
        '                "destinationAgent": {' +
        '                    "agentId": "BSCHESMMXXX",' +
        '                    "name": "BANCO SANTANDER S.A.",' +
        '                    "address": "Spain"' +
        '                },' +
        '                "country": "ES"' +
        '            },' +
        '            "operationStep1Data": {' +
        '                "opStep1Id": null,' +
        '                "status": null,' +
        '                "valueDate": null,' +
        '                "flowIndicator": null,' +
        '                "intermediateAgentAccount": {' +
        '                    "accountType": null,' +
        '                    "accountId": null' +
        '                }' +
        '            },' +
        '            "operationStep2Data": {' +
        '                "opStep2Id": null,' +
        '                "status": null,' +
        '                "valueDate": null,' +
        '                "flowIndicator": null,' +
        '                "intermediateAgentAccount": {' +
        '                    "accountType": null,' +
        '                    "accountId": null' +
        '                }' +
        '            },' +
        '            "issueDate": null,' +
        '            "chargeBearer": "OUR",' +
        '            "operationAmount": {' +
        '                "tcurrency": null,' +
        '                "amount": null' +
        '            },' +
        '            "counterValueOperationAmount": {' +
        '                "tcurrency": "EUR",' +
        '                "amount": 6.0,' +
        '                "tradeCurrency": "GBP"' +
        '            },' +
        '            "sourceTotalAmount": {' +
        '                "tcurrency": null,' +
        '                "amount": null' +
        '            },' +
        '            "clientReference": "202012230906",' +
        '            "purpose": "Charitable Aid",' +
        '            "subject": "REF 202012230906",' +
        '            "commercialCode": null,' +
        '            "reviewAdditionalData": {' +
        '                "subject": null,' +
        '                "description": null' +
        '            },' +
        '            "rejectAdditionalData": {' +
        '                "subject": null,' +
        '                "description": null' +
        '            },' +
        '            "operationFraudDetails": {' +
        '                "fraudValidationResult": null,' +
        '                "fraudReference": null' +
        '            },' +
        '            "operationNominalFxDetails": {' +
        '                "fxCountervalueId": "GTS000000000000000008",' +
        '                "priceType": "ONL",' +
        '                "discount": 0,' +
        '                "ccyCountervalue": {' +
        '                    "ccyCountervalueAmount": 5.41,' +
        '                    "ccyCountervalueCurrency": "GBP"' +
        '                },' +
        '                "valueDateEfx": "2020-12-23",' +
        '                "customerExchangeRate": 1.11,' +
        '                "fxComercialMargin": {' +
        '                    "fxComercialMarginCurrency": "GBP",' +
        '                    "fxComercialMarginAmount": 0.1623' +
        '                },' +
        '                "nominalAmountNoMarkUp": {' +
        '                    "amount": 5.8377,' +
        '                    "tcurrency": "GBP"' +
        '                }' +
        '            },' +
        '            "operationFeesFxDetails": {' +
        '                "fxCountervalueId": null,' +
        '                "priceType": null,' +
        '                "discount": null,' +
        '                "ccyCountervalue": {' +
        '                    "ccyCountervalueAmount": null,' +
        '                    "ccyCountervalueCurrency": null' +
        '                },' +
        '                "valueDateEfx": null,' +
        '                "customerExchangeRate": null' +
        '            },' +
        '            "operationNominalFxRollbackDetails": {' +
        '                "fxCountervalueId": null,' +
        '                "priceType": null,' +
        '                "ccyCountervalue": {' +
        '                    "ccyCountervalueAmount": null,' +
        '                    "ccyCountervalueCurrency": null' +
        '                },' +
        '                "valueDateEfx": null,' +
        '                "customerExchangeRate": null' +
        '            },' +
        '            "operationFeesFxRollbackDetails": {' +
        '                "fxCountervalueId": null,' +
        '                "priceType": null,' +
        '                "ccyCountervalue": {' +
        '                    "ccyCountervalueAmount": null,' +
        '                    "ccyCountervalueCurrency": null' +
        '                },' +
        '                "valueDateEfx": null,' +
        '                "customerExchangeRate": null' +
        '            },' +
        '            "pricingDetails": {' +
        '                "productName": "Book_to_Book",' +
        '                "totalPrice": 0.2,' +
        '                "tcurrency": "EUR",' +
        '                "currencyList": [{' +
        '                        "tcurrency": "GBP",' +
        '                        "currencyName": null,' +
        '                        "conceptsList": [{' +
        '                                "conceptId": "291",' +
        '                                "conceptName": "OUR Expenses Commission",' +
        '                                "specialPrice": {' +
        '                                    "specialPriceLevel": null,' +
        '                                    "specialTiersList": [{' +
        '                                            "specialAmountTier": null,' +
        '                                            "specialAmountTierType": null,' +
        '                                            "specialFixedRatePrice": {' +
        '                                                "specialRate": null,' +
        '                                                "specialMinimumAmount": null,' +
        '                                                "specialMaximumAmount": null,' +
        '                                                "tcurrency": null' +
        '                                            },' +
        '                                            "specialFixedAmountPrice": {' +
        '                                                "specialFixedAmount": null,' +
        '                                                "tcurrency": null' +
        '                                            }' +
        '                                        }' +
        '                                    ]' +
        '                                },' +
        '                                "standardPrice": {' +
        '                                    "standardTiersList": [{' +
        '                                            "standardAmountTier": 9999999999,' +
        '                                            "standardAmountTierType": null,' +
        '                                            "standardFixedRatePrice": {' +
        '                                                "standardRate": null,' +
        '                                                "standardMinimumAmount": null,' +
        '                                                "standardMaximumAmount": null,' +
        '                                                "tcurrency": null' +
        '                                            },' +
        '                                            "standardFixedAmountPrice": {' +
        '                                                "standardFixedAmount": 0.2,' +
        '                                                "tcurrency": "EUR"' +
        '                                            }' +
        '                                        }' +
        '                                    ]' +
        '                                },' +
        '                                "conceptAmount": {' +
        '                                    "amount": 0.2,' +
        '                                    "tcurrency": "EUR",' +
        '                                    "fixing": null' +
        '                                }' +
        '                            }' +
        '                        ]' +
        '                    }' +
        '                ]' +
        '            }' +
        '        },' +
        '        "refundDetails": {' +
        '            "globalUserId": "",' +
        '            "authUserId": "",' +
        '            "authDate": "2020-12-23T08:06:43.713Z",' +
        '            "authComments": "",' +
        '            "creationDate": "2020-12-23T08:06:43.713Z",' +
        '            "refundType": "user_request",' +
        '            "refundAmount": {' +
        '                "amount": 0.0,' +
        '                "tcurrency": "EUR"' +
        '            },' +
        '            "status": "",' +
        '            "reason": "",' +
        '            "comments": "",' +
        '            "refundDate": "2020-12-23",' +
        '            "operationNominalFxRefundDetails": {' +
        '                "fxCountervalueId": null,' +
        '                "priceType": null,' +
        '                "discount": null,' +
        '                "ccyCountervalue": {' +
        '                    "ccyCountervalueAmount": null,' +
        '                    "ccyCountervalueCurrency": null' +
        '                },' +
        '                "valueDateEfx": null,' +
        '                "customerExchangeRate": null,' +
        '                "fxComercialMargin": {' +
        '                    "fxComercialMarginAmount": null,' +
        '                    "fxComercialMarginCurrency": null' +
        '                },' +
        '                "nominalAmountNoMarkUp": {' +
        '                    "amount": null,' +
        '                    "tcurrency": null' +
        '                }' +
        '            },' +
        '            "operationFeesFxRefundDetails": {' +
        '                "fxCountervalueId": null,' +
        '                "priceType": null,' +
        '                "discount": null,' +
        '                "ccyCountervalue": {' +
        '                    "ccyCountervalueAmount": null,' +
        '                    "ccyCountervalueCurrency": null' +
        '                },' +
        '                "valueDateEfx": null,' +
        '                "customerExchangeRate": null' +
        '            }' +
        '        }' +
        '    }' +
        '}';

        WRAPPER_PaymentDetail obj = WRAPPER_PaymentDetail.parse(json);
        System.debug(obj);
		System.assert(obj != null, 'Wrapper test error.');
	}
    /*----------------------------------------------------------------------------------
Author:         Andrea Martin
Company:        Deloitte
Description:    Test class of Wrapper_B2B_Data
History
<Date>			<Author>		<Description>
01/02/2021		Andrea Martin    	Initial version
----------------------------------------------------------------------------------*/
@isTest
  static void setTest() {  
      
      WRAPPER_PaymentDetail.SpecialFixedRatePrice specialFixedRatePrice = new WRAPPER_PaymentDetail.SpecialFixedRatePrice();
      specialFixedRatePrice.specialRate = 1.250126;
      specialFixedRatePrice.specialMinimumAmount = 10;
      specialFixedRatePrice.specialMaximumAmount = 500;
      specialFixedRatePrice.tcurrency = 'EUR';
      
      WRAPPER_PaymentDetail.SpecialFixedAmountPrice specialFixedAmountPrice = new WRAPPER_PaymentDetail.SpecialFixedAmountPrice();
      specialFixedAmountPrice.specialFixedAmount = 3;
      specialFixedAmountPrice.tcurrency = 'EUR';
      
      WRAPPER_PaymentDetail.SpecialTiersList specialTiersList = new WRAPPER_PaymentDetail.SpecialTiersList(); 
      specialTiersList.specialAmountTier = 50000.12345;
      specialTiersList.specialAmountTierType = 'I';
      specialTiersList.specialFixedRatePrice = specialFixedRatePrice;
      specialTiersList.specialFixedAmountPrice = specialFixedAmountPrice;
      List<WRAPPER_PaymentDetail.SpecialTiersList> specialTiersL = new List<WRAPPER_PaymentDetail.SpecialTiersList>();
      specialTiersL.add(specialTiersList);
      
      WRAPPER_PaymentDetail.SpecialPrice specialPrice = new WRAPPER_PaymentDetail.SpecialPrice();
      specialPrice.specialPriceLevel = 'test';
      specialPrice.specialTiersList = specialTiersL;
      
      WRAPPER_PaymentDetail.StandardFixedAmountPrice standardFixedAmountPrice = new WRAPPER_PaymentDetail.StandardFixedAmountPrice();
      standardFixedAmountPrice.standardFixedAmount = 3; 
      standardFixedAmountPrice.tcurrency ='EUR';
      
      WRAPPER_PaymentDetail.StandardFixedRatePrice standardFixedRatePrice = new WRAPPER_PaymentDetail.StandardFixedRatePrice();
      standardFixedRatePrice.standardRate = 1.25;
      standardFixedRatePrice.standardMaximumAmount = 500; 
      standardFixedRatePrice.standardMinimumAmount = 10;
      standardFixedRatePrice.tcurrency = 'EUR';
      
      WRAPPER_PaymentDetail.StandardTiersList standardTiersList = new WRAPPER_PaymentDetail.StandardTiersList();
      standardTiersList.standardAmountTier = 5000.12345; 
      standardTiersList.standardAmountTierType = 's';
      standardTiersList.standardFixedAmountPrice = standardFixedAmountPrice; 
      standardTiersList.standardFixedRatePrice = standardFixedRatePrice; 
      List < WRAPPER_PaymentDetail.StandardTiersList> standardTiersL = new List<WRAPPER_PaymentDetail.StandardTiersList>();
      standardTiersL.add(standardTiersList);
      
      WRAPPER_PaymentDetail.StandardPrice standarPrice = new WRAPPER_PaymentDetail.StandardPrice();
      standarPrice.standardTiersList = standardTiersL;
      
      WRAPPER_PaymentDetail.ConceptAmount conceptAmount = new WRAPPER_PaymentDetail.ConceptAmount();
      conceptAmount.amount = 250;
      conceptAmount.tcurrency = 'EUR';
      conceptAmount.fixing = 1.25;
      
      WRAPPER_PaymentDetail.ConceptsList conceptsList = new WRAPPER_PaymentDetail.ConceptsList();
      conceptsList.conceptId = 'test';
      conceptsList.conceptName= 'test';
      conceptsList.specialPrice= specialPrice;
      conceptsList.standardPrice= standarPrice;
      conceptsList.conceptAmount = conceptAmount;
      List< WRAPPER_PaymentDetail.ConceptsList> conceptL = new List<WRAPPER_PaymentDetail.ConceptsList>();
      conceptL.add(conceptsList);
      
      WRAPPER_PaymentDetail.OperationAmount operationAmount = new WRAPPER_PaymentDetail.OperationAmount();
      operationAmount.tcurrency= 'test';
      operationAmount.amount=10;
      
      WRAPPER_PaymentDetail.FxComercialMargin fxComercialMargin = new WRAPPER_PaymentDetail.FxComercialMargin();
      fxComercialMargin.fxComercialMarginAmount =10;
      fxComercialMargin.fxComercialMarginCurrency='test';
      
      WRAPPER_PaymentDetail.CounterValueOperationAmount counterValueOperationAmount = new WRAPPER_PaymentDetail.CounterValueOperationAmount(); 
      counterValueOperationAmount.amount= 10;
      counterValueOperationAmount.tcurrency='test';
      counterValueOperationAmount.tradeCurrency='test';
      
      WRAPPER_PaymentDetail.OperationFraudDetails operationFraudDetails = new WRAPPER_PaymentDetail.OperationFraudDetails();
      operationFraudDetails.fraudReference='test';
      operationFraudDetails.fraudValidationResult='test';
      
      WRAPPER_PaymentDetail.SourceAddress sourceAddress = new  WRAPPER_PaymentDetail.SourceAddress();
      sourceAddress.country='test';
      sourceAddress.streetName='test';
      sourceAddress.townName='test';
      
      WRAPPER_PaymentDetail.IntermediateAgentAccount intermediateAgentAccount = new WRAPPER_PaymentDetail.IntermediateAgentAccount();
      intermediateAgentAccount.accountId = 'test';
      intermediateAgentAccount.accountType='test';
      
      WRAPPER_PaymentDetail.OperationStatus operationStatus = new WRAPPER_PaymentDetail.OperationStatus();
      operationStatus.status = 'test';
      operationStatus.reason= 'test';
      operationStatus.statusDate = 'test';
      operationStatus.globalUserId = 'test';
      
      WRAPPER_PaymentDetail.OperationStatusHistory operationStatusHistory = new WRAPPER_PaymentDetail.OperationStatusHistory();
      operationStatusHistory.status = 'test';
      operationStatusHistory.reason = 'test';
      operationStatusHistory.statusDate='test';
      operationStatusHistory.globalUserId = 'test';
      operationStatusHistory.userName = 'test'; 
      operationStatusHistory.parsedDateTime = 'test';
      operationStatusHistory.parsedTime= 'test';
      operationStatusHistory.parsedDate='test';
      
      WRAPPER_PaymentDetail.CurrencyList  currencyList= new WRAPPER_PaymentDetail.CurrencyList(); 
      currencyList.tcurrency ='test';
      currencyList.currencyName = 'test';
      currencyList.conceptsList = conceptL;
      List < WRAPPER_PaymentDetail.CurrencyList> currencyL = new List<WRAPPER_PaymentDetail.CurrencyList>();
      currencyL.add(currencyList);
      
      WRAPPER_PaymentDetail.PricingDetails pricingDetails = new WRAPPER_PaymentDetail.PricingDetails();
      pricingDetails.productName = 'test';
      pricingDetails.totalPrice= 10;
      pricingDetails.tcurrency = 'test';
      pricingDetails.currencyList = currencyL;
          
      WRAPPER_PaymentDetail.CcyCountervalue ccyCountervalue = new WRAPPER_PaymentDetail.CcyCountervalue();
      ccyCountervalue.ccyCountervalueAmount = 10;
      ccyCountervalue.ccyCountervalueCurrency = 'test';
      
      WRAPPER_PaymentDetail.SourceAccount sourceAccount = new WRAPPER_PaymentDetail.SourceAccount();
      sourceAccount.accountId = 'test';
      sourceAccount.accountType = 'test';
      sourceAccount.tcurrency = 'test';
      
      WRAPPER_PaymentDetail.OperationAmountBaseCurrency operationAmountBaseCurrency= new WRAPPER_PaymentDetail.OperationAmountBaseCurrency();
      operationAmountBaseCurrency.amount = 10;
      operationAmountBaseCurrency.tcurrency = 'test';
      
      WRAPPER_PaymentDetail.RejectAdditionalData rejectAdditionalData = new WRAPPER_PaymentDetail.RejectAdditionalData();
      rejectAdditionalData.subject = 'test';
      rejectAdditionalData.description = 'test';
      
      WRAPPER_PaymentDetail.ReviewAdditionalData reviewAdditionalData = new WRAPPER_PaymentDetail.ReviewAdditionalData();
      reviewAdditionalData.subject = 'test';
      reviewAdditionalData.description = 'test';
      
      String fxCountervalueId = 'test';
      String priceType = 'test';
      String valueDateEfx = 'test';
      Double customerExchangeRate = 10;
      WRAPPER_PaymentDetail.OperationNominalFxRollbackDetails operationNominalFxRollbackDetails = new WRAPPER_PaymentDetail.OperationNominalFxRollbackDetails
          (fxCountervalueId, priceType, ccyCountervalue, valueDateEfx, customerExchangeRate);
     WRAPPER_PaymentDetail.OperationNominalFxRollbackDetails operationNominalFxRollbackDetails_aux = new WRAPPER_PaymentDetail.OperationNominalFxRollbackDetails();

      
      WRAPPER_PaymentDetail.OperationFeesFxDetails operationFeesFxDetails = new WRAPPER_PaymentDetail.OperationFeesFxDetails();
      operationFeesFxDetails.fxCountervalueId = 'test';
      operationFeesFxDetails.priceType = 'test';
      operationFeesFxDetails.discount = 1;
      operationFeesFxDetails.ccyCountervalue = ccyCountervalue;
      operationFeesFxDetails.valueDateEfx = 'test';
      operationFeesFxDetails.customerExchangeRate = 10;
      
      WRAPPER_PaymentDetail.NominalAmountNoMarkUp nominalAmountNoMarkUp = new WRAPPER_PaymentDetail.NominalAmountNoMarkUp();
      nominalAmountNoMarkUp.amount = 10; 
      nominalAmountNoMarkUp.tcurrency='test';
      
      WRAPPER_PaymentDetail.OperationNominalFxDetails operationNominalFxDetails = new WRAPPER_PaymentDetail.OperationNominalFxDetails();
      operationNominalFxDetails.fxCountervalueId = 'test';
      operationNominalFxDetails.priceType = 'test';
      operationNominalFxDetails.discount = 10;
      operationNominalFxDetails.ccyCountervalue = ccyCountervalue;
      operationNominalFxDetails.valueDateEfx = 'test';
      operationNominalFxDetails.customerExchangeRate = 10;
      operationNominalFxDetails.fxComercialMargin = fxComercialMargin;
      operationNominalFxDetails.nominalAmountNoMarkUp = nominalAmountNoMarkUp;
      
      WRAPPER_PaymentDetail.RefundDetails refundDetails = new WRAPPER_PaymentDetail.RefundDetails();
      refundDetails.globalUserId = 'test';
      refundDetails.authUserId = 'test';
      refundDetails.authDate = 'test';
      refundDetails.authComments = 'test';
      refundDetails.creationDate = 'test';
      refundDetails.refundType = 'test';
      refundDetails.refundAmount = nominalAmountNoMarkUp;
      refundDetails.status = 'test';
      refundDetails.reason = 'test';
      refundDetails.comments = 'test';
      refundDetails.refundDate = 'test';
      refundDetails.operationFeesFxRefundDetails = operationFeesFxDetails; 
      refundDetails.operationNominalFxRefundDetails = operationNominalFxDetails;
      
      WRAPPER_PaymentDetail.SourceAgent sourceAgent = new WRAPPER_PaymentDetail.SourceAgent(); 
      sourceAgent.address = 'test';
      sourceAgent.agentId = 'test';
      sourceAgent.name ='test'; 
      
      WRAPPER_PaymentDetail.DestinationData destinationData = new  WRAPPER_PaymentDetail.DestinationData();
      destinationData.name = 'test';
      destinationData.customerId = 'test';
      destinationData.companyGlobalId = 'test';
      destinationData.destinationAddress = sourceAddress;
      destinationData.destinationAccount = sourceAccount;
      destinationData.destinationAgent = sourceAgent;
      destinationData.country = 'test';
      
      WRAPPER_PaymentDetail.SourceData sourceData = new WRAPPER_PaymentDetail.SourceData();
      sourceData.name = 'test';
      sourceData.customerId = 'test';
      sourceData.companyGlobalId = 'test';
      sourceData.sourceAddress = sourceAddress;
      sourceData.sourceAccount = sourceAccount;
      sourceData.sourceAgent = sourceAgent;
      sourceData.country = 'test';
      sourceData.parsedCountry = 'test';
      
      
      WRAPPER_PaymentDetail.OperationStep1Data operationStep1Data = new WRAPPER_PaymentDetail.OperationStep1Data();
      operationStep1Data.opStep1Id = 'test';
      operationStep1Data.status = 'test';
      operationStep1Data.valueDate = 'test';
      operationStep1Data.flowIndicator = 'test';
      operationStep1Data.intermediateAgentAccount = intermediateAgentAccount;
      
      WRAPPER_PaymentDetail.OperationStep2Data operationStep2Data= new WRAPPER_PaymentDetail.OperationStep2Data();
	  operationStep2Data.opStep2Id = 'test';
      operationStep2Data.status = 'test';
      operationStep2Data.valueDate = 'test';
      operationStep2Data.flowIndicator = 'test';
      operationStep2Data.intermediateAgentAccount = intermediateAgentAccount;
      
      
  
      WRAPPER_PaymentDetail.OperationDetail operationDetail = new WRAPPER_PaymentDetail.OperationDetail();
      
      operationDetail.operationType = 'test';
      operationDetail.productId = 'test';
      operationDetail.paymentMethod = 'test';
      operationDetail.serviceId = 'test';
      operationDetail.userGlobalId = 'test';
      operationDetail.operationStatus = operationStatus;
      operationDetail.operationStatusesHistorical = null;
      operationDetail.sourceData = sourceData; 
      operationDetail.destinationData = destinationData; 
      operationDetail.operationStep1Data = operationStep1Data; 
      operationDetail.operationStep2Data = operationStep2Data; 
      operationDetail.issueDate = 'test';
      operationDetail.chargeBearer = 'test';
      operationDetail.operationAmount = operationAmount; 
      operationDetail.operationAmountBaseCurrency = operationAmountBaseCurrency; 
      operationDetail.counterValueOperationAmount = counterValueOperationAmount;
      operationDetail.sourceTotalAmount = operationAmount;
      operationDetail.clientReference = 'test';
      operationDetail.purpose= 'test';
      operationDetail.comercialCode = 'test';
      operationDetail.operationDescription = 'test';
      operationDetail.subject = 'test';
      operationDetail.operationFraudDetails = operationFraudDetails; 
      operationDetail.operationNominalFxDetails = operationNominalFxDetails;
      operationDetail.operationFeesFxDetails = operationFeesFxDetails;
      operationDetail.operationNominalFxRollbackDetails = operationNominalFxRollbackDetails;
      operationDetail.pricingDetails = pricingDetails;
      operationDetail.paymentId = 'test';
      operationDetail.paymentStatus = 'test';
      operationDetail.parsedPaymentStatus = 'test';
      operationDetail.paymentReason = 'test';
      operationDetail.parsedPaymentReason = 'test';
      operationDetail.sourceAccount = 'test';
      operationDetail.sourceAlias = 'test';
      operationDetail.sourceAccountIdType = 'test';
      operationDetail.beneficiaryAccount = 'test';
      operationDetail.beneficiaryAccountIdType = 'test';
      operationDetail.beneficiaryAlias = 'test';
      operationDetail.amount = 10;
      operationDetail.paymentCurrency = 'test';
      operationDetail.valueDate = null;
      operationDetail.parsedValueDate = null;
      operationDetail.paymentMethod= 'test';
      operationDetail.parsedPaymentMethod= 'test';
      operationDetail.destinationCountry = 'test';
      operationDetail.parsedDestinationCountry = 'test';
      operationDetail.destinationBic = 'test';
      operationDetail.sourceBank = 'test';
      operationDetail.statusUpdateDate = 'test';
      operationDetail.fees = 'test';
      operationDetail.charges = 'test';
      operationDetail.sourceAccountHolder = 'test';
      operationDetail.sourceCountry = 'test';
      operationDetail.parsedSourceCountry = 'test';
      operationDetail.sourceBic = 'test';
      operationDetail.beneficiaryAccountHolder = 'test';
      operationDetail.beneficiaryBank ='test';
      operationDetail.beneficiarySwiftCode = 'test';
      operationDetail.sourceSwiftCode = 'test';
      operationDetail.paymentReference = 'test';
      operationDetail.fxFlag = true;
      operationDetail.parsedPurpose = 'test';
      operationDetail.sourceCurrency = 'test';
      operationDetail.beneficiaryCurrency = 'test';
      operationDetail.tradeAmount = 10; 
      operationDetail.feesCurrency = 'test'; 
      operationDetail.convertedAmount = 'test';
      operationDetail.convertedCurrency = 'test';
      operationDetail.totalAmount = 'test';
      operationDetail.commercialCode = 'test';
      operationDetail.comercialCode = 'test';
      operationDetail.parsedCommercialCode = 'test';
      operationDetail.sourceFeeData = sourceData; 
      operationDetail.statusUpdateUser = 'test';
      operationDetail.trackingStep = 'test';
      operationDetail.amountSend = 'test';
      operationDetail.amountReceive = 'test';
      operationDetail.addFees = true; 
      operationDetail.userDefinedAmount = 'test';
      operationDetail.draftDate = 'test';
      operationDetail.reviewAdditionalData = reviewAdditionalData;
      operationDetail.rejectAdditionalData = rejectAdditionalData;         
          
      WRAPPER_PaymentDetail.OperationResponse operationResponse = new WRAPPER_PaymentDetail.OperationResponse();
      operationResponse.operationDetail = operationDetail;
      operationResponse.refundDetails = refundDetails;
      WRAPPER_PaymentDetail wpd= new WRAPPER_PaymentDetail();
    }
}