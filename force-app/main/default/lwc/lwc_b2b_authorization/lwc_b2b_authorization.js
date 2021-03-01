import { LightningElement, track ,api } from 'lwc';

//import SheetJS from '@salesforce/resourceUrl/SheetJS';
import cometd from '@salesforce/resourceUrl/cometd';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';
import { helper  } from './lwc_b2b_authorizationHelper.js';


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
        CNF_mockeoFirmas
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
        this.paymentData  = [];
        this.accountData  = [];
        this.steps = [];
        this.signLevel = [];
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
            	helper.auxCometD(this.cometd,this.expiredFX,this.errorOTP,this.scaUid,this.errorSign,this.signLevel,this.cometdSubscriptions);
            }
            resolve('Ok');
        }, this).then( (value) => {
            return helper.getCurrentUserData();
        }).then( (value) => {
            this.userData = value.userDataAttribute;
            return helper.getAccountData();
        }).then( (value) => {
            this.accountData = value.accountDataAttribute;
            return helper.getURLParams();
        }).then((value) => {
            this.paymentData = value.paymentDetailAttribute;
        }).catch( (error) =>  {
            console.log(error);
            this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
        }).finally( () => {
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
    sendToLanding(event){
        if (this.source != 'landing-payment-details') {
            this.sendToLandingHelper(event,false);
        } else {
            window.history.back();
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
    sendToLandingHelper (event,discard) {
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
		helper.sendOTP_Strategic(
            this.paymentData,
            this.paymentId,
            this.debitAmountString,
            this.feesString,
            this.exchangeRateString,
            this.paymentAmountString,
            this.label.CNF_mockeoFirmas,
            this.validateOTP,
            this.OTP,
            this.signLevel,
            this.OTPWrongCheckSMS)
            .then((value) => {
                this.errorSign = value.errorSignAttribute;
                this.errorOTP = value.errorOTPAttribute;
                this.spinnerVerificationCode = value.spinnerVerificationCodeAttribute;
             }).catch((error) => {
                 this.spinnerCountDown = false;
                 this.errorSign = error.errorSignAttribute;
                 this.errorOTP = error.errorOTPAttribute;
                 this.spinnerVerificationCode = error.spinnerVerificationCodeAttribute;
                 
                 var waitingAuthorizationComponent  = this.template.querySelector("c-lwc_waiting-authorization");
                 waitingAuthorizationComponent.setError(this.isError());

                 this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');

                }).finally(() => {
                 this.spinnerCountDown = false;
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
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    checkOTP(){
		helper.checkOTP();
    }

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
    */
    reloadFX() {
        this.reloadAction = this.reloadFX;
        this.scaUid = '';
        this.reload = false;
        this.errorSign = true;
        this.spinnerCountDown = true;
        helper.reloadFX(this.paymentData,this.paymentId,this.accountData)
        .then((value) => {
           this.spinnerCountDown = false;
        }).catch( (error)  =>{
            this.spinnerCountDown = false;
            this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
        }).finally(()  =>{
            this.spinnerCountDown = false;
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
    handleConfirm() {
        this.spinner = true;

        this.reload = false;
        this.reloadAction = this.sendOTP_Strategic;
        this.spinnerVerificationCode = true;

        helper.beginAuthorize(this.signLevel,this.paymentData,this.paymentId,
                            this.debitAmountString,this.feesString,this.exchangeRateString,
                            this.paymentAmountString,this.label.CNF_mockeoFirmas)
        .then((value) => {
            this.scaUid = value.scaUidAttribute;
            this.errorSign = value.errorSignAttribute; 
            this.errorOTP = value.errorOTPAttribute; 
            this.spinnerVerificationCode = value.spinnerVerificationCodeAttribute; 
            
            this.message = value.messageAttribute; 
            this.showOTP = value.showOTPAttribute; 
        }).catch((error) => {
            this.errorSign = value.errorSignAttribute; 
            this.errorOTP = value.errorOTPAttribute; 
            this.spinnerVerificationCode = value.spinnerVerificationCodeAttribute; 
            
            this.message = value.messageAttribute; 

            if(error.showOTPAttribute != undefined){
                this.showOTP = value.showOTPAttribute;  
            }
            this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
        }).finally(() => {
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
        this.reloadAction = this.handleAuthorize ;
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
            helper.connectCometd();
        }else{
            helper.auxCometD(this.cometd,this.expiredFX,this.errorOTP,this.scaUid,this.errorSign,this.signLevel,this.cometdSubscriptions);
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
                this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
            })
            .finally(() => {
                console.log('Operation Finally ');
            })
        }else{
            this.results  = '';
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
        return this.paymentData.amount != undefined;
    }

    get isCibAndCurrenciesNotEquals(){
        return (this.accountData.CIB === false && this.paymentData.sourceCurrency != this.paymentData.beneficiaryCurrency);
    }

    get isCibFalse(){
        return this.accountData.CIB == false;
    }

    get isPaymentDataAmountReceiveNotEmpty(){
        return this.paymentData.amountReceive != null;
    }

    get isPaymentDataTotalAmountNotEmpty(){
        return this.paymentData.totalAmount != undefined
    }

    get isCurrenciesNotEquals(){
        return this.paymentData.sourceCurrency != this.paymentData.beneficiaryCurrency;
    }

    get isSignatoryAndLastSign(){
        return this.signLevel.signatory === true &&  this.signLevel.lastSign === true;
    }

    get isSignatoryAndLastSignAndCurrenciesNotEquals(){
        return (this.signLevel.signatory === true &&  this.signLevel.lastSign === true) 
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
    
}