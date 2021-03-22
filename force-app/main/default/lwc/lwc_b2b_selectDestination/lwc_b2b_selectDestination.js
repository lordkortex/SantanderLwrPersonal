import { LightningElement, api, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import Apex methods
import accountValidation from '@salesforce/apex/CNT_B2B_SelectDestination.accountValidation';
//import getPaymentId from '@salesforce/apex/CNT_B2B_SelectDestination.getPaymentId';

import updatePayment from '@salesforce/apex/CNT_B2B_SelectDestination.updatePayment';
import registerNewBeneficiary from '@salesforce/apex/CNT_B2B_SelectDestination.registerNewBeneficiary';
import getIipBeneficicaryCountries from '@salesforce/apex/CNT_B2B_SelectDestination.getIipBeneficicaryCountries';
import getCurrencyListByCountry from '@salesforce/apex/CNT_B2B_SelectDestination.getCurrencyListByCountry';
import getBeneficiariesByCountry from '@salesforce/apex/CNT_B2B_SelectDestination.getBeneficiariesByCountry';
import getExchangeRate from '@salesforce/apex/CNT_B2B_SelectDestination.getExchangeRate';
import getDominantCurrency from '@salesforce/apex/CNT_B2B_SelectDestination.getDominantCurrency';
import newBeneficiarySettings from '@salesforce/apex/CNT_B2B_SelectDestination.newBeneficiarySettings';


import B2B_Step_2_Header from '@salesforce/label/c.B2B_Step_2_Header';
import B2B_Recipient_information from '@salesforce/label/c.B2B_Recipient_information';
import B2B_Error_Invalid_Input from '@salesforce/label/c.B2B_Error_Invalid_Input';
import B2B_Error_Enter_Input from '@salesforce/label/c.B2B_Error_Enter_Input';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import blockedAccount from '@salesforce/label/c.blockedAccount';
import B2B_Recipient_account from '@salesforce/label/c.B2B_Recipient_account';
import B2B_Error_Continue_Button from '@salesforce/label/c.B2B_Error_Continue_Button';
import PTT_instant_transfer from '@salesforce/label/c.PTT_instant_transfer';
import PTT_international_transfer_single from '@salesforce/label/c.PTT_international_transfer_single';
import Show_More from '@salesforce/label/c.Show_More';
import destinationCountry from '@salesforce/label/c.destinationCountry';
import B2B_Currency from '@salesforce/label/c.B2B_Currency';
import B2B_Step_3_Indicative_Rate from '@salesforce/label/c.B2B_Step_3_Indicative_Rate';
import PAY_CountryCurrencyEmpty from '@salesforce/label/c.B2B_Currency';
import PAY_ChooseCountryCurrencyNewBen from '@salesforce/label/c.B2B_Step_3_Indicative_Rate';


export default class Lwc_b2b_selectDestination extends LightningElement {


    Label = {
        B2B_Step_2_Header,
        B2B_Recipient_information,
        B2B_Recipient_account,
        B2B_Error_Invalid_Input,
        B2B_Error_Enter_Input,
        B2B_Error_Check_Connection,
        blockedAccount,
        B2B_Error_Problem_Loading,
        B2B_Error_Continue_Button,
        PTT_instant_transfer,
        PTT_international_transfer_single,
        Show_More,
        destinationCountry,
        B2B_Currency,
        B2B_Step_3_Indicative_Rate,
        PAY_CountryCurrencyEmpty,
        PAY_ChooseCountryCurrencyNewBen
    }
 
    
    @api accountlist = [];
    // comentado cmpdata por no estar en el cmp
    //@api cmpdata;
    @api sourceaccountdata;
    @api expensesaccount;
    @api handlecontinue;
    @api steps;
    @api reload;
    @api paymentid;
    @api userdata;
    @api accountdata;
    @api isediting;

    @api transfertype ="";
    @api paymentdraft = {};

    @track isModified;
    @track currencyGlobalBalance = {};
    @track headerLabel = this.Label.instantTransfer;
    @track errorMSG;
    @track searchedString = "";
    @track spinner;
    
    @track enableBrowseAccount = false;
    @track canCreateBeneficiaries = false;
    @track countryList = [];
    @track currencyList = [];
    @track selectedCountry;
    @track selectedCurrency;
    @track issimpledropdown = true;    
    @track ibanLength;
    @track simpleForm;
    @track draftData;
    @track accountTypeList;
    @track bankNameList;

    disableCountryDropdown = false;
    disableCurrencyDropdown = false;
    showSearch = true;

    _paymentdraft;

    get paymentdraft(){
        return this._paymentdraft;
    }

    set paymentdraft(paymentdraft){
        this._paymentdraft=paymentdraft;
    }

    get istransferTypeInternational(){
        return this.transfertype == this.Label.PTT_international_transfer_single;
    }

    get istransferType(){
        return this.transfertype == this.Label.PTT_instant_transfer;
    }

    get isNotEmptyPayment(){
        if(this._paymentdraft)
        return (this._paymentdraft.exchangeRate != null && this._paymentdraft.exchangeRate != undefined);
        else return false;
    }

    get isNosourceCurrency(){
        if(this._paymentdraft) return this._paymentdraft.sourceCurrencyDominant == false;
    }
    
    get isNosourceCurrencyText(){
        if(this._paymentdraft)
        return this._paymentdraft.paymentCurrency + '/' + this._paymentdraft.sourceAccount.currencyCodeAvailableBalance;
    }

    get isNosourceCurrencyTextDos(){
        if(this._paymentdraft)
        return this._paymentdraft.sourceAccount.currencyCodeAvailableBalance + '/' + this._paymentdraft.paymentCurrency;
    }

    get Label3b3(){
        if(paymentdraft)
        return this.Label.B2B_Step_3_Indicative_Rate + ' ' + this._paymentdraft.timestamp;
    }

    get showSearch(){
        return this.showSearch == true;
    }

    get isemptydestinationAccount(){
        if(this._paymentdraft){
            return this._paymentdraft.destinationAccount == null || this._paymentdraft.destinationAccount == undefined;
        }
    }
    

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    }


    initComponent() {
        let steps = JSON.parse(JSON.stringify(this.steps));
        steps.lastModifiedStep = 2;
        this.steps = steps;
        this.selectedCurrency = "";

        let transferType = this.transfertype;
        let enableBrowseAccount = true;
        if (transferType == this.Label.PTT_international_transfer_single) {
            this.canCreateBeneficiaries = true;
            this.getCountryList()
            .then((value) => {
                return this.setCountryList(value);
            }).then((value) => {
                return this.getNewBeneficiarySettings(value);
            }).catch((error) => {
                console.log(error);
            });
        }
        this.enableBrowseAccount = enableBrowseAccount;
    }

    get shownStepClass(){
        return 'paymentProcessStep2 slds-is-relative ' + (this.steps.shownStep == 2 ? 'heightTotal' : '');
    }
    get stepsEqTwo(){
        return this.steps.lastModifiedStep == 2;
    }
    /*
    get shownStepClass(){
        return 'paymentProcessStep2 slds-is-relative ' + (this.steps.shownStep == 2 ? 'heightTotal' : '');
    }*/
    
    @api
    handleCheckContinue() {
        this.spinner = true;
        //let data = this.cmpdata;
        let paymentDraft = this._paymentdraft;
        let draftData = this.draftData;

        let searchedString = this.searchedString;
        var msg = '';
        if (!paymentDraft.destinationAccount) {
            if (draftData) {
                this.recordNewBeneficiary()
                .then(() => {
                    return this.validateAccount();
                }).then(() => {
                    return this.setPaymentCurrency();
                }).then(() => {
                    return this.updatePayment();
                }).then(() => {
                     return this.checkExchangeRate();
                }).then(() => {
                    return this.completeStep();
                }).catch(() =>  {
                    this.isEditingStepError();
                    console.log(error);
                }).finally(() =>  {
                    this.spinner = false;
   
                });
            } else {
                if (searchedString) {
                    msg = this.Label.B2B_Error_Invalid_Input;
                } else {
                    msg = this.Label.B2B_Error_Enter_Input;
                }
                var msg_parameter = this.Label.B2B_Recipient_account;
                var full_msg = msg.replace('{0}', msg_parameter);
                this.errorMSG = full_msg;
                this.spinner = false;
                this.isEditingStepError();
            }
        } else {
            this.errorMSG = '';

            // this.validateAccount()
            // .then(() => {
            //    return this.setPaymentCurrency();
            this.setPaymentCurrency()
            .then(() => {
                return this.updatePayment();
            }).then(() => {
                 return this.checkExchangeRate();
            }).then(() => {
                return this.completeStep();
            }).catch((error) => {
                this.isEditingStepError();
                console.log(error);
            }).finally(() => {
                this.spinner = false;

                const accountdataevent = new CustomEvent('accountdata', {
                    detail : { 
                        account: this.paymentdraft.destinationAccount, 
                        step: 2, 
                        exchange: this.paymentdraft.exchangeRate,
                        dominant: this.paymentdraft.sourceCurrencyDominant,
                        currency: this.paymentdraft.paymentCurrency
                    }
    
                });
                this.dispatchEvent(accountdataevent);
            });


            /*
            this.compareAccounts()
            // .then((value) => {
            //     return this.validateAccount();
            // })
            .then((value) => {
                return this.getPaymentId();
            }).then((value) =>{
                return this.completeStep();
            }).catch((error) =>{
                console.log(error);
            }).finally(() => {
                this.spinner = false;
            });*/
        }
    }

    handleModified() {
        let isModified = this.isModified;
        let steps = this.steps;
        if (isModified) {
            steps.lastModifiedStep = 2;
            steps.focusStep = 2;
            steps.shownStep = 2;
        }
        this.steps = steps;
    }

    handleChangeCountryOrCurrency(event) {
        let value = event.detail.value;
        if (value.length == 3) {
            this.handleChangeCurrency(value);
        } else if(value.length == 2){
            this.handleChangeCountryHelper();
        }
    }

    handleChangeCountry() {
        let notificationTitle =  this.Label.B2B_Error_Problem_Loading;
        let bodyText =  this.Label.B2B_Error_Check_Connection;
        let country = this.selectedCountry;
        this.spinner = true;
        this.handleNewBeneficiarySettings(country)
        .then(() => {
            return this.handleCurrencies(country);
        }).then(() => {
            return this.getBeneficiariesByCountry(country);
        }).catch(() => {
            this.accountList = [];
            this.showToast(component, notificationTitle, bodyText, true);
        }).finally(() => {
            this.spinner = false;
        });
    }

    handleChangeCurrency() {
        let notificationTitle =  this.Label.B2B_Error_Problem_Loading;
        let bodyText =  this.Label.B2B_Error_Check_Connection;
        this.spinner = true;
        let paymentDraft = this._paymentdraft;
        let sourceAccount = paymentDraft.sourceAccount;
        let currencyOrigin = sourceAccount.currencyCodeAvailableBalance;
        let currencyDestination = this.selectedCurrency;
        new Promise((resolve, reject) => {
            let paymentDraft = this._paymentdraft;
            paymentDraft.exchangeRate = null;
            paymentDraft.timestamp = null;
            paymentDraft.exchangeRateServiceResponse = null;
            paymentDraft.sourceCurrencyDominant = null;
            paymentDraft.paymentCurrency = currencyDestination;
            this._paymentdraft = paymentDraft;
            resolve('OK');
        }).then(() => {
            return this.getDominantCurrency(currencyOrigin, currencyDestination);
        }).then(() => {
            return this.getExchangeRate(currencyOrigin, currencyDestination);
        }).catch(() => {
            this.exchangeRateToShow = '';
            this.showToast(component, notificationTitle, bodyText, true);
        }).finally(() => {
            this.spinner = false;
        });
    }

    newBeneficiaryAlert(event) {
        var formOpen = event.detail.formOpen;
        var emptyCountryError = event.detail.emptyCountryError;
        if (emptyCountryError == true) {
            let notificationTitle = this.Label.PAY_CountryCurrencyEmpty;
            let bodyText = this.Label.PAY_ChooseCountryCurrencyNewBen;
            this.showToast(component, notificationTitle, bodyText, true);
        }
        if (formOpen == false) {
            this.showSearch = true;
        } else {
            this.showSearch = false;
        }
    }
    handleCompletedFormData(event) {
        var draftData = event.detail.data;
        this.draftData = draftData;
    }
    handleSelectAccount() {
        let canNewBen = this.canCreateBeneficiaries;
        if (canNewBen == false) {
            let paymentDraft = this._paymentdraft;
        	paymentDraft.exchangeRate = null;
            paymentDraft.timestamp = '';
            paymentDraft.sourceCurrencyDominant  = null;
            this._paymentdraft = paymentDraft;
        }
        let country = event.detail.country;
        this.selectedCountry = country;
        var countryDropdown = component.find('[data-id="countryDropdown"]');
        var selectedValues = [];
        selectedValues.push(country);
        countryDropdown.setSelectedValues(selectedValues);
    }



    completeStep() {
        return new Promise((resolve, reject) => {
            const completeStep = new CustomEvent ('completestep', {
                detail: {confirm: true}
            });
            this.dispatchEvent(completeStep);

            this.errorMSG = '';
            this.isModified = false;
            resolve('ok');
        });
    }

    isEditingStepError() {
        const completeStep = new CustomEvent('completestep',{
            detail: {confirm: false}
        })
        this.dispatchEvent(completeStep);     
    }

    showToast() {
        var errorToast = this.template.querySelector('c-lwc_toast');
        if (errorToast) {
            errorToast.openToast(false, false, this.Label.B2B_Error_Problem_Loading,  this.Label.B2B_Error_Check_Connection, 'Error', 'warning', 'warning', true);
        }
    }

    validateAccount() {
        return new Promise((resolve, reject) => {
            //let data = this.cmpdata;

            let paymentDraft = this._paymentdraft;
            let userData = this.userData;
            let notificationTitle =  this.Label.B2B_Error_Problem_Loading;
            let bodyText =  this.Label.B2B_Error_Check_Connection;

            accountValidation({
                data: paymentDraft.destinationAccount
            }).then(actionResult => {
                let returnValue = actionResult;
                if (!returnValue.success) {
                   this.showToast(notificationTitle, bodyText, true);
                    reject('ko');
                }else {
                    if (returnValue.value.statusResult != 'OK') {
                        this.errorMSG = this.Label.blockedAccount;
                        reject('ko');
                    } else {
                        resolve('ok');
                    }
                }
            }).catch(error => {
                this.showToast(notificationTitle, bodyText, true);
                let errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);      
                    }
                }
                reject('ko');
            })
        });
    }

    // getPaymentId(){
    //     return new Promise((resolve, reject) => {
    //         var sourceAccountData = this.sourceaccountdata;
    //         //var recipientAccountData = this.cmpdata;
    //         var userData = this.userdata;
    //         var accountData = this.accountdata;
    //         var paymentId = this.paymentid;
    //         var expensesAccount = null;
    //         if (this.expensesaccount) {
    //             expensesAccount = this.expensesaccount;
    //         }
    //         if (paymentId) {
    //             resolve('Payment Id was created time ago.');
    //         } else {

    //             let notificationTitle =  this.Label.B2B_Error_Problem_Loading;
    //             let bodyText =  this.Label.B2B_Error_Continue_Button;

    //             getPaymentId({
    //                 sourceAccountData: sourceAccountData,
    //                 recipientAccountData: recipientAccountData,
    //                 userData: userData,
    //                 accountData: accountData,
    //                 paymentId: paymentId,
    //                 expensesAccount: expensesAccount
    //             }).then(actionResult => {
    //                 let stateRV = actionResult;
    //                 console.log(stateRV);
    //                 if (stateRV.success) {
    //                     if (stateRV.value) {
    //                         if (stateRV.value.paymentId) {
    //                             this.paymentid  = stateRV.value.paymentId;
    //                             resolve('OK');
    //                         } else {
    //                             this.showToast(notificationTitle, bodyText, true);
    //                             reject('ERROR: empty stateRV.value.paymentId');
    //                         }
    //                     } else {
    //                         this.showToast(notificationTitle, bodyText, true);
    //                         reject('ERROR: stateRV.value');
    //                     }
    //                 } else {
    //                     this.showToast(notificationTitle, bodyText, true);
    //                     reject(stateRV.msg);
    //                 }
    //             }).catch(error => {
    //                 this.showToast(notificationTitle, bodyText, true);
    //                 reject('ERROR: Create Payment Id.');
    //             });
    //         }
    //     });
    // }


     /*
    Company:        Deloitte
    Description:    Sets country list
    History:
    <Date>          <Author>            <Description>
    02/06/2020      -                   Initial version
    09/02/2021      Bea Hill            Remove call to c.getPaymentId - Payment ID is created in SelectOrigin so only need to call Tracking PATCH here
    */

    updatePayment() {
        return new Promise((resolve, reject) => {
            if (this.isEditingProcess == true) {
                resolve('OK');
            } else {
                let paymentDraft = this._paymentdraft;

                let notificationTitle = this.Label.B2B_Error_Problem_Loading;
                let bodyText = this.Label.B2B_Error_Continue_Button;

                updatePayment({
                    paymentDraft: paymentDraft
                }).then(actionResult => {
                    let stateRV = actionResult;
                    if (stateRV.success) {
                        resolve('OK');
                    } else {
                        this.showToast(notificationTitle, bodyText, true);
                        reject(stateRV.msg);
                    }
                }).catch(error => {
                    let errors = error;
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    this.showToast(notificationTitle, bodyText, true);
                    reject('ERROR: update payment details');
                })
            }
        });
    }

    showToast(notificationTitle, bodyText, noReload) {
        var errorToast = this.template.querySelector('c-lwc_b2b_toast');
        if (errorToast) {
            errorToast.openToast(false, false,  notificationTitle, bodyText, 'Error', 'warning', 'warning', noReload);
        }
    }

    // compareAccounts() {
    //     return new Promise((resolve, reject) => {
    //         //var recipientData = this.cmpdata;
    //         var sourceData = this.sourceaccountdata;
    //         if (recipientData.displayNumber && sourceData.displayNumber) {
    //             if (recipientData.displayNumber != sourceData.displayNumber) {
    //                 resolve('OK');
    //             } else {
    //                 let notificationTitle = 'Same account selected in Step 1'; //this.Label.B2B_Error_Problem_Loading');
    //                 let bodyText = 'Please select a different account.'; //this.Label.B2B_Error_Continue_Button');
    //                 this.showToast(component, notificationTitle, bodyText, true);
    //                 reject('Source account = recipient account.');
    //             }
    //         } else {
    //             let notificationTitle = this.Label.B2B_Error_Problem_Loading;
    //             let bodyText = this.Label.B2B_Error_Continue_Button;
    //             this.showToast(component, notificationTitle, bodyText, true);
    //             reject('No account numbers to compare');
    //         }
    //     });
    // }

    recordNewBeneficiary() {
        return new Promise((resolve, reject) => {
            let paymentDraft = this._paymentdraft;
            let newBeneficiary = this.draftData;

            registerNewBeneficiary({
                newAccount: newBeneficiary,
                sourceAccount: paymentDraft.sourceAccount
            }).then(response => {
                let result = response;
                if (result.success == true) {
                    let paymentDraft = this._paymentdraft;
                    paymentDraft.destinationAccount = result.value.accountData;
                    this._paymentdraft = paymentDraft;
                    resolve('OK');
                } else {
                    this.errorMSG = result.msg;
                    reject('Cannot create new beneficiary');
                }
            }).catch(() => {
                let notificationTitle = this.Label.B2B_Error_Problem_Loading;
                let bodyText = this.Label.B2B_Error_Check_Connection;
                this.showToast( notificationTitle, bodyText, true);
                reject('Can not create new beneficiary');
            })

            
        });
    }

    getCountryList() {
        return new Promise((resolve, reject) => {
            let paymentDraft = this._paymentdraft;
            let sourceAccountCountry = '';
            if (paymentDraft.sourceAccount) {
                let sourceAccount = paymentDraft.sourceAccount;
                sourceAccountCountry = sourceAccount.country;
            }
            let rejectBody = {
                title: this.Label.B2B_Error_Problem_Loading,
                body: this.Label.B2B_Error_Check_Connection,
                noReload: true
            }

            getIipBeneficicaryCountries({
                sourceAccountCountry: sourceAccountCountry
            }).then(response => {
                let result = response;
                if (result != null && result != undefined) {
                    if (result.success) {
                        if (result.value) {
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
            }).catch(error => {
                let errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                reject(rejectBody);
            })          
           
        });
    }

    setCountryList(countryList) {
        return new Promise((resolve, reject) => {
            let rCountryList = countryList;
            let outputCountryList = [];
            let countryListAux = [];
            for (let i = 0; i < rCountryList.length; i++) {
                let country = rCountryList[i].countryName;
                if (country) {
                    if (!countryListAux.includes(country)) {
                        countryListAux.push(country);
                        outputCountryList.push({
                            label: rCountryList[i].parsedCountryName,
                            value: country
                        });
                    }
                }
            }
            var sortCountryList = this.sortList(outputCountryList);
            this.countryList = sortCountryList;
            resolve(countryList);
        });
    }

    sortList(list) {
        var sort;
        var data = list;
        sort = data.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        return sort;
    }

    getCountryCurrencies() {
        return new Promise((resolve, reject) => {

            getCurrencyListByCountry()
            .then(response => {
                let returnValue = response;
                if (returnValue.success) {
                    let value = returnValue.value;
                    let countryCurrencyLists = value.countryCurrencyLists;
                    this.countryCurrencyLists = countryCurrencyLists;
                    resolve('OK');
                } else {
                    reject('KO');
                }
            }).catch(() => {
                reject('KO');
            })

           
        });
    }

    getBeneficiariesByCountry(country) {
        return new Promise((resolve, reject) => {
            let canNewBen = this.canCreateBeneficiaries;
            if (canNewBen == false) {
                resolve('OK');
            } else {

                getBeneficiariesByCountry({
                    countryCode: country
                }).then(response => {
                    let returnValue = response;
                    if (returnValue.success) {
                        let value = returnValue.value;
                        let accountList = value.accountList;
                        this.accountList = accountList;
                        resolve('OK');
                    } else {
                        reject('problem getting accounts');
                    }
                }).catch(() => {
                    reject('problem getting accounts');
                })

            }
        });
    }

    handleCurrencies(country) {
        return new Promise((resolve, reject) => {
            let canNewBen = this.canCreateBeneficiaries;
            if (canNewBen == false) {
                resolve('OK');
            } else {
                let allSettings = this.newBeneficiarySettings;
                let settings = allSettings[country];
                let currencyList = settings.currencyList;
                let baseCurrency = settings.baseCurrency;
                this.setCurrencyList(currencyList)
                .then(() => {
                    return this.setSelectedCurrency(baseCurrency)
                }).finally(() => {
                    resolve(baseCurrency);
                })
            }
        });
    }

    getExchangeRate(currency1, currency2) {
        return new Promise((resolve, reject) => {
            let paymentDraft = this._paymentdraft;

            getExchangeRate({
                currency1: currency1,
                currency2: currency2,
                paymentDraft: paymentDraft
            }).then(response => {
                let returnValue = response;
                if (returnValue.success) {
                    let value = returnValue.value;
                    if (value.sameCurrencies && value.sameCurrencies == true) {
                        paymentDraft.exchangeRate = null;
                        paymentDraft.timestamp = null;
                        paymentDraft.exchangeRateServiceResponse = null;
                    } else {
                        paymentDraft.exchangeRate = value.exchangeRate;
                        paymentDraft.timestamp = value.timestamp;
                        paymentDraft.exchangeRateServiceResponse = value.exchangeRateServiceResponse;
                    }
                    this._paymentdraft = paymentDraft;
                    resolve('OK');
                } else {
                    reject('problem getting exchange rate');
                }
            }).catch(() => {
                reject('problem getting exchange rate');
            })      
        });
    }

    setCurrencyList(inputCurrencyList) {
        return new Promise((resolve, reject) => {
            let currencyList = [];
            for (let i = 0; i < inputCurrencyList.length; i++) {
                let currency = inputCurrencyList[i];
                currencyList.push({
                    label: currency,
                    value: currency
                })
            }
            let sortedCurrencyList = this.sortList(currencyList);
            this.currencyList = sortedCurrencyList;
            resolve('OK');
        });
    }

    setSelectedCurrency(currency) {
        return new Promise((resolve, reject) => {
            let payment = this._paymentdraft;
            payment.paymentCurrency = currency;
            this._paymentdraft = payment;
            this.selectedCurrency = currency;
            var currencyDropdown = component.find('currencyDropdown');
            var selectedValues = [];
            selectedValues.push(currency);
            currencyDropdown.setSelectedValues(selectedValues);
            resolve('OK');
        });
    }

    getDominantCurrency(currencyOrigin, currencyDestination) {
        return new Promise((resolve, reject) => {
            let paymentDraft = this._paymentdraft;
            let userData = this.userData;
            if (currencyOrigin && currencyDestination) {
                console.log('making call to get dominant currency');

                getDominantCurrency({
                    userData: userData,
                    currencyOrigin: currencyOrigin,
                    currencyDestination: currencyDestination
                }).then(response => {
                    let returnValue = response;
                    if (returnValue.success) {
                        let value = returnValue.value;
                        let dominantCurrency = value.dominantCurrency;
                        if (dominantCurrency) {
                            if (dominantCurrency == currencyOrigin) {
                                paymentDraft.sourceCurrencyDominant = true;
                            } else if (dominantCurrency == currencyDestination) {
                                paymentDraft.sourceCurrencyDominant = false;
                            }
                            this._paymentdraft = paymentDraft;
                            resolve(dominantCurrency);
                        } else { //PARCHE_FLOWERPOWER
                            paymentDraft.sourceCurrencyDominant = true;
                            this._paymentdraft = paymentDraft;
                            resolve(currencyOrigin); //PARCHE_FLOWERPOWER
                        }
                    } else {
                        reject('problem consulting currencies service');
                    }
                }).catch(() => {
                    reject('problem consulting currencies service');
                })   
            } 
        });
    }
    
    getNewBeneficiarySettings(countryList) {
        return new Promise((resolve, reject) => {

            newBeneficiarySettings({
                countryList: countryList
            }).then(response => {
                let returnValue = response;
                if (returnValue.success) {
                    let value = returnValue.value;
                    this.newBeneficiarySettings = value
                    resolve('OK');
                } else {
                    reject('KO');
                }
            }).catch(() => {
                reject('KO');
            })
        });
    }
    
    handleNewBeneficiarySettings(country) {
        return new Promise((resolve, reject) => {
            let canNewBen = this.canCreateBeneficiaries;
            if (canNewBen == false) {
                resolve('OK');
            } else {
                let settings = this.newBeneficiarySettings;
                let countrySettings = settings[country];
                let ibanLength = countrySettings.ibanLength;
                let simpleForm = countrySettings.simpleForm;
                let accountTypeList = countrySettings.accountTypeList;
                let bankNameList = countrySettings.bankNameList;
                this.ibanLength = ibanLength;
                this.simpleForm = simpleForm;
                this.accountTypeList = accountTypeList;
                this.bankNameList = bankNameList;
                resolve('OK');
            } 
        });
    }

    checkExchangeRate() {
        return new Promise((resolve, reject) => {
            let paymentDraft = this._paymentdraft;

            if (!paymentDraft.sourceAccount) {
                reject('Source account must be informed');
            } else if (!paymentDraft.sourceAccount.currencyCodeAvailableBalance || !paymentDraft.paymentCurrency) {
                reject('Both account currencies must be informed');
            } else if (paymentDraft.sourceAccount.currencyCodeAvailableBalance == paymentDraft.paymentCurrency) {
                resolve('Same currencies - No exchange rate');
            } else {
                if (!paymentDraft.exchangeRate || !paymentDraft.sourceCurrencyDominant) {
                    return this.getExchangeRate(paymentDraft.sourceAccount.currencyCodeAvailableBalance, paymentDraft.paymentCurrency)
                        .then(() => {
                            return this.getDominantCurrency(paymentDraft.sourceAccount.currencyCodeAvailableBalance, paymentDraft.paymentCurrency)
                        }).then(() => {
                            resolve('OK');
                        });
                } else {
                    resolve('OK');
                }
            }
        }).catch(() => {
            reject('Problem with FX or dominant currency');
        });
    }

   
    setPaymentCurrency() {
        return new Promise((resolve, reject) => {
            let paymentDraft = JSON.parse(JSON.stringify(this._paymentdraft));
            let paymentCurrency = paymentDraft.paymentCurrency;
            let selectedCurrency = this.selectedCurrency;
            if(paymentCurrency) {
                resolve('OK');
            } else{
                if (selectedCurrency != "") {
                    paymentDraft.paymentCurrency = selectedCurrency;
                    this._paymentdraft = paymentDraft;
                    resolve('OK');
                } else{
                    if (!paymentDraft.destinationAccount) {
                        reject('Destination account must be informed');
                    }else if (!paymentDraft.destinationAccount.currencyCodeAvailableBalance) {
                        reject('Destination account currency must be informed');
                    }else {
                        paymentDraft.paymentCurrency = paymentDraft.destinationAccount.currencyCodeAvailableBalance;
                        this._paymentdraft = paymentDraft;
                        resolve('OK');
                    }
                }
            }
        }).catch(() => {
            console.log('Problem setting payment currency');
        });
    }

    handleChangeCountryHelper() {
        let canNewBen = this.canCreateBeneficiaries;
        if (canNewBen == true) {
            let notificationTitle =  this.Label.B2B_Error_Problem_Loading;
            let bodyText =  this.Label.B2B_Error_Check_Connection;
            let country = this.selectedCountry;
            let selectedCurrency = this.selectedCurrency;
            this.spinner = true;
            this.handleNewBeneficiarySettings(country)
            .then(() => {
                return this.handleCurrencies(country);
            }).then((value) => {
                if (value != selectedCurrency) {
                    return this.handleChangeCurrency(value);
                }else {
                    return ('ok');
                }
            }).then(() => {
                return this.getBeneficiariesByCountry(country);
            }).catch(() => {
                this.accountList = [];
                this.showToast(component, notificationTitle, bodyText, true);
            }).finally(() => {
                this.spinner = false;
            });
        }
    }

    handleChangeCurrency(currency) {
        let notificationTitle =  this.Label.B2B_Error_Problem_Loading;
        let bodyText =  this.Label.B2B_Error_Check_Connection;
        this.spinner = true;
        let paymentDraft = this._paymentdraft;
        let sourceAccount = paymentDraft.sourceAccount;
        let currencyOrigin = sourceAccount.currencyCodeAvailableBalance;
        let currencyDestination = currency;
        new Promise((resolve, reject) => {
            let paymentDraft = this._paymentdraft;
            paymentDraft.exchangeRate = null;
            paymentDraft.timestamp = null;
            paymentDraft.exchangeRateServiceResponse = null;
            paymentDraft.sourceCurrencyDominant = null;
            paymentDraft.paymentCurrency = currencyDestination;
            this._paymentdraft = paymentDraft;
            resolve('OK');
        }).then(() => {
            return this.getDominantCurrency(currencyOrigin, currencyDestination);
        }).then(() => {
            return this.getExchangeRate(currencyOrigin, currencyDestination);
        }).catch(() => {
            this.showToast(component, notificationTitle, bodyText, true);
        }).finally(() => {
            this.spinner = false;
        });
    }

    handleContinue(){
        const handlecontinueevent = new CustomEvent('handlecontinue');
        this.dispatchEvent(handlecontinueevent);
    }

    handleAccountData(event){
        if(event.detail){
            const accountdataevent = new CustomEvent('accountdata', {
                detail : { account: event.detail.account, step: 2}

            });
            this.dispatchEvent(accountdataevent);
        }
    }

    @api
    doScroll(focusStep){
        var element = "[data-id='step-" + focusStep + "']";
        var stepComponent = this.template.querySelector(element);
        if (stepComponent != null) {
            stepComponent.scrollIntoView({ behavior: 'smooth' });
        } else {
            setTimeout( () => {
                stepComponent = this.template.querySelector(element);
                if (stepComponent != null) {
                    stepComponent.scrollIntoView({ behavior: 'smooth' });
                }
            }, 10);
        }
    }
}