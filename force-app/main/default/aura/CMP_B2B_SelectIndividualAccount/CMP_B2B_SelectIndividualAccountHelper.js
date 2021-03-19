({
  clearInput: function (component, helper, isForExpenses) {
    component.set("v.searchedString", "");
    component.set("v.showValidationIBANError", false);
    component.set("v.showDropdown", false);
    component.set("v.account", {});
    component.set("v.accountSuggestions", []);
    component.set("v.errorMSG", "");
    component.set("v.isModified", true);
    component.set("v.isEditing", false);
  },

  activateDropdown: function (component, helper, inputLookupValue) {
    let showDropdown = false;
    let lastBeneficiaries = "";
    let account = component.get("v.account");
    let minChars = component.get("v.charactersBeforeSuggestions");
    let showBeforeSearch = component.get("v.showAccountsBeforeSearch");
    if ($A.util.isEmpty(account)) {
      if ($A.util.isEmpty(inputLookupValue)) {
        if (showBeforeSearch) {
          let accountList = component.get("v.accountList");
          let maxLength = component.get("v.maxSuggestions");
          let accountSuggestions = [];
          if (!$A.util.isEmpty(accountList)) {
            for (
              let i = 0;
              i < accountList.length && accountSuggestions.length < maxLength;
              i++
            ) {
              let account = accountList[i];
              accountSuggestions.push(account);
            }
          }
          component.set("v.accountSuggestions", accountSuggestions);
          let length = accountSuggestions.length;
          lastBeneficiaries = $A.get("$Label.c.PAY_LastBeneficiariesUsed");
          lastBeneficiaries = lastBeneficiaries.replace("{0}", length);
          showDropdown = true;

          if (length == 0) {
            let notificationTitle = $A.get(
              "$Label.c.B2B_Error_Not_Beneficiary_Saved"
            );
            let bodyText = $A.get("$Label.c.B2B_Error_New_Beneficiary");
            helper.showToast(component, notificationTitle, bodyText, true);
            showDropdown = false;
          }
        }
      } else {
        if (inputLookupValue.length >= minChars) {
          helper.searchAccounts(component, inputLookupValue);
          showDropdown = true;
        } else {
          if (showBeforeSearch) {
            let accountList = component.get("v.accountList");
            let maxLength = component.get("v.maxSuggestions");
            let accountSuggestions = [];
            if (!$A.util.isEmpty(accountList)) {
              for (
                let i = 0;
                i < accountList.length && accountSuggestions.length < maxLength;
                i++
              ) {
                let account = accountList[i];
                accountSuggestions.push(account);
              }
            }
            component.set("v.accountSuggestions", accountSuggestions);
            let length = accountSuggestions.length;
            lastBeneficiaries = $A.get("$Label.c.PAY_LastBeneficiariesUsed");
            lastBeneficiaries = lastBeneficiaries.replace("{0}", length);
            showDropdown = true;
          }
        }
      }
      component.set("v.searchedString", inputLookupValue);
      component.set("v.showDropdown", showDropdown);
    }
    component.set("v.lastBeneficiariesMessage", lastBeneficiaries);
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

  openSearchAccounts: function (component, helper) {
    var searchAccounts = component.find("searchAccounts");
    if (!$A.util.isEmpty(searchAccounts)) {
      searchAccounts.openModal();
    }
  },

  selectedAccount: function (component, helper, account) {
    helper.clearInput(component, helper, false);

    let country = "";
    if (!$A.util.isEmpty(account)) {
      component.set("v.errorMSG", "");
      component.set("v.account", account);
      component.set("v.searchedString", account.displayNumber);
      country = account.country;
    } else {
      var msg = $A.get("$Label.c.B2B_Not_informed_account");
      toast().error("", msg);
    }
    var action = component.getEvent("selectAccount");
    action.setParams({
      country: country
    });
    action.fire();
  },

  searchAccounts: function (component, searchedString) {
    let accountList = component.get("v.accountList");
    let maxLength = component.get("v.maxSuggestions");
    let accountSuggestions = [];
    if (!$A.util.isEmpty(accountList) && !$A.util.isEmpty(searchedString)) {
      searchedString = searchedString.toLowerCase();
      for (
        let i = 0;
        i < accountList.length && accountSuggestions.length < maxLength;
        i++
      ) {
        let coincidencia = false;
        let account = accountList[i];
        let displayNumber = account.displayNumber;
        let alias = account.alias;
        if (!$A.util.isEmpty(displayNumber)) {
          displayNumber = displayNumber.toLowerCase();
          if (displayNumber.includes(searchedString)) {
            coincidencia = true;
          }
        }
        if (!$A.util.isEmpty(alias)) {
          alias = alias.toLowerCase();
          if (alias.includes(searchedString)) {
            coincidencia = true;
          }
        }
        if (coincidencia == true) {
          accountSuggestions.push(account);
        }
      }
    }
    component.set("v.accountSuggestions", accountSuggestions);
  }
});
