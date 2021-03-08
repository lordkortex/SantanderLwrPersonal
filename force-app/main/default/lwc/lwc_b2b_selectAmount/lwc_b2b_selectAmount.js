import {LightningElement,api,track} from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import B2B_Step_3_Header from '@salesforce/label/c.B2B_Step_3_Header';
import B2B_Step_3_From from '@salesforce/label/c.B2B_Step_3_From';
import B2B_Step_3_To from '@salesforce/label/c.B2B_Step_3_To';
import B2B_Step_3_Indicative_Rate from '@salesforce/label/c.B2B_Step_3_Indicative_Rate';
import EUR from '@salesforce/label/c.EUR';
import GBP from '@salesforce/label/c.GBP';

//Import Apex methods
import getExchangeRate from '@salesforce/apex/CNT_B2B_SelectAmount.getExchangeRate';
import getTransferFees from '@salesforce/apex/CNT_B2B_SelectAmount.getTransferFees';
import getLimits from '@salesforce/apex/CNT_B2B_SelectAmount.getLimits';
import accountValidation from '@salesforce/apex/CNT_B2B_SelectAmount.accountValidation';
import updateSelectAmount from '@salesforce/apex/CNT_B2B_SelectAmount.updateSelectAmount';
//import updateSelectAmount from '@salesforce/apex/CNT_B2B_SelectAmount.updateSelectAmount';

export default class lwc_b2b_selectAmount extends LightningElement{

    //Labels
    label = {
        B2B_Step_3_Header,
        B2B_Step_3_From,
        B2B_Step_3_To,
        B2B_Step_3_Indicative_Rate,
        EUR,
        GBP,
    }
    
    @api paymentid = ''; //ID of the current payment
    @api steps = {} //Data of the steps
    @api userdata = {} //User data
    @api accountdata //Account data
    @api isediting = false; //Indicates if the user is editing an existing payment so field should not be reset on initialisation
    @api sourceaccountdata = {};
    @api recipientaccountdata = {};
    @api mydata = {}; 
    @api handlecontinue 

    @track spinner = false; //Spinner loading
    @track convertedamount //Amount returned from calculation to be saved to amountReceive or amountSend
    @track errorMSG = ''; //Indicates the error when clicked on continue
    @track timeSourceBalance = '12:34'; //Time at which the source account balance was last updated
    @track timeRecipientBalance = '01:00'; //Time at which the recipient account balance was last updated
    @track disablefrom = false; //Disable the From field for CIB user when they input a value in the To field
    @track disableto = false; //Disable the To field for CIB user when they input a value in the From field
    @track amountEnteredFrom = ''; //'source' or 'recipient' depending on which input field the user enters the amount. If no currency exchange because thw two accounts have same currency, value is 'recipient'
    @track disabledContinue = false; 
    @track step 
    @track amountEntered 
    @track amountEnteredFrom  

    get mainClass(){
        var res = '';
        if(this.steps){
            res = (this.steps.shownStep == 3 ? 'paymentProcessStep3 slds-is-relative heightTotal' : 'paymentProcessStep3 slds-is-relative ');
        }
        return res;
    }

    isNotEqualCurrencyCodeofSourceAccountAndRecipientAccount(){
        var res = null;
        if(this.sourceaccountdata && this.recipientaccountdata){
            this.sourceaccountdata.currencyCodeAvailableBalance != this.recipientaccountdata.currencyCodeAvailableBalance;
        }
        return res;
    }

    existSourceAccountDataAlias(){
        return (this.sourceaccountdata && this.sourceaccountdata.alias ? true : false);
    }
        
    existAvailableBalacenOnSourceAccount(){
        return (this.sourceaccountdata && this.sourceaccountdata.amountAvailableBalance ? true : false);
    }

    exchangeRateNotZero(){
        return ( this.mydata && this.mydata.exchangeRate && this.mydata.exchangeRate != 0 ? true : false);
    }

    isCibFalseOrEmpty(){
        return (!this.accountdata || !this.accountdata.cib || !this.accountdata.cib);
    }

    existBalanceOnRecipientAccount(){
        return (this.recipientaccountdata && this.recipientaccountdata.amountAvailableBalance ? true : false);
    }
    
