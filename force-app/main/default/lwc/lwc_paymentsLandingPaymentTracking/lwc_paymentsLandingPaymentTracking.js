import { LightningElement,api, track } from 'lwc';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';

import locale from '@salesforce/i18n/locale';

import PAY_TransactionTracking from '@salesforce/label/c.PAY_TransactionTracking';
import PAY_Creation from '@salesforce/label/c.PAY_Creation';
import Authorization from '@salesforce/label/c.Authorization';
import MoreDetail from '@salesforce/label/c.MoreDetail';
import LessDetail from '@salesforce/label/c.LessDetail';
import PAY_Rejected from '@salesforce/label/c.PAY_Rejected';
import completed from '@salesforce/label/c.completed';
import PAY_InProgress from '@salesforce/label/c.PAY_InProgress';
import PAY_paymentInfoSaved from '@salesforce/label/c.PAY_paymentInfoSaved';
import PAY_withSuccess from '@salesforce/label/c.PAY_withSuccess';
import PAY_paymentCreatedBy from '@salesforce/label/c.PAY_paymentCreatedBy';
import PAY_paymentPendingOf from '@salesforce/label/c.PAY_paymentPendingOf';
import PAY_authorization from '@salesforce/label/c.PAY_authorization';
import PAY_paymentAuthorisedBy from '@salesforce/label/c.PAY_paymentAuthorisedBy';
import PAY_paymentSentToReviewBy from '@salesforce/label/c.PAY_paymentSentToReviewBy';
import PAY_paymentDeniedBy from '@salesforce/label/c.PAY_paymentDeniedBy';
import PAY_paymentSettledWithSuccess from '@salesforce/label/c.PAY_paymentSettledWithSuccess';
import PAY_recipientReceivedPayment from '@salesforce/label/c.PAY_recipientReceivedPayment';


import PAY_wrongAmount_toast from '@salesforce/label/c.PAY_wrongAmount_toast';
import PAY_UnauthorizedByBank from '@salesforce/label/c.PAY_UnauthorizedByBank';
import PAY_ErrorOccurredWithPayment from '@salesforce/label/c.PAY_ErrorOccurredWithPayment';
import PAY_RejectedOrderingBank from '@salesforce/label/c.PAY_RejectedOrderingBank';
import PAY_RejectedTechError from '@salesforce/label/c.PAY_RejectedTechError';
import PAY_PaymentCanceledBy from '@salesforce/label/c.PAY_PaymentCanceledBy';
import PAY_feedback_toast from '@salesforce/label/c.PAY_feedback_toast';
import PAY_description_toast from '@salesforce/label/c.PAY_description_toast';
import PAY_subject_toast from '@salesforce/label/c.PAY_subject_toast';
import PAY_sendReview_toast from '@salesforce/label/c.PAY_sendReview_toast';
import PAY_feedbackOtherAuth_toast from '@salesforce/label/c.PAY_feedbackOtherAuth_toast';


import UserPreferencesRecordHomeSectionCollapseWTShown from '@salesforce/schema/User.UserPreferencesRecordHomeSectionCollapseWTShown';


export default class Lwc_paymentsLandingPaymentTracking extends LightningElement {

    label = {
        PAY_TransactionTracking,
        PAY_Creation,
        Authorization,
        MoreDetail,
        LessDetail,
        PAY_Rejected,
        completed,
        PAY_Creation,
        PAY_InProgress,
        PAY_paymentInfoSaved,
        PAY_withSuccess,
        PAY_paymentCreatedBy,
        PAY_paymentPendingOf,
        PAY_authorization,
        PAY_paymentAuthorisedBy,
        PAY_paymentSentToReviewBy,
        PAY_paymentDeniedBy,
        PAY_paymentSettledWithSuccess,
        PAY_recipientReceivedPayment,

        PAY_wrongAmount_toast,
        PAY_UnauthorizedByBank,
        PAY_ErrorOccurredWithPayment,
        PAY_RejectedOrderingBank,
        PAY_RejectedTechError,
        PAY_PaymentCanceledBy,
        PAY_feedback_toast,
        PAY_description_toast,
        PAY_subject_toast,
        PAY_sendReview_toast,
        PAY_feedbackOtherAuth_toast

    }

