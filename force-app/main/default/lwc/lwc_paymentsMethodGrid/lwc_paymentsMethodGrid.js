import { LightningElement, api, track } from 'lwc';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle } from 'lightning/platformResourceLoader';

import uId from '@salesforce/user/Id';

//Labels
import instantTransfer from '@salesforce/label/c.instantTransfer';
import PAY_betweenMyAccounts from '@salesforce/label/c.PAY_betweenMyAccounts';
import PAY_Type_Single from '@salesforce/label/c.PAY_Type_Single';
import PAY_DomesticTransfer from '@salesforce/label/c.PAY_DomesticTransfer';
import PAY_toThirdParties from '@salesforce/label/c.PAY_toThirdParties';
import PAY_Type_Multiple from '@salesforce/label/c.PAY_Type_Multiple';
import PAY_InternationalTransfer from '@salesforce/label/c.PAY_InternationalTransfer';
import PAY_OtherPayments from '@salesforce/label/c.PAY_OtherPayments';
import Show_More from '@salesforce/label/c.Show_More';
import Country from '@salesforce/label/c.Country';
import IncorrectInputFormat from '@salesforce/label/c.IncorrectInputFormat';
import PTT_instant_transfer from '@salesforce/label/c.PTT_instant_transfer';
import B2B_no_Origin_Accounts from '@salesforce/label/c.B2B_no_Origin_Accounts';
import PTT_international_transfer_multiple from '@salesforce/label/c.PTT_international_transfer_multiple';
import PTT_international_transfer_single from '@salesforce/label/c.PTT_international_transfer_single';
import B2B_Problem_accounts from '@salesforce/label/c.B2B_Problem_accounts';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import PAY_AccountsCache from '@salesforce/label/c.PAY_AccountsCache';
import refreshBalanceCollout from '@salesforce/label/c.refreshBalanceCollout';
import PTT_domestic_transfer_single from '@salesforce/label/c.PTT_domestic_transfer_single';

//Import Apex
//import encryptData from '@salesforce/apex/CNT_PaymentsMethod.encryptData';
import checkTypeAvailable from '@salesforce/apex/CNT_PaymentsMethod.checkTypeAvailable';
import getRawAccounts from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.getRawAccounts';
import discardAccountsByCountry from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.discardAccountsByCountry';
import encryptAccountsData from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.encryptAccountsData';
import callToAccountsWithAttributionsParent from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.callToAccountsWithAttributionsParent';
import decryptAccountsData from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.decryptAccountsData';
import filterAccountsByCountryAndCurrency from '@salesforce/apex/CNT_PaymentsLoadUserAccounts.filterAccountsByCountryAndCurrency';

//Import Navigation
import { NavigationMixin } from 'lightning/navigation';

export default class Lwc_paymentsMethodGrid extends NavigationMixin(LightningElement) {
    label = {
        instantTransfer,
        PAY_betweenMyAccounts,
        PAY_Type_Single,
        PAY_DomesticTransfer,
        PAY_toThirdParties,
        PAY_Type_Multiple,
        PAY_InternationalTransfer,
        PAY_OtherPayments,
        Show_More,
        Country,
        IncorrectInputFormat,
        PTT_instant_transfer,
        B2B_no_Origin_Accounts,
        PTT_international_transfer_multiple,
        PTT_international_transfer_single,
        B2B_Problem_accounts,
        B2B_Error_Problem_Loading,
        PAY_AccountsCache,
        refreshBalanceCollout,
        PTT_domestic_transfer_single
    };

    @api countrydropdownlist = []; //List of values to populate the dropdown
    @api showtoast; //Indicates if the toast is shown.
    selectedCountry = ''; //Selected option from the dropdown
    helpTextDropdown = 'Show More'; //Dropdown help text
    bookToBookPage = 'payments-b2b';
    singlePage = 'payments-single';

    @track issimpledropdown = true;
    @track isdisabled = false;
    
