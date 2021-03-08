import { LightningElement, track ,api } from 'lwc';

//import SheetJS from '@salesforce/resourceUrl/SheetJS';
import cometd from '@salesforce/resourceUrl/cometd';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';
import { helper  } from './lwc_b2b_authorizationHelper.js';

//Import Class
import getSessionId from '@salesforce/apex/CNT_B2B_Authorization.getSessionId';
import getExchangeRate from '@salesforce/apex/CNT_B2B_Authorization.getExchangeRate';


//Import Labels
import Loading from '@salesforce/label/c.Loading';
import Authorization from '@salesforce/label/c.Authorization';
import VerifyBeforeAuth from '@salesforce/label/c.VerifyBeforeAuth';
import UserGroupProfileSummary from '@salesforce/label/c.UserGroupProfileSummary';
import sourceandRecepientAccounts from '@salesforce/label/c.sourceandRecepientAccounts';
import PAY_Summary_from from '@salesforce/label/c.PAY_Summary_from';
import PAY_Summary_To from '@salesforce/label/c.PAY_Summary_To';
import orderingHolder from '@salesforce/label/c.orderingHolder';
import Beneficiary from '@salesforce/label/c.Beneficiary';
import orderingBank from '@salesforce/label/c.orderingBank';
import beneficiaryBank from '@salesforce/label/c.beneficiaryBank';
import orderingAccount from '@salesforce/label/c.orderingAccount';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import Country from '@salesforce/label/c.Country';
import Corporate from '@salesforce/label/c.Corporate';
import taxIdDocPassport from '@salesforce/label/c.taxIdDocPassport';
import paymentInformation from '@salesforce/label/c.paymentInformation';
import PAY_ProcessDate from '@salesforce/label/c.PAY_ProcessDate';
import transferMethod from '@salesforce/label/c.transferMethod';
import ClientReference from '@salesforce/label/c.ClientReference';
import PaymentID from '@salesforce/label/c.PaymentID';
import PaymentReference from '@salesforce/label/c.PaymentReference';
import amountAndFees from '@salesforce/label/c.amountAndFees';
import amount from '@salesforce/label/c.amount';
import exchangeRate from '@salesforce/label/c.exchangeRate';
import indicativeExchangeRate from '@salesforce/label/c.indicativeExchangeRate';
import help from '@salesforce/label/c.help';
import B2B_PaymentSummaryValue from '@salesforce/label/c.B2B_PaymentSummaryValue';
import amountIn from '@salesforce/label/c.amountIn';
import EUR from '@salesforce/label/c.EUR';
import GBP from '@salesforce/label/c.GBP';
import transferFee from '@salesforce/label/c.transferFee';
import B2B_PaymentSummary3 from '@salesforce/label/c.B2B_PaymentSummary3';
import AmountToAuth from '@salesforce/label/c.AmountToAuth';
import CNF_mockeoFirmas from '@salesforce/label/c.CNF_mockeoFirmas';
import OTPWrongCheckSMS from '@salesforce/label/c.OTPWrongCheckSMS';






export default class Lwc_b2b_authorization extends  NavigationMixin(LightningElement)  {

    @track paymentData //Data of the payment.;
    @track steps //Data of the steps.;
    @track signLevel;
    @track spinner;
    @track paymentId //ID of the current payment.;
    @track source //Source lightning page;
    @track userData //User data.;
    @track accountData; // Account data.;
    @track showOTP;
    @track tokenOK;
    @track OTP;
    @track OTPErrorMessage;
    @track reload;
    @track expiredFX;
    @track reloadAction;
    @track limitsData;
    @track onwardPage = "landing-payments";
    @track spinnerVerificationCode;
    @track spinnerCountDown;
    @track dataSelectAmount;
    @track errorSign;

    @track sessionId;
    @track cometd;
    @track cometdSubscriptions;
    @track scaUid;
    @track feesString;
    @track debitAmountString;
    @track exchangeRateString;
    @track paymentAmountString;
    @track valueDateString;
    @track errorOTP;
    @track errorOTP;

    @track hasDiscardButton;
    @track steps;
    @track navigatorInfo;

    @track validateOTP;
    @track OTP;
    