    @api payment; //"Details of the payment"
    @api currentuser; //"Current user data"
    @api paymentstatus = "Not authorized"; //"Status of payment"
    @api signLevel; //

    @track showmoreauth = false; //"Boolean to show or hide more detail in Authorization"
    @track showmoreinprog = false; //"Boolean to show or hide more detail in In Progress"
    @track trackingstep = 1; //"Integer to control the active tracking step: 1-Creation, 2-Authorization, 3-In Progress, 4-Completed"
    
    @track approvedauthorizers = ['Paula Díaz', 'Juan Miguel']; //"Approved authorizers"
    @track pendingauthorizers = ['Roberto Íñigo', 'Edward Jones']; //"Pending authorizers"
    @track transactioncreator = "Dani García"; //"Transaction creator"
    @track statuscode; //"Status Code"
    @track reasoncode;//"Reason Code"
    @track statushistory; //"List of status changes indicated as objects with status, reason and statusDate"
    @track currentuserDateFormat; //"Current user data"
    @track currentuserGlobalId; //"Current user data"
    

    @track isRenderComponent = false; //"Boolean to show or hide more detail in Authorization"
    @track creation; //"List of contents for Creation section"
    @track authorizationList; //"List of contents for Authorization section"
    @track inprogress; //"List of contents for In Progress section"
    @track completed;  // "List of contents for Completed section"
    @track authorizationlength; //"Number of comments in the authorization step"
    @track authorizationtopline; //"Most recent status change in the authorization step"

    @track subject; //Subject declared when sent to review
    @track description; //Description declared when sent to review
    @track isOtherAuthorizer; //"Current user is an authorizer and didn't send the payment to review
    @track reviewSenderGlobalId; //GlobalId of the user that send the payment to review

    
    get authorizationGTone(){
        //!v.authorization.length > 1
        return (this.authorizationList && this.authorizationList.length > 1);
    }

    get paymentStatus999(){
        //v.payment.paymentStatus == '999'
        return (this.payment && this.payment.paymentStatus == '999');
    }

    get trackingStepOneClass(){
        return 'slds-progress__item' +(this.trackingstep > 1 ?' slds-is-completed': (this.trackingstep == 1 ? ' slds-is-active': ' item_disabled'));
    }

    get trackingStepTwoClass(){
        return 'slds-progress__item' + (this.trackingstep > 2 ? ' slds-is-completed': (this.trackingstep == 2 ? ' slds-is-active'  + ( this.payment.paymentStatus == '999' ? ' item_error':'') : ' item_disabled'))+ ( this.paymentstatus == 'In review' ? ' item_info' : '');
    }

    get trackingStepFourClass(){
        return 'step4 slds-progress__item' + (this.trackingstep > 4 ?' slds-is-completed': (this.trackingstep == 4 ? (this.payment.paymentStatus == '999' ? ' slds-is-completed item_error' : ' slds-is-completed item_success'): ' item_disabled'));
    }

    get creationZero(){
        //creation[0]
        var ret = '';
        if(this.creation && this.creation[0]){
            ret = this.creation[0];
        }
        return ret;
    }

    get completedZero(){
        //completed[0]
        var ret = '';
        if(this.completed && this.completed[0]){
            ret = this.completed[0];
        }
        return ret;
    }

    get isShowMoreAuthClass(){
        var className = 'slds-progress__item_content' + (this.showmoreauth ? ' unfolded':'');
        console.log('isShowMoreAuthClass: ' + className);
        return className;
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.showmoreauth = false;
        this.paymentstatus = "Not authorized";
    }

    @api helperInit(paymenInput,currentUserInput,signLevelInput){
        this.payment = paymenInput;
        this.currentuser = currentUserInput;
        this.signLevel = signLevelInput;
        this.paymentstatus = paymenInput.parsedPaymentStatus;
        this.currentuserDateFormat = this.currentuser.dateFormat;
        this.currentuserGlobalId = this.currentuser.globalId;

        var status = this.payment.paymentStatus;//MWB
        var reason = this.payment.paymentReason;//MWB


        if(this.payment != undefined){

            this.trackingstep = 0;
            if (this.payment.trackingStep == this.label.PAY_Creation){
                this.trackingstep = 1;
            } else if (this.payment.trackingStep == this.label.Authorization) {
                this.trackingstep = 2;
            }else if (this.payment.trackingStep == this.label.PAY_InProgress) {
                this.trackingstep = 3;
            }else if (this.payment.trackingStep == this.label.completed) {
                this.trackingstep = 4;
            }else if (this.payment.trackingStep == this.label.PAY_Rejected) {
                this.trackingstep = 4;
            }
          
            this.handleStatusHistory(this.payment);

            if(status == '003' && reason == '001'){
                this.handleInReviewModal();
            }
    
        }
    }

