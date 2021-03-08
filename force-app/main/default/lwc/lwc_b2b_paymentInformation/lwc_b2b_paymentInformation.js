import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import CMP_B2B_PaymentInformation from '@salesforce/label/c.CMP_B2B_PaymentInformation';
import transferMethod from '@salesforce/label/c.transferMethod';
import Standard from '@salesforce/label/c.Standard';
import BookTobook from '@salesforce/label/c.BookTobook';
import Immediate from '@salesforce/label/c.Immediate';
import CMP_B2B_PaymentInformation_TransferBetween from '@salesforce/label/c.CMP_B2B_PaymentInformation_TransferBetween';
import estimatedFee from '@salesforce/label/c.estimatedFee';
import paymentInformation from '@salesforce/label/c.paymentInformation';
import B2B_Error_Enter_Input from '@salesforce/label/c.B2B_Error_Enter_Input';
import B2B_Reference from '@salesforce/label/c.B2B_Reference';
import B2B_PaymentPurpose from '@salesforce/label/c.B2B_PaymentPurpose';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import Problem_Signature_Structure from '@salesforce/label/c.Problem_Signature_Structure';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';
import B2B_Error_Updating_Data from '@salesforce/label/c.B2B_Error_Updating_Data';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import PAY_Error_Amount_Exceeds_Limits from '@salesforce/label/c.PAY_Error_Amount_Exceeds_Limits';

//Import apex
import getSignatureStructure from '@salesforce/apex/CNT_B2B_PaymentInformation.getSignatureStructure';
import updatePaymentInformation from '@salesforce/apex/CNT_B2B_PaymentInformation.updatePaymentInformation';
import checkFCCDowJones from '@salesforce/apex/CNT_B2B_PaymentInformation.checkFCCDowJones';
import encryptData from '@salesforce/apex/CNT_B2B_PaymentInformation.encryptData';
import updateStatus from '@salesforce/apex/CNT_B2B_PaymentInformation.updateStatus';
import getLimits from '@salesforce/apex/CNT_B2B_PaymentInformation.getLimits';

export default class lwc_b2b_paymentInformation extends NavigationMixin(LightningElement){

    label = {
        CMP_B2B_PaymentInformation,
        transferMethod,
        Standard,
        BookTobook,
        Immediate,
        CMP_B2B_PaymentInformation_TransferBetween,
        estimatedFee,
        paymentInformation,
        B2B_Error_Enter_Input,
        B2B_Reference,
        B2B_PaymentPurpose,
        B2B_Error_Problem_Loading,
        Problem_Signature_Structure,
        ERROR_NOT_RETRIEVED,
        B2B_Error_Updating_Data,
        B2B_Error_Check_Connection,
        PAY_Error_Amount_Exceeds_Limits,
    }

    @api userdata = {};//User data
    @api accountdata = {}; //Account data
    @api sourceaccountdata = {}; //Data of origin account step
    @api recipientaccountdata = {}; //Data of destination account step
    @api amountchangedata = {};//Data of amount step
    @api handlecontinue;
    @api isediting //Indicates if the user is editing an existing payment so field should not be reset on initialisation
    @api paymentid //ID of the current payment
    @api signlevel = {};
    @api mydata = {};
    @api steps //Data of the steps

    @track isModified = true; //Default true.Indicates if the input data has been modified
    @track reference = ''; //User input text" /> 
    @track fee = ''; //Estimated fee for the transaction
    @track errorRef = ''; 
    @track errorPurpose = ''; 
    @track spinner = false;
    @track step
    @track showDropdown = false;

    

    get isStepNumberFour(){
        var res = null;
        if(this.steps && this.steps.lastModifiedStep == 4){
            res = true;
        }
        return res;
    }

    get isNotEmptyConvertedTransaciontFee(){
        var res = null;
        if(this.amountchangedata && this.amountchangedata.convertedTransactionFee){
            res = true;
        }
        return res;
    }

    get isNotEmptyTransaciontFee(){
        var res = null;
        if(this.amountchangedata){
            res = true;
        }        
        return res;
    }

    get isAccountDataFromChile(){
        var res = null;
        if(this.sourceaccountdata && this.sourceaccountdata.country == 'CL'){
            res =  true;
        }
        return res;
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    }


    initComponent() {
        var steps = {}//this.steps; TEST
        steps.lastModifiedStep = 4;
        this.steps = steps;
    }

