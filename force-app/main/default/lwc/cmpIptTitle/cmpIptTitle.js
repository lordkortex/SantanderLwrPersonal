import { LightningElement, api, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

import getUserInformation from '@salesforce/apex/CNT_IPTTitle.getUserInformation';
import encryptData from '@salesforce/apex/CNT_IPTTitle.encryptData';

import hi from '@salesforce/label/c.hi';
import theseAreYourInternationalPayments from '@salesforce/label/c.theseAreYourInternationalPayments';
import trackByUETR from '@salesforce/label/c.TrackByUETR';

import ICONS_OBJ from '@salesforce/resourceUrl/Santander_Icons';


import { NavigationMixin } from 'lightning/navigation';


export default class CmpIptTitle extends NavigationMixin(LightningElement) {

    @api firstname;


    connectedCallback(){
        this.getUserInfohelper();

        Promise.all([
            loadStyle(this, ICONS_OBJ + '/style.css')
        ])
        .then(() => {
            console.log('Files loaded.');
        })
        .catch(error => {
            alert(error);
        });
    }

    hi = hi;
    theseAreYourInternationalPayments = theseAreYourInternationalPayments;
    trackByUETR = trackByUETR;

    /*label = {
        hi,
        theseAreYourInternationalPayments,
        trackByUETR
    }*/

    getUserInfohelper(){
        try {
            getUserInformation().then((results)=>{
                console.log("UserInfo: ", results);
                this.firstname = results;
            });

        } catch(e) {
            console.error(e);
        }
    }

    openPaymentUETRTrack(){
        this.goTohelper("payment-uetr-track");
    }

    goTohelper(page){
        try{
            var url = "c__comesFromTracker=true";
            encryptData({str: url}).then((results)=>{
                console.log("Results: ", results);
                let pageReference={
                    type: "comm__namedPage", 
                    attributes: {
                        name: page
                    },
                    state: {
                        params : results
                }};

                console.log("page", pageReference);

                this[NavigationMixin.Navigate](pageReference);

                
            });

        } catch (e) {
            console.log(e);
        }
    }

}