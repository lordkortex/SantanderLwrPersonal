import { LightningElement, api, track } from 'lwc';

//Labels
import Loading from '@salesforce/label/c.Loading';
import PAY_UtilityBar from '@salesforce/label/c.PAY_UtilityBar';
import editPayment from '@salesforce/label/c.editPayment';
import PAY_discardPayment from '@salesforce/label/c.PAY_discardPayment';
import PAY_reusePayment from '@salesforce/label/c.PAY_reusePayment';
import PAY_addToTemplate from '@salesforce/label/c.PAY_addToTemplate';
import Authorize from '@salesforce/label/c.Authorize';
import reject from '@salesforce/label/c.reject';
import PAY_SendToReview from '@salesforce/label/c.PAY_SendToReview';
import PAY_trySaveAgain from '@salesforce/label/c.PAY_trySaveAgain';
import PAY_goToGpiTracker from '@salesforce/label/c.PAY_goToGpiTracker';
import cancel from '@salesforce/label/c.cancel';
import PAY_ClearSelection from '@salesforce/label/c.PAY_ClearSelection';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import B2B_CancelPayment from '@salesforce/label/c.B2B_CancelPayment';
import B2B_CancelPayment_YES from '@salesforce/label/c.B2B_CancelPayment_YES';
import B2B_CancelPayment_NO from '@salesforce/label/c.B2B_CancelPayment_NO';
import PAY_DiscardDate1 from '@salesforce/label/c.PAY_DiscardDate1';
import Int from '@salesforce/label/c.Int';
import PAY_DiscardDate2 from '@salesforce/label/c.PAY_DiscardDate2';
import No from '@salesforce/label/c.No';

