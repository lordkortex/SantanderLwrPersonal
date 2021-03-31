({
  showToast: function (component, event, helper, title, body, noReload, mode) {
    var errorToast = component.find("errorToast");
    if (!$A.util.isEmpty(errorToast)) {
      if (mode == "error") {
        errorToast.openToast(
          false,
          false,
          title,
          body,
          "Error",
          "warning",
          "warning",
          noReload
        );
      }
      if (mode == "success") {
        errorToast.openToast(
          true,
          false,
          title,
          body,
          "Success",
          "success",
          "success",
          noReload
        );
      }
    }
  },

  getPaymentData: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var action = component.get("c.getPaymentDetail");
        action.setParam("paymentId", component.get("v.paymentId"));
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var returnValue = actionResult.getReturnValue();
            console.log(returnValue);
            if (!$A.util.isEmpty(returnValue)) {
              console.log(returnValue.value.paymentDetail);
              console.log(component.get("v.userData"));
              component.set("v.paymentData", returnValue.value.paymentDetail);
              resolve("ok");
            } else {
              reject("ko");
            }
          } else if (actionResult.getState() == "ERROR") {
            var errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            } else {
              console.log("problem getting list of payments msg2");
            }
            helper.showToast(
              component,
              event,
              helper,
              $A.get("$Label.c.B2B_Error_Problem_Loading"),
              $A.get("$Label.c.B2B_Error_Check_Connection"),
              false,
              "error"
            );
            reject("ko");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  getURLParams: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        try {
          var sPageURLMain = decodeURIComponent(
            window.location.search.substring(1)
          );
          var sURLVariablesMain = sPageURLMain.split("&")[0].split("=");
          var sParameterName;
          var sPageURL;
          if (sURLVariablesMain[0] == "params") {
            if (
              sURLVariablesMain[1] != "" &&
              sURLVariablesMain[1] != undefined &&
              sURLVariablesMain[1] != null
            ) {
              helper.decrypt(component, sURLVariablesMain[1]).then(
                $A.getCallback(function (results) {
                  console.log(sURLVariablesMain[1]);
                  sURLVariablesMain[1] === undefined
                    ? "Not found"
                    : (sPageURL = results);
                  var sURLVariables = sPageURL.split("&");
                  var paymentId = "";
                  var source = "";
                  var paymentDetails = {};
                  for (var i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split("=");
                    console.log(sParameterName[0]);
                    if (sParameterName[0] === "c__paymentId") {
                      sParameterName[1] === undefined
                        ? "Not found"
                        : (paymentId = component.set(
                            "v.paymentId",
                            sParameterName[1]
                          ));
                    }
                    if (sParameterName[0] === "c__source") {
                      sParameterName[1] === undefined
                        ? "Not found"
                        : (source = component.set(
                            "v.source",
                            sParameterName[1]
                          ));
                    }
                    if (sParameterName[0] === "c__paymentDetails") {
                      console.log(sParameterName[1]);
                      sParameterName[1] === undefined
                        ? "Not found"
                        : (paymentDetails = JSON.parse(sParameterName[1]));
                    }
                    if (sParameterName[0] === "c__signatoryDetails") {
                      sParameterName[1] === undefined
                        ? "Not found"
                        : component.set(
                            "v.signLevel",
                            JSON.parse(sParameterName[1])
                          );
                    }
                  }
                  if ($A.util.isEmpty(paymentDetails)) {
                    helper.getPaymentData(component, event, helper).then(
                      $A.getCallback(function (value) {
                        resolve("ok");
                      })
                    );
                  } else {
                    /*paymentDetails.sourceCurrency='GBP';
                                paymentDetails.FXDateTime = null;
                                paymentDetails.FXoutput = null;
                                paymentDetails.FXFeesOutput = null;*/
                    component.set("v.paymentData", paymentDetails);
                    resolve("ok");
                  }
                })
              );
            }
          }
        } catch (e) {
          console.log(e);
          reject("ko");
        }
      }),
      this
    );
  },

  /*
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to decrypt data
    History:
    <Date>          <Author>                    <Description>
    19/11/2019      R. Alexander Cervino        Initial version
    */
  decrypt: function (component, data) {
    try {
      var result = "null";
      var action = component.get("c.decryptData");
      action.setParams({
        str: data
      });
      return new Promise(
        $A.getCallback(function (resolve, reject) {
          action.setCallback(this, function (response) {
            var state = response.getState();
            console.log(state);
            console.log(response.getReturnValue());
            if (state === "ERROR") {
              var errors = response.getError();
              if (errors) {
                if (errors[0] && errors[0].message) {
                  console.log("Error message: " + errors[0].message);
                  reject("ko");
                }
              } else {
                console.log("Unknown error");
                reject("ko");
              }
            } else if (state === "SUCCESS") {
              result = response.getReturnValue();
              resolve(result);
            }
          });
          $A.enqueueAction(action);
        }),
        this
      );
    } catch (e) {
      console.error(e);
    }
  },

  getUserData: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var userData = {};
        var action = component.get("c.getUserData");
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var stateRV = actionResult.getReturnValue();
            if (stateRV.success) {
              component.set("v.userData", stateRV.value.userData);
              resolve("ok");
            } else {
              reject("ko");
            }
          } else if (actionResult.getState() == "ERROR") {
            var errors = response.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            }
            reject("ko");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  getAccountDataAux: function (component, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var action = component.get("c.getAccountData");
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var accountData = {};
            var stateRV = actionResult.getReturnValue();
            console.log(stateRV);
            if (stateRV.success) {
              if (!$A.util.isEmpty(stateRV.value.cib)) {
                accountData.CIB = stateRV.value.cib;
              } else {
                // FLOWERPOWER_PARCHE_MINIGO
                accountData.CIB = false;
              }
              if (!$A.util.isEmpty(stateRV.value.documentType)) {
                accountData.documentType = stateRV.value.documentType;
              } else {
                // FLOWERPOWER_PARCHE_MINIGO
                accountData.documentType = "tax_id";
              }
              if (!$A.util.isEmpty(stateRV.value.documentNumber)) {
                accountData.documentNumber = stateRV.value.documentNumber;
              } else {
                // FLOWERPOWER_PARCHE_MINIGO
                accountData.documentNumber = "B86561412";
              }
              if (!$A.util.isEmpty(stateRV.value.documentNumber)) {
                accountData.companyId = stateRV.value.companyId;
              } else {
                // FLOWERPOWER_PARCHE_MINIGO
                accountData.companyId = "2119";
              }
            }
            component.set("v.accountData", accountData);
            resolve("getAccountData_OK");
          } else if (actionResult.getState() == "ERROR") {
            var errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            }
            reject("getAccountData_KO");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  handleExecutePayment: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var paymentId = component.get("v.paymentId");
        var paymentData = component.get("v.paymentData");
        let FXTimer = $A.util.isEmpty(paymentData.FXDateTime)
          ? null
          : paymentData.FXDateTime;
        let FXData = $A.util.isEmpty(paymentData.FXoutput)
          ? null
          : paymentData.FXoutput;
        let feesData = $A.util.isEmpty(paymentData.FXFeesOutput)
          ? null
          : paymentData.FXFeesOutput;
        var action = component.get("c.executePayment");
        action.setParams({
          paymentId: paymentId,
          paymentDetail: paymentData,
          FXTimer: FXTimer,
          FXData: FXData,
          feesData: feesData
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var returnValue = actionResult.getReturnValue();
            if (returnValue.success == true) {
              var orchestationOutput = returnValue.value.OrchestationOutput;
              if (
                $A.util.isEmpty(orchestationOutput) ||
                $A.util.isEmpty(orchestationOutput.level) ||
                (!$A.util.isEmpty(orchestationOutput.level) &&
                  orchestationOutput.level != "OK")
              ) {
                //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                //helper.updateStatus(component,event, helper,'101','001');
                // helper.updateStatus(component,event, helper,'999','003');
                helper.sendToLanding(component, event, helper, "", true);
                reject("ko");
              } else {
                resolve("ok");
              }
            } else {
              //helper.updateStatus(component,event, helper,'101','001');
              // helper.updateStatus(component,event, helper,'999','003');
              helper.sendToLanding(component, event, helper, "", true);

              reject("ko");
            }
          } else if (actionResult.getState() == "ERROR") {
            var errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            }
            helper.sendToLanding(component, event, helper, "", true);

            //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true,'error');
            //helper.updateStatus(component,event, helper,'101','001');
            // helper.updateStatus(component,event, helper,'999','003');

            reject("ko");
          }
        });
        $A.enqueueAction(action);
      }, this)
    );
  },

  /*
    Author:        	R. cervinpo
    Company:        Deloitte
    Description:    authorize payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    */
  signPayment: function (component, event, helper, finalAuthorizer) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var action = component.get("c.authorizePayment");
        action.setParams({
          paymentId: component.get("v.paymentId"),
          finalAuthorizer: finalAuthorizer,
          scaUid: component.get("v.scaUid")
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var returnValue = actionResult.getReturnValue();
            if (!returnValue.success) {
              helper.showToast(
                component,
                event,
                helper,
                $A.get("$Label.c.B2B_Error_Problem_Loading"),
                $A.get("$Label.c.B2B_Error_Check_Connection"),
                false,
                "error"
              );
              reject("problem authorizing the payment");
            }
            resolve("ok");
          } else if (actionResult.getState() == "ERROR") {
            var errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            } else {
              console.log("problem authorizing the payment");
            }
            helper.showToast(
              component,
              event,
              helper,
              $A.get("$Label.c.B2B_Error_Problem_Loading"),
              $A.get("$Label.c.B2B_Error_Check_Connection"),
              false,
              "error"
            );
            reject("ko");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  sendToLanding: function (component, event, helper, signed, error) {
    let navService = component.find("navService");
    var url = "c__signed=" + signed;
    if (error == true) {
      url = "c__error=" + error;
    }
    this.encrypt(component, url).then(
      $A.getCallback(function (results) {
        let pageReference = {
          type: "comm__namedPage",
          attributes: {
            pageName: component.get("v.onwardPage")
          },
          state: {
            params: results
          }
        };
        navService.navigate(pageReference);
      })
    );
  },

  sendOTP: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        component.set("v.reload", false);
        component.set("v.reloadAction", component.get("c.getOTP"));
        //component.set('v.spinnerVerificationCode', true);
        var action = component.get("c.getOTP");
        var sourceCountry = "";
        var sourceBIC = "";
        var payment = component.get("v.paymentData");
        if (!$A.util.isEmpty(payment)) {
          if (!$A.util.isEmpty(payment.sourceCountry)) {
            sourceCountry = payment.sourceCountry;
          }
          if (!$A.util.isEmpty(payment.sourceSwiftCode)) {
            sourceBIC = payment.sourceSwiftCode;
          }
        }
        action.setParams({
          paymentId: component.get("v.paymentId"),
          sourceCountry: sourceCountry,
          sourceBIC: sourceBIC
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var returnValue = actionResult.getReturnValue();
            console.log(returnValue);
            if (!returnValue.success) {
              //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.errorObtainingOTP'), false, 'error');
            } else {
              component.set("v.showOTP", true);
            }
            //component.set('v.spinnerVerificationCode', false);
          } else if (actionResult.getState() == "ERROR") {
            var errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            }
            //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.errorObtainingOTP'), false, 'error');
            // component.set('v.spinnerVerificationCode', false);
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  sendOTP_Strategic: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        component.set("v.reload", false);
        component.set("v.reloadAction", component.get("c.sendOTP_Strategic"));
        component.set("v.spinnerVerificationCode", true);
        var action = component.get("c.getOTP_Strategic");

        var paymentData = component.get("v.paymentData");

        var beneficiaryName = "";
        if (paymentData.beneficiaryAccountHolder != undefined) {
          beneficiaryName = paymentData.beneficiaryAccountHolder;
        }

        action.setParams({
          paymentId: component.get("v.paymentId"),
          beneficiaryName: beneficiaryName,
          beneficiaryAccount: paymentData.beneficiaryAccount,
          debitAmount: component.get("v.debitAmountString"),
          fees: component.get("v.feesString"),
          exchangeRate: component.get("v.exchangeRateString"),
          paymentAmount: component.get("v.paymentAmountString"),
          paymentDetail: paymentData,
          service_id: "international_payment",
          navigatorInfo: component.get("v.navigatorInfo")
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var returnValue = actionResult.getReturnValue();
            console.log(returnValue);
            if (!returnValue.success) {
              //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.errorObtainingOTP'), true, 'error');
              component.set("v.errorSign", true);
              component.set("v.errorOTP", true);
              component.set("v.spinnerVerificationCode", false);
              reject("ko");
            } else {
              if (
                returnValue.value.initiateOTP.localSigningUrl == null ||
                returnValue.value.initiateOTP.localSigningUrl == undefined
              ) {
                component.set("v.scaUid", returnValue.value.initiateOTP.scaUid);
              } else {
                component.set("v.scaUid", returnValue.value.initiateOTP.signId);
                var win = window.open(
                  returnValue.value.initiateOTP.localSigningUrl,
                  "_blank"
                );
                component.set("v.localWindow", win);
                win.focus();
              }
              component.set("v.errorSign", false);
              component.set("v.errorOTP", false);
              component.set("v.spinnerVerificationCode", false);
              if ($A.get("$Label.c.CNF_mockeoFirmas") == "ok") {
                helper.checkOTP(component, event, helper);
              }
              resolve("ok");
            }
          } else if (actionResult.getState() == "ERROR") {
            var errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            }
            //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.errorObtainingOTP'), true, 'error');
            component.set("v.errorSign", true);
            component.set("v.errorOTP", true);
            component.set("v.spinnerVerificationCode", false);
            reject("ko");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  checkOTP: function (component, event, helper) {
    component.set("v.spinnerVerificationCode", true);
    var action = component.get("c.validateOTP");
    var sourceCountry = "";
    var sourceBIC = "";
    var payment = component.get("v.paymentData");
    if (!$A.util.isEmpty(payment)) {
      if (!$A.util.isEmpty(payment.sourceCountry)) {
        sourceCountry = payment.sourceCountry;
      }
      if (!$A.util.isEmpty(payment.sourceSwiftCode)) {
        sourceBIC = payment.sourceSwiftCode;
      }
    }
    action.setParams({
      paymentId: component.get("v.paymentId"),
      metaData: component.get("v.OTP"),
      sourceCountry: sourceCountry,
      sourceBIC: sourceBIC
    });
    action.setCallback(this, function (actionResult) {
      if (actionResult.getState() == "SUCCESS") {
        var returnValue = actionResult.getReturnValue();
        console.log(returnValue);
        if (!returnValue.success) {
          component.set("v.spinnerVerificationCode", false);
          helper.showToast(
            component,
            event,
            helper,
            $A.get("$Label.c.B2B_Error_Problem_Loading"),
            $A.get("$Label.c.B2B_Error_Check_Connection"),
            false,
            "error"
          );
        } else {
          if (
            returnValue.value.validateOTP.validateResult != "ko" &&
            returnValue.value.validateOTP.validateResult != "KO"
          ) {
            component.set("v.OTPErrorMessage", "");
            let signature = component.get("v.signLevel");
            if (signature.lastSign == "true") {
              helper
                .signPayment(component, event, helper, true)
                .then(
                  $A.getCallback(function (value) {
                    return helper.handleExecutePayment(
                      component,
                      event,
                      helper
                    );
                  })
                )
                .then(
                  $A.getCallback(function (value) {
                    return helper.deleteSignatureRecord(
                      component,
                      event,
                      helper
                    );
                  })
                )
                .then(
                  $A.getCallback(function (value) {
                    return helper.sendNotification(component, event, helper);
                  })
                )
                .then(
                  $A.getCallback(function (value) {
                    // helper.showToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.authorizeSuccess'), true, 'success');
                    helper.sendToLanding(
                      component,
                      event,
                      helper,
                      "last",
                      false
                    );
                  })
                )
                .catch(function (error) {
                  console.log(error);
                })
                .finally(
                  $A.getCallback(function (value) {
                    component.set("v.spinnerVerificationCode", false);
                  })
                );
            } else {
              helper
                .signPayment(component, event, helper, false)
                .then(
                  $A.getCallback(function (value) {
                    // helper.showToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.authorizeSuccess'), true, 'success');
                    helper.sendToLanding(
                      component,
                      event,
                      helper,
                      "nolast",
                      false
                    );
                  })
                )
                .catch(
                  $A.getCallback(function (error) {
                    component.set("v.spinnerVerificationCode", false);
                    console.log(error);
                  })
                );
            }
          } else {
            component.set("v.spinnerVerificationCode", false);
            component.set(
              "v.OTPErrorMessage",
              $A.get("$Label.c.OTPWrongCheckSMS")
            );
            // helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
          }
        }
      } else if (actionResult.getState() == "ERROR") {
        var errors = actionResult.getError();
        if (errors) {
          if (errors[0] && errors[0].message) {
            console.log("Error message: " + errors[0].message);
          }
        }
        //helper.sendToLanding(component, event, helper,'', true);

        helper.showToast(
          component,
          event,
          helper,
          $A.get("$Label.c.B2B_Error_Problem_Loading"),
          $A.get("$Label.c.B2B_Error_Check_Connection"),
          false,
          "error"
        );
      }
    });
    $A.enqueueAction(action);
  },

  /*
    Author:        	R. cervinpo
    Company:        Deloitte
    Description:    Get payment sign level
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    07/08/2020      Bea Hill            Separate functions to control status update
    */
  beginAuthorize: function (component, event, helper) {
    let signature = component.get("v.signLevel");
    console.log(signature);
    component.set("v.spinner", true);
    //if (component.get('v.showOTP') == false) {
    if (signature.signatory == "true" && signature.signed == "false") {
      if (signature.lastSign == "true") {
        helper
          .sendOTP_Strategic(component, event, helper)
          .then(
            $A.getCallback(function (value) {
              component.set("v.showOTP", true);
            })
          )
          .catch(
            $A.getCallback(function (error) {
              console.log(error);
            })
          )
          .finally(
            $A.getCallback(function () {
              component.set("v.spinner", false);
            })
          );
      } else {
        component.set("v.showOTP", true);
        helper
          .sendOTP_Strategic(component, event, helper)
          .catch(
            $A.getCallback(function (error) {
              console.log(error);
            })
          )
          .finally(
            $A.getCallback(function () {
              component.set("v.spinner", false);
            })
          );
      }
    } /*else {
                helper.sendToLanding(component, event, helper, false)
                component.set('v.spinner', false);
            }
        }*/
  },

  /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Make call to server to update payment status
    History:
    <Date>          <Author>            <Description>  
    07/08/2020      Bea Hill            Initial version
    12/11/2020      Antonio Matachana   send userdata
    */
  updateStatus: function (component, event, helper, status, reason) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentId = component.get("v.paymentId");
        var action = component.get("c.updateStatus");
        var userData = component.get("v.userData");
        action.setParams({
          paymentId: paymentId,
          status: status,
          reason: reason,
          userdata: userData
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "ERROR") {
            var errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            } else {
              helper.showToast(
                component,
                event,
                helper,
                $A.get("$Label.c.B2B_Error_Problem_Loading"),
                $A.get("$Label.c.B2B_Error_Check_Connection"),
                false,
                "error"
              );
            }
            reject("ko");
          } else {
            var stateRV = actionResult.getReturnValue();
            console.log(stateRV);
            if (stateRV == "OK") {
              resolve("ok");
            } else {
              reject("ko");
              helper.showToast(
                component,
                event,
                helper,
                $A.get("$Label.c.B2B_Error_Problem_Loading"),
                $A.get("$Label.c.B2B_Error_Check_Connection"),
                false,
                "error"
              );
            }
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  reloadFX: function (component, event, helper) {
    new Promise(
      $A.getCallback(function (resolve, reject) {
        component.set("v.reloadAction", component.get("c.reloadFX"));
        component.set("v.reload", false);
        component.set("v.scaUid", "");
        component.set("v.errorSign", true);
        component.set("v.spinnerCountDown", true);
        resolve("ok");
      })
    )
      .then(
        $A.getCallback(function (value) {
          return helper.reloadFXValue(component, event, helper, false);
        })
      )
      .then(
        $A.getCallback(function (value) {
          return helper.reloadFXValue(component, event, helper, true);
        })
      )
      .catch(
        $A.getCallback(function (error) {
          console.log(error);
        })
      )
      .finally(
        $A.getCallback(function () {
          component.set("v.spinnerCountDown", false);
        })
      );
  },

  reloadFXValue: function (component, event, helper, feesBoolean) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let payment = component.get("v.paymentData");
        let paymentFees = $A.util.isEmpty(payment.fees) ? "" : payment.fees;
        let paymentCurrency = $A.util.isEmpty(payment.paymentCurrency)
          ? ""
          : payment.paymentCurrency;
        let feesCurrency = $A.util.isEmpty(payment.feesCurrency)
          ? ""
          : payment.feesCurrency;
        if (
          feesBoolean == true &&
          ($A.util.isEmpty(paymentFees) ||
            $A.util.isEmpty(feesCurrency) ||
            (!$A.util.isEmpty(paymentFees) &&
              payment.sourceCurrency == feesCurrency))
        ) {
          resolve("ok");
        } else if (
          feesBoolean == false &&
          payment.sourceCurrency == payment.beneficiaryCurrency
        ) {
          resolve("ok");
        } else {
          let paymentId = component.get("v.paymentId");
          let accountData = component.get("v.accountData");
          let action = component.get("c.getExchangeRate");
          action.setParams({
            paymentId: paymentId,
            accountData: accountData,
            payment: payment,
            feesBoolean: feesBoolean
          });
          action.setCallback(this, function (actionResult) {
            if (actionResult.getState() == "SUCCESS") {
              let stateRV = actionResult.getReturnValue();
              console.log(stateRV);
              console.log(payment.amountSend);
              if (stateRV.success) {
                if (feesBoolean == true) {
                  if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                    payment.fees = stateRV.value.convertedAmount;
                    if (
                      payment.convertedAmount != null &&
                      payment.convertedAmount != undefined &&
                      payment.addFees == true
                    ) {
                      payment.totalAmount =
                        parseFloat(stateRV.value.convertedAmount) +
                        parseFloat(payment.amountSend);
                    }
                  }
                  if (!$A.util.isEmpty(stateRV.value.output)) {
                    payment.FXFeesOutput = stateRV.value.output;
                  }
                } else {
                  if (!$A.util.isEmpty(stateRV.value.exchangeRate)) {
                    payment.tradeAmount = stateRV.value.exchangeRate;
                    payment.operationNominalFxDetails.customerExchangeRate =
                      stateRV.value.exchangeRate;
                  }
                  if (!$A.util.isEmpty(stateRV.value.timestamp)) {
                    payment.timestamp = stateRV.value.timestamp;
                  }
                  if (!$A.util.isEmpty(stateRV.value.fxTimer)) {
                    payment.FXDateTime = stateRV.value.fxTimer;
                  }
                  if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                    if (stateRV.value.amountObtained == "send") {
                      payment.amountSend = stateRV.value.convertedAmount;
                    }
                    if (stateRV.value.amountObtained == "received") {
                      payment.amountReceive = stateRV.value.convertedAmount;
                    }
                    payment.convertedAmount = stateRV.value.convertedAmount;

                    payment.amountOperative = stateRV.value.convertedAmount;
                    if (
                      $A.util.isEmpty(paymentFees) == false &&
                      payment.addFees == true
                    ) {
                      payment.totalAmount =
                        parseFloat(payment.amountSend) +
                        parseFloat(paymentFees);
                    }
                  }
                  if (!$A.util.isEmpty(stateRV.value.output)) {
                    payment.FXoutput = stateRV.value.output;
                  }
                }
                component.set("v.paymentData", payment);
                component.set("v.expiredFX", false);
                resolve("ok");
              } else {
                reject("ko");
                helper.showToast(
                  component,
                  event,
                  helper,
                  $A.get("$Label.c.B2B_Error_Problem_Loading"),
                  $A.get("$Label.c.B2B_Error_Check_Connection"),
                  component.get("v.showOTP"),
                  "error"
                );
              }
            } else {
              reject("ko");
              helper.showToast(
                component,
                event,
                helper,
                $A.get("$Label.c.B2B_Error_Problem_Loading"),
                $A.get("$Label.c.B2B_Error_Check_Connection"),
                component.get("v.showOTP"),
                "error"
              );
            }
          });
          $A.enqueueAction(action);
        }
      }),
      this
    );
  },

  deleteSignatureRecord: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var action = component.get("c.removeSignature");
        action.setParams({
          paymentId: component.get("v.paymentId")
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            var returnValue = actionResult.getReturnValue();
            console.log(returnValue);
            if (!returnValue.success) {
              helper.showToast(
                component,
                event,
                helper,
                $A.get("$Label.c.B2B_Error_Problem_Loading"),
                $A.get("$Label.c.B2B_Error_Check_Connection"),
                false,
                "error"
              );
              reject("ko");
            } else {
              resolve("ok");
            }
          } else if (actionResult.getState() == "ERROR") {
            var errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            }
            helper.showToast(
              component,
              event,
              helper,
              $A.get("$Label.c.B2B_Error_Problem_Loading"),
              $A.get("$Label.c.B2B_Error_Check_Connection"),
              false,
              "error"
            );
            reject("ko");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  /*
    Author:         R. Cervino
    Company:        Deloitte
    Description:    Encryption for page navigation
    History:
    <Date>          <Author>            <Description>
    18/06/2020      R. Cervino          Initial version - adapted from B2B
    */
  encrypt: function (component, data) {
    var result = "null";
    var action = component.get("c.encryptData");
    action.setParams({
      str: data
    });
    return new Promise(function (resolve, reject) {
      action.setCallback(this, function (response) {
        var state = response.getState();
        if (state === "ERROR") {
          var errors = response.getError();
          if (errors) {
            if (errors[0] && errors[0].message) {
              console.log("Error message: " + errors[0].message);
              reject(response.getError()[0]);
            }
          } else {
            console.log("Unknown error");
          }
        } else if (state === "SUCCESS") {
          result = response.getReturnValue();
        }
        resolve(result);
      });
      $A.enqueueAction(action);
    });
  },

  auxCometD: function (component, event, helper) {
    component.set("v.cometdSubscriptions", []);
    component.set("v.notifications", []);
    // Disconnect CometD when leaving page
    window.addEventListener("unload", function (event) {
      helper.disconnectCometd(component);
    });
    // Retrieve session id
    var action = component.get("c.getSessionId");
    action.setCallback(this, function (response) {
      if (component.isValid() && response.getState() === "SUCCESS") {
        component.set("v.sessionId", response.getReturnValue());
        if (component.get("v.cometd") != null) {
          helper.connectCometd(component, event, helper);
        }
      } else {
        console.error(response);
      }
    });
    $A.enqueueAction(action);
  },

  // METHODS TO CONNECT WITH THE WS_OTPVALIDATION SERVICE
  connectCometd: function (component, event, helper) {
    var helper = this;
    // Configure CometD
    var cometdUrl =
      window.location.protocol +
      "//" +
      window.location.hostname +
      "/cometd/40.0/";
    var cometd = component.get("v.cometd");
    cometd.configure({
      url: cometdUrl,
      requestHeaders: {
        Authorization: "OAuth " + component.get("v.sessionId")
      },
      appendMessageTypeToURL: false
    });
    cometd.websocketEnabled = false;
    // Establish CometD connection
    console.log("Connecting to CometD: " + cometdUrl);
    cometd.handshake(function (handshakeReply) {
      if (handshakeReply.successful) {
        console.log("Connected to CometD.");
        // Subscribe to platform event
        var newSubscription = cometd.subscribe(
          "/event/OTPValidation__e",
          function (platformEvent) {
            if (
              component.get("v.expiredFX") == false &&
              component.get("v.errorOTP") == false
            ) {
              var scaUid = component.get("v.scaUid");
              if (platformEvent.data.payload.scaUid__c == scaUid) {
                var win = component.get("v.localWindow");
                if (!$A.util.isEmpty(win)) {
                  win.close();
                }
                if (
                  platformEvent.data.payload.status__c == "KO" ||
                  platformEvent.data.payload.status__c == "ko"
                ) {
                  component.set("v.errorSign", true);
                } else {
                  component.set("v.spinnerVerificationCode", true);
                  //helper.handleExecutePayment(component, event, helper);
                  let signature = component.get("v.signLevel");
                  if (signature.lastSign == "true") {
                    helper
                      .signPayment(component, event, helper, true)
                      .then(
                        $A.getCallback(function (value) {
                          return helper.handleExecutePayment(
                            component,
                            event,
                            helper
                          );
                        })
                      )
                      .then(
                        $A.getCallback(function (value) {
                          return helper.deleteSignatureRecord(
                            component,
                            event,
                            helper
                          );
                        })
                      )
                      .then(
                        $A.getCallback(function (value) {
                          return helper.sendNotification(
                            component,
                            event,
                            helper
                          );
                        })
                      )
                      .then(
                        $A.getCallback(function (value) {
                          helper.sendToLanding(
                            component,
                            event,
                            helper,
                            "last",
                            false
                          );
                        })
                      )
                      .catch(
                        $A.getCallback(function (error) {
                          component.set("v.errorOTP", true);
                          component.set("v.errorSign", true);
                        })
                      )
                      .finally(
                        $A.getCallback(function () {
                          component.set("v.spinnerVerificationCode", false);
                        })
                      );
                  } else {
                    helper
                      .signPayment(component, event, helper, false)
                      .then(
                        $A.getCallback(function (value) {
                          helper.sendToLanding(
                            component,
                            event,
                            helper,
                            "nolast",
                            false
                          );
                        })
                      )
                      .catch(
                        $A.getCallback(function (error) {
                          component.set("v.errorOTP", true);
                          component.set("v.errorSign", true);
                        })
                      )
                      .finally(
                        $A.getCallback(function () {
                          component.set("v.spinnerVerificationCode", false);
                        })
                      );
                  }
                }
              }
            }
          }
        );
        // Save subscription for later
        var subscriptions = component.get("v.cometdSubscriptions");
        subscriptions.push(newSubscription);
        component.set("v.cometdSubscriptions", subscriptions);
      } else {
        console.error("Failed to connected to CometD.");
      }
    });
  },

  disconnectCometd: function (component) {
    var cometd = component.get("v.cometd");
    // Unsuscribe all CometD subscriptions
    cometd.batch(function () {
      var subscriptions = component.get("v.cometdSubscriptions");
      subscriptions.forEach(function (subscription) {
        cometd.unsubscribe(subscription);
      });
    });
    component.set("v.cometdSubscriptions", []);
    // Disconnect CometD
    cometd.disconnect();
    console.log("CometD disconnected.");
  },

  sendNotification: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var action = component.get("c.sendNotification");
        action.setParams({
          paymentId: component.get("v.paymentData.paymentId")
        });
        action.setCallback(this, function (actionResult) {
          if (actionResult.getState() == "SUCCESS") {
            resolve("ok");
          } else if (actionResult.getState() == "ERROR") {
            var errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            }
            resolve("ok");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  getNavigatorInfo: function (component, event, helper) {
    new Promise(
      $A.getCallback(function (resolve, reject) {
        let navigatorInfo = component.get("v.navigatorInfo");
        navigatorInfo.userAgent = navigator.userAgent;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              navigatorInfo.latitude = position.coords.latitude;
              navigatorInfo.longitude = position.coords.longitude;
              console.log(navigatorInfo.latitude);
              console.log(navigatorInfo.longitude);
              console.log(navigatorInfo.userAgent);
              component.set("v.navigatorInfo", navigatorInfo);
              resolve("ok");
            },
            function () {
              component.set("v.navigatorInfo", navigatorInfo);
              resolve("ok");
            }
          );
        } else {
          component.set("v.navigatorInfo", navigatorInfo);
          resolve("ok");
        }
      })
    ).catch(
      $A.getCallback(function (error) {
        console.log(error);
      })
    );
  }
});
