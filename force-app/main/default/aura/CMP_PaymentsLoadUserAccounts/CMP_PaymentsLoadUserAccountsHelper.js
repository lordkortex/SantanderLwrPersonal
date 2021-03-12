({
    // GET PROCESS METHODS
    //19-11-2020 - SNJ - Add transferType as an input method
    getAccountsToB2BOrigin: function (component, helper, userData, transferType) {
        return new Promise($A.getCallback(function (masterResolve, masterReject) {
            let key = 'AccountsToB2BOrigin';
            //let services = [];
           	//services.push('add_international_payment_internal'); //07-09-2020 - SNJ - Accounts which can be selected by current logged in user to initiate a payment procedure
            helper.handleRetrieveFromCache(component, helper, key)
            .then($A.getCallback(function (value) {
                if (!$A.util.isEmpty(value)) {
                    masterResolve(value);
                } else {
                    helper.callToAccountsWithAttributions(component, helper, userData, transferType)
                    .then($A.getCallback(function (value) {
                        return helper.filterAccountsToB2BOriginByCountryAndCurrency(component, helper, userData, value);
                    })).then($A.getCallback(function (value) {
                        return helper.handleSaveToCache(component, helper, key, value);
                    })).then($A.getCallback(function (value) {
                        masterResolve(value);
                    })).catch($A.getCallback(function (error) {
                        console.log(error);
                        masterReject({
                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                            'body': $A.get('$Label.c.B2B_Problem_accounts'),
                            'noReload': false
                        });
                    }));
                }
                
            })).catch($A.getCallback(function (error) {
                console.log(error);
                masterReject({
                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                    'body': $A.get('$Label.c.B2B_Problem_accounts'),
                    'noReload': false
                });
            }));
        }), this);
    },

    getAccountsToList: function (component, helper, userData, accountData) {
        return new Promise($A.getCallback(function (masterResolve, masterReject) {
            let key = 'AccountsToList';
            //let services = []; 
            //services.push('list_international_payments'); //07-09-2020 - SNJ - Accounts which payments can be visualized by the logged in user
            helper.handleRetrieveFromCache(component, helper, key)
            .then($A.getCallback(function (value) {
                if (!$A.util.isEmpty(value)) {
                    masterResolve(value);
                } else {
                    helper.callToAccountsWithoutAttributions(component, helper, userData) //29-09-2020 - SNJ - invokes callToAccountsWithoutAttributions instead of callToAccountsWithAttributions
					.then($A.getCallback(function (value) {
                        return helper.discardAccountsByCountry(component, helper, userData, value);
                    })).then($A.getCallback(function (value) {
                        return helper.handleSaveToCache(component, helper, key, value);
                    })).then($A.getCallback(function (value) {
                        masterResolve(value);
                    })).catch($A.getCallback(function (error) {
                        console.log(error);
                        masterReject({
                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                            'body': $A.get('$Label.c.B2B_Problem_accounts'),
                            'noReload': false
                        });
                    }));
                }
            })).catch($A.getCallback(function (error) {
                console.log(error);
                masterReject({
                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                    'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                    'noReload': false
                });
            }));
        }), this);
    },

  	/*
    01/12/2020      Bea Hill        Add transferType
    25/01/2021		Andrea Martín	Change the key for the cache 
    02/03/2021		Bea Hill		Remove the cache for IIP so that user can access the new beneficiary
	*/
    getAccountsToB2BDestination: function (component, helper, user, transferType, sourceAccount) {
        return new Promise($A.getCallback(function (masterResolve, masterReject) {
            console.log("AQUI");
            let key = 'AccountsToB2BDestination';
    		let companyGlobalId = ""; 
    		let countryOriginator = "";
   			if(sourceAccount != null){
    			if (sourceAccount.companyIdsList != null){
                    if (!$A.util.isEmpty(sourceAccount.companyIdsList.GTS)){
                        companyGlobalId = sourceAccount.companyIdsList.GTS;
                    }
				}
 				if(sourceAccount.country != null){
                	countryOriginator = sourceAccount.country;
            	}           
        	} 
              
            let keyCache = key + '_' + companyGlobalId + '_' + countryOriginator;
            if (transferType == $A.get('$Label.c.PTT_international_transfer_single')) {
            	keyCache = 'noCache';
            }
            helper.handleRetrieveFromCache(component, helper, keyCache).then($A.getCallback(function (value) {
                if (!$A.util.isEmpty(value)) {
                    masterResolve(value);
                } else {
                    helper.getAccountsToB2BOrigin(component, helper, user, transferType).then($A.getCallback(function (value) {
                        console.log('testAlex');
                        console.log(value);
                        return helper.callToBeneficiaryAccounts(component, helper, user, transferType, sourceAccount, value)
                        .then($A.getCallback(function (value) {
                            return helper.handleSaveToCache(component, helper, keyCache, value);
                        })).then($A.getCallback(function (value) {
                            masterResolve(value);
                        })).catch($A.getCallback(function (error) {
                            console.log(error);
                            masterReject({
                                'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                                'body': $A.get('$Label.c.B2B_Problem_accounts'),
                                'noReload': false
                            });
                        }));
                    }));
                }
                
            })).catch($A.getCallback(function (error) {
                console.log(error);
                masterReject({
                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                    'body': $A.get('$Label.c.B2B_Problem_accounts'),
                    'noReload': false
                });
            }));
        }), this);
    },

    // OBTAIN DATA METHODS

    callToAccountsWithAttributions: function (component, helper, nexus, transferType) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let action = component.get('c.callToAccountsWithAttributions');
            action.setParams({
                'userData': nexus,
                'transferType': transferType
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() === 'SUCCESS') {
                    let stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        resolve(stateRV.value.accountList);
                    } else {
                        reject('callToAccountsWithAttributions_ERROR');
                    }
                } else if (actionResult.getState() === 'INCOMPLETE') {
                    reject('callToAccountsWithAttributions_ERROR');
                } else if (actionResult.getState() === 'ERROR') {
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject('callToAccountsWithAttributions_ERROR');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    callToAccountsWithoutAttributions: function (component, helper, nexus) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let action = component.get('c.callToAccountsWithoutAttributions');
            action.setParams({
                'userData': nexus
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() === 'SUCCESS') {
                    let stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        resolve(stateRV.value.accountList);
                    } else {
                        reject('callToAccountsWithAttributions_ERROR');
                    }
                } else if (actionResult.getState() === 'INCOMPLETE') {
                    reject('callToAccountsWithAttributions_ERROR');
                } else if (actionResult.getState() === 'ERROR') {
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject('callToAccountsWithAttributions_ERROR');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    /*01/12/2020        Bea Hill       Remove companyId parameter and add transferType*/
    callToBeneficiaryAccounts: function (component, helper, userData, transferType, sourceAccount, originAccounts) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.callToBeneficiaryAccounts');
            action.setParams({
                'userData': userData,
                'transferType': transferType,
                'sourceAccount': sourceAccount,
                'originAccounts': originAccounts
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() === 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        console.log(stateRV.value.accountList);
                        resolve(stateRV.value.accountList);
                    } else {
                        reject('callToBeneficiaryAccounts_ERROR');
                    }
                } else if (actionResult.getState() === 'INCOMPLETE') {
                    reject('callToBeneficiaryAccounts_ERROR');
                } else if (actionResult.getState() === 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject('callToBeneficiaryAccounts_ERROR');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    // CACHE METHODS

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to encrypt data and save it to the cache
    History
    <Date>		    <Author>		    <Description>
    03/06/2020	    Guillermo Giral     Initial version
    20/08/2020      Candiman            Adapted version to Payments
    02/03/2021		Bea Hill			Remove the cache for IIP so that user can access the new beneficiary
    */
    handleRetrieveFromCache: function (component, helper, key) {
        return new Promise($A.getCallback(function (resolve, reject) {
            const PAY_AccountsCache = $A.get('$Label.c.PAY_AccountsCache');
            if (PAY_AccountsCache === 'false' || key == 'noCache') {
                resolve(null);
            } else {
                let userId = $A.get('$SObjectType.CurrentUser.Id');
                let data = window.localStorage.getItem(userId + '_' + key);
                let timestamp = window.localStorage.getItem(userId + '_' + key + '_timestamp');
                let isFreshData = timestamp != 'null' && timestamp != undefined && ((new Date() - new Date(Date.parse(timestamp))) < parseInt($A.get('$Label.c.refreshBalanceCollout')) * 60000);
                console.log(timestamp);
                console.log(isFreshData);
                if (!$A.util.isEmpty(data) && isFreshData) {
                    let action = component.get('c.decryptAccountsData');
                    action.setParams({
                        'str': data
                    });
                    action.setCallback(this, function (response) {
                        let state = response.getState();
                        if (state === 'SUCCESS') {
                            let stateRV = response.getReturnValue();
                            if (stateRV.success == true) {
                                if (!$A.util.isEmpty(stateRV.value.result)) {
                                    let result = stateRV.value.result;
                                    resolve(JSON.parse(result));
                                } else {
                                    reject('REJECT');
                                }                           
                            } else {
                                reject('REJECT');
                            }
                        } else if (state === 'INCOMPLETE') {
                            reject('REJECT');
                        } else if (state === 'ERROR') {
                            let errors = response.getError();
                            if (errors) {
                                if (errors[0] && errors[0].message) {
                                    console.log('Error message: ' + errors[0].message);
                                }
                            }
                            reject('REJECT');
                        }
                    });
                    $A.enqueueAction(action);
                } else {
                    resolve(null);
                }
            }
        }), this);
    },
    
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to encrypt data and save it to the cache
    History
    <Date>		    <Author>		    <Description>
    03/06/2020	    Guillermo Giral     Initial version
    20/08/2020      Candiman            Adapted version to Payments
    */
    handleSaveToCache: function (component, helper, key, data) {
        return new Promise($A.getCallback(function (resolve, reject) {
            const PAY_AccountsCache = $A.get('$Label.c.PAY_AccountsCache');
            if (PAY_AccountsCache === 'false') {
                resolve(data);
            } else {
                let userId = $A.get('$SObjectType.CurrentUser.Id');
                let action = component.get('c.encryptAccountsData');
                action.setParams({
                    'str': JSON.stringify(data)
                });
                action.setCallback(this, function (response) {
                    let state = response.getState();
                    if (state === 'SUCCESS') {
                        let stateRV = response.getReturnValue();
                        if (stateRV.success == true) {
                            let result = stateRV.value.result;
                            window.localStorage.setItem(userId + '_' + key, result);
                            window.localStorage.setItem(userId + '_' + key + '_timestamp', new Date());
                            resolve(data);
                        } else {
                            reject('REJECT');
                        }
                    } else if (state === 'INCOMPLETE') {
                        reject('REJECT');
                    } else if (state === 'ERROR') {
                        let errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log('Error message: ' + errors[0].message);
                            }
                        }
                        reject('REJECT');
                    }
                });
                $A.enqueueAction(action);
            }
        }), this);
    },
    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to discard accounts by
    History
    <Date>		    <Author>		    <Description>
    12/11/2020	    Shahad Naji		    Initial version   
    */
    discardAccountsByCountry : function (component, helper, userData, accountList){
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.discardAccountsByCountry');
            action.setParams({
                'userData': userData,
                'accountList': accountList
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() === 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        resolve(stateRV.value.accountList);
                    } else {
                        reject('discardAccountsByCountry_ERROR');
                    }
                } else if (actionResult.getState() === 'INCOMPLETE') {
                    reject('discardAccountsByCountry_ERROR');
                } else if (actionResult.getState() === 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject('discardAccountsByCountry_ERROR');
                }else{
                   reject('discardAccountsByCountry_ERROR'); 
                }
            });
            $A.enqueueAction(action);
        }), this);
    },
     /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to filter accounts by country and currency
    History
    <Date>		    <Author>		    <Description>
    12/11/2020	    Shahad Naji		    Initial version   
    */
    filterAccountsToB2BOriginByCountryAndCurrency : function (component, helper, userData, accountList){
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.filterAccountsByCountryAndCurrency');
            action.setParams({
                'userData': userData,
                'accountList': accountList
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() === 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        resolve(stateRV.value.accountList);
                    } else {
                        reject('discardAccountsByCountry_ERROR');
                    }
                } else if (actionResult.getState() === 'INCOMPLETE') {
                    reject('discardAccountsByCountry_ERROR');
                } else if (actionResult.getState() === 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject('discardAccountsByCountry_ERROR');
                }else{
                   reject('discardAccountsByCountry_ERROR'); 
                }
            });
            $A.enqueueAction(action);
        }), this);
    }
})