import { LightningElement , api, track } from 'lwc';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';

//Import labels
import close                from '@salesforce/label/c.close';
import sendPaymentForReject from '@salesforce/label/c.sendPaymentForReject';
import sendPaymentForRedo   from '@salesforce/label/c.sendPaymentForRedo';
import CMP_B2B_REJECTHelp   from '@salesforce/label/c.CMP_B2B_REJECTHelp';
import CMP_B2B_REDOHelp     from '@salesforce/label/c.CMP_B2B_REDOHelp';
import Subject              from '@salesforce/label/c.Subject';
import charactersRemaining  from '@salesforce/label/c.charactersRemaining';
import MovementHistory_Description from '@salesforce/label/c.MovementHistory_Description';
import optional              from '@salesforce/label/c.optional';
import payment               from '@salesforce/label/c.payment';
import paymentProcessing     from '@salesforce/label/c.paymentProcessing';
import CMP_B2B_REJECTPaymentProcessing from '@salesforce/label/c.CMP_B2B_REJECTPaymentProcessing';
import paymentStatus         from '@salesforce/label/c.paymentStatus';
import CMP_B2B_REDOPaymentStatus from '@salesforce/label/c.CMP_B2B_REDOPaymentStatus';
import PAY_SendToReject     from '@salesforce/label/c.PAY_SendToReject'; 
import PAY_SendToReview     from '@salesforce/label/c.PAY_SendToReview'; 
import cancel               from '@salesforce/label/c.cancel'; 
import CMP_B2B_REDOMaterial from '@salesforce/label/c.CMP_B2B_REDOMaterial';
import PAY_hasToBeRejected  from '@salesforce/label/c.PAY_hasToBeRejected';
import PAY_hasToBeReviewed  from '@salesforce/label/c.PAY_hasToBeReviewed';
import PAY_ErrorCharacters  from '@salesforce/label/c.PAY_ErrorCharacters';
import PAY_reviewMessage  from '@salesforce/label/c.PAY_reviewMessage';

//Apex class
import tracking from '@salesforce/apex/CNT_B2B_REDOModal.tracking';
import sendNotification from '@salesforce/apex/CNT_B2B_REDOModal.sendNotification';
import reverseLimits from '@salesforce/apex/CNT_B2B_REDOModal.reverseLimits';





export default class Lwc_b2b_redomodal extends  NavigationMixin(LightningElement) {
	
	label ={
        close,
        sendPaymentForReject,
		sendPaymentForRedo,
		CMP_B2B_REJECTHelp,
		CMP_B2B_REDOHelp,
        Subject,
        charactersRemaining,
        MovementHistory_Description,
        optional,
        payment,
        paymentProcessing,
        CMP_B2B_REJECTPaymentProcessing,
        paymentStatus,
        CMP_B2B_REDOPaymentStatus,
        PAY_SendToReject,
        PAY_SendToReview,
        cancel,
        CMP_B2B_REDOMaterial,
        PAY_hasToBeRejected,
        PAY_hasToBeReviewed,
        PAY_ErrorCharacters,
        PAY_reviewMessage
	}

    @track values=['CSV','PDF','XML'];                  //description="List of values to populate the dropdown" />
    @track selectedValue;                               //description="Selected option from the dropdown"/>
    @track helpTextDropdown="Show More";                //description="Dropdown help text"/> 
    @track disabled="false";                            //description="Disable input field and apply disabled styles."/>
    @track value ="";                                   //description="Text entered by user"/>
    @track charactersmax=140;                           //description="Character limit"/>
    @track charactersremaining=140;                     //description="Characters remaining until reaching the limit"/>
    @track placeholder="User text";                     //description="Text for minilabel and placeholder of input field."/>
    @track source="";                                   //description="Origin page"/>
    @api payment={};
    @track currentuser;   				                //description="Current user data"/> 
    @api showredo=false;
    @track subject="";
    @track description="";
    @track errorsubject="";
    @track reviewsent;
    @track showMiniLabel=false;                         //description="Control to show mini label fro Subject field."/>
    @track charactersmaxsubject=50;                     //description="Character limit for Subject"/>
    @track charactersremainingsubject=50;               //description="Characters remaining until reaching the limit"/>
    @api clientReference="";
    @track headlinemessage=this.label.CMP_B2B_REDOMaterial;
    @api action="";
    @track spinner;                                     //description="Show spinner"/>
    @api fromutilitybar;
    _showredo;

