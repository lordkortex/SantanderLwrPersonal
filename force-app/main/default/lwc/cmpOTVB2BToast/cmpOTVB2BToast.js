import { LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';

// importing Custom Label
import PAY_goToPaymentDetail from '@salesforce/label/c.PAY_goToPaymentDetail';
import Reload from '@salesforce/label/c.Reload';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';
export default class CmpOTVB2BToast extends LightningElement {

    showToast;                                                      //Indicates if the toast is shown. 
    action = false;                                                 //Indicates if the toast action icon is shown (reload icon is shown if false).
    static = false;                                                 //Indicates if the toast is static.
    notificationTitle = B2B_Error_Problem_Loading;                  //Toast's title (B2B_Error_Lost_Connection, B2B_Error_Problem_Loading)
    bodyText = B2B_Error_Check_Connection;                          //Toast's body text (B2B_Error_Check_Connection)
    functionTypeText ="Error";                                      //Indicates the function type of toast message (Information, Success, Warning, Error).
    functionTypeClass ="warning";                                   //Indicates the function type class of toast message (info, success, warning, error).  
    functionTypeClassIcon ="warning";                               //Indicates the function type class of toast message (info, success, warning, error). 
    noReload = false;                                               //  Indicates if neither action nor reload icon are shown.
    reload;                                                         //  Confirm that the action must be reloaded or executed.
    landing ;                                                       //  Confirm that the action must be done in the langing or B2B page.
    method ;                                                        //  Method to be executed on clicking the action button
    paymentId ;                                                     //  Payment id

    label = {
        PAY_goToPaymentDetail,
        Reload
    }

    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    }

    connectedCallback(){
    }

    test(){
        return 'slds-notify_container slds-is-fixed ' + (this.static ? 'toast_static' : '');
    }

    test2(){
        return 'slds-notify slds-notify_toast' + (this.noReload ? ' ' : ' action') + ' slds-scrollable_y slds-theme_' + this.functionTypeClass;
    }

    test3(){
        return 'slds-icon_container slds-m-right_small slds-no-flex slds-align-top button-selected slds-icon-utility-' + this.functionTypeClassIcon + ' icon-' + this.functionTypeClassIcon;
    }

    test4(){
        return 'slds-button slds-button_icon icon-' + (this.action ? 'action': 'reload');
    }


    get conditionButton(){
        //!and(this.action && this.method != null
       if(this.action && this.method!=null ){
            return true;
        }else{
           return false;
       }
    }
    get conditonPaymentDetail(){
        if(method == 'goToPaymentDetail'){
            return true;
        }else{
            return false;
        }

    }
}