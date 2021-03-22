import { LightningElement , api, track } from 'lwc';

//Import styles
import {loadStyle} from 'lightning/platformResourceLoader';
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
// DESCOMENTAR LAS LABELS UNA VEZ ESTÉN EN EL ENTORNO
import Action from '@salesforce/label/c.Action';
import Reload from '@salesforce/label/c.Reload';
import B2B_Error_Problem_Loading from '@salesforce/label/c.B2B_Error_Problem_Loading';
import B2B_Error_Check_Connection from '@salesforce/label/c.B2B_Error_Check_Connection';

export default class Lwc_b2b_toast extends LightningElement {

    //Labels
    label ={
        Action,
        Reload,
        B2B_Error_Problem_Loading,
        B2B_Error_Check_Connection
    }
    //Attributes
    @api showtoast = false;                                             //description="Indicates if the toast is shown."
    @api action = false;                                        //description="Indicates if the toast action icon is shown (reload icon is shown if false)." 
    @api static = false;                                        //description="Indicates if the toast is static." />
    @api notificationtitle;// = this.label.B2B_Error_Problem_Loading;   //description="Toast's title (B2B_Error_Lost_Connection, B2B_Error_Problem_Loading)" />
    @api bodytext;//= this.label.B2B_Error_Check_Connection;           //description="Toast's body text (B2B_Error_Check_Connection)" />
    @api functiontypetext = "Error";                            //description="Indicates the function type of toast message (Information, Success, Warning, Error)." />
    @track functionTypeClass = "warning";                       //description="Indicates the function type of toast message (Information, Success, Warning, Error)." />
    @track functionTypeClassIcon = "warning";                   //description="Indicates the function type of toast message (Information, Success, Warning, Error)." />
    @api noreload = false;                                      //description="Indicates if neither action nor reload icon are shown." />
    @api reload;                                                //description="Confirm that the action must be reloaded or executed."/>
    @track landing;                                             //description="Confirm that the action must be done in the langing or B2B page." />

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        //this.notificationtitle = this.label.B2B_Error_Problem_Loading;
        //this.bodytext = this.label.B2B_Error_Check_Connection;
        this.getFunctionTypeClass();
    }
    
    @api 
    openToast (event) {
        var params = event.detail;
        //var params = event.getParam("arguments");
        if (params) this.action=params.action;
        if (params) this.static=params.static;
        if (params) this.notificationtitle= params.notificationTitle;
        if (params) this.bodytext= params.bodyText;
        if (params) this.functiontypetext= params.functionTypeText;
        if (params) this.functionTypeClass=params.functionTypeClass;
        if (params) this.functionTypeClassIcon=params.functionTypeClassIcon;
        if (params) this.noreload= params.noReload;
        if (params) this.landing= params.landing;
        this.getFunctionTypeClass();
        this.showToast();
    }

    handleCloseToast () {
        this.hideToast();
    }

    handleActionToast () {
        this.hideToast();

        const reloadaccounts = new CustomEvent('reloadaccounts', {
            detail: {
                'reload': true,
                'landing': this.landing
            }
        });
        this.dispatchEvent(reloadaccounts);
    }

    getFunctionTypeClass () {
        var functionTypeText = this.functiontypetext ;
        //console.log(functionTypeText.localeCompare('Information'));
        var functionTypeClass = functionTypeText.toLowerCase();
        this.functionTypeClass = functionTypeClass;
        var iconClass=functionTypeClass;
        if (functionTypeText.localeCompare('Information') == 0) {
            this.functionTypeClass = 'info';
        }
        if (functionTypeText.localeCompare('Warning') == 0) {
            iconClass='caution';
        }
        if (functionTypeText.localeCompare('Error') == 0) {
            iconClass='close_emptyCircle';
        }
        if (functionTypeText.localeCompare('Success') == 0) {
            iconClass='check_circle';
        }
        this.functionTypeClassIcon = iconClass;
    }

    showToast() {
        this.showtoast = true;
    }

    hideToast() {
        this.showtoast = false;
    }
    
    get classContainer(){
        return 'slds-notify_container slds-is-fixed ' + (this.static == true ? 'toast_static' : '');
    }
    get classNotifyToast(){
        return 'slds-notify slds-notify_toast' + (this.noReload == true ? ' ' : ' action') + ' slds-scrollable_y slds-theme_' + this.functionTypeClass;
    }
    get classIcon(){
        return 'slds-icon_container slds-m-right_small slds-no-flex slds-align-top button-selected slds-icon-utility-' + this.functionTypeClassIcon + ' icon-' + this.functionTypeClassIcon;
    }
    get classButton(){
        return 'slds-button slds-button_icon icon-' + (this.action ? 'action': (this.reload ? 'reload' : ''));
    }
}