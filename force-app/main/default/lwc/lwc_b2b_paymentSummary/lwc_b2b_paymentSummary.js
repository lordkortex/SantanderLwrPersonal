import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import cometd from '@salesforce/resourceUrl/cometd';
// import cometd from "@salesforce/resourceUrl/cometd";
import { NavigationMixin } from 'lightning/navigation';

// Import labels
import PAY_Summary_from from '@salesforce/label/c.PAY_Summary_from';
import PAY_Summary_To from '@salesforce/label/c.PAY_Summary_To';
import RUT from '@salesforce/label/c.RUT';
import B2B_Swift_code from '@salesforce/label/c.B2B_Swift_code';
import B2B_Expenses_Account from '@salesforce/label/c.B2B_Expenses_Account';
import reference from '@salesforce/label/c.reference';
import B2B_PaymentPurpose from '@salesforce/label/c.B2B_PaymentPurpose';
import exchangeRate from '@salesforce/label/c.exchangeRate';
import help from '@salesforce/label/c.help';
import transferFee from '@salesforce/label/c.transferFee';
import confirmPayment from '@salesforce/label/c.confirmPayment';
import editPayment from '@salesforce/label/c.editPayment';
import amountToBeCharged from '@salesforce/label/c.amountToBeCharged';
import indicativeExchangeRate from '@salesforce/label/c.indicativeExchangeRate';
import PAY_PaymentSummary_header from '@salesforce/label/c.PAY_PaymentSummary_header';
import PAY_PaymentSummary_details from '@salesforce/label/c.PAY_PaymentSummary_details';
import valueDate from '@salesforce/label/c.valueDate';
import ClientReference from '@salesforce/label/c.ClientReference';
import PAY_PaymentSummary_payReason from '@salesforce/label/c.PAY_PaymentSummary_payReason';
import PAY_PaymentSummary_feesHolder from '@salesforce/label/c.PAY_PaymentSummary_feesHolder';
import PaymentMethod from '@salesforce/label/c.PaymentMethod';
import charges from '@salesforce/label/c.charges';
import PAY_PaymentSummary_feesBank from '@salesforce/label/c.PAY_PaymentSummary_feesBank';
import PAY_PaymentSummary_upDoc from '@salesforce/label/c.PAY_PaymentSummary_upDoc';
import document from '@salesforce/label/c.document';
import amount from '@salesforce/label/c.amount';
import PAY_PaymentSummary_tooltip1 from '@salesforce/label/c.PAY_PaymentSummary_tooltip1';
import Fee from '@salesforce/label/c.Fee';
import PAY_PaymentSummary_tooltip2 from '@salesforce/label/c.PAY_PaymentSummary_tooltip2';
import CNF_mockeoFirmas from '@salesforce/label/c.CNF_mockeoFirmas';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';
import OTPWrongCheckSMS from '@salesforce/label/c.OTPWrongCheckSMS';
import AmountToAuth from '@salesforce/label/c.AmountToAuth';

// Import Apex class
import getSessionId from '@salesforce/apex/CNT_B2B_PaymentSummary.getSessionId';
import getSignLevel from '@salesforce/apex/CNT_B2B_PaymentSummary.getSignLevel';
import updateStatus from '@salesforce/apex/CNT_B2B_PaymentSummary.updateStatus';
import executePayment from '@salesforce/apex/CNT_B2B_PaymentSummary.executePayment';
import authorizePayment from '@salesforce/apex/CNT_B2B_PaymentSummary.authorizePayment';
import removeSignature from '@salesforce/apex/CNT_B2B_PaymentSummary.removeSignature';
import encryptData from '@salesforce/apex/CNT_B2B_PaymentSummary.encryptData';
import getOTP from '@salesforce/apex/CNT_B2B_PaymentSummary.getOTP';
import validateOTP from '@salesforce/apex/CNT_B2B_PaymentSummary.validateOTP';
import getOTP_Strategic from '@salesforce/apex/CNT_B2B_PaymentSummary.getOTP_Strategic';
import upsertPayment from '@salesforce/apex/CNT_B2B_PaymentSummary.upsertPayment';
import sendNotification from '@salesforce/apex/CNT_B2B_PaymentSummary.sendNotification';
import getExchangeRate from '@salesforce/apex/CNT_B2B_PaymentSummary.getExchangeRate';
import updateLimits from '@salesforce/apex/CNT_B2B_PaymentSummary.updateLimits';