    /*<aura:handler           name="init"   value="{!this}"         action="{!c.initComponent}"/>
    <aura:handler           name="change" value="{!v.showRedo}"   action="{!c.initValues}"/>
    <aura:registerEvent     name="toastEvent" type="c:EVT_OpenModal"/>
    <aura:handler           name="goToPaymentDetail"        event="c:EVT_PAY_GoToPaymentDetail"     action="{!c.goToPaymentDetail}" />*/

    get showredo(){
        return this._showredo;
    }

    set showredo(showredo){
        if (showredo) {
            this._showredo = this.showredo;
            //this.initValues();
        }    
    }

    get actionReject(){
        return this.action == 'Reject';
    }

    get errorSubjectClass (){
        var retorno = 'slds-form-element input';
        console.log('get ErrorSubjectClass');
        console.log('errorsubject: '+this.errorsubject);
        return  (this.errorsubject.length == 0 ? retorno : retorno + ' error ');
    }

    get checkShowMiniLabel (){
        return (this.showMiniLabel || this.subject.length != 0);
    }

    get isSubject (){
        return (this.subject.length != 0);
    }
    
    get getErrorSubject(){
        console.log('getErrorSubject');
        console.log('get errorsubject: '+this.errorsubject);
        return (this.errorsubject.length != 0);
    }

    get getplaceholder(){
        return (this.label.MovementHistory_Description+' ('+this.label.optional+')');
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
        this._showredo = true; /////Quitar tras las pruebas

        this.values=['CSV','PDF','XML'];                  
        this.helpTextDropdown="Show More";             
        this.charactersmax=140;                        
        this.charactersremaining=140;                  
        this.placeholder="User text";                  
        this.charactersmaxsubject=50;                  
        this.charactersremainingsubject=50;    
    }

    @api initComponent () {
        this.subject='';
        this.description='';
        this.errorsubject='';
        this.charactersremainingsubject=this.charactersmaxsubject;
        var msg;

        if(this.action == 'Reject'){
            msg = this.label.PAY_hasToBeRejected;
        }else{
            msg = this.label.PAY_hasToBeReviewed;
        }

        if (this.clientReference.length != 0){
            msg = msg.replace('{0}', this.clientReference);
        }
        this.headlinemessage=msg; 
    }


    goBack(event) {
        this.subject='';
        this.description='';
        this.errorsubject='';
        this.charactersremainingsubject=this.charactersmaxsubject;
        this.charactersremaining=this.charactersmax;
        console.log(JSON.parse(JSON.stringify(this.payment)));
        console.log(this.showredo);
        console.log(this.clientReference);
        console.log(this.action);
        console.log(this.headlinemessage);
        console.log(this.actionReject);
        
        this.closeModal(event);
        
    }

    initValues() {
        this.subject='';  
        this.errorsubject='';
        
        var msg;

        if(this.action == 'Reject'){
            msg = this.label.PAY_hasToBeRejected;
        }else{
            msg = this.label.PAY_hasToBeReviewed;
        }

        if (this.clientReference != undefined && this.clientReference != ''){    
            msg = msg.replace('{0}', this.clientReference);
        }
        this.headlinemessage=msg; 

    }

    handleClear(){
        this.subject='';
        let textinput = this.template.querySelector('[data-id="subject-input"]');	
        if (textinput != null) {
            textinput.value = "";
            this.subject='';
        }	
        let chars = this.charactersmaxsubject;
        this.charactersremainingsubject=chars;	
        this.errorsubject='';
        
    }
    handleFocus () { 
        this.showMiniLabel=true;
    }

    handleBlur () { 
        this.showMiniLabel=false;
    }
    
    handleInput (event) { 
        let input = this.subject;
        let chars = this.charactersmaxsubject;
        if (event.target.value != undefined) {
            input = event.target.value;
            let regexp = new RegExp('\n');
            input = input.replace(regexp, '');
            event.target.value = input;
            let length = input.length;
            chars = chars - length;
            if(chars > -1){
                this.errorsubject= '';
            }else{
                var substraction = chars * -1;
                var msg = this.label.PAY_ErrorCharacters;
                if(msg != undefined && msg != null){
                    msg  = msg.replace("{0}", substraction);
                }
                this.errorsubject= msg;
            }

        }
        this.charactersremainingsubject= chars;
        this.subject= input;
        
    }


