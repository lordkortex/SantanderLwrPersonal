import { LightningElement, api, track } from 'lwc';
import imagePack from '@salesforce/resourceUrl/Images';
import encryptData from '@salesforce/apex/CNT_B2B_ProcessHeader.encryptData';
import updateStatus from '@salesforce/apex/CNT_B2B_ProcessHeader.updateStatus';
import {loadStyle, loadScript } from 'lightning/platformResourceLoader';
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import { NavigationMixin } from 'lightning/navigation';
import Toast_Success from '@salesforce/label/c.Toast_Success';
import B2B_Button_Cancel from '@salesforce/label/c.B2B_Button_Cancel';
import B2B_Button_SaveForLater from '@salesforce/label/c.B2B_Button_SaveForLater';
import B2B_Button_Back from '@salesforce/label/c.B2B_Button_Back';
import PAY_savedSuccess from '@salesforce/label/c.PAY_savedSuccess';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';
import B2B_SaveLaterQuestion from '@salesforce/label/c.B2B_SaveLaterQuestion';
import B2B_SaveLaterDescription from '@salesforce/label/c.B2B_SaveLaterDescription';
import PAY_SaveForLater from '@salesforce/label/c.PAY_SaveForLater';
import cancel from '@salesforce/label/c.cancel';

export default class Lwc_b2b_processHeader extends NavigationMixin(LightningElement) {

    label = {
        Toast_Success,
        B2B_Button_Cancel,
        B2B_Button_SaveForLater,
        B2B_Button_Back,
        PAY_savedSuccess,
        B2B_Error_Check_Connection,
        B2B_Error_Problem_Loading,
        ERROR_NOT_RETRIEVED,        
        B2B_SaveLaterQuestion,
        B2B_SaveLaterDescription,
        PAY_SaveForLater,
        cancel
    }

    @api spinner;
    @api steps;
    @api paymentid;
    @api hasbackbutton;                                                         
    @api headerlabel = 'SANTANDER';
    @api hasdiscardbutton = false;
    @track handleCancel;
    @track showCancelModal;

    @track showSFLModal;
    @track hasSaveForLaterButton = true;

    _steps;

    imageLogo = imagePack + '/logo_symbol_red.svg';

    connectedCallback(){
        this.hasbackbutton = true;
        this.showSFLModal = false;
    }

    get steps(){
        return this._steps;
    }

    set steps(steps){
        if(steps){
            this._steps = steps;
            //if(this._steps != undefined) this.template.querySelector("c-lwc_b2b_progressBar").changeWidthSteps(this._steps);
        }        
    }


    get hasBackButtonIsTrue(){
        return this.hasbackbutton === true;
    }

    get hasSaveForLaterButtonIsTrue(){
        return this.hasSaveForLaterButton === true && this._steps.focusStep > 2;
    }

    get hasDiscardButtonIsTrue(){
        return this.hasdiscardbutton === true && this._steps.totalSteps != 0;
    }

    get showCancelModalIsTrue(){
        return this.showCancelModal === true;
    }
    
    get showSFLModalIsTrue(){
        return this.showSFLModal === true;
    }

    get classHeader(){         
        return 'slds-modal__header slds-is-fixed' + (this._steps.totalSteps === 0 ? ' oneStep':'');
    }

    get saveButtonCondition(){
        return this.hasSaveForLaterButton === true && this._steps.focusStep > 1
    }

    handleBack(event) {
        event.preventDefault();
        const selectEvent = new CustomEvent('handleback');
        this.dispatchEvent(selectEvent);

    } 

    handleShowDiscard() {
        this.showCancelModal = true;
    }
    
    handleCancelPayment(event) {
        let cancel = event.detail.cancel;
        if (cancel) {
                this.cancelPayment();
        }
        this.showCancelModal = false;
    }

    /***********  ACTUALIZACION DESPLIEGE 25-02-2021 INICIO *************/

    handleShowSaveLater() {
        this.showSFLModal =  true;
    }

    handleSavePaymentForLater() {
        let status = '001';
        let reason = '000';
        this.updateStatus(status, reason).then(response => {
                this.sendToLanding(true);
            }).catch(error => {
                console.log(error);
        }).finally(() => {
                console.log('OK');
                this.spinner = false;
        });
    }
    
    handleCloseSaveForLater() {
        this.showSFLModal = false;        
    }
    
    sendToLanding(signed) {
        try{
            var url = 'c__saveForLater=' + signed;
            this.encrypt(url)
            .then(results => {
                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        pageName: this.handleCancel
                    },
                    state: {
                        params: results
                    }
                })
                
            });
        }catch (e) { 
            console.log(e);
        } 
    }

    /***********  ACTUALIZACION DESPLIEGE 25-02-2021 FIN *************/
        
    cancelPayment() {
        let status = '990';
        let reason = '001';
        this.spinner = true;
        this.updateStatus(status,reason);
    }

    goToLanding() {
        try{
            var result="null";
            return new Promise(function (resolve, reject){
                var url ="";
               // let navService = component.find("navService");
                if(url!=''){
                    encryptData({str:url}).then((value) => {
                        this[NavigationMixin.Navigate]({
                            type: "comm__namedPage", 
                            attributes: {
                                pageName: this.handleCancel
                            },
                            state:{
                                params : value
                            }
                        });
                    })
                    .catch((error) =>{
                        console.log(error);
                        reject(error);                    
                    });
                } else {
                    this[NavigationMixin.Navigate]({
                        type: "comm__namedPage", 
                        attributes: {
                            pageName:this.handleCancel
                        },
                        state: {
                            params : ''
                        }
                    });
                }
                resolve('ok');
            });
        }catch (e) { 
            console.log(e);
        }   
    }
    
    updateStatus(status, reason) {
        try{
            var result="null";
            return new Promise(function (resolve, reject){
                let paymentId = this.paymentid;
                if(paymentId){
                    updateStatus({
                        paymentId: paymentId,
                        status: status,
                        reason: reason
                    }).then((value) => {
                        var stateRV = value;
                        console.log(stateRV);
                        if (stateRV != 'OK') {
                            this.showToast(this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false);
                            reject(this.label.ERROR_NOT_RETRIEVED);
                        } else {
                            resolve('ok');
                        }
                    }).catch((error) => {
                        if (error) {
                            if (error[0] && error[0].message) {
                                console.log("Error message: " +
                                error[0].message);
                            }
                        } else {
                            this.showToast(component, this.label.B2B_Error_Problem_Loading, this.label.B2B_Error_Check_Connection, false);
                        }              
                    });
                }
            })
        }catch(e){ 
            console.log(e);
        } 
    } 

    encrypt(data){  
        try{
            var result="null";
            return new Promise(function (resolve, reject){
                encryptData({str : JSON.stringify(data.value)})
                .then((value) => {
                    result = value;
                    resolve(result);
                 }).catch((error) => {
                    console.log(error); // TestError
                    reject(error);
                 })
            });
        } catch (e) { 
            console.log(e);
        }   
    }

    @api
    changeWidthSteps(steps){
        this.template.querySelector("c-lwc_b2b_progress-bar").changeWidthSteps(steps);       
    }

}