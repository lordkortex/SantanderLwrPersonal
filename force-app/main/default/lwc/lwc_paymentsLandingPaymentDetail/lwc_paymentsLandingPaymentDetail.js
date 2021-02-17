/*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
    19/06/2020      Bea Hill            Initial version
*/

import locale from '@salesforce/i18n/locale';
import shortFormat from '@salesforce/i18n/dateTime.shortDateFormat';
import timezone from '@salesforce/i18n/timeZone';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { LightningElement, track, api, wire } from "lwc";
import { NavigationMixin } from 'lightning/navigation';
import { helper  } from './lwc_paymentsLandingPaymentDetailHelper.js';


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
import PaymentIDLabel from '@salesforce/label/c.PaymentID';
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
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import PAY_SentFrom from '@salesforce/label/c.PAY_SentFrom';
import PAY_Creation from '@salesforce/label/c.PAY_Creation';
import Authorization from '@salesforce/label/c.Authorization';
import PAY_InProgress from '@salesforce/label/c.PAY_InProgress';
import completed from '@salesforce/label/c.completed';
import PAY_Rejected from '@salesforce/label/c.PAY_Rejected';
import Pay_YesDiscard from '@salesforce/label/c.Pay_YesDiscard';
import No from '@salesforce/label/c.No';
import Int from '@salesforce/label/c.Int';
import PAY_DiscardDate1 from '@salesforce/label/c.PAY_DiscardDate1';
import PAY_DiscardDate2 from '@salesforce/label/c.PAY_DiscardDate2';
import PAY_ThePaymentHasBeenCanceled from '@salesforce/label/c.PAY_ThePaymentHasBeenCanceled';



export default class Lwc_paymentsLandingPaymentDetail extends NavigationMixin(LightningElement) {

    @api showCancelModal = false;
    @api showMoreDetail = false;
    @api landingPage;
    
    @track isLoading = false;
    @track isRendered;
    @track fromUtilityBar = false;
    @track fromDetail = false;
    @track action;
    @track showRedo;
    @track spinner;
    @track currentUser;
    @track continente;
    @track signLevel;
    @track trackingstep;
    @track opStep1DataValueData;
    
    @track paymentID;
    @track payment = [];
    @track actions = [];