    sendProcess() {
        var variable = 'review';
        new Promise( (resolve, reject) => {
            this.spinner = true;
            resolve('Ok');
        }).then(value => {
            return this.validateInput();
        }).then((value) => {
            return this.updatePaymentData();
        }).then((value) => {
            return this.sendNotification();
        }).then((value) => {
            return this.sendToLanding(variable, true);
        }).catch(error => {
            console.log(error);
            this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
        }).finally(() => {
            console.log('OK');
            this.spinner = false;
        });

    }

    goToPaymentDetail (){
        var payment =  this.payment;
        var paymentID = payment.paymentId;
        var url =  "c__currentUser="+JSON.stringify(component.get("v.currentUser")) +"&c__paymentID="+paymentID;
        var page = 'landing-payment-details';
        this.goTo(page, url);
    }
    
    closeModal (event) {
        event.preventDefault();
        const selectEventLowerCase = new CustomEvent('closeactionevent',{ bubbles: true });
        this.dispatchEvent(selectEventLowerCase);

         this._showRedo = false;
         var div = this.template.querySelector(".comm-page-custom-landing-payment-details");
         if(div && div.length != 0){
             this.template.querySelector(".comm-page-custom-landing-payment-details").style.overflow = 'auto';
         }
         
    }
     
    updatePaymentData () {
        return new Promise((resolve, reject) => {
            let params;
            if(this.action == "Reject"){
                params = {
                    paymentId: this.payment.paymentId,
                    status: "997",
                    reason: "001",
                    subject: this.subject,
                    description: this.description

                };
            }
            else{
                params = {
                    paymentId: this.payment.paymentId,
                    status: "003",
                    reason: "001",
                    subject: this.subject,
                    description: this.description
                };
            }

            tracking(params)
            .then((value) => {
                var  output = value;
                if(output.success){
                    resolve("ok");
                }else{
                    reject({
                        'title': this.label.B2B_Error_Problem_Loading,
                        'body': this.label.B2B_Error_Check_Connection,
                        'noReload': false
                    });
                }
            })
            .catch((error) =>{
                /*var errors = error;
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                        errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }*/
                reject({
                    'title': this.label.B2B_Error_Problem_Loading,
                    'body': this.label.B2B_Error_Check_Connection,
                    'noReload': false
                });
            });
        });
    }
     