    handleStatusHistory(paymenInput) {
        var payment = paymenInput;
        var statusHistory = payment.operationStatusesHistorical;
        var creationList = [];
        var authorizationListx = [];
        var inProgressList = [];
        var completedList = [];
        for (let i = 0; i < statusHistory.length; i++) {
            let statusItem = statusHistory[i];
            statusItem['indexNumber'] = i;

            if( statusItem != undefined && statusItem != null){
                console.log('locale: ' + locale + ' ' + 'statusItem.statusDate: ' + statusItem.statusDate);
                statusItem.time = 'Invalid Date';
                if(statusItem.statusDate != undefined && statusItem.statusDate != null){
                    statusItem.time =  new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(new Date(statusItem.statusDate));
                }
                if (statusItem.status === "001"  && statusItem.reason === "000") {
                    if (statusHistory.length===1) {
                        statusItem.comment1 = this.label.PAY_paymentInfoSaved;
                        statusItem.comment2 = this.label.PAY_withSuccess;
                    } else {
                        statusItem.comment1 = this.label.PAY_paymentCreatedBy;
                        statusItem.comment2 = statusItem.userName + '.';
                    }
                    creationList.push(statusItem);
                } else if (statusItem.status === "002"  && statusItem.reason === "001") {
                    statusItem.comment1 = this.label.PAY_paymentPendingOf;
                    statusItem.comment2 = this.label.PAY_authorization + '.';
                    authorizationListx.push(statusItem);
                } else if (statusItem.status === "002"  && statusItem.reason === "002") {
                    statusItem.comment1 = this.label.PAY_paymentPendingOf;//this.label.PAY_paymentAuthorisedBy 
                    statusItem.comment2 = this.label.PAY_authorization + '.';//statusItem.userName + '.';
                    authorizationListx.push(statusItem);
                }else if (statusItem.status === "003"  && statusItem.reason === "001") {
                    statusItem.comment1 = this.label.PAY_paymentSentToReviewBy;
                    statusItem.comment2 = statusItem.userName + '.';
                    this.reviewSenderGlobalId = statusItem.globalUserId;
                    authorizationListx.push(statusItem);
                }else if (statusItem.status === "997"  && statusItem.reason === "001") {
                    statusItem.comment1 = this.label.PAY_paymentDeniedBy;
                    statusItem.comment2 = statusItem.userName + '.';
                    authorizationListx.push(statusItem);
                }else if (statusItem.status === "101" && statusItem.reason === "001") {
                    statusItem.comment1 = this.label.PAY_paymentAuthorisedBy;
                    statusItem.comment2 = statusItem.userName + '.';
                    authorizationListx.push(statusItem);
                }else if (statusItem.status === "103" && statusItem.reason === "001") {
                    statusItem.comment1 = this.label.PAY_paymentSettledWithSuccess;
                    statusItem.comment2 = this.label.PAY_recipientReceivedPayment;
                    completedList.push(statusItem);
                //}else if (statusItem.status == "999" && statusItem.reason == "103") {// el 999-103 se replaza con 999-002
                //    completedList.push(statusItem);
                }else if (statusItem.status === "999" && statusItem.reason === "001") { 
                    statusItem.comment1 = this.label.PAY_RejectedOrderingBank  + '.';
                    statusItem.comment2 = '';
                    authorizationListx.push(statusItem);
                }else if (statusItem.status === "999" && statusItem.reason === "002") { 
                    statusItem.comment1 = this.label.PAY_UnauthorizedByBank;
                    statusItem.comment2 = this.label.PAY_ErrorOccurredWithPayment;
                    completedList.push(statusItem);
                }else if (statusItem.status === "999" && statusItem.reason === "003") { 
                    statusItem.comment1 = this.label.PAY_RejectedTechError  + '.';
                    statusItem.comment2 = '';
                    authorizationListx.push(statusItem);
                }else if (statusItem.status === "998" && statusItem.reason === "003") { 
                    statusItem.comment1 = this.label.PAY_PaymentCanceledBy  + '.';
                    statusItem.comment2 = statusItem.userName + '.';
                    authorizationListx.push(statusItem);
                }else {
                    console.log('Status history item not recognized: ', JSON.stringify(statusItem));
                }

            }
        }

        this.creation = creationList;
        this.authorizationList = authorizationListx;
        this.inprogress = inProgressList;
        this.completed = completedList;
        var lastAuthorizationElement = authorizationListx.length - 1;
        if (authorizationListx){
            this.authorizationlength = authorizationListx.length - 1;
            this.authorizationtopline = authorizationListx[lastAuthorizationElement];
        }

        console.log('this.creation: ' + JSON.stringify(this.creation));
        console.log('this.authorizationList: ' + JSON.stringify(this.authorizationList));
        console.log('this.inprogress: ' + JSON.stringify(this.inprogress));
        console.log('this.completed: ' + JSON.stringify(this.completed));
        console.log('this.authorizationlength: ' + JSON.stringify(this.authorizationlength));
        console.log('this.authorizationtopline: ' + this.authorizationtopline);

        this.template.querySelectorAll('c-lwc_display-date').forEach(element => {
            element.formatDate();
        });


    } 