//Apex class
import getAccountDataApex from '@salesforce/apex/CNT_PaymentsLandingUtilityBar.getAccountData';
import getPaymentDetail   from '@salesforce/apex/CNT_PaymentsLandingUtilityBar.getPaymentDetail';
import sendToService      from '@salesforce/apex/CNT_PaymentsLandingUtilityBar.sendToService';
import getExchangeRate    from '@salesforce/apex/CNT_PaymentsLandingUtilityBar.getExchangeRate';
import validateAccount    from '@salesforce/apex/CNT_PaymentsLandingUtilityBar.validateAccount';
import getUserData        from '@salesforce/apex/CNT_PaymentsLandingUtilityBar.getUserData';
//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class Lwc_paymentsLandingUtilityBar extends LightningElement {

    label = {
        Loading,
        PAY_UtilityBar,
        editPayment,
        PAY_discardPayment,
        PAY_reusePayment,
        PAY_addToTemplate,
        Authorize,
        reject,
        PAY_SendToReview,
        PAY_trySaveAgain,
        PAY_goToGpiTracker,
        cancel,
        PAY_ClearSelection,
        ERROR_NOT_RETRIEVED,
        B2B_Error_Problem_Loading,
        B2B_Error_Check_Connection,
        B2B_CancelPayment,
        B2B_CancelPayment_YES,
        B2B_CancelPayment_NO,
        PAY_DiscardDate1,
        Int,
        PAY_DiscardDate2,
        No
    }

    showsubmenu = false;    //Controls is the submenu is open or closed
    showredo = false;
    @api paymentdetails = {paymentId: '123245'};    //Payment details of the selected payment
    @api currentuser = {};       //Current user data
    @api actions = {
        "edit" : true,
        "discard" : true,
        "reuse" : true,
        "addToTemplate" : true,
        "authorize" : true,
        "sendToReview" : true,
        "trySaveAgain" : true,
        "gpiTracker" : true,
        "reject" : true,
        "cancel" : true
    };           //Map of booleans to control which buttons are enabled
    @api signatorystatus= {};    //To determine if user is signatory of this payment
    @track reload = false;
    @track userData = {};          //"User data.
    @track accountdata = {};       //Account data.
    @track action = '';
    @track spinner = false;
    @track showCancelModal = false; //Indicates if the cancel payment modal is show.
    @track fromUtilityBar = false;
    @track fromDetail = false;
    @track onwardPage = "landing-payments";
    @track convertToUserTimezone = true;

    get getActionEdit(){
        return this.actions.edit;
    }

    get getActionDiscard(){
        return this.actions.discard;
    }

    get getActionReuse(){
        return this.actions.reuse;
    }

    get getActionaddToTemplate(){
        return this.actions.addToTemplate;
    }

    get getActionAuthorize(){
        return this.actions.authorize;
    }

    get getActionReject(){
        return this.actions.reject;
    }

    get getActionSendToReview(){
        return this.actions.sendToReview;
    }

    get getActiontrySaveAgain(){
        return this.actions.trySaveAgain;
    }

    get getActiongpiTracker(){
        return this.actions.gpiTracker;
    }

    get getActiontryCancel(){
        return this.actions.cancel;
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        console.log('connectdCallback');
        this.doInit();
    }

    doInit () {
        this.getAccountData()
        .then((value) =>{
            this.getUserData();
        }).catch((error) =>{
            console.log('Error doInit: ' + error);
        });
    }

    getAccountData () {
        return new Promise( function(resolve, reject) {
            getAccountDataApex()
            .then((value) => {
                var accountData = {};
                //var stateRV = actionResult.getReturnValue();
                var stateRV = value;
                if (stateRV.success) {
                    //(!$A.util.isEmpty(stateRV.value.cib)) {
                    if (stateRV.value.cib != null && stateRV.value.cib != undefined) {
                        accountData.CIB = stateRV.value.cib;
                    } else {
                        accountData.CIB = false;
                    }
                    if (stateRV.value.documentType != '' && stateRV.value.documentType != null && stateRV.value.documentType != undefined) {
                        accountData.documentType = stateRV.value.documentType;
                    } else { // FLOWERPOWER_PARCHE_MINIGO
                        accountData.documentType = 'tax_id';
                    }
                    if (stateRV.value.documentNumber != '' && stateRV.value.documentNumber != null && stateRV.value.documentNumber != undefined) {
                        accountData.documentNumber = stateRV.value.documentNumber;
                    } else { // FLOWERPOWER_PARCHE_MINIGO
                        accountData.documentNumber = 'B86561412';
                    }
                }
                this.accountData = accountData;
                resolve('La ejecucion ha sido correcta.');
            })
            .catch((error) => {
                console.log('### lwc_paymentsLandingUtilityBar ### getAccountData() ::: Catched Error: ' + JSON.stringify(error));
                reject(this.label.ERROR_NOT_RETRIEVED);
            });
        }.bind(this));  
    }

    showSubmenu () {
        let isOpen = this.showsubmenu;
        if (isOpen == true) {
            this.showsubmenu = false;
        } else {
            this.showsubmenu = true;
        }
    }

    closeSubmenu () {        
        this.showsubmenu = false;
    }

    clearSelection () {   
        // var clearSelectionEvent = component.getEvent('clearSelection');
        // clearSelectionEvent.fire();
        const clearselectionevent = new CustomEvent('clearSelection');
        this.dispatchEvent(clearselectionevent);
    }

    goToRedo () {
        this.showredo = true;
    }

    edit () {
        this.spinner = true;
        var promise_aux = new Promise((resolve) => {
            resolve('OK');
        });

        this.getPaymentDetails()
        .then((value) => { 
            return this.updateStatusEditPayment();
        }).then((value) => {
            let paymentObj = this.paymentdetails;
            //if(!$A.util.isEmpty(paymentObj)){
            if(paymentObj != undefined){
                let paymentId = paymentObj.productId;
                //if(!$A.util.isEmpty(paymentId)){
                if(paymentId != undefined){
                    if(paymentId == 'international_instant_payment'){
                        return this.reverseLimits(); 
                    }else{
                        return promise_aux;
                    }                    
                }
            }
        }).then((value) => { 
            return this.goToEditPayment();
        }).catch((error) => {
            console.log('### lwc_paymentsLandingUtilityBar ### edit() ::: Catched Error: ' + JSON.stringify(error));
        }).finally(() => {
            this.spinner = false;
        });
    }

    discard () {
        this.spinner = true;
        this.getPaymentDetails()
        .then((value) => { 
            return this.reverseLimits();
        }).then((value) => { 
            return this.handleDiscardPayment();
        }).catch((error) => {
            console.log('Error discard: ' + error);
        }).finally(() => {
            this.spinner = false;
        });
    }

    reuse () {
        //************************************************************************************* */
        //************************************************************************************* */
        //************************************************************************************* */
        //LA INFORMACIÓN QUE VIENE DEBAJO CORRESPONDE A CODIGO COMENTADO EN LA VERSION DE MERGE
        //************************************************************************************* */
        //************************************************************************************* */
        //************************************************************************************* */
        /*TO-DO
        this.spinner', true);
        this.getPaymentDetails()  
        .then($A.getCallback(function (value) { 
            return this.goToReusePayment();               
        }), this).catch(function (error) {
            console.log('error');
        }).finally($A.getCallback(function() {
            this.spinner', false);
        }));
        */
        
    }

    addToTemplate () {
        //SIN INFORMAR EN LA VERSION DE MERGE
    }

    authorize () {
        //this.spinner', true);
        this.spinner = true;
        //this.getPaymentDetails()
        this.getPaymentDetails()
        .then((value) => {
            let signature = this.signatoryStatus;
            if (signature.lastSign == 'true') {
                this.reloadFX(false)
                .then((value) => {
                    return this.reloadFX(true);              
                }).then((value) => {
                    return this.checkAccounts();
                }).then((value) => {
                    var page = 'authorizationfinal'; 
                    var url = '';
                    var source = 'landingpayment';
                    var paymentId = component.get('v.paymentDetails').paymentId;
                    var paymentDraft = component.get('v.paymentDetails');
                    var payment = component.get('v.paymentDetails');
                    if (!paymentDraft.feesDRAFT) {
                        payment.fees = paymentDraft.feesDRAFT;
                    }
                    if (!paymentDraft.FXFeesOutputDRAFT) {
                    	payment.FXFeesOutput = paymentDraft.FXFeesOutputDRAFT;
                    }
                    if (!paymentDraft.feesFXDateTimeDRAFT) {
                    	payment.feesFXDateTime = paymentDraft.feesFXDateTimeDRAFT;
                    }
                    if (payment.sourceCurrency != payment.beneficiaryCurrency) {
                    	payment.tradeAmount = paymentDraft.tradeAmountDRAFT;
                    	payment.operationNominalFxDetails.customerExchangeRate = paymentDraft.operationNominalFxDetails.customerExchangeRateDRAFT;
                    	payment.timestamp = paymentDraft.timestampDRAFT;
                        payment.convertedAmount = paymentDraft.convertedAmountDRAFT;
                    	payment.amountOperative = paymentDraft.amountOperativeDRAFT;
	                    payment.FXoutput = paymentDraft.FXoutputDRAFT;
                        payment.FXDateTime = paymentDraft.FXDateTimeDRAFT;
                        if (!paymentDraft.amountSendDRAFT) {
                            payment.amountSend = paymentDraft.amountSendDRAFT;
                        }
                        if (!paymentDraft.amountReceiveDRAFT) {
                            payment.amountReceive = paymentDraft.amountReceiveDRAFT;
                        }
                    }
                    
                    var total = 0;
                    if (!payment.fees) {
                        total = parseFloat(payment.amountSend) + parseFloat(payment.fees);
                    }else{
                        total = parseFloat(payment.amountSend)
                    }
                    payment.totalAmount = total;
                
                    this.paymentdetails = payment;
                    if (!paymentId) {
                        url = 
                            'c__source=' + source +
                            '&c__paymentId=' + paymentId +
                            '&c__signatoryDetails=' + JSON.stringify(signature) +
                            '&c__paymentDetails=' + JSON.stringify(this.paymentdetails);
                    }
                    return this.goTo(page, url);
                }).catch((error) => {
                    console.log('### lwc_paymentsLandingUtilityBar ### authorize().reloadFX() ::: Catched Error: ' + JSON.stringify(error));
                }).finally(()=> {
                    this.spinner = false;
                });
            } else {
                var page = 'authorizationfinal'; 
                var url = '';
                var source = 'landingpayment';
                var paymentId = this.paymentdetails.paymentId;
                if (!paymentId) {
                    url = 
                    'c__source=' + source +
                    '&c__paymentId=' + paymentId +
                    '&c__signatoryDetails=' + JSON.stringify(signature) +
                    '&c__paymentDetails=' + JSON.stringify(this.paymentdetails);
                }
                this.spinner = false;
                return this.goTo(page, url);
            }
        }).catch((error) => {
            console.log('### lwc_paymentsLandingUtilityBar ### authorize() ::: Catched Error: ' + JSON.stringify(error));
            this.spinner = false;
        }).finally(() => {
        });
    }

    reject () {
        this.action = 'Reject';
        this.spinner = true;
        this.getPaymentDetails()
        .then((value) => { 
            return this.showREDOModal();
        }).catch((error) => {
            console.log('Error reject: ' + error);
        }).finally(() => {
            this.spinner = false;
        }); 
    }

    sendToReview () {
        this.spinner = true;
        this.getPaymentDetails()  
        .then((value) => { 
            return this.showREDOModal();
        }).catch((error) => {
            console.log('Error sendToReview: ' + error);
        }).finally(() => {
            this.spinner = false;
        });
    }

    showCancelPaymentModal () {
        this.fromUtilityBar = true;
        this.fromDetail = false;
        this.showCancelModal= true;
    }

    getPaymentDetails () {
        return new Promise( function(resolve, reject) {
            var paymentId = this.paymentdetails.paymentId;
            //var action = component.get('c.getPaymentDetail');
            getPaymentDetail ({
                paymentId : paymentId
            })
            .then(result => {
                var returnValue = result;
                    if (returnValue.success) {
                        this.paymentdetails = returnValue.value.paymentDetail;
                        resolve('payment details OK');
                    } else {
                        this.showToastMode(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
						reject(this.label.ERROR_NOT_RETRIEVED);
                    }
            })
            .catch(error => {
                console.log('### lwc_paymentsLandingUtilityBar ### getPaymentDetails() ::: Catched Error: ' + JSON.stringify(error));
                this.showToastMode(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
                reject(this.label.ERROR_NOT_RETRIEVED);
            });
        }.bind(this));
    }

    handleDiscardPayment () {
        return new Promise( function(resolve, reject) {
            this.action = 'Discard';
            // var action = component.get('c.sendToService');
            // action.setParams({ 
            //     'paymentId': component.get('v.paymentDetails').paymentId,
            //     'status': '990',
            //     'reason': '001'
            // });
            getPaymentDetail ({
                paymentId : this.paymentdetails.paymentId,
                status: '990',
                reason: '001'
            })
            .then(result => {
                var output = response.getReturnValue();
                if (output.success) {
                        resolve('ok');
                } else {
                    this.showToastMode(this.label.B2B_Error_Problem_Loading,this.label.B2B_Error_Check_Connection, true, 'error');
                    reject('ko');
                }
            })
            .catch(error => {
                console.log('### lwc_paymentsLandingUtilityBar ### handleDiscardPayment() ::: Catched Error: ' + JSON.stringify(error));
                this.showToastMode(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
                reject('ko');
            // } else {
            //     console.log('Another error');
            //     this.showToastMode(, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
            //     reject('ko');
                
            });
        }.bind(this));
    }

    showToastMode (title, body, noReload, mode) {
        var errorToast = this.template.querySelector('[data-id="errorToast"]');
        var myEvent = {
            detail: {
                action: false, 
                static: false, 
                notificationTitle: title,
                bodyText: body, 
                functionTypeText: 'Error', 
                functionTypeClass: 'warning', 
                functionTypeClassIcon: 'warning', 
                noReload: noReload,
                landing: ''
            }
        }
        if (errorToast) {
            if (mode == 'error') {
                errorToast.openToast(myEvent);
            }
            if (mode =='success') {
                myEvent.detail.action = true;
                myEvent.detail.functionTypeText = 'Success', 
                myEvent.detail.functionTypeClass = 'success', 
                myEvent.detail.functionTypeClassIcon = 'success', 
                myEvent.detail.noReload = false,
                // myEvent.detail.???: 'goToPaymentDetail'
                errorToast.openToast(myEvent);
            }
        }
    }

    updateStatusEditPayment () {
        return new Promise( function(resolve, reject) {
            
            this.action = 'Cancel';
            var payment = this.paymentdetails;
            
            sendToService({
                paymentId: payment.paymentId,
                status: '001',
                reason: '000'
            })
            .then((result) => {
                var  output = response.getReturnValue();
                if (output.success) {               
                        
                    this.payment.paymentStatus = '001';
                    this.payment.paymentReason = '000';
                    this.paymentdetails =payment;
                    resolve('ok');
                } else {
                    this.showToastMode(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');                    
                    reject('ko');
                }
            })
            .catch((error) => {
                console.log('### lwc_paymentsLandingUtilityBar ### updateStatusEditPayment() ::: Catched Error: ' + JSON.stringify(error));
                this.showToastMode(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
                reject('ko');
                ///???????????????????????? 
                //this.showToastMode(, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                //reject('ko');
            })
        }.bind(this));
    }

    showREDOModal () {
        this.showRedo = true;
    }

    reverseLimits () {
        return new Promise( function(resolve, reject) {
            resolve('ok');
            ////////////////////////////////////////////////////////////////
            // EL SIGUIENTE CODIGO ESTA COMENTADO EN EL ENTORNO DE MERGE 
            ////////////////////////////////////////////////////////////////
            /* var action = component.get('c.reverseLimits');
            action.setParams({ 
                'operationId': component.get('v.paymentDetails').paymentId,
                'serviceId': 'add_international_payment_internal',
                'paymentData': component.get('v.paymentDetails')
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var  output = response.getReturnValue();
                    if (output.success) {
                        resolve('ok');
                    } else {
                        reject('ko');
                    }
                } else if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' +  errors[0].message);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                    reject('ko');
                }else{
                    console.log('Another error');
                    reject('ko');
                }
            });       
            $A.enqueueAction(action); */
        }.bind(this));
    }

    goToEditPayment () {
        try {
            var payment = this.paymentdetails;
            var page = 'payments-b2b';
            var url = '';
            var source = 'landing-payment-details';
            var paymentId = payment.paymentId;
            //if (!$A.util.isEmpty(paymentId)) {
            if (paymentId != undefined) {
                url = 'c__source=' + source +
                    '&c__paymentId=' + paymentId +
                    '&c__paymentDetails=' + JSON.stringify(payment);
            }
            this.goTo(page, url);
        } catch (e) {
            console.log('### lwc_paymentsLandingUtilityBar ### goToEditPayment() ::: Catched Error: ' + JSON.stringify(error));
        }
    }

    goTo (page,url) {
        //let navService = component.find('navService');
        if (url != '') {
            try{
                this.encrypt(page,url);
            } catch (e) {
                console.log(e);
            }
        } else {
            //let pageReference = {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    pageName: page
                },
                state: {
                    params: ''
                }
            });
        }
    }

    encrypt (page, urlAddress){  
        //////Revisar ¿Tienen que encriptar??
        var result='';
        try{
            encryptData({
                str : urlAddress
            })
            .then((value) => {
                result = value;
                this[NavigationMixin.Navigate]({
                    type: "comm__namedPage", 
                    attributes: {
                        pageName: page
                    }, 
                    state: {
                        params : result
                    }
                });
            })
            .catch((error) => {
                console.log('### lwc_paymentsLandingUtilityBar ### encrypt().encryptData() ::: Catched Error: ' + JSON.stringify(error));
            });
        } catch (e) { 
            console.log('### lwc_paymentsLandingUtilityBar ### encrypt() ::: Catched Error: ' + JSON.stringify(error));
        }  
    }

    reloadFX(feesBoolean) {
        return new Promise( function(resolve, reject) {
            var payment = this.paymentdetails;
            //let feesAmount = ($A.util.isEmpty(payment.fees) ? '' : payment.fees);
            let feesAmount = ((!payment.fees) ? '' : payment.fees);
            //let feesCurrency = ($A.util.isEmpty(payment.feesCurrency) ? '' : payment.feesCurrency);
            let feesCurrency = ((!payment.feesCurrency) ? '' : payment.feesCurrency);
            //if (feesBoolean == true && (($A.util.isEmpty(feesAmount) || $A.util.isEmpty(feesCurrency)) || (!$A.util.isEmpty(feesAmount) && (payment.sourceCurrency == feesCurrency)))) {
            if (feesBoolean == true && ((feesAmount) || (feesCurrency)) || ((feesAmount) && (payment.sourceCurrency == feesCurrency))) {
                resolve('ok');
            } else if (feesBoolean == false && payment.sourceCurrency == payment.beneficiaryCurrency) {
                resolve('ok');
            } else {
                var paymentId = payment.paymentId;
                var accountData = this.accountData;
                // var action = component.get('c.getExchangeRate');
                // action.setParams({
                //     'paymentId': paymentId,
                //     'payment': payment,
                //     'accountData': accountData,
                //     'feesBoolean': feesBoolean
                // }); 
                getExchangeRate({
                    paymentId: paymentId,
                    payment: payment,
                    accountData: accountData,
                    feesBoolean: feesBoolean
                })
                .then((value) => {
                    var stateRV = value;
                    if (stateRV.success) {
                        if (feesBoolean == true) {
                            if (!stateRV.value.convertedAmount) {
                                payment.feesDRAFT = stateRV.value.convertedAmount;
                            }
                            if (!stateRV.value.output) {
                                payment.FXFeesOutputDRAFT = stateRV.value.output;
                                }
                                payment.feesFXDateTimeDRAFT = this.getCurrentDateTime();
                            } else {
                                if (!stateRV.value.exchangeRate) {
                                    payment.tradeAmountDRAFT = stateRV.value.exchangeRate;
                                    payment.operationNominalFxDetails.customerExchangeRateDRAFT = stateRV.value.exchangeRate;
                                }  
                                if (!stateRV.value.timestamp) {
                                    payment.timestampDRAFT = stateRV.value.timestamp;
                                }  
                                if (!stateRV.value.convertedAmount) {
                                    payment.convertedAmountDRAFT = stateRV.value.convertedAmount;
                                    payment.amountOperativeDRAFT = stateRV.value.convertedAmount;
                                    
                                    if(stateRV.value.amountObtained == 'send'){
                                    	payment.amountSendDRAFT = stateRV.value.convertedAmount;
                                    }
                                    if(stateRV.value.amountObtained == 'received'){
                                    	payment.amountReceiveDRAFT = stateRV.value.convertedAmount;
                                    }
                                }
                                if (!stateRV.value.output) {
                                    payment.FXoutputDRAFT = stateRV.value.output;
                                }
                                payment.FXDateTimeDRAFT = this.getCurrentDateTime();
                            }
                            this.paymentdetails =  payment;
                            resolve('ok');
                        } else {
                            this.showToastMode(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
                            reject('ko');
                        }
                    
                })
                .catch((error) => {
                    console.log('### lwc_paymentsLandingUtilityBar ### reloadFX() ::: Catched Error: ' + JSON.stringify(error));
                    this.showToastMode(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
                    reject('ko');
                });
                
            }
        }.bind(this));  
    }

    checkAccounts () {
        return new Promise( function(resolve, reject) {
            let payment = this.paymentdetails;
            let amount = 0;
            if (!payment.amount) {
                amount = parseFloat(payment.amount);
            }
            if (!payment.amountOperativeDRAFT) {
                amount = parseFloat(payment.amountOperativeDRAFT);
            }
            let fees = 0;
            if (!payment.fees) {
                fees = parseFloat(payment.fees);
            }
            if (!payment.feesDRAFT) {
                fees = parseFloat(payment.feesDRAFT);
            }
            var totalAmount = amount + fees;
            // let action = component.get('c.validateAccount');
            // action.setParams({
            //     'payment': payment,
            //     'amount': totalAmount
            // });
            let errorProblemLoading = this.label.B2B_Error_Problem_Loading;
            let errorCheckConnection = this.label.B2B_Error_Check_Connection;
            let contactSupport = this.label.B2B_Error_Contact_Support;
            validateAccount({
                payment: payment,
                amount: totalAmount
            })
            .then((value) => {
                let returnValue = value;
                    if (!returnValue.success) {
                        this.showToastMode(errorProblemLoading, errorCheckConnection, false, 'error');
                        reject('ko');
                    } else {
                        if (returnValue.value.statusResult != 'OK') {
                            this.showToastMode(errorProblemLoading, contactSupport, true, 'error');
                            reject('ko');
                        } else if (returnValue.value.amountResult != 'OK') {
                            this.showToastMode(errorProblemLoading, contactSupport, true, 'error');
                            reject('ko');
                        } else {
                            resolve('La ejecucion ha sido correcta.');
                        }
                    }
            })
            .catch((error) => {
                let errors = error;
                console.log('### lwc_paymentsLandingUtilityBar ### checkAccounts() ::: Catched Error: ' + JSON.stringify(error));
                this.showToastMode(errorProblemLoading, errorCheckConnection, true, 'error');
                reject(this.label.ERROR_NOT_RETRIEVED);
            });
        }.bind(this));
    }

    getCurrentDateTime () {
        var today = new Date();
        var month = today.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = today.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        var date = today.getFullYear() + '-' + month + '-' + day;
        var hours = today.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        var minutes = today.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        var seconds = today.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        var dateTime = date + 'T' + time;       
        return dateTime; 
    }

    handleCancelSelectedPayment (event) {
        this.showCancelModal = false;
        var cancel = event.getParam('cancelSelectedPayment');
        if (cancel) {
            this.spinner = true;
            this.reverseLimits(event).then((value) =>{
                return this.cancelSelectedPayment();
            })
            .catch((error) =>{
                console.log('### lwc_paymentsLandingUtilityBar ### handleCancelSelectedPayment() ::: Catched Error: ' + JSON.stringify(error));
            })
            .finally(() => {
                this.spinner = false;
                //Pdte de cambiar la redirección
                //$A.get('e.force:refreshView').fire();
            });
        }
    }

    cancelSelectedPayment () {
        return new Promise( function(resolve, reject) {
            this.action = Cancel;
            var payment = this.paymentdetails;
            sendToService({
                paymentId: payment.paymentId,
                status: '998',
                reason: '003'
            })
            .then((value) => {
                var  output = value;
                if (output.success) {
                    var msg = this.label.PAY_ThePaymentHasBeenCanceled;
                    var clientReference = payment.clientReference;
                    msg = msg.replace('{0}', clientReference);
                    this.showToastMode(msg, '', false, 'success');
                    resolve('ok');
                        
                } else {
                    this.showToastMode(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
                    reject('ko');
                }
            })
            .catch((error) =>{
                console.log('### lwc_paymentsLandingUtilityBar ### cancelSelectedPayment() ::: Catched Error: ' + JSON.stringify(error));
                this.showToastMode(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
                reject('ko');
            });
        }.bind(this));
    }
    
    goToPaymentDetail (event){
        var payment =  this.paymentdetails;
        var paymentID = payment.paymentId;
        var url =  "c__currentUser="+JSON.stringify(this.currentUser)+"&c__paymentID="+paymentID;
        var page = 'landing-payment-details';
        this.goTo(event, page, url);
    }

    getUserData () {
        return new Promise( function(resolve, reject) {
            //var action = component.get('c.getUserData');
            getUserData()
            .then((value) => {
                var userData = {};
                var stateRV = value;
                if (stateRV.success) {
                    if (!stateRV.value.userId) {
                        userData.userId = stateRV.value.userId;
                    } 
                    if (!stateRV.value.isNexus) {
                        userData.isNexus = stateRV.value.isNexus;
                    } else {
                        userData.isNexus = false; // Añadir un error FLOWERPOWER_PARCHE_MINIGO
                    }
                    if (!stateRV.value.numberFormat) {
                        userData.numberFormat = stateRV.value.numberFormat;
                    }
                    if (!stateRV.value.globalId) {
                        userData.globalId = stateRV.value.globalId;
                    } 
                }
                this.userData = userData;
                resolve('La ejecucion ha sido correcta.'); 
            })
            .catch((error) => {
                console.log('### lwc_paymentsLandingUtilityBar ### getUserData() ::: Catched Error: ' + JSON.stringify(error));
                reject(this.label.ERROR_NOT_RETRIEVED);
            });
        }.bind(this));
    }

    get getHeadingMsgDiscardModel(){
        return this.label.PAY_discardPayment + ' ' + this.paymentDetails.clientReference + ' ' + this.label.Int;
    }

    get getContentMsgDiscardModel(){
        return this.label.PAY_DiscardDate1 + ' ' + this.paymentDetails.draftDate + ' ' + this.label.PAY_DiscardDate2;
    }

    cancel() { 	
        return new Promise((function (resolve, reject) { 	
        this.spinner= true;  	
        this.getPaymentDetails()
        .then(function (value) { 	
            return this.reverseLimits();  	
        })
        .then( (value) => { 	
            return this.cancelSelectedPayment();	
        })
        .catch( (error) => {	
            console.log('### lwc_paymentsLandingUtilityBar ### cancel() ::: Error discard catched: ' + JSON.stringify(error));	
            reject ('ko');	
        })
        .finally( () => {	
            this.spinner = false;	
            resolve('OK');	
        });	
        }.bind(this))); 	
    }

    sendToLanding(variable, discard) {	
        var url = '';	
        if (variable === 'discard'){	
            url = 'c__discard=' + discard;	
       } else if (variable === 'cancel'){	
            url = 'c__cancel=' + discard;	
       }	
        this.encrypt(url)	
        .then((results) => {	
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    pageName: this.onwardPage
                },
                state: {
                    params: results
                }
            });
        });	
    }

    showSuccessToast(variable) {
        if (variable == 'discard'){
            const toastevent = new CustomEvent('toastevent', {
                title : this.label.Toast_Success,
                message:  this.label.Pay_discarted,          
                duration:' 5000',
                key: 'info_alt',
                type: 'success',
                mode: 'pester'
            });            
            this.dispatchEvent(toastevent);
        } else if (variable == 'save'){
            const toastevent = new CustomEvent('toastevent', {
                title: this.label.Toast_Success,
                message:  this.label.PAY_savedSuccess,          
                duration:' 5000',
                key: 'info_alt',
                type: 'success',
                mode: 'pester'
            });
            this.dispatchEvent(toastevent);
        }
    }

    //PARCHE_FLOWERPOWER JHM
    //CÓDIGO REPLICADO A FALTA DE AVERIGUAR COMO UTILIZAR LA FUNCIÓN .FIND DE UN MÉTODO DE OTRO COMPONENTE
    formatUserDate(response){
        return new Promise( function(resolve, reject) {  
            // If a date format exists for the User, make use of the given format
            // If not, the Locale's short date format is used
            var dateString = this.payment.draftDate;
            var format = (response != '' && response != null) ? response : shortFormat;

            if(dateString != "N/A" && dateString != undefined){
                if(this.convertToUserTimezone){
                    this.dateToFormat = new Date(dateString.substring(0,4), parseInt(dateString.substring(5,7)) - 1, dateString.substring(8,10), dateString.substring(11,13), dateString.substring(14,16), 0, 0 );
                    this.dateToFormat.setMinutes(this.dateToFormat.getMinutes() - this.dateToFormat.getTimezoneOffset());
                    this.getDateStringBasedOnTimezone(this.dateToFormat);
                    if(this.formattedDate != "Invalid Date"){
                        switch(format){
                            case "dd/MM/yyyy" :
                                this.formattedDate = dateString.substring(8,10) + "/" + dateString.substring(5,7) + "/" + dateString.substring(0,4);
                                break;
                            case "MM/dd/yyyy" :
                                this.formattedDate = dateString.substring(5,7) + "/" + dateString.substring(8,10) + "/" + dateString.substring(0,4);
                                break;
                        }
                        this.payment.draftDate = this.formattedDate;
                    }else {
                        this.payment.draftDate = dateString;
                    }
                    
                } else {
                    this.formattedDate = "";
                    switch(format){
                        case "dd/MM/yyyy" :
                            this.formattedDate = dateString.substring(8,10) + "/" + dateString.substring(5,7) + "/" + dateString.substring(0,4);
                            break;
                        case "MM/dd/yyyy" :
                            this.formattedDate = dateString.substring(5,7) + "/" + dateString.substring(8,10) + "/" + dateString.substring(0,4);
                            break;
                    }
                    this.payment.draftDate = this.formattedDate;
                } 
            } else {
                this.payment.draftDate = "N/A";
            }
            //console.log('showdisplayeddate::::: ', this.showdisplayeddate);
            resolve('ok');
        }.bind(this)); 

    }


    getDateStringBasedOnTimezone(dateToFormat){
        try{
            this.formattedDate = dateToFormat.toLocaleString({timeZone: timezone});		
        }catch(e){
            console.log(e);
        }
    }
}