    sendNotification (){
        return new Promise((resolve, reject) => {
            var buttonSelected = this.action;
            var notificationType = '';
            //if(!buttonSelected.isEmpty()){
            if(buttonSelected != undefined && buttonSelected != ''){
                if(buttonSelected == "Reject"){
                    notificationType = "Reject";
                }else{
                    notificationType = "Review";
                }
            }
            var paymentObj = this.payment;
            var paymentId = '';
            var paymentCreator = '';
            //if(!paymentObj.isEmpty()){
            if(paymentObj != undefined && paymentObj != ''){
                    paymentId = paymentObj.paymentId;
            }
            if(notificationType != undefined && notificationType != '' && paymentId != undefined && paymentId != ''){
            //if(!notificationType.isEmpty() && paymentId.isEmpty()){
                sendNotification({
                    notificationType: notificationType,
                    paymentId: paymentId
                })
                .then((value) => {
                    resolve('OK');
                })
                .catch((error) => {
                    /*var errors = error;
                    if (errors) {
                       if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                            errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }*/
                    reject({
                        'title': this.label.B2B_Error_Problem_Loading,
                        'body': this.label.B2B_Error_Check_Connection,
                        'noReload': false
                    });
                }); 
            }else{
                reject('KO');
            }
        });            
    }
        

    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Makes the callout to ancel a previously validated transaction, 
                    which removes it from transactional counters for accumulated limits
    History
    <Date>			<Author>			    <Description>	    
    16/09/2020		Shahad Naji				Initial version
    12/11/2020     Julian Hoyos            Change the values of reject atributes
    */    
    reverseLimits(){
        return new Promise( (resolve, reject) => {
            reverseLimits({
                paymentData: this.payment
            })
            .then((value) => {
                    var  output = value;
                    if (output != undefined && output != null && output.success) { 
                        if(output.value != undefined && output.value != null){
                            if (output.value.limitsResult.toLowerCase() != ok.toLowerCase()) { 
                                resolve('ok'); 
                            }else{
                                reject({
                                    'title': this.label.B2B_Error_Problem_Loading,
                                    'body': this.label.B2B_Error_Check_Connection,
                                    'noReload': false
                                });
                            }
                        }else{
                            resolve('ok'); 
                        }                    
                    } else {
                        reject({
                            'title': this.label.B2B_Error_Problem_Loading,
                            'body': this.label.B2B_Error_Check_Connection,
                            'noReload': false
                        });
                        
                    }
            }).catch(error => {
                console.log(error);

                /*var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }*/
                reject({
                    'title': this.label.B2B_Error_Problem_Loading,
                    'body': this.label.B2B_Error_Check_Connection,
                    'noReload': false
                });
            }).finally( () => {
                this.isLoading = false;
            });

        }, this);
    }


     
    validateInput () {
         return new Promise((resolve, reject) => {
            let subject = this.subject;
            let description = this.description;
            let maxCharsDescription = this.charactersmax;
            let maxCharsSubject = this.charactersmaxsubject;
            //if (!subject.isEmpty()) {
            if (subject != undefined && subject != '') {
                if (description.length < maxCharsDescription && subject.length < maxCharsSubject) {
                    resolve("ok");
                } else if (subject.length > maxCharsSubject){//meter mensaje de caracteres en lugar del actual
                     let length = subject.length;
                     maxCharsSubject = maxCharsSubject - length;
                     var substraction = maxCharsSubject * -1;
                     var msg = this.PAY_ErrorCharacters;
                     if(msg != undefined && msg != null){
                         msg  = msg.replace("{0}", substraction);
                     }
                     this.errorSubject = msg;
                     reject({
                         'title': null,
                         'body': null,
                         'noReload': null
                     });  
                  } else{
                     let length = description.length;
                     maxCharsDescription = maxCharsDescription - length;
                     var substraction = maxCharsDescription * -1;
                     var msg = this.PAY_ErrorCharacters;
                     if(msg != undefined && msg != null){
                         msg  = msg.replace("{0}", substraction);
                     }
                     this.errorDescription = msg;
                     reject({
                         'title': null,
                         'body': null,
                         'noReload': null
                     }); 
                  }
            } else {
                var msg = this.label.B2B_Error_Enter_Input;
                this.errorsubject = msg.replace('{0}', this.label.Subject);
                reject({
                    'title': null,
                    'body': null,
                    'noReload': null
                });          
              }
        });
    }
    
     
    showToast (title, body, noReload) {
        //var errorToast = this.template.querySelector('[data-id="toast"]');
        var errorToast = this.template.querySelector('c-lwc_b2b_toast');
        
        //if (!errorToast.isEmpty()) {
            errorToast.openToast(false, false, title, body, 'Error', 'warning', 'warning', noReload, false);
        //}
    }
    
    showSuccessToast (title, body, method) {
        //var errorToast = this.template.querySelector('[data-id="toast"]');
        var errorToast = this.template.querySelector('c-lwc_b2b_toast');
        //if (!toast.isEmpty()) {
            toast.openToast(true, false, title, body, 'Success', 'success', 'success', false,false , method);
        //}
    }

    goTo (page,url) {
        if (url != '') {
            try{
                this.encrypt(page,url);
            } catch (e) {
                console.log(e);
            }
        } else {
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
                console.log(error);
            });
        } catch (e) { 
            console.log(e);
        }  
    }


    handleReject(){
        var variable = 'reject';
        new Promise( (resolve, reject) => {
            this.spinner = true;
            resolve('Ok');
        }).then(value => {
            return  this.validateInput();
        }).then(value => {            
            return this.reverseLimits();             
        }).then(value =>  {
            return this.updatePaymentData();
        }).then(value => {
            return this.sendNotification();
        }).then(value => {
            this.sendToLanding(variable, true);
        }).catch(error => {
            console.log(error);
            this.showToastMode(event, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, true, 'error');
        }).finally( () => {
            console.log('OK');
            this.spinner = false;
        });
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


    sendToLanding (variable, signed) {
        
        var url = '';
        if (variable === 'review'){
             url = 'c__review=' + signed;
        } else if (variable === 'reject'){
             url = 'c__reject=' + signed;
        }

        this.encrypt(component, url)
        .then(results => {
            this[NavigationMixin.Navigate]({
                type: "comm__namedPage", 
                attributes: {
                    pageName: this.handleCancel
                }, 
                state: {
                    params : results
                }
            });
        });
    }



    
}