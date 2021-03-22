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
import B2B_Country from '@salesforce/label/c.B2B_Country';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Enter_Amount from '@salesforce/label/c.B2B_Error_Enter_Amount';
import B2B_Error_Amount_Exceeds_Limits from '@salesforce/label/c.B2B_Error_Amount_Exceeds_Limits';
import B2B_Error_Amount_Exceeds_Balance from '@salesforce/label/c.B2B_Error_Amount_Exceeds_Balance';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';
import B2B_Error_Enter_Input from '@salesforce/label/c.B2B_Error_Enter_Input';
import B2B_Reference from '@salesforce/label/c.B2B_Reference';
import B2B_paymentPurpose from '@salesforce/label/c.B2B_PaymentPurpose';
import B2B_Amount_Input_Placeholder from '@salesforce/label/c.B2B_Amount_Input_Placeholder';
import B2B_Error_Updating_Data from '@salesforce/label/c.B2B_Error_Updating_Data';



//Import Apex methods
import getExchangeRate from '@salesforce/apex/CNT_B2B_SelectAmount.getExchangeRate';
//import getTransferFees from '@salesforce/apex/CNT_B2B_SelectAmount.getTransferFees';
import processPaymentTransferFees from '@salesforce/apex/CNT_B2B_SelectAmount.processPaymentTransferFees';
import getLimits from '@salesforce/apex/CNT_B2B_SelectAmount.getLimits';
import updatePaymentInformation from '@salesforce/apex/CNT_B2B_SelectAmount.updatePaymentInformation';
import getPaymentLine from '@salesforce/apex/CNT_B2B_SelectAmount.getPaymentLine';
//import accountValidation from '@salesforce/apex/CNT_B2B_SelectAmount.accountValidation';
//import updateSelectAmount from '@salesforce/apex/CNT_B2B_SelectAmount.updateSelectAmount';
import showHideComponents from '@salesforce/apex/CNT_B2B_SelectAmount.showHideComponents';
import checkFCCDowJones from '@salesforce/apex/CNT_B2B_PaymentInformation.checkFCCDowJones';


export default class lwc_b2b_selectAmount extends LightningElement{

    //Labels
    label = {
        B2B_Step_3_Header,
        B2B_Step_3_From,
        B2B_Step_3_To,
        B2B_Step_3_Indicative_Rate,
        EUR,
        GBP,
        B2B_Country,
        B2B_Error_Problem_Loading,
        B2B_Error_Enter_Amount,
        B2B_Error_Amount_Exceeds_Limits,
        B2B_Error_Amount_Exceeds_Balance,
        B2B_Error_Check_Connection,
        ERROR_NOT_RETRIEVED,
        B2B_Error_Enter_Input,
        B2B_Reference,
        B2B_paymentPurpose,
        B2B_Amount_Input_Placeholder,
        B2B_Error_Updating_Data

    }
    
    @api paymentid = ''; //ID of the current payment
    @api steps; //Data of the steps
    @api userdata = {}; //User data
    @api accountdata //Account data
    @api isediting = false; //Indicates if the user is editing an existing payment so field should not be reset on initialisation
    @api sourceaccountdata = {};
    @api recipientaccountdata = {};
    @api mydata = {}; 
    @api paymentdraft = {};
    @api transfertype = '';
    @api step3field = {};
    @api exchangeratetoshow
    @api errorref = '';
    @api errorpurpose = '';
    @api errorpaymentreason = '';
    @api errorcharges = '';
    @api showbothamountinput = false;
    @api ratecurrencies = '';
    @api signlevel = {};
    @api paymentpurpose = [];
    @api ismodified;
    @api charges =[];



    @track spinner = false; //Spinner loading
    @track convertedamount //Amount returned from calculation to be saved to amountReceive or amountSend
    @track errorMSG = ''; //Indicates the error when clicked on continue
    @track timeSourceBalance = '12:34'; //Time at which the source account balance was last updated
    @track timeRecipientBalance = '01:00'; //Time at which the recipient account balance was last updated
    @track disablefrom = false; //Disable the From field for CIB user when they input a value in the To field
    @track disableto = false; //Disable the To field for CIB user when they input a value in the From field
    @track amountEnteredFrom = ''; //'source' or 'recipient' depending on which input field the user enters the amount. If no currency exchange because thw two accounts have same currency, value is 'recipient'
    @track disabledcontinue = false; 
    @track step 
    @track amountentered  
    @track isloading = true;
   

