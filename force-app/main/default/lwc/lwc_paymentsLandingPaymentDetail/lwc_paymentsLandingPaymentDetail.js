/*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
*/

import { LightningElement, track, api, wire } from "lwc";
import { helper  } from './lwc_paymentsLandingPaymentDetailHelper.js';

//Import Apex Methods


//Import Labels
import back from '@salesforce/label/c.back';
import PAY_TransactionDetail from '@salesforce/label/c.PAY_TransactionDetail';
import T_Print from '@salesforce/label/c.T_Print';
import PAY_StatusUpdate from '@salesforce/label/c.PAY_StatusUpdate';
import amount from '@salesforce/label/c.amount';
import Fees from '@salesforce/label/c.Fees';
import PAY_Not_Available from '@salesforce/label/c.PAY_Not_Available';
import fromlabel from '@salesforce/label/c.from';
import to from '@salesforce/label/c.to';
import paymentInformation from '@salesforce/label/c.paymentInformation';
import orderingAccount from '@salesforce/label/c.orderingAccount';
import Beneficiary from '@salesforce/label/c.Beneficiary';
import PAY_ClientReference from '@salesforce/label/c.PAY_ClientReference';
import PaymentMethod from '@salesforce/label/c.PaymentMethod';
import charges from '@salesforce/label/c.charges';
import PAY_OrderingHolder from '@salesforce/label/c.PAY_OrderingHolder';
import Country from '@salesforce/label/c.Country';
import Corporate from '@salesforce/label/c.Corporate';
import PAY_AccountHolder from '@salesforce/label/c.PAY_AccountHolder';
import PAY_Beneficiary_bank from '@salesforce/label/c.PAY_Beneficiary_bank';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import PAY_SwiftCode from '@salesforce/label/c.PAY_SwiftCode';
import PAY_ProcessDate from '@salesforce/label/c.PAY_ProcessDate';
import PaymentID from '@salesforce/label/c.PaymentID';
import reference from '@salesforce/label/c.reference';
import MoreDetail from '@salesforce/label/c.MoreDetail';
import LessDetail from '@salesforce/label/c.LessDetail';
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


export default class Lwc_paymentsLandingPaymentDetail extends NavigationMixin(LightningElement) {

    @api loading = false;
    @api showCancelModal = false;
    @api showMoreDetail = false;
    @api landingPage;
    
    
    @track action;
    @track showRedo;
    @track spinner;
    
    
    @track payment = [];
    @track actions = [];

    
    dinamycClasses = {  transactionDetail: {true: 'transactionDetail unfolded', false: 'transactionDetail' }};



    label = {
        back,
        PAY_TransactionDetail,
        T_Print,
        PAY_StatusUpdate,
        amount,
        Fees,
        PAY_Not_Available,
        fromlabel,
        to,
        paymentInformation,
        orderingAccount,
        Beneficiary,
        PAY_ClientReference,
        PaymentMethod,
        charges,
        PAY_OrderingHolder,
        Country,
        Corporate,
        PAY_AccountHolder,
        PAY_Beneficiary_bank,
        beneficiaryAccount,
        PAY_SwiftCode,
        PAY_ProcessDate,
        PaymentID,
        reference,
        MoreDetail,
        LessDetail,
        editPayment,
        PAY_discardPayment,
        PAY_reusePayment,
        PAY_addToTemplate,
        Authorize,
        reject,
        PAY_SendToReview,
        PAY_trySaveAgain,
        PAY_goToGpiTracker,
        cancel
    };


    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
	19/06/2020      Bea Hill            Initial version
    */
    doInit(){


        helper.getUrlParams()
        .then(result => {
            return helper.getPaymentDetails();
        })
        .then(result => {
            return helper.getSignatureLevel();
        })
        .then(result => {
            return helper.configureButtons();
        })
        .then(result => {
            return helper.getUserData();
        })
        .then(result => {
            return helper.getAccountData();
        })
        .catch(error => {
            console.log('error', error);
        })
        .finally(() => this.loading = false );


     
    }
  
    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Navigate to landing page
    History:
    <Date>          <Author>            <Description>
	18/06/2020      Bea Hill            Initial version - adapted from B2B
    */
    handleBack(event) {
        var url = '';
        var page = this.landingPage;
        helper.goTo(page, url);
       
    }

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Prints what is shown on the screen
    History:
    <Date>          <Author>            <Description>
    28/05/2020      Shahad Naji         Initial version
    18/06/2020      Bea Hill            Adapted from CMP_PaymentsLandingFilters
    */
    printScreen(event) {
        window.print();
    }

    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Show additional payment details
    History:
    <Date>          <Author>            <Description>
	18/06/2020      Bea Hill            Initial version
    */
    moreDetail(event) {
        this.showMoreDetail = true;
    }

    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Hide additional payment details
    History:
    <Date>          <Author>            <Description>
	18/06/2020      Bea Hill            Initial version
    */
    lessDetail(event) {
        this.showMoreDetail = false;
    }


    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Go to Redo page on clicking 'Send to review' button
    History:
    <Date>          <Author>            <Description>
	23/06/2020      Bea Hill            Initial version
    26/06/2020      Shahad Naji         Hide page scroll
    */
    goToRedo(event) {
        document.querySelector('.comm-page-custom-landing-payment-details').style.overflow = 'hidden';
        this.action = 'Review';
        this.showRedo = true;
    }