    label = {
        Loading,
        Authorization,
        VerifyBeforeAuth,
        UserGroupProfileSummary,
        sourceandRecepientAccounts,
        PAY_Summary_from,
        PAY_Summary_To,
        orderingHolder,
        Beneficiary,
        orderingBank,
        beneficiaryBank,
        orderingAccount,
        beneficiaryAccount,
        Country,
        Corporate,
        taxIdDocPassport,
        paymentInformation,
        PAY_ProcessDate,
        transferMethod,
        ClientReference,
        PaymentID,
        PaymentReference,
        amountAndFees,
        amount,
        exchangeRate,
        indicativeExchangeRate,
        help,
        B2B_PaymentSummaryValue,
        amountIn,
        EUR,
        GBP,
        transferFee,
        B2B_PaymentSummary3,
        AmountToAuth,
        CNF_mockeoFirmas,
        OTPWrongCheckSMS
    }
  
    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
	19/06/2020      Bea Hill            Initial version
    */
    connectedCallback(){
        this.initComponent();
    }


    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    renderedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        loadScript(this, cometd);
        this.onCometdLoaded();
    }

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    initComponent() {

        this.debitAmountString = "";
        this.feesString= "";
        this.exchangeRateString= "";
        this.paymentAmountString= "";
        this.OTP= "";
    
        this.paymentData  = [];
        this.accountData  = [];
        this.steps = [];
        this.signLevel = [];
        this.navigatorInfo = [];
        this.expiredFX = false;
        this.hasDiscardButton = false;

        let steps = this.steps;
        steps.shownStep = 1;
        steps.focusStep = 1;
        steps.lastModifiedStep = 1;
        steps.totalSteps = 5;
        this.steps = steps;
        this.spinner = true;

        
        new Promise( (resolve, reject) => {
            if( this.label.CNF_mockeoFirmas != 'ok'){
                this.cometdSubscriptions = [];
                this.notifications = [];
            	helper.auxCometD(this.cometd,this.expiredFX,this.errorOTP,this.scaUid,
                    this.signLevel,this.cometdSubscriptions,this.localWindow,this.paymentId);
            }
            resolve('Ok');
        }, this)
        .then( (value) => {
            return helper.getNavigatorInfo(this.navigatorInfo);
        })
        .then( (value) => {
            this.navigatorInfo = value.navigatorInfoAttribute;
            return helper.getCurrentUserData();
        })
        .then( (value) => {
            this.userData = value.userDataAttribute;
            return helper.getAccountData();
        })
        .then( (value) => {
            this.accountData = value.accountDataAttribute;
            return helper.getURLParams();
        })
        .then((value) => {
            //this.signLevel = {signatory : 'true',signed : 'false',lastSign : 'true'};
            this.signLevel = value.signLevelAttribute;
            this.paymentData = value.paymentDataAttribute;
            this.paymentId = value.paymentIdAttribute;
            this.source = value.sourceAttribute;
            let payment = this.paymentData ;
            let fees = (payment.fees === undefined && payment.fees === null  ? '0' : payment.fees);
            let amount = (payment.amountSend === undefined && payment.amountSend === null ? '0' : payment.amountSend);
            payment.totalAmount = parseFloat(amount) + parseFloat(fees);
            this.paymentData = payment;
        })
        .then((value) => {
            return this.reloadFX();
        })
        /*.then((value) => {
            return this.handleConfirm();
        })*/
        .catch( (error) =>  {
            console.log(error);
            this.showToastMode(null, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
        })
        .finally( () => {
            this.spinner = false;
        });
    }

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    retrievePaymentDetails(){
        helper.getPaymentData();
    }

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    sendToLanding (discard) {
        var url = 'c__signed=' + discard;
        this.goTo(this.onwardPage, url);
    }

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    sendOTP_Strategic(event){
        var waitingAuthorizationComponent  = this.template.querySelector("c-lwc_waiting-authorization");
        waitingAuthorizationComponent.setSpinner(true);

        helper.sendOTP_Strategic(
            this.paymentData,
            this.paymentId,
            this.debitAmountString,
            this.feesString,
            this.exchangeRateString,
            this.paymentAmountString,
            this.label.CNF_mockeoFirmas,
            this.OTP,
            this.signLevel,
            this.label.OTPWrongCheckSMS,
            this.navigatorInfo)
            .then((value) => {
                this.errorSign = value.errorSignAttribute;
                this.errorOTP = value.errorOTPAttribute;
                this.spinnerVerificationCode = value.spinnerVerificationCodeAttribute;
                this.sendToLanding(true);
             })
             .catch((error) => {
                 this.spinnerCountDown = false;
                 this.errorSign = error.errorSignAttribute;
                 this.errorOTP = error.errorOTPAttribute;
                 this.spinnerVerificationCode = error.spinnerVerificationCodeAttribute;
                 
                 var isUserCashNexusOrMultiOneTrade =(this.userData  != undefined && this.userData.cashNexus  != undefined  && this.userData.multiOneTrade  != undefined ) 
                 ? (this.userData.cashNexus  === false &&  this.userData.multiOneTrade === false) : true;

                 var waitingAuthorizationComponent  = this.template.querySelector("c-lwc_waiting-authorization");
                 waitingAuthorizationComponent.setError(this.isError());
                 waitingAuthorizationComponent.setLocaluser(isUserCashNexusOrMultiOneTrade);

                 this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');

            })
            .finally(() => {
                 this.spinnerCountDown = false;
                 var waitingAuthorizationComponent  = this.template.querySelector("c-lwc_waiting-authorization");
                 waitingAuthorizationComponent.setSpinner(false);

            });

          
    }

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    isError(){
        return this.errorSign || this.expiredFX
    }

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    reloadFX(event){
        return new Promise((resolve, reject) => {
            this.reloadAction ='c.reloadFX';
            this.reload = false;
            this.scaUid = '';
            this.errorSign = true;
            this.spinnerCountDown = true;
            resolve('ok');
        }).then((value) => {
            return this.reloadFXValue(false);
        }).then( (value) => {
            return this.reloadFXValue(true);
        }).catch( (error) => {
            console.log(error);
            this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
        }).finally( () => {
            this.spinnerCountDown = false;
        });
    }


    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    reloadFXValue (feesBoolean) {
        return new Promise( (resolve, reject) => {
            let payment = this.paymentData;
            let paymentFees = ((payment.fees == undefined || payment.fees != undefined) ? '' : payment.fees);
            let paymentCurrency = ((payment.paymentCurrency == undefined || payment.paymentCurrency != undefined)   ? '' : payment.paymentCurrency);
            let feesCurrency = ((payment.feesCurrency == undefined || payment.feesCurrency != undefined)  ? '' : payment.feesCurrency);
            if (feesBoolean == true && ((paymentFees === '' || feesCurrency === '' || (paymentFees === '' &&  (paymentCurrency === feesCurrency))))) {
                resolve('ok');
            }else if (feesBoolean == false && payment.sourceCurrency === payment.beneficiaryCurrency) {
                resolve('ok');
            } else {
                getExchangeRate({
                    paymentId: this.paymentId,
                    accountData: this.accountData,
                    payment: payment,
                    feesBoolean : feesBoolean
                })
                .then((actionResult) => {
                        let stateRV = actionResult;
                        console.log(stateRV);
                        console.log(payment.amountSend);
                        if (stateRV.success) {
                            if (feesBoolean === true){
                                if (stateRV.value.convertedAmount != undefined && stateRV.value.convertedAmount != null) {
                                    payment.fees = stateRV.value.convertedAmount;
                                    if (payment.convertedAmount != null && payment.convertedAmount != undefined && payment.addFees == true) {
                                        payment.totalAmount =  parseFloat(stateRV.value.convertedAmount) + parseFloat(payment.amountSend);
                                    }
                                }
                                if (stateRV.value.output != undefined && stateRV.value.output != null) {
                                    payment.FXFeesOutput = stateRV.value.output;
                                    //payment.FXoutput = stateRV.value.output;
                                } 
                                this.paymentData =  payment;
                                this.expiredFX = false;
                                resolve('ok');     
                            } else {
                                if (stateRV.value.exchangeRate != null && stateRV.value.exchangeRate != undefined) {
                                    payment.tradeAmount = stateRV.value.exchangeRate;
                                    payment.operationNominalFxDetails.customerExchangeRate = stateRV.value.exchangeRate;
                                } 
                                if (stateRV.value.timestamp != undefined && stateRV.value.timestamp != null) {
                                    payment.timestamp = stateRV.value.timestamp;
                                }
                                if (stateRV.value.fxTimer != undefined && stateRV.value.fxTimer != null) {
                                    payment.FXDateTime = stateRV.value.fxTimer;
                                }
                                if (stateRV.value.convertedAmount != undefined && stateRV.value.convertedAmount != null) {
                                    if(stateRV.value.amountObtained == 'send'){
                                        payment.amountSend = stateRV.value.convertedAmount;
                                    }
                                    if(stateRV.value.amountObtained == 'received'){
                                        payment.amountReceive = stateRV.value.convertedAmount;
                                    }
                                    payment.convertedAmount = stateRV.value.convertedAmount;

                                    payment.amountOperative = stateRV.value.convertedAmount;
                                    if ( paymentFees != ''  && payment.addFees === true) {
                                        payment.totalAmount =  parseFloat(payment.amountSend) + parseFloat(paymentFees);
                                    }
                                    
                                }
                                if (stateRV.value.output != undefined && stateRV.value.output != null) {
                                    //payment.FXFeesOutput = stateRV.value.output;
                                    payment.FXoutput = stateRV.value.output;
                                }    
                                this.paymentData =  payment;
                                this.expiredFX = false;
                                resolve('ok');                            
                            }
                        } else {
                            reject('ko');
                        }
                    
                })
                .catch( (error)  =>{
                    reject('ko');
                });
            }
        }, this);
    }


     /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    handleConfirm(event) {
        this.spinner = true;
        this.reload = false;
        this.reloadAction = 'this.sendOTP_Strategic';
        this.spinnerVerificationCode = true;

        helper.beginAuthorize(this.signLevel,this.paymentData,this.paymentId,
                            this.debitAmountString,this.feesString,this.exchangeRateString,
                            this.paymentAmountString,this.label.CNF_mockeoFirmas,
                            this.OTP,this.label.OTPWrongCheckSMS,this.navigatorInfo)
        .then((value) => {
            this.localWindow = value.winAttribute;
            this.scaUid = value.scaUidAttribute;
            this.errorSign = value.errorSignAttribute; 
            this.errorOTP = value.errorOTPAttribute; 
            this.spinnerVerificationCode = value.spinnerVerificationCodeAttribute; 
               
            this.message = value.messageAttribute; 
            this.showOTP = value.showOTPAttribute; 

            this.sendToLanding(true);
        }).catch((error) => {
            this.errorSign = error.errorSignAttribute === undefined ? true : error.errorSignAttribute ; 
            this.errorOTP = error.errorOTPAttribute === undefined ? true : error.errorOTPAttribute ; 
            this.spinnerVerificationCode = error.spinnerVerificationCode === undefined ? false : error.spinnerVerificationCode ;  
            this.message = error.messageAttribute; 

            if(error.showOTPAttribute != undefined){
                this.showOTP = error.showOTPAttribute;  
            }
            this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
        }).finally(() => {
            this.spinnerVerificationCode = true;
            this.spinner = false;
        });
	}

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    handleAuthorize() {
        this.reload = false;
        this.reloadAction = 'this.handleAuthorize' ;
		if (this.showOTP === true) {
            helper.checkOTP();
		}
    }
      
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    onCometdLoaded(){
        var cometd = new org.cometd.CometD();
        this.cometd = cometd;
        if (this.sessionId != null) {
            this.connectCometd(this.cometd,this.sessionId,this.expiredFX,this.errorOTP,this.scaUid,
                this.signLevel,this.cometdSubscriptions,this.localWindow,this.paymentId);
        }else{
            this.auxCometD(this.cometd,this.expiredFX,this.errorOTP,this.scaUid,
                this.signLevel,this.cometdSubscriptions,this.localWindow,this.paymentId);
        }
    }


    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
   auxCometD (cometd,expiredFX,errorOTP,scaUid,signLevel,cometdSubscriptions,localWindow,paymentId){
        window.addEventListener('unload',  (event)  => {
            this.disconnectCometd(cometd,cometdSubscriptions);
        });
        getSessionId()
        .then((response)  => {
                //component.set('v.sessionId', response.getReturnValue());
                if (cometd != null) {
                    var sessionId = response;
                    this.connectCometd(cometd,sessionId,expiredFX,errorOTP,scaUid,
                                            signLevel,cometdSubscriptions,localWindow,paymentId);
                }
        })
        .catch(errors => {
            console.log('Error message: ' + errors);
        });
    }

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    // METHODS TO CONNECT WITH THE WS_OTPVALIDATION SERVICE
    connectCometd (cometd,sessionId,expiredFX,errorOTP,scaUid,
                signLevel,cometdSubscriptions,localWindow,paymentId) {
        return new Promise( (resolve, reject) => {
            var cometdUrl = window.location.protocol + '//' + window.location.hostname + '/cometd/40.0/';
            cometd.configure({
                'url': cometdUrl,
                'requestHeaders': {
                    'Authorization': 'OAuth '+ sessionId
                },
                'appendMessageTypeToURL' : false
            });
            cometd.websocketEnabled = false;
            console.log('Connecting to CometD: '+ cometdUrl);
            cometd.handshake((handshakeReply) => {
                if (handshakeReply.successful) {
                    console.log('Connected to CometD.');
                    var newSubscription = cometd.subscribe('/event/OTPValidation__e',  (platformEvent) => {
                        if(expiredFX === false && errorOTP === false){
                            if(platformEvent.data.payload.scaUid__c === scaUid){
                                var win = localWindow;
                                if(win != undefined && win != null){
                                    win.close();
                                }
                                if (platformEvent.data.payload.status__c == 'KO' || platformEvent.data.payload.status__c == 'ko') {
                                    this.errorSign =true;
                                } else {
                                    this.spinnerVerificationCode = true;
                                        let signature = signLevel;
                                        if (signature.lastSign == 'true') {
                                            helper.signPayment(paymentId,true,scaUid)
                                            .then((value) => {
                                                return helper.handleExecutePayment(this.paymentId,this.paymentData);
                                            })
                                            .then((value) => {
                                                return helper.deleteSignatureRecord(paymentId);
                                            })
                                            .then((value) => {
                                                return helper.sendNotification(this.paymentData);
                                            })
                                            .then((value) => {
                                                this.sendToLanding(true);
                                            })
                                            .catch( (error)  =>{
                                                this.errorOTP = true;
                                                this.errorSign = true;
                                            })
                                            .finally(() => {
                                                this.spinnerVerificationCode = false;
                                            });
                                        } else {
                                            helper.signPayment(paymentId,false,scaUid)
                                            .then((value) => {
                                                this.sendToLanding(true);
                                            })
                                            .catch( (error)  =>{
                                                this.errorOTP = true;
                                                this.errorSign = true;
                                            })
                                            .finally(() => {
                                                this.spinnerVerificationCode = false;
                                            });
                                        }
                                        
                                }
                            }
                        }
                    });
                    if(cometdSubscriptions != undefined){
                        var subscriptions = cometdSubscriptions;
                        subscriptions.push(newSubscription);
                        this.cometdSubscriptions = subscriptions;
                    }
                } else {
                    console.error('Failed to connected to CometD.');
                }
            });
        }, this);
    }

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    disconnectCometd(cometd,cometdSubscriptions){
        cometd.batch( () => {
            var subscriptions = cometdSubscriptions;
            if(subscriptions != undefined){
                subscriptions.forEach( (subscription) => {
                    cometd.unsubscribe(subscription);
                });
            }
        });
        this.cometdSubscriptions = [];
        cometd.disconnect();
        console.log('CometD disconnected.');
    }


        
     /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    showToastMode (event, title, body, noReload, mode) {
        //https://salesforcesas.home.blog/2019/07/16/lwc-selectors-identification-of-elements/
        //var errorToast  = this.template.querySelector("c-lwc_b2b_toast[data-my-id=errorToast]");
        var errorToast  = this.template.querySelector("c-lwc_b2b_toast");
        if (errorToast != undefined && errorToast != null) {
            if (mode === 'error') {
                errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
            }
            if (mode ==='success') {
                errorToast.openToast({
                    detail:{action : '',static : '',notificationTitle : title,bodyText : body,
                        functionTypeText : 'Success',functionTypeClass : 'Success',functionTypeClassIcon : '',
                        noReload : noReload,landing : ''
                        }
                    });
                }
        }
    }

    /*
    Author:        	Beatrice Hill
    Company:        Deloitte
    Description:    Go to page with lightning navigation
    History:
    <Date>          <Author>            <Description>
    23/06/2020      Beatrice Hill       Adapted from CMP_AccountsCardRow
    */
    goTo(page, url){
        if(url != undefined && url != ''){
            helper.encrypt(url)
            .then((results) => {
                this[NavigationMixin.Navigate]({
                    "type": "comm__namedPage",
                    "attributes": {
                        "pageName": page
                    },
                    'state': {
                        'params': results
                    }
                });
        
            })
            .catch((error) => {
                console.log('Error doInit: ' + error);
                //this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
            })
            .finally(() => {
                console.log('Operation Finally ');
            })
        }else{
            var results  = '';
            this[NavigationMixin.Navigate]({
                    "type": "comm__namedPage",
                    "attributes": {
                        "pageName": page
                    },
                    'state': {
                        'params': results
                    }
            });
        }
    }

    get isSpinner(){
        return this.spinner === true;
    }

    get isPaymentAmountNotUndefined(){
        return this.paymentData.amount != undefined && this.paymentData.amount != null ;
    }

    get isCibAndCurrenciesNotEquals(){
        return (this.accountData.CIB === false && this.paymentData.sourceCurrency != this.paymentData.beneficiaryCurrency);
    }

    get isCibFalse(){
        return this.accountData.CIB == false;
    }

    get isPaymentDataAmountReceiveNotEmpty(){
        return this.paymentData.amountReceive != undefined && this.paymentData.amountReceive != null;
    }

    get isPaymentDataTotalAmountNotEmpty(){
        return this.paymentData.totalAmount != undefined && this.paymentData.totalAmount != null
    }

    get isCurrenciesNotEquals(){
        return this.paymentData.sourceCurrency != this.paymentData.beneficiaryCurrency;
    }

    get isSignatoryAndLastSign(){
        return this.signLevel != undefined && this.signLevel.signatory === true &&  this.signLevel.lastSign === true;
    }

    get isSignatoryAndLastSignAndCurrenciesNotEquals(){
        return this.signLevel != undefined &&  (this.signLevel.signatory === true &&  this.signLevel.lastSign === true) 
                    && (this.paymentData.sourceCurrency != this.paymentData.beneficiaryCurrency);
    }

    get isExpiredFX(){
        return this.expiredFX === false;
    }

    get classCardFooter(){
        return 'slds-card__footer ' + (this.accountData.CIB === true || this.paymentData.sourceCurrency === this.paymentData.beneficiaryCurrency) ? 'noTopBorder' : '';
    }

    get isErrorSignOrExpired(){
        return  this.errorSign || this.expiredFX ;
    }

    get labelAuthorization(){
        return this.label.Authorization;
    }
    
    get isPaymentSubjectEmpty(){
        return (this.paymentData.subject === undefined || this.paymentData.subject === null);
    }

    get isPaymentAmountSendEmpty(){
        return (this.paymentData.amountSend === undefined || this.paymentData.amountSend === null);
    }

    get isPaymentFeesEmpty(){
        return (this.paymentData.fees === undefined || this.paymentData.fees === null);
    }

    get paymentOperationNomFxExchangeRate(){
        return this.paymentData.operationNominalFxDetails.customerExchangeRate;
    }
    
    get isEmptyPaymentOperationNomFxExchangeRate(){
        return (this.paymentData.operationNominalFxDetails === undefined || this.paymentData.operationNominalFxDetails === null) 
        || (this.paymentData.operationNominalFxDetails.customerExchangeRate === undefined || this.paymentData.operationNominalFxDetails.customerExchangeRate === null);
        
    }

    get isLocalUser(){
        return this.isUserCashNexus() === false && this.isMultiOneTrade()  === false;
    }

    get isMultiOneTrade(){
        return ( this.userData  != undefined && this.userData.multiOneTrade  != undefined )   ? this.userData.multiOneTrade  : false ;
    }

    
    get isUserCashNexus(){
       return ( this.userData  != undefined && this.userData.cashNexus  != undefined   ? this.userData.cashNexus  : false );
    }

    get isUserCashNexusOrMultiOneTrade(){
        return  (this.userData  != undefined && this.userData.cashNexus  != undefined  && this.userData.multiOneTrade  != undefined ) 
                    ? (this.userData.cashNexus  === false &&  this.userData.multiOneTrade === false) : true;
    }
 
}