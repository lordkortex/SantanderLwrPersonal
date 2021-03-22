import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import charges from '@salesforce/label/c.charges';
import Show_More from '@salesforce/label/c.Show_More';
import PAY_PaymentSummary_details from '@salesforce/label/c.PAY_PaymentSummary_details';
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
import PTT_international_transfer_single from '@salesforce/label/c.PTT_international_transfer_single';

//Import apex
//import getSignatureStructure from '@salesforce/apex/CNT_B2B_PaymentInformation.getSignatureStructure'; COMENTADO EN LA CLASE APEX DE INTEGRA
import updatePaymentInformation from '@salesforce/apex/CNT_B2B_PaymentInformation.updatePaymentInformation';
import checkFCCDowJones from '@salesforce/apex/CNT_B2B_PaymentInformation.checkFCCDowJones';
import encryptData from '@salesforce/apex/CNT_B2B_PaymentInformation.encryptData';
import updateStatus from '@salesforce/apex/CNT_B2B_PaymentInformation.updateStatus';
import getLimits from '@salesforce/apex/CNT_B2B_PaymentInformation.getLimits';
import postFraud from '@salesforce/apex/CNT_B2B_PaymentInformation.postFraud';
//import showHideComponents from '@salesforce/apex/CNT_B2B_PaymentInformation.showHideComponents';
 
export default class Test extends NavigationMixin(LightningElement) {

    label = {
        charges,
        Show_More,
        PAY_PaymentSummary_details,
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
        PTT_international_transfer_single,
    }

    @api paymentdraft = {};
    @api userdata = {};//User data
    @api step3field = {}; //Fields in the payment information
    @api transfertype = '';
    @api steps //Data of the steps
    @api accountdata = {}; //Account data
    @api sourceaccountdata = {}; //Data of origin account step
    @api recipientaccountdata = {}; //Data of destination account step
    @api amountchangedata = {};//Data of amount step
    @api handlecontinue;
    @api isediting //Indicates if the user is editing an existing payment so field should not be reset on initialisation
    @api paymentid //ID of the current payment
    @api signlevel = {};
    @api charges = []; //List of values to populate the charges
    @api navigatorinfo = {};
    @api processdate 
    @api iscalendardisabled = false;
    @api calendarplaceholder = '';
    @api paymentpurpose = [];

    @track isModified = true; //Default true.Indicates if the input data has been modified
    @track reference = ''; //User input text" /> 
    @track fee = ''; //Estimated fee for the transaction
    @track errorRef = ''; 
    @track errorPurpose = '';
    @track errorPaymentReason = ''; 
    @track errorCharges = ''; 
    @track spinner = false;
    @track step
    @track showDropdown = false;
    @track showClientReferenceFistColumn = true;
    @track showClientReferenceSecondColumn = false;
    @track showProcessDate = false;
    @track showPurposeDropdown = true;
    @track showComercialCode = false;

    get isBrasilAccount(){
        var res = null;
        if(this.paymentdraft.destinationAccount.country == 'BR' && this.paymentdraft.paymentCurrency == 'BRL'){
            res = true;
        }
        return res;
    }

    get paymentDraftPurpose(){
        var res = null;
        if(this.paymentdraft.purpose == this.label.PAY_other || (this.paymentdraft.amountsend >= 10000 && this.paymentdraft.purpose != this.label.PAY_purpose72502 && this.paymentdraft.purpose !=  this.label.PAY_purpose67500)){
            res = true;
        }
        return res;
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    }

    initComponent() {
        new Promise( (resolve, reject) => {
            /* var steps = component.get('v.steps');
            steps.lastModifiedStep = 4;
            component.set('v.steps', steps);*/
            this.setValuePaymentDraft();
            resolve('Ok');
        }).then( (value) => {
            return this.setDate();
        /*}).then( (value) => {
            return this.showHideComponents();
        }).then( (value) => {
            return this.getNavigatorInfo();*/
        }).catch( (error) => {
            console.log(error);
        });
    }

