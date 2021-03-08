import { LightningElement, api, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import Apex methods
import accountValidation from '@salesforce/apex/CNT_B2B_SelectDestination.accountValidation';
import getPaymentId from '@salesforce/apex/CNT_B2B_SelectDestination.getPaymentId';

import B2B_Step_2_Header from '@salesforce/label/c.B2B_Step_2_Header';
import B2B_Recipient_information from '@salesforce/label/c.B2B_Recipient_information';
import B2B_Error_Invalid_Input from '@salesforce/label/c.B2B_Error_Invalid_Input';
import B2B_Error_Enter_Input from '@salesforce/label/c.B2B_Error_Enter_Input';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import blockedAccount from '@salesforce/label/c.blockedAccount';
import B2B_Recipient_account from '@salesforce/label/c.B2B_Recipient_account';
import B2B_Error_Continue_Button from '@salesforce/label/c.B2B_Error_Continue_Button';


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
    }

    
    @api accountlist = [];
    @api cmpdata;
    @api sourceaccountdata;
    @api expensesaccount;
    @api handlecontinue;
    @api steps;
    @api reload;
    @api paymentid;
    @api userdata;
    @api accountdata;
    @api isediting;

    @track isModified;
    @track currencyGlobalBalance = {};
    @track headerLabel = this.Label.instantTransfer;
    @track errorMSG;
    @track searchedString = "";
    @track spinner;


    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    }


    initComponent() {
        let steps = JSON.parse(JSON.stringify(this.steps));
        steps.lastModifiedStep = 2;
        this.steps = steps;
    }

    get shownStepClass(){
        return 'slds-is-relative modal-container__secondStep ' + (this.steps.shownStep == 2 ? 'heightTotal' : '');
    }
    get stepsEqTwo(){
        return this.steps.lastModifiedStep == 2;
    }
    get shownStepClass(){
        return 'slds-is-relative modal-container__secondStep ' + (this.steps.shownStep == 2 ? 'heightTotal' : '');
    }
    
    @api
    handleCheckContinue() {
        this.spinner = true;
        let data = this.cmpdata;
        let searchedString = this.searchedString;
        var msg = '';
        if (JSON.stringify(data) == JSON.stringify({})) {
            if (searchedString) {
                msg = this.Label.B2B_Error_Invalid_Input;
            } else {
                msg = this.Label.B2B_Error_Enter_Input;
            }
            var msg_parameter = this.Label.B2B_Recipient_account;
            var full_msg = msg.replace('{0}', msg_parameter);
            this.errorMSG = full_msg;
            this.spinner = false;
        } else {
            this.errorMSG = '';
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
            });
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

    // showToast() {
    //     var errorToast = this.template.querySelector('c-lwc_toast');
    //     if (errorToast) {
    //         errorToast.openToast(false, false, this.Label.B2B_Error_Problem_Loading,  this.Label.B2B_Error_Check_Connection, 'Error', 'warning', 'warning', true);
    //     }
    // }

    validateAccount() {
        return new Promise((resolve, reject) => {
            let data = this.cmpdata;

            let notificationTitle =  this.Label.B2B_Error_Problem_Loading;
            let bodyText =  this.Label.B2B_Error_Check_Connection;

            accountValidation({
                data: data
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

    getPaymentId(){
        return new Promise((resolve, reject) => {
            var sourceAccountData = this.sourceaccountdata;
            var recipientAccountData = this.cmpdata;
            var userData = this.userdata;
            var accountData = this.accountdata;
            var paymentId = this.paymentid;
            var expensesAccount = null;
            if (this.expensesaccount) {
                expensesAccount = this.expensesaccount;
            }
            if (paymentId) {
                resolve('Payment Id was created time ago.');
            } else {

                let notificationTitle =  this.Label.B2B_Error_Problem_Loading;
                let bodyText =  this.Label.B2B_Error_Continue_Button;

                getPaymentId({
                    sourceAccountData: sourceAccountData,
                    recipientAccountData: recipientAccountData,
                    userData: userData,
                    accountData: accountData,
                    paymentId: paymentId,
                    expensesAccount: expensesAccount
                }).then(actionResult => {
                    let stateRV = actionResult;
                    console.log(stateRV);
                    if (stateRV.success) {
                        if (stateRV.value) {
                            if (stateRV.value.paymentId) {
                                this.paymentid  = stateRV.value.paymentId;
                                resolve('OK');
                            } else {
                                this.showToast(notificationTitle, bodyText, true);
                                reject('ERROR: empty stateRV.value.paymentId');
                            }
                        } else {
                            this.showToast(notificationTitle, bodyText, true);
                            reject('ERROR: stateRV.value');
                        }
                    } else {
                        this.showToast(notificationTitle, bodyText, true);
                        reject(stateRV.msg);
                    }
                }).catch(error => {
                    this.showToast(notificationTitle, bodyText, true);
                    reject('ERROR: Create Payment Id.');
                });
            }
        });
    }


    showToast(notificationTitle, bodyText, noReload) {
        var errorToast = this.template.querySelector('c-lwc_b2b_toast');
        if (errorToast) {
            errorToast.openToast(false, false,  notificationTitle, bodyText, 'Error', 'warning', 'warning', noReload);
        }
    }

    compareAccounts() {
        return new Promise((resolve, reject) => {
            var recipientData = this.cmpdata;
            var sourceData = this.sourceaccountdata;
            if (recipientData.displayNumber && sourceData.displayNumber) {
                if (recipientData.displayNumber != sourceData.displayNumber) {
                    resolve('OK');
                } else {
                    let notificationTitle = 'Same account selected in Step 1'; //this.Label.B2B_Error_Problem_Loading');
                    let bodyText = 'Please select a different account.'; //this.Label.B2B_Error_Continue_Button');
                    this.showToast(component, notificationTitle, bodyText, true);
                    reject('Source account = recipient account.');
                }
            } else {
                let notificationTitle = this.Label.B2B_Error_Problem_Loading;
                let bodyText = this.Label.B2B_Error_Continue_Button;
                this.showToast(component, notificationTitle, bodyText, true);
                reject('No account numbers to compare');
            }
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