//Import flags
import flags from '@salesforce/resourceUrl/Flags';

export default class Lwc_b2b_paymentSummary extends NavigationMixin(LightningElement) {

    label={
        amountToBeCharged,
        indicativeExchangeRate,
        PAY_PaymentSummary_header,
        PAY_Summary_from,
        PAY_Summary_To,
        PAY_PaymentSummary_details,
        valueDate,
        ClientReference,
        PAY_PaymentSummary_payReason,
        reference,
        PAY_PaymentSummary_feesHolder,
        PaymentMethod,
        B2B_PaymentPurpose,
        charges,
        B2B_Expenses_Account,
        PAY_PaymentSummary_feesBank,
        RUT,
        B2B_Swift_code,
        PAY_PaymentSummary_upDoc,
        document,
        amount,
        exchangeRate,
        help,
        PAY_PaymentSummary_tooltip1,
        Fee,
        transferFee,
        PAY_PaymentSummary_tooltip2,
        confirmPayment,
        editPayment,
        CNF_mockeoFirmas,
        B2B_Error_Problem_Loading,
        B2B_Error_Check_Connection,
        ERROR_NOT_RETRIEVED,
        OTPWrongCheckSMS,
        AmountToAuth
    }


    @api paymentdraft = {};
    @api userdata = {};
    @api transfertype = "";
    // @api handleback
    @api signlevel = {};

    @track total;
    @track forwardPage = "landing-payments"; // onwardPage
    @track showOTP;
    @track tokenOK;
    @track OTP = "";
    @track OTPErrorMessage = "";
    @track reloadAction;
    @track reload;
    @track disabledSignature;
    @track expiredFX;
    @track FXDateTime;
    @track limitsData = {};
    @track spinner;
    @track spinnerVerificationCode;
    @track spinnerCountDown;
    @track errorSign;
    @track totalAmountLabel = this.label.amountToBeCharged;
    @track exchangeRateLabel = this.label.indicativeExchangeRate;
    @track navigatorInfo = {};
    @track urgencyIndicator= "Standard";
    @track localWindow;
    @track sessionId;
    @track cometd;
    @track cometdSubscriptions;
    @track scaUid;
    @track feesString = "";
    @track debitAmountString = "";
    @track exchangeRateString = "";
    @track paymentAmountString = "";
    @track valueDateString = "";
    @track errorOTP;
    @track uploadedDocuments = ['Prueba1', 'Prueba2', 'Prueba3', 'Prueba4'];

    @track sourceCountryFlag;
    @track destinationCountryFlag;

    @track isFirstTime = true;

    get valueDateStringEmpty(){
        return  this.isEmpty(this.valueDateString) ;
    }

    get paymentDraftReasonEmpty(){
        var reason = this.paymentdraft.reason;
        return this.isEmpty(reason);
    }

    get paymentDraftDescriptionEmpty(){
        var description = this.paymentdraft.description;
        return this.isEmpty(description);
    }

    get paymentDraftExpensesAccountEmpty(){
        var expensesAccount = this.paymentdraft.expensesAccount;
        return this.isEmpty(expensesAccount);
    }

    get transferTypeEmpty(){
        return this.isEmpty(this.transfertype) ;
    }

    get destinationAccountEqBR(){
        return this.paymentdraft.destinationAccount.country == 'BR';
    }

    get paymentDraftPurposeEmpty(){
        var purpose = this.paymentdraft.purpose;
        return this.isEmpty(purpose);
    }

    get paymentDraftChargeBearerEmpty(){
        var chargeBearer = this.paymentdraft.chargeBearer;
        return this.isEmpty(chargeBearer);
    }

    get sourceAccountEqCL(){
        return this.paymentdraft.sourceAccount.country == 'CL';
    }

    get uploadedDocumentsLengthGtZero(){
        return !this.isEmpty(this.uploadedDocuments);
    }

    get amountReceiveNull(){
        var amountReceive = this.paymentdraft.amountReceive;
        return this.isEmpty(amountReceive);
    }

    get currencyCodeAvailableBalanceDiffers(){
        return this.paymentdraft.destinationAccount.currencyCodeAvailableBalance != this.paymentdraft.sourceAccount.currencyCodeAvailableBalance;
    }

    get paymentDraftExchangeRateEmpty(){
        var exchangeRate = this.paymentdraft.exchangeRate;
        return this.isEmpty(exchangeRate);
    }