    handleCheckContinue(event) {
        let reference = this.paymentdraft.reference;
        let purpose = this.paymentdraft.purpose;
        let description = this.paymentdraft.description;
        var sourceAccountData = this.paymentdraft.sourceAccount;
        let maxCharacters = 140;
        let PTT_international_transfer_single = this.label.PTT_international_transfer_single;
        let transferType = !(this.transfertype) ? '' : this.transfertype;

        if (!reference || (sourceAccountData.mandatoryPurpose == true && !purpose && transferType != PTT_international_transfer_single) || description.length > maxCharacters) {
            let msgRef = "";
            let msgPurpose = "";
            if (!reference) {
                msgRef = this.label.B2B_Error_Enter_Input;
                let paramRef = this.label.B2B_Reference;
                msgRef = msgRef.replace('{0}', paramRef); 
            }
            if (sourceAccountData.mandatoryPurpose == true && !purpose) {
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
               // return this.getPaymentSignatureStructure(); COMENTADO EN LA CLASE APEX DE INTEGRA
            }).then( (value) => { 
                return this.postFraud(event);
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
        var eventName = event.getParam('name');
        var eventDropdown = event.getParam('showDropdown');
        if (eventDropdown) {
            let dropdown = this.template.querySelector('[data-id="dropdown"]');
             for (let i = 0; i < dropdown.length; i++) {
                if (dropdown[i].get('name') == eventName) { //GAA
                    dropdown[i].set('showDropdown', true);
                } else {
                    dropdown[i].set('showDropdown', false);
                }
            }
        }
    }

    handleModified() {
        let isModified = this.isModified;
        let steps = this.steps;
        if (isModified) {
            steps.lastModifiedStep = 4;
            steps.focusStep = 4;
            steps.shownStep = 4;
        }
        this.steps = steps;
    }

    updateFiles(event) {
        let paymentDraft = this.paymentdraft;
        if(event != null && event != undefined){
            if(event.detail.currentFiles != null && event.detail.currentFiles.length>0){
            	paymentDraft.documents = event.detail.currentFiles;
        	}
        }
        this.paymentdraft = paymentDraft;
    }

    completeStep() {
        const completeStep = new CustomEvent('completestep', {
            confirm : true
        })
        this.dispatchEvent(completeStep);
        this.isModified = false;
    }

    showToast(functionTypeText, title, body, noReload) {
        var errorToast = this.template.querySelector('[data-id="dropdown"]');
        if (errorToast) {
            errorToast.openToast(false, false, title,  body, functionTypeText, 'warning', 'warning', noReload);
        }
    }

    getPaymentSignatureStructure() {
        return new Promise( (resolve, reject) => {
            var paymentDraft = this.paymentdraft;
            var navigatorInfo = this.navigatorinfo;
            
            getSignatureStructure({ 
                channel: 'WEB',
                navigatorInfo: navigatorInfo,
                paymentDraft: paymentDraft
            })
            .then( (result) => {
                if (result.success) {
                    resolve('OK'); 
                } else {
                    reject({
                        message: this.label.ERROR_NOT_RETRIEVED
                    });
                    this.showToast('Error', this.label.B2B_Error_Problem_Loading, this.label.Problem_Signature_Structure, true);
                }
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    this.showToast('Error', this.label.B2B_Error_Problem_Loading, this.label.Problem_Signature_Structure, true);
                }
                reject({
                    message: this.label.ERROR_NOT_RETRIEVED
                });
            })          
        }, this);   
    }

    updatePaymentDetails() {
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
            let paymentDraft = this.paymentdraft;
            if (paymentDraft) {
                if (paymentDraft.reference) {
                    clientReference = paymentDraft.reference;
                }
                if (paymentDraft.purpose) {
                    purpose = paymentDraft.purpose;
                }
                if (paymentDraft.description) {
                    description = paymentDraft.description;
                }
                if (paymentDraft.comercialCode) {
                    comercialCode = paymentDraft.comercialCode;
                }
                if (paymentDraft.baseAmount) {
                    baseAmount = paymentDraft.baseAmount;
                }
                if (paymentDraft.baseCurrency) {
                    baseCurrency = paymentDraft.baseCurrency;
                }
                if (paymentDraft.paymentId) {
                    paymentId = paymentDraft.paymentId;
                }
                chargeBearer = 'OUR';
                paymentMethod = 'book_to_book';
            }
            paymentDraft.chargeBearer = chargeBearer; // Siempre 'OUR' para Book To Book. Posibles valores 'OUR'-nuestro, 'SHA'-compartido, 'BEN'-recipiente
            paymentDraft.paymentMethod = paymentMethod; // Pendiente de confirmación del valor, es el método seleccionado por el usuario en las tarjetas en este paso
            this.paymentdraft = paymentDraft;
            
            updatePaymentInformation({
                paymentId: paymentId,
                clientReference: clientReference,
                purpose: purpose,
                description: description,
                chargeBearer: chargeBearer,
                paymentMethod: paymentMethod,
                commercialCode: comercialCode,
                baseAmount: baseAmount,
                baseCurrency: baseCurrency
            })
            .then( (result) => {
                if (result.success) {
                    resolve('OK');
                } else {
                    reject({
                        message: result.msg
                    });
                    this.showToast('Error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Updating_Data, true);
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
                    message: this.label.ERROR_NOT_RETRIEVED
                });
                this.showToast('Error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
            })
        }, this);
    }