    @track showDiscardModal // Indicates if the discard payment modal is show.;
    @track convertToUserTimezone;
    @track dateToFormat;
    @track formattedDate;
    @track signCheck;
    @track clientReference;

    

    
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
        PaymentIDLabel,
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
        cancel,
        ERROR_NOT_RETRIEVED,
        B2B_Error_Problem_Loading,
        B2B_Error_Check_Connection,
        PAY_SentFrom,
        PAY_Creation,
        Authorization,
        PAY_InProgress,
        completed,
        PAY_Rejected,
        Pay_YesDiscard,
        No,
        Int,
        PAY_DiscardDate1,
        PAY_DiscardDate2,
        PAY_ThePaymentHasBeenCanceled
    };


    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
	19/06/2020      Bea Hill            Initial version
    */
    connectedCallback(){
        this.doInit();
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
    }

    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
	19/06/2020      Bea Hill            Initial version
    */
    //@api async  doInit(event) {
    doInit(event) {
        //this.isLoading = true;
        this.showRedo = false;
        this.convertToUserTimezone = true;
        this.signCheck = false;
        this.landingPage = 'landing-payments';

        helper.getURLParams()
        .then((result) => {
            console.log('Operation getURLParams ' + result);
            this.currentUser = result.currentUserAttribute;
            this.paymentID = result.paymentIDAttribute;
            return helper.getPaymentDetails(event,this.paymentID);
        })
        .then((result) => {
            console.log('Operation getPaymentDetails ' + result);
            this.payment  = result.paymentDetailAttribute;
            this.clientReference = this.payment.clientReference;
            this.opStep1DataValueData =  this.payment.operationStep1Data.valueDate;
            return helper.getSignatureLevel(event,this.paymentID);
        })
        .then((result) => {
            console.log('Operation getSignatureLevel ' + result);
            this.signCheck = true;
            this.signLevel = result.signLevelAttribute;
            this.template.querySelector("c-lwc_payments-landing-payment-tracking").helperInit(this.payment, this.currentUser,this.signLevel);
            return helper.configureButtons(event,this.payment, this.currentUser,this.signLevel);
        })
        .then((result) => {
            console.log('Operation configureButtons ' + result);
            this.actions = result.actionsAttribute;
            return helper.getCurrentUserData();
        })
        .then((result) => {
            console.log('Operation getUserData ' + result);
            this.currentUser = result.userDataAttribute;
            return helper.getAccountData();
        })
        .then((result) => {
            console.log('Operation getAccountData ' + result);
            this.accountData = result.accountDataAttribute;
        })
        .catch((error) => {
            console.log('Error doInit: ' + error);
            this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
        })
        .finally(() => {
            console.log('Operation Finally ');
            this.isLoading = false ;
            this.template.querySelectorAll('c-lwc_display-date').forEach(element => {
                element.formatDate();
            });
            this.enableActions();
        })
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
        this.goTo(page, url);
       
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
        //document.querySelector('.comm-page-custom-landing-payment-details').style.overflow = 'hidden';
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
        //document.querySelector('.comm-page-custom-landing-payment-details').style.overflow = 'hidden';
        this.action = 'Reject';
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
    @api closeAction(){
        this.showRedo = false;
    }



      /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Handle clicking 'Edit payment' button; prepare data to send and navigate to payment process
    History:
    <Date>          <Author>            <Description>
	23/06/2020      Bea Hill            Initial version
    27/11/2020		Shahad Naji			Removes transaction from transactional counters for accumulated limits according to 
    									the productId of the selected payment 
    */
    handleEdit(event) {

        helper.reverseLimits(event,this.payment)
        .then(value  => { 
                return helper.updateStatusEditPayment(event,this.paymentID);
        })
        .then(value => { 
            var page = 'payments-b2b';
            var url ='';
            var source= 'landing-payment-details';
            var paymentId = this.paymentID;
            if (paymentId != undefined && paymentId != null) {
                url = 
                    'c__source=' + source +
                    '&c__paymentId=' + paymentId +
                    '&c__paymentDetails=' + JSON.stringify(this.payment);
            }
            this.goTo(page, url);
        }).catch(error => {
            console.log('Error edit: ' + error);
            this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
        }).finally(() => {
            this.spinner = false;
        });
    }



       /*
	Author:        	Adrian Munio
    Company:        Deloitte
	Description:    Handle clicking 'Reuse payment' button; prepare data to send and navigate to payment process
    History:
    <Date>          <Author>            <Description>
	25/08/2020      Adrian Munio        Initial version
    */
    handleReuse (event) {
        var page = 'payments-b2b';
        var url ='';
        var source= 'landing-payment-details';
        var paymentId = this.paymentID;
        if (paymentId != undefined) {
            url = 
                'c__source=' + source +
                '&c__reuse=' + true +
                '&c__paymentDetails=' + JSON.stringify(this.payment);
        }
        this.goTo(page, url);
        
    }


    /*
	Author:        	Adrian Munio
    Company:        Deloitte
	Description:    Handle clicking 'Reuse payment' button; prepare data to send and navigate to payment process
    History:
    <Date>          <Author>            <Description>
	25/08/2020      Adrian Munio        Initial version
    */
   handleAuthorize (event) {
		let signature = this.signLevel;
        if (signature != null && signature.lastSign === 'true') {
            this.isLoading = true;
            helper.reloadFX(event, false, this.paymentID, this.payment, this.accountData)
            .then(value => {
                return helper.reloadFX( event, true, this.paymentID, this.payment, this.accountData);
            })
            .then(value => {
                this.payment = value.paymentAttribute;
                return helper.checkAccounts(event,this.payment);
            })
            .then(value => {
                var page = 'authorizationfinal'; 
                var url = '';
                var source = 'landing-payment-details';
                var paymentId = this.paymentID;
                var paymentDraft = this.payment;
                var payment = this.payment;
                console.log(payment.fees);
                if (paymentDraft.feesDRAFT != undefined) {
                    payment.fees = paymentDraft.feesDRAFT;
                }
                if (paymentDraft.FXFeesOutputDRAFT != undefined) {
                	payment.FXFeesOutput = paymentDraft.FXFeesOutputDRAFT;
                }
                if (paymentDraft.feesFXDateTimeDRAFT != undefined) {
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
                    if (paymentDraft.amountSendDRAFT != undefined) {
                    	payment.amountSend = paymentDraft.amountSendDRAFT;
                    }
                    if (paymentDraft.amountReceiveDRAFT != undefined) {
                    	payment.amountReceive = paymentDraft.amountReceiveDRAFT;
                    }
                }
                
                var total = 0;
                if (payment.fees != undefined) {
                    total = parseFloat(payment.amountSend) + parseFloat(payment.fees);
                }else{
                    total = parseFloat(payment.amountSend)
                }
                payment.totalAmount = total;
                
                this.payment = payment; 
                
                if (paymentId != undefined) {
                    url = 
                        'c__source=' + source +
                        '&c__paymentId=' + paymentId +
                        '&c__paymentDetails=' + JSON.stringify(this.payment) +
                        '&c__signatoryDetails=' + JSON.stringify(signature);
                }
                this.goTo( page, url);
            }).catch(error => {
                console.log(error);
                this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');

            }).finally( () => {
                this.isLoading = false;
            });
        } else {
            var page = 'authorizationfinal'; 
            var url = '';
            var source = 'landing-payment-details';
            var paymentId = this.paymentID;
            if (paymentId != undefined) {
                url = 
                'c__source=' + source +
                '&c__paymentId=' + paymentId +
                '&c__paymentDetails=' + JSON.stringify(this.payment) +
                '&c__signatoryDetails=' + JSON.stringify(signature);
            }
            this.goTo(page, url);
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
    handleReject (event) {
        this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent:'lwc_paymentsLandingPaymentDetail',controllermethod:'sendNotification',actionparameters:{'notifType' : 'reject'}});
    }

    /*
    Author:        	Antonio Matachana
    Company:        
    Description:    Show modal when cancel button is pressed
    History:
    <Date>          <Author>            <Description>
    09/11/2020      Antonio Matachana       Initial version
    */
    showCancelPaymentModal (event) {
        this.fromUtilityBar = false;
        this.fromDetail = false;
        this.showCancelModal = true;
    }

    /*
    Author:         Antonio Matachana
    Company:        
    Description:    Execute cancelSelectedPayment if button cancel is pressed
    History:
    <Date>          <Author>                <Description>
    09/11/2020      Antonio Matachana       Initial version
    */
   handleCancelSelectedPayment(event) {
        this.showCancelModal = false; 
        var cancel = event.detail.cancel;
        if (cancel) {
            //this.isLoading = true;
            helper.reverseLimits(event,this.payment)
            .then(value => {
                this.action = 'Cancel';
                return helper.cancelSelectedPayment(event, this.payment);
            })
            .then(value => {
                if(value === 'ok'){
                    var payment = this.payment;
                    var msg = this.label.PAY_ThePaymentHasBeenCanceled;
                    this.clientReference = payment.clientReference;
                    msg = msg.replace('{0}', this.clientReference);
                    this.showToastMode( event, msg, '', true, 'success');
                }else{
                    return Promise.resolve('OK');
                }
            })
            .catch(error => {
                console.log('Error handleCancelSelectedPayment: ' + error);
                this.showToastMode( event, this.label.B2B_Error_Problem_Loading, error, true, 'error');
            }).finally(() => {      
                this.isLoading = false;          
            })
        }
    }

    /***********************************************************************************************************/

    /*
        Author:         Julián Hoyos
        Company:        
        Description:    Method to show Discard Pop-up
        History:
        <Date>          <Author>                <Description>
        01/01/2021      Julian Hoyos       Initial version
    */
    handleshowDiscardModal() {
        var formatDate =  this.currentUser.dateFormat;
        this.formatUserDate(formatDate)
        .then(value => { 
            this.showDiscardModal = true;
            return Promise.resolve('OK');            
        })
        .catch(error => {
            console.log('Error reject: ' + error);
        })
        .finally(() => {
        });
        
    }

    /*
        Author:         Julián Hoyos
        Company:        
        Description:    Method to control discard payment from Discard Pop-up
        History:
        <Date>          <Author>                <Description>
        01/01/2021      Julian Hoyos       Initial version
    */
    handleDiscard(event) {
        this.showDiscardModal = false;
        this.spinner = true;    
        return helper.goToDiscard(event,this.payment)
        .then(value => { 
            this.sendToLanding(event, true);
        }).catch(error => {
            console.log(error);
            this.showToastMode(event, this.label.B2B_Error_Problem_Loading, error, true, 'error');
        }).finally(() => {
            console.log('OK');
            this.spinner = false;
        });
    }

    /*
        Author:         Julián Hoyos
        Company:        
        Description:    Method to close Discard Pop-up
        History:
        <Date>          <Author>                <Description>
        01/01/2021      Julian Hoyos       Initial version
    */
    handleCloseDiscard(event) {
        this.showDiscardModal = false;
    }

    /*
        Author:         Julián Hoyos
        Company:        
        Description:    Method to control send to landing from action
        History:
        <Date>          <Author>                <Description>
        01/01/2021      Julian Hoyos       Initial version
    */
    /*sendToLanding(event) {
        if (this.source != 'landing-payment-details') {
            helper.sendToLanding(event, helper,false);
        } else {
            window.history.back();
        }
    }*/


    reload(){
        return '';
        
    }


    showToastMode (event, title, body, noReload, mode) {
        //https://salesforcesas.home.blog/2019/07/16/lwc-selectors-identification-of-elements/
        //var errorToast  = this.template.querySelector("c-lwc_b2b_toast[data-my-id=errorToast]");
        var errorToast  = this.template.querySelector("c-lwc_b2b_toast");

        if (errorToast != undefined && errorToast != null) {
            if (mode === 'error') {
                errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
            }
            if (mode ==='success') {
                errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', noReload);
            }
        }
    }

    showToast ( event, title, body, noReload) {
        //var errorToast = component.find('errorToast');
        var errorToast  = this.template.querySelector("lwc_b2b_toast");
        if (errorToast != undefined && errorToast != null) {
            errorToast.openToast(false, false, title, body, 'Error', 'warning', 'warning', noReload);
        }
    }

       //PARCHE_FLOWERPOWER JHM
    //CÓDIGO REPLICADO A FALTA DE AVERIGUAR COMO UTILIZAR LA FUNCIÓN .FIND DE UN MÉTODO DE OTRO COMPONENTE
    formatUserDate(response){
        return new Promise( (resolve, reject) => {  
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
        }, this); 

    }


    getDateStringBasedOnTimezone(dateToFormat){
        try{
            this.formattedDate = dateToFormat.toLocaleString({timeZone: timezone});		
        }catch(e){
            console.log(e);
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
   async goTo(page, url){

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
    

    sendToLanding (event,discard) {
        var url = 'c__discard=' + discard;
        this.goTo(this.landingPage, url);
    }


    enableActions(){
        this.actions.edit= true;
        this.actions.discard= true;
        this.actions.reuse= true;
        this.actions.addToTemplate= false;
        this.actions.authorize= true;
        this.actions.reject= true;
        this.actions.sendToReview= true;
        this.actions.trySaveAgain= false;
        this.actions.gpiTracker= false;
        this.actions.cancel= true;
    }

    get isPaymentRejected(){
        return (this.payment.paymentStatus === '999' || this.payment.paymentStatus === '998');
    }

    get isPaymentInProgress(){
        return this.payment.trackingStep === 'In progress';
    }

    get isPaymentOnHold(){
        return this.payment.paymentStatus === '800';
    }

    get isPaymentCompleted(){
        return ( this.payment.trackingStep === 'Completed');
    }

    get isPaymentPending(){
        return (this.payment.trackingStep === 'Authorization');
    }

    get isPaymentFeesEmpty(){
        return this.payment.fees === undefined || this.payment.fees === null;
    }

    get isPaymentEmpty(){
        return this.payment === undefined || this.payment === null;
    }

    get isShowCancelModal(){
        return this.showCancelModal === true;
    }

    get subDate(){
        return this.label.PAY_SentFrom + ' ' + this.payment.sourceBank;
    }

    get userPreferredNumberFormat(){
        var numberFormat = '###.###.###,##';
        if(this.currentUser != undefined){
            numberFormat = this.currentUser.numberFormat;
        }
        return numberFormat;
    }
    
    get userPreferredDateFormat(){
        var dateFormat = 'MM/dd/yyyy';
        if(this.currentUser != undefined){
            dateFormat = this.currentUser.dateFormat;
        }
        return dateFormat;
    }

    get statusUpdateDate(){
        return this.payment.statusUpdateDate;
    }

    get currentUserDataString(){
        return JSON.stringify(this.currentUser);
    }

    get paymentString(){
        return JSON.stringify(this.payment);
    }

    get isShowMoreDetailClass(){
        return 'transactionDetail' + (this.showMoreDetail ? ' unfolded':'');
    }

    get paymentOperationStep1Data(){
        return this.opStep1DataValueData;
    }

    get isNotLoadingAndPaymentEmpty(){
        return (this.isLoading == false &&  (this.payment != undefined && this.payment != null));
    }

    get isPaymentStatus001(){
        return this.payment.paymentStatus === '001';
    }

    get isPaymentStatus002(){
        return this.payment.paymentStatus === '002';
    }

    get isPaymentStatus003(){
        return this.payment.paymentStatus === '003';
    }

    get isPaymentStatus997(){
        return this.payment.paymentStatus === '997';
    }

    get isPaymentStatus101(){
        return this.payment.paymentStatus === '101';
    }

    get isPaymentStatus201(){
        return this.payment.paymentStatus === '201';
    }

    get isPaymentStatus998(){
        return this.payment.paymentStatus === '998';
    }

    get isPaymentStatus202(){
        return this.payment.paymentStatus === '202';
    }
    
    get isPaymentStatus999(){
        return this.payment.paymentStatus === '999';
    }

    get isPaymentStatus102(){
        return this.payment.paymentStatus === '102';
    }

    get isPaymentStatus801(){
        return this.payment.paymentStatus === '801';
    }

    get isPaymentStatus800(){
        return this.payment.paymentStatus === '800';
    }

    get isPaymentStatus103(){
        return this.payment.paymentStatus === '103';
    }

    get isPaymentDestinationCountryCL(){
        return this.payment.destinationCountry === 'CL';
    }

    get isParsedCommercialCodeNotEmpty(){
        return this.payment.parsedCommercialCode != undefined && this.payment.parsedCommercialCode != null ;
    }

    get isSourceFeeDataNotEmpty(){
        return this.payment.sourceFeeData != undefined && this.payment.sourceFeeData != null 
         && (this.payment.sourceFeeData.name != '' || this.payment.sourceFeeData.parsedCountry != '' );

        
    }

    get isSourceFeeDataSourceAgentNotEmpty(){
        return this.payment.sourceFeeData != undefined && this.payment.sourceFeeData != null
                && this.payment.sourceFeeData.sourceAgent != undefined 
                && this.payment.sourceFeeData.sourceAgent != null 
                && this.payment.sourceFeeData.sourceAgent.name != '';
    }

    get isSourceFeeDataSourceAccountNotEmpty(){
        return this.payment.sourceFeeData != undefined && this.payment.sourceFeeData != null
                    && this.payment.sourceFeeData.sourceAccount != undefined && this.payment.sourceFeeData.sourceAccount != null ;
    }

    get isSourceFeeDataSourceAccountAccountIdNotEmpty(){
        return this.payment.sourceFeeData != undefined && this.payment.sourceFeeData != null
                    && this.payment.sourceFeeData.sourceAccount != undefined && this.payment.sourceFeeData.sourceAccount != null 
                    && this.payment.sourceFeeData.sourceAccount.accountId != undefined 
                    && this.payment.sourceFeeData.sourceAccount.accountId != null
                    && this.payment.sourceFeeData.sourceAccount.accountId != '' ;
    }

    get isShowDiscardModal(){
        return this.showDiscardModal === true;
    }

    get headingMsg(){
        return this.label.PAY_discardPayment + ' ' + this.payment.clientReference + ' ' + this.label.Int;
    }

    get contentMsg(){
        return this.label.PAY_DiscardDate1 + ' ' + this.payment.draftDate + ' ' + this.label.PAY_DiscardDate2;
    }

    
    get contentMsg(){
        return this.label.PAY_DiscardDate1 + ' ' + this.payment.draftDate + ' ' + this.label.PAY_DiscardDate2;
    }

}