     /*
	Author:        	Adrian Munio
    Company:        Deloitte
	Description:    Go to Reject page on clicking 'Reject' button
    History:
    <Date>          <Author>            <Description>
	23/06/2020      Adrian Munio        Initial version
    */
    goToReject(event) {
        document.querySelector('.comm-page-custom-landing-payment-details').style.overflow = 'hidden';
        this.action = 'Reject';
        this.showRedo = true;
     }

    /*
    Author:        	Adrian Munio
    Company:        Deloitte
    Description:    Go to Discard page on clicking 'Discard' button
    History:
    <Date>          <Author>            <Description>
    14/09/2020      Adrian Munio        Initial version
    */
    goToDiscard(event){
        this.spinner = true;
        /*helper.handleDiscardPayment(component, event, helper).catch($A.getCallback(function (error) {
            console.log('error');
        })).finally($A.getCallback(function() {
            this.spinner = true;
        }));*/
    }


     /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Handle clicking 'Edit payment' button; prepare data to send and navigate to payment process
    History:
    <Date>          <Author>            <Description>
	23/06/2020      Bea Hill            Initial version
    */
   handleEdit(event){
        /*return helper.updateStatusEditPayment(component, event, helper)
        .then($A.getCallback(function (value) { 
            var page = 'payments-b2b';
            var url ='';
            var source= 'landing-payment-details';
            var paymentId = component.get('v.paymentID');
            if (!$A.util.isEmpty(paymentId)) {
                url = 
                'c__source=' + source +
                '&c__paymentId=' + paymentId +
                '&c__paymentDetails=' + JSON.stringify(component.get('v.payment'));
            }
            helper.goTo(component, event, page, url);
        })).catch($A.getCallback(function (error) {
            console.log('Error edit: ' + error);
        })).finally($A.getCallback(function() {
            component.set('v.spinner', false);
        }));*/
    }

    /*
	Author:        	Adrian Munio
    Company:        Deloitte
	Description:    Handle clicking 'Reuse payment' button; prepare data to send and navigate to payment process
    History:
    <Date>          <Author>            <Description>
	25/08/2020      Adrian Munio        Initial version
    */
    handleReuse(event){
        //helper.createNewPayment(component, event, helper);
    }

    /*
	Author:        	Adrian Munio
    Company:        Deloitte
	Description:    Handle clicking 'Reuse payment' button; prepare data to send and navigate to payment process
    History:
    <Date>          <Author>            <Description>
	25/08/2020      Adrian Munio        Initial version
    */
    handleAuthorize(event){
		let signature = component.get('v.signLevel');
        if (signature.lastSign == 'true') {
            component.set('v.isLoading', true);
            helper.reloadFX(component, event, helper, false)
            .then($A.getCallback(function (value) {
                return helper.reloadFX(component, event, helper, true);
            })).then($A.getCallback(function (value) {
                return helper.checkAccounts(component, event, helper);
            })).then($A.getCallback(function (value) {
                var page = 'authorizationfinal'; 
                var url = '';
                var source = 'landing-payment-details';
                var paymentId = component.get('v.paymentID');
                var paymentDraft = component.get('v.payment');
                var payment = component.get('v.payment');
                console.log(payment.fees);
                if (!$A.util.isEmpty(paymentDraft.feesDRAFT)) {
                    payment.fees = paymentDraft.feesDRAFT;
                }
                if (!$A.util.isEmpty(paymentDraft.FXFeesOutputDRAFT)) {
                	payment.FXFeesOutput = paymentDraft.FXFeesOutputDRAFT;
                }
                if (!$A.util.isEmpty(paymentDraft.feesFXDateTimeDRAFT)) {
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
                    if (!$A.util.isEmpty(paymentDraft.amountSendDRAFT)) {
                    	payment.amountSend = paymentDraft.amountSendDRAFT;
                    }
                    if (!$A.util.isEmpty(paymentDraft.amountReceiveDRAFT)) {
                    	payment.amountReceive = paymentDraft.amountReceiveDRAFT;
                    }
                }
                
                var total = 0;
                if (!$A.util.isEmpty(payment.fees)) {
                    total = parseFloat(payment.amountSend) + parseFloat(payment.fees);
                }else{
                    total = parseFloat(payment.amountSend)
                }
                payment.totalAmount = total;
                
                component.set('v.payment', payment);
                
                if (!$A.util.isEmpty(paymentId)) {
                    url = 
                        'c__source=' + source +
                        '&c__paymentId=' + paymentId +
                        '&c__paymentDetails=' + JSON.stringify(component.get('v.payment')) +
                        '&c__signatoryDetails=' + JSON.stringify(signature);
                }
                helper.goTo(component, event, page, url);
            })).catch($A.getCallback(function (error) {
                console.log(error);
            })).finally($A.getCallback(function() {
                component.set('v.isLoading', false);
            }));
        } else {
            var page = 'authorizationfinal'; 
            var url = '';
            var source = 'landing-payment-details';
            var paymentId = component.get('v.paymentID');
            if (!$A.util.isEmpty(paymentId)) {
                url = 
                'c__source=' + source +
                '&c__paymentId=' + paymentId +
                '&c__paymentDetails=' + JSON.stringify(component.get('v.payment')) +
                '&c__signatoryDetails=' + JSON.stringify(signature);
            }
            return helper.goTo(component, event, page, url);
        }
    }
    