    checkFCCDowJones() {
        return new Promise( (resolve, reject) => {
            var paymentDraft = this.paymentdraft;
            checkFCCDowJones({
                paymentDraft: paymentDraft
            })
            .then( (result) => {
                if (result.success) {
                    if (result.value.passValidation && result.value.passValidation == true) {
                        resolve('OK');
                    } else {
                        reject({
                            FCCError: true,
                            message: result.msg
                        });
                    }
                } else {
                    reject({
                        message: result.msg
                    });
                    this.showToast('Error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Updating_Data, true);
                }
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                reject({
                    message: this.label.ERROR_NOT_RETRIEVED
                });
                this.showToast('Error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true);
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
                str: data
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
            let paymentDraft = this.paymentdraft;
            updateStatus({
                paymentId: paymentDraft.paymentId,
                status: status,
                reason: reason
            })
            .then( (value) => {
                if (value == 'OK') {
                    resolve('OK');
                } else {
                    reject({
                        'message': this.label.ERROR_NOT_RETRIEVED
                    });
                    this.showToast('Error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false);
                }
            })
            .catch( (errors) => {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                } else {
                    this.showToast('Error', this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false);
                }
                reject({
                    'message': this.label.ERROR_NOT_RETRIEVED
                });
            })
        }, this);   
    }

    getLimits(event) {
        return new Promise( (resolve, reject) => {
            let userData  = this.userdata;
            let paymentDraft = this.paymentdraft;
            let notificationTitle =  this.label.B2B_Error_Problem_Loading;
            let bodyText =  this.label.B2B_Error_Check_Connection;
            let label = this.label.c.PAY_Error_Amount_Exceeds_Limits;
            let limitsResult = '';
            getLimits({
                userData: userData,
                paymentDraft: paymentDraft
            })
            .then( (value) => {
                if (value.success) {
                    if (value.value.limitsResult && !(value.value.errorMessage)) {
                        let paymentDraft = this.paymentdraft;
                        if (value.value.baseAmount) {
                            paymentDraft.baseAmount = value.value.baseAmount;
                        }
                        if (value.value.baseCurrency) {
                            paymentDraft.baseCurrency = value.value.baseCurrency;
                        }
                        this.paymentdraft = paymentDraft;
                        resolve('OK');
                    } else {
                        this.showToast('Error',notificationTitle, bodyText, false);
                        reject('KO');
                    }      
                    
                    if (limitsResult.toLowerCase().localeCompare('ko') == 0 || value.value.errorMessage) {
                        this.showToast('Warning',notificationTitle, bodyText, true);
                        reject('KO');                          
                    }
                } else {
                    this.showToast('Error',notificationTitle, bodyText, false);
                    reject(value.msg);
                }
            })
            .catch( (errors) => {
                this.showToast('Error',notificationTitle, bodyText, false);
                reject('ERROR: Limits');
            })
        }, this);
    }

    setDate(event) {
        return new Promise( (resolve, reject) => {
            try {
                let transferType = this.transfertype;
                if (transferType) {
                    let PTT_international_transfer_single = this.label.PTT_international_transfer_single;
                    if (transferType == PTT_international_transfer_single) {
                        let today = new Date();
                        this.processdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        this.iscalendardisabled = true;
                        this.calendarplaceholder =  this.label.PAY_ProcessDate;
                        resolve('ok');
                    } else {
                        resolve('ok');
                    }
                } else {
                    resolve('ok');
                }
            } catch (e) {
                console.error(e);
                console.error('e.name => ' + e.name );
                console.error('e.message => ' + e.message );
                console.error('e.stack => ' + e.stack );
                reject('ko');
            }
        }, this);
    }

    //DEPRECATED_MA TO BE DELETED
    /* showHideComponents(event) {
        return new Promise( (resolve, reject) => {
            try {
                let transferType = this.transfertype;
                let paymentDraft = this.paymentdraft;
                let sourceAccount = paymentDraft.sourceAccount;
                if(transferType){
                    let PTT_international_transfer_single = this.label.c.PTT_international_transfer_single;
                    if (transferType == PTT_international_transfer_single) {
                        this.showClientReferenceFistColumn = false;
                        this.showClientReferenceSecondColumn = true;
                        this.showProcessDate = true;
                        this.showPurposeDropdown = false;
                    } else {
                        this.showClientReferenceFistColumn = true;
                        this.showClientReferenceSecondColumn = false;
                        this.showProcessDate = false;
                        this.showPurposeDropdown = true;
                    }
                } else {
                    this.showClientReferenceFistColumn = true;
                    this.showClientReferenceSecondColumn = false;
                    this.showProcessDate = false;
                    this.showPurposeDropdown = true;
                }
                if (sourceAccount) {
                    if (sourceAccount.country) {
                        if (sourceAccount.country == 'PL') {
                            this.showComercialCode = false;
                        } else if(sourceAccount.country == 'CL') {
                            this.showComercialCode = true;
                        } else {
                            this.showComercialCode = false;
                        }
                    } else {
                        this.showComercialCode = false;
                    }
                } else {
                   this.showComercialCode = false;
                }
                resolve('ok');
            } catch(e) {
                console.error(e);
                console.error('e.name => ' + e.name );
                console.error('e.message => ' + e.message );
                console.error('e.stack => ' + e.stack );
                reject('ko');
            }
        }, this);
    }*/

    postFraud(event) {
        return new Promise( (resolve, reject) => {
            try {
                var userData = this.userdata;
                var navigatorInfo = this.navigatorinfo;
                var paymentDraft = this.paymentdraft;

                postFraud({
                    userData: userData,
                    navigatorInfo: navigatorInfo,
                    paymentDraft: paymentDraft
                })
                .then( (value) => {
                    if (value.success) {
                        resolve('OK');
                    } else {
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

    /*showHideComponents() {
        return new Promise( (resolve, reject) => {
            try {
                var paymentDraft = this.paymentdraft;
                var productId;
                var recipientAccountData;
                
                if(paymentDraft.productId){
                    productId = paymentDraft.productId;
                }
                
                if(paymentDraft.destinationAccount){
                    recipientAccountData = paymentDraft.destinationAccount;
                }

                showHideComponents({
                    'productId': productId,
                    'recipientAccountData' : recipientAccountData
                })
                .then( (value) => {
                    if (value.success) {
                        this.step3field = value.value.output;
                        if(value.value.paymentPurposeValues != null){
                            let purposeList = [];
                            for (let i = 0; i < value.value.paymentPurposeValues.length; i++) {
                                let purpose = value.value.paymentPurposeValues[i];
                                purposeList.push({
                                    'label': purpose,
                                    'value': purpose
                                })
                            }
                            //this.createListfunction(purposeList, value.value.paymentPurposeValues)
                            this.paymentpurpose = purposeList;
                        }
                        if(value.value.chargesValues){
                            let chargesList = [];
                            for (let i = 0; i < value.value.chargesValues.length; i++) {
                                let charges = value.value.chargesValues[i];
                                chargesList.push({
                                    'label': charges,
                                    'value': charges
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
        }), this);
    }*/

    createListfunction(list, listValue){
		for (let i = 0; i < listValue.length; i++) {
            let label = listValue[i];
            list.push({
                label: label,
                value: label
            })
        }
    }
    
    setValuePaymentDraft(event){
		let paymentDraft = {...this.paymentdraft};
        paymentDraft.purpose = !(paymentDraft.purpose)  ? '' : paymentDraft.purpose;
    	paymentDraft.reference = !(paymentDraft.reference)  ? '' : paymentDraft.reference;
        paymentDraft.chargeBearer = !(paymentDraft.chargeBearer)  ? '' : paymentDraft.chargeBearer;
        //if(paymentDraft.purpose != '')
		//paymentDraft.purpose = '';
    		//if( paymentDraft.reference != '')
            	//paymentDraft.reference = '';
    		//if( paymentDraft.chargeBearer != '')
            	//paymentDraft.chargeBearer = '';
        this.paymentdraft = paymentDraft;
	}
}