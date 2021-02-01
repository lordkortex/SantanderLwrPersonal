({
    initComponent: function (component, event, helper) {
        new Promise($A.getCallback(function (resolve, reject) {
            let steps = component.get('v.steps');
            steps.shownStep = 1;
            steps.focusStep = 1;
            steps.lastModifiedStep = 1;
            steps.totalSteps = 5;
            component.set('v.steps', steps);
            component.set('v.dataSelectOrigin', {});
            component.set('v.dataSelectDestination', {});
            component.set('v.dataSelectAmount', {});
            component.set('v.dataPaymentInformation', {});
            component.set('v.spinner', true);
            resolve('Ok');
        })).then($A.getCallback(function (value) {
            return helper.getURLParams(component, helper);
        })).then($A.getCallback(function (value) {
            return helper.getUserData(component, helper);
        })).then($A.getCallback(function (value) {
            return helper.getAccountData(component, helper);
        })).then($A.getCallback(function (value) {           
            return helper.getAccountsToB2BOrigin(component, helper, component.get('v.userData'));
        })).then($A.getCallback(function (value) {
            return helper.handleAccountsToB2BOrigin(component, helper, value);
        })).then($A.getCallback(function (value) {
            return helper.initEditingProcess(component, helper);
        })).catch($A.getCallback(function (error) {
            console.log(error);
            component.set('v.showErrorScreen', true);
            let steps = component.get('v.steps');
            steps.totalSteps = 0;
            component.set('v.steps', steps);
        })).finally($A.getCallback(function () {
            component.set('v.spinner', false);
        }));
    },

    handleCompleteStep: function (component, event, helper) {
        let confirm = event.getParam('confirm');
        if (confirm == true) {
            helper.getBeneficiaryAccounts(component, helper)
            .then($A.getCallback(function (value) {
                return helper.checkLastModified(component, helper);
            })).then($A.getCallback(function (value) {
                helper.nextStep(component, helper)
            })).catch($A.getCallback(function (error) {
                console.log(error);
            }));
        } else if (confirm == false) {
            component.set('v.isEditingProcess', false);
            component.set('v.paymentDetails', {});
        }
    },

    handleBack: function (component, event, helper) {
        let steps = component.get('v.steps');
        if (steps.focusStep == 5) {
            component.set('v.isEditing', true);
        }
        helper.previousStep(component, helper);
    },

    handleCancel: function (component, event, helper) {
        alert('Cancelar.');
    },

    handleContinue: function (component, event, helper) {
        let focusStep = component.get('v.steps.lastModifiedStep');
        if (focusStep == 1) {
            let selectOrigin = component.find('selectOrigin');
            selectOrigin.checkContinue(1);
        } else if (focusStep == 2) {
            let selectDestination = component.find('selectDestination');
            selectDestination.checkContinue(2);
        } else if (focusStep == 3) {
            let selectAmount = component.find('selectAmount');
            selectAmount.checkContinue(3);
        } else if (focusStep == 4) {
            let paymentInformation = component.find('paymentInformation');
            paymentInformation.checkContinue(4);
        }
    },

    handleReloadRetrieveAccounts: function (component, event, helper) {
        let reload = event.getParam('reload');
        let landing = event.getParam('landing');
        var accountListOrigin = component.get('v.accountListOrigin');
        var accountListDestination = component.get('v.accountListDestination');
        var step = null;
        if ($A.util.isEmpty(accountListOrigin)) {
            step = 1;
        } else if ($A.util.isEmpty(accountListDestination)) {
            step = 2;
        }
        if (reload && !landing && step != null) {
            new Promise($A.getCallback(function (resolve, reject) {
                component.set('v.spinner', true);
                resolve('Ok');
            }), this).then($A.getCallback(function (value) {
                if (step == 1) {
                    return helper.getAccountsToB2BOrigin(component, helper, component.get('v.userData'), component.get('v.accountData'));
                } else if (step == 2) {
                    var userData = component.get('v.userData');
                    return helper.getAccountsToB2BDestination(component, helper, userData, userData.companyId);
                }
            })).then($A.getCallback(function (value) {
                if (step == 1) {
                    return helper.handleAccountsToB2BOrigin(component, helper, value);
                } else if (step == 2) {
                    return helper.handleAccountsToB2BDestination(component, helper, value);
                }
            })).then($A.getCallback(function (value) {
                if (step == 2) {
                    return helper.checkLastModified(component, helper);
                }
            })).then($A.getCallback(function (value) {
                if (step == 2) {
                    helper.nextStep(component, helper);
                }
            })).catch($A.getCallback(function (error) {
                console.log(error);
                helper.showToast(component, event, helper, error.title, error.body, error.noReload);
            })).finally($A.getCallback(function () {
                component.set('v.spinner', false);
            }));
            component.set('v.reload', false);
        }
    },

    goToLanding: function(component) {
        let navService = component.find("navService");
        let pageReference = {
                type: "comm__namedPage", 
                attributes: {
                        pageName: 'landing-payments'
                },
                state: {
                        params : ''
                }
        }
        navService.navigate(pageReference);   
    },
    
    goToHelp: function(component) {
        let navService = component.find("navService");
        let pageReference = {
                type: "comm__namedPage", 
                attributes: {
                        pageName: 'contact-us'
                },
                state: {
                        params : ''
                }
        }
        navService.navigate(pageReference);   
    }

})