    /*
	Author:        	Antonio Duarte
    Company:        Deloitte
	Description:    Handle Authorization
    History:
    <Date>          <Author>            <Description>
    24/08/2020      Antonio Duarte      Notifications demo version
    */
    handleReject(event){
        component.find('Service').callApex2(component, helper,'c.sendNotification', {'notifType' : 'reject'}, helper.notificationSent);
    }
    
    /*
	Author:        	Antonio Matachana
    Company:        
	Description:    Show modal when cancel button is pressed
    History:
    <Date>          <Author>            <Description>
    09/11/2020      Antonio Matachana       Initial version
    */
   showCancelPaymentModal(event){
        component.set('v.fromUtilityBar', false);
        component.set('v.fromDetail', true);
        component.set('v.showCancelModal', true);
    }

    /*
	Author:        	Antonio Matachana
    Company:        
	Description:    Execute cancelSelectedPayment if button cancel is pressed
    History:
    <Date>          <Author>            <Description>
    09/11/2020      Antonio Matachana       Initial version
    */
    handleCancelSelectedPayment(event) {
        component.set('v.showCancelModal', false);
        let cancel = event.getParam('cancelSelectedPayment');
        if (cancel) {
                helper.cancelSelectedPayment(component, helper);
        }
    }


    get isLoading(){
        return this.loading == true;
    }

    get isShowCancelModal(){
        return this.showCancelModal == true;
    }

    get isShowMoreDetailClass() {
        return  this.dinamycClasses.dropdownDisabled[this.showMoreDetail];
    }

    get isPaymentRejected() {
         //{!or(v.payment.paymentStatus == '999',v.payment.paymentStatus == '998')}"
        return  this.dinamycClasses.dropdownDisabled[this.showMoreDetail];
     }

    get isPaymentInProgress() {
        //"{!v.payment.trackingStep == 'In progress'}"
       return  this.dinamycClasses.dropdownDisabled[this.showMoreDetail];
    }

    get isPaymentOnHold() {
        //"{!v.payment.paymentStatus == '800'}"
       return  this.dinamycClasses.dropdownDisabled[this.showMoreDetail];
    }

    get isPaymentCompleted() {
        //{!or(v.payment.trackingStep == 'Completed', v.payment.paymentStatus == '103')}
       return  this.dinamycClasses.dropdownDisabled[this.showMoreDetail];
    }

    get isPaymentPending() {
        //{!and(v.payment.trackingStep == 'Authorization', v.payment.paymentStatus != '999')}
       return  this.dinamycClasses.dropdownDisabled[this.showMoreDetail];
    }

    get subDate() {
        //{label.PAY_SentFrom + ' ' + v.payment.sourceBank}
       return  this.dinamycClasses.dropdownDisabled[this.showMoreDetail];
    }

    get isPaymentFeesEmpty() {
        //{! empty(v.payment.fees)}"
       return  this.dinamycClasses.dropdownDisabled[this.showMoreDetail];
    }

    get isNotLoadingAndPaymentEmpty() {
        //"{!and(v.isLoading == false, not(empty(v.payment)))}"
       return  this.dinamycClasses.dropdownDisabled[this.showMoreDetail];
    }
   

}