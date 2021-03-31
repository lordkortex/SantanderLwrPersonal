({
  completeStep: function (component) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var completeStep = component.getEvent("completeStep");
        completeStep.setParams({
          confirm: true
        });
        completeStep.fire();
        component.set("v.errorMSG", "");
        component.set("v.isModified", false);
        let paymentDraft = component.get("v.paymentDraft");
        if (
          $A.util.isEmpty(paymentDraft.expensesAccount) ||
          paymentDraft.expensesAccount == paymentDraft.data
        ) {
          component.set("v.checkedYES", false);
        }
        resolve("ok");
      }),
      this
    );
  },

  isEditingStepError: function (component, event, helper) {
    var completeStep = component.getEvent("completeStep");
    completeStep.setParams({
      confirm: false
    });
    completeStep.fire();
  },

  showToast: function (component, notificationTitle, bodyText, noReload) {
    var errorToast = component.find("errorToast");
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

  validateAccount: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let action = component.get("c.accountValidation");
        action.setParams({
          data: paymentDraft.sourceAccount
        });
        action.setCallback(this, function (actionResult) {
          let notificationTitle = $A.get("$Label.c.B2B_Error_Problem_Loading");
          let bodyText = $A.get("$Label.c.B2B_Error_Check_Connection");
          if (actionResult.getState() == "SUCCESS") {
            let returnValue = actionResult.getReturnValue();
            if (!returnValue.success) {
              helper.showToast(component, notificationTitle, bodyText, true);
              reject("ko");
            } else {
              if (returnValue.value.statusResult != "OK") {
                let accountList = component.get("v.accountList");
                if (accountList.length <= 6) {
                  let title = $A.get("$Label.c.B2B_SelectedBlockedAccount");
                  let body = $A.get("$Label.c.B2B_SelectDifferentAccount");
                  helper.showToast(component, title, body, true);
                } else {
                  component.set(
                    "v.errorMSG",
                    $A.get("$Label.c.blockedAccount")
                  );
                }
                reject("ko");
              } else {
                resolve("ok");
              }
            }
          } else if (actionResult.getState() === "ERROR") {
            let errors = actionResult.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            }
            helper.showToast(component, notificationTitle, bodyText, true);
            reject("ko");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  // Migración de getPaymentId desde el step 2
  getPaymentId: function (component, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let transferType = component.get("v.transferType");
        let expensesAccount = null;
        if (!$A.util.isEmpty(paymentDraft.expensesAccount)) {
          expensesAccount = paymentDraft.expensesAccount;
        }
        let notificationTitle = $A.get("$Label.c.B2B_Error_Problem_Loading");
        let bodyText = $A.get("$Label.c.B2B_Error_Continue_Button");
        if (
          component.get("v.isEditingProcess") == true &&
          !$A.util.isEmpty(paymentDraft.paymentId)
        ) {
          resolve("OK");
        } else if (!$A.util.isEmpty(paymentDraft.paymentId)) {
          let action = component.get("c.updatePayment");
          action.setParams({
            paymentDraft: paymentDraft
          });
          action.setCallback(this, function (actionResult) {
            let notificationTitle = $A.get(
              "$Label.c.B2B_Error_Problem_Loading"
            );
            let bodyText = $A.get("$Label.c.B2B_Error_Continue_Button");
            if (actionResult.getState() == "SUCCESS") {
              let stateRV = actionResult.getReturnValue();
              if (stateRV.success) {
                resolve("OK");
              } else {
                helper.showToast(component, notificationTitle, bodyText, true);
                reject(stateRV.msg);
              }
            } else if (actionResult.getState() == "ERROR") {
              let errors = actionResult.getError();
              if (errors) {
                if (errors[0] && errors[0].message) {
                  console.log("Error message: " + errors[0].message);
                }
              }
              helper.showToast(component, notificationTitle, bodyText, true);
              reject("ERROR: update payment details");
            } else {
              helper.showToast(component, notificationTitle, bodyText, true);
              reject("ERROR: update payment details");
            }
          });
          $A.enqueueAction(action);
        } else {
          let userData = component.get("v.userData");

          let action = component.get("c.getPaymentId");
          action.setParams({
            sourceAccount: paymentDraft.sourceAccount,
            userData: userData,
            paymentId: paymentDraft.paymentId,
            expensesAccount: expensesAccount,
            transferType: transferType
          });
          action.setCallback(this, function (actionResult) {
            if (actionResult.getState() == "SUCCESS") {
              let stateRV = actionResult.getReturnValue();
              console.log(stateRV);
              if (stateRV.success) {
                if (!$A.util.isEmpty(stateRV.value)) {
                  if (!$A.util.isEmpty(stateRV.value.paymentId)) {
                    let paymentDraft = component.get("v.paymentDraft");
                    paymentDraft.paymentId = stateRV.value.paymentId;
                    component.set("v.paymentDraft", paymentDraft);
                    resolve("OK");
                  } else {
                    helper.showToast(
                      component,
                      notificationTitle,
                      bodyText,
                      true
                    );
                    reject("ERROR: empty stateRV.value.paymentId");
                  }
                } else {
                  helper.showToast(
                    component,
                    notificationTitle,
                    bodyText,
                    true
                  );
                  reject("ERROR: stateRV.value");
                }
              } else {
                helper.showToast(component, notificationTitle, bodyText, true);
                reject(stateRV.msg);
              }
            } else {
              helper.showToast(component, notificationTitle, bodyText, true);
              reject("ERROR: Create Payment Id.");
            }
          });
          $A.enqueueAction(action);
        }
      }),
      this
    );
  },

  upsertPayment: function (component, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let action = component.get("c.upsertPayment");
        action.setParams({
          paymentDraft: paymentDraft
        });
        action.setCallback(this, function (actionResult) {
          let notificationTitle = $A.get("$Label.c.B2B_Error_Problem_Loading");
          let bodyText = $A.get("$Label.c.B2B_Error_Continue_Button");
          if (actionResult.getState() == "SUCCESS") {
            let stateRV = actionResult.getReturnValue();
            console.log(stateRV);
            if (stateRV.success) {
              resolve("OK");
            } else {
              helper.showToast(component, notificationTitle, bodyText, true);
              reject(stateRV.msg);
            }
          } else {
            helper.showToast(component, notificationTitle, bodyText, true);
            reject("ERROR: Create Payment Id.");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  }
});
