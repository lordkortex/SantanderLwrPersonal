({
    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Initialize CMP_PaymentsLandingParent component
    History
    <Date>			<Author>			<Description>
    28/05/2020		Shahad Naji   		Initial version
    24/07/2020		Shahad Naji			Simplify code that handles the success or failure of asynchronous calls, or code that chains together multiple asynchronous calls.
    23/09/2020      Bea Hill            Moved to helper, to allow handleReloadPage to call it.
    */
    doInitHelper: function (component, event, helper) {
        component.set('v.showSpinner', true);
        component.set('v.noService', false);
        //component.set('v.filterCounter', 0);
        //component.set('v.searchedString', "");

        var isSingleTabSelected = component.get('v.isSingleTabSelected');
        if (isSingleTabSelected == true) {

            Promise.all([
                helper.getURLParams(component, event, helper)
            ]).then($A.getCallback(function (value) {
                return helper.getCurrentUserData(component, helper);
            }), this).then($A.getCallback(function (value) {
                return helper.getAccountData(component, helper);
            }), this).then($A.getCallback(function (value) {
                return helper.getRawAccountsFiltered(component, helper, component.get('v.currentUser'));
            }), this).then($A.getCallback(function (value) {
                return helper.handleAccountsToList(component, helper, value);
            }), this).then($A.getCallback(function (value) {
                return Promise.all([
                    helper.getPaymentsStatuses(component, event, helper, isSingleTabSelected),
                    helper.getPaymentsInformation(component, event, helper, isSingleTabSelected)
                ]);
            }), this).then($A.getCallback(function (value) {
                return helper.getURLStatus(component, event, helper);
            }), this).catch(function (error) {
                console.log(error);
                helper.showToast(component, event, helper, error.title, error.body, error.noReload);
            }).finally($A.getCallback(function () {
                document.querySelector(".comm-page-custom-landing-payments").style.overflow = 'auto';
                component.set('v.showSpinner', false);
            }));
        } else {
            console.log('>>> SNJ - CMP_PaymentsLandingParent/doInit - Functionality to be develped the next Sprints');
        }
    },

    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Returns Current User Information
    History:
    <Date>			<Author>			<Description>
    28/05/2020		Shahad Naji   		Initial version
    24/07/2020		Shahad Naji			Simplify code that handles the success or failure of asynchronous calls.
    26/10/2020		Shahad Naji			currentUser attribute is set with values of WrapperUserData
    */
    getCurrentUserData: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getUserData');
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var result = response.getReturnValue();
                    if (result.success) {
                        if (!$A.util.isEmpty(result.value)) {
                            if (!$A.util.isEmpty(result.value.userData)) {
                                component.set('v.currentUser', result.value.userData);
                                resolve('getCurrentUserData_OK');
                            } else {
                                reject({
                                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                    'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                    'noReload': false
                                });
                            }
                        } else {
                            reject({
                                'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                'noReload': false
                            });
                        }

                    } else {
                        reject({
                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                            'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                            'noReload': false
                        });
                    }
                } else if (state === 'INCOMPLETE') {
                    reject({
                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                        'noReload': false
                    });
                } else if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject({
                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                        'noReload': false
                    });
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    getAccountData: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getAccountData');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var accountData = {};
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value.cib)) {
                            accountData.cib = stateRV.value.cib;
                        } else {
                            accountData.cib = false; // Añadir un error
                        }
                        if (!$A.util.isEmpty(stateRV.value.documentType)) {
                            accountData.documentType = stateRV.value.documentType;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.documentType = 'tax_id'; // Añadir un error
                        }
                        if (!$A.util.isEmpty(stateRV.value.documentNumber)) {
                            accountData.documentNumber = stateRV.value.documentNumber;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.documentNumber = 'B86561412'; // Añadir un error
                        }
                        if (!$A.util.isEmpty(stateRV.value.companyId)) {
                            accountData.companyId = stateRV.value.companyId;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.companyId = '2119'; // Añadir un error
                        }
                    }
                    component.set('v.accountData', accountData);
                    resolve('getAccountData_OK');
                } else if (actionResult.getState() == "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                    }
                    reject({
                        'header': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                        'text': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                        'noReload': true
                    });
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    handleAccountsToList: function (component, helper, value) {
        return new Promise($A.getCallback(function (resolve, reject) {
            if (!$A.util.isEmpty(value)) {
                component.set('v.accounts', value);
                resolve('handleAccountsToList_OK');
            } else {
                reject({
                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                    'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                    'noReload': false
                });
            }
        }), this);
    },

    /*
    Author:        	Maria Iñigo
    Company:        Deloitte
    Description:    Returns Current User Information
    History
    <Date>			<Author>			<Description>
    05/06/2020		Maria Iñigo  		Initial version
    07/07/2020      Bea Hill            Add new promise
    24/07/2020		Shahad Naji			Simplify code that handles the success or failure of asynchronous calls.
    */
    // CPC_TO_ERASE
    /*getCurrentAccounts : function(component, event, helper) {	
        let accountList = component.get('v.accounts');
        return new Promise($A.getCallback(function (resolve, reject) {
            if ($A.util.isEmpty(accountList)) {
                var isCashNexusUser =  component.get('v.currentUser').isNexus;
                console.log('global user id: ' + isCashNexusUser);                
                var action = component.get('c.getAccounts');
                action.setParams({ "isCashNexusUser" : isCashNexusUser });
                action.setCallback(this, function (actionResult) {
                    if (actionResult.getState() == 'SUCCESS') {
                        var stateRV = actionResult.getReturnValue();
                        if (stateRV.success) {
                            component.set('v.accounts', stateRV.value.accountList);
                            // component.set('v.showAccountsToast', false);
                        }else{
                            console.log($A.get("$Label.c.B2B_Problem_accounts"));
                            // component.set('v.showAccountsToast', true);
                            helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);

                        }
                        resolve('La ejecucion ha sido correcta.');
                    } else if (actionResult.getState() == "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                
                            }
                        } else {
                            console.log($A.get("$Label.c.B2B_Problem_accounts"));
                        }
                        // component.set('v.showAccountsToast', true);
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);

                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));

                    }
                });
                $A.enqueueAction(action);
            }
        }), this);  
    },*/

    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Returns payments statuses and calculates singleNumRecords
    History
    <Date>			<Author>			<Description>
    28/05/2020		Shahad Naji   		Initial version
    24/07/2020		Shahad Naji			Simplify code that handles the success or failure of asynchronous calls.
    22/09/2020		Bea Hill			If this service fails it shows an error message but does not stop the rest of calls in the promise in the init method.
    */
    getPaymentsStatuses: function (component, event, helper, isSingleTabSelected) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getPaymentsStatuses');
            var accounts = component.get('v.accounts');
            var globalUserId = component.get('v.currentUser.globalId');
            var errorTitle = $A.get('$Label.c.B2B_Error_Problem_Loading');
            var errorBody = $A.get('$Label.c.B2B_Error_Check_Connection');
            var errorNoReload = false;
            action.setParams({
                'accountList': accounts,
                'globalUserId': globalUserId
            });
            action.setCallback(this, function (response) {
                var state = response.getState();

                if (state === 'SUCCESS') {
                    var result = response.getReturnValue();
                    if (result.success) {
                        if (result != null && result != undefined && isSingleTabSelected) {
                            if (!$A.util.isEmpty(result.value)) {
                                if (!$A.util.isEmpty(result.value.output)) {
                                    if (!$A.util.isEmpty(result.value.output.paymentStatusList)) {
                                        component.set('v.singlePaymentStatusBoxes', result.value.output.paymentStatusList);
                                    }
                                    if (!$A.util.isEmpty(result.value.output.totalNumberOfRecords)) {
                                        component.set('v.singleNumRecords', result.value.output.totalNumberOfRecords);
                                    }
                                    resolve('ok');
                                } else {
                                    resolve('error statusHeader');
                                    helper.showToast(component, event, helper, errorTitle, errorBody, errorNoReload);
                                }
                            } else {
                                resolve('error statusHeader');
                                helper.showToast(component, event, helper, errorTitle, errorBody, errorNoReload);
                            }
                        } else {
                            resolve('error statusHeader');
                            helper.showToast(component, event, helper, errorTitle, errorBody, errorNoReload);
                        }
                    } else {
                        resolve('error statusHeader');
                        helper.showToast(component, event, helper, errorTitle, errorBody, errorNoReload);
                    }
                } else if (state === 'INCOMPLETE') {
                    resolve('error statusHeader');
                    helper.showToast(component, event, helper, errorTitle, errorBody, errorNoReload);
                } else if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    resolve('error statuseHeader');
                    helper.showToast(component, event, helper, errorTitle, errorBody, errorNoReload);
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Returns payments information (payments, the list of currencies, list of payment methods and list of statuses)
    History
    <Date>			<Author>			<Description>
    28/05/2020		Shahad Naji   		Initial version
    16/06/2020		Beatrice Hill   	Set simple countries list for payment method modal
    24/07/2020		Shahad Naji			Simplify code that handles the success or failure of asynchronous calls.
    */
    getPaymentsInformation: function (component, event, helper, isSingleTabSelected) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getPaymentsInformation');
            action.setParams({
                'accountList': component.get('v.accounts')
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var result = response.getReturnValue();
                    if (isSingleTabSelected) {
                        if (result != null && result != undefined) {
                            if (result.success) {
                                if (!$A.util.isEmpty(result.value)) {
                                    if (!$A.util.isEmpty(result.value.output)) {
                                        component.set('v.singleStatusDropdownList', result.value.output.statusList);
                                        component.set('v.singleCurrencyDropdownList', result.value.output.currencyList);
                                        component.set('v.singlePaymentMethodDropdownList', result.value.output.paymentTypeList);
                                        component.set('v.singleCountryDropdownList', result.value.output.countryList);
                                        component.set('v.simpleCountryDropdownList', result.value.output.countryList);
                                        component.set('v.initialSinglePaymentList', result.value.output.paymentsList);
                                        component.set('v.singlePaymentList', result.value.output.paymentsList);
                                        component.find('paymentsLandingTable').setComponent(result.value.output.paymentsList);
                                        component.set('v.isSingleDataLoaded', true);
                                        component.set('v.availableStatuses', result.value.output.availableStatuses);
                                        resolve('ok');
                                    } else {
                                        reject({
                                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                            'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                            'noReload': false
                                        });
                                    }
                                } else {
                                    reject({
                                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                        'noReload': false
                                    });
                                }

                            } else {
                                if (!$A.util.isEmpty(result.value)) {
                                    if (!$A.util.isEmpty(result.value.output)) {
                                        component.set('v.singleStatusDropdownList', result.value.output.statusList);
                                        component.set('v.singleCurrencyDropdownList', result.value.output.currencyList);
                                        component.set('v.singlePaymentMethodDropdownList', result.value.output.paymentTypeList);
                                        component.set('v.singleCountryDropdownList', result.value.output.countryList);
                                        component.set('v.simpleCountryDropdownList', result.value.output.countryList);
                                        component.set('v.isSingleDataLoaded', true);
                                        reject({
                                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                            'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                            'noReload': false
                                        });
                                        //resolve('getPaymentsInformation_OK'); 
                                    } else {
                                        reject({
                                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                            'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                            'noReload': false
                                        });
                                    }
                                } else {
                                    reject({
                                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                        'noReload': false
                                    });
                                }

                            }

                        } else {
                            reject({
                                'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                'noReload': false
                            });
                        }
                    }
                    /*  if (result.success) {
                        console.log(result);
                        if (result != null &&  result != undefined && isSingleTabSelected) {
                            component.set('v.singleStatusDropdownList', result.value.output.statusList);
                            component.set('v.singleCurrencyDropdownList', result.value.output.currencyList);
                            component.set('v.singlePaymentMethodDropdownList', result.value.output.paymentTypeList);
                            component.set('v.singleCountryDropdownList', result.value.output.countryList);
                            component.set('v.initialSinglePaymentList', result.value.output.paymentsList);
                            component.set('v.singlePaymentList', result.value.output.paymentsList);
                            component.set('v.simpleCountryDropdownList', result.value.output.countryList); 
                            component.find('paymentsLandingTable').setComponent(result.value.output.paymentsList);
                            component.set('v.isSingleDataLoaded', true);
                            resolve('getPaymentsInformation_OK');   
                        } else {
                            reject({
                                'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                'noReload': false
                            });
                        }
                    } else {
                        reject({
                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                            'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                            'noReload': false
                        });
                    } */
                } else if (state === 'INCOMPLETE') {
                    reject({
                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                        'noReload': false
                    });
                } else if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject({
                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                        'noReload': false
                    });
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    searchOperationsList: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var globalUserId = event.getParam('globalUserId');
            var pendingAuthorization = event.getParam('pendingAuthorization');
            var latestOperationsFlag = false;//event.getParam('latestOperationsFlag'); 
            var sourceAccountList = event.getParam('sourceAccountList');
            var destinationCountry = event.getParam('destinationCountry');
            var statusList = event.getParam('statusList');
            var amountFrom = event.getParam('amountFrom');
            var amountTo = event.getParam('amountTo');
            var currencyList = event.getParam('currencyList');
            var paymentType = event.getParam('paymentMethod');
            var clientReference = event.getParam('clientReference');
            var valueDateFrom = event.getParam('valueDateFrom');
            var valueDateTo = event.getParam('valueDateTo');
            var accountList = component.get('v.accounts');
            var action = component.get('c.searchPaymentsInformation');

            action.setParams({
                'globalUserId': globalUserId,
                'pendingAuthorization': pendingAuthorization,
                'sourceAccountList': sourceAccountList,
                'destinationCountry': destinationCountry,
                'statusList': statusList,
                'amountFrom': amountFrom,
                'amountTo': amountTo,
                'currencyList': currencyList,
                'productId': paymentType,
                'clientReference': clientReference,
                'valueDateFrom': valueDateFrom,
                'valueDateTo': valueDateTo,
                'latestOperationsFlag': latestOperationsFlag,
                'accountList': accountList
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var result = response.getReturnValue();
                    if (result.success) {
                        component.find('paymentsLandingTable').setComponent(result.value.output.paymentsList);
                        component.set('v.singlePaymentList', result.value.output.paymentsList);
                        resolve('ok');
                    } else {
                        component.find('paymentsLandingTable').setComponent(null);
                        component.set('v.singlePaymentList', null);
                        console.log('ko');
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
                } else if (state === 'INCOMPLETE') {
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                } else if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                    component.find('paymentsLandingTable').setComponent(null);
                    component.set('v.singlePaymentList', null);
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    showToast: function (component, event, helper, title, body, noReload) {
        var errorToast = component.find('errorToast');
        component.set('v.noService', true);
        if (!$A.util.isEmpty(errorToast)) {
            //errorToast.showToast(action, static, notificationTitle, bodyText, functionTypeText, functionTypeClass, functionTypeClassIcon, noReload, landing)
            errorToast.openToast(false, false, title, body, 'Error', 'warning', 'warning', noReload, true);
        }
    },
    //Modificado po JHM 12/01/2021
    showSuccessToast: function (component, event, helper, title, body) {
        var successToast = component.find('errorToast');
        component.set('v.noService', true);
        if (!$A.util.isEmpty(successToast)) {
            //errorToast.showToast(action, static, notificationTitle, bodyText, functionTypeText, functionTypeClass, functionTypeClassIcon, noReload, landing)
            successToast.openToast(false, false, title, body, 'Success', 'success', 'success', true, true);
        }
    },
    /* showSuccessToast: function(component, event, helper, title, body, method) {
         var toast = component.find('toast');
         if (!$A.util.isEmpty(toast)) {
             toast.openToast(true, false, title, body, 'Success', 'success', 'success', false,false , method);
         }
     },*/


    /*
    Author:        	Bea Hill 
    Company:        Deloitte
    Description:    Call searchOperations service to download file
    History
    <Date>			<Author>			<Description>
    04/09/2020		Bea Hill   		    Initial version
    */
    getDocumentId: function (component, event, helper, fileFormat) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.downloadPayments');
            action.setParams(
                {
                    "accountList": component.get('v.accounts'),
                    "fileFormat": fileFormat
                }
            );
            var documentId = '';
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var result = response.getReturnValue();
                    if (result.success) {
                        if (!$A.util.isEmpty(result.value)) {
                            if (!$A.util.isEmpty(result.value.output)) {
                                if (!$A.util.isEmpty(result.value.output.documentId)) {
                                    documentId = result.value.output.documentId;
                                    var fileName = '';
                                    if (!$A.util.isEmpty(result.value.output.fileName)) {
                                        fileName = result.value.output.fileName;
                                    }
                                    var toastText = $A.get('$Label.c.PAY_fileDownloaded');
                                    toastText = toastText.replace("{0}", fileName);
                                    helper.showSuccessToast(component, event, helper, $A.get('$Label.c.PAY_downloadSuccessful'), toastText);
                                    resolve(documentId);
                                } else {
                                    reject({
                                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                        'noReload': true
                                    });
                                }
                            } else {
                                reject({
                                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                    'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                    'noReload': true
                                });
                            }
                        } else {
                            reject({
                                'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                                'noReload': true
                            });
                        }

                    } else {
                        reject({
                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                            'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                            'noReload': true
                        });
                    }
                } else if (state === 'INCOMPLETE') {
                    reject({
                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                        'noReload': true
                    });
                } else if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject({
                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                        'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                        'noReload': true
                    });
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to remove the downloaded
    History
    <Date>			<Author>		<Description>
    17/12/2019		R. Alexander Cervino     Initial version*/

    removeFile: function (component, event, helper, ID) {

        try {
            var action = component.get("c.removeFile");
            //Send the payment ID
            action.setParams({ id: ID });
            action.setCallback(this, function (response) {
                var state = response.getState();

                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                } else if (state === "SUCCESS") {
                }
            });
            $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    },

    downloadFile: function (component, event, helper, documentId) {
        return new Promise($A.getCallback(function (resolve, reject) {
            if (documentId != null && documentId != '' && documentId != undefined) {
                var domain = $A.get('$Label.c.domain');
                window.location.href = domain + '/sfc/servlet.shepherd/document/download/' + documentId + '?operationContext=S1';
                resolve(documentId);
            } else {
                reject({
                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                    'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                    'noReload': true
                });
            }
        }), this);

    },

    /*Author:       R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to decrypt data
    History:
    <Date>			<Author>		         <Description>
    28/09/2020		R. Alexander Cervino     Initial version*/
    decrypt: function (component, data) {
        try {
            var result = "null";
            var action = component.get("c.decryptData");

            action.setParams({ str: data });

            return new Promise(function (resolve, reject) {
                action.setCallback(this, function (response) {
                    var state = response.getState();
                    console.log(state);
                    console.log(response.getReturnValue());
                    if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " +
                                    errors[0].message);
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

        } catch (e) {
            console.error(e);
        }
    },
    getURLParams: function (component, event, helper) {
        try {
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("=");
            var sParameterName;
            var sPageURL;
            var paymentAction = '';
            var paymentData = {};
            var message = '';
            var method = '';
            if (sURLVariablesMain[0] == 'params') {
                if (sURLVariablesMain[1] != '' && sURLVariablesMain[1] != undefined && sURLVariablesMain[1] != null) {
                    helper.decrypt(component, sURLVariablesMain[1]).then($A.getCallback(function (results) {
                        sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                        var sURLVariables = sPageURL.split('&');

                        for (var i = 0; i < sURLVariables.length; i++) {
                            sParameterName = sURLVariables[i].split('=');

                            if (sParameterName[0] === 'c__signed') {
                                if (sParameterName[1] != undefined && sParameterName[1] != 'false') {
                                    if(sParameterName[1] == 'last'){
                                        let userId = $A.get('$SObjectType.CurrentUser.Id');
                            			window.localStorage.setItem(userId + '_clearCache','true');
                                        window.localStorage.removeItem(userId + '_balanceGP_timestamp');
                                        window.localStorage.removeItem(userId + '_balanceTimestampGP');
                                        window.localStorage.removeItem(userId + '_balanceGP');
                                    }

                                    helper.showSuccessToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.authorizeSuccess'));
                                }
                            }
                             if (sParameterName[0] === 'c__discard') {
                                if (sParameterName[1] != undefined && sParameterName[1] != 'false') {
                                    helper.showSuccessToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.Pay_discarted'));
                                }
                            }
                            if (sParameterName[0] === 'c__cancel') {
                                if (sParameterName[1] != undefined && sParameterName[1] != 'false') {
                                    helper.showSuccessToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.PAY_canceled'));
                                }
                            }
                            if (sParameterName[0] === 'c__saveForLater') {
                                if (sParameterName[1] != undefined && sParameterName[1] != 'false') {
                                    helper.showSuccessToast(component, event, helper, $A.get('$Label.c.PAY_savedSuccess'),null);
                                }
                            }
                            if (sParameterName[0] === 'c__review') {
                                if (sParameterName[1] != undefined && sParameterName[1] != 'false') {
                                    helper.showSuccessToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.PAY_sendReview'));
                                }
                            }
                            if (sParameterName[0] === 'c__reject') {
                                if (sParameterName[1] != undefined && sParameterName[1] != 'false') {
                                    helper.showSuccessToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.PAY_sendRejected'));
                                }
                            }
                            if (sParameterName[0] === 'c__FFCError') {
                                if (!$A.util.isEmpty(sParameterName[1]) && sParameterName[1] == 'true') {
                                    helper.showToast(component, event, helper, $A.get('$Label.c.FCCError'), $A.get('$Label.c.FCCErrorDescription'), true);
                                }
                            }
                            if (sParameterName[0] === 'c__error') {
                               // if (!$A.util.isEmpty(sParameterName[1]) && sParameterName[1] == 'true') {
                                    helper.showToast(component, event, helper, null, $A.get('$Label.c.PAY_ServiceTemporalyDown'), true);
                              //  }
                            }

                        }

                    }));

                }
            }else if(sURLVariablesMain[0] == 'publicParams'){
                if (sURLVariablesMain[1] != '' && sURLVariablesMain[1] != undefined && sURLVariablesMain[1] != null) {
                    if ((sURLVariablesMain[1] === 'c__pendingByMe' || sURLVariablesMain[1] === 'c__pendingByOthers'
                                || sURLVariablesMain[1] === 'c__inReview' || sURLVariablesMain[1] === 'c__scheduled'
                                || sURLVariablesMain[1] === 'c__completed' || sURLVariablesMain[1] === 'c__rejected')) {
                                component.set('v.urlFilter', sURLVariablesMain[1]);
                            }
                }
            }


        } catch (e) {
            console.log(e);
        }
    },

    goToPaymentDetail: function (component, event, helper) {
        var payment = component.get('v.paymentObject');
        var paymentID = payment.paymentId;
        var url = "c__currentUser=" + JSON.stringify(component.get("v.currentUser")) + "&c__paymentID=" + paymentID;
        var page = 'landing-payment-details';
        helper.goTo(component, event, page, url);
    },

    /*
    Author:        	Beatrice Hill
    Company:        Deloitte
    Description:    Encryption for page navigation
    History
    <Date>			<Author>			<Description>
    18/11/2020      Beatrice Hill       Adapted from CMP_AccountsCardRow
    */

    goTo: function (component, event, page, url) {
        let navService = component.find("navService");

        if (url != '') {

            this.encrypt(component, url).then(function (results) {

                let pageReference = {
                    type: "comm__namedPage",
                    attributes: {
                        pageName: page
                    },
                    state: {
                        params: results
                    }
                }
                navService.navigate(pageReference);
            });
        } else {
            let pageReference = {
                type: "comm__namedPage",
                attributes: {
                    pageName: page
                },
                state: {
                    params: ''
                }
            }
            navService.navigate(pageReference);

        }

    },

    getURLStatus: function (component, event, helper) {
        return new Promise($A.getCallback((resolve, reject) => {
            try {
                let urlFilter = component.get('v.urlFilter');
                let paymentStatusBoxes = component.get('v.singlePaymentStatusBoxes');
                if (!$A.util.isEmpty(urlFilter)) {
                    let statusName = null;
                    if (urlFilter === 'c__pendingByMe') {
                        statusName = $A.get('$Label.c.PAY_Status_PendingOne');
                    } else if (urlFilter === 'c__pendingByOthers') {
                        statusName = $A.get('$Label.c.PAY_Status_PendingTwo');
                    } else if (urlFilter === 'c__inReview') {
                        statusName = $A.get('$Label.c.PAY_Status_InReviewOne');
                    } else if (urlFilter === 'c__scheduled') {
                        statusName = $A.get('$Label.c.PAY_Status_ScheduledOne');
                    } else if (urlFilter === 'c__completed') {
                        statusName = $A.get('$Label.c.PAY_Status_CompletedOne');
                    } else if (urlFilter === 'c__rejected') {
                        statusName = $A.get('$Label.c.PAY_Status_RejectedOne');
                    }
                    if (!$A.util.isEmpty(statusName)) {
                        let paymentStatusBox = null;
                        for (let i = 0; i < paymentStatusBoxes.length && paymentStatusBox == null; i++) {
                            if (paymentStatusBoxes[i].parsedStatusDescription == statusName) {
                                paymentStatusBox = paymentStatusBoxes[i];
                            }
                        }
                        if (!$A.util.isEmpty(paymentStatusBox)) {
                            component.set('v.selectedPaymentStatusBox', paymentStatusBox);
                            component.set('v.isHeaderOptionSelected', true);
                        } else {
                            throw 'Error searching the box';
                        }
                    } else {
                        throw 'Error looking the statusName';
                    }
                }
                resolve('OK_getURLStatus');  
            } catch (e) {
                console.log(e);
                reject({
                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                    'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                    'noReload': true
                });
            }
        }));
    }       
})