    get nameOfStepThreeFromAndAlias(){
        return this.label.B2B_Step_3_From + ' ' + this.sourceaccountdata.alias;
    }

    get nameOfStepThreeFromAndNumber(){
        return this.label.B2B_Step_3_From + ' ' + this.sourceaccountdata.displayNumber;
    }

    get nameOfStepThreeToAndAlias(){
        return this.label.B2B_Step_3_To + ' ' + this.recipientaccountdata.alias;
    }

    get nameOfStepThreeToAndNumber(){
        return this.label.B2B_Step_3_To + ' ' + this.recipientaccountdata.displayNumber;
    }

    isStepThreeLastStepModified(){
        return ((this.steps && this.steps.lastModifiedStep == 3) ? true : false);
    }
    
    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    } 
    
    initComponent(event) {
        var steps = this.steps;
        steps.lastModifiedStep = 3;
        this.steps = steps;
        let isEditing =this.isediting;
        let data =this.mydata;
        new Promise( (resolve, reject) => {
            let steps =this.steps;
            let focusStep = steps.focusStep;
            let lastModifiedStep = steps.lastModifiedStep;
            
            let amount = data.amountSend;
            
            if (focusStep == lastModifiedStep && focusStep != 5) {
                data.timestamp = '';
                data.exchangeRate = 0;
                if (!(amount)) {
                    data.amountSend = null;
                    data.amountReceive = null;
                }
            }
            resolve('Ok');
        }, this).then( (value) => {
            if(!isEditing){
                return this.handleChangeAmount(event, data.amountSend, 'source');  
            }
              if(isEditing){
                this.spinner = true;
                return this.showInformation(event);
            } 
        }).catch( (error) => {
            toast().error('', error);
        }).finally( () => {
            this.mydata = data;
            this.convertedAmount = '';
            this.spinner = false;
            this.formatUpdatedDate(event);
        });
    }
    
    handleCheckContinue(event) {
        let data =this.mydata;
        let errorMSG = '';
        if (!(data.amountSend) || data.amountSend == 0) {
            errorMSG = this.label.B2B_Error_Enter_Input;
            var msg_parameter = this.label.B2B_Amount_Input_Placeholder;
            errorMSG = errorMSG.replace('{0}', msg_parameter);
            this.errorMSG = errorMSG;
        } else if (this.disabledContinue) {
            var notificationTitle =  this.label.B2B_Error_Problem_Loading;
            var bodyText =  this.label.B2B_Error_Enter_Amount;
            this.showToast(notificationTitle, bodyText, true);
        } else {
            this.errorMSG = errorMSG;
            this.spinner = true;
            var parametros =  this.getTransferFees(event);
            parametros.then( (value) => {
                return this.updatePaymentDetails(event);
            }).then( (value) => {
                this.completeStep(event);
            }).catch( (error) => {
                console.log('### lwc_b2b_selectAmount ### handleCheckContinue ::: Catch error: ' + error);
            }).finally( () => {
                this.spinner = false;
            });
        }
    }

    handleEditingProcess(event) {
        let params = event.getParams().arguments;
        let amountEntered = null;
        let amountEnteredFrom = '';
        if (params.amountEntered) {
            amountEntered = params.amountEntered;
        }
        if (params.amountEnteredFrom) {
            amountEnteredFrom = params.amountEnteredFrom;
        }
        this.showInformation(event)
        .then( (value) => {
            this.isediting = false;
            this.handleChangeAmount(event, amountEntered, amountEnteredFrom);
        }).catch( (error) => {
            console.log('### lwc_b2b_selectAmount ### handleEditingProcess ::: Catch error: ' + error);
        });
    }

    handleChange(event) {                     
        let params = event.getParams(); 
        var steps =this.steps;
        steps.lastModifiedStep = 3;
        steps.focusStep = 3;
        steps.shownStep = 3;
        this.steps = steps;
        var amountEnteredFrom = '';
        if (params.inputId == 'sourceAmountInput') {
            amountEnteredFrom = 'source';
        } else if (params.inputId == 'recipientAmountInput') {
            amountEnteredFrom = 'recipient';
        }
        this.handleChangeAmount(event, params.amount, amountEnteredFrom);
        this.isediting = false;
    }

    completeStep(event) {
        const completestepevent = new CustomEvent('completestepevent', {
            confirm: true
        });
        this.dispatchEvent(completestepevent);
    }
    
    handleChangeAmount(event, amount, amountEnteredFrom) {
        var isEditing = this.isediting;
        var sourceAccountData = this.sourceaccountdata;
        var recipientAccountData = this.recipientaccountdata;
        if (amount) {
            new Promise( (resolve, reject) => {
                this.disabledContinue = false;
                this.spinner = true;
                this.errorMSG = '';
                this.convertedAmount = '';
                let data =this.mydata;
                data.timestamp = '';
                data.exchangeRate = 0;                
                if (amountEnteredFrom.localeCompare('source') == 0) {
                    this.amountEnteredFrom = amountEnteredFrom;
                    data.amountSend = amount;
                    data.fromOrigin = true;
                    if(!isEditing) {
                        data.amountReceive = null;
                    }
                } else if(amountEnteredFrom.localeCompare('recipient') == 0) {
                    this.amountEnteredFrom = amountEnteredFrom;
                    data.amountSend = null;
                    data.fromOrigin = false;
                    if(!isEditing) {
                        data.amountReceive = amount;
                    }
                }
                this.mydata = data;
                resolve('Ok');
            }, this).then( (value) => {
                
                if (sourceAccountData.currencyCodeAvailableBalance.localeCompare(recipientAccountData.currencyCodeAvailableBalance) != 0) {
                    return this.getExchangeRate('I');
                }else{
                    return 'OK';
                }                
            }).then( (value) => {
                if(amountEnteredFrom.localeCompare('recipient') == 0){
                    if (sourceAccountData.currencyCodeAvailableBalance.localeCompare(recipientAccountData.currencyCodeAvailableBalance) != 0) {
                        var convertedAmount =this.convertedAmount;
                        if(convertedAmount){
                            let data =this.mydata;
                         	data.amountSend = convertedAmount; 
                            this.mydata = data;
                        }
                    }
                }
                return this.validateAccount(event);
            }).then( (value) => {                
                return this.getLimits();
            }).catch( (error) => {
                console.log('### lwc_b2b_selectAmount ### handleChangeAmount ::: Catch error: ' + error);
                this.disabledContinue = true;
            }).finally( () => {
                let data =this.mydata;
                let converted =this.convertedAmount;
                if (converted) {
                    if (amountEnteredFrom.localeCompare('source') == 0) {
                        data.amountReceive = converted;
                    } else if(amountEnteredFrom.localeCompare('recipient') == 0) {
                        data.amountSend = converted;
                    }
                }  
                this.mydata = data;
                this.spinner = false;
            }); 
        }
    }

    getExchangeRate(requestType) {
        return new Promise( (resolve, reject) => {
            var paymentId =this.paymentid;
            var paymentData =this.mydata;
            var accountData =this.accountdata;
            var sourceAccountData =this.sourceaccountdata;
            var recipientAccountData =this.recipientaccountdata;
            var notificationTitle =  this.label.B2B_Error_Problem_Loading;
            var bodyText =  this.label.B2B_Error_Enter_Amount;
            
            getExchangeRate({
                paymentId : paymentId,
                requestType : requestType,
                paymentData : paymentData,
                accountData : accountData,
                sourceAccountData : sourceAccountData,
                recipientAccountData : recipientAccountData
            })
            .then( (result) => {
                var stateRV = result;
                if (stateRV.success) {
                    if (stateRV.value.exchangeRate) {
                        paymentData.exchangeRate = stateRV.value.exchangeRate;
                        var num = stateRV.value.exchangeRate;
                        num = num.toString(); //If it's not already a String
                        num = num.slice(0, (num.indexOf("."))+5); 
                        paymentData.exchangeRateToShow = num;
                    }  
                    if (stateRV.value.timestamp) {
                        paymentData.timestamp = stateRV.value.timestamp;
                    }  
                    if (stateRV.value.convertedAmount) {
                        this.convertedAmount = stateRV.value.convertedAmount;
                    } 
                    if (stateRV.value.output) {
                        paymentData.exchangeRateServiceResponse = stateRV.value.output;
                    }      
                    // this.disabledContinue", false);
                    this.mydata = paymentData;
                    resolve('OK');
                } else {
                    reject(stateRV.msg);
                    this.showToast(notificationTitle, bodyText, true);
                }
            })
            .catch( (errors) => {
                reject('ERROR: FX');
                console.log('### lwc_b2b_selectAmount ### getExchangeRate ::: Catch error: ' + errors);
                this.showToast(notificationTitle, bodyText, true);
            })
        }, this);
    }

    getTransferFees(event) {
        return new Promise( (resolve, reject) => {
            var paymentId =this.paymentid;
            var data =this.mydata;
            var userData =this.userData;
            var accountData =this.accountdata;
            var sourceAccountData =this.sourceaccountdata;
            var recipientAccountData =this.recipientaccountdata;
            var notificationTitle =  this.label.B2B_Error_Problem_Loading;
            var bodyText =  this.label.B2B_Error_Continue_Button;
            getTransferFees({
                paymentId : paymentId,
                paymentData : data,
                userData : userData,
                accountData : accountData,
                sourceAccountData : sourceAccountData,
                recipientAccountData : recipientAccountData
            })
            .then( (result) => {
                var stateRV = result;
                if (stateRV.success) {
                    if (stateRV.value.originalTransactionFee) {
                        data.transactionFee = stateRV.value.originalTransactionFee;
                        data.transactionFeeCurrency = stateRV.value.originalTransactionFeeCurrency;
                        data.transactionFeeServiceResponse = stateRV.value.transactionFeeServiceResponse;
                        data.convertedTransactionFee = stateRV.value.convertedTransactionFee;
                        data.convertedTransactionFeeCurrency = stateRV.value.convertedTransactionFeeCurrency;
                        data.convertedTransactionFeeServiceResponse = stateRV.value.exchangeRateServiceResponse;
                    }
                    this.mydata = data;
                    resolve('OK');
                } else {
                    reject(stateRV.msg);
                    this.spinner = false;
                    this.showToast(notificationTitle, bodyText, true);
                }
            })
            .catch( (errors) => {
                reject('ERROR: Special Prices');
                this.spinner = false;
                this.showToast(notificationTitle, bodyText, true);
            })   
        }, this);
    }

    getLimits() {
        return new Promise( (resolve, reject) => {
            var paymentId =this.paymentid;
            var data =this.mydata;
            var userData =this.userData;
            var accountData =this.accountdata;
            var sourceAccountData =this.sourceaccountdata;
            var recipientAccountData =this.recipientaccountdata;
            var notificationTitle =  this.label.B2B_Error_Problem_Loading;
            var bodyText =  this.label.B2B_Error_Enter_Amount;
            var label = this.label.B2B_Error_Amount_Exceeds_Limits;
            var limitsResult = '';
            getLimits({
                paymentId : paymentId,
                paymentData : data,
                userData : userData,
                accountData : accountData,
                sourceAccountData : sourceAccountData,
                recipientAccountData : recipientAccountData
            })
            .then( (result) => {
                var stateRV = result;
                    if (stateRV.success) {
                        if (stateRV.value.limitsResult) {
                            limitsResult = stateRV.value.limitsResult;
                        }       
                        if (limitsResult.toLowerCase().localeCompare('ko') == 0 || stateRV.value.errorMessage) {
                            var error =this.errorMSG;
                            if (!error.includes(label)) {
                                if(error) {
                                    this.errorMSG = error + '-' + label;
                                } else {
                                    this.errorMSG = label;
                                }
                            }
                        }
                        resolve('OK');
                    } else {
                        reject(stateRV.msg);
                        this.spinner = false;
                        this.showToast(component, notificationTitle, bodyText, true);
                    }
            })
            .catch((errors) => {
                reject('ERROR: Limits');
                    this.spinner = false;
                    this.showToast(component, notificationTitle, bodyText, true);
                    console.log('### lwc_b2b_selectAmount ### getLimits() ::: Catch error: ' + errors);
            })
        }, this);
    }
    

    showToast(notificationTitle, bodyText, noReload) {
        var errorToast = this.template.querySelector('[data-id="errorToast"]');
        if (errorToast) {
            errorToast.openToast(false, false, notificationTitle, bodyText, 'Error', 'warning', 'warning', noReload);
        }
    }

    validateAccount(event) {
        return new Promise( (resolve, reject) => {
            let sourceAccount =this.sourceaccountdata;
            let data =this.mydata;
            let label = this.label.B2B_Error_Amount_Exceeds_Balance;
            accountValidation({
                sourceAccount : sourceAccount,
                amount : data.amountSend
            })
            .then( (result) => {
                let returnValue = result;
                    if (!returnValue.success) {
                        this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
                    } else {
                		// this.disabledContinue", false);
                        if (returnValue.value.amountResult != 'OK') {
                            let error =this.errorMSG;
                            if (!error.includes(label)) {
                                this.errorMSG = error ? error + '-' + label : label;
                            } 
                        }
                    }
            })
            .catch( (errors) => {
                this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
            })
            resolve('ok');
        }, this);
    }
    
    updatePaymentDetails (event) {
        return new Promise( (resolve, reject) => {
            var paymentId =this.paymentid;
            var accountData =this.accountdata;
            var sourceAccountData =this.sourceaccountdata;
            var recipientAccountData =this.recipientaccountdata;
            var userInputField =this.amountEnteredFrom;
            var paymentData =this.mydata;
            updateSelectAmount({
                paymentId : paymentId,
                accountData : accountData,
                paymentData : paymentData,
                sourceAccountData : sourceAccountData,
                recipientAccountData : recipientAccountData,
                userInputField : userInputField
            })
            .then( (result) => {
                var stateRV = result;
                if (stateRV.success) {
                    resolve('OK');
                } else {
                    var notificationTitle =  this.label.B2B_Error_Problem_Loading;
                    var bodyText =  this.label.B2B_Error_Updating_Data;
                    this.showToast(component, notificationTitle, bodyText, true);
                    reject(stateRV.msg);
                }
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    console.log('problem updating step 3 payment details');
                }
                this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
                reject(this.label.ERROR_NOT_RETRIEVED);
            })
        }, this);
    }
    
    showInformation (event) { 
        return new Promise( (resolve, reject) => {
            var data =this.mydata;
            var sourceAccountData =this.sourceaccountdata;
            var recipientAccountData =this.recipientaccountdata;
            var CMP_amountSend = this.template.querySelector('[data-id="sourceAmountInput"]');
            if(CMP_amountSend){
                CMP_amountSend.setInputAmount('sourceAmountInput', data.amountSend);
                
            }
            if(sourceAccountData && recipientAccountData){
                if(sourceAccountData.currencyCodeAvailableBalance && recipientAccountData.currencyCodeAvailableBalance){
                    if(sourceAccountData.currencyCodeAvailableBalance != recipientAccountData.currencyCodeAvailableBalance){
                        var CMP_amountReceive = this.template.querySelector('[data-id="recipientAmountInput"]');  
                        if(CMP_amountReceive){               
                            CMP_amountReceive.setInputAmount('recipientAmountInput', data.amountReceive);
                        }
                    }
                }                
            }
            resolve('OK');
        }, this);
    }
    
    formatUpdatedDate (event) {
            var sourceAccountData =this.sourceaccountdata;
            var recipientAccountData =this.recipientaccountdata;

            if(sourceAccountData && recipientAccountData){
                if(sourceAccountData.lastUpdateAvailableBalance){
                    console.log('Hora origen: ' + sourceAccountData.lastUpdateAvailableBalance);
                    //var issueTimeSource = $A.localizationService.formatTime(sourceAccountData.lastUpdateAvailableBalance, 'HH:mm');
                    //this.timeSourceBalance = issueTimeSource;  
                }
                if(recipientAccountData.lastUpdateAvailableBalance){
                    console.log('Hora origen: ' + recipientAccountData.lastUpdateAvailableBalance);
                    //var issueTimeRecipient = $A.localizationService.formatTime(recipientAccountData.lastUpdateAvailableBalance, 'HH:mm');
                    //this.timeRecipientBalance = issueTimeRecipient;  
                }
            }
         
     }
}