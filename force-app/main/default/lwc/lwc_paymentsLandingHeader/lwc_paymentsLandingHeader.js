import { LightningElement, api, track } from 'lwc';
//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
//Labels
import payments from '@salesforce/label/c.Payments';
import newpayment from '@salesforce/label/c.NewPayment';
import paymentslandingsubtitle from '@salesforce/label/c.PaymentsLandingSubtitle';
import single from '@salesforce/label/c.Single';
import multiple from '@salesforce/label/c.Multiple';

export default class lwc_paymentsLandingHeader extends LightningElement {

    label = {
        payments,
        newpayment,
        paymentslandingsubtitle,
        single,
        multiple 
    }

    @api userfirstname; //"Current user first name" 
    @api singlenumrecords; //"Number of records in Single tab" 
    @api multiplenumrecords; //"Number of records in Multiple tab" 
    @api issingletabselected;//true //"Attribute which detemines which tab is selected" 
    @api showmethodmodal;//false //"Controls whether the Payment Methods modal is open or not" 


    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    openMethodModal(){   
        //page name body class: comm-page-custom-landing-payments
        //this.template.querySelector(".comm-page-custom-landing-payments").style.overflow = 'hidden';
        this.showmethodmodal= true;
        const compEvent = new CustomEvent('opennewpayment');
        this.dispatchEvent(compEvent);
    }

    selectSigleTab(){
        this.issingletabselected = true;
    }

    selectMultipleTab(){
        this.issingletabselected = false;
    }

    get singleTabSelectedClass(){
        var searchValueClass='';
        if(this.issingletabselected){
            searchValueClass = 'slds-tabs_default__item slds-is-active';
        }else{
            searchValueClass = 'slds-tabs_default__item';
        }
        return searchValueClass;
    }

    get multipleTabSelectedClass(){
        var searchValueClass='';
        if(!this.issingletabselected){
            searchValueClass = 'slds-tabs_default__item slds-is-active';
        }else{
            searchValueClass = 'slds-tabs_default__item';
        }
        return searchValueClass;
    }

    get isNotSingleTabSelected(){
        if(!this.issingletabselected){
            return true;
        }else{
            return false;
        }
    }
}