    handleCheckContinue(event) {
        let reference = this.mydata.reference;
        let purpose = this.mydata.purpose;
        let description = this.mydata.description;
        let maxCharacters = 140;
        var sourceAccountData = this.sourceaccountdata;

        if (reference.length > 0 || (sourceAccountData.mandatoryPurpose == true && (purpose.length==0 || purpose==undefined || purpose==null))  || description.length > maxCharacters) {
            let msgRef = "";
            let msgPurpose = "";
            if (reference.length > 0) {
                msgRef =this.label.B2B_Error_Enter_Input;
                let paramRef = this.label.B2B_Reference;
                msgRef = msgRef.replace('{0}', paramRef); 
            }
            if (sourceAccountData.mandatoryPurpose == true && (purpose.length==0 || purpose==undefined || purpose==null)) {
                msgPurpose =this.label.B2B_Error_Enter_Input;
                let paramPurpose = this.label.B2B_PaymentPurpose;
                msgPurpose = msgPurpose.replace('{0}', paramPurpose);
            }
            this.errorRef = msgRef;
            this.errorPurpose = msgPurpose;    
        } else {
            this.spinner = true;
            this.getLimits(event).then( (value) => { 
                return this.updatePaymentDetails();
            }).then( (value) => { 
                return this.checkFCCDowJones();
            }).then( (value) => { 
                return this.getPaymentSignatureStructure();
            }).then( (value) => { 
                return this.updateStatus('002', '001');
            }).then( (value) => {
                return this.completeStep();
            }).catch( (error) => {
                if (error.FCCError && error.FCCError == true) {
                    this.handleFCCError();
                }
                console.log(error.message);
            }).finally(() => {
                this.spinner = false;
            });
        }
    }

    handleDropdowns(event) {
        //var eventName = event.getParam('name');
        var eventName = event.currentTarget.name;
        //var eventDropdown = event.getParam('showDropdown');
        var eventDropdown = event.currentTarget.showdropdown;
        if (eventDropdown) {
            let dropdown = this.template.querySelector('c-lwc_b2b_purpose');
             for (let i = 0; i < dropdown.length; i++) {
                if (dropdown[i].get('name') == eventName) { //GAA
                    dropdown[i].set('showDropdown', true);
                } else {
                    dropdown[i].set('showDropdown', false);
                }
            }
        }
    }

    handleModified(event) {
        let isModified = this.isModified;
        let steps = this.steps;
        if (isModified) {
            steps.lastModifiedStep = 4;
            steps.focusStep = 4;
            steps.shownStep = 4;
        }
        this.steps = steps;
    }
    
    completeStep() {
        const completeStep = new CustomEvent('completeStep', {
            confirm : true
        })
        this.dispatchEvent(completeStep);
        this.isModified = false;
    }

    showToast(title, body, noReload) {
        var errorToast = this.template.querySelector("c-lwc_b2b_toast");
        if (errorToast) {
            errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
        }
    }
    
    
    showWarningToast(title, body, noReload) {
        var errorToast = this.template.querySelector("c-lwc_b2b_toast");
        if (errorToast) {
            errorToast.openToast(false, false, title,  body, 'Warning', 'warning', 'warning', noReload);
        }
    }