    moreAuth() {
        this.showmoreauth = true;
    }

    lessAuth() {
        this.showmoreauth =  false;
    }

    moreInProg() {
        this.showmoreinprog = true;
    }

    lessInProg() {
        this.showMoreInProg = false;
    }


    handleInReviewModal() {
        let payment = this.payment;
        let subject = payment.reviewAdditionalData.subject;
        let description = payment.reviewAdditionalData.description;
        let currentUserGlobalId = this.currentuserGlobalId ;
        let paymentUserGlobalId = this.payment.userGlobalId;
        let signatory = this.signLevel.signatory;
        let reviewSenderGlobalId = this.reviewSenderGlobalId;


        if(currentUserGlobalId != paymentUserGlobalId
            && currentUserGlobalId != reviewSenderGlobalId
            && signatory == "true"){
                this.isOtherAuthorizer = true;
        }else{
            if (subject != undefined && subject != null){
                this.subject = subject;
            }else{
                this.subject = this.label.PAY_wrongAmount_toast;
                console.log('No se ha declarado el subject');
            }
            if(description != undefined && description != null){
                this.description = description;
            }else{
                console.log('No se ha declarado el description');
            }
        }

    }


    get authorizationtoplineTime(){
        var time = 'N/A';
        if(this.authorizationtopline != undefined && this.authorizationtopline != null){
            time = this.authorizationtopline.time;
        }
        return time;
    }


    get authorizationtoplineStatusDate(){
        var statusDate = 'Invalid Date';
        if(this.authorizationtopline != undefined && this.authorizationtopline != null){
            statusDate = this.authorizationtopline.statusDate;
        }
        return statusDate;
    }


    get authorizationtoplineComment1(){
        var comment1 = '';
        if(this.authorizationtopline != undefined && this.authorizationtopline != null){
            comment1 = this.authorizationtopline.comment1;
        }
        return comment1;
    }

    get authorizationtoplineComment2(){
        var comment2 = '';
        if(this.authorizationtopline != undefined && this.authorizationtopline != null){
            comment2 = this.authorizationtopline.comment2;
        }
        return comment2;
    }

    get authorizationString(){
        JSON.stringify(this.authorizationList);
    }

    get creationString(){
        JSON.stringify(this.creation);
    }

    get inprogressString(){
        JSON.stringify(this.inprogress);
    }

    get completedString(){
        JSON.stringify(this.completed);
    }

    get authorizationtoplineString(){
        JSON.stringify(this.authorizationtopline);
    }

    get notifyToastClass(){
        var notifyClass = 'slds-notify slds-notify_toast' + (this.currentuserGlobalId == this.payment.userGlobalId ?' slds-theme_warning slds-scrollable_y': ' slds-theme_info slds-scrollable_y');
        console.log('notifyClass ' + notifyClass);
        return  notifyClass;
    }

    get isDescriptionNotEmpty(){
        return this.description != undefined && this.description != null;
    }

    

 
    
}