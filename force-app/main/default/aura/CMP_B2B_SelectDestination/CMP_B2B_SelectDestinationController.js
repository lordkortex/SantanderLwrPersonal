({
    initComponent: function (component,event, helper) {
        let steps = component.get('v.steps');
        steps.lastModifiedStep = 2;
        component.set('v.steps', steps);
        let transferType = component.get('v.transferType');
        let enableBrowseAccount = true;
        if (transferType == $A.get('$Label.c.PTT_international_transfer_single')) {
            component.set('v.canCreateBeneficiaries', true);
            helper.getCountryList(component, event, helper)
            .then($A.getCallback(function (value) {
                return helper.setCountryList(component, event, helper, value);
            })).then($A.getCallback(function (value) {
                return helper.getNewBeneficiarySettings(component, event, helper, value);
            })).catch($A.getCallback(function (error) {
            })).finally($A.getCallback(function () {
            }));  
        }
        /*component.set('v.paymentDraft.exchangeRate', null);
        component.set('v.paymentDraft.paymentCurrency', '');
        component.set('v.selectedCountry', '');
        component.set('v.selectedCurrency', '');*/
        
        component.set('v.enableBrowseAccount', enableBrowseAccount);
    },
    
    handleCheckContinue: function (component, event, helper) {
        component.set('v.spinner', true);
        let paymentDraft = component.get('v.paymentDraft');
        let draftData = component.get('v.draftData');
        let searchedString = component.get('v.searchedString');
        var msg = '';
      
        component.set('v.paymentDraft.exchangeRate', null);
        component.set('v.paymentDraft.paymentCurrency', '');
        component.set('v.selectedCountry', '');
        component.set('v.selectedCurrency', '');
        
        paymentDraft.reference	 = '';
        paymentDraft.purpose	 = '';
        paymentDraft.description	 = '';
        paymentDraft.amountReceive	 = null;
        paymentDraft.amountSend	 = null;
        
        if ($A.util.isEmpty(paymentDraft.destinationAccount)) {
            if (!$A.util.isEmpty(draftData)) {
                helper.validateNewBeneficiary(component, event, helper)
                .then($A.getCallback(function (value) {
                    return helper.validateAccount(component, event, helper);
                })).then($A.getCallback(function (value) {
                    return helper.setPaymentCurrency(component, helper);
                })).then($A.getCallback(function (value) {
                    return helper.updatePayment(component, helper);
                })).then($A.getCallback(function (value) {
                     return helper.checkExchangeRate(component, helper);
                })).then($A.getCallback(function (value) {
                    return helper.completeStep(component, helper);
                })).catch($A.getCallback(function (error) {
                    helper.isEditingStepError(component, event, helper);
                    console.log(error);
                })).finally($A.getCallback(function () {
                    component.set('v.spinner', false);
                }));
            } else {
                component.set('v.errorMSG_1', $A.get('$Label.c.B2B_Error_Enter_Input').replace('{0}.', ''));
                component.set('v.errorMSG_2', $A.get('$Label.c.B2B_Error_Invalid_Input').replace('{0} format.', ''));
                
                if (!$A.util.isEmpty(searchedString)) {
                    msg = $A.get('$Label.c.B2B_Error_Invalid_Input');
                } else {
                    msg = $A.get('$Label.c.B2B_Error_Enter_Input');
                }
                var msg_parameter = $A.get('$Label.c.B2B_Recipient_account');
                var full_msg = msg.replace('{0}', msg_parameter);
                component.set('v.errorMSG', full_msg);
                component.set('v.spinner', false);
                helper.isEditingStepError(component, event, helper);
            }
        } else {
            component.set('v.errorMSG', '');
            helper.validateAccount(component, event, helper)
            .then($A.getCallback(function (value) {
                return helper.setPaymentCurrency(component, helper);
            })).then($A.getCallback(function (value) {
                return helper.updatePayment(component, helper);
            })).then($A.getCallback(function (value) {
                 return helper.checkExchangeRate(component, helper);
            })).then($A.getCallback(function (value) {
                return helper.completeStep(component, helper);
            })).catch($A.getCallback(function (error) {
                helper.isEditingStepError(component, event, helper);
                console.log(error);
            })).finally($A.getCallback(function () {
                component.set('v.spinner', false);
            }));
        }
    },

    handleModified: function (component,event, helper) {
        let isModified = component.get('v.isModified');
        let steps = component.get('v.steps');
        if (isModified) {
            steps.lastModifiedStep = 2;
            steps.focusStep = 2;
            steps.shownStep = 2;
        }
        component.set('v.steps', steps);
    },

    handleChangeCountryOrCurrency: function (component, event, helper) {
        component.set('v.errorFX', true);
        let value = event.getParam('value')       
        if (value.length == 3) {
            helper.handleChangeCurrency(component, event, helper, value);
        } else if(value.length == 2){
            helper.handleChangeCountry(component, event, helper);
        }
    },

    handleChangeCountry: function (component, event, helper) {
        let notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
        let bodyText =  $A.get('$Label.c.B2B_Error_Check_Connection');
        let country = component.get('v.selectedCountry');
        component.set('v.spinner', true);
        helper.handleNewBeneficiarySettings(component, event, helper, country)
        .then($A.getCallback(function(value) {
            return helper.handleCurrencies(component, event, helper, country);
        })).then($A.getCallback(function(value) {
            return helper.getBeneficiariesByCountry(component, event, helper, country);
        })).catch($A.getCallback(function (error) {
            component.set('v.accountList', []);
            helper.showToast(component, notificationTitle, bodyText, true);
        })).finally($A.getCallback(function () {
            component.set('v.spinner', false);
        }));
    },

    handleChangeCurrency: function(component, event, helper) {
        let notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
        let bodyText =  $A.get('$Label.c.B2B_Error_Check_Connection');
        component.set('v.spinner', true);
        let paymentDraft = component.get('v.paymentDraft');
        let sourceAccount = paymentDraft.sourceAccount;
        let currencyOrigin = sourceAccount.currencyCodeAvailableBalance;
        let currencyDestination = component.get('v.selectedCurrency');
        new Promise($A.getCallback(function (resolve, reject) {
            let paymentDraft = component.get('v.paymentDraft');
            paymentDraft.exchangeRate = null;
            paymentDraft.timestamp = null;
            paymentDraft.exchangeRateServiceResponse = null;
            paymentDraft.sourceCurrencyDominant = null;
            paymentDraft.paymentCurrency = currencyDestination;
            component.set('v.paymentDraft', paymentDraft);
            resolve('OK');
        })).then($A.getCallback(function (value) {
            return helper.getDominantCurrency(component, helper, currencyOrigin, currencyDestination);
        })).then($A.getCallback(function (value) {
            return helper.getExchangeRate(component, helper, currencyOrigin, currencyDestination);
        })).catch($A.getCallback(function (error) {
            component.set('v.exchangeRateToShow', '');
            helper.showToast(component, notificationTitle, bodyText, true);
        })).finally($A.getCallback(function () {
            component.set('v.spinner', false);
        }));
    },


    newBeneficiaryAlert: function(component, event, helper) {
        var formOpen = event.getParam('formOpen');
        var emptyCountryError = event.getParam('emptyCountryError');
        if (emptyCountryError == true) {
            let notificationTitle = $A.get('$Label.c.PAY_CountryCurrencyEmpty');
            let bodyText = $A.get('$Label.c.PAY_ChooseCountryCurrencyNewBen');;
            helper.showToast(component, notificationTitle, bodyText, true);
        }
        if (formOpen == false) {
            component.set('v.showSearch', true);
        } else {
            component.set('v.showSearch', false);
        }
    },

    handleCompletedFormData: function(component, event, helper) {
        var draftData = event.getParam('data');
        component.set('v.draftData', draftData);
    },

    handleSelectAccount: function(component, event, helper) {
        let canNewBen = component.get('v.canCreateBeneficiaries');
        if (canNewBen == false) {
            let paymentDraft = component.get('v.paymentDraft');
        	paymentDraft.exchangeRate = null;
            paymentDraft.timestamp = '';
            paymentDraft.sourceCurrencyDominant  = null;
            component.set('v.paymentDraft', paymentDraft);
        }
        component.set('v.showBeneficiaryForm', false);
        let country = event.getParam('country');
        component.set('v.selectedCountry', country);
        var countryDropdown = component.find('countryDropdown');
        var selectedValues = [];
        selectedValues.push(country);
        countryDropdown.setSelectedValues(selectedValues);
    }
})