    @api userdata = {};
    @api transfertypeparams// = {};
    @track spinner = false;   


    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.checkTypeAvailable();
    }

    checkTypeAvailable(){
        let transferTypeParams = this.transfertypeparams;
        //if (transferTypeParams != null && transferTypeParams != undefined && transferTypeParams != {}) {}
        //if (transferTypeParams) {}
        if (Object.keys(this.transfertypeparams).length > 0) {}
        else {
            this.spinner = true;
            let userData = this.userdata;
            checkTypeAvailable({
                'userData': userData
            })
            .then ( (result) => {
                if (result.success) {
                    this.transfertypeparams = result.value;
                } else {
                    console.log('checkTypeAvailable_KO');
                }
                this.spinner = false;

            })
            .catch( (errors) => {
                console.log('### lwc_paymentsMethodGrid ### checkTypeAvailable() ::: Catch error: ' + JSON.stringify(errors));
                this.spinner = false;
            })
        }
    }

    goToBooktoBook() {
        this.spinner = true;
        const transferTypeParams = this.transfertypeparams;
        const instant_transfer =this.label.PTT_instant_transfer;
        if(transferTypeParams && transferTypeParams.instant_transfer){
            this.getAccountsToB2BOrigin(this.userdata, instant_transfer)
            .then( (value) => {
                return this.handleAccountsToB2BOrigin(value);
            })
            .then( (value) => { 
                return this.goToURL(transferTypeParams.instant_transfer, true);
            })
            .catch ((error) => {
                this.spinner = false;
                console.log(error);
                this.showToast(this.label.B2B_no_Origin_Accounts, null, true, 'error');
               /* if (error.title != undefined) {
                    this.showToast(, error.title, error.body, error.noReload, 'error');
                } else {
                    this.showToast(, this.label.B2B_no_Origin_Accounts, true, 'error');
                }*/
            });
        }else{
            this.spinner = false;
            this.showtoast = true;
        }   
       
    }

    goToSingleDomestic() {
        this.spinner = true;
        const transferTypeParams = this.transfertypeparams;
        const domestic_transfer_single = this.label.PTT_domestic_transfer_single;
        console.log("transfer",transferTypeParams);
        if(transferTypeParams.domestic_transfer_single){

            this.getAccountsToB2BOrigin(this.userData, domestic_transfer_single)
            //this.template.querySelector('c-payments-load-user-accounts').getAccountsToB2BOrigin(this.userData, domestic_transfer_single)
            .then( (value) => {
                return this.handleAccountsToB2BOrigin(value);
            })
            .then( (value) => { 
                return this.goToURL(transferTypeParams.domestic_transfer, true);
            })
            .catch ((error) => {
                this.spinner = false;
                console.log(error);
                this.showToast(this.label.B2B_no_Origin_Accounts, null, true, 'error');
            /* if (error.title != undefined) {
                    this.showToast(, error.title, error.body, error.noReload, 'error');
                } else {
                    this.showToast(, this.label.B2B_no_Origin_Accounts, true, 'error');
                }*/
            });
        } else {
            this.spinner = false;
            this.showtoast = true;

            const toastevent = new CustomEvent('toastevent', {detail : {toast : true}});
            this.dispatchEvent(toastevent);
        }   
    }

    goToMultipleDomestic() {
        const transferTypeParams = this.transferTypeParams;
        if (transferTypeParams.domestic_transfer_multiple) {
            this.goToURL(transferTypeParams.domestic_transfer_multiple, false);
        } else {
            this.showToast = true;
        }
    }

    goToSingleInternational() {
        this.spinner = true;
        const transferTypeParams = this.transferTypeParams;
        const international_transfer_single = this.label.PTT_international_transfer_single;
        if(transferTypeParams.international_transfer_single){
            this.getAccountsToB2BOrigin(this.userData, international_transfer_single)
            .then( (value) => {
                return this.handleAccountsToB2BOrigin(value);
            })
            .then( () => { 
                return this.goToURL(transferTypeParams.international_transfer_single, true);
            })
            .catch( (error) => {
                this.spinner = false;
                console.log(error);
                this.showToast(this.label.B2B_no_Origin_Accounts, null, true, 'error');
              
            });
        }else{
            this.spinner = false;
            this.showToast = true;
        }  
    }

    goToMultipleInternational() {
        this.spinner = true;
        const transferTypeParams = this.transferTypeParams;
        const international_transfer_multiple = this.label.PTT_international_transfer_multiple;
        if (transferTypeParams.international_transfer_multiple) {
            this.goToURL(transferTypeParams.international_transfer_multiple, false);
        } else {
            this.spinner = false;
            this.showToast = true;
        }
       
    }

    goToURL(params, single) {
        return new Promise( (resolve) => {
            let page = 'payments-b2b';
            if (single) {}
            else{
                // TO-DO
            }
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    pageName: page
                },
                state: {
                    params: params
                }
            });
            resolve('goToURL_OK');
        })         
    }
     
    handleAccountsToB2BOrigin(value) {
        var title = this.label.B2B_no_Origin_Accounts;
        return new Promise( (resolve, reject) => {
            if (value) {
                resolve('handleAccountsToB2BOrigin_OK');
            } else {
                reject({
                    'title': title,
                    'noReload': true
                });
            }
        }, this);
    }
    
    showToast(title, body, noReload, mode) {
        var errorToast = this.template.querySelector('c-lwc_b2b_toast');
        if (errorToast) {
            if (mode == 'error') {
               // errorToast.openToast(false, false, title,  body, 'Error', warning, 'warning', noReload);
               //errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
               var toastEvent = {detail:{action: false, static: false, "notificationTitle": title, "bodytext": body, "functionTypeText":'Error', "functionTypeClass":'warning',"functionTypeClassIcon": 'warning',"noReload": noReload}} 
               errorToast.openToast(toastEvent);
            }
            if (mode == 'success') {
              //  errorToast.openToast(true, false, title,  body,  'Success', success, 'success', noReload);
              //errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', noReload);
              var toastEvent = {detail:{action: true, static: false, "notificationTitle": title, "bodytext": body, "functionTypeText":'Success', "functionTypeClass":'success',"functionTypeClassIcon": 'success',"noReload": noReload}} 
              errorToast.openToast(toastEvent);
            }
        }
    }

    getAccountsToB2BOrigin(userData, transferType) {
        return new Promise(function(resolve, reject){
 			this.removeAccountsCacheItems()
            .then((value) => {
                let key = 'AccountsToB2BOrigin'+ transferType;
                //let services = [];
                //services.push('add_international_payment_internal'); //07-09-2020 - SNJ - Accounts which can be selected by current logged in user to initiate a payment procedure
                this.handleRetrieveFromCache(key)
                .then((value)=> {
                    //if (!value) {
                    if (value != undefined && value != null) {    
                        resolve(value);
                    } else {
                        this.callToAccountsWithAttributions(userData, transferType)
                        .then((value)=> {
                            return this.filterAccountsToB2BOriginByCountryAndCurrency(userData, value);
                        }).then((value)=> {
                            return this.handleSaveToCache(key, value);
                        }).then((function (value) {
                            resolve(value);
                        })).catch((error)=> {
                            console.log(error);
                            reject({
                                'title': this.label.B2B_Error_Problem_Loading,
                                'body': this.label.B2B_Problem_accounts,
                                'noReload': false
                            });
                        });
                    }
                    
                }).catch((error)=> {
                    console.log(error);
                    reject({
                        'title': this.label.B2B_Error_Problem_Loading,
                        'body': this.label.B2B_Problem_accounts,
                        'noReload': false
                    });
                });
            });
        }.bind(this));
    }


    removeAccountsCacheItems() {
        return new Promise(function(resolve, reject) {
            let userId = uId;
            let clearCache = window.localStorage.getItem(userId + '_clearCache');
			console.log(userId + '_AccountsToB2BOrigin'+this.label.PTT_international_transfer_single);
            if(clearCache && clearCache == 'true'){
                window.localStorage.removeItem(userId + '_RawAccountsFiltered');
                window.localStorage.removeItem(userId + '_RawAccountsFiltered_timestamp');
                window.localStorage.removeItem(userId + '_AccountsToB2BOrigin'+this.label.PTT_instant_transfer);
                window.localStorage.removeItem(userId + '_AccountsToB2BOrigin'+this.label.PTT_instant_transfer+'_timestamp');
                window.localStorage.removeItem(userId + '_AccountsToB2BOrigin'+this.label.PTT_international_transfer_single);
                window.localStorage.removeItem(userId + '_AccountsToB2BOrigin'+this.label.PTT_international_transfer_single+'_timestamp');    
                window.localStorage.removeItem(userId + '_AccountsToB2BOrigin'+this.label.PTT_international_transfer_multiple);
                window.localStorage.removeItem(userId + '_AccountsToB2BOrigin'+this.label.PTT_international_transfer_multiple+'_timestamp'); 
                
                //Add the rest of payments types as the are implemented

 				window.localStorage.setItem(userId + '_clearCache',false);                
            }
            
            resolve('ok');
            
        }.bind(this));
    }

    handleRetrieveFromCache(key) {
        return new Promise( function(resolve, reject) {
            const PAY_AccountsCache = this.label.PAY_AccountsCache;
            if (PAY_AccountsCache === 'false') {
                resolve(null);
            } else {
                let userId = this.userId;
                let data = window.localStorage.getItem(userId + '_' + key);
                let timestamp = window.localStorage.getItem(userId + '_' + key + '_timestamp');
                let isFreshData = timestamp != 'null' && timestamp != undefined && ((new Date() - new Date(Date.parse(timestamp))) < parseInt(this.label.refreshBalanceCollout) * 60000);
                //console.log('timestamp: ' + timestamp);
                //console.log('isFreshData: ' + isFreshData);
                if (data && isFreshData) {
                    decryptAccountsData({ 
                        str : data
                    })
                    .then( response =>{
                        let stateRV = response;
                        if (stateRV.success == true) {
                            if (stateRV.value.result) {
                                let result = stateRV.value.result;
                                resolve(JSON.parse(result));
                            } else {
                                reject('REJECT');
                            }                           
                        } else {
                            reject('REJECT');
                        }
                    })
                    .catch( error => {
                        console.log('### lwc_paymentsLandingParent ### handleRetrieveFromCache() ::: Catch error: ' + JSON.stringify(error));
                        reject('REJECT');
                    })
                } else {
                    resolve(undefined);
                }
            }
        }.bind(this));
    }


    /*callToAccountsWithAttributions(userData, transferType) {
        return new Promise(function (resolve, reject) {
            this.getRawAccountsFiltered(userData).then((function (value) {
                //return this.callToAccountsWithAttributionsParams({'userData': userData, 'transferType': transferType , 'globalPositionAccounts': value})
                return this.callToAccountsWithAttributionsParams(userData, transferType ,value)
                .then((function (value) {
                    resolve(value);
                })).catch((function (error) {
                    console.log(error);
                    reject({
                        'title': this.label.B2B_Error_Problem_Loading,
                        'body': this.label.B2B_Problem_accounts,
                        'noReload': false
                    });
                }));
            }.bind(this)));
        }.bind(this));
    }*/


    callToAccountsWithAttributions(userData, transferType) {
        return new Promise((resolve, reject) => {
            this.getRawAccountsFiltered(userData)
            .then(value => {
                return this.callToAccountsWithAttributionsParams(userData, transferType ,value)  
            })
            .then(value => {
                resolve(value);
            }).catch(errors => {
                console.log('Error message: ' + errors);
                reject({
                    'title': this.label.B2B_Error_Problem_Loading,
                    'body': this.label.B2B_Problem_accounts,
                    'noReload': false
                });
            });
        }, this);           
    }

    getRawAccountsFiltered(userData) {
        var errorLoading = this.label.B2B_Error_Problem_Loading;
        var errorProblemAccounts = this.label.B2B_Problem_accounts;
        var errorCheckConnection = this.label.B2B_Error_Check_Connection;
        return new Promise(function (resolve, reject) {
            let key = 'AccountsToList';
            this.handleRetrieveFromCache(key)
            .then( (value) => {
                if (value != undefined && value != null) {
                    resolve(value);
                } else {
                    console.log('getAccountsToList(userData) ::: userData: ' + JSON.stringify(userData));
                    //this.callToAccountsWithoutAttributions(userData)
                    //16-03-2021
                    this.getRawAccounts(userData)
					.then( (value) => {
                        return this.discardAccountsByCountry(userData, value);
                    })
                    .then( (value) => {
                        return this.handleSaveToCache(key, value);
                    })
                    .then( (value) => {
                        resolve(value);
                    })
                    .catch( (error) => {
                        console.log('### lwc_paymentsMethodGrid ### getAccountsToList(userData) ::: Catch Error: ' + JSON.stringify(error));
                        reject({
                            'title': errorLoading,
                            'body': errorProblemAccounts,
                            'noReload': false
                        });
                    });
                }
            }).catch( (error) => {
                console.log(error);
                reject({
                    'title': errorLoading,
                    'body': errorCheckConnection,
                    'noReload': false
                });
            });
        }.bind(this));
    }

    getRawAccounts(nexus) {
        return new Promise( function(resolve, reject) {
            getRawAccounts({
                'userData': nexus
            })
            .then( (result) => {
                var stateRV = result;
                if (stateRV.success) {
                    resolve(stateRV.value.accountList);
                } else {
                    reject('getRawAccounts_ERROR');
                }
            })
            .catch( (error) => {
                console.log('### lwc_paymentsMethodGrid ### getRawAccounts() ::: Catch error: ' + JSON.stringify(error));
                reject('callToAccountsWithAttributions_ERROR');
            })           
        }.bind(this));
    }

    discardAccountsByCountry(userData, accountList){
        return new Promise( function(resolve, reject) {
            discardAccountsByCountry({
                'userData': userData,
                'accountList': accountList
            })
            .then( (result) => {
                var stateRV = result;
                if (stateRV.success) {
                    resolve(stateRV.value.accountList);
                } else {
                    reject('discardAccountsByCountry_ERROR');
                }
            })
            .catch( (error) => {
                console.log('### lwc_paymentsMethodGrid ### discardAccountsByCountry() ::: Catch error: ' + JSON.stringify(error));
                reject('discardAccountsByCountry_ERROR');
            })
        }.bind(this));
    }

    handleSaveToCache(key, data) {
        const PAY_AccountsCache = this.label.PAY_AccountsCache;
        return new Promise( function(resolve, reject) {
            if (PAY_AccountsCache === 'false') {
                resolve(data);
            } else {
                let userId = this.userId
                encryptAccountsData({
                    str : JSON.stringify(data)
                })
                .then( response => {
                    let stateRV = response;
                    if (stateRV.success) {
                        let result = stateRV.value.result;
                        window.localStorage.setItem(userId + '_' + key, result);
                        window.localStorage.setItem(userId + '_' + key + '_timestamp', new Date());
                        resolve(data);
                    } else {
                        reject('REJECT');
                    }
                })
                .catch( error => {
                    console.log('### lwc_paymentsMethodGrid ### handleSaveToCache() ::: Catch error: ' + JSON.stringify(error));
                    reject('REJECT');
                })
            }
        }.bind(this));
    }

    callToAccountsWithAttributionsParams(userData, transferType ,value) {
        return new Promise(function (resolve, reject) {
            callToAccountsWithAttributionsParent({
                //str : parametros
                'userData': userData, 
                'transferType': transferType , 
                'globalPositionAccounts': value
            })
            .then( response => {
                let stateRV = response;
                if (stateRV.success) {
                    resolve(stateRV.value.accountList);
                } else {
                    reject('callToAccountsWithAttributions_ERROR');
                }
            })
            .catch( error => {
                console.log('### lwc_paymentsMethodGrid ### callToAccountsWithAttributionsParams() ::: Catch error: ' + JSON.stringify(error));
                reject('REJECT');
            })
        }.bind(this));
        
    }

    filterAccountsToB2BOriginByCountryAndCurrency(userData, accountList){
        return new Promise(function (resolve, reject) {
            filterAccountsByCountryAndCurrency({
                'userData': userData,
                'accountList': accountList
            })
            .then( response => {
                let stateRV = response;
                if (stateRV.success) {
                    resolve(stateRV.value.accountList);
                } else {
                    reject('discardAccountsByCountry_ERROR');
                }
            })
            .catch( error => {
                console.log('### lwc_paymentsMethodGrid ### filterAccountsToB2BOriginByCountryAndCurrency() ::: Catch error: ' + JSON.stringify(error));
                reject('REJECT');
            })
        }.bind(this));
    
    }
}