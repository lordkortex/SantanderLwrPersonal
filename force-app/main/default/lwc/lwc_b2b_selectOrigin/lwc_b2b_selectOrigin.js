import { LightningElement, api, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import instantTransfer from '@salesforce/label/c.instantTransfer';
import B2B_Step_1_Header from '@salesforce/label/c.B2B_Step_1_Header';
import B2B_Source_acc_info from '@salesforce/label/c.B2B_Source_acc_info';
import B2B_Source_account from '@salesforce/label/c.B2B_Source_account';
import B2B_SourceAccNotSelected from '@salesforce/label/c.B2B_SourceAccNotSelected';
import B2B_SelectAccountContinue from '@salesforce/label/c.B2B_SelectAccountContinue';
import B2B_Error_Invalid_Input from '@salesforce/label/c.B2B_Error_Invalid_Input';
import B2B_Error_Enter_Input from '@salesforce/label/c.B2B_Error_Enter_Input';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import B2B_SelectedBlockedAccount from '@salesforce/label/c.B2B_SelectedBlockedAccount';
import B2B_SelectDifferentAccount from '@salesforce/label/c.B2B_SelectDifferentAccount';
import blockedAccount from '@salesforce/label/c.blockedAccount';
import B2B_Error_Continue_Button from '@salesforce/label/c.B2B_Error_Continue_Button';


// Import Apex methods
import accountValidation from '@salesforce/apex/CNT_B2B_SelectOrigin.accountValidation';
import upsertPayment from '@salesforce/apex/CNT_B2B_SelectOrigin.upsertPayment';
import getPaymentId from '@salesforce/apex/CNT_B2B_SelectOrigin.getPaymentId';



export default class Lwc_b2b_selectOrigin extends LightningElement {

    label = {
        instantTransfer,
        B2B_Step_1_Header,
        B2B_Source_acc_info,
        B2B_Source_account,
        B2B_SourceAccNotSelected,
        B2B_SelectAccountContinue,
        B2B_Error_Invalid_Input,
        B2B_Error_Enter_Input,
        B2B_Error_Problem_Loading,
        B2B_Error_Check_Connection,
        B2B_SelectedBlockedAccount,
        B2B_SelectDifferentAccount,
        blockedAccount,
        B2B_Error_Continue_Button
    }

    @api expensesaccount;
    @api accountlist;
    @api handlecontinue;
    @api userdata;
    @api accountdata;
    @api isediting;
    @api reload;
    @api cmpdata;
    @api steps;
    @api ismodified;
    @api paymentdraft

    @track headerLabel = this.label.instantTransfer;
    @track errorMSG;
    @track showToast;
    @track checkedYES;
    @track searchedString;
    @track spinner;    
    @track transferType
    @track isEditingProcess
    @track searchedStringExpenses
    @track errorMSGExpenses

    _ismodified;
   

    get lastModifiedStepEqOne(){
        return this.steps.lastModifiedStep == 1;
    }

    get ismodified(){
        return this._ismodified;
    }

    set ismodified(ismodified){
        if(ismodified){
            this._ismodified = modified;
            this.handleModified();
        }
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    }

    initComponent() {
        let paymentDraft = this.paymentdraft;
        if (this.expensesaccount) {
            this.checkedYES = true;
        }
    }

    @api
    handleCheckContinue() {
        this.spinner = true;
        // let data = this.cmpdata;
        // let searchedString = this.searchedString;
        // var msg = '';
        let paymentDraft = this.paymentdraft;
        let checkedYES = this.checkedYES;
        
        if (JSON.stringify(paymentDraft.sourceAccount) == JSON.stringify({})) {
        //if (!paymentDraft.sourceAccount) {
            let accountList = this.accountlist;
            if(accountList.length <= 6){
                var title = this.label.B2B_SourceAccNotSelected;
                var body = this.label.B2B_SelectAccountContinue;
                this.doShowToast(title, body, true);
            } else {
                let msg = '';
                let searchedString = this.searchedString;
                if (searchedString) {
                    msg = this.label.B2B_Error_Invalid_Input;
                } else {
                    msg = this.label.B2B_Error_Enter_Input;
                }
                var msg_parameter = this.label.B2B_Source_account;
                var full_msg = msg.replace('{0}', msg_parameter);
                this.errorMSG = full_msg;
            } 
            this.isEditingStepError();
            this.spinner = false;
        } else if (checkedYES && (checkedYES === true && !paymentDraft.expensesAccount)) {
            let msg = '';
            let searchedStringExpenses = this.searchedStringExpenses;
            if (searchedStringExpenses) {
                msg = this.label.B2B_Error_Invalid_Input;
            } else {
                msg = this.label.B2B_Error_Enter_Input;
            }
            var msg_parameter = this.label.B2B_Source_account;
            var full_msg = msg.replace('{0}', msg_parameter);
            this.errorMSGExpenses = full_msg;
            this.isEditingStepError();



            this.spinner = false;
        } else {
            this.errorMSG = '';
            this.errorMSGExpenses = '';
            // this.validateAccount()
            // .then(() => {
             //   return this.getPaymentId();
            this.getPaymentId()
            .then(() => {
                return this.upsertPayment();
            }).then(() => {
                this.completeStep()
            }).catch( error => {
                this.isEditingStepError();
                console.log(error);
            }).finally( () => {
                console.log('OK');
                this.spinner = false;

                const accountdataevent = new CustomEvent('accountdata', {
                    detail : { 
                        account: this.paymentdraft.sourceAccount, 
                        step: 1, 
                        id: this.paymentdraft.paymentId
                    }
    
                });
                this.dispatchEvent(accountdataevent);

            });
        }
    }

    validateAccount() {
        return new Promise( (resolve, reject) => {
            let paymentDraft = this.paymentdraft;
            //let data = this.cmpdata;
            let notificationTitle = this.label.B2B_Error_Problem_Loading;
            let bodyText =  this.label.B2B_Error_Check_Connection;
            
            accountValidation({data: paymentDraft.sourceAccount})
            .then(actionResult => {
                let returnValue = actionResult;
                if (!returnValue.success) {
                    this.doShowToast(notificationTitle, bodyText, true);
                    reject('ko');
                } else {
                    if (returnValue.value.statusResult != 'OK') {
                        let accountList = this.accountlist;
                        if (accountList.length <= 6) {
                            let title = this.label.B2B_SelectedBlockedAccount;
                            let body = this.label.B2B_SelectDifferentAccount;
                            this.doShowToast(title, body, true);
                        } else {
                            this.errorMSG = this.label.blockedAccount;
                        }
                        reject('ko');
                    } else {
                        resolve('ok');
                    }
                }
            })
            .catch( error => {
                let errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);      
                    }
                }
                this.doShowToast(notificationTitle, bodyText, true);
                reject('ko');
            })
        });
    }

    completeStep() {
        return new Promise( (resolve) => {
            const completestepevent = new CustomEvent('completestep', {
                detail: {confirm : true}
            });
            this.dispatchEvent(completestepevent);

            this.errorMSG = '';
            this._ismodified = false;

            let paymentDraft = this.paymentdraft
            if (!paymentDraft.expensesAccount || paymentDraft.expensesAccount == paymentDraft.data) {
                this.checkedYES = false;
            }
            resolve('ok');
        });
    }

    doShowToast(notificationTitle, bodyText, noReload) {
        var errorToast = this.template.querySelector('c-lwc_b2b_toast');
        if (errorToast) {
            errorToast.openToast(false, false, notificationTitle,  bodyText, 'Error', 'warning', 'warning', noReload);
        }
    }

    handleModified() {
        let isModified = this._ismodified;
        let steps = this.steps;
        if (isModified) {
            steps.lastModifiedStep = 1;
            steps.focusStep = 1;
            steps.shownStep = 1;
        }
        this.steps = steps;
    }

    handleContinue(){
        const handlecontinueevent = new CustomEvent('handlecontinue');
        this.dispatchEvent(handlecontinueevent);
    }

    handleAccountData(event){        
        if(event.detail){
            const accountdataevent = new CustomEvent('accountdata', {
                detail : { 
                    account: event.detail.account, 
                    step: 1, 
                }

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

    isEditingStepError() {
        const completeStep = new CustomEvent('completestep',{detail : {
            confirm: false
        } });
        this.dispatchEvent(completeStep);
    }

    // Migración de getPaymentId desde el step 2
    getPaymentId() {
        return new Promise((resolve, reject) => {
            let paymentDraft = this.paymentdraft;
            if (this.isEditingProcess == true) { // revisar funcionalidad del isEditingProcess
                resolve('OK');
            } else if (paymentDraft.paymentId) { 
                resolve('OK');
            } else {
                let userData = this.userdata;
                let expensesAccount = null;
                if (paymentDraft.expensesAccount) {
                    expensesAccount = paymentDraft.expensesAccount;
                }
                let notificationTitle =  this.label.B2B_Error_Problem_Loading;
                let bodyText =  this.label.B2B_Error_Continue_Button;

                
                getPaymentId({
                    sourceAccount: paymentDraft.sourceAccount,
                    userData: userData,
                    paymentId: paymentDraft.paymentId,
                    expensesAccount: expensesAccount
                }).then(actionResult => {
                    let stateRV = actionResult;
                    stateRV = {"msg":"","success":true,"value":{"paymentId":"05a1e74b058642048b0014e11eb12f96"}};
                    console.log(stateRV);
                    if (stateRV.success) {
                        if (stateRV.value) {
                            if (stateRV.value.paymentId) {
                                let paymentDraft = JSON.parse(JSON.stringify(this.paymentdraft));
                                paymentDraft.paymentId = stateRV.value.paymentId;
                                this.paymentdraft = paymentDraft;
                                resolve('OK');
                            } else {
                                this.doShowToast(notificationTitle, bodyText, true);
                                reject('ERROR: empty stateRV.value.paymentId');
                            }
                        } else {
                            this.doShowToast(notificationTitle, bodyText, true);
                            reject('ERROR: stateRV.value');
                        }
                    } else {
                        this.doShowToast(notificationTitle, bodyText, true);
                        reject(stateRV.msg);
                    }
                }).catch(error => {
                    this.doShowToast(notificationTitle, bodyText, true);
                    reject('ERROR: Create Payment Id.');
                })                
            }
        });
    }
    
    upsertPayment() {
        return new Promise((resolve, reject) => {
            let paymentDraft = this.paymentdraft;

            upsertPayment({
                paymentDraft: paymentDraft
            }).then(actionResult => {
                let stateRV = actionResult;
                console.log(stateRV);
                if (stateRV.success) {
                    resolve('OK');
                } else {
                    this.doShowToast(notificationTitle, bodyText, true);
                    reject(stateRV.msg);
                }
            }).catch(error => {
                this.doShowToast(notificationTitle, bodyText, true);
                reject('ERROR: Create Payment Id.');
            })

           
        });
    }
}