    getPaymentSignatureStructure() {
        return new Promise( (resolve, reject) => {
            var user = this.userdata;
            var amount = this.amountchangedata;
            var sourceAccount = this.sourceaccountdata;
            //26/10/2020 - Shahad Naji - ServiceAPILine 
            var isNexus = user.cashNexus || user.multiOneTrade;
            getSignatureStructure({ 
                'isNexus': isNexus,
                'paymentID': this.paymentid,
                'service_id': 'add_international_payment_internal',
                'tcurrency': sourceAccount.currencyCodeAvailableBalance,
                'customerId': sourceAccount.codigoCorporate,
                'channel': 'WEB',
                'amount': amount.amountSend
            })
            .then( (result) => {
                if (result) {
                    resolve('OK'); 
                } else {
                    reject({
                        'message': this.label.ERROR_NOT_RETRIEVED
                    });
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.Problem_Signature_Structure, true);
                }
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.Problem_Signature_Structure, true);
                }
                reject({
                    'message': this.label.ERROR_NOT_RETRIEVED
                });
            })          
        }, this);   
    }
    
    updatePaymentDetails() {
        return new Promise( (resolve, reject) => {
            var clientReference = null;
            var purpose = null;
            var description = null;
            var paymentId =  null;
            var chargeBearer = null;
            var paymentMethod = null; 
            var comercialCode = null;
            var data = this.mydata;
            if (data) {
                if (data.reference) {
                    clientReference = data.reference;
                }
                if (data.purpose) {
                    purpose = data.purpose;
                }
                if (data.description) {
                    description = data.description;
                }
                if (data.comercialCode) {
                    comercialCode = data.comercialCode;
                }
            }
            let tPaymentId = this.paymentid;
            if (tPaymentId) {
                paymentId = tPaymentId;
            }
            chargeBearer = 'OUR'; // Siempre 'OUR' para Book To Book. Posibles valores 'OUR'-nuestro, 'SHA'-compartido, 'BEN'-recipiente
            paymentMethod = 'book_to_book'; // Pendiente de confirmación del valor, es el método seleccionado por el usuario en las tarjetas en este paso
            updatePaymentInformation({
                'paymentId': paymentId,
                'clientReference': clientReference,
                'purpose': purpose,
                'description': description,
                'chargeBearer': chargeBearer,
                'paymentMethod': paymentMethod,
                'commercialCode': comercialCode
            })
            .then( (result) => {
                if (result.success) {
                    resolve('OK');
                } else {
                    reject({
                        'message': result.msg
                    });
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Updating_Data, true);
                }
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    console.log('problem updating payment details.');
                }
                reject({
                    'message': this.label.ERROR_NOT_RETRIEVED
                });
                this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
            })
        }, this);
    }
    
    checkFCCDowJones() {
        return new Promise( (resolve, reject) => {
            var description = null;
            var data = this.mydata;
            if (data) {
                if (data.description) {
                    description = data.description;
                }
            }
            let paymentId = this.paymentid;
            checkFCCDowJones({
                'paymentId': paymentId,
                'description': description
            })
            .then( (result) => {
                if (result.success) {
                    if (result.value.passValidation && result.value.passValidation == true) {
                        resolve('OK');
                    } else {
                        reject({
                            'FCCError': true,
                            'message': stateRV.msg
                        });
                    }
                } else {
                    reject({
                        'message': stateRV.msg
                    });
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Updating_Data, true);
                }
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                reject({
                    'message': this.label.ERROR_NOT_RETRIEVED
                });
                this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
            })
        }, this);
    }

    handleFCCError() {
        var url = 'c__FFCError=true';
        this.encrypt(url)
        .then( (result) => {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage', 
                attributes: {
                    pageName: 'landing-payments'
                }, 
                state: {
                    params : result
                }
            });
        });
    }
    
    encrypt(data) {
        return new Promise( (resolve, reject) => {
            var result = null;
            encryptData({
                'str': data
            })
            .then( (value) => {
                result = value;
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                        reject(response.getError()[0]);
                    }
                } else {
                    console.log('Unknown error');
                }
            })
            resolve(result); 
        });
    }
        
    updateStatus(status, reason) {
        return new Promise( (resolve, reject) => {
            let paymentId = this.paymentid;
            updateStatus({
                'paymentId': paymentId,
                'status': status,
                'reason': reason
            })
            .then( (value) => {
                if (value == 'OK') {
                    resolve('OK');
                } else {
                    reject({
                        'message': this.label.ERROR_NOT_RETRIEVED
                    });
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false);
                }
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false);
                }
                reject({
                    'message': this.label.ERROR_NOT_RETRIEVED
                });
            })
        }, this);   
    }
        
    getLimits(event) {
        return new Promise( (resolve, reject) => {
            var paymentId = this.paymentid;            
            var data = this.amountchangedata;            
            var userData = this.userdata;            
            var accountData = this.accountdata;            
            var sourceAccountData = this.sourceaccountdata;
            var recipientAccountData = this.recipientaccountdata;
            var notificationTitle =  this.label.B2B_Error_Problem_Loading;
            var bodyText =  this.label.B2B_Error_Check_Connection;
            var label = this.label.PAY_Error_Amount_Exceeds_Limits;
            var limitsResult = '';
            getLimits({
                'paymentId': paymentId,
                'paymentData': data,
                'userData': userData,
                'accountData': accountData,
                'sourceAccountData': sourceAccountData,
                'recipientaccountdata': recipientaccountdata
            })
            .then( (value) => {
                if (value.success) {
                    if (value.value.limitsResult && (value.value.errorMessage.length==0 || value.value.errorMessage==undefined || value.value.errorMessage==null)) {
                        limitsResult = value.value.limitsResult;
                        resolve('OK');
                    }       
                    if (limitsResult.toLowerCase().localeCompare('ko') == 0 || value.value.errorMessage) {
                        this.showWarningToast(notificationTitle, label, true);
                        reject('KO');                          
                    }
                } else {
                    this.showToast(notificationTitle, bodyText, false);
                    reject(value.msg);
                    
                }
            })
            .catch( (errors) => {
                this.showToast(notificationTitle, bodyText, false);
                reject('ERROR: Limits ' + errors);
            })
        }, this);
    }    
}