    get amountInSourceAccount(){
        return this.label.amountIn + ' ' + this.paymentdraft.sourceAccount.currencyCodeAvailableBalance;
    }

    get paymentDraftAmountSendEmpty(){
        var amountSend = this.paymentdraft.amountSend;
        return this.isEmpty(amountSend);
    }

    get paymentDraftConvertedTransactionFeeEmpty(){
        var convertedTransactionFee = this.paymentdraft.convertedTransactionFee;
        return this.isEmpty(convertedTransactionFee);
    }

    get paymentDraftTransactionFeeEmpty(){
        var transactionFee = this.paymentdraft.transactionFee;
        return this.isEmpty(transactionFee);
    }

    get signatory(){
        return this.signlevel.signatory && this.signlevel.lastSign && this.paymentdraft.sourceAccount.currencyCodeAvailableBalance != this.paymentdraft.destinationAccount.currencyCodeAvailableBalance;
    }

    get localUser(){
        return !this.userdata.cashNexus && !this.userdata.multiOneTrade;
    }

    get errorSignOrExpiredFX(){
        return this.errorSign || this.expiredFX;
    }

    get uploadedDocumentsIteration(){
        var uploadedDocumentsAux = [...this.uploadedDocuments];
        Object.keys(uploadedDocumentsAux).forEach( key => {
            uploadedDocumentsAux[key].index = key;
            uploadedDocumentsAux[key].documentLabel = this.label.document + ' ' + (key+1);
        });
        return uploadedDocumentsAux;
    }

    isEmpty(element){
        return element == "" || JSON.stringify(element) == JSON.stringify({}) || element == [] || element == undefined;
    }

    // connectedCallback() {
    //     loadStyle(this, santanderStyle + '/style.css');
    //     this.initComponent();
    // }

    renderedCallback(){

        if(this.isFirstTime){
            this.sourceCountryFlag = flags + '/' + this.paymentdraft.sourceAccount.country + '.svg';
            this.destinationCountryFlag = flags + '/' + this.paymentdraft.destinationAccount.country + '.svg'

            this.isFirstTime = false;
        }        

        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();

        new Promise( (resolve, reject) => {
            loadScript(this, cometd)
        })
        .then( () => {
            this.onCometdLoaded();
            console.log('Scripts loaded successfully');
        })
        .catch( error => {
            console.log('Error while loading scripts');
        });


    }

    initComponent() {
        window.onbeforeunload = function (event) {
            var msg = 'hola mundo';
            if (typeof event == 'undefined') {
                event = window.event;
            }
            if (event) {
                this.updateStatus('001', '000');
                event.returnValue = msg;
                return msg;
            }
        }

        new Promise( (resolve, reject) => {
            this.getTotalAmount();
            this.spinner = true;
            if (this.label.CNF_mockeoFirmas != 'ok') {
                this.auxCometD();
            }
            resolve('Ok');
        }).then(value => {
            return this.getNavigatorInfo();
        }).then(value => {
            return this.getSignatureLevel();
        }).catch(error => {
            console.log(error);
        }).finally( () => {
            this.spinner = false;
        });
    }

