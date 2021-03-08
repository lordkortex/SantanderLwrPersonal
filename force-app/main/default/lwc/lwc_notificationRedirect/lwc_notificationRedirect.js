import {LightningElement,api,track, wire} from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

import { getRecord } from 'lightning/uiRecordApi';

//Import Apex method
import getUserData from '@salesforce/apex/CNT_NotificationRedirect.getUserData';

export default class lwc_notificationRedirect extends NavigationMixin(LightningElement) {

    @api paymentRecord; //A simplified view record object to be displayed
    @api recordError; //An error message bound to recordData
    @api currentUser; //Current user data
    @api detailsPage; //Pagename of Payment Details page

    @wire(getRecord, { recordId: '$recordId', fields: ['PAY_TXT_PaymentId__c'] })
    wiredPayment({ error, data }) {
        if (data) {
            this.doInit();
        } else if (error) {
            console.log('### lwc_notificationRedirect ### wiredPayment ::: Error: ' + JSON.stringify(error));
        }
    }

    doInit() {
        this.getCurrentUserData()
        .then( (value) => {
        	return this.doRedirect();
        });
    }
    
    getCurrentUserData() {
        return new Promise(function (resolve, reject) {
            getUserData()
            .then( (result) => {
                if (result.success && result.value && result.value.userData) {
                    this.currentUser = result.value.userData;
                    resolve('getCurrentUserData_OK');
                }
            }) 
        }.bind(this)); 
    }
    
    doRedirect(){
    	if(event.getParams().changeType == "LOADED"){          
            var urlParams = 
                "c__currentUser="+JSON.stringify(this.currentUser)
                +"&c__paymentID="+this.paymentRecord.PAY_TXT_PaymentId__c; 
            var page = this.detailsPage;
            if(page != null && urlParams != null){
                this.template.querySelector('c-lwc_service-component').redirect(page, urlParams);
            }
        }else if (event.getParams().changeType == "ERROR"){
            this[navigation.NavigationMixin.Navigate]({
                type: "comm__namedPage",
                attributes: {
                  pageName: 'contact-us'
                },
                state: {
                  params: ''
                }
              });
        }
    }
    
}