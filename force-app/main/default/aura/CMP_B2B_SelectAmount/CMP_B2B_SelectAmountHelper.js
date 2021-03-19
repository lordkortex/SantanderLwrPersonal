({
  //$Label.c.EUR
  //$Label.c.GBP
  //$Label.c.CNF_payment_productId_001
  completeStep: function (component, event, helper) {
    var completeStep = component.getEvent("completeStep");
    completeStep.setParams({
      confirm: true
    });
    completeStep.fire();
  },

  /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Handles amount change and makes call to currency conversion based on which input field the user usede to change the amount
    History:
    <Date>          <Author>            <Description>
    2020            Bea Hill            Initial version
    09/11/2020      Bea Hill            Set the attribute amountEnteredFrom
    19/02/2021		Shahad Naji			Do not set values in paymentDraft.timestamp and paymentDraft.exchangeRate
    */
  handleChangeAmount: function (
    component,
    event,
    helper,
    amount,
    amountEnteredFrom
  ) {
    var isEditing = component.get("v.isEditing");
    let paymentDraft = component.get("v.paymentDraft");
    if (!$A.util.isEmpty(amount)) {
      new Promise(
        $A.getCallback(function (resolve, reject) {
          component.set("v.disabledContinue", false);
          component.set("v.spinner", true);
          component.set("v.errorMSG", "");
          component.set("v.convertedAmount", "");
          //SNJ_DEPRECATED: DELETE THE NEXT TWO LINES OF CODE  paymentDraft.timestamp and paymentDraft.exchangeRate
          //paymentDraft.timestamp = '';
          //paymentDraft.exchangeRate = 0;
          if (amountEnteredFrom.localeCompare("source") == 0) {
            paymentDraft.amountSend = amount;
            paymentDraft.fromOrigin = true;
            if (!isEditing) {
              paymentDraft.amountReceive = null;
            }
          } else if (amountEnteredFrom.localeCompare("recipient") == 0) {
            paymentDraft.amountSend = null;
            paymentDraft.fromOrigin = false;
            if (!isEditing) {
              paymentDraft.amountReceive = amount;
            }
          }
          paymentDraft.amountEnteredFrom = amountEnteredFrom;
          component.set("v.paymentDraft", paymentDraft);
          resolve("Ok");
        }),
        this
      )
        .then(
          $A.getCallback(function (value) {
            if (
              paymentDraft.sourceAccount.currencyCodeAvailableBalance.localeCompare(
                paymentDraft.destinationAccount.currencyCodeAvailableBalance
              ) != 0
            ) {
              return helper.getExchangeRate(component, helper, "I");
            } else {
              return Promise.resolve("OK");
            }
          })
        )
        .then(
          $A.getCallback(function (value) {
            if (amountEnteredFrom.localeCompare("recipient") == 0) {
              if (
                paymentDraft.sourceAccount.currencyCodeAvailableBalance.localeCompare(
                  paymentDraft.destinationAccount.currencyCodeAvailableBalance
                ) != 0
              ) {
                var convertedAmount = component.get("v.convertedAmount");
                if (!$A.util.isEmpty(convertedAmount)) {
                  let paymentDraft = component.get("v.paymentDraft");
                  paymentDraft.amountSend = convertedAmount;
                  component.set("v.paymentDraft", paymentDraft);
                }
              }
            }
            return helper.checkBalance(component, event, helper);
          })
        )
        .then(
          $A.getCallback(function (value) {
            return helper.getLimits(component, helper);
          })
        )
        .catch(
          $A.getCallback(function (error) {
            console.log(error);
            component.set("v.disabledContinue", true);
          })
        )
        .finally(
          $A.getCallback(function () {
            let paymentDraft = component.get("v.paymentDraft");
            let converted = component.get("v.convertedAmount");
            if (!$A.util.isEmpty(converted)) {
              if (amountEnteredFrom.localeCompare("source") == 0) {
                paymentDraft.amountReceive = converted;
              } else if (amountEnteredFrom.localeCompare("recipient") == 0) {
                paymentDraft.amountSend = converted;
              }
            }
            component.set("v.paymentDraft", paymentDraft);
            component.set("v.spinner", false);
          })
        );
    } else {
      component.set("v.errorMSG", "");
    }
  },

  getExchangeRate: function (component, helper, requestType) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        var notificationTitle = $A.get("$Label.c.B2B_Error_Problem_Loading");
        var bodyText = $A.get("$Label.c.B2B_Error_Enter_Amount");
        var action = component.get("c.getExchangeRate");
        action.setParams({
          paymentDraft: paymentDraft
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var stateRV = actionResult.getReturnValue();
            if (stateRV.success) {
              let paymentDraft = component.get("v.paymentDraft");
              if (!$A.util.isEmpty(stateRV.value.exchangeRate)) {
                paymentDraft.exchangeRate = stateRV.value.exchangeRate;
                var num = stateRV.value.exchangeRate;
                num = num.toString();
                num = num.slice(0, num.indexOf(".") + 5);
                component.set("v.exchangeRateToShow", num);
              }
              if (!$A.util.isEmpty(stateRV.value.timestamp)) {
                paymentDraft.timestamp = stateRV.value.timestamp;
              }
              if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                component.set(
                  "v.convertedAmount",
                  stateRV.value.convertedAmount
                );
              }
              if (!$A.util.isEmpty(stateRV.value.output)) {
                paymentDraft.exchangeRateServiceResponse = stateRV.value.output;
              }
              component.set("v.paymentDraft", paymentDraft);
              resolve("OK");
            } else {
              reject(stateRV.msg);
              helper.showToast(component, notificationTitle, bodyText, true);
            }
          } else {
            reject("ERROR: FX");
            helper.showToast(component, notificationTitle, bodyText, true);
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  getLimits: function (component, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let userData = component.get("v.userData");
        let action = component.get("c.getLimits");
        let notificationTitle = $A.get("$Label.c.B2B_Error_Problem_Loading");
        let bodyText = $A.get("$Label.c.B2B_Error_Enter_Amount");
        let label = $A.get("$Label.c.B2B_Error_Amount_Exceeds_Limits");
        let limitsResult = "";
        action.setParams({
          paymentDraft: paymentDraft,
          userData: userData
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            let stateRV = actionResult.getReturnValue();
            if (stateRV.success) {
              if (!$A.util.isEmpty(stateRV.value.limitsResult)) {
                limitsResult = stateRV.value.limitsResult;
              }
              if (
                limitsResult.toLowerCase().localeCompare("ko") == 0 ||
                !$A.util.isEmpty(stateRV.value.errorMessage)
              ) {
                let error = component.get("v.errorMSG");
                if (!error.includes(label)) {
                  if ($A.util.isEmpty(error)) {
                    component.set("v.errorMSG", label);
                  } else {
                    component.set("v.errorMSG", error + "-" + label);
                  }
                }
              }
              resolve("OK");
            } else {
              reject(stateRV.msg);
              component.set("v.spinner", false);
              helper.showToast(component, notificationTitle, bodyText, true);
            }
          } else {
            reject("ERROR: Limits");
            component.set("v.spinner", false);
            helper.showToast(component, notificationTitle, bodyText, true);
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  checkBalance: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let label = $A.get("$Label.c.B2B_Error_Amount_Exceeds_Balance");
        let paymentDraft = component.get("v.paymentDraft");
        let availableBalance =
          paymentDraft.sourceAccount.amountAvailableBalance;
        let requestedAmount = paymentDraft.amountSend;
        if (!$A.util.isEmpty(availableBalance)) {
          if (availableBalance < requestedAmount) {
            let error = component.get("v.errorMSG");
            if (!error.includes(label)) {
              if ($A.util.isEmpty(error)) {
                component.set("v.errorMSG", label);
              } else {
                component.set("v.errorMSG", error + "-" + label);
              }
            }
          }
        }
        resolve("ok");
      }),
      this
    );
  },

  showToast: function (component, notificationTitle, bodyText, noReload) {
    let errorToast = component.find("errorToast");
    if (!$A.util.isEmpty(errorToast)) {
      errorToast.openToast(
        false,
        false,
        notificationTitle,
        bodyText,
        "Error",
        "warning",
        "warning",
        noReload
      );
    }
  },

  /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Function to call by 'setInputAmount' method of 'sourceAmountInput' and 'recipientAmountInput' children components
    History
    <Date>			<Author>			<Description>
    15/10/2020		Shahad Naji   		Initial version
    */
  showInformation: function (
    component,
    event,
    helper,
    amountEntered,
    amountEnteredFrom
  ) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let sourceAccount = paymentDraft.sourceAccount;
        let destinationAccount = paymentDraft.destinationAccount;
        let CMP_amountSend = component.find("sourceAmountInput");
        if (
          CMP_amountSend != null &&
          CMP_amountSend != undefined &&
          amountEnteredFrom == "source"
        ) {
          CMP_amountSend.setInputAmount("sourceAmountInput", amountEntered);
        }
        if (
          !$A.util.isEmpty(sourceAccount) &&
          !$A.util.isEmpty(destinationAccount) &&
          amountEnteredFrom == "recipient"
        ) {
          if (
            !$A.util.isEmpty(sourceAccount.currencyCodeAvailableBalance) &&
            !$A.util.isEmpty(destinationAccount.currencyCodeAvailableBalance)
          ) {
            if (
              sourceAccount.currencyCodeAvailableBalance !=
              destinationAccount.currencyCodeAvailableBalance
            ) {
              let CMP_amountReceive = component.find("recipientAmountInput");
              if (CMP_amountReceive != null && CMP_amountReceive != undefined) {
                CMP_amountReceive.setInputAmount(
                  "recipientAmountInput",
                  amountEntered
                );
              }
            }
          }
        }
        resolve("OK");
      }),
      this
    );
  },

  /*
    Author:         Antonio Matachana
    Company:        
    Description:    Format sourceAccountData.lastUpdateAvailableBalance and recipientAccountData.lastUpdateAvailableBalance
    History:
    <Date>          <Author>                    <Description>
    06/11/2020      Antonio Matachana           Initial version
    */
  formatUpdatedDate: function (component, event, helper) {
    var sourceAccountData = component.get("v.sourceAccountData");
    var recipientAccountData = component.get("v.recipientAccountData");
    if (
      !$A.util.isEmpty(sourceAccountData) &&
      !$A.util.isEmpty(recipientAccountData)
    ) {
      var issueTimeSource = $A.localizationService.formatTime(
        sourceAccountData.lastUpdateAvailableBalance,
        "HH:mm"
      );
      component.set("v.timeSourceBalance", issueTimeSource);
      var issueTimeRecipient = $A.localizationService.formatTime(
        recipientAccountData.lastUpdateAvailableBalance,
        "HH:mm"
      );
      component.set("v.timeRecipientBalance", issueTimeRecipient);
    }
  },
  /*
    Author:         Shahad Naji
    Company:        
    Description:    Method to process current payment data by invoking TrasferFees API and save payment information by invoking Operation Traking API
                    TransferFees API: Retrieves special prices (in case there are) and standard prices
                    Operation Tracking API: Saves current payment information
    History:
    <Date>          <Author>            <Description>
    04/02/2021      Shahad Naji         Initial version
    05/02/2021      Candido             Refactor with WRAPPER_PAY_PaymentDraft
    */
  processPaymentTransferFees: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let action = component.get("c.processPaymentTransferFees");
        action.setParams({
          paymentDraft: paymentDraft
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            let stateRV = actionResult.getReturnValue();
            if (stateRV.success) {
              if (!$A.util.isEmpty(stateRV.value)) {
                component.set("v.paymentDraft", stateRV.value.output);
              }
              resolve("OK");
            } else {
              let notificationTitle = $A.get(
                "$Label.c.B2B_Error_Problem_Loading"
              );
              let bodyText = stateRV.msg;
              helper.showToast(component, notificationTitle, bodyText, true);
              reject(stateRV.msg);
            }
          } else if (actionResult.getState() == "ERROR") {
            let errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            } else {
              console.log("problem updating step 3 payment details");
            }
            helper.showToast(
              component,
              $A.get("$Label.c.B2B_Error_Problem_Loading"),
              $A.get("$Label.c.B2B_Error_Check_Connection"),
              true
            );
            reject($A.get("$Label.c.ERROR_NOT_RETRIEVED"));
          } else {
            helper.showToast(
              component,
              $A.get("$Label.c.B2B_Error_Problem_Loading"),
              $A.get("$Label.c.B2B_Error_Check_Connection"),
              true
            );
            reject($A.get("$Label.c.ERROR_NOT_RETRIEVED"));
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },
  paymentDetailsContinue: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let step3field = component.get("v.step3field");
        let reference = $A.util.isEmpty(paymentDraft.reference)
          ? ""
          : paymentDraft.reference;
        let purpose = $A.util.isEmpty(paymentDraft.purpose)
          ? ""
          : paymentDraft.purpose;
        let charge = $A.util.isEmpty(paymentDraft.chargeBearer)
          ? ""
          : paymentDraft.chargeBearer;
        let paymentReason = $A.util.isEmpty(paymentDraft.reason)
          ? ""
          : paymentDraft.reason;
        let clientReference = "";
        let comercialCode = paymentDraft.comercialCode;
        let referenceMandatory = step3field.referenceMandatory;
        let purposeMandatory = step3field.purpose;
        let chargeMandatory = step3field.chargesMandatory;
        let comercialCodeMandatory = step3field.commercialCodeMandatory;
        let paymentReasonMandatory = step3field.paymentReasonMandatory;
        let clientreferenceMandatory = step3field.clientReferenceMandatory;
        let description = $A.util.isEmpty(paymentDraft.description)
          ? ""
          : paymentDraft.description;
        var sourceAccountData = paymentDraft.sourceAccount;
        let maxCharacters = 140;
        let transferType = $A.util.isEmpty(component.get("v.transferType"))
          ? ""
          : component.get("v.transferType");
        let PTT_international_transfer_single = $A.get(
          "$Label.c.PTT_international_transfer_single"
        );
        //Borrar despues de la prueba
        component.set("v.disabledContinue", false);
        let errorMSG = "";
        let msgLabel = "";

        if ($A.util.isEmpty(reference)) {
          msgLabel = $A.get("$Label.c.B2B_Error_Enter_Input");
          let paramRef = $A.get("$Label.c.B2B_Reference");
          msgLabel = msgLabel.replace("{0}", paramRef);
          component.set("v.errorRef", msgLabel);
          reject("KO");
        }
        if (
          sourceAccountData.mandatoryPurpose == true &&
          $A.util.isEmpty(purpose)
        ) {
          msgLabel = $A.get("$Label.c.B2B_Error_Enter_Input");
          let paramPurpose = $A.get("$Label.c.B2B_PaymentPurpose");
          msgLabel = msgLabel.replace("{0}", paramPurpose);
          component.set("v.errorPurpose", msgLabel);
          reject("KO");
        }
        if (comercialCodeMandatory == true && $A.util.isEmpty(comercialCode)) {
          //ToDo
          msgLabel = $A.get("$Label.c.B2B_Error_Enter_Input");
          let paramPurpose = $A.get("$Label.c.B2B_PaymentPurpose");
          msgLabel = msgLabel.replace("{0}", paramPurpose);
          // component.set('v.errorPurpose', msgLabel);
          reject("KO");
        }
        if (chargeMandatory == true && $A.util.isEmpty(charge)) {
          //ToDo
          msgLabel = $A.get("$Label.c.B2B_Error_Enter_Input");
          let paramChanges = $A.get("$Label.c.B2B_PaymentPurpose");
          msgLabel = msgLabel.replace("{0}", paramChanges);
          component.set("v.errorCharges", msgLabel);
          reject("KO");
        }
        if (paymentReasonMandatory == true && $A.util.isEmpty(paymentReason)) {
          //ToDo
          msgLabel = $A.get("$Label.c.B2B_Error_Enter_Input");
          let paramPaymentReason = $A.get("$Label.c.B2B_PaymentPurpose");
          msgLabel = msgLabel.replace("{0}", paramPaymentReason);
          component.set("v.errorPaymentReason", msgLabel);
          reject("KO");
        }
        if (comercialCodeMandatory == true && $A.util.isEmpty(comercialCode)) {
          //ToDo
          msgLabel = $A.get("$Label.c.B2B_Error_Enter_Input");
          let paramPaymentReason = $A.get("$Label.c.B2B_PaymentPurpose");
          msgLabel = msgLabel.replace("{0}", paramPaymentReason);
          //component.set('v.errorPaymentReason', msgLabel);
          reject("KO");
        }
        if (
          $A.util.isEmpty(paymentDraft.amountSend) ||
          paymentDraft.amountSend == 0
        ) {
          errorMSG = $A.get("$Label.c.B2B_Error_Enter_Input");
          var msg_parameter = $A.get("$Label.c.B2B_Amount_Input_Placeholder");
          errorMSG = errorMSG.replace("{0}", msg_parameter);
          component.set("v.errorMSG", errorMSG);
          reject("KO");
        }
        if (
          transferType != PTT_international_transfer_single &&
          description.length > maxCharacters
        ) {
          reject("KO");
        }
        if (component.get("v.disabledContinue") == true) {
          var notificationTitle = $A.get("$Label.c.B2B_Error_Problem_Loading");
          var bodyText = $A.get("$Label.c.B2B_Error_Enter_Amount");
          helper.showToast(component, notificationTitle, bodyText, true);
          reject("KO");
        }
        resolve("OK");

        /*if ($A.util.isEmpty(reference) || (
            (purposeMandatory == true && $A.util.isEmpty(purpose)) || 
            (chargeMandatory == true && $A.util.isEmpty(charge)) || 
            (comercialCodeMandatory == true && $A.util.isEmpty(comercialCode)) ||
            (paymentReasonMandatory == true && $A.util.isEmpty(paymentReason)) || 
            (clientreferenceMandatory == true && $A.util.isEmpty(clientReference)) || 
            ($A.util.isEmpty(paymentDraft.amountSend) || paymentDraft.amountSend == 0)) && 
            transferType != PTT_international_transfer_single || description.length > maxCharacters) {
               
           
            
            reject('KO');
        } else if (component.get("v.disabledContinue") == true) {
            var notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
            var bodyText =  $A.get('$Label.c.B2B_Error_Enter_Amount');
            helper.showToast(component, notificationTitle, bodyText, true);
            reject('KO');
        }else{
            resolve('OK');
        }*/
      }),
      this
    );
    /*else {
            component.set('v.spinner', true);
            helper.getLimits(component, event, helper).then($A.getCallback(function (value) { 
                return helper.updatePaymentDetails(component, helper);
            })).then($A.getCallback(function (value) { 
                return helper.checkFCCDowJones(component, helper);
            })).then($A.getCallback(function (value) { 
                return helper.getPaymentSignatureStructure(component, helper);
             })).then($A.getCallback(function (value) { 
               return helper.postFraud(component, event, helper);
            })).then($A.getCallback(function (value) {
                return helper.completeStep(component, helper);
            })).catch($A.getCallback(function (value) {
                if (!$A.util.isEmpty(value.FCCError) && value.FCCError == true) {
                    helper.handleFCCError(component, helper);
                }
                console.log(value.message);
            })).finally($A.getCallback(function () {
                component.set('v.spinner', false);
            }));
        }*/
  },
  //SNJ_DEPRECATED
  /*
     postFraud: function (component, event, helper) {
        return new Promise(function (resolve, reject) {
            try {
                var action = component.get('c.postFraud');
                var userData = component.get('v.userData');
                var navigatorInfo = component.get('v.navigatorInfo');
                var paymentDraft = component.get('v.paymentDraft');
                action.setParams({
                    userData : userData,
                    navigatorInfo : navigatorInfo,
                    paymentDraft :paymentDraft
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS') {
                        var stateRV = response.getReturnValue();
                        if (stateRV.success) {
                            resolve('ok');
                        }else{
                            reject('ko');
                        }
                    } else if (state === 'INCOMPLETE') {
                        reject('ko');
                    } else if (state === 'ERROR') {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log('Error message: ' + errors[0].message);
                            }
                        } else {
                            console.log('Unknown error');
                        }
                        reject('ko');
                    } else {
                      reject('ko');
                    }
                });
                $A.enqueueAction(action);
            } catch(e) {
                console.error(e);
                console.error('e.name => ' + e.name);
                console.error('e.message => ' + e.message);
                console.error('e.stack => ' + e.stack);
                reject('ko');
            }
        }, this);
    },
     getPaymentSignatureStructure: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getSignatureStructure');
            var paymentDraft = component.get('v.paymentDraft');
            action.setParams({
                'channel': 'WEB',
                'navigatorInfo' : component.get('v.navigatorInfo'),
                'paymentDraft': paymentDraft
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        helper.showToast(component, 'Error' ,$A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.Problem_Signature_Structure'), true);
                    }
                    reject({
                        'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                    });
                } else {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        resolve('OK');
                    } else {
                        reject({
                            'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                        });
                        helper.showToast(component,'Error' ,$A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.Problem_Signature_Structure'), true);
                    }
                }
            });
            $A.enqueueAction(action);
        }), this);
    },
*/
  //	14/01/2021	Shahad Naji		Update payment with baseAmount and baseCurrency pieces of information
  updatePaymentDetails: function (component, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let clientReference = null;
        let purpose = null;
        let description = null;
        let paymentId = null;
        let chargeBearer = null;
        let paymentMethod = null;
        let comercialCode = null;
        let baseAmount = null;
        let baseCurrency = null;
        let processDate = null;
        let paymentDraft = component.get("v.paymentDraft");
        if (!$A.util.isEmpty(paymentDraft)) {
          if (!$A.util.isEmpty(paymentDraft.reference)) {
            clientReference = paymentDraft.reference;
          }
          if (!$A.util.isEmpty(paymentDraft.purpose)) {
            purpose = paymentDraft.purpose;
          }
          if (!$A.util.isEmpty(paymentDraft.description)) {
            description = paymentDraft.description;
          }
          if (!$A.util.isEmpty(paymentDraft.comercialCode)) {
            comercialCode = paymentDraft.comercialCode;
          }
          if (!$A.util.isEmpty(paymentDraft.baseAmount)) {
            baseAmount = paymentDraft.baseAmount;
          }
          if (!$A.util.isEmpty(paymentDraft.baseCurrency)) {
            baseCurrency = paymentDraft.baseCurrency;
          }
          if (!$A.util.isEmpty(paymentDraft.paymentId)) {
            paymentId = paymentDraft.paymentId;
          }
          chargeBearer = "OUR";
        }
        paymentDraft.chargeBearer = chargeBearer; // Siempre 'OUR' para Book To Book. Posibles valores 'OUR'-nuestro, 'SHA'-compartido, 'BEN'-recipiente
        component.set("v.paymentDraft", paymentDraft);
        let action = component.get("c.updatePaymentInformation");
        action.setParams({
          paymentId: paymentId,
          clientReference: clientReference,
          purpose: purpose,
          description: description,
          chargeBearer: chargeBearer,
          paymentMethod: paymentDraft.paymentMethod,
          commercialCode: comercialCode,
          baseAmount: baseAmount,
          baseCurrency: baseCurrency
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var stateRV = actionResult.getReturnValue();
            if (stateRV.success) {
              resolve("OK");
            } else {
              reject({
                message: stateRV.msg
              });
              helper.showToast(
                component,
                "Error",
                $A.get("$Label.c.B2B_Error_Problem_Loading"),
                $A.get("$Label.c.B2B_Error_Updating_Data"),
                true
              );
            }
          } else if (
            actionResult.getState() == "INCOMPLETE" ||
            actionResult.getState() == "ERROR"
          ) {
            var errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            } else {
              console.log("problem updating payment details.");
            }
            reject({
              message: $A.get("$Label.c.ERROR_NOT_RETRIEVED")
            });
            helper.showToast(
              component,
              "Error",
              $A.get("$Label.c.B2B_Error_Problem_Loading"),
              $A.get("$Label.c.B2B_Error_Check_Connection"),
              true
            );
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  /*
    Author:        	Candido
    Company:        Deloitte
    Description:    Call API to check the FCC Dow Jones
    History:
    <Date>          <Author>            <Description>
    07/08/2020      Candido             Initial version
    */
  checkFCCDowJones: function (component, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var paymentDraft = component.get("v.paymentDraft");
        var action = component.get("c.checkFCCDowJones");
        action.setParams({
          paymentDraft: paymentDraft
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var stateRV = actionResult.getReturnValue();
            if (stateRV.success) {
              if (
                !$A.util.isEmpty(stateRV.value.passValidation) &&
                stateRV.value.passValidation == true
              ) {
                resolve("OK");
              } else {
                reject({
                  FCCError: true,
                  message: stateRV.msg
                });
              }
            } else {
              reject({
                message: stateRV.msg
              });
              helper.showToast(
                component,
                "Error",
                $A.get("$Label.c.B2B_Error_Problem_Loading"),
                $A.get("$Label.c.B2B_Error_Updating_Data"),
                true
              );
            }
          } else if (
            actionResult.getState() == "INCOMPLETE" ||
            actionResult.getState() == "ERROR"
          ) {
            reject({
              message: $A.get("$Label.c.ERROR_NOT_RETRIEVED")
            });
            helper.showToast(
              component,
              "Error",
              $A.get("$Label.c.B2B_Error_Problem_Loading"),
              $A.get("$Label.c.B2B_Error_Check_Connection"),
              true
            );
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },
  /*
    Author:        	Candido
    Company:        Deloitte
    Description:    Handle when 'checkFCCDowJones' return unsuccessful
    History:
    <Date>          <Author>            <Description>
    07/08/2020      Candido             Initial version
    */
  handleFCCError: function (component, helper) {
    var url = "c__FFCError=true";
    helper.encrypt(component, url).then(
      $A.getCallback(function (results) {
        let navService = component.find("navService");
        let pageReference = {
          type: "comm__namedPage",
          attributes: {
            pageName: "landing-payments"
          },
          state: {
            params: results
          }
        };
        navService.navigate(pageReference);
      })
    );
  },
  ServicePaymentLine: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let transferType = component.get("v.transferType");
        var action = component.get("c.getPaymentLine");
        action.setParams({
          paymentDraft: paymentDraft,
          transferType: transferType
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var stateRV = actionResult.getReturnValue();
            if (stateRV.success) {
              paymentDraft.serviceId = stateRV.value.serviceId;
              paymentDraft.productId = stateRV.value.productId;
              component.set("v.paymentDraft", paymentDraft);
              resolve("OK");
            } else {
              reject(stateRV.msg);
              helper.showToast(component, notificationTitle, bodyText, true);
            }
          } else {
            reject("ERROR: FX");
            helper.showToast(component, notificationTitle, bodyText, true);
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },
  initComponent: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var steps = component.get("v.steps");
        steps.lastModifiedStep = 3;
        component.set("v.steps", steps);
        let paymentDraft = component.get("v.paymentDraft");
        if (
          !$A.util.isEmpty(paymentDraft) &&
          paymentDraft.sourceAccount != null &&
          paymentDraft.destinationAccount != null &&
          !$A.util.isEmpty(paymentDraft.sourceCurrencyDominant) &&
          !$A.util.isEmpty(paymentDraft.exchangeRate)
        ) {
          if (
            !$A.util.isEmpty(
              paymentDraft.sourceAccount.currencyCodeAvailableBalance
            ) &&
            !$A.util.isEmpty(paymentDraft.paymentCurrency)
          ) {
            if (
              paymentDraft.sourceAccount.currencyCodeAvailableBalance !=
              paymentDraft.paymentCurrency
            ) {
              component.set("v.showBothAmountInput", true);
            } else {
              component.set("v.showBothAmountInput", false);
            }
            let rateCurrencies = "";
            if (paymentDraft.sourceCurrencyDominant == true) {
              rateCurrencies =
                paymentDraft.sourceAccount.currencyCodeAvailableBalance +
                "/" +
                paymentDraft.paymentCurrency;
            } else {
              rateCurrencies =
                paymentDraft.paymentCurrency +
                "/" +
                paymentDraft.sourceAccount.currencyCodeAvailableBalance;
            }
            component.set("v.rateCurrencies", rateCurrencies);
            component.set("v.exchangeRateToShow", paymentDraft.exchangeRate);
          }
        }
        resolve("OK");
      }),
      this
    );
  },

  getPaymentDetails: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        resolve("OK");
        /*             var action = component.get('c.getPaymentDetail');
            action.setParam({'paymentDraft': paymentDraft});
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    if (returnValue.success) {
                        component.set('v.paymentDraft', returnValue.value.paymentDetail);
                        resolve('payment details OK');
                    } else {
                        helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('problem getting list of payments msg2');
                    }
                    helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);*/
      }),
      this
    );
  },
  showHideComponents: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        try {
          var action = component.get("c.showHideComponents");
          var paymentDraft = component.get("v.paymentDraft");
          var productId;
          var recipientAccountData;
          if (!$A.util.isEmpty(paymentDraft.productId)) {
            productId = paymentDraft.productId;
          }

          if (!$A.util.isEmpty(paymentDraft.destinationAccount)) {
            recipientAccountData = paymentDraft.destinationAccount;
          }
          action.setParams({
            productId: productId,
            recipientAccountData: recipientAccountData
          });
          action.setCallback(this, function (actionResult) {
            if (actionResult.getState() == "ERROR") {
              var errors = actionResult.getError();
              if (errors) {
                if (errors[0] && errors[0].message) {
                  console.log("Error message: " + errors[0].message);
                }
              }
              reject("ko");
            } else {
              var stateRV = actionResult.getReturnValue();
              if (stateRV.success) {
                component.set("v.step3field", stateRV.value.output);
                if (stateRV.value.paymentPurposeValues != null) {
                  let purposeList = [];
                  for (
                    let i = 0;
                    i < stateRV.value.paymentPurposeValues.length;
                    i++
                  ) {
                    let purpose = stateRV.value.paymentPurposeValues[i];
                    purposeList.push({
                      label: purpose,
                      value: purpose
                    });
                  }
                  //helper.createListfunction(component, helper,purposeList,stateRV.value.paymentPurposeValues)
                  component.set("v.paymentPurpose", purposeList);
                }
                if (stateRV.value.chargesValues) {
                  let chargesList = [];
                  for (let i = 0; i < stateRV.value.chargesValues.length; i++) {
                    let charges = stateRV.value.chargesValues[i];
                    chargesList.push({
                      label: charges,
                      value: charges
                    });
                    component.set("v.charges", chargesList);
                  }
                }
                resolve("ok");
              } else {
                reject("ko");
              }
            }
          });
          $A.enqueueAction(action);
        } catch (e) {
          console.error(e);
          console.error("e.name => " + e.name);
          console.error("e.message => " + e.message);
          console.error("e.stack => " + e.stack);
          reject("ko");
        }
      }),
      this
    );
  }
});