    updateStatus(status, reason) {
        return new Promise( (resolve, reject) => {
            let paymentDraft = this.paymentdraft;
            let paymentId = paymentDraft.paymentId;
            updateStatus({
                paymentId: paymentId,
                status: status,
                reason: reason
            })
            .then(result => {
                var stateRV = result;
                if (stateRV == 'OK') {
                    resolve('OK');
                } else {
                    reject(this.label.ERROR_NOT_RETRIEVED);
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false, 'error');
                }
            })
            .catch(error => {
                    if (error) {
                        console.log('Error message: ' + error);
                    } else {
                        this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false, 'error');
                    }
                    reject(this.label.ERROR_NOT_RETRIEVED);
            });
        });
    }

    getTotalAmount() {
        let paymentDraft = this.paymentdraft;
        let amountSend = paymentDraft.amountSend;
        let convertedFee = paymentDraft.convertedTransactionFee;
        let convertedFeeCurrency = paymentDraft.convertedTransactionFeeCurrency;
        let currencyCodeAvailableBalance = paymentDraft.currencyCodeAvailableBalance;
        let fee = paymentDraft.transactionFee;
        let total = 0;
        if (!this.isEmpty(convertedFee) && !this.isEmpty(convertedFeeCurrency)) {
            if (convertedFeeCurrency == currencyCodeAvailableBalance) {
                total = parseFloat(amountSend) + parseFloat(convertedFee);
            }
        } else if (!this.isEmpty(fee)) {
            total = parseFloat(amountSend) + parseFloat(fee);
        }
        this.total = total;
    }

    auxCometD() {
        this.cometdSubscriptions = [];
        this.notifications = [];

        // Disconnect CometD when leaving page
        window.addEventListener('unload', function (event) {
            this.disconnectCometd();
        });

        // Retrieve session id
        getSessionId()
        .then( value => {
            if (this.template.isValid()) {
                this.sessionId = value;
                if (this.cometd != null) {
                    this.connectCometd();
                }
            }
        })
        .catch( error => {
            console.error('Error message: ' + error);
        });
    }

    connectCometd () {
        // Configure CometD
        let cometdUrl = window.location.protocol + '//' + window.location.hostname + '/cometd/40.0/';
        let cometd = this.cometd;
        cometd.configure({
            url: cometdUrl,
            requestHeaders: {
                Authorization: 'OAuth '+ this.sessionId
            },
            appendMessageTypeToURL: false
        });
        cometd.websocketEnabled = false;
        // Establish CometD connection
        console.log('Connecting to CometD: '+ cometdUrl);
        cometd.handshake( handshakeReply => {
            if (handshakeReply.successful) {
                console.log('Connected to CometD.');
                // Subscribe to platform event
                let newSubscription = cometd.subscribe('/event/OTPValidation__e', platformEvent => {
                    if (!this.expiredFX && !this.errorOTP) {
                        let scaUid = this.scaUid;
                        if (platformEvent.data.payload.scaUid__c == scaUid) {
                            let win = this.localWindow;
                            if (!this.isEmpty(win)) {
                                win.close();
                            }
                            if (platformEvent.data.payload.status__c == 'KO' || platformEvent.data.payload.status__c == 'ko') {
                                this.errorSign = true;
                            } else {
                                this.spinnerVerificationCode = true;
                                let signature = this.signLevel;
                                if (signature.lastSign == 'true') {
                                    this.signPayment(true)
                                    .then( value => {
                                        return this.handleExecutePayment();
                                    }).then( value => {
                                        return this.deleteSignatureRecord();
                                    }).then( value => {
                                        this.sendToLanding(true);
                                    }).catch( error => {
                                        this.errorOTP = true;
                                        this.errorSign = true;
                                    }).finally( () => {
                                        this.spinnerVerificationCode = false;
                                    });
                                } else {
                                    this.signPayment(false)
                                    .then( value => {
                                        this.sendToLanding(true);
                                    }).catch( error => {
                                        this.errorOTP = true;
                                        this.errorSign = true;
                                    }).finally( () => {
                                        this.spinnerVerificationCode = false;
                                    });
                                }
                            }
                        }
                    }
                });
                // Save subscription for later
                let subscriptions = this.cometdSubscriptions;
                subscriptions.push(newSubscription);
                this.cometdSubscriptions = subscriptions;
            } else {
                console.error('Failed to connected to CometD.');
            }
        });
    }

    disconnectCometd() {
        let cometd = this.cometd;
        // Unsuscribe all CometD subscriptions
        cometd.batch(function () {
            let subscriptions = this.cometdSubscriptions;
            subscriptions.forEach( subscription => {
                cometd.unsubscribe(subscription);
            });
        });
        this.cometdSubscriptions = [];
        // Disconnect CometD
        cometd.disconnect();
        console.log('CometD disconnected.');
    }

    getNavigatorInfo() {
        new Promise( (resolve, reject) => {
            let navigatorInfo = this.navigatorInfo;
            navigatorInfo.userAgent = navigator.userAgent;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                     position =>  {
                        navigatorInfo.latitude = position.coords.latitude;
                        navigatorInfo.longitude = position.coords.longitude;
                        this.navigatorInfo = navigatorInfo;
                        resolve('ok');
                    },
                    () => {
                        this.navigatorInfo = navigatorInfo;
                        resolve('ok');
                    }
                );
            } else {
                this.navigatorInfo = navigatorInfo;
                resolve('ok');
            }
        }).catch( error => {
            console.log(error);
        });
    }

    getSignatureLevel() {
        // MIRAR ORDEN DE EJECUCION AL MODIFICARSE EL ATRIUBUTO RELOAD (TIENE reloadAction COMO HANDLER)
        this.reloadAction = 'initComponent';
        this.reload = false;
        return new Promise( (resolve, reject) => {
            let paymentDraft = this.paymentdraft;
            let paymentId = paymentDraft.paymentId;
            getSignLevel({'paymentId' : paymentId})
            .then( value => {
                let returnValue = value;
                if (!this.isEmpty(returnValue)) {
                    console.log(returnValue);
                    this.signLevel = returnValue;
                }
                resolve('La ejecucion ha sido correcta.');
            })
            .catch( error => {
                if (error) {
                    console.log('Error message: ' + error);
                } else {
                    console.log('problem getting list of payments msg2');
                }
                reject(this.label.ERROR_NOT_RETRIEVED);
            });
        });
    }

    signPayment(finalAuthorizer) {
        return new Promise( (resolve, reject) => {
            let paymentDraft = this.paymentdraft;
            let paymentId = paymentDraft.paymentId;
            let scaUid = this.scaUid;
            authorizePayment({
                paymentId: paymentId,
                finalAuthorizer: finalAuthorizer,
                scaUid: scaUid
            })
            .then( value => {
                let returnValue = value;
                if (!returnValue.success) {
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false, 'error');
                    reject('problem authorizing the payment');
                } else {
                    resolve('La ejecucion ha sido correcta.');
                }
            })
            .catch( error => {
                if (error) {
                        console.log('Error message: ' + error);
                } else {
                    console.log('problem authorizing the payment');
                }
                this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false, 'error');
                reject(this.label.ERROR_NOT_RETRIEVED);
            });
        });
    }

    handleExecutePayment() {
        return new Promise( (resolve, reject) => {
            let paymentDraft = this.paymentdraft;
            let urgencyIndicator = this.urgencyIndicator;
            executePayment({
                paymentDraft: paymentDraft,
                urgencyIndicator: urgencyIndicator
            })
            .then( value => {
                let returnValue = value;
                if (returnValue.success) {
                    let orchestationOutput = returnValue.value.OrchestationOutput;
                    if (this.isEmpty(orchestationOutput) || this.isEmpty(orchestationOutput.level) || (!this.isEmpty(orchestationOutput.level) && orchestationOutput.level != 'OK')) {
                        this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
                        reject('ko');
                    } else {
                        resolve('ok');
                    }
                } else {
                    reject('ko');
                }
            })
            .catch( error => {
                if (error) {
                    console.log('Error message: ' + error);
                }
                this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
                reject('ko');
            });
        });
    }

    deleteSignatureRecord() {
        return new Promise( (resolve, reject) => {
            let paymentDraft = this.paymentdraft;
            let paymentId = paymentDraft.paymentId;
            removeSignature({
                paymentId: paymentId
            })
            .then( value => {
                let returnValue = value;
                console.log(returnValue);
                if (!returnValue.success) {
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false, 'error');
                    reject('ko');
                } else {
                    resolve('ok');
                }
            })
            .catch( error => {
                if (error) {
                    console.log('Error message: ' + error);
                }
                this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false, 'error');
                reject('ko');
            });
        });
    }

    sendToLanding (signed) {
        let url = 'c__signed=' + signed;
        this.encrypt(component, url)
        .then( results => {
            this[NavigationMixin.Navigate]({
                type: "comm__namedPage", 
                attributes: {
                    pageName: this.forwardPage
                },
                state: {
                    params : results
                }
            });
        });
    }

    encrypt (data) {
        let result = 'null';
        
        return new Promise( (resolve, reject) => {
            encryptData({
                str: data
            })
            .then( value => {
                result = value;
                resolve(result);
            })
            .catch( error => {
                if (error) {
                    console.log('Error message: ' + error);
                    reject('Error message: ' + error);
                } else {
                    console.log('Unknown error');
                }
            });
        });
    }

    handleConfirm() {
        this.spinner = true;
        this.updateStatus('002', '001')
        .then( value => {
            return this.upsertPayment();
        }).then( value => {
            return this.sendNotification('Pending');
        }).then( value => {
            return this.beginAuthorize();
        }).catch( error => {
            console.log(error);
        }).finally( () => {
            this.spinner = false;
        });
    }

    upsertPayment() {
        return new Promise( (resolve, reject) => {
            let paymentDraft = this.paymentdraft;
            if (this.isEmpty(paymentDraft.paymentId) || this.isEmpty(paymentDraft.reference)) { 
                reject('KO');
            } else {
                upsertPayment({
                    paymentDraft: paymentDraft
                })
                .then( value => {
                    let stateRV = value;
                    console.log(stateRV);
                    if (stateRV.success) {
                        resolve('OK');
                    } else {
                        this.showToast(notificationTitle, bodyText, true);
                        reject(stateRV.msg);
                    }
                })
                .catch( error => {
                    this.showToast(notificationTitle, bodyText, true);
                    reject('ERROR: Upsert Payment.');
                }); 
            }
        });
    }

    sendNotification(notificationType) {
        return new Promise( (resolve, reject) => {
            var paymentDraft = this.paymentdraft;
            var paymentId= paymentDraft.paymentId;
            sendNotification({
                paymentId: paymentId,
                notificationType: notificationType
            })
            .then( value => {
                resolve('ok');
            })
            .catch( error => {
                if (error) {
                    console.log('Error message: ' + error);
                }
                resolve('ok');
            });
        });
    }

    beginAuthorize() {
        return new Promise( (resolve, reject) => {
            let signature = this.signLevel;
            this.spinner = true;
            this.totalAmountLabel = this.label.AmountToAuth;
            if (!this.showOTP) {
                if (signature.signatory && !ignature.signed) {
                    if (signature.lastSign) {
                        this.reloadFXValue(false)
                        .then( value => {
                            return this.reloadFXValue(true);
                        }).then( value => {
                            this.sendOTP_Strategic();
                        }).catch( error => {
                            console.log(error);
                        }).finally( () => {
                            this.spinner = false;
                        });
                    } else {
                        this.sendOTP_Strategic()
                        .then( value => {
                            this.showOTP = true;
                        }).catch( error => {
                            console.log(error);
                        }).finally( () => {
                            component.set('v.spinner', false);
                        });
                    }
                } else {
                    this.sendToLanding(false);
                    this.spinner = false;
                }
            }
            resolve('OK');
        });
    }

    reloadFXValue(feesBoolean) {
        return new Promise( (resolve, reject) => {
            let paymentDraft = this.paymentdraft;
            let currencyCodeAvailableBalanceOrigin = paymentDraft.sourceAccount.currencyCodeAvailableBalance;
            let currencyCodeAvailableBalanceDestination = paymentDraft.destinationAccount.currencyCodeAvailableBalance;
            if (feesBoolean && this.isEmpty(paymentDraft.convertedTransactionFee)) {
                resolve('ok');
            } else if (!feesBoolean &&  currencyCodeAvailableBalanceOrigin == currencyCodeAvailableBalanceDestination) {
                resolve('ok');
            } else {
                getExchangeRate({
                    feesBoolean: feesBoolean,
                    paymentDraft: paymentDraft
                })
                .then( value => {
                    var stateRV = value;
                    console.log(stateRV);
                    if (stateRV.success) {
                        if (feesBoolean) {
                            if (!this.isEmpty(stateRV.value.convertedAmount)) {
                                paymentDraft.convertedTransactionFee = stateRV.value.convertedAmount;
                            }
                            if (!this.isEmpty(stateRV.value.output)) {
                                paymentDraft.convertedTransactionFeeServiceResponse = stateRV.value.output;
                            }
                        } else {
                            this.exchangeRateLabel = this.label.exchangeRate;
                            if (!this.isEmpty(stateRV.value.exchangeRate)) {
                                paymentDraft.exchangeRate = stateRV.value.exchangeRate;
                            }
                            if (!this.isEmpty(stateRV.value.timestamp)) {
                                paymentDraft.timestamp = stateRV.value.timestamp;
                            }
                            if (!this.isEmpty(stateRV.value.fxTimer)) {
                                paymentDraft.fXTimer = stateRV.value.fxTimer;
                            }
                            if (!this.isEmpty(stateRV.value.convertedAmount)) {
                                if (stateRV.value.amountObtained == 'send') {
                                    paymentDraft.amountSend = stateRV.value.convertedAmount;
                                }
                                if (stateRV.value.amountObtained == 'received') {
                                    paymentDraft.amountReceive = stateRV.value.convertedAmount;
                                }
                            }
                            if (!this.isEmpty(stateRV.value.output)) {
                                paymentDraft.exchangeRateServiceResponse = stateRV.value.output;
                            }
                        }
                        this.paymentdraft = paymentDraft;
                        this.expiredFX = false;
                        this.getTotalAmount();
                        resolve('ok');
                    } else {
                        this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, this.showOTP, 'error');
                        reject('ko');
                    }
                })
                .catch( error => {
                    this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, this.showOTP, 'error');
                    reject('ko');
                });
            }
        });
    }

    handleAuthorize() {
        // MIRAR ORDEN DE EJECUCION AL MODIFICARSE EL ATRIUBUTO RELOAD (TIENE reloadAction COMO HANDLER)
        this.reload = false;
        this.reloadAction = 'handleAuthorize';
        if (this.showOTP) {
            this.checkOTP()
        }
    }

    sendOTP() {
        return new Promise( (resolve, reject) => {
            // MIRAR ORDEN DE EJECUCION AL MODIFICARSE EL ATRIUBUTO RELOAD (TIENE reloadAction COMO HANDLER)
            this.reload = false;
            this.reloadAction = 'sendOTP';
            this.spinnerVerificationCode = true;
            let sourceCountry = '';
            let sourceBIC = '';
            let paymentDraft = this.paymentdraft;
            let paymentId = paymentDraft.paymentId;
            let sourceAccount = paymentDraft.sourceAccount;
            if (!this.isEmpty(sourceAccount)) {
                if (!this.isEmpty(sourceAccount.country)) {
                    sourceCountry = sourceAccount.country;
                }
                if (!this.isEmpty(sourceAccount.codigoBic)) {
                    sourceBIC = sourceAccount.codigoBic;
                }
            }
            getOTP({
                paymentId: paymentId,
                sourceCountry: sourceCountry,
                sourceBIC: sourceBIC
            })
            .then( value => {
                let returnValue = value;
                if (!returnValue.success) {
                    reject('ko');
                } else {
                    resolve('ok');
                }
                this.spinnerVerificationCode = false;
            })
            .catch( error => {
                if (error) {
                    console.log('Error message: ' + error);
                }
                this.spinnerVerificationCode = false;
                reject('ko');
            });
        });
    }

    checkOTP() {
        this.spinnerVerificationCode = true;
        let sourceCountry = '';
        let sourceBIC = '';
        let paymentDraft = this.paymentdraft;
        let sourceAccount = paymentDraft.sourceAccount;
        let paymentId = paymentDraft.paymentId;
        let metaData = this.OTP;
        if (!this.isEmpty(sourceAccount)) {
            if (!this.isEmpty(sourceAccount.country)) {
                sourceCountry = sourceAccount.country;
            }
            if (!this.isEmpty(sourceAccount.codigoBic)) {
                sourceBIC = sourceAccount.codigoBic;
            }
        }
        validateOTP({
            paymentId: paymentId,
            metaData: metaData,
            sourceCountry: sourceCountry,
            sourceBIC: sourceBIC
        })
        .then( value => {
            let returnValue = value;
            console.log(returnValue);
            if (!returnValue.success) {
                this.spinnerVerificationCode = false;
                this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false, 'error');
            } else {
                if(returnValue.value.validateOTP.validateResult != 'ko' && returnValue.value.validateOTP.validateResult != 'KO') {
                    this.OTPErrorMessage = '';
                    let signature = this.signLevel;
                    if (signature.lastSign == 'true') {
                        this.signPayment(true)
                        .then( value => {
                            return this.handleExecutePayment();
                        }).then( value => {
                            return helper.deleteSignatureRecord();
                        }).then( value => {
                            return helper.sendNotification('Completed');
                        }).then( value => {
                            helper.sendToLanding(true);
                        }).catch( error => {
                            console.log(error);
                        }).finally( () => {
                            this.spinnerVerificationCode = false;
                        });
                    } else {
                        this.signPayment(false)
                        .then( value => {
                            this.sendToLanding(true);
                        }).catch( error => {
                            console.log(error);
                        }).finally( () => {
                            this.spinnerVerificationCode = false;
                        });
                    }
                } else {
                    this.spinnerVerificationCode = false;
                    this.OTPErrorMessage = this.label.OTPWrongCheckSMS;
                }
            }
        })
        .catch( error => {
            if (error) {
                console.log('Error message: ' + error);
            }
            this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false, 'error');
        });
    }

    reloadFX() {
        new Promise( (resolve, reject) => {
            // MIRAR ORDEN DE EJECUCION AL MODIFICARSE EL ATRIUBUTO RELOAD (TIENE reloadAction COMO HANDLER)
            this.reloadAction = 'reloadFX';
            this.reload = false;
            this.errorSign = true;
            this.spinnerCountDown = true;
            resolve('Ok');
        }).then( value => {
            return this.reloadFXValue(false);
        }).then( value => {
            return this.reloadFXValue(true);
        }).catch( error => {
            console.log(error);
        }).finally( () => {
            this.spinnerCountDown = false;
        });
    }

    onCometdLoaded() {
        let cometd = new org.cometd.CometD();
        this.cometd = cometd;
        if (this.sessionId != null) {
            this.connectCometd();
        }
    }

    sendOTP_Strategic() {
        return new Promise( (resolve, reject) => {
            // MIRAR ORDEN DE EJECUCION AL MODIFICARSE EL ATRIUBUTO RELOAD (TIENE reloadAction COMO HANDLER)
            this.reload = false;
            this.showOTP = true;
            this.reloadAction = 'sendOTP_Strategic';
            this.spinnerVerificationCode = true;
            let debitAmount = this.debitAmountString;
            let fees = this.feesString;
            let exchangeRate = this.exchangeRateString;
            let paymentDraft = this.paymentdraft;
            let paymentAmount = this.paymentAmountString;
            let navigatorInfo = this.navigatorInfo;
            getOTP_Strategic({
                debitAmount: debitAmount,
                fees: fees,
                exchangeRate: exchangeRate,
                paymentAmount: paymentAmount,
                paymentDraft: paymentDraft,
                navigatorInfo: navigatorInfo
            })
            .then( value => {
                let returnValue = value;
                if (!returnValue.success) {
                    this.errorSign = true;
                    this.errorOTP = true;
                    this.spinnerVerificationCode = false;
                    reject('ko');
                } else {
                    if (this.isEmpty(returnValue.value.initiateOTP.localSigningUrl)) {
                        this.scaUid = returnValue.value.initiateOTP.scaUid;
                    } else {
                        this.scaUid = returnValue.value.initiateOTP.signId;
                        let win = window.open(returnValue.value.initiateOTP.localSigningUrl, '_blank');
                        this.localWindow = win;
                        win.focus();
                    }
                    this.errorSign = false;
                    this.errorOTP = false;
                    this.spinnerVerificationCode = false;
                    if(this.label.CNF_mockeoFirmas == 'ok'){
                        this.checkOTP();
                    }
                    resolve('ok');
                }
            })
            .catch( error => {
                    if (error) {
                        console.log('Error message: ' + error);
                    }
                    this.errorSign = true;
                    this.errorOTP = true;
                    this.spinnerVerificationCode = false;
                    reject('ko');
            });
        });
    }

    showToast(title, body, noReload, mode) {
        let errorToast = this.template.querySelector('c-lwc_b2b_toast');
        if (!this.isEmpty(errorToast)) {
            if (mode == 'error') {
                errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
            }
            if (mode == 'success') {
                errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', noReload);
            }
        }
    }

    // EN DESUSO
    updateLimits(){
        return new Promise( (resolve, reject) => {
            let paymentDraft = this.paymentdraft;
            updateLimits({
                paymentDraft: paymentDraft
            })
            .then( value => {
                let returnValue = value;
                if (!returnValue.success) {
                    reject('ko');
                } else {
                    resolve('ok');
                }
            })
            .catch( error => {
                if (error) {
                    console.log('Error message: ' + error);
                } else {
                    console.log('Unknown error');
                }
                reject('ko');
            });
        });
    }

    handleBack(){
        const handleBackEvent = new CustomEvent('handleback');
        this.dispatchEvent(handleBackEvent);
    }

    doReloadAction(){
        var reloadAction = this.reloadAction;
        if(reloadAction == 'initComponent'){
            this.initComponent();
        }
        else if(reloadAction == 'handleAuthorize'){
            this.handleAuthorize()
        }
        else if(reloadAction == 'sendOTP'){
            this.sendOTP()
        }
        else if(reloadAction == 'reloadFX'){
            this.reloadFX()
        }
        else if(reloadAction == 'sendOTP_Strategic'){
            this.sendOTP_Strategic()
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