    //-------------------------------FUNCIONES PARA EL HTML---------------------------------------------------------

    // get spinnertrue(){
    //     var res;

    //     if(this.spinner = true){
    //          res = true;
    //     }

    //     return res;
    // }
    get elementlabelsource(){
        var res;
        if(this.paymentdraft.sourceAccount.alias){
            res= (this.label.B2B_Step_3_From + ' ' + this.paymentdraft.sourceAccount.alias);
        } else {
            res= (this.label.B2B_Step_3_From + ' ' + this.paymentdraft.sourceAccount.displayNumber);
        } 

        return res; 
    }

    get elementlabeldestination(){
        var res = '';
        if(this.paymentdraft.destinationAccount.alias){
            res= (this.label.B2B_Step_3_To + ' ' + this.paymentdraft.destinationAccount.alias);
        } else {
            res= (this.label.B2B_Step_3_To + ' ' + this.paymentdraft.destinationAccount.displayNumber);
        }

        return res;   
    }
         
    get mainClass(){
        var res = '';
        if(this.steps){
            res = (this.steps.shownStep == 3 ? 'paymentProcessStep3 slds-is-relative heightTotal' : 'paymentProcessStep3 slds-is-relative ');
        }
        return res;
    }

    get paymentdraftoriginzero(){
            var res;
            if(this.paymentdraft.fromOrigin = true){
                res = true;
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
     get ratepaymentdrafttimestamp(){

        return (this.label.B2B_Step_3_Indicative_Rate + ' ' + this.paymentdraft.timestamp)

     }

     get productidnonull(){
      if(this.paymentdraft.productId != null)
         return true;
     } 
     

    existSourceAccountDataAlias(){
        return (this.sourceaccountdata && this.sourceaccountdata.alias ? true : false);
    }
        
    existAvailableBalacenOnSourceAccount(){
        return (this.sourceaccountdata && this.sourceaccountdata.amountAvailableBalance ? true : false);
    }

    get amountabailablebalancenotempty(){
        return (this.paymentdraft.sourceAccount.amountAvailableBalance);
    }


    get exchangeRateNotZero(){
        return (!this.paymentdraft.exchangeRate && this.paymentdraft.exchangeRate != 0 ? true : false);
    }

    isCibFalseOrEmpty(){
        return (this.accountdata.cib || this.accountdata.cib == false ? true : false);
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
        return (this.steps.lastModifiedStep == 3 ? true : false);
        
    }


//----------------------------------CONTROLLER-----------------------------------------------
    initComponent (event) {
  
        this.getPaymentDetails()
        .then(() => {
            return this.initComponentHelper(event);
        }).then(() => {
            return this.ServicePaymentLine(event);
        }).then(() => {
            return this.formatUpdatedDate(event);
        }).then(() => {
            return this.showHideComponents(event);
        }).catch((error) => {
            console.log(error);
            console.log('KO');
        });      
    }

    @api
    handleCheckContinue() {
        this.spinner = true;
        this.paymentDetailsContinue()
        .then( () => {
            return this.updatePaymentDetails();
	    }).then(() => {
            return this.processPaymentTransferFees();
        }).then(() => {
                        
           const accountdataevent = new CustomEvent('accountdata', {
            detail : { 
                paymentDraft: this.paymentdraft,
                step: 3 
            }

            });
            this.dispatchEvent(accountdataevent);

            this.completeStep();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
           this.spinner = false;
        });
    }

    handleEditingProcess(event) {
        let params = event.detail.arguments;
        let amountEntered = null;
        let amountEnteredFrom = '';
        if ((params.amountEntered)) {
            amountEntered = params.amountEntered;
        }
        if ((params.amountEnteredFrom)) {
            amountEnteredFrom = params.amountEnteredFrom;
        }
        this.showInformation( event)
        .then(() => {
            this.isediting = false;
            // this.handleChangeAmount(even, amountEntered, amountEnteredFrom);
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange(event) {
        let params = event.detail; 
        var steps = this.steps;
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
        this.handleChangeAmount(params.amount, amountEnteredFrom);
        this.isediting = false;
    }


//------------------------------HELPER-----------------------------------------------------

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    } 
    
    handleChangeAmount(amount, amountEnteredFrom) {
        var isediting = this.isediting;
        let paymentdraft = this.paymentdraft
        if (amount) {
            return new Promise( (resolve, reject) => {
                this.disabledcontinue = false;
                this.spinner = true;
                this.errorMSG = '';
                this.convertedamount = '';         
                if (amountEnteredFrom.localeCompare('source') == 0) {
                    this.paymentdraft.amountSend = amount;
                    this.paymentdraft.fromOrigin= true;
                    if(!isediting) {
                        paymentdraft.amountReceive = null;
                    }
                } else if(amountEnteredFrom.localeCompare('recipient') == 0) {
                    this.amountEnteredFrom = amountEnteredFrom;
                    this.paymentdraft.amountSend = null;
                    this.paymentdraft.fromOrigin = false;
                    if(!isediting) {
                        paymentdraft.amountReceive = null;
                    }
                }
                this.paymentdraft = paymentdraft;
                resolve('Ok');
            })
            .then((value) => {                
                if (paymentdraft.sourceAccount.currencyCodeAvailableBalance.localeCompare(paymentdraft.destinationAccount.currencyCodeAvailableBalance) != 0) {
                    return this.getExchangeRate('I');
                }else{
                    return 'OK';
                }                
            }).then((value) => {
                if(amountEnteredFrom.localeCompare('recipient') == 0){
                    if (paymentdraft.sourceAccount.currencyCodeAvailableBalance.localeCompare(paymentdraft.destinationAccount.currencyCodeAvailableBalance) != 0) {
                        var convertedamount =this.convertedamount;
                        if(convertedamount){
                            let paymentdraft =this.paymentdraft;
                         	paymentdraft.amountSend = convertedamount; 
                            this.paymentdraft = paymentdraft;
                        }
                    }
                }
                return this.checkBalance();
            }).then((value) => {                
                return this.getLimits();
            }).catch((error) => {
                console.log('### lwc_b2b_selectAmount ### handleChangeAmount ::: Catch error: ' + error);
                this.disabledcontinue = true;
            }).finally( () => {
                let paymentdraft =this.paymentdraft;
                let converted =this.convertedamount;
                if (converted) {
                    if (amountEnteredFrom.localeCompare('source') == 0) {
                        paymentdraft.amountReceive = converted;
                    } else if(amountEnteredFrom.localeCompare('recipient') == 0) {
                        paymentdraft.amountSend = converted;
                    }
                }  
                this.paymentdraft = paymentdraft;
                this.spinner = false;
            }); 
        }
    }

    getExchangeRate(requestType) {
        return new Promise( (resolve, reject) => {
            let paymentdraft = this.paymentdraft;
            var notificationTitle = this.label.B2B_Error_Problem_Loading;
            var bodyText = this.label.B2B_Error_Enter_Amount;
            //var action = this.getExchangeRate;
            
            getExchangeRate({  //this.
                paymentDraft: paymentdraft
            })
            .then( (result) => {
                var stateRV = result;
                if (stateRV.success) {
                    let paymentdraft = this.paymentdraft;
                    if (stateRV.value.exchangeRate) {
                        paymentdraft.exchangeRate = stateRV.value.exchangeRate;
                        var num = stateRV.value.exchangeRate;
                        num = num.toString(); //If it's not already a String
                        num = num.slice(0, (num.indexOf("."))+5); 
                        this.exchangeratetoshow = num;
                    }  
                    if (stateRV.value.timestamp) {
                        paymentdraft.timestamp = stateRV.value.timestamp;
                    }  
                    if (stateRV.value.convertedamount) {
                        this.convertedamount = stateRV.value.convertedamount;
                    } 
                    if (stateRV.value.output) {
                        paymentdraft.exchangeRateServiceResponse = stateRV.value.output;
                    }      
                    // this.disabledcontinue", false);
                    this.paymentdraft = paymentdraft;
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
        });
    }


    getLimits() {
        return new Promise( (resolve, reject) => {

            let paymentdraft = this.paymentdraft
            let userdata =this.userdata;
            let sourceaccountData =this.sourceaccountdata;
            let recipientaccountData =this.recipientaccountdata;
            let notificationTitle =  this.label.B2B_Error_Problem_Loading;
            let bodyText =  this.label.B2B_Error_Enter_Amount;
            let label = this.label.B2B_Error_Amount_Exceeds_Limits;
            let limitsResult = '';
            getLimits({
                userData: userdata,
                paymentDraft: paymentdraft
                
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
                        this.showToast(notificationTitle, bodyText, true);
                    }
            })
            .catch((errors) => {
                reject('ERROR: Limits');
                    this.spinner = false;
                    this.showToast(notificationTitle, bodyText, true);
                    console.log('### lwc_b2b_selectAmount ### getLimits() ::: Catch error: ' + errors);
            })
        });
    }
    

    showToast(notificationTitle, bodyText, noReload) {
        var errorToast = this.template.querySelector('[data-id="errorToast"]');
        if (errorToast) {
            errorToast.openToast(false, false, notificationTitle, bodyText, 'Error', 'warning', 'warning', noReload);
        }
    }

    checkBalance () {
        return new Promise( (resolve, reject) => {
            let label = this.label.B2B_Error_Amount_Exceeds_Balance;
            let paymentdraft = this.paymentdraft;
            let availablebalance = paymentdraft.sourceAccount.amountAvailableBalance;
            let requestedamount = paymentdraft.amountSend;
            if (availablebalance) {
                if (availablebalance < requestedamount) {
                    let error = this.errorMSG;
                    if (!error.includes(label)) {
                        if (error) {
                            this.errorMSG = error + '-' + label;
                        } else {
                            this.errorMSG = label;
                        }
                    }
                }
            }
            resolve('ok');
        });
    }

    showInformation () { 
        return new Promise( (resolve, reject) => {
            let data =this.data;
            let paymentdraft = this.paymentdraft;
            let sourceAccount = paymentdraft.sourceAccountData;
            let destinationAccount = paymentdraft.destinationAccount;
            let CMP_amountSend = this.template.querySelector('[data-id="sourceAmountInput"]');
            if(CMP_amountSend){
                CMP_amountSend.setInputAmount('sourceAmountInput', data.amountSend);
                
            }
            if(sourceAccount && destinationAccount){
                if(sourceAccount.currencyCodeAvailableBalance && destinationAccount.currencyCodeAvailableBalance){
                    if(sourceAccount.currencyCodeAvailableBalance != destinationAccount.currencyCodeAvailableBalance){
                        let CMP_amountReceive = this.template.querySelector('[data-id="recipientAmountInput"]');  
                        if(CMP_amountReceive){               
                            CMP_amountReceive.setInputAmount('recipientAmountInput', data.amountReceive);
                        }
                    }
                }                
            }
            resolve('OK');
        });
    }

    formatUpdatedDate () {
        var sourceAccountData =this.sourceaccountdata;
        var recipientAccountData =this.recipientaccountdata;

        if(sourceAccountData && recipientAccountData){
            if(sourceAccountData.lastUpdateAvailableBalance){
                console.log('Hora origen: ' + sourceAccountData.lastUpdateAvailableBalance);
                //var issueTimeSource = $A.localizationService.formatTime(sourceAccountData.lastUpdateAvailableBalance, 'HH:mm');
                //this.timesourcebalance = issueTimeSource;  
            }
            if(recipientAccountData.lastUpdateAvailableBalance){
                console.log('Hora origen: ' + recipientAccountData.lastUpdateAvailableBalance);
                //var issueTimeRecipient = $A.localizationService.formatTime(recipientAccountData.lastUpdateAvailableBalance, 'HH:mm');
                //this.timerecipientbalance = issueTimeRecipient;  
            }
        }
     
    }
    processPaymentTransferFees() {
        return new Promise( (resolve, reject) => {
            let paymentdraft = this.paymentdraft;
            
            processPaymentTransferFees({
                paymentDraft : paymentdraft
            })
            .then( (result) => {
                var stateRV = result;
                if (stateRV.success) {
                        if (stateRV.value) {
                            this.paymentdraft = stateRV.value.output;
                        }
                        resolve('OK');
                    } else {
                        let notificationTitle = this.label.B2B_Error_Problem_Loading;
                        let bodyText = stateRV.msg;
                        this.showToast(notificationTitle, bodyText, true);
                        reject(stateRV.msg);
                    }
                } 
                
            )
            .catch( (errors) => {
                this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }else {
                    console.log('problem updating step 3 payment details');
                }
                this.showToast(this.label.B2B_Error_Problem_Loading, this.B2B_Error_Check_Connection,true);
                reject(this.label.ERROR_NOT_RETRIEVED);
            })
            
        });
    }

    paymentDetailsContinue () { //cuando se pone event, component o helper?
        return new Promise( (resolve, reject) => {
        let paymentdraft = this.paymentdraft;
        let step3field =  this.step3field; 
        let reference =  !this.paymentdraft.reference ? '' : this.paymentdraft.reference;
        let purpose =  !paymentdraft.purpose  ? '' : paymentdraft.purpose;
        let charge =  !(paymentdraft.chargeBearer)  ? '' : paymentdraft.chargeBearer;
        let paymentReason = !(paymentdraft.reason)  ? '' : paymentdraft.reason;
        let clientReference = '' ;
        let comercialCode = paymentdraft.comercialCode;
        let referenceMandatory = step3field.referenceMandatory;
        let purposeMandatory = step3field.purpose;
        let chargeMandatory = step3field.chargesMandatory;
        let comercialCodeMandatory = step3field.commercialCodeMandatory;
        let paymentReasonMandatory = step3field.paymentReasonMandatory
        let clientreferenceMandatory = step3field.clientReferenceMandatory;
        let description =  !(paymentdraft.description)  ? '' : paymentdraft.description;
        var sourceAccountData = paymentdraft.sourceAccount;
        let maxCharacters = 140;
        let transfertype = !(this.transfertype) ? '' : this.transfertype;
        let PTT_international_transfer_single = this.label.PTT_international_transfer_single;
        //Borrar despues de la prueba
        this.disabledcontinue = false;
        let errorMSG = '';
        let msgLabel = '';
        if (!reference) {
                msgLabel = this.label.B2B_Error_Enter_Input;
                let paramRef = this.label.B2B_Reference;
                msgLabel = msgLabel.replace('{0}', paramRef);
                this.errorref = msgLabel;
                // reject('KO');
            }
        if (sourceAccountData.mandatoryPurpose == true && (!purpose)) {
                msgLabel = this.label.B2B_Error_Enter_Input;
                let paramPurpose = this.label.c.B2B_paymentPurpose;
                msgLabel = msgLabel.replace('{0}', paramPurpose);
                this.errorpurpose = msgLabel;
                reject('KO');
            }
            if(comercialCodeMandatory == true && (!comercialCode)){
                //ToDo
                msgLabel = this.label.B2B_Error_Enter_Input;
                let paramPurpose = this.label.B2B_PaymentPurpose;
                msgLabel = msgLabel.replace('{0}', paramPurpose);
            // component.set('v.errorPurpose', msgLabel);
            reject('KO');
            }
            if(chargeMandatory == true && (!charge)){
                //ToDo
                msgLabel = this.label.B2B_Error_Enter_Input;
                let paramChanges = this.Label.c.B2B_PaymentPurpose;
                msgLabel = msgLabel.replace('{0}', paramChanges);
                this.errorcharges = msgLabel;
                reject('KO');
            }
            if(paymentReasonMandatory == true && (!paymentReason)){
                //ToDo
                msgLabel = this.label.B2B_Error_Enter_Input;
                let paramPaymentReason = this.label.c.B2B_PaymentPurpose;
                msgLabel = msgLabel.replace('{0}', paramPaymentReason);
                this.errorpaymentreason = msgLabel;
                reject('KO');
            }
            if(comercialCodeMandatory == true && (!comercialCode)){
                //ToDo
                msgLabel = this.label.B2B_Error_Enter_Input;
                let paramPaymentReason = this.label.B2B_PaymentPurpose;
                msgLabel = msgLabel.replace('{0}', paramPaymentReason);
                //component.set('v.errorPaymentReason', msgLabel);
                reject('KO');
            }
            if((!paymentdraft.amountSend) || paymentdraft.amountSend == 0){
                errorMSG = this.label.B2B_Error_Enter_Input;
                var msg_parameter = this.label.B2B_Amount_Input_Placeholder;
                errorMSG = errorMSG.replace('{0}', msg_parameter);
                this.errorMSG = errorMSG; 
                reject('KO');
            }
            if(transfertype != PTT_international_transfer_single && description.length > maxCharacters){
                reject('KO');
            }
            if (this.disabledcontinue == true) {
                var notificationTitle =  this.label.B2B_Error_Problem_Loading;
                var bodyText =  this.Label.c.B2B_Error_Enter_Amount;
                this.showToast(notificationTitle, bodyText, true);
                reject('KO');
            }
            resolve('OK');
            
        
        /*if ($A.util.isEmpty(reference) || (
            (purposeMandatory == true && $A.util.isEmpty(purpose)) || 
            (chargeMandatory == true && $A.util.isEmpty(charge)) || 
            (comercialCodeMandatory == true && $A.util.isEmpty(comercialCode)) ||
            (paymentReasonMandatory == true && $A.util.isEmpty(paymentReason)) || 
            (clientreferenceMandatory == true && $A.util.isEmpty(clientReference)) || 
            ($A.util.isEmpty(paymentDraft.amountSend) || paymentDraft.amountSend == 0)) && 
            transferType != PTT_international_transfer_single || description.length > maxCharacters) {
            
        
            
            reject('KO');
        } else if (component.get("v.disabledContinue") == true) {
            var notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
            var bodyText =  $A.get('$Label.c.B2B_Error_Enter_Amount');
            this.showToast(notificationTitle, bodyText, true);
            reject('KO');
        }else{
            resolve('OK');
        }*/
    });
        /*else {
            component.set('v.spinner', true);
            this.getLimits(event).then( (value) => { 
                return this.updatePaymentDetails(;
            }).then( (value) => { 
                return this.checkFCCDowJones();
            }).then( (value) => { 
                return this.getPaymentSignatureStructure();
            }).then( (value) => { 
            return this.postFraud(event);
            }).then( (value) => {
                return this.completeStep();
            }).catch( (value) => {
                if ((value.FCCError) && value.FCCError == true) {
                    this.handleFCCError();
                }
                console.log(value.message);
            }).finally( ( {
                this.spinner = false);
            });
        }*/
    }
//SNJ_DEPRECATED
/*
 postFraud(event) {
    return new Promise( (resolve, reject) => {
        try {
            var userData = this.userdata;
            var navigatorInfo = this.navigatorInfo;
            var paymentDraft = this.paymentdraft;
            postFraud({
                userData : userData,
                navigatorInfo : navigatorInfo,
                paymentDraft :paymentDraft
            })
            .then( (result) => {
                if (result.success) {
                    resolve('ok');
                }else{
                    reject('ko');
                }
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    console.log('Unknown error');
                }
                reject('ko');
            })
        } catch(e) {
            console.error(e);
            console.error('e.name => ' + e.name);
            console.error('e.message => ' + e.message);
            console.error('e.stack => ' + e.stack);
            reject('ko');
        }
    }, this);
}
 getPaymentSignatureStructure() {
    return new Promise( (resolve, reject) => {
        var paymentdraft = this.paymentdraft;
        getSignatureStructure({
            'channel': 'WEB',
            'navigatorInfo' : this.navigatorinfo,
            'paymentDraft': paymentdraft
        })
         .then( (result) => {
            if (result.success) {
                    resolve('OK');
                } else {
                    reject({
                        'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                    });
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.Label.c.Problem_Signature_Structure, true);
                }
        })
        .catch( (errors) => {
               if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.Label.c.Problem_Signature_Structure, true);
                }
                reject({
                    'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                });
            })

    }), this);
},
*/

    updatePaymentDetails () {
        return new Promise( (resolve, reject) => {
            let clientReference = null;
            let purpose = null;
            let description = null;
            let paymentId =  null;
            let chargeBearer = null;
            let paymentMethod = null;
            let comercialCode = null;
            let baseAmount = null;
            let baseCurrency = null;
            let processDate = null;
            let paymentdraft = {...this.paymentdraft};
            if ((paymentdraft)) {
                if (paymentdraft.reference) {
                    clientReference = paymentdraft.reference;
                }
                if (paymentdraft.purpose) {
                    purpose = paymentdraft.purpose;
                }
                if (paymentdraft.description) {
                    description = paymentdraft.description;
                }
                if (paymentdraft.comercialCode) {
                    comercialCode = paymentdraft.comercialCode;
                }
                if (paymentdraft.baseAmount) {
                    baseAmount = paymentdraft.baseAmount;
                }
                if (paymentdraft.baseCurrency) {
                    baseCurrency = paymentdraft.baseCurrency;
                }
                if (paymentdraft.paymentId) {
                    paymentId = paymentdraft.paymentId;
                }
                chargeBearer = 'OUR';
                paymentMethod = 'book_to_book';
            }
            paymentdraft.chargeBearer = chargeBearer; // Siempre 'OUR' para Book To Book. Posibles valores 'OUR'-nuestro, 'SHA'-compartido, 'BEN'-recipiente
            paymentdraft.paymentMethod = paymentMethod; // Pendiente de confirmación del valor, es el método seleccionado por el usuario en las tarjetas en este paso
            this.paymentdraft = paymentdraft;
            updatePaymentInformation({
                paymentId: paymentId,
                clientReference : clientReference,
                purpose : purpose,
                description : description,
                chargeBearer : chargeBearer,
                paymentMethod : paymentMethod,
                commercialCode : comercialCode,
                baseAmount : baseAmount,
                baseCurrency  : baseCurrency
            })
            .then((result) => {
                var stateRV = result;
                    if (stateRV.success) {
                        resolve('OK');
                    } else {
                        reject({
                            message: stateRV.msg
                        });
                    
                        this.showToast(this.label.B2B_Error_Problem_Loading, this.Label.c.B2B_Error_Updating_Data, true);
                    }})
            .catch((errors) => {
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
        });
    }

    checkFCCDowJones() {
        return new Promise( (resolve, reject) => {
            var paymentdraft = this.paymentdraft;
            checkFCCDowJones({
                paymentDraft: paymentdraft
            })
            .then( (result) => {
            
            if (result.success) {
                var stateRV = result;
                if (stateRV.success) {
                    if ((stateRV.value.passValidation) && stateRV.value.passValidation == true) {
                        resolve('OK');
                    } else {
                        reject({
                            FCCError: true,
                            message: stateRV.msg
                        });
                    }
                } else {
                    reject({
                        message: stateRV.msg
                    });
                    this.showToast(this.label.B2B_Error_Problem_Loading , this.label.B2B_Error_Updating_Data, true);
                }
            } 
            })
            .catch( (errors) => {
                reject({
                    message: this.label.ERROR_NOT_RETRIEVED
                });
                this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
            })
        
            });
    }
            
    handleFCCError () {
        var url = 'c__FFCError=true';
        this.encrypt( url)
        .then( (result) => {
            let navService = this.template.queryselector('[data-id="navService"]');
            let pageReference = {
                type: 'comm__namedPage',
                attributes: {
                    pageName: 'landing-payments'
                },
                state: {
                    params: result
                }
            }
            navService.navigate(pageReference);
        });
    }   
        

    ServicePaymentLine () {
        return new Promise( (resolve, reject) => {
           let paymentDraft = {...this.paymentdraft};
           let transfertype = this.transfertype;
           getPaymentLine({
               paymentDraft: paymentDraft,
               transferType: transfertype
           })
           .then((result) => {
               if (result.success) {
                   var stateRV = result;
                   if (stateRV.success) {                        
                        paymentDraft.serviceId = stateRV.value.serviceId;
                        paymentDraft.productId = stateRV.value.productId;
                        this.paymentdraft = paymentDraft;
                       
                       resolve('OK');
                   } else {
                       reject(stateRV.msg);
                       this.showToast(component, notificationTitle, bodyText, true);
                   }
               } else {
                   reject('ERROR: FX');
                   this.showToast('error', notificationTitle, bodyText, true);
               }
           });
          
       });
   }

    initComponentHelper() {
        return new Promise( (resolve, reject) => {
            var steps = {...this.steps};
            steps.lastModifiedStep = 3;
            this.steps = steps;
            let paymentdraft = this.paymentdraft;
            if((paymentdraft) && paymentdraft.sourceAccount != null && paymentdraft.destinationAccount != null && (paymentdraft.sourceCurrencyDominant) && (paymentdraft.exchangeRate)){
                if((paymentdraft.sourceAccount.currencyCodeAvailableBalance) && (paymentdraft.paymentCurrency)){
                    if (paymentdraft.sourceAccount.currencyCodeAvailableBalance != paymentdraft.paymentCurrency) {
                        this.showbothamountinput =true;
                    } else {
                        this.showbothamountinput = false;
                    }
                    let ratecurrencies = '';
                    if(paymentdraft.sourceCurrencyDominant == true){
                        ratecurrencies = paymentdraft.sourceAccount.currencyCodeAvailableBalance + '/' + paymentdraft.paymentCurrency;
                    }else{
                        ratecurrencies = paymentdraft.paymentCurrency + '/' + paymentdraft.sourceAccount.currencyCodeAvailableBalance;
                    }
                    this.ratecurrencies = ratecurrencies;
                    this.exchangeratetoshow = paymentdraft.exchangeRate; 
                    
                }
            }            
            resolve('OK');
        });
    }

    getPaymentDetails () {
        return new Promise( (resolve, reject) => {
            resolve('OK');

        });
    }

    showHideComponents() {
        return new Promise( (resolve, reject) => {
            try {
                var paymentdraft = this.paymentdraft;
                var productId;
                var RecipientAccountData;
                if((paymentdraft.productId)){
                    productId = paymentdraft.productId;
                }
                
                if((paymentdraft.destinationAccount)){
                    RecipientAccountData = paymentdraft.destinationAccount;
                }
                showHideComponents({
                    productId: productId,
                    recipientAccountData: RecipientAccountData
                })
                .then( (result) => {
                    var stateRV = result;
                    if (stateRV.success) {                        
                        this.step3field = stateRV.value.output;
                        if(stateRV.value.paymentPurposeValues != null){
                            let purposeList = [];
                            for (let i = 0; i < stateRV.value.paymentPurposeValues.length; i++) {
                                let purpose = stateRV.value.paymentPurposeValues[i];
                                purposeList.push({
                                    label: purpose,
                                    value: purpose
                                })
                            }
                            //this.createListfunction(purposeList,stateRV.value.paymentPurposeValues)
                            this.paymentpurpose = purposeList;
                        }
                        if(stateRV.value.chargesValues){
                            let chargesList = [];
                            for (let i = 0; i < stateRV.value.chargesValues.length; i++) {
                                let charges = stateRV.value.chargesValues[i];
                                chargesList.push({
                                    label: charges,
                                    value: charges
                                })
                            this.charges = chargesList;
                            }
                        }
                        resolve('ok');
                    } else {
                        reject('ko');                        
                    }            
                })
                .catch( (errors) => {
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                        }
                    } 
                    reject('ko');
                })
            } catch(e) {
                console.error(e);
                console.error('e.name => ' + e.name );
                console.error('e.message => ' + e.message );
                console.error('e.stack => ' + e.stack );
                reject('ko');
            }
        });
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

    handleContinue(){
        const handlecontinueevent = new CustomEvent('handlecontinue');
        this.dispatchEvent(handlecontinueevent);
    }
}