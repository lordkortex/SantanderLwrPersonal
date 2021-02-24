/*
Author:         R. Cervino
Company:        Deloitte
Description:    Auxiliar Orchestation class
History:
<Date>          <Author>                <Description>
04/02/2021      R. Cervino              Initial version
09/02/2021      Candido                 Refactor with WRAPPER_PAY_PaymentDraft
*/
global class CNT_B2B_OrchestationUtilities {

    /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to compare the user input and the saved info. (Landing and Detail)
    History:
    <Date>          <Author>                <Description>
    04/02/2021      R. Cervino              Initial version
    */
    global static ReturnValue validateUserInput (WRAPPER_PaymentDetail.OperationDetail userDetail, String paymentId, WS_ExchangeRate.OUTPUT FXData, WS_ExchangeRate.OUTPUT FXDataFees) {
        Boolean valid = true;
        ReturnValue response = null;
        ReturnValue ret = CNT_PAY_PaymentOptions.getPaymentDetail(paymentId);
        if (ret.success && ret.value.get('paymentDetail') != null) {
            WRAPPER_PaymentDetail.OperationDetail savedDetail = (WRAPPER_PaymentDetail.OperationDetail)ret.value.get('paymentDetail');
            // Origin Account
            if (savedDetail.sourceData != null) {
                if (userDetail.sourceData != null) {
                    // Main data
                    if (savedDetail.sourceData.name != null) {
                        if (userDetail.sourceData.name != null) {
                            if (userDetail.sourceData.name != savedDetail.sourceData.name) {
                                valid = false;
                            }
                        } else {
                            valid = false;
                        }
                    }
                    if (savedDetail.sourceData.sourceAccount != null) {
                        if (savedDetail.sourceData.sourceAccount.accountId != null) {
                            if (userDetail.sourceData.sourceAccount.accountId != null) {
                                if (userDetail.sourceData.sourceAccount.accountId != savedDetail.sourceData.sourceAccount.accountId) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.sourceData.sourceAccount.accountType != null) {
                            if (userDetail.sourceData.sourceAccount.accountType != null) {
                                if (userDetail.sourceData.sourceAccount.accountType != savedDetail.sourceData.sourceAccount.accountType) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.sourceData.sourceAccount.tcurrency != null) {
                            if (userDetail.sourceData.sourceAccount.tcurrency != null) {
                                if (userDetail.sourceData.sourceAccount.tcurrency != savedDetail.sourceData.sourceAccount.tcurrency) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                    }
                    // Address
                    /* if (savedDetail.sourceData.sourceAddress != null) {
                        if (userDetail.sourceData.sourceAddress != null) {
                            if (savedDetail.sourceData.sourceAddress.streetName != null) {
                                if (userDetail.sourceData.sourceAddress.streetName != null) {
                                    if (userDetail.sourceData.sourceAddress.streetName != savedDetail.sourceData.sourceAddress.streetName) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                            if (savedDetail.sourceData.sourceAddress.townName != null) {
                                if (userDetail.sourceData.sourceAddress.townName != null) {
                                    if (userDetail.sourceData.sourceAddress.townName != savedDetail.sourceData.sourceAddress.townName) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                            if (savedDetail.sourceData.sourceAddress.country != null) {
                                if (userDetail.sourceData.sourceAddress.country != null) {
                                    if (userDetail.sourceData.sourceAddress.country != savedDetail.sourceData.sourceAddress.country) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                        } else {
                            valid = false;
                        }
                    } */
                    // Agent data
                    if (savedDetail.sourceData.sourceAgent != null) {
                        if (savedDetail.sourceData.sourceAgent.agentId != null) {
                            if (userDetail.sourceData.sourceAgent.agentId != null) {
                                if (userDetail.sourceData.sourceAgent.agentId != savedDetail.sourceData.sourceAgent.agentId) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.sourceData.sourceAgent.name != null) {
                            if (userDetail.sourceData.sourceAgent.name != null) {
                                if (userDetail.sourceData.sourceAgent.name  != savedDetail.sourceData.sourceAgent.name) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                    }
                } else {
                    valid = false;
                }
            }
            // Destination Account
            if (savedDetail.destinationData != null) {
                if (userDetail.destinationData != null) {
                    // Main data
                    if (savedDetail.destinationData.name != null) {
                        if (userDetail.destinationData.name != null) {
                            if (userDetail.destinationData.name != savedDetail.destinationData.name) {
                                valid = false;
                            }
                        } else {
                            valid = false;
                        }
                    }
                    if (savedDetail.destinationData.destinationAccount != null) {
                        if (savedDetail.destinationData.destinationAccount.accountId != null) {
                            if (userDetail.destinationData.destinationAccount.accountId != null) {
                                if (userDetail.destinationData.destinationAccount.accountId != savedDetail.destinationData.destinationAccount.accountId) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.destinationData.destinationAccount.accountType != null) {
                            if (userDetail.destinationData.destinationAccount.accountType != null) {
                                if (userDetail.destinationData.destinationAccount.accountType != savedDetail.destinationData.destinationAccount.accountType) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.destinationData.destinationAccount.tcurrency != null) {
                            if (userDetail.destinationData.destinationAccount.tcurrency != null) {
                                if (userDetail.destinationData.destinationAccount.tcurrency != savedDetail.destinationData.destinationAccount.tcurrency) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                    }
                    // Address
                    /* if (savedDetail.destinationData.destinationAddress != null) {
                        if (userDetail.destinationData.destinationAddress.streetName != null) {
                            if (savedDetail.destinationData.destinationAddress.streetName != null) {
                                if (userDetail.destinationData.destinationAddress.streetName != null) {
                                    if (userDetail.destinationData.destinationAddress.streetName != savedDetail.destinationData.destinationAddress.streetName) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                            if (savedDetail.destinationData.destinationAddress.townName != null) {
                                if (userDetail.destinationData.destinationAddress.townName != null) {
                                    if (userDetail.destinationData.destinationAddress.townName != savedDetail.destinationData.destinationAddress.townName) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                            if (savedDetail.destinationData.destinationAddress.country != null) {
                                if (userDetail.destinationData.destinationAddress.country != null) {
                                    if (userDetail.destinationData.destinationAddress.country != savedDetail.destinationData.destinationAddress.country) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                        } else {
                            valid = false;
                        }
                    } */
                    // Agent data
                    if (savedDetail.destinationData.destinationAgent != null) {
                        if (savedDetail.destinationData.destinationAgent.agentId != null) {
                            if (userDetail.destinationData.destinationAgent.agentId != null) {
                                if (userDetail.destinationData.destinationAgent.agentId != savedDetail.destinationData.destinationAgent.agentId) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.destinationData.destinationAgent.name != null) {
                            if (userDetail.destinationData.destinationAgent.name != null) {
                                if (userDetail.destinationData.destinationAgent.name  != savedDetail.destinationData.destinationAgent.name) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                    }
                } else {
                    valid = false;
                }
            }
            // Additional information
            if (savedDetail.subject != null) {
                if (userDetail.subject != null) {
                    if (userDetail.subject != savedDetail.subject) {
                        valid = false;
                    }
                } else {
                    valid = false;
                }
            }
            if (savedDetail.clientReference != null) {
                if (savedDetail.clientReference != null) {
                    if (userDetail.clientReference != savedDetail.clientReference) {
                        valid = false;
                    }
                } else {
                    valid = false;
                }
            }
            // Nominal Amount
            if (savedDetail.operationAmount != null) {
                if (userDetail.operationAmount.amount != null) {
                    if (userDetail.operationAmount.amount != savedDetail.operationAmount.amount) {
                        valid = false;
                    }
                } else {
                    valid = false;
                }
                if (userDetail.operationAmount.tcurrency != null) {
                    if (userDetail.operationAmount.tcurrency != savedDetail.operationAmount.tcurrency) {
                        valid = false;
                    }
                } else {
                    valid = false;
                }
            }
            if (savedDetail.counterValueOperationAmount != null) {
                if (userDetail.counterValueOperationAmount.amount != null) {
                    if (userDetail.counterValueOperationAmount.amount != savedDetail.counterValueOperationAmount.amount) {
                        valid = false;
                    }
                } else {
                    valid = false;
                }
                if (userDetail.counterValueOperationAmount.tcurrency != null) {
                    if (userDetail.counterValueOperationAmount.tcurrency != savedDetail.counterValueOperationAmount.tcurrency) {
                        valid = false;
                    }
                } else {
                    valid = false;
                }
            }
            // FX Nominal
            if (FXData != null && FXData.fxExchangeResponse != null && savedDetail.operationNominalFxDetails != null) {
                if (FXData.fxExchangeResponse.valueDateEfx != null && savedDetail.operationNominalFxDetails.valueDateEfx != null) {
                    if (FXData.fxExchangeResponse.valueDateEfx != savedDetail.operationNominalFxDetails.valueDateEfx) {
                         valid = false;
                    }
                }
                if (FXData.fxExchangeResponse.fxCountervalueId != null && savedDetail.operationNominalFxDetails.fxCountervalueId != null) {
                    if (FXData.fxExchangeResponse.fxCountervalueId != savedDetail.operationNominalFxDetails.fxCountervalueId) {
                        valid = false;
                    }
                }
                if (FXData.fxExchangeResponse.CcyCountervalue != null && savedDetail.operationNominalFxDetails.CcyCountervalue != null) {
                    if (FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount != null && savedDetail.operationNominalFxDetails.CcyCountervalue.ccyCountervalueAmount != null) {
                        if (FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount != String.valueOf(savedDetail.operationNominalFxDetails.CcyCountervalue.ccyCountervalueAmount)) {
                            valid = false;
                        }
                    }
                    if (FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != null && savedDetail.operationNominalFxDetails.CcyCountervalue.ccyCountervalueCurrency != null) {
                        if (FXData.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != savedDetail.operationNominalFxDetails.CcyCountervalue.ccyCountervalueCurrency) {
                            valid = false;
                        }
                    }
                }
                if (FXData.fxExchangeResponse.valueDateEfx != null && savedDetail.operationNominalFxDetails.valueDateEfx != null) {
                    if (FXData.fxExchangeResponse.valueDateEfx != savedDetail.operationNominalFxDetails.valueDateEfx) {
                         valid = false;
                    }
                }
                if (FXData.fxExchangeResponse.customerExchangeRate != null && savedDetail.operationNominalFxDetails.customerExchangeRate != null) {
                    if (FXData.fxExchangeResponse.customerExchangeRate != savedDetail.operationNominalFxDetails.customerExchangeRate) {
                        valid = false;
                    }
                }
                if (FXData.fxExchangeResponse.fxComercialMargin != null && savedDetail.operationNominalFxDetails.fxComercialMargin != null) {
                    if (FXData.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount != null && savedDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount != null) {
                        String fxMarginAmount = String.valueOf(FXData.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount);
                        String savedFxMarginAmount = String.valueOf(savedDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount);
                        if ((fxMarginAmount.length() - fxMarginAmount.indexOf('.') >= 5)  && (savedFxMarginAmount.length() - savedFxMarginAmount.indexOf('.') >= 5)) {
                            if (fxMarginAmount.subString(0,fxMarginAmount.indexOf('.')+5) != savedFxMarginAmount.subString(0,savedFxMarginAmount.indexOf('.')+5)) {
                                valid = false;
                            }
                        } else {
                            if (fxMarginAmount != savedFxMarginAmount) {
                                valid = false;
                            }
                        }
                    }
                    if (FXData.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency != null && savedDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency != null) {
                        if (FXData.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency != savedDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency) {
                            valid = false;
                        }
                    }
                }
            }
            // FX Fees
            if (FXDataFees != null && FXDataFees.fxExchangeResponse != null && savedDetail.operationNominalFxDetails != null) {
                if (FXDataFees.fxExchangeResponse.valueDateEfx != null && savedDetail.operationFeesFxDetails.valueDateEfx != null) {
                    if (FXDataFees.fxExchangeResponse.valueDateEfx != savedDetail.operationFeesFxDetails.valueDateEfx) {
                        valid = false;
                    }
                }
                if (FXDataFees.fxExchangeResponse.fxCountervalueId != null && savedDetail.operationFeesFxDetails.fxCountervalueId != null) {
                    if (FXDataFees.fxExchangeResponse.fxCountervalueId != savedDetail.operationFeesFxDetails.fxCountervalueId) {
                        valid = false;
                    }
                }
                if (FXDataFees.fxExchangeResponse.CcyCountervalue != null && savedDetail.operationFeesFxDetails.CcyCountervalue != null) {
                    if (FXDataFees.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount != null && savedDetail.operationFeesFxDetails.CcyCountervalue.ccyCountervalueAmount != null) {
                        if (FXDataFees.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount != String.valueOf(savedDetail.operationFeesFxDetails.CcyCountervalue.ccyCountervalueAmount)) {
                            valid = false;
                        }
                    }
                    if (FXDataFees.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != null && savedDetail.operationFeesFxDetails.CcyCountervalue.ccyCountervalueCurrency != null) {
                        if (FXDataFees.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != savedDetail.operationFeesFxDetails.CcyCountervalue.ccyCountervalueCurrency) {
                            valid = false;
                        }
                    }
                }
                if (FXDataFees.fxExchangeResponse.valueDateEfx != null && savedDetail.operationFeesFxDetails.valueDateEfx != null) {
                    if (FXDataFees.fxExchangeResponse.valueDateEfx != savedDetail.operationFeesFxDetails.valueDateEfx) {
                        valid = false;
                    }
                }
                if (FXDataFees.fxExchangeResponse.customerExchangeRate != null && savedDetail.operationFeesFxDetails.customerExchangeRate != null) {
                    if (FXDataFees.fxExchangeResponse.customerExchangeRate != savedDetail.operationFeesFxDetails.customerExchangeRate) {
                        valid = false;
                    }
                }
            }
            // Prices Data
            if (userDetail.pricingDetails != null && savedDetail.pricingDetails != null) {
                if (userDetail.pricingDetails.productName != null && savedDetail.pricingDetails.productName != null) {
                    if (userDetail.pricingDetails.productName != savedDetail.pricingDetails.productName) {
                        valid = false;
                    }
                }
                if (userDetail.pricingDetails.totalPrice != null && savedDetail.pricingDetails.totalPrice != null) {
                    if (userDetail.pricingDetails.totalPrice != savedDetail.pricingDetails.totalPrice) {
                        valid = false;
                    }
                }
                if (userDetail.pricingDetails.tcurrency != null && savedDetail.pricingDetails.tcurrency != null) {
                    if (userDetail.pricingDetails.tcurrency != savedDetail.pricingDetails.tcurrency) {
                        valid = false;
                    }
                }
                if (userDetail.pricingDetails.currencyList != null && !userDetail.pricingDetails.currencyList.isEmpty() && savedDetail.pricingDetails.currencyList != null && !savedDetail.pricingDetails.currencyList.isEmpty()) {
                    userDetail.pricingDetails.currencyList.sort();
                    savedDetail.pricingDetails.currencyList.sort();
                    if (userDetail.pricingDetails.currencyList.size() != savedDetail.pricingDetails.currencyList.size()) {
                        valid = false;
                    } else {
                        for (Integer i = 0; i < userDetail.pricingDetails.currencyList.size(); i++) {
                            if (userDetail.pricingDetails.currencyList[i] != null && savedDetail.pricingDetails.currencyList[i] != null) {
                                if (userDetail.pricingDetails.currencyList[i].tcurrency != null && savedDetail.pricingDetails.currencyList[i].tcurrency != null) {
                                    if (userDetail.pricingDetails.currencyList[i].tcurrency != savedDetail.pricingDetails.currencyList[i].tcurrency) {
                                        valid = false;
                                    }
                                }
                                if (userDetail.pricingDetails.currencyList[i].currencyName != null && savedDetail.pricingDetails.currencyList[i].currencyName != null) {
                                    if (userDetail.pricingDetails.currencyList[i].currencyName != savedDetail.pricingDetails.currencyList[i].currencyName) {
                                        valid = false;
                                    }
                                }
                                // Concepts
                                if (userDetail.pricingDetails.currencyList[i].conceptsList != null && !userDetail.pricingDetails.currencyList[i].conceptsList.isEmpty() && savedDetail.pricingDetails.currencyList[i].conceptsList != null && !savedDetail.pricingDetails.currencyList[i].conceptsList.isEmpty()) {
                                    userDetail.pricingDetails.currencyList[i].conceptsList.sort();
                                    savedDetail.pricingDetails.currencyList[i].conceptsList.sort();
                                    if (userDetail.pricingDetails.currencyList[i].conceptsList.size() != savedDetail.pricingDetails.currencyList[i].conceptsList.size()) {
                                        valid = false;
                                    } else {
                                         for (Integer j = 0; j < userDetail.pricingDetails.currencyList[i].conceptsList.size(); j++) {
                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j] != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j] != null) {
                                                if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptId != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptId != null) {
                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptId != savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptId) {
                                                        valid = false;
                                                    }
                                                }
                                                if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptName != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptName != null) {
                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptName != savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptName) {
                                                        valid = false;
                                                    }
                                                }
                                                if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount != null) {
                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.amount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.amount != null) {
                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.amount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.amount) {
                                                            valid = false;
                                                        }
                                                    }
                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.tcurrency != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.tcurrency != null) {
                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.tcurrency != savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.tcurrency){
                                                            valid = false;
                                                        }
                                                    }
                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.fixing != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.fixing != null) {
                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.fixing != savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.fixing) {
                                                            valid = false;
                                                        }
                                                    }
                                                 }
                                                 // Special prices
                                                 if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice != null) {
                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialPriceLevel != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialPriceLevel != null) {
                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialPriceLevel != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialPriceLevel) {
                                                            valid = false;
                                                        }
                                                    }
                                                    // TierList
                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList != null && !userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.isEmpty() && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList != null && !savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.isEmpty()) {
                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.size() != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.size()) {
                                                            valid = false;
                                                        } else {
                                                             for (Integer k = 0; k < userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.size(); k++) {
                                                                if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k] != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k] != null) {
                                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTier != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTier != null) {
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTier != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTier) {
                                                                            valid = false;
                                                                        }
                                                                    }
                                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTierType != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTierType != null) {
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTierType != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTierType) {
                                                                            valid = false;
                                                                        }
                                                                    }
                                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice != null) {
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.tcurrency != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.tcurrency != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.tcurrency != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.tcurrency) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialRate != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialRate != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialRate != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialRate) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMinimumAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMinimumAmount != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMinimumAmount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMinimumAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMaximumAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMaximumAmount != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMaximumAmount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMaximumAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                    }
                                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice != null) {
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.tcurrency != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.tcurrency != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.tcurrency != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.tcurrency){
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.specialFixedAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.specialFixedAmount != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.specialFixedAmount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.specialFixedAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                // Standard prices
                                                if(userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice != null) {
                                                    // TierList
                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList != null && !userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList.isEmpty() && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList != null && !savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.isEmpty()) {
                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList.size() != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList.size()) {
                                                            valid = false;
                                                        } else {
                                                             for (Integer k = 0; k < userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList.size(); k++) {
                                                                if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k] != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k] != null) {
                                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTier != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTier != null) {
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTier != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTier) {
                                                                            valid = false;
                                                                        }
                                                                    }
                                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTierType != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTierType != null) {
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTierType != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTierType) {
                                                                            valid = false;
                                                                        }
                                                                    }
                                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice != null) {
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.tcurrency != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.tcurrency != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.tcurrency != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.tcurrency) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardRate  != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardRate != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardRate  != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardRate) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMinimumAmount  != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMinimumAmount != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMinimumAmount  != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMinimumAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMaximumAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMaximumAmount != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMaximumAmount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMaximumAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                    }
                                                                    if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice != null) {
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.tcurrency != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.tcurrency != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.tcurrency != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.tcurrency){
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.standardFixedAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.standardFixedAmount != null) {
                                                                            if (userDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.standardFixedAmount  != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.standardFixedAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (valid == false) {
                response = new ReturnValue(false, 'The input data is different from the saved data');
                CNT_B2B_OrchestationUtilities.blockUser('');
            } else {
                response = new ReturnValue(true);
            }
        } else {
            response = new ReturnValue(false, 'The data comparison failed');
        }
        return response;
    }

    /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to compare the user input and the saved info. (Landing and Detail)
    History:
    <Date>          <Author>                <Description>
    04/02/2021      R. Cervino              Initial version
    09/02/2021      Candido                 Refactor with WRAPPER_PAY_PaymentDraft
    */
    global static ReturnValue validateUserInput (WRAPPER_PAY_PaymentDraft paymentDraft) {
        Boolean valid = true;
        ReturnValue response = null;
        ReturnValue ret = CNT_PAY_PaymentOptions.getPaymentDetail(paymentDraft.paymentId);
        if (ret.success && ret.value.get('paymentDetail') != null) {
            WRAPPER_PaymentDetail.OperationDetail savedDetail = (WRAPPER_PaymentDetail.OperationDetail) ret.value.get('paymentDetail');
            // Origin Account
            WRAPPER_AccountList.AccountDetails sourceAccount = paymentDraft.sourceAccount;
            if (savedDetail.sourceData != null) {
                if (sourceAccount != null) {
                    // Main data
                    if (savedDetail.sourceData.name != null) {
                        if (sourceAccount.subsidiaryName != null) {
                            if (sourceAccount.subsidiaryName != savedDetail.sourceData.name) {
                                valid = false;
                            }
                        } else {
                            valid = false;
                        }
                    }
                    if (savedDetail.sourceData.sourceAccount != null) {
                        if (savedDetail.sourceData.sourceAccount.accountId != null) {
                            if (sourceAccount.displayNumber != null) {
                                if (sourceAccount.displayNumber != savedDetail.sourceData.sourceAccount.accountId) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.sourceData.sourceAccount.accountType != null) {
                            if (sourceAccount.idType != null) {
                                if (sourceAccount.idType != savedDetail.sourceData.sourceAccount.accountType) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.sourceData.sourceAccount.tcurrency != null) {
                            if (sourceAccount.currencyCodeAvailableBalance != null) {
                                if (sourceAccount.currencyCodeAvailableBalance != savedDetail.sourceData.sourceAccount.tcurrency) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                    }
                    // Address
                    /* if (savedDetail.sourceData.sourceAddress != null) {
                        if (sourceAccount.address != null) {
                            if (savedDetail.sourceData.sourceAddress.streetName != null) {
                                if (sourceAccount.address.streetName != null) {
                                    if (sourceAccount.address.streetName != savedDetail.sourceData.sourceAddress.streetName) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                            if (savedDetail.sourceData.sourceAddress.townName != null) {
                                if (sourceAccount.address.townName != null) {
                                    if (sourceAccount.address.townName != savedDetail.sourceData.sourceAddress.townName) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                            if (savedDetail.sourceData.sourceAddress.country != null) {
                                if (sourceAccount.address.country != null) {
                                    if (sourceAccount.address.country != savedDetail.sourceData.sourceAddress.country) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                        } else {
                            valid = false;
                        }
                    } */
                    // Agent data
                    if (savedDetail.sourceData.sourceAgent != null) {
                        if (savedDetail.sourceData.sourceAgent.agentId != null) {
                            if (sourceAccount.codigoBic != null) {
                                if (sourceAccount.codigoBic != savedDetail.sourceData.sourceAgent.agentId) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.sourceData.sourceAgent.name != null) {
                            if (sourceAccount.bankName != null) {
                                if (sourceAccount.bankName  != savedDetail.sourceData.sourceAgent.name) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                    }
                } else {
                    valid = false;
                }
            }
            // Destination Account
            WRAPPER_AccountList.AccountDetails destinationAccount = paymentDraft.destinationAccount;
            if (savedDetail.destinationData != null) {
                if (destinationAccount != null) {
                    // Main data
                    if (savedDetail.destinationData.name != null) {
                        if (destinationAccount.subsidiaryName != null) {
                            if (destinationAccount.subsidiaryName != savedDetail.destinationData.name) {
                                valid = false;
                            }
                        } else {
                            valid = false;
                        }
                    }
                    if (savedDetail.destinationData.destinationAccount != null) {
                        if (savedDetail.destinationData.destinationAccount.accountId != null) {
                            if (destinationAccount.displayNumber != null) {
                                if (destinationAccount.displayNumber != savedDetail.destinationData.destinationAccount.accountId) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.destinationData.destinationAccount.accountType != null) {
                            if (destinationAccount.idType != null) {
                                if (destinationAccount.idType != savedDetail.destinationData.destinationAccount.accountType) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.destinationData.destinationAccount.tcurrency != null) {
                            if (destinationAccount.currencyCodeAvailableBalance != null) {
                                if (destinationAccount.currencyCodeAvailableBalance != savedDetail.destinationData.destinationAccount.tcurrency) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                    }
                    // Address
                    /* if (savedDetail.destinationData.destinationAddress != null) {
                        if (destinationAccount.address != null) {
                            if (savedDetail.destinationData.destinationAddress.streetName != null) {
                                if (destinationAccount.address.streetName != null) {
                                    if (destinationAccount.address.streetName != savedDetail.destinationData.destinationAddress.streetName) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                            if (savedDetail.destinationData.destinationAddress.townName != null) {
                                if (destinationAccount.address.townName != null) {
                                    if (destinationAccount.address.townName != savedDetail.destinationData.destinationAddress.townName) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                            if (savedDetail.destinationData.destinationAddress.country != null) {
                                if (destinationAccount.address.country != null) {
                                    if (destinationAccount.address.country != savedDetail.destinationData.destinationAddress.country) {
                                        valid = false;
                                    }
                                } else {
                                    valid = false;
                                }
                            }
                        } else {
                            valid = false;
                        }
                    } */
                    // Agent data
                    if (savedDetail.destinationData.destinationAgent != null) {
                        if (savedDetail.destinationData.destinationAgent.agentId != null) {
                            if (destinationAccount.codigoBic != null) {
                                if (destinationAccount.codigoBic != savedDetail.destinationData.destinationAgent.agentId) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                        if (savedDetail.destinationData.destinationAgent.name != null) {
                            if (destinationAccount.bankName != null) {
                                if (destinationAccount.bankName  != savedDetail.destinationData.destinationAgent.name) {
                                    valid = false;
                                }
                            } else {
                                valid = false;
                            }
                        }
                    }
                } else {
                    valid = false;
                }
            }
            // Additional Information
            if (savedDetail.subject != null) {
                if (paymentDraft.description != null) {
                    if (paymentDraft.description != savedDetail.subject) {
                        valid = false;
                    }
                } else {
                    valid = false;
                }
            }
            if (savedDetail.clientReference != null) {
                if (paymentDraft.reference != null) {
                    if (paymentDraft.reference != savedDetail.clientReference) {
                        valid = false;
                    }
                } else {
                    valid = false;
                }
            }
            // Nominal Amount
            if (sourceAccount.currencyCodeMainBalance == destinationAccount.currencyCodeMainBalance) {
                if (savedDetail.operationAmount != null) {
                    if (paymentDraft.amountSend != Decimal.valueOf(savedDetail.operationAmount.amount)) {
                        valid = false;
                    }
                    if (sourceAccount.currencyCodeAvailableBalance != savedDetail.operationAmount.tcurrency) {
                        valid = false;
                    }
                }
            } else {
                if (savedDetail.counterValueOperationAmount != null) {
                    if (paymentDraft.amountSend != Decimal.valueOf(savedDetail.counterValueOperationAmount.amount)) {
                        valid = false;
                    }
                    if (sourceAccount.currencyCodeAvailableBalance != savedDetail.counterValueOperationAmount.tcurrency) {
                        valid = false;
                    }
                } else if (savedDetail.operationAmount != null) {
                    if (paymentDraft.amountReceive != Decimal.valueOf(savedDetail.operationAmount.amount)) {
                        valid = false;
                    }
                    if (destinationAccount.currencyCodeAvailableBalance != savedDetail.operationAmount.tcurrency) {
                        valid = false;
                    }
                }
            }
            // FX Nominal
            WS_ExchangeRate.OUTPUT fxNominal = paymentDraft.exchangeRateServiceResponse;
            if (fxNominal != null && fxNominal.fxExchangeResponse != null && savedDetail.operationNominalFxDetails != null) {
                if (fxNominal.fxExchangeResponse.valueDateEfx != null && savedDetail.operationNominalFxDetails.valueDateEfx != null) {
                    if (fxNominal.fxExchangeResponse.valueDateEfx != savedDetail.operationNominalFxDetails.valueDateEfx) {
                        valid = false;
                    }
                }
                if (fxNominal.fxExchangeResponse.fxCountervalueId != null && savedDetail.operationNominalFxDetails.fxCountervalueId != null) {
                    if (fxNominal.fxExchangeResponse.fxCountervalueId != savedDetail.operationNominalFxDetails.fxCountervalueId) {
                        valid = false;
                    }
                }
                if (fxNominal.fxExchangeResponse.CcyCountervalue != null && savedDetail.operationNominalFxDetails.CcyCountervalue != null) {
                    if (fxNominal.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount != null && savedDetail.operationNominalFxDetails.CcyCountervalue.ccyCountervalueAmount != null) {
                        if (fxNominal.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount != String.valueOf(savedDetail.operationNominalFxDetails.CcyCountervalue.ccyCountervalueAmount)) {
                            valid = false;
                        }
                    }
                    if (fxNominal.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != null && savedDetail.operationNominalFxDetails.CcyCountervalue.ccyCountervalueCurrency != null) {
                        if (fxNominal.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != savedDetail.operationNominalFxDetails.CcyCountervalue.ccyCountervalueCurrency) {
                            valid = false;
                        }
                    }
                }
                if (fxNominal.fxExchangeResponse.valueDateEfx != null && savedDetail.operationNominalFxDetails.valueDateEfx != null) {
                    if (fxNominal.fxExchangeResponse.valueDateEfx != savedDetail.operationNominalFxDetails.valueDateEfx) {
                        valid = false;
                    }
                }
                if (fxNominal.fxExchangeResponse.customerExchangeRate != null && savedDetail.operationNominalFxDetails.customerExchangeRate != null) {
                    if (fxNominal.fxExchangeResponse.customerExchangeRate != savedDetail.operationNominalFxDetails.customerExchangeRate) {
                        valid = false;
                    }
                }
                if (fxNominal.fxExchangeResponse.fxComercialMargin != null && savedDetail.operationNominalFxDetails.fxComercialMargin != null) {
                    if (fxNominal.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount != null && savedDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount != null) {
                        String fxMarginAmount = String.valueOf(fxNominal.fxExchangeResponse.fxComercialMargin.fxComercialMarginAmount);
                        String savedFxMarginAmount = String.valueOf(savedDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginAmount);
                        if ((fxMarginAmount.length() - fxMarginAmount.indexOf('.') >= 5) && (savedFxMarginAmount.length() - savedFxMarginAmount.indexOf('.') >= 5)) {
                            if (fxMarginAmount.subString(0,fxMarginAmount.indexOf('.')+5) != savedFxMarginAmount.subString(0,savedFxMarginAmount.indexOf('.')+5)) {
                                valid = false;
                            }
                        } else {
                            if (fxMarginAmount != savedFxMarginAmount) {
                                valid = false;
                            }
                        }
                    }
                    if (fxNominal.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency != null && savedDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency != null) {
                        if (fxNominal.fxExchangeResponse.fxComercialMargin.fxComercialMarginCurrency != savedDetail.operationNominalFxDetails.fxComercialMargin.fxComercialMarginCurrency) {
                            valid = false;
                        }
                    }
                }
            }
            // FX Fees
            WS_ExchangeRate.OUTPUT fxFees = paymentDraft.convertedTransactionFeeServiceResponse;
            if (fxFees != null && fxFees.fxExchangeResponse != null && savedDetail.operationNominalFxDetails != null) {
                if (fxFees.fxExchangeResponse.valueDateEfx != null && savedDetail.operationFeesFxDetails.valueDateEfx != null) {
                    if (fxFees.fxExchangeResponse.valueDateEfx != savedDetail.operationFeesFxDetails.valueDateEfx) {
                        valid = false;
                    }
                }
                if (fxFees.fxExchangeResponse.fxCountervalueId != null && savedDetail.operationFeesFxDetails.fxCountervalueId != null) {
                    if (fxFees.fxExchangeResponse.fxCountervalueId != savedDetail.operationFeesFxDetails.fxCountervalueId) {
                        valid = false;
                    }
                }
                if (fxFees.fxExchangeResponse.CcyCountervalue != null && savedDetail.operationFeesFxDetails.CcyCountervalue != null) {
                    if (fxFees.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount != null && savedDetail.operationFeesFxDetails.CcyCountervalue.ccyCountervalueAmount != null) {
                        if (fxFees.fxExchangeResponse.CcyCountervalue.ccyCountervalueAmount != String.valueOf(savedDetail.operationFeesFxDetails.CcyCountervalue.ccyCountervalueAmount)) {
                            valid = false;
                        }
                    }
                    if (fxFees.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != null && savedDetail.operationFeesFxDetails.CcyCountervalue.ccyCountervalueCurrency != null) {
                        if (fxFees.fxExchangeResponse.CcyCountervalue.ccyCountervalueCurrency != savedDetail.operationFeesFxDetails.CcyCountervalue.ccyCountervalueCurrency) {
                            valid = false;
                        }
                    }
                }
                if (fxFees.fxExchangeResponse.valueDateEfx != null && savedDetail.operationFeesFxDetails.valueDateEfx != null) {
                    if (fxFees.fxExchangeResponse.valueDateEfx != savedDetail.operationFeesFxDetails.valueDateEfx) {
                        valid = false;
                    }
                }
                if (fxFees.fxExchangeResponse.customerExchangeRate != null && savedDetail.operationFeesFxDetails.customerExchangeRate != null) {
                    if (fxFees.fxExchangeResponse.customerExchangeRate != savedDetail.operationFeesFxDetails.customerExchangeRate) {
                        valid = false;
                    }
                }
            }
            // Pricing
            WS_TransferFees.OUTPUT pricingDetails = paymentDraft.transactionFeeServiceResponse;
            if (pricingDetails != null && savedDetail.pricingDetails != null) {
                if (pricingDetails.productName != null && savedDetail.pricingDetails.productName != null) {
                    if (pricingDetails.productName != savedDetail.pricingDetails.productName) {
                        valid = false;
                    }
                }
                if (pricingDetails.currencyList != null && !pricingDetails.currencyList.isEmpty() && savedDetail.pricingDetails.currencyList != null && !savedDetail.pricingDetails.currencyList.isEmpty()) {
                    pricingDetails.currencyList.sort();
                    savedDetail.pricingDetails.currencyList.sort();
                    if (pricingDetails.currencyList.size() != savedDetail.pricingDetails.currencyList.size()) {
                        valid = false;
                    } else {
                        for (Integer i = 0; i < pricingDetails.currencyList.size(); i++) {
                            if (pricingDetails.currencyList[i] != null && savedDetail.pricingDetails.currencyList[i] != null) {
                                if (pricingDetails.currencyList[i].tcurrency != null && savedDetail.pricingDetails.currencyList[i].tcurrency != null) {
                                    if (pricingDetails.currencyList[i].tcurrency != savedDetail.pricingDetails.currencyList[i].tcurrency) {
                                        valid = false;
                                    }
                                }
                                if (pricingDetails.currencyList[i].currencyName != null && savedDetail.pricingDetails.currencyList[i].currencyName != null) {
                                    if (pricingDetails.currencyList[i].currencyName != savedDetail.pricingDetails.currencyList[i].currencyName) {
                                        valid = false;
                                    }
                                }
                                // Concepts
                                if (pricingDetails.currencyList[i].conceptsList != null && !pricingDetails.currencyList[i].conceptsList.isEmpty() && savedDetail.pricingDetails.currencyList[i].conceptsList != null && !savedDetail.pricingDetails.currencyList[i].conceptsList.isEmpty()) {
                                    pricingDetails.currencyList[i].conceptsList.sort();
                                    savedDetail.pricingDetails.currencyList[i].conceptsList.sort();
                                    if (pricingDetails.currencyList[i].conceptsList.size() != savedDetail.pricingDetails.currencyList[i].conceptsList.size()) {
                                        valid = false;
                                    } else {
                                        for (Integer j = 0; j < pricingDetails.currencyList[i].conceptsList.size(); j++) {
                                            if (pricingDetails.currencyList[i].conceptsList[j] != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j] != null) {
                                                if (pricingDetails.currencyList[i].conceptsList[j].conceptId != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptId != null) {
                                                    if (pricingDetails.currencyList[i].conceptsList[j].conceptId != savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptId) {
                                                        valid = false;
                                                    }
                                                }
                                                if (pricingDetails.currencyList[i].conceptsList[j].conceptName != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptName != null) {
                                                    if(pricingDetails.currencyList[i].conceptsList[j].conceptName != savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptName){
                                                        valid = false;
                                                    }
                                                }
                                                if (pricingDetails.currencyList[i].conceptsList[j].conceptAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount != null) {
                                                    if (pricingDetails.currencyList[i].conceptsList[j].conceptAmount.amount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.amount != null) {
                                                        if (pricingDetails.currencyList[i].conceptsList[j].conceptAmount.amount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.amount) {
                                                            valid = false;
                                                        }
                                                    }
                                                    if (pricingDetails.currencyList[i].conceptsList[j].conceptAmount.tcurrency != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.tcurrency != null) {
                                                        if (pricingDetails.currencyList[i].conceptsList[j].conceptAmount.tcurrency != savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.tcurrency) {
                                                            valid = false;
                                                        }
                                                    }
                                                    if (pricingDetails.currencyList[i].conceptsList[j].conceptAmount.fixing != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.fixing != null) {
                                                        if (pricingDetails.currencyList[i].conceptsList[j].conceptAmount.fixing != savedDetail.pricingDetails.currencyList[i].conceptsList[j].conceptAmount.fixing) {
                                                            valid = false;
                                                        }
                                                    }
                                                }
                                                // Special prices
                                                if (pricingDetails.currencyList[i].conceptsList[j].specialPrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice != null) {
                                                    if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialPriceLevel  != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialPriceLevel != null) {
                                                        if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialPriceLevel != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialPriceLevel) {
                                                            valid = false;
                                                        }
                                                    }
                                                    // TierList
                                                    if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList != null && !pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.isEmpty() && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList != null && !savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.isEmpty()) {
                                                        if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.size() != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.size()) {
                                                            valid = false;
                                                        } else {
                                                             for (Integer k = 0; k < pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.size(); k++) {
                                                                if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k] != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k] != null) {
                                                                    if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTier != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTier != null) {
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTier != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTier) {
                                                                            valid = false;
                                                                        }
                                                                    }
                                                                    if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTierType != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTierType != null) {
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTierType != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialAmountTierType) {
                                                                            valid = false;
                                                                        }
                                                                    }
                                                                    if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice != null) {
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.tcurrency != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.tcurrency != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.tcurrency != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.tcurrency) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialRate != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialRate != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialRate != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialRate) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMinimumAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMinimumAmount != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMinimumAmount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMinimumAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMaximumAmount  != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMaximumAmount != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMaximumAmount  != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedRatePrice.specialMaximumAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                    }
                                                                    if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice != null) {
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.tcurrency != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.tcurrency != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.tcurrency != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.tcurrency) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.specialFixedAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.specialFixedAmount != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.specialFixedAmount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList[k].specialFixedAmountPrice.specialFixedAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                // Standard prices
                                                if (pricingDetails.currencyList[i].conceptsList[j].standardPrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice != null) {
                                                    // TierList
                                                    if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList != null && !pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList.isEmpty() && savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList != null && !savedDetail.pricingDetails.currencyList[i].conceptsList[j].specialPrice.specialTiersList.isEmpty()) {
                                                        if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList.size() != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList.size()) {
                                                            valid = false;
                                                        } else {
                                                             for (Integer k = 0; k < pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList.size(); k++) {
                                                                if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k] != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k] != null) {
                                                                    if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTier != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTier != null) {
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTier != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTier) {
                                                                            valid = false;
                                                                        }
                                                                    }
                                                                    if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTierType != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTierType != null) {
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTierType != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardAmountTierType) {
                                                                            valid = false;
                                                                        }
                                                                    }
                                                                    if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice != null) {
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.tcurrency != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.tcurrency != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.tcurrency != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.tcurrency) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardRate != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardRate != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardRate != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardRate) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMinimumAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMinimumAmount != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMinimumAmount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMinimumAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMaximumAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMaximumAmount != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMaximumAmount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedRatePrice.standardMaximumAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                    }
                                                                    if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice != null) {
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.tcurrency != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.tcurrency != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.tcurrency != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.tcurrency) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                        if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.standardFixedAmount != null && savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.standardFixedAmount != null) {
                                                                            if (pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.standardFixedAmount != savedDetail.pricingDetails.currencyList[i].conceptsList[j].standardPrice.standardTiersList[k].standardFixedAmountPrice.standardFixedAmount) {
                                                                                valid = false;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (valid == false) {
                response = new ReturnValue(false, 'The input data is different from the saved data');
                CNT_B2B_OrchestationUtilities.blockUser('');
            } else {
                response = new ReturnValue(true);
            }
        } else {
            response = new ReturnValue(false, 'The data comparison failed');
        }
        return response;
    }

    global static void blockUser (String userId) {
        /* if (userId=='') {
            userId=UserInfo.getUserId();
        }
        List<User> user = new List<User>([
            SELECT Id, Name, isActive 
            FROM User
            WHERE id = :userId
        LIMIT 1
        ]);
        if (!user.isEmpty()) {
            user[0].isActive = false;
            update user[0];
        }
        List<UserLogin> userLogin = new List<UserLogin>([
            SELECT Id, IsFrozen, UserId
            FROM UserLogin
            WHERE UserId = :userId
            LIMIT 1
        ]);
        if (!userLogin.isEmpty()) {
            userLogin[0].isFrozen = true;
            update userLogin[0];
        }
        update(users); */
    }
}