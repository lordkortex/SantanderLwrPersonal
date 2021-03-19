({
  completeStep: function (component, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        var completeStep = component.getEvent("completeStep");
        completeStep.setParams({
          confirm: true
        });
        completeStep.fire();
        component.set("v.errorMSG", "");
        component.set("v.isModified", false);
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

  showToast: function (component, event, helper) {
    var errorToast = component.find("errorToast");
    if (!$A.util.isEmpty(errorToast)) {
      errorToast.openToast(
        false,
        false,
        $A.get("$Label.c.B2B_Error_Problem_Loading"),
        $A.get("$Label.c.B2B_Error_Check_Connection"),
        "Error",
        "warning",
        "warning",
        true
      );
    }
  },

  validateAccount: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let userData = component.get("v.userData");
        let action = component.get("c.accountValidation");
        /*action.setParams({ //new params for Get Me Account Details validation when implemented
                'userData': userData,
                'paymentDraft': paymentDraft
            });*/
        action.setParams({
          data: paymentDraft.destinationAccount
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
                component.set("v.errorMSG", $A.get("$Label.c.blockedAccount"));
                reject("ko");
              } else {
                resolve("ok");
              }
            }
          } else if (actionResult.getState() == "ERROR") {
            helper.showToast(component, notificationTitle, bodyText, true);
            let errors = actionResult.getError();
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

  /*
    Company:        Deloitte
    Description:    Sets country list
    History:
    <Date>          <Author>            <Description>
    02/06/2020      -                   Initial version
    09/02/2021      Bea Hill            Remove call to c.getPaymentId - Payment ID is created in SelectOrigin so only need to call Tracking PATCH here
    */
  updatePayment: function (component, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        if (component.get("v.isEditingProcess") == true) {
          resolve("OK");
        } else {
          let paymentDraft = component.get("v.paymentDraft");
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
        }
      }),
      this
    );
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

  recordNewBeneficiary: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let newBeneficiary = component.get("v.draftData");
        let action = component.get("c.registerNewBeneficiary");
        action.setParams({
          newAccount: newBeneficiary,
          sourceAccount: paymentDraft.sourceAccount
        });
        action.setCallback(this, function (response) {
          let state = response.getState();
          if (state === "SUCCESS") {
            let result = response.getReturnValue();
            if (result.success == true) {
              let paymentDraft = component.get("v.paymentDraft");
              paymentDraft.destinationAccount = result.value.accountData;
              component.set("v.paymentDraft", paymentDraft);
              resolve("OK");
            } else {
              component.set("v.errorMSG", result.msg);
              reject("Cannot create new beneficiary");
            }
          } else {
            let notificationTitle = $A.get(
              "$Label.c.B2B_Error_Problem_Loading"
            );
            let bodyText = $A.get("$Label.c.B2B_Error_Check_Connection");
            helper.showToast(component, notificationTitle, bodyText, true);
            reject("Can not create new beneficiary");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  getCountryList: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let sourceAccountCountry = "";
        if (!$A.util.isEmpty(paymentDraft.sourceAccount)) {
          let sourceAccount = paymentDraft.sourceAccount;
          sourceAccountCountry = sourceAccount.country;
        }
        let rejectBody = {
          title: $A.get("$Label.c.B2B_Error_Problem_Loading"),
          body: $A.get("$Label.c.B2B_Error_Check_Connection"),
          noReload: true
        };
        let action = component.get("c.getIipBeneficicaryCountries");
        action.setParams({
          sourceAccountCountry: sourceAccountCountry
        });
        action.setCallback(this, function (response) {
          let state = response.getState();
          if (state === "SUCCESS") {
            let result = response.getReturnValue();
            if (result != null && result != undefined) {
              if (result.success) {
                if (!$A.util.isEmpty(result.value)) {
                  var countryList = result.value.countryList;
                  resolve(countryList);
                } else {
                  reject(rejectBody);
                }
              } else {
                reject(rejectBody);
              }
            } else {
              reject(rejectBody);
            }
          } else if (state === "INCOMPLETE") {
            reject(rejectBody);
          } else if (state === "ERROR") {
            let errors = response.getError();
            if (errors) {
              if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
              }
            }
            reject(rejectBody);
          }
        });
        $A.enqueueAction(action);
      })
    );
  },

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Sets country list
    History:
    <Date>          <Author>            <Description>
    02/06/2020      Shahad Naji         Initial version
    16/06/2020      Bea Hill            Adapted from CMP_PaymentsLandingFilters
    04/01/2021      Bea Hill            Adapted from CMP_PaymentsLandingMethodModal
    */
  setCountryList: function (component, event, helper, countryList) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let rCountryList = countryList;
        let outputCountryList = [];
        let countryListAux = [];
        for (let i = 0; i < rCountryList.length; i++) {
          let country = rCountryList[i].countryName;
          if (!$A.util.isEmpty(country)) {
            if (!countryListAux.includes(country)) {
              countryListAux.push(country);
              outputCountryList.push({
                label: rCountryList[i].parsedCountryName,
                value: country
              });
            }
          }
        }
        var sortCountryList = helper.sortList(
          component,
          helper,
          outputCountryList
        );
        component.set("v.countryList", sortCountryList);
        resolve(countryList);
      })
    );
  },

  /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Sorts filters label
    History:
    <Date>          <Author>            <Description>
    02/06/2020      Shahad Naji         Initial version
    16/06/2020      Beatrice Hill       Adapted from CMP_PaymentsLandingFilters
    04/01/2021      Bea Hill            Adapted from CMP_PaymentsLandingMethodModal
    */
  sortList: function (component, helper, list) {
    var sort;
    var data = list;
    sort = data.sort((a, b) =>
      a.label > b.label ? 1 : b.label > a.label ? -1 : 0
    );
    return sort;
  },

  /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get the currencylist and base currency for each country
    History:
    <Date>          <Author>      <Description>
    03/02/2021      Bea Hill      Initial version
    */
  getCountryCurrencies: function (component, event, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let action = component.get("c.getCurrencyListByCountry");
        action.setCallback(this, function (response) {
          if (response.getState() == "SUCCESS") {
            let returnValue = response.getReturnValue();
            if (returnValue.success) {
              let value = returnValue.value;
              let countryCurrencyLists = value.countryCurrencyLists;
              component.set("v.countryCurrencyLists", countryCurrencyLists);
              resolve("OK");
            } else {
              reject("KO");
            }
          } else {
            reject("KO");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Call to TransfersBeneficiaries filtering by country
    History:
    <Date>          <Author>      <Description>
    03/02/2021      Bea Hill      Initial version
    */
  getBeneficiariesByCountry: function (component, event, helper, country) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let canNewBen = component.get("v.canCreateBeneficiaries");
        if (canNewBen == false) {
          resolve("OK");
        } else {
          var action = component.get("c.getBeneficiariesByCountry");
          action.setParams({
            countryCode: country
          });
          action.setCallback(this, function (response) {
            if (response.getState() == "SUCCESS") {
              let returnValue = response.getReturnValue();
              if (returnValue.success) {
                let value = returnValue.value;
                let accountList = value.accountList;
                component.set("v.accountList", accountList);
                resolve("OK");
              } else {
                reject("problem getting accounts");
              }
            } else {
              reject("problem getting accounts");
            }
          });
          $A.enqueueAction(action);
        }
      }),
      this
    );
  },

  /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Set the currency dropdown values and selected currency based on the country
    History:
    <Date>          <Author>      <Description>
    03/02/2021      Bea Hill      Initial version
    */
  handleCurrencies: function (component, event, helper, country) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let canNewBen = component.get("v.canCreateBeneficiaries");
        if (canNewBen == false) {
          resolve("OK");
        } else {
          let allSettings = component.get("v.newBeneficiarySettings");
          let settings = allSettings[country];
          let currencyList = settings.currencyList;
          let baseCurrency = settings.baseCurrency;
          helper
            .setCurrencyList(component, event, helper, currencyList)
            .then(
              $A.getCallback(function (value) {
                return helper.setSelectedCurrency(
                  component,
                  event,
                  helper,
                  baseCurrency
                );
              })
            )
            .finally(
              $A.getCallback(function () {
                resolve(baseCurrency);
              })
            );
        }
      })
    );
  },

  getExchangeRate: function (component, helper, currency1, currency2) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let action = component.get("c.getExchangeRate");
        action.setParams({
          currency1: currency1,
          currency2: currency2,
          paymentDraft: paymentDraft
        });
        action.setCallback(this, function (response) {
          let notificationTitle = $A.get("$Label.c.B2B_Error_Exchange_Rate");
          let bodyText = $A.get("$Label.c.B2B_Error_Problem_System");
          if (response.getState() == "SUCCESS") {
            let returnValue = response.getReturnValue();
            if (returnValue.success) {
              let value = returnValue.value;
              console.log("fx");
              console.log(value);
              if (
                !$A.util.isEmpty(value.sameCurrencies) &&
                value.sameCurrencies == true
              ) {
                paymentDraft.exchangeRate = null;
                paymentDraft.timestamp = null;
                paymentDraft.exchangeRateServiceResponse = null;
              } else {
                paymentDraft.exchangeRate = value.exchangeRate;
                paymentDraft.timestamp = value.timestamp;
                paymentDraft.exchangeRateServiceResponse =
                  value.exchangeRateServiceResponse;
              }
              component.set("v.paymentDraft", paymentDraft);
              resolve("OK");
            } else {
              component.set("v.errorFX", false);
              helper.showToast(component, notificationTitle, bodyText, true);
              reject("problem getting exchange rate");
            }
          } else {
            component.set("v.errorFX", false);
            helper.showToast(component, notificationTitle, bodyText, true);
            reject("problem getting exchange rate");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  setCurrencyList: function (component, event, helper, inputCurrencyList) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let currencyList = [];
        for (let i = 0; i < inputCurrencyList.length; i++) {
          let currency = inputCurrencyList[i];
          currencyList.push({
            label: currency,
            value: currency
          });
        }
        let sortedCurrencyList = helper.sortList(
          component,
          helper,
          currencyList
        );
        component.set("v.currencyList", sortedCurrencyList);
        resolve("OK");
      })
    );
  },

  setSelectedCurrency: function (component, event, helper, currency) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let payment = component.get("v.paymentDraft");
        payment.paymentCurrency = currency;
        component.set("v.paymentDraft", payment);
        component.set("v.selectedCurrency", currency);
        var currencyDropdown = component.find("currencyDropdown");
        var selectedValues = [];
        selectedValues.push(currency);
        currencyDropdown.setSelectedValues(selectedValues);
        resolve("OK");
      })
    );
  },

  getDominantCurrency: function (
    component,
    helper,
    currencyOrigin,
    currencyDestination
  ) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let userData = component.get("v.userData");
        if (
          !$A.util.isEmpty(currencyOrigin) &&
          !$A.util.isEmpty(currencyDestination)
        ) {
          console.log("making call to get dominant currency");
          let action = component.get("c.getDominantCurrency");
          action.setParams({
            userData: userData,
            currencyOrigin: currencyOrigin,
            currencyDestination: currencyDestination
          });
          action.setCallback(this, function (response) {
            if (response.getState() == "SUCCESS") {
              let returnValue = response.getReturnValue();
              if (returnValue.success) {
                let value = returnValue.value;
                let dominantCurrency = value.dominantCurrency;
                if (!$A.util.isEmpty(dominantCurrency)) {
                  if (dominantCurrency == currencyOrigin) {
                    paymentDraft.sourceCurrencyDominant = true;
                  } else if (dominantCurrency == currencyDestination) {
                    paymentDraft.sourceCurrencyDominant = false;
                  }
                  component.set("v.paymentDraft", paymentDraft);
                  resolve(dominantCurrency);
                } else {
                  reject("problem consulting currencies service");
                }
              } else {
                reject("problem consulting currencies service");
              }
            } else {
              reject("problem consulting currencies service");
            }
          });
          $A.enqueueAction(action);
        }
      }),
      this
    );
  },

  /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Get the configurations for creating a new beneficiary by country
    History:
    <Date>          <Author>      <Description>
    12/02/2021      Bea Hill      Initial version
    */
  getNewBeneficiarySettings: function (component, event, helper, countryList) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let action = component.get("c.newBeneficiarySettings");
        action.setParams({
          countryList: countryList
        });
        action.setCallback(this, function (response) {
          if (response.getState() == "SUCCESS") {
            let returnValue = response.getReturnValue();
            if (returnValue.success) {
              let value = returnValue.value;
              component.set("v.newBeneficiarySettings", value);
              resolve("OK");
            } else {
              reject("KO");
            }
          } else {
            reject("KO");
          }
        });
        $A.enqueueAction(action);
      }),
      this
    );
  },

  /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Pass the registerbeneficiary component the input configurations of the selected country
    History:
    <Date>          <Author>      <Description>
    12/02/2021      Bea Hill      Initial version
    */
  handleNewBeneficiarySettings: function (component, event, helper, country) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let canNewBen = component.get("v.canCreateBeneficiaries");
        if (canNewBen == false) {
          resolve("OK");
        } else {
          let settings = component.get("v.newBeneficiarySettings");
          let countrySettings = settings[country];
          let ibanLength = countrySettings.ibanLength;
          let simpleForm = countrySettings.simpleForm;
          let accountTypeList = countrySettings.accountTypeList;
          let bankNameList = countrySettings.bankNameList;
          component.set("v.ibanLength", ibanLength);
          component.set("v.simpleForm", simpleForm);
          component.set("v.accountTypeList", accountTypeList);
          component.set("v.bankNameList", bankNameList);
          resolve("OK");
        }
      }),
      this
    );
  },

  /*
    Company:        Deloitte
    Description:    Call FX and Dominant Currency if not already calculated
    History:
    <Date>          <Author>            <Description>
    12/02/2021      Bea Hill            Initial version
    */
  checkExchangeRate: function (component, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");

        if ($A.util.isEmpty(paymentDraft.sourceAccount)) {
          reject("Source account must be informed");
        } else if (
          $A.util.isEmpty(
            paymentDraft.sourceAccount.currencyCodeAvailableBalance
          ) ||
          $A.util.isEmpty(paymentDraft.paymentCurrency)
        ) {
          reject("Both account currencies must be informed");
        } else if (
          paymentDraft.sourceAccount.currencyCodeAvailableBalance ==
          paymentDraft.paymentCurrency
        ) {
          resolve("Same currencies - No exchange rate");
        } else {
          if (
            $A.util.isEmpty(paymentDraft.exchangeRate) ||
            $A.util.isEmpty(paymentDraft.sourceCurrencyDominant)
          ) {
            return helper
              .getExchangeRate(
                component,
                helper,
                paymentDraft.sourceAccount.currencyCodeAvailableBalance,
                paymentDraft.paymentCurrency
              )
              .then(
                $A.getCallback(function (value) {
                  return helper.getDominantCurrency(
                    component,
                    helper,
                    paymentDraft.sourceAccount.currencyCodeAvailableBalance,
                    paymentDraft.paymentCurrency
                  );
                })
              )
              .then(
                $A.getCallback(function (value) {
                  resolve("OK");
                })
              );
          } else {
            resolve("OK");
          }
        }
      })
    ).catch(
      $A.getCallback(function (error) {
        reject("Problem with FX or dominant currency");
      }),
      this
    );
  },

  /*
    Company:        Deloitte
    Description:    Set paymentCurrency as the selected currency or as destination account currency if no payment currency informed
    History:
    <Date>          <Author>            <Description>
    12/02/2021      Bea Hill            Initial version
    */
  setPaymentCurrency: function (component, helper) {
    return new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        let paymentCurrency = paymentDraft.paymentCurrency;
        let selectedCurrency = component.get("v.selectedCurrency");
        if (!$A.util.isEmpty(paymentCurrency)) {
          resolve("OK");
        } else {
          if (!$A.util.isEmpty(selectedCurrency)) {
            paymentDraft.paymentCurrency = selectedCurrency;
            component.set("v.paymentDraft", paymentDraft);
            resolve("OK");
          } else {
            if ($A.util.isEmpty(paymentDraft.destinationAccount)) {
              reject("Destination account must be informed");
            } else if (
              $A.util.isEmpty(
                paymentDraft.destinationAccount.currencyCodeAvailableBalance
              )
            ) {
              reject("Destination account currency must be informed");
            } else {
              paymentDraft.paymentCurrency =
                paymentDraft.destinationAccount.currencyCodeAvailableBalance;
              component.set("v.paymentDraft", paymentDraft);
              resolve("OK");
            }
          }
        }
      })
    ).catch(
      $A.getCallback(function (error) {
        reject("Problem setting payment currency");
      }),
      this
    );
  },

  handleChangeCountry: function (component, event, helper) {
    let canNewBen = component.get("v.canCreateBeneficiaries");
    if (canNewBen == true) {
      let notificationTitle = $A.get("$Label.c.B2B_Error_Problem_Loading");
      let bodyText = $A.get("$Label.c.B2B_Error_Check_Connection");
      let country = component.get("v.selectedCountry");
      let selectedCurrency = component.get("v.selectedCurrency");
      //component.set('v.spinner', true);
      helper
        .handleNewBeneficiarySettings(component, event, helper, country)
        .then(
          $A.getCallback(function (value) {
            return helper.handleCurrencies(component, event, helper, country);
          })
        )
        .then(
          $A.getCallback(function (value) {
            if (value != selectedCurrency) {
              return helper.handleChangeCurrency(
                component,
                event,
                helper,
                value
              );
            } else {
              return "ok";
            }
          })
        )
        .then(
          $A.getCallback(function (value) {
            return helper.getBeneficiariesByCountry(
              component,
              event,
              helper,
              country
            );
          })
        )
        .catch(
          $A.getCallback(function (error) {
            component.set("v.accountList", []);
            var errorFX = component.get("v.errorFX");
            if (errorFX) {
              helper.showToast(component, notificationTitle, bodyText, true);
            }
          })
        )
        .finally(
          $A.getCallback(function () {
            let paymentDraft = component.get("v.paymentDraft");
            if (
              !$A.util.isEmpty(paymentDraft.destinationAccount) &&
              !$A.util.isEmpty(paymentDraft.destinationAccount.country)
            ) {
              if (paymentDraft.destinationAccount.country != country) {
                component.set("v.searchedString", "");
                component.get("v.paymentDraft.destinationAccount", {});
              }
            }
          })
        );
    }
  },

  handleChangeCurrency: function (component, event, helper, currency) {
    let notificationTitle = $A.get("$Label.c.B2B_Error_Problem_Loading");
    let bodyText = $A.get("$Label.c.B2B_Error_Check_Connection");
    component.set("v.spinner", true);
    let paymentDraft = component.get("v.paymentDraft");
    let sourceAccount = paymentDraft.sourceAccount;
    let currencyOrigin = sourceAccount.currencyCodeAvailableBalance;
    let currencyDestination = currency;
    new Promise(
      $A.getCallback(function (resolve, reject) {
        let paymentDraft = component.get("v.paymentDraft");
        paymentDraft.exchangeRate = null;
        paymentDraft.timestamp = null;
        paymentDraft.exchangeRateServiceResponse = null;
        paymentDraft.sourceCurrencyDominant = null;
        paymentDraft.paymentCurrency = currencyDestination;
        component.set("v.paymentDraft", paymentDraft);
        resolve("OK");
      })
    )
      .then(
        $A.getCallback(function (value) {
          return helper.getDominantCurrency(
            component,
            helper,
            currencyOrigin,
            currencyDestination
          );
        })
      )
      .then(
        $A.getCallback(function (value) {
          return helper.getExchangeRate(
            component,
            helper,
            currencyOrigin,
            currencyDestination
          );
        })
      )
      .catch(
        $A.getCallback(function (error) {
          var errorFX = component.get("v.errorFX");
          if (errorFX) {
            helper.showToast(component, notificationTitle, bodyText, true);
          }
        })
      )
      .finally(
        $A.getCallback(function () {
          component.set("v.spinner", false);
        })
      );
  }
});
